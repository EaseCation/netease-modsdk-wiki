---
front: https://nie.res.netease.com/r/pic/20220408/3541655a-7205-4609-b118-be8d6dbb84bd.png
hard: 入门
time: 15分钟
selection: true
---

# Shader使用简介

## 前言

本文将介绍MC游戏中使用的Shader的基本编写与使用方式

## 定义

游戏中的对象使用什么Shader定义于材质文件中，例如以下材质定义：
```json
{
  "materials": {
    "version": "1.0.0",

    "terrain_base": {
      "vertexShader": "shaders/renderchunk.vertex",
      "vrGeometryShader": "shaders/renderchunk.geometry",
      "fragmentShader": "shaders/renderchunk.fragment",

	  ...(省略无关代码)
	}
  }
```

在移动端，我们只需要关注 vertexShader 与 fragmentShader:
```json
vertexShader: 顶点着色器，后缀名不做要求，通常命名为vertex
fragmentShader: 像素着色器，后缀名不做要求，通常命名为fragment
```

## 语法

MC中的Shader使用Opengl语言进行编写。因为Opengl具有不个版本，越高级的版本能使用的特性越多，但兼容的设备就越少。为了让shader在不同版本中都生效，建议若使用一些高版本Opengl特性的时候加上如下判断，并提供一份针对低版本的实现：
```opengl
#if __VERSION__ >= 300
_centroid varying vec4 uv; //关键字_centroid表示使用质心采样，是3.0才支持的语法，上面300表示OpenGL 3.0，若为310，则代表OpenGL 3.1版本。
#else
varying vec4 uv;
#endif
```
本教程不涉及opengl的基础教程，开发者可自行学习。

## 材质中的宏

材质defines字段中定义的值在shader中可以进行使用
```json
"terrain_blend_far:terrain_blend": {
	"+defines": [ "FOG" ]
}
```
这里定义了FOG字段，则在Shader中可以用ifdef或者ifndef进行判断并执行一些逻辑处理：
```opengl
#ifndef FOG
	color.rgb += FOG_COLOR.rgb * 0.000001;
#endif
```
宏的使用不像传统shader中的if else语句，宏是编译器的，运行时不会产生分支语句，所以不会对性能有额外影响。

## 头文件

为了代码的复用性，我们通常会把多个shader都可能用到的代码抽取出来，此时只要把他们声明为以.h结尾的头文件，放在shaders/glsl目录下, 例如uniformWorldConstants.h。则在其它shader中要使用这个文件中的代码，只需要调用include即可
```opengl
#include "uniformWorldConstants.h"
```

![material_list](./images/shader_headfiles.png)

## Uniform

在shader中除了使用顶点属性以外，引擎还会通过uniform变量向shader中传递很多有用的数据，大部份shader都依赖一些uniform变量进行计算。引擎中的uniform变量定义在各个.h头文件中，下面将对常用的头文件及其中的uniform变量进行说明。

### uniformWorldConstants.h

生效时机：在渲染场景对象的shader中可以使用,里面包含当前场景相机对应的变换矩阵
```opengl
MAT4 WORLDVIEWPROJ : mvp矩阵乘积，用于把模型空间的坐标转化为裁剪空间坐标
MAT4 WORLD ： 世界矩阵，用于把模型空间的坐标转化为世界坐标
MAT4 WORLDVIEW ： mv矩阵乘积，用于把模型空间的坐标转化为视口空间的坐标
MAT4 PROJ ： 投影矩阵，用于把视口空间的坐标转化为裁剪空间坐标
```

### uniformPerFrameConstants.h

生效时机：每帧更新，所有shader中都可以使用
```opengl
vec3 VIEW_POS : 相机位置
float TIME ： 游戏启动到现在经过的时间，可以用于做一些动画，为了避免无限增长带来较大浮点误差，会取模210，处理数值边界的时候需要注意
vec4 FOG_COLOR : 雾的颜色
vec2 FOG_CONTROL ： 雾生效的距离，FOG_CONTROL.x为最短距离，FOG_CONTROL.y为最远距离
float RENDER_DISTANCE ： 可渲染的最远距离
```

### uniformRenderChunkConstants.h

生效时机：渲染地形
```opengl
POS4 CHUNK_ORIGIN_AND_SCALE ： 基于玩家视角的Chunk的局部位置
POS4 CHUNK_WORLD_POS_MOD_VALUE ： 基于世界坐标的Chunk的世界位置，但由于MC地图很大，所以这里数值会取模128
float RENDER_CHUNK_FOG_ALPHA ： Chunk雾效的透明度
```

### uniformShaderConstants.h

生效时机：所有shader中都可以使用
```opengl
vec4 CURRENT_COLOR : 受群系等因素影响，场景中渲染的对象会对应的明亮两种颜色，这个为明亮的颜色。其它系统也可能复用此值作一些颜色传递
vec4 DARKEN : 受群系等因素影响，场景中渲染的对象会对应的明亮两种颜色，这个为暗的颜色。其它系统也可能复用此值作一些颜色传递
vec3 TEXTURE_DIMENSIONS ：当前渲染使用的第一张贴图的尺寸，常为图集贴图，x,y,z分别为宽，高，当前所处在mipmap的哪一级。常用于做抗锯齿处理
float HUD_OPACITY ： 一些ui渲染的透明度会变化，使用此值进行控制
```

### uniformWeatherConstants.h

生效时机：渲染天气元素的时候生效
```opengl
vec4 POSITION_OFFSET ： 当前天气渲染用的面片的坐标偏移
vec4 VELOCITY : 风速
vec4 ALPHA ： 存储当前的光照缩放值
vec4 VIEW_POSITION ： 相对于相机的位置
vec4 SIZE_SCALE ： 粒子大小的缩放值，粒子会根据投影，速度进行一定缩放
vec4 FORWARD ：当前视角的前向位置，一般用于把粒子往前放推一点，保证在相机前面
vec4 UV_INFO : 渲染时候的贴图的uv
vec4 PARTICLE_BOX : 播放粒子的区域大小
```

### util.h

封装了搞锯齿的采样函数texture2D_AA

## 兼容性

### 浮点精度

不同平台浮点数的精度略有差异，有小数点的话最多只能精确到小数点后三位，比如0.001跟0.002是能区分出来的，但0.0011跟0.0012可能在某些平台会被判断是相等的。

另外，浮点判断相等也尽量不要用 == 或者 != 符号。比如一些开发者可能判断alpha值不为1的时候做一些操作，会这样写:
```opengl
  if(color.a != 1.0){
    // do something
  }
```
正确的应该这样写：
```opengl
  if(color.a < 0.999){
    // do something
  }
```
同理，判断不为0的话也不应该这样写：
```opengl
  if(color.a != 0.0){
    // do something
  }
```
正确的应该这样写：
```opengl
  if(color.a > 0.001){
    // do something
  }
```

### 纹理采样

在shader中使用texture2D对纹理采样进行采样应该只写在片段着色器中，因为IOS平台不支持在顶点着色器中进行纹理采样。