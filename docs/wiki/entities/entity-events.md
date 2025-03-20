---
title: 实体事件
category: 基础
mentions:
    - ChibiMango
    - SirLich
    - Joelant05
    - MedicalJewel105
    - aexer0e
    - SmokeyStack
    - ThomasOrs
tags:
    - 新手
---

# 实体事件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

实体事件是行为系统中与组件（Component）和组件组（Component Group）并列的基础构建模块之一。它们作为组件组的控制中枢，可以通过组件、动画（Animation）、动画控制器（Animation Controller）及其他事件进行调用。本文旨在详解实体内部及跨实体事件调用的方法，以及事件的基本格式结构。

## 事件结构

事件允许我们在特定条件满足时，通过添加或移除组件组来改变实体的行为模式。我们称之为"事件（Event）"，因为它们可以被战斗倒计时结束、玩家交互、环境变化等情景所触发。当事件激活时，会根据预定义指令处理组件组的增删操作。

每个事件可包含七个核心指令键，分别用于执行组件组增删、条件判断、事件触发及属性设置：
- add（添加）
- remove（移除）
- randomize（随机化）
- sequence（序列）
- filters（过滤器）
- trigger（触发器）
- set_property（属性设置）

### 添加/移除

事件最基础的功能是通过add/remove键直接增删组件组。如下示例中的`wiki:ranged_attacker`事件：

::: code-group
```json [示例]
"wiki:ranged_attacker":{
    "add":{
        "component_groups":[
            "attacker",
            "ranged"
        ]
    },
    "remove":{
        "component_groups":[
            "standby",
            "melee"
        ]
    }
}
```
:::

:::tip 组件覆盖规则
当添加组件组时，若现有活跃组件组中已包含同名组件，后添加的组件组会覆盖原有组件。
:::

### 随机化

randomize参数允许根据权重概率随机执行组件组操作。原版牛的生成事件即使用该机制，实现95%概率生成成年牛，5%概率生成幼崽：

::: code-group
```json [牛生成逻辑]
"minecraft:entity_spawned":{
    "randomize":[
        {
            "weight":95,
            "add":{
                "component_groups":[
                    "minecraft:cow_adult"
                ]
            }
        },
        {
            "weight":5,
            "add":{
                "component_groups":[
                    "minecraft:cow_baby"
                ]
            }
        }
    ]
}
```
:::

:::warning 注意
随机化配置中对每组权重进行归一化处理，最终不同选项的选择概率与其权重值占总权重的比例相关。
:::

### 序列/过滤器

通过sequence参数可实现条件分支逻辑。原版僵尸的溺水转换事件根据是否是幼体执行不同操作：

::: code-group
```json [僵尸溺水转换]
"minecraft:convert_to_drowned":{
    "sequence":[
        {
            "filters":{
                "test":"has_component",
                "operator":"!=",
                "value":"minecraft:is_baby"
            },
            "add":["minecraft:convert_to_drowned"],
            "remove":["minecraft:start_drowned_transformation"]
        },
        {
            "filters":{
                "test":"has_component",
                "value":"minecraft:is_baby"
            },
            "add":["minecraft:convert_to_baby_drowned"],
            "remove":["minecraft:start_drowned_transformation"]
        }
    ]
}
```
:::

:::tip 序列执行机制
序列中的每个分支会依次检查执行，通过过滤器的分支都会被执行而无互斥性。若无过滤器则默认执行，但不影响后续分支的判断。
:::

下面这个整合多条件的攻击序列示例展示了复杂逻辑的实现：

::: spoiler title="复杂攻击序列示例"

::: code-group
```json [攻击逻辑]
"wiki:on_hit":{
    "randomize":[
        {
            "weight":60 //60%概率无操作
        },
        {
            "weight":40,
            "sequence":[
                {"trigger":"attack_event"},
                {
                    "filters":["!minecraft:is_sheared"],
                    "sequence":[...]
                },
                {
                    "filters":["minecraft:is_sheared"],
                    "sequence":[...]
                }
            ]
        }
    ]
}
```
:::
:::

### 事件触发

通过trigger参数可以在事件中调用其他事件，结合target参数可实现跨实体交互。以玩家与猪互动事件为例：

::: code-group
```json [互动事件]
"wiki:on_interact": {
    "trigger": {
        "filters":{
            "test":"is_family",
            "subject":"self",
            "value":"pig"
        },
        "event":"wiki:interacted",
        "target":"other"
    }
}
```
:::

:::tip 目标上下文
事件的执行需要明确的实体上下文。例如互动事件中，"other"指代互动发起者。若无对应上下文时，"target"指令将失效。
:::

## 事件调用方式

事件可通过以下五种途径触发：
1. 组件系统调用（如环境传感器）
2. 动画时间轴调用
3. 动画控制器状态切换
4. 其他事件链式调用
5. 控制台命令 `/event`

以下示例展示不同调用方式：

### 组件系统调用

僵尸的水下转换事件通过环境传感器触发：

::: code-group
```json [僵尸转换]
"minecraft:environment_sensor": {
    "triggers": {
        "filters":["is_underwater"],
        "event":"minecraft:start_transforming"
    }
}
```
:::

### 动画调用

在动画时间轴中按时间节点触发扑击事件：

::: code-group
```json [动画事件]
"animation.entity.pounce_timer": {
    "timeline": {
        "10.0": "@s wiki:start_pouncing"
    },
    "animation_length":10.1
}
```
:::

### 跨实体事件调用

唤魔者的特殊技能通过发送事件到特定实体：

::: code-group
```json [唤魔者技能]
"minecraft:behavior.send_event":{
    "event_choices":[{
        "filters":["is_family:sheep"],
        "sequence":[{
            "event":"wololo",
            "target":"other"
        }]
    }]
}
```
:::

### 内置事件

系统级自动触发事件需特别注意：

| 事件名称                     | 触发条件                 |
|------------------------------|--------------------------|
| minecraft:entity_spawned      | 实体生成时               |
| minecraft:entity_born         | 繁殖产生新实体时         |
| minecraft:entity_transformed  | 实体形态转换完成时       |
| minecraft:on_prime            | 爆炸物引信燃尽准备爆炸时 |

::: code-group
```json [牛实体配置示例]
"events": {
    "minecraft:entity_spawned": {
        "randomize":[
            {"weight":95, "add":["minecraft:cow_adult"]},
            {"weight":5, "add":["minecraft:cow_baby"]}
        ]
    },
    "minecraft:entity_born":{
        "add":["minecraft:cow_baby"]
    },
    "minecraft:entity_transformed":{
        "add":["minecraft:cow_adult"]
    }
}
```
:::

通过合理组合这些功能模块，开发者可以创建出丰富复杂的实体行为逻辑。建议配合动画控制器文档以构建更高级的行为系统。