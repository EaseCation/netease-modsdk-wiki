---
title: 实体手持物品
category: 巧思案例
tags:
    - 中等难度
mentions:
    - pieterdefour
    - SirLich
    - solvedDev
    - stirante
    - Joelant05
    - destruc7ion
    - Dreamedc2015
    - sermah
    - 7dev7urandom
---

# 实体手持物品

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
本教程假设您已对实体、战利品表和Blockbench有基本了解。
:::

在本教程中，您将学习如何让实体生成时手持物品。示例中将使用自定义实体 `mandalorian_armorer` 和自定义物品 `hammer`。

## 模型

首先需要在Blockbench中创建包含名为 `rightArm` 骨架的模型。该骨架内必须包含名为 `rightItem` 的子骨架。
将该子骨架的枢轴点定位至您期望实体手持物品的位置。

![](/assets/images/tutorials/entity-holds-item/blockbench.png)

## 行为包配置

接下来需在实体的组件列表中添加 `minecraft:equipment` 组件，并配置包含目标物品的战利品表。

示例配置如下：

::: code-group
```json [BP/entity/mandolorian.json#components]
"minecraft:equipment": {
    "table": "loot_tables/entities/gear/mandolorian.json"
}
```
:::

## 战利品表配置

最后在行为包的 `loot_tables/entities/<你的战利品表名称>.json` 路径下添加对应战利品表。本示例中文件名为 `mandolorian.json`。

:::warning
此战利品表与生物死亡掉落表不同，请确保使用不同命名。
:::

要让实体始终持握特定物品，按照以下格式配置战利品表：

::: code-group
```json [BP/loot_tables/entities/gear/mandolorian.json]
{
	"pools": [
		{
			"rolls": 1,
			"entries": [
				{
					"type": "item",
					"name": "dd:hammer",
					"weight": 1
				}
			]
		}
	]
}
```
:::

成功配置后，效果应如下图所示：

![](/assets/images/tutorials/entity-holds-item/finished_result.png)