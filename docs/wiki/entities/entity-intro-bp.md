---
title: 实体行为包入门指南
category: 基础
nav_order: 1
tags:
    - 指南
    - 新手入门
mentions:
    - SirLich
    - solvedDev
    - stirante
    - Joelant05
    - destruc7ion
    - MedicalJewel105
    - ChibiMango
    - SmokeyStack
    - ThomasOrs
---

# 实体行为包入门指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

构成行为包实体文件基础的三个主要结构如下：本文将解释它们的含义及使用方法。

组件组（component group）与组件（components）的混淆是常见的错误来源，请特别注意区分两者的区别。

## 组件（Components）

组件是构成Minecraft实体的逻辑构建模块。所有组件均由Mojang开发并提供给开发者使用。组件可实现多种功能，例如设置实体尺寸或赋予游泳能力等。完整组件列表可参考[官方文档](https://bedrock.dev/docs/stable/Entities)。

_无法_创建自定义组件。所有组件列表由微软硬编码实现并对外提供。

需要为实体添加行为时，可通过在`minecraft:entity`对象的`components`属性中插入组件。例如要给实体添加攀爬能力，可插入组件：`"minecraft:can_climb": {}`。

组件统一采用`"minecraft:<组件名称>": { <参数设置> }`格式。不同类型组件需要设置不同参数。

以下是实体内的组件应用范例：

::: code-group
```json [BP/entities/example.json#minecraft:entity]
"components": {
    "minecraft:type_family": {
        "family": [
            "player"
        ]
    },
    "minecraft:collision_box": {
        "width": 0.6,
        "height": 1.8
    },
    "minecraft:can_climb": {},
}
```
:::

（注意`components`列表_仅_包含组件）

## 组件组（Component Groups）

组件组用于整理归类多个组件。通过`事件（events）`可动态添加或移除组件组，从而实现定制化游戏玩法。

应用示例：

::: code-group
```json [BP/entities/example.json#minecraft:entity]
"component_groups": {

    //组件组名称
    "minecraft:cat_persian": {

        //合法的组件列表（可添加多项）
        "minecraft:variant": {
            "value": 6
        },
        "minecraft:physics": {}
    },

    //第二个组件组名称
    "wiki:example_group": {
        "minecraft:type_family": {
            "family": [
                "wiki_is_awesome!"
            ]
        }
    }
}
```
:::

所有组件组均为自定义创建，不可直接引用其他实体的组件组。

在原版Minecraft实体中，组件组使用`minecraft:`前缀命名（如示例中的`minecraft:cat_persian`）。但需特别注意这些_并非_组件。开发者可自由使用任意命名规则，例如上文中的`wiki:example_group`。更多命名空间信息请参阅[此文档](/wiki/concepts/namespaces)。

放在组件组中的组件不会自动生效，必须通过事件激活才能影响实体行为。多个组件组可同时生效。

## 事件（Events）

事件是一种特殊语法，用于在满足条件时通过组件触发添加/移除组件组的操作，从而实现实体的动态行为。

示例结构：

::: code-group
```json [BP/entities/example.json#minecraft:entity#events]
"minecraft:ageable_grow_up": { //事件名称
    "remove": { //需要移除的组件组列表
        "component_groups": [
            "minecraft:cat_baby"
        ]
    },
    "add": {
        "component_groups": [
            "minecraft:cat_adult" //需要添加的组件组列表
        ]
    }
},
```
:::

事件与组件组相同，均为完全自定义内容。不可直接照搬其他实体的事件名称（例如`"minecraft:ageable_grow_up"`）。若需类似功能，应自主设计组件组和事件。

_仅能对组件组进行添加/移除操作_，无法直接操作单个组件。

当满足某些条件时，特定组件会触发事件。下方示例演示交互功能实现：

::: code-group
```json [BP/entities/example.json#minecraft:entity]
"components": {
    "minecraft:interact": {
        "interactions": [
            {
                "on_interact": {
                    "filters": [ //触发条件筛选器
                        {
                            "test":"is_family",
                            "subject": "other",
                            "value": "player" //被交互对象属于玩家
                        }
                    ],
                    "target": "self", //作用目标为实体自身
                    "event": "wiki:on_interact" //触发指定事件
                }
            }
        ]
    }
},
"component_groups": {
    "wiki:interacted": {
        "minecraft:scale": { //缩放组件
            "value": 2
        }
    }
},
"events":{
    "wiki:on_interact":{ //事件定义
        "add": {
            "component_groups": [ "wiki:interacted" ] //添加组件组
        }
    }
}
```
:::

当玩家与该实体交互时，将触发`"wiki:on_interact"`事件，添加`"wiki:interacted"`组件组，从而激活缩放效果。

想深入了解事件的更多用法，请参阅[实体事件](/wiki/entities/entity-events)页面。

<BButton link="/entities/entity-events">实体事件详解</BButton>

## 原版应用案例

组件组与事件是原版实体实现自定义行为的核心工具。以下列举部分原版特性应用：

- 僵尸在水下停留过久后会通过事件转变为溺尸（drowned）

- 狐狸根据生成环境的不同，采用`minecraft:fox_red`与`minecraft:fox_active`组件组实现毛色变化

- 末影人使用事件机制实现被注视时进行攻击