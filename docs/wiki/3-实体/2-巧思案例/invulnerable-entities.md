---
title: 无敌实体
category: 教程
tags:
    - beginner
mentions:
    - SirLich
    - Joelant05
    - solvedDev
    - MedicalJewel105
---

# 无敌实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 使用伤害传感器组件

禁用实体伤害的最佳且最灵活的方式是使用 `minecraft:damage_sensor` 组件。该组件允许我们通过 `filters` 过滤器来指定哪些伤害源可以作用于实体。

了解这个组件的最好方法是查阅原版伤害传感器示例或阅读[官方文档](https://bedrock.dev/docs/stable/Entities#minecraft:damage_sensor)

### 完全无敌的实体

::: code-group
```json [BP/entities/entity.json#minecraft:entity/components]
"minecraft:damage_sensor": {
    "triggers": {
        "cause": "all",      // 捕捉全部伤害类型
        "deals_damage": false  // 取消实际伤害效果
    }
}
```
:::

### 禁止玩家伤害

::: code-group
```json [BP/entities/entity.json#minecraft:entity/components]
"minecraft:damage_sensor": {
    "triggers": {
        "on_damage": {      // 当受到伤害时触发
            "filters": {    // 过滤器配置
                "test": "is_family", // 检测对象类型
                "subject": "other",  // 检测施加伤害的主体
                "value": "player"    // 当伤害来源为玩家时生效
            }
        },
        "deals_damage": false  // 取消实际伤害效果
    }
}
```
:::

## 最低生命值限制

通过 `minecraft:health` 组件中的 `min`（最小值）属性，我们可以创建无法自然死亡的无敌实体（即使使用 `/kill @e` 命令也无法清除）。需要注意的是该方案可能引发后续问题——这类实体会永久驻留世界。

如果使用此方案，**请务必配置备用清除机制**。例如通过环境传感器组件、计时器组件或互动组件触发的 `minecraft:instant_despawn` 事件实现清除，也可以通过执行 `/event` 命令手动触发。

::: code-group
```json [BP/entities/entity.json#minecraft:entity/components]
"minecraft:health": {
    "value": 1,     // 当前生命值
    "max": 1,       // 最大生命值
    "min": 1        // 生命值下限（设置为与max相等将保持血量恒定）
}
```
:::

> **技术提示**：将该值设置为0可能会导致部分死亡和重生动画/粒子效果无法正常显示。