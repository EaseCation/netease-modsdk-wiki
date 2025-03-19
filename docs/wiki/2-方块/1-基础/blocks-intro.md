---
title: 方块入门
description: A "Hello world" guide in making blocks. Learn the block format and how to create basic custom blocks.
category: General
nav_order: 1
---

# 方块入门

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式版本 & 最低引擎版本 `1.20.30`
本页介绍基础方块特性。更多方块组件内容请访问[此处](/blocks/block-components)。
:::

:::danger <nbsp/>
原版方块的逻辑是硬编码实现的，无法被修改或访问。
:::

Minecraft 基岩版允许我们添加具有多种类原版特性的自定义方块。自定义方块可以拥有多阶段生长（如植物）、方向朝向等实用功能。

本教程将指导如何在稳定版 Minecraft 中创建基础方块。

## 注册方块

方块定义的结构与实体类似：包含行为描述和定义方块特性的组件列表。

与实体不同，方块除`RP/blocks.json`外没有其他资源定义。

以下是将自定义方块加入创造模式物品栏所需的**最低限度**行为包代码：

::: code-group

```json [BP/blocks/custom_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_block",
      "menu_category": {
        "category": "construction", // 方块所在的创造模式物品栏或配方书标签
        "group": "itemGroup.name.concrete", // 方块所属的可展开分组（可选）
        "is_hidden_in_commands": false // 是否在命令中隐藏该方块（可选）
      }
    },
    "components": {} // 必须保留，即使为空！
  }
}
```
:::

### 方块描述

-   定义方块的`identifier` - 采用`命名空间:标识符`格式的唯一ID
-   配置方块的`menu_category`归属
    -   可选参数`group`和`is_hidden_in_commands`

_方块描述还包含[状态](/blocks/block-states)和[特性](/blocks/block-traits)，相关内容请参见对应页面。_

## 添加组件

目前我们的自定义方块使用的是默认组件值（可参考[此处](/blocks/block-components)）。

现在开始自定义功能配置！

::: code-group

```json [BP/blocks/custom_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_block",
      "menu_category": {
        "category": "construction"
      }
    },
    "components": {
      "minecraft:destructible_by_mining": {
        "seconds_to_destroy": 3
      },
      "minecraft:destructible_by_explosion": {
        "explosion_resistance": 3
      },
      "minecraft:friction": 0.4,
      "minecraft:map_color": "#ffffff",
      "minecraft:light_dampening": 0,
      "minecraft:light_emission": 4,
      "minecraft:loot": "loot_tables/blocks/custom_block.json"
    }
  }
}
```
:::

-   [`minecraft:destructible_by_mining`](/blocks/block-components#destructible-by-mining) 定义玩家破坏方块所需时间（目前无法为不同工具设置不同破坏时间）
-   [`minecraft:destructible_by_explosion`](/blocks/block-components#destructible-by-explosion) 定义抗爆性。值越高，被炸毁概率越低
-   [`minecraft:friction`](/blocks/block-components#friction) 定义方块摩擦系数。例如灵魂沙具有高摩擦值会减缓玩家，冰的低摩擦值则产生滑溜效果。经典方块（如木头/石头）的摩擦系数为`0.4`
-   [`minecraft:map_color`](/blocks/block-components#map-color) 是地图上显示的代表色（十六进制）。`#ffffff`代表白色，可通过[在线取色器](https://www.google.com/search?q=hex+color+picker)获取其他颜色代码
-   [`minecraft:light_dampening`](/blocks/block-components#light-dampening) 定义光线阻挡程度
-   [`minecraft:light_emission`](/blocks/block-components#light-emission) 定义方块发光等级
-   [`minecraft:loot`](/blocks/block-components#loot) 定义战利品表路径。若移除，方块将默认掉落自身。更多战利品表信息请访问[此处](/loot/loot-tables)

_更多组件配置请访问[方块组件手册](/blocks/block-components)!_

## 应用纹理

:::warning
`RP/blocks.json`会忽略命名空间。即使不写命名空间或随意填写也不会产生影响。若自定义方块与原版方块同名（仅命名空间不同）可能导致问题
:::
:::tip <nbsp/>
[方块音效](/blocks/block-sounds)也可在`RP/blocks.json`中定义
:::

对于基础的16×16×16像素方块，纹理应在`RP/blocks.json`中定义。

如需使用自定义模型，应使用[geometry（几何组件）](/blocks/block-components#geometry)和[material_instances（材质实例）](/blocks/block-components#material-instances)。

::: code-group

```json [RP/blocks.json]
{
  "format_version": [1, 1, 0],
  "wiki:custom_block": {
    "textures": "custom_block", // 此纹理简称需在下方terrain_texture.json中定义
    "sound": "grass"
  }
}
```
:::

现在需要在`RP/textures/terrain_texture.json`中关联纹理简称与图片路径：

::: code-group

```json [RP/textures/terrain_texture.json]
{
  "texture_name": "atlas.terrain",
  "resource_pack_name": "wiki", // 资源包ID
  "padding": 8, // 防止纹理视觉溢出
  "num_mip_levels": 4, // 远距离/倾斜视角下的纹理质量
  "texture_data": {
    // 我们的纹理简称：
    "custom_block": {
      "textures": "textures/blocks/custom_block" // 指向图片文件名
    }
  }
}
```
:::

### 分面纹理

纹理可按面分别设置。例如一个自定义"指南针方块"可使用以下✨惊艳✨纹理：

`textures/blocks/compass_block_down.png`

<WikiImage src="/assets/images/blocks/blocks-intro/compass_block_down.png" pixelated="true" width="64"/>

`textures/blocks/compass_block_up.png`

<WikiImage src="/assets/images/blocks/blocks-intro/compass_block_up.png" pixelated="true" width="64"/>

`textures/blocks/compass_block_north.png`

<WikiImage src="/assets/images/blocks/blocks-intro/compass_block_north.png" pixelated="true" width="64"/>

`textures/blocks/compass_block_east.png`

<WikiImage src="/assets/images/blocks/blocks-intro/compass_block_east.png" pixelated="true" width="64"/>

`textures/blocks/compass_block_south.png`

<WikiImage src="/assets/images/blocks/blocks-intro/compass_block_south.png" pixelated="true" width="64"/>

`textures/blocks/compass_block_west.png`

<WikiImage src="/assets/images/blocks/blocks-intro/compass_block_west.png" pixelated="true" width="64"/>

<br>
<br>

对应的`blocks.json`配置如下：

::: code-group

```json [RP/blocks.json]
{
  "format_version": [1, 1, 0],
  "wiki:compass_block": {
    "textures": {
      "down": "compass_block_down",
      "up":  "compass_block_up",
      "north":  "compass_block_north",
      "east": "compass_block_east",
      "south":  "compass_block_south",
      "west": "compass_block_west"
    }
  }
}
```
:::

<br>

若使用[材质实例](/blocks/block-components#material-instances)，配置示例如下：

::: code-group

```json [minecraft:block > components]
"minecraft:material_instances": {
  "*": {
    "texture": "compass_block_down" // 此纹理用于破坏粒子效果
  },
  "up": {
    "texture": "compass_block_up"
  },
  "north": {
    "texture": "compass_block_north"
  },
  "east": {
    "texture": "compass_block_east"
  },
  "south": {
    "texture": "compass_block_south"
  },
  "west": {
    "texture": "compass_block_west"
  }
}
```
:::

对应的`terrain_texture.json`数据：

::: code-group

```json [RP/textures/terrain_texture.json]
{
  "texture_name": "atlas.terrain",
  "resource_pack_name": "wiki",
  "padding": 8,
  "num_mip_levels": 4,
  "texture_data": {
    "compass_block_down": {
      "textures": "textures/blocks/compass_block_down"
    },
    "compass_block_up": {
      "textures": "textures/blocks/compass_block_up"
    },
    "compass_block_north": {
      "textures": "textures/blocks/compass_block_north"
    },
    "compass_block_east": {
      "textures": "textures/blocks/compass_block_east"
    },
    "compass_block_west": {
      "textures": "textures/blocks/compass_block_west"
    },
    "compass_block_south": {
      "textures": "textures/blocks/compass_block_south"
    }
  }
}
```
:::

## 定义名称

最后定义方块的显示名称：

::: code-group

```c [RP/texts/en_US.lang]
tile.wiki:custom_block.name=自定义方块
tile.wiki:compass_block.name=指南针方块
```
:::

更多本地化内容请访问[文本与翻译指南](/concepts/text-and-translations)。

## 成果总结

通过本教程，您已掌握：

<Checklist>

-   [x] 方块基础特性
-   [x] 如何应用统一纹理
-   [x] 如何设置分面纹理

</Checklist>

...但这只是开始，更多精彩内容等待探索！

## 下一步学习

<MyFeatures :items="[
  {
    title: '扩展功能',
    desc: '学习各类可用方块组件打造独特玩法。使用geometry（几何组件）为方块添加自定义模型！还可以通过collision_box（碰撞箱）和selection_box（选择框）配置物理交互区域。',
    link: '/blocks/block-components',
    image: 'assets/images/homepage/crafting_table_0.png'
  },
  {
    title: '创建变体',
    desc: '利用方块状态和permutations（状态切换）实现条件触发的组件功能。例如为储液罐方块添加多级液面高度功能，并支持多种液体类型。',
    image: 'assets/images/homepage/scripting.png'
  },
  {
    title: '复刻原版',
    desc: '在原版复刻分类中查看多个完整实现案例。从简单的自定义玻璃方块开始，体验material_instances（材质实例）的应用！',
    link: '/blocks/block-components',
    image: 'assets/images/homepage/diamond_ore_0.png'
  }
]" />