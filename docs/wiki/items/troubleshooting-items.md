---
title: 物品问题排查
category: 基础
nav_order: 4
tags:
    - help
mentions:
    - SmokeyStack
    - yanasakana
    - SirLich
    - MedicalJewel105
    - TheDoctor15
    - ThomasOrs
---

# 物品问题排查

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip
本文包含关于 _物品_ 的故障排查信息。在继续阅读前，建议先查看[全局故障排查指南](/wiki/guide/troubleshooting)。
:::

## 从这里开始

我按照教程制作了自定义物品，但出现了问题！请保持冷静。本指南将帮助您排查常见问题。根据按钮提示了解可能的问题原因及修复方法。

## 1.10 与 1.16 格式物品的区别？

首先需要确认您使用的是实验性物品格式还是稳定版物品格式。

:::tip
`1.16.0` 及更早版本属于**稳定版**（包含 `1.16`, `1.14`, `1.13`, `1.12`, `1.10`）。这些格式**无需**启用 `Holiday Creator Features` 实验性玩法。

🔗 [稳定版物品教程](/wiki/guide/custom-item)
🔗 [稳定版物品文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.54/Item)
:::

:::tip
`1.16.100` 及更高版本属于**实验性格式**。这些物品**必须**在世界设置中启用 `Holiday Creator Features` 才能正常使用。

🔗 [实验性物品教程](/wiki/items/item-components)
🔗 [实验性物品文档](https://bedrock.dev/docs/stable/Item)
:::

## 稳定版物品

本部分针对稳定版物品的故障排查。请注意：使用 `1.10` 格式时，您需要同时存在 RP 和 BP 文件！如果只有 BP 文件，说明混淆了格式版本。请返回[此处](#_1-10-vs-1-16-items)重新确认。

根据问题现象选择对应排查步骤：

-   [无法通过 /give 获取物品](#无法通过-give-获取物品)
-   [物品贴图丢失](#物品贴图丢失)

### 无法通过 /give 获取物品

此问题通常由 BP 文件配置错误引起：

-   确认资源包已正确加载至世界
-   确认物品文件存放在 `BP/items/` 目录
-   使用 [jsonlint](https://jsonlint.com/) 验证 JSON 格式正确
-   确保物品标识符全小写，格式如：`wiki:my_item`

### 物品贴图丢失

首先检查 `item_texture.json` 文件：

-   正确路径应为：`RP/textures/item_texture.json`
-   常见错误路径示例：
    -   ⚠️ `texture/item_texture.json`
    -   ⚠️ `textures/Item_texture.json`
    -   ⚠️ `textures/item_textures.json`

参考示例文件结构：

::: code-group
```json [RP/textures/item_texture.json]
{
	"resource_pack_name": "wiki",
	"texture_name": "atlas.items",
	"texture_data": {
		"gem": {
			"textures": "textures/items/gem"
		}
	}
}
```
:::

接着检查 RP 物品文件：

-   正确路径应为：`RP/items/物品名称.json`
-   错误示例路径：
    -   ⚠️ `item/gem.json`

参考示例配置（注意注释说明）：

::: code-group
```json [RP/items/gem.json]
{
	"format_version": "1.10",
	"minecraft:item": {
		"description": {
			"identifier": "wiki:gem",
			"category": "Nature"
		},
		"components": {
			"minecraft:icon": "gem", // 确保此字符串与 item_texture.json 中的键名一致！
			"minecraft:render_offsets": "tools"
		}
	}
}
```
:::

正确配置后物品将正常显示贴图。

## 实验性物品

本部分针对实验性物品格式的故障排查。请注意：使用 `1.16` 格式时**不应存在 RP 物品文件**！如果同时存在 RP 和 BP 文件，说明混淆了格式版本。请返回[此处](#_1-10-vs-1-16-items)重新确认。

根据问题现象选择对应排查步骤：

- [从这里开始](#从这里开始)
- [1.10 与 1.16 格式物品的区别？](#110-与-116-格式物品的区别)
    - [继续选择](#继续选择)
- [稳定版物品](#稳定版物品)
    - [无法通过 /give 获取物品](#无法通过-give-获取物品)
    - [物品贴图丢失](#物品贴图丢失)
- [实验性物品](#实验性物品)
    - [无法通过 /give 获取物品](#无法通过-give-获取物品-1)
    - [物品贴图丢失！](#物品贴图丢失-1)
    - [物品模型过大](#物品模型过大)
- [后续步骤](#后续步骤)

### 无法通过 /give 获取物品

-   确认资源包已正确加载至世界
-   确认物品文件存放在 `BP/items/` 目录
-   使用 [jsonlint](https://jsonlint.com/) 验证 JSON 格式正确
-   确保物品标识符全小写，格式如：`wiki:my_item`

### 物品贴图丢失！

检查 `item_texture.json` 文件：

-   正确路径应为：`RP/textures/item_texture.json`
-   常见错误路径示例：
    -   ⚠️ `texture/item_texture.json`
    -   ⚠️ `textures/Item_texture.json`
    -   ⚠️ `textures/item_textures.json`

参考示例文件：

::: code-group
```json [RP/textures/item_texture.json]
{
	"resource_pack_name": "wiki",
	"texture_name": "atlas.items",
	"texture_data": {
		"gem": {
			"textures": "textures/items/gem"
		}
	}
}
```
:::

接着在 BP 文件中确认 `minecraft:icon` 组件配置：

::: code-group
```json [BP/items/your_item.json]
{
  "format_version": "1.16.100",
  "minecraft:item": {
      "description": {
          "identifier": "namespace:your_item",
          "category" : "items" // 此字段必须存在
      },
      "components": {
        "minecraft:icon": {
          "texture": "your_item_name" // 确保此字符串与 item_texture.json 中的键名一致
        }
      },
      "events": {...}
  }
}
```
:::

正确配置后物品将正常显示贴图。

### 物品模型过大

如需恢复标准物品尺寸（`16x16`），使用以下公式计算渲染缩放：`基准值/(分辨率/16)`

推荐使用基准值 `[0.075, 0.125, 0.075]` 可获得近似原版物品的缩放比例。

::: code-group
```json [BP/items/your_item.json#components]
"minecraft:render_offsets":{
    "main_hand":{
        "first_person":{
            "scale":[
                0,
                0,
                0
            ]
        },
        "third_person":{
            "scale":[
                0,
                0,
                0
            ]
        }
    },
    "off_hand":{
        "first_person":{
            "scale":[
                0,
                0,
                0
            ]
        },
        "third_person":{
            "scale":[
                0,
                0,
                0
            ]
        }
    }
}
```
:::

## 后续步骤

如果您的问题仍未解决，欢迎[加入 Discord 社区](/discord)进行咨询。