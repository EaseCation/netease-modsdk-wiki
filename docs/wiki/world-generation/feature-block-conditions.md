---
title: 方块的生成条件
category: 巧思案例
tags:
    - 实验性
mentions:
    - PavelDobCZ23
    - SmokeyStack
    - ThomasOrs
---

# 方块的生成条件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

有时你可能需要根据下方或上方的方块条件来放置特定特征。虽然多数生成特征本身不具备条件判断功能，但我们可以通过简单的技巧实现这个需求。

:::tip
本技巧利用了 `aggregate_feature` 和 `single_block_feature` 特征。若想了解更多相关内容，请参阅[特征类型](/wiki/world-generation/feature-types)文档。
:::

## 文件结构

### 特征文件

这个特征通过 `single_block_feature` 实现条件判断功能。我们可以保留这个占位方块（若不影响后续生成），但后续会将其替换为空气方块以避免干扰。该特征本质上是一个"虚拟"特征，因为我们只需要它的条件判断功能而不需要实际生成方块。

::: code-group
```json [BP/features/block_condition_feature.json]
{
    "format_version": "1.18.0",
    "minecraft:single_block_feature": {
        "description": {
            "identifier": "wiki:block_condition_feature"
        },
        "places_block": "minecraft:cobblestone", //任何不在"may_replace"列表中的方块
        "enforce_placement_rules": false,
        "enforce_survivability_rules": false,
        "may_replace": ["minecraft:air"], //仅允许在特定方块上生成
        "may_attach_to": { //附着条件 - 特征生成时周围允许存在的方块
            "bottom": ["minecraft:grass"] //仅允许在草方块上方生成
        }
    }
}
//这个"虚拟"特征只允许在草方块正上方的空气方块位置生成
```

接下来的特征负责将圆石替换回原始空气方块。如果你选择保留占位方块或该方块不会造成干扰，可以省略此步骤。

::: code-group
```json [BP/features/block_replacement_feature.json]
{
    "format_version": "1.18.0",
    "minecraft:single_block_feature": {
        "description": {
            "identifier": "wiki:block_replacement_feature"
        },
        "places_block": "minecraft:air", //将占位方块替换为无影响的方块
        "enforce_placement_rules": false,
        "enforce_survivability_rules": false,
        "may_replace": ["minecraft:cobblestone"] //前一个特征中使用的占位方块
    }
}
//此特征将占位方块替换回空气，避免后续生成问题
```

这个聚合特征按顺序执行：先放置条件判断方块，然后替换占位方块，最后生成实际特征。设置 `early_out` 为 `first_failure` 确保任一环节失败时立即终止流程。该特征通过特征规则调用。

::: code-group
```json [BP/features/aggregate_placement_rock_feature.json]
{
    "format_version": "1.18.0",
    "minecraft:aggregate_feature": {
        "description": {
            "identifier": "wiki:aggregate_placement_rock_feature"
        },
        "features": [
            "wiki:block_condition_feature", //用于条件判断的虚拟特征
            "wiki:block_replacement_feature", //清理占位方块的特征
            //从此处开始添加需要条件生成的实际特征
            "wiki:rock_ore_feature"
        ],
        "early_out": "first_failure" //任一特征失败则终止后续生成
    }
}
//该聚合特征按顺序执行所有子特征，由特征规则调用
```

这是需要条件生成的矿石特征示例。由于原生 `ore_feature` 无法直接设置生成条件，本技巧完美解决了这个问题。

::: code-group
```json [BP/features/rock_ore_feature.json]
{
	"format_version": "1.18.0",
	"minecraft:ore_feature": {
		"description": {
			"identifier": "wiki:rock_ore_feature"
		},
		"count": 12,
		"replace_rules": [
			{
				"places_block": "minecraft:stone",
				"may_replace": ["minecraft:air","minecraft:grass"]
			},
			{
				"places_block": {
                    "name": "minecraft:dirt",
                    "states": {
                      "dirt_type": "coarse"
                    }
                },
				"may_replace": ["minecraft:dirt"]
			}
		]
	}
}
```
:::

:::tip
若想深入了解矿石特征，请参考[自定义矿石生成](/wiki/world-generation/custom-ores)教程。
:::

### 特征规则

::: code-group
```json [BP/feature_rules/overworld_after_surface_rock_feature.json]
{
	"format_version": "1.18.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:overworld_after_surface_rock_feature",
			"places_feature": "wiki:aggregate_placement_rock_feature"
		},
		"conditions": {
			//在主世界生物群系的地表生成阶段后执行
			"placement_pass": "after_surface_pass",
			"minecraft:biome_filter": [
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
			//每个区块有1/3概率尝试生成1次
            "scatter_chance": 33,
			"iterations": 1, 
			"coordinate_eval_order": "xzy",
			"x": {
				"distribution": "uniform",
				"extent": [0, 15]
			},
			//根据地势高度生成
			"y": "q.heightmap(v.worldx,v.worldz)",
			"z": {
				"distribution": "uniform",
				"extent": [0, 15]
			}
		}
	}
}
```

## 总结

通过本教程，你已经掌握了如何为任意特征添加方块生成条件。虽然示例较为基础，但此技巧可扩展应用于复杂场景，兼容所有特征类型。

最终我们实现了一个仅在草方块上方空气位置生成的岩石特征。

生成效果截图：

![](/assets/images/world-generation/rock_feature.png)