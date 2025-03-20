---
title: 自定义釉面陶瓦
category: 原版再创作
tags:
    - 简单
mentions:
    - Kaioga5
---

# 自定义釉面陶瓦

::: tip 格式要求 & 最低引擎版本 `1.20.40`
本教程需要基础的方块制作知识，建议先阅读[方块制作指南](/wiki/blocks/blocks-intro)。
:::

## 前言

釉面陶瓦拥有独特的旋转机制，允许玩家通过不同朝向组合出适用于墙面、地面和天花板的精美图案。本教程将指导您创建类似釉面陶瓦的自定义方块。

## 自定义釉面陶瓦配置

以下配置可实现类原版釉面陶瓦的旋转效果。

::: code-group
```json [BP/blocks/custom_glazed_terracotta.json]
{
    "format_version": "1.20.40",
    "minecraft:block": {
        "description": {
            "identifier": "wiki:glazed_terracotta_template",
            "menu_category": {
                "category": "construction",
                "group": "itemGroup.name.glazedTerracotta"
            },
            "traits": {
                "minecraft:placement_direction": {
                    "enabled_states": [
                        "minecraft:cardinal_direction"
                    ]
                }
            }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                "components": {
                    "minecraft:transformation": { "rotation": [0, 0, 0] },
                    "minecraft:geometry": {
                        "identifier": "geometry.glazed_terracotta",
                        "bone_visibility": {
                            "bottom_1": false,
                            "bottom_2": false,
                            "bottom_3": false,
                            "bottom_4": true
                        }
                    }
                }
            },
            // 其他三个方向的配置结构类似
            // 此处省略西/南/东方向的配置节以保持简洁
        ],
        "components": {
            "minecraft:geometry": {
                "identifier": "geometry.glazed_terracotta"
            },
            "minecraft:material_instances": {
                "*": {
                    "texture": "purple_glazed_terracotta",
                    "render_method": "opaque"
                }
            }
        }
    }
}
```
:::

## 几何结构配置

原版釉面陶瓦通过特殊数值实现方块面的旋转效果。使用以下几何结构配置可复现该特性。

<Spoiler title="几何结构JSON">

::: code-group
```json [RP/models/blocks/glazed_terracotta.geo.json]
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.glazed_terracotta",
				"texture_width": 16,
				"texture_height": 16,
				"visible_bounds_width": 4,
				"visible_bounds_height": 3.5,
				"visible_bounds_offset": [0, 1.25, 0]
			},
			"bones": [
				// 主要骨骼定义
				{
					"name": "glazed_terracotta",
					"pivot": [0, 0, 0]
				},
				// 顶部面配置
				{
					"name": "top",
					"parent": "glazed_terracotta",
					"pivot": [0, 0, 0],
					"cubes": [
						{
							"origin": [-8, 0, -8],
							"size": [16, 16, 16],
							"uv": {
								"up": {"uv": [16, 16], "uv_size": [-16, -16}
							}
						}
					]
				},
				// 其他四个方向面配置
				// 此处省略北/南/东/西面的详细配置节
				// 底部面配置组
				{
					"name": "bottom",
					"parent": "glazed_terracotta",
					"pivot": [0, 0, 0]
				},
				// 四个底部子面配置
				{
					"name": "bottom_1",
					"parent": "bottom",
					"pivot": [0, 0, 0],
					"cubes": [
						{
							"origin": [-8, 0, -8],
							"size": [16, 0, 16],
							"uv": {
								"down": {"uv": [0, 0], "uv_size": [16, 16]}
							}
						}
					]
				}
				// 其他三个底部子面配置类似
			]
		}
	]
}
```
:::

</Spoiler>