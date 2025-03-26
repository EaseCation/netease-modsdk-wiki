---
title: 重生命令
tags:
    - recipe
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - BlueFrog130
    - SmokeyStack
    - MedicalJewel105
    - cda94581
---

# 重生命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

<BButton color="blue" link="animation-controllers-intro">了解更多关于动画控制器的信息</BButton>

这个动画控制器可用于在玩家重生时执行命令，例如重新添加药水效果或给予物品。

只需将动画控制器添加到 `player.json` 中，并

::: code-group
```json [原CodeHeader的值]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.death": {
			"initial_state": "initialization",
			"states": {
				"initialization": {
					"transitions": [
						{
							"has_died": "!q.is_alive"
						}
					],
					"on_exit": [
						"v.delay = 0.2 + q.life_time;",
						"/<死亡命令或动画>"
					]
				},
				"has_died": {
					"on_exit": ["/<重生命令或动画>"],
					"transitions": [
						{
							"initialization": "q.is_alive && (q.life_time >= v.delay)"
						}
					]
				}
			}
		}
	}
}
```
:::

该控制器包含两个状态：
1. **初始化状态**：当玩家死亡时设置延迟计时器（`v.delay = 0.2 + q.life_time`）
2. **死亡状态**：在延迟计时结束后触发重生命令

参数说明：
- `q.life_time`：玩家处于死亡状态的时间（秒）
- `v.delay`：自定义延迟时间（默认增加0.2秒容差）
- `/<>`：需要替换为实际执行的命令或动画

提示：可通过调整`v.delay`的公式来精确控制重生命令的触发时机。