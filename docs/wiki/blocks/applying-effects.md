---
title: 持续效果应用指南
category: 巧思案例
tags:
    - 实验性内容
    - 初级难度
mentions:
    - MysticChair
    - SirLich
    - MedicalJewel105
    - QuazChick
---

# 持续效果应用指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip 格式要求 & 最低引擎版本 `1.20.30`
本教程假设您已掌握[方块状态](/wiki/blocks/block-states)的基本概念。建议在开始前先阅读[方块基础指南](/wiki/blocks/blocks-intro)。
:::

::: warning 实验性功能
需要启用 `假日创作者功能` 来触发事件。
:::

本教程将展示如何在实体持续站立于方块时为其附加状态效果。

## 设置步骤

我们需要在代码中添加以下组件，首先创建一个用于记录站立状态的布尔值：

::: code-group
```json [minecraft:block > description]
"states": {
  "wiki:stood_on": [false, true]
}
```
:::

接下来添加 `minecraft:queued_ticking` 组件，当检测到站立状态为 `true` 时触发效果事件：

::: code-group
```json [minecraft:block > components]
"minecraft:queued_ticking": {
  "looping": true,
  "interval_range": [1, 1],
  "on_tick": {
    "event": "wiki:add_effect",
    "target": "self",
    "condition": "q.block_state('wiki:stood_on')"
  }
}
```
:::

使用 `minecraft:on_step_on` 事件组件在实体踏上方块时更新状态：

::: code-group
```json [minecraft:block > components]
"minecraft:on_step_on": {
  "event": "wiki:step_on"
}
```
:::

通过 `minecraft:on_step_off` 事件组件在实体离开时重置状态：

::: code-group
```json [minecraft:block > description]
"minecraft:on_step_off": {
  "event": "wiki:step_off"
}
```
:::

配置事件处理逻辑。首先定义状态更新事件：

::: code-group
```json [minecraft:block > components]
"events": {
  "wiki:step_on": {
    "set_block_state": {
      "wiki:stood_on": true
    }
  },
  "wiki:step_off": {
    "set_block_state": {
      "wiki:stood_on": false
    }
  }
}
```
:::

最后添加效果触发事件：

::: code-group
```json [minecraft:block > components]
"wiki:add_effect": {
  "run_command": {
    "command": "effect @e[r=1] wither 2 2"
  }
}
```
:::

完成！上述代码将在实体持续站立时施加凋零效果。

## 示例JSON

<Spoiler title="凋零方块实现案例">

::: code-group
```json [BP/blocks/wither_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:wither_block",
      "menu_category": {
        "category": "nature"
      },
      "states": {
        "wiki:stood_on": [false, true]
      }
    },
    "components": {
      "minecraft:geometry": "geometry.wither_block",
      "minecraft:material_instances": {
        "*": {
          "texture": "wither_block"
        }
      },
      "minecraft:loot": "loot_tables/empty.json",
      "minecraft:on_step_on": {
        "event": "wiki:step_on"
      },
      "minecraft:on_step_off": {
        "event": "wiki:step_off"
      },
      "minecraft:queued_ticking": {
        "looping": true,
        "interval_range": [1, 1],
        "on_tick": {
          "event": "wiki:add_effect",
          "condition": "q.block_state('wiki:stood_on')"
        }
      },
      "minecraft:map_color": "#181818"
    },
    "events": {
      "wiki:step_on": {
        "set_block_state": {
          "wiki:stood_on": true
        }
      },
      "wiki:step_off": {
        "set_block_state": {
          "wiki:stood_on": false
        }
      },
      "wiki:add_effect": {
        "run_command": {
          "command": "effect @e[r=1] wither 2 2"
        }
      }
    }
  }
}
```
:::

</Spoiler>

## 技术说明

关于代码实现的几点说明：

-   **问**：为何使用 `run_command` 事件响应来触发效果，而不是专用的 `add_mob_effect` 响应？

-   **答**：当通过 `minecraft:queued_ticking` 触发时，`add_mob_effect` 无法获取有效目标，因此必须改用 `/effect` 命令的目标选择器。

注意当效果时长设置小于2秒时可能出现异常。如果效果会造成持续伤害（如中毒），伤害会在效果施加时立即生效。这将导致实体受到的伤害频率高于原版机制（当实体快速移动时）。可通过将命令中的效果时长设为1秒进行对比测试。保持2秒时长可确保伤害间隔符合原版节奏。