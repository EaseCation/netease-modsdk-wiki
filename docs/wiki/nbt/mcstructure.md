---
title: .mcstructure
category: 基础
mentions:
    - SirLich
    - MedicalJewel105
    - Misledwater79
    - SmokeyStack
---

[int]: /assets/images/nbt/int.png
[list]: /assets/images/nbt/list.png
[compound]: /assets/images/nbt/compound.png
[string]: /assets/images/nbt/string.png

# .mcstructure

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

### 保存与加载

**导出**按钮会在结构方块中创建`.mcstructure`文件。这些文件必须放置在行为包中，才能通过加载结构方块在游戏中载入。文件路径决定了结构标识符，该标识符需要输入到结构方块中以加载结构。

**示例：**
`BP/structures/house.mcstructure` → `mystructure:house`
`BP/structures/dungeon/entrance.mcstructure` → `dungeon:entrance`
`BP/structures/stuff/towers/diamond.mcstructure` → `stuff:towers/diamond`

第一个子文件夹定义命名空间，后续文件夹定义路径，最后以结构文件名结尾。

注意：直接放置在`structures`文件夹中的文件会被分配`mystructure`命名空间。如果`structures`文件夹中的结构与显式`mystructure`文件夹中的结构同名，游戏会产生以下内容日志警告：

```
[structure][warning]-在默认命名空间中加载结构时发生冲突。发现名称<name>的结构同时存在于根目录和mystructure目录。
```

这种情况下，`mystructure`文件夹中的文件会"胜出"，导致直接存放在`structures`文件夹中的文件被忽略。

### 文件格式

`mcstructure`文件是未压缩的[NBT文件](https://wiki.vg/NBT#Specification)。与所有基岩版NBT文件一样，它们以小端格式存储。标签结构如下：

::: code-group
```nbt [结构文件]
> ![整数][int] `format_version`: 当前固定为`1`。
>
> ![列表][list] `size`: 包含三个整数的列表，描述结构边界尺寸。
>
> > ![整数][int] X轴方向尺寸
> >
> > ![整数][int] Y轴方向尺寸
> >
> > ![整数][int] Z轴方向尺寸
>
> ![复合标签][compound] `structure`: 实际数据结构
>
> > ![列表][list] `block_indices`: 包含两个子列表（分别对应两个层级）。这些列表包含结构中的方块索引，每个索引指向调色板（见下文）。按ZYX顺序从最低角到最高角排列。例如，结构尺寸为`[2,3,4]`时，每个层级列表中的24个值（各维度乘积）代表位于`[(0,0,0), (0,0,1)...(1,2,3)]`的相对坐标。`-1`表示无方块，加载时保留原有方块（结构空位保存时会生成此值，第二层级大部分方块为此情况）。两个层级共享同一调色板。
> >
> > > ![列表][list] of ![整数][int] 主层级方块索引
> > >
> > > ![列表][list] of ![整数][int] 次层级方块索引（通常为空，仅在含水方块时存在）
> >
> > ![列表][list] of ![复合标签][compound] `entities`: 实体NBT数据，存储方式与存档文件中的实体完全相同。`Pos`、`UniqueID`等标签会被保存，但加载时会被替换。
> >
> > ![复合标签][compound] `palette`: 包含多个命名调色板（理论上支持同一结构的多个变体）。目前仅`default`会被保存和加载。
> >
> > > ![复合标签][compound] 单个调色板（当前仅`default`）
> > >
> > > > ![列表][list] `block_palette`: 方块状态列表。该列表包含方块索引引用的有序条目。
> > > >
> > > > > ![复合标签][compound] 单个方块状态
> > > > >
> > > > > > ![字符串][string] `name`: 方块ID（如`minecraft:planks`）
> > > > > > ![复合标签][compound] `states`: 方块状态键值对（例如`wood_type:"acacia"`, `bite_counter:3`, `open_bit:1b`）。值类型与状态匹配：枚举值用字符串，数值用整数，布尔值用字节。
> > > > > > ![整数][int] `version`: 方块兼容版本号（当前版本为`17959425`，对应1.19）
> > > >
> > > > ![复合标签][compound] `block_position_data`: 包含结构中单个方块的附加数据。键为`block_indices`展开列表中的整数索引（层级无关）。
> > > >
> > > > > ![复合标签][compound] `<index>`: 应用于指定索引方块的附加数据
> > > > >
> > > > > > ![复合标签][compound] `block_entity_data`: 方块实体NBT数据，存储方式与存档文件中的方块实体相同。位置标签会被保存，但加载时替换。目前未发现其他相关对象。
>
> ![列表][list] `structure_world_origin`: 包含三个整数的列表，描述结构在存档中的原始保存位置。等于保存结构方块的位置加上偏移设置。用于确定加载时实体的放置位置。实体新绝对位置等于旧位置减去该值，再加上结构加载位置的原点。
>
> > ![整数][int] 结构原点X坐标
> > ![整数][int] 结构原点Y坐标
> > ![整数][int] 结构原点Z坐标
```

### 特殊情况测试

修改结构文件后的加载测试结果：

-   当`size`中的维度超过原版保存限制`64*256*64`时，结构仍能正常加载
-   当方块层级列表中的值不是整数标签时，所有值会被视为`0`
-   当方块层级列表中的值等于或大于调色板尺寸，或小于`-1`时，会放置空气方块
-   当`default`调色板不存在时，加载结构不会放置任何方块
-   当任何固定名称的标签缺失或类型错误时，结构加载失败并产生以下日志错误：

```
[Structure][error]-从行为包加载结构'<identifier>`: '<path>' | 结构中缺少必要字段"<tag>"
```

-   当`block_indices`不包含正好两个值时，结构加载失败：

```
[Structure][error]-从行为包加载结构'<identifier>`: '<path>' | "block_indices"字段应为包含2个数组的数组，当前检测到<count>个数组
```

-   当`block_indices`中的值不是列表标签时：

```
[Structure][error]-从行为包加载结构'<identifier>`: '<path>' | "block_indices"字段的第一个数组缺失或不是列表
```

-   当`block_indices`两个列表长度不相等时：

```
[Structure][error]-从行为包加载结构'<identifier>`: '<path>' | "block_indices"字段的两个数组必须长度相同
```

-   当`block_indices`列表长度与结构尺寸乘积不符时：

```
[Structure][error]-从行为包加载结构'<identifier>`: '<path>' | "block_indices"字段元素数量应与"size"字段定义的数量一致
```

## NBT编辑器

NBT编辑器下载链接请访问[此处](/wiki/meta/useful-links#software-installed)。

---

[原始文档来源](https://gist.github.com/tryashtar/87ad9654305e5df686acab05cc4b6205)