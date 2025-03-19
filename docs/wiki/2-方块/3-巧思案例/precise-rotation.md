---
title: 精确旋转
category: 教程
tags:
    - experimental
    - expert
mentions:
    - QuazChick
---

# 精确旋转

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip 格式与最低引擎版本 `1.20.30`
本教程假定您已具备方块的进阶知识与Molang基础。
开始前建议先阅读[方块指南](/blocks/blocks-intro)。
:::

::: warning 实验性功能
需要启用 `Holiday Creator Features` 来触发事件。
:::

本教程将引导您实现可支持次级方位旋转的方块（如爬行者头颅与告示牌），通过一个包含此类旋转类型的"贝壳"方块作为实例进行讲解。

*查看常规旋转方式？请前往[此页面](/blocks/rotatable-blocks)！*

![随机朝向的自定义贝壳方块](/assets/images/blocks/precise-rotation/showcase.png)

特性概览:

-   可附着于方块顶部，具备16种旋转角度
-   可附着于方块的侧表面（北、东、南、西）
-   旋转行为与原版生物头颅一致，且无需依赖方块实体性能消耗！

## 方块模型

要实现更精确的旋转机制，您的方块模型需额外添加若干骨骼节点。

实现地面精确旋转需要4个基础骨骼节点，每个对应不同的Y轴旋转角度:

-   `up_0` (Y旋转角度 = 0)
-   `up_22_5` (Y旋转角度 = 22.5)
-   `up_45` (Y旋转角度 = 45)
-   `up_67_5` (Y旋转角度 = 67.5)

**上述角度值采用顺时针方向递增**

这些骨骼除旋转参数外，在结构上通常是互为复制的。

:::tip

建议将所有骨骼的枢轴点设置于 `[0, 0, 0]` ，以确保其围绕方块中心旋转。

:::

此外，还需一个 `side` 骨骼用于侧表面附着时的定位调整。

下方展示的"贝壳"模型结构可供参考:

![](/assets/images/blocks/precise-rotation/model_bones.png)

<Spoiler title="贝壳模型实例">

::: code-group
```json [RP/models/blocks/shell.geo.json]
{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.shell",
        "texture_width": 16,
        "texture_height": 16,
        "visible_bounds_width": 3,
        "visible_bounds_height": 2.5,
        "visible_bounds_offset": [0, 0.75, 0]
      },
      "bones": [
        {
          "name": "shell",
          "pivot": [0, 0, 0]
        },
        {
          "name": "up_0",
          "parent": "shell",
          "pivot": [0, 0, 0],
          "cubes": [
            {
              "origin": [-3, 0, -3],
              "size": [6, 3, 6],
              "uv": {
                "north": { "uv": [0, 6], "uv_size": [6, 3] },
                "east": { "uv": [0, 6], "uv_size": [6, 3] },
                "south": { "uv": [0, 6], "uv_size": [6, 3] },
                "west": { "uv": [0, 6], "uv_size": [6, 3] },
                "up": { "uv": [6, 6], "uv_size": [-6, -6] },
                "down": { "uv": [6, 6], "uv_size": [-6, -6] }
              }
            }
          ]
        },
        {
          "name": "up_22_5",
          "parent": "shell",
          "pivot": [0, 0, 0],
          "rotation": [0, 22.5, 0],
          "cubes": [
            {
              "origin": [-3, 0, -3],
              "size": [6, 3, 6],
              "uv": {
                "north": { "uv": [0, 6], "uv_size": [6, 3] },
                "east": { "uv": [0, 6], "uv_size": [6, 3] },
                "south": { "uv": [0, 6], "uv_size": [6, 3] },
                "west": { "uv": [0, 6], "uv_size": [6, 3] },
                "up": { "uv": [6, 6], "uv_size": [-6, -6] },
                "down": { "uv": [6, 6], "uv_size": [-6, -6] }
              }
            }
          ]
        },
        {
          "name": "up_45",
          "parent": "shell",
          "pivot": [0, 0, 0],
          "rotation": [0, 45, 0],
          "cubes": [
            {
              "origin": [-3, 0, -3],
              "size": [6, 3, 6],
              "uv": {
                "north": { "uv": [0, 6], "uv_size": [6, 3] },
                "east": { "uv": [0, 6], "uv_size": [6, 3] },
                "south": { "uv": [0, 6], "uv_size": [6, 3] },
                "west": { "uv": [0, 6], "uv_size": [6, 3] },
                "up": { "uv": [6, 6], "uv_size": [-6, -6] },
                "down": { "uv": [6, 6], "uv_size": [-6, -6] }
              }
            }
          ]
        },
        {
          "name": "up_67_5",
          "parent": "shell",
          "pivot": [0, 0, 0],
          "rotation": [0, 67.5, 0],
          "cubes": [
            {
              "origin": [-3, 0, -3],
              "size": [6, 3, 6],
              "uv": {
                "north": { "uv": [0, 6], "uv_size": [6, 3] },
                "east": { "uv": [0, 6], "uv_size": [6, 3] },
                "south": { "uv": [0, 6], "uv_size": [6, 3] },
                "west": { "uv": [0, 6], "uv_size": [6, 3] },
                "up": { "uv": [6, 6], "uv_size": [-6, -6] },
                "down": { "uv": [6, 6], "uv_size": [-6, -6] }
              }
            }
          ]
        },
        {
          "name": "side",
          "parent": "shell",
          "pivot": [0, 5, 8],
          "rotation": [90, 0, 0],
          "cubes": [
            {
              "origin": [-3, 5, 8],
              "size": [6, 3, 6],
              "uv": {
                "north": { "uv": [0, 6], "uv_size": [6, 3] },
                "east": { "uv": [0, 6], "uv_size": [6, 3] },
                "south": { "uv": [0, 6], "uv_size": [6, 3] },
                "west": { "uv": [0, 6], "uv_size": [6, 3] },
                "up": { "uv": [6, 6], "uv_size": [-6, -6] },
                "down": { "uv": [6, 6], "uv_size": [-6, -6] }
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

## 基础方块JSON

下方是待添加高级旋转功能的"贝壳"方块基础定义。

::: code-group
```json [BP/blocks/shell.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:shell",
      "menu_category": {
        "category": "nature"
      }
    },
    "components": {
      // `up` 表面的碰撞/选择框
      "minecraft:collision_box": {
        "origin": [-3, 0, -3],
        "size": [6, 3, 6]
      },
      "minecraft:selection_box": {
        "origin": [-3, 0, -3],
        "size": [6, 3, 6]
      },
      "minecraft:material_instances": {
        "*": {
          "texture": "shell" // 在 `RP/textures/terrain_texture.json` 中定义的短名称
        }
      },
      // 阻止方块附着于 `down` 表面
      "minecraft:placement_filter": {
        "conditions": [
          {
             "allowed_faces": ["up", "side"]
          }
        ]
      }
    }
  }
}
```
:::

## 方块状态

为实现头颅式旋转机制，需为方块添加2种状态参数：

::: code-group
```json [minecraft:block]
"description": {
  ...
  "traits": {
    // 方块附着面 - 默认为 `north`
    "minecraft:placement_position": {
      "enabled_states": ["minecraft:block_face"]
    }
  },
  "states": {
    // 当附着于 `up` 表面时的精确旋转参数
    "wiki:rotation": {
      "values": { "min": 0, "max": 15 } // 使用更方便的定义整数范围的语法
    }
  }
}
```
:::

## 旋转Molang表达式

相较于逐个定义每个 `wiki:rotation` 值的范围，运用[复合Molang表达式](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/molangintroduction#simple-vs-complex-expressions)配合除法运算可高效实现需求！

```c
// 转换玩家头部Y旋转角度至正值
t.positive_head_rot = q.head_y_rotation(0) + 360 * (q.head_y_rotation(0) != math.abs(q.head_y_rotation(0)));
// 计算头部旋转对应的十六分之一圆角（取整）
t.rotation = math.round(t.positive_head_rot / 22.5);

// 0与16代表重复旋转（0度与360度），故当值为16时返回0
return t.rotation != 16 ? t.rotation;
```

合并为单行表达式以便嵌入JSON：

::: code-group
```json [minecraft:block > components > minecraft:on_player_placing > condition]
"condition": "t.positive_head_rot = q.head_y_rotation(0) + 360 * (q.head_y_rotation(0) != math.abs(q.head_y_rotation(0))); t.rotation = math.round(t.positive_head_rot / 22.5); return t.rotation != 16 ? t.rotation;"
```
:::

## 应用旋转

现在通过Molang表达式动态设定方块属性!

通过事件在玩家放置方块时更新方块属性。此事件上下文可访问 `q.block_face` 与 `q.head_y_rotation`。

在方块JSON中添加以下组件与事件：

::: code-group
```json [minecraft:block]
"components": {
  ...
  "minecraft:on_player_placing": {
    "condition": "q.block_face == 1", // 精确旋转仅作用于 `up` 表面
    "event": "wiki:set_rotation"
  }
},
"events": {
  "wiki:set_rotation": {
    "set_block_property": {
      // 应用之前的Molang表达式设置rotation属性
      "wiki:rotation": "q.block_face == 1 ? { t.positive_head_rot = q.head_y_rotation(0) + 360 * (q.head_y_rotation(0) != math.abs(q.head_y_rotation(0))); t.block_rotation = math.round(t.positive_head_rot / 22.5); return t.block_rotation != 16 ? t.block_rotation; };"
    }
  }
}
```
:::

<br>

接着，使用[置换](/blocks/block-permutations)定义基础朝向旋转，由模型中的精细骨骼进一步细化。

按顺序在方块JSON中添加以下置换条件：

::: code-group
```json [minecraft:block]
"permutations": [
  {
    "condition": "q.block_property('wiki:rotation') >= 4 || q.block_property('minecraft:block_face') == 'east'",
    "components": {
      "minecraft:transformation": { "rotation": [0, -90, 0] }
    }
  },
  {
    "condition": "q.block_property('wiki:rotation') >= 8 || q.block_property('minecraft:block_face') == 'south'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 180, 0] }
    }
  },
  {
    "condition": "q.block_property('wiki:rotation') >= 12 || q.block_property('minecraft:block_face') == 'west'",
    "components": {
      "minecraft:transformation": { "rotation": [0, 90, 0] }
    }
  }
]
```
:::

## 骨骼可见性

并非所有骨骼节点始终可见，因此需利用 `minecraft:geometry` 的骨骼可见性属性精确控制渲染。多个骨骼存在的目的是因为 `minecraft:transformation` 仅支持90度的整数倍旋转，而精确旋转需要22.5度的增量。

在方块组件中加入以下内容：

::: code-group
```json [minecraft:block > components]
"minecraft:geometry": {
  "identifier": "geometry.shell", // 第一步创建的模型
  "bone_visibility": {
    "up_0": "q.block_property('minecraft:block_face') == 'up' && !math