---
title: 自定义武器
category: 巧思案例
tags:
    - 实验性
mentions:
    - SirLich
    - solvedDev
    - MedicalJewel105
    - aexer0e
    - PepijnMC
    - ThomasOrs
    - Xterionix
---

# 自定义武器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

自1.16.100版本更新以来，制作自定义武器变得非常简单。您只需在`BP/items`文件夹中定义物品条目，并在`RP/textures/items`文件夹中提供相应纹理，稍作配置即可获得功能完整的可定制武器。

## 自定义剑类物品

与其他物品教程类似，我们先从制作基础剑类物品开始。

::: code-group
```json [BP/items/my_sword.json]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "wiki:my_sword",
			// 注意我们将其归类为装备
			"category": "equipment"
		},
		"components": {
			// 这样可以将剑放置在创造模式下的剑类物品栏中
			"minecraft:creative_category": {
				"parent": "itemGroup.name.sword"
			},
			"minecraft:max_stack_size": 1,
			// 新增配置使物品可手持
			"minecraft:hand_equipped": true,
			"minecraft:durability": {
				"max_durability": 600
			},
			// 按需设置伤害值
			"minecraft:damage": 10,
			// 允许在"sword"槽位附魔
			"minecraft:enchantable": {
				"value": 10,
				"slot": "sword"
			},
			// 该纹理同时用于物品栏和手持模型
			"minecraft:icon": {
				"texture": "my_sword"
			},
			"minecraft:display_name": {
				"value": "我的自定义剑"
			},
			// 允许使用木棍修复
			"minecraft:repairable": {
				"repair_items": [
					{
						"items": ["minecraft:stick"],
						"repair_amount": "context.other->q.remaining_durability + 0.05 * context.other->q.max_durability"
					}
				]
			}
		}
	}
}
```

```json [RP/textures/item_texture.json]
{
	"resource_pack_name": "vanilla",
	"texture_name": "atlas.items",
	"texture_data": {
		"my_sword": {
			// 确保已添加名为my_sword.png的纹理
			"textures": "textures/items/my_sword"
		}
	}
}
```
:::

若需示例纹理，可将下方图片另存为`my_sword.png`并放入`RP/textures/items`目录。

![](/assets/images/tutorials/custom-weapons/my_sword.png)

<BButton link="https://raw.githubusercontent.com/Bedrock-OSS/bedrock-wiki/wiki/docs/public/assets/images/tutorials/custom-weapons/my_sword.png">点击此处下载纹理</BButton>

## 游戏内效果

完成BP物品配置和RP纹理添加后，创建新世界时需加载这两个包，并**在实验性玩法中启用假日创作者功能**。

进入创造模式后，可通过名称搜索或剑类物品栏找到您的自定义武器。

![](/assets/images/tutorials/custom-weapons/custom_sword.jpg)

手持时效果如下：

![](/assets/images/tutorials/custom-weapons/held_sword.jpg)

## 工具类功能扩展

可通过添加`minecraft:digger`等组件实现特殊挖掘功能：

::: code-group
```json [BP/items/my_sword.json#components]
"minecraft:digger": {
    "use_efficiency": true,
    "destroy_speeds": [
        {
            "block": "minecraft:web",
            "speed": 15
        },
        {
            "block": "minecraft:bamboo",
            "speed": 10
        }
    ],
	"on_dig":{
		"event": "wiki:my_sword.on_dig_damage"
		// 用于改变武器耐久度
	}
}
```

```json [BP/items/my_sword.json]
"events": {
    "wiki:my_sword.on_dig_damage": {
		"damage":{
			// 该事件会使武器在挖掘时损耗耐久
			"type":"durability",
			"target":"self",
			// 使用"self"指定物品自身承受损耗
			"amount":1
		}
	}
}
```
:::

## 伤害数值显示

添加`"minecraft:weapon": {}`组件可在物品提示中显示攻击伤害值。

## 特殊能力与耐久系统

通过武器组件触发事件实现特殊效果：

::: code-group
```json [BP/items/my_sword.json#components]
"minecraft:weapon": {
    "on_hurt_entity": {
        "event": "wiki:my_sword.hurt_entity"
    }
}
```

```json [BP/items/my_sword.json]
"events": {
    "wiki:my_sword.hurt_entity": {
		"sequence":[
			{
				"randomize": [
					{
						// 权重值为1
						"weight": 1,
						// 在8x8x8范围内传送持有者
						"teleport": {
							"target": "holder",
							"max_range": [8,8,8]
						},
						// 显示提示文本
						"run_command":{
							"command":[
								"tellraw @s{\"rawtext\":[{\"text\":\"§a剑身发出光芒§r\"}]}"
							]
						}
					},
					{
						// 占位权重值
						"weight": 3
					}
				]
			},
			{
				// 损耗武器耐久度
				"damage":{
					"type":"durability",
					"target":"self",
					"amount":1
				}
			}
		]
    }
}
```
:::

## 合成配方示例

::: code-group
```json [BP/recipes/my_sword.json]
{
	"format_version": "1.12.0",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "wiki:my_sword"
		},
		"tags": ["crafting_table"],
		"pattern": ["e", "E", "#"],
		"key": {
			"#": {
				"item": "minecraft:stick"
			},
			"E": {
				"item": "minecraft:ender_eye"
			},
			"e": {
				"item": "minecraft:ender_pearl"
			}
		},
		"result": {
			"item": "wiki:my_sword"
		}
	}
}
```
:::

![](/assets/images/tutorials/custom-weapons/sword_recipe.jpg)

现在您已掌握制作自定义武器的基本方法，可以尝试扩展更多创意功能！