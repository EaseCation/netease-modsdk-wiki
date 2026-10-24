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
SCHEMA_VERSION = 2


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
    annotations = json.loads(sidecar.read_text()) if sidecar.exists() else {'entries': []}
    if annotations.get('schema_version') != SCHEMA_VERSION:
        raise ValueError('标注协议与查询引擎不匹配，请使用配套最新版')
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
        for linked in annotation.get('related', []) + annotation.get('retrieval', {}).get('required_before', []):
            if linked not in by_id:
                raise ValueError('关联目标不存在：' + linked)
        record['annotation'] = annotation
        notes[record['id']] = {**annotation, 'name': record['name'], 'side': record['side'], 'doc_path': record['doc_path'],
                               'heading_line': record['heading_line'], 'wiki_url': record['wiki_url'],
                               'related_entries': [{'name': by_id[i]['name'], 'side': by_id[i]['side'], 'url': by_id[i]['wiki_url']} for i in annotation.get('related', [])]}
    for record in records:
        override=record.get('annotation',{}).get('retrieval',{})
        if set(override)-{'targets','operation','extent','local_inventory_only','unsupported_features','required_before'}:
            raise ValueError('未知检索事实字段：'+record['id'])
        profile=retrieval_profile(record)
        if any(t not in TARGETS for t in profile['targets']) or profile['operation'] not in set(OPERATIONS)-{'any'}|{'unknown'} or profile['extent'] not in ('single','many','global','dimension','unknown'):
            raise ValueError('检索事实格式无效：'+record['id'])
        for dep in profile.get('required_before',[]):
            if dep not in record.get('annotation',{}).get('source_dependencies',{}):
                raise ValueError('必需前置缺少来源哈希：'+record['id'])
    def visit_dependencies(entry_id, chain):
        if entry_id in chain:raise ValueError('必需前置存在循环：'+entry_id)
        for dep in retrieval_profile(by_id[entry_id]).get('required_before',[]):visit_dependencies(dep,chain|{entry_id})
    for entry_id in by_id:visit_dependencies(entry_id,set())
    corpus_hash = digest(json.dumps({'docs': docs, 'annotations': annotations}, ensure_ascii=False, sort_keys=True))
    index = {'schema_version': SCHEMA_VERSION, 'version': VERSION, 'snapshot_note': 'GitHub 3.8 基础文档及官网 3.9 补充快照；不代表全部 API 的引入版本',
             'corpus_sha256': corpus_hash, 'input_signature': input_signature(root), 'source_files': docs, 'records': records}
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
    text = text.replace('反序列化', ' deserialize ').replace('序列化', ' serialize ')
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
    path, name, cls = record['doc_path'], record['name'], record.get('class_path', '')
    targets = set(); extent = 'unknown'
    if '/接口/实体/' in path: targets.add('entity'); extent = 'single'
    if '/接口/玩家/' in path: targets.add('player'); extent = 'single'
    if 'Player' in name: targets.add('player')
    if '/接口/世界/' in path: targets.add('world')
    if '/世界/实体管理.md' in path: targets.add('entity')
    if '/通用/事件.md' in path: targets.add('communication')
    if '/通用/工具.md' in path and name in ('AddTimer','AddRepeatedTimer','CancelTimer'): targets.add('timer'); extent='single'
    if '/接口/方块/' in path: targets.add('block')
    if '/玩家/背包.md' in path:
        targets.add('player_inventory')
        if name in ('GetPlayerItem','GetPlayerAllItems','GetCarriedItem','GetOffhandItem'):targets.add('player_equipment')
        if name in ('GetCarriedItem','GetOffhandItem') or 'Fish' in name:targets.discard('player_inventory')
    if '/方块/容器.md' in path: targets.add('block_container'); extent = 'single'
    if '/玩家/摄像机.md' in path: targets.add('camera'); extent = 'single'
    if '/自定义UI/' in path or path.endswith('/原生UI.md'): targets.add('ui'); extent = 'single'
    if 'PaperDoll' in cls or name in ('SetUiEntity', 'SetUiModel', 'SetUiModelScale'): targets.add('ui_model')
    if '/虚拟世界/' in path: targets.add('virtual_world')
    if path == 'mcdocs/1-ModAPI/接口/模型.md': targets.add('model')
    if '/特效/微软粒子.md' in path: targets.add('particle_bedrock'); extent = 'single'
    if '/特效/粒子.md' in path: targets.add('particle_netease'); extent = 'single'
    if '/特效/序列帧.md' in path: targets.add('frame_effect'); extent = 'single'
    if path.endswith('/物理.md'): targets.add('physics')
    if path.endswith('/音效.md'): targets.add('sound'); extent = 'single'
    if 'AttrComp' in cls: targets.add('attribute')
    if 'AttrComp' in cls and 'Modifier' in name: targets.add('attribute_modifier')
    if '/玩家/权限.md' in path or ('Permission' in name and '/世界/指令.md' in path): targets.add('permissions')
    if name in ('GetPlayerGameType', 'SetPlayerGameType', 'GetGameType', 'SetDefaultGameType', 'LockGameType', 'IsLockGameType'): targets.add('game_mode')
    if name in ('GetPlayerRespawnPos', 'SetPlayerRespawnPos'): targets.add('player_respawn'); extent = 'single'
    if name in ('GetSpawnPosition', 'GetSpawnDimension', 'SetSpawnDimensionAndPosition'): targets.add('world_spawn'); extent = 'global'
    if path.endswith('/世界/时间.md'):
        local = 'Local' in name; targets.add('dimension_time' if local else 'world_time'); extent = 'dimension' if local else 'global'
    if path.endswith('/世界/天气.md'):
        local = 'Dimension' in name; targets.add('dimension_weather' if local else 'world_weather'); extent = 'dimension' if local else 'global'
    if path.endswith('/世界/地图.md') and ('Chunk' in name or name in ('SetAddArea','DeleteArea','DeleteAllArea','GetAllAreaKeys')): targets.add('chunk')
    if name in ('GetName','SetName','SetAlwaysShowName','SetNameDeeptest','SetShowName','IsShowName','HideNameTag','IsHideNameTag'): targets.add('entity_name')
    if name in ('SetPersistence','SetPersistent','IsPersistent') or '/世界/实体管理.md' in path and name in ('DestroyEntity','DestroyClientEntity','KillEntity','IsEntityAlive'): targets.add('entity_lifetime')
    if name in ('getEntitiesOrBlockFromRay','CanSee','CheckBlockToPos','GetBlockClip','GetBlockCollision'): targets.add('world_ray')
    if '/方块/方块调色板.md' in path or '/世界/方块组合.md' in path and name != 'CreateMicroBlockResStr': targets.add('block_palette')
    if name in ('DeleteAllArea','HideNameTag','IsHideNameTag','SetDefaultGameType','GetGameType','LockGameType','IsLockGameType','GetLoadActors'): extent = 'global'
    if name in ('DeleteArea','SetAddArea','CheckChunkState'): extent = 'single'
    if name in ('RemoveByName','StopCustomMusic','SetCustomMusicLoop'): extent = 'many'
    if name in ('SetPopupNotice','SetTipMessage'): extent = 'global' if record['side']=='server' else 'single'
    op_name = re.sub(r'^(?:VirtualWorld|Model|Camera)(?=(?:Create|Destroy|Get|Set|Play|Stop|Remove|Rotate|Move|Look|Toggle|Is|Register|Cancel|Update))', '', name)
    operation = 'unknown'
    if READ_PREFIX.match(op_name) or re.match(r'^(?:as[A-Z]|Detect|MayPlace)', op_name): operation='read'
    elif re.match(r'^(?:Remove|Delete|Destroy|Clear|Clean|Unregister|UnRegister|UnListen)',op_name): operation='delete'
    elif re.match(r'^(?:Add|Create|Spawn|Register)',op_name): operation='create'
    elif op_name.startswith('Pause') or record['description'].startswith('暂停'): operation='pause'
    elif op_name.startswith('Resume'): operation='resume'
    elif re.match(r'^(?:Stop|Cancel|End)',op_name): operation='stop'
    elif re.match(r'^(?:Play|Replay|Start|Begin|Emit|Swing)',op_name): operation='play'
    elif re.match(r'^(?:Set|Reset|Change|Update|Enable|Disable|Hide|Show|Lock|Unlock|UnLock|Bind|UnBind|Unbind|Depart|UnDepart|Toggle|Render|Rotate|Move|Look)',op_name): operation='set'
    elif WRITE_PREFIX.match(op_name): operation='write'
    if name in ('AddPlayerExperience','AddPlayerLevel','AddForce','AddForceAtPos','AddForceAtPosLocal','GetUserDataInEvent'):operation='set'
    if name=='SetAddArea':operation='create'
    if name.startswith('Serialize'):operation='read'
    if name.startswith('Deserialize'):operation='set'
    if record['kind']=='event':operation='observe'

    if record['kind'] in ('enum','document'): operation = 'read'
    specialized=[]
    if 'block_container' in targets:
        for term in ('酿造台','熔炉','末影箱','合成容器','开放容器'):
            if term in record['description']:specialized.append(term)
    phase='unknown'
    if record['kind']=='event':
        phase='before' if re.search(r'Before|Will|Try|Intend',name) or re.search('之前|即将',record['description']) else 'after' if re.search(r'After|Finish',name) or '之后' in record['description'] else 'change'
    batch='bulk' if re.search(r'批量|所有|全部|列表', record['description']) or re.search(r'list|array',record.get('returns',{}).get('type',''),re.I) else 'unknown'
    profile = {'targets':sorted(targets),'operation':operation,'extent':extent,'specializations':specialized,'phase':phase,'batch':batch}
    profile.update(record.get('annotation', {}).get('retrieval', {}))
    return profile


def prepare_intent(intent, defaults=None):
    if not isinstance(intent, dict): raise ValueError('子目标必须为对象')
    allowed = {'id','query','side','scope','kind','operation','target','extent','read_only','exclude_targets','exclude','must_support','target_scope','phase','batch'}
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
    value.setdefault('side','any'); value.setdefault('scope','modsdk'); value.setdefault('kind','auto')
    value.setdefault('operation','any'); value.setdefault('target',None); value.setdefault('extent','any'); value.setdefault('target_scope','any'); value.setdefault('phase','any'); value.setdefault('batch','any')
    if value['kind']=='auto': value['kind']='event' if re.search(r'(?:监听|触发|发生).*(?:事件)|引擎事件', positive) else 'all'
    if value.get('read_only') or re.search(r'只读|仅(?:查询|读取)|只(?:读取|查询|检查)', query) and not re.search(r'设置|修改|添加|删除|创建|写入|开启|关闭', positive):
        desired='observe' if value['kind']=='event' else 'read'
        if value['operation'] not in ('any',desired): raise ValueError('read_only 与写入操作冲突')
        value['operation']=desired
    if value['operation']=='any' and value['kind']!='event':
        reading = bool(re.search(r'读取|获取|查询|检查|判断', positive)); writing = bool(re.search(r'设置|修改|添加|移除|删除|创建|开启|关闭|切换|播放|停止|恢复|注册|撤销|写入|启动|禁止|允许', positive))
        if reading != writing: value['operation']='read' if reading else 'write'
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
    for key in ('exclude_targets','exclude','must_support'):
        vals=value.get(key,[])
        if not isinstance(vals,list) or any(not isinstance(v,str) or not v.strip() for v in vals):raise ValueError(key+' 必须为非空字符串组成的数组')
        value[key]=vals
    if any(t not in TARGETS for t in value['exclude_targets']):raise ValueError('exclude_targets 包含未知对象类别')
    if 'read_only' in value and not isinstance(value['read_only'],bool):raise ValueError('read_only 必须为布尔值')
    return value


class Search:
    def __init__(self, index):
        self.index = index; self.records = index['records']; self.by_id = {r['id']:r for r in self.records}
        self._vectors = {}; self.profiles = {r['id']:retrieval_profile(r) for r in self.records}
        self.limitations = {}; self.positive_text = {}

    def vectors(self, strategy):
        key = 'raw' if strategy=='raw' else 'annotated'
        if key in self._vectors:return self._vectors[key]
        vectors=[]; df=collections.Counter()
        for r in self.records:
            fields=[(r['name'],7,'official'),(r['description'],3,'official'),(r['class_path'],.5,'official'),
                    (r['remarks'],.5,'official'),(json.dumps(r['parameters'],ensure_ascii=False),.4,'official')]
            if key=='annotated':
                a=r.get('annotation',{})
                fields += [(' '.join(a.get('tags',[])+a.get('aliases',[])),5,'annotation'),(' '.join(a.get('questions',[])),3,'annotation'),(a.get('usage',''),2,'annotation')]
            vector=collections.Counter(); limits=[]; positives=[]
            for text,weight,authority in fields:
                positive, negative = evidence_parts(text); positives.append(positive)
                limits.extend((authority,s) for s in negative)
                for token,count in collections.Counter(tokens(positive)).items():vector[token]+=min(count,3)*weight
            if key=='annotated':limits.extend(('annotation',s) for s in r.get('annotation',{}).get('cautions',[]))
            self.limitations[(key,r['id'])]=limits; self.positive_text[(key,r['id'])]=' '.join(positives)
            vectors.append(vector); df.update(vector.keys())
        average=sum(sum(v.values()) for v in vectors)/max(1,len(vectors))
        self._vectors[key]=(vectors,df,average);return self._vectors[key]

    def allowed(self,r,side,kind,scope):
        return (scope=='all' or r['scope']==scope) and (side=='any' or r['side'] in (side,'common')) and (kind in ('all','auto') or r['kind']==kind)

    def constraint_reason(self,r,intent,key):
        p=self.profiles[r['id']]
        if intent['target'] and intent['target'] not in p['targets']:return '对象类别不匹配'
        if set(intent['exclude_targets']) & set(p['targets']):return '属于明确排除的对象类别'
        if intent['operation']!='any' and not (p['operation'] in MUTATIONS if intent['operation']=='write' else p['operation']==intent['operation']):return '操作类型不匹配或尚未核实'
        if intent['extent']!='any' and p['extent']!=intent['extent']:return '作用范围不匹配或尚未核实'
        if intent['batch']!='any' and p['batch']!=intent['batch']:return '批量能力不匹配或尚未核实'
        text=self.positive_text[(key,r['id'])]
        if any(term.lower() in text.lower() for term in intent['exclude']):return '命中排除条件'
        if p.get('local_inventory_only') and intent['target']=='player_inventory' and intent['target_scope'] in ('other_player','all_players'):return '客户端完整背包读取仅支持本地玩家'
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
        for r,v in zip(self.records,vectors):
            if not self.allowed(r,intent['side'],intent['kind'],intent['scope']):continue
            reason=self.constraint_reason(r,intent,key)
            if reason in ('对象类别不匹配','操作类型不匹配或尚未核实','作用范围不匹配或尚未核实','属于明确排除的对象类别','批量能力不匹配或尚未核实'):continue
            exact=query.lower() in (r['name'].lower(),r['id'].lower(),r['key'])
            if exact_known and not exact:continue
            hits=qt & v.keys();score=1000 if exact else 0
            for t in sorted(hits):
                tf=v[t];idf=math.log(1+(len(vectors)-df[t]+.5)/(df[t]+.5))
                score+=idf*tf*2.2/(tf+1.2*(.25+.75*sum(v.values())/average))
            if not exact and len(hits)<2 and not any(t==cleaned.strip().lower() for t in hits):score=0
            if intent['phase']!='any':
                score *= 1.6 if self.profiles[r['id']]['phase']==intent['phase'] else .65
            specific=self.profiles[r['id']].get('specializations',[])
            if specific and not any(term in query for term in specific):score *= .5
            if key=='annotated' and score:
                phrases=r.get('annotation',{}).get('aliases',[])+r.get('annotation',{}).get('questions',[])
                if any(query.lower()==p.lower() for p in phrases):score+=40
                elif any(len(p)>=4 and p.lower() in query.lower() for p in phrases):score+=12
            evidence=[]
            for authority,phrase in self.limitations[(key,r['id'])]:
                overlap=qt & set(tokens(phrase))
                if len(overlap)>=3 or any(term in phrase for term in intent['must_support']):evidence.append((len(overlap),authority,phrase))
            # 未知特性和限制命中单独展示，不伪装成支持该能力。
            if reason:
                if (score or evidence) and reason not in ('对象类别不匹配','操作类型不匹配或尚未核实','作用范围不匹配或尚未核实','属于明确排除的对象类别','批量能力不匹配或尚未核实'):
                    best=max(evidence,default=(0,'metadata',reason));limited.append((score or float(best[0]),r,reason,best[1],best[2]))
                continue
            if score:
                scored.append((score,r))
            elif evidence:
                best=max(evidence)
                if best[0]>=max(4,len(qt)*.6):limited.append((float(best[0]),r,'仅命中限制说明',best[1],best[2]))
        return sorted(scored,key=lambda x:(-x[0],x[1]['id'])), sorted(limited,key=lambda x:(-x[0],x[1]['id']))

    def search(self,query,strategy='annotated',limit=5,side='any',kind='all',scope='modsdk',offset=0,**constraints):
        intent=prepare_intent({'query':query,'side':side,'kind':kind,'scope':scope,**constraints})
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

    def search_response(self,query,strategy='annotated',limit=5,side='any',kind='auto',scope='modsdk',offset=0,**constraints):
        intent=prepare_intent({'query':query,'side':side,'kind':kind,'scope':scope,**constraints});ranked,limited=self.ranked(intent,strategy)
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
        intents=[prepare_intent(x,defaults) for x in raw]
        labels=[str(x.get('id',i+1)) for i,x in enumerate(intents)]
        if len(set(labels))!=len(labels):raise ValueError('子目标 id 不能重复')
        if limit<len(intents):raise ValueError('limit 至少等于子目标数，不能静默遗漏子目标')
        selections=[self.ranked(x,strategy) for x in intents];selected=[];allocated=[[] for _ in intents];prerequisites={};budget_limited=set();dependency_conflicts=set()
        def include(record, i):
            if record['id'] not in selected:
                if len(selected)>=limit:return False
                selected.append(record['id'])
            if record['key'] not in allocated[i]:allocated[i].append(record['key'])
            return True
        # 先给每个子目标一项，再补必需前置，最后公平分配第二候选。
        for i,(ranked,_) in enumerate(selections):
            if ranked:include(ranked[0][1],i)
        for i,(ranked,_) in enumerate(selections):
            if not ranked:continue
            r=ranked[0][1]
            for dep in self.profiles[r['id']].get('required_before',[]):
                other=self.by_id[dep]
                if (not self.allowed(other,intents[i]['side'],'all',intents[i]['scope'])
                    or (intents[i].get('read_only') and self.profiles[dep]['operation'] not in ('read','observe'))
                    or set(intents[i]['exclude_targets']) & set(self.profiles[dep]['targets'])
                    or any(term.lower() in self.positive_text[('raw' if strategy=='raw' else 'annotated',dep)].lower() for term in intents[i]['exclude'])):
                    dependency_conflicts.add(i);continue
                if include(other,i):prerequisites.setdefault(r['key'],[]).append(other['key'])
                else:budget_limited.add(i)
        for rank in range(1,per_intent):
            for i,(ranked,_) in enumerate(selections):
                if len(ranked)>rank:include(ranked[rank][1],i)
        groups=[];limited_records={}
        for i,intent in enumerate(intents):
            limits=selections[i][1][:2]
            for entry in limits:limited_records[entry[1]['key']]=self.limitation_summary(entry)
            status='budget_limited' if i in budget_limited else 'candidates' if selections[i][0] else 'no_capability_match'
            if i in dependency_conflicts:status='prerequisite_conflict'
            if selections[i][0] and intent['phase']!='any' and self.profiles[selections[i][0][0][1]['id']]['phase']!=intent['phase']:status='timing_review'
            groups.append({'id':labels[i],'query':intent['query'],'kind':intent['kind'],'operation':intent['operation'],
                           'requested_phase':intent['phase'],'candidates':allocated[i],'limitations':[entry[1]['key'] for entry in limits],'status':status})
        related=[];related_seen=set();selected_keys={self.by_id[rid]['key'] for rid in selected}
        for i,(ranked,_) in enumerate(selections):
            if not ranked:continue
            for item in self.phase_relations([ranked[0][1]],intents[i]['side'],intents[i]['scope']):
                if item['id'] not in related_seen and item['id'] not in selected_keys:
                    related_seen.add(item['id']);related.append(item)
        return {'intents':groups,'results':[self.summary(self.by_id[i]) for i in selected], 'related':related,
                'limitations':list(limited_records.values()),'prerequisites':prerequisites,
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
    if index.get('schema_version') != SCHEMA_VERSION or index.get('input_signature') != input_signature(root):
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
    sub.add_parser('schema')
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
        result = {'schema_version': SCHEMA_VERSION, 'targets': TARGETS, 'operations': list(OPERATIONS), 'extents': ['any','single','many','global','dimension'], 'phases': ['any','before','after','change'], 'batch': ['any','bulk'], 'target_scopes': ['any','local_player','other_player','all_players'], 'intent_fields': ['id','query','side','scope','kind','operation','target','extent','read_only','exclude_targets','exclude','must_support','target_scope','phase','batch'], 'phase_behavior': '阶段用于排序；关联事件仍在 related 返回。timing_review 表示主候选阶段未匹配，不能作为已满足需求。', 'plan': {'side': 'server', 'intents': [{'id':'a','query':'读取箱子容量','kind':'api','operation':'read','target':'block_container'}]}}
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
