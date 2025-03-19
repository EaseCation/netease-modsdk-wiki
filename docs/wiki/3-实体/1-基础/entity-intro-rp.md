---
title: 实体资源包入门指南
category: 基础指南
nav_order: 2
tags:
    - 新手教程
    - 入门指南
mentions:
    - SirLich
    - MedicalJewel105
    - Overload1252
    - ChibiMango
    - Luthorius
    - TheItsNameless
    - SmokeyStack
    - ThomasOrs
---

# 实体资源包入门指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

资源包中的实体文件定义了构成实体视觉效果的各种资源引用，同时包含了如何渲染这些视觉元素的详细逻辑。

本文将分解实体文件的每个组成部分并进行详细说明。如需创建自定义实体的完整指引，请参考我们的[新手教程](/guide/custom-entity)。

## 文件大纲

::: code-group
```json [RP/entity/example.json]
{
    "format_version": "1.10.0",
    "minecraft:client_entity": {
        "description": {
            "identifier": "wiki:example",
            "materials": {...},
            "textures": {...},
            "geometry": {...},
            "render_controllers": [...],

            "animations": {...},
            "scripts": {...},

            "sound_effects": {...},
            "particle_effects": {...},

            "spawn_egg": {...},
            "enable_attachables": false,
            "hide_armor": false
        }
    }
}
```
:::

尽管看起来复杂，文件中大部分内容都采用**简称定义**模式。简称定义允许我们将资源路径（如材质纹理）或几何体ID等元素映射为简短名称以便后续引用。这种设计既方便后续资源路径变更时集中修改，也使代码保持简洁。

## 材质系统
材质（Materials）决定了纹理的渲染方式。例如骷髅使用透明材质，而末影人的眼睛材质具有自发光特性。大部分情况下可以直接使用预设材质而无需自定义。

::: code-group
```json [RP/entity/spider.entity.json#minecraft:client_entity/description]
"materials": {
    "default": "spider",
    "invisible": "spider_invisible"
}
```
:::

这里的`default`和`invisible`是简称，分别指向`spider`和`spider_invisible`材质。需要注意的是单纯的简称定义并不会告知实体何时使用不同材质。

[预置材质列表](/documentation/materials)可供参考。[自定义材质教程](/visuals/materials)适合进阶开发者。

## 纹理配置
纹理（Textures）是映射到模型表面的图像文件。此部分同样使用简称定义系统：

::: code-group
```json [RP/entity/bee.entity.json#minecraft:client_entity/description]
"textures": {
    "default": "textures/entity/bee/bee",
    "angry": "textures/entity/bee/bee_angry",
    "nectar": "textures/entity/bee/bee_nectar",
    "angry_nectar": "textures/entity/bee/bee_angry_nectar"
}
```
:::

支持定义多状态纹理（如蜜蜂的不同状态），也可叠加纹理层（参考村民的生物群系基底+职业层组合）。详细应用技巧参见[渲染控制器章节](/entities/render-controllers)。

## 几何体格式
几何体（Geometry）由Blockbench等建模工具生成的骨骼模型文件构成：

::: code-group
```json [RP/entity/creeper.entity.json#minecraft:client_entity/description]
"geometry": {
    "default": "geometry.creeper",
    "charged": "geometry.creeper.charged"
}
```
:::

这里的简称指向几何体文件的唯一标识符（JSON文件中的`identifier`字段）。以苦力怕为例，充电与普通状态使用不同模型：

::: tip
模型显示异常时，首要检查简称定义是否存在拼写错误。
:::

## 渲染控制器
渲染控制器（Render Controllers）是控制实体渲染方式的核心组件，负责协调材质、纹理和模型的搭配使用：

::: code-group
```json [RP/render_controllers/example.rc.json]
{
	"format_version": "1.10.0",
	"render_controllers": {
		"controller.render.example": {
			"geometry": "geometry.default",
			"materials": [{ "*": "material.default" }],
			"textures": ["texture.default"]
		}
	}
}
```
:::

该示例始终使用"default"标识的各类资源。进阶用法可支持动态切换纹理与隐藏模型部件，详情参阅[渲染控制器指南](/entities/render-controllers)。

在实体文件中通过标识符指定渲染控制器：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"render_controllers": ["controller.render.example"]
```
:::

最低限度的实体文件须包含材质、纹理、几何体、渲染控制器四个基础模块。

## 动画系统
动画（Animations）定义模型骨骼的运动逻辑，涵盖行走、攻击、视线追踪等交互行为：

::: code-group
```json [RP/animations/example.a.json]
{
	"format_version": "1.8.0",
	"animations": {
		"animation.example.walk": {...},
        "animation.example.attack": {...}
	}
}
```
:::

实体文件中需配置动画简称以便调用：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"animations": {
    "walk": "animation.example.walk",
    "attack": "animation.example.attack",
    "attack_controller": "controller.animation.example"
}
```
:::

::: warning 重要提示
单单定义动画简称并不能启动动画，需通过脚本系统主动调用。
:::

## 脚本逻辑
脚本（Scripts）通过Molang表达式协调动画播放、变量设置、模型缩放等动态行为：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"scripts": {
    "initialize": [...],
    "pre_animation": [...],
    "animate": [...],
    "scale": "1"
}
```
:::

### 初始化脚本
实体生成或加载时执行，适合设置初始变量。

### 预动画脚本
每帧渲染前运行，用于计算动画参数。

### 动画脚本
每帧执行动画控制器和播放逻辑：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"animate": [
    "attack_controller",
    { "walk": "q.modified_move_speed" }
]
```
:::

`q.modified_move_speed`将行走速度映射为动画播放速率。数值`2`表示双倍播放，动态公式使动画与实体速度保持同步。

### 模型缩放
`scale`参数支持通过Molang表达式调整模型尺寸：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"scripts": {
    "scale": "q.variant",
    "scaleX": 2,
    "scaleY": 0.5
}
```
:::

该示例：
- Y轴方向缩放0.5倍
- X轴放大2倍
- 整体尺寸由变体值决定（`minecraft:variant`组件）

::: tip 随机尺寸案例
`math.random_integer(1,5)`可在初始化时生成1-5的随机缩放系数。
:::

## 音效配置
音效简称便于在动画事件中调用：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"sound_effects": {
    "attack_1": "mob.entity.attack_1",
    "attack_2": "mob.entity.attack_2",
    "attack_3": "mob.entity.attack_3"
}
```
:::

## 粒子系统
粒子简称用于动画事件触发：

::: code-group
```json [RP/entity/example.json#minecraft:client_entity/description]
"particle_effects": {
    "smoke": "wiki:smoke_particle"
}
```
:::

[自定义粒子教程](/particles/particles) | [动画效果应用](/visuals/animation-effects)

## 生成蛋设置
生成蛋（Spawn Egg）支持纯色或自定义纹理两种风格：

::: code-group 纯色风格
```json [RP/entity/example.json#minecraft:client_entity/description]
"spawn_egg": {
    "base_color": "#db7500",
    "overlay_color": "#242222"
}
```
:::

::: code-group 定制纹理
```json [RP/entity/example.json#minecraft:client_entity/description]
"spawn_egg": {
    "texture": "wiki.example"
}
```
:::

## 特殊参数
- `enable_attachables`（启用配件）：控制实体能否持握工具
- `hide_armor`（隐藏护甲）：允许穿装备但不显示外观