---
title: 生成自定义结构
category: 巧思案例
mentions:
    - DerpMcaddon
    - SirLich
tags:
    - experimental
---

# 生成自定义结构

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

结构特征是游戏世界生成的基础功能之一，用于在游戏中放置导出的`.mcstructure`文件。
本教程将教你如何生成：

- 地表结构

- 地下结构

- 浮空结构

- 水下结构

- 水面结构

:::tip
若要在安卓设备导出结构文件，可使用此[资源包](https://mcpedl.com/export-structure-button-android-addon/)
:::

请确保将`.mcstructure`文件放置在`BP/structures/`目录下！

## 地表结构

### 特征文件

::: code-group
```json [BP/features/house_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:structure_template_feature": {
		"description": {
			"identifier": "wiki:house_feature"
		},
		"structure_name": "mystructure:house",
		"adjustment_radius": 4,
		"facing_direction": "random",
		"constraints": {
			"grounded": {},
			"unburied": {},
			"block_intersection": {
				"block_allowlist": [
					"minecraft:air" //结构只能替换空气方块
				]
			}
		}
	}
}
```
:::

### 特征规则

::: code-group
```json [BP/feature_rules/plains_house_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:plains_house_feature",
			"places_feature": "wiki:house_feature"
		},
		"conditions": {
			"placement_pass": "first_pass",
			"minecraft:biome_filter": {
				"test": "has_biome_tag",
				"operator": "==",
				"value": "plains"
			}
		},
		"distribution": {
			"iterations": 1,
			"x": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"y": "q.heightmap(v.worldx, v.worldz)", //在区块最高点生成结构
			"z": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"scatter_chance": {
				"numerator": 1,
				"denominator": 25
			}
		}
	}
}
```
:::

![](/assets/images/world-generation/structure-features/house.png)

## 地下结构

### 特征文件

::: code-group
```json [BP/features/bunker_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:structure_template_feature": {
		"description": {
			"identifier": "wiki:bunker_feature"
		},
		"structure_name": "mystructure:bunker",
		"adjustment_radius": 4,
		"facing_direction": "random",
		"constraints": {
			"block_intersection": {
				"block_allowlist": [
					"minecraft:air", //结构只能替换空气和石头
					"minecraft:stone"
				]
			}
		}
	}
}
```
:::

### 特征规则

::: code-group
```json [BP/feature_rules/overworld_bunker_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:overworld_bunker_feature",
			"places_feature": "wiki:bunker_feature"
		},
		"conditions": {
			"placement_pass": "first_pass",
			"minecraft:biome_filter": {
				"test": "has_biome_tag",
				"operator": "==",
				"value": "overworld"
			}
		},
		"distribution": {
			"iterations": 1,
			"x": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"y": {
				"extent": [
					11, //结构将在y11至y50之间生成
					50
				],
				"distribution": "uniform"
			},
			"z": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"scatter_chance": {
				"numerator": 1,
				"denominator": 15
			}
		}
	}
}
```
:::

![](/assets/images/world-generation/structure-features/bunker.png)

## 浮空结构

### 特征文件

::: code-group
```json [BP/features/balloon_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:structure_template_feature": {
		"description": {
			"identifier": "wiki:balloon_feature"
		},
		"structure_name": "mystructure:balloon",
		"adjustment_radius": 4,
		"facing_direction": "random",
		"constraints": {
			"block_intersection": {
				"block_allowlist": [
					"minecraft:air" //结构只能替换空气
				]
			}
		}
	}
}
```
:::

### 特征规则

::: code-group
```json [BP/feature_rules/overworld_balloon_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:overworld_baloon_feature",
			"places_feature": "wiki:balloon_feature"
		},
		"conditions": {
			"placement_pass": "first_pass",
			"minecraft:biome_filter": {
				"test": "has_biome_tag",
				"operator": "==",
				"value": "overworld"
			}
		},
		"distribution": {
			"iterations": 1,
			"x": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"y": {
				"extent": [
					100, //结构将在y100至y200之间生成
					200
				],
				"distribution": "uniform"
			},
			"z": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"scatter_chance": {
				"numerator": 1,
				"denominator": 25
			}
		}
	}
}
```
:::

![](/assets/images/world-generation/structure-features/balloon.png)

## 水下结构

:::tip
对于水下结构，请确保对结构进行水淹处理，因为Minecraft不会自动进行水淹操作！
:::

### 特征文件

::: code-group
```json [BP/features/aqua_temple_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:structure_template_feature": {
		"description": {
			"identifier": "wiki:aqua_temple_feature"
		},
		"structure_name": "mystructure:aqua_temple",
		"adjustment_radius": 4,
		"facing_direction": "random",
		"constraints": {
			"block_intersection": {
				"block_allowlist": [
					"minecraft:water" //结构只能替换水方块
				]
			}
		}
	}
}
```
:::

### 特征规则

::: code-group
```json [BP/feature_rules/ocean_aqua_temple_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:ocean_aqua_temple_feature",
			"places_feature": "wiki:aqua_temple_feature"
		},
		"conditions": {
			"placement_pass": "first_pass",
			"minecraft:biome_filter": {
				"test": "has_biome_tag",
				"operator": "==",
				"value": "ocean"
			}
		},
		"distribution": {
			"iterations": 1,
			"x": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"y": "q.above_top_solid(v.worldx, v.worldz)", //将结构放置在最高固体方块顶部，避免生成在水面
			"z": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"scatter_chance": {
				"numerator": 1,
				"denominator": 25
			}
		}
	}
}
```
:::

![](/assets/images/world-generation/structure-features/aqua_temple.png)

## 水面结构

### 特征文件

::: code-group
```json [BP/features/raft_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:structure_template_feature": {
		"description": {
			"identifier": "wiki:raft_feature"
		},
		"structure_name": "mystructure:raft",
		"adjustment_radius": 4,
		"facing_direction": "random",
		"constraints": {
			"block_intersection": {
				"block_allowlist": [
					"minecraft:water", //结构只能替换水和空气
					"minecraft:air"
				]
			}
		}
	}
}
```
:::

### 特征规则

::: code-group
```json [BP/feature_rules/ocean_raft_feature.json]
{
	"format_version": "1.13.0",
	"minecraft:feature_rules": {
		"description": {
			"identifier": "wiki:ocean_raft_feature",
			"places_feature": "wiki:raft_feature"
		},
		"conditions": {
			"placement_pass": "first_pass",
			"minecraft:biome_filter": {
				"test": "has_biome_tag",
				"operator": "==",
				"value": "ocean"
			}
		},
		"distribution": {
			"iterations": 1,
			"x": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"y": 62, //结构将在y62（默认水位高度）生成
			"z": {
				"extent": [0, 16],
				"distribution": "uniform"
			},
			"scatter_chance": {
				"numerator": 1,
				"denominator": 25
			}
		}
	}
}
```
:::

![](/assets/images/world-generation/structure-features/raft.png)