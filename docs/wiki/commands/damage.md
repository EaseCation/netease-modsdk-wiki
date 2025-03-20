---
title: 伤害指令
category: 命令
tags:
    - 信息
mentions:
    - BedrockCommands
    - cda94581
    - jordanparki7
    - zheaEvyline
---

# 伤害指令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 概述

[源自Bedrock Commands社区Discord](https://discord.gg/SYstTYx5G5)

`/damage` 指令于Minecraft基岩版 `1.18.10` 版本加入，可对指定实体造成精确伤害。这一改进使得原先使用 `/effect` 指令等笨拙的伤害方式成为历史，为地图制作和其他创作提供了更强大的工具。

## 语法结构

- 该指令有两种使用方式：
    - `/damage <目标> <伤害值> [伤害原因]`
    - `/damage <目标> <伤害值> <伤害原因> entity <伤害源实体>`

## 参数说明

- 未包含在尖括号 `<>` 或方括号 `[]` 中的短语需按原样输入
- 括号内内容为可变参数，需要替换为实际值：
    - **` <> `** 尖括号表示必填参数
    - **` [] `** 方括号表示可选参数

## 参数详解

- **` 目标 `**  
  常规实体选择器，如 `@s`、`@e` 或 `"cda94581"`。支持同时选择多个实体进行群体伤害。

- **` 伤害值 `**  
  整数类型，指定造成的伤害数值。最小值为 `0`，最大值为32位有符号整数上限 `2147483647`。

- **` 伤害原因 `**  
  决定伤害来源类型。该参数将影响：
    - 死亡提示信息（如 `X因坠落伤害而亡`）
    - 护甲减伤计算（实际伤害值会根据护甲属性变化）
    - 行为包/附加包中的伤害处理逻辑  
  完整伤害原因列表详见[下方章节](/wiki/commands/damage#damage-cause-list)

- **` 伤害源实体 `**  
  当伤害原因与实体相关时（如 `entity_attack`），此参数指定伤害来源实体。该选择器仅支持单个目标，若返回多个实体会报错。

> 注意：`<伤害原因> entity <伤害源实体>` 语法仅在伤害原因涉及其他实体时使用（如实体攻击）。其他情况请使用基础语法。

## 使用示例

::: code-group
```yaml [mcfunction]
# 对所有玩家造成4点伤害
/damage @a 4

# 对所有绵羊造成3点火焰伤害
/damage @e[type=sheep] 3 fire

# 让随机玩家对所有绵羊造成40点实体攻击伤害
/damage @e[type=sheep] 40 entity_attack entity @r
```
:::

## 伤害原因列表

以下是MCBE中 `/damage` 指令当前支持的所有伤害原因：
```
anvil             # 铁砧
attack            # 普通攻击
block_explosion   # 方块爆炸
charging          # 冲锋（如幻翼）
contact           # 接触伤害（如仙人掌）
drowning          # 溺水
entity_attack     # 实体攻击
entity_explosion  # 实体爆炸
fall              # 坠落
falling_block     # 下坠方块
fatal             # 致命伤害
fire              # 火焰
fire_tick         # 燃烧伤害
fireworks         # 烟花
fly_into_wall     # 飞行撞墙（鞘翅）
freezing          # 冰冻
lava              # 岩浆
lightning         # 闪电
magic             # 魔法
magma             # 岩浆块
none              # 无来源
override          # 强制覆盖
piston            # 活塞
projectile        # 弹射物
sonic_boom        # 监守者音波
stalactite        # 钟乳石
stalagmite        # 石笋
starve            # 饥饿
suffocation       # 窒息
suicide           # 自杀
temperature       # 温度伤害
thorns            # 荆棘
void              # 虚空
wither            # 凋零
```