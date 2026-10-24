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
from api_knowledge import ROOT, Search, load, build, input_signature


def query_cli():
    configured = os.environ.get('MODSDK_SKILL_ROOT')
    roots = [Path(configured).expanduser()] if configured else [ROOT.parent / 'netease-modsdk-skill', Path.home() / '.codex/skills/netease-modsdk-skill']
    for root in roots:
        entry = root.resolve() / 'scripts/query.py'
        if entry.is_file():
            return entry
    raise ValueError('未找到独立查询 skill；请设置 MODSDK_SKILL_ROOT 指向 netease-modsdk-skill 仓库')


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


def write_product_report(report, cases):
    """将实际查询回执汇总到现有评估文档。"""
    summaries = {s['mode']:s for s in report['summaries']}
    old, new = summaries['old84'], summaries['expanded']
    lines = ['## 大范围标注后的真实产品需求对照', '',
             '结论：扩展标注提升了可找回的能力数量，配合明确拆分后收益明显；完整需求一次查询仍不可靠，近邻接口干扰和输出长度也有所增加。建议保留标注，优先改进需求拆分、否定约束、对象范围和事件检索。', '',
             '本轮新编写 18 个贴近产品功能的需求：16 个能力组合、2 个支持边界。它们未用于本轮标注修改，但由同一评估者制定参考方案，不是独立盲测，也不是游戏实机验收。参考清单只统计本功能片段所需的引擎能力，不计普通业务状态处理和通用框架初始化。', '',
             '对照冻结在旧版 `40906a7e`（84 条）与扩展版 `0dd39239`（1,649 条）。原文、查询引擎、43 条能力规则及原有 84 条标注完全一致。通过独立 Skill 的真实 CLI 执行，共 192 次固定查询；历史标注在临时独立目录构建索引，结束即清理，正式数据和查询实现未改动。', '',
             '每例先将完整需求交给 `resolve`，Top 8。随后各方案都执行相同、预先固定且不含目标 API 名称的拆分查询。16 个正向需求共 54 项必需能力、48 次固定查询；另外比较关闭能力规则的纯词法版本。', '',
             '| 指标 | 仅原文 | 84 条标注 | 1,649 条标注 |',
             '| --- | ---: | ---: | ---: |']
    specs = [('首问命中必需能力', 'initial_hits', '/54'), ('首问完整需求', 'initial_complete', '/16'),
             ('固定拆分后命中能力', 'split_hits', '/54'), ('固定拆分后完整需求', 'split_complete', '/16'),
             ('首问范围冲突候选命中数', 'initial_hard_negatives', ''), ('首问输出字符合计', 'first_chars', ''),
             ('固定查询路径输出字符合计', 'fixed_path_chars', '')]
    for label, key, suffix in specs:
        lines.append('| '+label+' | '+' | '.join(f"{summaries[m][key]:,}{suffix}" for m in ['raw','old84','expanded'])+' |')
    lines += ['', '“范围冲突候选”只统计预先列出的对象、操作或作用范围不符合要求（或范围过大）的候选，不是全部噪声。搜索返回候选也不等于 Agent 已经误用该接口；必须读取详情判断。', '',
              f"相较 84 条版，新版固定查询路径的文本量增加 {(new['fixed_path_chars']/old['fixed_path_chars']-1)*100:.1f}%。字符数不是 token，不含模型推理与后续详情。各方案均执行相同 48 次查询，因此本轮不能宣称已经减少 Agent 查询次数。回执中的 oracle_stop 只表示参考清单可提前完成的位置，不是 Agent 盲执行的决策成本。", '',
              '候选更接近产品领域：首问 128 个结果中，预定参考方案及可用辅助项从 40 个增加到 48 个。不在预定清单的候选可能包含其他实现路径，不能把剩余结果一律算作无关。', '',
              '| 产品功能 | 84 条首问 | 扩展版首问 | 84 条拆分后 | 扩展版拆分后 |',
              '| --- | ---: | ---: | ---: | ---: |']
    for case in cases:
        if case['boundary']:continue
        a=next(r for r in report['rows'] if r['case']==case['id'] and r['mode']=='old84')
        b=next(r for r in report['rows'] if r['case']==case['id'] and r['mode']=='expanded')
        n=a['required']
        lines.append(f"| {case['title']} | {a['initial_hits']}/{n} | {b['initial_hits']}/{n} | {a['after_split_hits']}/{n} | {b['after_split_hits']}/{n} |")
    lines += ['', '### 实际观察到的改善与退步', '',
              '- 区域快照：整段需求从 0/4 提升到 3/4，拆分后从 3/4 提升到 4/4，能够找到调色板采集、序列化、反序列化和写回世界的组合。',
              '- 实体声音：整段从 1/4 提升到 3/4，拆分后从 3/4 提升到 4/4，实例循环和按实例停止更容易发现。读取详情后仍要处理刚播放七帧内停止可能失败的限制，原文建议延迟十五帧以上。',
              '- 跨维度重生：首问从 4/4 退步到 3/4，`GetEntityDimensionId` 被挤出 Top 8，出现作用于世界出生点的 `SetSpawnDimensionAndPosition`。补查“获取玩家当前所在维度”时目标词法排名从旧版第 9 退到新版第 13；实际改问“实体所在维度”后首位命中，说明对象层级和同义表达仍需要处理。',
              '- 模型预览：`RenderSkeletonModel` 从首位退到第 6 位，前面出现 `SetUiModel`、`SetUiModelScale`、`SetUiEntity` 等相近界面 API。目标仍在 Top 8，但 Agent 需要结合控件类型和参数进一步选择。',
              '- 表单：首问 Top 8 被下拉框相关接口占据，输入长度、读取文字和面板吞噬输入三项仍然漏掉。全局相关性排序缺少对子需求的名额分配。',
              '- 装备更换：固定拆分后两版都漏掉事件。混合查询“监听玩家盔甲装备更换事件”中，`OnNewArmorExchangeServerEvent` 从第 9 退到第 11；实际使用 `search "玩家更换盔甲" --kind event --side server` 后首位命中。普通 API 标注已近全覆盖，但事件仍只有 14/298 条标注。', '',
              '### 原有规则与新增字段分别造成什么影响', '',
              '- 旧版和新版使用相同 43 条能力规则。游客权限需求含“不要通过切换游戏模式”，仍强制插入 `SetPlayerGameType`；“禁止放置方块”也触发 `SetBlockNew`。在扩展标注下，关闭这些规则的词法版本首问能命中 4/4，默认 coverage 只命中 3/4。这一损失来自已有规则与否定约束处理，而非新标注本身。',
              '- 只读监控同样推荐了 `SetPlayerGameType`；只读要求尚未成为检索的硬约束。',
              '- 箱子审计明确说“不是玩家背包”，两版首问都为 0/3，新版仍返回多项玩家背包 API。删除否定对象并拆成“读取箱子容量和指定槽位物品”“设置箱子某个槽位的物品数量”后可查齐。',
              '- 新版“原生字符串权限树”首位返回 `SetPermissionLevel`，其新增说明包含“不是字符串权限节点系统”。限制性描述参与词法打分时，也可能把不支持该能力的接口排到前面。详情有正确边界，但它不应被当作正向能力命中。',
              '- 物理 `Raycast` 与普通世界射线容易混淆；详情明确前者仅支持自定义刚体。限定“普通世界实体和方块”后可找回 `getEntitiesOrBlockFromRay`。',
              '- 新版默认 coverage 的 13 个首问不完整需求仍返回空的 `uncovered_groups`，与旧版相同。该字段仅覆盖已知规则，不能当作产品需求已经完整匹配的证明。', '',
              '### 两个支持边界', '',
              '- 字符串权限树：读取 `SetPermissionLevel` 后可以确认它是访客、成员、操作员等数值身份，不证明存在字符串节点、继承和否定节点系统。没有搜到其他对应接口不等于平台绝对不支持其他实现。',
              '- 客户端读取他人全部背包：完整需求首问两版都被跨端通信等词汇带偏；拆分后可找到 `GetPlayerItem`、`GetPlayerAllItems`，其原文和新版补充均明确客户端背包读取仅支持本地玩家，应否定“只靠客户端直接读取他人完整背包”这一方案。', '',
              '### 下一步优先级', '',
              '1. 先将需求拆为对象、动作、端侧、约束和触发时机，为每个子需求分别召回少量候选，再合并去重；不要依赖一段长文本的 Top 8 自动覆盖全部功能。',
              '2. 将只读、单个／全部、普通世界／物理刚体、玩家／实体、界面模型／世界实体等对象与作用域作为约束；否定内容不再触发正向能力规则。',
              '3. 为事件检索单独路由，并优先补齐常用事件的基础标签。',
              '4. 区分“能力命中”和“限制说明命中”，在结果中明确标记；保留详情中的完整限制。',
              '5. 为真正的前置依赖增加关联，如独立相机位置依赖先分离相机、短时停止声音需关注延迟；目前的读写配对不等于完整实现依赖图。', '',
              '### 复现与资料', '',
              '运行 `npm run api:evaluate -- --products`。需要本地 Git 能读取冻结的基线提交；当前数据或查询引擎改变时会拒绝复用这一对照。',
              '产品需求与参考清单在 `knowledge/retrieval-cases.json` 的 `product_review`；完整查询回执在 `.api-index/product-evaluation.json`。本轮未修改标注、查询引擎、已安装 Skill 或线上搜索设置。']
    path = ROOT / 'knowledge/evaluation.md'
    old_text = path.read_text().split('\n## 大范围标注后的真实产品需求对照')[0]
    path.write_text(old_text.rstrip()+'\n\n'+'\n'.join(lines)+'\n')


def evaluate_products(data):
    """对冻结的产品需求进行真实 CLI 对照，不改动正式原文、标注或索引。"""
    import copy
    import tempfile
    from concurrent.futures import ThreadPoolExecutor, as_completed
    review = data['product_review']; protocol = review['protocol']; cases = review['cases']
    if hashlib.sha256(json.dumps(cases, ensure_ascii=False, sort_keys=True).encode()).hexdigest() != protocol['cases_sha256']:
        raise ValueError('冻结的产品需求或参考清单已改变，需明确建立新的评估快照')
    runtime = ROOT / 'scripts/api_knowledge.py'
    annotations_path = ROOT / 'knowledge/annotations.json'
    if hashlib.sha256(runtime.read_bytes()).hexdigest() != protocol['engine_sha256'] or hashlib.sha256(annotations_path.read_bytes()).hexdigest() != protocol['annotation_sha256']:
        raise ValueError('产品需求对照的引擎或标注已变化；保留旧结果，需明确选择新的评估快照')
    baseline = json.loads(subprocess.check_output(['git', 'show', protocol['baseline_commit'] + ':knowledge/annotations.json'], cwd=ROOT, text=True))
    current = json.loads(annotations_path.read_text())
    if baseline['capabilities'] != current['capabilities']:
        raise ValueError('两版能力规则不同，不能只归因于扩大标注')
    baseline_engine = subprocess.check_output(['git', 'show', protocol['baseline_commit'] + ':scripts/api_knowledge.py'], cwd=ROOT)
    if baseline_engine != runtime.read_bytes():
        raise ValueError('两版查询引擎不同')
    changed_docs = subprocess.check_output(['git', 'diff', '--name-only', protocol['baseline_commit'], 'HEAD', '--', 'docs/mcdocs', 'docs/mcguide', 'docs/mconline'], cwd=ROOT, text=True)
    if changed_docs.strip():
        raise ValueError('两版原始文档不同')
    if any(a != next((b for b in current['entries'] if b['id'] == a['id']), None) for a in baseline['entries']):
        raise ValueError('原有标注已被修改，不属于纯扩展对照')
    cli = query_cli(); top_k = protocol['top_k']; report_dir = ROOT / '.api-index'; report_dir.mkdir(exist_ok=True)
    raw = copy.deepcopy(current); raw['entries'] = []; raw['capabilities'] = []
    raw_doc_signature = input_signature(ROOT)
    with tempfile.TemporaryDirectory(prefix='product-baselines-', dir=report_dir) as temporary:
        roots = {}
        for label, annotation in [('raw', raw), ('old84', baseline), ('expanded', current)]:
            root = Path(temporary) / label
            (root / 'scripts').mkdir(parents=True); (root / 'knowledge').mkdir(); (root / 'docs').mkdir()
            (root / 'scripts/api_knowledge.py').write_bytes(runtime.read_bytes())
            (root / 'knowledge/annotations.json').write_text(json.dumps(annotation, ensure_ascii=False))
            # 仅原文目录只读复用；public 和 .api-index 留在临时目录，不写正式产物。
            for folder in ['mcdocs', 'mcguide', 'mconline']:
                (root / 'docs' / folder).symlink_to(ROOT / 'docs' / folder, target_is_directory=True)
            build(root)
            roots[label] = root
        index = json.loads((roots['expanded'] / '.api-index/index.json').read_text())
        by_key = {r['key']: r for r in index['records']}
        modes = {'raw': ('raw', 'raw'), 'old84': ('old84', 'coverage'), 'expanded': ('expanded', 'coverage'),
                 'old84_lexical': ('old84', 'annotated'), 'expanded_lexical': ('expanded', 'annotated')}
        tasks = []
        for case in cases:
            queries = [case['query']] + case['followups']
            for mode in modes:
                for query_index, query in enumerate(queries[:1] if mode.endswith('_lexical') else queries):
                    tasks.append((case, mode, query_index, query))
        def invoke(task):
            case, mode, query_index, query = task; root_key, strategy = modes[mode]
            arguments = ['resolve', query, '--side', case['side'], '--strategy', strategy, '--limit', str(top_k)]
            started = time.monotonic()
            proc = subprocess.run([sys.executable, str(cli), *arguments], cwd=ROOT, env={**os.environ, 'MODSDK_WIKI_ROOT':str(roots[root_key]), 'PYTHONHASHSEED':'0'}, text=True, capture_output=True)
            if proc.returncode: raise RuntimeError(proc.stderr)
            output = json.loads(proc.stdout)
            result_ids = [by_key[r['id']]['id'] for r in output['results']]
            return {'case':case['id'], 'mode':mode, 'query_index':query_index, 'arguments':arguments,
                    'ids':result_ids, 'output':output, 'chars':len(proc.stdout.rstrip('\n')),
                    'elapsed_ms':round((time.monotonic()-started)*1000)}
        calls = []
        with ThreadPoolExecutor(max_workers=4) as pool:
            futures = [pool.submit(invoke, task) for task in tasks]
            for i, future in enumerate(as_completed(futures), 1):
                calls.append(future.result())
                if i % 24 == 0 or i == len(futures):print('产品需求实际查询', i, '/', len(futures), flush=True)
        calls.sort(key=lambda c:(c['case'], c['mode'], c['query_index']))
        rows = []
        for case in cases:
            required_ids = {i for g in case['required'] for i in g['ids']}
            allowed = required_ids | set(case['support_ids'])
            for mode in modes:
                cs = [c for c in calls if c['case']==case['id'] and c['mode']==mode]
                first = cs[0]; union = set(); prefix = None
                for i, c in enumerate(cs, 1):
                    union.update(c['ids'])
                    if case['required'] and prefix is None and all(set(g['ids']) & union for g in case['required']):prefix=i
                def hits(found):return sum(bool(set(g['ids']) & set(found)) for g in case['required'])
                rows.append({'case':case['id'],'title':case['title'],'mode':mode,'boundary':case['boundary'],
                             'required':len(case['required']), 'initial_hits':hits(first['ids']), 'after_split_hits':hits(union),
                             'initial_ids':first['ids'],'after_split_ids':sorted(union),
                             'outside_reference':[i for i in first['ids'] if i not in allowed],
                             'hard_negatives':[i for i in first['ids'] if i in case['hard_negative_ids']],
                             'false_clear_coverage':bool(case['required']) and hits(first['ids'])<len(case['required']) and not first['output'].get('uncovered_groups'),
                             'first_chars':first['chars'], 'fixed_path_calls':len(cs),'fixed_path_chars':sum(c['chars'] for c in cs),
                             'oracle_stop_calls':prefix,'oracle_stop_chars':sum(c['chars'] for c in cs[:prefix]) if prefix is not None else None})
    if input_signature(ROOT) != raw_doc_signature:
        raise ValueError('正式输入在对照期间发生变化')
    summaries = []
    for mode in modes:
        valid = [r for r in rows if r['mode']==mode and not r['boundary']]
        summaries.append({'mode':mode,'cases':len(valid),'required':sum(r['required'] for r in valid),
                          'initial_hits':sum(r['initial_hits'] for r in valid),'initial_complete':sum(r['initial_hits']==r['required'] for r in valid),
                          'split_hits':sum(r['after_split_hits'] for r in valid),'split_complete':sum(r['after_split_hits']==r['required'] for r in valid),
                          'initial_outside_reference':sum(len(r['outside_reference']) for r in valid),'initial_hard_negatives':sum(len(r['hard_negatives']) for r in valid),
                          'false_clear_coverage':sum(r['false_clear_coverage'] for r in valid),
                          'first_chars':sum(r['first_chars'] for r in valid),'fixed_path_chars':sum(r['fixed_path_chars'] for r in valid)})
    report = {'protocol':protocol,'cases_sha256':hashlib.sha256(json.dumps(cases,ensure_ascii=False,sort_keys=True).encode()).hexdigest(),
              'corpus_sha256':index['corpus_sha256'],'same_rules_engine_docs':True,'baseline_annotations':len(baseline['entries']),
              'expanded_annotations':len(current['entries']),'summaries':summaries,'rows':rows,'calls':calls,
              'notes':['outside_reference 是不在预定参考方案的候选，不能直接当作无关结果。',
                       'oracle_stop 指参考答案可提前结束的查询位置，不是独立 Agent 的实际决策成本。',
                       '固定拆分路径在所有方案中全部执行；字符数不是 token，不含模型推理或尚未读取的详情。',
                       '并发实际调用用于检索质量对照，耗时不用于宣称单次响应性能。']}
    report_path = report_dir / 'product-evaluation.json'
    if report_path.exists():
        previous = json.loads(report_path.read_text())
        if previous.get('cases_sha256') == report['cases_sha256'] and previous.get('corpus_sha256') == report['corpus_sha256']:
            for key in ['adaptive_review_calls', 'rank_diagnostics']:
                if key in previous: report[key] = previous[key]
    report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    write_product_report(report, cases)
    print(json.dumps(summaries,ensure_ascii=False,indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--legacy-root', type=Path, help='只读原 MCP 基线源码（可选）')
    parser.add_argument('--scenarios', action='store_true', help='只运行冻结的新增模组案例，通过真实 skill CLI 查询')
    parser.add_argument('--gap-checks', action='store_true', help='通过 skill CLI 查询缺口补充后的改写与相反意图案例')
    parser.add_argument('--community', action='store_true', help='比较 Bukkit/Nukkit 方法名和中文能力的实际检索结果')
    parser.add_argument('--products', action='store_true', help='对照原文、84 条和扩展标注的冻结产品需求，通过真实 skill CLI 调用')
    args = parser.parse_args()
    data = json.loads((ROOT / 'knowledge/retrieval-cases.json').read_text())
    if args.products:
        evaluate_products(data)
        return
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
