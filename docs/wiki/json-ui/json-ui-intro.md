---
title: JSON UI 入门指南
category: 基础
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
本文概述了 JSON UI 的基础知识。如需更详细的文档，请查阅 [JSON UI 文档](/wiki/json-ui/json-ui-documentation)。
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

当更改时，派生元素的任何属性都将被完全覆盖。

## 数据绑定

绑定机制用于将硬编码值与界面元素关联，并在处理元素时使用这些值。以下是一个使用硬编码文本的标签示例：

`text`属性值设定为`#hardtext`。通过`bindings`配置，我们可以获取硬编码变量`#hardtext`的值，使`text`属性能够正确调用。这种配置直接将`#hardtext`的值赋给`text`属性。

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

另一种常见的配置形式如下：

::: code-group
```json [vanilla/ui/example_file.json]
{
  "label": {
    "type": "label",
    "text": "#text",
    "bindings": [
      {
        "binding_name": "#hardtext",
        "binding_name_override": "#text"
      }
    ]
  }
}
```
:::

此时，`#hardtext`的值会被赋给`#text`绑定属性，进而传递给`text`属性。

这种机制在`visible`（可见性）和`enabled`（启用状态）属性中尤为常见。以下是一个组合示例：

::: code-group
```json
{
  "send_button": {
    "bindings": [
      {
        "binding_name": "#using_touch",
        "binding_name_override": "#visible"
      }
    ]
  },

  "play_button": {
    "bindings": [
      {
        "binding_name": "#play_button_enabled",
        "binding_name_override": "#enabled"
      }
    ]
  }
}
```
:::

此处的`#using_touch`和`#play_button_enabled`存储布尔值。当使用触控设备时，`#using_touch`为`true`，否则为`false`。`#play_button_enabled`用于「添加外部服务器」界面，当所有文本字段（服务器名称、IP地址和端口号）均有内容时才会设为`true`。<br>
因此，`#using_touch`的值会覆盖`#visible`绑定属性（该属性通常通过`property_bag`设置，等同于直接设置`visible`属性），同理`#play_button_enabled`会覆盖`#enabled`的值。

当需要根据开关状态显示特定面板时，需使用另一种绑定结构。这种配置需要指定数据源元素、源属性及目标属性：

::: code-group
```json
{
  "panel": {
    ...
    "bindings": [
      {
        "binding_type": "view",
        "source_control_name": "my_toggle", // 源元素名称
        "source_property_name": "#toggle_state", // 需要获取的开关状态属性
        "target_property_name": "#visible" // 待覆盖的目标属性
      }
    ]
  },

  "my_toggle": {
    ...
  }
}
```
:::

当开关被勾选时，`#toggle_state`会变为`1`或`true`，从而将元素的`visible`属性设为可见。取消勾选时，该值变为`0`或`false`，再次覆盖`visible`属性值。

## 条件性渲染

在标准属性体系下，通过屏幕显示状态控制基岩版UI系统具有挑战性。然而变量（variables）和绑定（bindings）在JSON UI中具有特殊地位，因为它们承载着来自基岩引擎的实时数据。通过巧妙的UI技巧组合，开发者可以完全控制UI元素的渲染条件。这些方法分为两大类：基于变量的条件渲染和基于绑定的条件渲染。

:::warning ⚠️ 注意
本示例适用于国际版的受限制的 JSON UI 系统（客户端无法实现脚本控制）<br>
对中国版来说，不需要这种复杂的黑科技实现HUD元素的可见性控制。<br>
但是也能因此学习到数据绑定的使用方法，何尝不是一种收获呢？
:::

### 变量条件渲染

变量可用于实现条件性UI渲染。UI变量是指前缀带`$`的特殊属性，例如`hud_screen.json`中的`$actionbar_text`就承载着引擎数据。观察`hud_actionbar_text`控件可知，该变量用于显示动作栏文本。

::: code-group
```json [vanilla/ui/hud_screen.json]
{
...
  "hud_actionbar_text": {
    "type": "image",
    "size": [ "100%c + 12px", "100%c + 5px" ],
    "offset": [ 0, "50%-68px" ],
    "texture": "textures/ui/hud_tip_text_background",
    "alpha": "@hud.anim_actionbar_text_background_alpha_out",
    "controls": [
      {
        "actionbar_message": {
          "type": "label",
          "anchor_from": "center",
          "anchor_to": "center",
          "color": "$tool_tip_text",
          "layer": 1,
          "text": "$actionbar_text",
          "localize": false,
          "alpha": "@hud.anim_actionbar_text_alpha_out"
        }
      }
    ]
  }
...
}
```
:::

通过`visible`属性可实现基于引擎变量的条件渲染。以下示例复制了`$actionbar_text`变量以便进行修改和比较（原始变量无法直接操作）。新建的`$atext`变量用于控制`visible`属性，其逻辑是"当动作栏文本不等于`hello world`时显示文本标签"。

::: code-group
```json [vanilla/ui/hud_screen.json]
{
...
  "hud_actionbar_text": {
    "type": "image",
    "size": ["100%c + 12px", "100%c + 5px"],
    "offset": [0, "50%-68px"],
    "texture": "textures/ui/hud_tip_text_background",
    "alpha": "@hud.anim_actionbar_text_background_alpha_out",
    "controls": [
      {
        "actionbar_message": {
          "type": "label",
          "anchor_from": "center",
          "anchor_to": "center",
          "color": "$tool_tip_text",
          "layer": 1,
          "text": "$actionbar_text",
          "localize": false,
          "alpha": "@hud.anim_actionbar_text_alpha_out",
          // 当动作栏文本等于"hello world"时忽略该文本标签
          "$atext": "$actionbar_text",
          "visible": "(非 ($atext = 'hello world'))"
        }
      }
    ]
  }
...
}
```
:::

将此JSON转换为资源包使用的非侵入式UI文件应如下所示：

::: code-group
```json [vanilla/ui/hud_screen.json]
{
  "hud_actionbar_text/actionbar_message": {
    "$atext": "$actionbar_text",
    "visible": "(非 ($atext = 'hello world'))"
  }
}
```
:::

在启用资源包的世界中执行`/title @s actionbar hello world`时，动作栏将不会显示信息。其他动作栏指令仍可正常显示。若需要同时隐藏文本背景，可移除`/actionbar_message`节点。由于背景元素`hud_actionbar_text`被隐藏时，其子元素也会连带隐藏。

下面展示更复杂的变量条件渲染示例。此处需要使用动作栏工厂（actionbar factory）。工厂是元素生成器，其中`hud_actionbar_text_factory`等具有硬编码属性。该工厂在每次执行动作栏指令时重置其`control_id`内的元素，并传递`$actionbar_text`等特殊变量，这些数据只能通过工厂获取。

::: code-group
```json [vanilla/ui/hud_screen.json]
{
  "black_conditional_image": {
    "type": "image",
    "texture": "textures/ui/Black",
    "size": [16, 16],
    "layer": 10,
    "$atext": "$actionbar_text",
    "visible": "($atext = 'hello world')"
  },

  "black_conditional_image_factory": {
    "type": "panel",
    "factory": {
      "name": "hud_actionbar_text_factory",
      "control_ids": {
        "hud_actionbar_text": "black_conditional_image@hud.black_conditional_image"
      }
    }
  },

  "root_panel": {
    "modifications": [
      {
        "array_name": "controls",
        "operation": "insert_front",
        "value": {
          "black_conditional_image_factory@hud.black_conditional_image_factory": {}
        }
      }
    ]
  }
}
```
:::

当动作栏文本等于`hello world`时，此示例会在HUD界面显示16x16黑色方块。开发者可为图像添加动画增强表现力。变量条件渲染不仅限于图像和文本，任何UI对象类型均可应用。结合动作栏文本的UI代码可实现高度定制化（至少在`hud_screen.json`中）。`visible`属性支持UI运算符，提供更精细的控制。任何承载引擎数据的变量都支持变量条件渲染。

### 绑定条件渲染

观察标题系统（title）时，可能误以为其使用变量系统。实际上标题系统采用绑定机制获取数据，如下所示：

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
                    "requires": "(非 $title_shadow)",
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

通过添加绑定对象控制可见性。`#visible`属性直接反映元素的可见状态。以下示例将隐藏`hello world`标题文本，其他文本正常显示。游戏中可执行`/title @s title hello world`验证效果。

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
                    "requires": "(非 $title_shadow)",
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
                    "binding_type": "view", // 转换为视图绑定
                    "source_property_name": "(非 (#text = 'hello world'))", // 检测标题文本是否不等于"hello world"
                    "target_property_name": "#visible" // 根据检测结果覆盖可见性属性
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

转换为资源包文件时应如下配置：

::: code-group
```json [RP/ui/hud_screen.json]
{
  "hud_title_text/title_frame/title": {
    "modifications": [
      {
        "array_name": "bindings",
        "operation": "insert_back",
        "value": {
          "binding_type": "view",
          "source_property_name": "(非 (#text = 'hello world'))",
          "target_property_name": "#visible"
        }
      }
    ]
  }
}
```
:::

下方是更复杂的绑定条件渲染示例。当标题文本等于`hello world`时显示16x16黑色图像。虽然不强制要求使用标题工厂，但若涉及UI动画则推荐使用。

::: code-group
```json [RP/ui/hud_screen.json]
{
  "black_conditional_image": {
    "type": "image",
    "texture": "textures/ui/Black",
    "size": [16, 16],
    "layer": 10,
    "bindings": [
      {
        "binding_name": "#hud_title_text_string"
      },
      {
        "binding_type": "view",
        "source_property_name": "(#hud_title_text_string = 'hello world')",
        "target_property_name": "#visible"
      }
    ]
  },

  "black_conditional_image_factory": {
    "type": "panel",
    "factory": {
      "name": "hud_title_text_factory",
      "control_ids": {
        "hud_title_text": "black_conditional_image@hud.black_conditional_image"
      }
    }
  },

  "root_panel": {
    "modifications": [
      {
        "array_name": "controls",
        "operation": "insert_front",
        "value": {
          "black_conditional_image_factory@hud.black_conditional_image_factory": {}
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