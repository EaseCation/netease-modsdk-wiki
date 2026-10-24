# 我的世界中国版 ModSDK Wiki 镜像

这是[我的世界中国版 ModSDK](https://mc.163.com/dev/) 官方文档的镜像站点，基于 VitePress 构建。本项目旨在提供完整的 ModSDK 文档参考，包括 API 文档、开发指南和教学课程。

## 项目结构

- `docs/` - 文档源文件
  - `mcdocs/` - API 文档
  - `mcguide/` - 开发指南 
  - `mconline/` - 教学课程
  - `.vitepress/` - VitePress 配置
- `scripts/` - 工具脚本

## 如何使用

### 拉取项目

由于包含众多图片，本项目使用 lfs 进行大文件管理。
请确保已安装 Git LFS。

```bash
git lfs install
git clone htps://github.com/EaseCation/netease-modsdk-wiki.git
```

### 安装依赖

```bash
npm install
```

### 同步官方文档与 MCP 快照

```bash
npm run docs:sync
```

同步使用三个来源，默认在临时缓存中更新各仓库的 `main`，不会修改旁边已有的源码仓库：

| 来源 | 用途 |
| --- | --- |
| `MCNeteaseDevs/mc-netease-sdk` | API、Apollo、预设文档基础版本 |
| `MCNeteaseDevs/netease-bedrock-wiki` | 开发指南、教学课程及附件 |
| `MCNeteaseDevs/modsdk_mcp_server` 的 `docs/` | 补充较新的官方文档快照，例如 ModSDK 3.9 |

MCP 页面按 `source_url` 映射回镜像路径，以 `last_modified` 与基础页面的 Git 修改时间比较；无日期的页面只补缺，不覆盖已有页面。当前镜像中有来源日期的较新页面也参与比较，避免回退。Git 日期是没有官网日期时的保守依据，并不代表官网内容发布时间。MCP 的 `input/` 旧教程不覆盖教程上游。原文保持原样，仅已有 `sync-order.json` 配置会注入排序字段。

可以显式使用本机快照；这些路径只读使用，不会自动拉取更新：

```bash
npm run docs:sync -- --mcp-source ../modsdk_mcp_server --wiki-source ../netease-bedrock-wiki
```

还支持 `--sdk-source PATH` 和 `--cache-dir PATH`。默认会尽量使用相邻同名 Git 仓库作为克隆种子，再从官方远端更新；缓存存在本地修改、更新失败或 checkout 不完整时直接报错。

附件会随文档一起准备：

- LFS 指针必须恢复为真实文件，并核对 SHA-256 和字节数；优先复用本地镜像、相邻上游仓库及 LFS 对象缓存。
- 缺失附件尝试从固定提交的 GitHub 媒体地址和官网获取。官网使用带哈希的资源名时，解析对应原文网页的实际引用，仅接受唯一对应项。
- 扫描 Markdown、HTML 中的本地图片、视频和下载链接；排除外链、`mailto:`、代码示例。HTTP 200 的 HTML 错误页不会作为附件保存。
- 任一附件仍未解决时，命令退出失败，列出文件与引用页面，本次文档不会写入工作区。

来源、选用的 MCP 页面和附件结果保存在 Git 目录的 `sync-docs-state.json`；被替换文件的原始字节保存在 `sync-docs-backup/`。只保留一份当前同步回滚现场；发现未完成的恢复现场时拒绝覆盖。临时合并目录会在结束时清理，上游 Git 缓存保留供下次增量更新。

同步完成后运行 `npm run docs:build` 验证站点构建。同步和构建均不会发布站点、上传 Algolia 索引或自动提交 Git。

### 本地开发

启动开发服务器并实时预览文档：

```bash
npm run docs:dev
```

服务器启动后，可通过浏览器访问 `http://localhost:5173` 查看文档。

### 构建文档

生成静态文件用于部署：

```bash
npm run docs:build
```

构建完成后的文件将位于 `.vitepress/dist` 目录中。

构建已启用 VitePress 的死链检查。`scripts/doc-links.ts` 在渲染时兼容已确认的旧路径、大小写和重复井号锚点；没有实际目标的章节不会猜测映射。同步得到的上游 Markdown 保持原样。

完成构建后，还可以检查生成 HTML 中的链接、附件和页内锚点：

```bash
npm run docs:check-links
```

该命令需要 Python 3（仅使用标准库），发现缺失路径或锚点时返回非零退出码。当前清单保存在 Git 目录的 `docs-link-report.md` 和 `docs-link-report.json`，每次覆盖更新；它检查站内产物，不将外部网站的访问限制误报为本地死链。

### 更新网站全局搜索（Algolia）

网站搜索和 AI skill 使用同一份 `knowledge/annotations.json`，但执行不同的检索算法。上传脚本先调用 API 索引构建器核验原文哈希，再按文档路径和标题锚点关联标注；全部标注必须成功关联。搜索字段包括 API 名称、中文基础标签、别名、官方描述、常见问法、能力说明和注意事项，按上述优先级检索，原始 Markdown 不会被修改。

```bash
# 只生成并检查，不访问搜索服务，也不需要凭据
npm run docs:algolia -- --dry-run

# 更新线上搜索；从本仓库 .env 或进程环境读取凭据
npm run docs:algolia
```

上传需要 `ALGOLIA_APP_ID`、`ALGOLIA_ADMIN_KEY`。脚本只扫描文档源码，按 VitePress 的真实标题锚点生成 `https://mcwiki.easecation.net` 链接，完整 JSON 记录不超过 8,000 字节；超长正文完整切块，不截断段落。结果按 URL 去重，避免同一章节的多个分块挤占结果。网页搜索默认排除 Preset；输入“预设 SetAttrValue”或“Preset SetAttrValue”可明确切换预设范围，“不要预设”仍保持排除。

上传先创建独立暂存索引，保留线上人工同义词和规则，更新字段权重并等待每批入库；核对记录总数及真实搜索结果后原子替换正式索引，同时清除旧文档残留。替换前失败不改动线上索引，命令以非零状态退出；回执覆盖保存到 Git 目录的 `algolia-upload-report.json`。网站部署与 Algolia 更新是两个独立步骤，修改标注后需执行搜索更新。

### 预览构建结果

```bash
npm run docs:preview
```

## CI 部署运行环境

主分支部署使用 `frp-macmini` 上的仓库专用 runner：`frp-macmini-modsdk-wiki`，标签为 `self-hosted`、`macOS`、`ARM64`、`modsdk-wiki-deploy`。安装目录为 `/Users/fangyizhou/.local/share/github-runners/netease-modsdk-wiki`，工作区位于该目录的 `_work`。

该 runner 是独立的 macOS 用户服务；现有 `CodeFunCore` 的 OrbStack 容器 runner 不共用此目录或服务。管理时进入上述目录，使用 `./svc.sh status`、`./svc.sh start`、`./svc.sh stop`，不要操作其他 runner 的服务或容器。

部署仅接受本仓库 `main` 的 push 和手动触发，并通过 concurrency 串行执行。Node 20 由 setup-node 管理；Git LFS 位于专用 runner 的 `tools/`。阿里云 CLI 使用经 SHA-256 校验的 macOS ARM64 包，二进制和 STS 配置位于本次任务的 `RUNNER_TEMP` 子目录，结束时清理，不改写宿主机 `~/.aliyun` 配置。

## 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 相关链接

- [我的世界中国版 ModSDK 官网](https://mc.163.com/dev/)
- [VitePress 文档](https://vitepress.dev/)
- [GitHub 仓库](https://github.com/EaseCation/netease-modsdk-wiki)

## API 知识与查询试点

原文保持在 `docs/mcdocs`、`docs/mcguide`、`docs/mconline`；人工补充独立维护于 `knowledge/annotations.json`。当前共 1,709 条独立标注：普通 ModSDK 的 1,636 个 API 索引条目中覆盖 1,635 个（99.9%，按端侧和文档变体计），另有 74 条事件标注（298 个普通事件的 24.8%）。覆盖世界、实体、玩家、方块、物品、UI、输入、模型、特效、物理及通用工具。唯一未扩写的 API 条目是原文只说明零件界面的 `GetSelf`；Preset 范围不参与这项覆盖率。它们不是官方新增定义。

每条标注用完整 API 身份（范围、种类、端侧、组件、名称）关联原文章节，并绑定 `source_sha256`；依赖枚举或其他接口的补充同时记录 `source_dependencies`。同步后章节变化、关联目标缺失都会使构建失败；维护者需阅读新原文、修订补充内容，再更新哈希，不应批量盲目刷新哈希绕过复核。搜索返回短 ID 以减少上下文，详情保留完整身份、组件和来源。

```sh
npm run api:build
npm run api:query -- resolve --plan-file /path/to/plan.json --limit 8
npm run api:query -- search '使用物品' --side server --strategy annotated
npm run api:query -- detail ServerItemTryUseEvent --side server --examples 0
npm run api:query -- detail AttrType --part raw --page-chars 6000
```

默认 `scope=modsdk` 排除 Preset API、零件以及预设教程。只有明确需要预设时传 `--scope preset`，比较两者时传 `--scope all`；关键词“预设”本身不会自动放开范围。原始页面继续保留供直接浏览。常规结构化字段剔除上游统一的零件监听尾注，`raw` 仍完整保留。

当前索引提供 3.9 快照，不证明所有 API 在任意旧版本可用；`--sdk-version` 对其他版本明确报错。未给出端侧或同名组件存在歧义时，详情返回候选供选择。搜索摘要不替代合同，默认合同包含全部备注；长原文/备注/示例有显式分页，输出超预算报错而非静默截断。CLI 默认预算 18000 字符，可以在子命令前用 `--max-chars` 调整。

`npm run docs:build` 和 `docs:dev` 会先生成索引。`scripts/api-notes.ts` 在 Markdown 渲染 token 中插入“开发补充”卡片，默认显示全部标签与展开入口，展开后显示用途、注意事项、常见问法和关联接口，不改写上游 MD，不需要额外浏览器脚本。开发服务期间改标注后需重新启动以刷新卡片。

构建产物 `.api-index/` 与 `docs/public/ai/` 不进入 Git；部署会提供 `/ai/manifest.json` 和 `/ai/index.json.gz`，包含版本、内容哈希及原文记录，可供后续远程查询客户端复用。当前 skill/CLI 使用本机源码，不会自动联网下载或将文档发送到模型/向量服务。本地输入文件清单、大小或修改时间变化会触发重建；构建重新计算原文章节哈希。

### 检索方案与当前效果

协议 2 提供 `raw` 原文词法检索和 `annotated` 标注增强检索。多职责需求由 Agent 拆成结构化计划，`resolve --plan-file` 先给每项分配候选，再补必要前置和额外候选。对象、读写、范围和否定约束独立处理；事件使用单独通道。限制文本命中单独放入 `limitations`，不能作为能力成立的证据。

Bukkit 常用能力的对应关系也保存在独立标注中：系统聊天、模拟玩家发言、中央标题、动作栏、Tip/Popup、记分板读写分别定位；需要原生命令或多步组合时明确说明。消息接口的玩家对象及单人/全体范围经过复核，避免仅因文档位于“世界”分类就漏掉玩家筛选结果。

事件阶段用于优先排序，不把添加前、获得时、刷新和移除等关联事件全部滤掉。`results` 是主候选，`related` 返回关联阶段供理解生命周期；主候选阶段不匹配时保留 `timing_review`，不宣称满足当前职责。原文只写“变化时”的事件不擅自认定为“变化后”。

固定回归题库与执行入口统一维护在独立 [Skill 仓库](https://github.com/EaseCation/netease-modsdk-skill/tree/main/evals)，覆盖产品需求、相反意图、支持边界、关联阶段和协议拒绝。Wiki 部署前调用该题库并显式绑定当前 Wiki；本地执行：

```sh
MODSDK_WIKI_ROOT="$PWD" python3 ../netease-modsdk-skill/scripts/evaluate.py
```

这些检查使用冻结语义计划，不等于 Agent 自动拆解需求的盲测。历史对照结果在 [knowledge/evaluation.md](knowledge/evaluation.md)，旧题库和旧执行器封存在 Git 提交 `2ae0d396c1f4e079b685e73e45245e73a515a9a7`；不再维护两个活跃评估入口。字符统计不是模型 token 统计。

### Skill 与 MCP 共用

Skill 已拆分到公开的独立 Git 仓库 [EaseCation/netease-modsdk-skill](https://github.com/EaseCation/netease-modsdk-skill)，不再在 Wiki 内保存副本。独立 skill 通过自身 `.env` 或环境变量 `MODSDK_WIKI_ROOT` 绑定本仓库，并调用这里唯一的 `scripts/api_knowledge.py`。其安装入口支持浅克隆、partial clone、Markdown 稀疏检出和跳过 LFS 资源；只需要查询时不下载图片、视频或完整网页资源。缺少查询入口或标注的旧 Wiki 会报错，不提供兼容回退。发布时应先发布含查询功能的最新版 Wiki。

本仓库部署检索验收会检出独立 Skill；调用时通过 `MODSDK_WIKI_ROOT` 显式绑定当前 Wiki。社区迁移需求继续先解释中文基础能力，保留对象、读写动作和生命周期时机，再核对合同。

配套 `modsdk_mcp_server` 试点通过 `MODSDK_WIKI_ROOT` 加载同一实现，提供紧凑搜索、批量详情和 `resolve_api_requirement`。Skill 负责指导按需求逐步读取，MCP 保留结构化工具入口；两者可以共存，无需为了换成 skill 而复制检索逻辑。源码变更和本地校验不等于已经替换运行中的 MCP 或发布 Wiki。

标注应保持简短：标签为 3–6 个中文基础能力词，不放英文 API/类型名、端侧或玩法场景；检索别名承接近义表达，补充正文只说明能力、操作步骤和限制，不加入具体玩法、道具或虚构业务案例，也不显示复核日期等编辑记录，不复制完整枚举、参数或备注。复合需求的组合关系在查询计划中表达，不附着为通用接口的固有职责。

### 标注维护方式

当前由 Codex 逐条对照官方原文直接编写并复核。在原有 84 条基础上，按组件补充 1,565 条 API 标注，再补充 60 条关键事件标注，并为同文档、同组件、同端侧的明确读写对添加关联。来源哈希保存在每条标注中，维护范围见 `knowledge/annotation-review.json`。能力说明通常一至两句，重要限制精简提示，完整参数与备注仍以原文为准。页面默认展示全部标签，其余内容折叠。

DeepSeek 试验已按用户要求停止，现有草稿不自动导入。历史试点结果保留在 [标注试点](knowledge/annotation-pilot.md)；`scripts/draft-api-annotations.py` 与调用 overlay 仅为历史实验工具，除非用户重新明确启用，不用于当前维护流程。

本轮使用 20 个基础能力查询检查实际文档检索，目标接口均出现在标注检索的前五项。这是维护期间的定向检查，不代表任意表达都能完整召回；API 覆盖率也不代表全部事件、枚举已增加人工标注。
