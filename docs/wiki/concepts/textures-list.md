---
title: textures_list.json
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - AFoxyToast
    - TheItsNameless
---

# textures_list.json

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 概述

`textures_list` 文件是 Minecraft 用来*缓存*所有纹理的机制，相比从纹理文件夹中逐张查找，这种方式能更快地检索纹理。当您拥有大量纹理时这一点尤为重要，因为 Minecraft 可能会因纹理过多而出现错误交换纹理甚至无法加载的情况。如果您未在文件中列出纹理，Minecraft 通常会在内容日志中抛出_警告_。纹理数量较少时可以忽略该警告，但仍建议您将所有纹理列入清单。

## 可使用的纹理类型

所有纹理！最佳实践表明，任何纹理都可以且_应该_被列入 textures_list.json 文件中以优化性能。

## 文件结构

结构非常简单。该文件位于 `RP/textures` 目录下，命名为 `textures_list.json`。文件包含您需要缓存的所有纹理文件路径：

::: code-group
```json [RP/textures/textures_list.json]
[
	"textures/blocks/foo",
	"textures/blocks/bar",

	"textures/items/foo",
	"textures/items/bar",

	"textures/models/foo",
	"textures/models/bar",

	"textures/entity/foo",
	"textures/entity/bar"
]
```
:::

## 自动化处理

当您需要处理大量纹理时，手动列出所有纹理路径显然非常繁琐。此时可以使用集成强大过滤器的 [Regolith](https://bedrock-oss.github.io/regolith/) 工具来实现自动化处理。