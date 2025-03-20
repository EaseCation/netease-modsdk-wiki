---
title: 菜单分类
mentions:
  - Warhead51707
  - yanasakana
  - SirLich
  - SmokeyStack
  - MedicalJewel105
  - Chikorita-Lover
  - MiemieMethod
  - retr0cube
  - TheItsNameless
  - QuazChick
---

# 菜单分类

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

菜单分类决定了物品和方块在创造模式物品栏和配方书中的显示位置。

- 通过定义`category`可将物品放置于特定标签页下（如"construction"建筑类）。点击[此处](#分类列表)查看有效分类列表。

- `group`参数用于指定物品所在的可展开分组。使用自定义值时不会创建新分组，但相同分组的物品会在创造模式物品栏中相邻排列。点击[此处](#分组列表)查看可展开分组列表。

- 设置`is_hidden_in_commands`为true可让该物品/方块无法通过`/give`和`/setblock`等命令获取。

若省略`menu_category`参数，物品将只能通过命令获取，且不会出现在创造模式物品栏或配方书中。

**注意：** 自定义刷怪蛋的菜单分类不可修改，需使用`minecraft:entity_placer`组件创建自定义物品实现类似功能。

::: code-group
```json [菜单分类配置]
"menu_category": {
  "category": "construction", // 物品所在的标签页
  "group": "itemGroup.name.door", // 可选 - 物品所在的展开分组
  "is_hidden_in_commands": false // 可选 - 默认为false（可通过命令使用）
}
```

:::danger 命令中隐藏物品不可访问的问题 ([MCPE-177866](https://bugs.mojang.com/browse/MCPE-177866))
当前版本中，将自定义物品（非方块）的category设为"none"会覆盖"is_hidden_in_commands"设置，导致无法通过命令使用该物品。此问题不影响方块类物品。
:::

## 方块示例

::: code-group
```json [BP/blocks/balsa_wood.json]
{
  "format_version": "1.20.50",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:balsa_wood",
      "menu_category": {
        "category": "nature",
        "group": "itemGroup.name.wood" // 归入可展开分组
      }
    }
  }
}
```
:::

## 物品示例

::: code-group
```json [BP/items/dagger.json]
{
  "format_version": "1.20.50",
  "minecraft:item": {
    "description": {
      "identifier": "wiki:dagger",
      "menu_category": {
        "category": "equipment",
        "is_hidden_in_commands": true // 无法通过命令使用
      }
    }
  }
}
```
:::

## 分类列表

_用于`menu_category`参数中的`category`属性_

| 分类名称     | 描述                                      |
| ------------ | ----------------------------------------- |
| construction | 显示在"建筑"标签页                        |
| equipment    | 显示在"装备"标签页                        |
| items        | 显示在"物品"标签页                        |
| nature       | 显示在"自然"标签页                        |
| none         | 不显示在任何标签页，只能通过命令获取      |

## 分组列表

_用于`menu_category`参数中的`group`属性_

<!-- page_dumper_start -->
| 创造模式分组:                  |
| ----------------------------- |
| itemGroup.name.anvil          |
| itemGroup.name.arrow          |
| itemGroup.name.axe            |
| itemGroup.name.banner         |
| itemGroup.name.banner_pattern |
| itemGroup.name.bed            |
| itemGroup.name.boat           |
| itemGroup.name.boots          |
| itemGroup.name.buttons        |
| itemGroup.name.candles        |
| itemGroup.name.chalkboard     |
| itemGroup.name.chest          |
| itemGroup.name.chestboat      |
| itemGroup.name.chestplate     |
| itemGroup.name.concrete       |
| itemGroup.name.concretePowder |
| itemGroup.name.cookedFood     |
| itemGroup.name.copper         |
| itemGroup.name.coral          |
| itemGroup.name.coral_decorations |
| itemGroup.name.crop           |
| itemGroup.name.door           |
| itemGroup.name.dye            |
| itemGroup.name.enchantedBook  |
| itemGroup.name.fence          |
| itemGroup.name.fenceGate      |
| itemGroup.name.firework       |
| itemGroup.name.fireworkStars  |
| itemGroup.name.flower         |
| itemGroup.name.glass          |
| itemGroup.name.glassPane      |
| itemGroup.name.glazedTerracotta |
| itemGroup.name.goatHorn       |
| itemGroup.name.grass          |
| itemGroup.name.hanging_sign   |
| itemGroup.name.helmet         |
| itemGroup.name.hoe            |
| itemGroup.name.horseArmor     |
| itemGroup.name.leaves         |
| itemGroup.name.leggings       |
| itemGroup.name.lingeringPotion|
| itemGroup.name.log            |
| itemGroup.name.minecart       |
| itemGroup.name.miscFood       |
| itemGroup.name.mobEgg         |
| itemGroup.name.monsterStoneEgg|
| itemGroup.name.mushroom       |
| itemGroup.name.netherWartBlock|
| itemGroup.name.ore            |
| itemGroup.name.permission     |
| itemGroup.name.pickaxe        |
| itemGroup.name.planks         |
| itemGroup.name.potion         |
| itemGroup.name.potterySherds  |
| itemGroup.name.pressurePlate  |
| itemGroup.name.rail           |
| itemGroup.name.rawFood        |
| itemGroup.name.record         |
| itemGroup.name.sandstone      |
| itemGroup.name.sapling        |
| itemGroup.name.sculk          |
| itemGroup.name.seed           |
| itemGroup.name.shovel         |
| itemGroup.name.shulkerBox     |
| itemGroup.name.sign           |
| itemGroup.name.skull          |
| itemGroup.name.slab           |
| itemGroup.name.smithing_templates |
| itemGroup.name.splashPotion   |
| itemGroup.name.stainedClay    |
| itemGroup.name.stairs         |
| itemGroup.name.stone          |
| itemGroup.name.stoneBrick     |
| itemGroup.name.sword          |
| itemGroup.name.trapdoor       |
| itemGroup.name.walls          |
| itemGroup.name.wood           |
| itemGroup.name.wool           |
| itemGroup.name.woolCarpet     |

*最后更新版本：1.20.10*
<!-- page_dumper_end -->