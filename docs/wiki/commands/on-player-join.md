---
title: 玩家加入事件响应
category: 事件系统
mentions:
    - BedrockCommands
    - zheaEvyline
nav_order: 2
tags:
    - system
---

# 玩家加入事件响应

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[由Bedrock Commands社区Discord提供](https://discord.gg/SYstTYx5G5)

本系统可在玩家加入世界时触发预设命令的执行。

## 设置

*在聊天栏输入以下指令：*

`/scoreboard objectives add joined dummy`

若需实现世界初始化时自动创建记分板项，请参照[首次世界加载事件响应](/wiki/commands/on-first-world-load)的操作流程。

## 系统实现

::: code-group
```yaml [BP/functions/on_player_join.mcfunction]
scoreboard players add @a joined 0


#在此处添加你的命令（示例）
tp @a[scores={joined=0}] 0 65 0


scoreboard players reset * joined
scoreboard players set @a joined 1
```
:::

![命令方块链4](/assets/images/commands/commandBlockChain/4.png)

示例中使用了`tp`传送命令，您可以根据实际需求替换为任意命令，并自由扩展命令数量。

请确保保持现有执行顺序，并为目标命令正确添加选择器参数 `scores={joined=0}`。

## 原理说明

当玩家加入时，系统会为其记分板项赋初始值0，这使我们能够通过`scores`选择器参数定位新加入玩家。

在命令执行完毕后立即执行以下操作：
1. 使用通配符`*`重置所有玩家的记分板值
2. 为保持在线状态的玩家设置值1

通过这种机制，由于所有命令仅针对记分板值为0的玩家，已在线玩家不会重复触发响应，除非他们退出后重新加入，或手动执行：
`/scoreboard players set <player> joined 0`

## 时钟函数配置

若使用函数替代命令方块，需将`on_player_join`函数添加至`tick.json`以实现循环执行。多个函数可通过逗号分隔添加，详见[函数文档](/wiki/commands/mcfunctions#tick-json)。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "on_player_join"
  ]
}
```
:::

使用函数时资源包目录结构如下：

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/pack_icon.png',
    'BP/manifest.json',
    'BP/functions/on_player_join.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意：** 记分板名称（本例中的'joined'）可能与其他开发者重复使用。建议在名称后追加`_`和随机字符组合以降低冲突概率，函数文件名也可采用类似处理方式。例如：
> - `joined_0fe678`
> - `on_player_join_0fe678.mcfunction`