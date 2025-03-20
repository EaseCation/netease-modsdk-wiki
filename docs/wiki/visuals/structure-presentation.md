---
title: 结构展示
category: Ideas
mentions:
    - MedicalJewel105
    - LeGend077
    - ThomasOrs
---

# 结构展示

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 本文存在的意义

在附加包展示中，清晰呈现功能特性与附加包质量同样重要。当玩家能够直观理解附加包内容及其特性时，他们更愿意进行尝试。本文将演示一种结构展示的有效方法。

## 展示方法

您可以通过多种方式展示建筑结构，例如：

- 在游戏内直接截取建筑实景
- 在结构方块界面中进行截图
- 创建建筑的3D模型

下文将以掠夺者前哨站为例，分别展示这三种方法。

### 游戏内实景截图

这是最简单快捷的方法，能够让建筑在世界环境中自然呈现。但存在一定局限性：您可能需要寻找合适的拍摄位置或角度。

![](/assets/images/visuals/structure-presentation/in-game.png)

### 结构方块界面截图

此方法能规避实景截图的某些限制，使建筑完全脱离周围环境的干扰。

![](/assets/images/visuals/structure-presentation/structure-block-0.png)

通过修改[JSON UI](/wiki/json-ui/json-ui-intro)文件，您可以调整背景颜色并移除界面元素来优化展示效果。

![](/assets/images/visuals/structure-presentation/structure-block-1.png)

### 3D模型渲染

可将建筑导出为3D模型进行渲染。若3D导出功能异常，可尝试安装修复资源包。

<BButton
	link="/assets/packs/visuals/structure-presentation/3d-export-fix.mcpack" download
	color=blue
>下载资源包</BButton>

![](/assets/images/visuals/structure-presentation/model-render.png)

此方法主要适用于PC用户。您可以使用Paint 3D进行快速简易渲染，或通过Blender实现高级效果。通过3D模型可以便捷高效地展示建筑结构。

⬇ 如果您有其他展示方法，欢迎在下方提交补充。