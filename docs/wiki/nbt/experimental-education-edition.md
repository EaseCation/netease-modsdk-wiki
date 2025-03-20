---
title: 教育版中的实验性功能
category: 巧思案例
mentions:
    - Fabrimat
    - TheItsNameless
tags:
    - 简单
    - 最后更新于版本1.18.32（教育版）
---

# 教育版中的实验性功能

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

[structure]: /assets/images/nbt/structure.png
[int]: /assets/images/nbt/int.png
[list]: /assets/images/nbt/list.png
[compound]: /assets/images/nbt/compound.png
[string]: /assets/images/nbt/string.png
[byte]: /assets/images/nbt/byte.png

教育版是基于基岩版的一个特殊版本，具有不同的功能特性与使用限制。
出于安全考虑，该版本不允许在游戏中直接启用实验性功能。

## 编辑NBT数据

::: warning
在编辑NBT文件前请务必备份存档！

实验性功能可能无法兼容所有设备，并可能导致您的世界出现异常行为。
:::

1. 从.mcworld、.mctemplate或com.mojang世界文件夹中提取level.dat文件
2. 使用NBT编辑器（例如NBT Studio）打开该文件
3. 选中根节点（显示为![][structure] level.dat）
4. 新建一个名为![][compound] experiments的复合标签
5. 选中该节点并新建一个![][byte]字节类型值，名称填写需要启用的功能名称，数值设为1。在1.18.32版本中可用的功能包括：
    - data_driven_biomes
    - data_driven_items
    - experimental_molang_features
    - gametest
    - spectator_mode
    - upcoming_creator_features
    - vanilla_experiments
    - wild_update

![](/assets/images/nbt/experiments-education-edition/byte-add.png)

![](/assets/images/nbt/experiments-education-edition/experiments-file.png)

最后保存文件并放回原世界文件包或目录中。

## 使用建议
教育版通常会比标准基岩版落后一到两个版本，这意味着您可以提前知晓哪些实验性功能将被加入正式版，哪些可能被修改或移除。
如果需要在教学环境中使用这些世界，建议仅启用那些长期稳定的功能。

::: code-group
```json [示例配置]
{
  "experiments": {
    "data_driven_biomes": 1b,
    "vanilla_experiments": 1b
  }
}
```
:::