---
title: 工具耐久度
category: 巧思案例
tags:
    - 实验性
    - 中级
    - 脚本
mentions:
    - MedicalJewel105
    - TheDoctor15
    - napstaa967
---

# 工具耐久度

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

1.16.100+版本的物品耐久机制与1.10和1.16版本存在差异。现在需要明确定义物品何时会受到耐久损耗，并通过事件触发损耗行为。本教程将涵盖以下内容：
- 耐久度组件
- 更新耐久度的事件
- 实体伤害机制
- 方块破坏机制
- `repair_amount` 参数
- `on_tool_used` 事件

### 组件

::: code-group
```json [BP/items/my_item.json#components]
"minecraft:durability": {
    "max_durability": 200
}
```
:::

`minecraft:durability`组件用于定义物品的最大耐久值

## 事件机制

### 物品事件

::: code-group
```json [BP/items/my_item.json#events]
"durability_update": {
    "damage": {
        "type": "none",
        "amount": 1,
        "target": "self"
    }
}
```
:::

当该事件被触发时，物品（`self`目标）将承受耐久损耗。看似简单，不是吗？

### 脚本事件

对于脚本实现，我们将使用自定义函数处理耐久损耗

该函数支持物品的"耐久"附魔效果

::: code-group
```js [BP/scripts/main.js]
function damage_item(item) {
    // 获取耐久度组件
    const durabilityComponent = item.getComponent("durability")
    var unbreaking = 0
    // 获取耐久附魔等级
    if (item.hasComponent("enchantments")) {
        unbreaking = item.getComponent("enchantments").enchantments.getEnchantment("unbreaking")
        if (!unbreaking) {
            unbreaking = 0
        } else {
            unbreaking = unbreaking.level
        }
    }
    // 应用损耗
    if (durabilityComponent.damage == durabilityComponent.maxDurability) {

        return
    }
    durabilityComponent.damage += Number(Math.round(Math.random() * 100) <= durabilityComponent.getDamageChance(unbreaking))
    return item
}
```
:::

## 实体伤害

### 脚本实现

:::warning 实验性脚本

本脚本使用`@minecraft/server 1.9.0-beta`，该版本将在后续游戏更新中变更。
:::

对于1.20.40及更高格式版本，`on_hurt_entity`已失效。

以下脚本实现了武器耐久损耗机制：

::: code-group
```js [BP/scripts/main.js]
// 在此数组中添加你的物品ID
const my_items = ["wiki:silver_dagger"]

world.afterEvents.entityHurt.subscribe(event => {
    // 无伤害来源实体则跳过
    if (!event.damageSource.damagingEntity) return

    // 获取装备的武器
    const equipment = event.damageSource.damagingEntity.getComponent("minecraft:equippable")
    if (!equipment) return
    const weapon = equipment.getEquipment(EquipmentSlot.Mainhand)

    // 无武器则跳过
    if (!weapon) return

    // 物品不在列表则跳过
    if (!my_items.includes(weapon.typeId)) return
    let newItem = damage_item(weapon)
    equipment.setEquipment(EquipmentSlot.Mainhand, newItem)
    if (!newItem) {
        if (event.damageSource.damagingEntity instanceof Player) {
            event.damageSource.damagingEntity.playSound("random.break")
        }
    }
})
```
:::

### on_hurt_entity事件

:::warning

`on_hurt_entity`在格式版本1.20.40后已移除
:::

在`minecraft:weapon`组件中定义`on_hurt_entity`，用于指定玩家使用该物品攻击实体时触发的事件

::: code-group
```json [BP/items/my_item.json#components]
"minecraft:weapon": {
    "on_hurt_entity": {
        "event": "durability_update"
    }
}
```
:::

## 方块破坏

### 脚本实现

:::warning 实验性脚本

本脚本使用`@minecraft/server 1.9.0-beta`，该版本将在后续游戏更新中变更。
:::

对于1.20.20及更高格式版本，`on_dig`已失效。

以下脚本实现了工具耐久损耗机制：

::: code-group
```js [BP/scripts/main.js]
// 在此数组中添加你的物品ID
const my_items = ["wiki:obsidian_pickaxe"]

world.afterEvents.playerBreakBlock.subscribe(event => {
    // 无物品则跳过
    if (!event.itemStackAfterBreak) return
    // 物品不在列表则跳过
    if (!my_items.includes(event.itemStackAfterBreak.typeId)) return

    // 创造模式玩家跳过
    if (world.getPlayers({
        gameMode: GameMode.creative
    }).includes(event.player)) return
    const newItem = damage_item(event.itemStackAfterBreak)
    event.player.getComponent("minecraft:equippable").setEquipment(EquipmentSlot.Mainhand, newItem)
    if (!newItem) {
        event.player.playSound("random.break")
    }
})
```
:::

### on_dig事件

:::warning

`on_dig`在格式版本1.20.20后已移除
:::

在`minecraft:digger`组件中定义`on_dig`，用于指定玩家使用该物品破坏方块时触发的事件

::: code-group
```json [BP/items/my_item.json#components]
"minecraft:digger": {
    "use_efficiency": true,
    "destroy_speeds": [
        {
            "block": {
                "tags": "q.any_tag('wood')"
            },
            "speed": 8,
            "on_dig": {
                // 定义破坏带有wood标签的方块时触发的事件
                "event": "durability_update"
            }
        }
    ],
    "on_dig": {
        // 定义破坏任意方块时触发的事件
        "event": "durability_update"
    }
}
```
:::

## repair_amount参数

在`minecraft:repairable`组件中定义`repair_amount`，用于指定物品修复时的耐久恢复量

::: code-group
```json [BP/items/my_item.json#components]
"minecraft:repairable": {
    "repair_items": [
        {
            "repair_amount": "context.other->q.remaining_durability + 0.05 * context.other->q.max_durability",
            "items": [
                "bs:silver",
                "bs:silver_axe"
            ]
        }
    ]
}
```
:::

公式解析：

`"context.other->q.remaining_durability + 0.05 * context.other->q.max_durability"`

最终耐久 = 第一把斧的剩余耐久 + 第二把斧的剩余耐久 + 第二把斧最大耐久的5%

## on_tool_used事件

（当前可能不可用）
`on_tool_used`是通过标签系统触发的特殊事件。标签类似于实体的运行时标识符。已知标签：

| 标签                  | 效果          | 触发方式                          |
| -------------------- | ------------- | -------------------------------- |
| minecraft:is_axe     | 剥离原木       | 与斧头可交互的方块互动时触发        |
| minecraft:is_hoe     | 制作耕地       | 与锄头可交互的方块互动时触发        |
| minecraft:is_pickaxe | 未知          | 未知                             |
| minecraft:is_sword   | 未知          | 未知                             |

可通过以下方式应用标签：

::: code-group
```json [BP/items/my_item.json#components]
"tag:minecraft:is_axe": {}
```
:::