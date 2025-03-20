---
title: 记分板计时器
category: 计分板系统
mentions:
    - BedrockCommands
    - zheaEvyline
nav_order: 5
tags:
    - 系统
---

# 记分板计时器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[源自 Bedrock Commands 社区 Discord](https://discord.gg/SYstTYx5G5)

本系统允许你在指定时间间隔内运行自定义指令，延迟时长可根据需求自由设定。

- **应用场景示例:**
    - 每2小时在聊天栏发送消息
    - 每10分钟执行一次"清除延迟"函数
    - 每30秒给玩家施加速度效果

当需要在世界中设置多个计时器时，本系统尤为实用。使用命令方块时可通过[Tick 延迟](/wiki/commands/intro-to-command-blocks#command-block-tick-delay)选项来延迟指令执行，但在函数中则需要依赖此类系统。

推荐在命令方块中也使用本系统，以便让所有计时器保持同步启动。

## 初始设置

*在聊天栏输入以下指令:*
::: code-group
```yaml [初始化]
scoreboard objectives add ticks dummy
scoreboard objectives add events dummy
```

创建这两个记分项后，需要在`ticks`记分项中为每个重复事件定义间隔时间。

需注意**Minecraft中1秒约等于20游戏刻**，可通过基础运算换算所需时间对应的刻数。
::: code-group
```yaml [时间换算]
# 2小时 = 20(t) × 60(秒) × 60(分) × 2(小时) = 144000刻
scoreboard players set 2h ticks 144000

#10分钟 = 20(t) × 60(秒) × 10(分) = 12000刻
scoreboard players set 10m ticks 12000

#30秒 = 20(t) × 30(秒) = 600刻
scoreboard players set 30s ticks 600
```
:::

## 系统实现

::: code-group
```yaml [计时系统.mcfunction]
scoreboard players add timer ticks 1
scoreboard players operation * events = timer ticks

# 聊天消息（每2小时）
scoreboard players operation chatMessage events %= 2h ticks
execute if score chatMessage events matches 0 run say 技术之刃永世长存！

# 延迟清理（每10分钟）
scoreboard players operation lagClear events %= 10m ticks
execute if score lagClear events matches 0 run function clear_lag

# 速度效果（每30秒）
scoreboard players operation speedEffect events %= 30s ticks
execute if score speedEffect events matches 0 run effect @a speed 10 2 true
```
:::

![命令方块链示意图](/assets/images/commands/commandBlockChain/8.png)

本示例展示了三种计时器的实现方法，您可根据需求扩展更多计时器。请严格按照顺序编写指令，并正确使用`/execute if score`条件判断。

## 系统解析

- **`events`记分项:** 用于标记所有需要重复执行的事件
    - `chatMessage` - 聊天消息
    - `lagClear` - 延迟清理
    - `speedEffect` - 速度效果
- **`ticks`记分项:** 存储事件间隔参数与计时器数值
    - `2h`间隔（固定值144000）
    - `10m`间隔（固定值12000）
    - `30s`间隔（固定值600）
    - `timer`计时器（动态累加值）

**指令详解:**
1. **计时累加:** 每游戏刻为`timer`虚拟玩家分数+1，作为全局时间基准
2. **数值同步:** 将`timer`数值复制到所有事件虚拟玩家，建立时间参照
3. **模运算检测:** 使用` %= `运算符计算余数，当余数为0时触发事件
4. **事件触发:** 根据模运算结果执行对应指令

:::tip 模运算原理
Minecraft中的分数除法仅保留整数部分，余数通过模运算获取。当余数为0时表示达到设定间隔。
![长除法示意图](/assets/images/commands/longDivision.png)
:::

## 有限次数事件

如需限制事件触发次数，可创建`intervals`记分项来设置剩余触发次数：
::: code-group
```yaml [次数限制]
scoreboard players set chatMessage intervals 5
scoreboard players set speedEffect intervals 10
```

修改系统函数如下：
::: code-group
```yaml [有限次数版.mcfunction]
scoreboard players add timer ticks 1
scoreboard players operation * events = timer ticks

# 聊天消息（每2小时）
scoreboard players operation chatMessage events %= 2h ticks
execute if score chatMessage events matches 0 if score chatMessage intervals matches 1.. run say 技术之刃永世长存！
execute if score chatMessage events matches 0 if score chatMessage intervals matches 1.. run scoreboard players remove chatMessage intervals 1

# 速度效果（每30秒）
scoreboard players operation speedEffect events %= 30s ticks
execute if score speedEffect events matches 0 if score speedEffect intervals matches 1.. run effect @a speed 10 2 true
execute if score speedEffect events matches 0 if score speedEffect intervals matches 1.. run scoreboard players remove speedEffect intervals 1
```
:::

## 时段内持续执行

若需要在计时过程中持续执行指令（而不仅是在触发时刻）：
::: code-group
```yaml [持续效果.mcfunction]
# 速度效果（每30秒） + 持续粒子效果
scoreboard players operation speedEffect events %= 30s ticks
execute if score speedEffect intervals matches 1.. as @a at @s run particle minecraft:shulker_bullet ~~~
execute if score speedEffect events matches 0 if score speedEffect intervals matches 1.. run effect @a speed 10 2 true
execute if score speedEffect events matches 0 if score speedEffect intervals matches 1.. run scoreboard players remove speedEffect intervals 1
```
:::

如设置触发次数为10次，粒子效果将持续300秒（10 × 30秒）。

## 实体独立计时器

对于需要单独计时的实体（如定时消失），可使用异步计时系统：
::: code-group
```yaml [实体计时器.mcfunction]
# 计时核心
scoreboard players add @e [name=station, scores={ticks=0..}] ticks 1

# 持续粒子效果
execute as @e [name=station, scores={ticks=0..}] at @s run particle minecraft:shulker_bullet ~~~

# 前10秒火焰粒子
execute as @e [name=station, scores={ticks=0..200}] at @s run particle minecraft:basic_flame_particle ~~~

# 中途提示音效
execute as @e [name=station, scores={ticks=3600}] at @s run playsound note.pling @a [r=10]

# 暂停计时条件
execute as @e [name=station] at @s if entity @e [family=pacified, r=10, c=1] run scoreboard players set @s ticks -1

# 循环计时条件
execute as @e [name=station, scores={ticks=6000}] at @s if entity @e [family=monster, r=10, c=1] run scoreboard players set @s ticks 0

# 最终执行
kill @e [name=station, scores={ticks=6000}]
```
:::

![实体计时器示意图](/assets/images/commands/commandBlockChain/7.png)

通过将分数设为0可实现循环计时，设为-1可停止计时。实体将在6000刻（5分钟）后被清除。