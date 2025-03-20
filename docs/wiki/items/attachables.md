---
title: 附加物
category: 文档
tags:
    - 新手
mentions:
    - Sprunkles317
    - MedicalJewel105
    - AdamRaichu
    - Luthorius
    - TheItsNameless
---

# 附加物

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
本文档假设您已掌握Molang、渲染控制器、动画和客户端实体定义的基础知识。请确保您熟悉[客户端实体](/wiki/entities/entity-intro-rp)的基本原理！
:::

## 简介

当我们设计自定义物品或方块时，Minecraft会根据模板生成模型以便在手持时显示。这表现为物品以拉伸纹理网格形式显示，或方块显示其预设模型。通过使用**可附着物**系统，我们可以设计自己的模型来替换这些手持显示效果。

想让木棍看起来像望远镜？或是挥舞带有旋转链条的巨型电锯？可附着物正是实现这些效果的关键！

本文将介绍**两种不同方法**来创建可附着物，具体取决于所用几何体的构建方式。

## 概述

可附着物系统用于在装备物品或方块时渲染实体模型。这里的装备包括主手、副手和护甲槽位中的物品。

可附着物定义文件在结构上与客户端实体定义非常相似，允许我们定义要显示的纹理、材质、几何体和动画。

### 文件结构

可附着物定义文件应存放在'attachables'文件夹中。其他文件布局与自定义实体完全一致。

<FolderView
	:paths="[
    'RP/animations/my_item.animation.json',
    'RP/attachables/my_item.entity.json',
    'RP/models/entity/my_item.geo.json',
    'RP/textures/entity/my_item.png',
    'RP/manifest.json'
  ]"
></FolderView>

### 可附着物定义

以下是一个基础的可附着物示例：

::: code-group
```json [RP/attachables/stick.entity.json]
{
	"format_version": "1.10.0",
	"minecraft:attachable": {
		"description": {
			"identifier": "minecraft:stick",
			"materials": {
				"default": "entity",
				"enchanted": "entity_alphatest_glint"
			},
			"textures": {
				"default": "textures/entity/steve",
				"enchanted": "textures/misc/enchanted_item_glint"
			},
			"geometry": {
				"default": "geometry.wiki.steve_head"
			},
			"animations": {
				"hold_first_person": "animation.steve_head.hold_first_person",
				"hold_third_person": "animation.steve_head.hold_third_person"
			},
			"scripts": {
				"animate": [
					{
						"hold_first_person": "context.is_first_person == 1.0"
					},
					{
						"hold_third_person": "context.is_first_person == 0.0"
					}
				]
			},
			"render_controllers": [
				"controller.render.item_default"
			]
		}
	}
}
```
:::

此定义中有几个关键点需要注意：

- 标识符需与现有方块/物品ID匹配。这将激活可附着物效果，替换原版手持模型
- 包含了附魔光效的材质和纹理定义。若物品需要附魔特效，这部分必须保留

制作可附着物比创建普通客户端实体文件更复杂。我们需要正确绑定几何体的骨骼结构，确保装备时显示正确。

## 方法一 - 绑定骨骼系统

<Label name="新手" color="blue"></Label>

此方法通过复制玩家骨骼系统，将模型附加到特定骨骼上实现。适用于单一实体类型（特别是玩家）和单一装备槽位的场景，在Blockbench中预览效果更方便。

### 骨骼系统搭建

需要重建玩家骨骼结构，否则模型无法正确绑定骨骼，导致漂浮在玩家周围。

使用文本编辑器将玩家骨骼文件中的骨骼结构复制到您的几何体文件中，然后将模型立方体设为`rightItem`骨骼的子级。将此几何体保存至资源包。

我们已准备好一个预制模型（已移除原玩家模型的立方体）：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_one/steve_head.geo.json?raw=true"
	color=blue
>📄 几何体文件</BButton>

### 显示设置

为避免模型漂浮在玩家脚部，需要创建动画来控制显示位置。

新建两个动画：第一人称手持动画和第三人称手持动画。调整第三人称动画的位置参数后保存至资源包。

示例动画文件（包含第一人称动画制作说明）：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_one/steve_head.animation.json?raw=true"
	color=blue
>📄 动画文件</BButton>

### 第一人称动画

制作第一人称动画时需模拟游戏中手臂的真实姿势：

:::tip
注意：玩家手部动画需使用玩家动画系统，而非可附着物动画系统。
:::

使用指导动画文件（应用右臂骨骼旋转(95, -45, 115)和平移(13.5, -10, 12)）来准确定位：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_one/attachable_guide.animation.json?raw=true"
	color=blue
>📄 动画指导文件</BButton>

:::warning 重要提示
需要同时播放两个动画：您的第一人称动画和指导动画。在Blockbench中编辑时，请确保选中您的动画后再叠加播放指导动画。
:::

### 最终效果

完成上述步骤后，删除玩家骨骼中的立方体（保留骨骼结构），即可在游戏中查看效果！

## 方法二 - 骨骼绑定系统

<Label name="进阶" color="orange"></Label>

此方法通过模型绑定直接将几何体附加到对应装备槽位的骨骼上。Minecraft原生物品（如三叉戟、望远镜）均采用此方案。虽然能实现动态多生物适配，但存在一些特殊限制。

### 模型绑定

首先确保几何体文件版本为`"1.16.0"`（可通过Blockbench转换旧版文件）。然后在根骨骼添加绑定声明：

::: code-group
```json [RP/models/entity/skeleton_head.geo.json]
// 一个骨骼
{
  "name": "skeleton_head",
  "binding": "q.item_slot_to_bone_name(context.item_slot)",
  "pivot": [0, 4, 0],
  "cubes": [
    {
      "origin": [-4, 0, -4],
      "size": [8, 8, 8],
      "uv": [0, 0]
    }
  ]
}
```
:::

- `binding`键使用Molang查询`q.item_slot_to_bone_name`将装备槽位转换为骨骼名称：
  - `'main_hand'` → "rightitem"
  - `'off_hand'` → "leftitem"

示例绑定模型：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_two/skeleton_head.geo.json?raw=true"
	color=blue
>📄 几何体文件</BButton>

### 显示设置

创建第一人称和第三人称动画时，建议：

1. 下载玩家骨骼模型作为定位参考：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_two/player_skeleton.geo.json?raw=true"
	color=blue
>📄 玩家骨骼文件</BButton>

2. 将模型骨骼添加为玩家骨骼中'rightItem'的子级
3. 使用指导动画抵消Minecraft的-24Y轴偏移：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_two/attachable_guide.animation.json?raw=true"
	color=blue
>📄 动画指导文件</BButton>

:::warning 重要提示
需要同时播放自定义动画和指导动画。在Blockbench中编辑时，请先选中您的动画再叠加播放指导动画。
:::

示例动画定位：
<BButton
  link="https://github.com/Bedrock-OSS/bedrock-wiki/blob/wiki/docs/public/assets/packs/tutorials/attachables/method_two/skeleton_head.animation.json?raw=true"
	color=blue
>📄 动画文件</BButton>

### 第一人称动画

参照第三人称动画的制作流程，在指导文件中导入`wiki.first_person_guide`动画进行叠加编辑。

## 示例包

我们准备了包含两种方法的完整示例包供参考：

<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/attachable-example.mcpack"
    color=blue
>💾 示例包下载</BButton>