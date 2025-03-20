---
title: 函数 mcfunction
category: 基础
mentions:
    - Bedrock Commands
    - cda94581
    - zheaEvyline
    - jordanparki7
nav_order: 3
tags:
    - 信息
---

# 函数 mcfunction

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[源自 Bedrock Commands 社区 Discord](https://discord.gg/SYstTYx5G5)

函数是包含多行命令的 `.mcfunction` 文件，可通过游戏中的 `/function` 命令运行。

函数需要创建在**行为包**的 **functions** 文件夹内。纯函数包系统完全由函数文件构成。

函数在多个方面非常有用，可以减少逐个命令方块调试系统所花费的时间。同时也便于将系统打包用于多个世界，并提供了许多可以改变整体运行方式的函数。

## 函数包目录结构

<FolderView
	:paths="[
    'BP',
    'BP/functions',
    'BP/functions/this_code.mcfunction',
    'BP/functions/more_of_this_code.mcfunction',
    'BP/functions/tick.json',
    'BP/functions/nested',
    'BP/functions/nested/this_code_is_nested.mcfunction',
]"
></FolderView>

## 新手须知

::: code-group
```yaml [mcfunction]
#生成效果
effect @a [tag=atSpawn] regeneration 12 255 true
effect @a [tag=atSpawn] saturation 12 255 true
effect @a [tag=atSpawn] weakness 12 255 true
```
:::

- 函数文件中每一新行代表一个新命令。可以使用 `#` 开头添加注释。函数内的命令不需要以斜杠 `/` 开头，但添加了也不会报错。

- 函数中的所有命令会在**同一游戏刻**内执行。因此，包含大量变更操作的函数可能导致突然的卡顿，建议尽可能将命令分摊到多个游戏刻中执行。但函数内的命令仍会按顺序依次运行。

- Minecraft **无法**在一个函数文件中运行超过10,000行命令，这包括原始文件中调用的其他函数文件。

- 无法执行条件型命令。这类命令仍需通过命令方块实现，或使用1.19.50版本的execute语法。

- 要在函数中实现延迟执行命令，需使用计分板计时器逐刻计数（达到指定值），并在特定分数时执行命令。可参考[计分板计时器](/wiki/commands/scoreboard-timers)系统了解设置方法。

## 创建函数

1. 找到 `📁 com.mojang` 文件夹并进入 `📁 development_behavior_packs`
    - 开发文件夹用于快速重载资源包，因为这些包不会被缓存到世界文件中。

2. 为函数包创建任意名称的文件夹（称为行为包或BP）。

3. 在BP文件夹内创建 `📄 manifest.json` 文件和 `🖼 pack_icon.png` 文件（可选）
    - 清单文件包含注册资源包所需的所有信息，包图标则用于在资源包菜单中显示。包图标建议使用128x128或256x256分辨率（支持2次幂分辨率，会自动缩放）。

<Spoiler title="示例 📄 manifest.json">

::: code-group
```json [BP/manifest.json]
{
    "format_version": 2,
    "header": {
        "description": "在此填写资源包描述",
        "name": "在此填写资源包名称",
        "uuid": "00000000-0000-0000-0000-000000000000",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 19, 73 ]
    },
    "modules": [
        {
            "description": "§r",
            "type": "data",
            "uuid": "00000000-0000-0000-0000-000000000000",
            "version": [1, 0, 0 ]
        }
    ]
}
```
:::

注意：uuid字段需要替换为实际值，且两个uuid必须不同。可通过 https://uuidgenerator.net/ 生成

</Spoiler>
<Spoiler title="示例 🖼 pack_icon.png">

示例A：
	
![pack_icon.png](/assets/images/commands/pack_icon.png)

示例B：

![pack_icon.png](/assets/images/guide/project-setup/pack_icon.png)

</Spoiler>

4. 创建 `📁 functions` 文件夹。该文件夹内所有以 **.mcfunction** 结尾的文件都将注册为游戏内可用的函数，可通过 `/function <函数名称>` 运行。
    - 支持嵌套函数，只需按函数包目录结构示例中的方式组织文件路径即可。

5. 在游戏中应用行为包并测试函数。修改函数文件后可通过执行 `/reload` 或重新登录来刷新改动。

:::tip 注意
函数具有版本依赖性，将运行在 `📄 manifest.json` 中声明的版本环境下：
- `min_engine_version` 1.19.50+ 将采用新版execute语法
- `min_engine_version` 1.19.70+ 需将aux值替换为方块状态
:::

## 执行方式

在游戏中输入 `/function 函数名称` 即可执行函数文件内的所有命令（同一游戏刻内完成）。例如嵌套函数 `BP/functions/lobby/items/1.mcfunction` 需使用路径 `/function lobby/items/1` 调用。

## tick.json

**tick.json** 是函数包中的特殊文件，用于指定服务器每游戏刻自动运行的函数（类似循环命令方块）。该文件位于 `BP/functions` 文件夹中，默认在主世界原点坐标 `0, 0, 0` 处执行。

::: code-group
```json [BP/functions/tick.json]
{
  "values": [
    "function_1",
    "function_2"
  ]
}
```
:::

> 注意：该文件中的函数会在世界初始化后立即运行（无论玩家是否加载完毕），使用不当可能导致意外行为。

## 示例函数包

<CardLink
  imgsrcLight="assets/images/commands/BClogo.png"
	title="下载示例函数包"
	link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/functions_sample.mcpack"
/>

## 函数排错指南

使用 `/function` 时若未出现命令建议，通常是由于函数中存在错误命令导致。

在创作者设置中启用[内容日志](/wiki/guide/troubleshooting#content-log)可查看函数包中的具体错误信息，包括错误所在函数、行号及语法问题。

每次加载世界或执行 `/reload` 后都会生成错误列表，可在屏幕上短暂查看或通过设置中的内容日志历史记录查阅。

![contentLogToggles](/assets/images/commands/contentLogToggles.png)

![contentLogHistory](/assets/images/commands/contentLogHistory.png)