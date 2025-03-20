---
title: 实体攻击机制
category: 巧思案例
mentions:
    - Luthorius
    - TheDoctor15
    - SirLich
    - MedicalJewel105
    - epxzzy
    - ThomasOrs
tags:
    - 中级
---

# 实体攻击机制

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

实体攻击需要多种系统协同工作才能正确运行：

-   导航及移动能力以接近目标
-   目标选择能力以确定攻击对象
-   攻击类型（如近战或远程）
-   伤害数值及附加效果

## 目标选择

### 移动机制

生物发起攻击前需要搭载多种[移动组件](/wiki/entities/entity-movement)。

在开始配置攻击行为前，请确保实体具备基础移动和路径规划能力。

:::warning
即使要创建固定式防御单位（如炮塔），仍需要添加导航组件以便自动寻找射击目标。
:::

### 激活敌对行为

触发敌对状态有多种方式。以下为最常用的`nearest_attackable_target`组件示例，主要用于定义实体的主要攻击目标类型：

::: code-group
```json [原始CodeHeader的值]
"minecraft:behavior.nearest_attackable_target": {
  "must_see": true, //如果为true，目标必须处于实体视线内
  "reselect_targets": true, //允许切换更近的目标
  "within_radius": 25.0, //有效搜索半径
  "must_see_forget_duration": 17.0, //目标消失视野后的记忆时间
  "entity_types": [
    {
      "filters": { //有效攻击目标筛选
        "test": "is_family",
        "subject": "other",
        "value": "player"
      },
      "max_dist": 48.0
    }
  ]
}
```
:::

如需更精细控制，可选用以下组件：

| 组件                                                | 说明                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| minecraft:behavior.nearest_attackable_target         | 定位符合筛选条件的实体                |
| minecraft:behavior.nearest_prioritized_attackable_target | 可通过filter后设置"priority": [整数]定义优先级 |
| minecraft:behavior.defend_trusted_target         | 防御指定类型的友方单位                                |

另有特殊组件`minecraft:lookat`：

该组件与其他三种不同，用于检测与实体发生视线交互的目标。配置示例：

::: code-group
```json [BP/entities/enderman.json]
"minecraft:lookat": {
  "search_radius": 64.0,
  "set_target": true, //标记为有效目标
  "look_cooldown": 5.0,
  "filters": {
    "all_of": [
      {
        "subject": "other",
        "test": "is_family",
        "value": "player"
      },
      {
        "test": "has_equipment",
        "domain": "head",
        "subject": "other",
        "operator": "not",
        "value": "carved_pumpkin"  //未装备雕刻南瓜的玩家
      }
    ]
  }
}
```
:::

### 目标筛选机制

:::tip
本节说明如何配置上述「目标定位」组件。
:::

实体通过[筛选器](https://bedrock.dev/docs/stable/Entities#Filters)判定有效目标，使用`test`、`subject`、`operator`和`value`参数进行组合判断。

::: code-group
```json [原始CodeHeader的值]
"entity_types":[
    {
        "filters":{
            "any_of":[
                {
                    "test":"is_family",
                    "subject":"other",
                    "operator":"==",
                    "value":"snow_golem"
                },
                {
                    "test":"is_family",
                    "subject":"other",
                    "operator":"==",
                    "value":"iron_golem"
                }
                //雪傀儡或铁傀儡
            ]
        },
        "max_dist":24
    },
    {
        "filters":{
            "all_of":[
                {
                    "test":"is_family",
                    "subject":"other",
                    "operator":"==",
                    "value":"player"
                },
                {
                    "test":"has_equipment",
                    "subject":"other",
                    "domain":"head",
                    "operator":"=!",
                    "value":"turtle_helmet"
                }
                //未装备海龟盔甲的玩家
            ]
        },
        "max_dist":24
    }
]
```
:::

该配置将锁定雪傀儡、铁傀儡及未佩戴海龟头盔的玩家。

## 攻击类型

可用攻击方式列表：

| 组件                                            | 说明                                                     |
| ---------------------------------------------------- | -------------------------------------------------------- |
| [minecraft:behavior.melee_attack](#近战攻击)            | 单体近战攻击                        |
| [minecraft:behavior.ranged_attack](#远程攻击)          | 发射弹射物                      |
| [minecraft:area_attack](#范围攻击)                       | 范围内全体打击      |
| [minecraft:behavior.knockback_roar](#击退怒吼) | 高自定义度的冲击波攻击 |

### 近战攻击

最常见的攻击类型，带有击退效果且必定命中。

::: code-group
```json [原始CodeHeader的值]
"wiki:melee_attack": {
  "minecraft:attack": {
    "damage": 3,
    "effect_name": "slowness",
    "effect_duration": 20
  },
  "minecraft:behavior.melee_attack": {
    "priority": 3,
    "melee_fov": 90.0, //实体发动近战攻击时的有效视野角度
    "speed_multiplier": 1,
    "track_target": false,
    "require_complete_path": true
  }
}
```
:::

可配置伤害数值、状态效果及攻击参数。

伤害数值支持固定值或区间范围：

- `"damage": 3`：固定造成3点伤害
- `"damage": [2, 6]`：随机造成2-6点伤害

状态效果支持列表：

| 效果列表        |
| --------------- |
| 速度           |
| 缓慢        |
| 急迫           |
| 挖掘疲劳  |
| 力量        |
| 瞬间治疗  |
| 瞬间伤害  |
| 跳跃提升      |
| 反胃          |
| 生命恢复    |
| 抗性提升      |
| 防火         |
| 水下呼吸    |
| 隐身        |
| 失明       |
| 夜视    |
| 饥饿          |
| 虚弱        |
| 中毒          |
| 凋零          |
| 生命提升    |
| 伤害吸收      |
| 饱和      |
| 飘浮      |
| 剧毒    |
| 缓降    |
| 潮涌能量   |
| 不祥之兆        |
| 村庄英雄    |
| 黑暗        |

### 远程攻击

按设定间隔发射指定[弹射物](/wiki/documentation/projectiles)。

::: code-group
```json [原始CodeHeader的值]
"wiki:ranged_attack": {
  "minecraft:behavior.ranged_attack": {
    "priority": 2,
    "ranged_fov": 90.0, //实体发动远程攻击时的有效视野角度
    "attack_interval_min": 1.0, //最小攻击间隔
    "attack_interval_max": 3.0, //最大攻击间隔
    "attack_radius": 15.0 //攻击范围
  },
  "minecraft:shooter": {
    "def": "wiki:projectile" //自定义弹射物定义
  }
}
```
:::

原版弹射物类型：

| 原版弹射物              |
| -------------------------------- |
| minecraft:arrow                  |
| minecraft:dragon_fireball        |
| minecraft:egg                    |
| minecraft:ender_pearl            |
| minecraft:fireball               |
| minecraft:fishing_hook           |
| minecraft:lingering_potion       |
| minecraft:llama_spit             |
| minecraft:skulker_bullet         |
| minecraft:small_fireball         |
| minecraft:snowball               |
| minecraft:splash_potion          |
| minecraft:thrown_trident         |
| minecraft:wither_skull           |
| minecraft:wither_skull_dangerous |
| minecraft:xp_bottle              |

弩类武器需先装填后发射：

::: code-group
```json [原始CodeHeader的值]
"minecraft:behavior.charge_held_item": {
  "priority": 2,
  "items": [
    "minecraft:arrow" //弩的弹药类型固定为箭
  ]
}
```
:::

完成装填后方可触发`minecraft:behavior.ranged_attack`。

### 范围攻击

对范围内的所有实体造成伤害。与常规攻击不同，无需特定目标即可触发。

::: code-group
```json [原始CodeHeader的值]
"minecraft:area_attack" : {
  "damage_range": 1, //伤害作用范围（方块）
  "damage_per_tick": 2, //每tick伤害量
  "cause": "contact", //伤害来源类型
  "entity_filter": { //有效目标筛选
     "any_of": [
      {
        "test": "is_family",
        "subject": "other",
        "value": "player"
      },
      {
        "test": "is_family",
        "subject": "other",
        "value": "monster"
      }
    ]
  }
}
```
:::

需参考[实体伤害源类型](https://bedrock.dev/docs/stable/Addons#Entity%20Damage%20Source)进行配置，注意部分原版装备可减免特定类型伤害。

### 击退怒吼

高灵活性范围攻击，可产生冲击波效果。

::: code-group
```json [原始CodeHeader的值]
"wiki:roar_attack": {
  "minecraft:behavior.knockback_roar":{
    "priority":2,
    "duration":0.7, //技能总时长
    "attack_time":0.2, //实际造成伤害时间点
    "knockback_damage":1, //击退伤害
    "knockback_horizontal_strength":1, //水平击退力度
    "knockback_vertical_strength":1, //垂直击退力度
    "knockback_range":5, //作用范围
    "knockback_filters":{ //击退目标筛选
      "test":"is_family",
      "subject":"other",
      "operator":"==",
      "value":"player"
    },
    "damage_filters":{ //伤害目标筛选
      "test":"is_family",
      "subject":"other",
      "operator":"==",
      "value":"player"
    },
    "on_roar_end":{ //技能结束触发事件
      "event":"wiki:other_event"
    },
    "cooldown_time":10 //冷却时间
  }
}
```
:::

若需要隐藏默认粒子效果，可在资源包中覆盖相关粒子文件。

## 进阶攻击配置

攻击行为可通过事件系统进行更高级的交互设计。

### 难度分级攻击

不同游戏难度配置不同攻击参数：

::: code-group
```json [BP/entities/bee.json]
"easy_attack": {
    "minecraft:attack": {
        "damage": 2
    }
},
"normal_attack": {
    "minecraft:attack": {
        "damage": 2,
        "effect_name": "poison",
        "effect_duration": 10
    }
},
"hard_attack": {
    "minecraft:attack": {
        "damage": 2,
        "effect_name": "poison",
        "effect_duration": 18
    }
}
```
:::

### 模式切换系统

通过[事件系统](/wiki/entities/entity-events)和组件组实现攻击模式切换。常用传感器组件：

| 传感器类型              | 说明                     |
| ---------------------- | ----------------------- |
| minecraft:environment_sensor | 环境条件监测       |
| minecraft:target_nearby_sensor | 目标距离监测      |

#### 组件组示例

远程攻击配置组：

::: code-group
```json [原始CodeHeader的值]
"wiki:ranged_components": {
  "minecraft:shooter": {
    "def": "wiki:projectile"
  },
  "minecraft:behavior.ranged_attack": {
    "priority": 3,
    "ranged_fov": 90.0,
    "attack_interval_min": 1.0,
    "attack_interval_max": 3.0,
    "attack_radius": 15.0
  }
}
```
:::

近战攻击配置组：

::: code-group
```json [原始CodeHeader的值]
"wiki:melee_components": {
  "minecraft:attack": {
    "damage": 6
  },
  "minecraft:behavior.melee_attack": {
    "priority": 3
  }
}
```
:::

#### 事件触发器

距离传感器示例：

::: code-group
```json [原始CodeHeader的值]
"wiki:switcher_range": {
  "minecraft:target_nearby_sensor": {
    "inside_range": 4.0,
    "outside_range": 5.0,
    "must_see":  true,
    "on_inside_range": { //4格内切换近战
      "event": "wiki:melee_swap",
      "target": "self"
    },
    "on_outside_range": { //5格外切换远程
      "event": "wiki:ranged_swap",
      "target": "self"
    }
  }
}
```
:::

环境传感器示例：

::: code-group
```json [原始CodeHeader的值]
"wiki:switcher_environment": {
  "minecraft:environment_sensor": {
    "triggers": [
      { //水下转为近战
        "filters": {
          "test": "is_underwater",
          "subject": "self",
          "operator": "==",
          "value": true
        },
        "event": "wiki:melee_swap"
      },
      { //陆地转为远程
        "filters": {
          "test": "is_underwater",
          "subject": "self",
          "operator": "==",
          "value": false
        },
        "event": "wiki:ranged_swap"
      }
    ]
  }
}
```
:::

:::tip
攻击类型切换不限于两种模式，可根据需求扩展更多。
:::

## 动作表现配置

攻击需配合动画系统实现完整表现。

### 动画资源

建议使用[Blockbench](/wiki/guide/blockbench)制作动画，需在资源包中包含：

- animations文件夹（实体动画定义）
- animation_controllers文件夹（动画控制器）
- entity文件夹（实体定义）

| 原版攻击动画                |
| -------------------------------------------- |
| "animation.zombie.attack_bare_hand"          |
| "animation.skeleton.attack.v1.0"             |
| "animation.humanoid.bow_and_arrow.v1.0"      |
| "animation.humanoid.damage_nearby_mobs.v1.0" |

### 动画控制器

控制动画的触发逻辑：

| 原版动画控制器         |
| ---------------------------------------------- |
| "controller.animation.zombie.attack_bare_hand" |
| "controller.animation.skeleton.attack"         |
| "controller.animation.humanoid.bow_and_arrow"  |

更多动画系统细节请参考[官方文档](https://bedrock.dev/docs/stable/Animations)。