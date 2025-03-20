---
title: Addons详解
category: 指南
description: 附加包的基础知识
nav_order: 2
prefix: '2. '
mentions:
    - SirLich
    - Dreamedc2015
    - sermah
    - cda94581
    - RedSmarty
    - TheItsNameless
    - MedicalJewel105
    - ChibiMango
    - profeplaysminecraft
    - retr0cube
    - SmokeyStack
---

# Addons 详解

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 什么是附加包(Adddons)？

附加包允许我们通过 _修改_ 或 _移除_ 现有内容以及_添加_自定义内容来改变Minecraft的游戏体验。它们功能强大，可以创建自定义实体、物品、方块，以及自定义战利品表和合成配方等。你的想象力就是唯一的限制！

附加包主要使用结构化数据格式[JSON](/wiki/guide/understanding-json)编写。本质上，附加包是一系列JSON文件、图像和声音文件的集合，通过这些文件以某种方式修改或增强游戏内容。

## 行为包与资源包的区别？

附加包分为两种类型：资源包（Resource Pack）和行为包（Behavior Pack）。两者可以独立运行，但通常配合使用。当同时使用资源包和行为包时，就组成了一个_附加包_。

### 资源包

资源包（Resource Pack），也称为 _客户端_ 或RP，负责附加包的 _视觉效果_ 和 _声音_ 。主要包括：

-   材质贴图
-   音效
-   几何模型
-   动画
-   粒子效果

### 行为包

行为包（Behavior Pack），也称为 _服务端_ 或BP，负责附加包的 _逻辑功能_ 。主要包括：

-   实体行为
-   合成配方
-   战利品表
-   自定义函数

### 包间通信

大多数情况下需要同时使用RP和BP。这两个包之间会进行通信或相互依赖才能正常运行，即在一个包中定义的资源可以被另一个包访问。例如创建自定义实体时需要两个文件：

-   RP实体定义文件（描述实体 _外观_）
-   BP实体定义文件（描述实体 _行为_）

## 知识总结

:::tip

-   附加包可以修改Minecraft内容或添加新内容
-   附加包使用JSON语言编写
-   附加包分为**资源包**和**行为包**：
    -   资源包包含材质、音效等内容，控制游戏外观
    -   行为包包含实体文件、合成配方等内容，控制游戏逻辑
:::

## 下一步建议

<BButton
    link="/guide/software-preparation"
    color=blue
>查看软件准备指南！</BButton>

::: code-group
```json [示例RP实体定义]
// 自定义苦力怕的材质路径
"minecraft:client_entity": {
    "description": {
        "textures": {
            "default": "textures/entity/custom_creeper"
        }
    }
}
```
:::

::: code-group
```json [示例BP实体定义]
// 设置自定义苦力怕的爆炸行为
"minecraft:entity": {
    "components": {
        "minecraft:explode": {
            "fuseLength": 2.5
        }
    }
}
```
:::