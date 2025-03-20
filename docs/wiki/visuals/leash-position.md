---
title: 拴绳位置
category: 巧思案例
mentions:
    - MedicalJewel105
    - SirLich
    - Overload1252
tags:
    - 简单
---

# 拴绳位置

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

你是否曾想改变实体上拴绳的绑定位置？
如果是的话，这篇教程正是为你准备的！

## Blockbench 操作部分

要设置拴绳位置，我们将使用 Blockbench 建模工具。
打开你的模型文件（本文以羊驼模型为例）。

*不必在意骨骼的奇怪旋转，Mojang 喜欢通过动画来正确渲染模型。*

![](/assets/images/visuals/leash-position/model-1.png)

现在查找名为 `lead` 的定位器。

![](/assets/images/visuals/leash-position/model-2.png)

如果该定位器不存在，你可以

<Spoiler title="创建定位器">

1. 选择一个骨骼组
2. 右键点击该组
3. 选择"添加定位器"选项
![](/assets/images/visuals/leash-position/locator-1.png)
4. 将其重命名为 `lead`

</Spoiler>

最后只需将定位器移动到想要的位置并保存模型即可。

![](/assets/images/visuals/leash-position/model-3.png)

## 效果测试

修改前效果：

![](/assets/images/visuals/leash-position/result-0.png)

修改后效果：

![](/assets/images/visuals/leash-position/result-1.png)