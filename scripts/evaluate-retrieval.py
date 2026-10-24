#!/usr/bin/env python3
"""运行固定真实文档查询，比较召回、范围污染和输出长度；不模拟游戏引擎。"""
import argparse
import hashlib
import os
import importlib.util
import json
import sys
import subprocess
import time
from pathlib import Path
from api_knowledge import ROOT, Search, load


def query_cli():
    configured = os.environ.get('MODSDK_SKILL_ROOT')
    roots = [Path(configured).expanduser()] if configured else [ROOT.parent / 'netease-api-query', Path.home() / '.codex/skills/netease-api-query']
    for root in roots:
        entry = root.resolve() / 'scripts/query.py'
        if entry.is_file():
            return entry
    raise ValueError('未找到独立查询 skill；请设置 MODSDK_SKILL_ROOT 指向 netease-api-query 仓库')


def evaluate_scenarios(data, engine):
    """真实调用 skill CLI，固定新需求及补查，不改变索引与标注。"""
    protocol = data['new_scenarios_protocol']
    for relative, field in [('knowledge/annotations.json','annotation_sha256'),('scripts/api_knowledge.py','engine_sha256')]:
        actual = hashlib.sha256((ROOT / relative).read_bytes()).hexdigest()
        if actual != protocol[field]:
            raise ValueError('样本冻结后的检索输入发生变化：' + relative)
    cases = [c for c in data['cases'] if c.get('split') == 'new_scenarios']
    by_key = {r['key']:r for r in engine.records}
    cli = query_cli()
    def invoke(arguments):
        start=time.monotonic()
        result=subprocess.run([sys.executable,str(cli),*arguments],capture_output=True,text=True,cwd=ROOT,env={**os.environ,'MODSDK_WIKI_ROOT':str(ROOT)})
        if result.returncode:
            raise RuntimeError(result.stderr)
        return {'arguments':arguments,'output':json.loads(result.stdout),
                'chars':len(result.stdout.rstrip('\n')),'elapsed_ms':round((time.monotonic()-start)*1000)}
    def identities(output):
        return [by_key[r['id']]['id'] for r in output.get('results',[]) if r.get('id') in by_key]
    def missing(case, ids):
        return [g['label'] for g in case['required'] if not set(g['ids']).intersection(ids)]
    rows=[]
    for case in cases:
        baseline=[]
        for strategy in ['raw','annotated','coverage']:
            call=invoke(['resolve',case['query'],'--side',case['side'],'--strategy',strategy,'--limit','8'])
            ids=identities(call['output']); missing_groups=missing(case,ids)
            baseline.append({'strategy':strategy,'call':call,'ids':ids,'hits':len(case['required'])-len(missing_groups),'missing':missing_groups})
        initial=baseline[-1]
        found=list(initial['ids']); followups=[]
        if missing(case,found) or case.get('boundary'):
            for followup in case.get('followups',[])[:4]:
                call=invoke(['resolve',followup['query'],'--side',followup['side'],'--limit','8'])
                found=list(dict.fromkeys(found+identities(call['output'])));followups.append(call)
        selected=[]
        for group in case['required']:
            hit=next((i for i in found if i in group['ids']),None)
            if hit and hit not in selected:selected.append(hit)
        details=[]
        # 验收核对仅读取真正召回的必需候选。此选择用参考清单，不能冒充盲执行成本。
        for offset in range(0,len(selected),3):
            keys=[engine.by_id[i]['key'] for i in selected[offset:offset+3]]
            details.append(invoke(['detail',*keys,'--side',case['side'],'--examples','0']))
        all_calls=[initial['call']]+followups
        contamination=[]
        for call in all_calls:
            requested_side=call['arguments'][call['arguments'].index('--side')+1]
            for id in identities(call['output']):
                record=engine.by_id[id]
                if record['scope']!='modsdk' or requested_side!='any' and record['side'] not in (requested_side,'common'):
                    contamination.append(id)
        row={'case':case['id'],'category':case['category'],'query':case['query'],'side':case['side'],
             'required':len(case['required']),'baselines':baseline,'followups':followups,'guided_ids':found,
             'guided_hits':len(case['required'])-len(missing(case,found)),'guided_missing':missing(case,found),
             'search_calls':len(all_calls),'search_chars':sum(c['chars'] for c in all_calls),
             'detail_calls':details,'detail_chars':sum(c['chars'] for c in details),'scope_violations':contamination,
             'contract_review_checklist':case['contract_review'],'boundary':case.get('boundary'),
             'missing_with_empty_uncovered_groups':bool(initial['missing']) and not initial['call']['output'].get('uncovered_groups')}
        rows.append(row)
        print(case['id'],f"{initial['hits']}/{row['required']} -> {row['guided_hits']}/{row['required']}",flush=True)
    report={'protocol':protocol,'corpus_sha256':engine.index['corpus_sha256'],'cases_sha256':hashlib.sha256(json.dumps(cases,ensure_ascii=False,sort_keys=True).encode()).hexdigest(),'rows':rows}
    previous_path=ROOT/'.api-index/scenario-evaluation.json'
    if previous_path.exists():
        previous=json.loads(previous_path.read_text())
        if previous.get('corpus_sha256')==report['corpus_sha256'] and previous.get('cases_sha256')==report['cases_sha256'] and previous.get('manual_review'):
            report['manual_review']=previous['manual_review']
    previous_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    valid=[r for r in rows if r['required']]
    lines=['## 新增模组案例验收','', '18 个新案例：16 个业务 API 组合、2 个边界。固定参考清单包含 48 项关键能力。本次为固定案例回归；标签可能已根据这些缺口补充，不能作为独立盲测或游戏实机验收。','',
           '完整需求先查 Top 8；缺项时执行预先写定的最多四个中文拆分查询，仍取 Top 8，不提供答案 API 名。命中按完整 ID、端侧及已核验等价接口计。详情只读实际召回的必要候选；此筛选用了参考清单，详情开销仅用于验收，不能视为真实 Agent 盲执行成本。','',
           '| 查询方式 | 必需能力命中 | 查齐核心参考集合 |','| --- | --- | --- |']
    for idx,name in enumerate(['原文检索','附加标注','能力组合']):
        lines.append('| {} | {}/48 | {}/16 |'.format(name,sum(r['baselines'][idx]['hits'] for r in valid),sum(r['baselines'][idx]['hits']==r['required'] for r in valid)))
    lines.append('| 能力组合＋有限补查 | {}/48 | {}/16 |'.format(sum(r['guided_hits'] for r in valid),sum(r['guided_hits']==r['required'] for r in valid)))
    lines += ['', '| 模组需求 | 一次查询 | 补查后 | 查询次数 | 查询字符数 | 仍缺少 |','| --- | --- | --- | --- | --- | --- |']
    for r in rows:
        if not r['required']:continue
        lines.append('| {} | {}/{} | {}/{} | {} | {} | {} |'.format(data.get('new_scenarios_titles',{}).get(r['case'],r['case']),r['baselines'][-1]['hits'],r['required'],r['guided_hits'],r['required'],r['search_calls'],r['search_chars'],'、'.join(r['guided_missing']) or '无'))
    lines += ['', '字符数为 CLI 实际输出 Unicode 字符，不是模型 token。补查不是免费召回：每次返回的候选都计入查询次数及字符数。', '',
              '边界结果、错误完整性暗示及合同核对结论见下方人工复核；完整回执为 `.api-index/scenario-evaluation.json`。']
    path=ROOT/'knowledge/evaluation.md';current=path.read_text() if path.exists() else '# 检索当前结果\n'
    review_tail=current.partition('\n## 本轮人工复核结论')[2] if report.get('manual_review') else ''
    current=current.split('\n## 新增模组案例验收')[0]
    path.write_text(current.rstrip()+'\n\n'+'\n'.join(lines)+'\n'+('\n## 本轮人工复核结论'+review_tail if review_tail else ''))


def evaluate_gap_checks(data):
    rows=[]
    cli=query_cli()
    for case in data.get('gap_checks',[]):
        run=subprocess.run([sys.executable,str(cli),'resolve',case['query'],'--side',case['side']],capture_output=True,text=True,cwd=ROOT,env={**os.environ,'MODSDK_WIKI_ROOT':str(ROOT)},check=True)
        result=json.loads(run.stdout);names=[r['name'] for r in result['results']]
        row={**case,'output':result,'hits':sum(n in names for n in case['expected']),'required':len(case['expected']),'chars':len(run.stdout.rstrip('\n'))}
        rows.append(row)
        print(case['id'],str(row['hits'])+'/'+str(row['required']),names[:3])
    report={'annotation_sha256':hashlib.sha256((ROOT/'knowledge/annotations.json').read_bytes()).hexdigest(),'rows':rows,'note':'已用于修正知识关联的改写和相反意图回归；不是独立盲测。'}
    (ROOT/'.api-index/gap-checks.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')


def evaluate_community(data, engine):
    protocol=data['community_protocol']
    for relative,field in [('knowledge/annotations.json','annotation_sha256'),('scripts/api_knowledge.py','engine_sha256')]:
        if hashlib.sha256((ROOT/relative).read_bytes()).hexdigest()!=protocol[field]:
            raise ValueError('社区案例冻结后的输入发生变化：'+relative)
    bykey={r['key']:r for r in engine.records};cli=query_cli();rows=[]
    def call(args):
        started=time.monotonic();run=subprocess.run([sys.executable,str(cli),*args],capture_output=True,text=True,cwd=ROOT,env={**os.environ,'MODSDK_WIKI_ROOT':str(ROOT)},check=True)
        return {'arguments':args,'output':json.loads(run.stdout),'chars':len(run.stdout.rstrip('\n')),'elapsed_ms':round((time.monotonic()-started)*1000)}
    for case in data['community_cases']:
        row={'case':case['id'],'title':case['title'],'required':len(case['required']),'relation':case['relation'],'contract_note':case['contract_note'],'queries':{}}
        union=[]
        for variant,query in case['queries'].items():
            result=call(['resolve',query,'--side',case['side'],'--limit','5'])
            ids=[bykey[r['id']]['id'] for r in result['output'].get('results',[]) if r.get('id') in bykey]
            ranks=[min((ids.index(i)+1 for i in g['ids'] if i in ids),default=None) for g in case['required']]
            row['queries'][variant]={'call':result,'ids':ids,'ranks':ranks,'hits':sum(r is not None for r in ranks)}
            union=list(dict.fromkeys(union+ids))
        selected=[next((i for i in union if i in group['ids']),None) for group in case['required']]
        selected=list(dict.fromkeys(i for i in selected if i));row['details']=[]
        for offset in range(0,len(selected),3):
            row['details'].append(call(['detail',*[engine.by_id[i]['key'] for i in selected[offset:offset+3]],'--side',case['side'],'--examples','0']))
        row['scope_violations']=[i for i in union if engine.by_id[i]['scope']!='modsdk' or engine.by_id[i]['side'] not in ('server','common')]
        rows.append(row);print(case['title'],[str(row['queries'][v]['hits'])+'/'+str(row['required']) for v in ['symbol','named','chinese']],flush=True)
    controls=[]
    for case in data['community_cases']:
        if case['id'] not in protocol.get('controlled_name_cases',[]):continue
        query=case['queries']['chinese']+'（Bukkit/Nukkit：'+case['queries']['symbol']+'）'
        check=call(['resolve',query,'--side','server','--limit','5'])
        ids=[bykey[r['id']]['id'] for r in check['output']['results']]
        controls.append({'case':case['id'],'query':query,'output':check['output'],'hits':sum(any(i in ids for i in g['ids']) for g in case['required']),'required':len(case['required']),'chinese_hits':next(r for r in rows if r['case']==case['id'])['queries']['chinese']['hits']})
    followups=[]
    for spec in data.get('community_followups',[]):
        check=call(['resolve',spec['query'],'--side','server','--limit','5'])
        followups.append({'case':spec['id'],'query':spec['query'],'output':check['output'],'chars':check['chars']})
    intent_checks=[]
    for spec in data.get('community_intent_checks',[]):
        check=call(['resolve',spec['query'],'--side',spec['side'],'--limit','5'])
        first=check['output']['results'][0]['name'] if check['output']['results'] else None
        intent_checks.append({**spec,'first':first,'passed':first==spec['expected_first'],'output':check['output']})
    result={'protocol':protocol,'corpus_sha256':engine.index['corpus_sha256'],'cases_sha256':hashlib.sha256(json.dumps(data['community_cases'],ensure_ascii=False,sort_keys=True).encode()).hexdigest(),'rows':rows,'controlled_name_addition':controls,'followups':followups,'intent_checks':intent_checks}
    result_path=ROOT/'.api-index/community-evaluation.json'
    if result_path.exists():
        previous=json.loads(result_path.read_text())
        if previous.get('corpus_sha256')==result['corpus_sha256'] and previous.get('cases_sha256')==result['cases_sha256'] and previous.get('manual_review'):
            result['manual_review']=previous['manual_review']
    result_path.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    valid=[r for r in rows if r['required']];total=sum(r['required'] for r in valid)
    lines=['## Bukkit／Nukkit 常见服务端需求验收','', '20个案例：18个有明确ModSDK对应的能力、2个能力边界。每个案例独立查询三种表达，均使用真实 skill CLI、server 范围、Top 5；当前为固定样本回归；结果可能已用于补充中文标注，不代表新的盲测。','',
           '方法名查询衡量术语是否直通；带方法名需求衡量迁移提问；纯中文需求衡量基础能力是否方便检索。参考接口按语义和端侧核对，近似或组合对应不表示逐参数兼容。详情只读取三种表达真正召回的参考候选，使用了参考清单辅助筛选，不作为自主 Agent 成本。','',
           '| 查询方式 | 关键能力命中 | 参考集合查齐 |','| --- | --- | --- |']
    for variant,title in [('symbol','仅社区方法名'),('named','社区方法名＋用途'),('chinese','中文能力描述')]:
        lines.append('| {} | {}/{} | {}/{} |'.format(title,sum(r['queries'][variant]['hits'] for r in valid),total,sum(r['queries'][variant]['hits']==r['required'] for r in valid),len(valid)))
    lines+=['','| 需求 | 仅方法名 | 方法名＋用途 | 纯中文 | 对应性质 |','| --- | --- | --- | --- | --- |']
    for r in rows:
        values=[str(r['queries'][v]['hits'])+'/'+str(r['required']) if r['required'] else '单独核对' for v in ['symbol','named','chinese']]
        lines.append('| {} | {} | {} | {} | {} |'.format(r['title'],*values,r['relation']))
    lines+=['','完整查询、排名及详情回执：`.api-index/community-evaluation.json`。参考问法与映射在 `knowledge/retrieval-cases.json` 的 community_cases 字段；执行 `python3 scripts/evaluate-retrieval.py --community` 可复跑。','',
            '社区定义核对来源：']
    for source in protocol['sources']:
        if not source.get('error'):lines.append('- [{}]({})'.format(source['name'],source['url']))
    path=ROOT/'knowledge/evaluation.md';old=path.read_text()
    manual_tail=old.partition('\n### 方便查询的常用功能')[2] if result.get('manual_review') else ''
    if manual_tail and '社区定义核对来源：' in lines:
        lines=lines[:lines.index('社区定义核对来源：')]
    old=old.split('\n## Bukkit／Nukkit 常见服务端需求验收')[0]
    path.write_text(old.rstrip()+'\n\n'+'\n'.join(lines)+'\n'+('\n### 方便查询的常用功能'+manual_tail if manual_tail else ''))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--legacy-root', type=Path, help='只读原 MCP 基线源码（可选）')
    parser.add_argument('--scenarios', action='store_true', help='只运行冻结的新增模组案例，通过真实 skill CLI 查询')
    parser.add_argument('--gap-checks', action='store_true', help='通过 skill CLI 查询缺口补充后的改写与相反意图案例')
    parser.add_argument('--community', action='store_true', help='比较 Bukkit/Nukkit 方法名和中文能力的实际检索结果')
    args = parser.parse_args()
    data = json.loads((ROOT / 'knowledge/retrieval-cases.json').read_text())
    if args.gap_checks:
        evaluate_gap_checks(data)
        return
    cases = [c for c in data['cases'] if c.get('split') != 'new_scenarios']
    engine = Search(load())
    if args.community:
        evaluate_community(data,engine)
        return
    if args.scenarios:
        evaluate_scenarios(data,engine)
        return
    legacy = None
    if args.legacy_root:
        spec = importlib.util.spec_from_file_location('legacy_reader', args.legacy_root / 'modsdk_mcp/docs_reader.py')
        module = importlib.util.module_from_spec(spec); sys.modules[spec.name] = module; spec.loader.exec_module(module)
        legacy = module.DocsReader(str(args.legacy_root / 'docs')); legacy.load_all_docs()
    rows = []
    for case in cases:
        for strategy in (['legacy'] if legacy else []) + ['raw', 'annotated', 'coverage']:
            if strategy == 'legacy':
                output = {'results': legacy.search_api(case['query'], limit=8)}
            else:
                output = engine.resolve(case['query'], strategy, 8, case['side'], case.get('kind', 'all'), case.get('scope', 'modsdk'))
            results = output['results']; names = [r['name'] for r in results]
            hits = sum(any(n in names for n in alternatives) for alternatives in case['expected'])
            violations = [n for n in names if n in case.get('forbidden', [])]
            for r in results:
                side = {'服务端':'server','客户端':'client'}.get(r['side'], r['side'])
                if case['side'] != 'any' and side in ('client','server') and side != case['side']:
                    violations.append('wrong_side:' + r['name'])
            if case.get('require_empty') and names: violations.append('expected_empty')
            if case.get('require_nonempty') and not names: violations.append('expected_nonempty')
            # 只读取搜索确实找到的必需候选；未命中的需求仍计为遗漏，不能用更少字符冒称完成。
            needed = list(dict.fromkeys(next((n for n in names if n in alternatives), '') for alternatives in case['expected']))
            needed = [n for n in needed if n]
            if strategy == 'legacy':
                details = [legacy.get_api_detail(n) for n in needed]
                calls = 1 + len(needed)
            else:
                ids = [next(r['id'] for r in results if r['name']==n) for n in needed]
                details = engine.detail(ids, case['side'], case.get('scope','modsdk'), examples=0) if ids else {}
                calls = 1 + bool(ids)
            rows.append({'case':case['id'], 'split':case['split'], 'strategy':strategy, 'hits':hits,
                         'required':len(case['expected']), 'violations':violations, 'names':names,
                         'chars':len(json.dumps(output,ensure_ascii=False,separators=(',',':'))),
                         'query_calls':1, 'calls_with_contracts':calls, 'contract_chars':len(json.dumps(details,ensure_ascii=False,separators=(',',':')))})
    report = {'top_k':8, 'corpus_sha256':engine.index['corpus_sha256'], 'hash_seed':os.environ.get('PYTHONHASHSEED'), 'legacy_reader_sha256':hashlib.sha256((args.legacy_root/'modsdk_mcp/docs_reader.py').read_bytes()).hexdigest() if legacy else None, 'scope':'固定文档检索比较，非游戏功能验收；改写样本仍与试点领域相关，不是独立盲测。', 'rows':rows}
    (ROOT / '.api-index/evaluation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    lines=['# 检索试点当前结果', '', report['scope'], '', '每例只查询一次，Top 8；命中按需求能力计算，等价 API 算一次。字符数比较采用同一 JSON 序列化方式，不等同 token。旧 MCP 不支持端侧/预设过滤，返回参数等完整字段。', '', '| 策略 | 必需能力命中 | 边界违规条数 | 平均返回字符 |', '| --- | --- | --- | --- |']
    for strategy in dict.fromkeys(r['strategy'] for r in rows):
        subset=[r for r in rows if r['strategy']==strategy]
        lines.append('| {} | {}/{} | {} | {} |'.format(strategy,sum(r['hits'] for r in subset),sum(r['required'] for r in subset),sum(len(r['violations']) for r in subset),round(sum(r['chars'] for r in subset)/len(subset))))
    lines += ['', '| 案例 | 策略 | 命中/要求 | 返回 API | 边界问题 |', '| --- | --- | --- | --- | --- |']
    for r in rows:
        lines.append('| {} | {} | {}/{} | {} | {} |'.format(r['case'],r['strategy'],r['hits'],r['required'],', '.join(r['names']),', '.join(r['violations'])))
    lines += ['', '## 解释边界', '', '- coverage 只给已标注能力提供组合推荐；未知需求仍依赖词法排序，不能保证零遗漏。', '- 标注样本和改写样本公开固定；改变标注或排序后应同时重跑 control，避免只针对一句问法优化。', '- 表中字符仅含查询输出；JSON 回执另记录所命中必需候选的 contract_chars 和 calls_with_contracts。遗漏能力不读取详情，所以不能把它的低成本当成任务已完成。'
        , '- 根据首轮遗漏补充了“发奖失败需核对背包”能力关联，因此当前样本是可复现回归集，不是独立盲测；此前 coverage 为 26/29，当前改进不代表未知领域召回率。', '- 完整 JSON 回执在生成目录 `.api-index/evaluation.json`，本文件记录当前可复现结果。']
    (ROOT / 'knowledge/evaluation.md').write_text('\n'.join(lines)+'\n')
    print('\n'.join(lines[:12]))

if __name__ == '__main__': main()
