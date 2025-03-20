---
title: 投掷物
category: 巧思案例
tags:
    - 中级
mentions:
    - Fabrimat
    - MedicalJewel105
    - Luthorius
    - IlkinQafarov
    - seeit360
    - TheItsNameless
    - SmokeyStack
    - ThomasOrs
---

# 投掷物

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
本教程假定您已掌握 Molang、动画控制器和实体定义的基础知识。
:::

类似喷溅药水或三叉戟这样的物品属于可投掷的特殊物品。目前有两种方式可以在附加包中实现类似效果，一种适用于稳定版，另一种需要开启 `Holiday Creator Features` 实验性功能。

## 稳定版实现方案

此方案通过动画控制器检测 `minecraft:food` 组件的使用情况，并通过修改 `player.json` 在投掷时生成实体。

### 物品定义

首先创建可投掷物品：

::: code-group
```json [BP/items/throwable_item.item.json]
{
  "format_version": "1.16.0",
  "minecraft:item": {
    "description": {
      "identifier": "wiki:throwable_item"
    },
    "components": {
      "minecraft:max_stack_size": 16,
      "minecraft:use_duration": 12000,
      "minecraft:food": {
        "can_always_eat": true
      }
    }
  }
}
```
:::

关键点解析：

- `format_version` 必须为 `1.16.0`
- `minecraft:use_duration` 需设置较大值以防止播放进食音效
- `minecraft:food` 组件用于启用物品使用检测

由于格式版本为 `1.16.0`，需添加资源包定义：

::: code-group
```json [RP/items/throwable_item.item.json]
{
  "format_version": "1.16.0",
  "minecraft:item": {
    "description": {
      "identifier": "wiki:throwable_item",
      "category": "Equipment"
    },
    "components": {
      "minecraft:icon": "throwable_item"
    }
  }
}
```
:::

### 实体定义

该实体将作为实际投掷物，具有弹射物特性。注意添加雪球运行时标识使实体具有投射行为，也可尝试其他投射物标识。

::: code-group
```json [BP/entities/throwable_item_entity.se.json]
{
	"format_version": "1.16.0",
	"minecraft:entity": {
		"description": {
			"identifier": "wiki:throwable_item_entity",
			"is_spawnable": false,
			"is_summonable": true,
			"is_experimental": false,
                        "runtime_identifier": "minecraft:snowball"
		},
		"components": {
			"minecraft:collision_box": {
				"width": 0.25,
				"height": 0.25
			},
			"minecraft:projectile": {
				"on_hit": {
					"grant_xp": {
						"minXP": 3,
						"maxXP": 5
					},
					"impact_damage": {
						"damage": 16
					},
					"remove_on_hit": {}
				},
				"power": 0.7,
				"gravity": 0.03,
				"angle_offset": -20.0,
				"hit_sound": "glass"
			},
			"minecraft:physics": {},
			"minecraft:pushable": {
				"is_pushable": true,
				"is_pushable_by_piston": true
			},
			"minecraft:conditional_bandwidth_optimization": {
				"default_values": {
					"max_optimized_distance": 80.0,
					"max_dropped_ticks": 10,
					"use_motion_prediction_hints": true
				}
			}
		}
	}
}
```
:::

此实体基于原版喷溅药水设计，可通过修改 `minecraft:projectile` 组件调整行为（示例中投掷物将造成伤害并给予经验）。

### 动画控制器

动画控制器负责检测物品使用并触发投掷事件：

::: code-group
```json [BP/animation_controllers/throwables.ac.json]
{
  "format_version": "1.10.0",
  "animation_controllers": {
    "controller.animation.player.throwables": { // 将在玩家实体描述中引用的ID
      "states": {
        "default": {
          "transitions": [
            {
              // "q.is_item_name_any" 接受三个参数：槽位名称、槽位ID、检测物品
              "throw_item": "q.is_item_name_any('slot.weapon.mainhand', 0, 'wiki:throwable_item') && q.is_using_item"
	      // "q.is_using_item" 返回布尔值表示物品使用状态
            }
          ],
          "on_entry": [
            // 重置玩家状态以支持连续投掷
            "@s wiki:reset_player"
          ]
        },
        "throw_item": {
          "transitions": [
            {
              "default": "1.0"
            }
          ],
          "on_entry": [
            // 触发投掷事件
            "@s wiki:throw_item",
            // 移除玩家物品
            "/clear @s wiki:throwable_item -1 1"
          ]
        }
      }
    }
  }
}
```
:::

#### player.json 配置

:::tip
请确保您的 `player.json` 文件与当前游戏版本保持同步，可在此处获取最新版本：[bedrock.dev](https://bedrock.dev/packs)
:::

:::warning
请勿随意修改或删除 `player.json` 原有内容，否则可能导致游戏异常
:::

注册动画控制器至玩家实体：

::: code-group
```json [BP/entities/player.json]
{
  "format_version": "1.18.20",
  "minecraft:entity": {
    "description": {
      "identifier": "minecraft:player",
      "is_spawnable": false,
      "is_summonable": false,
      "is_experimental": false,
      "scripts": {
        "animate": [
          "throwables_controller" // 需与下方定义保持一致
        ]
      },
      "animations": {
        "throwables_controller": "controller.animation.player.throwables" // 动画控制器ID
      }
    },
    "components": {
        "minecraft:breathable": { // 防止显示呼吸气泡
          "total_supply": 15,
          "suffocate_time": -1,
          "inhale_time": 3.75,
          "generates_bubbles": false
    	}
    },
    ...
  }
```
:::

添加组件组和事件：

::: code-group
```json [BP/entities/player.json#minecraft:entity]
"component_groups": {
  "wiki:throw_entity": { // 包含实体生成组件
    "minecraft:spawn_entity": {
      "entities": {
        "min_wait_time": 0,
        "max_wait_time": 0,
        "single_use": true,
        "spawn_entity": "wiki:throwable_item_entity",
        "num_to_spawn": 1
      }
    }
  }
},
"events": {
  "wiki:reset_player": {
    "remove": {
      "component_groups": [
        "wiki:throw_entity"
      ]
    }
  },
  "wiki:throw_item": {
    "add": {
      "component_groups": [
        "wiki:throw_entity"
      ]
    }
  }
}
```
:::

## 实验版实现方案

此方案需启用 `Holiday Creator Features` 实验性功能。

### 物品定义

::: code-group
```json [BP/items/throwable_item.item.json]
{
    "format_version": "1.16.100",
    "minecraft:item": {
        "description": {
            "identifier": "wiki:throwable_item"
        },
        "components": {
            "minecraft:max_stack_size": 16,
            "minecraft:on_use": {
                "on_use": {
                    "event": "throw"
                }
            },
            "minecraft:icon": {
                "texture": "apple"
            }
        },
        "events": {
            "throw": {
                "shoot": {
                    "projectile": "wiki:throwable_item_entity",
                    "launch_power": 2,
                    "angle_offset": 1
                },
                "swing": {},
                "decrement_stack": {},
                "run_command": {
                    "command": [
                        "playsound fire.ignite",
                        "playsound mob.witch.throw"
                    ]
                }
            }
        }
    }
}
```
:::

关键点说明：

- `format_version` 必须为 `1.16.100`
- `minecraft:on_use` 用于响应右键事件

事件参数：

- `shoot` 投射实体
- `swing` 播放挥动动画
- `decrement_stack` 减少物品堆叠
- `run_command` 执行音效指令

### 实体定义

实体文件与稳定版相同。

<Spoiler title="BP/entities/throwable_item_entity.se.json">

::: code-group
```json [BP/entities/throwable_item_entity.se.json]
{
	"format_version": "1.16.0",
	"minecraft:entity": {
		"description": {
			"identifier": "wiki:throwable_item_entity",
			"is_spawnable": false,
			"is_summonable": true,
			"is_experimental": false,
                        "runtime_identifier": "minecraft:snowball"
		},
		"components": {
			"minecraft:collision_box": {
				"width": 0.25,
				"height": 0.25
			},
			"minecraft:projectile": {
				"on_hit": {
					"grant_xp": {
						"minXP": 3,
						"maxXP": 5
					},
					"impact_damage": {
						"damage": 16
					},
					"remove_on_hit": {}
				},
				"power": 0.7,
				"gravity": 0.03,
				"angle_offset": -20.0,
				"hit_sound": "glass"
			},
			"minecraft:physics": {},
			"minecraft:pushable": {
				"is_pushable": true,
				"is_pushable_by_piston": true
			},
			"minecraft:conditional_bandwidth_optimization": {
				"default_values": {
					"max_optimized_distance": 80.0,
					"max_dropped_ticks": 10,
					"use_motion_prediction_hints": true
				}
			}
		}
	}
}
```
:::

</Spoiler>

## 扩展应用

完成基础投掷物后，您可以尝试以下扩展：

- 调整投射力度和弹道参数
- 添加粒子效果和高级动画
- 组合使用[区域效果云](/wiki/entities/introduction-to-aec)
- 实现不同命中效果（燃烧、中毒等）

通过灵活运用组件和事件系统，可以创造出丰富的投掷物玩法。