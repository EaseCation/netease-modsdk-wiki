---
title: 自定义台阶
category: 原版再创作
tags:
    - 实验性
    - 简单
mentions:
    - Kaioga5
    - QuazChick
---

::: tip 格式要求 & 最低引擎版本 `1.20.30`
本教程假设您已掌握方块制作基础知识。
开始前请先阅读[方块制作指南](/wiki/blocks/blocks-intro)。
:::

::: warning 实验性功能
需启用 `假日创造者功能` 来触发方块事件和使用 `minecraft:unit_cube` 组件。
:::

## 概述
制作自定义台阶看似简单，但在实际复刻过程中可能会遇到一些技术难点。本教程将为您提供解决方案，并附赠可直接使用的模板。

已知问题：
- 手持自定义台阶时模型会垂直居中显示
- 物品形态（地面掉落物/物品展示框/手持时）可能显示完整方块尺寸

## 自定义台阶实现
以下代码将创建与原版风格一致的自定义台阶。

::: code-group
```json [BP/blocks/custom_slab.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_slab",
      "menu_category": {
        "category": "construction",
        "group": "itemGroup.name.slab"
      },
      "traits": {
        "minecraft:placement_position": {
          "enabled_states": ["minecraft:vertical_half"]
        }
      },
      "states": {
        "wiki:double": [false, true]
      }
    },
    "permutations": [
      // 下半台阶
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'bottom' && !q.block_state('wiki:double')",
        "components": {
          "minecraft:collision_box": {
            "origin": [-8, 0, -8],
            "size": [16, 8, 16]
          },
          "minecraft:selection_box": {
            "origin": [-8, 0, -8],
            "size": [16, 8, 16]
          },
          "minecraft:on_interact": {
            "event": "wiki:form_double",
            "condition": "q.block_face == 1.0 && q.is_item_name_any('slot.weapon.mainhand', 'wiki:custom_slab')"
          }
        }
      },
      // 上半台阶
      {
        "condition": "q.block_state('minecraft:vertical_half') == 'top' && !q.block_state('wiki:double')",
        "components": {
          "minecraft:collision_box": {
            "origin": [-8, 8, -8],
            "size": [16, 8, 16]
          },
          "minecraft:selection_box": {
            "origin": [-8, 8, -8],
            "size": [16, 8, 16]
          },
          "minecraft:on_interact": {
            "event": "wiki:form_double",
            "condition": "q.block_face == 0.0 && q.is_item_name_any('slot.weapon.mainhand', 'wiki:custom_slab')"
          }
        }
      },
      // 双层台阶
      {
        "condition": "q.block_state('wiki:double')",
        "components": {
          "minecraft:unit_cube": {},
          "minecraft:on_player_destroyed": {
            "event": "wiki:destroy_double"
          }
        }
      }
    ],
    "components": {
      "minecraft:destructible_by_mining": {
        "seconds_to_destroy": 7
      },
      "minecraft:destructible_by_explosion": {
        "explosion_resistance": 6
      },
      "minecraft:geometry": {
        "identifier": "geometry.slab",
        "bone_visibility": {
          "bottom_slab": "q.block_state('minecraft:vertical_half') == 'bottom'",
          "top_slab": "q.block_state('minecraft:vertical_half') == 'top'"
        }
      },
      "minecraft:material_instances": {
        "*": {
          "texture": "stone"
        }
      }
    },
    "events": {
      "wiki:form_double": {
        "set_block_state": {
          "wiki:double": true
        },
        "run_command": {
          "command": "playsound use.stone @a ~~~ 1 0.8"
        },
        "decrement_stack": {}
      },
      "wiki:destroy_double": {
        "spawn_loot": {} // 生成方块的默认战利品
      }
    }
  }
}
```
:::

## 几何模型
以下是自定义台阶所需的几何模型配置。

<Spoiler title="几何模型JSON">
  
::: code-group
```json [RP/models/blocks/slab.geo.json]
{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.slab",
        "texture_width": 16,
        "texture_height": 16,
        "visible_bounds_width": 2,
        "visible_bounds_height": 2.5,
        "visible_bounds_offset": [0, 0.75, 0]
      },
      "bones": [
        {
          "name": "top_slab",
          "pivot": [0, 0, 0],
          "cubes": [
            {
              "origin": [-8, 8, -8],
              "size": [16, 8, 16],
              "uv": {
                "north": {"uv": [0, 0], "uv_size": [16, 8]},
                "east": {"uv": [0, 0], "uv_size": [16, 8]},
                "south": {"uv": [0, 0], "uv_size": [16, 8]},
                "west": {"uv": [0, 0], "uv_size": [16, 8]},
                "up": {"uv": [16, 16], "uv_size": [-16, -16]},
                "down": {"uv": [16, 16], "uv_size": [-16, -16]}
              }
            }
          ]
        },
        {
          "name": "bottom_slab",
          "pivot": [0, 0, 0],
          "cubes": [
            {
              "origin": [-8, 0, -8],
              "size": [16, 8, 16],
              "uv": {
                "north": {"uv": [0, 8], "uv_size": [16, 8]},
                "east": {"uv": [0, 8], "uv_size": [16, 8]},
                "south": {"uv": [0, 8], "uv_size": [16, 8]},
                "west": {"uv": [0, 8], "uv_size": [16, 8]},
                "up": {"uv": [16, 16], "uv_size": [-16, -16]},
                "down": {"uv": [16, 16], "uv_size": [-16, -16]}
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