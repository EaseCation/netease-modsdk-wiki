---
title: Android项目设置
category: 指南
description: 如何在Android平台上设置项目
mentions:
    - Etanarvazac
    - MedicalJewel105
    - TheItsNameless
    - ThomasOrs
hidden: true
---

# Android项目设置

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 工具选择

为Android平台寻找合适的附加包开发工具并非易事，但我们已尽力为您收集了Google Play上的优质应用。Android开发需要以下三类工具组合使用：

1. **文件管理器**：若设备运行Android 12或更高版本，需支持创建ZIP压缩包
2. **代码编辑器**：任意文本编辑器均可，但专业编辑器能提供语法高亮
3. **图像编辑器**：需要支持像素级编辑（系统自带编辑器通常无法满足）

### 文件管理器推荐

以下管理器支持ZIP压缩包操作及`Android/data`目录只读访问：

1. [**X-Plore**](https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore) - 双面板树形视图，内置文本编辑器（非代码专用），支持ZIP/7zip/RAR等格式。Root设备可编辑`Android/data`及系统目录
2. [**Total Commander**](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander) - 双面板界面，支持ZIP/RAR压缩包，列表视图展示文件，部分功能需插件扩展

### 代码编辑器推荐

1. **Acode**：
   - [免费版](https://play.google.com/store/apps/details?id=com.foxdebug.acodefree) 含可关闭的广告
   - 支持GitHub集成（需个人访问令牌）、FTP/SFTP协议
   - 提供100+语言语法高亮（含JSON）、多标签编辑、丰富主题
   - 开源项目，另有[付费版](https://play.google.com/store/apps/details?id=com.foxdebug.acode)支持深度主题定制

:::info
Acode是当前Android平台唯一持续更新的专业代码编辑器。其他编辑器功能有限或已停止维护。若您有其他推荐，欢迎贡献至本指南。
:::

### 图像编辑器推荐

1. [**Pocket Paint**](https://play.google.com/store/apps/details?id=org.catrobat.paintroid) - 轻量级基础编辑器，支持JPG/PNG/ORA格式，开源项目
2. [**Pixly**](https://play.google.com/store/apps/details?id=com.meltinglogic.pixly&hl=en) - 无广告内购，提供丰富笔刷工具和调色板管理
3. [**Pixel Art editor**](https://play.google.com/store/apps/details?id=net.spc.app.pixelarteditor&hl=en) - 极简像素画工具，适合制作纹理占位图

## 工作区搭建

:::tip
本文中：
- "BP"指行为包目录
- "RP"指资源包目录
- 路径表示`../<当前位置>`指代上级路径（如`/one/two/three/file.txt`简写为`../three/file.txt`）

若设备已Root，可直接使用`/Android/data/com.mojang.minecraftpe/files/games/com.mojang`开发目录。未Root设备请按以下步骤操作。
:::

1. 使用文件管理器进入内部存储（通常为根目录`/`或`/storage/emulated/0/`）
2. 创建项目总目录（示例：`/Minecraft附加包/我的首个附加包`）
3. 在总目录下分别建立行为包和资源包子目录（示例：`../我的首个附加包/addonBP`和`../我的首个附加包/addonRP`）

以Acode为例配置工作区：

1. 打开Acode点击左上角文件浏览器图标
2. 选择"打开文件夹" → "添加存储" → "选择文件夹"
3. 导航至项目总目录（如`/Minecraft附加包`）并授权访问
4. 完成配置后即可在侧边栏快速访问项目文件

:::tip
长按目录可快速新建文件/文件夹，建议保持整洁的项目结构。
:::

## 清单文件配置

:::warning
注意：
- 所有文件/文件夹名称需严格匹配示例
- 错误命名是常见报错原因
- 新建文件时注意移除自动添加的`.txt`扩展名
- Acode中`untitled.txt`会全选文件名，便于修改扩展名
:::

每个附加包都需要唯一的`manifest.json`清单文件。以下是基本配置模板：

::: code-group
```json [BP/manifest.json]
{
	"format_version": 2,
	"header": {
		"name": "pack.name",
		"description": "pack.description",
		"uuid": "...",
		"version": [0, 0, 1],
		"min_engine_version": [1, 16, 0]
	},
	"modules": [
		{
			"type": "data",
			"uuid": "...",
			"version": [0, 0, 1]
		}
	]
}
```

```json [RP/manifest.json]
{
	"format_version": 2,
	"header": {
		"name": "pack.name",
		"description": "pack.description",
		"uuid": "...",
		"version": [0, 0, 1],
		"min_engine_version": [1, 16, 0]
	},
	"modules": [
		{
			"type": "resources",
			"uuid": "...",
			"version": [0, 0, 1]
		}
	]
}
```
:::

### 清单参数说明

| 参数                 | 说明                                                                 |
|----------------------|----------------------------------------------------------------------|
| `format_version`     | 清单语法版本（推荐使用2）                                            |
| `name`               | 包名称（后续通过语言文件定义）                                       |
| `description`        | 包描述（显示在游戏内名称下方）                                       |
| `uuid`               | 唯一标识符（需使用UUIDv4生成）                                       |
| `version`            | 附加包版本号（格式[主,次,修订]）                                     |
| `min_engine_version` | 最低兼容游戏版本                                                     |
| `modules.type`       | 包类型：`data`=行为包，`resources`=资源包                           |

### UUID生成指南

UUID（通用唯一识别码）格式为`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`，需使用[在线生成工具](https://www.uuidgenerator.net/version4)创建版本4的随机UUID。每个清单文件需要两个不同的UUID，共需生成4个唯一值。

## 包图标配置

为附加包添加识别图标（建议64x64 PNG格式），将图片命名为`pack_icon.png`并放置于两个包的根目录：

<WikiImage src="/assets/images/guide/project-setup/pack_icon.png" alt="包图标示例" pixelated/>

<BButton
    link="/assets/images/guide/project-setup/pack_icon.png" download
    color=default
>下载示例图标</BButton>

## 多语言配置

在以下路径创建语言文件，使用`§`符号实现文字格式化（格式代码参考[Minecraft颜色代码](https://htmlcolorcodes.com/minecraft-color-codes/)）：

::: code-group
```txt [BP/texts/en_US.lang]
pack.name=§2我的§l首个§r§2行为包！
pack.description=本附加包由Wiki贡献者制作！
```

```json [BP/texts/languages.json]
["en_US"]
```

```txt [RP/texts/en_US.lang]
pack.name=§2我的§l首个§r§2资源包！
pack.description=本附加包由Wiki贡献者制作！
```

```json [RP/texts/languages.json]
["en_US"]
```
:::

## 导入附加包

1. 选中行为包和资源包目录
2. 创建ZIP压缩包
3. 重命名文件扩展名为`.mcaddon`
4. 点击生成的文件自动导入游戏

![](/assets/images/guide/project-setup-android/zip-addon.png)

导入成功后游戏会显示提示横幅，或在`设置 > 存储`中确认包状态。若导入失败请参考[问题排查指南](/wiki/guide/troubleshooting)。

## 开启内容日志

:::warning
内容日志是调试附加包的重要工具，请务必开启
:::

![](/assets/images/guide/content_log.png)

1. 进入`设置 > 创作者`
2. 启用两个内容日志选项
3. 游戏中按`Ctrl+H`可打开日志界面

## 创建测试世界

1. 点击**创建新世界**
2. 确保以下设置：
   - 实验性玩法：全部开启
   - 默认游戏模式：创造模式
   - 世界权限：仅邀请（单人游戏不影响）
   
   ![](/assets/images/guide/project-setup/settings_1.png)
   ![](/assets/images/guide/project-setup/settings_2.png)

3. 激活行为包与资源包
4. 点击**创建**

## 最终项目结构

完成配置后项目应包含以下文件：

<FolderView :paths="[
	'com.mojang/development_resource_packs/guide_RP/manifest.json',
	'com.mojang/development_resource_packs/guide_RP/pack_icon.png',
	'com.mojang/development_resource_packs/guide_RP/texts/en_US.lang',
	'com.mojang/development_resource_packs/guide_RP/texts/languages.json',
	'com.mojang/development_behavior_packs/guide_BP/manifest.json',
	'com.mojang/development_behavior_packs/guide_BP/pack_icon.png',
	'com.mojang/development_behavior_packs/guide_BP/texts/en_US.lang',
	'com.mojang/development_behavior_packs/guide_BP/texts/languages.json',
]"></FolderView>

## 学习总结

:::tip 已掌握内容：

- `com.mojang`目录结构解析
- 移动端工作区配置方法
- 清单文件的作用与配置
- UUID的生成与应用
- 包图标的制作规范
- 语言文件的配置原理

:::

## 进度追踪

<Checklist>

- [x] 完成项目基础配置
- [ ] 创建自定义物品
- [ ] 创建自定义实体
- [ ] 创建自定义方块

</Checklist>