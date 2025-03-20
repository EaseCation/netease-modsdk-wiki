---
title: 材质 Material
tags:
    - expert
category: 基础
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
    - Luthorius
---

# 材质 Material

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
材质系统不适合心理承受能力较弱的使用者。请做好应对潜在崩溃、内容日志错误和漫长加载时间的准备。
:::

## 概述

材质用于指定渲染游戏不同部分的着色器，以及着色器在处理每个元素时应考虑的状态和设置。目前游戏中的大多数内容都硬编码使用特定材质，无法分配新的材质。要改变这些元素的渲染方式，只能直接修改原有材质（可能会对其他部分产生意外影响）或创建新的着色器（这是Mojang已不再官方支持的旧实验性功能）。唯一可以分配或移除默认/自定义材质的元素是实体和粒子。

如果您不打算深入探索材质系统的细节，可以在此处找到预设材质[文档](/wiki/documentation/materials)。

## 语法与结构

多数材质通过继承先前定义的材质设置并进行扩展来实现功能。其基本格式如下：

::: code-group
```json [RP/materials/name.material]
{
	"materials": {
		"version": "1.0.0",
		"<新材质ID>:<基础材质ID>": {
    		<定义、状态及其他设置>
		}
	}
}
```
:::

:::warning
虽然看起来相似，但请勿将材质格式文件与包中的其他文件混淆。材质系统中不使用命名空间。
:::

部分材质文件包含复杂的继承树结构。例如，几乎所有默认实体使用的材质最终都继承自entity.material文件中的`entity_static`材质。以当前村民使用的材质为例：

::: code-group
```json
"villager_v2_masked:entity_multitexture_masked": {
    "depthFunc": "LessEqual"
}
```
:::

可以看出该材质名为`villager_v2_masked`，继承自`entity_multitexture_masked`材质。在该文件中向上追溯，可以发现`entity_multitexture_masked`继承自`entity_alphatest`并扩展了设置：

::: code-group
```json
"entity_multitexture_masked:entity_alphatest":{
    "+defines":[
        "MASKED_MULTITEXTURE"
    ],
    "+samplerStates":[
        {
            "samplerIndex":0,
            "textureWrap":"Clamp"
        },
        {
            "samplerIndex":1,
            "textureWrap":"Clamp"
        }
    ]
}
```
:::

继续追溯`entity_alphatest`可发现其继承自`entity_nocull`：

::: code-group
```json
"entity_alphatest:entity_nocull":{
    "+defines":[
        "ALPHA_TEST"
    ],
    "+samplerStates":[
        {
            "samplerIndex":1,
            "textureWrap":"Repeat"
        }
    ],
    "msaaSupport":"Both"
}
```
:::

`entity_nocull`又继承自基础`entity`材质：

::: code-group
```json
"entity_nocull:entity":{
    "+states":[
        "DisableCulling"
    ]
}
```
:::

最终`entity`材质继承自`entity_static`：

::: code-group
```json
"entity:entity_static":{
    "+defines":[
        "USE_OVERLAY"
    ],
    "msaaSupport":"Both"
}
```
:::

`entity_static`材质没有冒号后的继承对象，表明这是继承链的终点：

::: code-group
```json
"entity_static":{
    "vertexShader":"shaders/entity.vertex",
    "vrGeometryShader":"shaders/entity.geometry",
    "fragmentShader":"shaders/entity.fragment",
    "vertexFields":[
        {
            "field":"Position"
        },
        {
            "field":"Normal"
        },
        {
            "field":"UV0"
        }
    ],
    "variants":[
        {
            "skinning":{
                "+defines":[
                    "USE_SKINNING"
                ],
                "vertexFields":[
                    {
                        "field":"Position"
                    },
                    {
                        "field":"BoneId0"
                    },
                    {
                        "field":"Normal"
                    },
                    {
                        "field":"UV0"
                    }
                ]
            }
        },
        {
            "skinning_color":{
                "+defines":[
                    "USE_SKINNING",
                    "USE_OVERLAY"
                ],
                "+states":[
                    "Blending"
                ],
                "vertexFields":[
                    {
                        "field":"Position"
                    },
                    {
                        "field":"BoneId0"
                    },
                    {
                        "field":"Color"
                    },
                    {
                        "field":"Normal"
                    },
                    {
                        "field":"UV0"
                    }
                ]
            }
        }
    ],
    "msaaSupport":"Both",
    "+samplerStates":[
        {
            "samplerIndex":0,
            "textureFilter":"Point"
        }
    ]
}
```
:::

## 1.16.100+ 注意事项

使用自定义材质的用户请注意！

1.16.100版本后，自定义材质继承将不再有效并会导致内容日志错误。解决方法是使用前缀和材质名称直接定义完整材质。

该问题在1.16.100版本前不存在：

::: code-group
```json
{
    "materials": {
        "version": "1.0.0",
        "prefix:window_glass:entity": { // 现在会触发内容日志错误
            "+states": [
                "Blending"
            ],
            "defines": [
                "ENABLE_FOG",
                "ENABLE_LIGHT",
                "USE_ONLY_EMISSIVE"
            ]
        },
        "prefix:window_glass:": { // 修正错误的方法，注意：可能需要重新定义旧继承值
            "+states": [
                "Blending"
            ],
            "defines": [
                "ENABLE_FOG",
                "ENABLE_LIGHT",
                "USE_ONLY_EMISSIVE"
            ]
        }
    }
}
```
:::