---
title: 实体计数器
category: 计分板系统
mentions:
    - BedrockCommands
    - zheaEvyline
nav_order: 3
tags:
    - 系统
---

# 实体计数器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 前言

[源自Bedrock Commands社区Discord](https://discord.gg/SYstTYx5G5)

本系统可用于追踪世界中玩家/实体的数量，并根据获取的数值执行自定义命令。

> 注意：无法追踪未加载区块中的实体，但玩家无论是否在加载区块中都可被追踪。

## 初始化设置

*在聊天栏输入:*

`/scoreboard objectives add total dummy`

若希望在世界初始化时自动添加该计分项，请参照[首次世界加载](/wiki/commands/on-first-world-load)中的流程进行设置。

## 核心系统

::: code-group
```yaml [BP/functions/entity_counter.mcfunction]
scoreboard players set onlinePlayers total 0
execute as @e [type=player] run scoreboard players add onlinePlayers total 1

# 在此处添加你的命令（示例）
execute if score onlinePlayers total matches 4.. run title @a actionbar 玩家数量已满足游戏条件。
execute if score onlinePlayers total matches ..3 run title @a actionbar 玩家数量不足。

```
:::

![commandBlockChain3](/assets/images/commands/commandBlockChain/3.png)

本示例使用名为`onlinePlayers`的虚拟玩家分数，通过选择器`@e [type=player]`追踪当前在线玩家数量。您可以根据需求使用任意虚拟玩家名称和实体类型，例如`@e [type=creeper]`来追踪苦力怕数量。

示例中使用的`/title`命令演示了两种条件判断：
- a) 当玩家数≥4时触发 `4..`
- b) 当玩家数≤3时触发 `..3`

您可根据实际需求修改这些条件。

## 系统原理

- 系统中的前两条命令将虚拟玩家分数（此处为`onlinePlayers`）重置为0，然后通过遍历每个已加载的目标实体（此处为`type=player`）来累计分数

通过获取的数值，我们可以使用`/execute if score`命令在满足特定条件时执行自定义操作：
- **` n `** 精确匹配数值n
- **` n.. `** 数值≥n时触发
- **` ..n `** 数值≤n时触发
- **` n1..n2 `** 数值在n1到n2区间时触发

## 循环执行配置

若使用函数替代命令方块，需将`entity_counter`函数添加至`tick.json`以实现循环持续执行。通过在字符串后添加逗号分隔，可将多个文件添加至`tick.json`。更多信息请参考[函数文档](/wiki/commands/mcfunctions#tick-json)。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "entity_counter"
  ]
}
```
:::

使用函数时，资源包文件夹结构如下所示：

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/pack_icon.png',
    'BP/manifest.json',
    'BP/functions/entity_counter.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意：** 计分项名称（本例中的'total'）可能被他人重复使用。建议在名称后追加`_`和随机字符组合来降低冲突概率，此方法同样适用于`.mcfunction`文件名。例如：
> - `total_0fe678`
> - `entity_counter_0fe678.mcfunction`