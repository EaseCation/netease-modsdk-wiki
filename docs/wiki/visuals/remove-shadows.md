---
title: 移除实体阴影
tags:
    - 中级
category: 巧思案例
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - MedicalJewel105
    - SmokeyStack
    - ThomasOrs
---

# 移除实体阴影

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

移除实体阴影存在多种方法，但几乎所有方法都会产生副作用。目前没有完美无缺的方法能在不引发副作用的情况下完全移除特定实体的阴影。

本文档将展示几种不同的移除阴影方法及其可能产生的效果。

## 缩小碰撞箱

通过将碰撞箱组件（collision box）设置为极小尺寸，可以使实体阴影消失。但副作用是难以与实体进行交互/攻击。

::: code-group
```json [BP]
"minecraft:collision_box": {
    "width": 0.1,
    "height": 0.1
}
```

```json [原始CodeHeader的值]
"minecraft:collision_box": {
    "width": 0.1,
    "height": 0.1
}
```
:::

可配合[自定义碰撞测试组件](https://bedrock.dev/docs/stable/Entities#minecraft:custom_hit_test)使用。`custom_hit_test`组件允许玩家攻击实体（但无法交互），且该组件不会生成阴影。

::: code-group
```json [BP]
"minecraft:custom_hit_test": {
    "hitboxes": [
        {
            "pivot": [0, 0.5, 0], // 这是碰撞箱的位置，可调整X/Y/Z坐标
            "width": 0.8,
            "height": 0.7
        } // 可在"hitboxes"数组中复制粘贴多个碰撞箱定义
    ]
}
```

```json [原始CodeHeader的值]
"minecraft:custom_hit_test": {
    "hitboxes": [
        {
            "pivot": [0, 0.5, 0],//This is the position of the hitbox, you can change the X, Y and Z values.
            "width": 0.8,
            "height": 0.7
        }//And you can add many more hitboxes as you want, just copy-paste the hitbox inside the "hitboxes" array.
    ]
}
```
:::

## 地下传送

对于需要交互的隐形实体，可使用指令`/teleport @x ~ ~-0.01 ~`将实体略微嵌入地面以消除阴影。

## 使用运行时标识符

某些实体（如盔甲架）本身没有阴影或仅有极小的阴影。通过继承其运行时标识符（runtime identifier）可移除阴影，但会继承该实体的硬编码行为特性，可能引发其他问题。详细信息请参阅[运行时标识符文档](/wiki/entities/runtime-identifier)。

## 材质覆盖法

:::danger
此方法已失效。随着Render Dragon引擎的应用，此类材质方案不再生效。请勿在正式项目中使用，尤其避免在商城地图中尝试。
:::

:::warning
    - 此文件夹未包含在原生资源包示例中，需从APK文件导出或手动创建
    - 该方法仅验证适用于实体，尚未测试方块效果。如有相关发现欢迎反馈
:::

<Spoiler title="通过材质移除阴影">

#### 全实体阴影显示配置：

::: code-group
```json [RP/materials/shadows.material]
"shadow_overlay":{
    "+states":[
        "DisableDepthTest",
        "DisableCulling",
        "Blending",
        "EnableStencilTest"
    ],
    "vertexShader":"shaders/color.vertex",
    "vrGeometryShader":"shaders/color.geometry",
    "fragmentShader":"shaders/shadow_stencil_overlay.fragment",
    "blendSrc":"DestColor",
    "blendDst":"Zero",
    "frontFace":{
        "stencilFunc":"Equal",
        "stencilPass":"Replace"
    }
}
```

```json [原始CodeHeader的值]
"shadow_overlay":{
    "+states":[
        "DisableDepthTest",
        "DisableCulling",
        "Blending",
        "EnableStencilTest"
    ],
    "vertexShader":"shaders/color.vertex",
    "vrGeometryShader":"shaders/color.geometry",
    "fragmentShader":"shaders/shadow_stencil_overlay.fragment",
    "blendSrc":"DestColor",
    "blendDst":"Zero",
    "frontFace":{
        "stencilFunc":"Equal",
        "stencilPass":"Replace"
    }
}
```
:::

#### 全实体阴影禁用配置：

::: code-group
```json [RP/materials/shadows.material]
"shadow_overlay":{
    "+states":[
        "DisableDepthTest",
        "DisableCulling",
        "Blending",
        "EnableStencilTest"
    ],
    "vertexShader":"",
    "vrGeometryShader":"",
    "fragmentShader":"",
    "blendSrc":"DestColor",
    "blendDst":"Zero",
    "frontFace":{
        "stencilFunc":"Equal",
        "stencilPass":"Replace"
    }
}
```

```json [原始CodeHeader的值]
"shadow_overlay":{
    "+states":[
        "DisableDepthTest",
        "DisableCulling",
        "Blending",
        "EnableStencilTest"
    ],
    "vertexShader":"",
    "vrGeometryShader":"",
    "fragmentShader":"",
    "blendSrc":"DestColor",
    "blendDst":"Zero",
    "frontFace":{
        "stencilFunc":"Equal",
        "stencilPass":"Replace"
    }
}
```
:::

</Spoiler>

#### 几何模型+材质解决方案

通过为实体应用覆盖阴影的模型，并使用`"banner_pole"`材质可实现阴影隐藏。