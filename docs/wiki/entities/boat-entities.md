---
title: 创建船只
category: 巧思案例
tags:
    - 配方
    - 进阶
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
    - StealthyExpertX
    - TheItsNameless
---

# 创建船只

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning 需要格式版本1.16.100或更低

当前行为格式版本要求1.16.100或更低版本才能使`minecraft:behavior.rise_to_liquid_level`和`minecraft:buoyant`功能生效。
如果您发现新格式版本中的替代实现方法，欢迎协助更新本Wiki内容。
:::

## 使用运行时标识符

详细内容请参阅[运行时标识符指南](/wiki/entities/runtime-identifier)。使用运行时标识符可以实现船只的大部分硬编码行为，但会导致船只无法随玩家转向且始终面向北方。

## 利用组件系统实现

目前最佳的船只创建方案是通过组件系统实现。1.16版本新增的两个组件可资利用：`minecraft:behavior.rise_to_liquid_level`与`minecraft:buoyant`。官方设计中前者用于岩浆怪的岩浆漂浮特性，我们可以将其移植到水面上使用。

## 第一种方法：minecraft:behavior.rise_to_liquid_level

::: code-group
```json [BP/entities/bar]
{
	"minecraft:entity": {
		"format_version": "1.14.0",
		"description": {
			"identifier": "foo:bar",
			"is_summonable": true,
			"is_spawnable": true,
			"is_experimental": false
		},
		"components": {
			// 这是实现效果的核心组件
			"minecraft:behavior.rise_to_liquid_level": {
				"priority": 0,
				// 控制船体相对于水面的基准高度
				"liquid_y_offset": 0.5,
				// 正垂直位移量，决定船体抬升幅度
				"rise_delta": 0.05,
				// 负垂直位移量，决定船体下沉幅度
				"sink_delta": 0.05
				// 通过升降参数可模拟波浪浮动效果
			},

			// 设置水上移动速率
			"minecraft:underwater_movement": {
				"value": 5
			},
			// 关键组件，移除会导致船体沉没
			"minecraft:navigation.walk": {
				"can_sink": false
			},
			"minecraft:rideable": {
				"seat_count": 1,
				"family_types": ["player"],
				"interact_text": "action.interact.enter_boat",
				"seats": {
					"position": [0, 0, 0]
				}
			},
			// 添加此组件实现WASD方向控制
			"minecraft:input_ground_controlled": {},
			"minecraft:health": {
				"value": 10,
				"max": 10
			},
			// 设置地面移动速度（设置为0可禁用地表移动）
			"minecraft:movement": {
				"value": 3
			},
			// 防止玩家下船后无法停止移动
			"minecraft:movement.basic": {},
			"minecraft:collision_box": {
				"width": 1,
				"height": 1
			},
			"minecraft:physics": {}
		}
	}
}
```
:::

## 第二种方法：minecraft:buoyant

::: code-group
```json []
{
	"minecraft:entity": {
		"format_version": "1.14.0",
		"description": {
			"identifier": "foo:bar",
			"is_summonable": true,
			"is_spawnable": true,
			"is_experimental": false
		},
		"components": {
			"minecraft:buoyant": {
				// 是否受重力影响（处理瀑布场景很有用）
				"apply_gravity": true,
				// 范围0-1，控制船体默认高度
				"base_buoyancy": 1.0,
				// 「浪涌」模拟船体上下波动效果（false也不会完全消除效果）
				"simulate_waves": true,
				// 产生「大浪」的概率
				"big_wave_probability": 0.03,
				// 「大浪」强度系数
				"big_wave_speed": 10.0,
				// 移除浮力后的下沉阻力
				"drag_down_on_buoyancy_removed": 0,
				// 支持浮力的液态方块（仅限水和岩浆）
				"liquid_blocks": ["water"]
			},

			// 设置水上移动速率
			"minecraft:underwater_movement": {
				"value": 5
			},
			// 关键组件，移除会导致船体沉没
			"minecraft:navigation.walk": {
				"can_sink": false
			},
			"minecraft:rideable": {
				"seat_count": 1,
				"family_types": ["player"],
				"interact_text": "action.interact.enter_boat",
				"seats": {
					"position": [0, 0, 0]
				}
			},
			// 添加此组件实现WASD方向控制
			"minecraft:input_ground_controlled": {},
			"minecraft:health": {
				"value": 10,
				"max": 10
			},
			// 设置地面移动速度（设置为0可禁用地表移动）
			"minecraft:movement": {
				"value": 3
			},
			// 防止玩家下船后无法停止移动
			"minecraft:movement.basic": {},
			"minecraft:collision_box": {
				"width": 1,
				"height": 1
			},
			"minecraft:physics": {}
		}
	}
}
```
:::

## 方法选择建议

两种方式各有优劣。若需禁用波动效果建议采用第一种方式；若需要进行精细调控可选择第二种方法。开发实践中，第二种常用于浮标等静态物体，第一种则更适合船只等运动实体，能更好地还原原版特性。