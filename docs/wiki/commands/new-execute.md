---
title: 全新execute命令
category: 命令
tags:
    - 简单
mentions:
    - JaylyDev
    - Sprunkles137
    - Hatchibombotar
    - TheItsNameless
    - SmokeyStack
    - zheaEvyline
---

# 全新execute命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 引言

随着1.19.50版本的发布，`/execute`命令迎来了语法革新。虽然新语法需要书写更长的指令，但它能更精细地控制命令的上下文组件，并为命令添加了条件支持，从而取代了`/testfor`、`/testforblock`和`/testforblocks`等命令。

在深入解析语法细节之前，我们需要理解旧版`/execute`的工作原理及其演变逻辑，这将有助于更好地理解新语法中的概念。

## 理解执行上下文

无论是命令新手还是熟悉旧版`/execute`的开发者，都有必要重新审视命令的**执行上下文**概念。

简而言之，这些参数决定了命令的运行方式：命令的执行者（即由谁执行）、执行位置、所在维度以及执行时的视角旋转角度等。

每个命令都携带这样的上下文，且上下文会根据命令的运行方式动态变化。从命令方块触发的命令没有明确执行者，位置固定在命令方块处；通过聊天框执行的命令则以玩家为执行者，并在玩家当前位置运行。

## Execute命令的演变逻辑

`/execute`命令允许通过一个或多个实体代理执行命令。旧版语法结构如下：

```
/execute <目标> <位置> <命令>
/execute <目标> <位置> detect <位置> <方块> <数据值> <命令>
```

旧语法指定目标后，命令的上下文将切换至该目标的位置执行。所有位置偏移都默认相对于该目标。

虽然这在多数情况下很实用，但也强制绑定了命令目标与执行位置（除非手动输入世界坐标）。同时，在构建条件语句时缺乏灵活性，因为每次都需要通过实体执行。

在2017年夏季水域更新的开发阶段，Minecraft Java版开发团队收集了社区反馈后，提出了全新设计理念：`/execute`可以串联无限个**子命令**来按序调整命令的不同上下文维度，最后通过"run"子命令触发实际命令。

这种设计大幅提升了`/execute`的上下文控制能力，实现了执行者与执行位置的分离。

## 新语法解析

现在让我们系统梳理新版`/execute`语法结构：

### `/execute as`

更改命令执行者，即影响目标选择器`@s`的指向。

```
/execute as <origin: 目标> -> execute
```

此命令不会改变执行位置、视角或维度上下文。

若指定多个目标，则依次以每个目标为`@s`执行命令。

### `/execute at`

更改命令执行位置，将命令的坐标、视角和维度同步至目标实体。

```
/execute at <origin: 目标> -> execute
```

此命令不会改变执行者身份，故`@s`仍指向最近一次指定的目标。

若指定多个目标，则依次在目标位置执行命令。

### `/execute in`

设置命令执行的维度环境。

```
/execute in <dimension: 字符串> -> execute
```

当前可用维度标识符为`overworld`、`nether`和`the_end`。

维度切换时会自动换算坐标比例（如主世界至下界应用x0.125缩放，反之则x8放大）。

### `/execute positioned`

直接设定命令执行坐标。

```
/execute positioned <position: x y z> -> execute
```

将命令位置设为指定坐标。[相对坐标与局部坐标](/wiki/commands/relative-coordinates)基于当前命令位置计算。

```
/execute positioned as <origin: 目标> -> execute
```

将命令位置同步至目标坐标。功能类似`/execute at`，但仅改变位置不改变视角与维度。

若指定多个目标，则依次在目标位置执行命令。

### `/execute align`

将当前命令位置对齐至方块网格。

```
/execute align <axes: 轴组合> -> execute
```

对齐操作将坐标向下取整。本子命令接受由"x"、"y"、"z"组成的非重复组合，对指定轴进行取整。

### `/execute anchored`

设置命令的锚点位置（脚部或眼部），影响局部坐标基准。

```
/execute anchored (eyes|feet) -> execute
```

默认锚点为脚部。

当锚点设为`eyes`时，命令的局部坐标会根据执行者的"眼高"进行偏移。

注意：由于漏洞[MCPE-162681](https://bugs.mojang.com/browse/MCPE-162681)，当前该设置会影响相对坐标。

### `/execute rotated`

直接设定命令执行视角。

```
/execute rotated <yaw: 值> <pitch: 值> -> execute
```

设置具体视角参数。相对坐标与局部坐标基于当前视角计算，默认值为0（若未变更过视角）。

```
/execute rotated as <origin: 目标> -> execute
```

同步目标实体的视角参数。

若指定多个目标，则依次应用目标视角执行命令。

### `/execute facing`

设置命令视角朝向特定坐标或实体部位。

```
/execute facing <position: x y z> -> execute
```

使命令视角朝向指定方块坐标，基于当前命令位置计算。

```
/execute facing entity <origin: 目标> (eyes|feet) -> execute
```

使命令视角朝向目标实体部位。选择`feet`锚点将瞄准脚部位置，`eyes`则瞄准眼部（参考[`/execute anchored`](/wiki/commands/new-execute#execute-anchored)）。

若指定多个目标，则依次应用目标朝向执行命令。

### `/execute (if|unless)`

根据条件判断是否执行命令。`if`在条件为真时继续，`unless`则相反。

```
/execute if entity <target: 目标> -> execute
```

类似`/testfor`，检测目标是否存在。

```
/execute if block <position: x y z> <block: 字符串> -> execute
```

类似`/testforblock`，检测指定位置方块。

可附加数据值或方块状态参数，否则忽略状态（等效于`-1`）。

```
/execute if blocks <begin: x y z> <end: x y z> <destination: x y z> (all|masked) -> execute
```

类似`/testforblocks`，比对源区域与目标区域的方块布局。

`all`参数要求完全匹配，`masked`忽略空气方块。

```
/execute if score <target: 目标> <objective: 字符串> matches <range: 整数范围> -> execute
```

检测指定分数是否符合数值范围（使用整数区间语法）。

```
/execute if score <target: 目标> <objective: 字符串> (=|<|<=|>|>=) <source: 目标> <objective: 字符串> -> execute
```

比对两个分数的逻辑关系，支持等于（`=`）、大于（`>`）、大于等于（`>=`）、小于（`<`）、小于等于（`<=`）。

### `/execute run`

```
/execute run <command: 命令>
```

应用所有上下文修改后执行指定命令。本子命令必须作为`/execute`链的末尾。

注意：当`/execute`链以`if`或`unless`结尾时，可不带`run`直接返回检测结果。

## 实例解析与旧指令升级

由于子命令可无限串联，实际组合方式近乎无限。以下列举典型应用场景：

旧版`/execute`功能可通过`as <目标> at @s`复现。如需相对位置偏移，添加`positioned`；如需方块检测，添加`if block`。示例如下：

::: code-group
```mcfunction [旧版偏移传送]
/execute @p ~ ~1.62 ~ teleport @s ^ ^ ^3
```
```mcfunction [新版等效]
/execute as @p at @s positioned ~ ~1.62 ~ run teleport @s ^ ^ ^3
```
:::

::: code-group
```mcfunction [旧版链式检测]
/execute @e[type=sheep] ~ ~ ~ execute @e[type=item,r=5] ~ ~ ~ detect ~ ~-1 ~ stone 0 kill @s
```
```mcfunction [新版等效]
/execute at @e[type=sheep] as @e[type=item,r=5] at @s if block ~ ~-1 ~ stone 0 run kill @s
```
:::

（注意此处使用`at @e[type=sheep]`而非`as`，因为只需位置信息）

新版语法还支持许多旧版难以实现的功能：

::: code-group
```mcfunction [检测虚拟玩家分数]
/execute if score game_settings var matches 3.. run say [游戏] 难度已设为困难。

```mcfunction [分数比对]
/execute as @a if score @s x = @s y run say 我的X值等于Y值。

```mcfunction [非选中实体检测]
/execute as @a at @s if entity @e[type=armor_stand,r=10] run gamemode survival @s
```
:::