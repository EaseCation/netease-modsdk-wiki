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

### 预览构建结果

```bash
npm run docs:preview
```

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
