---
title: 材质 Material 创作
tags:
    - 专家
category: 基础
---

# 材质 Material 创作

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
材质创作并非易事。请做好应对潜在崩溃、内容日志错误和漫长加载时间的准备。
:::

本页面收录了社区创作的材质方案。

## 支持半透明发光的自定义材质

注：该方案通过禁用剔除（culling）解决了材质应用后无法透过纹理看到实体和其他物体的异常显示问题。

注：纹理需要包含半透明通道才能实现发光效果。

"customblend" 是你在实体中需要调用的材质名称。

<Spoiler title="显示">

::: code-group
```json [customblend]
{
    "customblend:entity_alphablend": {
        "+defines": [
            "USE_EMISSIVE"
        ],
        "+states": [
            "Blending",
            "DisableCulling",
            "DisableDepthWrite",
            "DisableAlphaWrite"
        ]
    }
}
```
:::

</Spoiler>

作者：StealthyX

## 在Render Dragon中使用Alpha通道纹理

适用于Render Dragon的Alpha通道纹理材质方案：

<Spoiler title="显示">

::: code-group
```json [ambient_alpha]
{
    "ambient_alpha:entity": {
        "+states": [
            "Blending",
            "DisableCulling"
        ],
        "vertexShader": "shaders/color_uv.vertex",
        "vrGeometryShader": "shaders/color_uv.geometry",
        "fragmentShader": "shaders/color_texture.fragment",
        "blendSrc": "SourceAlpha",
        "blendDst": "OneMinusSrcAlpha",
        "vertexFields": [
            {
                "field": "Position"
            },
            {
                "field": "Color"
            },
            {
                "field": "Normal"
            },
            {
                "field": "UV0"
            }
        ],
        "variants": [
            {
                "skinning": {
                    "+defines": [
                        "USE_SKINNING"
                    ],
                    "vertexFields": [
                        {
                            "field": "Position"
                        },
                        {
                            "field": "BoneId0"
                        },
                        {
                            "field": "Color"
                        },
                        {
                            "field": "Normal"
                        },
                        {
                            "field": "UV0"
                        }
                    ]
                }
            }
        ]
    }
}
```
:::

</Spoiler>

经进一步测试发现该方案仅在第三人称视角下有效，但由于原版混合材质在任意视角都存在显示问题，该方案仍具实用价值。

作者：Ambient

## 在渲染控制器中禁用overlay_color

禁止在渲染控制器中使用overlay_color的材质方案：

<Spoiler title="显示">

::: code-group
```json [ambient_no_overlay]
{
    "materials": {
        "version": "1.0.0",
        "ambient_no_overlay": {
            "defines": [
                "ALPHA_TEST"
            ],
            "vertexShader": "shaders/entity.vertex",
            "vrGeometryShader": "shaders/entity.geometry",
            "fragmentShader": "shaders/entity.fragment",
            "vertexFields": [
                {
                    "field": "Position"
                },
                {
                    "field": "Normal"
                },
                {
                    "field": "UV0"
                }
            ],
            "variants": [
                {
                    "skinning": {
                        "+defines": [
                            "USE_SKINNING"
                        ],
                        "vertexFields": [
                            {
                                "field": "Position"
                            },
                            {
                                "field": "BoneId0"
                            },
                            {
                                "field": "Normal"
                            },
                            {
                                "field": "UV0"
                            }
                        ]
                    }
                },
                {
                    "skinning_color": {
                        "+defines": [
                            "USE_SKINNING"
                        ],
                        "+states": [
                            "Blending"
                        ],
                        "vertexFields": [
                            {
                                "field": "Position"
                            },
                            {
                                "field": "BoneId0"
                            },
                            {
                                "field": "Color"
                            },
                            {
                                "field": "Normal"
                            },
                            {
                                "field": "UV0"
                            }
                        ]
                    }
                }
            ],
            "msaaSupport": "Both",
            "+samplerStates": [
                {
                    "samplerIndex": 0,
                    "textureFilter": "Point"
                },
                {
                    "samplerIndex": 1,
                    "textureWrap": "Repeat"
                }
            ]
        }
    }
}
```
:::

</Spoiler>

该方案适用于需要对特定骨骼而非整个几何体应用材质的场景。

作者：Ambient

## entity_alphablend_nocolorentity_static 材质警告

使用 `entity_alphablend_nocolorentity_static` 材质将导致Minecraft游戏崩溃。

作者：Gecko