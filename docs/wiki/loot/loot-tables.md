---
title: 战利品表
category: 文档
nav_order: 1
tags:
    - 稳定
    - 最后更新于版本1.18.10
mentions:
    - Ciosciaa
    - Etanarvazac
    - SmokeyStack
---

# 战利品表

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: warning
本文档仍在完善中。
:::

战利品表用于从预定义集合中选择一组物品。战利品表可通过以下方式调用：

- `/loot` 命令
- 容器内容物
- 方块掉落
- 钓鱼
- 生物掉落
- 生成生物的装备
- 其他各类生物行为

每次调用同一战利品表时，基于[外部条件](#)和[内在随机性](#)可能会选择不同的物品组合。这种变化性对于游戏可玩性和冒险体验至关重要，特别是在RPG元素更重的系统中。

## 集成方式
战利品表并非注册的附加包条目，而是通过路径引用。虽然可以放置在行为包任意位置，但建议遵循原版规范将其置于顶级`loot_tables`目录下。

<FolderView
	:paths="[
		'BP/loot_tables/blocks/cypress_door.json',
		'BP/loot_tables/blocks/cypress_door.json',
		'BP/loot_tables/blocks/cypress_door.json'
	]"
/>

## 结构
战利品表由包含必需属性`"pools"`数组的JSON对象表示。

::: code-group
```json [根结构]
{
	"pools": [
		…
	]
}
```

战利品表的调用结果将是所有池（pool）产出的总和。

### 池（Pools）
池是独立的物品选择单元，不同池之间的结果互不影响。

::: code-group
```json [基础池示例]
{
	"rolls": 1,
	
	"entries": [
		{
			"type": "item",
			"name": "wiki:silver"
		}
	]
}
```

存在两种池类型：通用型[加权随机池](#加权随机池)和[分层池](#分层池)，后者传统上用于生物装备选择。

#### 加权随机池
传统加权随机池根据相对权重选择物品，通过配置的roll次数决定产出数量。

::: code-group
```json [artifacts.json/pools/0]
{
	"rolls": {
		"min": 2,
		"max": 4
	},
	
	"entries": [
		{
			"type": "item",
			"name": "minecraft:golden_apple",
			"weight": 20
		},
		{
			"type": "item",
			"name": "minecraft:appleEnchanted",
			"weight": 1
		},
		{
			"type": "item",
			"name": "minecraft:name_tag",
			"weight": 30
		}
	]
}
```

##### 抽取次数（Rolls）

###### 附加抽取（Bonus Rolls）
可通过可选属性`"bonus_rolls"`基于玩家幸运值调整抽取次数。

```json
// 示例待补充
```

##### 条目权重
权重值决定条目被选中的概率。权重相对于其他条目越高，选中几率越大。

```json
"weight": 3
```

###### 质量（Quality）
通过quality属性可根据玩家幸运值调整条目权重。

```json
"quality": 2
```

当前仅在使用附有"海之眷顾"附魔的钓鱼竿时生效。

#### 分层池
分层池用于从集合中精确选择一个条目。

::: code-group
```json [分层池示例]
{
	"tiers": {
		"initial_range": 2,
		
		"bonus_rolls": 3,
		"bonus_chance": 0.095
	},

	"entries": [
		{
			"type": "loot_table",
			"name": "loot_tables/entities/armor_set_leather.json"
		},
		{
			"type": "loot_table",
			"name": "loot_tables/entities/armor_set_gold.json"
		},
		{
			"type": "loot_table",
			"name": "loot_tables/entities/armor_set_chain.json"
		},
		{
			"type": "loot_table",
			"name": "loot_tables/entities/armor_set_iron.json"
		},
		{
			"type": "loot_table",
			"name": "loot_tables/entities/armor_set_diamond.json"
		}
	]
}
```

当包含`"tiers"`对象属性时即构成分层池：

```json
"tiers": {
	"initial_range": 2,
	
	"bonus_rolls": 3,
	"bonus_chance": 0.095
}
```

分层池中的条目具有顺序性。选择过程分为两个阶段：

1. 初始索引：在1到`"initial_range"`间随机选取整数
2. 附加尝试：进行`"bonus_rolls"`次成功率`"bonus_chance"`的检定，每次成功索引+1

最终索引对应条目将被选中（索引从1开始）。若索引超出条目总数则不产出。

::: warning
分层池中条目的[条件](#)将被忽略，但池级别的条件仍然有效。
:::

### 条目（Entries）
条目是池中的可选项，包含三种类型。

```json
// 示例待补充
```

#### 物品条目
基础条目类型，用于选择具体物品。

```json
// 示例待补充
```

#### 战利品表条目
支持嵌套调用其他战利品表。

```json
// 示例待补充
```

#### 空条目
选中时不产生任何物品。

```json
"type": "empty",
"weight": 4
```

空条目的作用可通过[0次抽取](#)、[随机条件](#)或[数量函数](#)实现，主要优势在于提升[加权随机池](#)的可读性。

### 函数（Functions）
函数赋予战利品表强大功能，可实现：

- 调整物品数量
- 添加附魔（包括不可附魔物品）
- 修改物品名称和描述
- 编写书籍内容

详见[物品函数文档](/wiki/loot/item-functions)。

::: code-group
```json [artifacts.json/pools/entries]
{
	"type": "item",
	"name": "minecraft:dirt",
	"weight": 10,
	"functions": [
		{
			"function": "set_count",
			"count": {
				"min": 16,
				"max": 64
			}
		},
		{
			"function": "set_name",
			"name": "Pile of dirt"
		}
	]
}
```

### 条件（Conditions）
条件用于检测特定标准是否满足，例如：

- 僵尸是否被玩家击杀
- 武器是否附有抢夺附魔及其等级

::: code-group
```json [artifacts.json/pools/entries]
{
	"conditions": [
		{
			"condition": "killed_by_player"
		},
		{
			"condition": "random_chance_with_looting",
			"chance": 0.025,
			"looting_multiplier": 0.01
		}
	],
	"rolls": 1,
	"entries": [
		{
			"type": "item",
			"name": "minecraft:iron_ingot",
			"weight": 1
		},
		{
			"type": "item",
			"name": "minecraft:carrot",
			"weight": 1
		},
		{
			"type": "item",
			"name": "minecraft:potato",
			"weight": 1
		}
	]
}
```

## 覆盖规则