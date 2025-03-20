---
title: 物品入门指南
description: 手把手教你创建自定义物品，学习物品格式和基础制作方法。
category: 基础
nav_order: 1
tags:
    - 教程
    - 新手入门
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - yanasakana
    - destruc7ion
    - aexer0e
    - stirante
    - ChibiMango
    - MedicalJewel105
    - Sprunkles317
    - mark-wiemer
    - TheItsNameless
    - s1050613
    - SmokeyStack
---

# 物品入门指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

Minecraft 基岩版允许我们在世界中添加具有多种原版特性的自定义物品。

本教程将介绍如何为稳定版 Minecraft 创建基础物品。

## 注册物品

物品定义的结构与实体类似：包含描述信息和定义物品行为的组件列表。

以下是让自定义物品出现在创造模式物品栏的**最低限度**行为端代码。

::: code-group
```json [BP/items/custom_item.json]
{
    "format_version": "1.20.50",
    "minecraft:item": {
        "description": {
            "identifier": "wiki:custom_item",
            "menu_category": {
              "category": "construction"
            }
        },
        "components": {} // 必须存在，即使为空！
    }
}
```
:::

### 物品描述

- 定义物品唯一标识符，格式为 `命名空间:标识符`
- 配置物品在哪个`menu_category`分组显示
    - 可额外设置`group`分组和`is_hidden_in_commands`是否隐藏于命令提示

## 添加组件

当前我们的自定义物品使用的是默认组件值（详见[物品组件文档](/wiki/items/item-components)）。

现在让我们配置自定义功能！

::: code-group
```json [BP/items/custom_item.json]
{
    "format_version": "1.20.50",
    "minecraft:item": {
        "description": {
            "identifier": "wiki:custom_item",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:damage": {
                "value": 10
            },
            "minecraft:durability":{
                "max_durability": 36
            },
            "minecraft:hand_equipped": {
                "value": true
            }
        }
    }
}
```
:::

查看完整物品组件列表请访问[物品组件文档](/wiki/items/item-components)！

## 应用纹理

我们需要在`RP/textures/item_texture.json`中创建纹理简称来关联图片。

::: code-group
```json [RP/textures/item_texture.json]
{
    "resource_pack_name": "wiki",
    "texture_name": "atlas.items",
    "texture_data": {
        "custom_item": {
            "textures": "textures/items/custom_item"
        }
    }
}
```
:::

在物品文件中添加`minecraft:icon`组件来应用纹理。

::: code-group
```json [BP/items/custom_item.json]
{
    "format_version": "1.20.50",
    "minecraft:item": {
        "description": {
            "identifier": "wiki:custom_item",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:icon": {
                "texture": "custom_item"
            }
        }
    }
}
```
:::

## 定义名称

最后为物品添加名称。你还可以使用[显示名称组件](/wiki/items/item-components#display_name)。

::: code-group
```c [RP/texts/zh_CN.lang]
tile.wiki:custom_item.name=自定义物品
```
:::

## 成果总结

本节教程您已掌握以下内容：

<Checklist>

-   [x] 物品基础特性
-   [x] 如何应用纹理
-   [x] 使用`item_textures.json`关联纹理简称
-   [x] 在语言文件中定义物品名称

</Checklist>