---
title: Molang
tags:
    - 中级
mentions:
    - yanasakana
    - TheDoctor15
    - MedicalJewel105
    - DoubleShotgun
    - Luthorius
    - TheItsNameless
---

# Molang

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介
几乎所有的表达式都会求值为一个数字。如果某个表达式的结果不是数字，可以使用`operator`运算符将其转换为数字。你可以将Molang简单理解为一个大型数学方程式。

当方程式返回除`0`以外的任何数字时，都会被判定为`true`（真）。本文中提到的"返回"指的是方程式的输出结果。虽然存在`return`语句，但通常不推荐使用，因此不做详细讨论。

## 值访问方式
在Molang中主要有三种访问值的方式（查询语句、变量和临时变量）：

- **查询语句** 是从游戏获取的只读值，不可修改只能读取（语法：`query.example_query` 或简写为 `q.example_query`）

- **变量** 是可读写的值，可以通过Molang进行修改（语法：`variable.example_variable` 或简写为 `v.example_variable`）
    - 部分硬编码变量的行为与查询语句类似，但仅在特定情境下可用

- **临时变量** 的功能与普通变量相同，但仅在当前作用域内有效（语法：`temp.example_temp` 或简写为 `t.example_temp`）
    - "作用域"指当前的`for_each`循环、`loop`循环，若未在循环中使用则指当前表达式

## 值处理

- **逻辑运算符** 可以将非数字值转换为1或0，包括：`==`, `!=`, `<`, `>`, `<=`, `>=`
    - 示例：`q.get_equipped_item_name == 'stick'` 当手持木棍时求值为`1`/`true`

    - **复合逻辑运算符** 用于构建"与/或"逻辑关系：
        - `&&` 表示"与"，`||` 表示"或"
        - 示例：`q.is_sneaking && q.is_using_item` 潜行且使用物品时返回`1`/`true`
        - 示例：`q.is_sneaking || q.is_jumping` 潜行或跳跃时返回`1`/`true`

- **圆括号** `( )` 在组合值或进行数学运算时非常实用
    - 示例：`q.is_sneaking && (q.get_equipped_item_name == "stick" || q.get_equipped_item_name == "diamond")` 潜行时手持木棍或钻石返回`1`/`true`

- **条件运算符** 可实现类似`if/else`的逻辑：
    - **二元条件运算符** `?` 根据输入值返回指定值或0
        - 示例：`q.is_sneaking ? 5` 潜行时返回`5`，否则返回`0`
    - **三元条件运算符** `? :` 根据条件返回两个指定值之一
        - 示例：`q.is_sneaking ? 10 : 3` 潜行时返回`10`，否则返回`3`

::: code-group
```json [示例]
{
    "format_version": "1.16.100",
    "minecraft:entity": {
        "components": {
            "minecraft:movement": {
                "value": "q.is_jumping ? 0.1 : 0.05" // 跳跃时移动速度变为0.1，否则0.05
            }
        }
    }
}
```
:::