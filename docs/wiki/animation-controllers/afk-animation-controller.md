---
title: AFK检测器
tags:
    - 配方
mentions:
    - SirLich
    - BlueFrog130
    - SmokeyStack
    - Keyyard
    - Ultr4Anubis
---

# AFK检测器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

### AFK检测动画控制器

<BButton color="blue" link="animation-controllers-intro">了解更多动画控制器知识</BButton>

这是一个用于检测挂机玩家的示例实现。

::: code-group
```json [BP/animation_controllers/afk.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.player.afk": {
			"states": {
				"default": {
					"transitions": [
						{
							"stands_still": "!q.is_moving"
						}
					]
				},
				"stands_still": {
					"on_entry": [
							"v.afk = q.life_time;"
					],
					"transitions": [
						{
							"afk": "(q.life_time - v.afk) >= 30 && !q.is_moving"
						},
						{
							"default": "q.is_moving"
						}
					]
				},
				"afk": {
					"on_entry": ["/tag @s add AFK", "/say 我现在处于挂机状态"],
					"animations": ["afk_animation"],
					"transitions": [
						{
							"default": "q.is_moving"
						}
					],
					"on_exit": ["/tag @s remove AFK", "/say 我已结束挂机状态"]
				}
			}
		}
	}
}
```
:::

-   `controller.animation.player.afk` 是该控制器的唯一标识符
-   当[Molang](https://bedrock.dev/zh/MoLang)查询`!q.is_moving`返回false时（表示玩家未移动），状态会切换到"stands_still"
-   "stands_still"状态会持续检测：若玩家30秒内无移动则进入"afk"状态，否则返回"default"状态
-   进入"afk"状态时，会触发"on_entry"中的命令
-   "animations"字段包含该状态激活期间持续播放的行为动画简称（用法与[资源动画控制器](#animation-controller)相同）
-   当玩家恢复移动时，状态将转回"default"状态，并执行"on_exit"中的命令