---
title: 方块置换
description: 方块变换数组提供了一种基于当前置换条件性应用组件的方法。
category: 基础
nav_order: 7
mentions:
    - QuazChick
---

# 方块置换 `permutations`

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式要求 & 最低引擎版本 `1.20.30`
在学习方块变换前，您应当已熟练掌握[方块状态](/wiki/blocks/block-states)知识。

使用方块状态时，请确保资源包清单中的`min_engine_version`为`1.20.20`或更高版本。
:::

方块`permutations`数组提供了一种基于当前置换（状态值集合）条件性应用组件（包括事件触发器和标签）的方式。

`permutations`数组中的组件可以覆盖方块的基类组件以及其他组件列表中的组件。置换数组中最后出现的条目具有最高优先级。

**[可旋转方块](/wiki/blocks/rotatable-blocks)** 是 **方块置换** 的一种常用用法。

## 定义置换

`permutations`数组是`minecraft:block`的直接子项，由包含组件的对象组成。当条件判断为真值（非false或0）时，相关组件将被应用。

**置换条件必须遵守其 [限制条件](#置换条件限制)。**

_自实验性玩法`Holiday Creator Features`发布，支持格式版本1.19.70及更高。_

::: code-group

```json [BP/blocks/custom_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_block",
      "states": {
        "wiki:integer_state_example": [2, 4, 6, 8],
        "wiki:boolean_state_example": [false, true],
        "wiki:string_state_example": ["red", "green", "blue"]
      }
    },
    "components": {},
    "permutations": [
      {
        "condition": "q.block_state('wiki:integer_state_example') == 2",
        "components": {
          "minecraft:friction": 0.1
        }
      },
      {
        "condition": "q.block_state('wiki:boolean_state_example')",
        "components": {
          "minecraft:friction": 0.8 // 覆盖之前的置换
        }
      },
      {
        "condition": "q.block_state('wiki:string_state_example') == 'red' && !q.block_state('wiki:boolean_state_example')",
        "components": {
          "minecraft:geometry": "geometry.pig"
        }
      }
    ]
  }
}
```
:::

## 置换条件限制

当条件评估为真值（非false或0）时，关联的组件列表将被应用。

置换条件需以Molang表达式字符串形式编写，并具有严格限制：

-   条件判断完全基于方块的置换状态，因此只能使用`q.block_state`查询函数
-   这意味着条件判断不会产生副作用
    -   禁止使用以下数学函数：`math.die_roll`、`math.die_roll_integer`、`math.random`、`math.random_integer`
    -   不可进行变量赋值操作

（注：保留英文术语如Component、Entity、Block等，根据中文技术文档惯例处理专有名词）