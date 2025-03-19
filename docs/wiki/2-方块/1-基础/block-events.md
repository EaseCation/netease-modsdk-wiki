---
title: 方块事件与触发器
description: 方块事件允许你在满足特定条件时操控游戏世界。
category: 常规
nav_order: 8
tags:
    - 实验性功能
mentions:
    - SirLich
    - solvedDev
    - yanasakana
    - MedicalJewel105
    - aexer0e
    - SmokeyStack
    - TheDoctor15
    - XxPoggyisLitxX
    - TheItsNameless
    - ThomasOrs
    - QuazChick
    - VactricaKing
    - BlazeDrake
---

# 方块事件与触发器

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式与最低引擎版本 `1.20.30`
创建自定义方块时使用最新格式版本可获得新功能和改进。本wiki旨在分享关于自定义方块的最新信息，当前目标格式版本为`1.20.30`。
:::
:::warning 实验性功能
方块事件需要启用`假日创作者功能`实验性玩法。
:::
:::danger 警告
方块事件已被弃用，将在未来更新中移除。除非必要，否则不建议使用，因为在移除后你需要将所有功能迁移至脚本系统。
:::

## 定义事件

方块事件允许你在满足特定条件时操控游戏世界，事件定义在`minecraft:block`的`events`子项中。在事件内部，你可以通过配置[事件响应](#事件响应)来设定触发事件时执行的操作。

[事件触发器](#事件触发器)会在适当条件下运行事件，执行所有关联的事件响应。

::: code-group
```json [BP/blocks/loot_dropper.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:loot_dropper"
    },
    "components": {
      "minecraft:on_step_on": {
        "event": "wiki:drop_loot"
      }
    },
    "events": {
      "wiki:drop_loot": {
        "spawn_loot": {
          "table": "loot_tables/blocks/my_loot_table.json"
        }
      }
    }
  }
}
```
:::

_此示例在实体踏上方块时生成战利品_

## 序列响应

序列允许你多次运行相同响应，或在满足条件时触发特定操作。

所有事件响应都应包含在序列中。

::: code-group
```json [minecraft:block > events]
"wiki:my_sequence": {
  "sequence": [
    {
      "set_block_state": {
        "wiki:my_state": true
      }
    },
    {
      "condition": "q.block_state('wiki:my_state')", // 可选
      "trigger": {
        "event": "wiki:my_entity_event",
        "target": "other"
      }
    }
  ]
}
```
:::

## 随机响应

随机执行事件响应。

::: code-group
```json [minecraft:block > events]
"wiki:random_action": {
  "randomize": [
    {
      "weight": 1, // 1/4概率
      "set_block_state": {
        "wiki:my_state": true
      }
    },
    {
      "weight": 3, // 3/4概率
      "trigger": {
        "event": "wiki:my_entity_event",
        "target": "other"
      }
    }
  ]
}
```
:::

## 事件响应

-   [`add_mob_effect`](#添加生物效果)
-   [`damage`](#造成伤害)
-   [`decrement_stack`](#减少堆叠)
-   [`die`](#摧毁)
-   [`play_effect`](#播放特效)
-   [`play_sound`](#播放音效)
-   [`remove_mob_effect`](#移除生物效果)
-   [`run_command`](#执行命令)
-   [`set_block`](#设置方块)
-   [`set_block_at_pos`](#在指定位置设置方块)
-   [`set_block_state`](#设置方块状态)
-   [`spawn_loot`](#生成战利品)
-   [`swing`](#挥动)
-   [`teleport`](#传送)
-   [`transform_item`](#转换物品)
-   [`trigger`](#触发事件)

### 添加生物效果

为指定目标添加生物效果。

::: code-group

```json [minecraft:block > events]
"wiki:effect_event": {
  "add_mob_effect": {
    "effect": "poison",
    "target": "other",
    "duration": 8,
    "amplifier": 3
  }
}
```
:::

### 造成伤害

对目标造成指定类型和数值的伤害。

::: code-group

```json [minecraft:block > events]
"wiki:damage_event": {
  "damage": {
    "type": "magic",
    "target": "other",
    "amount": 4
  }
}
```
:::

### 减少堆叠

移除玩家当前手持物品堆叠中的一个物品。

::: code-group

```json [minecraft:block > events]
"wiki:remove_one": {
  "decrement_stack": {
    "ignore_game_mode": true // 可选 - 是否影响创造模式玩家（默认为false）
  }
}
```
:::

### 摧毁

摧毁指定目标，若目标为`self`则方块直接消失且不生成战利品或效果。

::: code-group

```json [minecraft:block > events]
"wiki:destroy": {
  "die": {
    "target": "self"
  }
}
```
:::

### 播放特效

在目标位置播放粒子特效。

支持的`effect`值未知。可通过[`run_command`](#执行命令)配合`playsound`命令实现类似效果。

::: code-group

```json [minecraft:block > events]
"wiki:particle_effect": {
  "play_effect": {
    "effect": "???",
    "target": "self"
  }
}
```
:::

### 播放音效

在目标位置播放音效。

支持`RP/sounds.json`中大多数原版独立音效事件ID，但自定义音效条目不可用。

::: code-group

```json [minecraft:block > events]
"wiki:play_sound": {
  "play_sound": {
    "sound": "beacon.power",
    "target": "self"
  }
}
```
:::

### 移除生物效果

移除目标的指定生物效果。

::: code-group

```json [minecraft:block > events]
"wiki:remove_effect_event": {
  "remove_mob_effect": {
    "effect": "poison",
    "target": "other"
  }
}
```
:::

### 执行命令

对目标执行命令。

使用数组可执行多个命令。

::: code-group

```json [minecraft:block > events]
"wiki:execute_event": {
  "run_command": {
    "target": "self", // 可选 - 默认为'self'（目标为方块）
    "command": "summon pig"
  }
}
```
:::

或...

::: code-group

```json [minecraft:block > events]
"wiki:execute_event": {
  "run_command": {
    "target": "self", // 可选 - 默认为'self'（目标为方块）
    "command": [
      "summon pig",
      "say 大家欢迎小猪！"
    ]
  }
}
```
:::

### 设置方块

用指定方块替换当前方块。

::: code-group

```json [minecraft:block > events]
"wiki:place_block": {
  "set_block": {
      "block_type": "minecraft:grass"
  }
}
```
:::

或...

::: code-group

```json [minecraft:block > events]
"wiki:place_block": {
  "set_block": {
      "block_type": {
          "name": "minecraft:trapdoor",
          "states": {
              "direction": 2,
              "open_bit": true
          }
      }
  }
}
```
:::

### 在指定位置设置方块

在方块相对位置生成指定方块。

::: code-group

```json [minecraft:block > events]
"wiki:generate_stone_above": {
  "set_block_at_pos": {
    "block_type": "minecraft:stone",
    "block_offset": [0, 1, 0]
  }
}
```
:::

或...

::: code-group

```json [minecraft:block > events]
"wiki:generate_upper_door_above": {
  "set_block_at_pos": {
      "block_type": {
          "name": "minecraft:wooden_door",
          "states": {
              "upper_block_bit": true
          }
      },
      "block_offset": [0, 1, 0]
  }
}
```
:::

### 设置方块状态

设置方块状态值（可设置为Molang表达式字符串的返回值）。

:::warning
字符串值会被解析为Molang表达式。因此，要设置字符串状态时，必须用`'`包裹值（见示例）。
:::

::: code-group

```json [minecraft:block > events]
"wiki:change_state": {
  "set_block_state": {
    "wiki:boolean_state_example": false,
    "wiki:integer_state_example": "q.block_state('wiki:integer_state_example') + 1",
    "wiki:string_state_example": "'red'"
  }
}
```
:::

### 生成战利品

生成战利品表内容。

::: code-group

```json [minecraft:block > events]
"wiki:drop_loot": {
  "spawn_loot": {
    "table": "loot_tables/blocks/my_loot_table.json"
  }
}
```
:::

### 挥动

使关联实体执行挥动动作。

::: code-group

```json [minecraft:block > events]
"wiki:swing_arm": {
  "swing": {}
}
```
:::

### 传送

将目标随机传送至目标点周围。

::: code-group

```json [minecraft:block > events]
"wiki:go_away": {
  "teleport": {
    "target": "other", // 被传送实体
    "avoid_water": true, // 避免传入水中
    "land_on_block": true, // 将目标放置在方块上
    "destination": [0, 0, 0], // 目标原点
    "max_range": [5, 6, 7] // 相对原点的最大偏移范围
  }
}
```
:::

### 转换物品

替换目标的当前手持物品。

::: code-group

```json [minecraft:block > events]
"wiki:replace": {
  "transform_item": {
    "transform": "iron_sword"
  }
}
```
:::

### 触发事件

触发指定目标的事件。

::: code-group

```json [minecraft:block > events]
"wiki:trigger_crack": {
  "trigger": {
    "event": "wiki:crack",
    "target": "self"
  }
}
```
:::

## 事件触发器

事件触发器通过[组件](/blocks/block-components)定义，可通过[permutations](/blocks/block-permutations)动态添加、修改或移除。

-   [`minecraft:on_fall_on`](#跌落触发)
-   [`minecraft:on_interact`](#交互触发)
-   [`minecraft:on_placed`](#放置触发)
-   [`minecraft:on_player_destroyed`](#玩家破坏触发)
-   [`minecraft:on_player_placing`](#玩家放置时触发)
-   [`minecraft:on_step_off`](#离开触发)
-   [`minecraft:on_step_on`](#踏入触发)
-   [`minecraft:queued_ticking`](#队列计时)
-   [`minecraft:random_ticking`](#随机计时)

### 跌落触发

当实体跌落在方块上时触发事件。

**注意**：需要`minecraft:collision_box`组件的Y轴高度≥4。

::: code-group

```json [minecraft:block > components]
"minecraft:on_fall_on": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')", // 可选
  "min_fall_distance": 5
}
```
:::

### 交互触发

当玩家与方块交互时触发事件。

::: code-group

```json [minecraft:block > components]
"minecraft:on_interact": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')" // 可选
}
```
:::

### 放置触发

当方块被放置时触发事件。

::: code-group

```json [minecraft:block > components]
"minecraft:on_placed": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')" // 可选
}
```
:::

### 玩家破坏触发

当玩家通过挖掘破坏方块时触发事件（创造模式不触发）。

::: code-group

```json [minecraft:block > components]
"minecraft:on_player_destroyed": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')" // 可选
}
```
:::

### 玩家放置时触发

当玩家放置方块时触发事件。

::: code-group

```json [minecraft:block > components]
"minecraft:on_player_placing": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')" // 可选
}
```
:::

### 离开触发

当实体离开方块时触发事件。

**注意**：需要`minecraft:collision_box`组件的Y轴高度≥4。

::: code-group

```json [minecraft:block > components]
"minecraft:on_step_off": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')" // 可选
}
```
:::

### 踏入触发

当实体踏上方块时触发事件。

**注意**：需要`minecraft:collision_box`组件的Y轴高度≥4。

::: code-group

```json [minecraft:block > components]
"minecraft:on_step_on": {
  "event": "wiki:example_event",
  "target": "self", // 可选 - 默认为'self'（目标为方块）
  "condition": "q.block_state('wiki:boolean_state_example')" // 可选
}
```
:::

### 队列计时

在`interval_range`范围内随机间隔触发事件。

::: code-group

```json [minecraft:block > components]
"minecraft:queued_ticking": {
  "looping": true,
  "interval_range": [20, 20], // 两个游戏刻数值，随机决定延迟时间
  "on_tick": {
    "event": "wiki:example_event",
    "target": "self", // 可选 - 默认为'self'（目标为方块）
    "condition": "q.block_state('wiki:boolean_state_example')" // 可选
  }
}
```
:::

### 随机Tick

在每次随机刻触发事件（如作物随机生长机制）。

::: code-group

```json [minecraft:block > components]
"minecraft:random_ticking": {
  "on_tick": {
    "event": "wiki:example_event",
    "target": "self", // 可选 - 默认为'self'（目标为方块）
    "condition": "q.block_state('wiki:boolean_state_example')" // 可选
  }
}
```
:::