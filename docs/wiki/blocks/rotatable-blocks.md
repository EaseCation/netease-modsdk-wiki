---
title: 可旋转方块
category: 巧思案例
mentions:
    - Ultr4Anubis
    - SmokeyStack
    - ihategravel2
    - MedicalJewel105
    - MajestikButter
    - QuazChick
---

# 可旋转方块

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip 格式与最低引擎版本 `1.20.30`
本教程假设您已掌握方块基础知识，包括[方块状态](/wiki/blocks/block-states)与[方块特性](/wiki/blocks/block-traits)。  
开始前请先阅读[方块指南](/wiki/blocks/blocks-intro)。
:::

## 旋转类型

-   ### [基本方向旋转](#cardinal-direction-rotation)

    -   适用于雕刻南瓜和熔炉  
    -   4个方向 - 'north'（北）、'south'（南）、'east'（东）、'west'（西）

-   ### [面向方向旋转](#facing-direction-rotation)

    -   适用于发射器和观测器  
    -   6个方向 - 'down'（下）、'up'（上）、'north'（北）、'south'（南）、'east'（东）、'west'（西）

-   ### [方块面附着旋转](#block-face-rotation)

    -   适用于梯子和物品展示框  
    -   6个附着方向 - 'down'（下）、'up'（上）、'north'（北）、'south'（南）、'east'（东）、'west'（西）

-   ### [原木/柱体旋转](#log-rotation)

    -   适用于原木和玄武岩  
    -   3个轴对齐方向

-   ### [精确旋转](/wiki/blocks/precise-rotation)
    -   适用于头颅、告示牌和旗帜  
    -   16个方向（以22.5度递增）  
    -   4个侧面附着方向

## 基本方向旋转 {#cardinal-direction-rotation}

### 特性

使用`minecraft:placement_direction`方块特性并启用`minecraft:cardinal_direction`状态来设置方块方向。

::: code-group
```json [minecraft:block]
"description": {
  "identifier": "wiki:cardinal_direction_example",
  // 在此处定义方块特性
  "traits": {
    "minecraft:placement_direction": {
      "enabled_states": ["minecraft:cardinal_direction"], // 可在查询中使用，例如`q.block_state('minecraft:cardinal_direction') == 'north'`
      "y_rotation_offset": 180 // 朝向玩家
    }
  }
}
```
:::

### 置换

通过方块置换实现旋转。每个置换包含`minecraft:transformation`组件，检查`minecraft:cardinal_direction`状态并应用相应旋转。

**下方旋转值假设模型正面朝北**

::: code-group
```json [minecraft:block]
"permutations": [
  // 面向北
  {
    "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 0, 0] }
    }
  },
  // 面向西
  {
    "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 90, 0] }
    }
  },
  // 面向南
  {
    "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 180, 0] }
    }
  },
  // 面向东
  {
    "condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
    "components": {
      "minecraft:transformation": { "rotation": [0, -90, 0] }
    }
  }
]
```
:::

## 面向方向旋转 {#facing-direction-rotation}

### 特性

使用`minecraft:placement_direction`方块特性并启用`minecraft:facing_direction`状态来设置方块方向。

::: code-group
```json [minecraft:block]
"description": {
  "identifier": "wiki:facing_direction_example",
  // 在此处定义方块特性
  "traits": {
    "minecraft:placement_direction": {
      "enabled_states": ["minecraft:facing_direction"], // 可在查询中使用，例如`q.block_state('minecraft:facing_direction') == 'north'`
    }
  }
}
```
:::

### 置换

通过方块置换实现旋转。每个置换包含`minecraft:transformation`组件，检查`minecraft:facing_direction`状态并应用相应旋转。

**下方旋转值假设模型正面朝北**

::: code-group
```json [minecraft:block]
"permutations": [
  // 朝下
  {
    "condition": "q.block_state('minecraft:facing_direction') == 'down'",
    "components": {
      "minecraft:transformation": { "rotation": [-90, 0, 0] }
    }
  },
  // 朝上
  {
    "condition": "q.block_state('minecraft:facing_direction') == 'up'",
    "components": {
      "minecraft:transformation": { "rotation": [90, 0, 0] }
    }
  },
  // 朝北
  {
    "condition": "q.block_state('minecraft:facing_direction') == 'north'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 0, 0] }
    }
  },
  // 朝西
  {
    "condition": "q.block_state('minecraft:facing_direction') == 'west'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 90, 0] }
    }
  },
  // 朝南
  {
    "condition": "q.block_state('minecraft:facing_direction') == 'south'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 180, 0] }
    }
  },
  // 朝东
  {
    "condition": "q.block_state('minecraft:facing_direction') == 'east'",
    "components": {
      "minecraft:transformation": { "rotation": [0, -90, 0] }
    }
  }
]
```
:::

## 方块面附着旋转 {#block-face-rotation}

### 特性

使用`minecraft:placement_position`方块特性并启用`minecraft:block_face`状态来设置方块附着面。

::: code-group
```json [minecraft:block]
"description": {
  "identifier": "wiki:facing_direction_example",
  // 在此处定义方块特性
  "traits": {
    "minecraft:placement_position": {
      "enabled_states": ["minecraft:block_face"], // 可在查询中使用，例如`q.block_state('minecraft:block_face') == 'north'`
    }
  }
}
```
:::

### 置换

通过方块置换实现旋转。每个置换包含`minecraft:transformation`组件，检查`minecraft:block_face`状态并应用相应旋转。

**下方旋转值假设模型正面朝北**

::: code-group
```json [minecraft:block]
"permutations": [
  // 朝下
  {
    "condition": "q.block_state('minecraft:block_face') == 'down'",
    "components": {
      "minecraft:transformation": { "rotation": [-90, 0, 0] }
    }
  },
  // 朝上
  {
    "condition": "q.block_state('minecraft:block_face') == 'up'",
    "components": {
      "minecraft:transformation": { "rotation": [90, 0, 0] }
    }
  },
  // 朝北
  {
    "condition": "q.block_state('minecraft:block_face') == 'north'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 0, 0] }
    }
  },
  // 朝西
  {
    "condition": "q.block_state('minecraft:block_face') == 'west'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 90, 0] }
    }
  },
  // 朝南
  {
    "condition": "q.block_state('minecraft:block_face') == 'south'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 180, 0] }
    }
  },
  // 朝东
  {
    "condition": "q.block_state('minecraft:block_face') == 'east'",
    "components": {
      "minecraft:transformation": { "rotation": [0, -90, 0] }
    }
  }
]
```
:::

## 原木旋转 {#log-rotation}

实现与原版原木相同的旋转方式

::: warning 实验性功能
需要启用`假日创作者功能`来触发事件
:::

### 方块状态

::: code-group
```json [minecraft:block > description]
"states": {
  "wiki:axis": [0, 1, 2]
}
```
:::

### 方块事件与触发

使用Molang表达式通过查询方块附着面来确定坐标轴方向（转换为0、1或2）

::: code-group
```json [minecraft:block > events]
"wiki:set_axis": {
  "set_block_state": {
    "wiki:axis": "数学运算.floor(q.block_face / 2)"
  }
}
```
:::

使用`minecraft:on_player_placing`触发器组件调用事件

::: code-group
```json [minecraft:block > components]
"minecraft:on_player_placing": {
  "event": "wiki:set_axis"
}
```
:::

### 置换

::: code-group
```json [minecraft:block]
"permutations": [
  {
    "condition": "q.block_state('wiki:axis') == 0",
    "components": {
      "minecraft:transformation": { "rotation": [0, 0, 0] }
    }
  },
  {
    "condition": "q.block_state('wiki:axis') == 1",
    "components": {
      "minecraft:transformation": { "rotation": [90, 0, 0] }
    }
  },
  {
    "condition": "q.block_state('wiki:axis') == 2",
    "components": {
      "minecraft:transformation": { "rotation": [0, 0, 90] }
    }
  }
]
```
:::

### 原木旋转示例

::: warning 实验性功能
本示例需要启用`假日创作者功能`以使用`minecraft:unit_cube`
:::

<Spoiler title="基础自定义原木JSON">

::: code-group
```json [BP/blocks/custom_log.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_log",
      "states": {
        "wiki:axis": [0, 1, 2]
      }
    },
    "components": {
      "minecraft:destructible_by_mining": {
        "seconds_to_destroy": 1.5
      },
      "minecraft:destructible_by_explosion": {
        "explosion_resistance": 15
      },
      "minecraft:material_instances": {
        "*": {
          "texture": "log_side"
        },
        "end": {
          "texture": "log_top"
        },
        "up": "end",
        "down": "end"
      },
      "minecraft:unit_cube": {},
      "minecraft:on_player_placing": {
        "event": "wiki:set_axis"
      }
    },
    "events": {
      "wiki:set_axis": {
        "set_block_state": {
          "wiki:axis": "Math.floor(q.block_face / 2)"
        }
      }
    },
    "permutations": [
      {
        "condition": "q.block_state('wiki:axis') == 0",
        "components": {
          "minecraft:transformation": { "rotation": [0, 0, 0] }
        }
      },
      {
        "condition": "q.block_state('wiki:axis') == 1",
        "components": {
          "minecraft:transformation": { "rotation": [90, 0, 0] }
        }
      },
      {
        "condition": "q.block_state('wiki:axis') == 2",
        "components": {
          "minecraft:transformation": { "rotation": [0, 0, 90] }
        }
      }
    ]
  }
}
```
:::

</Spoiler>