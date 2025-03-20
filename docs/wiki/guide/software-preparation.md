---
title: 软件与准备工作
category: 指南
description: 如何配置开发环境
nav_order: 3
prefix: '3. '
mentions:
    - SirLich
    - Dreamedc2015
    - sermah
    - cda94581
    - Joelant05
    - MedicalJewel105
    - TheItsNameless
    - TheDoctor15
    - ChibiMango
    - profeplaysminecraft
    - solvedDev
    - retr0cube
    - SmokeyStack
    - ThomasOrs
---

# 软件与准备工作

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在开始制作附加包之前，您需要先安装必要的工具和软件。虽然在 Windows 10 上进行开发最为便捷，我们也为 Android 和 iOS 用户提供了适用的移动端替代方案。

## 下载 Minecraft 基岩版

-   [Windows 10](https://www.microsoft.com/en-us/p/minecraft-for-windows-10/9nblggh2jhxj?activetab=pivot:overviewtab)
-   [Android](https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=en)
-   [iOS](https://apps.apple.com/us/app/minecraft/id479516143)
-   [在 Linux 上运行 MC](https://discord.gg/VJTZ3KaTx6)

## 选择编辑器

虽然任何文本编辑器都可以创建附加包，但使用专用编辑器会更加高效。优秀的编辑器能提供代码补全、错误检测和内置文档支持。

对于初学者而言，VSCode 和 bridge. 都是不错的选择。移动端用户需要使用对应的移动版编辑器。

### VSCode

VSCode 是一款通用文本编辑器兼 IDE。通过丰富的扩展支持，您可以在纯文本环境下高效开发附加包。适合程序员和高级用户使用。

[⚙️安装 VSCode](https://code.visualstudio.com/)

<Spoiler title="配置 VSCode">

以下扩展能显著提升附加包开发体验：

-   [Blockception 的 Minecraft 基岩版开发扩展](https://marketplace.visualstudio.com/items?itemName=BlockceptionLtd.blockceptionvscodeminecraftbedrockdevelopmentextension)
-   [.mcfunction 支持](https://marketplace.visualstudio.com/items?itemName=arcensoth.language-mcfunction)
-   [.lang 支持](https://marketplace.visualstudio.com/items?itemName=zz5840.minecraft-lang-colorizer)
-   [基岩版定义库](https://marketplace.visualstudio.com/items?itemName=destruc7i0n.vscode-bedrock-definitions)
-   [JSON 美化工具](https://marketplace.visualstudio.com/items?itemName=mohsen1.prettify-json)
-   [拼写检查器（用于文档编写）](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
-   [Snowstorm 粒子编辑器](https://marketplace.visualstudio.com/items?itemName=JannisX11.snowstorm)
-   [UUID 生成器](https://marketplace.visualstudio.com/items?itemName=netcorext.uuid-generator)

</Spoiler>

### bridge.

[bridge.](https://bridge-core.app/) 是专为 Minecraft 附加包开发的轻量级 IDE，具有以下创新功能：
- [实体与方块预览](https://bridge-core.app/guide/features/index.html#file-previews)
- [智能自动补全与文件验证](https://bridge-core.app/guide/features/index.html#auto-completions-and-validation)
- [预设模板快速创建文件](https://bridge-core.app/guide/features/index.html#advanced-file-creation)

既提供面向资深开发者的文本编辑器，也包含适合新手的树状 JSON 编辑器。

#### 下一步
- [了解选择 bridge. 的理由](https://bridge-core.app/guide/why-bridge)
- [阅读 bridge. 入门指南](https://bridge-core.app/guide/index)
- [在线试用 bridge.](https://editor.bridge-core.app/)

### 移动端编辑器

#### Android
-  [ACode 编辑器](https://play.google.com/store/apps/details?id=com.foxdebug.acodefree)
-  [bridge. v2](https://bridge-core.app/)

#### iOS
-  [Kodex](https://apps.apple.com/us/app/kodex/id1038574481)
-  [bridge. v2](https://bridge-core.app/)

## Blockbench

-   [Blockbench](https://blockbench.net/) 是专为 Minecraft 设计的方块化 3D 建模工具，可用于创建模型、纹理和动画。提供网页版并兼容移动设备。

## 图像编辑器

选择图像编辑器时需注意：Minecraft 传统风格基于 16x16 像素艺术。以下是推荐工具：

:::tip
根据使用场景灵活选择工具。许多开发者会组合使用不同软件（例如：用 paint.net 处理大部分图像，用 piskel 制作方块动画）。找到最适合您的工作流程！
:::

### Krita
开源数字绘画软件，功能全面，支持 Windows/macOS。
**+ 优点：** 内置像素画笔工具，界面直观
**- 缺点：** 需要时间熟悉工具

[下载 Krita](https://krita.org/en/)

### GIMP
开源图像处理软件（类似 Photoshop），支持 Windows/macOS。
**+ 优点：** 功能足以应对 Minecraft 图像需求
**- 缺点：** 学习曲线陡峭

[下载 GIMP](https://www.gimp.org/)

### Paint.net
简单易用的图像编辑软件。
**+ 优点：** 快速上手
**- 缺点：** 仅限 Windows 平台

[下载 Paint.net](https://www.getpaint.net)

### Pixilart
网页像素艺术工具。
**+ 优点：** 专为像素设计优化，支持无损缩放
**- 缺点：** 需要网络连接

[使用 Pixilart](https://www.pixilart.com/)

### Piskel
网页像素动画工具。
**+ 优点：** 适合制作逐帧动画
**- 缺点：** 功能较为基础

[下载 Piskel](https://www.piskelapp.com/)

### Libresprite

基于 Aseprite 的开源像素艺术工具。
**+ 优点：** 专为像素艺术定制
**- 缺点：** macOS 支持有限

## 补充资料

:::tip
本指南仅涵盖附加包开发的基础知识，更多进阶内容请参考以下资源：
:::

### 加入 Discord

获取实时帮助的最佳途径：[Discord 服务器](/discord)

### 原版资源包

Minecraft 原版文件是绝佳的参考素材，建议下载并妥善保存：

-   [原版资源包](https://github.com/Mojang/bedrock-samples/releases)

### 文档资源

推荐收藏以下文档网站：

-   [bedrock.dev](https://bedrock.dev/)：技术参考文档
-   [wiki.bedrock.dev](https://wiki.bedrock.dev/)：教程与指南
-   [微软官方文档](https://docs.microsoft.com/en-us/minecraft/creator/)：微软官方附加包门户

### 故障排除

-   若 JSON 格式困扰您，请阅读 [JSON 理解指南](/wiki/guide/understanding-json)
-   遇到奇怪错误时参考 [故障排除指南](/wiki/guide/troubleshooting)
-   仍未解决？欢迎加入 [Discord 服务器](/discord)

### 实用工具

-   [更多工具推荐](/wiki/meta/useful-links)

## 当前进度

<Checklist>

-   [x] 已安装必要软件
-   [x] 已下载原版示例文件
-   [ ] 定位 `com.mojang` 文件夹并创建工作区
-   [ ] 创建首个附加包的清单文件和包图标

</Checklist>