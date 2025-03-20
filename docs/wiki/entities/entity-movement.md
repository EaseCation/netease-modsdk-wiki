---
title: 实体移动
category: 巧思案例
mentions:
    - SirLich
    - sermah
    - MedicalJewel105
    - TheDoctor15
---

# 实体移动

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在Minecraft中，实体可以通过行走、游泳或飞行的方式在世界中移动。要为实体赋予这些行为能力，通常需要配置多种不同类型的组件。

阅读本教程时请注意，您的实体至少需要以下组件：

-   [设置移动速度的基础组件](#移动速度)
-   [定义移动方式的组件（行走/飞行等）](#移动方式)
-   [设定导航能力的组件，用于生成移动路径](#导航能力)
-   [控制实体移动时机和方向的AI组件](#人工智能)

:::tip
创建移动实体的最佳方式是从原版行为包中找到类似实体，将其组件配置复制到您的实体中。

例如像夜魅（Phantom）、恶魂（Ghast）或鹦鹉这类飞行实体，虽然具有完全不同的游戏行为，但它们都是通过基本相似的组件实现移动功能的。建议选择与目标实体最接近的原版生物作为模板。
:::

## 移动速度

首先需要为实体配置移动速度组件，这些参数决定了实体在世界中的移动快慢。

| 组件                                                                                                 | 说明                          |
| ---------------------------------------------------------------------------------------------------- | ----------------------------- |
| [minecraft:movement](/wiki/entities/vanilla-usage-components#movement)                             | 设置基础移动速度（必需组件）  |
| [minecraft:underwater_movement](/wiki/entities/vanilla-usage-components#underwater-movement)       | 设置水下移动速度              |
| [minecraft:flying_speed](/wiki/entities/vanilla-usage-components#flying-speed)                     | 设置空中飞行速度              |

所有实体必须包含`minecraft:movement`组件。其他两个组件按需添加。

原版水中生物（如海豚）都包含`underwater_movement`组件。部分飞行生物具有`flying_speed`组件（具体配置因生物而异）。

## 移动方式

实体需要配置移动类型组件来定义其基础运动模式。注意每个实体只能选择一种移动类型，请根据实际需求选择最匹配的类型。

| 组件                                                                                                 | 说明                                                                                     |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [minecraft:movement.amphibious](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.amphibious) | 两栖移动模式，允许同时在水中游泳和陆地行走                                               |
| [minecraft:movement.basic](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.basic)           | 基础移动模式                                                                             |
| [minecraft:movement.fly](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.fly)               | 飞行移动模式                                                                             |
| [minecraft:movement.generic](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.generic)       | 通用移动模式，支持多种移动能力                                                           |
| [minecraft:movement.hover](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.hover)           | 悬停移动模式                                                                             |
| [minecraft:movement.jump](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.jump)             | 跳跃移动模式，可配置跳跃间隔时间                                                         |
| [minecraft:movement.skip](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.skip)             | 蹦跳移动模式                                                                             |
| [minecraft:movement.sway](https://bedrock.dev/docs/stable/Entities#minecraft%3Amovement.sway)             | 摆动移动模式，模拟水生生物游动姿态                                                       |

## 移动修正

下列组件可为实体移动提供额外的物理效果调整，常规情况下不是必须组件，但需要了解其功能。

| 组件                                                                                             | 说明                                       |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [minecraft:water_movement](https://bedrock.dev/docs/stable/Entities#minecraft%3Awater_movement)       | 设置实体在水中的摩擦力                     |
| [minecraft:rail_movement](https://bedrock.dev/docs/stable/Entities#minecraft%3Arail_movement)         | 使实体能够沿轨道移动（限轨道移动）         |
| [minecraft:friction_modifier](https://bedrock.dev/docs/stable/Entities#minecraft%3Afriction_modifier) | 设置实体陆地移动摩擦力                     |

## 导航能力

导航组件定义了路径生成规则。每个导航组件都有独特的硬编码逻辑，需要根据实体的具体需求选择最匹配的类型。

:::tip
此组件对实体行为影响重大，建议参考原版生物的配置获取启发
:::

| 组件                                                                                               | 说明                                                                                   |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [minecraft:navigation.climb](https://bedrock.dev/docs/stable/Entities#minecraft%3Anavigation.climb)     | 允许生成墙面路径（类似蜘蛛的爬墙能力）                                                 |
| [minecraft:navigation.float](https://bedrock.dev/docs/stable/Entities#minecraft%3Anavigation.float)     | 允许空中漂浮移动（类似恶魂的移动方式）                                                 |
| [minecraft:navigation.generic](https://bedrock.dev/docs/stable/Entities#minecraft%3Anavigation.generic) | 通用导航模式，支持行走、游泳、飞行和攀爬等多种路径生成                                 |
| [minecraft:navigation.fly](https://bedrock.dev/docs/stable/Entities#minecraft%3Anavigation.fly)         | 空中飞行导航（类似鹦鹉的飞行路径计算）                                                 |
| [minecraft:navigation.swim](https://bedrock.dev/docs/stable/Entities#minecraft%3Anavigation.swim)       | 水体环境导航                                                                           |
| [minecraft:navigation.walk](https://bedrock.dev/docs/stable/Entities#minecraft%3Anavigation.walk)       | 标准行走导航（类似普通生物的移动逻辑）                                                 |

## 增强组件

以下是增强实体移动能力的可选组件：

| 组件                                                                                                     | 说明                                                                                     |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [minecraft:annotation.break_door](https://bedrock.dev/docs/stable/Entities#minecraft%3Aannotation.break_door) | 允许实体破坏门（需同时在导航组件中启用）                                                 |
| [minecraft:annotation.open_door](https://bedrock.dev/docs/stable/Entities#minecraft%3Aannotation.open_door)   | 允许实体开门（需同时在导航组件中启用）                                                   |
| [minecraft:buoyant](https://bedrock.dev/docs/stable/Entities#minecraft%3Abuoyant)                             | 指定实体可以漂浮的液体类型                                                               |
| [minecraft:can_climb](https://bedrock.dev/docs/stable/Entities#minecraft%3Acan_climb)                         | 允许实体攀爬梯子                                                                         |
| [minecraft:can_fly](https://bedrock.dev/docs/stable/Entities#minecraft%3Acan_fly)                             | 标记实体飞行能力（导航系统不会强制要求踏板支撑）                                         |
| [minecraft:can_power_jump](https://bedrock.dev/docs/stable/Entities#minecraft%3Acan_power_jump)               | 允许进行强力跳跃（类似马匹的跳跃机制）                                                   |
| [minecraft:floats_in_liquid](https://bedrock.dev/docs/stable/Entities#minecraft%3Afloats_in_liquid)           | 使实体能够在液体中漂浮                                                                   |
| [minecraft:jump.dynamic](https://bedrock.dev/docs/stable/Entities#minecraft%3Ajump.dynamic)                   | 根据移动速度自动调整跳跃属性                                                             |
| [minecraft:jump.static](https://bedrock.dev/docs/stable/Entities#minecraft%3Ajump.static)                     | 赋予实体基本的跳跃能力                                                                   |

## 人工智能

导航组件定义了移动方式，而AI目标组件决定移动的时机和目的地。AI目标通过优先级系统（数值越低优先级越高）控制行为选择。

通常需要叠加多个不同优先级的AI组件来形成自然的行为模式。以下为部分常用AI组件示例：

| 组件                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------- |
| [minecraft:behavior.random_stroll](https://bedrock.dev/docs/stable/Entities#minecraft%3Abehavior.random_stroll)                   |
| [minecraft:behavior.follow_owner](https://bedrock.dev/docs/stable/Entities#minecraft%3Abehavior.follow_owner)                     |
| [minecraft:behavior.move_to_water](https://bedrock.dev/docs/stable/Entities#minecraft%3Abehavior.move_to_water)                   |
| [minecraft:behavior.stroll_towards_village](https://bedrock.dev/docs/stable/Entities#minecraft%3Abehavior.stroll_towards_village) |

完整列表请访问[基岩开发文档](https://bedrock.dev/docs/stable/Entities#AI%20Goals)。

### 路径规划

实现实体自动寻路是常用需求。推荐使用通过"诱饵实体"（Marker）进行引导的方案。若需要创建诱饵实体，请参考[虚拟实体教程](/wiki/entities/dummy-entities)。

#### 实现思路

基本原理是使主实体对诱饵实体产生敌对行为，通过放置诱饵实体引导主实体移动。关键点在于配置正确的组件参数以实现长距离寻路。

#### 组件配置

以下配置中需要将`nearest_attackable_target`指向虚体诱饵（需要为诱饵实体设置family_type属性）。同时不要忘记添加常规的移动和导航组件。

::: code-group
```json [标记目标锁定]
"minecraft:behavior.nearest_attackable_target": {
    "priority": 0,
    "reselect_targets": true,
    "target_search_height": 1000,
    "within_radius": 1000,
    "must_see": false,
    "entity_types": [
        {
            "filters": [
                {
                    "test": "is_family",
                    "subject": "other",
                    "value": "waypoint_1"
                }
            ],
            "max_dist": 1000
        }
    ]
},
"minecraft:attack": {
    "damage": 0
},
"minecraft:behavior.melee_attack": {
    "priority": 0,
    "require_complete_path": true,
    "track_target": true
},
"minecraft:follow_range": {
    "value": 1000,
    "max": 1000
}
```
:::

#### 航点到达检测

使用目标临近传感器检测是否到达标记位置：

::: code-group
```json [临近传感器]
"minecraft:target_nearby_sensor": {
    "inside_range": 2.0,
    "outside_range": 4.0,
    "must_see": true,
    "on_inside_range": {
        "event": "reached_waypoint"
    },
    "on_outside_range": {
        "event": "not_reached_waypoint"
    }
}
```
:::

## 其他技巧

:::tip
可通过命令强制触发实体行走动画：
`/execute as @e[type=...] at @s run tp @s ^^^0.1`
使用这种方式可以实现对实体移动路径的精确控制，并保持自然的动画效果。
:::