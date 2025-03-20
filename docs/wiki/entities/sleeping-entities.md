---
title: 睡眠实体
category: 巧思案例
tags:
    - 中级
mentions:
    - MedicalJewel105
    - SirLich
---

# 睡眠实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本文将指导如何为实体添加睡眠功能。

## 在床上睡眠

该行为的灵感来源于村民设计。

### 特性

-   实体在夜晚自动入睡，天亮时苏醒
-   与实体互动可唤醒它，并在一段时间后重新入睡
-   实体受到伤害时会立即清醒

### 行为包配置

本节将解析行为包所需组件。

#### 组件

首先在实体组件中添加基础元素：

::: code-group
```json [行为包]
"minecraft:dweller": {
    "dwelling_type": "village",
    "dweller_role": "inhabitant",
    "can_find_poi": true
}
```
:::

此组件未经官方文档记载，但实体需要它以实现睡眠功能。

::: code-group
```json [行为包]
"minecraft:environment_sensor": {
    "triggers": [
        {
            "filters": {
                "test": "is_daytime",
                "value": false
            },
            "event": "sleep"
        }
    ]
}
```
:::

用于识别何时进入睡眠状态，会在非白天时段触发`sleep`事件。

:::warning
注意：实体需具备基础导航组件才能移动到床上。
:::

#### 组件组

接下来为实体配置复合组件组：

::: code-group
```json [行为包]
"sleeping": {
    "minecraft:behavior.sleep": {
        "priority": 0,
        "goal_radius": 1.5,
        "speed_multiplier": 1.25,
        "sleep_collider_height": 0.3,
        "sleep_collider_width": 1,
        "sleep_y_offset": 0.6,
        "timeout_cooldown": 10
    },
    "minecraft:damage_sensor": {
        "triggers": {
            "on_damage": {
                "event": "wake_up"
            }
        }
    },
    "minecraft:environment_sensor": {
        "triggers": [
            {
                "filters": {
                    "test": "is_daytime",
                    "value": true
                },
                "event": "wake_up"
            }
        ]
    },
    "minecraft:interact": {
        "interactions": [
            {
                "on_interact": {
                    "filters": {
                        "all_of": [
                            {
                                "test": "is_family",
                                "subject": "other",
                                "value": "player"
                            }
                        ]
                    },
                    "event": "woken_up"
                }
            }
        ]
    }
}
```
:::

参数解析：
-   `minecraft:behavior.sleep`
定义睡眠行为核心参数，优先级须设为`0`（最高级别）

-   `minecraft:damage_sensor`
实现受击苏醒功能

-   `minecraft:environment_sensor`
白昼时触发`wake_up`事件

-   `minecraft:interact`
允许玩家无伤害唤醒实体

::: code-group
```json [行为包]
"sleep_timer": {
    "minecraft:timer": {
        "time": 15,
        "time_down_event": {
            "event": "sleep_again"
        }
    }
}
```
:::

此组件组用于设置唤醒后的重新入睡延时。

#### 事件配置

以下事件系统逻辑相对直观：

::: code-group
```json [行为包]
"sleep": {
    "add": {
        "component_groups": [
            "sleeping"
        ]
    }
},
"wake_up": {
    "remove": {
        "component_groups": [
            "sleeping"
        ]
    }
},
"woken_up": {
    "remove": {
        "component_groups": [
            "sleeping"
        ]
    },
    "add": {
        "component_groups": [
            "sleep_timer"
        ]
    }
},
"sleep_again": {
    "add": {
        "component_groups": [
            "sleeping"
        ]
    },
    "remove": {
        "component_groups": [
            "sleep_timer"
        ]
    }
}
```
:::

### 资源包配置

请确保为实体添加睡眠动画和动画控制器！

#### 动画配置

直接复制以下配置：

::: code-group
```json [资源包]
{
	"format_version": "1.8.0",
	"animations": {
		"animation.sleeping_entity.sleep": {
			"loop": "hold_on_last_frame",
			"animation_length": 0.5,
			"bones": {
				"body": {
					"rotation": {
						"0.0": [0, 0, 0],
						"0.5": [-90, 0, 0]
					},
					"position": [0, 2, -15]
				}
			}
		}
	}
}
```
:::

#### 动画控制器

推荐直接套用此模板：

::: code-group
```json [资源包]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.sleeping_entity.sleep": {
			"initial_state": "default",
			"states": {
				"default": {
					"transitions": [
						{
							"sleep": "q.is_sleeping"
						}
					]
				},
				"sleep": {
					"animations": ["sleeping"],
					"transitions": [
						{
							"default": "!q.is_sleeping"
						}
					]
				}
			}
		}
	}
}
```
:::

注意：需在客户端实体定义中关联动画：`"sleeping": "animation.sleeping_entity.sleep"`

### 效果演示

![](/assets/images/tutorials/sleeping-entities/result.png)

## 小憩系统

此行为灵感来源于狐狸设计。

### 特色功能

-   实体在安全环境（远离敌对生物且无雷暴天气）下进入小憩状态
-   仅允许信任的潜行玩家或同族`sleeping_entity`实体靠近时不惊醒
-   受击后自动苏醒

### 行为包配置

#### 核心组件

仅需一个核心组件：

::: code-group
```json [行为包]
"minecraft:behavior.nap": {
    "priority": 8,
    "cooldown_min": 2.0,
    "cooldown_max": 7.0,
    "mob_detect_dist": 12.0,
    "mob_detect_height": 6.0,
    "can_nap_filters": {
        "all_of": [
            {
                "test": "in_water",
                "subject": "self",
                "operator": "==",
                "value": false
            },
            {
                "test": "on_ground",
                "subject": "self",
                "operator": "==",
                "value": true
            },
            {
                "test": "is_underground",
                "subject": "self",
                "operator": "==",
                "value": true
            },
            {
                "test": "weather_at_position",
                "subject": "self",
                "operator": "!=",
                "value": "thunderstorm"
            }
        ]
    },
    "wake_mob_exceptions": {
        "any_of": [
            {
                "test": "trusts",
                "subject": "other",
                "operator": "==",
                "value": true
            },
            {
                "test": "is_family",
                "subject": "other",
                "operator": "==",
                "value": "sleeping_entity"
            },
            {
                "test": "is_sneaking",
                "subject": "other",
                "operator": "==",
                "value": true
            }
        ]
    }
}
```
:::

如需实现信任机制，可附加：

::: code-group
```json [行为包]
"minecraft:trust": {}
```
:::

### 资源包配置

可通过动画控制器实现睡眠动画：

::: code-group
```json [资源包]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.sleeping_entity.sleep": {
			"initial_state": "default",
			"states": {
				"default": {
					"transitions": [
						{
							"sleep": "q.is_sleeping"
						}
					]
				},
				"sleep": {
					"animations": ["sleeping"],
					"transitions": [
						{
							"default": "!q.is_sleeping"
						}
					]
				}
			}
		}
	}
}
```
::>

最后需要为实体创建并注册睡眠动画，若存在制作难题可参考[BlockBench动画教程](/wiki/guide/blockbench.html#animating)。