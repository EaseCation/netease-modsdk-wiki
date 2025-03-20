---
title: 下载示例包
category: 扩展内容
description: 下载示例包的参考指南
prefix: 'b. '
nav_order: 2
show_toc: false
mentions:
    - SirLich
    - Joelant05
    - Dreamedc2015
    - sermah
    - SmokeyStack
    - MedicalJewel105
    - Luthorius
    - TheDoctor15
    - TheItsNameless
---

# 下载示例包

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
这是附录页面。你可以从[这里](/wiki/guide/index)重新开始本指南。
:::

为了获得最佳学习效果，建议始终先自行尝试完成教程中的所有练习！如果遇到实在无法解决的问题，示例包将为你提供有价值的参考材料。

下载地址：

<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/legacy_guide.mcaddon"
    color=gray
>下载附加包</BButton>

安装时，只需将行为包解压到Minecraft的以下目录：`com.mojang\development_behavior_packs` 或 `com.mojang\development_*_packs`（具体路径取决于你下载的包类型）。

::: code-group
```text [安装说明]
// 注意：此处路径根据实际安装平台可能有所不同
// Windows 10/11 默认路径：
%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
```
:::

注意事项：
1. 确保已启用"测试版 API" 功能
2. 首次安装后需要重启游戏
3. 在创建世界时选择对应的行为包/资源包
4. 示例包包含完整的组件（Component）和实体（Entity）实现参考