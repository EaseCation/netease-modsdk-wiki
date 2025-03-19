---
title: AOE云区域效果介绍
category: 教程
tags:	
    - 中阶
mentions:
    - Sprunkles137
    - MedicalJewel105
---

# AOE云区域效果介绍

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

**区域效果云**（Area-of-effect clouds），在内部也被称为AOE云或`minecraft:area_effect_cloud`，是一种具有独特属性的特殊实体。这些实体通常通过投掷滞留药水生成，但借助结构文件和NBT编辑魔法，我们可以在地图制作中以极其强大的方式操控它们。

## 概述

区域效果云具备以下可被利用的特性：

- 作为[虚拟实体](/entities/dummy-entities)，它们在性能表现优异，几乎不影响帧率，且完全静态且不与世界发生碰撞。这使其非常适用于需要围绕玩家或精确定位的场景。
- 不会向客户端发送更新。生成后视觉上会定格在初始位置直至消失，但仍可通过指令自由移动。
- 能以高度可配置的方式施加任何药水效果（精准到游戏刻的持续时间设定，调节环境效果、屏幕提示显示、粒子发射等属性）。
- 具有运行时标识符`minecraft:area_effect_cloud`的实体将继承相同属性。

## 方法一：投射物组件

投射物组件支持在命中时生成区域效果云。Minecraft正是通过此机制实现投掷滞留药水生成AOE云。

[投射物组件文档](/documentation/projectiles#spawn-aoe-cloud)

## 方法二：NBT编辑

另一种方式是通过结构文件生成区域效果云。这使我们可以更精细控制云效果属性。首先需要准备合适的NBT编辑工具。

### NBT编辑器

推荐使用以下任一NBT编辑器：

-   [NBT Studio](https://github.com/tryashtar/nbt-studio)（由tryashtar开发的独立程序）
-   [NBT Viewer](https://marketplace.visualstudio.com/items?itemName=Misodee.vscode-nbt)（由Misode开发的VSCode扩展）

### 结构文件

本文包含预制的结构文件可供下载使用。文件内设置了一个存在时间最大化的AOE云效果。

::: code-group
```json [点击下载MCSTRUCTURE文件]
```
:::

结构文件编辑指南请参考：[.mcstructure文件解析](/nbt/mcstructure)

### NBT数据格式

| 字段									| 类型		| 说明				
| --------------------- | -------	| -------------
| Duration							| 整型		| 效果云存在总时长（单位：刻）
| DurationOnUse					| 整型		| 应用效果后持续时间的增量
| InitialRadius					| 浮点型		| 初始生成时的半径
| ParticleColor					| 整型		| 粒子颜色（十进制数值）
| ParticleId						| 整型		| 发射的粒子类型ID（0表示无粒子）
| PotionId							| 短整型		| 药水效果ID（创建时使用，无实质效果）
| RadiusChangeOnPickup	| 浮点型		| （未知用途）
| RadiusOnUse						| 浮点型		| 应用效果后的半径变化量
| RadiusPerTick					| 浮点型		| 每刻半径的变化量
| ReapplicationDelay		| 整型		| 两次效果应用的最小间隔（刻）
| mobEffects						| 列表		| 实体携带的药水效果配置

以下是`mobEffects`标签的参数说明：

| 字段												| 类型		| 说明			
| -------------------------------	| -------	| -------------	
| Ambient												| 字节		| 效果粒子是否为半透明形态
| Amplifier											| 字节		| 效果强度等级（0表示I级）
| DisplayOnScreenTextureAnimation	| 字节		| （未知用途）
| Duration											| 整型		| 效果持续时间（刻）
| DurationEasy										| 整型		| （未知用途，疑似未使用）
| DurationNormal									| 整型		| （未知用途，疑似未使用）
| DurationHard										| 整型		| （未知用途，疑似未使用）
| Id														| 字节		| 药水效果类型ID
| ShowParticles									| 字节		| 是否显示效果粒子