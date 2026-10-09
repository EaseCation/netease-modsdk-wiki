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
