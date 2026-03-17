将上游网易官方仓库的最新文档同步到本项目，构建验证，并展示变更摘要。

## 上游来源

| 仓库 | 目标目录 |
|------|----------|
| `https://github.com/MCNeteaseDevs/mc-netease-sdk.git`（仓库根） | `docs/mcdocs/` |
| `https://github.com/MCNeteaseDevs/netease-bedrock-wiki.git` 的 `mcguide/` | `docs/mcguide/` |
| `https://github.com/MCNeteaseDevs/netease-bedrock-wiki.git` 的 `mconline/` | `docs/mconline/` |

## 执行步骤

### 第一步：同步上游文档

1. 确认当前工作目录是项目根目录（含 `package.json` 的目录）
2. 运行同步脚本：
   ```
   node scripts/sync-docs.mjs
   ```
3. 等待脚本完成（需要网络访问 GitHub，首次运行较慢，后续增量更新很快）
4. 展示脚本输出的同步报告（新增/修改/删除的文件数量和列表）

### 第二步：构建验证

同步完成后，**必须**运行 VitePress 构建来检查上游文档是否引入了新的构建错误：

```
node --max_old_space_size=8192 node_modules/.bin/vitepress build docs 2>&1 | tail -50
```

构建需要 **8GB 堆内存**（文档量大），耗时约 3-4 分钟。

### 第三步：修复构建错误（如有）

如果构建失败，按照下方「已知问题与防护机制」逐项排查。修复后重新构建，直到构建成功。

### 第四步：上传 Algolia 搜索索引

构建成功后，运行 Algolia 搜索数据上传脚本，确保搜索引擎的索引与最新文档同步：

```
npm run docs:algolia
```

该脚本需要环境变量 `ALGOLIA_APP_ID` 和 `ALGOLIA_ADMIN_KEY`（从 `.env` 文件或环境变量读取）。如果缺少这些变量，脚本会报错，此时提示用户配置 `.env` 文件。

### 第五步：展示结果

全部完成后，展示同步报告、构建结果和 Algolia 上传结果，询问用户是否需要提交这些变更（不自动 commit）。

---

## 已知问题与防护机制

上游文档并非为 VitePress 编写，同步后可能触发以下构建错误。项目已在 `docs/.vitepress/config.mts` 中内置了两个 Vite 插件自动处理大部分问题，但偶尔仍需手动修复。

### 1. Git LFS 图片文件缺失（已自动处理）

**原因**：上游 `netease-bedrock-wiki` 使用 Git LFS 存储图片，但 LFS 流量超限，无法下载实际文件。

**防护**：
- 同步脚本使用 `GIT_LFS_SKIP_SMUDGE=1` 跳过 LFS 下载，避免克隆失败
- `config.mts` 中的 `handle-missing-lfs-assets` 插件：当 markdown 引用的图片文件不存在时，返回空字符串而非报错，页面中该图片显示为空白

**通常无需手动处理。** 如果出现新的图片格式（如 `.avif`），需要在插件的正则中添加该扩展名。

### 2. Vue 模板语法冲突（已自动处理）

**原因**：上游 API 文档包含 Java/Kotlin 泛型标注（如 `<T>`、`<ItemStack>`），VitePress 的 `html: true` 会将其作为 HTML 标签传给 Vue 编译器，导致 "Element is missing end tag" 错误。

**防护**：`config.mts` 中的 `escape-vue-syntax-in-markdown` 插件自动处理以下情况：
- `<PascalCase>` 泛型标注 → 转义为 `&lt;PascalCase&gt;`
- `<BR>`、`</BR>` 等大写 HTML 标签 → 规范化为小写 `<br>` 或移除非法闭合标签
- 代码块中的 `${...}` → 转义为 `\${...}` 防止 Vue 模板表达式解析

**重要限制**：该插件**仅对上游同步目录**生效（`/mcdocs/`、`/mcguide/`、`/mconline/`），**不影响** `wiki/` 等本地目录中使用的合法 Vue 组件（如 `<Checklist>`、`<MyFeatures>`）。如果将来有新的同步目标目录，需要在插件的路径过滤条件中添加。

**通常无需手动处理。** 但如果上游出现了新的模式（如带属性的泛型 `<Map key="val">`），可能需要扩展插件的正则。

### 3. Docusaurus JSX 语法（需手动修复）

**原因**：上游个别文件可能包含 Docusaurus 特有的 JSX 语法（如 `<Image img={require('...')} />`），VitePress 无法解析。

**症状**：构建错误提示 "Unexpected token" 或 JSX 相关报错。

**修复方法**：将 JSX 语法替换为标准 markdown：
```markdown
<!-- 替换前 (Docusaurus JSX) -->
<Image img={require('./images/example.png')} />

<!-- 替换后 (标准 Markdown) -->
![示例](./images/example.png)
```

### 4. 其他未知的构建错误

如果遇到新类型的构建错误：
1. 先看完整错误信息，定位到具体文件和行号
2. 读取出错文件的相关内容
3. 判断是上游内容问题还是 VitePress 兼容性问题
4. 如果是通用模式（多文件出现同类问题），考虑在 `config.mts` 的 Vite 插件中添加自动处理
5. 如果是个别文件的特殊问题，直接修改该文件内容

---

## 本地自维护文件

部分文件是本项目自行维护的（上游不存在），如各目录的 `0-欢迎.md` 导航主页。这些文件在 `scripts/sync-docs.mjs` 的 `LOCAL_FILES` 常量中注册，rsync 同步时会自动跳过，不会被 `--delete` 删除。

如需为某个同步目录添加新的本地文件，编辑 `scripts/sync-docs.mjs` 中的 `LOCAL_FILES`：
```javascript
const LOCAL_FILES = {
  'docs/mcguide': ['0-欢迎.md'],
  'docs/mconline': ['0-欢迎.md'],
  // 添加新条目：'docs/mcdocs': ['my-local-page.md'],
};
```

## 顺序配置

如需覆盖页面顺序（当上游文件名无数字前缀时），编辑 `scripts/sync-order.json`，格式如下：
```json
{
  "mcguide": {
    "relative/path/to/file.md": 5
  }
}
```
每次同步后，脚本会将配置的 `order` 值注入对应文件的 frontmatter。侧边栏排序优先级：文件名数字前缀 > frontmatter `order` > frontmatter `nav_order`。

## 错误处理

- 若 git clone/pull 失败，展示错误并提示检查网络或 GitHub 访问
- 若 rsync 失败，展示具体错误信息
- 临时克隆缓存在 `/tmp/netease-sync-cache/`，保留以加速下次同步；如需强制重新克隆：`rm -rf /tmp/netease-sync-cache`

## 关键文件索引

| 文件 | 作用 |
|------|------|
| `scripts/sync-docs.mjs` | 核心同步脚本（克隆/rsync/order注入） |
| `scripts/sync-order.json` | 页面顺序覆盖配置 |
| `scripts/algolia-upload.mjs` | Algolia 搜索索引上传脚本 |
| `docs/.vitepress/config.mts` | Vite 插件（LFS兜底 + Vue语法转义） |
| `.claude/settings.local.json` | Claude Code 权限白名单 |
| `.env` | Algolia 密钥（`ALGOLIA_APP_ID`、`ALGOLIA_ADMIN_KEY`） |
