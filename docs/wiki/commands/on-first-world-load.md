---
title: 首次世界加载时
category: 事件系统
mentions:
    - BedrockCommands
    - zheaEvyline
    - SmokeyStack
    - cda94581
nav_order: 6
tags:
    - 系统
---

# 首次世界加载时

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

[由Bedrock Commands社区提供](https://discord.gg/SYstTYx5G5)

此系统将在世界首次加载时运行你指定的命令。
> **注意：** 实现本系统需要[函数包](/wiki/commands/mcfunctions)，因为需要依赖 `tick.json` 文件在游戏初始化时立即执行命令。

## Tick配置文件

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "initialise"
  ]
}
```
:::

## 系统实现

::: code-group
```yaml [BP/functions/initialise.mcfunction]
scoreboard objectives add world dummy
scoreboard players add initialised world 0


# 在此处添加你的命令（示例）
execute if score initialised world matches 0 run say 新世界已创建！


scoreboard players set initialised world 1
```
:::

示例中使用的是 `execute - say` 命令组合，你可以根据需求自由替换为任意命令，并添加任意数量的命令。

请确保遵循给定的命令顺序，并正确使用示例中演示的 `execute if score` 条件判断来执行你的命令。

## 运行原理

- **`initialised=0`** 表示世界刚刚初始化，尚未执行初始化命令
- **`initialised=1`** 表示世界已完成初始化，且初始化命令已执行完毕

我们通过名为 `world` 的计分板目标来存储分数值，以此追踪世界是否已经过初始化。这种机制可以确保初始化命令仅在首次加载时执行。

创建计分板目标后，我们为虚拟玩家 `initialised` 设置初始分数 `0`。这会将虚拟玩家注册到计分板中，便于后续使用 `execute if score` 条件判断。

最后在所有命令执行完毕后，将 `initialised` 的分数设置为 `1`，防止初始化命令重复执行。

## 文件结构

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/pack_icon.png',
    'BP/manifest.json',
    'BP/functions/initialise.mcfunction',
    'BP/functions/tick.json'
]"
></FolderView>

> **注意：** 计分板名称（本例中的'world'）可能与其他开发者重复。建议在名称后追加 `_` 和随机字符组合来降低冲突概率，此技巧同样适用于 `.mcfunction` 文件名。例如：
> - `world_0fe678`
> - `initialise_0fe678.mcfunction`