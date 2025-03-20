---
title: 实体纹理动画
mentions:
    - MedicalJewel105
    - IlkinQafarov
    - TheItsNameless
    - SmokeyStack
tags:
    - 中级
category: 巧思案例
---

# 实体纹理动画

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 本页内容

通过本教程你将学会如何为实体制作动态纹理。这种动画效果类似于方块的翻书动画纹理（Flipbook）。

## 来源说明

本教程内容基于 [AgentMindStorm](https://www.youtube.com/channel/UC-ljddYkFdTQl-MVEaVvbuQ) 的原创作品。

<YouTubeEmbed
    id="F6e-w1rCEi4"
/>

## 纹理制作

首先我们需要为实体绘制若干关键帧纹理。本教程将以四处张望的牛作为示例。

<WikiImage
	src="/assets/images/visuals/animated-entity-texture/cow.png"
	alt="牛的动画帧示例"
	pixelated="false"
	width=180
/>

与方块的翻书动画类似，我们需要将纹理帧进行纵向排列。本示例共使用4帧动画。

## 材质配置

在本指南中我们需要修改材质文件。但由于Render Dragon渲染引擎的更新，传统材质系统已过时，**请自行评估使用风险**。

要实现动态纹理，需要将实体材质更改为具有`USE_UV_ANIM`属性的类型。我们可以通过添加新材质实现：

::: code-group
```json [RP/materials/entity.material]
{
    "materials":{
        "version":"1.0.0",
        "custom_animated:entity":{
            "+defines":[
                "USE_UV_ANIM"
            ]
        }
    }
}
```
:::

或者可以将该属性添加到现有材质中（参考默认材质文件）：

::: code-group
```json []
"+defines":[
    "USE_UV_ANIM"
]
```
:::

<BButton
    link="/assets/packs/visuals/animated-entity-texture/entity.material" download
    color=default
>下载默认entity.material文件</BButton>

:::warning
注意：并非所有实体都适用简单修改！
部分实体包含多种材质类型，若需要实现全身纹理动画，必须为实体使用的所有材质添加此属性。
:::

## 客户端实体配置

在继续之前，我们需要在客户端实体文件中指定新材质：

::: code-group
```json [RP/entity/cow.json#description]
"materials": {
	"default": "custom_animated"
}
```
:::

## 渲染控制器设置

完成上述步骤后，需要编辑渲染控制器：

在此我们将添加带有偏移量和缩放属性的`uv_anim`组件：

::: code-group
```json [RP/render_controllers/cow.render_controllers.json#controller.render.cow]
"uv_anim": {
    "offset": [ 0.0, "math.mod(math.floor(q.life_time * frames_per_second),frame_count) / frame_count" ],
    "scale": [ 1.0, "1 / frame_count" ]
}
```
:::

其中：
- `frames_per_second`表示每秒播放的帧数
- `frame_count`表示总帧数

该公式会根据实体的存活时间自动计算纹理偏移量和缩放比例。

## 效果测试

现在可以测试你的动画效果了！

![](/assets/images/visuals/animated-entity-texture/result.gif)

## 示例下载

<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/animated_entity_texture.mcpack"
    color=blue
>下载示例包</BButton>