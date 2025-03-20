---
title: 样式指南
mentions:
    - SirLich
    - solvedDev
    - MedicalJewel105
    - ChibiMango
---

# 样式指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本文档将介绍基岩版Wiki官方推荐的附加包开发样式指南。本指南旨在推广附加包开发的最佳实践，并为开发者提供统一的格式规范。

:::tip
本样式指南是持续更新的动态文档，将随着附加包开发技术的发展而不断完善。如果您有任何更新建议，欢迎随时联系我们！
:::

## 文件夹结构

-   文件路径中不要使用空格，使用下划线
-   标识符、文件名和文件夹名不要使用全大写字母
-   任何路径的总字符长度不得超过80个字符（控制台限制）
-   内容文件夹应保持统一的复数形式：不要混合使用单复数

## 标识符规范

不要使用以数字开头的标识符，尤其不要使用纯数字作为标识符。此规则适用于实体（entities）、组件组（component_groups）、事件（events）以及其他所有使用`命名空间:名称`格式的内容。

## 文件与文件夹命名规范

| 概念                  | 示例标识符                  |
| --------------------- | -------------------------- |
| 行为包（Behavior Pack） | dragons_BP                 |
| 资源包（Resource Pack） | dragons_RP                 |
| 几何模型（Geometry）    | dragon.geo.json            |
| 动画（Animation）       | dragon.animation.json      |
| 动画控制器（Animation Controller） | dragon.ac.json             |
| 资源包实体（RP Entity） | dragon.ce.json             |
| 行为包实体（BP Entity） | dragon.se.json             |
| 物品（1.16.100+）       | dragon_tooth.item.json     |
| 行为包物品（BP Item）    | dragon_tooth.item.bp.json  |
| 资源包物品（RP Item）    | dragon_tooth.item.rp.json  |
| 渲染控制器（Render Controller） | dragon.rc.json             |
| 战利品表（Loot Table）   | dragon.loot.json           |
| 合成配方（Recipe）       | dragon_saddle.recipe.json  |
| 生成规则（Spawn Rules）  | dragon.spawn.json          |
| 交易表（Trade Table）    | dragon.trade.json          |
| 粒子效果（Particles）    | dragon_magic.particle.json |
| 纹理贴图（Texture）      | dragon.png                 |
| 游戏测试（Gametest）     | dragonTest.js              |

## 命名空间规范

合适的命名空间应具有开发者唯一性。使用`mob`、`cars`、`content`或`custom`等通用词汇作为命名空间是**不恰当**的，因为这些名称可能与其他开发者重复。

`minecraft`和`minecon`为保留命名空间，请勿使用。

个人项目建议使用玩家ID的变体，团队项目建议使用团队名称的变体。

多人协作开发时应共享命名空间。如需注明贡献者，可以使用子索引形式：`minetite.sirlich:dragon`

需要使用命名空间的场景：

-   实体（entities）
-   粒子效果（particles）
-   组件组（component-groups）
-   事件（events）

不需要使用命名空间的场景：

-   不要在文件夹路径或文件名中包含命名空间

## 子索引规范

子索引使用`.`符号分隔层级概念，应按照从宏观到微观的降序排列：

✔️ `animation.controller.dragon.flying.taking_off`

❌ `animation.controller.dragon_take_off_flying`

使用子索引时，使用`_`替代空格，不要使用多个`.`：

✔️ `animation.controller.dragon.flying.taking_off`

❌ `animation.controller.dragon.flying.taking.off`

实体标识符可以使用子索引：
`sirlich:dragon.drake`

## 组件组与事件的对应关系

| 组件组          | 事件                    |
| -------------- | ---------------------- |
| sirlich:wild   | ✔️ sirlich:become_wild |
| sirlich:wild   | ❌ sirlich:wild        |
| sirlich:tame   | ✔️ sirlich:on_tame     |
| sirlich:tame   | ❌ sirlich:tame        |

## 短名称应保持通用性

短名称是文件内部的标识符，用于映射具体资源路径。通用短名称有助于复用动画控制器和渲染控制器：

✔️ `"sit": "animation.dragon.sit"`

❌ `"dragon_sitting": "animation.dragon.sit"`

使用通用短名称后，我们可以为所有需要"坐下"动画的对象复用同一个"sit"动画控制器。

## 函数的嵌套规范

通过文件夹结构实现函数嵌套：

✔️ `function teleport/zone/hell`

❌ `function teleport_hellzone`

## 动画文件的组合规范

示例：

::: code-group
```json [示例动画文件]
{
    "format_version": "1.8.0",
    "animations": {
        "animation.dragon.sit": {...},
        "animation.dragon.fly": {...},
        "animation.dragon.roar": {...},
  }
}
```
:::

## 纹理路径组织规范

✔️ `textures/dragon/red`

❌ `textures/dragon_red_skin`

✔️ `textures/npc/dragon_hunter/archer`

❌ `textures/npc/dragon_hunter_archer`

## .lang文件注释规范

面向本地化人员的注释应使用行内格式：

`the.key=字符串内容<\t>## 注释内容，供本地化人员参考`

`<\t>`表示制表符。

独立行注释可用于组织结构，但不要存储关键本地化信息。

## 常用缩略词对照表

| 缩略词 | 完整名称                     |
| ------ | --------------------------- |
| BP     | 行为包（Behavior Pack）      |
| RP     | 资源包（Resource Pack）      |
| VRP    | 原版资源包（Vanilla Resource Pack） |
| VBP    | 原版行为包（Vanilla Behavior Pack） |
| AC     | 动画控制器（Animation Controller） |
| RPAC   | 资源包动画控制器（Resource Pack Animation Controller） |
| BPAC   | 行为包动画控制器（Behavior Pack Animation Controller） |
| BB     | Blockbench建模软件           |
| BDS    | 基岩版专用服务器（Bedrock Dedicated Server） |
| FPV    | 第一人称视角（First Person View） |
| RD     | Render Dragon渲染引擎        |
| VSCode | Visual Studio代码编辑器      |