---
title: 方块状态
description: 方块状态允许你的方块拥有多种变体，每种变体通过使用置换具备独特的功能和外观。
category: 常规
nav_order: 4
mentions:
    - QuazChick
---

# 方块状态

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式要求 & 最低引擎版本 `1.20.30`
使用方块状态时，请确保资源包清单中的 `min_engine_version` 设置为 `1.20.20` 或更高。
:::

方块状态允许你的方块拥有多种变体，每种变体通过使用[置换](/blocks/block-permutations)具备独特的功能和外观。

## 定义状态

有效状态值可以定义为布尔值、整数或字符串数组，也可以通过对象定义为整数范围。`values` 数组中的第一个元素将作为默认值使用。

### 置换数量限制

**每个状态最多可定义 16 个有效值。所有可能的状态值组合（[置换](/blocks/block-permutations)）总数不应超过 65,536。**

计算方块置换总数时，需将所有状态的有效值数量相乘。例如下方示例的计算公式为 3 × 2 × 3 × 6，说明该方块具有 108 种可能的置换组合。

_该功能需启用 `Holiday Creator Features` 实验性玩法（格式版本 1.19.70 及以上）。_

::: code-group
```json [BP/blocks/custom_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_block",
      "states": {
        "wiki:string_state_example": ["red", "green", "blue"],
        "wiki:boolean_state_example": [false, true],
        "wiki:integer_state_example": [1, 2, 3],
        "wiki:integer_range_state_example": {
          "values": { "min": 0, "max": 5 } // 等同于 [0, 1, 2, 3, 4, 5]
        }
      }
    },
    "components": { ... },
    "permutations": [ ... ]
  }
}
```
:::

## 获取状态值

以下列出在不同上下文中获取方块状态当前值的方法。

### Molang 查询函数

可通过 `block_state` 查询函数获取状态值。

```c
q.block_state('wiki:string_state_example') == 'blue'
```

### 命令参数

在 `execute` 和 `testforblock` 等命令中使用[方块状态参数](/commands/block-states)来检查状态值。

```c
execute if block ~~~ wiki:custom_block["wiki:string_state_example"="blue", "wiki:integer_state_example"=4] run kill
```

### 脚本API

:::warning 实验性功能
使用 [`BlockPermutation.getState()`](https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/blockpermutation#getstate) 方法需启用 `Beta APIs` 实验性玩法。
:::

通过 [`BlockPermutation.getState()`](https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/blockpermutation#getstate) 方法可获取不同状态的当前值。

```js
customBlock.permutation.getState("wiki:integer_state_example") === 3
```

## 设置状态值

### 命令参数

在 `setblock` 和 `fill` 等命令中使用[方块状态参数](/commands/block-states)来修改默认状态值。

```c
setblock ~~~ wiki:custom_block["wiki:string_state_example"="blue", "wiki:integer_state_example"=4]
```

### 脚本API

:::warning 实验性功能
使用 [`BlockPermutation.withState()`](https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/blockpermutation#withstate) 方法需启用 `Beta APIs` 实验性玩法。
:::

[`BlockPermutation.withState()`](https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/blockpermutation#withstate) 方法会返回修改了指定状态值的新置换对象。可通过 [`Block.setPermutation()`](https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/block#setpermutation) 方法应用此置换，如下所示：

```js
customBlock.setPermutation(
  customBlock.permutation.withState("wiki:boolean_state_example", false)
);
```

### 事件响应

:::warning 实验性功能
方块事件需启用 `Holiday Creator Features` 实验性玩法。
:::

使用 [`set_block_state`](/blocks/block-events#set-block-state) 事件响应可以修改自定义方块状态的值。

::: code-group
```json [minecraft:block > events]
"wiki:change_state": {
  "set_block_state": {
    "wiki:boolean_state_example": false,
    "wiki:string_state_example": "'red'"
  }
}
```
:::