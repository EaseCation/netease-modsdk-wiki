---
title: 自定义长矛
category: 巧思案例
tags:
    - 脚本
mentions:
    - XxPoggyisLitxX
    - SirLich
    - TheItsNamless
    - ThomasOrs
    - kumja1
hidden: true
---

# 自定义长矛

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
强烈建议您对JavaScript和Script-API有基本的了解。
:::

::: warning
请确保已为本教程准备好基础纹理和模型。
:::

开始前，请确认文件结构已正确设置：

<FolderView
	:paths="[
    'com.mojang/development_resource_packs/spear_RP/textures/items/spear.png',
    'com.mojang/development_resource_packs/spear_RP/textures/entities/spear.png',
    'com.mojang/development_resource_packs/spear_RP/entities/spear.json',
    'com.mojang/development_resource_packs/spear_RP/attachables/spear.json',
    'com.mojang/development_resource_packs/spear_RP/animations/spear_animation.json',
    'com.mojang/development_resource_packs/spear_RP/texts/en_US.lang',
    'com.mojang/development_resource_packs/spear_RP/manifest.json',
    'com.mojang/development_resource_packs/spear_RP/pack_icon.png',
    'com.mojang/development_behavior_packs/spear_BP/items/spear.json',
    'com.mojang/development_behavior_packs/spear_BP/entities/spear.json',
    'com.mojang/development_behavior_packs/spear_BP/pack_icon.png',
    'com.mojang/development_behavior_packs/spear_BP/manifest.json'
    ]"
></FolderView>

制作自定义长矛其实非常简单（不过对Koala Boy来说可不简单）。虽然涉及部分脚本，但核心行为并不依赖脚本实现。

## 物品

首先需要创建长矛物品，但这里不使用"基础"行为组件。我们通过以下组件实现特殊功能：

::: code-group
```json [BP/items/spear.json]
{
    //使用持续时间是我们能使用物品的最长时间
    "minecraft:use_duration": 3600,
    //赋予长矛类似弓的拉弓能力
    "minecraft:throwable": {
        "min_draw_duration": 2,
        "max_draw_duration": 4,
        "scale_power_by_draw_duration": true
    },
    //完成蓄力后发射的抛射物
    "minecraft:projectile": {
        "projectile_entity": "wiki:thrown_iron_spear",
        "minimum_critical_power": 1.0
    },
    //长矛耐久度
    "minecraft:durability": {
        "max_durability": 125
    }
}
```
:::

## 抛射物实体

接下来创建抛射物实体。该实体需要特殊组件和运行时标识符来实现正确行为：

<Spoiler title="抛射物实体">

::: code-group
```json [BP/entities/spear.json]
{
    "format_version": "1.12.0",
    "minecraft:entity": {
        "description": {
            "identifier": "wiki:thrown_iron_spear",
            "is_spawnable": false,
            "is_summonable": true,
            "is_experimental": false,
            "runtime_identifier": "minecraft:snowball"
        },
        "component_groups": {
            "wiki:give": {
                "minecraft:instant_despawn": {}
            }
        },
        "components": {
            "minecraft:conditional_bandwidth_optimization": {
                "default_values": {
                    "max_dropped_ticks": 10,
                    "max_optimized_distance": 100,
                    "use_motion_prediction_hints": true
                }
            },
            "minecraft:hurt_on_condition": {
                "damage_conditions": [
                    {
                        "cause": "lava",
                        "damage_per_tick": 4,
                        "filters": {
                            "operator": "==",
                            "subject": "self",
                            "test": "in_lava",
                            "value": true
                        }
                    }
                ]
            },
            "minecraft:physics": {},
            "minecraft:projectile": {
                "anchor": 1,
                "gravity": 0.05,
                "hit_sound": "bow.hit",
                "offset": [
                    0,
                    -0.1,
                    0
                ],
                "on_hit": {
                    "definition_event": {
                        "event_trigger": {
                            "event": "example:foo",
                            "target": "self"
                        }
                    },
                    "impact_damage": {
                        "damage": 7,
                        "destroy_on_hit": false,
                        "knockback": true,
                        "power_multiplier": 0.97,
                        "semi_random_diff_damage": false
                    },
                    "stick_in_ground": {
                        "shake_time": 0.35
                    }
                },
                "power": 3,
                "should_bounce": true,
                "stop_on_hurt": true
            },
            "minecraft:pushable": {
                "is_pushable": false,
                "is_pushable_by_piston": true
            }
        }
    }
}
```
:::
</Spoiler>

现在需要添加玩家拾取机制。通过实体传感器和事件实现：

::: code-group
```json [BP/entities/spear.json]
{
    "components": {
        //实体传感器检测抛射物是否在地面上，以及玩家是否靠近实体
        //当条件满足时触发事件
        "minecraft:entity_sensor": {
            "event": "wiki:give",
            "event_filters": {
                "all_of": [
                    {
                        "subject": "other",
                        "test": "is_family",
                        "value": "player"
                    },
                    {
                        "subject": "self",
                        "test": "on_ground",
                        "value": true
                    }
                ]
            },
            "minimum_count": 1,
            "relative_range": false,
            "sensor_range": 0.7
        }
    },
    "events": {
        /*
        该事件会立即销毁抛射物，并给玩家添加标签（将在脚本中使用）
        */
        "wiki:give": {
            "sequence": [
                {
                    "add": {
                        "component_groups": [
                            "wiki:give"
                        ]
                    }
                },
                {
                    "randomize": [
                        {
                            "run_command": {
                                "command": [
                                    "playsound random.pop @p",
                                    "tag @p add iron_spear"
                                ]
                            },
                            "weight": 90
                        }
                    ]
                }
            ]
        }
    }
}
```
:::

## 客户端实体

为抛射物创建客户端实体文件：

<Spoiler title="客户端实体">

::: code-group
```json [RP/entities/spear.json]
{
    "format_version": "1.10.0",
    "minecraft:client_entity": {
        "description": {
            "identifier": "wiki:thrown_iron_spear",
            "materials": {
                "default": "entity_alphatest"
            },
            "textures": {
                "default": "textures/entity/iron_spear"
            },
            "animations": {
                "move": "animation.weapon.default_thrown"
            },
            "scripts": {
                "animate": [
                    "move"
                ]
            },
            "geometry": {
                "default": "geometry.stone_spear"
            },
            "render_controllers": [
                "controller.render.default"
            ]
        }
    }
}
```
:::
</Spoiler>

:::warning
请确保实体模型符合下图样式！
:::

![](/assets/images/items/spears/spear_model.png)

## 动画

使用[Molang](https://bedrock.dev/docs/stable/Molang)实现抛射物飞行时的旋转动画：

::: code-group
```json [BP/animations/spear.json]
{
	"format_version": "1.8.0",
	"animations": {
		"animation.weapon.default_thrown": {
			"loop": true,
			"bones": {
				"body": {
                    //这是一些molang代码。动画根据当前角度旋转模型
					"rotation": ["-q.target_x_rotation", "-q.body_y_rotation", 0]
				}
			}
		}
    }
}
```
:::

## 附着物

使用三叉戟的附着物模板，已包含持握动画：

::: code-group
```json [BP/attachables/spear.json]
{
    "format_version": "1.10.0",
    "minecraft:attachable": {
        "description": {
            "identifier": "wiki:iron_spear",
            "materials": {
                "default": "entity_alphatest",
                "enchanted": "entity_alphatest_glint"
            },
            "textures": {
                "default": "textures/entity/iron_spear",
                "enchanted": "textures/misc/enchanted_item_glint"
            },
            "geometry": {
                "default": "geometry.stone_spear_item"
            },
            "animations": {
                "wield": "controller.animation.trident.wield",
                "wield_first_person": "animation.trident.wield_first_person",
                "wield_first_person_raise": "animation.trident.wield_first_person_raise",
                "wield_first_person_raise_shake": "animation.trident.wield_first_person_raise_shake",
                "wield_first_person_riptide": "animation.trident.wield_first_person_riptide",
                "wield_third_person": "animation.trident.wield_third_person",
                "wield_third_person_raise": "animation.trident.wield_third_person_raise"
            },
            "scripts": {
                "pre_animation": [
                    "v.charge_amount = math.clamp((q.main_hand_item_max_duration - (q.main_hand_item_use_duration - q.frame_alpha + 1.0)) / 10.0, 0.0, 1.0f);"
                ],
                "animate": [
                    "wield"
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

## 脚本

通过Script-API实现耐久度消耗：

```js
import { world, ItemStack } from "@minecraft/server"
import { system } from "@minecraft/server";
//防止世界崩溃
system.beforeEvents.watchdogTerminate.subscribe(data => {
  data.cancel = true;
});

world.afterEvents.itemReleaseUse.subscribe(ev => {
    //多人游戏支持
    for (const player of world.getPlayers()){
      let inv = player.getComponent( 'inventory' ).container
      //保存物品数据
      const itemStack = inv.getItem(player.selectedSlot);
      //检测是否持有长矛
      if (itemStack?.typeId === 'wiki:iron_spear') {
        var container = player.getComponent('inventory').container
        var newItem =  new ItemStack("wiki:iron_spear");
        var oldItem = container?.getItem(player.selectedSlot)
        player.removeTag("iron_spear")
        }
        //Tick事件检测标签和耐久度
      let e = system.runInterval(() => {
      if(player.hasTag("iron_spear") && itemStack?.typeId === 'wiki:iron_spear' && itemStack?.getComponent("durability").damage <= 125) {
        player.removeTag("iron_spear")
        //拾取时增加耐久损耗
        newItem.getComponent("durability").damage = oldItem.getComponent("durability").damage + 1;
        container.setItem(player.selectedSlot, newItem);
        //清除Tick事件
        if(!player.hasTag("iron_spear")){
        system.clearRun(e);
      }}
    })}
    })
```

## 最终效果

完成所有步骤后，即可在游戏中获得可正常使用的长矛：

![](/assets/images/items/spears/spear_first_person.png)

![](/assets/images/items/spears/spear_third_person.png)

示例包下载：

<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/custom_spear.mcaddon"
    color=blue
>💾 示例包</BButton>