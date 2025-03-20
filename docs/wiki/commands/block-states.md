---
title: 方块状态
category: 基础
mentions:
    - BedrockCommands
    - zheaEvyline
    - SmokeyStack
    - ThomasOrs
tags:
    - 信息
---

# 方块状态

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 引言

[由Bedrock Commands社区Discord提供](https://discord.gg/SYstTYx5G5)

方块状态（Block States）或方块属性（Block Properties）是用于定义方块外观或行为的附加数据。例如方块的朝向、颜色、变种、是否充能等特性。

这些数据被广泛应用于多个命令中，包括但不限于：
- `/clone`
- `/execute`
- `/fill`
- `/setblock`
- `/testforblock`

在基岩版中，我们曾使用辅助值（Aux Values，也称元数据）来定义方块。然而自1.19.70版本起，该机制已被全面弃用，并由方块状态完全取代。

::: code-group
```yaml [辅助值]
#辅助值示例：
/setblock ~ ~ ~ wool 1
#等效的方块状态写法：
/setblock ~ ~ ~ wool ["color"="orange"]
```
:::

- 使用辅助值的命令方块仍可继续工作，但在更新时需要改用方块状态
- 同理，在行为包或功能包中使用辅助值的命令，若`min_engine_version`设置为1.19.63或更低版本仍可正常工作，但若将最低引擎版本更新至1.19.70或更高则必须改用方块状态

## 方块状态示例与语法

::: code-group
```yaml [示例]
/setblock ~ ~ ~ wool ["color"="white"]
/setblock ~ ~ ~ wheat ["growth"=0]
/setblock ~ ~ ~ wood ["wood_type"="birch","stripped_bit"=true]
/setblock ~ ~ ~ wool []
```
:::

- 方块状态需用方括号 `[ ]` 包裹
- 多个状态间用逗号 `,` 分隔
- 字符串值需使用双引号包裹，如 `"birch"`、`"spruce"` 等
- 整数值 `0, 1, 2...` 和布尔值 `true/false` 无需引号
- 空括号 `[]` 是有效语法，表示使用默认值0
- `wool 0` 对应白色羊毛，因此可简写为 `wool []` 替代 `wool ["color"="white"]`

### 新手须知

- **整数（Integer）**：用于定义数值范围
  - 示例：红石信号强度1-15
  - `["redstone_power"=10]`

- **布尔值（Boolean）**：表示二值状态（真/假）
  - 是否被激活？是否被按下？是否去皮？
  - `["stripped_bit"=true]`

- **字符串（String）**：用于多选类型
  - 羊毛颜色？原木种类？
  - `["wood_type"="spruce"]`

## 方块状态列表
完整方块状态清单可访问微软官方文档：
https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockstateslist

注意：文档中可能出现连写的状态名称，但在命令中需使用下划线 `_` 分隔

示例：`buttonPressedBit` → `"button_pressed_bit"`

## 辅助值与方块状态转换
可通过下方表格下载完整转换对照表（由kayla@Mojang提供）：

<BButton
    link="https://github.com/BedrockCommands/bedrockcommands.github.io/files/10987839/Aux-Value_to_Block-States_Map.xlsx"
    color=white
>下载表格1</BButton>

注意：此表格为快速生成版本，布尔值需手动将`0`改为`false`，`1`改为`true`

替代表格（由@ItsRichHeart提供）：

<BButton
  link="https://github.com/BedrockCommands/bedrockcommands.github.io/files/11069804/All.Block-Item.List.Bedrock.pdf"
    color=white
>下载表格2</BButton>

也可使用在线[查询工具](https://auxval-to-blockstates.netlify.app/)免下载转换

## 已知问题

使用 `/execute` 或 `/testforblock` 检测方块时，必须指定全部或完全不指定方块状态，否则会报错

示例：检测朝上方向被按下的石质按钮：

::: code-group
```yaml
#✅ 有效写法：
/execute if block ~~~ stone_button [“button_pressed_bit”=true,”facing_direction”=1] run say success
/execute if block ~~~ stone_button run say success

# ❌ 无效写法：
/execute if block ~~~ stone_button [“button_pressed_bit”=true] run say success
/execute if block ~~~ stone_button [“facing_direction”=1] run say success
```
:::

虽然方块状态已取代辅助值，但目前仍无法像选择器参数那样进行精确过滤

### 相关漏洞报告
- [MCPE-133360](https://bugs.mojang.com/browse/MCPE-133360)
- [MCPE-168391](https://bugs.mojang.com/browse/MCPE-168391)