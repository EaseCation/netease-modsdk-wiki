#!/usr/bin/env python3
"""Wiki 原文解析、独立标注、构建索引与低上下文查询。Python 3.9+，仅标准库。"""
import argparse
import collections
import gzip
import hashlib
import html
import json
import math
import re
import sys
import os
import tempfile
import unicodedata
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
VERSION = '3.9'
SIDE_NAMES = {'server': '服务端', 'client': '客户端', 'common': '通用'}
SCHEMA_VERSION = 3
QUERY_PROTOCOL = 4


def atomic_artifact(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    raw = data.encode('utf8') if isinstance(data,str) else data
    fd, temporary = tempfile.mkstemp(dir=path.parent, prefix='.'+path.name)
    try:
        with os.fdopen(fd,'wb') as stream: stream.write(raw)
        os.replace(temporary,path)
    finally:
        if os.path.exists(temporary): os.unlink(temporary)


def digest(value):
    return hashlib.sha256(value.encode('utf8') if isinstance(value, str) else value).hexdigest()


def plain(value):
    value = re.sub(r'</?(?:br|span|div|p|a|font|strong|em|b|i|code)(?:\s[^<>]*|/)?\s*>', '', value, flags=re.I)
    value = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', value)
    return html.unescape(value).replace('`', '').strip()


def slug(value):
    value = unicodedata.normalize('NFKD', value)
    value = re.sub(r'[\u0300-\u036f\x00-\x1f]', '', value)
    value = re.sub(r'''[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+''', '-', value)
    return re.sub(r'^(\d)', r'_\1', re.sub('-+', '-', value).strip('-')).lower()


def headings(text):
    """保留真实行号与父路径，章节包含全部子章节；围栏内的 # 不作为标题。"""
    lines = text.splitlines(keepends=True)
    result, stack, fence = [], [], None
    in_frontmatter = bool(lines and lines[0].strip() == '---')
    for i, line in enumerate(lines):
        if in_frontmatter:
            if i and line.strip() == '---':
                in_frontmatter = False
            continue
        match = re.match(r'^ {0,3}(`{3,}|~{3,})(.*)$', line)
        if match:
            mark, suffix = match.groups()
            if fence is None:
                fence = mark
            elif mark[0] == fence[0] and len(mark) >= len(fence) and not suffix.strip():
                fence = None
            continue
        if fence:
            continue
        match = re.match(r'^ {0,3}(#{1,6})\s+(.+?)\s*$', line)
        if not match:
            continue
        level, title = len(match[1]), re.sub(r'\s+#+$', '', match[2])
        while stack and stack[-1]['level'] >= level:
            stack.pop()['end'] = i
        section = {'title': title, 'level': level, 'start': i, 'end': len(lines),
                   'path': [s['title'] for s in stack] + [title]}
        result.append(section)
        stack.append(section)
    for section in result:
        section['raw'] = ''.join(lines[section['start']:section['end']])
        section['body'] = ''.join(lines[section['start'] + 1:section['end']])
    return result


def section_content(text, selector):
    parts = [p.strip() for p in selector.split(' > ')]
    matches = [s for s in headings(text) if s['path'][-len(parts):] == parts]
    if len(matches) != 1:
        return {'error': 'ambiguous_section' if matches else 'section_not_found',
                'candidates': [' > '.join(s['path']) for s in matches]}
    section = matches[0]
    return {'path': section['path'], 'line': section['start'] + 1, 'text': section['raw']}


def frontmatter(text):
    match = re.match(r'^---\s*\n(.*?)\n---', text, re.S)
    return {k: v.strip().strip('"\'') for k, v in
            re.findall(r'^([\w-]+):\s*(.*)$', match[1], re.M)} if match else {}


def fields(text):
    # 预设零件提示是上游统一尾注，保留在 raw；不作为普通 API 的合同字段。
    text = re.sub(r'(?m)^.*在零件中直接声明.*(?:\n.*详情参考.*)?', '', text)
    lines = text.splitlines()
    starts, fence, examples, code, language = [], None, [], [], ''
    for i, line in enumerate(lines):
        match = re.match(r'^ {0,3}(`{3,}|~{3,})(.*)$', line)
        if match:
            mark, suffix = match.groups()
            if fence is None:
                fence, language, code = mark, suffix.strip(), []
            elif mark[0] == fence[0] and len(mark) >= len(fence) and not suffix.strip():
                examples.append({'language': language, 'code': '\n'.join(code)})
                fence = None
            else:
                code.append(line)
            continue
        if fence:
            code.append(line)
            continue
        match = re.match(r'^\s*(?:[-*]\s*)?(描述|参数|返回值|备注|示例)\s*[:：]?\s*$', line)
        if match:
            starts.append((i, match[1]))
    sections = {}
    for index, (start, label) in enumerate(starts):
        end = starts[index + 1][0] if index + 1 < len(starts) else len(lines)
        if label in sections and label != '示例':
            raise ValueError('正文包含重复合同字段，需要先按章节分段：' + label)
        sections[label] = '\n'.join(lines[start + 1:end]).strip().strip('-').strip()
    def table(body):
        rows = []
        for line in body.splitlines():
            if not line.strip().startswith('|'):
                continue
            cells = [plain(c).strip() for c in re.split(r'(?<!\\)\|', line.strip())[1:-1]]
            if cells and not all(re.match(r'^[: -]+$', c) for c in cells):
                rows.append(cells)
        return rows[1:]
    params = [{'name': r[0], 'type': r[1], 'description': r[2]} for r in table(sections.get('参数', '')) if len(r) >= 3]
    returns = table(sections.get('返回值', ''))
    return {'description': plain(sections.get('描述', '')),
            'parameters': params,
            'returns': {'type': returns[0][0], 'description': returns[0][1]} if returns and len(returns[0]) >= 2 else {'description': plain(sections.get('返回值', ''))},
            'remarks': plain(sections.get('备注', '')),
            'examples': examples,
            'enum_refs': sorted(set(re.findall(r'([A-Z][A-Za-z0-9_]+)枚举', plain(text))))}


def read_records(root):
    records, docs = [], {}
    for prefix, default_scope in [('docs/mcdocs/1-ModAPI', 'modsdk'), ('docs/mcdocs/3-PresetAPI', 'preset')]:
        for file in sorted((root / prefix).rglob('*.md')):
            text = file.read_text(encoding='utf8')
            rel = file.relative_to(root / 'docs').as_posix()
            docs[rel] = digest(text)
            meta = frontmatter(text)
            source = meta.get('source_url', 'https://mc.163.com/dev/mcmanual/mc-dev/' + quote(rel.replace('.md', '.html'), safe='/'))
            is_event = '/事件/' in rel
            is_enum = '/枚举值/' in rel
            if is_enum and re.match(r'^[A-Za-z_]\w*$', file.stem):
                record = {'name': file.stem, 'kind': 'enum', 'side': 'common', 'class_path': '',
                          'description': plain(text.split('\n', 8)[-1])[:180], 'parameters': [], 'returns': {},
                          'remarks': '', 'examples': [], 'enum_refs': [], 'raw': text, 'scope': default_scope,
                          'line': 1, 'heading_line': 1, 'anchor': slug(file.stem), 'section_path': [file.stem]}
                candidates = [record]
            else:
                candidates = []
                sections = headings(text)
                for section in sections:
                    name = plain(section['title'])
                    if section['level'] != 2 or not re.match(r'^[A-Za-z_]\w*$', name):
                        continue
                    children = [s for s in sections if s['level'] == 3 and s['start'] > section['start'] and s['end'] <= section['end'] and plain(s['title']) in ('服务端接口', '客户端接口', '服务端事件', '客户端事件')]
                    variants = []
                    for parent in children or [section]:
                        # 同一端侧可包含多个组件的同名方法，合同不能跨 method in 边界合并。
                        method_lines = [i for i, line in enumerate(parent['raw'].splitlines(keepends=True))
                                        if re.match(r'^method in\s+[\w.]+', line)]
                        if is_event or len(method_lines) < 2:
                            variants.append(parent)
                            continue
                        lines = parent['raw'].splitlines(keepends=True)
                        cuts = [0] + [i - 1 if i and '<span id=' in lines[i-1] else i for i in method_lines[1:]] + [len(lines)]
                        for begin, end in zip(cuts, cuts[1:]):
                            raw = ''.join(lines[begin:end])
                            variants.append({**parent, 'raw': raw, 'body': raw, 'start': parent['start'] + begin})
                    for variant in variants:
                        body = variant['body']
                        # 事件后附的相关接口各有参数与描述，不能覆盖主事件的合同。
                        attached = next((h for h in headings(body) if h['title'] == '相关接口'), None)
                        if attached:
                            body = ''.join(body.splitlines(keepends=True)[:attached['start']])
                        lead_body = body[:body.find('描述')] if '描述' in body else body
                        class_path = re.search(r'method in\s+([\w.]+)', lead_body)
                        class_path = class_path[1] if class_path and not is_event else ''
                        try:
                            parsed = fields(body)
                        except ValueError as error:
                            raise ValueError(rel + ' > ' + ' > '.join(variant['path']) + ': ' + str(error)) from error
                        if not parsed['description'] and not class_path:
                            continue
                        lead = plain(body[:body.find('描述') if '描述' in body else 300])
                        side_text = plain(variant['title']) + ' ' + lead
                        sides = [side for side, label in SIDE_NAMES.items() if label in side_text and side != 'common']
                        if not sides:
                            sides = ['client'] if '.client.' in class_path else ['server'] if '.server.' in class_path else ['common']
                        for side in sides:
                            scope = 'preset' if default_scope == 'preset' or re.search('preset', name + class_path, re.I) else 'modsdk'
                            candidates.append({**parsed, 'name': name, 'kind': 'event' if is_event else 'api', 'side': side,
                                               'class_path': class_path, 'scope': scope, 'raw': variant['raw'],
                                               'line': variant['start'] + 1, 'heading_line': section['start'] + 1,
                                               'anchor': slug(name), 'section_path': variant['path']})
            for record in candidates:
                record.update({'id': '{}:{}:{}:{}'.format(record['scope'], record['kind'], record['side'], (record['class_path'] + '.' if record['class_path'] else '') + record['name']),
                               'version': VERSION, 'doc_path': rel, 'source_url': source + '#' + record['anchor'],
                               'source_last_modified': meta.get('last_modified'), 'source_sha256': digest(record['raw']),
                               'wiki_url': '/' + quote(rel.replace('.md', '.html'), safe='/') + '#' + quote(record['anchor']),
                               'documentation_status': 'full'})
                records.append(record)
    # 索引表有名称而当前快照缺正文时仍可发现，但禁止把空参数当作完整签名。
    known = {(r['kind'], r['side'], r['name']) for r in records}
    for kind, rel in [('api', 'mcdocs/1-ModAPI/接口/Api索引表.md'), ('event', 'mcdocs/1-ModAPI/事件/事件索引表.md')]:
        file = root / 'docs' / rel
        if not file.exists():
            continue
        for line in file.read_text().splitlines():
            cells = [plain(c) for c in line.strip().strip('|').split('|')]
            if len(cells) < 3 or not re.fullmatch(r'[A-Za-z_]\w*', cells[0]):
                continue
            for side, label in [('server', '服务端'), ('client', '客户端')]:
                if label not in cells[1] or (kind, side, cells[0]) in known:
                    continue
                name = cells[0]
                records.append({'id': 'modsdk:{}:{}:index-only.{}'.format(kind, side, name), 'scope': 'modsdk', 'kind': kind, 'side': side,
                                'name': name, 'description': cells[2], 'version': VERSION, 'doc_path': rel,
                                'parameters': [], 'returns': {}, 'remarks': '', 'examples': [], 'enum_refs': [], 'class_path': '',
                                'raw': line, 'source_sha256': digest(line), 'source_url': 'https://mc.163.com/dev/mcmanual/mc-dev/' + quote(rel.replace('.md', '.html'), safe='/'),
                                'wiki_url': '/' + quote(rel.replace('.md', '.html'), safe='/'), 'documentation_status': 'index_only', 'line': 1, 'heading_line': 1, 'anchor': '', 'section_path': []})
                known.add((kind, side, name))
    # 预设教程作为显式范围内的文档检索，不重复导入 13-PresetAPI 镜像。
    for base in ('mcguide', 'mconline'):
        for file in sorted((root / 'docs' / base).rglob('*.md')):
            rel = file.relative_to(root / 'docs').as_posix()
            if not re.search(r'预设|preset', rel, re.I):
                continue
            text = file.read_text(encoding='utf8'); docs[rel] = digest(text)
            title = next((h['title'] for h in headings(text) if h['level'] == 1), file.stem)
            records.append({'id': 'preset:document:' + rel, 'scope': 'preset', 'kind': 'document',
                            'side': 'common', 'name': plain(title), 'description': plain(text)[:240],
                            'version': VERSION, 'doc_path': rel, 'class_path': '', 'parameters': [],
                            'returns': {}, 'remarks': '', 'examples': [], 'enum_refs': [], 'raw': text,
                            'source_sha256': digest(text), 'source_url': frontmatter(text).get('source_url', ''),
                            'wiki_url': '/' + quote(rel.replace('.md', '.html'), safe='/'),
                            'documentation_status': 'full', 'line': 1, 'heading_line': 1, 'anchor': '', 'section_path': []})
    ids = collections.Counter(r['id'] for r in records)
    for record in records:
        if ids[record['id']] > 1:
            # 同一组件绑定 levelId/entityId 时，世界与实体页的用法不同，保留各自原文。
            record['id'] += '@' + record['doc_path']
        record['key'] = digest(record['id'])[:12]
    if len({r['id'] for r in records}) != len(records) or len({r['key'] for r in records}) != len(records):
        raise ValueError('索引标识冲突，需要显式区分文档变体：' + repr([k for k,v in collections.Counter(r['id'] for r in records).items() if v>1]))
    return records, docs


def validate_knowledge(concepts, recipes, by_id, root):
    if concepts.get('schema_version') != SCHEMA_VERSION or recipes.get('schema_version') != SCHEMA_VERSION:
        raise ValueError('概念/组合协议不匹配，请同步更新 Wiki 和 Skill')
    terms=concepts.get('operation_terms',{})
    if set(terms)!={'read','write','observe'} or any(not isinstance(v,list) or not v or any(not isinstance(x,str) or not x for x in v) for v in terms.values()):
        raise ValueError('缺少有效的共享操作词表，请同步更新 Wiki 与 Skill')
    entries = concepts.get('entries', [])
    ids = {c['id'] for c in entries}
    if len(ids) != len(entries): raise ValueError('概念 ID 重复')
    graph = {c['id']: c.get('parents',[]) for c in entries}
    def visit(cid, seen):
        if cid in seen: raise ValueError('概念父子关系存在循环：'+cid)
        for parent in graph[cid]: visit(parent,seen|{cid})
    for c in entries:
        if set(c)-{'id','label','category','aliases','parents','excludes','requires_any','context_only','kinds','requires_facts','target_key','role_excludes'}: raise ValueError('概念字段非法：'+c['id'])
        if 'target_key' in c and (c['category']!='target' or c['target_key'] not in TARGETS):raise ValueError('对象概念映射非法：'+c['id'])
        if set(c.get('requires_any',[]))-ids: raise ValueError('概念上下文引用不存在')
        if c['category'] not in ('action','target','property','qualifier'): raise ValueError('概念类别非法：'+c['id'])
        if not c.get('label') or not isinstance(c.get('aliases'),list) or any(not isinstance(x,str) or not x.strip() for x in c['aliases']): raise ValueError('概念词汇为空或非法')
        if 'kinds' in c and (not isinstance(c['kinds'],list) or not c['kinds'] or set(c['kinds'])-{'api','event','enum','document'}):raise ValueError('概念文档类型非法：'+c['id'])
        requirements=c.get('requires_facts',{})
        if not isinstance(requirements,dict) or set(requirements)-{'cancellable','batch','phase','extent','operation'}:raise ValueError('概念条件非法：'+c['id'])
        for field,value in requirements.items():
            if field=='cancellable' and not isinstance(value,bool):raise ValueError('取消能力必须为布尔值')
            if field!='cancellable' and (not isinstance(value,str) or value not in FACT_CHOICES[field]):raise ValueError('概念条件取值非法：'+c['id'])
        if set(c.get('parents',[])+c.get('excludes',[])+c.get('role_excludes',[]))-ids: raise ValueError('概念引用不存在：'+c['id'])
        visit(c['id'],set())
    recipe_ids = set()
    for recipe in recipes.get('entries',[]):
        if recipe['id'] in recipe_ids: raise ValueError('组合 ID 重复')
        recipe_ids.add(recipe['id'])
        if set(recipe['concepts'])-ids: raise ValueError('组合概念不存在')
        if not isinstance(recipe.get('operations'),list) or not recipe['operations'] or set(recipe['operations'])-set(OPERATIONS):raise ValueError('组合操作非法')
        if recipe.get('status') not in ('matched','partial') or recipe.get('side') not in SIDE_NAMES:raise ValueError('组合状态或端侧非法')
        if set(recipe.get('modes',['auto','workflow']))-{'auto','workflow'}:raise ValueError('组合查询模式非法')
        for concepts in [recipe.get('unverified_concepts',[]),recipe.get('input_concepts',[]),*recipe.get('triggers',[])]:
            if not isinstance(concepts,list) or set(concepts)-ids:raise ValueError('组合条件引用非法')
        for guide in recipe.get('guides',[]):
            path=(root/'docs'/guide).resolve()
            if (root/'docs').resolve() not in path.parents or not path.is_file(): raise ValueError('组合文档路径不存在：'+guide)
        contract=recipe.get('contract',{})
        if not isinstance(contract,dict) or set(contract)-{'target','extent','batch','target_scope'} or any(value not in INTENT_CHOICES[field] for field,value in contract.items()):raise ValueError('组合合同字段非法')
        for step in recipe['steps']:
            for rid in step['ids']:
                if rid not in by_id or recipe.get('source_dependencies',{}).get(rid)!=by_id[rid]['source_sha256']:
                    raise ValueError('组合步骤来源缺失或变化：'+rid)


def validate_facts(facts, record, concept_ids):
    allowed={'status','concepts','evidence','operation','operations','targets','constraints','extent','phase','batch','mutable_fields','unsupported_features','required_before','subject','target','property','action','cancellable','qualifiers'}
    if set(facts)-allowed or facts.get('status') not in ('unknown','reviewed'):
        raise ValueError('能力事实格式不完整：'+record['id'])
    if not isinstance(facts.get('concepts'),list) or set(facts['concepts'])-concept_ids:
        raise ValueError('能力概念引用不存在：'+record['id'])
    if facts['status']=='unknown' and (facts['concepts'] or set(facts)-{'status','concepts'}):
        raise ValueError('未核验能力不能填写确定事实：'+record['id'])
    for field in ('action','subject','target','property','qualifiers'):
        if field in facts and (not isinstance(facts[field],list) or set(facts[field])-concept_ids): raise ValueError('能力角色概念非法：'+field)
    for field,choices in FACT_CHOICES.items():
        if field in facts and facts[field] not in choices:raise ValueError('能力事实值非法：'+field)
    if 'cancellable' in facts and not isinstance(facts['cancellable'],bool):raise ValueError('取消能力必须为布尔值')
    if 'operations' in facts:
        if not isinstance(facts['operations'],list) or set(facts['operations'])-set(OPERATIONS) or ('read' in facts['operations'] and set(facts['operations']) & MUTATIONS): raise ValueError('能力操作集合非法或混合读写副作用')
    if not isinstance(facts.get('constraints',[]),list):raise ValueError('能力条件必须为数组')
    for rule in facts.get('constraints',[]):
        if set(rule)-{'when','allow'} or not isinstance(rule.get('when',{}),dict) or not isinstance(rule.get('allow'),dict) or not rule['allow']:raise ValueError('能力条件规则非法')
        fields={'target','target_scope','operation','extent','batch','side','kind'}
        if (set(rule.get('when',{}))|set(rule['allow']))-fields:raise ValueError('未知能力条件字段')
        if any(not isinstance(v,str) for v in rule.get('when',{}).values()) or any(not isinstance(v,list) or not v or any(not isinstance(x,str) for x in v) for v in rule['allow'].values()):raise ValueError('能力条件值非法')
        for field,value in rule.get('when',{}).items():
            if value not in INTENT_CHOICES[field]:raise ValueError('能力条件选择值非法：'+field)
        for field,values in rule['allow'].items():
            if set(values)-set(INTENT_CHOICES[field]):raise ValueError('能力条件允许值非法：'+field)
    if facts['status']=='reviewed':
        evidence=facts.get('evidence',{})
        if evidence.get('source_sha256')!=record['source_sha256'] or evidence.get('section')!=record['section_path']:
            raise ValueError('能力事实来源变化：'+record['id'])
        if 'mutable_fields' in facts:
            names={p['name'] for p in record['parameters']}
            if set(facts['mutable_fields'])-names: raise ValueError('可修改字段不存在：'+record['id'])


class Knowledge:
    """概念与已核验事实只从 Wiki 数据读取，不维护接口名或玩法关键词例外。"""
    def __init__(self,index):
        self.concepts={c['id']:c for c in index.get('concepts',[])}
        self.recipes=index.get('recipes',[])
        self.operation_terms=index['operation_terms']
        self.alias_patterns={cid:[(alias.lower(),re.compile(re.escape(alias.lower()))) for alias in c['aliases']] for cid,c in self.concepts.items()}
        self._query_cache={}; self._record_cache={}

    def identify(self,text,explicit=(),kind=None):
        if set(explicit)-self.concepts.keys(): raise ValueError('未知概念 ID：'+','.join(set(explicit)-self.concepts.keys()))
        cache_key=(text,kind)
        if cache_key not in self._query_cache:
            lower=text.lower();matches=[]
            for cid,c in self.concepts.items():
                if c.get('kinds') and kind not in c['kinds']:continue
                for word,pattern in self.alias_patterns[cid]:
                    for match in pattern.finditer(lower):
                        if word.isascii() and ((match.start() and lower[match.start()-1].isascii() and lower[match.start()-1].isalnum()) or (match.end()<len(lower) and lower[match.end()].isascii() and lower[match.end()].isalnum())): continue
                        matches.append((match.start(),match.end(),cid))
            present={cid for _,_,cid in matches}
            matches=[hit for hit in matches if not self.concepts[hit[2]].get('requires_any') or present & set(self.concepts[hit[2]]['requires_any'])]
            selected=[]
            for begin,end,cid in sorted(matches,key=lambda x:-(x[1]-x[0])):
                if not any(begin>=a and end<=b and end-begin<b-a and (self.concepts[cid]['category']!='target' or self.concepts[other]['category']=='target') for a,b,other in selected): selected.append((begin,end,cid))
            self._query_cache[cache_key]={cid for _,_,cid in selected}
        return self.ancestors(self._query_cache[cache_key] | set(explicit))

    def ancestors(self,ids):
        result=set(ids);pending=list(ids)
        while pending:
            for p in self.concepts[pending.pop()].get('parents',[]):
                if p not in result:result.add(p);pending.append(p)
        return result

    def record_concepts(self,r):
        if r['id'] not in self._record_cache:
            facts=r.get('annotation',{}).get('facts',{})
            verified=(set(facts.get('concepts',[])) | set(sum((facts.get(k,[]) for k in ('action','subject','target','property','qualifiers')),[]))) if facts.get('status')=='reviewed' else set()
            if facts.get('status')=='reviewed':
                verified.update(cid for cid,c in self.concepts.items() if c.get('requires_facts') and all(facts.get(k)==v for k,v in c['requires_facts'].items()))
            # 参数是输入，备注可能是否定或上下文；不能当作本接口产生的能力。
            positive,_=evidence_parts(r['description']+' '+json.dumps(r.get('returns',{}),ensure_ascii=False))
            inferred=self.identify(positive,kind=r['kind'])
            self._record_cache[r['id']]=(self.ancestors(verified),inferred)
        return self._record_cache[r['id']]

    def score(self,r,requested,intent=None):
        if not requested:return 0
        verified,inferred=self.record_concepts(r)
        weights={'action':4,'target':1,'property':5,'qualifier':4}
        core={c for c in requested if not self.concepts[c].get('context_only',False)}
        # 领域词只帮助消歧，不能单独证明动作或属性。显式对象约束由合同核对处理。
        domain=self.leaves({c for c in requested if self.concepts[c]['category']=='target'})
        known=self.leaves({c for c in verified|inferred if self.concepts[c]['category']=='target'})
        domain_match=sum(any(c in self.ancestors([k]) or k in self.ancestors([c]) for k in known) for c in domain)
        domain_score=(10 if core else 1)*domain_match/max(1,len(domain)) if not (intent or {}).get('target') else 0
        if not core:return domain_score
        # 上位概念只用于蕴含，不重复计分；未请求的额外能力不惩罚通用接口。
        core=self.leaves(core)
        total=sum(weights[self.concepts[c]['category']] for c in core)
        overlap=sum(weights[self.concepts[c]['category']] for c in core & verified)
        soft=sum(weights[self.concepts[c]['category']] for c in (core-verified)&inferred)
        implicit=set(r.get('annotation',{}).get('facts',{}).get('qualifiers',[]))-requested
        return max(0,100*(overlap+.3*soft)/max(1,total)-30*bool(implicit)) + domain_score

    def leaves(self,concepts):
        parents=set().union(*(self.ancestors([c])-{c} for c in concepts)) if concepts else set()
        return set(concepts)-parents

    def conflicts(self,r,requested):
        verified,_=self.record_concepts(r)
        return {c for c in requested-verified if set(self.concepts[c].get('excludes',[])) & verified}

    def primary_concepts(self,requested):
        return {c for c in requested if not self.concepts[c].get('context_only',False) and self.concepts[c]['category']!='qualifier'}

    def coverage(self,r,requested):
        verified,_=self.record_concepts(r)
        core={c for c in requested if not self.concepts[c].get('context_only',False)}
        if not core:return 'unknown',[]
        missing=sorted(core-verified)
        return ('matched' if not missing else 'partial' if core&verified else 'unknown'),missing

    def matching_recipes(self,requested,side,operation='any',mode='auto',intent=None):
        result=[]
        for recipe in self.recipes:
            if mode=='atomic' or mode not in recipe.get('modes',['auto','workflow']):continue
            if operation!='any' and not supports_operation(recipe,operation):continue
            if recipe['side'] not in (side,'common') and side!='any':continue
            if any((intent or {}).get(field) not in (None,'any',value) for field,value in recipe.get('contract',{}).items()):continue
            triggers=recipe.get('triggers',[recipe['concepts']])
            if any(set(trigger)<=requested for trigger in triggers):result.append(recipe)
        return result


def build(root=ROOT):
    start_signature = input_signature(root)
    records, docs = read_records(root)
    sidecar = root / 'knowledge/annotations.json'
    annotations = json.loads(sidecar.read_text()) if sidecar.exists() else {'entries': []}
    if annotations.get('schema_version') != SCHEMA_VERSION:
        raise ValueError('标注协议与查询引擎不匹配，请使用配套最新版')
    by_id = {r['id']: r for r in records}
    concepts = json.loads((root / 'knowledge/concepts.json').read_text())
    recipes = json.loads((root / 'knowledge/recipes.json').read_text())
    validate_knowledge(concepts, recipes, by_id, root)
    concept_ids = {c['id'] for c in concepts['entries']}
    vocabulary={c['id']:c for c in concepts['entries']}
    notes = {}
    if len({a['id'] for a in annotations['entries']}) != len(annotations['entries']):
        raise ValueError('标注目标重复')
    for annotation in annotations['entries']:
        record = by_id.get(annotation['id'])
        if not record or record['documentation_status'] != 'full':
            raise ValueError('标注目标没有完整正文：' + annotation['id'])
        if annotation['source_sha256'] != record['source_sha256']:
            raise ValueError('标注所依赖原文已变化，请复核：' + annotation['id'])
        for dependency, expected in annotation.get('source_dependencies', {}).items():
            if dependency not in by_id or by_id[dependency]['source_sha256'] != expected:
                raise ValueError('标注引用的文档已变化，请复核：' + annotation['id'] + ' -> ' + dependency)
        if not 0 <= len(annotation['tags']) <= 6 or len(set(annotation['tags'])) != len(annotation['tags']) or any(not re.fullmatch(r'[\u4e00-\u9fff]{1,12}', t) for t in annotation['tags']):
            raise ValueError('标签须为最多 6 个不重复的中文基础能力词：' + annotation['id'])
        for linked in annotation.get('related', []) + annotation.get('facts', {}).get('required_before', []):
            if linked not in by_id:
                raise ValueError('关联目标不存在：' + linked)
        facts = annotation.get('facts', {})
        validate_facts(facts, record, concept_ids)
        record['annotation'] = annotation
        supported=set(facts.get('concepts',[])) | set(sum((facts.get(k,[]) for k in ('action','subject','target','property','qualifiers')),[]))
        record['concept_aliases'] = sorted({alias for cid in supported for alias in vocabulary[cid]['aliases']})
        record['capability_labels'] = [vocabulary[cid]['label'] for cid in sorted(supported)]
        record['capability_roles'] = {role:[vocabulary[cid]['label'] for cid in facts[role]] for role in ('action','subject','target','property','qualifiers') if facts.get(role)}
        record['workflows'] = [{'id':recipe['id'],'label':recipe['label'],'steps':[{'label':step['label'],'entries':[{'name':by_id[rid]['name'],'url':by_id[rid]['wiki_url']} for rid in step['ids']]} for step in recipe['steps']], 'guides':[{'title':Path(guide).stem,'url':'/'+quote(guide.replace('.md','.html'),safe='/')} for guide in recipe['guides']], 'cautions':recipe['cautions']} for recipe in recipes['entries'] if any(record['id'] in step['ids'] for step in recipe['steps'])]
        notes[record['id']] = {**annotation, 'name': record['name'], 'side': record['side'], 'doc_path': record['doc_path'],
                               'heading_line': record['heading_line'], 'wiki_url': record['wiki_url'], 'capability_labels': record['capability_labels'], 'source_section': record['section_path'],
                               'capability_roles':record['capability_roles'],'workflows':record['workflows'],
                               'related_entries': [{'name': by_id[i]['name'], 'side': by_id[i]['side'], 'url': by_id[i]['wiki_url']} for i in annotation.get('related', [])]}
    for record in records:
        profile = retrieval_profile(record)
        if any(t not in TARGETS for t in profile['targets']) or profile['operation'] not in set(OPERATIONS)-{'any'}|{'unknown'} or profile['extent'] not in ('single','many','global','dimension','unknown'):
            raise ValueError('检索事实格式无效：'+record['id'])
        for dep in profile.get('required_before',[]):
            if dep not in record.get('annotation',{}).get('source_dependencies',{}):
                raise ValueError('必需前置缺少来源哈希：'+record['id'])
    def visit_dependencies(entry_id, chain):
        if entry_id in chain:raise ValueError('必需前置存在循环：'+entry_id)
        for dep in retrieval_profile(by_id[entry_id]).get('required_before',[]):visit_dependencies(dep,chain|{entry_id})
    for entry_id in by_id:visit_dependencies(entry_id,set())
    if start_signature != input_signature(root): raise ValueError('构建期间来源发生变化，请在修改结束后重新构建')
    corpus_hash = digest(json.dumps({'docs': docs, 'annotations': annotations, 'concepts': concepts, 'recipes': recipes}, ensure_ascii=False, sort_keys=True))
    index = {'schema_version': SCHEMA_VERSION, 'version': VERSION, 'snapshot_note': 'GitHub 3.8 基础文档及官网 3.9 补充快照；不代表全部 API 的引入版本',
             'corpus_sha256': corpus_hash, 'input_signature': start_signature, 'source_files': docs, 'records': records, 'concepts': concepts['entries'], 'recipes': recipes['entries'], 'operation_terms': concepts['operation_terms'], 'query_protocol': QUERY_PROTOCOL}
    for note in notes.values(): note['corpus_sha256'] = corpus_hash
    output = root / '.api-index'; output.mkdir(exist_ok=True)
    atomic_artifact(output / 'index.json', json.dumps(index, ensure_ascii=False, separators=(',', ':')))
    atomic_artifact(output / 'notes.json', json.dumps(notes, ensure_ascii=False, indent=2))
    public = root / 'docs/public/ai'; public.mkdir(parents=True, exist_ok=True)
    packed = json.dumps(index, ensure_ascii=False, separators=(',', ':')).encode()
    atomic_artifact(public / 'index.json.gz', gzip.compress(packed, mtime=0))
    manifest = {'schema_version': SCHEMA_VERSION, 'query_protocol': QUERY_PROTOCOL, 'version': VERSION, 'corpus_sha256': corpus_hash,
                'index_sha256': digest((public / 'index.json.gz').read_bytes()), 'records': len(records),
                'scopes': dict(collections.Counter(r['scope'] for r in records)), 'annotated': len(notes),
                'index_only': sum(r['documentation_status'] == 'index_only' for r in records)}
    atomic_artifact(public / 'manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2))
    return manifest


def tokens(text):
    text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text).lower()
    found = re.findall(r'[a-z_][a-z_0-9]*|[\u4e00-\u9fff]+', text)
    result = []
    for word in found:
        result.append(word)
        if re.fullmatch(r'[\u4e00-\u9fff]+', word):
            result.extend(word[i:i + n] for n in (2, 3) for i in range(len(word) - n + 1))
    return result


# 可用于约束的对象类别来自 SDK 文档与组件，不包含具体玩法。
TARGETS = {
    'entity': '实体通用能力', 'player': '玩家能力', 'player_inventory': '玩家背包槽位', 'player_equipment': '玩家盔甲与手持槽位',
    'block_container': '方块容器', 'block': '方块', 'world': '世界', 'chunk': '区块与常加载区域',
    'player_respawn': '个人重生点', 'world_spawn': '世界出生点', 'attribute': '引擎属性',
    'attribute_modifier': '属性修饰符', 'permissions': '玩家权限', 'game_mode': '游戏模式',
    'world_time': '全局时间', 'dimension_time': '维度独立时间', 'world_weather': '全局天气',
    'dimension_weather': '维度独立天气', 'ui': '界面与控件', 'ui_model': '界面模型',
    'camera': '玩家摄像机', 'entity_name': '实体名称显示', 'entity_lifetime': '实体清理与持久化',
    'particle_bedrock': '原版粒子发射器', 'particle_netease': '网易粒子', 'frame_effect': '序列帧',
    'world_ray': '普通世界射线', 'physics': '自定义物理刚体', 'block_palette': '方块组合数据',
    'timer': '定时调度', 'communication': '跨端与本地事件通信',
    'model': '骨骼模型', 'virtual_world': '虚拟世界', 'sound': '声音播放实例',
}
OPERATIONS = ('any','read','write','create','set','delete','play','pause','resume','stop','observe')
MUTATIONS = set(OPERATIONS) - {'any','read','observe'}
FACT_CHOICES = {'operation':set(OPERATIONS)-{'any'},'extent':{'single','many','global','dimension'},'phase':{'before','after','change'},'batch':{'single','bulk'}}
INTENT_CHOICES = {**FACT_CHOICES,'target':set(TARGETS),'target_scope':{'local_player','other_player','all_players'},'side':set(SIDE_NAMES),'kind':{'api','event','enum','document'}}
READ_PREFIX = re.compile(r'^(?:get|is|has|can|check|lookup|exist|query|raycast)', re.I)
WRITE_PREFIX = re.compile(r'^(?:set|add|remove|delete|destroy|create|enable|disable|start|stop|play|pause|resume|replay|reset|register|unregister|unlisten|listen|notify|broadcast|change|open|close|hide|show|lock|unlock|bind|unbind|clear|clean|spawn|use|kill|promote|trigger|emit|render|rotate|zoom|push|pop|insert|copy|replace|serialize|deserialize|update|upgrade|mirror|place|cancel|forbid|immune|depart|undepart|collect|swing|begin|end)', re.I)
LIMIT_MARKER = re.compile(r'不支持|仅支持|只支持|仅适用于|仅适用|只适用于|仅能|不能(?:用于|用来|当作|直接|代替|修改|设置|获取|查询)|不(?:用于|提供|包含|包括|保证|等于|代表|代替|影响|改变|修改)|不是|需先|须先|必须先|需要先|才(?:会|能|生效)')
NEGATIVE_CLAUSE = re.compile(r'(?:不是|而非|不要(?:通过|给|使用|调用|发送)?|不(?:使用|调用|发送|切换|修改|改变|设置|写入|生成|创建)|不能用|绝不能|不得)[^，,；;。\n]*')
QUERY_STOP = re.compile(r'获取|读取|查询|设置|修改|当前|指定|是否|请|需要|可以|相关|进行|的')

def evidence_parts(text):
    """能力与限制分开；不依赖、不需要等肯定独立能力不属于否定能力。"""
    positive, limitations = [], []
    for part in re.split(r'[；。\n]+', text or ''):
        part = part.strip(' -\t')
        if not part: continue
        match = LIMIT_MARKER.search(part)
        if match:
            before = part[:match.start()].strip('，,（( ')
            if before: positive.append(before)
            limitations.append(part[match.start():])
        else: positive.append(part)
    return ' '.join(positive), limitations


def retrieval_profile(record):
    """格式推断只作软提示；已核验的边界来自同源知识数据。"""
    name = record['name']
    operation = 'unknown'
    if READ_PREFIX.match(name): operation = 'read'
    elif re.match(r'^(?:Remove|Delete|Destroy|Clear|Unregister)', name): operation = 'delete'
    elif re.match(r'^(?:Add|Create|Spawn|Register)', name): operation = 'create'
    elif re.match(r'^(?:Play|Start|Swing|Emit)', name): operation = 'play'
    elif re.match(r'^(?:Set|Reset|Change|Update|Lock|Unlock|Bind)', name): operation = 'set'
    elif WRITE_PREFIX.match(name): operation = 'write'
    if record['kind'] == 'event': operation = 'observe'
    if record['kind'] in ('enum', 'document'): operation = 'read'
    profile = {'targets': [], 'operation': operation, 'extent': 'unknown', 'phase': 'unknown', 'batch': 'unknown', 'specializations': []}
    annotation = record.get('annotation', {})
    profile.update(annotation.get('inferred', {}))
    facts = annotation.get('facts', {})
    verified = set()
    if facts.get('status') == 'reviewed':
        for key in ('targets','operation','operations','extent','phase','batch','constraints','unsupported_features','required_before'):
            if key in facts:
                profile[key] = facts[key]; verified.add(key)
    profile['verified'] = sorted(verified)
    return profile


def supports_operation(profile,operation):
    supported=set(profile.get('operations',[profile.get('operation','unknown')]))
    return bool(supported & MUTATIONS) if operation=='write' else operation in supported


INTENT_FIELDS = ('id','query','side','scope','kind','operation','target','extent','read_only','exclude_targets','exclude','must_support','target_scope','phase','batch','concepts','action','subject','object','property','qualifiers','mode','hints','requirements')

def prepare_intent(intent, defaults=None):
    if not isinstance(intent, dict): raise ValueError('子目标必须为对象')
    allowed = set(INTENT_FIELDS)
    unknown = set(intent) - allowed
    if unknown: raise ValueError('未知子目标字段：' + ', '.join(sorted(unknown)))
    if (defaults or {}).get('read_only') and intent.get('read_only') is False:
        raise ValueError('子目标不能解除计划的只读约束')
    if 'id' in intent and (not isinstance(intent['id'],str) or not intent['id'].strip()):
        raise ValueError('子目标 id 必须为非空字符串')
    value = {**(defaults or {}), **intent}
    query = value.get('query', '')
    if not isinstance(query, str) or not query.strip(): raise ValueError('每个子目标需要非空 query')
    if len(query)>1500: raise ValueError('单个子目标过长，请先拆分')
    negatives = NEGATIVE_CLAUSE.findall(query)
    positive = NEGATIVE_CLAUSE.sub(' ', query).strip(' ，,；;。')
    value['positive_query'] = positive
    value['negative_clauses'] = negatives
    value.setdefault('mode','auto')
    if value['mode'] not in ('auto','atomic','workflow'):raise ValueError('mode 必须为 auto、atomic 或 workflow')
    value.setdefault('side','any'); value.setdefault('scope','modsdk'); value.setdefault('kind','auto')
    value.setdefault('operation','any'); value.setdefault('target',None); value.setdefault('extent','any'); value.setdefault('target_scope','any'); value.setdefault('phase','any'); value.setdefault('batch','any')
    if value['kind']=='auto': value['kind']='event' if re.search(r'(?:监听|触发|发生).*(?:事件)|引擎事件', positive) else 'all'
    if value.get('read_only') or re.search(r'只读|仅(?:查询|读取)|只(?:读取|查询|检查)', query) and not re.search(r'设置|修改|添加|删除|创建|写入|开启|关闭', positive):
        desired='observe' if value['kind']=='event' else 'read'
        if value['operation'] not in ('any',desired): raise ValueError('read_only 与写入操作冲突')
        value['operation']=desired
    if value['kind']=='event':
        if value['operation'] not in ('any','observe'): raise ValueError('事件子目标的 operation 应为 observe 或省略')
        value['operation']='observe'
    if value['phase']=='any' and value['kind']=='event':
        if re.search('之前|即将',positive):value['phase']='before'
        elif re.search('之后|完成后',positive):value['phase']='after'
    if value['batch']=='any' and '批量' in positive:value['batch']='bulk'
    if value['phase']!='any' and value['kind']!='event':raise ValueError('phase 仅适用于事件子目标')
    for key, choices in [('side',('any','server','client','common')),('scope',('modsdk','preset','all')),('kind',('all','api','event','enum','document')),('operation',OPERATIONS),('extent',('any','single','many','global','dimension')),('target_scope',('any','local_player','other_player','all_players')),('phase',('any','before','after','change')),('batch',('any','bulk'))]:
        if value[key] not in choices: raise ValueError(key+' 不支持：'+str(value[key]))
    if value['target'] is not None and (not isinstance(value['target'],str) or value['target'] not in TARGETS): raise ValueError('未知 target；使用 schema 查看对象类别')
    for key in ('exclude_targets','exclude','must_support','concepts','action','subject','object','property','qualifiers','hints','requirements'):
        vals=value.get(key,[])
        if key in ('action','subject','object','property','qualifiers') and isinstance(vals,str): vals=[vals]
        if not isinstance(vals,list) or any(not isinstance(v,str) or not v.strip() for v in vals):raise ValueError(key+' 必须为非空字符串组成的数组')
        value[key]=vals
    if any(t not in TARGETS for t in value['exclude_targets']):raise ValueError('exclude_targets 包含未知对象类别')
    if 'read_only' in value and not isinstance(value['read_only'],bool):raise ValueError('read_only 必须为布尔值')
    return value


class Search:
    def __init__(self, index):
        self.index = index; self.records = index['records']; self.by_id = {r['id']:r for r in self.records}
        self.knowledge = Knowledge(index)
        self._field_vectors = {}
        self._vectors = {}; self.profiles = {r['id']:retrieval_profile(r) for r in self.records}
        self.limitations = {}; self.positive_text = {}

    def normalize_intent(self,intent):
        # 显式角色与粗粒度对象约束共用同一条件核对，不按某个接口补规则。
        explicit=sum((intent.get(k,[]) for k in ('concepts','action','subject','object','property','qualifiers')),[])
        self.knowledge.identify('',explicit+intent.get('hints',[]))
        # 操作词汇由 Wiki 维护；显式操作优先，多操作不偷偷选择其中一个。
        detected={op for op,words in self.knowledge.operation_terms.items() if any(word in intent['positive_query'] for word in words)}
        if intent['operation']=='any' and intent['mode']!='workflow':
            if len(detected)==1:
                intent['operation']=next(iter(detected))
                if intent['operation']=='observe' and intent['kind']=='all':intent['kind']='event'
            elif len(detected)>1:intent['needs_decomposition']=True
        if not intent['target']:
            targets={self.knowledge.concepts[c].get('target_key') for c in intent.get('object',[])}-{None}
            if len(targets)==1:intent['target']=targets.pop()
        return intent

    def vectors(self, strategy):
        key = 'raw' if strategy == 'raw' else 'annotated'
        if key in self._vectors: return self._vectors[key]
        vectors = []; df = collections.Counter(); columns = []; lengths = collections.defaultdict(list)
        for r in self.records:
            fields = [('name',r['name'],7,'official'),('description',r['description'],3,'official'),
                      ('class',r['class_path'],.5,'official'),('remarks',r['remarks'],.5,'official'),
                      ('parameters',json.dumps(r['parameters'],ensure_ascii=False),.4,'official'),
                      ('returns',json.dumps(r['returns'],ensure_ascii=False),3,'official')]
            if key == 'annotated':
                a = r.get('annotation', {})
                fields += [('tags',' '.join(a.get('tags',[])),5,'annotation'),('usage',a.get('usage',''),2,'annotation')]
                fields += [('aliases',text,5,'annotation') for text in a.get('aliases',[])]
                fields += [('questions',text,3,'annotation') for text in a.get('questions',[])]
            merged = collections.Counter(); limits = []; positives = []; column = []
            for field,text,weight,authority in fields:
                positive, negative = evidence_parts(text); positives.append(positive)
                limits.extend((authority,x) for x in negative)
                v = collections.Counter(tokens(positive)); size = sum(v.values())
                if size: lengths[field].append(size)
                column.append((field,weight,v,size))
                for token,count in v.items(): merged[token] += min(count,3)*weight
            if key == 'annotated': limits.extend(('annotation',x) for x in r.get('annotation',{}).get('cautions',[]))
            self.limitations[(key,r['id'])] = limits; self.positive_text[(key,r['id'])] = ' '.join(positives)
            vectors.append(merged); df.update(merged.keys()); columns.append(column)
        self._field_vectors[key] = (columns,{k:sum(v)/len(v) for k,v in lengths.items()})
        self._vectors[key] = (vectors,df,sum(sum(v.values()) for v in vectors)/max(1,len(vectors)))
        return self._vectors[key]

    def lexical_score(self, index, qt, key, df):
        columns, averages = self._field_vectors[key]
        by_field = collections.defaultdict(list)
        weights={term:math.log(1+(len(self.records)-df[term]+.5)/(df[term]+.5)) for term in sorted(qt)}
        total=math.fsum(weights.values()) or 1
        for field,weight,v,size in columns[index]:
            # 各字段有固定得分上限，重复词和长正文不能压过能力合同。
            score=math.fsum(weights[term] for term in sorted(qt & v.keys()))/total
            by_field[field].append(weight*score)
        # 每个别名独立归一化并取最佳值，新增无关别名不会拉长整条 API。
        return math.fsum(max(values,default=0) for values in by_field.values())

    def allowed(self,r,side,kind,scope):
        return (scope=='all' or r['scope']==scope) and (side=='any' or r['side'] in (side,'common')) and (kind in ('all','auto') or r['kind']==kind)

    def constraint_reason(self,r,intent,key):
        p=self.profiles[r['id']]
        if intent['target'] and 'targets' in p['verified'] and p['targets'] and intent['target'] not in p['targets']:return '对象类别不匹配'
        if 'targets' in p['verified'] and set(intent['exclude_targets']) & set(p['targets']):return '属于明确排除的对象类别'
        if intent['operation']!='any' and 'operation' in p['verified'] and not supports_operation(p,intent['operation']):return '操作类型不匹配或尚未核实'
        if intent['extent']!='any' and 'extent' in p['verified'] and p['extent']!=intent['extent']:return '作用范围不匹配或尚未核实'
        if intent['batch']!='any' and 'batch' in p['verified'] and p['batch']!=intent['batch']:return '批量能力不匹配或尚未核实'
        facts=r.get('annotation',{}).get('facts',{})
        concepts=self.knowledge.identify(intent['positive_query'],intent.get('concepts',[]),kind=intent['kind'])
        if self.knowledge.conflicts(r,concepts):return '已核验能力与请求概念冲突'
        for cid in concepts:
            for field,value in self.knowledge.concepts[cid].get('requires_facts',{}).items():
                if field not in facts:return '待核验能力条件：'+self.knowledge.concepts[cid]['label']
                if facts[field]!=value:return '已核验条件与请求冲突：'+self.knowledge.concepts[cid]['label']
        for field in ('action','subject','object','property','qualifiers'):
            required=intent.get(field,[]); known=facts.get('target' if field=='object' else field)
            if required and known and any(set(self.knowledge.concepts[c].get('excludes',[])+self.knowledge.concepts[c].get('role_excludes',[])) & self.knowledge.ancestors(known) for c in required):return '已核验能力角色不匹配'
        explicit_objects={c for c in intent.get('concepts',[]) if self.knowledge.concepts[c]['category']=='target'}
        known_objects=facts.get('target',[])
        if explicit_objects and known_objects and any(set(self.knowledge.concepts[c].get('excludes',[])) & self.knowledge.ancestors(known_objects) for c in explicit_objects):return '已核验作用对象与显式概念不匹配'
        text=self.positive_text[(key,r['id'])]
        if any(term.lower() in text.lower() for term in intent['exclude']):return '命中排除条件'
        for rule in facts.get('constraints',[]):
            if all(intent.get(k)==v for k,v in rule.get('when',{}).items()):
                for field,values in rule['allow'].items():
                    if intent.get(field) not in (None,'any') and intent[field] not in values:return '已核验条件不满足：'+field
        unsupported=p.get('unsupported_features',[])
        if any(term in unsupported for term in intent['must_support']) or any(term in intent['positive_query'] for term in unsupported):return '原文或标注明确不支持所要求的能力'
        if any(term.lower() not in text.lower() for term in intent['must_support']):return '尚未从能力说明核实所要求的特性'
        return None

    def ranked(self,intent,strategy='annotated'):
        key='raw' if strategy=='raw' else 'annotated';vectors,df,average=self.vectors(strategy)
        cleaned=QUERY_STOP.sub(' ',intent['positive_query']); qt=set(tokens(cleaned))
        if not qt:return [],[]
        scored=[];limited=[];query=intent['positive_query'].strip()
        exact_known=any(query.lower() in (r['name'].lower(),r['id'].lower(),r['key']) for r in self.records)
        requested = self.knowledge.identify(intent['positive_query'], intent.get('concepts', []) + sum((intent.get(k,[]) for k in ('action','subject','object','property','qualifiers')),[]),kind=intent['kind'])
        qt.update(tokens(' '.join(self.knowledge.concepts[c]['label'] for c in self.knowledge.leaves(requested))))
        for position,(r,v) in enumerate(zip(self.records,vectors)):
            if not self.allowed(r,intent['side'],intent['kind'],intent['scope']):continue
            reason=self.constraint_reason(r,intent,key)
            if reason in ('对象类别不匹配','操作类型不匹配或尚未核实','作用范围不匹配或尚未核实','属于明确排除的对象类别','批量能力不匹配或尚未核实'):continue
            exact=query.lower() in (r['name'].lower(),r['id'].lower(),r['key'])
            if exact_known and not exact:continue
            hits=qt & v.keys();score=1000 if exact else 0
            if not exact:
                score = self.lexical_score(position, qt, key, df)
                semantic = self.knowledge.score(r, requested,intent)
                if requested: score += semantic
                if intent.get('hints'):score += .02*self.knowledge.score(r,self.knowledge.ancestors(intent['hints']))
                profile = self.profiles[r['id']]
                # 未核实的分类不能删除答案，但与请求相反的推断只作为低优先级线索。
                if intent['operation'] != 'any' and profile['operation'] != 'unknown':
                    compatible = supports_operation(profile,intent['operation'])
                    if not compatible: score *= .2 if (intent['operation']=='read' or profile['operation']=='read') else .5
                if intent['target'] and profile['targets'] and intent['target'] not in profile['targets']: score *= .1
                if intent['extent'] != 'any' and profile['extent'] not in ('unknown',intent['extent']): score *= .25
                verified,inferred=self.knowledge.record_concepts(r)
                if intent['phase'] != 'any' and 'phase' in profile['verified'] and self.knowledge.primary_concepts(requested)&(verified|inferred):
                    score *= 1.2 if profile['phase']==intent['phase'] else .25
                specific = profile.get('specializations',[])
                if specific and not any(term in query for term in specific): score *= .5
                if not hits and semantic <= 0: score = 0
            evidence=[]
            for authority,phrase in self.limitations[(key,r['id'])]:
                overlap=qt & set(tokens(phrase))
                if len(overlap)>=3 or any(term in phrase for term in intent['must_support']):evidence.append((len(overlap),authority,phrase))
            # 未知特性和限制命中单独展示，不伪装成支持该能力。
            if reason:
                if (score or evidence) and reason not in ('对象类别不匹配','操作类型不匹配或尚未核实','作用范围不匹配或尚未核实','属于明确排除的对象类别','批量能力不匹配或尚未核实'):
                    best=max(evidence,default=(0,'metadata',reason));limited.append((score or float(best[0]),r,reason,best[1],best[2]))
                continue
            if score > 0:
                scored.append((score,r))
            elif evidence:
                best=max(evidence)
                if best[0]>=max(4,len(qt)*.6):limited.append((float(best[0]),r,'仅命中限制说明',best[1],best[2]))
        return sorted(scored,key=lambda x:(-x[0],x[1]['id'])), sorted(limited,key=lambda x:(-x[0],x[1]['id']))

    def supported_selection(self,intent,selection):
        """边界已命中时，不用只有背景词相关的入口填补能力缺口；搜索召回仍保留。"""
        ranked,limited=selection
        requested=self.knowledge.identify(intent['positive_query'],intent.get('concepts',[])+sum((intent.get(k,[]) for k in ('action','subject','object','property','qualifiers')),[]),kind=intent['kind'])
        core=self.knowledge.primary_concepts(requested)
        if not ranked or not core:return selection
        def supported(record):
            verified,inferred=self.knowledge.record_concepts(record)
            return bool(core & (verified|inferred))
        # 事件的取消/阶段限定不能代替触发行为；通用搜索仍可发现这些弱候选。
        if not supported(ranked[0][1]) and (intent['kind']=='event' or any(supported(entry[1]) or self.knowledge.conflicts(entry[1],core) for entry in limited)):
            return [entry for entry in ranked if supported(entry[1])],limited
        return selection

    def search(self,query,strategy='annotated',limit=5,side='any',kind='all',scope='modsdk',offset=0,**constraints):
        intent=self.normalize_intent(prepare_intent({'query':query,'side':side,'kind':kind,'scope':scope,**constraints}))
        ranked,_=self.ranked(intent,strategy);return ranked[offset:offset+limit]

    def phase_relations(self, records, side, scope):
        selected={r['id'] for r in records}; result=[]; seen=set()
        for r in records:
            if r['kind']!='event':continue
            for linked in r.get('annotation',{}).get('related',[]):
                other=self.by_id[linked]
                if linked in selected or linked in seen or other['kind']!='event' or not self.allowed(other,side,'event',scope):continue
                seen.add(linked)
                item=self.summary(other);item['match_type']='related_phase';item['related_to']=r['key']
                result.append(item)
        return result

    def permitted_dependency(self,record,intent,strategy):
        profile=self.profiles[record['id']]
        key='raw' if strategy=='raw' else 'annotated'
        return (self.allowed(record,intent['side'],'all',intent['scope'])
                and not (intent.get('read_only') and profile['operation'] not in ('read','observe'))
                and not (set(intent['exclude_targets']) & set(profile['targets']))
                and not any(term.lower() in self.positive_text[(key,record['id'])].lower() for term in intent['exclude']))

    def search_response(self,query,strategy='annotated',limit=5,side='any',kind='auto',scope='modsdk',offset=0,**constraints):
        intent=self.normalize_intent(prepare_intent({'query':query,'side':side,'kind':kind,'scope':scope,**constraints}));ranked,limited=self.ranked(intent,strategy)
        selected=ranked[offset:offset+limit]
        return {'query':query,'scope':scope,'kind':intent['kind'],'operation':intent['operation'],
                'results':[self.summary(r) for _,r in selected], 'related':self.phase_relations([r for _,r in selected],side,scope), 'limitations':[self.limitation_summary(x) for x in limited[:2]],
                'next_offset':offset+limit if len(ranked)>offset+limit else None,
                'assessment':'候选需读取详情确认；未命中不能证明平台不支持。'}

    def resolve(self,query=None,strategy='annotated',limit=8,side='any',kind='auto',scope='modsdk',plan=None,per_intent=1,**constraints):
        if plan is None:plan={'intents':[{'id':'1','query':query,'side':side,'kind':kind,'scope':scope,**constraints}]}
        if not isinstance(plan,dict) or set(plan)-{'intents','side','scope','read_only'}:raise ValueError('计划仅接受 intents、side、scope、read_only')
        raw=plan.get('intents');defaults={'side':plan.get('side',side),'scope':plan.get('scope',scope),'read_only':plan.get('read_only',False)}
        if not isinstance(raw,list) or not 1<=len(raw)<=12:raise ValueError('计划需要 1–12 个子目标')
        intents=[self.normalize_intent(prepare_intent(x,defaults)) for x in raw]
        labels=[str(x.get('id',i+1)) for i,x in enumerate(intents)]
        if len(set(labels))!=len(labels):raise ValueError('子目标 id 不能重复')
        if limit<len(intents):raise ValueError('limit 至少等于子目标数，不能静默遗漏子目标')
        selections=[self.supported_selection(x,self.ranked(x,strategy)) for x in intents];selected=[];allocated=[[] for _ in intents];prerequisites={};budget_limited=set();dependency_conflicts=set()
        def include(record, i):
            if record['id'] not in selected:
                if len(selected)>=limit:return False
                selected.append(record['id'])
            if record['key'] not in allocated[i]:allocated[i].append(record['key'])
            return True
        requested = [self.knowledge.identify(i['positive_query'], i.get('concepts', []) + sum((i.get(k,[]) for k in ('action','subject','object','property','qualifiers')),[]),kind=i['kind']) for i in intents]
        workflows = [self.knowledge.matching_recipes(c, i['side'],i['operation'],i['mode'],i) if i['kind'] in ('api','all') else [] for c,i in zip(requested,intents)]
        for i,recipes in enumerate(workflows):
            workflows[i]=[recipe for recipe in recipes if all(self.permitted_dependency(self.by_id[rid],intents[i],strategy) for step in recipe['steps'] for rid in step['ids'])]
            if recipes and not workflows[i]:dependency_conflicts.add(i)
        # 先分配已知能力链，其余子目标再分配主要候选。
        for i,(ranked,_) in enumerate(selections):
            if workflows[i]:
                for step in workflows[i][0]['steps']:
                    for rid in step['ids']:
                        if not include(self.by_id[rid],i): budget_limited.add(i)
            elif ranked:include(ranked[0][1],i)
        for i,(ranked,_) in enumerate(selections):
            if not ranked:continue
            r=ranked[0][1]
            for dep in self.profiles[r['id']].get('required_before',[]):
                other=self.by_id[dep]
                if not self.permitted_dependency(other,intents[i],strategy):
                    dependency_conflicts.add(i);continue
                if include(other,i):prerequisites.setdefault(r['key'],[]).append(other['key'])
                else:budget_limited.add(i)
        # 互补能力只由有来源的组合关系分配；词面重叠不构成接线依据。
        for rank in range(1,per_intent):
            for i,(ranked,_) in enumerate(selections):
                if len(ranked)>rank:include(ranked[rank][1],i)
        groups=[];limited_records={}
        for i,intent in enumerate(intents):
            limits=selections[i][1][:1]
            status='budget_limited' if i in budget_limited else 'candidates' if allocated[i] else 'no_capability_match'
            if not allocated[i] and any(x[2].startswith('待核验能力条件：') for x in limits):status='evidence_missing'
            if i in dependency_conflicts:status='prerequisite_conflict'
            if selections[i][0] and intent['phase']!='any':
                phase_profile=self.profiles[selections[i][0][0][1]['id']]
                if 'phase' not in phase_profile['verified'] or phase_profile['phase']!=intent['phase']:status='timing_review'
            core = {c for c in requested[i] if not self.knowledge.concepts[c].get('context_only',False)}
            known = set()
            # 替代候选与前置接口不能合并成虚假的完整能力。
            if selections[i][0]:
                known=self.knowledge.record_concepts(selections[i][0][0][1])[0]
            missing = sorted(core-known)
            coverage = 'matched' if core and not missing else 'partial' if core & known else 'unknown'
            if workflows[i]:
                recipe=workflows[i][0]
                route_known=self.knowledge.ancestors(set(recipe['concepts'])|set(recipe.get('input_concepts',[])))
                for step in recipe['steps']:
                    for rid in step['ids']:route_known.update(self.knowledge.record_concepts(self.by_id[rid])[0])
                missing=sorted((core-route_known)|(set(recipe.get('unverified_concepts',[]))&requested[i]))
                coverage='partial' if missing else recipe['status']
            missing_roles=[]
            if selections[i][0] and not workflows[i]:
                primary=self.profiles[selections[i][0][0][1]['id']]
                if intent['operation']!='any' and not set(primary['verified'])&{'operation','operations'}:missing_roles.append('operation')
            for role in ('action','subject','object','property','qualifiers'):
                required=set(intents[i].get(role,[]))
                if not required:continue
                actual=set()
                for key in allocated[i] if workflows[i] else allocated[i][:1]:
                    record=next(r for r in self.records if r['key']==key)
                    actual.update(record.get('annotation',{}).get('facts',{}).get('target' if role=='object' else role,[]))
                if required-self.knowledge.ancestors(actual):missing_roles.append(role)
            # 已核验对象/范围是独立合同维度；没有事实不能宣称完整覆盖。
            if selections[i][0] and not workflows[i]:
                facts=selections[i][0][0][1].get('annotation',{}).get('facts',{})
                for field, fact in (('target','targets'),('extent','extent'),('batch','batch')):
                    if intent.get(field) not in (None,'any') and not facts.get(fact):missing_roles.append(field)
                for cid in requested[i]:
                    for field,value in self.knowledge.concepts[cid].get('requires_facts',{}).items():
                        if facts.get(field)!=value:missing_roles.append(field)
            if workflows[i]:
                contract=workflows[i][0].get('contract',{})
                for field in ('target','extent','batch','target_scope'):
                    if intent.get(field) not in (None,'any') and contract.get(field)!=intent[field]:missing_roles.append(field)
            if (missing_roles or intent['requirements']) and coverage=='matched':coverage='partial'
            if coverage=='unknown':coverage='query_incomplete' if not core else 'evidence_missing'
            if intent.get('needs_decomposition') and intent['mode']!='workflow':
                status='split_required'
            elif intent['mode']=='workflow' and not workflows[i]:status='workflow_unverified'
            if coverage != 'matched' and status == 'candidates': status = 'needs_review'
            group={'id':labels[i], 'candidates':allocated[i], 'status':status, 'coverage':coverage}
            if missing: group['missing_concepts']=missing
            if missing_roles: group['missing_roles']=sorted(set(missing_roles))
            if intent['requirements']:group['missing_requirements']=intent['requirements']
            if selections[i][0]:
                verified,inferred=self.knowledge.record_concepts(selections[i][0][0][1])
                group['evidence']={'verified':sorted(core&verified),'textual':sorted((core-verified)&inferred)}
            if limits and coverage != 'matched':
                group['limitations']=[entry[1]['key'] for entry in limits]
                for entry in limits:limited_records[entry[1]['key']]=self.limitation_summary(entry)
            groups.append(group)
        related=[];related_seen=set();selected_keys={self.by_id[rid]['key'] for rid in selected}
        for i,(ranked,_) in enumerate(selections):
            if not ranked:continue
            for item in self.phase_relations([ranked[0][1]],intents[i]['side'],intents[i]['scope']):
                if item['id'] not in related_seen and item['id'] not in selected_keys:
                    related_seen.add(item['id']);related.append(item)
        return {'intents':groups,'results':[self.summary(self.by_id[i]) for i in selected], 'related':related,
                'limitations':list(limited_records.values()),'prerequisites':prerequisites,
                'workflows':[{'intent':labels[i], 'id':w['id'], 'label':w['label'], 'steps':[{'label':step['label'],'ids':[self.by_id[rid]['key'] for rid in step['ids']]} for step in w['steps']], 'guides':w['guides'], 'cautions':w['cautions']} for i,ws in enumerate(workflows) for w in ws[:1]],
                'unresolved_intents':[g['id'] for g in groups if g['status']!='candidates'],
                'assessment':'按子目标分配的候选，不代表需求已验证或可直接实现；须核对参数、限制和前置条件。'}

    def summary(self,r):
        result={k:r[k] for k in ('name','kind','side','documentation_status')}
        result.update({'id':r['key'],'description':r['description'][:160],'match_type':'capability_text','operation':self.profiles[r['id']]['operation']})
        if r['kind']=='event':result['phase']=self.profiles[r['id']]['phase']
        if r.get('class_path'):result['component']=r['class_path'].split('.')[-1]
        if '@' in r['id']:result['document']=r['doc_path']
        if r.get('annotation'):result['tags']=r['annotation'].get('tags',[])
        return result

    def limitation_summary(self,entry):
        _,r,reason,authority,text=entry
        return {'id':r['key'],'name':r['name'],'kind':r['kind'],'side':r['side'],'match_type':'limitation',
                'reason':reason,'evidence':text[:350],'evidence_source':authority,'source_url':r['source_url']}

    def detail(self, entry_ids, side='any', scope='modsdk', part='contract', examples=1):
        results = []
        for entry_id in entry_ids:
            matches = [r for r in self.records if (entry_id in (r['id'], r['key']) or r['name'].lower() == entry_id.lower()) and self.allowed(r, side, 'all', scope)]
            if len(matches) != 1:
                results.append({'query': entry_id, 'error': 'ambiguous' if matches else 'not_found',
                                'candidates': [self.summary(r) for r in matches]})
                continue
            record = matches[0]
            value = {k: record.get(k) for k in ('id', 'name', 'kind', 'side', 'version', 'documentation_status', 'class_path', 'source_url', 'doc_path', 'line', 'source_sha256')}
            if part == 'raw':
                value['raw'] = record['raw']
            elif part == 'examples':
                value['examples'] = record['examples']
            elif part == 'remarks':
                value['remarks'] = record['remarks']
            else:
                value.update({k: record[k] for k in ('description', 'parameters', 'returns', 'remarks', 'enum_refs')})
                value['examples'] = record['examples'][:examples]
                value['more_examples'] = max(0, len(record['examples']) - examples)
                if record.get('annotation'):
                    value['capabilities'] = record['annotation'].get('facts', {})
                    value['developer_notes'] = {k: record['annotation'][k] for k in ('authority', 'usage', 'cautions', 'related') if k in record['annotation']}
                    value['developer_notes']['related'] = [self.by_id[i]['key'] for i in record['annotation'].get('related', [])]
            results.append(value)
        return {'results': results}


def input_signature(root):
    paths = [root / 'knowledge' / name for name in ('annotations.json','concepts.json','recipes.json')] + [root / 'scripts/api_knowledge.py']
    for base in ('mcdocs/1-ModAPI', 'mcdocs/3-PresetAPI', 'mcguide', 'mconline'):
        paths.extend(p for p in (root / 'docs' / base).rglob('*.md')
                     if base.startswith('mcdocs') or re.search(r'预设|preset', str(p), re.I))
    return digest(json.dumps([(str(p.relative_to(root)), p.stat().st_size, p.stat().st_mtime_ns) for p in sorted(paths) if p.exists()]))


def load(root=ROOT):
    file = root / '.api-index/index.json'
    if not file.exists():
        build(root)
    index = json.loads(file.read_text(encoding='utf8'))
    if index.get('schema_version') != SCHEMA_VERSION or index.get('input_signature') != input_signature(root):
        build(root)
        index = json.loads(file.read_text(encoding='utf8'))
    return index


def compact_result(result, command):
    """默认只输出决策所需内容；诊断元数据由 --verbose 显式请求。"""
    def candidate(value):
        keep=('id','name','side','description','document','related_to')
        output={k:value[k] for k in keep if value.get(k) not in (None,'',[],{})}
        if output.get('description'):
            output['description']=re.split(r'[。！？\n]',output['description'],maxsplit=1)[0]
        if value.get('documentation_status') not in (None,'full'):output['documentation_status']=value['documentation_status']
        return output
    if command in ('search','resolve'):
        output={'results':[candidate(x) for x in result.get('results',[])]}
        if command=='resolve':
            groups=[]
            for group in result['intents']:
                item={'id':group['id'],'candidates':group['candidates']}
                state=group['status']
                if state=='needs_review':state=group['coverage']
                if state!='candidates':item['state']=state
                if group.get('missing_concepts'):item['missing']=group['missing_concepts']
                roles=group.get('missing_roles',[])
                if roles and not (roles==['operation'] and group['coverage'] in ('query_incomplete','evidence_missing')):item['missing_roles']=roles
                if group.get('missing_requirements'):item['unverified']=group['missing_requirements']
                groups.append(item)
            output['intents']=groups
        if result.get('related'):output['related']=[candidate(x) for x in result['related']]
        if result.get('limitations'):
            for entry in result['limitations']:
                lane='review' if entry.get('reason','').startswith('待核验能力条件：') else 'limitations'
                output.setdefault(lane,[]).append({k:entry[k] for k in ('id','name','reason','evidence') if entry.get(k)})
        if result.get('workflows'):output['workflows']=result['workflows']
        if result.get('next_offset') is not None:output['next_offset']=result['next_offset']
        return output
    if command=='detail':
        entries=[]
        for entry in result['results']:
            if entry.get('error'):
                entries.append({**entry,'candidates':[candidate(x) for x in entry.get('candidates',[])]});continue
            keep=('id','name','side','class_path','description','parameters','returns','remarks','enum_refs','examples','more_examples','developer_notes','part','text','offset','total_chars','next_offset')
            item={k:entry[k] for k in keep if entry.get(k) not in (None,'',[],{},0)}
            item['id']=digest(entry['id'])[:12]
            item['source']=entry['doc_path']+':'+str(entry['line'])
            if entry.get('documentation_status')!='full':item['documentation_status']=entry.get('documentation_status')
            if item.get('developer_notes'):
                notes={k:v for k,v in item['developer_notes'].items() if k!='authority' and v not in (None,'',[],{})}
                if notes:item['developer_notes']=notes
                else:item.pop('developer_notes')
            entries.append(item)
        return {'results':entries}
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--verbose', action='store_true', help='显式返回协议、匹配和来源诊断元数据')
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--max-chars', type=int, default=18000, help='输出预算；超限明确报错，不静默截断合同或备注')
    parser.add_argument('--sdk-version', default=VERSION, help='当前仅支持 3.9 快照，其他版本必须另行核验')
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('build')
    for command in ['search', 'resolve']:
        p = sub.add_parser(command); p.add_argument('query', nargs='?')
        p.add_argument('--strategy', choices=['raw', 'annotated'], default='annotated')
        p.add_argument('--offset', type=int, default=0)
        p.add_argument('--limit', type=int, default=8 if command == 'resolve' else 5)
        p.add_argument('--side', choices=['any', 'server', 'client', 'common'], default='any')
        p.add_argument('--scope', choices=['modsdk', 'preset', 'all'], default='modsdk')
        p.add_argument('--kind', choices=['auto', 'all', 'api', 'event', 'enum', 'document'], default='auto')
        p.add_argument('--operation', choices=OPERATIONS, default='any')
        p.add_argument('--target', choices=sorted(TARGETS))
        p.add_argument('--extent', choices=['any','single','many','global','dimension'], default='any')
        p.add_argument('--read-only', action='store_true')
        p.add_argument('--phase', choices=['any','before','after','change'], default='any')
        p.add_argument('--batch', choices=['any','bulk'], default='any')
        p.add_argument('--target-scope', choices=['any','local_player','other_player','all_players'], default='any')
        p.add_argument('--must-support', action='append', default=[])
        p.add_argument('--exclude-target', action='append', default=[])
        p.add_argument('--exclude', action='append', default=[])
        if command == 'resolve':
            p.add_argument('--plan-file', help='结构化子目标 JSON；- 从 stdin 读取')
            p.add_argument('--per-intent', type=int, choices=[1,2,3], default=1, help='每个子目标最多返回的候选数，默认一项')
    p = sub.add_parser('schema'); p.add_argument('query',nargs='?',help='按中文词或概念 ID 查阅词表'); p.add_argument('--all-concepts',action='store_true',help='显式展开完整词表')
    p = sub.add_parser('detail'); p.add_argument('ids', nargs='+')
    p.add_argument('--side', choices=['any', 'server', 'client', 'common'], default='any')
    p.add_argument('--scope', choices=['modsdk', 'preset', 'all'], default='modsdk')
    p.add_argument('--part', choices=['contract', 'raw', 'remarks', 'examples'], default='contract')
    p.add_argument('--examples', type=int, default=1)
    p.add_argument('--offset', type=int, default=0, help='raw/examples/remarks 分页字符偏移')
    p.add_argument('--page-chars', type=int, default=8000)
    p = sub.add_parser('section'); p.add_argument('file'); p.add_argument('selector')
    args = parser.parse_args()
    if args.sdk_version != VERSION:
        raise ValueError('当前快照仅支持 3.9；不能用它确认目标版本 ' + args.sdk_version)
    if args.command == 'build':
        result = build(args.root)
    elif args.command == 'schema':
        result = {'schema_version': SCHEMA_VERSION, 'targets': TARGETS, 'operations': list(OPERATIONS), 'extents': ['any','single','many','global','dimension'], 'phases': ['any','before','after','change'], 'batch': ['any','bulk'], 'target_scopes': ['any','local_player','other_player','all_players'], 'query_protocol': QUERY_PROTOCOL, 'intent_fields': list(INTENT_FIELDS), 'modes': ['auto','atomic','workflow'], 'field_usage': {'concepts':'必需能力；缺事实保留候选并报告缺口','hints':'可选软提示；不参与覆盖与排除','requirements':'尚未用受控字段表达的关键条件；原样返回待核验','mode':'atomic 单操作；workflow 已审流程；auto 自动候选'}, 'operations_relation': {'write': sorted(MUTATIONS)}, 'concepts': [{k:c[k] for k in ('id','label','category')} for c in load(args.root)['concepts']], 'phase_behavior': '阶段用于排序；关联事件仍在 related 返回。timing_review 表示主候选阶段未匹配，不能作为已满足需求。', 'plan': {'side': 'server', 'intents': [{'id':'a','query':'读取箱子容量','kind':'api','operation':'read','target':'block_container'}]}}
        if not args.all_concepts:
            if args.query:
                words=args.query.lower().split()
                catalog=load(args.root)['concepts']
                matched={c['id'] for c in catalog if any(word in ' '.join([c['id'],c['label'],*c['aliases']]).lower() for word in words)}
                result['concepts']=[c for c in result['concepts'] if c['id'] in matched]
            else:
                result.pop('concepts')
                result['concept_lookup']='schema <概念词>；完整词表用 --all-concepts'
    elif args.command == 'section':
        file = (args.root / 'docs' / args.file).resolve()
        if (args.root / 'docs').resolve() not in file.parents:
            raise ValueError('文档路径越界')
        result = section_content(file.read_text(), args.selector)
    else:
        search = Search(load(args.root))
        if args.command == 'detail':
            result = search.detail(args.ids, args.side, args.scope, args.part, max(0, args.examples))
            if args.part in ('raw', 'examples', 'remarks'):
                for item in result['results']:
                    if args.part not in item: continue
                    content = item.pop(args.part)
                    if not isinstance(content, str): content = json.dumps(content, ensure_ascii=False)
                    offset = max(0,args.offset); end = offset + max(100,min(16000,args.page_chars))
                    item['part'] = args.part; item['text'] = content[offset:end]
                    item['offset'] = offset; item['total_chars'] = len(content)
                    item['next_offset'] = end if end < len(content) else None
        else:
            constraints = {'operation':args.operation, 'target':args.target, 'extent':args.extent,
                           'read_only':args.read_only, 'target_scope':args.target_scope, 'phase':args.phase, 'batch':args.batch,
                           'exclude_targets':args.exclude_target, 'exclude':args.exclude, 'must_support':args.must_support}
            if args.command == 'resolve':
                plan_file = args.plan_file
                if plan_file and args.query: raise ValueError('query 和 --plan-file 只能选择一项')
                plan = json.loads(sys.stdin.read() if plan_file == '-' else Path(plan_file).read_text()) if plan_file else None
                if plan_file and (args.kind!='auto' or args.operation!='any' or args.target or args.extent!='any' or args.read_only or args.target_scope!='any' or args.phase!='any' or args.batch!='any' or args.exclude_target or args.exclude or args.must_support):
                    raise ValueError('使用计划时，请将操作和对象等约束写入 JSON 子目标，不混用文本查询过滤参数')
                if not 1<=args.limit<=24:raise ValueError('resolve 的 limit 必须为 1–24')
                result = search.resolve(args.query,args.strategy,args.limit,args.side,args.kind,args.scope,plan,args.per_intent,**constraints)
            else:
                result = search.search_response(args.query,args.strategy,max(1,min(20,args.limit)),args.side,args.kind,args.scope,max(0,args.offset),**constraints)
    if args.verbose and args.command!='build':
        result['runtime']={'query_protocol':QUERY_PROTOCOL,'corpus_sha256':load(args.root)['corpus_sha256']}
    if not args.verbose: result = compact_result(result,args.command)
    encoded = json.dumps(result, ensure_ascii=False, separators=(',', ':'))
    if len(encoded) > max(500,args.max_chars):
        raise ValueError('输出需要 {} 字符，超过预算 {}。减少 limit/批量数、--examples 0，或用 --part remarks/examples/raw --page-chars 分页；必要时明确提高 --max-chars。未返回残缺合同。'.format(len(encoded),args.max_chars))
    print(encoded)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError) as error:
        print(json.dumps({'error': str(error)}, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)
