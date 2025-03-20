---
title: 高度图噪声
category: 巧思案例
tags:
    - experimental
    - tutorial
mentions:
    - Apex360
    - SirLich
---

# 高度图噪声

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip
本教程假设您已掌握Molang、特征（feature）及特征规则（feature rule）的基础知识。
:::

在本教程中，我们将学习如何通过`q.noise` Molang查询实现基于噪声的地形生成。

## 单方块特征

首先定义用于生成地形的单方块特征。本教程将使用石头作为示例。

::: code-group
```json [BP/features/stone_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:single_block_feature": {
		"description": {
			"identifier": "wiki:stone_feature"
		},
		"places_block": "minecraft:stone",
		"enforce_survivability_rules": false,
		"enforce_placement_rules": false
	}
}
```
:::

## 散布特征

散布特征（scatter feature）是地形生成的核心组件。

::: code-group
```json [BP/features/column.json]
{
	"format_version": "1.13.0",
	"minecraft:scatter_feature": {
		"description": {
			"identifier": "wiki:column"
		},
		"iterations": "t.height=64+(q.noise(v.originz/64,v.originx/64))*16; return t.height;",
		"places_feature": "wiki:stone_feature",
		"x": 0,
		"z": 0,
		"y": {
			"extent": [-64, "t.height"],
			"distribution": "fixed_grid"
		}
	}
}
```
:::

**迭代参数解析**：
- 我们通过临时变量`t.height`定义噪声函数
- `64`是基准高度（函数的起始高度）
- `q.noise`查询Perlin噪声值（范围-1到1），除以64用于平滑噪声曲线
- 乘以16控制地形起伏幅度

该逻辑通过`y`参数的取值范围[-64, t.height]生成地形柱体。由于`q.noise`基于Perlin噪声算法，相邻柱体高度呈现渐变效果（如64,65,66,68...），而非随机突变。

## 特征规则

::: code-group
```json [BP/feature_rules/column_grid_placement.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:column_grid_placement",
			"places_feature": "wiki:column"
		},
		"conditions": {
			"placement_pass": "first_pass",
			"minecraft:biome_filter": {
				"any_of": [
					{
						"test": "has_biome_tag",
						"value": "overworld"
					},
					{
						"test": "has_biome_tag",
						"value": "overworld_generation"
					}
				]
			}
		},
		"distribution": {
			"iterations": 256,
			"x": {
				"extent": [0, 15],
				"distribution": "fixed_grid"
			},
			"y": 0,
			"z": {
				"extent": [0, 15],
				"distribution": "fixed_grid"
			}
		}
	}
}
```
:::

**关键配置**：
- `iterations`设为256以覆盖整个区块（16x16区域）
- `fixed_grid`分布模式确保柱体均匀排列

至此，基于噪声的自定义地形已构建完成！您可以自由调整参数进行地形形态实验。