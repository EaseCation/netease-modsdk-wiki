---
title: 方块组件
description: 方块组件用于改变方块在世界中的外观和功能。
category: 常规
nav_order: 2
mentions:
    - SirLich
    - solvedDev
    - yanasakana
    - SmokeyStack
    - MedicalJewel105
    - aexer0e
    - Chikorita-Lover
    - Luthorius
    - TheDoctor15
    - XxPoggyisLitxX
    - TheItsNameless
    - ThomasOrs
    - Kaioga5
    - QuazChick
---

# 方块组件 Components

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 格式版本 & 最低引擎版本 `1.20.30`
在创建自定义方块时使用最新格式版本可获取最新功能和改进。本wiki旨在提供关于自定义方块的最新信息，当前目标格式版本为`1.20.30`。
:::
:::danger <nbsp/>
每个组件在同一时间只能有一个实例生效。重复的组件将被最新的[permutation（条件置换）](/blocks/block-permutations)覆盖。
:::

需要事件触发组件？[点击此处查看！](/blocks/block-events#event-triggers)

## 应用组件

方块组件用于改变方块在世界中的外观和功能。它们被应用在`minecraft:block`或其[permutation（条件置换）](/blocks/block-permutations)的`components`子项中。

::: code-group

```json [BP/blocks/lamp.json]
{
  "format_version": "1.20.30",
  "minecraft:block": {
    "description": {
      "identifier": "wiki:lamp",
      "menu_category": {
        "category": "items"
      }
    },
    "components": {
      "minecraft:light_dampening": 0,
      "minecraft:light_emission": 15,
      "minecraft:map_color": [210, 200, 190],
      "minecraft:geometry": "geometry.lamp",
      "minecraft:material_instances": {
        "*": {
          "texture": "lamp"
        },
        "shade": {
          "texture": "lamp_shade"
        }
      }
    }
  }
}
```
:::

## 碰撞箱

设置方块实体/粒子的碰撞箱，单位为<abbr title="1/16方块单位">像素</abbr> - 必须包含在基础方块单位内（16×16×16）。

- 原点从方块的水平中点和垂直底部开始计算，向东北方向延伸。
- 尺寸从原点开始计算，向东北方向延伸。

**也可定义为布尔值：**

- `false`时实体可穿过方块
- `true`时设置单位大小的立方体作为碰撞箱

**默认值：** `true`

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.50及以上。_

::: code-group
```json [minecraft:block > components]
"minecraft:collision_box": {
  "origin": [-8, 0, -8],
  "size": [16, 16, 16]
}
```
:::

::: code-group
```json [minecraft:block > components]
"minecraft:collision_box": false
```
:::

## 工作台

将方块变为工作台，交互时打开合成界面。

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.50及以上。_

::: code-group
```json [minecraft:block > components]
"minecraft:crafting_table": {
  "table_name": "Wiki工作台", // 在合成菜单中显示的名称，可本地化
  "crafting_tags": ["crafting_table", "wiki_workbench"] // 用于配方文件的标签
}
```
:::

## 可被爆炸破坏

设置方块对爆炸破坏的抗性。

**也可定义为布尔值：**

- `false`时不可被爆炸破坏
- `true`时爆炸抗性为`0`

**默认值：** `true`

::: code-group
```json [minecraft:block > components]
"minecraft:destructible_by_explosion": {
  "explosion_resistance": 20
}
```
:::

::: code-group
```json [minecraft:block > components]
"minecraft:destructible_by_explosion": false // 不可被爆炸破坏
```
:::

## 可被挖掘破坏

设置挖掘破坏所需时间。

**也可定义为布尔值：**

- `false`时不可被挖掘破坏
- `true`时可被瞬间破坏

**默认值：** `true`

::: code-group
```json [minecraft:block > components]
"minecraft:destructible_by_mining": {
  "seconds_to_destroy": 0.5
}
```
:::

::: code-group
```json [minecraft:block > components]
"minecraft:destructible_by_mining": false // 不可被挖掘破坏
```
:::

## 显示名称

设置当鼠标悬停在物品栏和快捷栏中的方块时显示的文本对应的语言文件键名。

如果给定的字符串没有对应的翻译，将直接显示原始字符串。

**注意**：在某些情况下Minecraft可能会回退使用`tile.<标识符>.name`。

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.60及以上。_

::: code-group

```json [minecraft:block > components]
"minecraft:display_name": "tile.example_block.red.name"
```
:::

::: code-group

```c [RP/texts/zh_CN.lang]
tile.example_block.red.name=红色示例方块
```
:::

## 可燃性

设置方块的可燃性参数。

**也可定义为布尔值：**

- `false`时方块不会着火或被火焰破坏
- `true`时将使用下方示例值

**默认值：** `false`

::: code-group

```json [minecraft:block > components]
"minecraft:flammable": {
  "catch_chance_modifier": 5, // 影响方块在火源旁被点燃的几率
  "destroy_chance_modifier": 20 // 影响方块在燃烧时被火焰破坏的几率
}
```
:::

::: code-group

```json [minecraft:block > components]
"minecraft:flammable": false // 默认值 - 方块不会自然引燃，但可被直接点燃
```
:::

## 摩擦力

设置方块表面摩擦力（0.0至0.9的小数）。数值越小表面越滑。

**原版示例值：**

- 泥土：`0.4`
- 冰：`0.02`

**默认值：** `0.4`

::: code-group

```json [minecraft:block > components]
"minecraft:friction": 0.4
```
:::

## 几何模型

设置方块使用的模型。当与其他方块相交时，模型不会应用面剔除。

**自定义方块模型限制：**

- 模型尺寸限制为30×30×30<abbr title="1/16方块单位">像素</abbr>
- 每个轴上至少要有1像素位于基础16×16×16方块内
- 模型的位置绝对边界为原点各方向30像素。只要遵守第二条规则，模型可放置在这些边界内的任意位置

**启用时：**

- 方块变为可呼吸
- 方块不再传导红石信号

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.40及以上。_

::: code-group

```json [minecraft:block > components]
"minecraft:geometry": "geometry.example_block" // 来自'RP/models/entity'或'RP/models/blocks'文件夹的几何模型标识符
```
:::

---

### 骨骼可见性

隐藏模型中骨骼的直接子立方体。

**Molang表达式需遵守[条件置换限制](/blocks/block-permutations#permutation-conditions)。**

_自格式版本1.20.10起支持`bone_visibility`中的Molang表达式。_

::: code-group

```json [minecraft:block > components]
"minecraft:geometry": {
  "identifier": "geometry.example_block", // 来自'RP/models/entity'或'RP/models/blocks'文件夹的几何模型标识符
  "bone_visibility": {
    "wiki_bone": false, // 隐藏该骨骼中的立方体
    "conditional_bone": "q.block_state('wiki:example_state') == 3", // 使用Molang表达式条件设置可见性
    "another_bone": true // true为默认值，无实际效果
  }
}
```
:::

## 光照衰减

设置光线穿过方块时的衰减程度（0-15整数） - 数值越大透光越少。

**原版示例值：**

- 泥土和染色玻璃：`15`
- 铁栏杆和玻璃板：`0`

**默认值：** `15`

::: code-group

```json [minecraft:block > components]
"minecraft:light_dampening": 7
```
:::

## 光照发射

设置方块发出的光照强度（0-15整数）。

**原版示例值：**

- 蛙明灯：`15`
- 红石火把（点亮）：`7`

**默认值：** `0`

::: code-group

```json [minecraft:block > components]
"minecraft:light_emission": 10
```
:::

## 战利品表

设置方块被破坏时掉落的战利品（无视`精准采集`附魔）。

**若省略则掉落方块本身。**

::: code-group

```json [minecraft:block > components]
"minecraft:loot": "loot_tables/blocks/custom_block.json"
```
:::

## 地图颜色

设置方块在地图上的显示颜色（十六进制字符串或[R, G, B]数组，0-255）。

**若省略则地图不显示该方块。**

::: code-group

```json [minecraft:block > components]
"minecraft:map_color": "#ffffff"
```
:::

::: code-group

```json [minecraft:block > components]
"minecraft:map_color": [255, 255, 255]
```
:::

## 材质实例

配置方块的渲染参数，包括纹理和光照处理。

- 所有实例必须使用相同的渲染方法
- 与其他方块相交时，方块面会无条件变暗

材质实例可与`RP/blocks.json`条目结合使用，创建具有类不透明属性的方块。这主要用于在[自定义玻璃方块](/blocks/custom-glass-blocks)上启用面剔除。

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.40及以上。_

### 渲染方法

渲染方法本质上控制方块在世界中的显示方式，类似于实体的材质。以下是各类型的关键属性：

| 渲染方法         | _透明度_ | _半透明性_ | _背面剔除_ | 原版示例                 |
| ---------------- | :------: | :--------: | :--------: | ------------------------ |
| opaque（默认）   |    ❌    |     ❌     |     ✔️     | 泥土、石头、混凝土       |
| double_sided     |    ❌    |     ❌     |     ❌     | 无 - 用于不透明2D平面    |
| alpha_test       |    ✔️    |     ❌     |     ❌     | 藤蔓、铁轨、树苗         |
| blend            |    ✔️    |     ✔️     |     ✔️     | 玻璃、信标、蜂蜜块       |

- **_透明度_** - 完全透明区域
- **_半透明性_** - 半透明区域
  - 半透明像素在UI渲染中显示为不透明
- **_背面剔除_** - 从背面观察时面不可见
  - 没有背面剔除的渲染方法在远处会消失（基于迷雾/渲染距离）
  - 在UI渲染中始终启用背面剔除

::: code-group

```json [minecraft:block > components]
"minecraft:material_instances": {
  // '*' 为必需实例 - 方块的默认实例（也用于破坏粒子）
  // 通配符遵循渲染控制器语法
  // 内置实例名包括'up', 'down', 'north', 'east', 'south'和'west'
  "*": {
    "texture": "texture_name", // 在`RP/textures/terrain_textures.json`中定义的短名称
    "render_method": "blend", // 上表中的渲染方法之一
    "face_dimming": true, // 默认true；是否根据方向调暗该材质的表面？
    "ambient_occlusion": true // 默认true；是否根据周围方块生成阴影？
  }
}
```
:::

### 自定义实例名称

:::tip
可在Blockbench中通过右键立方体并打开`材质实例`来定义自定义材质实例名称。
:::

可在材质实例中定义自定义实例名称，可被内置实例名称引用，或在方块模型中引用。

::: code-group

```json [minecraft:block > components]
"minecraft:material_instances": {
  "*": {
    "texture": "texture_name",
    "render_method": "blend" // 必须与其他实例匹配
  },
  // 自定义实例名称
  "end": {
    "texture": "texture_name_end",
    "render_method": "blend" // 必须与其他实例匹配
  },
  "up": "end",
  "down": "end",
  // 模型中定义的实例名称：
  "flower": {
    "texture": "texture_name_flower",
    "render_method": "blend" // 必须与其他实例匹配
  }
}
```
:::

## 放置过滤器

配置方块可存在的条件。当条件不满足时，方块将无法放置；若已放置则会弹出。

**`block_filter`最多可包含64个条目。**

**若省略，方块可被放置并存在于任何表面。**

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.60及以上。_

::: code-group

```json [minecraft:block > components]
"minecraft:placement_filter": {
  "conditions": [
    {
      "allowed_faces": ["up"], // 可包含'up', 'down', 'north', 'east', 'south', 'west'和'side'
      "block_filter": [
        // 测试标识符
        "minecraft:dirt",
        // 测试标签
        { "tags": "!q.any_tag('stone', 'wiki_tag')" }
      ]
    }
  ]
}
```
:::

查看[此页面](/blocks/block-tags)获取原版标签及相关方块列表。

## 选择箱

设置方块的可选区域（点击框），单位为<abbr title="1/16方块单位">像素</abbr> - 必须包含在基础方块单位内（16×16×16）。

- 原点从方块的水平中点和垂直底部开始计算，向东北方向延伸。
- 尺寸从原点开始计算，向东北方向延伸。

**也可定义为布尔值：**

- `false`时实体可穿过方块
- `true`时设置单位大小的立方体作为碰撞箱

**默认值：** `true`

_自实验性玩法`Holiday Creator Features`中发布，适用于格式版本1.19.60及以上。_

::: code-group

```json [minecraft:block > components]
"minecraft:selection_box": {
  "origin": [-8, 0, -8],
  "size": [16, 16, 16]
}
```
:::

或：

::: code-group

```json [minecraft:block > components]
"minecraft:selection_box": false
```
:::

## 变换

允许对方块进行平移、缩放和旋转（包含视觉和功能变化）。

**变换后的模型不得超过[几何模型限制](#geometry)。**

:::tip
学习如何应用[可旋转方块](/blocks/rotatable-blocks)，就像熔炉和生物头颅一样根据放置方向旋转！
:::

::: code-group

```json [minecraft:block > components]
"minecraft:transformation": {
  "translation": [-5, 8, 0],
  "rotation": [90, 180, 0],
  "scale": [0.5, 1, 0.5],
}
```
:::

## 单位立方体（实验性功能） {#unit-cube}

:::warning 实验性功能
此组件需要启用`Holiday Creator Features`实验性玩法，未来可能会被移除/修改。
:::

将方块变为16×16×16立方体，覆盖`minecraft:geometry`设置。

**启用时：**

- 方块变为不可呼吸
- 方块可传导红石信号

**如果方块的纹理/模型不需要根据条件置换改变，请在`RP/blocks.json`中定义纹理以避免使用此实验性组件。**

::: code-group

```json [minecraft:block > components]
"minecraft:unit_cube": {}
```

:::