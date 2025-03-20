---
title: 子Packs
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - ChilRx
    - SmokeyStack
    - MedicalJewel105
    - TheItsNameless
---

# 子Packs

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 什么是子包？

子包功能允许玩家在不同的附加包"配置"之间进行选择。

该功能最初设计用于根据设备内存容量加载不同分辨率的材质包，但也可用于创建行为包和资源包的多种文件变体。玩家可以通过点击齿轮图标并调整滑块来选择不同的子包配置。

## 子包工作原理

当子包被选中时，放置在子包文件夹中的文件将覆盖主附加包文件夹中的同名文件。例如，若附加包同时包含 `RP/textures/entities/ghost.png` 和 `RP/subpacks/pack_1/textures/ghost.png`，当选择 `pack_1` 子包时，第二个图片文件将取代第一个文件。

关于文件覆盖机制的更多信息，请参阅我们的[覆盖原版资源](/wiki/concepts/overwriting-assets)说明文档。

## 创建子包

- 首先需要在行为包或资源包的根目录下创建 `subpacks` 文件夹
- 在 `subpacks` 文件夹内为每个子包创建独立文件夹
  例如：

<FolderView :paths="[
	'RP/subpacks/subpack_1',
	'RP/subpacks/subpack_2'
]"></FolderView>

- 在每个子包文件夹中添加该子包的特定内容
  这些内容可以是常规附加包中的任意资源
  例如：

<FolderView :paths="[
	'RP/subpacks/subpack_1/textures/blocks/dirt.png',
	'RP/subpacks/subpack_1/textures/items/example_item.png',
	'RP/subpacks/subpack_2/textures/blocks/dirt.png',
	'RP/subpacks/subpack_2/textures/items/example_item.png'
]"></FolderView>

## 清单文件配置

需要在清单文件(manifest.json)中注册子包信息，在 `subpacks` 字段下以数组形式声明各个子包。

示例配置：

::: code-group
```json [RP/manifest.json]
{
	"format_version": 2,
	"header": {
		"name": "资源包名称",
		"description": "资源包描述",
		"uuid": "2fc2dd6f-86cb-4370-af70-21490a1ae471",
		"version": [1, 0, 0],
		"min_engine_version": [1, 13, 0]
	},
	"modules": [
		{
			"type": "resources",
			"uuid": "f6821b4a-1854-44fc-a8a4-0c2847ffda46",
			"version": [1, 0, 0]
		}
	],
	"subpacks": [
		{
			"folder_name": "subpack_1",
			"name": "初级材质",
			"memory_tier": 0
		},
		{
			"folder_name": "subpack_2",
			"name": "高清材质",
			"memory_tier": 1
		}
	]
}
```
:::

-   `name` - 在子包选择界面显示的名称
-   `memory_tier`- 设备运行所需内存配置（1个内存等级 = 0.25 GB）
-   `folder_name` - 对应子包文件夹名称，例如示例中的 `subpack_1` 或 `subpack_2`

## 注意事项

当仅添加一个子包时，选择界面会显示两个选项，但第二个"无子包"选项实际上**不会**用根目录内容覆盖子包内容。