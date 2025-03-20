---
title: 物品组件
description: 物品组件用于改变物品在游戏中的外观和功能。
category: 基础
nav_order: 2
mentions:
    - SmokeyStack
    - QuazChick
---

# 物品组件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式版本 & 最低引擎版本 `1.20.50`
创建自定义物品时使用最新格式版本可获得最新功能和改进。本wiki旨在分享自定义物品的最新信息，当前目标格式版本为`1.20.50`。
:::

## 应用组件

物品组件用于修改物品在游戏中的外观和功能。这些组件应添加在`minecraft:item`的`components`子项中。

::: code-group
```json [BP/items/custom_item.json]
{
    "format_version": "1.20.50",
    "minecraft:item": {
        "description": {
            "identifier": "wiki:custom_item",
            "menu_category": {
                "category": "items"
            }
        },
        "components": {
            "minecraft:icon": {
                "texture": "custom_item"
            }
        }
    }
}
```
:::

## 允许副手

决定物品是否可以放入物品栏的副手槽位。

::: code-group
```json [minecraft:item > components]
"minecraft:allow_off_hand": {
    "value": true
}
```
:::

## 方块放置器

将物品设置为可放置方块的种植者组件。具有此组件的物品在使用时会放置指定方块。

::: code-group
```json [minecraft:item > components]
"minecraft:block_placer":{ 
    "block": "seeds",
    "use_on": [
        "dirt",
        "grass"
    ]
}
```
:::

## 创造模式可破坏

决定在创造模式下挥动物品时是否会破坏方块。

::: code-group
```json [minecraft:item > components]
"minecraft:can_destroy_in_creative": {
    "value": true
}
```
:::

## 冷却时间

设置物品的冷却时间。使用物品后，在组件指定的'duration'持续时间内无法再次使用。

::: code-group
```json [minecraft:item > components]
"minecraft:cooldown":{
    "category" : "attack",
    "duration" : 0.2
}
```
:::

## 伤害值

决定物品攻击时造成的额外伤害量。

::: code-group
```json [minecraft:item > components]
"minecraft:damage": {
    "value": 10
}
```
:::

## 挖掘工具

允许创作者设定物品挖掘特定方块的速度。

::: code-group
```json [minecraft:item > components]
"minecraft:digger": {
	"use_efficiency": true,
	"destroy_speeds": [
		{
			"block": {
				"tags": "q.any_tag('stone', 'metal')" // 注意并非所有方块都有标签，可能需要列举多个方块
			},
			"speed": 6
		}
	]
}
```
:::

## 显示名称

设置物品在Minecraft基岩版中的显示名称。此组件也可通过引用本地化文件中的键值来获取名称。

### 示例

::: code-group
```json [minecraft:item > components]
"minecraft:display_name":{
    "value": "secret_weapon"
}
```
:::

### 使用本地化键示例

::: code-group
```json [minecraft:item > components]
"minecraft:display_name":{
    "value": "item.snowball.name"
}
```
:::

## 耐久度

设置物品在损坏前可承受的伤害量，并允许物品在铁砧、砂轮或工作台进行修复。

::: code-group
```json [minecraft:item > components]
"minecraft:durability":{
    "damage_chance": {
        "min": 10,
        "max": 50
    },
    "max_durability": 36
}
```
:::

## 可附魔

决定可应用于物品的附魔类型。并非所有附魔都会对所有物品组件生效。

::: code-group
```json [minecraft:item > components]
"minecraft:enchantable": {
	"slot": "bow",
	"value": 10
}
```
:::

### 可附魔槽位
注意："all"槽位允许像附魔书一样应用任何附魔

| 槽位名称       |
| ------------- |
| armor_feet    |
| armor_torso   |
| armor_head    |
| armor_legs    |
| axe           |
| bow           |
| cosmetic_head |
| crossbow      |
| elytra        |
| fishing_rod   |
| flintsteel    |
| hoe           |
| pickaxe       |
| shears        |
| shield        |
| shovel        |
| sword         |
| all           |

## 实体放置器

允许物品在世界中放置实体。在1.19.80及以上版本中，此组件还可设置刷怪笼生成的生物类型。

::: code-group
```json [minecraft:item > components]
"minecraft:entity_placer":{
    "entity": "minecraft:spider",
    "dispense_on": ["minecraft:web"],
    "use_on": ["minecraft:web"]
}
```
:::

## 食物

将物品设置为可食用组件，允许玩家食用。

:::tip
`minecraft:food`必须与`minecraft:use_modifiers`组件配合使用才能正常工作。
:::

::: code-group
```json [minecraft:item > components]
"minecraft:food":{
    "can_always_eat": false,
    "nutrition" : 3,
    "effects" : [
        {
            "name": "poison",
            "chance": 1.0,
            "duration": 5,
            "amplifier": 0
        }
    ],
    "saturation_modifier": "normal",
    "using_converts_to": "bowl"
}
```
:::

## 燃料

允许此物品作为熔炉燃料用于"烹饪"其他物品。

::: code-group
```json [minecraft:item > components]
"minecraft:fuel":{
    "duration": 3.0
}
```
:::

## 附魔光效

决定物品是否显示附魔光效。

::: code-group
```json [minecraft:item > components]
"minecraft:glint": false
```
:::

## 手持装备

决定物品在手中是否像工具一样渲染。

::: code-group
```json [minecraft:item > components]
"minecraft:hand_equipped": {
    "value": true
}
```
:::

## 悬停文本颜色

决定鼠标悬停时物品名称的显示颜色。

::: code-group
```json [minecraft:item > components]
"minecraft:hover_text_color": "green"
```
:::

## 图标

设置物品图标组件。决定物品在UI和其他位置的显示图标。

::: code-group
```json [minecraft:item > components]
"minecraft:icon":{
    "texture": "oak_slab"
}
```
:::

## 交互按钮

布尔值或字符串，决定是否在触控界面显示交互按钮及按钮文本。设为'true'时将使用默认"使用物品"文本。

::: code-group
```json [minecraft:item > components]
"minecraft:interact_button": "使用这个自定义物品" // 可以是字符串或布尔值
```
:::

## 液体剪切

决定物品使用时是否与液体方块互动。

::: code-group
```json [minecraft:item > components]
"minecraft:liquid_clipped": {
    "value": true
}
```
:::

## 最大堆叠数

决定物品的最大堆叠数量。

::: code-group
```json [minecraft:item > components]
"minecraft:max_stack_size": {
    "value": 64
}
```
:::

## 投射物

使物品可像箭矢一样发射。具有`minecraft:projectile`的物品可从发射器发射，或作为具有`minecraft:shooter`组件的物品的弹药。此组件也用于设置带有`minecraft:throwable`组件的物品生成的实体。

::: code-group
```json [minecraft:item > components]
"minecraft:projectile":{
    "minimum_critical_power": 1.25,
    "projectile_entity": "arrow"
}
```
:::

## 唱片

用于唱片物品播放音乐。

::: code-group
```json [minecraft:item > components]
"minecraft:record": {
    "comparator_signal": 1,
    "duration": 5,
    "sound_event": "ambient.tame"
}
```
:::

### 可用音效

可用的音效列表请参考[此处](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_record?view=minecraft-bedrock-stable)

## 可修复

定义可用于修复该物品的材料及每次修复恢复的耐久度。每个条目需定义可修复材料列表(items)和可选修复量(repair_amount)。

::: code-group
```json [minecraft:item > components]
"minecraft:repairable":{
    "on_repaired": "minecraft:celebrate",
    "repair_items": ["anvil"]
}
```
:::

## 发射器

使物品可像弓或弩一样发射投射物。必须与`minecraft:use_modifiers`组件配合使用。

:::tip
`minecraft:shooter`使用的弹药必须具有`minecraft:projectile`组件才能正常工作。
:::

::: code-group
```json [minecraft:item > components]
"minecraft:shooter": {
    "ammunition": [
        {
            "item": "custom_projectile",
            "use_offhand": true,
            "search_inventory": true,
            "use_in_creative": true
        }
    ],
    "max_draw_duration": 1.0,
    "scale_power_by_draw_duration": true,
    "charge_on_draw": false
}
```
:::

## 应消失

决定漂浮在世界的物品是否会自动消失。

::: code-group
```json [minecraft:item > components]
"minecraft:should_despawn": {
    "value": true
}
```
:::

## 按数据堆叠

决定具有不同辅助值的相同物品是否可以堆叠。此组件也定义漂浮物品是否可以合并。

::: code-group
```json [minecraft:item > components]
"minecraft:stacked_by_data": {
    "value": true
}
```
:::

## 标签

决定物品包含哪些标签。

::: code-group
```json [minecraft:item > components]
"minecraft:tags": {
    "tags": [
        "custom_tag"
    ]
}
```
:::

## 可投掷

设置可投掷物品组件。

::: code-group
```json [minecraft:item > components]
"minecraft:throwable":{
    "do_swing_animation" : false,
    "launch_power_scale" : 1.0,
    "max_draw_duration" : 0.0,
    "max_launch_power" : 1.0,
    "min_draw_duration" : 0.0,
    "scale_power_by_draw_duration" : false
}
```
:::

## 使用动画

决定使用物品时播放的动画类型。

::: code-group
```json [minecraft:item > components]
"minecraft:use_animation": "eat"
```
:::

## 使用修饰符

决定与Shooter、Throwable或Food等组件配合使用时的物品使用时长。

::: code-group
```json [minecraft:item > components]
"minecraft:use_modifiers": {
    "use_duration": 1.6,
    "movement_modifier": 0.35
}
```
:::

## 可穿戴

设置可穿戴物品组件。

::: code-group
```json [minecraft:item > components]
"minecraft:wearable":{
    "dispensable" : true,
    "slot": "slot.chest"
}
```
:::

### 可用槽位
| 槽位名称            |
| -------------------- |
| slot.weapon.mainhand |
| slot.weapon.offhand  |
| slot.armor.head      |
| slot.armor.chest     |
| slot.armor.legs      |
| slot.armor.feet      |
| slot.hotbar          |
| slot.inventory       |
| slot.enderchest      |
| slot.saddle          |
| slot.armor           |
| slot.chest           |
| slot.equippable      |