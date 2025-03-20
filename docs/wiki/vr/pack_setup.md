---
title: 设置资源包
category: 基础
mentions:
    - TheDoctor15
    - MedicalJewel105
    - TheItsNameless
    - SmokeyStack
tags:
    - 专家
---

# 设置资源包

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

开始制作附加包前，您需要下载这个模板文件。
该模板包含了制作VR资源包所需的所有基础资源。

<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/vr_template.mcpack"
    color=blue
>获取模板！</BButton>

:::warning
请勿删除模板中的 `contents.json` 和 `textures_list.json` 文件。
:::

## 模板包含哪些内容？

模板包含两个可编辑文件夹：`holograms`（全息模型）和 `textures`（纹理），
这些文件夹存放了VR物件的模型和纹理文件。

![](/assets/images/vr/setup/vr-template-contents.png)

## 全息模型

此文件夹包含Minecraft VR版使用的所有模型，例如VR手部模型。

![](/assets/images/vr/setup/vr-template-holograms.png)

## 纹理

此文件夹存储模型所需的所有纹理贴图。

![](/assets/images/vr/setup/vr-template-textures.png)

## 将VR模板与自有资源包合并

本资源包依赖 `contents.json` 和 `textures_list.json` 文件运行。所有需要被游戏调用的资源都必须在其中定义。
若存在同名文件，需要进行合并操作。

## 当前进度

<Checklist>

-   [x] 配置Minecraft VR环境
-   [x] 设置资源包
-   [ ] 编辑模型

</Checklist>