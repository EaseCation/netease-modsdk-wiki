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
import unicodedata
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
VERSION = '3.9'
SIDE_NAMES = {'server': '服务端', 'client': '客户端', 'common': '通用'}
SCHEMA_VERSION = 1


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
                    children = [s for s in sections if s['level'] == 3 and s['start'] > section['start'] and s['end'] <= section['end'] and plain(s['title']) in ('服务端接口', '客户端接口')]
                    for variant in children or [section]:
                        body = variant['body']
                        # 事件后附的相关接口各有参数与描述，不能覆盖主事件的合同。
                        attached = next((h for h in headings(body) if h['title'] == '相关接口'), None)
                        if attached:
                            body = ''.join(body.splitlines(keepends=True)[:attached['start']])
                        lead_body = body[:body.find('描述')] if '描述' in body else body
                        class_path = re.search(r'method in\s+([\w.]+)', lead_body)
                        class_path = class_path[1] if class_path and not is_event else ''
                        parsed = fields(body)
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
        raise ValueError('索引标识冲突，需要显式区分文档变体')
    return records, docs


def build(root=ROOT):
    records, docs = read_records(root)
    sidecar = root / 'knowledge/annotations.json'
    annotations = json.loads(sidecar.read_text()) if sidecar.exists() else {'entries': [], 'capabilities': []}
    by_id = {r['id']: r for r in records}
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
        if not 3 <= len(annotation['tags']) <= 6 or len(set(annotation['tags'])) != len(annotation['tags']) or any(not re.fullmatch(r'[\u4e00-\u9fff]{1,12}', t) for t in annotation['tags']):
            raise ValueError('标签须为 3–6 个不重复的中文基础能力词：' + annotation['id'])
        for linked in annotation.get('related', []):
            if linked not in by_id:
                raise ValueError('关联目标不存在：' + linked)
        record['annotation'] = annotation
        notes[record['id']] = {**annotation, 'name': record['name'], 'side': record['side'], 'doc_path': record['doc_path'],
                               'heading_line': record['heading_line'], 'wiki_url': record['wiki_url'],
                               'related_entries': [{'name': by_id[i]['name'], 'side': by_id[i]['side'], 'url': by_id[i]['wiki_url']} for i in annotation.get('related', [])]}
    for capability in annotations.get('capabilities', []):
        for entry_id in capability['entries']:
            if entry_id not in by_id:
                raise ValueError('能力索引目标不存在：' + entry_id)
    corpus_hash = digest(json.dumps({'docs': docs, 'annotations': annotations}, ensure_ascii=False, sort_keys=True))
    index = {'schema_version': SCHEMA_VERSION, 'version': VERSION, 'snapshot_note': 'GitHub 3.8 基础文档及官网 3.9 补充快照；不代表全部 API 的引入版本',
             'corpus_sha256': corpus_hash, 'input_signature': input_signature(root), 'source_files': docs, 'records': records, 'capabilities': annotations.get('capabilities', [])}
    output = root / '.api-index'; output.mkdir(exist_ok=True)
    (output / 'index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
    (output / 'notes.json').write_text(json.dumps(notes, ensure_ascii=False, indent=2), encoding='utf8')
    public = root / 'docs/public/ai'; public.mkdir(parents=True, exist_ok=True)
    packed = json.dumps(index, ensure_ascii=False, separators=(',', ':')).encode()
    (public / 'index.json.gz').write_bytes(gzip.compress(packed, mtime=0))
    manifest = {'schema_version': SCHEMA_VERSION, 'version': VERSION, 'corpus_sha256': corpus_hash,
                'index_sha256': digest((public / 'index.json.gz').read_bytes()), 'records': len(records),
                'scopes': dict(collections.Counter(r['scope'] for r in records)), 'annotated': len(notes),
                'index_only': sum(r['documentation_status'] == 'index_only' for r in records)}
    (public / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf8')
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


class Search:
    def __init__(self, index):
        self.index = index
        self.records = index['records']
        self.by_id = {r['id']: r for r in self.records}
        self._vectors = {}

    def vectors(self, strategy):
        key = 'raw' if strategy == 'raw' else 'annotated'
        if key in self._vectors:
            return self._vectors[key]
        vectors, frequencies = [], collections.Counter()
        for record in self.records:
            fields_to_index = [(record['name'], 7), (record['description'], 3),
                               (record['class_path'], 1), (record['remarks'], 0.7),
                               (json.dumps(record['parameters'], ensure_ascii=False), 0.7)]
            if key == 'annotated':
                a = record.get('annotation', {})
                fields_to_index += [(' '.join(a.get('tags', []) + a.get('aliases', [])), 5),
                                    (' '.join(a.get('questions', [])), 3), (a.get('usage', ''), 2)]
            counter = collections.Counter()
            for value, weight in fields_to_index:
                for token, count in collections.Counter(tokens(value)).items():
                    counter[token] += min(count, 3) * weight
            vectors.append(counter); frequencies.update(counter.keys())
        average = sum(sum(v.values()) for v in vectors) / max(len(vectors), 1)
        self._vectors[key] = vectors, frequencies, average
        return self._vectors[key]

    def allowed(self, record, side, kind, scope):
        return (scope == 'all' or record['scope'] == scope) and (side == 'any' or record['side'] in (side, 'common')) and (kind == 'all' or record['kind'] == kind)

    def search(self, query, strategy='annotated', limit=5, side='any', kind='all', scope='modsdk', offset=0):
        if not query.strip():
            return []
        query_tokens = set(tokens(query)); vectors, df, average = self.vectors(strategy)
        scored = []
        exact_known = any(r['name'].lower() == query.strip().lower() for r in self.records)
        for record, vector in zip(self.records, vectors):
            if (exact_known and record['name'].lower() != query.strip().lower()) or not self.allowed(record, side, kind, scope):
                continue
            exact = record['name'].lower() == query.strip().lower() or record['id'] == query
            score = 1000 if exact else 0
            hits = query_tokens & vector.keys()
            for token in hits:
                tf = vector[token]
                idf = math.log(1 + (len(vectors) - df[token] + .5) / (df[token] + .5))
                score += idf * tf * 2.2 / (tf + 1.2 * (.25 + .75 * sum(vector.values()) / average))
            if not exact and len(hits) < 2 and not any(t == query.lower() for t in hits):
                continue
            if strategy != 'raw':
                annotation = record.get('annotation', {})
                phrases = annotation.get('aliases', []) + annotation.get('questions', [])
                if any(query.strip().lower() == phrase.lower() for phrase in phrases):
                    score += 40
                elif any(len(phrase) >= 4 and phrase.lower() in query.lower() for phrase in phrases):
                    score += 12
            if score:
                scored.append((score, record))
        return sorted(scored, key=lambda x: (-x[0], x[1]['id']))[offset:offset + limit]

    def resolve(self, query, strategy='coverage', limit=8, side='any', kind='all', scope='modsdk'):
        ranked = self.search(query, strategy, max(limit, 20), side, kind, scope)
        groups, picked = [], []
        required_by_group = {}
        if strategy == 'coverage' and not any(r['name'].lower() == query.strip().lower() for _, r in ranked):
            for cap in self.index.get('capabilities', []):
                hits = [term for term in cap['triggers'] if term.lower() in query.lower()]
                if not hits or (cap.get('requires_any') and not any(t in query for t in cap['requires_any'])):
                    continue
                if cap.get('exclude') and any(term in query for term in cap['exclude']):
                    continue
                candidates = [i for i in cap['entries'] if self.allowed(self.by_id[i], side, kind, scope)]
                if candidates:
                    groups.append({'capability': cap['label'], 'candidates': candidates})
                    required_by_group[cap['label']] = candidates[:cap.get('pick', 1)]
                    picked.extend(required_by_group[cap['label']])
        ranked_ids = [r['id'] for _, r in ranked]
        selected = list(dict.fromkeys(picked + ranked_ids))[:limit]
        return {'query': query, 'scope': scope, 'side': side, 'strategy': strategy,
                'groups': [{'capability': g['capability'], 'candidates': [self.by_id[i]['key'] for i in g['candidates']]} for g in groups],
                'results': [self.summary(self.by_id[i]) for i in selected],
                'uncovered_groups': [g['capability'] for g in groups if not all(i in selected for i in required_by_group[g['capability']])],
                'coverage_note': '规则覆盖仅限已标注能力；未命中的需求不能视为已覆盖。'}

    def summary(self, r):
        result = {k: r[k] for k in ('name', 'kind', 'side', 'description', 'documentation_status')}
        result['id'] = r['key']
        result['description'] = result['description'][:160]
        if r.get('class_path'):
            result['component'] = r['class_path'].split('.')[-1]
        if '@' in r['id']:
            result['document'] = r['doc_path']
        if r.get('annotation'):
            result['tags'] = r['annotation'].get('tags', [])
        return result

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
                    value['developer_notes'] = {k: record['annotation'][k] for k in ('authority', 'usage', 'cautions', 'related') if k in record['annotation']}
                    value['developer_notes']['related'] = [self.by_id[i]['key'] for i in record['annotation'].get('related', [])]
            results.append(value)
        return {'results': results}


def input_signature(root):
    paths = [root / 'knowledge/annotations.json', root / 'scripts/api_knowledge.py']
    for base in ('mcdocs/1-ModAPI', 'mcdocs/3-PresetAPI', 'mcguide', 'mconline'):
        paths.extend(p for p in (root / 'docs' / base).rglob('*.md')
                     if base.startswith('mcdocs') or re.search(r'预设|preset', str(p), re.I))
    return digest(json.dumps([(str(p.relative_to(root)), p.stat().st_size, p.stat().st_mtime_ns) for p in sorted(paths) if p.exists()]))


def load(root=ROOT):
    file = root / '.api-index/index.json'
    if not file.exists():
        build(root)
    index = json.loads(file.read_text(encoding='utf8'))
    if index.get('input_signature') != input_signature(root):
        build(root)
        index = json.loads(file.read_text(encoding='utf8'))
    return index


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--max-chars', type=int, default=18000, help='输出预算；超限明确报错，不静默截断合同或备注')
    parser.add_argument('--sdk-version', default=VERSION, help='当前仅支持 3.9 快照，其他版本必须另行核验')
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('build')
    for command in ['search', 'resolve']:
        p = sub.add_parser(command); p.add_argument('query')
        p.add_argument('--strategy', choices=['raw', 'annotated', 'coverage'], default='coverage' if command == 'resolve' else 'annotated')
        p.add_argument('--offset', type=int, default=0)
        p.add_argument('--limit', type=int, default=8 if command == 'resolve' else 5)
        p.add_argument('--side', choices=['any', 'server', 'client', 'common'], default='any')
        p.add_argument('--scope', choices=['modsdk', 'preset', 'all'], default='modsdk')
        p.add_argument('--kind', choices=['all', 'api', 'event', 'enum', 'document'], default='all')
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
        elif args.command == 'resolve':
            result = search.resolve(args.query, args.strategy, max(1, min(20, args.limit)), args.side, args.kind, args.scope)
        else:
            result = {'query': args.query, 'scope': args.scope, 'results': [search.summary(r) for _, r in search.search(args.query, args.strategy, max(1, min(20, args.limit)), args.side, args.kind, args.scope, max(0, args.offset))], 'offset': max(0, args.offset), 'next_offset': max(0, args.offset) + max(1, min(20, args.limit))}
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
