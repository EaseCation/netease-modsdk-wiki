# AI

在本节中，我们回顾学习实体的AI控制。

## 在编辑器中添加

![image-20240923123129331](./assets/image-20240923123129331.png)

依旧以守卫实体为例，我们可以看到在行为包组件中添加了很多以“行为.”开头的组件。这些组件便是与AI行为有关的组件。

![image-20240923123354653](./assets/image-20240923123354653.png)

我们也可以自行添加更多的其他行为。这些行为组件英文都是以`behavior.`开头。

## 实际文件

我们来观察守卫实体的行为包定义文件：

```json
{
    "format_version": "1.20.10",
    "minecraft:entity": {
        "component_groups": {
            "minecraft:can_break_doors": {
                "minecraft:annotation.break_door": {

                }
            },
            "minecraft:can_have_equipment": {
                "minecraft:equipment": {
                    "table": "loot_tables/entities/zombie_equipment.json"
                }
            },
            "minecraft:convert_to_baby_drowned": {
                "minecraft:is_shaking": {

                },
                "minecraft:transformation": {
                    "delay": {
                        "value": 15
                    },
                    "drop_equipment": true,
                    "into": "minecraft:drowned<minecraft:as_baby>",
                    "transformation_sound": "convert_to_drowned"
                }
            },
            "minecraft:convert_to_drowned": {
                "minecraft:is_shaking": {

                },
                "minecraft:transformation": {
                    "delay": {
                        "value": 15
                    },
                    "drop_equipment": true,
                    "into": "minecraft:drowned<minecraft:as_adult>",
                    "transformation_sound": "convert_to_drowned"
                }
            },
            "minecraft:look_to_start_drowned_transformation": {
                "minecraft:environment_sensor": {
                    "triggers": {
                        "event": "minecraft:start_transforming",
                        "filters": {
                            "operator": "==",
                            "subject": "self",
                            "test": "is_underwater",
                            "value": true
                        }
                    }
                }
            },
            "minecraft:start_drowned_transformation": {
                "minecraft:environment_sensor": {
                    "triggers": {
                        "event": "minecraft:stop_transforming",
                        "filters": {
                            "operator": "==",
                            "subject": "self",
                            "test": "is_underwater",
                            "value": false
                        }
                    }
                },
                "minecraft:timer": {
                    "looping": false,
                    "time": 30,
                    "time_down_event": {
                        "event": "minecraft:convert_to_drowned"
                    }
                }
            },
            "minecraft:zombie_adult": {
                "minecraft:behavior.mount_pathing": {
                    "priority": 2,
                    "speed_multiplier": 1.25,
                    "target_dist": 0.0,
                    "track_target": true
                },
                "minecraft:experience_reward": {
                    "on_death": "query.last_hit_by_player ? 5 + (query.equipment_count * Math.Random(1,3)) : 0"
                },
                "minecraft:movement": {
                    "value": 0.23
                },
                "minecraft:rideable": {
                    "family_types": [
                        "zombie"
                    ],
                    "seat_count": 1,
                    "seats": {
                        "lock_rider_rotation": 0,
                        "position": [
                            0.0,
                            1.1,
                            -0.35
                        ]
                    }
                }
            },
            "minecraft:zombie_baby": {
                "minecraft:experience_reward": {
                    "on_death": "query.last_hit_by_player ? 12 + (query.equipment_count * Math.Random(1,3)) : 0"
                },
                "minecraft:is_baby": {

                },
                "minecraft:movement": {
                    "value": 0.35
                },
                "minecraft:scale": {
                    "value": 0.5
                }
            },
            "minecraft:zombie_jockey": {
                "minecraft:behavior.find_mount": {
                    "max_failed_attempts": 20,
                    "priority": 1,
                    "start_delay": 15,
                    "within_radius": 16
                }
            }
        },
        "components": {
            "minecraft:behavior.delayed_attack": {
                "attack_duration": 1.0
            },
            "minecraft:behavior.equip_item": {
                "priority": 2
            },
            "minecraft:behavior.hurt_by_target": {
                "priority": 1
            },
            "minecraft:behavior.look_at_player": {
                "look_distance": 6,
                "priority": 8,
                "probability": 0.02
            },
            "minecraft:behavior.melee_attack": {
                "priority": 3
            },
            "minecraft:behavior.nearest_attackable_target": {
                "entity_types": [
                    {
                        "filters": {
                            "any_of": [
                                {
                                    "subject": "other",
                                    "test": "is_family",
                                    "value": "player"
                                },
                                {
                                    "subject": "other",
                                    "test": "is_family",
                                    "value": "snowgolem"
                                },
                                {
                                    "subject": "other",
                                    "test": "is_family",
                                    "value": "irongolem"
                                }
                            ]
                        },
                        "max_dist": 35
                    },
                    {
                        "filters": {
                            "any_of": [
                                {
                                    "subject": "other",
                                    "test": "is_family",
                                    "value": "villager"
                                },
                                {
                                    "subject": "other",
                                    "test": "is_family",
                                    "value": "wandering_trader"
                                }
                            ]
                        },
                        "max_dist": 35,
                        "must_see": false
                    },
                    {
                        "filters": {
                            "all_of": [
                                {
                                    "subject": "other",
                                    "test": "is_family",
                                    "value": "baby_turtle"
                                },
                                {
                                    "operator": "!=",
                                    "subject": "other",
                                    "test": "in_water",
                                    "value": true
                                }
                            ]
                        },
                        "max_dist": 35
                    }
                ],
                "must_see": true,
                "must_see_forget_duration": 17.0,
                "priority": 2,
                "reselect_targets": true,
                "within_radius": 25.0
            },
            "minecraft:behavior.pickup_items": {
                "can_pickup_any_item": true,
                "excluded_items": [
                    "minecraft:glow_ink_sac"
                ],
                "goal_radius": 2,
                "max_dist": 3,
                "pickup_based_on_chance": true,
                "priority": 6,
                "speed_multiplier": 1.0
            },
            "minecraft:behavior.random_look_around": {
                "priority": 9
            },
            "minecraft:behavior.random_stroll": {
                "priority": 7,
                "speed_multiplier": 1
            },
            "minecraft:behavior.stomp_turtle_egg": {
                "goal_radius": 1.14,
                "interval": 20,
                "priority": 4,
                "search_height": 2,
                "search_range": 10,
                "speed_multiplier": 1
            },
            "minecraft:breathable": {
                "breathes_air": true,
                "breathes_water": true,
                "suffocate_time": 0,
                "total_supply": 15
            },
            "minecraft:burns_in_daylight": {

            },
            "minecraft:can_climb": {

            },
            "minecraft:collision_box": {
                "height": 1.9,
                "width": 0.6
            },
            "minecraft:conditional_bandwidth_optimization": {

            },
            "minecraft:despawn": {
                "despawn_from_distance": {

                }
            },
            "minecraft:environment_sensor": {
                "triggers": {
                    "event": "minecraft:start_transforming",
                    "filters": {
                        "operator": "==",
                        "test": "is_underwater",
                        "value": true
                    }
                }
            },
            "minecraft:equip_item": {

            },
            "minecraft:health": {
                "max": 40,
                "value": 40
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
            "minecraft:is_hidden_when_invisible": {

            },
            "minecraft:jump.static": {

            },
            "minecraft:loot": {
                "table": "loot_tables/entities/zombie.json"
            },
            "minecraft:movement.basic": {

            },
            "minecraft:nameable": {

            },
            "minecraft:navigation.walk": {
                "can_break_doors": true,
                "can_pass_doors": true,
                "can_walk": true,
                "is_amphibious": true
            },
            "minecraft:persistent": {

            },
            "minecraft:physics": {

            },
            "minecraft:pushable": {
                "is_pushable": true,
                "is_pushable_by_piston": true
            },
            "minecraft:shareables": {
                "items": [
                    {
                        "item": "minecraft:netherite_sword",
                        "priority": 0,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:diamond_sword",
                        "priority": 1,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:iron_sword",
                        "priority": 2,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:stone_sword",
                        "priority": 3,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:golden_sword",
                        "priority": 4,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:wooden_sword",
                        "priority": 5,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:netherite_helmet",
                        "priority": 0,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:diamond_helmet",
                        "priority": 1,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:iron_helmet",
                        "priority": 2,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:chainmail_helmet",
                        "priority": 3,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:golden_helmet",
                        "priority": 4,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:leather_helmet",
                        "priority": 5,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:turtle_helmet",
                        "priority": 6,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:skull:0",
                        "priority": 7,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:skull:1",
                        "priority": 7,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:carved_pumpkin",
                        "priority": 7,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:netherite_chestplate",
                        "priority": 0,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:diamond_chestplate",
                        "priority": 1,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:iron_chestplate",
                        "priority": 2,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:chainmail_chestplate",
                        "priority": 3,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:golden_chestplate",
                        "priority": 4,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:leather_chestplate",
                        "priority": 5,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:netherite_leggings",
                        "priority": 0,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:diamond_leggings",
                        "priority": 1,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:iron_leggings",
                        "priority": 2,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:chainmail_leggings",
                        "priority": 3,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:golden_leggings",
                        "priority": 4,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:leather_leggings",
                        "priority": 5,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:netherite_boots",
                        "priority": 0,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:diamond_boots",
                        "priority": 1,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:iron_boots",
                        "priority": 2,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:chainmail_boots",
                        "priority": 3,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:golden_boots",
                        "priority": 4,
                        "surplus_amount": 1,
                        "want_amount": 1
                    },
                    {
                        "item": "minecraft:leather_boots",
                        "priority": 5,
                        "surplus_amount": 1,
                        "want_amount": 1
                    }
                ],
                "singular_pickup": true
            },
            "minecraft:type_family": {
                "family": [
                    "zombie",
                    "undead",
                    "monster",
                    "mob"
                ]
            }
        },
        "description": {
            "identifier": "test:guard",
            "is_experimental": false,
            "is_spawnable": true,
            "is_summonable": true
        },
        "events": {
            "minecraft:as_adult": {
                "add": {
                    "component_groups": [
                        "minecraft:zombie_adult"
                    ]
                }
            },
            "minecraft:as_baby": {
                "add": {
                    "component_groups": [
                        "minecraft:zombie_baby"
                    ]
                }
            },
            "minecraft:convert_to_drowned": {
                "sequence": [
                    {
                        "add": {
                            "component_groups": [
                                "minecraft:convert_to_drowned"
                            ]
                        },
                        "filters": {
                            "operator": "!=",
                            "test": "has_component",
                            "value": "minecraft:is_baby"
                        },
                        "remove": {
                            "component_groups": [
                                "minecraft:start_drowned_transformation"
                            ]
                        }
                    },
                    {
                        "add": {
                            "component_groups": [
                                "minecraft:convert_to_baby_drowned"
                            ]
                        },
                        "filters": {
                            "test": "has_component",
                            "value": "minecraft:is_baby"
                        },
                        "remove": {
                            "component_groups": [
                                "minecraft:start_drowned_transformation"
                            ]
                        }
                    }
                ]
            },
            "minecraft:entity_spawned": {
                "sequence": [
                    {
                        "randomize": [
                            {
                                "add": {
                                    "component_groups": [
                                        "minecraft:zombie_adult",
                                        "minecraft:can_have_equipment"
                                    ]
                                },
                                "remove": {

                                },
                                "weight": 380
                            },
                            {
                                "add": {
                                    "component_groups": [
                                        "minecraft:zombie_baby",
                                        "minecraft:can_have_equipment"
                                    ]
                                },
                                "remove": {

                                },
                                "weight": 17
                            },
                            {
                                "add": {
                                    "component_groups": [
                                        "minecraft:zombie_baby",
                                        "minecraft:zombie_jockey",
                                        "minecraft:can_have_equipment"
                                    ]
                                },
                                "remove": {

                                },
                                "weight": 3
                            }
                        ]
                    },
                    {
                        "randomize": [
                            {
                                "add": {
                                    "component_groups": [
                                        "minecraft:can_break_doors"
                                    ]
                                },
                                "weight": 10
                            },
                            {
                                "weight": 90
                            }
                        ]
                    }
                ]
            },
            "minecraft:start_transforming": {
                "add": {
                    "component_groups": [
                        "minecraft:start_drowned_transformation"
                    ]
                },
                "remove": {
                    "component_groups": [
                        "minecraft:look_to_start_drowned_transformation"
                    ]
                }
            },
            "minecraft:stop_transforming": {
                "add": {
                    "component_groups": [
                        "minecraft:look_to_start_drowned_transformation"
                    ]
                },
                "remove": {
                    "component_groups": [
                        "minecraft:start_drowned_transformation"
                    ]
                }
            }
        }
    }
}
```

这相当的复杂，但我们仔细观察，依旧可以在`components`下找到`minecraft:behavior.`开头的相关组件。这边是与编辑器中行为组件相对应的实际文件中的实体组件。特别地，这样的组件被称为AI意向（AI Goal）组件。

比如，最上方的`minecraft:behavior.delayed_attack`便代表实体具有延迟攻击意向。你可以在官方参考文档[国际版 - 实体AI意向列表](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/100-%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99/13-AIGoalList.html?catalog=1)中找到所有AI意向的列表。

每一个AI意向都可选地接受一个`priority`字段，代表该意向的优先级，优先级以值更小的为更优先。每一个AI意向也可选地接受一个`control_flags`数组，其中可以添加字符串`look`、`move`、`jump`，用于调整该意向使用的控制旗标。大部分意向的控制旗标是默认选择好的，但对于某一些意向来说，精准调整控制旗标有助于精准控制意向触发的时机，例如`minecraft:behavior.timer_flag_1`、`minecraft:behavior.timer_flag_2`、`minecraft:behavior.timer_flag_3`等计时器意向。

关于生物AI意向的相关机制内容，可以参考Minecraft Wiki上的[生物AI](https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9AI)页面，学习相关内容。
