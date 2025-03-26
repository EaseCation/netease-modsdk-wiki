---
title: 交易表
category: 文档
nav_order: 2
tags:
    - 稳定版
    - 最后更新于版本1.18.10
mentions:
    - Ciosciaa
    - SirLich
    - TheItsNameless
---

# 交易表

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

交易表是实体进行物品交易的基础数据载体。交易表不能独立使用，必须通过[实体组件](https://bedrock.dev/docs/stable/Entities#minecraft%3Aeconomy_trade_table)引用。利用交易表提供的随机化特性，即使多个实体实例引用同一交易表，其交易报价、物品数量和成本计算也可能各不相同。

![](/assets/images/loot/trade_tables/trading.png)

交易表没有标识符或版本控制。与战利品表类似，交易表不支持Molang，而是依赖JSON结构（如范围对象和[函数](#functions)）。虽然结构不同，交易表仍支持注释功能。

## 集成方式

交易表不属于核心附加系统（如方块或生物群系）。它们不是通过放置在特定文件夹来注册，而是通过实体引用。交易表可以放置在行为包的任何位置。

::: tip
建议遵循原版规范，将所有交易表放在行为包的顶级`trading`目录下。在此目录下可采用任意层级结构。
:::

<FolderView
	:paths="[
		'BP/trading/minister.json',
		'BP/trading/economy_trades/cleric_trades.json'
	]"
/>

下文将通过一个贯穿文档的示例进行分析：

::: details 交易表示例文件

::: code-group
```json [BP/trading/minister.json]
{
	"tiers": [
		{
			"groups": [
				{
					"num_to_select": 1,
					
					"trades": [
						{
							"wants": [
								{
									"item": "wiki:blessing_glyph",
									"quantity": {
										"min": 2,
										"max": 4
									},
									
									"price_multiplier": 0.5
								},
								{
									"item": "minecraft:book"
								}
							],
							"gives": [
								{
									"item": "minecraft:enchanted_book",
									"functions": [
										{
											"function": "enchant_book_for_trading",
											
											"base_cost": 4,
											"base_random_cost": 12,
											"per_level_cost": 4,
											"per_level_random_cost": 8
										}
									]
								}
							],
							"max_uses": 7,
							
							"trader_exp": 3
						},
						{
							"wants": [
								{
									"item": "wiki:crystalline_spiritite",
									"quantity": 32,
									
									"price_multiplier": 0.125
								}
							],
							"gives": [
								{
									"item": "wiki:exalted_blade",
									"functions": [
										{
											"function": "enchant_with_levels",
											
											"treasure": true,
											"levels": {
												"min": 15,
												"max": 25
											}
										}
									]
								}
							],
							"max_uses": 2,
							
							"reward_exp": false,
							"trader_exp": 8
						}
					]
				}
			]
		},
		{
			"total_exp_required": 28,
			
			"trades": [
				{
					"wants": [
						{
							"choice": [
								{
									"item": "wiki:sacred_stones",
									"quantity": {
										"min": 4,
										"max": 6
									},
									
									"price_multiplier": 0.5
								},
								{
									"item": "wiki:blessed_beads",
									"quantity": {
										"min": 16,
										"max": 24
									},
									
									"price_multiplier": 0.5
								}
							]
						}
					],
					"gives": [
						{
							"item": "wiki:aeleon_jewels",
							"quantity": {
								"min": 4,
								"max": 6
							}
						}
					],
					"max_uses": 2
				}
			]
		}
	]
}
```
:::

## 结构

交易表采用无版本、无命名空间的JSON对象结构。

::: code-group
```json [#]
{
	"tiers": [
		{
			"groups": […]
		},
		{
			"total_exp_required": 28,
			"trades": […]
		}
	]
}
```
:::

交易表使用[层级(tiers)](#tiers)来组织交易结构。层级通过顶层的必需数组属性`"tiers"`定义。层级会按照顺序显示在交易界面中。

### 交易层级

层级代表可解锁的交易集合，是交易表中的最高级分组单位。

::: code-group
```json [#/tiers/0]
{
	"groups": […]
}
```
:::

::: code-group
```json [#/tiers/1]
{
	"total_exp_required": 28,
	"trades": […]
}
```
:::

每个层级必须包含[交易(trades)](#trades)数组（`"trades"`）或[交易组(groups)](#groups)数组（`"groups"`）中的至少一个属性。如果指定交易数组，该层级将显示所有列出的交易。如果指定交易组数组，则根据组配置从所有列出的组中选择交易。

::: tip 注意
如果同时指定`"trades"`和`"groups"`，系统会优先使用groups而忽略trades声明。
:::

在层级内部，交易会按照定义顺序显示。如果交易分组，各组及其内部交易也会按定义顺序组织。不同组的交易在视觉上没有区分，只有层级会进行视觉分隔和标识。

#### 经验需求

当交易者达到经验阈值时，层级会被解锁。每个交易者有独立的累计经验值，通过与玩家交易获得。每次交易获得的经验量取决于该交易的[交易者经验奖励](#trader-experience)。可选属性`"total_exp_required"`指定交易者解锁该层级所需的总经验值。

::: code-group
```json [#/tiers/1/]
"total_exp_required": 28
```
:::

默认情况下，所需经验值等于交易层级的索引值。因此第二层需要交易者有1点经验，第三层需要2点，以此类推。[无论设置如何](#initial-tier-experience)，第一层级总是自动解锁。

#### 层级解锁机制

层级按顺序解锁。当新层级解锁时，系统会检查后续层级是否满足当前经验值的阈值要求。如果满足则继续解锁后续层级，依此类推。在以下情况会触发层级解锁检查：(1) 获得的交易者经验足以解锁多个层级时；(2) 游戏正确更新后，[提供的初始经验](#initial-tier-experience)可以解锁后续层级时。

::: tip 注意
由于层级是逐个检查的，如果某个层级的经验要求未满足导致解锁中断，即使后续层级的经验要求已满足，也不会继续检查。
:::

##### 初始层级经验

第一层级的非零经验阈值有特殊处理：如果为负数，将解锁所有层级；如果大于0，交易者的初始经验值将被设为该值。

::: warning
当第一层级的经验阈值非零时，需要手动更新才能使交易者的交易界面正确反映交易表实际状态。此时需要进行一次交易或关闭再重新打开交易界面才能正确更新界面显示。初始时即使其他层级应该解锁，也只会显示第一层级。
:::

##### 层级冻结

除[初始层级](#initial-tier-experience)外，可以将交易冻结在某个层级：

::: code-group
```json [示例层级冻结]
"total_exp_required": -1
```
:::

当上一层级解锁时，经验要求为负数的层级会立即解锁（[符合预期](#tier-unlocking)），但玩家将无法继续解锁后续任何层级。

### 交易组

交易组用于随机选择单个交易者在某个层级应该使用的交易。

::: code-group
```json [#/tiers/0/groups/0]
{
	"num_to_select": 1,
	"trades": […]
}
```
:::

通过必需的`"trades"`数组指定候选交易，每个条目都是一个[交易](#trades)。可选属性`"num_to_select"`表示每个交易者实例在该层级选择交易的数量。如果`"num_to_select"`为0（默认值），将选择所有交易。

::: tip 注意
交易组不支持嵌套以实现高级概率选择。
:::

::: tip
目前无法随机选择数量，也无法按交易设置权重。但可以通过在数组中重复交易条目来有效增加其被选中的概率。
:::

### 交易

交易代表交易者与玩家之间的物品交换。

::: code-group
```json [#/tiers/0/trades/1]
{
	"wants": […],
	"gives": […],
	"max_uses": 2,
	"reward_exp": false,
	"trader_exp": 8
}
```
:::

一旦交易被选入交易槽，其基本内容不会改变。只有[数量](#quantity)在某些情况下可能被修改。

::: tip
单个交易定义可以影响交易之外的内容。值得注意的是，实体可以[持有特定物品](https://bedrock.dev/docs/stable/Entities#minecraft%3Abehavior.trade_interest)来响应玩家持有的物品。
:::

#### 需求与给予物品

基础交易单元通过`"wants"`和`"gives"`声明：玩家用`"wants"`交换`"gives"`。这两个属性都是必需的数组。

::: code-group
```json [#/tiers/0/trades/1/]
"wants": […],
"gives": […]
```
:::

每笔交易可以有1-2个需求条目，必须有1个给予条目。每个条目可以是[物品](#items)或[选择项](#choices)。

交易界面会根据需求物品数量自动调整。某些情况下，[数量修改附魔函数](#quantity-modifying-enchantment-functions)等交易修饰符只影响第一个需求物品。

::: tip 注意
如果条目对象同时包含item和choice属性，只有choice部分会被考虑，item部分将被忽略。
:::

#### 交易次数限制

交易者通常只能在补充库存前执行有限次数的单个交易。数值属性`"max_uses"`配置这个限制次数。

::: code-group
```json [#/tiers/0/trades/1/]
"max_uses": 2
```
:::

交易限制是每个交易独立的。一个交易的库存减少不会影响另一个交易，即使两者需求与给予物品完全相同。默认情况下，交易者可以在需要补充前执行7次单个交易。

::: tip 注意
补充行为由实体组件(`"minecraft:trade_resupply": {}`)处理。
:::

如果值为0，该交易会显示在界面中但无法使用。如果为负值，该交易将无限次使用，无需补充。

#### 玩家经验

通过可选布尔属性`"reward_exp"`可以禁用交易给玩家的经验球。

::: code-group
```json [#/tiers/0/trades/1/]
"reward_exp": false
```
:::

默认`"reward_exp"`为true，玩家会因交易获得经验。交易表中无法修改获得的经验量。

#### 交易者经验

玩家完成交易时，交易者可能获得经验。此属性是通过[层级](#tiers)建立交易者交易进度系统的关键。

::: code-group
```json [#/tiers/0/trades/1/]
"trader_exp": 8
```
:::

可选数值属性`"trader_exp"`设置奖励给交易者的经验值。默认交易者获得1点经验。

::: tip
对于非线性分布的层级，通常高阶交易的交易者经验奖励更高。这样低阶交易对升级的影响小于高阶交易。
:::

### 选择项

选择项是简单对象，用于随机选择交易使用的物品。每个交易者实例会均匀随机选择一个物品用于该交易。

::: code-group
```json [#/tiers/1/trades/0/wants/0]
{
	"choice": [
		{
			"item": "wiki:sacred_stones",
			…
		},
		{
			"item": "wiki:blessed_beads",
			…
		}
	]
}
```
:::

选择项只包含必需的`"choice"`数组属性。数组中必须至少提供一个物品条目。

::: tip 注意
选择项不能嵌套。
:::

::: tip
目前无法为物品指定权重，但可以通过在数组中重复物品来有效增加其被选中的概率。
:::

### 物品

物品是交易的主体。其定义在需求与给予物品间共享，但根据使用位置有不同的含义。

::: code-group
```json [#/tiers/1/trades/0/wants/0/choice/0]
{
	"item": "wiki:sacred_stones",
	"quantity": {
		"min": 4,
		"max": 6
	},
	"price_multiplier": 0.5
}
```
:::

::: code-group
```json [#/tiers/0/groups/0/trades/1/gives/0]
{
	"item": "wiki:exalted_blade",
	"functions": [
		{
			"function": "enchant_with_levels",
			"treasure": true,
			"levels": {
				"min": 15,
				"max": 25
			}
		}
	]
}
```
:::

#### 物品引用

通过必需的字符串属性`"item"`在交易中引用物品。

::: code-group
```json [#/tiers/1/trades/0/wants/0/choice/0/]
"item": "wiki:exalted_blade"
```
:::

物品引用必须指向物品标识符。可以直接在引用后缀中指定数据值：

::: code-group
```json [示例数据值分配]
"item": "minecraft:log:2"
```
:::

::: tip
也可以通过`set_data`函数设置（更方便地随机化）数据值。
:::

如果需求物品未指定数据值，任何该标识符的物品都可交易。如果给予物品未指定数据值，默认为0。

#### 数量

可选属性`"quantity"`指定交易中需求或给予的物品数量。

::: code-group
```json [#/tiers/1/trades/0/wants/0/choice/0/]
"quantity": {
	"min": 4,
	"max": 6
}
```
:::

数量可以是整数或范围对象（如上）。如果是范围，会在最小最大值之间均匀随机选择。未指定时默认为1。

::: tip 注意
数量始终受堆叠限制，且只能影响交易中的单个槽位。无法通过单个槽位要求100个木板（虽然可以用2个`"wants"`实现），也无法通过单个交易给玩家2把不可堆叠的剑。
:::

#### 价格乘数

价格乘数决定物品的[基础数量](#quantity)如何因特定事件而变化。

::: code-group
```json [#/tiers/1/trades/0/wants/0/choice/0/]
"price_multiplier": 0.5
```
:::

`"price_multiplier"`可选，默认为0。存在新旧两套使用价格乘数的系统。新系统中，价格乘数只能影响交易的第一个需求物品。旧系统中，可以影响任何需求物品。

##### 波动因素

交易价格因以下因素波动：

- 需求增加：同一物品在多次[补充](#trade-limit)后交易
- 最近被治愈：如村民从僵尸村民治愈
- 靠近最近被治愈的交易者
- 与受"村庄英雄"效果影响的玩家交易

除使用新定价公式的"村庄英雄"效果外，价格乘数影响所有这些情况。新公式使用固定值。

##### 成本计算

价格乘数直接影响且仅影响因交易需求增加导致的成本上升。默认需求为0且不能为负。当交易[耗尽](#trade-limit)后补充时需求增加，如果在补充期间未发生交易则需求减少。

仅因需求增加的成本变化是线性的，每增加1点需求就增加基础成本的比例部分（由价格乘数决定）。假设以下变量：

| 变量 | 含义 |
|------|------|
| _c_ | 总成本 |
| _p_ | 基础成本（含[数量覆盖](#quantity-modifying-enchantment-functions)） |
| _m_ | 价格乘数 |
| _d_ | 当前需求 |

计算公式如下（无其他因素时）：
_c_ = _p_ × (1 + _m_ \* _d_)

::: tip 注意
其他情况还使用实体属性计算成本，此处不提供。
:::

如果价格乘数为0，在大多数情况下数量保持不变（使用新定价公式的"村庄英雄"修饰符除外）。

::: tip 注意
负价格乘数可能，但不会影响因[需求](#trade-limit)增加导致的成本上升（乘数实际被限制为0）。但负值会影响交易者最近被治愈、靠近被治愈交易者或与受"村庄英雄"影响的玩家交易（使用旧定价公式时）的价格。
:::

#### 函数

函数用于修改物品属性。可选数组`"functions"`包含应用于物品的函数集合。

::: code-group
```json [#/tiers/0/groups/0/trades/1/gives/0/]
"functions": [
	{
		"function": "enchant_with_levels",
		"treasure": true,
		"levels": {
			"min": 15,
			"max": 25
		}
	}
]
```
:::

交易表与战利品表共享函数。在需求物品声明中使用时（[可用处](#unusable-wanted-item-functions)），用于限制需求物品的属性。此类函数限制只能影响第一个需求物品。

##### 通用不可用函数

通常函数在交易中表现良好，但以下函数在交易表中完全无效：

- `set_count`
- `furnace_smelt`
- `looting_enchant`
- `trader_material_type`

::: tip 注意
`set_count`的功能由[quantity属性](#quantity)替代。

`trader_material_type`仅在一个原版交易表中出现，理论上会根据实体的mark变种设置物品数据值，但似乎无法自定义使用。
:::

##### 需求物品不可用函数

通常使用函数指定需求物品属性会要求提供的物品符合这些属性。但以下函数不会强制严格匹配，因此在需求物品上无效：

- `set_name`
- `set_lore`
- `set_damage`
- `set_book_contents`
- `random_dye`
- `fill_container`

##### 修改数量的附魔函数

2个函数实际上会设置第一个需求物品的数量（当作为给予物品使用时），可能覆盖该需求物品的[quantity](#quantity)：

- `enchant_with_levels`
- `enchant_book_for_trading`

::: tip 注意
尽管覆盖了数量，所有[修改的交易价格](#fluctuation-factors)都会正确调整。这些函数不能影响第二个需求物品的数量（即使使用旧成本公式）。如果在需求物品上使用这些函数，数量不会被覆盖。
:::

###### 附魔等级函数

`enchant_with_levels`随机附魔物品，如同通过附魔台附魔。

::: code-group
```json [#/tiers/0/groups/0/trades/1/gives/0/functions/0]
{
	"function": "enchant_with_levels",
	"treasure": true,
	"levels": {
		"min": 5,
		"max": 25
	}
}
```
:::

第一个需求物品的成本通过将此函数选择的等级值（如果为负则限制为0）加到原始[数量](#quantity)计算。等级值通过可选属性`"levels"`计算。如果使用数值，则为固定等级值。如果使用范围对象（如上），会在最小最大值之间随机选择。上例中第一个需求物品的成本会增加5-25。

###### 交易附魔书函数

`enchant_book_for_trading`专为交易设计。其属性共同决定第一个需求物品的成本。

::: code-group
```json [#/tiers/0/groups/0/trades/0/gives/0/functions/0]
{
	"function": "enchant_book_for_trading",
	"base_cost": 4,
	"base_random_cost": 12,
	"per_level_cost": 4,
	"per_level_random_cost": 8
}
```
:::

此函数专为书籍设计，在所有可能的非诅咒附魔（包括宝藏附魔）中随机选择一项。函数不适配当前物品。用于书籍时总能成功附魔；用于其他可附魔物品时可能失败。

::: tip 注意
失败时，函数可能选择了不适用于该物品的附魔导致附魔失败。因此非书籍物品的成功率与其适用附魔数量成正比。
:::

总成本由基础成本（独立于随机附魔）和每级成本（依赖随机结果）组成。所有成本配置属性都是可选的。

基础成本是起始值与随机值的和。起始值由`"base_cost"`设置（默认2），随机值由`"base_random_cost"`设置（默认4），在生成交易时均匀随机选择0到`"base_random_cost"`之间的值。

每级成本同样计算：固定值加上随机值。固定每级成本由`"per_level_cost"`设置（默认3），随机每级成本由`"per_level_random_cost"`设置（默认10）。每级的随机值可能不同。

计算基础成本和所有等级成本后求和得到总成本。如果选择的附魔是宝藏附魔，成本会翻倍。此成本不会小于1或大于物品堆叠上限。无论交易者使用何种定价系统，此公式都适用。

::: warning
如果任一随机成本属性为负，似乎有50%概率使用给定的[数量](#quantity)或第一个需求物品的最大堆叠数作为成本。
:::

::: tip
如果总成本为负（假设未使用负随机成本属性），则使用受影响需求物品的[数量](#quantity)。最简单的保证方法是：

::: code-group
```json [基于数量的附魔书成本示例]
{
	"function": "enchant_book_for_trading",
	"base_cost": -1,
	"base_random_cost": 0,
	"per_level_cost": 0,
	"per_level_random_cost": 0
}
```
:::

##### 刷怪蛋绑定交易者

`"set_actor_id"`函数通过`"id"`属性设置刷怪蛋的数据值（基于提供的实体标识符）。

::: code-group
```json [刷怪蛋绑定交易者示例]
{
	"function": "set_actor_id"
}
```
:::

在交易表中，如果未提供ID，刷怪蛋将绑定交易者的实体类型。

## 覆盖

由于交易表不使用数据内标识符，只需用新交易表替换旧表即可实现覆盖。了解更多关于[资源覆盖](/wiki/concepts/overwriting-assets)的内容。

以下是各交易者当前使用的原版交易表：
|交易者|路径|
|-|-|
|石匠|`BP/trading/economy_trades/stone_mason_trades.json`|
|农民|`BP/trading/economy_trades/farmer_trades.json`|
|渔夫|`BP/trading/economy_trades/fisherman_trades.json`|
|屠夫|`BP/trading/economy_trades/butcher_trades.json`|
|牧羊人|`BP/trading/economy_trades/shepherd_trades.json`|
|制革师|`BP/trading/economy_trades/leather_worker_trades.json`|
|图书管理员|`BP/trading/economy_trades/librarian_trades.json`|
|制图师|`BP/trading/economy_trades/cartographer_trades.json`|
|牧师|`BP/trading/economy_trades/cleric_trades.json`|
|工具匠|`BP/trading/economy_trades/tool_smith_trades.json`|
|武器匠|`BP/trading/economy_trades/weapon_smith_trades.json`|
|制箭师|`BP/trading/economy_trades/fletcher_trades.json`|
|盔甲匠|`BP/trading/economy_trades/armorer_trades.json`|
|流浪商人|`BP/trading/economy_trades/wandering_trader_trades.json`|

::: tip 注意
`trading`文件夹中还存在其他交易表，但已弃用。目前仅使用`economy_trades`子文件夹中的表。
:::

或者，可以更新交易者实体定义以指向新的交易表位置。