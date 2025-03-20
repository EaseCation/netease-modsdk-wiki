---
title: 玩家重生事件
category: 事件系统
mentions:
    - BedrockCommands
    - zheaEvyline
nav_order: 5
tags:
    - system
---

# 玩家重生事件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 前言

[由Bedrock Commands社区Discord提供](https://discord.gg/SYstTYx5G5)

当玩家从死亡状态重生时，该系统将执行您指定的命令。

## 初始化设置

*在聊天栏输入以下指令:*

`/scoreboard objectives add respawn dummy`

若希望在世界初始化时自动添加计分板，请参照[首次世界加载](/wiki/commands/on-first-world-load)指南操作。

## 系统实现

::: code-group
```yaml [on_player_respawn.mcfunction]
# 在此处添加你的命令（示例）
execute as @e [scores={respawn=1}] run say 我已死亡并重生。


scoreboard players set @a respawn 1
scoreboard players set @e [type=player] respawn 0
```
:::

![命令方块链3](/assets/images/commands/commandBlockChain/3.png)

本例中使用`/execute - say`指令作为示例，您可以根据需求替换为任意指令，数量不限。

请严格遵循指令顺序，并正确使用选择器参数` @e [scores={respawn=1}] `来定位目标玩家。

## 运行原理

- **` respawn=0 `** 表示玩家存活或已完成重生
- **` respawn=1 `** 表示玩家死亡且正在重生（即当前游戏刻内刚触发重生）
- **` @a `** 选择器将定位所有玩家（包括存活/死亡），用于标记全体玩家为1（正在重生状态）
- **` @e `** 选择器仅定位存活玩家，用于重置存活玩家为0（已完成重生状态）

通过此机制，我们可以精准捕捉到刚刚重生的玩家（分数为1的玩家）来执行指定命令。

在系统文件中，自定义命令必须放置在最后两条计分板操作指令之前，因为玩家状态会在游戏刻开始时立即从死亡转为存活。

若将自定义命令置于末尾，计分板操作会先将重生玩家的分数重置为0，此时通过` @e [scores={respawn=1}] `选择器将无法定位到目标玩家。若使用分数0作为条件，则会导致指令在已重生玩家身上重复触发。

## 游戏刻函数配置

若使用函数而非命令方块，需将` on_player_respawn `函数添加至` tick.json `以实现循环检测。多个函数可通过逗号分隔添加，详见[函数文档](/wiki/commands/mcfunctions#tick-json)。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "on_player_respawn"
  ]
}
```
:::

函数包的文件结构如下所示：

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/pack_icon.png',
    'BP/manifest.json',
    'BP/functions/on_player_respawn.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意:** 计分板名称（本例中的'respawn'）可能与其他开发者冲突。建议在名称后追加` _ `和随机字符组合来降低重复概率，函数文件名也可采用相同策略。例如:
> - ` respawn_0fe678 `
> - ` on_player_respawn_0fe678.mcfunction `