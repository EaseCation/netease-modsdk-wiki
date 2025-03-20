---
title: contents.json
mentions:
    - MedicalJewel105
    - Osaxely
    - SirLich
    - solvedDev
    - Joelant05
    - Jorginhor
    - TheItsNameless
---

# contents.json

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

`contents.json` 是游戏用于更高效处理资源包文件的配置文件。该文件 _可能_ 主要为市场内容创作者和 Mojang 设计，资源包即使不包含此文件仍可正常运行。

以下是关于该文件使用方式的说明。

## 文件结构

`contents.json` 位于附加包目录的根路径，包含资源包内所有文件的路径列表。示例：

::: code-group
```json [RP/contents.json]
{
	"content": [
		{
			"path": "texts/en_US.lang"
		},
		{
			"path": "contents.json"
		},
		{
			"path": "manifest.json"
		},
		{
			"path": "animations/my_animation.animation.json"
		},
		{
			"path": "animation_controllers/my_ac.ac.json"
		},
		{
			"path": "entity/my_entity.entity.json"
		},
		{
			"path": "textures/textures_list.json"
		},
		{
			"path": "textures/blocks/my_block.png"
		}
	]
}
```
:::

<FolderView
	:paths="[
    'RP/texts/en_US.lang',
    'RP/manifest.json',
    'RP/contents.json',
    'RP/animations/my_animation.animation.json',
    'RP/animation_controllers/my_ac.ac.json',
    'RP/entity/my_entity.entity.json',
    'RP/textures/texture_list.json',
    'RP/textures/blocks/my_block.png'
]"
> </FolderView>

## 自动化生成

`contents.json` 可通过游戏自动生成，这种方式能有效减少手动配置错误。首先需要在附加包根目录创建空文件并添加空对象：

::: code-group
```json [BP|RP/contents.json]
{}
```
:::

游戏会在下次启动时自动填充该文件内容。

## 补充说明

-   自动生成功能适用于任意位置的资源包（开发文件夹或普通文件夹均可）
-   不需要为子包单独创建多个 `contents.json`，根目录文件已足够
-   该文件并非附加包运行的必要条件

<!-- 保留原始专有名词：Tick、Component、Entity、Block、Item 等未翻译 -->
<!-- FolderView 组件保持原样以兼容 Vitepress 功能 -->
<!-- code-group 语法已正确替换原始 CodeHeader 组件 -->