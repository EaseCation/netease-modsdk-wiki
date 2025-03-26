---
title: 配方系统
category: 文档
nav_order: 3
tags:
    - 稳定版本
    - 最后更新于1.20.30版本
mentions:
    - Ciosciaa
    - SirLich
    - MedicalJewel105
    - TheHyperWhale
    - Luthorius
    - QuazChick
---

# 配方系统

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

配方系统用于处理多种物品转换逻辑，包括工作台、熔炉、营火和酿造台的合成流程。

![](/assets/images/loot/recipes/recipe.png)

::: tip
铁砧交互通过[物品定义](/wiki/items/item-components)实现，而非配方文件。织布机交互当前暂不可用。
:::

使用配方功能无需开启任何实验性选项。

## 注册方式

所有配方文件需存放在行为包根目录的`recipes`文件夹中，支持任意子目录结构和命名方式。

以下示例展示了本文档采用的目录结构：

<FolderView
	:paths="[
		'BP/recipes/crafting/weapons/cold_steel_sword.json',
		'BP/recipes/decorations/knobs/brass.json',
		'BP/recipes/covered_arch.json',
		'BP/recipes/magic/magic_ash.json',
		'BP/recipes/brewing/negative/paralysis.json',
		'BP/recipes/illumination_potion.json'
	]"
/>

例如，可通过以下[有序配方](#有序配方)制作"寒钢剑"：

::: code-group
```json [BP/recipes/crafting/weapons/cold_steel_sword.json]
{
	"format_version": "1.17.41",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "wiki:cold_steel_sword"
		},
		"tags": ["crafting_table", "altar"],
		"pattern": [
			"X",
			"X",
			"I"
		],
		"key": {
			"X": "wiki:cold_steel",
			"I": "minecraft:stick"
		},
		"unlock": [
			{
				"item": "wiki:cold_steel"
			},
			{
				"item": "minecraft:wool",
				"data":  3
			},
			{
				"context": "PlayerInWater"
			}
		],
		"result": "wiki:cold_steel_sword"
	}
}
```
:::

## 通用属性与结构

### 格式版本

[格式版本](/wiki/guide/format-version)用于标识配方文件的架构版本，通过顶层`"format_version"`属性指定。

::: code-group
```json [#/]
"format_version": "1.17.41"
```
:::

实际使用中格式版本可设为任意值或省略。

::: warning
强烈建议仍保留格式版本，并选择与当前Minecraft版本匹配的值以保证未来兼容性。推荐使用最新正式版或上一个主版本号。
:::

### 描述信息

`"description"`对象是所有配方类型的必填项，用于声明配方唯一标识符。

::: code-group
```json [#/minecraft:recipe_shaped/]
"description": {
	"identifier": "wiki:cold_steel_sword"
}
```
:::

其中必填的`"identifier"`属性用于在世界中所有行为包范围内唯一标识配方。单个包内不允许存在重复的完整配方ID。

::: warning
强烈建议使用命名空间。命名空间是附加组件领域的通用规范，有助于将配方逻辑归属到特定行为包，减少多包混用时发生冲突的可能性。
:::

### 标签系统

通过必填的`"tags"`数组属性将配方与合成界面关联，该属性需置于任何配方类型中。这些标签会使配方在具有`minecraft:crafting_table`组件的不同方块间共享。若配方不包含`crafting_table`标签或任何原版标签，但包含自定义方块的标签，则该配方仅适用于该自定义方块而非工作台/切石机等。必须提供至少一个标签。

::: code-group
```json [#/minecraft:recipe_shaped/]
"tags": ["crafting_table", "altar"]
```
:::

原版界面为各类配方类型开放了对应标签：

合成类：
- `crafting_table`
- `stonecutter`
- `smithing_table`

::: warning
注意：若要制作锻造台配方，第二个槽位必须使用`<命名空间>:netherite_ingot`，使用其他标识符将无效。**此特性在1.18.30后已失效**。
:::

熔炼类：
- `furnace`
- `blast_furnace`
- `smoker`
- `campfire`
- `soul_campfire`

酿造类：
- `brewing_stand`

教育版：
- `material_reducer`

::: tip
此外，[自定义工作台](/wiki/blocks/block-components#crafting-table)可声明自定义标签供合成配方使用。目前不支持自定义熔炉和酿造台。
:::

::: tip
要禁用配方（常用于[覆盖](#覆盖机制)已有配方），可将标签数组设为`[""]`。
:::

### 配方解锁
Minecraft 1.20.30新增了配方解锁功能。要使用此功能，需确保`manifest.json`中的`min_engine_version`至少为1.20.11（推荐1.20.30），并在配方中添加`unlock`数组：
```json
		"unlock": [
			{
				"item": "wiki:cold_steel" //解锁配方所需物品
			},
			{
				"item": "minecraft:wool", //解锁配方所需物品
				"data":  3
			},
			{
				"context": "PlayerInWater" //解锁配方所需事件
			}
          ]
```
数组中每个对象的`"item"`字段表示玩家背包中需要存在的物品（支持数据值）。`"context"`字段表示触发解锁的事件，目前仅知`"PlayerInWater"`会在玩家入水时解锁配方。

### 物品描述符

配方系统中涉及多种物品引用方式，支持两种格式：字符串引用和物品对象。两种格式均可处理数据值，但只有物品对象能指定数量（用于配方输出）。对于配方输入，若未指定数据值，则该标识符下任意数据值的物品都可用作输入。输出物品的数据值默认为`0`（若未显式指定）。不支持通过物品标签选择配方输入。

#### 字符串引用

基本格式为物品的命名空间加标识符组合：

::: code-group
```json [#/minecraft:recipe_shapeless/ingredients/0]
"minecraft:planks"
```
:::

字符串引用还支持通过后缀指定数据值：

::: code-group
```json [#/minecraft:recipe_shapeless/ingredients/0]
"minecraft:planks:2"
```
:::

#### 物品对象

物品对象提供了更明确的物品引用结构。

::: code-group
```json [#/minecraft:recipe_shapeless/ingredients/0]
{
	"item": "minecraft:planks",
	"data": 2,
	"count": 3
}
```
:::

必填的`"item"`属性功能同字符串引用。虽然提供了独立的数据字段，但`"item"`属性仍支持数据值后缀格式。不同于后缀形式，`"data"`可接受Molang表达式（该表达式仅在世界加载时计算一次，而非每次合成时计算）。无法通过变量在配方属性间传递数据。目前已知`"data"`属性中唯一可用的查询是`q.get_actor_info_id`，用于通过实体标识符获取其刷怪蛋ID：

::: code-group
```json [#/minecraft:recipe_shapeless/result]
{
	"item": "minecraft:spawn_egg",
	"data": "q.get_actor_info_id('minecraft:chicken')"
}
```
:::

可选的整数`"count"`属性用于堆叠物品，默认为`1`。当前仅在[合成](#合成)与[熔炼](#加热)配方输出及[无序配方原料](#原料)中有效，其他场景下会被忽略。

::: tip 注意
若对不可堆叠物品设置数量大于`1`，将抛出错误。无法强制单次返回多个合成输出（如无序配方或酿造混合产物）。
:::

::: warning
尽管与交易[表物品描述符](/wiki/loot/trade-tables#items)相似，配方物品描述符不能使用函数。
:::

#### 特殊标识符

配方系统额外支持描述基础药水的特殊标识符。

::: code-group
```json [#/minecraft:recipe_brewing_mix/input]
"minecraft:potion_type:strength"
```
:::

这些标识符仅支持字符串格式，不支持对象格式，且无喷溅/滞留药水变种。所有此类标识符遵循格式：<code>minecraft:potion_type:<em>药水效果</em></code>，其中<code><em>药水效果</em></code>可为以下之一：

- `water`（水）
- `awkward`（粗制的）
- `mundane`（平凡的）
- `thick`（浓稠的）
- `healing`（治疗）
- `regeneration`（再生）
- `swiftness`（迅捷）
- `strength`（力量）
- `harming`（伤害）
- `poison`（剧毒）
- `slowness`（缓慢）
- `weakness`（虚弱）
- `water_breathing`（水下呼吸）
- `fire_resistance`（抗火）
- `nightvision`（夜视）
- `invisibility`（隐身）
- `leaping`（跳跃）
- `slow_falling`（缓降）
- `turtle_master`（神龟）
- `wither`（衰变）

支持添加`long_`和`strong_`前缀表示强化药水，如`minecraft:potion_type:strong_poison`。

## 合成系统

合成操作通过合成网格即时转换物品。支持两种配方类型：[无序配方](#无序配方)（原料可任意排列）和[有序配方](#有序配方)（需严格排列原料）。
合成配方同时支持工作台和切石机：

::: code-group
```json [#/minecraft:recipe_shapeless/]
"tags": ["crafting_table", "stonecutter"]
```
:::

`"crafting_table"`同时适用于原版工作台和玩家物品栏中的2×2合成网格，当前无法单独启用其中一种。合成配方还支持自定义标签，可将配方关联到[自定义方块提供的合成网格](/wiki/blocks/block-components#crafting-table)。

### 无序配方

无序配方将原料集合与单个输出简单绑定。

![](/assets/images/loot/recipes/shapeless_recipe.png)

::: code-group
```json [BP/recipes/decorations/knobs/brass.json]
{
	"format_version": "1.17.41",
	"minecraft:recipe_shapeless": {
		"description": {
			"identifier": "wiki:brass_door_knob"
		},
		"group": "handles",
		"tags": ["construction_bench"],
		"ingredients": [
			"wiki:brass",
			{
				"item": "wiki:screw",
				"data": 2
			}
		],
		"unlock": [
			{
				"item": "wiki:cold_steel"
			},
			{
				"item": "minecraft:wool",
				"data":  3
			},
			{
				"context": "PlayerInWater"
			}
		],
		"result": {
			"item": "wiki:door_knob",
			"data": 3
		}
	}
}
```
:::

#### 原料配置

必填的`"ingredients"`数组列出了合成所需的原料物品。

::: code-group
```json [#/minecraft:recipe_shapeless/]
"ingredients": [
	"wiki:brass",
	{
		"item": "wiki:screw",
		"data": 2
	}
]
```
:::

每项均为[物品描述符](#物品描述符)。若原料设置了数量，该数量必须通过多个合成网格槽位实现（单个槽位堆叠物品无法用于合成）。当所需物品存在但原料数量超过当前合成界面容量时，配方书会自动将该配方标记为不可用。

#### 无序配方输出

通过必填的`"result"`属性声明输出，可以是[物品描述符](#物品描述符)或单物品描述符的数组。

::: code-group
```json [#/minecraft:recipe_shapeless/]
"result": {
	"item": "wiki:door_knob",
	"data": 3
}
```
:::

### 有序配方

有序配方要求原料必须按特定图案排列。

![](/assets/images/loot/recipes/shaped_recipe.png)

::: code-group
```json [BP/recipes/covered_arch.json]
{
	"format_version": "1.17.41",
	"minecraft:recipe_shaped": {
		"description": {
			"identifier": "wiki:covered_arch"
		},
		"tags": ["crafting_table"],
		"pattern": [
			"SSS",
			"I I",
			"I I"
		],
		"key": {
			"S": "wiki:cloth",
			"I": "wiki:support"
		},
		"unlock": [
			{
				"item": "wiki:cold_steel"
			},
			{
				"item": "minecraft:wool",
				"data":  3
			},
			{
				"context": "PlayerInWater"
			}
		],
		"result": [
			{
				"item": "wiki:covered_arch",
				"count": 3
			},
			"wiki:crafting_scrap"
		]
	}
}
```
:::

#### 图案定义

必填的`"pattern"`数组属性用于建立配方图案。

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"SSS",
	"I I",
	"I I"
]
```
:::

数组每项代表合成网格的一行，字符串每个字符代表该行的槽位。默认空格表示该槽位需留空。

字符作为物品的视觉简写，每个独特字符需与[键定义](#键定义)匹配以指定对应槽位的物品。

::: tip
若图案全由空格组成，任何能容纳该图案尺寸的空合成界面都会持续匹配该配方。玩家可无限获取输出物品，包括通过Shift键一次性填满背包。
:::

##### 行标准化

图案网格最大为3×3，可更小。若字符串长度不一致，Minecraft会自动补全较短字符串（用空格填充空缺槽位）。以下两组定义等效：

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"MA",
	"IFI",
	"M"
]
```
:::

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"MA ",
	"IFI",
	"M  "
]
```
:::

::: tip 注意
当前所有合成网格（包括自定义方块配置的）最大不超过3×3。若图案超出当前合成界面容量，配方书会自动将其标记为不可用。
:::

##### 网格自由度

空格不会自动填充3×3网格的剩余槽位。若提供的图案小于当前合成网格，只要保持结构和内容，图案可在网格任意位置使用。例如以下图案在工作台上的表现：

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"O"
	"OO"
]
```
:::

"L"形图案不限左上角位置，在3×3网格中可能配置如下：

<Spoiler title="可能的配置">
*下划线代表空槽位*
```txt
O__
OO_
___
```
```txt
_O_
_OO
___
```
```txt
___
O__
OO_
```
```txt
___
_O_
_OO
```
</Spoiler>

要限制位置需显式使用空格强制某些槽位留空。以下图案仅能在网格左上角使用：

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"O  "
	"OO "
	"   "
]
```
:::

##### 对称性

所有有序配方默认具有水平对称性：

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"Z  "
	" Z "
	"  Z"
]
```
:::

该配方也可被玩家视为以下形式使用：

::: code-group
```json [#/minecraft:recipe_shaped/]
"pattern": [
	"  Z"
	" Z "
	"Z  "
]
```
:::

#### 键定义

通过必填的`"key"`对象属性将图案字符映射到[物品描述符](#物品描述符)。

::: code-group
```json [#/minecraft:recipe_shaped/]
"key": {
	"S": "wiki:cloth",
	"I": "wiki:support"
}
```
:::

图案中每个字符都需在此定义。键名区分大小写。若物品支持多数据值且未指定数据值，该标识符下任意数据值的物品都可用于该键。物品描述符中的`"count"`属性会被忽略并视为`1`；合成网格槽位中的堆叠物品每次仅消耗一个。

::: tip 注意
可使用`U+0020`到`U+07FF`间的任意Unicode字符作为键名。若键名超过一个字符，仅首字符有效。由于空格默认表示网格空槽且无法重新定义，不建议将其作为键。
:::

::: warning
若图案字符未在键映射中定义，将被视为空格（空槽位）。
:::

### 配方解锁
Minecraft 1.20.30新增配方解锁功能。要使用此功能，需确保`manifest.json`中的`min_engine_version`至少为1.20.11（推荐1.20.30），并在配方中添加`unlock`数组：
```json
		"unlock": [
			{
				"item": "wiki:cold_steel" //解锁配方所需物品
			},
			{
				"item": "minecraft:wool", //解锁配方所需物品
				"data":  3
			},
			{
				"context": "PlayerInWater" //解锁配方所需事件
			}
		]
```
数组中每个对象的`"item"`字段表示玩家背包中需要存在的物品。`"context"`字段表示触发解锁的事件，目前仅知`"PlayerInWater"`会在玩家入水时解锁配方。

#### 有序配方输出

有序配方输出行为与[无序配方](#无序配方输出)相似。不同于无序配方的是，有序配方的输出数组可包含多个[物品描述符](#物品描述符)。

::: code-group
```json [#/minecraft:recipe_shaped/]
"result": [
	{
		"item": "wiki:covered_arch",
		"count": 3
	},
	"wiki:crafting_scrap"
]
```
:::

数组首项将作为合成方块的可见输出，其余项会在玩家取走可见输出后自动放入背包。目前似乎没有对单次合成返回物品数量的限制。

::: tip 注意
无法放入背包的物品会按从左到右、从上到下的顺序放回合成输入槽。若仍无法容纳，则会像玩家执行"丢弃物品"操作一样抛出。
:::

### 配方书

配方书自动索引并显示可用配方，智能考虑无序配方的[原料数量](#原料配置)或有序配方的[图案限制](#图案定义)。当多个配方指向相同输出时，配方书使用独特优先级系统。

比较两个无序配方时，按以下顺序确定优先级：
1. 第一个列出原料的较低数量
2. 更小的[优先级值](#优先级)
3. 字典序较小的标识符字符串

对于有序配方，字典序较小的标识符始终优先。

比较有序与无序配方时，使用无序配方规则，但有序配方的原料数量计算方式不同（具体机制未知）。

### 分组系统

本节为信息性说明。原版定义中的合成配方包含可选的`"group"`字符串属性。

::: code-group
```json [#/minecraft:recipe_shaped/]
"group": "slingshots"
```
:::

目前未知该属性的具体作用（推测与[配方书](#配方书)相关）。使用自定义分组或复用原版分组均未观察到实际效果。

### 优先级

合成配方支持额外的`"priority"`属性处理输入冲突，主要在[优先级排序](#优先级排序)时作为决胜条件。

::: code-group
```json [#/minecraft:recipe_shaped/]
"priority": 2
```
:::

数值较小的配方优先级更高（如优先级`0`优于`1`）。支持负值，未提供时默认为`0`。

## 加热系统

熔炉配方通过热源随时间转换物品。虽然名称局限，实际适用于所有热源界面（包括营火）。

![](/assets/images/loot/recipes/furnace_recipe.png)

::: code-group
```json [BP/recipes/magic/magic_ash.json]
{
	"format_version": "1.17.41",
	"minecraft:recipe_furnace": {
		"description": {
			"identifier": "wiki:magic_ash"
		},
		"tags": ["soul_campfire"],
		"input": "wiki:bone_fragments",
		"output": {
			"item": "wiki:magic_ash",
			"count": 4
		}
	}
}
```
:::

支持所有原版加热方块的标签：

::: code-group
```json [#/minecraft:recipe_furnace/]
"tags": ["furnace", "blast_furnace", "smoker", "campfire", "soul_campfire"]
```
:::

### 加热转换

熔炉配方将单个输入[物品描述符](#物品描述符)绑定到单个输出物品描述符。

::: code-group
```json [#/minecraft:recipe_furnace/]
"input": "wiki:bone_fragments"
"output": {
	"item": "wiki:magic_ash",
	"count": 4
}
```
:::

输入中的数量值会被忽略。无法修改经验返还和燃料设定，加热时间由使用的方块决定且不可更改。

## 酿造系统

酿造配方通过催化剂物品转换另一物品。支持两种类型：[酿造混合](#酿造混合)（不传递输入输出数据）和[酿造容器](#酿造容器)（传递数据）。

仅一种界面支持酿造配方：

::: code-group
```json [#/minecraft:recipe_brewing_container/]
"tags": ["brewing_stand"]
```
:::

### 酿造转换

酿造转换类似[加热转换](#加热转换)，需要输入和输出各一个[物品描述符](#物品描述符)。此外还需`"reagent"`属性作为催化剂（也仅接受单个物品描述符）。

::: code-group
```json [#/minecraft:recipe_brewing_mix/]
"input": "wiki:flask",
"reagent": "wiki:jade",
"output": "wiki:insanity_resistance"
```
:::

这些属性中的数量值会被忽略，物品每次转换一个。

::: warning
若酿造配方的输入物品可堆叠，将消耗整个堆叠。目前无法避免此行为。
:::

酿造完成后催化剂被消耗，输出物品直接替换输入物品。

::: warning
当前无论是否指定数据值，产出物品的堆叠都存在bug，无法与相同标识符和数据值的物品堆叠。
:::

### 酿造混合

酿造混合是简单的酿造配方，理论上设计用于隔离输入输出的数据值。

![](/assets/images/loot/recipes/brewing_mix_recipe.png)

::: code-group
```json [BP/recipes/brewing/negative/paralysis.json]
{
	"format_version": "1.17.41",
	"minecraft:recipe_brewing_mix": {
		"description": {
			"identifier": "wiki:paralysis_brew"
		},
		"tags": ["brewing_stand"],
		"input": "wiki:amberglass_flask",
		"reagent": "wiki:viporfly_poison",
		"output": "wiki:paralysis_brew"
	}
}
```
:::

::: warning
不幸的是，酿造混合配方的数据值设定存在缺陷。

通常，若对输入指定数据值，酿造配方将完全失效。例外情况是输入为以下之一：
- `minecraft:potion`
- `minecraft:splash_potion`
- `minecraft:lingering_potion`
- [药水特殊标识符](#特殊标识符)

若通过`"data"`属性为催化剂指定数据值，当酿造台放入该标识符物品时会触发酿造（无论数据值是否匹配）。但只有数据值正确时才会成功转换，否则看似成功实则不转换输入（但仍会消耗催化剂和部分烈焰粉燃料）。
:::

### 酿造容器

酿造容器设计用于将输入数据值传递到输出。

![](/assets/images/loot/recipes/brewing_container_recipe.png)

::: code-group
```json [BP/recipes/illumination_potion.json]
{
	"format_version": "1.17.41",
	"minecraft:recipe_brewing_container": {
		"description": {
			"identifier": "wiki:illumination_potion"
		},
		"tags": ["brewing_stand"],
		"input": "minecraft:potion",
		"reagent": "wiki:radiant_berries",
		"output": "wiki:illumination_potion"
	}
}
```
:::

比[酿造混合](#酿造混合)更严格，仅允许以下输入类型：
- `minecraft:potion`
- `minecraft:splash_potion`
- `minecraft:lingering_potion`
- [药水特殊标识符](#特殊标识符)

由于数据值从输入传递到输出，`"input"`和`"output"`中指定的数据值会被忽略。

## 覆盖机制

与所有附加组件领域相同，行为包加载顺序影响游戏中选择的文件。列表中靠前的行为包会覆盖靠后的（包括原版基础包）。

要覆盖低优先级包的配方，需完全匹配配方类型和标识符。覆盖文件可任意命名存放——仅内容重要。配方不支持部分覆盖，必须完全重新定义。

::: warning
仅当配方类型完全匹配时覆盖才生效。多数情况下不匹配会导致新建配方而非覆盖。

若尝试在两种合成配方类型间转换覆盖，将抛出错误。解决方案：先复制原版定义到包中，将其`"tags"`设为`[""]`（禁用配方），再新建另一种类型的配方文件（使用不同标识符避免冲突）。
:::

## 优先级排序

考虑[覆盖机制](#覆盖机制)后，若多个配方匹配输入，按以下顺序决胜：
1. 行为包列表中更高优先级的包
2. 合成配方中更小的[优先级值](#优先级)
3. 合成配方中[有序配方](#有序配方)优于[无序配方](#无序配方)
4. 字典序较小的标识符字符串