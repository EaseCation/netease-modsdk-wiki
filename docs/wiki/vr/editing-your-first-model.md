---
title: 编辑你的第一个模型
category: 巧思案例
mentions:
    - TheDoctor15
    - MedicalJewel105
    - TheItsNameless
    - SmokeyStack
tags:
    - 专家
---

# 编辑你的第一个模型

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本教程将指导你如何制作第一个VR模型。  
为方便演示，我们将以右手模型为例进行编辑。

:::tip
本教程需要使用 [Blender](https://www.blender.org/download/) 软件，请提前安装。
:::

## 在Blender中查看模型

首先需要将模型导入Blender：

![](/assets/images/vr/tutorial-hand-right/import-1.png)
![](/assets/images/vr/tutorial-hand-right/import-2.png)
![](/assets/images/vr/tutorial-hand-right/import-3.png)

模型导入后会发现缺少材质贴图。  
进入着色器（Shading）选项卡添加纹理元素：

![](/assets/images/vr/tutorial-hand-right/shading-add-texture-element.png)
![](/assets/images/vr/tutorial-hand-right/texture-element.png)

点击"Open"选择材质贴图（示例路径：`something\VRpackTemplate\textures\hologram_hands.png`）。  
**重要提示**：将过滤模式从线性（Linear）改为最近邻（Closest），否则贴图会模糊。  
最终效果如下：

![](/assets/images/vr/tutorial-hand-right/texture-element-complete.png)

将材质连接到模型上：  
拖动黄色连接点完成材质关联：

![](/assets/images/vr/tutorial-hand-right/texture-base-connect.png)

成功关联后模型应显示正确贴图：

![](/assets/images/vr/tutorial-hand-right/texture-on-model.png)

## 模型编辑指南

在编辑模型时需注意：  
- 只能使用单张贴图
- 保持模型结构合理性

### 基础编辑（手臂改造）

我们将把手部模型改造成前臂模型。  
首先分析原始尺寸关系：

![](/assets/images/vr/tutorial-hand-right/model-dimensions.png)

图中显示：  
- 3像素对应Blender中的18.75米
- 前臂长度为12像素 → 换算为`4 * 18.75 = 75米`

调整尺寸后：

![](/assets/images/vr/tutorial-hand-right/edited-dimensions-1.png)

由于原始模型为手部设计，需下移`3 * 18.75 = 56.25米`以适配手臂位置：

![](/assets/images/vr/tutorial-hand-right/edited-dimensions-2.png)

#### 材质处理

使用Steve角色手臂贴图：

![](/assets/images/vr/tutorial-hand-right/hologram-hands-steve.png)

若出现拉伸现象：

![](/assets/images/vr/tutorial-hand-right/steve-texture-stretched.png)

进入UV编辑模式调整贴图坐标：

![](/assets/images/vr/tutorial-hand-right/uv-map.png)

:::tip
启用磁吸工具可提高编辑精度：  
![](/assets/images/vr/tutorial-hand-right/magnet-icon.png)
:::

1. 选择顶部和底部面片：

![](/assets/images/vr/tutorial-hand-right/uv-map-top-selected.png)

2. 使用移动工具调整位置：

![](/assets/images/vr/tutorial-hand-right/uv-map-pos.png)

3. 将面片对齐至贴图顶部：

![](/assets/images/vr/tutorial-hand-right/uv-map-top-move-up.png)

4. 重复操作处理侧面：

![](/assets/images/vr/tutorial-hand-right/uv-map-side-up.png)

最终效果：

![](/assets/images/vr/tutorial-hand-right/uv-map-done.png)

#### 模型导出

1. 将Steve手臂贴图放入`VRpackTemplateRP\textures`目录，命名为`hologram_hands.png`

![](/assets/images/vr/tutorial-hand-right/export-texture.png)

2. 导出模型文件：

![](/assets/images/vr/tutorial-hand-right/export-model-1.png)

命名模型为`hologram_hand_right.obj`：

![](/assets/images/vr/tutorial-hand-right/export-model-2.png)

#### 游戏测试

导入资源包后效果应如下所示：

![](/assets/images/vr/tutorial-hand-right/export-done.png)

::: code-group
```json [下载示例]
<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/vr_edit_model.mcpack"
    color=blue
>获取教程最终成果！</BButton>
```

## 当前进度

<Checklist>

-   [x] 配置Minecraft VR环境
-   [x] 创建资源包
-   [x] 完成模型编辑

</Checklist>
```