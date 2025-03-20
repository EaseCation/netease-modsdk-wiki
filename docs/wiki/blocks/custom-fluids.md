---
title: 自定义流体
category: 原版再创作
tags:
    - 实验性
    - 中级
    - 脚本
mentions:
    - Provedule
    - JaylyDev
    - QuazChick
---

# 自定义流体

::: tip 格式要求 & 最低引擎版本 `1.20.30`
本教程假设您已具备方块和execute命令的高级知识。
开始前请先阅读[方块指南](/wiki/blocks/blocks-intro)。
:::

::: warning 实验性功能
需要使用`假日创造者功能`来支持方块标签Molang查询和触发方块事件。

需要使用`Beta API`来调用版本号为`1.6.0-beta`的[@minecraft/server](https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/minecraft-server)模块。
:::

目前尚无法创建与原版完全相同的流体，但您可以制作类似的效果！本模板/教程将指导您创建自定义的"半流体"。

## 流动逻辑

- 流体方块具有定义是否为源方块及其深度的状态
- 当流体方块下方存在空气时，会转化为下落的流体
- 深度大于`1`的流体会向四周扩散并递减深度
    - 若下方存在下落的流体则不会扩散
- 流动方块必须与其他流体方块相邻才能维持存在
- 源方块不需要周围有其他流体方块

**当前实现因复杂度问题暂未包含面剔除功能**

<WikiImage
  src="/assets/images/blocks/custom-fluids/fluid_display.png"
  alt="流体效果展示"
  pixelated="true"
  width=608
/>

## 源流体方块

以下是自定义流体的基础代码。请将`custom_fluid`全局替换为您的流体名称。当源方块检测到周围存在空气时，会将其替换为外围流体方块。若源方块下方存在空气，则会在下方生成下落的流体方块。

<BButton
    link="https://github.com/Bedrock-OSS/wiki-addon/blob/main/ma-custom_fluids/rp/models/blocks/fluid.geo.json"
    color=blue
>下载自定义流体模型</BButton>

<Spoiler title="自定义流体方块JSON">

::: code-group
```json [BP/blocks/custom_fluid.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:custom_fluid",
      "menu_category": {
        "category": "none"
      },
      "states": {
        "wiki:source": [true, false],
        // 流体深度 - 默认为4
        "wiki:depth": [4, 5, 3, 2, 1]
      }
    },
    "components": {
      "minecraft:light_dampening": 0,
      "minecraft:collision_box": false,
      "minecraft:selection_box": false,
      "minecraft:destructible_by_explosion": false,
      // 触发流体扩散
      "minecraft:queued_ticking": {
        "looping": true,
        "interval_range": [20, 20], // 流体流速（单位：tick）
        "on_tick": {
          "event": "wiki:flow"
        }
      },
      "minecraft:material_instances": {
        "*": {
          "texture": "custom_fluid", // 在`RP/textures/terrain_texture.json`中定义的短名称
          "render_method": "blend",
          "ambient_occlusion": false,
          "face_dimming": false
        }
      },
      "minecraft:loot": "loot_tables/empty.json",
      "tag:custom_fluid": {}
    },
    "events": {
      "wiki:flow": {
        "sequence": [
          // 干涸检测
          {
            "condition": "!q.block_state('wiki:source') && ((q.block_state('wiki:depth') == 5 && !q.block_neighbor_has_any_tag(0, 1, 0, 'custom_fluid')) || (q.block_state('wiki:depth') == 1 && !(q.block_neighbor_has_any_tag(1, 0, 0, 'custom_fluid_2') || q.block_neighbor_has_any_tag(-1, 0, 0, 'custom_fluid_2') || q.block_neighbor_has_any_tag(0, 0, 1, 'custom_fluid_2') || q.block_neighbor_has_any_tag(0, 0, -1, 'custom_fluid_2')) || q.block_state('wiki:depth') == 2 && !(q.block_neighbor_has_any_tag(1, 0, 0, 'custom_fluid_3') || q.block_neighbor_has_any_tag(-1, 0, 0, 'custom_fluid_3') || q.block_neighbor_has_any_tag(0, 0, 1, 'custom_fluid_3') || q.block_neighbor_has_any_tag(0, 0, -1, 'custom_fluid_3'))) || (q.block_state('wiki:depth') == 3 && !(q.block_neighbor_has_any_tag(1, 0, 0, 'custom_fluid_4', 'custom_fluid_5') || q.block_neighbor_has_any_tag(-1, 0, 0, 'custom_fluid_4', 'custom_fluid_5') || q.block_neighbor_has_any_tag(0, 0, 1, 'custom_fluid_4', 'custom_fluid_5') || q.block_neighbor_has_any_tag(0, 0, -1, 'custom_fluid_4', 'custom_fluid_5'))))",
            "die": {}
          },
          // 扩散逻辑
          {
            "condition": "q.block_state('wiki:depth') == 4",
            "run_command": {
              "command": [
                "execute if block ~~~1 air run setblock ~~~1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]",
                "execute if block ~~~-1 air run setblock ~~~-1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]",
                "execute if block ~1~~ air run setblock ~1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]",
                "execute if block ~-1~~ air run setblock ~-1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]"
              ]
            }
          },
          {
            "condition": "q.block_state('wiki:source') && q.block_neighbor_has_any_tag(0, 1, 0, 'custom_fluid')",
            "set_block_state": {
              "wiki:depth": 5
            }
          },
          {
            "condition": "q.block_state('wiki:source') && !q.block_neighbor_has_any_tag(0, 1, 0, 'custom_fluid')",
            "set_block_state": {
              "wiki:depth": 4
            }
          },
          {
            "condition": "q.block_state('wiki:depth') == 3",
            "run_command": {
              "command": [
                "execute if block ~~~1 air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~~~1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=2]",
                "execute if block ~~~-1 air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~~~-1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=2]",
                "execute if block ~1~~ air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=2]",
                "execute if block ~-1~~ air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~-1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=2]"
              ]
            }
          },
          {
            "condition": "q.block_state('wiki:depth') == 2",
            "run_command": {
              "command": [
                "execute if block ~~~1 air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~~~1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=1]",
                "execute if block ~~~-1 air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~~~-1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=1]",
                "execute if block ~1~~ air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=1]",
                "execute if block ~-1~~ air unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid run setblock ~-1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=1]"
              ]
            }
          },
          {
            "condition": "q.block_state('wiki:depth') == 5 && q.block_neighbor_has_any_tag(0, 1, 0, 'custom_fluid')",
            "run_command": {
              "command": [
                "execute if block ~~-1~ wiki:custom_fluid [\"wiki:depth\"=3] run setblock ~~-1~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=5]",
                "execute if block ~~-1~ wiki:custom_fluid [\"wiki:depth\"=2] run setblock ~~-1~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=5]",
                "execute if block ~~-1~ wiki:custom_fluid [\"wiki:depth\"=1] run setblock ~~-1~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=5]",
                "execute unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid if block ~1~~ air run setblock ~1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]",
                "execute unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid if block ~~~1 air run setblock ~~~1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]",
                "execute unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid if block ~-1~~ air run setblock ~-1~~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]",
                "execute unless block ~~-1~ air unless block ~~-1~ wiki:custom_fluid if block ~~~-1 air run setblock ~~~-1 wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=3]"
              ]
            }
          },
          // 下落逻辑
          {
            "run_command": {
              "command": "execute if block ~~-1~ air run setblock ~~-1~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=5]"
            }
          },
          {
            "condition": "q.block_neighbor_has_any_tag(0, -1, 0, 'flowing_custom_fluid')",
            "run_command": {
              "command": "setblock ~~-1~ wiki:custom_fluid [\"wiki:source\"=false,\"wiki:depth\"=5]"
            }
          }
        ]
      },
      "wiki:pick_up": {
        "die": {},
        "decrement_stack": {},
        "run_command": {
          "command": "give @s lava_bucket",
          "target": "other"
        }
      }
    },
    "permutations": [
      {
        "condition": "q.block_state('wiki:source')",
        "components": {
          // 允许通过指定物品拾取方块
          "minecraft:selection_box": {
            "origin": [-7.5, 0.5, -7.5],
            "size": [15, 13, 15]
          },
          "tag:custom_fluid_source": {}
        }
      },
      {
        "condition": "!q.block_state('wiki:source')",
        "components": {
          "tag:flowing_custom_fluid": {}
        }
      },
      {
        "condition": "q.block_state('wiki:depth') == 5",
        "components": {
          "minecraft:geometry": "geometry.fluid.5",
          "tag:custom_fluid_5": {}
        }
      },
      {
        "condition": "q.block_state('wiki:depth') == 4",
        "components": {
          "minecraft:geometry": "geometry.fluid.4",
          "tag:custom_fluid_4": {}
        }
      },
      {
        "condition": "q.block_state('wiki:depth') == 3",
        "components": {
          "minecraft:geometry": "geometry.fluid.3",
          "tag:custom_fluid_3": {}
        }
      },
      {
        "condition": "q.block_state('wiki:depth') == 2",
        "components": {
          "minecraft:geometry": "geometry.fluid.2",
          "tag:custom_fluid_2": {}
        }
      },
      {
        "condition": "q.block_state('wiki:depth') == 1",
        "components": {
          "minecraft:geometry": "geometry.fluid.1",
          "tag:custom_fluid_1": {}
        }
      }
    ]
  }
}
```
:::

</Spoiler>

## 流体桶

要放置自定义流体，您需要自定义桶物品。以下是流体桶的JSON配置，请将`custom_fluid`替换为您的流体名称。

<Spoiler title="自定义流体桶JSON">

::: code-group
```json [BP/items/custom_fluid_bucket.json]
{
  "format_version": "1.20.30",
  "minecraft:item": {
    "description": {
      "identifier": "wiki:custom_fluid_bucket",
      "menu_category": {
        "category": "items"
      }
    },
    "components": {
      "minecraft:max_stack_size": 1,
      "minecraft:icon": {
        "texture": "custom_fluid_bucket" // 在`RP/textures/item_texture.json`中定义的短名称
      },
      "minecraft:block_placer": {
        "block": "wiki:custom_fluid"
      }
    }
  }
}
```
:::

</Spoiler>

## 脚本

该脚本为流体添加了玩家漂浮/下沉功能及雾气效果。将您的新流体ID添加到`fluids`字符串数组中即可生效。

::: code-group
```json [BP/manifest.json]
{
  "modules": [
    ...
    {
      "type": "script",
      "language": "javascript",
      "entry": "fluids.js",
      "uuid": ...,
      "version": [1, 0, 0]
    }
  ],
  "dependencies": [
    {
      "module_name": "@minecraft/server",
      "version": "1.6.0-beta"
    }
  ]
}
```
:::

<Spoiler title="流体运动与雾气脚本">

::: code-group
```javascript [BP/scripts/fluids.js]
import { system, world } from "@minecraft/server";

const fluids = ["wiki:custom_fluid"];

system.runInterval(() => {
  const players = world.getPlayers();

  for (const player of players) {
    // 流体效果
    if (
      fluids.includes(world.getDimension(player.dimension.id).getBlock({ ...player.location, y: player.location.y + 1 }).typeId) ||
      fluids.includes(world.getDimension(player.dimension.id).getBlock(player.location).typeId)
    ) {
      player.addEffect("slowness", 3, { amplifier: 2, showParticles: false });
      player.addEffect("slow_falling", 4, { showParticles: false });
      if (player.isJumping) {
        player.addEffect("levitation", 3, { amplifier: 2, showParticles: false });
      }
    }
    // 流体雾气
    if (fluids.includes(world.getDimension(player.dimension.id).getBlock({ ...player.location, y: player.location.y + 1.63 }).typeId)) {
      player.runCommand("fog @s push wiki:custom_fluid_fog fluid_fog");
    } else {
      player.runCommand("fog @s remove fluid_fog");
    }
  }
});
```
:::

</Spoiler>

## 最终成果

完成后的BP文件夹结构应如下所示：

<FolderView
  :paths="[
    'BP/blocks/custom_fluid.json',
    'BP/items/custom_fluid_bucket.json',
    'BP/scripts/fluids.js',
    'RP/fogs/custom_fluid.json'
  ]"
></FolderView>

## 示例包下载

如果遇到问题或需要完整模板文件，可在此下载。该资源包包含流体所需的所有必要文件。

<BButton
  link="https://github.com/Bedrock-OSS/wiki-addon/releases/download/download/custom_fluids.mcaddon"
  color=blue
>下载MCADDON</BButton>