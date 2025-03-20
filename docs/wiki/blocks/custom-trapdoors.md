---
title: 自定义活板门
category: 原版再创作
tags:
    - experimental
    - intermediate
mentions:
    - Kaioga5
    - QuazChick
---

# 自定义活板门

::: tip 格式与最低引擎版本 `1.20.30`
本教程假定您已具备基础的方块制作知识。
开始前请先阅读[方块制作指南](/wiki/blocks/blocks-intro)。
:::

::: warning 实验性功能
需要启用`假日创作者功能`来触发方块事件。
:::

## 前言

制作自定义活板门通常是个复杂的任务，但通过本教程您将理解其运作原理（以便在复现过程中遇到任何问题时能够自主解决），同时我们也会提供可直接使用的模板。

## 自定义活板门实现

以下代码将创建具有原版风格的活板门。

::: code-group
```json [BP/blocks/custom_trapdoor.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_trapdoor",
      "menu_category": {
        "category": "construction",
        "group": "itemGroup.name.trapdoor"
      },
      "traits": {
        "minecraft:placement_position": {
          "enabled_states": ["minecraft:vertical_half"]
        },
        "minecraft:placement_direction": {
          "enabled_states": ["minecraft:cardinal_direction"]
        }
      },
      "states": {
        "wiki:open": [false, true]
      }
    },
    "permutations": [
      // 顶部关闭状态
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, 0, 180] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [180, 0, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [180, -270, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [180, 270, 0] }
        }
      },
      // 顶部开启状态
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [-270, 0, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [270, 0, -180] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, 270, 90] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": {
            "rotation": [180, -270, -270]
          }
        }
      },
      // 底部关闭状态
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, 0, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, 180, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, 270, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && !q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, -270, 0] }
        }
      },
      // 底部开启状态
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [90, 0, 180] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [270, 0, 0] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [0, -270, 90] }
        }
      },
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('wiki:open')",
        "components": {
          "minecraft:transformation": { "rotation": [180, 270, -270] }
        }
      }
    ],
    "components": {
      "minecraft:collision_box": {
        "origin": [-8, 0, -8],
        "size": [16, 3, 16]
      },
      "minecraft:selection_box": {
        "origin": [-8, 0, -8],
        "size": [16, 3, 16]
      },
      "minecraft:geometry": "geometry.trapdoor",
      "minecraft:material_instances": {
        "*": {
          "texture": "spruce_trapdoor",
          "render_method": "alpha_test"
        }
      },
      "minecraft:on_interact": {
        "event": "wiki:toggle"
      }
    },
    "events": {
      "wiki:toggle": {
        "sequence": [
          {
            "set_block_state": {
              "wiki:open": "!q.block_state('wiki:open')"
            }
          },
          {
            "condition": "q.block_state('wiki:open')",
            "run_command": {
              "command": "playsound close.wooden_trapdoor @a ~~~ 0.9 0.9"
            }
          },
          {
            "condition": "!q.block_state('wiki:open')",
            "run_command": {
              "command": "playsound open.wooden_trapdoor @a ~~~ 0.9 0.9"
            }
          }
        ]
      }
    }
  }
}
```
:::

## 几何模型

这是活板门所需的几何模型文件。

<Spoiler title="几何模型JSON">
  
::: code-group
```json [RP/models/blocks/trapdoor.geo.json]
{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.trapdoor",
        "texture_width": 16,
        "texture_height": 16,
        "visible_bounds_width": 2,
        "visible_bounds_height": 1.5,
        "visible_bounds_offset": [0, 0.25, 0]
      },
      "bones": [
        {
          "name": "trapdoor",
          "pivot": [0, 0, 0],
          "cubes": [
            {
              "origin": [-8, 0, -8],
              "size": [16, 3, 16],
              "uv": {
                "north": {"uv": [16, 3], "uv_size": [-16, -3]},
                "east": {"uv": [16, 3], "uv_size": [-16, -3]},
                "south": {"uv": [16, 3], "uv_size": [-16, -3]},
                "west": {"uv": [16, 3], "uv_size": [-16, -3]},
                "up": {"uv": [16, 16], "uv_size": [-16, -16]},
                "down": {"uv": [0, 0], "uv_size": [16, 16]}
              }
            }
          ]
        }
      ]
    }
  ]
}
```
:::

</Spoiler>

:::tip
原版活板门存在两个问题：部分面纹理方向错误，以及实际高度应为3却显示为2.95。本模板及配套几何模型已修复这两个问题。
:::