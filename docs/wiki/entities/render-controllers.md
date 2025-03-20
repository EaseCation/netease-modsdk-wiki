---
title: 渲染控制器
category: 基础
tags:
    - beginner
mentions:
    - SirLich
    - MedicalJewel105
    - Overload252
    - ChibiMango
---

# 渲染控制器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

渲染控制器是资源包中常被误解的部分。但您无需畏惧！您可以将渲染控制器视为逻辑包，它们接收来自资源包实体文件中的短名称定义，并决定这些资源在游戏中如何组合/分层/渲染。

## 定义短名称

渲染控制器基于资源包实体文件中的短名称定义运作。短名称是我们在资源包实体文件中定义的本地标识符，可供渲染控制器（及其他地方）调用。我们可以在实体中定义`geometry`（几何体）、`materials`（材质）和`textures`（纹理）等变量。

让我们看看蜘蛛资源包实体文件的简化版本：

::: code-group
```json [RP/entity/spider.json]
{
	"format_version": "1.8.0",
	"minecraft:client_entity": {
		"description": {
			"identifier": "minecraft:cave_spider",
			"materials": {
				"default": "spider",
				"invisible": "spider_invisible"
			},
			"textures": {
				"default": "textures/entity/spider/cave_spider"
			},
			"geometry": {
				"default": "geometry.spider.v1.8"
			},
			"render_controllers": ["controller.render.spider"]
		}
	}
}
```
:::

此示例中创建了四个短名称定义：
- `default`（材质数组）
- `invisible`（材质数组）
- `default`（纹理数组）
- `default`（几何体数组）

您可以在每个数组中定义多个短名称（如上方的材质示例）。将短名称定义视为_导入_所需资源的操作。在此阶段，您在定义实体要使用的纹理、几何体和材质。在渲染控制器阶段不会导入新内容，而是使用已导入的资源来构建最终渲染的实体。

## 简单渲染控制器

一个基础渲染控制器示例如下：

::: code-group
```json [RP/render_controllers/cow.render.json]
{
	"format_version": "1.8.0",
	"render_controllers": {
		"controller.render.cow": {
			"geometry": "Geometry.default",
			"materials": [
				{
					"*": "Material.default"
				}
			],
			"textures": ["Texture.default"]
		}
	}
}
```
:::

该控制器从实体文件获取短名称定义并进行_渲染_。例如`"textures": [ "Texture.default"]`表达："采用default纹理并应用于实体"。渲染控制器本身并不知晓default纹理的具体内容，只是执行应用指令。

## 复用渲染控制器

由于渲染控制器基于短名称工作，您可以在所有实体中复用同一个渲染控制器。对于只含单一材质、单一纹理和单一几何体的简单实体，无需创建自定义渲染控制器。

例如上方示例的控制器用于`minecraft:cow`实体。若要在自定义包中使用此控制器，只需在实体文件中声明：`"render_controllers": [ "controller.render.cow" ]`。

:::warning 注意！
渲染控制器基于短名称工作。若使用牛的渲染控制器，必须提供其所需的短名称：
- `default`几何体
- `default`纹理
- `default`材质
:::

## 创建自定义渲染控制器

当我们需要更精细控制实体渲染时（如分层纹理、多重几何体、不同骨骼应用不同材质），可通过复制原版渲染控制器到`render_controllers`文件夹进行定制化修改。

## 纹理分层

通过纹理分层技术可为自定实体创建叠加纹理。基础思路是通过多个纹理的透明像素区域实现叠加显示。

假设一个**画框**实体：框架固定但画面可变。虽然可以复制10个框架纹理并制作10幅画作，但修改框架时需要改动所有文件。采用分层纹理方案时，首先放置框架纹理，再叠加画作纹理，即可实现框架的集中管理。

### 通过渲染控制器实现

若对渲染控制器不熟悉，建议参考原版案例。例如含有多个纹理的`horse`实体具有典型参考价值。

#### 渲染控制器

::: code-group
```json [RP/render_controllers/controller.render.texture_layering.json]
{
	"format_version": "1.10.0",
	"render_controllers": {
		"controller.render.texture_layering": {
			"geometry": "Geometry.default",
			"materials": [
				{
					"*": "Material.default"
				}
			],
			"textures": [
				// 你可以添加任意数量的图层，按从上到下的顺序叠加
				"Texture.bottom_layer",
				"Texture.top_layer"
			]
		}
	}
}
```
:::

#### 实体配置

需要定义所有纹理并使用`villager_v2_masked`材质：

::: code-group
```json [RP/entity/my_entity.json]
"materials": {
	"default": "villager_v2_masked"
},
"textures": {
	"top_layer": "textures/top",
	"bottom_layer": "textures/bottom"
  // 在此添加更多纹理短名称定义
}
```
:::

### 动态变体分层

通过动态索引实现纹理切换能创造更灵活的效果：

#### 实体配置

定义多个顶部纹理以供索引：

::: code-group
```json [RP/entity/my_entity.json#description]
"textures": {
	"top_1": "textures/top_1",
	"top_2": "textures/top_2",
	"top_3": "textures/top_3",
	"bottom_layer": "textures/bottom"
}
```
:::

#### 渲染控制器

::: code-group
```json [RP/render_controllers/controller.render.wool_only]
{
	"format_version": "1.10.0",
	"render_controllers": {
		"controller.render.wool_only": {
			"arrays": {
				"textures": {
					"Array.top": [
						"Texture.top_1",
						"Texture.top_2",
						"Texture.top_3"
					]
				}
			},
			"geometry": "Geometry.default",
			"materials": [
				{
					"*": "Material.default"
				}
			],
			"textures": [
				"Texture.bottom", // 静态底层纹理
				"Array.top[q.variant]" // 根据实体变体选择顶部纹理
			]
		}
	}
}
```
:::

通过数组和`q.variant`查询，可根据实体variant值动态选择顶部纹理。

#### 设置变体值

要使分层显示生效，需在实体中设置variant组件：

::: code-group
```json [BP/entities/my_entity.json#components]
"minecraft:variant": {
	"value": 0
}
```
:::

注意组件参数采用零索引制，`0`对应第一个纹理，`1`和`2`对应后续纹理。

#### 动态更换纹理

如需在游戏中动态更换纹理，只需修改`variant`值。可通过组件组和事件系统实现此功能。

#### 动态分层进阶

通过添加更多纹理数组和使用虚拟组件（dummy components）作为索引，可实现更复杂的动态分层效果。关于虚拟组件的详细信息请参阅[此文档](/wiki/entities/dummy-components)。

### 动态几何体切换

动态切换几何体的原理与纹理类似：

以下示例展示如何根据variant值切换不同几何体。注意几何体不可分层叠加，因此不需要基础层定义，但仍需使用`villager_v2_masked`材质。

::: code-group
```json [RP/render_controllers/controller.render.player.third_person.json]
{
	"format_version": "1.8.0",
	"render_controllers": {
		"controller.render.player.third_person": {
			"materials": [
				{
					"*": "Material.default"
				}
			],
			"textures": [
				"Texture.bottom",
				"Array.top[q.variant]"
			],
			"arrays": {
				"geometries": {
					"Array.geo": [
						"Geometry.default",
						"Geometry.custom_1",
						"Geometry.custom_2"
					]
				},
				"textures": {
					"Array.top": [
						"Texture.bottom",
						"Texture.top_1",
						"Texture.top_2"
					]
				}
			},
			"geometry": "Array.geo[q.variant]"
		}
	}
}
```
:::

#### 实体配置

确保在实体文件中包含对应几何体变体：

::: code-group
```json
"geometry": {
	"default": "geometry.entity.default",
	"custom_1": "geometry.entity.custom_1",
	"custom_2": "geometry.entity.custom_2"
}
```
:::

## 常见错误

在渲染控制器中：
- 可引用多个纹理但只能引用一个几何体（数组形式亦适用）

::: code-group
```json
"arrays": {
    "textures": {
        "array.skin": [],
        "array.dress": []
    },
    "geometries": {
        "array.geo": []
    }
}
```

```json
"textures": [
    "array.skin[q.variant]",
    "array.dress[q.skin_id]"
],
"geometry": "array.geo[q.mark_variant]"
```
:::