---
title: 实体问题排查指南
category: 基础
nav_order: 3
tags:
    - help
mentions:
    - SirLich
    - BlueFrog130
    - SmokeyStack
    - MedicalJewel105
    - aexer0e
    - ChibiMango
    - RonarsCorruption
---

# 实体问题排查指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip
本页面包含关于_实体_的疑难解答信息。在继续阅读前，请务必先查阅[全局问题排查指南](/wiki/guide/troubleshooting)。
:::

:::warning
请始终记得检查内容日志！
:::

## 0.0.0 - 确认问题存在

承认吧，某个地方肯定出错了。_任何_水平的开发者在_任何_阶段都可能出现这些疏漏，所以不要觉得被冒犯而想着"我当然会注意这些！"，然后跳过必要的检查步骤！

<BButton color="blue" link="#_1-0-0-are-both-packs-active">继续</BButton>


## 1.0.0 - 确保两个包都已启用

确认资源包和行为包在世界中都已激活（一个绝佳的防错方法是在两个包的manifest.json文件中互相设置依赖，这样添加或移除其中一个包时会自动同步处理）

<BButton color="blue" link="#_2-0-0-determine-whether-the-issue-is-in-the-rp-or-the-bp">继续</BButton>

## 2.0.0 - 确定问题出现在资源包还是行为包

通过观察实体生成蛋在创造模式物品栏中的显示状态，可以有效定位问题范围。即使您不打算为实体添加生成蛋，请暂时按照以下步骤添加以便定位问题：

### 在资源包中

确保.entity文件包含自定义spawn_egg配置：

::: code-group
```json [RP]
"spawn_egg":{
    "base_color": "#FF0000",
    "overlay_color": "#FFFF00"
}
```
:::

（建议选择除"#000000"以外的配色以方便排查）

### 在行为包中

确保description对象中开启`is_spawnable`和`is_summonable`，并将`is_experimental`设为false：

::: code-group
```json [BP]
"description":{
    "identifier": "wiki:example_entity",
    "is_spawnable": true,
    "is_summonable": true,
    "is_experimental": false
}
```
:::

### 现象分析

完全看不到生成蛋：<BButton color="blue" link="#_3-1-0-bp">前往排查</BButton>

能看到生成蛋但颜色全黑且无法生成实体：<BButton color="blue" link="#step-3-2-0-rp-entity">前往排查</BButton>

生成蛋显示正常颜色但仍旧无法生成实体：<BButton color="blue" link="#step-3-3-0-rp-resources-still-writing-because-this-is-going-to-be-extensive">前往排查</BButton>

## 3.0.0 - 定位具体问题

## 3.1.0 - 行为包问题

_即使已在行为文件中设置"is_spawnable": true，在创造模式物品栏中依然无法找到生成蛋_

这通常表示游戏未能正确识别实体行为文件。常见原因包括：

-   Json语法错误
-   文件夹命名错误

### 3.1.1 - 语法错误

单个语法错误会导致整个json文件失效。建议使用[JSON验证工具](https://jsonlint.com/)检查文件的语法完整性（注：虽然该网站会将//注释视为错误，但在Minecraft中实际允许使用注释）

### 3.1.2 - 文件夹误命名

请确认行为包中的实体文件夹命名为"entities"（资源包对应的是"entity"，这个不一致设定确实容易引起困惑）

## 步骤3.2.0 - 资源包.entity文件问题

_能在创造模式物品栏中看到生成蛋，但显示为黑色且实体名异常（如"item.spawn_egg.entity.wiki:your_mob.name"），且无法正常生成实体_

此现象说明行为文件已生效，但资源包未能正确关联对应.entity文件。常见原因包括：

-   .entity文件语法错误
-   实体identifier不匹配
-   资源引用路径错误
-   资源包文件夹应命名为"entity"，行为包文件夹应命名为"entities"

### 步骤3.2.1 - 语法错误

再次推荐使用[JSON验证工具](https://jsonlint.com/)进行深度校验（注意注释标识的兼容性问题）

### 步骤3.2.2 - 标识符不匹配

需确保资源包.entity文件与行为包的identifier字段完全一致，包括命名空间（冒号前的部分，例如`minecraft:bat`中的`minecraft`）。特别注意：

-   除了冒号外不要使用特殊字符
-   命名空间和ID避免以数字或大写字母开头（虽然现行版本允许，但历史版本曾存在兼容性问题）
-   非官方实体切勿使用`minecraft`作为命名空间

### 步骤3.2.3 - 无效资源引用

检查.entity文件中各项资源引用路径是否正确指向有效文件

## 步骤3.3.0 - 资源包资源排查（进行中）

_生成蛋显示正常颜色但在生成/召唤时实体不可见或仅显示阴影_

这说明基本功能文件已正常加载，但存在次级资源配置问题。根据现象选择排查方向：

-   完全隐形无阴影 → 资源引用错误：<BButton link="#_3-3-1-invisible-no-shadow" color=blue >前往</BButton>
-   隐形但显示阴影 → 几何体问题：<BButton link="#_3-3-2-invisible-shadow-exists" color=blue >前往</BButton>
-   可见但贴图异常 → 材质问题：<BButton link="#_3-3-3-visible-weird-texture" color=blue >前往</BButton>
-   可见但渲染异常 → 材质类型错误：<BButton link="#_3-3-4-visible-weird-visibility-stuff" color=blue >前往</BButton>

### 3.3.1 - 完全隐形无阴影

确认实体未设置立即消失逻辑（如instant_despawn），优先检查实体基础配置。

### 3.3.2 - 隐形但显示阴影

此类问题通常涉及模型或材质配置，排查重点：

1. 几何体文件：检查命名正确性、文件完整性和几何偏移量设置
2. 材质匹配：例如透明材质与普通材质的兼容性
3. 渲染控制器：验证控制器逻辑与参数设置

### 3.3.3 - 可见但贴图异常

（内容开发中）

### 3.3.4 - 可见但渲染异常
（内容开发中）