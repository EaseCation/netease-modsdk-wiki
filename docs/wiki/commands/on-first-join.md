---
title: 首次进入时
category: 事件系统
mentions:
    - BedrockCommands
    - zheaEvyline
    - SmokeyStack
nav_order: 1
tags:
    - 系统
---

# 首次进入时

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[由Bedrock Commands社区Discord提供](https://discord.gg/SYstTYx5G5)

本系统将在玩家首次进入世界时执行你预设的命令。

## 系统实现

::: code-group
```yaml [BP/functions/on_first_join.mcfunction]
# 在此处输入你的命令（示例）
give @a[tag=!joined] stone_pickaxe
give @a[tag=!joined] bread 16 1
tag @a[tag=!joined] add joined
```
:::

![命令方块链示意图3](/assets/images/commands/commandBlockChain/3.png)

我们以两个`give`命令为例，你可以根据需求使用任意命令组合。请确保遵循以下要点：
- 保持示例中的执行顺序
- 在选择器参数中正确添加`tag=!joined`条件

## 原理说明

当玩家首次加入世界时，他们不会携带`joined`标签。系统通过检测未拥有该标签的玩家执行预设命令后，会立即为其添加标签以防止重复执行。

若需要重置玩家状态，可通过以下命令移除标签：
`tag <玩家名> remove joined`

## 时钟函数配置

若使用函数替代命令方块，需将`on_first_join`函数添加至`tick.json`以实现循环检测。多个函数可通过逗号分隔添加，详见[函数文档](/wiki/commands/mcfunctions#tick-json)。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "on_first_join"
  ]
}
```
:::

使用函数时资源包结构如下：

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/pack_icon.png',
    'BP/manifest.json',
    'BP/functions/on_first_join.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意：** 标签名称（如本例中的'joined'）可能与其他开发者重复。建议在名称后追加`_`和随机字符组合来降低冲突概率，此方法同样适用于函数文件名。例如：
> - `joined_0fe678`
> - `on_first_join_0fe678.mcfunction`