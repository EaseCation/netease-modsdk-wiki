---
title: 原版使用组件
category: 文档
mentions:
    - MedicalJewel105
---

# 原版使用组件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本页面由 [Wiki内容生成器](https://github.com/Bedrock-OSS/bedrock-wiki-content-generator) 创建。如有问题请联系 [Bedrock OSS](https://discord.gg/XjV87YN) Discord 服务器。  
注意：为保持页面加载速度，每个组件最多展示8个示例。命名空间 `minecraft` 已省略。  
如需查看完整内容，请访问[此处](/wiki/items/vui-full)。*最后更新版本：1.20.10*

## block

<Spoiler title="显示">

camera

::: code-group
```json [原始CodeHeader的值]
"minecraft:block": "minecraft:camera"
```
:::

</Spoiler>

## camera

<Spoiler title="显示">

camera

::: code-group
```json [原始CodeHeader的值]
"minecraft:camera": {
    "black_bars_duration": 0.2,
    "black_bars_screen_ratio": 0.08,
    "shutter_duration": 0.2,
    "picture_duration": 1.0,
    "slide_away_duration": 0.2
}
```
:::

</Spoiler>

## foil

<Spoiler title="显示">

appleEnchanted

::: code-group
```json [原始CodeHeader的值]
"minecraft:foil": true
```
:::

golden_apple

::: code-group
```json [原始CodeHeader的值]
"minecraft:foil": false
```
:::

</Spoiler>

## food

<Spoiler title="显示">

apple

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 4, // 营养值
    "saturation_modifier": "low" // 饱和度修正：低
}
```
:::

appleEnchanted

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 4,
    "saturation_modifier": "supernatural", // 超自然饱和度
    "can_always_eat": true, // 可随时食用
    "effects": [ // 效果列表
        {
            "name": "regeneration", // 再生
            "chance": 1.0, // 触发概率
            "duration": 30, // 持续时间（秒）
            "amplifier": 4 // 效果等级
        },
        {
            "name": "absorption", // 伤害吸收
            "chance": 1.0,
            "duration": 120,
            "amplifier": 3
        },
        {
            "name": "resistance", // 抗性提升
            "chance": 1.0,
            "duration": 300,
            "amplifier": 0
        },
        {
            "name": "fire_resistance", // 火焰抗性
            "chance": 1.0,
            "duration": 300,
            "amplifier": 0
        }
    ]
}
```
:::

baked_potato

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 5,
    "saturation_modifier": "normal" // 普通饱和度
}
```
:::

beef

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 3,
    "saturation_modifier": "low"
}
```
:::

beetroot

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 1,
    "saturation_modifier": "normal"
}
```
:::

beetroot_soup

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 6,
    "saturation_modifier": "normal",
    "using_converts_to": "bowl" // 使用后转换为碗
}
```
:::

bread

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 5,
    "saturation_modifier": "normal"
}
```
:::

carrot

::: code-group
```json [原始CodeHeader的值]
"minecraft:food": {
    "nutrition": 3,
    "saturation_modifier": "normal"
}
```
:::

</Spoiler>

## hand_equipped

<Spoiler title="显示">

appleEnchanted

::: code-group
```json [原始CodeHeader的值]
"minecraft:hand_equipped": false // 是否手持装备
```
:::

</Spoiler>

## max_damage

<Spoiler title="显示">

clownfish

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_damage": 0 // 最大耐久值
```
:::

cooked_fish

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_damage": 0
```
:::

cooked_salmon

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_damage": 0
```
:::

fish

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_damage": 0
```
:::

pufferfish

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_damage": 0
```
:::

salmon

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_damage": 0
```
:::

</Spoiler>

## max_stack_size

<Spoiler title="显示">

beetroot_soup

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_stack_size": 1 // 最大堆叠数量
```
:::

honey_bottle

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_stack_size": 16
```
:::

mushroom_stew

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_stack_size": 1
```
:::

rabbit_stew

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_stack_size": 1
```
:::

suspicious_stew

::: code-group
```json [原始CodeHeader的值]
"minecraft:max_stack_size": 1
```
:::

</Spoiler>

## seed

<Spoiler title="显示">

beetroot_seeds

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "beetroot" // 种植产物
}
```
:::

carrot

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "carrots"
}
```
:::

glow_berries

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "cave_vines", // 洞穴藤蔓
    "plant_at": [ // 可种植位置
        "cave_vines",
        "cave_vines_head_with_berries"
    ],
    "plant_at_any_solid_surface": true, // 可在任意固体表面种植
    "plant_at_face": "DOWN" // 种植面：下方
}
```
:::

melon_seeds

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "melon_stem" // 西瓜茎
}
```
:::

nether_wart

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "plant_at": "soul_sand", // 必须种植在灵魂沙上
    "crop_result": "nether_wart"
}
```
:::

pitcher_pod

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "pitcher_crop" // 投手作物
}
```
:::

potato

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "potatoes"
}
```
:::

pumpkin_seeds

::: code-group
```json [原始CodeHeader的值]
"minecraft:seed": {
    "crop_result": "pumpkin_stem" // 南瓜茎
}
```
:::

</Spoiler>

## stacked_by_data

<Spoiler title="显示">

appleEnchanted

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true // 允许数据值堆叠
```
:::

clownfish

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

cooked_fish

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

cooked_salmon

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

fish

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

golden_apple

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

pufferfish

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

salmon

::: code-group
```json [原始CodeHeader的值]
"minecraft:stacked_by_data": true
```
:::

</Spoiler>

## use_duration

<Spoiler title="显示">

apple

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32 // 使用耗时（tick）
```
:::

appleEnchanted

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32
```
:::

baked_potato

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32
```
:::

beef

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32
```
:::

beetroot

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32
```
:::

beetroot_soup

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32
```
:::

bread

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 32
```
:::

camera

::: code-group
```json [原始CodeHeader的值]
"minecraft:use_duration": 100000
```
:::

</Spoiler>