---
title: 命令方块入门
category: 基础
mentions:
    - BedrockCommands
    - zheaEvyline
    - jordanparki7
nav_order: 1
tags:
    - info
---

# 命令方块入门

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[由 Bedrock Commands 社区 Discord 提供](https://discord.gg/SYstTYx5G5)

命令方块是 Minecraft 中的特殊方块。通过在聊天栏输入的指令（作弊命令）可以通过命令方块自动执行，无需重复输入即可复用。

只有拥有操作员权限的创造模式玩家才能放置或破坏命令方块。

## 获取方式

1. 打开世界设置
2. 在「作弊」选项下启用「激活作弊」
3. 在聊天栏输入 `/give @s command_block`

## 命令方块界面

![commandBlockUI](/assets/images/commands/commandBlockUI.png)

## 命令方块类型

![impulseCommandBlock](/assets/images/commands/impulseCommandBlock.png) **脉冲型** 在被激活时__单次__执行命令

![chainCommandBlock](/assets/images/commands/chainCommandBlock.png) **连锁型** 按顺序执行命令，即仅在前置方块执行后触发

![repeatingCommandBlock](/assets/images/commands/repeatingCommandBlock.png) **循环型** 每游戏刻执行一次命令（每秒约20刻）。可通过[下文](#命令方块刻延迟)介绍的延迟设置调整执行频率

## 命令方块条件

**条件制约型** 仅当连接的前置方块输出结果为`true`（成功）时执行命令
> 条件制约型方块在材质上会显示凹陷箭头标识：
> - ![pasteCommandButton](/assets/images/commands/impulseConditionalCommandBlock.png) 脉冲条件制约型
> - ![chainConditionalCommandBlock](/assets/images/commands/chainConditionalCommandBlock.png) 连锁条件制约型
> - ![repeatingConditionalCommandBlock](/assets/images/commands/repeatingConditionalCommandBlock.png) 循环条件制约型

**无条件型** 无论前置方块输出结果如何都会执行命令（包括`true`成功、`false`失败甚至语法错误）

## 命令方块红石状态

**需要红石** 必须通过红石信号激活（按钮、拉杆、红石火把等）

**保持开启** 关闭命令方块界面后立即持续激活

## 命令方块刻延迟

设置命令执行前的延迟时间。刻（Tick）是 Minecraft 的时间单位，现实1秒约等于20游戏刻。

:::tip
![gametick.png](/assets/images/commands/gametick.png)
:::

## 悬浮提示文本

可为命令方块添加悬浮备注，便于在多命令方块系统中快速识别。

当`commandblockoutput`游戏规则启用时，命令执行后会在聊天栏显示备注信息。
![hover_note](/assets/images/commands/hover_note.png)

## 粘贴按钮

![pasteCommandButton](/assets/images/commands/pasteCommandButton.png)

支持将剪贴板内容粘贴至命令输入框

## 命令输出管理

- 通过界面中的「上一个输出」按钮查看执行记录
- 命令方块中无需输入开头的`/`符号（输入也不会报错）
- 红石比较器可读取输出强度（成功时输出1-15信号）
- 在聊天栏测试命令：红色文字表示`false`或语法错误，白色表示`true`
- 也可通过实际效果判断命令是否成功
- 输出值`0`通常表示失败

### 禁用命令提示
在聊天栏输入：
- `/gamerule commandblockoutput false` 关闭命令方块提示
- `/gamerule sendcommandfeedback false` 关闭聊天指令反馈

## 命令方块布局技巧

搭建连锁系统时，确保箭头方向正确连接。箭头朝向可通过方块材质判断。

**✅ 正确布局**
![correctCommandBlockPlacement](/assets/images/commands/correctCommandBlockPlacement.png)

**❌ 错误布局**
![incorrectCommandBlockPlacement](/assets/images/commands/incorrectCommandBlockPlacement.png)

## 故障排除指南

- 检查世界设置中是否禁用命令方块
- 确保`maxcommandchainlength`游戏规则不为0
- 排除意外红石信号干扰（红石线、拉杆、火把等）
- 切换「需要红石」与「保持开启」模式
- 仔细检查方块类型、条件和命令语法，重新激活后查看输出
- 确保区块已加载（可使用[常加载区域](/wiki/commands/tickingarea)）

若仍无法解决，可尝试拆除并重新放置命令方块

## 学习要点

:::tip 学习要点：
- 游戏内获取命令方块的方法
- 各类命令方块的特性与外观识别
- 条件设置、红石状态与延迟配置
- 通过红石与聊天信息获取输出数据
- 正确排列命令方块链的技巧
- 常见故障解决方案
:::

实践建议：尝试制作简易的[实体计数器系统](/wiki/commands/entity-counter)
> 注意：常规命令链的首个方块应为![repeatingCommandBlock](/assets/images/commands/repeatingCommandBlock.png) **无条件保持开启**，后续使用![chainCommandBlock](/assets/images/commands/chainCommandBlock.png) **无条件保持开启**（默认0刻延迟）
> 
> ![commandBlockChain4](/assets/images/commands/commandBlockChain/4.png)

**（推荐延伸阅读）[选择器详解](/wiki/commands/selectors)**