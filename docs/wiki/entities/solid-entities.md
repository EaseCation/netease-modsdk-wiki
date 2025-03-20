---
title: 实体碰撞体
category: 巧思案例
tags:
    - 配方指南
    - 中级
mentions:
    - SirLich
    - Joelant05
    - Chikorita-Lover
    - Luthorius
    - MedicalJewel105
    - ThomasOrs
---

# 实体碰撞体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

实体碰撞体是指玩家能够碰撞、踩踏或与之发生物理互动，而不会穿透的实体。这类实体有多种用途，例如模拟方块效果。

本页将探讨几种创建实体碰撞体的方法。

并非所有技术都适用于所有场景。建议多加实验，找到最适合您需求的方案。

## 运行时标识符

通过[运行时标识符](/wiki/entities/runtime-identifier)可以实现实体碰撞效果。但目前仅支持两种预设形态，每种形态具有特定的碰撞箱及副作用。且两种模型的碰撞形状均不可调节或缩放。

### 船型实体

::: code-group
```json [BP/entities/entity_name.json]
{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "wiki:solid_entity",
      "runtime_identifier": "minecraft:boat"
       // 此处省略其他配置...
    }
  }
}
```
:::

- 采用船形的实体碰撞箱
- 具备部分船只特有交互特性

### 潜影贝型实体

::: code-group
```json [BP/entities/entity_name.json]
{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "wiki:solid_entity",
      "runtime_identifier": "minecraft:shulker"
       // 此处省略其他配置...
    }
  }
}
```
:::

- 1×1方块尺寸的实体碰撞箱
- 固定于方块网格
- 当支撑方块被移除时会随机瞬移

## minecraft:is_stackable 组件

通过给实体添加`minecraft:is_stackable`组件可使其具有实体碰撞属性。
**注意：** 如果希望实体对玩家而言具有碰撞，需要修改`player.json`文件。

`"minecraft:is_stackable": {}`

同时还需添加`minecraft:push_through`组件，并将其`value`参数设为1：

`"minecraft:push_through": 1`

（这两个组件都应置于`components`项下）

## 模拟方块效果

某些情况下更适合使用`/setblock`或`/fill`命令静态或动态放置屏障方块。需配套提供屏障的放置与清除机制：

`/fill ~ ~ ~ ~ ~1 ~ barrier 0 replace air`
在1×1×2区域生成屏障方块。

`/fill ~1 ~1 ~1 ~-1 ~-1 ~-1 air 0 replace barrier`
清除3×3×3范围内的屏障方块。

为保证效果连贯性，这些[动画控制器实体指令](/animation-controllers/entity-commands)需要保持持续激活状态。可通过实体组件或动画控制器实现持续触发。