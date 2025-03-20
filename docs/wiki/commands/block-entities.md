---
title: MBE - Max的方块实体
category: 技术
mention:
    - BedrockCommands
    - zheaEvyline
tags:
    - 系统
---

# MBE - Max的方块实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

[源自Bedrock Commands社区Discord](https://discord.gg/SYstTYx5G5)

此方法由Reddit用户[u/Maxed_Out10](https://www.reddit.com/user/Maxed_Out10/)开发，通过使用盔甲架和连续的`/playanimation`命令，可以近乎完美地复刻Minecraft中任意方块的实体形态。

为保留原创者荣誉，社区将此方法命名为"Max's Block Entity"（简称MBE）。

### 注意事项

1. 每个方块实体需使用1个盔甲架，过多盔甲架（如同其他实体）可能导致服务器卡顿
2. 玩家仍可穿过未加限制的MBE实体并进行交互
3. 方块实体的实际碰撞箱会与视觉位置存在细微偏移

## 视频演示

<YouTubeEmbed
    id="kb8rz9ItE_M"
/>

## 设置步骤

*在聊天栏输入：*
1. `/summon armor_stand Grumm`
    - 必须命名为'Grumm'以避免纹理倒置
2. `/execute as @e [type= armor_stand, name=Grumm, c=1] at @s run tp @s ~~~ 260`
    - 用于将MBE对齐标准方块网格
ㅤ
:::tip
- 潜行并右键点击（手机版长按）盔甲架6次进入Pose 7
    - 此操作可替代系统中的第二条命令
    - **仅在需要精简系统命令时使用**
:::

## 系统命令

> 注意：建议添加100-200 Tick的延迟

::: code-group
```yaml [mcfunction]
/effect @e [type= armor_stand, name=Grumm] invisibility 999999 1 true
/playanimation @e [type= armor_stand, name=Grumm] animation.armor_stand.entertain_pose null 0 "0" align.arms
/playanimation @e [type= armor_stand, name=Grumm] animation.player.move.arms.zombie null 0 "0" size.mini_block
/playanimation @e [type= armor_stand, name=Grumm] animation.ghast.scale null 0 "0" size.full_block
/playanimation @e [type= armor_stand, name=Grumm] animation.fireworks_rocket.move null 0 "0" align.full_block
/execute as @e [type= armor_stand, name=Grumm] at @s run tp ~~~
```
:::

![commandBlockChain6](/assets/images/commands/commandBlockChain/6.png)

### 命令功能解析
1. 隐藏盔甲架本体
2. 自动设置盔甲架为Pose 7（手臂对齐），手动设置时可跳过
3. __必要命令__ 调整为迷你方块尺寸
4. *可选命令* 调整为完整方块尺寸
5. *可选命令* 对齐完整方块尺寸
    - 若不需要完整方块尺寸可跳过4、5
6. 锁定位置防止下方方块被破坏时坠落

## 旋转与对齐

> 注意：以下旋转命令应通过命令方块单次执行

<Spoiler title="完整方块MBE">

```yaml
# 朝北
/tp @e [type=armor_stand, name=Grumm, c=1] ~-1.1245 ~0.2260 ~-0.097 81

# 朝南
/tp @e [type=armor_stand, name=Grumm, c=1] ~1.1245 ~0.2260 ~0.097 260

# 朝东
/tp @e [type=armor_stand, name=Grumm, c=1] ~0.097 ~0.2260 ~-1.1245 171

# 朝西
/tp @e [type=armor_stand, name=Grumm, c=1] ~-0.097 ~0.2260 ~1.1245 350
```

</Spoiler>

<Spoiler title="迷你方块MBE">

```yaml
# 朝北
/tp @e [type=armor_stand, name=Grumm, c=1] ~-0.417~-0.5 ~-0.035 81

# 朝南
/tp @e [type=armor_stand, name=Grumm, c=1] ~0.417 ~-0.5 ~0.035 260

# 朝东
/tp @e [type=armor_stand, name=Grumm, c=1] ~0.035 ~-0.5 ~-0.417 171

# 朝西
/tp @e [type=armor_stand, name=Grumm, c=1] ~-0.035 ~-0.5 ~0.417 350
```

</Spoiler>

<Spoiler title="阶梯MBE">

```yaml
# 朝北
/tp @e [type=armor_stand, name=Grumm, c=1] ~-0.097 ~0.2325 ~1.1245 350

# 朝南
/tp @e [type=armor_stand, name=Grumm, c=1] ~0.097 ~0.2325 ~-1.1245 171

# 朝东
/tp @e [type=armor_stand, name=Grumm, c=1] ~-1.1245 ~0.2325 ~-0.097 81

# 朝西
/tp @e [type=armor_stand, name=Grumm, c=1] ~1.1245 ~0.2325 ~0.097 260
```

</Spoiler>

<Spoiler title="下半砖MBE">

```yaml
# 朝北
/tp @e [type=armor_stand, name=Grumm, c=1] ~-0.097 ~0.2325 ~1.1245 350

# 朝南
/tp @e [type=armor_stand, name=Grumm, c=1] ~0.097 ~0.2325 ~-1.1245 171

# 朝东
/tp @e [type=armor_stand, name=Grumm, c=1] ~-1.1245 ~0.2325 ~-0.097 81

# 朝西
/tp @e [type=armor_stand, name=Grumm, c=1] ~1.1245 ~0.2325 ~0.097 260
```

</Spoiler>

<Spoiler title="上半砖MBE">

```yaml
# 朝北
/tp @e [type=armor_stand, name=Grumm, c=1] ~-1.1245 ~0.484 ~-0.097 81

# 朝南
/tp @e [type=armor_stand, name=Grumm, c=1] ~1.1245 ~0.484 ~0.097 260

# 朝东
/tp @e [type=armor_stand, name=Grumm, c=1] ~0.097 ~0.484 ~-1.1245 171

# 朝西
/tp @e [type=armor_stand, name=Grumm, c=1] ~-0.097 ~0.484 ~1.1245 350
```

</Spoiler>

## 保存与加载MBE

1. 保存命令：
    - `/execute as @e [type=armor_stand, name=Grumm, c=1] at @s run structure save MBE ~~~ ~~~`

2. 加载命令：
    - `/structure load MBE <坐标>`

> 注意：结构名称`MBE`可根据需要更改