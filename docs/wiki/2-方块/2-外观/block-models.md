---
title: 创建方块模型
category: 教程
tags:
    - 新手
    - 简单
mentions:
    - QuazChick
---

# 创建方块模型

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

尽管自定义方块无法使用原版的[方块形状](/blocks/block-shapes)，但我们可以创建遵循类似实体模型格式的自定义模型。本教程将引导您使用[Blockbench](https://blockbench.net)为"纸袋"创建自定义方块模型。通过学习本教程，您将掌握专为自定义方块设计的Minecraft几何体核心功能。

**注意：** 自定义方块模型必须符合[模型尺寸限制](/blocks/block-components.html#geometry)。

## 模型设置

打开Blockbench并新建一个`Bedrock Block`项目。

![新建项目面板中选择Bedrock Block](/assets/images/blocks/block-models/new_project.png)

现在可以为模型设置标识符！您可以在此处决定文件名，或稍后修改。

UV模式和纹理尺寸应保持不变。

:::danger 命名空间
模型标识符**不使用命名空间且不能包含冒号**。冒号曾用于模型继承，在现代几何格式中已失效。
:::

![](/assets/images/blocks/block-models/project_settings.png)

## 添加立方体

虽然不一定是完美立方体，但模型中的元素都称为**立方体**。所有立方体必须包含在作为分组的**骨骼**中。

首先通过大纲视图点击`Add Group`创建根骨骼。按`F2`可重命名骨骼。

![](/assets/images/blocks/block-models/root_bone.png)

"纸袋"模型需要两个立方体：一个作为提手，一个作为主体。选择根骨骼后点击`Add Cube`添加。

<WikiImage
  src="/assets/images/blocks/block-models/new_cube.png"
  alt
  width="600"
  class="my-4"
/>

通过顶部工具栏可移动、缩放和旋转立方体。以下是"paper_bag"模型使用的两个立方体：

<WikiImage
  src="/assets/images/blocks/block-models/paper_bag_cubes.png"
  alt
  width="300"
  class="my-4"
/>

## 移除面

某些面可能无需可见。在示例中，移除纸袋顶部面以实现透视效果。

点击预览中的面，在UV面板删除其UV映射即可移除。

<WikiImage
  src="/assets/images/blocks/block-models/paper_bag_top_removed.png"
  alt
  width="600"
  class="my-4"
/>

提手仅需保留南北面。在UV面板按住Ctrl可多选面名称进行操作。

<WikiImage
  src="/assets/images/blocks/block-models/paper_bag_handle_faces_removed.png"
  alt
  width="600"
  class="my-4"
/>

## 预览纹理

:::tip
点击`Create Texture`选择`Blank`即可在Blockbench中创建纹理。
:::

"纸袋"模型包含以下预制纹理：

-   `textures/blocks/paper_bag.png`

    <WikiImage src="/assets/images/blocks/block-models/paper_bag.png" style="background-color: rgb(0,0,0,0.15);" pixelated="true" width="128"/>
    <br>
    <br>


-   `textures/blocks/paper_bag_bottom_fold.png`

    <WikiImage src="/assets/images/blocks/block-models/paper_bag_bottom_fold.png" style="background-color: rgb(0,0,0,0.15);" pixelated="true" width="128"/>
    <br>
    <br>


-   `textures/blocks/paper_bag_side_gusset.png`

    <WikiImage src="/assets/images/blocks/block-models/paper_bag_side_gusset.png" style="background-color: rgb(0,0,0,0.15);" pixelated="true" width="128"/>

将纹理导入Blockbench后拖拽至对应面，初始效果可能不够理想...

<WikiImage
  src="/assets/images/blocks/block-models/preview_textures_applied.png"
  alt
  width="300"
  class="my-4"
/>

## 调整UV布局

通过UV面板重新定位/缩放面的UV映射来修正纹理位置。选择目标面后操作UV面板即可。

<WikiImage
  src="/assets/images/blocks/block-models/paper_bag_handle_uv.png"
  alt
  width="300"
  class="my-4"
/>
<br>
<WikiImage
  src="/assets/images/blocks/block-models/paper_bag_final.png"
  alt
  width="300"
  class="my-4"
/>

## 修改材质实例

自定义材质实例名称可便捷定义面渲染方式。

右键立方体选择`Edit Material Instances`进行编辑。

![](/assets/images/blocks/block-models/select_edit_material_instances.png)

在示例中，东西面需要独立纹理。通过分配材质实例实现。

![](/assets/images/blocks/block-models/edit_material_instances.png)

## 应用几何体与纹理

通过`File > Export > Export Bedrock Geometry`导出至`RP/models/blocks`文件夹后，即可在方块JSON中引用模型。

通过`RP/textures/terrian_texture.json`短名称应用纹理。本例中纸袋不遮挡光线，故设置光照衰减为0。

::: code-group
```json [BP/blocks/paper_bag.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:paper_bag",
      "menu_category": {
        "category": "items"
      }
    },
    "components": {
      // 通过引用模型标识符应用模型
      "minecraft:geometry": "geometry.paper_bag",
      // 应用纹理及其他渲染配置
      "minecraft:material_instances": {
        "*": {
          "texture": "paper_bag",
          "render_method": "alpha_test" // 禁用背面剔除并启用透明
        },
        "down": {
          "texture": "paper_bag_bottom_fold",
          "render_method": "alpha_test" // 所有实例必须保持一致
        },
        // 模型中使用的自定义实例名称
        "side_gusset": {
          "texture": "paper_bag_side_gusset",
          "render_method": "alpha_test" // 所有实例必须保持一致
        }
      },
      // 防止产生阴影
      "minecraft:light_dampening": 0
    }
  }
}
```
:::