---
title: 地表补丁生成教程
category: 巧思案例
mentions:
    - DerpMcaddon
    - SirLich
tags:
    - experimental
---

# 地表补丁生成教程

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

基于特征的地表构建器是一种将多种方块组合生成的功能，用于为主世界地表增添多样性和装饰效果。本教程将详细讲解如何创建这种地表特征，包括尺寸、生成频率、生成位置等参数设置！

## 单方块特征

单方块特征将作为我们地表构建的基础。它们定义了我们将要使用的具体方块类型。本教程将使用粗泥、灰化土和圆石作为示例。

了解更多单方块特征知识[请点击此处](/wiki/world-generation/feature-types#single-block-features)

粗泥特征文件

::: code-group
```json [BP/features/coarse_dirt_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:single_block_feature": {
		"description": {
			"identifier": "wiki:coarse_dirt_feature"
		},
		"places_block": {
			// 粗泥与普通泥土共享相同标识符，需通过名称和状态值指定
			"name": "minecraft:dirt",
			"states": {
				"dirt_type": "coarse"
			}
		},
		"enforce_survivability_rules": false,
		"enforce_placement_rules": false,
		"may_replace": [
			"minecraft:grass" // 该方块仅可替换草方块
		]
	}
}
```
:::

灰化土特征文件

::: code-group
```json [BP/features/podzol_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:single_block_feature": {
		"description": {
			"identifier": "wiki:podzol_feature"
		},
		"places_block": "minecraft:podzol", // 灰化土可直接通过标识符定义
		"enforce_survivability_rules": false,
		"enforce_placement_rules": false,
		"may_replace": [
			"minecraft:grass" // 该方块仅可替换草方块
		]
	}
}
```
:::

圆石特征文件

::: code-group
```json [BP/features/cobblestone_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:single_block_feature": {
		"description": {
			"identifier": "wiki:cobblestone_feature"
		},
		"places_block": "minecraft:cobblestone", // 圆石可直接通过标识符定义
		"enforce_survivability_rules": false,
		"enforce_placement_rules": false,
		"may_replace": [
			"minecraft:grass" // 该方块仅可替换草方块
		]
	}
}
```
:::

## 权重随机特征

权重随机特征将作为我们的_随机选择器_，用于在不同方块类型之间进行概率选择。

了解更多权重随机特征知识[请点击此处](/wiki/world-generation/feature-types#weighted-random-features)

::: code-group
```json [BP/features/select_surface_block_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:weighted_random_feature": {
		"description": {
			"identifier": "wiki:select_surface_block_feature"
		},
		"features": [
			[
				"wiki:coarse_dirt_feature", // 粗泥权重为5
				5
			],
			[
				"wiki:podzol_feature", // 灰化土权重为3
				3
			],
			[
				"wiki:cobblestone_feature", // 圆石权重为2
				2
			]
		]
	}
}
```
:::

## 散点特征

散点特征是我们地表构建的重要部分。它将决定单个斑块中方块的数量、形状和分布范围。

了解更多散点特征知识[请点击此处](/wiki/world-generation/feature-types#scatter-features)

::: code-group
```json [BP/features/scatter_surface_block_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:scatter_feature": {
		"description": {
			"identifier": "wiki:scatter_surface_block_feature"
		},
		"iterations": "math.random_integer(20,25)",
		"x": {
			"extent": [0, 8],
			"distribution": "gaussian"
		},
		"z": {
			"extent": [0, 8],
			"distribution": "gaussian"
		},
		"y": "q.heightmap(v.worldx, v.worldz) -1",
		"places_feature": "wiki:select_surface_block_feature" // 权重随机特征的标识符
	}
}
```
:::

-   `iterations` 决定将放置的方块数量。使用Molang的 `math.random_integer` 函数可实现数量随机化。本示例中将在20到25个方块之间随机

-   `extent` 使用数组决定斑块尺寸。`[0, 8]` 表示斑块从0到8格扩展。因此，我们的斑块在X和Z轴上将延伸8格。**该参数仅适用于X和Z轴分布**

-   `"y": "q.heightmap(v.worldx, v.worldz) -1` 表示方块将放置于当前地表最高点的Y坐标-1处，即始终在地表生成

-   `distribution` 指定分布类型。可用选项包括：`Gaussian`（高斯分布）、`Inverse Gaussian`（逆高斯分布）、`Uniform`（均匀分布）、`Fixed Grid`（固定网格）和`Jittered Grid`（抖动网格）

## 特征规则

这是地表构建的最后一步。地表构建器的特征规则设置略有不同。

::: code-group
```json [BP/feature_rules/overworld_surface_blocks_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:overworld_surface_blocks_feature",
			"places_feature": "wiki:scatter_surface_block_feature"
		},
		"conditions": {
			"placement_pass": "surface_pass",
			"minecraft:biome_filter": {
				"test": "has_biome_tag",
				"operator": "==",
				"value": "overworld" // 可更改为任意生物群系标签
			}
		},
		"distribution": {
			"iterations": 1,
			"x": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"y": 0,
			"z": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"scatter_chance": {
				// 每个区块生成斑块的概率
				"numerator": 1,
				"denominator": 5
			}
		}
	}
}
```
:::

至此我们的地表构建器就完成了！欢迎自由调整参数并探索更多可能性！