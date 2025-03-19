---
title: 飞行实体的控制方法
category: 教程
tags:
    - 配方
    - 中级
mentions:
    - SirLich
    - Joelant05
    - Dreamedc2015
    - MedicalJewel105
    - aexer0e
    - imsolucid
    - nebulacrab
    - Luthorius
    - TheItsNameless
---

# 飞行实体的控制方法

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

无论是制作飞机还是飞龙，为飞行实体添加可控性对于未接触过此类概念的开发者来说都具有挑战性。由于没有"标准"方法来实现飞行操控，本文将展示三种主要的替代方案。

## 高跳缓降法

虽然不算严格意义上的"飞行"，但通过设置实体高跳跃能力并附加缓降和加速效果是最直接的方式。

需要给实体添加 `"minecraft:horse.jump_strength"` 组件，该组件可控制跳跃高度并禁用跳跃键下马功能。

::: code-group
```json [组件配置]
"minecraft:horse.jump_strength": {
    "value": 7
}
```
:::

使用范围值对象可显示蓄力进度条：

::: code-group
```json [蓄力进度条配置]
"minecraft:horse.jump_strength": {
    "value": { "range_min": 0.6, "range_max": 1.2 }
}
```
:::

通过动画控制器在空中时附加缓降和加速效果：

（可参考[实体命令动画控制器教程](/animation-controllers/entity-commands)）

::: code-group
```json [动画控制器]
"controller.animation.dragon.flying":{
    "states":{
        "default":{
            "transitions":[
                {
                    "jumping":"!q.is_on_ground"
                }
            ]
        },
        "jumping":{
            "transitions":[
                {
                    "default":"q.is_on_ground"
                }
            ],
            "on_entry":[
                "/effect @s slow_falling 20000 0 true",
                "/effect @s speed 20000 10 true"
            ],
            "on_exit":[
                "/effect @s clear"
            ]
        }
    }
}
```
:::

实体描述符需关联控制器：

::: code-group
```json [实体配置]
"description":{
    "identifier":"wiki:dragon",
    "is_spawnable":true,
    "is_summonable":true,
    "is_experimental":false,
    "scripts":{
        "animate":[
            "flying"
        ]
    },
    "animations":{
        "flying":"controller.animation.dragon.flying"
    }
}
```
:::

通过调整跳跃力度和速度参数可改变飞行体验，但实体最终仍会下落。

## 视角控制法

这是最流行的飞行控制方式，通过检测玩家俯仰角来控制垂直运动。优点是可主动控制升降，缺点是视角转动会影响飞行轨迹。

使用命令方块检测玩家垂直视角并应用飘浮/缓降效果：

::: code-group
```mcfunction
execute @a[rxm=-90,rx=-25] ~~~ effect @e[type=wiki:dragon,r=1] levitation 1 6 true
execute @a[rxm=-25,rx=-15] ~~~ effect @e[type=wiki:dragon,r=1] levitation 1 3 true
execute @a[rxm=-15,rx=-5] ~~~ effect @e[type=wiki:dragon,r=1] levitation 1 2 true
execute @a[rxm=-5,rx=20] ~~~ effect @e[type=wiki:dragon,r=1] levitation 1 1 true
execute @a[rxm=20,rx=35] ~~~ effect @e[type=wiki:dragon,r=1] slow_falling 1 1 true
execute @a[rxm=35,rx=90] ~~~ effect @e[type=wiki:dragon,r=1] clear
```
:::

**注意：根据实体尺寸和坐骑点位置可能需要调整选择器半径 `r` 的数值**

建议通过动画控制器关联玩家实现持续效果：

::: code-group
```json [玩家动画控制器]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.base": {
			"initial_state": "default",
			"states": {
				"default": {
					"transitions": [
						{
							"base": "(1.0)"
						}
					],
					"on_entry": [
                        "/function dragon_control"
                    ]
				},
				"base": {
					"transitions": [
						{
							"default": "(1.0)"
						}
					],
					"on_entry": [
                        "/function dragon_control"
                    ]
				}
			}
		}
	}
}
```
:::

通过改良版动画控制器维持飞行速度:

::: code-group
```json [改良版速度控制器]
"controller.animation.dragon.flying":{
    "states":{
        "default":{
            "transitions":[
                {
                    "jumping_1":"!q.is_on_ground"
                }
            ]
        },
        "jumping_1":{
            "transitions":[
                {
                    "transition_to_default":"q.is_on_ground"
                },
                {
                    "jumping_2":"true"
                }
            ],
            "on_entry":[
                "/effect @s speed 15 10 true"
            ]
        },
        "jumping_2":{
            "transitions":[
                {
                    "transition_to_default":"q.is_on_ground"
                },
                {
                    "jumping_1":"true"
                }
            ],
            "on_entry":[
                "/effect @s speed 15 10 true"
            ]
        },
        "transition_to_default":{
            "transitions":[
                {
                    "transition_to_default":"true"
                }
            ],
            "on_entry":[
                "/effect @s clear"
            ]
        }
    }
}
```
:::

添加骑乘检测标签来优化误触发问题：

::: code-group
```json [骑乘检测控制器]
"controller.animation.dragon.test_rider":{
    "states":{
        "default":{
            "transitions":[
                {
                    "has_rider":"q.has_rider"
                }
            ]
        },
        "has_rider":{
            "transitions":[
                {
                    "default":"!q.has_rider"
                }
            ],
            "on_entry":[
                "/tag @s add has_rider"
            ],
            "on_exit":[
                "/tag @s remove has_rider"
            ]
        }
    }
}
```
:::

对应调整命令选择器：

::: code-group
```mcfunction
execute @a[rxm=-90,rx=-25] ~~~ effect @e[type=wiki:dragon,r=1,tag=has_rider] levitation 1 6 true
execute @a[rxm=-25,rx=-15] ~~~ effect @e[type=wiki:dragon,r=1,tag=has_rider] levitation 1 3 true
execute @a[rxm=-15,rx=-5] ~~~ effect @e[type=wiki:dragon,r=1,tag=has_rider] levitation 1 2 true
execute @a[rxm=-5,rx=20] ~~~ effect @e[type=wiki:dragon,r=1,tag=has_rider] levitation 1 1 true
execute @a[rxm=20,rx=35] ~~~ effect @e[type=wiki:dragon,r=1,tag=has_rider] slow_falling 1 1 true
execute @a[rxm=35,rx=90] ~~~ effect @e[type=wiki:dragon,r=1,tag=has_rider] clear
```
:::

## 跳跃键控制法

通过跳跃键实现升降控制：按住跳跃上升，松开自动下降。

首先禁用默认跳跃功能：

::: code-group
```json [实体组件配置]
"minecraft:horse.jump_strength": {
    "value": 0
},
"minecraft:can_power_jump": {}
```
:::

创建响应跳跃输入的动画控制器：

::: code-group
```json [跳跃键控制器]
"controller.animation.fly_dragon":{
    "initial_state":"falling",
    "states":{
        "falling":{
            "on_entry":[
                "/effect @e[type=wiki:dragon,r=1,c=1] levitation 0"
            ],
            "transitions":[
                {
                    "rising":"q.is_jumping"
                }
            ]
        },
        "rising":{
            "on_entry":[
                "/effect @e[type=wiki:dragon,r=1,c=1] levitation 100000 6 true"
            ],
            "transitions":[
                {
                    "falling":"!q.is_jumping"
                }
            ]
        }
    }
}
```
:::

需修改玩家行为文件（需从[官方模板包](https://aka.ms/behaviorpacktemplate)获取）并添加控制器：

::: code-group
```json [玩家配置文件]
"description":{
    "identifier":"minecraft:player",
    "is_spawnable":false,
    "is_summonable":false,
    "animations":{
        "fly_dragon":"controller.animation.fly_dragon"
    },
    "scripts":{
        "animate":[
            {
                "fly_dragon":"q.is_riding"
            }
        ]
    }
}
```
:::

添加离鞍状态复位控制器：

::: code-group
```json [离鞍复位控制器]
"controller.animation.reset_levitation":{
    "initial_state":"no_rider",
    "states":{
        "no_rider":{
            "transitions":[
                {
                    "has_rider":"q.has_rider"
                }
            ]
        },
        "has_rider":{
            "on_exit":[
                "/effect @s levitation 0"
            ],
            "transitions":[
                {
                    "no_rider":"!q.has_rider"
                }
            ]
        }
    }
}
```
:::