---
title: 添加HUD元素
category: 教程
tags:
    - 初学者
mentions:
    - shanewolf38
    - SmokeyStack
---

# 添加HUD元素

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在本教程中，你将学习如何向HUD界面添加元素。

## 概述

HUD界面在游戏中大部分时间都会显示，为玩家提供关键信息。很多时候你需要在界面上添加元素，比如在完成特定事件后弹出文字、显示玩家体力的耐力条、显示玩家速度的时速表等等！

要将创建的元素添加到HUD界面，需要使用`modification`参数在`root_panel`中添加新的`control`（界面元素）。Root_panel是一个面板类型的元素，包含了HUD界面上几乎所有显示的元素。

## 单个元素添加

下面这段代码会在屏幕顶部创建一个显示黑色方块的图像元素，在屏幕右上角创建显示文字"HUD文本"的标签元素，并通过修改`root_panel`将它们添加到HUD界面。

::: code-group
```json [RP/ui/hud_screen.json]
"hud_square": {
	"type": "image",
	"texture": "textures/ui/Black",   // 原版纹理
	"anchor_from": "top_middle",
	"anchor_to": "top_middle",
	"size": [ 64, 64 ],
	"offset": [ 0, 4 ]
},

"hud_text": {
	"type": "label",
	"text": "HUD文本",
	"anchor_from": "top_right",
	"anchor_to": "top_right",
	"offset": [ -4, 4 ]
},

"root_panel": {
	"modifications": [
		{
			"array_name": "controls",
			"operation": "insert_front",
			"value": [
				{ "hud_square@hud.hud_square": {} },
				{ "hud_text@hud.hud_text": {} }
			]
		}
	]
},
```

需要添加到HUD界面上的所有元素都列举在root_panel的`modifications`->`value`部分。在添加元素时使用的命名空间标识（例如`@hud.hud_square`）可以根据实际模块进行调整。比如当`hud_square`元素是创建在`scoreboard`命名空间的scoreboards.json界面文件中时，添加时应使用`@scoreboard.hud_square`。

## 组合元素添加

出于组织结构考虑，通常不建议将大量元素直接逐个添加到根面板中。以下代码将之前定义的`hud_square`和`hud_text`元素（示例中未展示）包裹在名为`hud_elements_panel`的面板元素中，然后将该面板整体添加到HUD的根面板。最终效果与单个元素添加方式相同。

::: code-group
```json [RP/ui/hud_screen.json]
"hud_elements_panel": {
	"type": "panel",
	"controls": [
		{ "hud_square@hud_square": {} },
		{ "hud_text@hud_text": {} }
	]
},

"root_panel": {
	"modifications": [
		{
			"array_name": "controls",
			"operation": "insert_front",
			"value": [
				{ "hud_elements_panel@hud.hud_elements_panel": {} }
			]
		}
	]
},
```

此处`hud_elements_panel`没有直接定义尺寸参数，因此将继承其父元素（`root_panel`）的尺寸。这使得子元素的锚点定位、百分比尺寸等效果能相对于HUD屏幕进行适配。