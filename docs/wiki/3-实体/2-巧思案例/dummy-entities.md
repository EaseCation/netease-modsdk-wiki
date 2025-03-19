---
title: 虚拟实体
category: 教程
tags:
    - 初学者
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
    - aexer0e
---

# 虚拟实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

虚拟实体是游戏场景中不可见的幕后实用实体。本文将介绍这种多功能工具的使用场景，并展示如何配置资源文件。

## 核心用途

以下是虚拟实体的部分应用场景：

- **数据存储**：通过给实体添加标签，我们可以将其作为"游戏管理器"使用（类似过去盔甲架的用法）。
- **命名实体**：通过命名标签标识虚拟实体，配合`execute`指令选中目标，可以用命令块实现带精美显示名称的`/say`命令。
- **坐标标记**：通过`execute`指令跟踪虚拟实体位置，获取相对坐标系的基准点。
- **路径向导**：使敌对生物将虚拟实体设为目标，即可将实体路径引导至虚拟实体所在位置。

## 创建教程

### 行为配置

这里提供一个标准模板（关键特性：免疫伤害且不可推动）。

::: code-group
```json [BP/entities/dummy.json]
{
	"format_version": "1.16.0",
	"minecraft:entity": {
		"description": {
			"identifier": "wiki:dummy",
			"is_summonable": true,
			"is_spawnable": false,
			"is_experimental": false
		},
		"components": {
			"minecraft:breathable": { // 可选，使实体能够在水中呼吸
				"breathes_water": true
			},
			"minecraft:physics": { 
				"has_gravity": false, // 可选，使实体不受重力和水流影响
				"has_collision": false
			},
			"minecraft:custom_hit_test": {
				"hitboxes": [
					{
						"pivot": [0, 100, 0],
						"width": 0,
						"height": 0
					}
				]
			},
			"minecraft:damage_sensor": {
				"triggers": {
					"deals_damage": false
				}
			},
			"minecraft:pushable": {
				"is_pushable": false,
				"is_pushable_by_piston": false
			},
			"minecraft:collision_box": {
				"width": 0.0001,
				"height": 0.0001
			}
		}
	}
}
```

若要完全禁用碰撞（允许在其位置放置方块），可以使用弓箭runtime ID，但可能存在副作用。

### 资源配置

::: code-group
```json [RP/entity/dummy.json]
{
	"format_version": "1.10.0",
	"minecraft:client_entity": {
		"description": {
			"identifier": "wiki:dummy",
			"materials": {
				"default": "entity_alphatest"
			},
			"geometry": {
				"default": "geometry.dummy"
			},
			"render_controllers": ["controller.render.dummy"],
			"textures": {
				"default": "textures/entity/dummy"
			}
		}
	}
}
```
:::

### 模型配置

::: code-group
```json [RP/models/entity/dummy.json]
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.dummy",
				"texture_width": 16,
				"texture_height": 16
			}
		}
	]
}
```
:::

### 渲染控制器（可选）

::: code-group
```json [RP/render_controllers/dummy.json]
{
	"format_version": "1.10.0",
	"render_controllers": {
		"controller.render.dummy": {
			"geometry": "Geometry.default",
			"textures": ["Texture.default"],
			"materials": [
				{
					"*": "Material.default"
				}
			]
		}
	}
}
```
:::

### 材质贴图（可选）

可以选择留空材质路径，或者使用Blockbench创建空白材质文件。