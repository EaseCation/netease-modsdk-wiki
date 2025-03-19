---
title: 伪方块
category: 教程
tags:
    - 中级
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - MedicalJewel105
    - aexer0e
    - ThijsHankelMC
    - QuazChick
---

# 伪方块

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: warning 实验性功能
需要启用 `Holiday Creator Features` 来触发方块事件。
:::

当你的方块需要实现Minecraft原生不支持的功能时，可以通过创建具有方块特征的实体来模拟实现。

## 创建碰撞箱

[固体实体教程](/entities/solid-entities)中介绍了四种创建碰撞箱的方式，涉及 `runtime_identifiers`、方块和组件组合方案。

## 基础组件

以下组件是让实体模拟方块行为的关键配置。注意不要添加 `"minecraft:physics": {}` 组件，否则实体会受重力影响坠落或与水/岩浆等方块发生异常碰撞。

::: code-group
```json [BP/entities/your_entity.json#minecraft:entity/components]
{
  // 需要击退抗性来防止实体被击退
  "minecraft:knockback_resistance": {
    "value": 1
  },
  // 控制实体是否可被推动
  "minecraft:pushable": {
    "is_pushable": false,
    "is_pushable_by_piston": true
  },
  // 设置实体可被推动的穿透距离
  "minecraft:push_through": {
    "value": 1
  },
  // 使实体无敌
  "minecraft:damage_sensor": {
    "triggers": [
      {
        "deals_damage": false,
        "cause": "all"
      }
    ]
  }
}
```
:::

## 实体旋转对齐

通过数学计算实现实体旋转对齐：

::: code-group
```json [动画控制器]
"rotation": [ 0, "-q.body_y_rotation + (Math.round(q.body_y_rotation / 90) * 90)", 0 ]
```
:::

将此代码应用在模型动画的核心分组（包含其他所有分组的父级），确保X轴和Z轴旋转中心点为0以避免视觉错位。同时避免添加以下组件：

-   `"minecraft:behavior.look_at_entity": {}`
-   `"minecraft:behavior.look_at_player": {}`
-   `"minecraft:behavior.look_at_target": {}`

这些组件会改变目标Y轴旋转角度，导致模型异常位移。同时也不要添加行走类组件。

## 实体位置对齐

位置对齐的实现较为复杂，需分步操作：

1. 在 `minecraft:entity_spawned` 事件中生成临时方块
2. 通过指令生成虚拟实体
3. 将虚拟实体转换为目标实体

::: code-group
```json [BP/entities/your_entity.json#minecraft:entity/events]
// 原实体中的事件
"minecraft:entity_spawned": {
  "add": {
    "components_groups": [
        "despawn" // 需要移除初始实体
    ]
  },
  "run_command": {
    "command": [
        "setblock ~~~ wiki:align"
    ]
  }
}
```
:::

::: code-group
```json [BP/entities/your_entity.json#minecraft:entity/component_groups]
// 原实体中的组件组
"component_groups": {
  "despawn": {
    "minecraft:despawn": {}
  }
}
```
:::

用于生成虚拟实体的对齐方块配置：

::: code-group
```json [BP/blocks/your_dummy_block.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:align"
    },
    "components": {
      "minecraft:light_dampening": 0,
      "minecraft:collision_box": false,
      "minecraft:selection_box": false,
      "minecraft:loot": "loot_tables/empty.json",
      "minecraft:geometry": "geometry.empty",
      "minecraft:material_instances": {
        "*": {
          "texture": "empty"
        }
      },
      "minecraft:destructible_by_mining": {
        "seconds_to_destroy": 2
      },
      "minecraft:on_placed": {
        "event": "wiki:event"
      }
    },
    "events": {
      "wiki:event": {
        "run_command": {
          "command": [
            "setblock ~~~ air", // 移除临时方块
            "summon wiki:dummy_align" // 生成虚拟实体
          ]
        }
      }
    }
  }
}
```
:::

虚拟实体的转换配置：

::: code-group
```json [BP/entities/your_dummy_entity.json]
{
  "format_version": "1.13.0",
  "minecraft:entity": {
    "description": {
      "identifier": "wiki:dummy_align", // 虚拟实体用于避免触发原实体的生成事件
      "is_spawnable": false,
      "is_summonable": true,
      "is_experimental": false
    },
    "component_groups": {
      "transform": {
        "minecraft:transformation": {
          "into": "wiki:your_entity",
          "delay": 0
        }
      }
    },
    "components": {
      "minecraft:physics": {
        "has_gravity": false
      },
      "minecraft:collision_box": {
        "width": 0.1,
        "height": 0.1
      },
      "minecraft:damage_sensor": {
        "triggers": {
          "cause": "all",
          "deals_damage": false
        }
      }
    },
    "events": {
      "minecraft:entity_spawned": {
        "add": {
          "component_groups": ["transform"]
        }
      }
    }
  }
}
```
:::

## 裂纹纹理效果

为实体添加原生方块的破坏裂纹效果：

1. 添加原版裂纹纹理（兼容材质包）
2. 创建专用几何体
3. 配置渲染控制器

::: code-group
```json [RP/entity/your_entity.json#description]
"textures": {
  "default": "textures/entity/your_texture",
  "destroy_stage_0": "textures/environment/destroy_stage_0",
  "destroy_stage_1": "textures/environment/destroy_stage_1",
  "destroy_stage_2": "textures/environment/destroy_stage_2",
  "destroy_stage_3": "textures/environment/destroy_stage_3",
  "destroy_stage_4": "textures/environment/destroy_stage_4",
  "destroy_stage_5": "textures/environment/destroy_stage_5",
  "destroy_stage_6": "textures/environment/destroy_stage_6",
  "destroy_stage_7": "textures/environment/destroy_stage_7",
  "destroy_stage_8": "textures/environment/destroy_stage_8",
  "destroy_stage_9": "textures/environment/destroy_stage_9"
}
```
:::

创建防Z轴冲突的几何体：

::: code-group
```json [RP/entity/your_entity.json#description]
"geometry": {
    "default": "geometry.your_geometry",
    "broken": "geometry.broken"
}
```
:::

配置动态纹理渲染控制器：

::: code-group
```json [RP/render_controllers/my_entity.json]
"controller.render.broken": {
  "arrays": {
    "textures": {
      "array.broken": [
        "texture.destroy_stage_9",
        "texture.destroy_stage_8",
        "texture.destroy_stage_7",
        "texture.destroy_stage_6",
        "texture.destroy_stage_5",
        "texture.destroy_stage_4",
        "texture.destroy_stage_3",
        "texture.destroy_stage_2",
        "texture.destroy_stage_1",
        "texture.destroy_stage_0",
        "texture.normal"
      ]
    }
  },
  "geometry": "Geometry.broken",
  "materials": [
    {
      "*": "Material.default"
    }
  ],
  "textures": [
    "array.broken[q.health * 1]" // 根据实体生命值调整参数：10生命值保持1倍，20生命值改为0.5，40生命值改为0.25...
  ]
}
```
:::