---
title: 随机化结构战利品
category: 巧思案例
mentions:
    - MedicalJewel105
    - SirLich
    - SmokeyStack
    - Ciosciaa
    - rebrainertv
tags:
    - 简单
---

# 随机化结构战利品

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

为结构中的容器添加战利品表非常简单，您需要准备一台电脑，并选择使用[NBT Studio](https://github.com/tryashtar/nbt-studio/releases/download/v1.14.1/NbtStudio.exe)（可执行程序）或[Loot Tabler](https://mcbe-essentials.github.io/structure-editor/loot-tabler)（浏览器应用）。

## 准备工作
### 创建战利品表

首先创建目录`BP/loot_tables/chests`，并在此处创建战利品表文件。

您可以通过[新手指南](/wiki/guide/loot-table)学习如何制作战利品表。

::: code-group
```json [BP/loot_tables/chests/my_structure_loot.json]
{
	"pools": [
		{
			"rolls": {
				"min": 8,
				"max": 10
			},
			"entries": [
				{
					"type": "item",
					"name": "minecraft:glass_bottle",
					"functions": [
						{
							"function": "set_count",
							"count": {
								"min": 4,
								"max": 6
							}
						}
					],
					"weight": 1
				},
				{
					"type": "item",
					"name": "minecraft:potion",
					"functions": [
						{
							"function": "set_count",
							"count": {
								"min": 4,
								"max": 6
							}
						}
					],
					"weight": 1
				}
			]
		}
	]
}
```
:::

### 导出结构

创建好战利品表后，将结构导出到`BP/structures`目录。然后根据您选择的工具（NBT Studio或Loot Tabler）继续操作。

![](/assets/images/tutorials/randomised-structure-loot/export_structure.png)

## NBT Studio（可执行程序）
### 软件准备

下载并启动[NBT Studio](https://github.com/tryashtar/nbt-studio/releases/download/v1.14.1/NbtStudio.exe)

### 添加战利品表

打开NBT Studio并通过快捷键`Ctrl + O`打开文件

![](/assets/images/tutorials/randomised-structure-loot/open_file.png)

使用`Ctrl + F`搜索容器

![](/assets/images/tutorials/randomised-structure-loot/find_container.png)

定位到容器所在位置：`block_position_data` > `block_entity_data`。添加字符串标签

![](/assets/images/tutorials/randomised-structure-loot/add_string_tag1.png)

设置标签名为`LootTable`，并输入战利品表文件路径

![](/assets/images/tutorials/randomised-structure-loot/add_string_tag2.png)

按`Ctrl + S`保存修改

## Loot Tabler（浏览器应用）

:::tip
如需在移动设备导出结构，请[下载此资源包](https://mcpedl.com/export-structure-button-android-addon/)
:::

### 添加战利品表

访问网站并点击"Upload"按钮上传结构文件

![](/assets/images/tutorials/randomised-structure-loot/LootTable-step1.png)

在容器列表中通过"Container Options"下方的信息定位目标容器

![](/assets/images/tutorials/randomised-structure-loot/LootTable-step2.png)

在"Loot Table"字段输入战利品表路径。"Loot Table Seed"留空或设为`0`可实现随机生成。如需固定战利品生成，请设置特定数值

![](/assets/images/tutorials/randomised-structure-loot/LootTable-step3.png)

下载修改后的结构文件并放入`BP/structures`目录

## 测试验证

加载结构并打开容器查看效果

![](/assets/images/tutorials/randomised-structure-loot/test.png)