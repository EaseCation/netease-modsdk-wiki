---
title: 序列帧动画
category: 教程
mentions:
    - TheDataLioness
    - shanewolf38
    - TheItsNameless
    - LeGend077
    - stirante
---

# 序列帧动画（Aseprite）

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## Aseprite简介

[Aseprite](https://www.aseprite.org/) 是一款付费像素艺术软件，专门用于轻松创建皮肤和资源包。它提供丰富的工具、详尽的文档和教程，适合不同水平的艺术家使用。

[LibreSprite](https://libresprite.github.io/) 是Aseprite的免费开源替代品。它基于Aseprite最后一个开源许可版本进行分支开发，本教程中的操作同样适用于LibreSprite。

## 在Aseprite中创建动画

假设你有一组按数字1到5顺序命名的"frameimage"系列帧图像。导入第一张图像后，Aseprite会自动识别同名但编号不同的其他图片，将它们按正确顺序排列并创建动画。

<FolderView
:paths="[
    'frameimage1.png',
    'frameimage2.png',
    'frameimage3.png',
    'frameimage4.png',
    'frameimage5.png'
]"
></FolderView>

使用`箭头键`在帧间导航，`Enter键`控制动画的播放/暂停。按下`Tab键`可打开时间轴选择单帧，右键点击时间轴上的帧可设置各种参数。

通过快捷键`Ctrl + E`或菜单`文件 -> 导出到精灵表`进行导出操作。在输出设置中选择输出文件和JSON数据格式，出现包含哈希（Hash）和数组（Array）两种选项的下拉菜单时，请确保选择数组（Array）模式，否则会导致异常。

最终将生成两个文件：SpriteSheet图像和JSON文件。请确保这两个文件主文件名相同且扩展名不同。

## 在JSON-UI中使用Aseprite动画

`aseprite_flip_book`动画类型专用于`image`类型元素的`uv`属性配置。

::: code-group
```json [RP/ui/example_file.json]
{
	"image_element": { // 此处为动画元素
		"type": "image",
		"texture": "textures/ui/my_sprite_file",
		"uv_size": [32, 32],
		"uv": "@example_namespace.image_uv_animation"
	},

	"image_uv_animation": { // 此处为动画控制参数
		"anim_type": "aseprite_flip_book",
		"initial_uv": [0, 0]
	}
}
```
:::

将`texture`字段设置为导出文件的路径（不包含扩展名）。`uv_size`字段应设置为单帧的宽高尺寸。