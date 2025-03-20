---
title: 玩家几何模型
tags:
    - 新手
category: 巧思案例
mentions:
    - SirLich
    - MedicalJewel105
---

# 玩家几何模型

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本教程将指导你如何创建玩家NPC并将其加入你的世界。这些NPC会自动采用原版玩家皮肤，并包含行走动画、攻击动画等基础动作。

本教程为**图形化**教程，不涉及游戏机制解析。

:::warning
本文档包含大量JSON配置内容，相关代码可直接复制使用。
:::

## 几何文件

此JSON包含Steve和Alex两种模型的几何数据：

`geometry.npc.steve`

`geometry.npc.alex`

<Spoiler title="几何文件">

::: code-group
```json [geometry.npc.steve]
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.cape",
				"texture_width": 64,
				"texture_height": 32
			},
			"bones": [
				{
					"name": "body",
					"pivot": [0.0, 24.0, 0.0],
					"parent": "waist"
				},
				// 此处省略部分骨骼定义...
			]
		},
		// 其他模型数据...
	]
}
```
:::

</Spoiler>

## 实体文件

若你希望为几何模型添加动画效果，可使用以下实体文件。该文件已包含以下无错误动画：

-   行走
-   注视玩家
-   待机

如需更完整的动画集合，建议复制默认玩家资源包中的实体文件，并手动调整动画配置。

<Spoiler title="实体文件">

::: code-group
```json [wiki:npc]
{
	"format_version": "1.10.0",
	"minecraft:client_entity": {
		"description": {
			"identifier": "wiki:npc",
			"materials": {
				"default": "villager_v2"
			},
			"geometry": {
				"default": "geometry.npc.alex"
			},
			"render_controllers": ["controller.render.single_texture"],
			"textures": {
				"default": "textures/entity/npc/introduction"
			},
			"scripts": {
				"scale": "0.9375",
				"pre_animation": [
					"v.tcos0 = (math.cos(q.modified_distance_moved * 38.17) * q.modified_move_speed / v.gliding_speed_value) * 57.3;"
				],
				"animate": [
					"move.arms",
					"move.legs",
					"look_at_target_default",
					"bob"
				]
			},
			"animations": {
				"look_at_target_default": "animation.humanoid.look_at_target.default",
				"move.arms": "animation.player.move.arms",
				"move.legs": "animation.player.move.legs",
				"bob": "animation.player.bob"
			}
		}
	}
}
```
:::

</Spoiler>