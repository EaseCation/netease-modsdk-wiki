---
title: 方块故障排除
category: 基础
tags:
    - help
mentions:
    - SmokeyStack
    - SirLich
    - aexer0e
    - MedicalJewel105
    - Sprunkles137
    - QuazChick
---

# 方块故障排除

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip
本页包含关于_方块_的故障排除信息。在继续阅读前，建议先查阅我们的[全局故障排除指南](/wiki/guide/troubleshooting)。
:::

## 0.0 - 常见问题

> "我按照教程制作方块时遇到了问题！"

无需惊慌！本页将帮助您排查常见问题。

## 1.0 - 纹理问题排查

修复与方块纹理相关的常见问题。

## 1.1 - 纹理显示为黑紫相间

我们将分析三种不同布局的方块类型：

- 类似泥土的方块 ![](/assets/images/blocks/block_tr/tr_dirt.png)
- 类似原木的方块 ![](/assets/images/blocks/block_tr/tr_log.png)
- 类似草块的方块 ![](/assets/images/blocks/block_tr/tr_grass.png)

请定位至 `RP/textures/terrain_texture.json` 文件，确保文件名正确。

::: code-group
```json [RP/textures/terrain_texture.json]
{
  "texture_name": "atlas.terrain",
  "resource_pack_name": "wiki",
  "padding": 8,
  "num_mip_levels": 4,
  "texture_data": {
    "dirt_like": {
      "textures": "textures/blocks/dirt_like" // 此处可替换为任意内容，但需记住此名称
    },
    "log_like_top": {
      "textures": "textures/blocks/log_like_top" // 此处可替换为任意内容，但需记住此名称
    },
    "log_like_side": {
      "textures": "textures/blocks/log_like_side" // 此处可替换为任意内容，但需记住此名称
    },
    "custom_grass_top": {
      "textures": "textures/blocks/custom_grass_top" // 此处可替换为任意内容，但需记住此名称
    },
    "custom_grass_bottom": {
      "textures": "textures/blocks/custom_grass_bottom" // 此处可替换为任意内容，但需记住此名称
    },
    "custom_grass_side": {
      "textures": "textures/blocks/custom_grass_side" // 此处可替换为任意内容，但需记住此名称
    }
  }
}
```
:::

接下来检查方块配置文件，确保包含 `material_instances` 组件。

类似泥土的方块配置示例：

::: code-group
```json [BP/blocks/dirt_like.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:dirt_like"
    },
    "components": {
      "minecraft:material_instances": {
        "*": {
          "texture": "dirt_like"
        }
      }
    }
  }
}
```
:::

类似原木的方块配置示例：

::: code-group
```json [BP/blocks/log_like.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:log_like"
    },
    "components": {
      "minecraft:material_instances": {
        "*": {
          "texture": "log_like_side"
        },
        "end": {
          "texture": "log_like_top"
        },
        "up": "end",
        "down": "end"
      }
    }
  }
}
```
:::

类似草块的配置示例：

::: code-group
```json [BP/blocks/custom_grass.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_grass"
    },
    "components": {
      "minecraft:material_instances": {
        "*": {
          "texture": "custom_grass_side"
        },
        "up": {
          "texture": "custom_grass_top"
        },
        "down": {
          "texture": "custom_grass_bottom"
        }
      }
    }
  }
}
```
:::

正确配置后，方块的纹理应正常显示。

## 1.2 - 纹理显示为带"Update"字样的泥土块

问题现象：自定义方块变成带有绿色文字的泥土方块。

![](/assets/images/blocks/block_tr/tr_update.png)

这是_未知方块_的标识，通常由以下原因引起：
- 方块标识符被修改
- 方块JSON文件格式错误

解决方案：
1. 使用JSON校验工具检查文件格式
2. 确认方块标识符未更改
3. 确保方块配置包含以下任意组件：
   - `minecraft:unit_cube`
   - `minecraft:geometry`
   - `minecraft:material_instances`
   - 或正确配置了 `RP/blocks.json` 中的纹理条目


## 2.0 - 渲染问题排查

本节将描述常见的方块渲染问题及解决方案。

## 2.1 - 透明效果失效

问题现象：纹理中的透明像素在游戏中显示为不透明。

解决方案：在方块的 `material_instances` 组件中添加渲染方法：

::: code-group
```json [BP/blocks/your_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    ...
    "components": {
      "minecraft:material_instances": {
        "*": {
          "render_method": "alpha_test"
        }
      }
    }
  }
}
```
:::

## 2.2 - 方块产生阴影

问题现象：自定义几何体方块产生阴影。

解决方案：在方块组件中添加光照衰减配置：

::: code-group
```json [minecraft:block > components]
"minecraft:light_dampening": 0
```
:::

## 2.3 - 模型立方体在物品栏中重叠

问题现象：自定义几何体方块在物品栏中呈现异常堆叠：

![](/assets/images/blocks/block_tr/inventory_render_cubes.png)

解决方案：在Blockbench中调整立方体绘制顺序（从下到上）：

```
cube_middle      cube_bottom
cube_top     ->  cube_middle
cube_bottom      cube_top
```

## 2.4 - 方块在物品栏中显示过小

问题现象：16³标准尺寸方块在物品栏中比原版方块小。

解决方案分析：
- 使用 `RP/blocks.json` 配置纹理可使方块正常显示，但无法使用自定义模型
- 使用 `material_instances` 组件时需配合以下配置：
  - 添加旋转组件需同时配置材质实例
  - 使用单位立方体或自定义几何体
  - 确保基础状态使用 `blocks.json` 配置

---

## 3.0 - 常见日志错误

本节将解析常见的日志报错信息。

## 3.1 - 碰撞/选择框错误

典型错误提示：

> `[Blocks][error]-minecraft:collision_box: min 值不能低于 (-8, 0, -8)，max 值不能超过 (8, 16, 8)`

排查步骤：
- 检查 X/Z 轴数值是否在 -8 至 8 范围内
- 检查 Y 轴数值是否在 0 至 16 范围内
- 确保碰撞框不超过 16×16×16 单位区域

## 3.2 - 模型尺寸错误

典型错误提示：

> `geometry.your_block 包含 X 个超出范围的立方体...`

解决方案：
- 缩小几何体尺寸
- 将大型模型拆分为多个方块

---

## 后续步骤

若问题仍未解决，欢迎加入Discord社区交流。如发现文档内容有误，请通过GitHub提交修正建议！