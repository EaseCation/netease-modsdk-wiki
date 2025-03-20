---
title: 进阶manifest配置
category: 扩展内容
description: 如何操作清单文件 - 更详细的指南 [施工中]
nav_order: 4
prefix: 'd.'
mentions:
    - MRBBATES1
    - Luthorius
    - SirLich
    - smell-of-curry
    - MedicalJewel105
    - QuazChick
---

# 进阶 manifest 配置

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
本页为附录章节。您可以从[这里](/wiki/guide/index)开始完整阅读指南。
:::

本文旨在深入解析 manifest.json 文件，我们将详细讲解UUID的定义及添加方式，阐述依赖项的使用方法，不同格式版本的区别，以及如何包含元数据。

同时我们也会比较行为包、资源包和皮肤包之间的版本差异。

## UUID详解

UUID是通用唯一识别码（Universal Unique Identifier）的缩写，共有5个官方版本和1个常见非官方版本。UUID是由数字、字母和连字符组成的36位字符串。

Minecraft使用完全随机生成的版本4变体1。这是构成您资源包在游戏中唯一身份标识的核心要素。

### 如何生成正确的UUID

您可以使用在线工具如[UUID生成器](https://www.uuidgenerator.net/version4/)和[UUID工具](https://www.uuidtools.com/generate/v4)来生成符合Minecraft要求的正确版本。

##

### UUID常见问题

-   **UUID是否区分大小写？**

    -   _不区分，UUID使用16进制表示（包含数字0-9和字母a-f），大小写字母在系统中被视为等同。_

-   **能否在文件头和模块中使用相同UUID？**
    -   _不可行，文件头UUID与模块UUID必须使用不同标识符。_

:::warning
本页面内容尚在完善中！
:::