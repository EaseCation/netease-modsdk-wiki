---
title: 方块形状
category: 文档
mentions:
    - SirLich
    - yanasakana
    - MedicalJewel105
    - aexer0e
    - Luthorius
    - Fabrimat
    - TheItsNameless
    - QuazChick
---

# 方块形状

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning 已弃用
方块形状功能已不再受官方支持，且无法应用于自定义方块，但仍可作用于原版方块。
:::

方块形状本质上是硬编码于原版游戏中的几何模型，这意味着它们的存在不依赖于可见建模文件。

## 应用方式

在资源包的`blocks.json`文件中，通过方块对象的`"blockshape"`子项进行定义。具体示例如下：

::: code-group
```json [RP/blocks.json]
"wiki:invisible_aluminium_ore": {
  "blockshape": "invisible",
  "sound": "stone",
  "textures": "invisible_aluminium_ore"
}
```
:::

## 已知方块形状列表

| 标识符 | 方块形状名称                 |
| --- | ------------------------- |
| -1  | invisible（不可见）         |
| 0   | block（普通方块）           |
| 1   | cross_texture（交叉纹理）    |
| 2   | torch（火把）               |
| 3   | fire（火焰）                |
| 4   | water（水体）               |
| 5   | red_dust（红石粉）          |
| 6   | rows（行排列）              |
| 7   | door（门）                  |
| 8   | ladder（梯子）              |
| 9   | rail（轨道）                |
| 10  | stairs（阶梯）              |
| 11  | fence（栅栏）               |
| 12  | lever（拉杆）               |
| 13  | cactus（仙人掌）            |
| 14  | bed（床）                   |
| 15  | diode（二极管）             |
| 18  | iron_fence（铁栏杆）        |
| 19  | stem（茎干）                |
| 20  | vine（藤蔓）                |
| 21  | fence_gate（栅栏门）        |
| 22  | chest（箱子）               |
| 23  | lilypad（睡莲）             |
| 25  | brewing_stand（炼药台）     |
| 26  | portal_frame（传送门框架）  |
| 28  | cocoa（可可豆）             |
| 31  | tree（树木）                |
| 32  | cobblestone_wall（圆石墙）  |
| 40  | double_plant（双层植物）    |
| 42  | flower_pot（花盆）          |
| 43  | anvil（铁砧）               |
| 44  | dragon_egg（龙蛋）          |
| 48  | structure_void（结构空位）  |
| 67  | block_half（半砖）          |
| 68  | top_snow（顶层雪）          |
| 69  | tripwire（绊线）            |
| 70  | tripwire_hook（绊线钩）     |
| 71  | cauldron（炼药锅）          |
| 72  | repeater（中继器）          |
| 73  | comparator（比较器）        |
| 74  | hopper（漏斗）              |
| 75  | slime_block（粘液块）       |
| 76  | piston（活塞）              |
| 77  | beacon（信标）              |
| 78  | chorus_plant（紫颂植物）    |
| 79  | chorus_flower（紫颂花）     |
| 80  | end_portal（末地传送门）    |
| 81  | end_rod（末地烛）           |
| 83  | skull（头颅）               |
| 84  | facing_block（朝向方块）    |
| 85  | command_block（命令方块）   |
| 86  | terracotta（陶瓦）          |
| 87  | double_side_fence（双面栅栏） |
| 88  | frame（物品展示框）         |
| 89  | shulker_box（潜影盒）       |
| 90  | doublesided_cross_texture（双面交叉纹理） |
| 91  | doublesided_double_plant（双面双层植物） |
| 92  | doublesided_rows（双面行排列） |
| 93  | element_block（元素方块）   |
| 94  | chemistry_table（化学工作台）|
| 96  | coral_fan（珊瑚扇）         |
| 97  | seagrass（海草）            |
| 98  | kelp（海带）                |
| 99  | trapdoor（活板门）          |
| 100 | sea_pickle（海泡菜）        |
| 101 | conduit（潮涌核心）         |
| 102 | turtle_egg（海龟蛋）        |
| 105 | bubble_column（气泡柱）     |
| 106 | barrier（屏障）             |
| 107 | sign（告示牌）              |
| 108 | bamboo（竹子）              |
| 109 | bamboo_sapling（竹笋）      |
| 110 | scaffolding（脚手架）       |
| 111 | grindstone（砂轮）          |
| 112 | bell（钟）                  |
| 113 | lantern（灯笼）             |
| 114 | campfire（营火）            |
| 115 | lectern（讲台）             |
| 116 | sweet_berry_bush（甜浆果丛）|
| 117 | cartography_table（制图台） |
| 119 | stonecutter_block（切石机） |
| 123 | chain（锁链）               |
| 126 | sculk_sensor（侦测器）      |
| 133 | azalea（杜鹃花丛）          |
| 133 | flowering_azalea（盛开的杜鹃花丛） |
| 134 | glow_frame（荧光物品展示框）|
| 135 | glow_lichen（发光地衣）     |

[原作者致谢](https://gist.github.com/toka7290/3bef704d2f57c775bb9ac84443a6df1c)