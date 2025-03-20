---
title: 矿石战利品表
category: 巧思案例
tags:
    - 简单
mentions:
    - SykoUSS
    - ExDrill
    - MedicalJewel105
    - SmokeyStack
    - Chikorita-Lover
    - SirLich
    - TheItsNameless
    - QuazChick
    - Keyyard
---

# 矿石战利品表

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip 格式版本 `1.20.30`
本教程假设您已具备方块基础知识。
开始前请先查阅[方块指南](/wiki/blocks/blocks-intro)。
:::

::: warning 实验性功能
需要启用`假日创造者特性`来触发事件。
:::

本教程旨在展示一种通过战利品表创建自定义矿石方块的全新方法。使用`minecraft:loot`组件时将始终调用指定战利品表，而通过在战利品表中添加`match_tool`条件，可以逐池限定挖掘工具要求。

- 特性：

  -   可使用指定工具挖掘（本教程以铁镐为例）
  -   可指定工具附魔等级
  -   经验值掉落支持

- 限制：

  -   所有工具需逐个单独指定
  -   非玩家破坏方式（爆炸/指令等）不会触发掉落

## 方块JSON

以下方块行为文件可作为模板使用。记得通过`terrain_texture.json`设置方块纹理。

::: code-group
```json [BP/blocks/silver_ore.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:silver_ore",
      "menu_category": {
        "category": "nature",
        "group": "itemGroup.name.ore"
      }
    },
    "components": {
      ...
      // 触发加载带有经验奖励结构的事件
      "minecraft:on_player_destroyed": {
        "event": "wiki:xp_reward"
      },
      "minecraft:loot": "loot_tables/blocks/silver_ore.json" // 使用精准采集时不会掉落
    },
    "events": {
      "wiki:xp_reward": {
        "run_command": {
          "command": [
            "structure load ore_xp_reward ~~~" // 需下载下方预存经验球的结构文件
          ]
        }
      }
    }
  }
}
```

## 战利品表

以下示例展示了必需组件

::: code-group
```json [BP/loot_tables/blocks/silver_ore.json]
{
  "pools": [
    {
      "rolls": 1,
      "conditions": [
        {
          "condition": "match_tool",
          "item": "minecraft:iron_pickaxe",
          "count": 1
        }
      ],
      "entries": [
        {
          "type": "item",
          "name": "wiki:raw_silver"
        }
      ]
    }
  ]
}
```

## 附魔等级限定

可通过添加`enchantments`区间限定附魔等级。注意每组工具及其等级需独立成池。

目前兼容检测1级和2级附魔。

::: code-group
```json [BP/loot_tables/blocks/silver_ore.json#pools]
"conditions": [
  {
    "condition": "match_tool",
    "item": "minecraft:iron_pickaxe",
    "count": 1,
    "enchantments": [
      {
        "fortune": {
          "level": 1
        }
      }
    ]
  }
]
```

## 非实验性方案

若不想通过方块事件触发经验奖励，可选用以下替代方案。

请从[此处](#下载结构文件)下载内含经验球的`ore_xp_reward`结构文件。

### 方案一：虚拟物品与循环函数

**步骤1**：为需要掉落经验的方块创建战利品表。以"minecraft:redstone"为例：

```json
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:redstone"
        }
      ]
    },
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:barrier" // 虚拟物品
        }
      ]
    }
  ]
}
```

此处添加已有物品"minecraft:barrier"作为触发经验掉落的虚拟物品，也可创建专用虚拟物品。

**步骤2**：创建循环函数处理掉落物品。需在`BP/functions/tick.json`中定义：

```c
execute as @e[type=item, name="Barrier"] at @s run structure load ore_xp_reward ~~~
execute as @e[type=item, name="Barrier"] run kill
```

该函数会捕捉名为"Barrier"的掉落物，加载经验奖励结构后销毁虚拟物品。

### 方案二：纯函数循环

**步骤1**：创建基础战利品表。以"wiki:raw_silver"为例：

```json
{
  "pools": [
    {
      "entries": [
        {
          "type": "item",
          "name": "wiki:raw_silver"
        }
      ]
    }
  ]
}
```

**步骤2**：创建标记处理函数。需在`BP/functions/tick.json`中定义：

```c
execute as @e[type=item, name="Raw Silver", tag=!xp] at @s run structure load ore_xp_reward ~~~
execute as @e[type=item, name="Raw Silver", tag=!xp] run tag @s add xp
```

该函数为所有未标记"xp"的银矿掉落物加载经验结构，并通过标签防止重复触发。

请根据实际情况调整物品ID、标签等参数。

## 下载结构文件

<BButton link="/assets/packs/tutorials/blocks/ore-loot-tables/ore_xp_reward.mcstructure" download color=blue> 下载MCSTRUCTURE</BButton>

## 实际效果

![](/assets/images/blocks/ore-loot/result.gif)