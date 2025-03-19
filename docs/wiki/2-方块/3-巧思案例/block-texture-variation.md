---
title: 纹理变体
category: 教程
tags:
    - 中级
mentions:
    - SirLich
    - solvedDev
    - Hatchibombotar
    - SmokeyStack
    - MedicalJewel105
    - QuazChick
---

# 纹理变体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

方块纹理变体是指单个方块可以拥有多个纹理。这在需要表现细微差异的方块（如带有小石块的泥土或不同生长阶段的草方块）时非常实用。

要启用纹理变体功能，需在资源包的`textures`文件夹中创建`terrain_texture.json`文件。在方块定义中，纹理应设置为包含`variations`键的字典，该键对应一个由字典组成的数组。每个字典必须包含指向纹理文件的`path`键，并可添加`weight`参数控制纹理出现的概率。

## 应用纹理变体

以下是为泥土方块创建三种纹理变体的示例：

- 在资源包中创建`textures/terrain_texture.json`文件
- 在JSON文件中定义需要添加变体的方块，示例如下：

::: code-group
```json [RP/textures/terrain_texture.json]
{
  "texture_name": "atlas.terrain",
  "resource_pack_name": "wiki", // 资源包ID
  "padding": 8, // 防止纹理视觉溢出
  "num_mip_levels": 4, // 远距离/倾斜视角下的纹理质量
  "texture_data": {
    "dirt": {
      "textures": {
        "variations": [
          { "path": "textures/blocks/dirt0" },
          { "path": "textures/blocks/dirt1" },
          { "path": "textures/blocks/dirt2" }
        ]
      }
    }
  }
}
```
:::

- 创建或修改三个泥土纹理文件，分别命名为`dirt0.png`、`dirt1.png`和`dirt2.png`
- 将纹理文件放置于`path`参数指定的路径下（可添加子文件夹保持整洁）

## 权重控制变体分布

完成基础配置后，可通过添加权重值调整纹理出现概率：

::: code-group
```json [RP/textures/terrain_texture.json]
{
  "texture_name": "atlas.terrain",
  "resource_pack_name": "wiki", // 资源包ID
  "padding": 8, // 防止纹理视觉溢出
  "num_mip_levels": 4, // 远距离/倾斜视角下的纹理质量
  "texture_data": {
    "dirt": {
      "textures": {
        "variations": [
          { "path": "textures/blocks/dirt0", "weight": 70 }, // 70%出现概率
          { "path": "textures/blocks/dirt1", "weight": 20 }, // 20%出现概率
          { "path": "textures/blocks/dirt2", "weight": 10 }  // 10%出现概率
        ]
      }
    }
  }
}
```
:::

注意事项：

- 当前版本存在纹理集文件引用问题，可能导致无法正确识别MER文件或常规纹理文件
    -- [官方漏洞报告](https://bugs.mojang.com/browse/MCPE-126617)