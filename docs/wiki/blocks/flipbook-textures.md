---
title: 纹理动画
category: 巧思案例
tags:
    - 中级
mentions:
    - MedicalJewel105
    - SquisSloim
    - SmokeyStack
    - QuazChick
---

# 纹理动画

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

通过本文你将了解：

-   如何为方块应用翻页书贴图
-   `RP/textures/flipbook_textures.json` 中可用的参数及其作用

## 应用翻页书贴图

翻页书贴图即动态纹理。火焰、水、岩浆和岩浆块等方块都使用此类贴图。你也可以为自己创建的方块添加动态纹理！

首先以原版岩浆的动效贴图为例。只需在材质实例组件中将 `texture` 值设为 `Vanilla RP/textures/terrain_texture.json` 中定义的纹理名称即可：

```json
"magma": {
  "textures": "textures/blocks/magma"
}
```

::: code-group
```json [BP/blocks/flipbook_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:flipbook_block",
      "menu_category": {
        "category": "construction"
      }
    },
    "components": {
      "minecraft:unit_cube": {},
      "minecraft:material_instances": {
        "*": {
          "texture": "magma" // 将纹理名称填在此处
        }
      }
    }
  }
}
```
:::

![](/assets/images/blocks/flipbook-textures/animated_texture_1.gif)

现在你的方块已经拥有动态纹理了！

## 定义翻页书贴图

在为方块添加动态纹理后，我们需要了解其工作原理。

1. 游戏会根据 `terrain_texture.json` 中定义的纹理名称（如 magma）读取对应贴图路径

::: code-group
```json [RP/textures/terrain_texture.json]
{
  "texture_name": "atlas.terrain",
  "resource_pack_name": "wiki",     // 资源包ID
  "padding": 8,                     // 防止贴图边缘像素溢出
  "num_mip_levels": 4,              // 控制远视角和倾斜视角下的材质质量
  "texture_data": {
    "magma": {
      "textures": "textures/blocks/magma"
    }
  }
}
```
:::

2. 游戏会根据上述名称（magma）在 `flipbook_textures.json` 中查找对应的动画参数

::: code-group
```json [RP/textures/flipbook_textures.json]
[
  {
    "atlas_tile": "magma",
    "flipbook_texture": "textures/blocks/magma",
    "ticks_per_frame": 10
  }
]
```
:::

`"atlas_tile"` 表示将动画参数绑定到 `terrain_texture.json` 中定义的 magma 纹理名称。

3. 所有使用 `magma` 作为纹理的方块都将应用此动态纹理

## 翻页书贴图参数配置

在查阅官方示例时，你可能会发现一些额外的配置参数：

| 参数名              | 类型             | 描述                                                                                              |
|--------------------|------------------|-------------------------------------------------------------------------------------------------|
| flipbook_texture   | string           | 纹理文件路径                                                                                       |
| atlas_tile         | string           | 在terrain_textures.json中定义的短名称                                                                 |
| atlas_index        | integer          | 短名称对应的纹理数组中目标纹理的索引                                                                     |
| atlas_tile_variant | integer          | 短名称对应的方块变体数组中纹理的变化索引                                                                   |
| ticks_per_frame    | integer          | 帧切换速度（单位：ticks，20 ticks = 1秒）                                                              |
| frames             | array 或 integer | 帧索引数组；或表示总帧数的整数值                                                                            |
| replicate          | integer          | 像素倍数（仅允许2的幂次值），默认：1                                                                       |
| blend_frames       | boolean          | 是否启用帧过渡平滑效果，默认：true                                                                        |

### `atlas_index`

用于指定需要添加动画效果的纹理在数组中的索引位置

::: code-group
```json [RP/textures/terrain_texture.json#texture_data]
"dirt": {
  "textures": [
    "textures/blocks/dirt",
    "textures/blocks/coarse_dirt" // 假设此纹理需要添加动效
  ]
}
```
:::

由于要设置第二个纹理（索引为1）的动效，需要在对应配置中设置 `"atlas_index": 1`

### `atlas_tile_variant`

用于指定需要添加动画效果的方块变体（需在 `variations` 数组中定义）索引

::: code-group
```json [RP/textures/terrain_texture.json#texture_data]
"dirt": {
  "textures": [
    {
      "variations": [
        { "path": "textures/blocks/dirt_va" }, // 假设此变体需要添加动效
        { "path": "textures/blocks/dirt0" },
        { "path": "textures/blocks/dirt1" }
      ]
    }
  ]
}
```
:::

若需要设置索引1的变体动画，需在参数中添加 `"atlas_tile_variant": 1`

### `replicate`

控制贴图像素显示倍数。仅允许使用2的幂次数值，当原帧分辨率较小时可实现像素扩展效果

| 参数值              | 效果说明                     |
|--------------------|----------------------------|
| < 0                | 动画失效                    |
| 0                  | 动画失效且贴图不显示           |
| 2                  | 每像素扩展为4格（尺寸缩小1/2）  |
| x                  | 每像素扩展为x²格（尺寸缩小1/x） |

## 效果展示

![](/assets/images/blocks/flipbook-textures/animated_texture_2.gif)

现在你可以开始修改原版动效贴图或创作属于你的动态纹理了！