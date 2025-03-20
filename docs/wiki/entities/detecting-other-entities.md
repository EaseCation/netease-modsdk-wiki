---
title: 侦测其他实体
category: 巧思案例
tags:
    - 中级
mentions:
    - ANightDazingZoroark
    - SmokeyStack
    - MedicalJewel105
    - SirLich
    - Luthorius
    - TheItsNameless
---

# 侦测其他实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

当需要让实体在附近存在其他实体时触发事件，本文将详细介绍多种已知实现方式。

## minecraft:entity_sensor

这是最基础的侦测方式。主要限制是只能接收单一条目，且检测实体退出范围较困难。作为实体组件，可直接植入实体行为文件并配置Minecraft过滤器：

::: code-group
```json [BP/entities/my_entity.json#components]
"minecraft:entity_sensor": {
    "sensor_range": 2.5,         //检测半径（格子数）
    "relative_range": false,     //若为true，检测范围会叠加实体碰撞箱
    "require_all": true,         //若为true，所有邻近实体需通过过滤条件才会触发事件
    "minimum_count": 1,          //触发事件的最小实体数量（默认1）
    "maximum_count": 4,          //触发事件的最大实体数量（默认-1表示无限）
    "event_filters": {           //自定义过滤器（本例检测玩家）
        "test": "is_family",
        "subject": "other",
        "value": "player"
    },
    "event": "event:on_player_detected" //条件满足时触发的事件
}
```
:::

## `/execute` 命令

使用1.19.50版本新增的`/execute`命令，可在附近存在实体时执行指令。以下示例使猪在检测到玩家时发出"oink oink"声（可自定义事件）：

::: code-group
```json [BP/animations/detection_animation.json]
{
    "format_version": "1.10.0",
    "animations": {
        "animation.pig.find_player": {
            "animation_length": 0.05,
            "loop": true,
            "timeline": {
                "0": [
                    "/execute as @s if entity @e[type=player, r=4] run event entity @s wiki:player_detected"
                ]
            }
        },
        "animation.pig.find_no_player": {
            "animation_length": 0.05,
            "loop": true,
            "timeline": {
                "0": [
                    "/execute as @s unless entity @e[type=player, r=4] run event entity @s wiki:no_player_detected"
                ]
            }
        }
    }
}
```
:::

首个动画用于检测实体存在，第二个检测实体离开。可通过`/event`命令添加[虚拟组件](/wiki/entities/dummy-components)或更新[实体属性](https://learn.microsoft.com/zh-cn/minecraft/creator/documents/introductiontoentityproperties)。

::: code-group
```json [BP/animation_controllers/pig_animation_controllers.json]
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.pig_find_player": {
            "initial_state": "default",
            "states": {
                "default": {
                    "animations": ["find_player"],
                    "transitions": [{
                        "detected": "q.is_sheared"
                    }]
                },
                "detected": {
                    "animations": ["find_no_player"],
                    "transitions": [{
                        "default": "!q.is_sheared"
                    }],
                    "on_entry": ["/say oink oink"]
                }
            }
        }
    }
}
```
:::

::: code-group
```json [BP/entities/my_entity.json#description]
"animations": {
    "manage_find_player": "controller.animation.pig_find_player",
    "find_player": "animation.pig.find_player",
    "find_no_player": "animation.pig.find_no_player"
},
"scripts": {
    "animate": ["manage_find_player"]
}
```
:::

## Molang、动画与动画控制器

使用`for_each`函数配合`q.get_nearby_entities`或`q.get_nearby_entities_except_self`可更高效检测实体（实验性功能），能更好处理实体离开的情况。

::: code-group
```json [BP/animations/detection_animation.json]
{
    "format_version": "1.10.0",
    "animations": {
        "animation.pig.find_player": {
            "animation_length": 0.05,
            "loop": true,
            "timeline": {
                "0": [
                    "v.x = 0.0; for_each(t.player, q.get_nearby_entities_except_self(16, 'minecraft:player'), { v.x = v.x + 1; }); return v.x > 0.0;"
                ]
            }
        }
    }
}
```
:::

若要检测具备特定Molang属性的实体：

::: code-group
```json [BP/animations/detection_animation.json]
{
    "format_version": "1.10.0",
    "animations": {
        "animation.pig.find_player": {
            "animation_length": 0.05,
            "loop": true,
            "timeline": {
                "0": [
                    "v.x = 0.0; for_each(t.player, q.get_nearby_entities_except_self(2, 'minecraft:player'), { v.x = v.x + (t.player -> q.is_sheared); }); return v.x > 0.0;"
                ]
            }
        }
    }
}
```
:::

::: code-group
```json [BP/animation_controllers/pig_animation_controllers.json]
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.pig_find_player": {
            "initial_state": "default",
            "states": {
                "default": {
                    "animations": ["find_player"],
                    "transitions": [{
                        "detected": "v.x > 0"
                    }]
                },
                "detected": {
                    "animations": ["find_player"],
                    "transitions": [{
                        "default": "v.x <= 0"
                    }],
                    "on_entry": ["/say oink oink"]
                }
            }
        }
    }
}
```
:::

::: code-group
```json [BP/entities/my_entity.json#description]
"animations": {
    "manage_find_player": "controller.animation.pig_find_player",
    "find_player": "animation.pig.find_player"
},
"scripts": {
    "animate": ["manage_find_player"]
}
```
:::