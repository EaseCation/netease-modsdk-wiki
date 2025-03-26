---
title: 将Molang数据导入记分板
mentions:
    - SirLich
    - MedicalJewel105
    - shanewolf38
    - Luthorius
    - TheItsNameless
    - ThomasOrs
---

# 将Molang数据导入记分板

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

以下提供了一种将任意Molang（变量、查询等）即时转换为记分板数值的方法。请确保控制器`convert`状态中调用的动画名称与实体定义中的动画名称（animation.namespace.molang_to_score）完全匹配。

**注意：** 需要先在游戏中执行以下两条命令进行初始化：
`/scoreboard objectives add MoLang dummy`
`/scoreboard players set "#10" MoLang 10`

::: code-group
```json [BP/animation_controllers/molang_to_score.animation_controllers.json]
"controller.animation.namespace.molang_to_score": {
  "initial_state": "idle",
  "states": {
    "idle": {
      "transitions": [ { "convert": "<转换启动条件>" } ],
      "on_exit": [ 
        "/scoreboard players set @s MoLang 0",
        "/scoreboard players set \"#var\" MoLang 0",
        "v.convert = <需要转换的变量>;",
        "v.digit = 1000000000;"
      ]
    },
    "convert": {
      "animations": [
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score",
        "molang_to_score"
      ],
      "transitions": [ { "idle": "1" } ]
    }
  }
}
```
:::

::: code-group
```json [BP/animations/molang_to_score.animation.json]
"animation.namespace.molang_to_score": {
  "animation_length": 10.0,
  "anim_time_update": "t.digit = Math.mod(Math.floor(v.convert / v.digit), 10) + 0.1; v.digit = v.digit / 10; return t.digit;",
  "timeline": {
    "0.0": [ 
      "/scoreboard players operation @s MoLang *= \"#10\" MoLang",
      "/scoreboard players operation @s MoLang += \"#var\" MoLang",
      "/scoreboard players set \"#var\" MoLang 0"
    ],
    "1.0": [ "/scoreboard players set \"#var\" MoLang 1" ],
    "2.0": [ "/scoreboard players set \"#var\" MoLang 2" ],
    "3.0": [ "/scoreboard players set \"#var\" MoLang 3" ],
    "4.0": [ "/scoreboard players set \"#var\" MoLang 4" ],
    "5.0": [ "/scoreboard players set \"#var\" MoLang 5" ],
    "6.0": [ "/scoreboard players set \"#var\" MoLang 6" ],
    "7.0": [ "/scoreboard players set \"#var\" MoLang 7" ],
    "8.0": [ "/scoreboard players set \"#var\" MoLang 8" ],
    "9.0": [ "/scoreboard players set \"#var\" MoLang 9" ]
  }
}
```
:::

**实现原理：** 当转换启动时，控制器会重置玩家的MoLang分数和`#var`（虚拟玩家）的MoLang分数。转换变量`v.convert`被初始化，数字位变量`v.digit`被设置为获取第十位数字（10^10）。第一个动画运行时会根据当前位数设置动画时间，并将数字位变量调整为下一位（第9位，10^9）。由于时间轴索引会持续运行到设定时间，"0.0"时间点的事件总是会被触发。这会将玩家的MoLang分数乘以10来设置正确的位数，然后加上最后获取的数字（首次运行时由于控制器重置了`#var`，该值始终为0）。整个过程重复执行11次以获取转换变量的全部10位数字。需要注意的是每个动画处理的是前一个动画设置的数字位，因此需要运行11次动画。

**游戏内测试方法：** 将`<转换启动条件>`设为`q.is_using_item`，`<需要转换的变量>`设为`Math.random_integer(0, 9999)`。手持苹果开始食用，即可观察数值转换过程。