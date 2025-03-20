---
title: 世界生成入门
category: 基础
nav_order: 1
tags:
    - 指南
    - 实验性功能
mentions:
    - SirLich
    - solvedDev
    - Dreamedc2015
    - destruc7ion
    - MedicalJewel105
    - aexer0e
    - retr0cube
    - SmokeyStack
---

# 世界生成入门

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
本文档部分内容已过时，信息量有限。如需获取最新最全面的信息，请查阅本节其他页面。
:::

您可以通过附加包修改世界的生成规则。行为包中需要以下文件夹：

`structures`（结构）、`features`（特征）、`feature_rules`（特征规则）和 `biomes`（生物群系）。顾名思义：您可以将结构方块生成的.mcstructure文件存放在`structures`中，生物群系文件存放在`biomes`中，矿石等地形特征存放在`features`中，其生成规则则存放在`feature_rules`中。让我们先从添加自定义生物群系开始。

_注：使用 bridge. 这款可视化附加包创作工具（联系方式见"链接与联系"）创建生物群系可能更方便，因为官方文档尚不完善。您也可以生成所有原版生物群系、特征和特征规则的示例文件作为参考，如下图所示：_

![](/assets/images/guide/gen_coal_ore.png)
_使用 bridge. 生成 coal_ore 特征_

当然，bridge. 并非必需工具。

---

## 自定义生物群系

::: code-group
```json [BP/biomes/cold_biome.json]
{
	"format_version": "1.13.0",
	"minecraft:biome": {
		"description": {
			"identifier": "cold_biome"
		},
		"components": {
			"minecraft:climate": {
				"downfall": 0.7,
				"snow_accumulation": [0.6, 0.9],
				"temperature": 15.0
			},
			"minecraft:overworld_height": {
				"noise_params": [0.6, 0.9]
			},
			"minecraft:surface_parameters": {
				"sea_floor_depth": 7,
				"sea_floor_material": "minecraft:blue_ice",
				"foundation_material": "minecraft:cobblestone",
				"mid_material": "minecraft:minecraft:concrete",
				"top_material": "minecraft:glass",
				"sea_material": "minecraft:water"
			},
			"minecraft:overworld_generation_rules": {
				"generate_for_climates": [
					["medium", 100],
					["warm", 100],
					["cold", 100]
				]
			},
			"cold_biome": {}
		}
	}
}
```

-   设置 `format_version` 为 1.13.0：这是当前版本的最新生物群系文件格式
-   `description` 仅需一个值：`identifier`。此处**不需要命名空间**且**必须**与**文件名**一致
    （如果使用命名空间，例如 `wiki:cold_biome`，文件名仍需保持为 `cold_biome.json`）
-   `components` 即生物群系的基本属性配置，让我们逐一解析：
-   `minecraft:climate` 控制气候相关参数
-   `downfall` 表示降水频率。0.0 代表无降水（如沙漠），1.0 表示持续降水
-   `temperature` 用于定义水体结冰和降雨转雪等效果

**可使用 bridge. 生成原版生物群系文件作为参考**

-   `overworld_surface` 控制地形生成材质
-   `floor_depth` 表示湖泊河流的底部深度（方块数）
-   `sea_floor_material` 定义水域底部材质
-   `foundation_material` 用于 y=5 至 y=50 之间的基础岩层（例如沙漠使用石头）
-   `sea_material` 水域液体材质（主世界通常设为 "minecraft:water"）
-   `top_material` 表层材质（如草方块用于平原）
-   `mid_material` 中间层材质（如泥土用于平原）
-   `overworld_height` 定义地形高度特征

不可同时使用 `noise_type` 和 `noise_params`。`noise_params` 是包含噪声最高值和最低值的数组

![](/assets/images/guide/non_smooth_noise_transition.jpg)
_使用 noise_params [0.1, 0.1] 和 [1.0, 1.0] 生成的同生物群系非平滑过渡示例_

-   若使用 `noise_type`，可选预设值包括：
`beach, default, extreme, taiga, ocean, mountains, default_mutated, deep_ocean, lowlands, less_extreme, stone_beach, swamp, river, mushroom`

-   `minecraft_world_generation_rules` 是最重要的组件，特别是 `generate_for_climates` 数组。游戏中有三种气候："warm"、"medium" 和 "cold"。在世界生成时这些气候会随机分布[硬编码]。您可以为每个气候设置生物群系的生成权重。若不设置，默认权重为0，生物群系不会生成。示例中测试时将各气候权重设为100，使该生物群系在主世界广泛生成。正式使用时需调整权重（例如原版沙漠在warm气候中的权重为3）

-   该组件还包含 `hills_transformation`、`mutate_transformation`、`shore_transformation`、`river_transformation` 等参数，具体含义尚不明确。欢迎补充说明。`surface_meaterial_adjustments` 组件同理

-   最后是生物群系标签！使用方式简单但实用。通过在 `components` 中添加如下格式的标签：
```
"tagName": {}
```
即可在环境传感器、过滤器、生物群系检测、生成规则等场景中使用该标签

至此，您的自定义生物群系已创建完成！

---

## 特征与特征规则

注：在 v1.15Beta 中，可使用 `structures` 文件夹中的 `.mcstructures` 配合 `feature_rules` 生成自定义结构。更多详情将在更新发布后补充

特征与特征规则用于生成矿石、花草、植被、花岗岩或黏土矿脉等各类地形元素。虽然目前可用其创建自定义结构，但操作繁琐，建议等待后续更新简化流程

推荐使用 [MACHINE_BUILDER](https://www.youtube.com/channel/UC8FBQgo4AWwKFX97h60NKOQ) 开发的[自动生成工具](https://machine-builder.itch.io/frg-v2)来创建自定义结构。该工具免费版功能有限，完整功能需购买专业版。不过我们仍将学习手动创建特征的方法，因为矿石等元素使用 `ore_feature` 比 `structure_template_feature` 更高效

让我们以生成自定义方块 `wiki:blocky` 的矿石为例：

1. 打开 bridge. 选择附加包
1. 新建文件 > features > diamond_ore 和 feature_rules > diamond_ore
1. 保存文件后用代码编辑器进行必要修改

_若无安装 bridge.，也可手动创建或从[示例包](https://www.minecraft.net/en-us/addons)或 [bridge. 仓库](https://github.com/bridge.-core/bridge../tree/master/static/vanilla)获取原版文件_

## 特征

特征文件位于 `BP/features` 目录，本质上是游戏中可被特征规则放置的区块集合。**文件名**必须与**标识符**匹配

完整文档请参考 [bedrock.dev/r/Features](https://bedrock.dev/r/Features)

::: code-group
```json [BP/features/blocky_ore_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:ore_feature": {
		"description": {
			"identifier": "blocky_ore_feature"
		},
		"count": 8,
		"places_block": "wiki:blocky",
		"may_replace": [
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "andesite"
				}
			},
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "andesite_smooth"
				}
			},
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "diorite"
				}
			},
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "diorite_smooth"
				}
			},
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "granite"
				}
			},
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "granite_smooth"
				}
			},
			{
				"name": "minecraft:stone",
				"states": {
					"stone_type": "stone"
				}
			}
		]
	}
}
```

-   `minecraft_ore_feature` 是自动生成矿石的特定特征类型。每种特征类型都有独特语法（另有 `single_block_feature` 用于生成单个方块等）
-   `identifier` 此处不需要命名空间。文件名不包含命名空间
-   `count` 表示矿簇的最大方块数
-   `places_block` 设置要生成的方块标识符
-   `may_replace` 列出可被替换的方块类型。遇到未列出的方块时将保留原方块

## 特征规则

**特征规则**控制特征（及未来的结构）的生成位置和方式

::: code-group
```json [BP/feature_rules/overworld_underground_blocky_ore_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "overworld_underground_blocky_ore_feature",
			"places_feature": "blocky_ore_feature"
		},
		"conditions": {
			"placement_pass": "underground_pass",
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
			"iterations": 100,
			"coordinate_eval_order": "zyx",
			"x": {
				"distribution": "uniform",
				"extent": [0, 16]
			},
			"y": {
				"distribution": "uniform",
				"extent": [0, 16]
			},
			"z": {
				"distribution": "uniform",
				"extent": [0, 16]
			}
		}
	}
}
```

-   `description`
    -   `identifier` 不需要命名空间，但文件名需匹配
    -   `places_feature` 设置要控制的特征标识符
-   `conditions`
    -   `placement_pass` 控制特征生成阶段
    -   `biome_filter` 通过生物群系标签过滤生成位置（与生成规则类似）
-   `distribution`
    -   `iterations` 生成概率。设为100表示全图生成（钻石矿通常设为1）
    -   后续参数控制矿脉延伸方向（需要更多说明）

测试矿石生成建议在低Y坐标使用指令 `/fill ~15 ~5 ~15 ~-15 ~-15 ~-15 air 0 replace stone`，该指令会清除选定区域内所有石头，保留其他方块：

![](/assets/images/guide/ore_gen_sans_stone.jpg)

显然，将"iterations"设为100确实过量 ;)

建议通过研究原版特征和特征规则文件来学习更多技巧。不过上文所述内容已能满足大部分生成需求

---

## 自定义结构

自 MCBE v1.16.20 起，**支持自定义生成结构**
推荐使用前文提到的 [MACHINE_BUILDER 工具](https://machine-builder.itch.io/frg-v2)自动生成结构文件。该工具会生成三个必要文件：`feature_rules/mystructure.feature_rule.json`、`feature_rules/mystructure.feature.json` 和 `structures/mystructure.mcstructure`。更多关于使用结构块定义 `.mcstructure` 的内容请参考[此文档](/wiki/nbt/mcstructure)

---

准备好 `.mcstructure` 文件后，需要编写对应的 `feature` 和 `feature rule`。特征规则与矿石生成类似（参见前文），以下是**特征**示例（来自[特征文档](https://bedrock.dev/r/Features#minecraft:structure_template_feature)）：

::: code-group
```json [示例]
{
  "format_version": "1.13.0",
  "minecraft:structure_template_feature": {
    "description": {
      "identifier": "wiki:hot_air_balloon_feature"
    },
    "structure_name": "wiki:hot_air_balloon",
    "adjustment_radius": 8,
    "facing_direction": "random",
    "constraints": {
      "unburied": {},
      "block_intersection": {
        "block_whitelist": [
          "minecraft:air"
        ]
      }
    }
  }
}
```

-   `structure_name` 是结构块的保存标识符

至此，您已掌握在游戏中生成自定义结构的方法！

---

## 当前进度

**已完成内容：**

<Checklist>

-   [x] 创建第一个生物群系
-   [x] 实现首个自然生成的矿石
-   [x] 掌握使用 bridge. 生成原版参考文件
-   [x] 了解其他自定义生成方法
-   [x] 创建自定义结构

</Checklist>