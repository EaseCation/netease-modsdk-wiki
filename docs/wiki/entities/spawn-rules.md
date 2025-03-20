---
title: 实体生成规则
category: 基础
mentions:
    - SirLich
    - solvedDev
    - MedicalJewel105
    - aexer0e
    - Ciosciaa
    - FrankyRay
    - Luthorius
    - TheItsNameless
    - SmokeyStack
---

# 实体生成规则

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

生成规则定义了实体如何自然生成到世界中。当您希望自定义实体像原版实体一样自然生成时，应该使用生成规则。通过不同的组件可以定义实体生成的时间、地点和方式。

通常情况下，可以让您的自定义实体采用与原版实体类似的生成方式。例如：像牛一样群生成、像原版僵尸一样仅在夜间生成，或是像鱼类只在水下生成。

## 生成规则示例

以下是一个包含字段说明的生成规则示例：

::: code-group
```json [BP/spawn_rules/zombie.json]
{
	"format_version": "1.8.0",
	"minecraft:spawn_rules": {
		"description": {
			"identifier": "minecraft:zombie",
			"population_control": "monster"
		},
		"conditions": [
			{
				"minecraft:spawns_on_surface": {},
				"minecraft:spawns_underground": {},
				"minecraft:brightness_filter": {
					"min": 0,
					"max": 7,
					"adjust_for_weather": true
				},
				"minecraft:difficulty_filter": {
					"min": "easy",
					"max": "hard"
				},
				"minecraft:weight": {
					"default": 100
				},
				"minecraft:herd": {
					"min_size": 2,
					"max_size": 4
				},
				"minecraft:permute_type": [
					{
						"weight": 95
					},
					{
						"weight": 5,
						"entity_type": "minecraft:zombie_villager"
					}
				],
				"minecraft:biome_filter": {
					"test": "has_biome_tag",
					"operator": "==",
					"value": "monster"
				}
			}
		]
	}
}
```
:::

-   `description`→`identifier`: 要生成的实体
-   `population_control`: 控制生成与消失的数量。可选值：`animal`（动物）、`underwater_animal`（水生动物）、`monster`（怪物）、`ambient`（环境生物）
-   `conditions`: 必须满足的条件列表，生成尝试才会成功
-   `minecraft:spawns_on_surface`（地表生成）、`minecraft:spawns_underground`（地下生成）和`minecraft:spawns_underwater`（水下生成）控制实体生成的高度范围
-   `minecraft:brightness_filter`（亮度过滤）取值范围 0-15，控制生成所需光照条件。`adjust_for_weather`选项用于雨天/雷暴天气下是否自动降低有效光照值
-   `minecraft:difficulty_filter`（难度过滤）设置启用生成的游戏难度范围
-   `minecraft:herd`（群体生成）设置基于同个生成规则一起生成的实体数量
-   `minecraft:permute_type`（类型置换）通过`weight`权重和`entity_type`实体类型设置生成实体变异的概率
-   `minecraft:biome_filter`（生物群系过滤）测试特定生物群系标签。具体过滤器语法和生物群系标签列表请参考官方文档，或查看原版示例资源包

## 全部已知组件

以下是所有已知组件列表（随着我们对使用方法的理解加深，将持续补充说明文档）：

```
minecraft:weight
minecraft:density_limit
minecraft:spawns_on_block_filter
minecraft:spawns_on_block_prevented_filter
minecraft:spawns_above_block_filter
minecraft:herd
minecraft:permute_type
minecraft:brightness_filter
minecraft:height_filter
minecraft:spawns_on_surface
minecraft:spawns_underground
minecraft:spawns_underwater
minecraft:disallow_spawns_in_bubble
minecraft:spawns_lava
minecraft:biome_filter
minecraft:difficulty_filter
minecraft:distance_filter
minecraft:is_experimental
minecraft:world_age_filter
minecraft:delay_filter
minecraft:mob_event_filter
minecraft:is_persistent
minecraft:player_in_village_filter
```

## 组件文档

### minecraft:herd

::: code-group
```json
"minecraft:herd": {
          "min_size": 1,
          "max_size": 2,
          "event":"minecraft:entity_born",
          "event_skip_count": 1
        },
```
:::

-   `minecraft:herd`可通过此配置使第二个生成的实体（在此场景中）携带`minecraft:entity_born`事件（表现为幼体）。`event_skip_count`: 2`表示前两个生成的实体不会触发事件，之后生成的都会携带该事件。该功能适用于任意事件类型

### minecraft:spawns_above_block_filter

::: code-group
```json
        "minecraft:spawns_above_block_filter": {
          "blocks": "minecraft:stone",
          "distance": 10
        }
```
:::

-   `minecraft:spawns_above_block_filter`（上方方块过滤）会检测垂直方向设定距离内的方块，当条件满足时允许实体生成

### minecraft:spawns_on_block_prevented_filter

::: code-group
```json
        "minecraft:spawns_on_block_prevented_filter": [
          "minecraft:nether_wart_block",
          "minecraft:shroomlight"
        ]
```
:::

-   `minecraft:spawns_on_block_prevented_filter`（禁止生成方块过滤）与上方组件功能相反。该数组包含实体永远无法生成于其上的方块标识符