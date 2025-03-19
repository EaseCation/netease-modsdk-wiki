---
title: 实体计时器
category: 教程
tags:
    - 中级
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
    - aexer0e
    - Justash01
    - TheItsNameless
    - zheaEvyline
---

# 实体计时器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

基于时间的交互是地图制作的超实用工具。本文旨在提供一份详尽的指南，详解多种创建计时器的方法。为方便阅读，本页将分为两大部分：组件计时器和动画计时器。每种方式都有其独特优劣，我们将在对应章节详细探讨。

你可能也会对[计分板计时器](/commands/scoreboard-timers)感兴趣。

## 基于组件的计时器

组件计时器通过行为包的`entity.json`文件实现。其最大优点是实体重载时仍能保持计时状态，但受限于可用的计时组件数量（重复组件会互相覆盖，意味着无法通过`minecraft:timer`组件创建多个独立计时器）。

### minecraft:timer组件

这是最简单却最高效的延时触发事件组件。[minecraft:timer](https://bedrock.dev/docs/1.14.0.0/1.14.30.2/Entities#minecraft:timer)提供三种主要时间设定方式：

- **精确计时**：固定时间后触发事件（例如3.4秒）
- **随机区间**：在指定时间区间内随机触发（例如3到5秒之间）
- **权重随机选择**：定义多组时间选项配比权重，随机选择其中一个时间触发（例如20%概率5秒触发，80%概率20秒触发）

在官方行为包中，该组件被广泛应用。例如：

- 海豚在陆地超过20秒后会脱水
- 蜜蜂在蜇人后10-60秒随机死亡
- 流浪商人停留时间为2400秒或3600秒

基础示例（5.6秒后触发事件）：

::: code-group
```json [实体组件]
"minecraft:timer": {
  "time": 5.6,
  "time_down_event": {
      "event": "wiki:my_event"
  }
}
```
:::

进阶示例（使用权重系统随机延时触发）：

::: code-group
```json [实体组件]
"minecraft:timer": {
  "looping": false, //true表示循环执行，false表示仅执行一次
  "random_time_choices": [
    {"weight":25, "value":0.5}, //0.5秒延时
    {"weight":25, "value":10},  //10秒延时
    {"weight":25, "value":30},  //30秒延时
    {"weight":25, "value":120}  //2分钟延时
  ],
  "time_down_event": {
    "event": "wiki:event",
    "target": "self"
  }
}
```
:::

高效利用技巧：通过循环触发`minecraft:timer`，配合事件中的`randomize`参数实现多样效果。这里通过权重控制事件触发频率：

::: code-group
```json [事件配置]
"wiki:do_event": {
  "randomize": [
    {
      "weight": 1, //1/56概率触发稀有事件
      "add": {"component_groups":["wiki:my_event"]}
    },
    {
      "weight": 5, //5/56概率触发常见事件
      "add": {"component_groups":["wiki:my_more_frequent_event"]}
    },
    {
      "weight": 50 //50/56概率无事件触发
    }
  ]
}
```
:::

### minecraft:environment_sensor组件

当结合`hourly_clock_time`或`clock_time`筛选器时，[minecraft:environment_sensor](https://bedrock.dev/docs/stable/Entities#minecraft:environment_sensor)可用于游戏内时间触发事件。

示例（每日开始800tick后触发事件）：

::: code-group
```json [实体组件]
"minecraft:environment_sensor": {
  "triggers": [{
    "filters": {
      "test": "hourly_clock_time",
      "operator": "=",
      "value": 800
    },
    "event": "wiki:my_daily_event"
  }]
}
```
:::

### minecraft:ageable组件

当行为包未占用[miinecraft:ageable](https://bedrock.dev/docs/stable/Entities#minecraft:ageable)时，可配合`minecraft:is_baby`组件实现计时功能。

示例（4秒后触发事件）：

::: code-group
```json [实体组件]
"minecraft:is_baby": {},
"minecraft:ageable": {
  "duration": 4,
  "grow_up": {
    "event": "wiki:my_other_event",
    "target": "self"
  }
}
```
:::

### 其他计时组件思路

查阅文档可发现更多具有"time_down_event"或"duration"参数的潜在组件，例如：

- `minecraft:angry`（需要攻击目标，时间限定整数）
- `minecraft.behavior.hide`
- `minecraft:behavior.celebrate`

## 基于动画的计时器

行为包动画是实现定时事件的强力工具。其优势在于理论上可创造无限计时器，但存在重载实体时重置的局限（玩家退出世界或区块卸载后重新加载会重置计时器）。

动画在行为包中的运作方式与资源包不同，建议通过官方文档或wiki其他页面了解基本机制。

### 基础动画计时

通过动画控制器或直接执行时间线指令，可以实现精确时序触发：

::: code-group
```json [动画定义]
{
	"format_version": "1.8.0",
	"animations": {
		"animation.command.example_timeline": {
			"timeline": {
				"0.0": "/say 立即触发",
				"3.0": "/say 3秒后触发"
			},
			"animation_length": 3.1
		},
		"animation.command.example_timeline_2": {
			"timeline": {
				"100": "/say 100秒后触发",
				"0.0": [
					"/say 同时触发多个指令",
					"/say 通过时间线组实现"
				],
				"55.55": "/say 55.55秒后触发"
			},
			"animation_length": 100.1
		}
	}
}
```
:::

### 随机间隔实现

通过动画控制器模拟`minecraft:timer`的随机区间功能。示例：实体被剪毛后2-7秒随机触发事件。

::: code-group
```json [动画控制器]
"controller.animation.shanewolf.random_interval": {
  "initial_state": "inactive",
  "states": {
    "inactive": {
      "transitions": [{"active": "q.is_sheared"}]
    },
    "active": {
      "on_entry": [
        "v.random_interval = math.random(2, 7);",
        "/say 随机计时开始"
      ],
      "animations": ["wiki:animate_interval"],
      "transitions": [{
        "inactive": "q.anim_time >= v.random_interval"
      }],
      "on_exit": [
        "@s wiki:stop_random_interval",
        "/say 随机计时结束"
      ]
    }
  }
}
```
:::

::: code-group
```json [动画定义]
"animation.shanewolf.random_interval": {
  "animation_length": 100
}
```
:::

实现逻辑：进入激活状态时生成2-7秒随机数变量，动画播放时间超过变量值时退出状态。

注意事项：
- 动画总时长需大于最大可能值
- 使用`math.floor(math.random(a, b.99))`可生成整数结果
- 收尾指令写入on_exit事件

### 权重选择实现

通过动画控制器模拟权重时间选择功能。示例：带电实体30%概率2秒、60%概率5秒、10%概率9秒触发事件。

::: code-group
```json [动画控制器]
"controller.animation.shanewolf.random_choices": {
  "initial_state": "inactive",
  "states": {
    "inactive": {
      "transitions": [{"active": "q.is_powered"}]
    },
    "active": {
      "on_entry": [
        "v.random_choices = math.random(0, 100);",
        "/say 随机选择开始"
      ],
      "animations": ["wiki:animate_choices"],
      "transitions": [
        {"inactive": "q.anim_time >= 2.0 && v.random_choices < 30"},
        {"inactive": "q.anim_time >= 5.0 && v.random_choices < 90"},
        {"inactive": "q.anim_time >= 9.0 && v.random_choices <= 100"}
      ],
      "on_exit": [
        "@s wiki:stop_random_choices",
        "/say 随机选择结束"
      ]
    }
  }
}
```
:::

实现逻辑：生成0-100随机数变量，通过多个状态切换条件实现权重分段检查。

注意事项：
- 时间段需从小到大排列
- 通过权重累加值划分概率区间
- 按规范处理收尾事件

希望本指南能帮助你更好地掌握基岩版的时间管理技巧！如果你有其他巧妙的时间事件实现方法，欢迎[参与wiki编辑](/contribute)！