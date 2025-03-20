---
title: 玩家离开事件系统
category: 事件系统
mentions:
    - BedrockCommands
    - zheaEvyline
nav_order: 3
tags:
    - 系统
---

# 玩家离开事件系统

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[由 Bedrock Commands 社区 Discord 提供](https://discord.gg/SYstTYx5G5)

本系统可在玩家离开世界时运行你指定的命令。

> **注意：** 无法通过选择器对离开的玩家本体执行命令。但你可以使用[玩家加入事件系统](/wiki/commands/on-player-join)在他们重新加入时执行命令。

## 系统搭建

*在聊天栏输入以下指令：*

`/scoreboard objectives add total dummy`

若希望在世界初始化时自动添加计分项，请参照[首次世界加载事件系统](/wiki/commands/on-first-world-load)的操作流程。

## 系统核心

::: code-group
```yaml [BP/functions/on_player_leave.mcfunction]
scoreboard players reset new total
execute as @a run scoreboard players add new total 1
scoreboard players operation new total -= old total


#在此处输入你的命令（示例）
execute if score new total matches ..-1 run say 有玩家离开了世界


scoreboard players reset old total
execute as @a run scoreboard players add old total 1
```

![命令方块链6](/assets/images/commands/commandBlockChain/6.png)

此处我们以 **`/say`** 命令作为示例，你可以根据需要替换为任意命令并自由扩展。

请严格按照给定顺序排列命令，并正确使用示例中的 `/execute if score` 命令结构来触发你的自定义命令。

## 原理说明

- **` new `** 这个虚拟玩家名称表示当前游戏刻中世界内的玩家总数
- **` old `** 这个虚拟玩家名称表示前一游戏刻的玩家总数，同时会将数值保存供下一游戏刻使用

这些数值通过[实体计数系统](/wiki/commands/entity-counter)获取，建议结合该文档以获得更深入的理解。

通过从'new'总数中减去'old'总数，我们可以判断玩家数量是否发生：
- 减少 ` ..-1 `
- 增加 ` 1.. `
- 或保持不变 ` 0 `

当检测到数值减少时（即得分为-1或更低），我们就能确定有1名或更多玩家离开了游戏。
- 示例：原有10名玩家时有人离开
    - 计算式为 ` new - old `
    - 即 ` 9 - 10 = -1 `
    - 因此通过 ` ..-1 ` 条件检测

- 系统首先获取'new'总数，执行减法运算后运行你的自定义命令，最后获取'old'总数供下一游戏刻使用

:::tip 游戏刻解析
所有在命令方块链或函数中运行的指令都会在同一游戏刻内按顺序依次执行。由于命令执行发生在游戏刻的末端（包含所有玩家登录、登出、死亡等事件之后），本系统得以精准运作。

![游戏刻示意图](/assets/images/commands/gametick.png)
:::

## Tick JSON 配置

若使用函数替代命令方块，需将 ` on_player_leave ` 函数添加至 ` tick.json ` 以实现循环执行。通过在字符串后添加逗号分隔，可将多个文件添加至 ` tick.json `。更多信息请参考[函数文档](/wiki/commands/mcfunctions#tick-json)。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "on_player_leave"
  ]
}
```

使用函数时，资源包文件夹结构如下：

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/pack_icon.png',
    'BP/manifest.json',
    'BP/functions/on_player_leave.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意：** 计分项名称（本例中的'total'）可能与他人重复。建议在名称后追加 ` _ ` 和随机字符组合来降低冲突概率，此技巧同样适用于 ` .mcfunction ` 文件名。例如：
> - ` total_0fe678 `
> - ` on_player_leave_0fe678.mcfunction `