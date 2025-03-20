---
title: 生成已驯服的实体
category: 巧思案例
tags:
    - 中级
mentions:
    - Axelpvz2030
    - aexer0e
    - SirLich
    - MedicalJewel105
    - SmokeyStack
    - ThomasOrs
---

# 生成已驯服的实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在本教程中，您将学习如何通过向特定玩家触发事件来生成预驯服的实体，以及如何投掷在撞击时变形为已驯服实体的物品。

## 概述

传统方式中，若要让玩家驯服实体，必须通过 `minecraft:tameable` 强制玩家与实体互动。但我们也可以利用原版弹射物会记录生成者*\*的特性来实现预驯服实体的生成。

具体实现步骤：
1. 通过 `minecraft:spawn_entity` 生成一个中间态弹射物实体
2. 该实体将立即转换为预驯服的目标实体（本教程以原版狼为例）
3. 在 `minecraft:transformation` 组件中将 `keep_owner` 设置为 `true` 

\*: 需要区分 _Spawn（生成）_ 和 _Summon（召唤）_ 的区别。只有通过生成蛋或 `minecraft:spawn_entity` 组件生成的弹射物才会记录玩家信息，使用 `/summon` 命令生成的则不会。

## player.json

我们需要对玩家行为文件进行微调，添加一个事件来激活组件组用于生成中间态实体。

您可以在 Mojang 提供的[原版行为包模板](https://aka.ms/behaviorpacktemplate)中找到玩家实体的行为文件。

::: code-group
```json [BP/entities/player.json]
{
    "format_version":"1.16.0",
    "minecraft:entity":{
        "description":{
            "identifier":"minecraft:player",
            "is_spawnable":false,
            "is_summonable":false,
            "is_experimental":false
        },
        "component_groups":{ // 组件组定义
            "wiki:spawn_tamed_wolf":{
                "minecraft:spawn_entity":{
                    "entities":{
                        "min_wait_time":0,
                        "max_wait_time":0,
                        "spawn_entity":"wiki:pretamed_wolf",
                        "single_use":true,
                        "num_to_spawn":1
                    }
                }
            }
		},
        ...
		"events":{ // 事件定义
            "wiki:spawn_tamed_wolf":{
                "add":{
                    "component_groups":[
                        "wiki:spawn_tamed_wolf"
                    ]
                }
            }
        }
    }
}
```
:::

## pretamed_wolf.json

创建一个使用 `minecraft:arrow` 作为运行时标识符（也可选用其他弹射物标识符）的自定义实体，包含空白弹射物组件和用于转换为驯服狼的变形组件。

::: code-group
```json [BP/entities/pretamed_wolf.json]
{
	"format_version": "1.16.0",
	"minecraft:entity": {
		"description": {
			"identifier": "wiki:pretamed_wolf",
			"runtime_identifier": "minecraft:arrow",
			"is_spawnable": false,
			"is_summonable": true,
			"is_experimental": false
		},
		"components": { // 组件配置
			"minecraft:projectile": {}, // 弹射物组件
			"minecraft:transformation": { // 变形组件
				"into": "minecraft:wolf<minecraft:on_tame>",
				"keep_owner": true // 保持归属关系
			}
		}
	}
}
```
:::

现在即可通过命令 `/event entity @p wiki:spawn_tamed_wolf` 在玩家身边生成驯服的狼。若将 `is_spawnable` 设为 `true` 还可通过生成蛋调用！

:::warning 重要提示
如需生成自定义实体而非原版狼：
1. 必须为实体添加 `minecraft:is_tamed` 组件
2. 未被驯服的实体可能出现预期外的行为
:::

## 集成物品抛射物（替代方法）

利用 [1.16 实验性物品特性](/wiki/items/item-components) 中的 `shoot` 事件属性，可制作碰撞时转换为已驯服实体的弹射物。

::: code-group
```json [BP/items/throwable_pretamed_wolf.json]
{
    "format_version":"1.16.100",
    "minecraft:item":{
        "description":{
            "identifier":"wiki:throwable_pretamed_wolf"
        },
        "components":{ // 物品组件
            "minecraft:on_use":{
                "on_use":{
                    "event":"wiki:on_use" // 使用事件触发
                }
            }
        },
        "events":{ // 事件配置
            "wiki:on_use":{
                "shoot":{
                    "projectile":"wiki:pretamed_wolf" // 发射自定义弹射物
                }
            }
        }
    }
}
```
:::

同时需修改弹射物实体的转化逻辑以避免即时变形：

::: code-group
```json [BP/entities/pretamed_wolf.json]
{
    "minecraft:entity":{
        "description":{
            "identifier":"wiki:pretamed_wolf",
            "runtime_identifier":"minecraft:arrow",
            "is_spawnable":false,
            "is_summonable":true,
            "is_experimental":false
        },
        "component_groups":{ // 组件组定义
            "wiki:transform_to_entity":{
                "minecraft:transformation":{
                    "into":"minecraft:wolf<minecraft:on_tame>",
                    "keep_owner":true
                }
            }
        },
        "components":{ // 组件配置
            "minecraft:projectile":{
                "on_hit":{ // 碰撞触发配置
                    "impact_damage":{
                        "damage":0 // 禁用伤害
                    },
                    "stick_in_ground":{}, // 插入地面
                    "definition_event":{
                        "event_trigger":{
                            "event":"wiki:on_hit" // 碰撞事件触发
                        }
                    }
                }
            }
        },
        "events":{ // 事件响应
            "wiki:on_hit":{
                "add":{
                    "component_groups":[
                        "wiki:transform_to_entity" // 添加变形组件组
                    ]
                }
            }
        }
    }
}
```
:::

特别感谢 [Zarkmend ZAN](https://twitter.com/Zarkmend_ZAN) 发现这一方法 :)