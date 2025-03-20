---
title: 重绘生成蛋纹理
tags:
    - 新手入门
category: 巧思案例
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
    - aexer0e
---

# 重绘生成蛋纹理

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

自定义实体将自动获得生成蛋。该生成蛋可在创造模式物品栏中找到，名称格式为`item.spawn_egg.entity.wiki:my_entity.name`。若需重命名生成蛋并设置纹理，可通过语言文件实现。

本教程将指导如何为生成蛋重绘纹理，使其更符合你的实体造型，而非传统蛋形外观。

## 创建纹理

使用Blockbench软件可轻松截取实体屏幕截图。加载模型后，从下拉菜单中选择"导出截图"。

若需其他样式，也可自行创作像素画或使用任意图片素材。

## 添加纹理文件

将纹理文件置于`textures/items/`目录下。建议新建`eggs`文件夹统一管理生成蛋纹理，例如`textures/items/eggs/my_entity.png`。文件尺寸应为正方形。

## 命名纹理

在物品纹理文件中定义简短标识符：

::: code-group
```json [RP/textures/item_texture.json]
{
	"resource_pack_name": "我的地图名称", //不确定此字段的实际作用
	"texture_name": "atlas.items",
	"texture_data": {
		"my_entity": { //"my_entity"作为纹理标识符，后续可引用
			"textures": "textures/items/egg/my_entity"
		}
        //在此添加更多生成蛋纹理
    }
```
:::

## 应用新纹理

在资源包实体文件中调用新纹理：

::: code-group
```json [RP/entity/my_entity.json#description]
"spawn_egg": {
    "texture": "my_entity", //需与步骤1创建的纹理标识符一致
    "texture_index": 0
}
```
:::

立即进入游戏测试效果吧！