---
title: 生成物品
category: 巧思案例
tags:
    - 中级
mentions:
    - SirLich
    - Joelant05
    - Dreamedc2015
    - yanasakana
    - MedicalJewel105
    - aexer0e
    - Xterionix
---

# 生成物品

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在世界中生成物品（如同自然掉落）是常见的需求。本文将介绍多种实现方法，包括实体死亡、交互操作和通用方法。

## /loot命令

目前最简单的方式是使用`/loot`命令。格式如下：
```
/loot spawn ~ ~ ~ loot "entities/cow"
```

::: code-group
```json [BP/loot_tables/entities/cow.json]
"minecraft:loot": {
	"table": "loot_tables/entities/cow.json"
}
```
:::

## 实体死亡

另一种常用方法是在实体死亡时掉落物品。通过为实体添加`minecraft:loot`组件并关联对应的战利品表（如下例中的forium表）实现。

::: code-group
```json [BP/entities/my_entity.json#components]
"minecraft:loot": {
	"table": "loot_tables/entities/forium.json"
}
```
:::

## 虚体死亡

我们可以为[虚体](/wiki/entities/dummy-entities)添加`minecraft:loot`组件，在生成时立即死亡来创建`drop_entity`。通过`/summon wiki:drop_entity`即可生成物品，适用于不介意死亡粒子/音效的场景。

行为包配置：

::: code-group
```json [BP/entities/my_entity.json]
{
	"format_version": "1.16.0",
	"minecraft:entity": {
		"description": {
			"identifier": "wiki:drop_entity",
			"is_spawnable": true,
			"is_summonable": true,
			"is_experimental": false
		},

		"components": {
			// 使实体生成时立即死亡
			"minecraft:health": {
				"value": 0
			},
			"minecraft:loot": {
				"table": "loot_tables/entities/some_loot.json"
			}
		}
	}
}
```
:::

## 交互操作

以下示例展示了名为"box"的实体在被交互时掉落物品。`spawn_items`中的表关联需要掉落的战利品表。此例中`break_box`事件会添加移除箱子的组件组。

注意：若未移除实体，可重复交互生成物品。如需保留实体，可为实体添加`cooldown`参数限制交互间隔，或通过事件移除包含`minecraft:interact`组件的组件组。

::: code-group
```json [BP/entities/my_entity.json#components]
"minecraft:interact": {
	"interactions": [
		{
			"on_interact": {
				"filters": {
					"test": "is_family",
					"subject": "other",
					"value": "player"
				},
				"event": "break_box",
				"target": "self"
			},
			"swing": true,
			"spawn_items": {
				"table": "loot_tables/entities/box.json"
			}
		}
	]
}
```
:::

## 通用方法

此方法适用于各种场景：实体死亡、动画交互、常规掉落。特别适合需要静默生成物品（无死亡动画/音效/粒子）的情况。

需要配置以下要素：新实体的行为包、动画控制器、虚体资源（参考虚体教程）和战利品表。生成物品时召唤实体到目标位置。多个物品可通过组件组和生成事件实现。

### 行为配置

使用`minecraft:behavior.drop_item_for`配合`minecraft:navigation.walk`组件实现物品生成。注意`time_of_day_range`参数需显式定义，`max_dist`需根据需求调整。此方法可能导致实体位移，建议略微抬高生成位置或缩小碰撞箱。

::: code-group
```json [BP/entities/my_entity.json#components]
"minecraft:navigation.walk": {},
"minecraft:behavior.drop_item_for": {
	"priority": 1,
	"max_dist": 16,
	"loot_table": "loot_tables/entities/forium.json",
	"time_of_day_range": [0.0, 1.0]
}
```
:::

### 动画控制器

**必须为实体关联此动画控制器**以实现自动移除。也可使用时间轴动画实现。通过传送实体至虚空避免死亡效果。双重状态过渡确保实体不在生成瞬间被移除。

::: code-group
```json [BP/animation_controllers/my_entity.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.drop_items.die": {
			"initial_state": "spawn",
			"states": {
				"spawn": {
					"transitions": [
						{
							"delay": "1"
						}
					]
				},
				"delay": {
					"transitions": [
						{
							"die": "1"
						}
					]
				},
				"die": {
					"on_entry": ["/tp @s ~ -200 ~"]
				}
			}
		}
	}
}
```
:::

## 结构方法

通过结构生成物品是另一种有趣的方式。使用`structure_void`填充结构（避免加载时覆盖方块）并放入物品。此方法可保留物品数据（如耐久度），支持随时加载。

![](/assets/images/items/spawning-items/structure-method.png)