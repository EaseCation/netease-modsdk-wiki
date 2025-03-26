---
title: 动画控制器入门
nav_order: 1
tags:
    - 指南
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - MedicalJewel105
    - stirante
    - cda94581
    - ThijsHankelMC
    - MetalManiacMc
    - ThomasOrs
---

# 动画控制器入门

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

动画控制器（AC）是一种可在资源包（RP）和行为包（BP）中使用的状态机。在资源包中，动画控制器（RPAC）用于播放动画；在行为包中（BPAC），它们用于执行命令和"动画"指令。

## 什么是状态机？

状态机是一种特殊的逻辑管理方式，它依赖于一系列状态。每个状态具有两个属性：

- 当前状态下执行的操作
- 如何转移到其他状态

状态机在各类系统中广泛应用，尤其在传统编程领域。它们不仅存在于Minecraft中！您可以通过[此链接](https://www.itemis.com/en/yakindu/state-machine/documentation/user-guide/overview_what_are_state_machines)深入了解状态机。

状态机同一时间只能处于**一个**状态。当状态机"运行"时，可以理解为它在不同状态间转移，执行其中的逻辑，并遵循`transitions`规则转移到其他状态。

## 状态机示例

状态机的优势在于能够将动画自然分解为逻辑流程，每个状态独立处理自身动画**和**逻辑。

例如，假设您想为直升机螺旋桨制作动画，但仅在地面时停止旋转。这里有两个状态：

- `地面状态`
- `飞行状态`

我们可以用前文提到的两个属性来注解这些状态：

- `地面状态`：
    - 不播放动画
    - 若处于空中则转移到`飞行状态`
- `飞行状态`：
    - 播放飞行动画
    - 若着陆则返回`地面状态`

以下是状态机的流程图表示：

![](/assets/images/concepts/animation-controllers/two_state_FSM.png)

在流程图中，状态用矩形表示，箭头表示状态间的**转移**。让我们看一个更复杂的示例，新增了`爆炸状态`：

![](/assets/images/concepts/animation-controllers/three_state_FSM.png)

可见，一个状态可同时转移到多个状态。状态也可以是终止状态（直升机损毁后无需继续动画）。这种分支流程体现了动画控制器的强大之处。

## 什么是动画控制器？

动画控制器是Minecraft中用于播放动画和执行指令的状态机。动画控制器文件必须存放在资源包或行为包的`animation_controllers`文件夹中。

### 将控制器附加到实体

动画控制器需在实体文件中进行"附加"才能生效。附加AC需要完成两个步骤：

1. 为动画控制器定义简称
2. 通过`scripts`运行动画控制器

以下示例展示了如何在`animations`中定义AC，并通过`scripts/animate`播放：

::: code-group
```json [RP/entity/helicopter.ce.json 或 BP/entities/helicopter.se.json]
"description": {
	"identifier": "wiki:helicopter",
	"animations": {
		"blade_controller": "controller.animation.helicopter.blade"
	},
	"scripts": {
		"animate": [
			"blade_controller"
		]
	}
}
```
:::

若需要条件触发动画控制器，可添加Molang参数。当参数为真时控制器才会运行：

::: code-group
```json [RP/entity/helicopter.ce.json 或 BP/entities/helicopter.se.json]
"scripts": {
	"animate": [
		{
			// 仅在直升机有骑手时播放blade_controller
			"blade_controller": "q.has_rider"
		}
	]
}
```
:::

### RP动画控制器

资源包动画控制器位于RP中，可附加到RP实体。用于播放骨骼动画。

### BP动画控制器

行为包动画控制器位于BP中，可附加到BP实体。用于执行命令和向实体发送事件。

## 动画控制器示例

### 基础示例

::: code-group
```json [RP/animation_controllers/helicopter.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.helicopter.blade": {
			"initial_state": "ground",
			"states": {
				"ground": {
					"transitions": [
						{
							"flying": "!q.is_on_ground"
						}
					]
				},
				"flying": {
					"animations": ["flying"],
					"transitions": [
						{
							"ground": "q.is_on_ground"
						}
					]
				}
			}
		}
	}
}
```
:::

解析关键点：
- `initial_state`: "ground" 表示初始状态
- `ground`状态包含转移到"flying"状态的逻辑
- `flying`状态播放"flying"动画并包含返回逻辑

### 完整示例

::: code-group
```json [RP/animation_controllers/helicopter.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.helicopter.blade": {
			"initial_state": "ground",
			"states": {
				"ground": {
					"transitions": [
						{"flying": "!q.is_on_ground"},
						{"explode": "!q.is_alive"}
					]
				},
				"flying": {
					"animations": ["flying"],
					"transitions": [
						{"ground": "q.is_on_ground"},
						{"explode": "!q.is_alive"}
					]
				},
				"explode": {
					"animations": ["explode"]
				}
			}
		}
	}
}
```
:::

## RP动画控制器扩展功能

资源包动画控制器可触发音效和粒子效果。使用前需在客户端实体文件中预先定义：

::: code-group
```json [RP/entities/custom_tnt.json#minecraft:client_entity/description]
"sound_effects": {
    "explosion": "wiki.custom_tnt.explosion" // 其中wiki.custom_tnt.explosion是在sound_definitions中定义的声音
},
"particle_effects": {
    "fuse_lit": "wiki:tnt_fuse_lit_particle"
}
```
:::

::: code-group
```json [RP/animation_controllers/custom_tnt.animation_controllers.json#controller.animation.custom_tnt]
"states":{
    "default":{
        "transitions":[
            {"explode_state":"q.mark_variant == 1"}
        ]
    },
    "explode_state":{
        "sound_effects":[{"effect":"explosion"}],
		"particle_effects": [
			{
				"effect": "fuse_lit"
				// "locator": "<骨骼名称>" 此处也可指定定位器
			}
		],
        "transitions":[
            {"default":"q.mark_variant == 0"}
        ]
    }
}
```
:::

:::warning
警告！并非所有粒子效果在此处都有效。若遇到问题，建议尝试其他粒子效果（例如参考烈焰人动画控制器中的示例）。
:::

## BP动画控制器功能

行为包动画控制器支持两个新字段：
- `on_entry`: 进入状态时执行的命令
- `on_exit`: 退出状态时执行的命令

命令类型包含：
- 斜杠命令：`/say Hello!`
- 实体事件：`@s wiki:transform_into_plane`
- Molang表达式：`v.tickets += 1;`

示例：

::: code-group
```json [BP/animation_controllers/helicopter.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.helicopter.commands": {
			"initial_state": "ground",
			"states": {
				"ground": {
					"on_entry": ["/say 当前处于地面状态！"],
					"transitions": [
						{"flying": "!q.is_on_ground"}
					]
				},
				"flying": {
					"on_entry": ["/say 当前处于空中状态！"],
					"transitions": [
						{"ground": "q.is_on_ground"}
					]
				}
			}
		}
	}
}
```
:::

## 动画控制器执行流程

### 加载阶段
- 实体加载时进入初始状态（未定义时使用"default"）
- 每Tick执行：
    1. 播放当前状态动画（循环或单次）
    2. 检查转移条件，执行首个有效转移

### 重置机制
实体重载时（玩家进出、区块重载等）会重置到初始状态

## 高级功能

动画控制器支持变量重映射：

```json
{
    "format_version": "1.17.30",
    "animation_controllers": {
        "controller.animation.sheep.move": {
            "states": {
                "default": {
                    "variables": {
                        "ground_speed_curve": {
                            "input": "q.ground_speed",
                            "remap_curve": {
                                "0.0": 0.2,
                                "1.0": 0.7
                            }
                        }
                    },
                    "animations": [
                        "wiggle_nose",
                        {"walk": "v.ground_speed_curve"}
                    ]
                }
            }
        }
    }
}
```