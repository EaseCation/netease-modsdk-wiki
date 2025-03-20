---
title: 选择器详解
category: 基础
mentions:
    - Science-geek42
    - Brougud
    - MedicalJewel105
    - SmokeyStack
    - Sprunkles137
    - Hatchibombotar
---

# 选择器详解

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

目标选择器用于在命令中动态指定执行对象，无需明确设置目标（例如玩家名称）。选择器由选择器变量和可选的选择器参数组成。

## 选择器变量

选择器变量定义了基本的实体筛选范围。共有六种选择器变量可选：
-   `@a` - 选择所有玩家
-   `@p` - 选择最近的玩家
-   `@r` - 随机选择玩家
-   `@e` - 选择所有实体
-   `@s` - 选择命令执行者自身
-   `@initiator` - 选择与NPC交互的玩家

## 选择器参数

选择器参数可进一步缩小候选目标范围。使用参数时需先指定选择器变量，并在其后添加方括号`[]`，例如：`kill @e[]`。多个参数之间用逗号分隔。

### Type（类型）
根据实体标识符筛选目标。否定参数将排除指定类型的实体。由于每个实体只能有一个标识符，除非使用否定参数，否则该参数不可重复。可与`@r`选择器配合进行随机筛选。

-   `type=<标识符>`——仅包含指定类型的实体
-   `type=!<标识符>`——排除指定类型的实体

示例：

对所有猪施加漂浮效果：
::: code-group
```json [pig]
/effect @e[type=pig] levitation
```

清除所有非箭矢和非雪球的实体：
```json [non-arrow/snowball]
/kill @e[type=!arrow,type=!snowball]
```
:::

### Count（数量）
根据排序规则限制选中实体数量。

`@a`、`@p`和`@e`按距离升序排列，`@r`随机排列。`@p`和`@r`默认值为1。否定参数将反转排序方向（随机排序不可否定）。

-   `c=<数量>`——选择最多`<数量>`个实体

示例：

清除最近五名玩家背包中的石头：
::: code-group
```json [5 players]
/clear @a[c=5] stone
```

对最远的两只骷髅造成伤害：
```json [skeletons]
/damage @e[type=skeleton,c=-2] 2
```
:::

### Position（位置）
设定选择器的搜索起点，同时影响距离和体积参数的判定基准。未定义时默认使用命令执行位置。

可使用[相对坐标](/wiki/commands/relative-coordinates#相对坐标)来设置偏移量。

-   `x=<值>`, `y=<值>`, `z=<值>`——定义选择器的基准坐标

示例：

将(140,64,-200)处最近的玩家向上传送10格：
::: code-group
```json [teleport]
/teleport @p[x=140, y=64, z=-200] ~ ~10 ~
```
:::

### Distance（距离）
根据实体脚部的球面距离筛选目标。

-   `rm=<值>`和`r=<值>`——分别设置最小和最大距离（包含边界值）

示例：

清除2到6格范围内的所有鸡：
::: code-group
```json [chicken]
/kill @e[type=chicken, rm=2, r=6]
```

在(0,100,0)1格范围内所有玩家的手持物品附魔锋利：
```json [enchant]
/enchant @a[x=0, y=100, z=0, r=1] sharpness
```
:::

### Volume（体积）
筛选位于方块坐标系对齐的立方体内的实体。三个参数分别定义各轴长度，未定义参数默认为0。以实体脚部为判定点。

体积计算公式：`dx = x2 - x1; dy = y2 - y1; dz = z2 - z1`

-   `dx=<值>`, `dy=<值>`, `dz=<值>`——定义立方体区域

示例：

列出12x30x2区域内的所有实体：
::: code-group
```json [say]
/say @e[dx=12, dz=30, dy=2]
```

为(-400,0,-350)到(-150,256,50)区域内的玩家添加"lobby"标签：
```json [tag]
/tag @a[x=-400, y=0, z=-350, dx=250, dy=256, dz=400] add lobby
```
:::

### Scores（计分板）
根据计分板分数筛选目标。参数格式为对象，包含计分项与数值的键值对。数值可使用范围语法。否定参数将排除分数范围内的实体。

-   `scores={<计分项>=<数值>}`——筛选符合分数条件的实体

范围语法说明：
-   `N..`：大于等于N的数值
-   `..N`：小于等于N的数值
-   `N..M`：介于N到M之间的数值（包含边界）

示例：

将"points"分数为10的玩家分数重置为0：
::: code-group
```json [points]
/scoreboard players set @p[scores={points=10}] points 0
```

为同时满足"started=1"且"timer≤20"的盔甲架添加"start"标签：
```json [armor_stand]
/tag @e[type=armor_stand, scores={started=1, timer=..20}] add start
```
:::

### Name（名称）
根据实体名称筛选目标。否定参数将排除指定名称的实体。

-   `name=<名称>`——仅包含指定名称的实体
-   `name=!<名称>`——排除指定名称的实体

示例：

列出所有名为Shadow的僵尸：
::: code-group
```json [zombie]
/say @e[type=zombie, name=Shadow]
```

给非Steve和非Alex的玩家提升1级：
```json [xp]
/xp 1L @a[name=!Steve, name=!Alex]
```
:::

### Tag（标签）
根据实体标签筛选目标。可重复使用多个标签参数，所有条件需同时满足。否定参数将排除具有指定标签的实体。

-   `tag=<标签>`——仅包含具有指定标签的实体
-   `tag=!<标签>`——排除具有指定标签的实体

示例：

清除所有带"marked"标签且无"exempt"标签的生物：
::: code-group
```json [marked]
/kill @e[tag=marked, tag=!exempt]
```
:::

### Family（族群）
根据实体族群类型筛选目标。可重复使用多个族群参数，所有条件需同时满足。否定参数将排除指定族群的实体。

-   `family=<族群>`——仅包含指定族群的实体
-   `family=!<族群>`——排除指定族群的实体

示例：

对"monster"族群的所有实体施加再生效果：
::: code-group
```json [monster]
/effect @e[family=monster] regeneration
```
:::

### Rotation（旋转角度）
根据实体视角筛选目标。分为垂直视角（x轴旋转，范围-90~90）和水平视角（y轴旋转，范围-180~180）。

-   `rxm=<值>`和`rx=<值>`——垂直视角范围
-   `rym=<值>`和`ry=<值>`——水平视角范围

示例：

对仰角≥0度（平视或俯视）的玩家施加1秒失明：
::: code-group
```json [blindness]
/effect @a[rx=0] blindness 1
```

对朝南方向（-45°~45°）的玩家造成伤害：
```json [damage]
/damage @a[rym=-45, ry=45] 1
```
:::

### Level（经验等级）
根据玩家经验等级筛选目标（仅限玩家）。

-   `lm=<数值>`和`l=<数值>`——分别设置最低和最高等级（包含边界）

示例：

给3-8级的玩家发放钻石：
::: code-group
```json [diamond]
/give @a[lm=3, l=8] diamond
```
:::

### Game mode（游戏模式）
根据游戏模式筛选玩家目标。否定参数将排除指定模式的玩家。

-   `m=<模式>`——筛选指定游戏模式

可用模式值：
*   `0`、`s`或`survival`：生存模式
*   `1`、`c`或`creative`：创造模式
*   `2`、`a`或`adventure`：冒险模式
*   `spectator`：旁观模式
*   `d`或`default`：默认模式

示例：

列出所有创造模式玩家：
::: code-group
```json [creative]
/say @a[m=creative]
```

将非生存和非冒险模式的玩家设为创造模式：
```json [gamemode]
/gamemode creative @a[m=!survival, m=!adventure]
```
:::

### Items（物品）
根据物品栏内容筛选目标。参数格式为对象或对象数组，支持以下参数：

-   `item=<字符串>`——物品标识符（必填）
-   `quantity=<整数>`——物品数量（支持范围语法，可否定）
-   `data=<整数>`——物品数据值（默认-1，**当前不可用**：[MCPE-151920](https://bugs.mojang.com/browse/MCPE-151920))
-   `location=<字符串>`——物品所在栏位（与`/replaceitem`的slotType参数一致）
-   `slot=<整数>`——栏位索引（需配合location使用，支持范围语法，可否定）

示例：

检测携带下界合金剑的玩家：
::: code-group
```json [netherite_sword]
/testfor @a[hasitem={item=netherite_sword}]
```

清除拥有≥4个苹果的玩家2个苹果：
```json [apple]
/clear @a[hasitem={item=apple,quantity=4..}] apple 2
```

检测携带2钻石+2木棍的玩家：
```json [multiple]
/testfor @a[hasitem=[{item=diamond,quantity=2},{item=stick,quantity=2}]]
```

检测未携带木棍的玩家：
```json [negation]
/testfor @a[hasitem=[{item=stick,quantity=0}]
```
:::