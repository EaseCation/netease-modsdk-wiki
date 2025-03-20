---
title: 投射物
mentions:
    - SirLich
    - stirante
    - retr0cube
    - SmokeyStack
    - Luthorius
    - ThomasOrs
---

# 投射物

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 概述

本文档旨在记录`minecraft:projectile`实体行为组件中可使用的所有字段。

:::warning
_免责声明：该组件的文档主要基于游戏中存在的投射物或通过逆向工程获得。_
_最后测试版本为 **1.18.2**。_
:::

| 字段名称                   | 类型              | 默认值        | 描述                                                                                                                                    |
| ------------------------- | ----------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| anchor                    | 整数              |               |                                                                                                                                        |
| angle_offset              | 小数              | 0             | 决定投射物被抛射时的角度                                                                                                               |
| catch_fire                | 布尔值            | false         | 若为true，被击中的实体将被点燃                                                                                                         |
| crit_particle_on_hurt     | 布尔值            | false         | 若为true，投射物在造成暴击时会产生特殊粒子效果                                                                                         |
| destroy_on_hurt           | 布尔值            | false         | 若为true，投射物在击中时会被销毁                                                                                                       |
| filter                    | 字符串            |               | 此处定义的实体类型不会被投射物伤害                                                                                                     |
| fire_affected_by_griefing | 布尔值            | false         | 若为true，投射物的引燃效果受游戏规则"mobGriefing"影响                                                                                 |
| gravity                   | 小数              | 0.05          | 投射物抛射时应用的引力值。数值越大下坠越快                                                                                             |
| hit_ground_sound          | 字符串            |               | 投射物击中地面时播放的音效                                                                                                             |
| hit_sound                 | 字符串            |               | 投射物击中实体时播放的音效                                                                                                             |
| homing                    | 布尔值            | false         | 若为true，投射物会自动追踪最近目标。**在1.18.2版本中不可用**                                                                          |
| inertia                   | 小数              | 0.99          | 投射物在空气中飞行时每帧保留的速度比例                                                                                                 |
| is_dangerous              | 布尔值            | false         | 若为true，投射物将被视为对玩家具有威胁性                                                                                               |
| knockback                 | 布尔值            | true          | 若为true，投射物会击退被击中的实体                                                                                                     |
| lightning                 | 布尔值            | false         | 若为true，被击中的实体将遭受雷击                                                                                                       |
| liquid_inertia            | 小数              | 0.6           | 投射物在水中飞行时每帧保留的速度比例                                                                                                   |
| multiple_targets          | 布尔值            | true          | 若为true，投射物在飞行过程中可以击中多个实体                                                                                           |
| offset                    | 三维向量 [a,b,c]  | [0, 0.5, 0]   | 投射物生成时相对于实体锚点的偏移量                                                                                                     |
| on_fire_time              | 小数              | 5             | 被击中实体持续燃烧的时间（秒）                                                                                                         |
| on_hit                    | 对象              |               | 投射物击中时的行为。详见[下方说明](#on_hit)                                                                                            |
| particle                  | 字符串            | iconcrack     | 碰撞时使用的粒子效果                                                                                                                   |
| potion_effect             | 整数              | -1            | 定义箭矢击中实体时施加的药水效果                                                                                                       |
| power                     | 小数              | 1.3           | 决定投射物的初速度                                                                                                                     |
| reflect_on_hurt           | 布尔值            | false         | 若为true，投射物被击中时会反弹                                                                                                         |
| semi_random_diff_damage   | 布尔值            | false         | 若为true，伤害值将基于基础伤害和速度进行随机计算                                                                                       |
| shoot_sound               | 字符串            |               | 投射物发射时播放的音效                                                                                                                 |
| shoot_target              | 布尔值            | true          | 若为true，投射物将朝向发射者的目标方向射出                                                                                             |
| should_bounce             | 布尔值            | false         | 若为true，投射物击中时会反弹                                                                                                           |
| splash_potion             | 布尔值            | false         | 若为true，投射物将被视为喷溅药水                                                                                                       |
| splash_range              | 小数              | 4             | '溅射'效果的半径（方块）                                                                                                               |
| stop_on_hurt              | 布尔值            |               |                                                                                                                                        |
| uncertainty_base          | 小数              | 0             | 基础精准度。实际精准度计算公式为：uncertaintyBase - difficultyLevel \* uncertaintyMultiplier                                           |
| uncertainty_multiplier    | 小数              | 0             | 难度对精准度的影响系数。实际精准度计算公式为：uncertaintyBase - difficultyLevel \* uncertaintyMultiplier                               |
| hit_water                 | 布尔值            | false         | 若为true，液态方块将被视为固体。**需要启用"教育版"功能**                                                                               |

## on_hit

该对象包含投射物击中目标时可执行的所有行为。

### arrow_effect

_具体作用未知_

### teleport_owner

将发射者传送到击中位置。

### catch_fire

_具体作用未知_
点燃目标

### ignite

_具体作用未知_
点燃目标

### remove_on_hit

击中目标后移除投射物。

### douse_fire

_具体作用未知_

### impact_damage

造成碰撞伤害。

| 字段名称                        | 类型                              | 描述                                                                                                                   |
| ------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| damage                         | 整数/整数数组 [min, max]          | 对实体造成的伤害值                                                                                                    |
| semi_random_diff_damage        | 布尔值                           |                                                                                                                       |
| max_critical_damage            | 小数                             |                                                                                                                       |
| min_critical_damage            | 小数                             |                                                                                                                       |
| power_multiplier               | 小数                             |                                                                                                                       |
| channeling                     | 布尔值                           |                                                                                                                       |
| set_last_hurt_requires_damage  | 布尔值                           |                                                                                                                       |
| destroy_on_hit_requires_damage | 布尔值                           |                                                                                                                       |
| filter                         | 字符串                           | 受影响的实体类型。此过滤器较为基础，只能通过标识符进行匹配                                                            |
| destroy_on_hit                 | 布尔值                           |                                                                                                                       |
| knockback                      | 布尔值                           |                                                                                                                       |
| catch_fire                     | 布尔值                           | 控制是否点燃目标                                                                                                      |

### definition_event

触发击中事件。

| 字段名称               | 类型     | 描述                                         |
| ---------------------- | -------- | ------------------------------------------- |
| affect_projectile      | 布尔值   | 为投射物实体触发事件                        |
| affect_shooter         | 布尔值   | 为发射者实体触发事件                        |
| affect_target          | 布尔值   | 为被击中实体触发事件                        |
| affect_splash_area     | 布尔值   | 为区域内所有实体触发事件                    |
| splash_area            | 小数     | 实体作用范围半径                            |
| event_trigger          | 对象     | 要触发的事件。结构如下：                    |

| 字段名称    | 类型     | 描述                           |
| ----------- | -------- | ----------------------------- |
| event       | 字符串   | 要触发的事件名称              |
| target      | 字符串   | 事件目标                      |
| filters     | 对象     | 触发事件所需的过滤条件        |

### stick_in_ground

将投射物插入地面。

| 字段名称       | 类型     | 描述 |
| -------------- | -------- | ---- |
| shake_time     | 小数     |      |

### spawn_aoe_cloud

生成药水效果的区域云。

| 字段名称                | 类型                      | 描述                                                                                                                                       |
| ----------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| radius                  | 小数                      | 云效果半径                                                                                                                                |
| radius_on_use           | 小数                      |                                                                                                                                           |
| potion                  | 整数                      | 滞留药水ID                                                                                                                                |
| particle                | 字符串                    | 区域云的[原版粒子效果](/wiki/particles/vanilla-particles)。仅接受原版粒子。**dragonbreath**允许使用瓶子收集龙息                                  |
| duration                | 整数                      | 云效果持续时间（秒）                                                                                                                      |
| color                   | 整数数组 [r, g, b]        | 粒子颜色                                                                                                                                  |
| affect_owner            | 布尔值                    | 药水效果是否影响发射者（对玩家无效）                                                                                                      |
| reapplication_delay     | 整数                      | 药水效果重复施加的时间间隔（刻）                                                                                                          |

#### 药水ID

| 药水名称                 | 普通    | 延长版  | 强化版（II级） |
| ------------------------ | ------- | ------- | ------------- |
| 水瓶                     | 0       |         |               |
| 平凡药水                 | 1       | 2       |               |
| 浓稠药水                 | 3       |         |               |
| 粗制药水                 | 4       |         |               |
| 夜视药水                 | 5       | 6       |               |
| 隐身药水                 | 7       | 8       |               |
| 跳跃药水                 | 9       | 10      | 11            |
| 抗火药水                 | 12      | 13      |               |
| 迅捷药水                 | 14      | 15      | 16            |
| 迟缓药水                 | 17      | 18      |               |
| 水肺药水                 | 19      | 20      |               |
| 治疗药水                 | 21      |         | 22            |
| 伤害药水                 | 23      |         | 24            |
| 剧毒药水                 | 25      | 26      | 27            |
| 再生药水                 | 28      | 29      | 30            |
| 力量药水                 | 31      | 32      | 33            |
| 虚弱药水                 | 34      | 35      |               |
| 衰变药水                 | 36      |         |               |
| 神龟药水                 | 37      | 38      | 39            |
| 缓降药水                 | 40      | 41      |               |
| 迟缓IV药水               | 42      |         |               |
| 跳跃提升IV药水           | 43+     |         |               |

### spawn_chance

击中时生成实体。

| 字段名称                        | 类型     | 描述                             |
| ------------------------------- | -------- | ------------------------------- |
| first_spawn_percent_chance      | 小数     |                                 |
| second_spawn_percent_chance     | 小数     |                                 |
| first_spawn_count               | 整数     |                                 |
| second_spawn_count              | 整数     |                                 |
| spawn_definition               | 字符串   | 要生成的实体ID                  |
| spawn_baby                     | 布尔值   | 生成的实体是否为幼体            |

### particle_on_hit

击中时生成粒子效果。

| 字段名称          | 类型     | 描述                                             |
| ----------------- | -------- | ----------------------------------------------- |
| particle_type     | 字符串   | 使用的[原版粒子效果](/wiki/particles/vanilla-particles) |
| num_particles     | 整数     | 粒子数量                                        |
| on_entity_hit     | 布尔值   | 是否在击中实体时生成粒子                        |
| on_other_hit      | 布尔值   | 是否在其他碰撞时生成粒子                        |

### mob_effect

对目标施加生物状态效果。

| 字段名称           | 类型     | 描述                             |
| ------------------ | -------- | ------------------------------- |
| effect            | 字符串   | 效果类型                        |
| duration          | 整数     | 效果持续时间                    |
| durationeasy      | 整数     | 简单难度下的持续时间            |
| durationnormal    | 整数     | 普通难度下的持续时间            |
| durationhard      | 整数     | 困难难度下的持续时间            |
| amplifier         | 整数     | 效果等级                        |
| ambient           | 布尔值   |                                 |
| visible           | 布尔值   |                                 |

### grant_xp

尽管名称如此，该行为实际上是生成指定数量的经验球。

| 字段名称  | 类型     | 描述                                         |
| --------- | -------- | ------------------------------------------- |
| minXP     | 整数     | 给予的最小经验值                            |
| maxXP     | 整数     | 给予的最大经验值                            |
| xp        | 整数     | 固定经验值。设置后将覆盖min和max值          |

### freeze_on_hit

_具体作用未知_

_需要启用教育版功能_
冻结命中点周围的水。

| 字段名称          | 类型     | 描述                   |
| ----------------- | -------- | --------------------- |
| shape             | 字符串   | "sphere" 或 "cube"    |
| snap_to_block     | 布尔值   |                       |
| size              | 整数     | 冻结效果的范围大小    |

### hurt_owner

_具体作用未知。当前版本可能导致游戏崩溃（可能参数错误）_

| 字段名称         | 类型     | 描述 |
| ---------------- | -------- | ---- |
| owner_damage     | 整数     |      |
| knockback        | 布尔值   |      |
| ignite           | 布尔值   |      |

### thrown_potion_effect

_具体作用未知。当前版本可能导致游戏崩溃（可能仅适用于投掷药水）_

## 补充说明

在创建自定义投射物（如箭矢变体或全新物品）时，建议定义[运行时标识符](/wiki/entities/runtime-identifier)来确保预期行为。未正确设置可能导致异常表现，包括显示错误、击退方向异常，甚至出现可用徒手摧毁的箭矢等问题。