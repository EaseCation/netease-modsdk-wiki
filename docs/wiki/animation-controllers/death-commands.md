---
title: 死亡命令
tags:
    - 配方
mentions:
    - SirLich
    - BlueFrog130
    - SmokeyStack
    - cda94581
    - MedicalJewel105
    - Kaioga5
    - TheItsNameless
---

# 死亡命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

<BButton color="blue" link="animation-controllers-intro">了解更多关于动画控制器的知识</BButton>

我将"死亡效果"定义为"当实体死亡时执行某些操作"。以下是几种应该避免的错误实现方式：

- **在实体文件中检测死亡**：通过添加组件然后尝试在动画控制器中检测该组件。这种方法是错误的，因为实体在被移除前动画控制器没有机会运行。
- **通过外部源检测死亡**：例如使用持续运行的命令方块。这种方法并非完全错误，在某些情况下甚至可能是优选方案，但存在性能损耗且容易出错。

## 使用 q.is_alive 查询

创建死亡效果的最佳方式是使用`is_alive`查询。只需在动画控制器中创建基于`is_alive`的状态过渡，`on_entry`中的命令会在实体被移除前执行。

示例动画控制器：

::: code-group
```json [BP/animation_controllers/death.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.death": {
		"initial_state":"default",
			"states": {
				"default": {
					"transitions": [
						{
							"dead": "!q.is_alive"
						}
					]
				},
				"dead": {
					"on_entry": ["/say 我已死亡！"]
				}
			}
		}
	}
}
```
:::

## 在玩家实体上的应用

对于玩家实体，需要在死亡状态中添加额外过渡来确保状态重置：

::: code-group
```json [BP/animation_controllers/death.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.death": {
		"initial_state":"default",
			"states": {
				"default": {
					"transitions": [
						{
							"dead": "!q.is_alive"
						}
					]
				},
				"dead": {
					"on_entry": ["/say 我已死亡！"],
					"transitions": [
						{
							"default": "q.is_alive"
						}
					]
				}
			}
		}
	}
}
```
:::

:::warning
需要启用实验性玩法
:::

## 使用 minecraft:on_death 组件

通过在行为包的`entity.json`文件中使用`minecraft:on_death`组件，可以更直接地实现死亡命令：

1. 在组件部分添加触发逻辑：
```json
"minecraft:on_death" : {
	"event" : "wiki:on_death",
	"target" : "self"
}
```

2. 在事件部分定义执行内容：
```json
"wiki:on_death": {
	"run_command": {
		"command": [
			"say 我已经死了！"
		]
	}
}
```

:::tip
使用此方法可以在实体死亡后仍然为其添加计分板分数和标签
:::