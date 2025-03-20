---
title: 玩家死亡事件
category: 事件系统
mentions:
    - BedrockCommands
    - zheaEvyline
nav_order: 4
tags:
    - 系统
---

# 玩家死亡事件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 系统介绍

[由Bedrock Commands社区Discord提供](https://discord.gg/SYstTYx5G5)

本系统将在玩家死亡时执行你预设的命令。

## 系统配置

*在聊天栏输入以下指令：*

`/scoreboard objectives add alive dummy`

若希望在世界初始化时自动创建计分板，请参考[首次世界加载事件](/wiki/commands/on-first-world-load)中的操作流程。

## 系统实现

::: code-group
```yaml [BP/functions/on_player_death.mcfunction]
scoreboard players set @a [scores={alive=!2}] alive 0
scoreboard players set @e [type=player] alive 1


#在此处添加你的命令（示例）
execute as @a [scores={alive=0}] run say 我死了


scoreboard players set @a [scores={alive=0}] alive 2
```

![命令方块链4](/assets/images/commands/commandBlockChain/4.png)

我们以`/execute - say`指令为例，你可以根据需求替换为任意指令并自由扩展数量。

请严格遵循给定顺序，并确保在目标指令中正确添加选择器参数`scores={alive=0}`。

## 系统原理

- **`alive=0`** 表示玩家处于死亡状态
- **`alive=1`** 表示玩家处于存活状态
- **`alive=2`** 表示已对死亡玩家执行过预设命令


- **`@a`** 选择器会选中所有玩家（无论生死），因此我们用它将所有玩家标记为0（死亡）
    - 注意：需要排除已标记为2的玩家，否则会导致命令在死亡玩家身上重复执行


- **`@e`** 选择器仅会选中存活玩家，因此我们用它将所有存活玩家标记为1（存活）


- 通过上述标记，我们可以在死亡玩家（标记0）身上执行预设命令
    - 执行后需将其分数设为2，否则命令会在玩家复活前持续执行


## 循环执行配置

若使用函数实现，需将`on_player_death`函数添加至`tick.json`以实现循环执行。多个函数可通过逗号分隔添加，详见[函数文档](/wiki/commands/mcfunctions#tick-json)。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "on_player_death"
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
    'BP/functions/on_player_death.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意：** 计分板名称（如本例中的'alive'）可能被他人重复使用。建议在名称后追加`_`和随机字符来降低冲突概率，函数文件名也可采用相同策略。例如：
> - `alive_0fe678`
> - `on_player_death_0fe678.mcfunction`