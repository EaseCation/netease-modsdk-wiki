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
git clone https://github.com/EaseCation/netease-modsdk-wiki.git
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

网站搜索和 AI skill 使用同一套独立概念、能力事实与组合关系，但执行不同的检索算法。上传脚本先调用 API 索引构建器核验原文哈希，再按文档路径和标题锚点关联标注；全部标注必须成功关联。搜索字段包括 API 名称、中文基础标签、别名、官方描述、常见问法、能力说明和注意事项，按上述优先级检索，原始 Markdown 不会被修改。

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

## API 能力知识与查询

上游 Markdown 保持原样，独立知识采用 v3：[协议与维护规则](knowledge/README.md)。`annotations.json` 关联接口事实，`concepts.json` 统一中文基础能力及同义表达，`recipes.json` 维护可复用能力链。全量标注已迁移格式，未核验字段保留 unknown；标注数量不能等同于能力核验覆盖率。

来源按正确端侧与组件合同绑定哈希；字段冲突、无效概念引用或来源变化会阻止构建。别名分开归一化，返回值参与召回，事实用于区分动作、对象、属性和作用范围。未知分类保留待核验，不能被当作明确不支持。

```sh
npm run api:build
npm run api:query -- resolve --plan-file /path/to/plan.json --limit 12
npm run api:query -- search '使用物品' --side server
npm run api:query -- detail ServerItemTryUseEvent --side server --examples 0
npm run api:query -- --verbose detail PlayerAttackEntityEvent --side server
```

默认返回紧凑 JSON：必要候选、子目标关联、缺口、限制和组合步骤；正常状态、空字段、重复查询、版本与哈希不默认返回。子目标出现 state 表示仍需处理；缺少 state 只表示已匹配所请求事实，不代表游戏实机验证。详情保留参数、返回、备注、组件和来源路径，诊断元数据使用 `--verbose`。

默认范围排除 Preset；只有明确需要时使用 `--scope preset` 或 `--scope all`。当前语料为 ModSDK 3.9 快照，不证明任意历史版本兼容。长原文、备注、示例显式分页，预算不足时报错，不截断关键合同后声称完整。

`docs:build` 和 `docs:dev` 先生成统一索引。网页显示全部精简标签，其余能力、事件阶段、可修改字段及开发补充折叠；不修改原始 Markdown。搜索上传使用相同能力与概念数据，按端侧及组件分开记录。构建产物通过 `/ai/manifest.json` 与 `/ai/index.json.gz` 发布，各出口共享语料指纹。

### 独立 Skill 与验证

[EaseCation/netease-modsdk-skill](https://github.com/EaseCation/netease-modsdk-skill) 是配套查询入口。通过 `.env` 或 `MODSDK_WIKI_ROOT` 关联 Wiki；新安装只浅克隆 Markdown、查询代码与知识数据，跳过 LFS 图片。v3 不兼容旧知识协议，需要两仓库配套更新。

稳定题库在 Skill 仓库，Wiki 部署绑定经过验证的 Skill 提交：

```sh
MODSDK_WIKI_ROOT="$PWD" python3 ../netease-modsdk-skill/scripts/evaluate.py
MODSDK_WIKI_ROOT="$PWD" python3 ../netease-modsdk-skill/scripts/evaluate.py --market
MODSDK_WIKI_ROOT="$PWD" python3 ../netease-modsdk-skill/scripts/evaluate.py --guides
npm run docs:algolia -- --dry-run
```

市场题库保留原始声明、40 项职责和两组改述，以及经过原文复核的替代能力、硬负例和未知边界。旧成本基线保留，输出字符数不等于模型 token 数。查询回归、文档构建与静态完整性核对不构成游戏实机验收。

维护时优先修改共享概念与能力事实，不在脚本加入接口名或商品词特例，不把具体案例堆入 Skill。历史 DeepSeek 试验已停止，不自动导入草稿；当前标注由维护者依据原文直接复核。
