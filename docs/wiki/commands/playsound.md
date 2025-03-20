---
title: 播放音效
category: 命令
mentions:
    - BedrockCommands
    - zheaEvyline
    - jordanparki7
tags:
    - 信息
---

# 播放音效

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[由 Bedrock Commands 社区 Discord 提供](https://discord.gg/SYstTYx5G5)

你可以使用`/playsound`命令在世界任意位置为玩家播放音效。

## 语法

`/playsound <sound> [player] [position] [volume] [pitch] [minimumVolume]`

## 参数定义

### sound

- 需要播放的音效ID
- 当前可用音效列表可参考：
    - https://www.digminecraft.com/lists/sound_list_pe.php

### player

- 可选参数
- 目标选择器参数（接收音效的玩家）` @a `, ` @r `, ` @p `, ` Technoblade ` 等

### position

- 可选参数
- 音效播放的坐标 `x y z`，即音效可听范围的圆心坐标

### volume

- 可选参数
- 决定音效可听范围的半径
    - 最小值是 `0.0`
- 该值越大，音效传播范围越广
    - 音量 `1` 对应半径16方块的球形范围
    - 音量 `4` 对应半径64方块的球形范围

### pitch

- 可选参数
- 控制音效的音调高低
- 取值范围 `0.0` 至 `256.0`
    - 数值越高音调越尖锐
    - 数值小于等于 `0.0` 时音效不可闻

> 注意：音调参数会影响音频播放速度。例如音调 `0.5` 表示以 0.5 倍速播放音频

### minimumVolume

- 可选参数
- 设置可听范围外的最小音量
- 取值范围 `0.0` 至 `1.0`

## 使用示例

::: code-group
```yaml [mcfunction]
# 对最近的玩家播放随机爆炸音效
/playsound random.explode @p

# 为所有玩家在其当前位置播放随机经验球音效（音量范围10000）
/execute as @a at @s playsound random.orb @s ~ ~ ~ 10000
```
:::

注意：由于播放音效命令具有位置依赖性，在特殊场景（如使用`/tp`传送后）建议采用第二个示例中的`execute`命令结构来避免音效中断。当需要覆盖远距离时，可以适当增大音量参数来确保播放效果。


**（推荐）延伸阅读：[声音系统](/wiki/concepts/sounds)**