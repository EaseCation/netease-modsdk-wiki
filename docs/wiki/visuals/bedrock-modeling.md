---
title: 基岩版建模指南
nav_order: 2
category: 基础
mentions:
    - SirLich
    - solvedDev
    - MedicalJewel105
---

# 基岩版建模指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

本指南将为您讲解Minecraft基岩版建模时需要掌握的技巧、窍门和注意事项。

## 纹理故障

当较小面出现纹理错乱或不可见时，这是由于立方体尺寸在UV映射计算中被向下取整导致的。任何小于1单位的尺寸都会生成0像素宽的UV映射。解决方法：
1. 确保所有立方体每个方向至少有1单位长度
2. 需要更小立方体时使用膨胀滑块
3. 极端情况可尝试将元素尺寸各方向增加1单位，再设置-1的膨胀值（注意可能导致像素错位）

## 顶点吸附

Blockbench中的顶点吸附工具是制作圆形部件（如车轮）的利器。该工具位于移动/缩放工具右侧，包含移动和缩放两种模式：
![](/assets/images/visuals/bedrock-modeling/vertex_snap.gif)

## 透明度处理

使用半透明材质（如彩色玻璃）时，需将该元素移至元素列表底部，否则后方元素将无法正常渲染。

## 纹理绘制技巧

推荐学习方法：
- 参考他人同类物体的纹理作品
- 区分木质/金属等不同材质的纹理规律
- 推荐教程：
[Masteriano的纹理技巧](https://www.blockbench.net/wiki/guides/minecraft-style-guide)
及像素画通用教程

## 材质类型对照表

| 材质类型             | 特性描述                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| entity               | 基础不透明材质                                                          |
| entity_alphatest     | 支持透明像素                                                            |
| entity_alphablend    | 支持半透明像素                                                          |
| entity_emissive      | 自发光材质（alpha通道控制发光强度）                                      |
| entity_emissive_alpha| 纯黑+透明像素显示为透明，其余根据alpha通道发光                          |

## Z轴冲突

当两个面片重叠时会出现闪烁现象：
![](/assets/images/visuals/bedrock-modeling/z-fighting.png)
解决方法：对需要优先显示的面片设置`0.01`或`-0.01`的膨胀值

## 动画基础

动画命名规范：
- 必须以`animation.`开头（如`animation.cuack`）
- 禁止使用符号和大写字母

基本函数结构：
`基准值 + Math.sin((q.life_time + 偏移量) * 速度) * 幅度`

![](/assets/images/visuals/bedrock-modeling/animations-2.gif)

应用实例：
`Math.sin((q.life_time+0.5)*150)*15`

<MolangGraph code="Math.sin((q.life_time+0.5)*150)*15" :toY="2" :stepSize="0.001"/>

### 循环动画参数对照表

| 速度 | 时长  | 组别  |
| ---- | ----- | ----- |
| 150  | 2.4   | 1     |
| 100  | 3.6   | 2     |

扩展参数（仅限同组倍数组合）：

| 速度 | 时长  | 组别   |
| ---- | ----- | ------ |
| 150  | 4.8   | 1      |
| 200  | 3.6   | 2      |
| 300  | 2.4   | 1      |
| 300  | 3.6   | 1 & 2  |

:::tip
启用循环动画设置：
![](/assets/images/visuals/bedrock-modeling/setting-loop.png)
:::

通过组合不同函数参数，可以实现行走、奔跑、攻击等复杂动画效果。更多函数用法请参考[Molang文档](https://bedrock.dev/docs/stable/Molang)。

## 动画速度调节

通过修改`anim_time_update`参数实现：

::: code-group
```json [RP/animations/myentity.animation.json#animations]
"animation.myentity.myanimation": {
    "anim_time_update":"2 * q.delta_time + q.anim_time"
    // 此处放置动画内容
}
```
:::

- `2 *` 使动画加速2倍
- `0.5 *` 使动画减速至原速1/2
- 支持任意浮点数调整