---
title: 着色器（光影）
mentions:
    - SirLich
    - Dreamedc2015
    - yanasakana
    - MedicalJewel
    - SIsilicon
---

# 着色器（光影）Shader

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
本页所述的着色器与[Render Dragon](https://help.minecraft.net/hc/en-us/articles/360052771272-About-the-1-16-200-Update-for-Windows-10-)渲染引擎不兼容。这意味着在1.16.200版本后的Windows和主机设备，以及1.18.30版本后的其他设备上无法使用！
:::

## 概述

着色器分为`glsl`和`hlsl`两个文件夹。要使着色器在所有设备上生效，需要同时用两种语言编写代码。在Windows平台测试时，使用`hlsl`即可。在两种语言间转换时需要注意语法差异，例如HLSL中的`float3`对应GLSL中的`vec3`。[此处](https://anteru.net/blog/2016/mapping-between-HLSL-and-GLSL/)可查看两种语言的对照表。

## 材质

顶点着色器、片段着色器和几何着色器（可选）通过材质配置文件组合使用。创建新材质时，需要参照原版资源包中的`.material`文件命名。例如：`materials/particles.material`。材质支持继承机制，使用冒号语法：`entity_alpha:entity_base`

### 通用材质定义字段

| **字段名称**       | **描述**                                                                 | **示例值**                                        | **注意事项**                                                                                                               |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `vertexShader`     | 顶点着色器路径（相对于hlsl/glsl文件夹）                                   |                                                  | HLSL着色器会自动添加`.hlsl`后缀                                                                                           |
| `fragmentShader`   | 片段着色器路径（相对于hlsl/glsl文件夹）                                   |                                                  | HLSL着色器会自动添加`.hlsl`后缀                                                                                           |
| `vertexFields`     | 传递给顶点着色器的字段数组                                               |                                                  | 建议从原版材质中复制此字段                                                                                               |
| `variants`         | 定义材质变体的对象数组                                                   |                                                  | 建议从原版材质中复制此字段                                                                                               |
| `+defines`         | 添加到着色器源码的`#define`指令数组                                      |                                                  | 适用于复用着色器时调整细节参数                                                                                           |
| `+states`          | 启用的渲染状态数组                                                       | `["Blending", "DisableAlphaWrite", "DisableDepthWrite"]` | OpenGL实现中对应[glEnable](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glEnable.xml)调用                |
| `-defines`         | 从继承的`+defines`中移除的指令数组                                        |                                                  |                                                                                                                          |
| `+samplerStates`   | 定义纹理采样方式的对象数组                                               | `{ "samplerIndex": 0, "textureFilter": "Point" }` | `textureFilter`指定采样方式，`textureWrap`定义纹理边界外访问行为                                                         |
| `msaaSupport`      | 多重采样抗锯齿支持                                                       | `Both`                                           |                                                                                                                          |
| `blendSrc`         | 颜色源混合因子计算方式                                                   | `One`                                            | OpenGL实现中对应[glBlendFunc](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBlendFunc.xhtml)调用            |
| `blendDst`         | 颜色目标混合因子计算方式                                                 | `One`                                            | OpenGL实现中对应[glBlendFunc](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBlendFunc.xhtml)调用            |

示例：

::: code-group
```json [材质示例]
{
	"materials": {
		"version": "1.0.0",
		"particle_debug": {
			"vertexShader": "shaders/particle_generic.vertex",
			"fragmentShader": "shaders/particle_debug.fragment",

			"vertexFields": [
				{ "field": "Position" },
				{ "field": "Color" },
				{ "field": "UV0" }
			],

			"+samplerStates": [
				{
					"samplerIndex": 0,
					"textureFilter": "Point"
				}
			],

			"msaaSupport": "Both"
		}
	}
}
```
:::

完整材质文件规范请参考[材质文件JSON模式](https://github.com/stirante/bedrock-shader-schema/blob/master/materials.schema.json)。

## 疑难解答

### 着色器未生效

每次修改着色器后，必须重启Minecraft才能完全重新编译着色器。

### 编译错误

出现编译错误时，错误信息中的行号可能需要检查前几行的代码，因为Minecraft会在编译前自动添加`#define`指令。

### 找不到名为$Globals的常量缓冲区

此错误可能与全局变量相关。尝试通过以下方式解决：
- 在`main`函数中初始化变量
- 改用`#define`指令定义常量

## 实用技巧

### 向着色器传递变量

通过修改实体颜色可将数据传入着色器。输入值会被限制在`<0.0, 1.0>`范围内。传递较大数值时建议先进行归一化处理。

### 使用时间变量

全局`TIME`变量存储以秒为单位的浮点时间值。要获取基于粒子生命周期的计时器：

::: code-group
```json [粒子计时器配置]
"minecraft:particle_appearance_tinting": {
    "color": ["variable.particle_age/variable.particle_lifetime", 0, 0, 1]
}
```
:::

在着色器中使用`PSInput.color.r`获取时间值，其中`0.0`表示粒子生成，`1.0`表示粒子消亡。

### 相机朝向控制

在实体着色器中实现相机方向相关效果：

1. 在顶点/片段着色器的`PS_Input`结构体添加：
```
float3 viewDir: POSITION;
```

2. 在顶点着色器中添加：
```
PSInput.viewDir = normalize((mul(WORLD, mul(BONES[VSInput.boneId], float4(VSInput.position, 1)))).xyz);
```

3. 在片段着色器中使用`PSInput.viewDir`控制渲染逻辑

### 调试技巧

将调试值转换为颜色输出是最直观的方式：

::: code-group
```hlsl [颜色调试]
PSOutput.color = float4(PSInput.uv, 0., 1.);
```
:::

这会生成红绿渐变，显示UV坐标范围。推荐使用[调试着色器](http://files.stirante.com/debugShader.zip)，修改HLSL第70行代码可显示不同变量：

::: code-group
```hlsl [调试代码]
int ascii = getFloatCharacter( cellIndex, <需要显示的向量> );
```
:::

注意：GLSL版调试着色器可能导致崩溃，建议仅用于调试。

![调试着色器演示](/assets/images/knowledge/shaders/debugShader.gif)