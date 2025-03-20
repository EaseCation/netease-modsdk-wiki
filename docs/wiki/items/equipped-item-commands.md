---
title: 通过装备物品运行命令
category: 巧思案例
tags:
    - 实验性
    - 中级
mentions:
    - Chikorita-Lover
    - MedicalJewel105
    - Luthorius
    - TheItsNameless
---

# 通过装备物品运行命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

附加组件开发中常见的需求是为新盔甲套装添加独特效果，就像海龟壳和下界合金盔甲那样。虽然物品本身具有击退抗性组件，但它们并没有在特定条件下施加生物效果、生成粒子等功能的原生组件。不过通过服务器动画、Molang查询和物品标签，我们可以轻松实现这些效果！

请注意，此方法需要修改玩家行为文件，这是许多附加组件的常见操作。因此如果使用此方法，你的附加包可能会与其他修改玩家行为的附加包产生兼容性问题。

> 有开发者发现可以通过实体骑乘机制替代直接修改玩家行为文件的方法。建议自行实验探索！

本教程需要使用假日创作者功能来添加物品标签，并方便地在盔甲栏或副手槽位装备物品。

## 服务器动画

第一步是创建服务器动画文件，这种文件可以在特定关键帧执行命令或触发事件。客户端动画存放在资源包中，而服务器动画则位于行为包内。更多信息可参阅[基于动画的计时器](/wiki/entities/timers#animation-based-timers)。以下模板可供参考：

::: code-group
```json [BP/animations/player.json]
{
    "format_version": "1.10.0",
    "animations": {
        "animation.player.emerald_armor": {
            "timeline": {
                "0.0": []
            },
            "animation_length": 0.05,
            "loop": true
        }
    }
}
```
:::

模板参数解析：

- `animation.player.emerald_armor` 是动画标识符，可自定义如`animation.player.phantom_armor`
- `timeline` 用于在指定时间点执行命令/事件
- `animation_length` 设置动画时长（0.05秒即1游戏刻）
- `loop` 控制是否循环播放

在时间轴中添加命令示例：

::: code-group
```json [BP/animations/player.json#timeline]
{
    "0.0": [
        "/effect @s speed 1 0"
    ]
}
```
:::

除了`/effect`，也可以使用`/function`、`/particle`等其他命令。完成服务器动画配置后，接下来需要设置物品行为。

## 物品行为

为了检测装备状态，我们需要使用Molang查询配合物品标签。以下情况可跳过本节：

- 检测原版物品（如通过`minecraft:iron_tier`标签检测铁质盔甲）
- 使用`q.is_item_name_any`通过物品ID检测

添加标签组件示例：

::: code-group
```json [BP/items/my_item.json#components]
"tag:example:emerald_tier": {}
```
:::

至此物品已拥有指定标签，可根据需要添加多个标签。

## 玩家行为

最后需要修改玩家行为文件来触发动画。主要操作在`description`部分完成。

首先为动画设置简称：

::: code-group
```json [BP/entities/player.json#description]
{
    "identifier": "minecraft:player",
    "is_spawnable": false,
    "is_summonable": false,
    "is_experimental": false,
    "animations": {
        "emerald_armor": "animation.player.emerald_armor"
    }
}
```
:::

接着在`scripts`中添加Molang条件检测：

检测方式选择：

- `q.is_item_name_any` 检测指定ID物品（示例检测双手是否持有图腾）：
```
q.is_item_name_any('slot.weapon.mainhand',0,'example:totem_of_retreat') || q.is_item_name_any('slot.weapon.offhand',0,'example:totem_of_retreat')
```

- `q.equipped_item_any_tag` 检测单标签存在（示例检测头部护甲标签）：
```
q.equipped_item_any_tag('slot.armor.head','example:emerald_tier','example:phantom_tier')
```

- `q.equipped_item_all_tags` 检测多标签共存：
```
q.equipped_item_all_tags('slot.armor.head','example:ancient_tier','example:emerald_tier')
```

应用示例：

::: code-group
```json [BP/entities/player.json#description]
{
    "identifier": "minecraft:player",
    "is_spawnable": false,
    "is_summonable": false,
    "is_experimental": false,
    "animations": {
        "emerald_armor": "animation.player.emerald_armor"
    },
    "scripts": {
        "animate": [
            {
                "emerald_armor": "q.equipped_item_any_tag('slot.armor.head','example:emerald_tier')"
            }
        ]
    }
}
```
:::

此配置会在玩家头部装备翡翠标签物品时触发动画。更多装备槽位标识符请参考[Minecraft Wiki](https://minecraft.wiki/w/Slot#Bedrock_Edition)。

## 总结

完成服务器动画、玩家行为和物品标签的配置后，装备特定物品即可执行自定义命令！此技术突破了物品组件的限制，为物品定制提供了更多可能性。如需扩展功能，请参考以下附加内容。

## 扩展应用

### 多件套装检测

检测全套装备示例：

::: code-group
```json [BP/entities/player.json#scripts]
"animate": [
    {
        "emerald_armor": "q.equipped_item_any_tag('slot.armor.head','example:emerald_tier') && q.equipped_item_any_tag('slot.armor.chest','example:emerald_tier') && q.equipped_item_any_tag('slot.armor.legs','example:emerald_tier') && q.equipped_item_any_tag('slot.armor.feet','example:emerald_tier')"
    }
]
```
:::

当四件护甲都具备指定标签时触发效果。

### 复合条件判断

仿照海龟壳的水下呼吸机制，添加血量条件：

::: code-group
```json [BP/entities/player.json#scripts]
"animate": [
    {
        "emerald_armor": "q.equipped_item_any_tag('slot.armor.head','example:emerald_tier') && q.health <= 5"
    }
]
```
:::

当玩家生命值≤2.5心时触发逃生效果。

复合条件示例：

::: code-group
```json [BP/entities/player.json#scripts]
{
    "animate": [
        {
            "emerald_armor": "q.equipped_item_any_tag('slot.armor.head','example:emerald_tier') && q.equipped_item_any_tag('slot.armor.chest','example:emerald_tier') && q.equipped_item_any_tag('slot.armor.legs','example:emerald_tier') && q.equipped_item_any_tag('slot.armor.feet','example:emerald_tier') && q.health <= 5"
        }
    ]
}
```
:::

完整Molang查询列表详见[bedrock.dev](https://bedrock.dev/docs/stable/Molang#List%20of%20Entity%20Queries)。

### 多物品系统

添加新物品效果时，可扩展动画文件：

::: code-group
```json [BP/animations/player.json]
{
    "format_version": "1.10.0",
    "animations": {
        "animation.player.emerald_armor": {
            "timeline": {
                "0.0": ["..."]
            },
            "animation_length": 0.05,
            "loop": true
        },
        "animation.player.phantom_armor": {
            "timeline": {
                "0.0": ["..."]
            },
            "animation_length": 0.05,
            "loop": true
        }
    }
}
```
:::

同步更新玩家行为文件：

::: code-group
```json [BP/entities/player.json#description]
{
    "identifier": "minecraft:player",
    "is_spawnable": false,
    "is_summonable": false,
    "is_experimental": false,
    "animations": {
        "emerald_armor": "animation.player.emerald_armor",
        "phantom_armor": "animation.player.phantom_armor"
    },
    "scripts": {
        "animate": [
            {
                "emerald_armor": "q.equipped_item_any_tag('slot.armor.head','example:emerald_tier')"
            },
            {
                "phantom_armor": "q.equipped_item_any_tag('slot.armor.head','example:phantom_tier')"
            }
        ]
    }
}
```
:::