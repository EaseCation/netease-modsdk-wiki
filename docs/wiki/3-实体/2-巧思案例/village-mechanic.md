---
title: 村庄机制
category: 教程
mentions:
    - AeroForta
    - MedicalJewel105
    - stirante
    - SmokeyStack
    - SirLich
    - Ciosciaa
    - ThomasOrs
---

# 村庄机制

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本文适用于想要为自定义实体实现村庄机制的开发者

## 导航行为

首先从基本导航行为开始。

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:preferred_path":{
    "max_fall_blocks":1,
    "jump_cost":5,
    "default_block_cost":1.5,
    "preferred_path_blocks":[
        {
            "cost":0,
            "blocks":[
                "grass_path"
            ]
        },
        {
            "cost":1,
            "blocks":[
                "cobblestone",
                "stone"
            ]
        },
        {
            "cost":50,
            "blocks":[
                "bed",
                "lectern"
            ]
        }
    ]
}
```
:::

允许实体进行随机移动。

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:behavior.random_stroll":{
    "priority":9,
    "speed_multiplier":0.55,
    "xz_dist":10,
    "y_dist":5
}
```
:::

使实体返回居所范围（在此案例中即村庄边界）。需要下文将解释的`minecraft:dweller`组件。

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:behavior.move_towards_dwelling_restriction": {
    "priority": 4,
    "speed_multiplier": 1.0
}
```
:::

通过创建巡逻路径让实体在村庄周围移动。铁傀儡使用的机制。

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:behavior.move_through_village": {
	"priority": 3,
	"speed_multiplier": 0.6,
	"only_at_night": true
}
```
:::

允许实体进入建筑物并在下雨时寻找庇护所。需要开门能力。

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:behavior.move_indoors":{
    "priority":5
}
```
:::

使实体在日落时留在室内。

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:behavior.restrict_open_door":{
    "priority": 5
}
```
:::

需搭配使用：

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:annotation.open_door":{
    "priority": 5
}
```
:::

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:navigation.walk":{
    "can_pass_doors":true,
    "can_open_doors":true
}
```
:::

::: code-group
```json [BP/entities/custom_villager.json#components]
 "minecraft:behavior.open_door":{
    "priority":6,
    "close_door_after":true
}
```
:::

## 核心行为

::: code-group
```json [BP/entities/custom_villager.json#components]
"minecraft:dweller": {
	"dwelling_type": "village",
	"dweller_role": "inhabitant",
	"preferred_profession": "farmer",
	"update_interval_base": 60,
	"update_interval_variant": 40,
	"can_find_poi": true,
	"can_migrate": true,
	"first_founding_reward": 5
}
```
:::

- `dweller_role: inhabitant`\
允许实体认领床和钟，需搭配`minecraft:behavior.sleep`。
- `preferred_profession: farmer`\
为`minecraft:behavior.work`的可选参数
- `can_find_poi`\
启用后实体可寻找兴趣点。已知兴趣点类型：

```
bed    // 床
jobsite    // 工作站点
meeting_area    // 聚集点
```

- `can_migrate`\
定义实体是否能在不同村庄间迁移

### 睡眠行为

可参考[睡眠实体指南](/entities/sleeping-entities)实现实体睡眠

### 工作行为

需要设置"dweller_role"为"inhabitant"，若未设置"preferred_profession"则实体将移动到最近的工作站点。

::: code-group
```json [空值]
"minecraft:behavior.work": {
	"priority": 4,
	"active_time": 250,
	"speed_multiplier": 0.5,
	"goal_cooldown": 200,
	"sound_delay_min": 100,
	"sound_delay_max": 200,
	"can_work_in_rain": false,
	"work_in_rain_tolerance": 1000,
	"on_arrival": {
		"event": "minecraft:resupply_trades",
		"target": "self"
	}
}
```
:::

### 社交行为

允许实体进行社交活动。
需要设置"dweller_role"为"inhabitant"。

```json
"minecraft:behavior.mingle": {
  "priority": 4,
  "speed_multiplier": 0.5,
  "duration": 30,
  "cooldown_time": 10,
  "mingle_partner_type": "my:custom_entity",
  "mingle_distance": 2.0
}
```

## 日程系统

现在将所有机制整合到"minecraft:scheduler"中。
首先创建简单配置。
将工作行为放入组件组：

::: code-group
```json [空值]
"component_groups":{
    "work_schedule":{
        "minecraft:behavior.work":{
            "priority":4,
            "active_time":250,
            "speed_multiplier":0.5,
            "goal_cooldown":200,
            "sound_delay_min":100,
            "sound_delay_max":200,
            "can_work_in_rain":true,
            "work_in_rain_tolerance":1000,
            "on_arrival":{
                "event":"minecraft:resupply_trades",
                "target":"self"
            }
        }
    },
    "gather_schedule":{
        "minecraft:behavior.mingle":{
            "priority": 5,
            "speed_multiplier": 0.8,
            "cooldown_time":10.0,
            "duration": 30.0,
            "mingle_dist": 1.5,
            "mingle_partner_type": "my:custom_entity"
        }
    }
}
```
:::

配置工作日程：

::: code-group
```json [空值]
"minecraft:scheduler":{
    "min_delay_secs":0,
    "max_delay_secs":10,
    "scheduled_events":[
        {
            "filters":{
                "all_of":[
                    {
                        "test":"hourly_clock_time",
                        "operator":">=",
                        "value":0 // 早晨
                    },
                    {
                        "test":"hourly_clock_time",
                        "operator":"<",
                        "value":12000 // 傍晚
                    }
                ]
            },
            "event":"work"
        },
        {
            "filters":{
                "all_of":[
                    {
                        "test":"hourly_clock_time",
                        "operator":">=",
                        "value":21000
                    },
                    {
                        "test":"hourly_clock_time",
                        "operator":"<",
                        "value":24000
                    }
                ]
            },
            "event":"gather"
        }
    ]
}
```
:::

事件部分配置示例：

::: code-group
```json [空值]
"events":{
    "work":{
        "remove":{
            "component_groups":[
                "gather_schedule"
            ]
        },
        "add":{
            "component_groups":[
                "work_schedule"
            ]
        }
    },
    "gather":{
        "remove":{
            "component_groups":[
                "work_schedule"
            ]
        },
        "add":{
            "component_groups":[
                "gather_schedule"
            ]
        }
    }
}
```
:::

进入游戏生成实体后放置床，应可见绿色粒子效果。

## 其他行为

以下行为可供自定义实体使用：
- `minecraft:behavior.move_to_village`\
劫掠者使用该机制来留在村庄
- `minecraft:behavior.stroll_towards_village`\
狐狸使用该机制寻找并前往村庄
- `minecraft:behavior.inspect_bookshelf`\
管理员村民用于查看书架
- `minecraft:behavior.explore_outskirts`\
允许实体在村庄外探索（需搭配日程系统组件组保证返回）
- `minecraft:behavior.defend_village_target`\
用于近战攻击。远程攻击可能误伤具有"inhabitant" role的实体

可用行为对照表：
| 行为名称                                  | 用途                                                                                          | 备注                                                                                                          |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `minecraft:behavior.defend_village_target` | 允许实体攻击伤害村民的敌人                                                                    | 建议仅用于近战攻击型实体                                                                                      |
| `minecraft:behavior.hide`                  | 村民用于在特定POI隐藏停留                                                                       | 当前POI类型文档不完整，建议保持`"poi_type": "bed"`                                                            |
| `minecraft:behavior.move_to_village`       | 劫掠者和女巫用于在村庄范围内随机移动                                                           | -                                                                                                             |
| `minecraft:behavior.nap`                   | 狐狸用于小憩                                                                                   | 类似睡眠但更灵活，内置感知特定实体自动唤醒系统                                                                |