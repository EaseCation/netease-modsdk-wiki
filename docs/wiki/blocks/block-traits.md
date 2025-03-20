---
title: 方块特性
description: 方块特性可轻松为自定义方块应用原版方块状态（如朝向），无需借助事件和触发器。
category: 基础
nav_order: 5
mentions:
    - QuazChick
---

# 方块特性

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式要求 & 最低引擎版本 `1.20.30`
在学习方块特性前，您应当已熟练掌握[方块状态](/wiki/blocks/block-states)知识。

使用方块状态时，请确保资源包清单中的`min_engine_version`为`1.20.20`或更高版本。
:::

## 应用特性

方块特性可轻松为自定义方块应用原版方块状态（如朝向），无需借助复杂的事件和触发器系统。

::: code-group
```json [BP/blocks/custom_slab.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_slab",
      "menu_category": {
        "category": "construction",
        "group": "itemGroup.name.slab"
      },
      "traits": {
        "minecraft:placement_position": {
          "enabled_states": ["minecraft:vertical_half"]
        }
      }
    },
    "components": { ... },
    "permutations": [ ... ]
  }
}
```
:::

_此示例将在放置时设置`minecraft:vertical_half`方块状态为`'top'`或`'bottom'`——具体取决于玩家视角位置。_

**仍需通过置换系统配合条件查询来实现功能差异：**

```c
q.block_state('minecraft:vertical_half') // 查询垂直半区状态
```

## 放置朝向

记录玩家放置方块时的旋转方向信息。

_自实验性玩法`Upcoming Creator Features`发布，支持格式版本1.20.30及更高。_

**可启用以下状态：**

| 状态名称                        | 可选值                                                                           | 描述                               |
| ------------------------------ | -------------------------------------------------------------------------------- | ---------------------------------- |
| `minecraft:cardinal_direction` | `"south"`（默认）<br>`"north"`<br>`"west"`<br>`"east"`                       | 放置时玩家的主要朝向（东南西北）   |
| `minecraft:facing_direction`   | `"down"`（默认）<br>`"up"`<br>`"south"`<br>`"north"`<br>`"west"`<br>`"east"` | 放置时玩家的完整朝向（含上下方向） |

<br>

**额外参数：**

-   `y_rotation_offset` - 此旋转偏移仅适用于水平方向状态值（北/南/西/东），必须指定轴对齐角度（如90、180、-90）

::: code-group
```json [minecraft:block > description > traits]
"minecraft:placement_direction": {
  "enabled_states": ["minecraft:cardinal_direction"],
  "y_rotation_offset": 180 // Y轴旋转偏移量
}
```
:::

## 放置位置

记录玩家放置方块时的具体位置信息。

_自实验性玩法`Upcoming Creator Features`发布，支持格式版本1.20.30及更高。_

**可启用以下状态：**

| 状态名称                     | 可选值                                                                           | 描述                          |
| ------------------------- | -------------------------------------------------------------------------------- | ----------------------------- |
| `minecraft:block_face`    | `"down"`（默认）<br>`"up"`<br>`"south"`<br>`"north"`<br>`"west"`<br>`"east"` | 方块被放置时所处的表面方位    |
| `minecraft:vertical_half` | `"top"`<br>`"bottom"`（默认）                                                 | 方块被放置时所处的垂直半区位置 |

<br>

**_此特性无额外参数_**

::: code-group
```json [minecraft:block > description > traits]
"minecraft:placement_position": {
  "enabled_states": [
    "minecraft:block_face",    // 方块表面方位
    "minecraft:vertical_half"   // 垂直半区位置
  ]
}
```
:::