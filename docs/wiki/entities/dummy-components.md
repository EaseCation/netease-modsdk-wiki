---
title: 虚拟组件
category: 文档
mentions:
    - SirLich
    - jigarbov
    - MedicalJewel105
    - StealthyExpertX
    - TheItsNameless
---

# 虚拟组件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning 弃用警告

'虚拟组件'是一个旧版概念，现已被[实体属性](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties)取代。建议尽可能使用实体属性代替。
:::

虚拟组件是仅用于数据存储的"无功能"组件。它们本身**不会**产生任何实际效果，需要配合其他机制才能发挥作用。这类组件的主要价值在于可将数据存储在实体上，并通过Molang查询来驱动图形/游戏机制。

典型案例包括 `variant`（变种）和 `mark_variant`（标记变种）。这些组件接受整数值设置，在原版资源包中用于定义猫和马匹的贴图选择。另一个典型案例是 `is_tamed`（驯服状态），用于控制马匹能否被骑乘。

虚拟组件的优势在于能够将数据与实体绑定，并通过Molang查询调用这些信息。

## 整型虚拟组件

整型组件存储整数值（例如1、10、1423），可使用Molang查询进行读取，是最常用的虚拟组件类型。

## 布尔型虚拟组件

布尔型组件存储单一状态信息，包括 `True`（真）和 `False`（假）。以 `is_tamed` 为例，组件存在表示为 `True`（已驯服），不存在则为 `False`（未驯服）。

## 组件列表

| 类型      | 查询语句                                                     | 组件名称                    | 备注                                                                                                                             |
| --------- | ------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **整型**   | q.variant                                                 | minecraft:variant            |                                                                                                                                   |
| **整型**   | q.mark_variant                                            | minecraft:mark_variant       |                                                                                                                                   |
| **整型**   | q.skin_id                                                 | minecraft:skin_id            |                                                                                                                                   |
| **整型\*** | 使用类似 `"test": "is_color"` 的过滤器，下方提供颜色列表 | minecraft:color              | 同时在材质系统中设置颜色                                                                                                         |
| **整型\*** | 无对应过滤器语法，可使用 `"has_component"`                   | minecraft:color2             | 同时在材质系统中设置颜色                                                                                                         |
| 布尔型       | q.is_illager_captain                                      | minecraft:is_illager_captain |                                                                                                                                   |
| 布尔型       | q.is_baby                                                 | minecraft:is_baby            | 禁用`minecraft:breedable`组件功能                                                                                             |
| 布尔型       | q.is_sheared                                              | minecraft:is_sheared         |                                                                                                                                   |
| 布尔型       | q.is_saddled                                              | minecraft:is_saddled         |                                                                                                                                   |
| 布尔型       | q.is_tamed                                                | minecraft:is_tamed           |                                                                                                                                   |
| 布尔型       | q.is_chested                                              | minecraft:is_chested         | 死亡时会掉落储存箱                                                                                                               |
| 布尔型       | q.is_powered                                              | minecraft:is_charged         |                                                                                                                                   |
| 布尔型       | q.is_stunned                                              | minecraft:is_stunned         |                                                                                                                                   |
| 布尔型       | q.can_climb                                               | minecraft:can_climb          | 允许实体攀爬梯子                                                                                                                 |
| 布尔型       | q.can_fly                                                 | minecraft:can_fly            | 标记实体具有飞行能力，路径查找器将不限于下方有固体方块的位置                                                                     |
| 布尔型       | q.can_power_jump                                          | minecraft:can_power_jump     | 允许实体执行强力跳跃（如原版马匹动作）                                                                                           |
| 布尔型       | q.is_ignited                                              | minecraft:is_ignited         |                                                                                                                                   |
| 布尔型       | q.out_of_control                                          | minecraft:out_of_control     | 新版功能，用于处理船体硬编码运动/粒子效果，Molang q查询可安全                                                                  |
| 布尔型       | q.has_any_family('monster')                            | minecraft:type_family         | 可检测指定Family类型（如'monster'）返回布尔值

### color与color2组件颜色对照表

::: code-group
```json [颜色代码]
-   black
-   blue
-   brown
-   cyan
-   gray
-   green
-   light_blue
-   light_green
-   magenta
-   orange
-   pink
-   purple
-   red
-   silver
-   white
-   yellow
```
:::