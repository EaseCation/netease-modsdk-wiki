---
title: JSON UI 入门指南
category: 通用
nav_order: 1
tags:
    - guide
mentions:
    - sermah
    - KalmeMarq
    - SirLich
    - solvedDev
    - Joelant05
    - GTB3NW
    - stirante
    - MedicalJewel105
    - r4isen1920
    - shanewolf38
    - LeGend077
    - mark-wiemer
    - TheItsNameless
    - ThomasOrs
---

# JSON UI 入门指南

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 简介

:::warning
JSON UI 已进入弃用阶段，推荐使用 [Ore UI](https://github.com/Mojang/ore-ui) 替代。请注意，任何使用 JSON UI 的附加包将在未来几年内失效。
:::

:::tip
本文概述了 JSON UI 的基础知识。如需更详细的文档，请查阅 [JSON UI 文档](/json-ui/json-ui-documentation)。
:::

游戏用户界面采用数据驱动模式，支持自定义修改。通过 JSON UI 系统，我们可以调整用户界面的渲染方式及部分交互行为。所有原版 UI 文件均存储在 `RP/ui/...` 文件夹中。

JSON UI 可能包含以下文件类型：

### 系统文件

这些是 JSON UI 的内置文件：

- `_global_variables.json` - 存储全局变量定义
- `_ui_defs.json` - 管理 UI 文件引用清单

### 屏幕文件

用于定义特定界面布局的文件：

- `hud_screen.json` - 显示包含快捷栏等游戏元素的 HUD 界面
- `inventory_screen.json` - 玩家背包界面
- 其他屏幕文件

### 模板文件

存储可复用 UI 组件的文件：

- `ui_common.json` - 包含通用组件（如设置界面的按钮模板）
- `ui_template_*.json` - 模块化组织的组件集合

## UI 定义文件

`_ui_defs.json` 通过数组形式引用所有 JSON UI 文件。

例如新增 `RP/ui/button.json` 和 `RP/my_ui/main_menu.json` 时，应如下配置：

::: code-group
```json [RP/ui/_ui_defs.json]
{
  "ui_defs": ["ui/button.json", "my_ui/main_menu.json"]
}
```
:::

- 必须包含从资源包根目录开始的完整文件路径（包括 `.json` 扩展名）
- 只需声明自建文件，无需包含原版或其他第三方文件
- 支持非 `RP/ui/...` 路径的文件引用
- 可使用非 `.json` 扩展名，但文件内容必须为合法 JSON

## 全局变量

在 `_global_variables.json` 中定义变量 `"$info_text_color"`：

::: code-group
```json [RP/ui/_global_variables.json]
{
  "$info_text_color": [0.8, 0.8, 0.8]
}
```
:::

其他 UI 文件可调用此变量：

::: code-group
```json [vanilla/my_ui/file1.json]
{
  "some_info": {
    ...
    "text": "Hey",
    "color": "$info_text_color"
  }
}
```

```json [vanilla/my_ui/file2.json]
{
  "info": {
    ...
    "text": "Information",
    "color": "$info_text_color"
  }
}
```
:::

- 支持定义多个变量（逗号分隔）
- 全局变量为单向常量，不可跨文件修改

## 命名空间

命名空间是 UI 文件的唯一标识符，用于跨文件引用元素。每个命名空间必须具有唯一名称。

示例命名空间 `one` 中的元素：

::: code-group
```json [vanilla/ui/file_a.json]
{
  "namespace": "one",
  "foobar": {...}
}
```
:::

在命名空间 `two` 中引用：

::: code-group
```json [vanilla/ui/file_b.json]
{
  "namespace": "two",
  "fizzbuzz@one.foobar": {...}
}
```
:::

跨命名空间引用格式：
```json
"[元素名称]@[命名空间].[被引用元素]"
```

## 屏幕系统

屏幕文件包含游戏在特定场景调用的界面布局（如背包界面）。每个屏幕文件必须包含根元素供游戏直接访问。

屏幕文件具有数据访问隔离特性。

## UI 元素

UI 元素是 JSON UI 的基本组成单元，每个命名空间内的元素名称必须唯一。

示例文本元素：

::: code-group
```json [vanilla/ui/example_file.json]
{
  "test_element": {
    "type": "label",
    "text": "Hello World"
  }
}
```
:::

### 元素类型

常用元素类型 (`type` 属性值)：

- `label` - 文本对象
- `image` - 图像渲染
- `button` - 交互按钮
- `panel` - 层叠容器
- `stack_panel` - 流式布局容器
- `grid` - 网格模板渲染
- `factory` - 动态元素生成器
- `custom` - 自定义渲染器
- `screen` - 根屏幕元素

## 动画系统

使用 `anim_type` 属性创建动画元素，可通过 `anims` 数组应用于其他元素。

示例动画元素：

::: code-group
```json [vanilla/ui/example_file.json]
{
  "namespace": "example_nm",

  "anim_size": {
    "anim_type": "size",
    "easing": "linear",
    "from": [ "100%", 27 ],
    "to": [ "100% + 3px", 30 ],
    "duration": 1.25
  },

  "anim_alpha": {
    "anim_type": "alpha",
    "easing": "linear",
    "from": 1,
    "to": 0.5,
    "duration": 2
  },

  "test_animated_element": {
    ...
    "anims": [
      "@example_nm.anim_size",
      "@example_nm.anim_alpha"
    ]
  }
}
```
:::

### 动画类型

支持动画类型 (`anim_type`)：

- `alpha` - 透明度动画
- `offset` - 位移动画
- `size` - 尺寸动画
- `flip_book` - 翻页动画
- `uv` - UV 贴图动画
- `color` - 颜色过渡
- `wait` - 等待延时
- `aseprite_flip_book` - 精灵表动画
- `clip` - 裁剪动画

## 操作符系统

支持在属性中使用运算符，结合 `$变量` 和 `#绑定` 实现动态计算。

| 运算符               | 符号 | 示例                                                                 |
|----------------------|------|----------------------------------------------------------------------|
| 加法                 | +    | `"100% + 420px"` `($text + ' my')`                                   |
| 减法                 | -    | `"100% - 69px"` `($index - 13)`                                      |
| 乘法                 | *    | `($var * 9)`                                                         |
| 除法                 | /    | `(#value / 2)`                                                       |
| 等于                 | =    | `($var = 'text')`                                                    |
| 大于                 | >    | `(#value > 13)`                                                      |
| 小于                 | <    | `($var < 4)`                                                         |
| 大于等于             | >=   | `(#value >= 2)`                                                      |
| 小于等于             | <=   | `(#value <= 2)`                                                      |
| 逻辑与               | and  | `($cond1 and $cond2)`                                                |
| 逻辑或               | or   | `($condA or $condB)`                                                 |
| 逻辑非               | not  | `(not #flag)`                                                        |

## 变量系统

除全局变量外，支持在元素内定义局部变量。

### 变量定义

使用 `$` 前缀定义变量，支持多种数据类型：

::: code-group
```json [vanilla/ui/example_file.json]
{
  "test_element": {
    // 定义变量
    "$array_var": [10, 10],
    "$str_var": "foobar",
    
    // 使用变量
    "size": "$array_var",
    "text": "$str_var",
    
    // 动态引用模板
    "controls": [
      { "foobar@$str_var": {} }
    ]
  }
}
```
:::

### 变量继承

支持通过元素继承覆盖变量：

::: code-group
```json [vanilla/ui/example_file.json]
{
  "base_element": {
    "$var1": 1,
    "$var2": false
  },

  "derived_element@base_element": {
    "$var1": 2 // 覆盖父元素变量
  }
}
```
:::

## 数据绑定

通过 `bindings` 实现数据源与元素的动态关联。

### 简单绑定

::: code-group
```json [vanilla/ui/example_file.json]
{
  "label": {
    "type": "label",
    "text": "#hardtext",
    "bindings": [
      {
        "binding_name": "#hardtext"
      }
    ]
  }
}
```
:::

### 重定向绑定

::: code-group
```json [vanilla/ui/example_file.json]
{
  "label": {
    "type": "label",
    "text": "#display_text",
    "bindings": [
      {
        "binding_name": "#source_data",
        "binding_name_override": "#display_text"
      }
    ]
  }
}
```
:::

### 跨元素绑定

::: code-group
```json
{
  "status_panel": {
    "bindings": [
      {
        "binding_type": "view",
        "source_control_name": "my_toggle",
        "source_property_name": "#state",
        "target_property_name": "#visible"
      }
    ]
  }
}
```
:::

## 条件渲染

通过变量和绑定实现动态显示控制。

### 变量条件

::: code-group
```json [vanilla/ui/hud_screen.json]
{
  "hud_actionbar_text/actionbar_message": {
    "$atext": "$actionbar_text",
    "visible": "(not ($atext = 'hello world'))"
  }
}
```
:::

### 工厂条件

::: code-group
```json [vanilla/ui/hud_screen.json]
{
  "conditional_image": {
    "type": "image",
    "texture": "textures/ui/Black",
    "$atext": "$actionbar_text",
    "visible": "($atext = 'show_image')"
  },

  "image_factory": {
    "type": "panel",
    "factory": {
      "name": "hud_actionbar_text_factory",
      "control_ids": {
        "hud_actionbar_text": "conditional_image@hud.conditional_image"
      }
    }
  }
}
```
:::

通过结合操作符系统，可实现复杂的条件逻辑判断，为界面交互提供灵活的控制能力。

::: code-group
```json [vanilla/ui/hud_screen.json]
```
:::

### 使用绑定的条件渲染

根据上文提到的操作栏示例，你可能会认为标题也使用变量。但实际情况并非如此。标题使用绑定（bindings）来获取数据，如下所示。

::: code-group
```json [vanilla/ui/hud_screen.json]
{
...
  "hud_title_text": {
    "type": "stack_panel",
    "orientation": "vertical", // 垂直排列
    "offset": [ 0, -19 ],      // 位置偏移
    "layer": 1,                // 渲染层级
    "alpha": "@hud.anim_title_text_alpha_in", // 透明度动画
    "propagate_alpha": true,   // 透明度继承
    "controls": [              // 子控件集合
      {
        "title_frame": {
          "type": "panel",     // 面板类型
          "size": [ "100%", "100%cm" ], // 尺寸设置
          "controls": [
            {
              "title_background": {
                "type": "image",       // 图像类型
                "size": [ "100%sm + 30px", "100%sm + 6px" ], // 动态尺寸计算
                "texture": "textures/ui/hud_tip_text_background", // 纹理路径
                "alpha": "@hud.anim_title_background_alpha_in" // 背景透明度动画
              }
            },
            {
              "title": {
                "type": "label",       // 文本标签类型
                "anchor_from": "top_middle", // 锚点起始位置
                "anchor_to": "top_middle",   // 锚点目标位置
                "color": "$title_command_text_color", // 文字颜色变量
                "text": "#text",       // 文本内容绑定
                "layer": 1,           // 渲染层级
                "localize": false,    // 关闭本地化
                "font_size": "extra_large", // 超大字号
                "variables": [        // 条件变量组
                  {
                    "requires": "(not $title_shadow)", // 无阴影条件
                    "$show_shadow": false  // 关闭阴影显示
                  },
                  {
                    "requires": "$title_shadow", // 启用阴影条件
                    "$show_shadow": true   // 启用阴影显示
                  }
                ],
                "shadow": "$show_shadow",  // 阴影状态绑定
                "text_alignment": "center", // 文本居中
                "offset": [ 0, 6 ],        // 位置微调
                "bindings": [              // 数据绑定组
                  {
                    "binding_name": "#hud_title_text_string", // 原始绑定名
                    "binding_name_override": "#text",          // 覆盖目标属性
                    "binding_type": "global"                   // 全局绑定类型
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
...
}
```
:::

我们需要在文本组件中添加另一个绑定对象来控制可见性。注意`#visible`属性会通过绑定直接控制元素可见性。以下示例将不会渲染"hello world"标题，但会显示其他所有标题。可在游戏中输入`/title @s title hello world`观察效果。

::: code-group
```json [vanilla/ui/hud_screen.json]
{
...
  "hud_title_text": {
    "type": "stack_panel",
    "orientation": "vertical",
    "offset": [ 0, -19 ],
    "layer": 1,
    "alpha": "@hud.anim_title_text_alpha_in",
    "propagate_alpha": true,
    "controls": [
      {
        "title_frame": {
          "type": "panel",
          "size": [ "100%", "100%cm" ],
          "controls": [
            {
              "title_background": {
                "type": "image",
                "size": [ "100%sm + 30px", "100%sm + 6px" ],
                "texture": "textures/ui/hud_tip_text_background",
                "alpha": "@hud.anim_title_background_alpha_in"
              }
            },
            {
              "title": {
                "type": "label",
                "anchor_from": "top_middle",
                "anchor_to": "top_middle",
                "color": "$title_command_text_color",
                "text": "#text",
                "layer": 1,
                "localize": false,
                "font_size": "extra_large",
                "variables": [
                  {
                    "requires": "(not $title_shadow)",
                    "$show_shadow": false
                  },
                  {
                    "requires": "$title_shadow",
                    "$show_shadow": true
                  }
                ],
                "shadow": "$show_shadow",
                "text_alignment": "center",
                "offset": [ 0, 6 ],
                "bindings": [
                  {
                    "binding_name": "#hud_title_text_string",
                    "binding_name_override": "#text",
                    "binding_type": "global"
                  },
                  {
                    "binding_type": "view", // 将此设为视图绑定
                    "source_property_name": "(not (#text = 'hello world'))", // 当标题文本不等于"hello world"时触发
                    "target_property_name": "#visible" // 根据条件覆盖可见性属性
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
...
}
```
:::

在资源包中使用非侵入式UI文件修改时，应保持如下格式：

::: code-group
```json [RP/ui/hud_screen.json]
{
  "hud_title_text/title_frame/title": {
    "modifications": [
      {
        "array_name": "bindings",     // 目标数组名
        "operation": "insert_back",   // 末尾插入操作
        "value": {                    // 新增绑定对象
          "binding_type": "view",
          "source_property_name": "(not (#text = 'hello world'))",
          "target_property_name": "#visible"
        }
      }
    ]
  }
}
```
:::

下面是一个更复杂的条件渲染示例。16x16的黑色图片仅在标题文本等于"hello world"时显示。虽然在此案例中不需要使用标题工厂（title factory），但如需使用UI动画则建议采用。

::: code-group
```json [RP/ui/hud_screen.json]
{
  "black_conditional_image": {
    "type": "image",
    "texture": "textures/ui/Black", // 黑色纹理
    "size": [16, 16],               // 固定尺寸
    "layer": 10,                    // 较高渲染层级
    "bindings": [
      {
        "binding_name": "#hud_title_text_string" // 标题文本绑定
      },
      {
        "binding_type": "view",
        "source_property_name": "(#hud_title_text_string = 'hello world')", // 条件判断
        "target_property_name": "#visible" // 可见性控制
      }
    ]
  },

  "black_conditional_image_factory": {
    "type": "panel",
    "factory": {
      "name": "hud_title_text_factory", // 使用标题工厂
      "control_ids": {
        "hud_title_text": "black_conditional_image@hud.black_conditional_image" // 控件ID映射
      }
    }
  },

  "root_panel": {
    "modifications": [
      {
        "array_name": "controls",     // 根面板控件数组
        "operation": "insert_front",  // 前置插入
        "value": {
          "black_conditional_image_factory@hud.black_conditional_image_factory": {} // 工厂实例
        }
      }
    ]
  }
}
```
:::

## 字符串格式化

使用`%.#s`格式可以从字符串中截取指定长度的部分，其中`#`代表字符数量。示例：

```json
{
  "label_element": {
    "type": "label",
    "text": "#text",       // 文本绑定
    "layer": 2,
    "bindings": [
       {
           "binding_type": "global",
           "binding_name": "#hud_title_text_string" // 全局标题绑定
       },
       {
           "binding_type": "view",
           "source_property_name": "('%.3s' * #hud_title_text_string)", // 截取前3个字符
           "target_property_name": "#text" // 输出结果
       }
    ]
  }
}
```

假设变量`"$var": "abcdefghijklmn"`，则：
- `'%.5s' * $var` 返回 `abcde`
- `$var - ('%.7s' * $var)` 返回 `hijklm`

注意该格式的使用场景较为有限。

## 按钮映射

`button_mappings`允许重新定义控件输入与按钮行为的对应关系，支持键鼠、触屏和手柄输入。

按钮元素配置示例：

```json
{
  "sample_button@common.button": {
    "$pressed_button_name": "button_id", // 按钮ID变量
    "button_mappings": [
      {
        "to_button_id": "$pressed_button_name",
        "mapping_type": "pressed" // 按压映射
      },
      {
        "from_button_id": "button.menu_ok",    // 来源按钮
        "to_button_id": "$pressed_button_name", // 目标按钮
        "mapping_type": "focused"              // 焦点状态映射
      },
      {
        "from_button_id": "button.menu_select", // 选择按钮
        "to_button_id": "$pressed_button_name",
        "mapping_type": "pressed"
      },
      {
        "from_button_id": "button.menu_up",    // 上方向键
        "to_button_id": "$pressed_button_name",
        "mapping_type": "global"              // 全局映射
      }
    ]
  }
}
```

### 映射类型

定义按钮映射的作用范围：

- `focused` - 控件获得焦点时生效
- `pressed` - 控件被点击/按压时生效
- `global` - 控件存在时全局生效

条件触发示例：
```json
{
  "sample_button@common.button": {
    "$pressed_button_name": "button_id",
    "button_mappings": [
      // 鼠标悬停时触发
      {
        "from_button_id": "button.menu_ok",
        "to_button_id": "$pressed_button_name",
        "mapping_type": "focused"
      },
      // 点击时触发
      {
        "from_button_id": "button.menu_select",
        "to_button_id": "$pressed_button_name",
        "mapping_type": "pressed"
      },
      // 全局响应上方向键
      {
        "from_button_id": "button.menu_up",
        "to_button_id": "$pressed_button_name",
        "mapping_type": "global"
      }
    ]
  }
}
```

### 常用按钮ID

**键鼠映射表：**
| 按钮ID                       | 说明          |
|-----------------------------|---------------|
| `button.menu_select`        | 鼠标左键      |
| `button.menu_secondary_select` | 鼠标右键   |
| `button.menu_ok`            | 回车键        |
| `button.menu_exit`          | ESC键         |
| `button.menu_cancel`        | ESC键         |
| `button.menu_up`            | 上方向键      |
| `button.menu_down`          | 下方向键      |
| `button.menu_left`          | 左方向键      |
| `button.menu_right`         | 右方向键      |
| `button.menu_autocomplete`  | Tab键         |

**手柄映射表：**
| 按钮ID                       | 说明        |
|-----------------------------|-------------|
| `button.controller_select`  | X/A键       |
| `button.menu_secondary_select` | Y键     |
| `button.menu_exit`          | B键         |
| `button.menu_cancel`        | B键         |
| `button.menu_up`            | 方向键上    |
| `button.menu_down`          | 方向键下    |
| `button.menu_left`          | 方向键左    |
| `button.menu_right`         | 方向键右    |

建议在设计UI时兼容多种输入设备。

## 修改操作

使用`modifications`属性可以非侵入式地修改现有JSON UI元素，提升资源包兼容性。

| 操作类型          | 描述                  |
|------------------|-----------------------|
| `insert_back`    | 在数组末尾插入        |
| `insert_front`   | 在数组开头插入        |
| `insert_after`   | 在目标元素后插入      |
| `insert_before`  | 在目标元素前插入      |
| `move_back`      | 移动元素到数组末尾    |
| `move_front`     | 移动元素到数组开头    |
| `move_after`     | 移动元素到目标之后    |
| `move_before`    | 移动元素到目标之前    |
| `swap`           | 交换两个元素位置      |
| `replace`        | 替换目标元素          |
| `remove`         | 移除目标元素          |

### 操作示例

#### 首尾操作
```json
// 在控件列表开头插入新元素
{
  "array_name": "controls",
  "operation": "insert_front",
  "value": [{"foo@example.bar": {}}]
}

// 将现有元素移至末尾
{
  "array_name": "controls",
  "operation": "move_back",
  "value": [{"foo@example.bar": {}}]
}
```

#### 相对定位操作
```json
// 在指定绑定后插入新绑定
{
  "array_name": "bindings",
  "operation": "insert_after",
  "where": {"binding_name": "#example_binding_2"},
  "value": [{"binding_name": "#my_binding_1"}]
}

// 移动绑定到指定位置前
{
  "array_name": "bindings",
  "operation": "move_before",
  "where": {"binding_name": "#example_binding_1"},
  "target": {"binding_name": "#example_binding_2"}
}
```

#### 替换与删除
```json
// 替换现有绑定
{
  "array_name": "bindings",
  "operation": "replace",
  "where": {"binding_name": "#example_binding_1"},
  "value": {"binding_name": "#replacement_binding"}
}

// 删除指定绑定
{
  "array_name": "bindings",
  "operation": "remove",
  "where": {"binding_name": "#example_binding_1"}
}
```