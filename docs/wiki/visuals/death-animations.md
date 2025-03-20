---
title: 自定义死亡动画
tags:
    - 进阶
category: 基础
mentions:
    - SirLich
    - Joelant05
    - Dreamedc2015
    - MedicalJewel105
    - aexer0e
    - Xterionix
    - ChibiMango
    - SmokeyStack
    - ThomasOrs
---

# 自定义死亡动画

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

死亡动画指实体死亡时的旋转效果，伴随红色着色效果，随后实体几何体会消失并出现死亡粒子。

## 取消死亡动画

本节将解释如何完全移除死亡动画效果。

### 传送实体

通过传送实体至虚空来消除死亡效果的常用方法，可在动画控制器中使用`!q.is_alive`条件触发：
`/teleport @s ~ ~-1000 ~`

注意：此方法会移除所有死亡效果，包括音效、粒子、战利品和实体视觉死亡效果。

### minecraft:instant_despawn

若需直接让实体消失，可添加包含`"minecraft:instant_despawn":{}`的组件组，并通过事件激活。

注意：此方法会移除所有死亡效果，包括音效、粒子、战利品和实体视觉死亡效果。

### 实体形态转换

类似传送方法，通过`!q.is_alive`条件触发转换事件，添加包含`"minecraft:transformation"`的组件组实现形态转换：

::: code-group
```json [转换组件示例]
"minecraft:transformation": {
	"into": "wiki:death_animation_entity",
	"transformation_sound" : "converted_to_zombified",
	"keep_level": true,
	"drop_inventory": true,
	"preserve_equipment": false,
	"drop_equipment": true,
	"delay": {
		"block_assist_chance": 0.0,
		"block_radius": 0,
		"block_max": 0,
		"value": 10
	}
}
```
:::

### 取消旋转动画

通过重置实体旋转值实现常规死亡效果（粒子、红色着色、战利品）同时避免90度旋转。需将旋转动画应用于所有骨骼的父级骨骼，并在`!q.is_alive`时触发。

::: code-group
```json [旋转动画]
"rotation" : [ 0, 0, "Math.min(Math.sqrt(Math.max(0, q.anim_time * 20 - 0.5) / 20 * 1.6), 1) * -90" ]
```
:::

::: code-group
```json [RP/animation_controllers/custom_death.animation.controllers.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.player.cancel_death_animaton": {
			"initial_state": "default",
			"states": {
				"default": {
					"transitions": [
						{
							"cancel_animation": "!q.is_alive"
						}
					]
				},
				"cancel_animation": {
					"animations": ["my.animation"],
					"transitions": [
						{
							"default": "q.is_alive && q.all_animations_finished"
						}
					]
				}
			}
		}
	}
}
```
:::

注意：需在资源包实体文件中附加动画控制器。

## 自定义死亡动画

### 修改伤害着色层

通过渲染控制器自定义/移除实体受伤着色：

::: code-group
```json [RP/render_controllers/custom_death.render_controllers.json]
{
	"format_version": "1.8.0",
	"render_controllers": {
		"controller.render.sample": {
			"geometry": "Geometry.default",
			"materials": [{ "*": "Material.default" }],
			"textures": ["Texture.default"],
			"is_hurt_color": {},
			"on_fire_color": {}
		}
	}
}
```
:::

粉色伤害着色示例：

::: code-group
```json [RP/render_controllers/custom_death.render_controllers.json]
{
	"format_version": "1.8.0",
	"render_controllers": {
		"controller.render.kbg": {
			"geometry": "Geometry.default",
			"materials": [{ "*": "Material.default" }],
			"textures": ["Texture.default"],
			"is_hurt_color": {
				"r": "1.0",
				"g": "0.4",
				"b": "0.7",
				"a": "0.5"
			},
			"on_fire_color": {
				"r": "1.0",
				"g": "0.4",
				"b": "0.7",
				"a": "0.5"
			}
		}
	}
}
```
:::

### 伤害检测与即时消失

通过damage_sensor组件触发死亡事件，实现物品掉落与快速消失：

::: code-group
```json [BP/entities/entity.json]
{
    "format_version":"1.14.0",
    "min_engine_version":"1.16.100",
    "minecraft:entity":{
        "description":{
            "identifier":"wiki:entity",
            "is_spawnable":true,
            "is_summonable":true,
            "is_experimental":true
        },
        "component_groups":{
            "wiki:death":{
                "minecraft:spawn_entity":{
                    "max_wait_time":0,
                    "min_wait_time":0,
                    "spawn_item":"egg",
                    "single_use":true
                },
                "minecraft:is_sheared":{},
                "minecraft:timer":{
                    "looping":true,
                    "time":[
                        2.56,
                        2.56
                    ], // 根据动画时长调整此处
                    "time_down_event":{
                        "event":"wiki:despawn"
                    }
                }
            },
            "wiki:despawn":{
                "minecraft:instant_despawn":{}
            }
        },
        "components":{
            "minecraft:damage_sensor":{
                "triggers":{
                    "on_damage":{
                        "filters":{
                            "all_of":[
                                {
                                    "test":"has_damage",
                                    "value":"fatal"
                                }
                            ]
                        },
                        "target":"self",
                        "event":"wiki:death",
                        "deals_damage":false,
                        "cause":"fatal"
                    }
                }
            }
        },
        "events":{
            "wiki:death":{
                "add":{
                    "component_groups":[
                        "wiki:death"
                    ]
                },
                "wiki:despawn":{
                    "add":{
                        "component_groups":[
                            "wiki:despawn"
                        ]
                    }
                }
            }
        }
    }
}
```
:::

自定义刷怪蛋掉落示例：

::: code-group
```json [BP/entities/my_entity.json#components]
{
	"minecraft:spawn_entity": [
		{
			"min_wait_time": 0,
			"max_wait_time": 0,
			"spawn_item": "wiki:custom_zombie_spawn_egg",
			"single_use": true
		}
	]
}
```
:::

战利品表掉落系统：

::: code-group
```json [战利品组件示例]
{
	"minecraft:behavior.drop_item_for":{
		"loot_table":"loot_tables/entities/example.loot_table.json"
	},
	"minecraft:timer": {
		"time": 2,
		"time_down_event": {
			"event": "wiki:my_despawn_event"
		}
	}
}
```
:::

### 使用命令检测死亡

<BButton
	link="/commands/tick_json-creations#death-detection"
	color=blue
>查看详情</BButton>