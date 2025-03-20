---
title: 生成自定义矿物
category: 巧思案例
tags:
    - experimental
mentions:
    - DerpMcaddon
    - SirLich
    - 7dev7urandom
    - Chikorita-Lover
---

# 生成自定义矿物

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

`矿石特征`是基础但重要的特性！它们通过替换生成位置的方块来形成方块簇。本教程将展示如何制作自然生成的矿物矿石。

使用特征和特征规则需要在世界设置中启用自定义生物群系功能。如果方块未生成，请确保已启用该选项！

:::tip
本教程将使用两种自定义方块：钛铁矿和深板岩钛铁矿。关于如何制作自定义方块，请访问[方块基础](/wiki/blocks/blocks-intro)页面。
:::

## 特征文件

::: code-group
```json [BP/features/titanite_ore_feature.json]
{
	"format_version": "1.17.0",
	"minecraft:ore_feature": {
		"description": {
			"identifier": "wiki:titanite_ore_feature"
		},
		"count": 8, // 尝试放置次数
		"replace_rules": [
			{
				// 将所有石质变种（安山岩、花岗岩、闪长岩）替换为钛铁矿
				"places_block": "wiki:titanite_ore",
				"may_replace": ["minecraft:stone"]
			},
			{
				// 将深板岩替换为深板岩钛铁矿
				"places_block": "wiki:deepslate_titanite_ore",
				"may_replace": ["minecraft:deepslate"]
			}
		]
	}
}
```
:::

## 特征规则

::: code-group
```json [BP/feature_rules/overworld_underground_titanite_ore_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:overworld_underground_titanite_ore_feature",
			"places_feature": "wiki:titanite_ore_feature" // 来自特征文件的标识符
		},
		"conditions": {
			"placement_pass": "underground_pass",
			"minecraft:biome_filter": [
				// 在主世界各处散布矿石
				{
					"any_of": [
						{
							"test": "has_biome_tag",
							"operator": "==",
							"value": "overworld"
						},
						{
							"test": "has_biome_tag",
							"operator": "==",
							"value": "overworld_generation"
						}
					]
				}
			]
		},
		"distribution": {
			"iterations": 10, // 矿簇的生成尝试次数（非单个矿石方块）
			"coordinate_eval_order": "zyx",
			"x": {
				"distribution": "uniform",
				"extent": [0, 16]
			},
			"y": {
				"distribution": "uniform", // 使用"triangle"可使矿石在高度范围中部更常见
				"extent": [
					0, // 矿石生成的最小高度
					62 // 矿石生成的最大高度
				]
			},
			"z": {
				"distribution": "uniform",
				"extent": [0, 16]
			}
		}
	}
}
```
:::

## 测试验证

可以通过探索洞穴寻找矿石，若矿石稀有度较高，建议使用指令验证生成情况。将以下指令放入循环命令方块中，然后四处飞行：

-   `execute @a ~ ~ ~ fill ~8 ~8 ~8 ~-8 ~-8 ~-8 air 0 replace wiki:titanite_ore`

普通石质矿石：

![](/assets/images/world-generation/generating-custom-ores/stone_ore.png)

深板岩矿石：

![](/assets/images/world-generation/generating-custom-ores/deepslate_ore.png)