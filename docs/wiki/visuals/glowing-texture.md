---
title: 发光实体纹理
category: 巧思案例
mentions:
    - LeGend077
    - MedicalJewel105
---

# 发光实体纹理

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在本教程中，你将学习如何通过材质和纹理为实体创建发光效果，类似末影人眼睛的发光特性。

## 纹理处理

要让实体纹理发光，需要使用高级图像编辑器（这里以Blockbench为例）对像素透明度进行半擦除处理。

- 打开实体纹理文件

 _忽略奇怪的骨骼旋转，Mojang通过动画实现了正确的模型渲染。_

- 找到 __橡皮擦工具__ 并将不透明度/alpha值设置为较低数值（如71或23）

![](/assets/images/visuals/glowing-texture/eraser.png)

![](/assets/images/visuals/glowing-texture/opacity.png)

- 擦除需要发光的纹理区域。像素可见度越低发光效果越强，但需确保不完全擦除（100%透明）

![](/assets/images/visuals/glowing-texture/erase-pixels.png)

示例猪纹理：

![](/assets/images/visuals/glowing-texture/pig.png)

## 材质设置

修改目标生物的`RP/entity/my_entity.entity.json`文件。定位到`"materials":{}`并设置为`"entity_emissive_alpha"`（需确认纹理正确定义）。

::: code-group
```json [RP/entity/pig.entity.json#description]
"materials": {
    "default": "entity_emissive_alpha"
}
```
:::

<Spoiler title="示例猪实体文件">

::: code-group
```json [RP/entity/pig.entity.json]
{
	"format_version": "1.10.0",
	"minecraft:client_entity": {
		"description": {
			"identifier": "minecraft:pig",
			"min_engine_version": "1.8.0",
			"materials": {
				"default": "entity_emissive_alpha" // 将"pig"替换为"entity_emissive_alpha"
			},
			"textures": {
				"default": "textures/entity/pig/pig",
				"saddled": "textures/entity/pig/pig_saddle"
			},
			"geometry": {
				"default": "geometry.pig.v1.8"
			},
			"animations": {
				"setup": "animation.pig.setup",
				"walk": "animation.quadruped.walk",
				"look_at_target": "animation.common.look_at_target",
				"baby_transform": "animation.pig.baby_transform"
			},
			"scripts": {
				"animate": [
					"setup",
					{
						"walk": "q.modified_move_speed"
					},
					"look_at_target",
					{
						"baby_transform": "q.is_baby"
					}
				]
			},
			"render_controllers": ["controller.render.pig"],
			"spawn_egg": {
				"texture": "spawn_egg",
				"texture_index": 2
			}
		}
	}
}
```
:::

</Spoiler>

## 效果测试

加载Minecraft并启用此资源包，将时间设为_午夜_或寻找洞穴环境进行测试。实体应呈现预期的发光效果。

![](/assets/images/visuals/glowing-texture/result.png)