---
title: '创建自定义物品'
category: 指南
description: 如何创建你的第一个自定义物品
nav_order: 5
prefix: '5. '
mentions:
    - KaiFireBorn
    - SirLich
    - cda94581
    - TheItsNameless
    - MedicalJewel105
    - ChibiMango
    - TheDoctor15
    - SmokeyStack
    - unickorn
    - Sprunkles317
    - ThomasOrs
    - davedavis
---

# 创建自定义物品

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在Minecraft中，我们可以创建自定义物品，这些物品可以像普通物品一样被丢弃、交易、合成和使用。该系统具有强大的功能，包括制作食物、燃料和工具的能力。

在本教程中，我们将学习如何创建一个简单的"灵质"（ectoplasm）物品，后续将作为幽灵实体的战利品掉落。

<br>
<img src="/assets/images/guide/custom_item/ectoplasm_view.png" width=150>
<br>
<br>

概念上，物品由两部分组成：

- 视觉元素（纹理、名称）
- 行为特性（物品的行为方式）

首先我们将学习如何创建新物品并定义其行为，下一章节会为这个物品添加纹理使其在游戏中可见。

:::warning
本指南需要开启实验性功能
:::

## 物品行为

创建物品需要定义标识符和行为特性。我们将通过创建文件告诉Minecraft如何为指定物品应用特定行为。

本节结束时我们将完整定义物品的行为特性。

### 组件

不同物品具有不同行为：可以食用猪肉、附魔物品发光、鸡蛋最多堆叠16个。这些都是通过行为组件实现的。

<Spoiler title="组件示例">

::: code-group
```json [示例组件]
"minecraft:food": {...},
"minecraft:foil": true,
"minecraft:max_stack_size": 16
```
:::

</Spoiler>

组件包含决定物品行为的信息。例如`"minecraft:foil"`组件控制物品是否显示附魔光效，设为`true`即可启用。

对于灵质物品，我们设置类似鸡蛋的堆叠上限16，使用`"minecraft:max_stack_size"`组件并设值为`16`。

### 标识符

为了让游戏正确应用组件，我们需要为物品定义唯一标识符。原版鸡蛋的标识符是`minecraft:egg`，包含两部分：

- 命名空间（`minecraft`）
- 物品ID（`egg`）

命名空间用于避免不同附加包之间的冲突。建议使用个人独特标识（如作者缩写或项目简称）。本教程使用`wiki`作为命名空间，更多命名空间信息请参考[此页面](/wiki/concepts/namespaces)。

物品ID是简短描述性名称，这里使用`ectoplasm`。最终标识符为`wiki:ectoplasm`（使用冒号分隔命名空间和ID），后续可通过`/give`命令引用。

### 物品文件

在行为包中创建物品定义文件`BP/items/ectoplasm.json`，基本结构如下：

::: code-group
```json [物品文件结构]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {...},
		"components": {...}
	}
}
```
:::

文件包含两个顶层字段：
- `format_version`：定义使用的附加包系统版本（本教程使用1.16.100启用实验性功能）
- `minecraft:item`：包含物品描述和组件

描述部分定义标识符和分类：

::: code-group
```json [描述部分]
"description": {
	"identifier": "wiki:ectoplasm",
	"category": "Items"
},
```
:::

分类决定物品在创造模式库存中的位置，可选值：`"Nature"`（自然）、`"Equipment"`（装备）、`"Construction"`（建筑）、`"Items"`（物品）。不设置则不会出现在创造菜单，但仍可通过命令获取。

组件部分定义行为特性：

::: code-group
```json [组件部分]
"components": {
	"minecraft:max_stack_size": 16
}
```
:::

完整物品文件应如下所示：

::: code-group
```json [完整物品文件]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "wiki:ectoplasm",
			"category": "Items"
		},
		"components": {
            "minecraft:max_stack_size": 16
		}
	}
}
```
:::

此时物品已具备功能，但缺少纹理和名称。下一章节将完善视觉元素。

## 物品视觉

### 纹理准备

将纹理图片保存至资源包`RP/textures/items/`目录，建议使用物品ID命名（如`ectoplasm.png`），推荐16x16像素PNG格式。

<FolderView
	:paths="[
		'RP/textures/items/ectoplasm.png'
	]"
/>

### 纹理短名

在`RP/textures/item_texture.json`中定义纹理短名：

::: code-group
```json [纹理定义]
{
	"resource_pack_name": "Ghostly Guide",
	"texture_name": "atlas.items",
	"texture_data": {
		"wiki.ectoplasm": {
			"textures": "textures/items/ectoplasm"
		}
	}
}
```
:::

短名`wiki.ectoplasm`将关联到纹理路径（无需扩展名）。

### 应用纹理

在物品组件中添加`minecraft:icon`：

::: code-group
```json [图标组件]
"components":{
	"minecraft:max_stack_size": 16,
	"minecraft:icon" : {
		"texture": "wiki.ectoplasm"
	}
}
```
:::

### 本地化名称

在语言文件中添加翻译：

::: code-group
```text [语言文件]
item.wiki:ectoplasm=灵质
```
:::

## 最终成果

完成后的物品应可通过`/give`命令获取，并在创造菜单显示。完整文件结构：

<FolderView :paths="[
	'RP/textures/item_texture.json',
	'RP/textures/items/ectoplasm.png',
	'RP/texts/en_US.lang',
	'RP/texts/languages.json',
	'RP/manifest.json',
	'RP/pack_icon.png',
	'BP/items/ectoplasm.json',
	'BP/texts/en_US.lang',
	'BP/texts/languages.json',
	'BP/manifest.json',
	'BP/pack_icon.png',
]"></FolderView>

<Spoiler title="完整ectoplasm.json">
::: code-group
```json [完整物品文件]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "wiki:ectoplasm",
			"category": "Items"
		},
		"components": {
			"minecraft:max_stack_size": 16,
			"minecraft:icon": {
				"texture": "wiki.ectoplasm"
			}
		}
	}
}
```
:::
</Spoiler>

<Spoiler title="完整item_texture.json">
::: code-group
```json [完整纹理文件]
{
	"resource_pack_name": "Ghostly Guide",
	"texture_name": "atlas.items",
	"texture_data": {
		"wiki.ectoplasm": {
			"textures": "textures/items/ectoplasm"
		}
	}
}
```
:::
</Spoiler>

如遇问题，请参考[故障排除页面](/wiki/items/troubleshooting-items)或对比[示例文件](https://github.com/Bedrock-OSS/wiki-addon/tree/main/guide)。

## 进度追踪

<Checklist>

-   [x] 创建附加包框架
-   [x] 创建自定义物品
-   [x] 理解物品行为和资源文件格式
-   [x] 掌握组件使用方法
-   [x] 设置物品纹理
-   [ ] 创建自定义实体
-   [ ] 实现实体战利品、生成规则和合成配方

</Checklist>