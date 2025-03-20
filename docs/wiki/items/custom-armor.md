---
title: 自定义盔甲
category: 巧思案例
tags:
    - experimental
mentions:
    - SirLich
    - Dreamedc2015
    - sermah
    - yanasakana
    - Joelant05
    - MedicalJewel105
    - aexer0e
    - Brougud
    - XxPoggyisLitxX
    - LeGend077
    - SmokeyStack
---

# 自定义盔甲

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
强烈建议在开始本节内容前，先阅读[BlockBench建模与纹理制作指南](/wiki/guide/blockbench)中的新手引导部分。
:::

制作自定义盔甲其实非常简单，虽然需要处理多个文件并进行一些纹理调整，但你可以根据自己的需求选择工作量。

## 胸甲部分

创建胸甲物品：

::: code-group
```json [BP/items/my_chest.json]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "wiki:my_chest",
			// 注意我们将其归类为装备
			"category": "equipment"
		},
		"components": {
			// 确保出现在胸甲分类中
			"minecraft:creative_category": {
				"parent": "itemGroup.name.chestplate"
			},
			// 物品栏中显示的图标
			"minecraft:icon": {
				"texture": "my_chest"
			},
			// 物品名称
			"minecraft:display_name": {
				"value": "我的自定义盔甲"
			},
			// 禁止堆叠
			"minecraft:max_stack_size": 1,
			// 仅接受胸甲部位附魔
			"minecraft:enchantable": {
				"value": 10,
				"slot": "armor_torso"
			},
			// 护甲值设置
			"minecraft:armor": {
				"protection": 5
			},
			// 修复材料设置
			"minecraft:repairable": {
				"repair_items": [
					{
						"items": ["minecraft:stick"],
						"repair_amount": "context.other->q.remaining_durability + 0.05 * context.other->q.max_durability"
						// 复杂molang表达式，直接复制即可
					}
				]
			},
			// 穿戴设置（胸部槽位）
			"minecraft:wearable": {
				"dispensable": true,
				"slot": "slot.armor.chest"
			},
			// 耐久度设置
			"minecraft:durability": {
				"max_durability": 200
			}
		}
	}
}
```

此时你只需在`RP/textures/item_texture.json`中添加名为`my_chest`的纹理即可。我们提供了默认纹理供参考：

![](/assets/images/tutorials/custom-armor/custom_chestplate.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-armor/custom_chestplate.png">点击此处下载纹理</BButton>

## 添加附着物与纹理

现在需要配置盔甲模型附着物：

::: code-group
```json [RP/attachables/my_chest.json]
{
	"format_version": "1.8.0",
	"minecraft:attachable": {
		"description": {
			"identifier": "wiki:my_chest",
			// 必需材质配置
			"materials": {
				"default": "armor",
				"enchanted": "armor_enchanted"
			},
			"textures": {
				// 自定义盔甲纹理路径
				"default": "textures/models/armor/custom_main",
				// 保留默认附魔光效
				"enchanted": "textures/misc/enchanted_item_glint"
			},
			// 使用胸甲模型
			"geometry": {
				"default": "geometry.player.armor.chestplate"
			},
			// 隐藏默认胸甲层
			"scripts": {
				"parent_setup": "v.chest_layer_visible = 0.0;"
			},
			// 使用标准渲染控制器
			"render_controllers": ["controller.render.armor"]
		}
	}
}
```

下载配套纹理文件：

![](/assets/images/tutorials/custom-armor/custom_main.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-armor/custom_main.png">下载主纹理</BButton>

![](/assets/images/tutorials/custom-armor/custom_legs.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-armor/custom_legs.png">下载腿部纹理</BButton>

> 实际开发中建议使用BlockBench预览模型效果

## 护腿部分

创建护腿物品：

::: code-group
```json [BP/items/my_leggings.json]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "wiki:my_leggings",
			"category": "equipment"
		},
		"components": {
			// 护腿分类
			"minecraft:creative_category": {
				"parent": "itemGroup.name.leggings"
			},
			"minecraft:icon": {
				"texture": "my_leggings"
			},
			"minecraft:display_name": {
				"value": "我的自定义护腿"
			},
			"minecraft:max_stack_size": 1,
			// 腿部附魔槽
			"minecraft:enchantable": {
				"value": 10,
				"slot": "armor_legs"
			},
			"minecraft:armor": {
				"protection": 3
			},
			"minecraft:repairable": { /* 同胸甲配置 */ },
			// 腿部穿戴槽
			"minecraft:wearable": {
				"dispensable": true,
				"slot": "slot.armor.legs"
			},
			"minecraft:durability": {
				"max_durability": 200
			}
		}
	}
}
```

护腿纹理下载：

![](/assets/images/tutorials/custom-armor/custom_leggings.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-armor/custom_leggings.png">下载护腿纹理</BButton>

附着物配置：

::: code-group
```json [RP/attachables/my_leggings.json]
{
	"format_version": "1.8.0",
	"minecraft:attachable": {
		"description": {
			"identifier": "wiki:my_leggings",
			"materials": { /* 同胸甲配置 */ },
			"textures": {
				"default": "textures/models/armor/custom_legs",
				"enchanted": "textures/misc/enchanted_item_glint"
			},
			// 使用护腿模型
			"geometry": {
				"default": "geometry.humanoid.armor.leggings"
			},
			// 隐藏默认腿部层
			"scripts": {
				"parent_setup": "v.leg_layer_visible = 0.0;"
			},
			"render_controllers": ["controller.render.armor"]
		}
	}
}
```

## 头盔部分

头盔物品配置：

::: code-group
```json [BP/items/my_helm.json]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": { /* 基础配置 */ },
		"components": {
			// 头盔分类
			"minecraft:creative_category": {
				"parent": "itemGroup.name.helmet"
			},
			// 头部附魔槽
			"minecraft:enchantable": {
				"value": 10,
				"slot": "armor_head"
			},
			// 头部穿戴槽
			"minecraft:wearable": {
				"dispensable": true,
				"slot": "slot.armor.head"
			},
			/* 其他配置同前 */
		}
	}
}
```

头盔纹理下载：

![](/assets/images/tutorials/custom-armor/custom_helmet.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-armor/custom_helmet.png">下载头盔纹理</BButton>

## 靴子部分

靴子物品配置：

::: code-group
```json [BP/items/my_boots.json]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"components": {
			// 靴子分类
			"minecraft:creative_category": {
				"parent": "itemGroup.name.boots"
			},
			// 足部附魔槽
			"minecraft:enchantable": {
				"value": 10,
				"slot": "armor_feet"
			},
			// 足部穿戴槽
			"minecraft:wearable": {
				"dispensable": true,
				"slot": "slot.armor.feet"
			},
			/* 其他配置同前 */
		}
	}
}
```

靴子纹理下载：

![](/assets/images/tutorials/custom-armor/custom_boots.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-armor/custom_boots.png">下载靴子纹理</BButton>

## 套装效果（进阶）

在`player.json`中添加伤害检测与事件响应：

::: code-group
```json [BP/entities/player.json#components]
"minecraft:damage_sensor": {
	"triggers": {
		"on_damage": {
			"filters": {
				"all_of": [
					// 检测全身装备
					{ "test": "has_equipment", "domain": "head", "value": "wiki:my_helm" },
					{ "test": "has_equipment", "domain": "torso", "value": "wiki:my_chest" },
					{ "test": "has_equipment", "domain": "leg", "value": "wiki:my_leggings" },
					{ "test": "has_equipment", "domain": "feet", "value": "wiki:my_boots" }
				]
			},
			"event": "wiki:armor_sets.my_custom.taken_damage"
		}
	}
}
```

```json [BP/entities/player.json#events]
"wiki:armor_sets.my_custom.taken_damage": {
	"randomize": [
		{
			"weight": 1,
			"sequence": [
				{
					// 传送攻击者
					"run_command": {
						"command": "spreadplayers ~~ 5 20 @s",
						"target": "other"
					}
				},
				{
					// 发送提示信息
					"run_command": {
						"command": "tellraw @s{\"rawtext\":[{\"text\":\"§a盔甲发光，敌人消失了！\"}]}"
					}
				}
			]
		},
		{ "weight": 20 }
	]
}
```

完成效果展示：

![](/assets/images/tutorials/custom-armor/custom-set-image.jpg)

> 提示：建议使用最少纹理数量优化性能。通过组合使用主纹理和腿部纹理即可完成全套盔甲效果。