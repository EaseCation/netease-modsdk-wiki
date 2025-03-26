---
title: 材质配置文件说明
tags:
    - 专家级
mentions:
    - MedicalJewel105
    - SmokeyStack
---

# 材质配置文件说明

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
材质系统不适合心理承受能力弱的用户。请做好应对潜在崩溃、内容日志错误和长时间加载的准备。
:::

## 前言

本文译自网易中国版开发者文档 [材质配置说明](/mcguide/16-美术/7-材质与着色器/3-材质配置说明) ，将详细介绍材质文件的结构与配置方式。

## 材质文件结构

我们将以微软原生材质文件为例进行说明。该目录下主要包含以".material"为后缀的文件，此外还有三个重要的json文件：common.json、fancy.json和sad.json。

首先观察sad.json和fancy.json，它们用于控制画面质量表现。每个文件都定义了材质文件列表。通常fancy.json会比sad.json多定义几个材质文件，并可能在某些材质文件中添加额外宏定义，着色器可通过判断这些宏进行特殊处理：

::: code-group
```json [sad.json]
[
	{"path":"materials/sad.material"},
	{"path":"materials/entity.material"},
	{"path":"materials/terrain.material"},
	{"path":"materials/portal.material"},
	{"path":"materials/barrier.material"},
	{"path":"materials/wireframe.material"}
]
```

```json [fancy.json]
[
	{"path":"materials/fancy.material", "+defines":["FANCY"]},
	{"path":"materials/entity.material", "+defines":["FANCY"]},
	{"path":"materials/terrain.material", "+defines":["FANCY"]},
	{"path":"materials/hologram.material"},
	{"path":"materials/portal.material", "+defines":["FANCY"]},
	{"path":"materials/barrier.material"},
	{"path":"materials/wireframe.material"}
]
```
:::

可以看出fancy.json比sad.json多定义了fancy.material和hologram.material材质文件，同时还为多个材质文件定义了FANCY宏。游戏设置/视频/精美图像选项的开关就是控制sad与fancy之间的切换。当开启精美图像时，fancy.json中的材质文件会生效；关闭时则使用sad.json中的材质文件。

为了获得更好的表现效果，fancy.json中的材质文件通常包含更复杂的运算，而sad.json中的材质则通过牺牲少许渲染效果换取更佳性能。若开发者需要编写更复杂的着色器，建议同时编写低配版本，分别在fancy和sad中进行定义，让玩家通过游戏中的精美图像选项自行控制是否开启对应效果。

::: code-group
```json [common.json]
[
	{"path":"materials/particles.material"},
	{"path":"materials/shadows.material"},
	{"path":"materials/sky.material"},
	{"path":"materials/ui.material"},
	{"path":"materials/ui3D.material"},
	{"path":"materials/portal.material"},
	{"path":"materials/barrier.material"},
	{"path":"materials/wireframe.material"}
]
```
:::

与可互相切换的sad和fancy不同，common.json中定义的材质文件会在进入游戏后始终加载。除了声明在common.json、sad.json、fancy.json中的材质文件外，其他材质文件不会被加载。

## 材质语法规范

我们以entity.material为例进行说明。打开文件可以看到文件以materials开头，接着定义了版本号version为1.0.0，这些都是固定格式，标识该材质文件的解析方式，暂时无需修改。

可以看到材质中每个字段的定义都采用键值对形式，例如：
```json
[
	"vertexShader": "shaders/entity.vertex",
]
```
冒号左侧表示键名vertexShader，右侧表示值shaders/entity.vertex；

也存在列表形式的定义：
```json
[
	"vertexFields": [
        { "field": "Position" },
        { "field": "Normal" },
        { "field": "UV0" }
    ],
]
```
带有[ ]符号的声明就是列表，内部是每个子元素的json定义。

## 材质属性字段全览

### 渲染状态

#### `states`

配置渲染环境，可选值包括：

- `EnableAlphaToCoverage`：针对半透明物体的顺序无关渲染方式。该开关仅在支持MSAA的环境中有用。开启后物体边缘会根据透明度更精确地进行柔化过渡。也可用于大量网格重叠的复杂场景。

- `Wireframe`：线框绘制模式

- `Blending`: 启用颜色混合模式，常用于渲染半透明物体。声明该选项后通常需要接着声明混合因子blendSrc、blendDst

- `DisableColorWrite`：不向颜色缓冲区写入颜色值，RGBA通道均不写入

- `DisableAlphaWrite`：不向颜色缓冲区写入透明度alpha值，允许写入RGB值

- `DisableRGBWrite`：不向颜色缓冲区写入RGB值，允许写入alpha值

- `DisableDepthTest`：关闭深度测试

- `DisableDepthWrite`：关闭深度写入

- `DisableCulling`: 同时渲染正反面

- `InvertCulling`：使用正面裁剪。默认为背面裁剪。声明此项后背面会被渲染而正面被裁剪。

- `StencilWrite`: 启用模板掩码写入

- `EnableStencilTest`：启用模板掩码测试

### 着色器路径

#### `vertexShader`

顶点着色器路径，通常为shaders/XXX.vertex。

#### `vrGeometryShader` 或 `geometryShader`

几何着色器路径，通常为shaders/XXX.geometry，移动端不会使用，无需修改。

#### `fragmentShader`

片段着色器路径，通常为shaders/XXX.fragment。

### 着色器宏定义

#### `defines`

为使用的着色器定义宏。为了实现代码复用，我们会将同一个着色器用于许多不同的材质。此时若希望根据当前材质在着色器某处执行不同逻辑，可以通过材质defines声明的宏进行判断。以entity_for_skeleton材质为例，可以看到这里定义了USE_SKINNING、USE_OVERLAY和NETEASE_SKINNING三个宏。

```json
"entity_for_skeleton": {
	"vertexShader": "shaders/entity.vertex",
	"vrGeometryShader": "shaders/entity.geometry",
	"fragmentShader": "shaders/entity.fragment",
	"+defines": [ "USE_SKINNING", "USE_OVERLAY", "NETEASE_SKINNING" ],
	"vertexFields": [
		{ "field": "Position" },
		{ "field": "Normal" },
		{ "field": "BoneId0" },
		{ "field": "UV0" }
	],
	"msaaSupport": "Both",
	"+samplerStates": [
		{
			"samplerIndex": 0,
			"textureFilter": "Point"
		}
	]
}
```

观察顶点着色器entity.vertex，会发现通过#ifdef、#else、#endif等指令判断宏定义并执行不同逻辑分支。这些宏的判断语句是在编译期处理的，不同于传统着色器中运行时处理的if else逻辑分支，实际运行时不会产生分支性能损耗。此外可以看到宏还能做多层判断，先判断NETEASE_SKINNING宏，再在内部执行逻辑中判断LARGE_VERTEX_SHADER_UNIFORMS宏：

```glsl
#ifdef NETEASE_SKINNING
		MAT4 boneMat = transpose(mat3x4ToMat4(BONES_70[int(BONEID_0)]));
		entitySpacePosition = boneMat * POSITION;
		entitySpaceNormal = boneMat * NORMAL;
#else
	#if defined(LARGE_VERTEX_SHADER_UNIFORMS)
		entitySpacePosition = BONES[int(BONEID_0)] * POSITION;
		entitySpaceNormal = BONES[int(BONEID_0)] * NORMAL;
	#else
		entitySpacePosition = BONE * POSITION;
		entitySpaceNormal = BONE * NORMAL;
	#endif
#endif
```

### 运行时状态

#### 深度测试

##### `depthFunc`

深度检测通过函数，可使用以下值：

- `Always`: 总是通过

- `Equal`：深度值等于缓冲值时通过

- `NotEqual`：深度值不等于缓冲值时通过

- `Less`：深度值小于缓冲值时通过

- `Greater`：深度值大于缓冲值时通过

- `GreaterEqual`：深度值大于等于缓冲值时通过

- `LessEqual`：深度值小于等于缓冲值时通过

关联状态渲染环境配置：

- `DisableDepthTest`：关闭深度测试

- `DisableDepthWrite`：关闭深度写入

#### 模板掩码测试

##### `stencilRef`

用于与掩码缓冲比较或写入的值

##### `stencilRefOverride`

是否使用缓冲当前值作为stencilRef，支持0或1：

- `1`：使用配置的stencilRef。若配置了stencilRef，stencilRefOverride会自动取1

- `0`：使用缓冲当前值作为stencilRef，此时不要配置stencilRef

##### `stencilReadMask`

掩码缓冲值与stencilRef值在比较前会分别与stencilReadMask做位与运算

##### `stencilWriteMask`

stencilRef值在写入掩码缓冲前会与stencilWriteMask做位与运算

##### `frontFace` 和 `backFace`

配置在网格正面或背面使用哪种掩码测试函数。此外判断顺序是先掩码检测再深度检测。需要配置以下操作：

- `stencilFunc`: stencilRef与掩码缓冲比较时使用的方法，支持以下值：
    - `Always`: 总是通过
    -	`Equal`：stencilRef等于缓冲值时通过
    -	`NotEqual`：stencilRef不等于缓冲值时通过
    -	`Less`：stencilRef小于缓冲值时通过
    -	`Greater`：stencilRef大于缓冲值时通过
    -	`GreaterEqual`：stencilRef大于等于缓冲值时通过
    -	`LessEqual`：stencilRef小于等于缓冲值时通过

- `stencilFailOp`：stencilFunc比较函数返回失败时执行的处理，支持以下值：
    -	`Keep`：保持缓冲原值
    -	`Replace`：将stencilRef位与stencilWriteMask的值写入缓冲

- `stencilDepthFailOp`：stencilFunc比较函数返回成功但深度测试失败时执行的处理，支持以下值：
    -	`Keep`：保持缓冲原值
    -	`Replace`：将stencilRef位与stencilWriteMask的值写入缓冲

- `stencilPassOp`: stencilFunc比较函数返回成功且深度测试成功时执行的处理，支持以下值：
    -	`Keep`：保持缓冲原值
    -	`Replace`：将stencilRef位与stencilWriteMask的值写入缓冲

关联状态渲染环境配置：

- `StencilWrite`：启用掩码写入

- `EnableStencilTest`: 启用掩码测试

最后看一个具体示例：

```json
    "shadow_back": {
      "+states": [
        "StencilWrite",
        "DisableColorWrite",
        "DisableDepthWrite",
        "InvertCulling",
        "EnableStencilTest"
      ],

      "vertexShader": "shaders/position.vertex",
      "vrGeometryShader": "shaders/position.geometry",
      "fragmentShader": "shaders/flat_white.fragment",

      "frontFace": {
        "stencilFunc": "Always",
        "stencilFailOp": "Keep",
        "stencilDepthFailOp": "Keep",
        "stencilPassOp": "Replace"
      },

      "backFace": {
        "stencilFunc": "Always",
        "stencilFailOp": "Keep",
        "stencilDepthFailOp": "Keep",
        "stencilPassOp": "Replace"
      },

      "stencilRef": 1,
      "stencilReadMask": 255,
      "stencilWriteMask": 1,

      "vertexFields": [
        { "field": "Position" }
      ],
      "msaaSupport": "Both"
    }
```

该示例中，StencilWrite表示支持向掩码缓冲写入，EnableStencilTest表示开启掩码测试，frontFace的配置表示渲染正面时掩码测试总是通过，若深度测试失败则保持缓冲值不变，若也都通过则将stencilRef位与stencilWriteMask的值写入缓冲，即1 & 1 = 1的值。backFace的配置也类似。

#### 半透明物体颜色混合

半透明物体的渲染需要配置混合因子。最终输出的rgb颜色值 = 当前颜色值 * 源混合因子 + 缓冲中的颜色值 * 目标混合因子

##### `blendSrc`

源混合因子

##### `blendDst`

目标混合因子

##### `alphaSrc`

计算alpha时的源混合因子，通常不配置取默认值

##### `alphaDst`

计算alpha时的目标混合因子，通常不配置取默认值

混合因子总共可以取以下值：

- `DestColor`：缓冲颜色值

- `SourceColor`：当前颜色值

- `Zero`： (0,0,0)

- `One`： (1,1,1)

- `OneMinusDestColor`: (1,1,1) - 缓冲颜色值

- `OneMinusSrcColor`: (1,1,1) - 当前颜色值

- `SourceAlpha`：当前颜色中的alpha值

- `DestAlpha`：缓冲颜色中的alpha值

- `OneMinusSrcAlpha`：1 - 当前颜色值中的alpha值

引擎中默认取值为：

- `blendSrc`：SourceAlpha

- `blendDst`：OneMinusSrcAlpha

- `alphaSrc`：One

- `alphaDst`：OneMinusSrcAlpha

关联状态渲染环境配置：

- `Blending`: 启用颜色混合模式，常用于渲染半透明物体。声明该选项后通常需要接着声明混合因子blendSrc、blendDst

- `DisableColorWrite`：不向颜色缓冲区写入颜色值，RGBA通道均不写入

- `DisableAlphaWrite`：不向颜色缓冲区写入透明度alpha值，允许写入RGB值

- `DisableRGBWrite`：不向颜色缓冲区写入RGB值，允许写入alpha值

### 模板测试配置

#### `stencilRef`

用于与模板缓冲比较或写入的参考值

#### `stencilRefOverride`

是否使用缓冲当前值作为stencilRef，支持0或1：
- `1`：使用配置的stencilRef（若已配置stencilRef则自动取1）
- `0`：使用缓冲当前值作为stencilRef（此时不应配置stencilRef）

#### `stencilReadMask`

模板缓冲值与stencilRef值在比较前会分别与stencilReadMask进行位与运算

#### `stencilWriteMask`

stencilRef值在写入模板缓冲前会与stencilWriteMask进行位与运算

#### `frontFace` 和 `backFace`

配置在网格正面/背面使用的模板测试函数。测试顺序为先模板测试后深度测试。需配置以下操作：

- `stencilFunc`: stencilRef与模板缓冲的比较方式，可选：
    - `Always`: 总是通过
    - `Equal`：值相等时通过
    - `NotEqual`：值不等时通过  
    - `Less`：小于时通过
    - `Greater`：大于时通过
    - `GreaterEqual`：大于等于时通过
    - `LessEqual`：小于等于时通过

- `stencilFailOp`：模板测试失败时的处理：
    - `Keep`：保持缓冲原值
    - `Replace`：将stencilRef写入缓冲

- `stencilDepthFailOp`：模板测试通过但深度测试失败时的处理：
    - `Keep`：保持缓冲原值  
    - `Replace`：将stencilRef写入缓冲

- `stencilPassOp`：两项测试均通过时的处理：
    - `Keep`：保持缓冲原值
    - `Replace`：将stencilRef写入缓冲

关联渲染状态：
- `StencilWrite`：启用模板写入
- `EnableStencilTest`：启用模板测试

配置示例：
```json
"shadow_back": {
    "+states": [
        "StencilWrite",
        "DisableColorWrite",
        "DisableDepthWrite",
        "InvertCulling",
        "EnableStencilTest"
    ],
    "frontFace": {
        "stencilFunc": "Always",
        "stencilFailOp": "Keep",
        "stencilDepthFailOp": "Keep",
        "stencilPassOp": "Replace"
    },
    "backFace": { /* 相同配置 */ },
    "stencilRef": 1,
    "stencilReadMask": 255,
    "stencilWriteMask": 1
}
```

### 半透明物体混合

最终颜色 = 当前颜色 × blendSrc + 缓冲颜色 × blendDst

#### 混合因子
- `blendSrc`：源混合因子（默认SourceAlpha）
- `blendDst`：目标混合因子（默认OneMinusSrcAlpha）  
- `alphaSrc`：alpha源因子（默认One）
- `alphaDst`：alpha目标因子（默认OneMinusSrcAlpha）

可选值：
- `DestColor`：缓冲颜色
- `SourceColor`：当前颜色
- `Zero`：(0,0,0)  
- `One`：(1,1,1)
- `OneMinusDestColor`: 1-缓冲颜色
- `OneMinusSrcColor`: 1-当前颜色
- `SourceAlpha`：当前alpha值
- `DestAlpha`：缓冲alpha值
- `OneMinusSrcAlpha`：1-当前alpha值

关联状态：
- `Blending`：启用混合
- `DisableColorWrite`：禁用颜色写入
- `DisableAlphaWrite`：禁用alpha写入
- `DisableRGBWrite`：禁用RGB写入

### 纹理采样

#### `samplerStates`
配置采样状态（列表结构，按纹理索引配置）：
```json
{
    "samplerIndex": 0,    // 纹理索引（从0开始）
    "textureFilter": "Point",  // 过滤模式
    "textureWrap": "Repeat"    // 环绕模式
}
```

##### 过滤模式
- `Point`：点采样
- `Bilinear`：双线性
- `Trilinear`：三线性  
- `MipMapBilinear`：MipMap双线性
- `TexelAA`：抗锯齿（部分设备不支持）
- `PCF`：百分比渐近过滤（部分设备不支持）

##### 环绕模式
- `Repeat`：重复纹理
- `Clamp`：边缘拉伸

### 顶点属性

#### `vertexFields`
声明网格顶点包含的属性：
- `Position`：模型空间坐标
- `Color`：颜色  
- `Normal`：法线
- `UV0`/`UV1`/`UV2`：纹理坐标
- `BoneId0`：骨骼ID（骨骼模型用）

### 光栅化配置

#### `msaaSupport`
抗锯齿支持模式：
- `NonMSAA`：非MSAA模式下启用
- `MSAA`：MSAA模式下启用  
- `Both`：始终启用（推荐）

#### 深度偏移
解决z-fighting问题：
- `depthBias`：基础偏移
- `slopeScaledDepthBias`：斜率比例偏移  
- `depthBiasOGL`：OpenGL平台偏移
- `slopeScaledDepthBiasOGL`：OpenGL斜率偏移

计算公式：
`offset = (slopeScaledDepthBias × m) + (depthBias × r)`

### 图元模式

#### `primitiveMode`
渲染图元类型：
- `None`：不渲染  
- `QuadList`：四边形列表
- `TriangleList`：三角形列表（每3个顶点构成三角形）
- `TriangleStrip`：三角形带（复用顶点）  
- `LineList`：线段列表
- `Line`：线段带

### 材质变体

#### `variants`
快速创建衍生材质：
```json
"base_material": {
    "vertexShader": "...",
    "variants": [
        {
            "variant1": {  // 变体1
                "+defines": ["MACRO_1"],
                "vertexFields": [...]
            }
        },
        {
            "variant2": {  // 变体2
                "+states": ["Blending"]
            }
        }
    ]
}
```
使用时通过`base_material.variant1`调用变体

### 材质合并规则
多文件定义同一材质时的合并策略：
1. 常规字段：后加载的覆盖先加载的
2. 特殊字段（支持`+`/`-`操作符）：
   - `defines`：宏定义
   - `states`：渲染状态  
   - `samplerStates`：采样状态

执行顺序：覆盖 → 添加 → 删除

示例：
```json
// 基础定义
"mat": {"defines": ["A","B"]}

// 扩展定义（添加C，删除B）
"mat": {
    "+defines": ["C"],
    "-defines": ["B"] 
}

// 最终效果：["A","C"]
```