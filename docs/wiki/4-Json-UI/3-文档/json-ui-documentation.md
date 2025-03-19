---
title: JSON UI 完整文档
category: Documentation
nav_order: 1
mentions:
    - KalmeMarq
    - SirLich
    - solvedDev
    - Joelant05
    - GTB3NW
    - stirante
    - sermah
    - MedicalJewel105
    - tinedpakgamer
    - LeGend077
    - TheDataLioness
    - shanewolf38
    - JosiahDZD
    - Tcbdxh
    - inotflying
    - TheItsNameless
    - SmokeyStack
    - Gotemba912
---

# JSON UI 完整文档

## UI元素

### 元素类型

|        名称        |                                           描述                                           |                                                                                                                                                                                                               允许的属性                                                                                                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| panel              | 容器元素，类似HTML中的`<div>`                                                            | [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                                                                          |
| stack_panel        | 类似`panel`，但会根据`orientation`属性值自动堆叠子元素                                    | [堆叠面板](/json-ui/json-ui-documentation#stack-panel) <br> [集合](/json-ui/json-ui-documentation#collection) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                    |
| collection_panel   | 类似`stack_panel`，但没有`orientation`属性                                               | [集合](/json-ui/json-ui-documentation#collection) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                 |
| grid               | 网格布局元素                                                                             | [网格](/json-ui/json-ui-documentation#grid) <br> [集合](/json-ui/json-ui-documentation#collection) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                |
| label              | 文本元素                                                                                 | [文本](/json-ui/json-ui-documentation#text) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                     |
| image              | 图像元素，用于绘制纹理                                                                   | [精灵](/json-ui/json-ui-documentation#sprite) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                   |
| input_panel        | 可接收输入的面板                                                                         | [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                 |
| button             | 按钮元素，支持四种状态（默认、悬停、按下、锁定）                                         | [按钮](/json-ui/json-ui-documentation#button) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                              |
| toggle             | 开关元素，包含两种状态（选中/未选中），每种状态有悬停和锁定变体                         | [开关](/json-ui/json-ui-documentation#toggle) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                              |
| dropdown           | 下拉菜单开关                                                                             | [下拉菜单](/json-ui/json-ui-documentation#dropdown) <br> [开关](/json-ui/json-ui-documentation#toggle) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)     |
| slider             | 范围输入元素                                                                             | [滑块](/json-ui/json-ui-documentation#slider) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                              |
| slider_box         | 用于调整滑块值的拖动按钮                                                                 | [滑块按钮](/json-ui/json-ui-documentation#slider-box) <br> [输入](/json-ui/json-ui-documentation#input) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                          |
| edit_box           | 文本输入框（默认单行）                                                                   | [文本编辑](/json-ui/json-ui-documentation#text-edit) <br> [按钮](/json-ui/json-ui-documentation#button) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                       |
| scroll_view        | 创建可滚动面板                                                                           | [滚动视图](/json-ui/json-ui-documentation#scroll-view) <br> [输入](/json-ui/json-ui-documentation#input) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                          |
| scrollbar_track    | 滚动条轨道                                                                               | [输入](/json-ui/json-ui-documentation#input) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout)                                                                                                                                                                                                                                                                                  |
| scrollbar_box      | 滚动条"滑块"（可拖动的滚动手柄，默认垂直方向）                                           | [输入](/json-ui/json-ui-documentation#input) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout)                                                                                                                                                                                                                                                                                  |
| factory            | 元素生成器                                                                               | [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout)                                                                                                                                                                                                                                                                                                                                     |
| screen             | 屏幕元素                                                                                 | [屏幕](/json-ui/json-ui-documentation#screen) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                   |
| custom             | 需通过代码创建的复杂渲染元素                                                             | [自定义渲染](/json-ui/json-ui-documentation#custom-render) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                       |
| selection_wheel    | 选择轮盘                                                                                 | [选择轮盘](/json-ui/json-ui-documentation#selection-wheel) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                   |

#### 遗留元素类型（已失效）

|       名称       |                         描述                         |                                                                                                                                                                                                                                  允许的属性                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tab              | 在引入toggle之前创建标签页的方式                     | [标签页（旧版）](/json-ui/json-ui-documentation#tab-legacy) <br> [按钮](/json-ui/json-ui-documentation#button) <br> [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [音效](/json-ui/json-ui-documentation#sound) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                               |
| carousel_label   | 轮播文本元素                                         | [轮播文本（旧版）](/json-ui/json-ui-documentation#carousel-text-legacy) <br> [文本](/json-ui/json-ui-documentation#text) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                             |
| grid_item        | 专门作为网格子元素的容器                             | [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                                                                                                           |
| scrollbar        | 旧版滚动条                                           | [输入](/json-ui/json-ui-documentation#input) <br> [焦点](/json-ui/json-ui-documentation#focus) <br> [控件](/json-ui/json-ui-documentation#control) <br> [布局](/json-ui/json-ui-documentation#layout) <br> [数据绑定](/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                       |

::: code-group
```json [示例]
// 代码块注释示例
{
  "panel": {
    "type": "stack_panel",
    "orientation": "vertical"
  }
}
```
:::

## 属性 Properties

### 控制属性 (基础属性)

|         属性名称          |        类型        |  默认值  |                                                                                            描述                                                                                            |
| ------------------------- | :----------------: | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible                   |      布尔值        |  `true`  | 是否显示该UI元素                                                                                                                                                                         |
| enabled                   |      布尔值        |  `true`  | 当设置为true时，如果UI元素或其子元素处于锁定状态，则会保持锁定                                                                                                                           |
| layer                     |       整数         |   `0`    | Z轴层级（类似CSS的z-index），数值越大越靠前显示                                                                                                                                          |
| alpha                     |      浮点数        |  `1.0`   | 元素透明度（仅影响当前元素）。如需同时影响子元素需启用`propagate_alpha`                                                                                                                  |
| propagate_alpha           |      布尔值        | `false`  | 是否将透明度同时应用于所有子元素                                                                                                                                                         |
| clips_children            |      布尔值        | `false`  | 是否裁剪超出元素边界的子元素内容（视觉与交互）                                                                                                                                           |
| allow_clipping            |      布尔值        |  `true`  | 是否启用子元素裁剪功能                                                                                                                                                                   |
| clip_offset               |   向量 [x, y]      | `[0, 0]` | 裁剪起始偏移量                                                                                                                                                                           |
| clip_state_change_event   |       字符串       |          |                                                                                                                                                                                          |
| enable_scissor_test       |      布尔值        |          | [Scissor Test功能说明](https://www.khronos.org/opengl/wiki/Scissor_Test)                                                                                                                 |
| property_bag              |       对象         |          | [属性包](/json-ui/json-ui-documentation#property-bag)，存放与UI元素数据结构相关的属性                                                                                                    |
| selected                  |      布尔值        |          | 文本框是否默认被选中                                                                                                                                                                     |
| use_child_anchors         |      布尔值        | `false`  | 是否使用子元素的锚点设置                                                                                                                                                                 |
| controls                  |       数组         |          | 子元素列表                                                                                                                                                                               |
| anims                     |     字符串数组     |          | 动画名称列表                                                                                                                                                                             |
| disable_anim_fast_forward |      布尔值        |          |                                                                                                                                                                                          |
| animation_reset_name      |       字符串       |          |                                                                                                                                                                                          |
| ignored                   |      布尔值        | `false`  | 是否忽略该UI元素                                                                                                                                                                         |
| variables                 |  数组或对象  |          | 用于动态修改变量值的条件集合                                                                                                                                                             |
| modifications             |       数组         |          | 允许修改底层资源包的UI文件（原版资源包在最底层）                                                                                                                                         |
| grid_position             | 向量 [行, 列] |          | 元素在网格布局中的位置，可用于修改预设网格的特定项                                                                                                                                       |
| collection_index          |       整数         |          | 元素在集合中的索引位置                                                                                                                                                                   |

#### 已弃用属性

| 属性名称     |   类型   | 默认值 |                                                                     描述                                                                     |
| ------------ | :------: | :----: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| z_order      |   整数   |   0    | `layer`属性的早期版本                                                                                                                      |
| scroll_report | 字符串数组 |        | 当滚动面板内容变化时需要通知的控件名称列表                                                                                                  |
| alignment    |   枚举   |        | 可选值：<br>`top_left`<br>`top_middle`<br>`top_right`<br>`left_middle`<br>`center`<br>`right_middle`<br>`bottom_left`<br>`bottom_middle`<br>`bottom_right` |

### 布局属性 (panel)

|           属性名称           |          类型           |      默认值      |                                                                                                                                                                                                                                                                                                                                                     描述                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | :---------------------: | :--------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size                         | 向量 [宽度, 高度] | `["default", "default"]` | 元素尺寸：<br>`"default"`（默认值即`"100%"`）<br>`0`（像素值）<br>`"0px"`（带px后缀的像素值，支持百分比与像素混合运算如`"75% + 12px"`）<br>`"0%"`（相对父元素百分比）<br>`"0%c"`（相对子元素总尺寸百分比）<br>`"0%cm"`（相对最大可见子元素百分比）<br>`"0%sm"`（相对兄弟元素百分比）<br>`"0%y"`（相对元素高度百分比）<br>`"0%x"`（相对元素宽度百分比）<br>`"fill"`（填充父元素剩余空间） |
| max_size                     | 向量 [宽度, 高度] | `["default", "default"]` | 元素最大尺寸                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| min_size                     | 向量 [宽度, 高度] | `["default", "default"]` | 元素最小尺寸                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| offset                       |     向量 [x, y]      |     `[0, 0]`     | 相对于父元素的偏移位置（基于左上角坐标系）：<br>`10`-像素<br>`"10px"`-像素<br>`"50%"`-父元素尺寸百分比<br>`"50%x"`-元素宽度百分比<br>`"50%y"`-元素高度百分比                                                                                                                               |
| anchor_from                  |         枚举          |     `center`     | 父元素锚点位置：<br>`top_left`<br>`top_middle`<br>`top_right`<br>`left_middle`<br>`center`<br>`right_middle`<br>`bottom_left`<br>`bottom_middle`<br>`bottom_right`                                                                                                                                                                                                                   |
| anchor_to                    |         枚举          |     `center`     | 元素自身锚点位置：<br>`top_left`<br>`top_middle`<br>`top_right`<br>`left_middle`<br>`center`<br>`right_middle`<br>`bottom_left`<br>`bottom_middle`<br>`bottom_right`                                                                                                                                                                                                                |
| inherit_max_sibling_width    |        布尔值         |      `false`     | 使用同级元素的最大宽度                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| inherit_max_sibling_height   |        布尔值         |      `false`     | 使用同级元素的最大高度                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| use_anchored_offset          |        布尔值         |                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| contained                    |        布尔值         |                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| draggable                    |         枚举          |                  | 使元素可通过光标拖动（需元素支持输入）。可能值：`vertical`（垂直）、`horizontal`（水平）、`both`（双向）                                                                                             |
| follows_cursor               |        布尔值         |      `false`     | 是否跟随光标移动                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### 数据绑定

| 属性名称 |                               类型                                | 默认值 |           描述           |
| -------- | :---------------------------------------------------------------: | :----: | ----------------------- |
| bindings | [绑定对象数组](/json-ui/json-ui-documentation#data-binding-array-object) |        | 将硬编码值绑定到元素属性 |

#### 数据绑定对象

|        属性名称        |   类型   | 默认值  |                                                                       描述                                                                       |
| ---------------------- | :------: | :-----: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ignored                | 布尔值  | `false` | 是否忽略该绑定                                                                                                                                  |
| binding_type           |  枚举   |         | 可能值：<br>`global`<br>`view`<br>`collection`<br>`collection_details`<br>`none`                                                               |
| binding_name           | 字符串  |         | 存储数据绑定名称或条件的值                                                                                                                      |
| binding_name_override  | 字符串  |         | 应用`binding_name`值的属性名称                                                                                                                  |
| binding_collection_name | 字符串  |         | 使用的集合名称                                                                                                                                  |
| binding_collection_prefix | 字符串  |         |                                                                                                                                                 |
| binding_condition      |  枚举   |         | 绑定条件：<br>`always`<br>`always_when_visible`<br>`visible`<br>`once`<br>`none`<br>`visibility_changed`                                       |
| source_control_name    | 字符串  |         | 被观察的源控件名称                                                                                                                              |
| source_property_name   | 字符串  |         | 源控件属性值                                                                                                                                    |
| target_property_name   | 字符串  |         | 目标应用属性                                                                                                                                    |
| resolve_sibling_scope  | 布尔值  |         | 是否允许在同级控件中解析`source_control_name`                                                                                                   |

### 堆叠面板 (stack_panel)

|  属性名称  |  类型  | 默认值   |                    描述                     |
| ---------- | :----: | -------- | ------------------------------------------- |
| orientation |  枚举  | `vertical` | 子元素排列方向：<br>`vertical`<br>`horizontal` |

### 网格布局 (grid)

|        属性名称         |          类型           | 默认值 |                                     描述                                      |
| ----------------------- | :---------------------: | ------ | ---------------------------------------------------------------------------- |
| grid_dimensions         | 向量 [行数, 列数] |        | 网格的行列数                                                                 |
| maximum_grid_items      |         整数          |        | 网格最大生成项数                                                             |
| grid_dimension_binding  |         字符串         |        | 网格尺寸绑定名称                                                             |
| grid_rescaling_type     |         枚举          |        | 网格缩放方向：<br>`vertical`<br>`horizontal`<br>`none`                       |
| grid_fill_direction     |         枚举          |        | 填充方向：<br>`vertical`<br>`horizontal`<br>`none`                           |
| grid_item_template      |         字符串         |        | 支持集合的控件模板（如`"common.container_item"`、`"inventory_items"`等）     |
| precached_grid_item_count |         整数          |        |                                                                              |

### 文本属性 (Label)

|         属性名称          |       类型        |    默认值    |                                                                 描述                                                                 |
| ------------------------- | :--------------: | :----------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| text                      |      字符串      |              | 文本内容                                                                                                                            |
| color                     | 向量 [r, g, b]  | `[1.0, 1.0, 1.0]` | 文本颜色（RGB值0.0-1.0）                                                                                |
| locked_color              | 向量 [r, g, b]  |              | 父元素禁用时的文本颜色                                                                                                              |
| shadow                    |      布尔值      |   `false`    | 是否显示文字阴影                                                                                                                    |
| hide_hyphen               |      布尔值      |   `false`    | 是否隐藏换行连字符                                                                                                                  |
| notify_on_ellipses        |    字符串数组    |              | 当文本出现省略号时需要通知的控件列表                                                                                                |
| enable_profanity_filter   |      布尔值      |   `false`    | 是否启用脏话过滤                                                                                                                    |
| locked_alpha              |     浮点数       |              | 父元素禁用时的透明度                                                                                                                |
| font_size                 |      枚举       |   `normal`   | 字号：<br>`small`<br>`normal`<br>`large`<br>`extra_large`                                                                          |
| font_scale_factor         |     浮点数       |    `1.0`     | 文本缩放比例                                                                                                                        |
| localize                  |      布尔值      |   `false`    | 是否启用文本本地化                                                                                                                  |
| line_padding              |      数值       |              | 行间距                                                                                                                              |
| font_type                 |      枚举       |  `default`   | 字体类型：<br>`default`<br>`rune`<br>`unicode`<br>`smooth`<br>`MinecraftTen`<br>或自定义字体                                       |
| backup_font_type          |      枚举       |  `default`   | 备用字体类型                                                                                                                        |
| text_alignment            |      枚举       |              | 文本对齐方式（未设置时根据锚点自动调整）                                                                                            |

#### 已弃用属性

| 属性名称 |  类型   | 默认值  |              描述              |
| -------- | :-----: | :-----: | ------------------------------ |
| wrap     | 布尔值 | `false` | 是否自动换行（已失效）         |
| clip     | 布尔值 | `false` | 是否裁剪文本（已失效）         |

<br>

`notify_on_ellipses`使用示例（常用于硬编码文本）：

::: code-group
```json [RP/ui/example_file.json]
{
  "label": {
    ...
    "notify_on_ellipses": [
      "my_button"
    ]
  },

  "my_button": {
    ...
    "bindings": [
      {
        "binding_type": "view",
        "source_property_name": "#using_ellipses",
        "target_property_name": "#visible"
      }
    ]
  }
}
```
:::

### 精灵属性 (sprite)

|          属性名称          |              类型              |   默认值    |                                                                                         描述                                                                                         |
| ------------------------- | :---------------------------: | :--------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| texture                   |             字符串             |            | 图片路径（从资源包根目录开始，如`"textures/ui/White"`）                                                                                                                            |
| allow_debug_missing_texture |             布尔值             |   `true`   | 当纹理缺失时显示调试纹理                                                                                                                           |
| uv                        |         向量 [u, v]          |            | 纹理映射起始坐标                                                                                                                          |
| uv_size                   |      向量 [宽, 高]        |            | 纹理映射尺寸                                                                                                                              |
| texture_file_system       |             字符串             |`InUserPackage`| 纹理来源：<br>`InUserPackage`<br>`InAppPackage`<br>`RawPath`<br>`RawPersistent`<br>`InSettingsDir`<br>`InExternalDir`<br>`InServerPackage`<br>`InDataDir`<br>`InUserDir`<br>`InWorldDir`<br>`StoreCache` |
| nineslice_size            | 整数/向量[x,y]/向量[x0,y0,x1,y1] |            | 九宫格切割尺寸（保持四角不拉伸）                                                                                                            |
| tiled                     |          布尔值或枚举           |            | 平铺方式：<br>`true`/`false`<br>`x`<br>`y`                                                                                                |
| tiled_scale               |       向量 [sX, sY]         |   `false`   | 平铺纹理缩放比例                                                                                                                          |
| clip_direction            |             枚举              |            | 裁剪起始方向：<br>`left`<br>`right`<br>`up`<br>`down`<br>`center`                                                                        |
| clip_ratio                |            浮点数             |            | 裁剪比例（0.0-1.0）                                                                                                                     |
| clip_pixelperfect         |             布尔值             |            | 是否启用像素级精确裁剪                                                                                                                    |
| keep_ratio                |             布尔值             |   `true`    | 调整尺寸时保持宽高比                                                                                                                      |
| bilinear                  |             布尔值             |   `false`   | 是否使用双线性过滤                                                                                                                        |
| fill                      |             布尔值             |   `false`   | 是否拉伸填充                                                                                                                              |
| $fit_to_width             |             布尔值             |            |                                                                                                                                          |
| zip_folder                |             字符串             |            |                                                                                                                                          |
| grayscale                 |             布尔值             |   `false`   | 是否显示为灰度图像                                                                                                                        |
| force_texture_reload      |             布尔值             |            | 纹理路径变更时强制重载                                                                                                                    |
| base_size                 |      向量 [宽, 高]        |            |                                                                                                                                          |

使用裁剪功能时，需将`#*_ratio`绑定到`#clip-ratio`属性并设置条件为`"always"`。熔炉UI中的进度箭头和燃料图标即采用此机制。

### 输入属性 (input)

|            属性名称            |                                 类型                                  | 默认值 | 描述 |
| ----------------------------- | :-------------------------------------------------------------------: | :----: | ---- |
| button_mappings               | [映射对象数组](/json-ui/json-ui-documentation#button-mapping-array-object) |        |      |
| modal                         |                                  布尔值                                  |        |      |
| inline_modal                  |                                  布尔值                                  |        |      |
| always_listen_to_input        |                                  布尔值                                  |        |      |
| always_handle_pointer         |                                  布尔值                                  |        |      |
| always_handle_controller_direction |                                  布尔值                                  |        |      |
| hover_enabled                 |                                  布尔值                                  |        |      |
| prevent_touch_input           |                                  布尔值                                  |        |      |
| consume_event                 |                                  布尔值                                  |        |      |
| consume_hover_events          |                                  布尔值                                  |        |      |
| gesture_tracking_button       |                                  字符串                                  |        |      |

#### 按钮映射对象 (Button Mapping Array Object)

|          属性名称          |  类型   | 默认值  |                                      描述                                      |
| ------------------------- | :-----: | :-----: | ----------------------------------------------------------------------------- |
| ignored                   | 布尔值 | `false` | 是否忽略该映射                                                                |
| from_button_id            | 字符串 |         | 触发事件的原始按钮ID                                                          |
| to_button_id              | 字符串 |         | 事件触发后执行的目标按钮ID                                                    |
| mapping_type              |  枚举   |         | 可能值：<br>`global`<br>`pressed`<br>`double_pressed`<br>`focused`            |
| scope                     |  枚举   |         | 可能值：<br>`view`<br>`controller`                                            |
| input_mode_condition      |  枚举   |         | 可能值：<br>`not_gaze`<br>`not_gamepad`<br>`gamepad_and_not_gaze`             |
| ignore_input_scope        | 布尔值 |         |                                                                               |
| consume_event             | 布尔值 |         |                                                                               |
| handle_select             | 布尔值 |         |                                                                               |
| handle_deselect           | 布尔值 |         |                                                                               |
| button_up_right_of_first_refusal | 布尔值 |         |                                                                               |

### 焦点属性 (Focus)

|          属性名称          |                                   类型                                    | 默认值 |                                                                             描述                                                                             |
| ------------------------- | :-----------------------------------------------------------------------: | :----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default_focus_precedence  |                                    整数                                    |        |                                                                                                                                                             |
| focus_enabled             |                                   布尔值                                   |        | 是否允许通过方向键或手柄聚焦                                                                                                                                |
| focus_wrap_enabled        |                                   布尔值                                   |        |                                                                                                                                                             |
| focus_magnet_enabled      |                                   布尔值                                   |        |                                                                                                                                                             |
| focus_identifier          |                                   字符串                                   |        | 焦点标识符                                                                                                                                                  |
| focus_change_down         |                                   字符串                                   |        | 按下方向键下时接收焦点的元素标识符（使用`FOCUS_OVERRIDE_STOP`可阻止焦点移出底部）                                                                           |
| focus_change_up           |                                   字符串                                   |        | 按下方向键上时接收焦点的元素标识符（使用`FOCUS_OVERRIDE_STOP`可阻止焦点移出顶部）                                                                           |
| focus_change_left         |                                   字符串                                   |        | 按下方向键左时接收焦点的元素标识符（使用`FOCUS_OVERRIDE_STOP`可阻止焦点移出左侧）                                                                           |
| focus_change_right        |                                   字符串                                   |        | 按下方向键右时接收焦点的元素标识符（使用`FOCUS_OVERRIDE_STOP`可阻止焦点移出右侧）                                                                           |
| focus_mapping             |                                   数组                                    |        |                                                                                                                                                             |
| focus_container           |                                   布尔值                                   |        |                                                                                                                                                             |
| use_last_focus            |                                   布尔值                                   |        |                                                                                                                                                             |
| focus_navigation_mode_left |                                   枚举                                    |        | 可能值：<br>`none`<br>`stop`<br>`custom`<br>`contained`                                                                                                     |
| focus_navigation_mode_right |                                   枚举                                    |        | 可能值：<br>`none`<br>`stop`<br>`custom`<br>`contained`                                                                                                     |
| focus_navigation_mode_down |                                   枚举                                    |        | 可能值：<br>`none`<br>`stop`<br>`custom`<br>`contained`                                                                                                     |
| focus_navigation_mode_up  |                                   枚举                                    |        | 可能值：<br>`none`<br>`stop`<br>`custom`<br>`contained`                                                                                                     |
| focus_container_custom_left | [焦点容器对象数组](/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |
| focus_container_custom_right | [焦点容器对象数组](/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |
| focus_container_custom_down | [焦点容器对象数组](/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |
| focus_container_custom_up | [焦点容器对象数组](/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |

#### 焦点容器对象 Focus Container Custom Array Object

|       属性名称        |  类型  |                                      描述                                       |
| --------------------- | :----: | ------------------------------------------------------------------------------ |
| other_focus_container_name | 字符串 | 接收焦点的目标容器名称                                                         |
| focus_id_inside       | 字符串 | 目标容器内接收焦点的子元素标识符                                               |

::: code-group
```json [RP/ui/example_file.json]
...
{
  "other_panel": {
    ...
    "focus_container": true,
    "controls": [
      ...
    ]
  }
},
{
  "input_panel": {
    ...
    "focus_container_custom_up": [
      {
        "other_focus_container_name": "other_panel"
      }
    ]
  }
}
...
```
:::

### 按钮属性 (button)

|     属性名称     |  类型  | 默认值 |                 描述                 |
| --------------- | :----: | :----: | ------------------------------------ |
| default_control | 字符串 |        | 默认状态下显示的子控件名称           |
| hover_control   | 字符串 |        | 悬停状态下显示的子控件名称           |
| pressed_control | 字符串 |        | 按下状态下显示的子控件名称           |
| locked_control  | 字符串 |        | 锁定状态下显示的子控件名称           |

### 开关控件 (toggle)

|            属性名称            |  类型   | 默认值 |                                         描述                                         |
| ----------------------------- | :-----: | :----: | ----------------------------------------------------------------------------------- |
| radio_toggle_group            | 布尔值  |        |                                                                                     |
| toggle_name                   | 字符串  |        | 所属切换组的标识符                                                                  |
| toggle_default_state          | 布尔值  |        |                                                                                     |
| toggle_group_forced_index     |  整数   |        | 切换项在组内的索引                                                                  |
| toggle_group_default_selected |  整数   |        | 组内默认选中项的索引                                                                |
| reset_on_focus_lost           | 布尔值  |        |                                                                                     |
| toggle_on_hover               | 字符串  |        |                                                                                     |
| toggle_on_button              | 字符串  |        |                                                                                     |
| toggle_off_button             | 字符串  |        |                                                                                     |
| enable_directional_toggling   | 布尔值  |        |                                                                                     |
| toggle_grid_collection_name   | 字符串  |        | 所属集合名称                                                                        |
| checked_control               | 字符串  |        | 选中状态下显示的子控件名称                                                          |
| unchecked_control             | 字符串  |        | 未选中状态下显示的子控件名称                                                        |
| checked_hover_control         | 字符串  |        | 选中悬停状态下显示的子控件名称                                                      |
| unchecked_hover_control       | 字符串  |        | 未选中悬停状态下显示的子控件名称                                                    |
| checked_locked_control        | 字符串  |        | 选中锁定状态下显示的子控件名称                                                      |
| unchecked_locked_control      | 字符串  |        | 未选中锁定状态下显示的子控件名称                                                    |
| checked_locked_hover_control  | 字符串  |        | 选中锁定悬停状态下显示的子控件名称                                                  |
| unchecked_locked_hover_control | 字符串  |        | 未选中锁定悬停状态下显示的子控件名称                                                |

### 硬编码切换组

部分界面（如设置、物品栏）包含预设切换组索引，示例配置：
```json
$search_index - $construction_index
$survival_layout_index - $construction-index
$recipe_book_layout_index - $equipment_index
$creative_layout_index - $items_index
```

部分必选切换项（如设置中的辅助功能、物品栏的建造/装备/物品/自然标签）即使未配置也不会显示警告，但在深度修改时可能触发断言错误。

### 下拉菜单 (dropdown)

|       属性名称        |  类型  | 默认值 |               描述               |
| -------------------- | :----: | :----: | -------------------------------- |
| dropdown_name        | 字符串 |        | 下拉菜单标识符                   |
| dropdown_content_control | 字符串 |        | 作为根内容面板的子控件名称       |
| dropdown_area        | 字符串 |        | 内部内容区域的子控件名称         |

### 音效

|   属性名称    |                             类型                              |                     描述                      |
| ------------ | :-----------------------------------------------------------: | -------------------------------------------- |
| sound_name   |                            字符串                             | 触发时播放的音效定义（位于`sound_definitions.json`） |
| sound_volume |                            浮点数                            | 音效音量                                      |
| sound_pitch  |                            浮点数                            | 音效音调                                      |
| sounds       | [音效对象数组](/json-ui/json-ui-documentation#sound-array-object) | 触发时播放的音效列表                          |

#### 音效对象

|         属性名称          |  类型  |                     描述                      |
| ------------------------ | :----: | -------------------------------------------- |
| sound_name               | 字符串 | 音效定义名称                                  |
| sound_volume             | 浮点数 | 音效音量                                      |
| sound_pitch              | 浮点数 | 音效音调                                      |
| min_seconds_between_plays | 浮点数 | 重复播放最小间隔时间                          |

### 集合 (Collection)

|    属性名称    |  类型  |      描述       |
| ------------- | :----: | -------------- |
| collection_name | 字符串 | 使用的集合名称 |

### 文本编辑 (Text Edit)

|            属性名称            |  类型   | 默认值 |                                     描述                                      |
| ----------------------------- | :-----: | :----: | ---------------------------------------------------------------------------- |
| text_box_name                 | 字符串  |        | 文本框标识符                                                                 |
| text_edit_box_grid_collection_name | 字符串  |        | 所属集合名称                                                                 |
| constrain_to_rect             | 布尔值  |        |                                                                              |
| enabled_newline               | 布尔值  |        | 是否允许多行输入                                                             |
| text_type                     |  枚举   |        | 允许输入的字符类型：<br>`ExtendedASCII`<br>`IdentifierChars`<br>`NumberChars` |
| max_length                    |  整数   |        | 最大字符数限制                                                               |
| text_control                  | 字符串  |        | 显示文本的子控件名称                                                         |
| place_holder_control          | 字符串  |        | 占位文本的子控件名称                                                         |
| can_be_deselected             | 布尔值  |        |                                                                              |
| always_listening              | 布尔值  |        |                                                                              |
| virtual_keyboard_buffer_control | 字符串  |        |                                                                              |

### 滑动条 (slider)

|          属性名称          |  类型   | 默认值 |                                     描述                                      |
| ------------------------- | :-----: | :----: | ---------------------------------------------------------------------------- |
| slider_track_button       | 字符串  |        | 滑动条轨道按钮ID                                                             |
| slider_small_decrease_button | 字符串  |        | 减小按钮ID                                                                   |
| slider_small_increase_button | 字符串  |        | 增大按钮ID                                                                   |
| slider_steps              |  整数   |        | 滑动步数                                                                     |
| slider_direction          |  枚举   |        | 滑动方向：<br>`vertical`<br>`horizontal`                                     |
| slider_timeout            |  数值   |        |                                                                              |
| slider_collection_name    | 字符串  |        | 所属集合名称                                                                 |
| slider_name               | 字符串  |        | 滑动条标识符                                                                 |
| slider_select_on_hover    | 布尔值  |        | 悬停时是否自动聚焦                                                           |
| slider_selected_button    | 字符串  |        | 选中时触发的按钮ID                                                           |
| slider_deselected_button  | 字符串  |        | 取消选中时触发的按钮ID                                                       |
| slider_box_control        | 字符串  |        | 滑块按钮的子控件名称                                                         |
| background_control        | 字符串  |        | 背景子控件名称                                                               |
| background_hover_control  | 字符串  |        | 悬停背景子控件名称                                                           |
| progress_control          | 字符串  |        | 进度条子控件名称                                                             |
| progress_hover_control    | 字符串  |        | 悬停进度条子控件名称                                                         |

### 滑动条按钮

|     属性名称     |  类型  | 默认值 |             描述             |
| --------------- | :----: | :----: | ---------------------------- |
| default_control | 字符串 |        | 默认状态下显示的子控件名称   |
| hover_control   | 字符串 |        | 悬停状态下显示的子控件名称   |
| locked_control  | 字符串 |        | 锁定状态下显示的子控件名称   |

### 滚动视图

|          属性名称          |  类型   | 默认值 |                                     描述                                      |
| ------------------------- | :-----: | :----: | ---------------------------------------------------------------------------- |
| scrollbar_track_button    | 字符串  |        | 滚动条轨道按钮ID                                                             |
| scrollbar_touch_button    | 字符串  |        | 触摸输入按钮ID                                                               |
| scroll_speed              |  数值   |        | 滚动速度                                                                     |
| gesture_control_enabled   | 布尔值  |        |                                                                              |
| always_handle_scrolling   | 布尔值  |        |                                                                              |
| touch_mode                | 布尔值  |        |                                                                              |
| scrollbar_box             | 字符串  |        | 滚动条滑块子控件名称                                                         |
| scrollbar_track           | 字符串  |        | 滚动条轨道子控件名称                                                         |
| scroll_view_port          | 字符串  |        | 视口子控件名称                                                               |
| scroll_content            | 字符串  |        | 内容根容器子控件名称                                                         |
| scroll_box_and_track_panel | 字符串  |        | 包含滚动条和轨道的面板子控件名称                                             |
| jump_to_bottom_on_update  | 布尔值  |        | 当内容更新时自动滚动到底部（例如新增子元素时）                               |

### 自定义渲染

| 属性名称 |  类型  |                                                                                                                                                                                                                    描述                                                                                                                                                                                                                    |
| -------- | :----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| renderer |  枚举   | 可能值：<br>`hover_text_renderer`（悬浮文字）<br>`3d_structure_renderer`（3D结构）<br>`splash_text_renderer`（启动标语）<br>`ui_holo_cursor`（全息光标）<br>`trial_time_renderer`（试用倒计时）<br>`panorama_renderer`（全景图）<br>`actor_portrait_renderer`（角色肖像）<br>`banner_pattern_renderer`（旗帜图案）<br>`live_player_renderer`（实时玩家模型）<br>`web_view_renderer`（网页视图）<br>`hunger_renderer`（饥饿度）<br>`bubbles_renderer`（呼吸气泡）<br>`mob_effects_renderer`（状态效果）<br>`cursor_renderer`（光标）<br>`progress_indicator_renderer`（进度指示器）<br>`camera_renderer`（相机）<br>`horse_jump_renderer`（马匹跳跃）<br>`armor_renderer`（护甲值）<br>`horse_heart_renderer`（马匹生命值）<br>`heart_renderer`（心形生命值）<br>`hotbar_cooldown_renderer`（快捷栏冷却）<br>`hotbar_renderer`（快捷栏）<br>`hud_player_renderer`（HUD玩家模型）<br>`live_horse_renderer`（实时马匹模型）<br>`holographic_postrenderer`（全息后期处理）<br>`enchanting_book_renderer`（附魔书）<br>`debug_screen_renderer`（调试信息）<br>`gradient_renderer`（渐变色）<br>`paper_doll_renderer`（纸娃娃模型）<br>`name_tag_renderer`（名称标签）<br>`flying_item_renderer`（飞行物品）<br>`inventory_item_renderer`（物品栏图标）<br>`credits_renderer`（制作人员名单）<br>`vignette_renderer`（暗角效果）<br>`progress_bar_renderer`（进度条）<br>`debug_overlay_renderer`（调试覆盖层）<br>`background_renderer`（背景）<br>`bohr_model_renderer`（玻尔模型）<br>`experience_renderer`（经验值，已弃用）<br>`menu_background_renderer`（菜单背景，已弃用） |

#### 渲染器说明

|           渲染器名称           |                                  描述                                  |
| ----------------------------- | --------------------------------------------------------------------- |
| `flying_item_renderer`        | 物品交换时的飞行动画                                                  |
| `inventory_item_renderer`     | 物品图标渲染（仅限游戏内界面）                                        |
| `credits_renderer`            | 制作人员名单与终末之诗                                                |
| `vignette_renderer`           | 暗角视觉效果                                                          |
| `name_tag_renderer`           | 生物名称标签显示                                                      |
| `paper_doll_renderer`         | 皮肤模型展示                                                          |
| `debug_screen_renderer`       | 测试版调试信息显示                                                    |
| `enchanting_book_renderer`    | 附魔台书本动画                                                        |
| `gradient_renderer`           | 渐变颜色绘制                                                          |
| `live_horse_renderer`         | 马匹/驴子/羊驼等生物模型                                              |
| `live_player_renderer`        | 玩家模型展示                                                          |
| `hud_player_renderer`         | 同步玩家动作的HUD模型                                                 |
| `hotbar_renderer`             | 快捷栏槽位图标                                                        |
| `hotbar_cooldown_renderer`    | 物品冷却效果                                                          |
| `heart_renderer`              | 心形生命值显示                                                        |
| `horse_heart_renderer`        | 坐骑生命值显示                                                        |
| `armor_renderer`              | 护甲值显示                                                            |
| `horse_jump_renderer`         | 马匹跳跃进度条                                                        |
| `hunger_renderer`             | 饥饿度显示                                                            |
| `bubbles_renderer`            | 水下呼吸气泡                                                          |
| `mob_effects_renderer`        | 状态效果图标                                                          |
| `cursor_renderer`             | 屏幕中心十字准星                                                      |
| `progress_indicator_renderer` | 未使用                                                                |
| `camera_renderer`             | 相机物品功能                                                          |
| `web_view_renderer`           | 网页内容展示                                                          |
| `banner_pattern_renderer`     | 旗帜图案渲染                                                          |
| `actor_portrait_renderer`     | 角色肖像绘制                                                          |
| `trial_time_renderer`         | 试用版世界使用倒计时                                                  |
| `progress_bar_renderer`       | 多种进度条类型                                                        |
| `3d_structure_renderer`       | 结构方块预览                                                          |
| `splash_text_renderer`        | 随机启动标语显示（来自`splashes.json`）                               |
| `hover_text_renderer`         | 工具提示显示                                                          |
| `ui_holo_cursor`              | 全息光标效果                                                          |
| `panorama_renderer`           | 商店界面的世界全景展示                                                |

#### 特殊属性

|        属性名称        |        类型        |        适用渲染器        |                 描述                 |
| --------------------- | :---------------: | ------------------------ | ------------------------------------ |
| gradient_direction    |       枚举        | `gradient_renderer`      | 渐变方向：<br>`vertical`<br>`horizontal` |
| color1                | 向量 [r, g, b, a] | `gradient_renderer`      | 起始颜色                             |
| color2                | 向量 [r, g, b, a] | `gradient_renderer`      | 结束颜色                             |
| text_color            | 向量 [r, g, b, a] | `name_tag_renderer`      | 文本颜色                             |
| background_color      | 向量 [r, g, b, a] | `name_tag_renderer`      | 背景颜色                             |
| primary_color         | 向量 [r, g, b, a] | `progress_bar_renderer`  | 主色调                               |
| secondary_color       | 向量 [r, g, b, a] | `progress_bar_renderer`  | 辅助色调                             |
| camera_tilt_degrees   |       数值        | `paper_doll_renderer`    | 相机倾斜角度                         |
| starting_rotation     |       数值        | `paper_doll_renderer`    | 初始旋转角度                         |
| use_selected_skin     |      布尔值       | `paper_doll_renderer`    | 是否使用选定皮肤                     |
| use_uuid              |      布尔值       | `paper_doll_renderer`    | 是否使用UUID标识                     |
| use_skin_gui_scale    |      布尔值       | `paper_doll_renderer`    | 是否应用GUI缩放                      |
| use_player_paperdoll  |      布尔值       | `paper_doll_renderer`    | 是否显示玩家纸娃娃模型               |
| rotation              |       枚举        | `paper_doll_renderer`<br>`panorama_renderer` | 旋转模式：<br>`auto`<br>`gesture_x`<br>`custom_y` |
| end_event             |      字符串       | `credits_renderer`       | 播放结束事件                         |

### 屏幕属性

|             属性名称             |  类型   |                               描述                                |
| ------------------------------- | :-----: | ---------------------------------------------------------------- |
| render_only_when_topmost        | 布尔值  | 仅在处于屏幕栈顶层时渲染                                         |
| screen_not_flushable            | 布尔值  |                                                                  |
| always_accepts_input            | 布尔值  |                                                                  |
| render_game_behind              | 布尔值  | 允许下层屏幕继续接收用户输入                                     |
| absorbs_input                   | 布尔值  |                                                                  |
| is_showing_menu                 | 布尔值  |                                                                  |
| is_modal                        | 布尔值  | 是否为模态窗口                                                   |
| should_steal_mouse              | 布尔值  | 捕获并隐藏光标                                                   |
| low_frequency_rendering         | 布尔值  | 低内存渲染模式                                                   |
| screen_draws_last               | 布尔值  | 最后渲染的屏幕                                                   |
| vr_mode                         | 布尔值  |                                                                  |
| force_render_below              | 布尔值  | 强制渲染下层屏幕                                                 |
| send_telemetry                  | 布尔值  |                                                                  |
| close_on_player_hurt            | 布尔值  | 玩家受伤时关闭界面                                               |
| cache_screen                    | 布尔值  |                                                                  |
| load_screen_immediately         | 布尔值  |                                                                  |
| gamepad_cursor                  | 布尔值  |                                                                  |
| gamepad_cursor_deflection_mode  | 布尔值  |                                                                  |
| should_be_skipped_during_automation | 布尔值  |                                                                  |

### 选择轮盘

|         属性名称         |   类型   | 描述 |
| ------------------------ | :------: | ---- |
| inner_radius             |  数值   | 内半径 |
| outer_radius             |  数值   | 外半径 |
| state_controls           | 字符串数组 | 状态控件列表 |
| slice_count              |  整数   | 分片数量 |
| button_name              |  字符串  | 按钮名称 |
| iterate_left_button_name |  字符串  | 左切换按钮 |
| iterate_right_button_name |  字符串  | 右切换按钮 |
| initial_button_slice     |  整数   | 初始分片索引 |

### 文本转语音(TTS)

|             属性名称             |   类型   |                                       描述                                        |
| ------------------------------- | :------: | -------------------------------------------------------------------------------- |
| tts_name                        |  字符串  | TTS名称标识                                                                      |
| tts_control_header              |  字符串  |                                                                                  |
| tts_section_header              |  字符串  |                                                                                  |
| tts_control_type_order_priority |   整数   |                                                                                  |
| tts_index_priority              |   整数   |                                                                                  |
| tts_toggle_on                   |  字符串  | 切换开启时的TTS提示（用于toggle类型）                                            |
| tts_toggle_off                  |  字符串  | 切换关闭时的TTS提示（用于toggle类型）                                            |
| tts_override_control_value      |  字符串  |                                                                                  |
| tts_inherit_siblings            |  布尔值  |                                                                                  |
| tts_value_changed               |  字符串  |                                                                                  |
| ttsSectionContainer             |  布尔值  |                                                                                  |
| tts_ignore_count                |  布尔值  |                                                                                  |
| tts_skip_message                |  布尔值  |                                                                                  |
| tts_value_order_priority        |   整数   |                                                                                  |
| tts_play_on_unchanged_focus_control |  布尔值  |                                                                                  |
| tts_ignore_subsections          |  布尔值  |                                                                                  |
| text_tts                        |  字符串  |                                                                                  |
| use_priority                    |  布尔值  | 是否使用`priority`属性决定子控件的TTS优先级                                      |
| priority                        |  布尔值  | 元素的TTS优先级顺序                                                              |

### 标签页（已弃用）

| 属性名称    |  类型  | 默认值 |           描述            |
| ----------- | :----: | :----: | ------------------------- |
| tab_index   |  整数  |        | 标签页在组内的索引        |
| tab_group   |  整数  |        | 所属标签组ID              |
| tab_control | 字符串 |        | 标签激活时显示的控件名称  |

### 轮播文本（已弃用）

|    属性名称    |        类型        | 默认值 |          描述          |
| ------------- | :---------------: | :----: | ---------------------- |
| always_rotate |      布尔值       |        |                        |
| rotate_speed  |       数值        |        |                        |
| hover_color   | 向量 [r, g, b, a] |        | 悬停状态颜色           |
| hover_alpha   |      浮点数       |        | 悬停状态透明度         |
| pressed_color | 向量 [r, g, b, a] |        | 按下状态颜色           |
| pressed_alpha |      浮点数       |        | 按下状态透明度         |

## 属性附加说明

### 锚点属性

锚点允许元素对齐到特定基点，该基点将作为位置、尺寸、缩放、动画等变换的参考原点。在JSON UI中，通过 `anchor_from` 和 `anchor_to` 两个属性共同实现这一功能。

大多数情况下，这两个属性会被赋予相同的值：

::: code-group
```json [RP/ui/example_file.json]
{
  "element": {
    "anchor_from": "top_left",
    "anchor_to": "top_left"
  }
}
```
:::

<WikiImage
	src="/assets/images/json-ui/json-ui-documentation/anchor_same_value.png"
	alt="相同锚点值示例"
	pixelated="true"
	width=782
/>

当两者采用不同值时会发生什么？以 `anchor_from: center` 和 `anchor_to: top_left` 的组合为例，这是理解其底层机制的最佳案例：

::: code-group
```json [RP/ui/example_file.json]
{
  "element": {
    "anchor_from": "center",
    "anchor_to": "top_left"
  }
}
```
:::

<WikiImage
	src="/assets/images/json-ui/json-ui-documentation/anchor_center_top_left.png"
	alt="中心锚点对齐左上角示例"
	pixelated="true"
	width=782
/>

此时元素的左上角点将被定位到父元素的中心点。

另一个复杂案例：

<WikiImage
	src="/assets/images/json-ui/json-ui-documentation/anchor_ce_rm_tm_tl.png"
	alt="复合锚点对齐示例"
	pixelated="true"
	width=782
/>

蓝色方框的左上角对齐到父元素的上边缘中点，而黑色方框的右侧中点则对齐到父元素中心。

简而言之，`anchor_to` 表示元素自身的锚点，该锚点将与父元素的 `anchor_from` 指定位置进行对齐。

### 变量属性

| 名称        |   类型   | 描述         |
| ----------- | :------: | ------------ |
| `requires`  | string   | 触发条件     |

<br>

当仅需单个变量时，使用 `"variables": {}` 格式：

::: code-group
```json [RP/ui/example_file.json]
{
  "element": {
    ...
    "size": "$el_size",
    "$el_size|default": ["100%", 20],
    "variables": {
      "requires": "$var_condition",
      "$el_size": ["100%", 30]
    }
  }
}
```
:::

多个变量时使用 `"variables": [{}]` 数组格式：

::: code-group
```json [RP/ui/example_file.json]
{
  "element": {
    ...
    "size": "$el_size",
    "offset": "$el_offset",
    "$el_offset|default": [0, 40],
    "$el_size|default": ["100%", 20],
    "variables": [
      {
        "requires": "$var_condition",
        "$el_size": ["100%", 30]
      },
      {
        "requires": "$other_var_condition",
        "$el_offset": [0, 15],
        "$el_size": ["90%", 35]
      }
    ]
  }
}
```
:::

## 属性包 Property Bag

|                名称                |        类型         |                     是否必要                     |                           说明                           |
| ---------------------------------- | :-----------------: | ---------------------------------------------------- | --------------------------------------------------------------- |
| #filtered_light_multiplier         |        float        | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #banner_patterns                   |       string        | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #banner_colors                     |       string        | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #item_id_aux                       |         int         | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #item_custom_color                 |         int         | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #disabled_filter_visible           |       boolean       | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #item_pickup_time                  |        float        | type[custom] <br> renderer[inventory_item_renderer]  |                                                                 |
| #look_at_cursor                    |       boolean       | type[custom] <br> renderer[hud_player_renderer]      |                                                                 |
| entity_type                        |        enum         | type[custom] <br> renderer[paper_doll_renderer]      | 可能值: <br> `player` <br> `npc`                       |
| #skin_idx                          |         int         | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #player_uuid                       |       string        | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #skin_rotation                     |       boolean       | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #custom_rot_y                      |        float        | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #gesture_delta_source              |       string        | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #gesture_mouse_delta_x             |       string        | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #pack_id                           |         int         | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #force_skin_update                 |       string        | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #progress_bar_visible              |       boolean       | type[custom] <br> renderer[paper_doll_renderer]      |                                                                 |
| #progress_bar_total_amount         |        float        | type[custom] <br> renderer[progress_bar_renderer]    |                                                                 |
| #progress_bar_current_amount       |        float        | type[custom] <br> renderer[progress_bar_renderer]    |                                                                 |
| is_durability                      |       boolean       | type[custom] <br> renderer[progress_bar_renderer]    |                                                                 |
| round_value                        |       boolean       | type[custom] <br> renderer[progress_bar_renderer]    |                                                                 |
| #hover_text                        |       string        | type[custom] <br> renderer[hover_text_renderer]      |                                                                 |
| #open                              |       boolean       | type[custom] <br> renderer[enchanting_book_renderer] |                                                                 |
| flying_item_count                  |         int         | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_id_aux                 |         int         | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_custom_color           |         int         | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_origin_position_x      |        float        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_origin_position_y      |        float        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_origin_scale           |        float        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_destination_position_x |        float        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_destination_position_y |        float        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_destination_scale      |        float        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_banner_patterns        |       string        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| flying_item_banner_colors          |       string        | type[custom] <br> renderer[flying_item_renderer]     |                                                                 |
| #use_heart_offset                  |       boolean       | type[custom] <br> renderer[armor_renderer]           |                                                                 |
| opacity_override                   |        float        | type[custom] <br> renderer[vignette_renderer]        |                                                                 |
| #playername                        |       string        | type[custom] <br> renderer[name_tag_renderer]        |                                                                 |
| #x_padding                         |       number        | type[custom] <br> renderer[name_tag_renderer]        |                                                                 |
| #entity_id                         |    string or int    | type[custom] <br> renderer[live_horse_renderer]      |                                                                 |
| #hyperlink                         |       string        | type[button]                                         |                                                                 |
| #anchored_offset_value_x           |       number        | `use_anchored_offset` property                       |                                                                 |
| #anchored_offset_value_y           |       number        | `use_anchored_offset` property                       |                                                                 |
| #size_binding_x                    |       number        | `use_anchored_offset` property                       |                                                                 |
| #size_binding_y                    |       number        | `use_anchored_offset` property                       |                                                                 |
| #has_focus                         |       boolean       | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #block_position                    |  Vector [x, y, z]   | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #top_right_block                   |  Vector [x, y, z]   | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #bottom_left_block                 |  Vector [x, y, z]   | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #include_entities                  |       boolean       | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #remove_blocks                     |       boolean       | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #include_players                   |       boolean       | type[custom] <br> renderer[3d_structure_renderer]    |                                                                 |
| #slider_steps                      |       number        | type[slider]                                         |                                                                 |
| #slider_value                      |       number        | type[slider]                                         |                                                                 |
| #property_field                    |       string        | type[edit_box]                                       |                                                                 |
| #hover_slice                       |         int         | type[selection_wheel]                                |                                                                 |
| #toggle_state                      |       boolean       | type[toggle]                                         |                                                                 |
| #start_selected                    |       boolean       |                                                      |                                                                 |
| #tts_dialog_title                  |       string        |                                                      |                                                                 |
| #tts_dialog_body                   |       string        |                                                      |                                                                 |
| force_update                       |       boolean       |                                                      |                                                                 |
| #sub_command                       |       string        |                                                      |                                                                 |
| #panel_title                       |       string        |                                                      |                                                                 |
| #index                             |         int         |                                                      |                                                                 |
| #collection_prefix                 |       string        |                                                      |                                                                 |
| #collection_name                   |       string        |                                                      |                                                                 |
| #visible                           |       boolean       |                                                      |                                                                 |
| #common                            | Vector [r, g, b, a] |                                                      |                                                                 |
| #uncommon                          | Vector [r, g, b, a] |                                                      |                                                                 |
| #rare                              | Vector [r, g, b, a] |                                                      |                                                                 |
| #epic                              | Vector [r, g, b, a] |                                                      |                                                                 |
| #legendary                         | Vector [r, g, b, a] |                                                      |                                                                 |
| reset_group                        |        enum         |                                                      | 可能值: <br> `video` <br> `audio` <br> `accessibility` |
| #text                              |       string        |                                                      |                                                                 |
| timer_duration                     |       number        |                                                      |                                                                 |
| #should_host                       |       boolean       |                                                      |                                                                 |
| is_local                           |       boolean       |                                                      |                                                                 |
| #is_left                           |       boolean       |                                                      |                                                                 |
| #is_skins                          |       boolean       |                                                      |                                                                 |
| #is_featured                       |       boolean       |                                                      |                                                                 |
| #image_name                        |       string        |                                                      |                                                                 |
| #is_dropdown                       |       boolean       |                                                      |                                                                 |
| #timer_field_count_to_show         |       number        |                                                      |                                                                 |
| #owned_incompatible_prompt_color   |  Vector [r, g, b]   |                                                      |                                                                 |
| #modal_title_text                  |       string        |                                                      |                                                                 |
| #modal_label_text                  |       string        |                                                      |                                                                 |
| #buttons_visible                   |       boolean       |                                                      |                                                                 |
| #no_buttons_visible                |       boolean       |                                                      |                                                                 |
| #single_button_visible             |       boolean       |                                                      |                                                                 |
| #two_buttons_visible               |       boolean       |                                                      |                                                                 |
| is_fixed_inventory                 |       boolean       |                                                      |                                                                 |
| experimental_radio_button_state    |       string        |                                                      |                                                                 |
| classic_radio_button_state         |       string        |                                                      |                                                                 |

## UI动画 Animations

|  动画属性字段  |     类型      |                                                                                                                                                                                                                                                                                       说明                                                                                                                                                                                                                                                                                        |
| ------------------------- | :-----------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anim_type                 |     enum      | 可能值: <br> `alpha` <br> `clip` <br> `color` <br> `flip_book` <br> `offset` <br> `size` <br> `uv` <br> `wait` <br> `aseprite_flip_book`                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| duration                  |    number     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| next                      |    string     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| destroy_at_end            |    string     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| play_event                |    string     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| end_event                 |    string     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| start_event               |    string     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| reset_event               |    string     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| easing                    |     enum      | 可能值: <br> `linear` <br> `spring` <br> `in_quad` <br> `out_quad` <br> `in_out_quad` <br> `in_cubic` <br> `out_cubic` <br> `in_out_cubic` <br> `in_quart` <br> `out_quart` <br> `in_out_quart` <br> `in_quint` <br> `out_quint` <br> `in_out_quint` <br> `in_sine` <br> `out_sine` <br> `in_out_sine` <br> `in_expo` <br> `out_expo` <br> `in_out_expo` <br> `in_circ` <br> `out_circ` <br> `in_out_circ` <br> `in_bounce` <br> `out_bounce` <br> `in_out_bounce` <br> `in_back` <br> `out_back` <br> `in_out_back` <br> `in_elastic` <br> `out_elastic` <br> `in_out_elastic` |
| from                      |               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| to                        |               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| initial_uv                | Vector [u, v] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| fps                       |      int      | Frames per second                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| frame_count               |      int      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| frame_step                |    number     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| reversible                |    boolean    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| resettable                |    boolean    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| scale_from_starting_alpha |    boolean    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| activated                 |    boolean    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

更多关于 `aseprite_flip_book` 动画类型的属性说明, 请前往 [Aseprite Animations](/json-ui/aseprite-animations) 查阅详细文档。

## 全局变量 Global Variables

|                变量名                |                                           说明                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| $store_disabled                        |                                                                                           |
| $game_pad                              | There's a controller connected to the device                                              |
| $mouse                                 | There's a mouse connected to the device                                                   |
| $touch                                 |                                                                                           |
| $trial                                 | It's in the trial version of the game                                                     |
| $build_platform_UWP                    |                                                                                           |
| $win10_edition                         |                                                                                           |
| $ignore_add_servers                    |                                                                                           |
| $disable_gamertag_controls             |                                                                                           |
| $console_edition                       |                                                                                           |
| $osx_edition                           |                                                                                           |
| $pocket_edition                        |                                                                                           |
| $education_edition                     |                                                                                           |
| $world_archive_support                 |                                                                                           |
| $file_picking_supported                |                                                                                           |
| $desktop_screen                        | If the classic UI is selected                                                             |
| $pocket_screen                         | If the pocket UI is selected                                                              |
| $is_holographic                        |                                                                                           |
| $gear_vr                               |                                                                                           |
| $oculus_rift                           |                                                                                           |
| $is_living_room_mode                   |                                                                                           |
| $is_reality_mode                       |                                                                                           |
| $realms_beta                           |                                                                                           |
| $fire_tv                               |                                                                                           |
| $is_ios                                |                                                                                           |
| $apple_tv                              |                                                                                           |
| $is_windows_10_mobile                  |                                                                                           |
| $image_picking_not_supported           |                                                                                           |
| $pre_release                           |                                                                                           |
| $ios                                   |                                                                                           |
| $is_console                            |                                                                                           |
| $can_quit                              |                                                                                           |
| $is_settopbox                          |                                                                                           |
| $microsoft_os                          |                                                                                           |
| $apple_os                              |                                                                                           |
| $google_os                             |                                                                                           |
| $nx_os                                 |                                                                                           |
| $horizontal_safezone_size              |                                                                                           |
| $vertical_safezone_size                |                                                                                           |
| $can_splitscreen                       |                                                                                           |
| $is_secondary_client                   |                                                                                           |
| $multiplayer_requires_live_gold        |                                                                                           |
| $xbox_one                              |                                                                                           |
| $is_pregame                            | If it's a out-game screen. It's in-game when you are playing in a world, server or realms |
| $is_win10_arm                          |                                                                                           |
| $vibration_supported                   |                                                                                           |
| $is_mobile_vr                          |                                                                                           |
| $is_xboxlive_enabled                   |                                                                                           |
| $device_must_be_removed_for_xbl_signin |                                                                                           |
| $is_publish                            | It's public and not a developer version                                                   |
| $is_desktop                            |                                                                                           |
| $is_ps4                                |                                                                                           |
| $is_on_3p_server                       |                                                                                           |
| $ignore_3rd_party_servers              |                                                                                           |
| $is_berwick                            |                                                                                           |

## Hardcoded Hyperlinks

`#hyperlink` doesn't allow custom urls. These are the ones that will work:

-   `http://education.minecraft.net/eula`
-   `http://pocketbeta.minecraft.net/p/how-to-join-and-leave-beta.html`
-   `http://aka.ms/minecraftrealmsfb`
-   `http://aka.ms/minecraftrealmsterms`
-   `http://aka.ms/minecraftfb`
-   `http://aka.ms/minecraftedusupport`
-   `https://aka.ms/blockxboxmessages`
-   `http://aka.ms/minecraftfbbeta`
-   `https://minecraft.net/attribution`
-   `http://aka.ms/mcedulogs`
-   `https://minecraft.net/licensed-content/`
-   `https://education.minecraft.net/eula`
-   `https://aka.ms/mcedulogs`
-   `https://aka.ms/minecraftrealmsterms`
-   `https://aka.ms/minecraftfb`
-   `https://aka.ms/minecraftfbbeta`
-   `https://aka.ms/minecraftedusupport`
-   `https://itunes.apple.com/us/app/minecraft/id479516143?mt=8`
-   `https://account.xbox.com/Settings`
-   `https://aka.ms/meeterms`
-   `https://aka.ms/privacy`
-   `https://aka.ms/MCBanned`
-   `https://aka.ms/MCMultiplayerHelp`
-   `https://aka.ms/meeeula`
-   `https://aka.ms/mee_privacy`
-   `https://www.minecraft.net/attribution/?hideChrome`
-   `https://aka.ms/switchattribution`
-   `https://www.minecraft.net/licensed-content/?hideChrome`
-   `https://aka.ms/switchcontent`
-   `https://social.xbox.com/changegamertag`

## Hardcoded Button IDs

Some of them only work in specific screens.

### Buttons IDs:

-   `button.menu_exit`
-   `button.menu_cancel` (`Escape` key or Controller `B`)
-   `button.menu_inventory_cancel` (`Open Inventory` keybinding)
-   `button.menu_ok` (`Enter` key)
-   `button.menu_select` (Mouse click)
-   `button.controller_select` (Controller `X`)
-   `button.menu_secondary_select`
-   `button.controller_secondary_select`
-   `button.controller_secondary_select_left`
-   `button.controller_secondary_select_right` (Controller `R3`)
-   `button.controller_start`
-   `button.menu_up` (`Arrow Up` key)
-   `button.menu_down` (`Arrow Down` key)
-   `button.menu_left` (`Arrow Left` key)
-   `button.menu_right` (`Arrow Right` key)
-   `button.menu_tab_left` (`Menu Tab Left` keybinding or Controller `Left Bumper`)
-   `button.menu_tab_right` (`Menu Tab Right` keybinding or Controller `Right Bumper`)
-   `button.menu_alternate_tab_left`
-   `button.menu_alternate_tab_right`
-   `button.menu_autocomplete` (Uses `Tab` key)
-   `button.menu_autocomplete_back`
-   `button.controller_autocomplete`
-   `button.controller_autocomplete_back`
-   `button.menu_textedit_up` (Uses `Arrow Up` key)
-   `button.menu_textedit_down` (Uses `Arrow Down` key)
-   `button.controller_textedit_up`
-   `button.controller_textedit_down`
-   `button.menu_auto_place`
-   `button.menu_inventory_drop` (`Drop Item` keybinding)
-   `button.menu_inventory_drop_all` (`Drop Item` + `Control` key)
-   `button.menu_clear`
-   `button.chat` (`Open Chat` keybinding)
-   `button.mobeffects` (`Mob Effects` keybinding)
-   `key.emote` (`Emote` keybinding)
-   `button.slot1` (Emote Wheel) (`1` key)
-   `button.slot2` (Emote Wheel) (`2` key)
-   `button.slot3` (Emote Wheel) (`3` key)
-   `button.slot4` (Emote Wheel) (`4` key)
-   `button.slot5` (Emote Wheel) (`5` key)
-   `button.slot6` (Emote Wheel) (`6` key)
-   `button.inventory_right` (`Mouse Wheel Up`)
-   `button.inventory_left` (`Mouse Wheel Down`)
-   `button.scoreboard`
-   `button.hide_gui` (`F1` key)
-   `button.hide_tooltips`
-   `button.hide_paperdoll`
-   `button.slot0`
-   `button.slot1` (`1` key)
-   `button.slot2` (`2` key)
-   `button.slot3` (`3` key)
-   `button.slot4` (`4` key)
-   `button.slot5` (`5` key)
-   `button.slot6` (`6` key)
-   `button.slot7` (`7` key)
-   `button.slot8` (`8` key)
-   `button.slot9` (`9` key)
-   `button.menu_vr_realign`
-   `any` (literally the name of it)

### Specific Screen Button IDs:

#### Settings (`ui/settings_screen.json`)

-   `button.open_content_log_history`
-   `button.clear_content_log_files`
-   `button.clear_msa_token_button`
-   `button.terms_and_conditions_popup`
-   `button.credits`
-   `button.unlink_msa`
-   `button.attribute_popup`
-   `button.licensed_content`
-   `button.font_license`
-   `button.tos_hyperlink`
-   `button.privpol_hyperlink`
-   `button.tos_popup`
-   `button.privpol_popup`
-   `button.binding_button`
-   `button.reset_binding`
-   `button.reset_keyboard_bindings`
-   `button.view_account_errors`

#### Book (`ui/book_screen.json`)

-   `button.prev_page`
-   `button.next_page`
-   `button.book_exit`

#### Chat (`ui/chat_screen.json`)

-   `button.send`
-   `button.chat_autocomplete`
-   `button.chat_autocomplete_back`
-   `button.chat_previous_message`
-   `button.chat_next_message`
-   `button.chat_menu_cancel`

#### Command Block (`ui/command_block_screen.json`)

-   `command_block.input_minimize`
-   `button.chat_autocomplete`
-   `button.chat_autocomplete_back`

#### Comment (`ui/comment_screen.json`)

-   `button.comment_options_close`
-   `button.comment_feed_options_close`
-   `button.close_comments`
-   `button.comment_next_button`
-   `button.comment_prev_button`

#### Credits (`ui/credits_screen.json`)

-   `button.show_skip`

#### Death Menu (`ui/death_screen.json`)

-   `button.respawn_button`
-   `button.main_menu_button`

#### Emote Wheel (`ui/emote_screen_wheel.json`)

-   `button.rebind_mode`
-   `button.dressing_room`
-   `button.emote_selected`
-   `button.select_emote_slot_0`
-   `button.select_emote_slot_1`
-   `button.select_emote_slot_2`
-   `button.select_emote_slot_3`
-   `button.select_emote_slot_4`
-   `button.select_emote_slot_5`
-   `button.iterate_selection_left`
-   `button.iterate_selection_right`

#### Feed (`ui/feed_screen.json`)

-   `button.feed_image`
-   `button.newpost`
-   `button.add_screenshot`
-   `button.feed_comment`
-   `button.feed_prev_button`
-   `button.feed_next_button`
-   `button.feed_new_post_close`
-   `button.feed_options_close`
-   `button.close_feed`

#### Game Menu (`ui/pause_screen.json`)

-   `button.to_profile_or_skins_screen`
-   `button.player_profile_card`
-   `button.menu_continue`
-   `button.menu_server_store`
-   `button.screenshot`
-   `button.menu_how_to_play`
-   `button.menu_feedback`
-   `button.menu_permission`
-   `button.menu_invite_players`
-   `button.menu_quit`
-   `button.menu_feed`
-   `button.pause_focus_filler`

#### In Bed (`ui/in_bed_screen.json`)

-   `button.wake_up_button`

#### Invite (`ui/invite_screen.json`)

-   `button.add_friend`
-   `button.add_member`
-   `button.send_invites`

#### Manage Feed (`ui/manage_feed_screen.json`)

-   `button.manage_feed_prev_button`
-   `button.manage_feed_next_button`
-   `button.manage_feed_ignore`
-   `button.manage_feed_delete`
-   `button.close_manage_feed`

#### Anvil (`ui/anvil_screen.json`)

-   `button.anvil_take_all_place_all`
-   `button.anvil_coalesce_stack`

#### Cartography Table (`ui/cartography_screen.json`)

-   `button.cartography_result_take_all_place_all`

#### Enchanting Table (`ui/enchanting_table_screen.json`)

-   `button.enchant`

#### Grindstone (`ui/grindstone_screen.json`)

-   `button.grindstone_take_all_place_all`
-   `button.grindstone_coalesce_stack`

#### Loom (`ui/loom_screen.json`)

-   `button.loom_result_take_all_place_all`
-   `button.pattern_select`

#### Villager Trade (`ui/trade_screen.json`)

- `button.cycle_recipe_left`
- `button.cycle_recipe_right`
- `button.trade_take_all_place_all`
- `button.trade_take_half_place_one`
- `button.trade_coalesce_stack`

#### Play (`ui/play_screen.json`)

- `button.menu_sign_in_to_view_realms`
- `button.menu_realms_world_item_edit`
- `button.menu_realms_feed`
- `button.menu_realms_world_item_remove`
- `button.menu_network_world_item`
- `button.menu_network_server_world_edit`
- `button.connect_to_third_party_server`
- `button.view_third_party_server_offers`
- `button.description_read_toggle`
- `button.news_read_toggle`
- `button.local_world_upload`
- `button.menu_start_local_world`
- `button.convert_legacy_world`
- `button.menu_local_world_item_edit`
- `button.menu_legacy_world_item_delete`
- `button.import_beta_retail_local_world`
- `button.import_beta_retail_legacy_world`
- `button.menu_network_add_friend`
- `button.menu_network_join_by_code`
- `button.menu_quick_play`
- `button.new_world_upload`
- `button.menu_local_world_create`
- `button.create_on_realms_button`
- `button.archived_world_upload`
- `button.menu_import_level`
- `button.menu_sync_legacy_worlds`
- `button.realms_warning_more_info`
- `button.menu_realm_world_trial`
- `button.menu_realm_nintendo_first_realm_purchase_button`
- `button.no_local_worlds_launch_help`
- `button.menu_network_join_by_code_popup_join`
- `button.join_server_anyway`
- `button.cancel_join_server`

### Others

-   `button.try_menu_exit`
-   `button.close_dialog`
-   `button.menu_play`
-   `$play_button_target` (**hardcoded**)
-   `button.menu_store`
-   `button.menu_achievements`
-   `button.menu_settings`
-   `button.signin`
-   `button.menu_skins`
-   `button.to_profile_screen`
-   `button.menu_courses`
-   `button.menu_tutorial`
-   `button.featured_world`
-   `button.switch_accounts`
-   `button.launch_editions`
-   `button.edu_feedback`
-   `button.edu_resources`
-   `button.menu_buy_game`
-   `button.menu_invite_notification`
-   `button.search`
-   `button.hotbar_inventory_button`
-   `button.select_offer`
-   `button.action_button`
-   `button.create_realm`
-   `button.switch_accounts`
-   `button.hotbar_select`
-   `button.hotbar_ok`
-   `button.slot_pressed`
-   `button.hotbar_inventory_left`
-   `button.hotbar_inventory_right`
-   `button.hide_gui_all`
-   `button.hide_tooltips_hud`
-   `button.hide_paperdoll_hud`
-   `button.slot_1`
-   `button.slot_2`
-   `button.slot_3`
-   `button.slot_4`
-   `button.slot_5`
-   `button.slot_6`
-   `button.slot_7`
-   `button.slot_8`
-   `button.slot_9`
-   `button.slot_0`
-   `button.chat`
-   `button.menu_continue`
-   `user_confirm_dialog.escape`
-   `user_confirm_dialog.left_button`
-   `user_confirm_dialog.middle_button`
-   `user_confirm_dialog.rightcancel_button`
-   `button.view_skin`
-   `button.delete_action`
-   `button.exit_student`
-   `button.play_video`
-   `button.menu_store_error`
-   `button.left_panel_tab_increment`
-   `button.left_panel_tab_decrement`
-   `button.right_panel_tab_increment`
-   `button.right_panel_tab_decrement`
-   `button.layout_increment`
-   `button.layout_decrement`
-   `button.is_hovered`
-   `button.container_take_all_place_all`
-   `button.container_take_half_place_one`
-   `button.container_auto_place`
-   `button.coalesce_stack`
-   `button.shape_drawing`
-   `button.destroy_selection`
-   `button.clear_selected_recipe`
-   `button.clear_hotbar_or_remove_one`
-   `button.clear_hotbar_or_drop`
-   `button.container_reset_held`
-   `button.container_auto_place`
-   `button.container_slot_hovered`
-   `button.button_hovered`
-   `button.shift_pane_focus`
-   `button.focus_left`
-   `button.focus_right`
-   `button.filter_toggle_hovered`
-   `button.drop_one`
-   `button.cursor_drop_one`
-   `button.drop_all`
-   `button.cursor_drop_all`
-   `button.search_bar_clear`
-   `button.search_bar_selected`
-   `button.search_bar_deselected`
-   `button.menu_leave_screen`
-   `button.turn_doll`
-   `button.select_skin`
-   `button.skin_hovered`
-   `button.skin_unhovered`
-   `button.leave`
-   `button.leave_on_device`
-   `button.text_edit_box_selected`
-   `button.text_edit_box_deselected`
-   `button.text_edit_box_hovered`
-   `button.text_edit_box_clear`
-   `button.help`
-   `button.menu_open_uri`
-   `button.no_interaction`
-   `button.copy_to_clipboard`
-   ...

## Hardcoded Collection Names

All of them only in specific screens.

### Screen specific:

#### Book (`ui/book_screen.json`)

-   `book_pages`
-   `pick_collection`

#### Bundle Purchase Warning (`ui/bundle_purchase_warning_screen.json`)

-   `owned_list`
-   `unowned_list`

#### Chat (`ui/chat_screen.json`)

-   `auto_complete`
-   `font_colors`
-   `host_main_collection`
-   `players_collection`
-   `host_teleport_collection`
-   `host_time_collection`
-   `host_weather_collection`

#### Choose Realm (`ui/choose_realm_screen.json`)

-   `realms_collection`

#### Coin Purchase (`ui/coin_purchase_screen.json`)

-   `coin_purchase_grid`

#### Comment (`ui/comment_screen.json`)

-   `comment_collection`

#### Content Log History (`ui/content_log_history_screen.json`)

-   `content_log_message`

#### Create World Upsell (`ui/create_world_upsell_screen.json`)

-   `world_list`
-   `realm_list`

#### Custom Templates (`ui/custom_templates_screen.json`)

-   `templates_collection`

#### Feed (`ui/feed_screen.json`)

-   `feed_collection`

#### HUD (`ui/hud_screen.json`)

-   `boss_bars`
-   `chat_text_grid`
-   `hotbar_items`
-   `scoreboard_players`
-   `scoreboard_scores`
-   `left_helper_collection`
-   `right_helper_collection`

#### Invite (`ui/invite_screen.json`)

-   `online_platform_friends`
-   `online_linked_account_friends`
-   `online_xbox_live_friends`
-   `offline_platform_friends`
-   `offline_linked_account_friends`
-   `offline_xbox_live_friends`

#### Manage Feed (`ui/manage_feed_screen.json`)

-   `manage_feed_collection`

#### Manifest Validation (`manifest_validation_screen.json`)

-   `pack_errors`

#### Mob Effects (`ui/mob_effects_screen.json`)

-   `mob_effects_collection`

#### Game Menu (`ui/pause_screen.json`)

-   `players_collection`

#### PDP (`ui/pdp_screen.json`)

-   `factory_collection`
-   `ratings_star_collection`

#### Permissions (`ui/permissions_screen.json`)

-   `players_collection` - it's also used in `pause_screen.json`
-   `permissions_collection`

#### Persona (`ui/persona_screen.json`)

-   `color_collection`
-   `skin_pack_in_grid_item`
-   `persona_featured_skin_pack_collection`
-   `body_size_collection`
-   `arm_size_collection`
-   `category_featured_collection`
-   `main_featured_collection`
-   `profile_featured_collection`
-   `custom_section_collection`
-   `featured_collection`
-   `foobar_collection`
-   `emote_collection`

#### Play (`ui/play_screen.json`)

-   `friends_network_worlds`
-   `cross_platform_friends_network_worlds`
-   `lan_network_worlds`
-   `personal_realms`
-   `friends_realms`
-   `servers_network_worlds`
-   `third_party_server_network_worlds`
-   `server_screenshot_collection`
-   `server_games_collection`
-   `local_worlds`
-   `legacy_worlds`
-   `beta_retail_local_worlds`
-   `personal_realms`
-   `loading_personal_realms`
-   `friends_realms`
-   `loading_friends_realms`

#### Portfolio (`ui/portfolio_screen.json`)

-   `photos`

#### Progress (`ui/progress_screen.json`)

-   `required_resourcepacks`
-   `optional_resourcepacks`

#### Realms Pending Invitations (`ui/realms_pending_invitations_screen.json`)

-   `pending_invites_collection`

#### Realms Settings (`ui/realms_settings_screen.json`)

-   `additional_realms_subscriptions_collection`
-   `realms_branch_collection`
-   `realms_backup_collection`
-   `members_collection`
-   `invited_friends_collection`
-   `uninvited_friends_collection`
-   `blocked_players_collection`

#### Screenshot Picker (`ui/screenshot_picker_screen.json`)

-   `screenshotpicker_collection`

#### Server Form (`ui/server_form.json`)

-   `custom_form`
-   `form_buttons`
-   `custom_dropdown`

#### Settings (`ui/settings_screen.json`)

-   `keyboard_standard_collection`
-   `keyboard_full_collection`
-   `gamepad_collection`
-   `languages`
-   `realms_plus_subscriptions_collection`
-   `additional_realms_subscriptions_collection`
-   `#selected_pack_items_global`
-   `#available_pack_items_global`
-   `#realms_pack_items_global`
-   `#unowned_pack_items_global`
-   `#invalid_pack_items_global`
-   `#selected_pack_items_level`
-   `#available_pack_items_level`
-   `#realms_pack_items_level`
-   `#unowned_pack_items_level`
-   `#invalid_pack_items_level`
-   `#selected_pack_items_addon`
-   `#available_pack_items_addon`
-   `#realms_pack_items_addon`
-   `#unowned_pack_items_addon`
-   `#invalid_pack_items_addon`
-   `experimental_toggles`
-   `world_panel`
-   `world_template_panel`
-   `resource_panel`
-   `behavior_panel`
-   `skin_panel`
-   `cache_panel`
-   `dependent_packs_panel`
-   `dependency_panel`

#### Structure Block (`ui/structure_editor_screen.json`)

-   `save_size_grid`
-   `save_offset_grid`
-   `load_offset_grid`
-   `export_size_grid`
-   `export_offset_grid`

#### Seed Picker (`ui/ugc_viewer_screen.json`)

-   `ugc_items`

#### World Templates (`ui/world_templates_screen.json`)

-   `world_templates`
-   `realms_plus_templates`
-   `custom_world_templates`
-   `#suggested_offers_collection`

#### Anvil (`ui/anvil_screen.json`)

-   `anvil_input_items`
-   `anvil_material_items`
-   `anvil_result_items`

#### Beacon (`ui/beacon_screen.json`)

-   `beacon_payment_items`
-   `speed`
-   `haste`
-   `resist`
-   `jump`
-   `strength`
-   `regen`
-   `extra`
-   `confirm`
-   `cancel`

#### Brewing Stand (`ui/brewing_stand_screen.json`)

-   `brewing_fuel_item`
-   `brewing_input_item`
-   `brewing_result_items`

#### Cartography Table (`ui/cartography_screen.json`)

-   `cartography_input_items`
-   `cartography_additional_items`
-   `cartography_result_items`

#### Enchanting Table (`ui/enchanting_table_screen.json`)

-   `enchanting_input_items`
-   `enchanting_lapis_items`
-   `#enchant_buttons`

#### Furnace (`ui/furnace_screen.json`)

-   `furnace_ingredient_items`
-   `furnace_fuel_items`
-   `furnace_output_items`

#### Gridstone (`ui/grindstone_screen.json`)

-   `grindstone_input_items`
-   `grindstone_additional_items`
-   `grindstone_result_items`

#### Horse (`ui/horse_screen.json`)

-   `horse_equip_items`

#### Inventory (`ui/inventory_screen.json` and `ui/inventory_screen_pocket.json`)

-   `armor_items`
-   `offhand_items`
-   `crafting_input_items`
-   `crafting_output_items`
-   `recipe_book`

#### Loom (`ui/loom_screen.json`)

-   `loom_input_items`
-   `loom_dye_items`
-   `loom_material_items`
-   `loom_result_items`
-   `patterns`

#### Smithing Table (`ui/smithing_table_screen.json`)

-   `smithing_table_input_items`
-   `smithing_table_material_items`
-   `smithing_table_result_items`

#### Stonecutter (`ui/stonecutter_screen.json`)

-   `stonecutter_input_items`
-   `stonecutter_result_items`
-   `stones`

#### Villager Trade 2 (`ui/trade_2_screen.json`)

-   `trade2_ingredient1_item`
-   `trade2_ingredient2_item`
-   `trade2_result_item`
-   `trade_item_1`
-   `trade_item_2`
-   `sell_item`
-   `trades`
-   `trade_tiers`

## Hardcoded Binding Names

Some of them only work in specific screens.

### Screen specific:

#### Account Transfer Error (`ui/account_transfer_error_screen.json`)

-   `#error_title_text`
-   `#error_number_label`
-   `#error_number`
-   `#correlation_id_label`
-   `#correlation_id`

#### Add External Server (`ui/add_external_server_screen.json`)

-   `#play_button_enabled`
-   `#play_button_disabled`
-   `#save_button_enabled`
-   `#save_button_disabled`

#### Adhoc In Progress (`ui/adhoc_in_progress_screen.json`)

-   `#adhoc_title`

#### Authentication (`ui/authentication_screen.json`)

-   `#sign_in_visible`
-   `#sign_in_ios_visible`
-   `#sign_in_button_visible`
-   `#sign_in_ios_buttons_visible`
-   `#authentication_message`
-   `#confirm_button_enabled`
-   `#edu_store_visible`
-   `#edu_store_purchase_info`
-   `#asking_to_buy_visible`
-   `#confirming_purchase_visible`
-   `#demo_choice_visible`
-   `#eula_visible`
-   `#popup_text`
-   `#popup_message_student_text`
-   `#popup_message_student_visible`
-   `#generic_popup_link_visible`
-   `#trial_purchase_link_visible`
-   `#show_popup_dismiss_button`

#### Book (`ui/book_screen.json`)

-   `#screenshot_path`
-   `#is_photo_page`
-   `#is_text_page`
-   `#pick_grid_dimensions`
-   `#page_number`
-   `#title_text_box_item_name`
-   `#author_editable`
-   `#author_text_box_item_name`
-   `#editable`
-   `#viewing`
-   `#signing`
-   `#picking`
-   `#exporting`
-   `#page_visible`
-   `#pick_item_visible`
-   `#close_button_visible`
-   `#edit_controls_active`
-   `#finalize_button_enabled`

#### Braze (`ui/braze_screen.json`)

-   `#image_texture`

#### Bundle Purchase Warning (`ui/bundle_purchase_warning_screen.json`)

-   `#banner_visible`
-   `#offer_title`
-   `#keyart_path`
-   `#keyart_texture_file_system`

#### Chat (`ui/chat_screen.json`)

-   `#keyboard_being_use`
-   `#keyboard_button_focus_override_up`
-   `#keyboard_button_focus_override_down`
-   `#keyboard_button_visible`
-   `#send_button_visible`
-   `#send_button_accessibility_text`
-   `#chat_visible`
-   `#message_text_box_content`
-   `#text_edit_box_focus_override_up`
-   `#text_edit_box_focus_override_down`
-   `#auto_complete_item`
-   `#auto_complete_text`
-   `#get_grid_size`
-   `#chat_title_text`
-   `#chat_typeface_visible`

#### Choose Realm (`ui/choose_realm_screen.json`)

-   `#realms_grid_dimension`
-   `#world_button_focus_identifier`
-   `#ten_player_button_visible`
-   `#two_player_button_visible`
-   `#realms_world_player_count`
-   `#realms_game_online`
-   `#realms_game_unavailable`
-   `#realms_game_offline`

#### Coin Purchase (`ui/coin_purchase_screen.json`)

-   `#bonus_coins`
-   `#coins_without_bonus`
-   `#coin_offer_texture_name`
-   `#coin_offer_texture_file_system`
-   `#bonus_coins_visible`
-   `#price_text`
-   `#coins_required_for_purchase`
-   `#show_missing_coins`
-   `#coin_offer_size`
-   `#has_coin_offers`
-   `#coin_loading_visible`

#### Command Block (`ui/command_block_screen.json`)

-   `#maximized_input_visible`
-   `#block_type_icon_texture`
-   `#close_button_visible_binding_name`
-   `#command_impulse_mode`
-   `#command_chain_mode`
-   `#command_repeat_mode`
-   `#block_type_dropdown_toggle_label`
-   `#block_type_dropdown_label_color_binding`
-   `#block_type_dropdown_enabled`
-   `#command_conditional_mode`
-   `#command_unconditional_mode`
-   `#condition_dropdown_toggle_label`
-   `#condition_dropdown_enabled`
-   `#command_always_on_mode`
-   `#command_needs_redstone_mode`
-   `#redstone_dropdown_enabled`
-   `#command_hover_note`
-   `#execute_on_first_tick_enabled`
-   `#command_tick_delay`
-   `#command_text_edit`
-   `#command_output_text`
-   `#previous_block_type_text`
-   `#previous_block_type_text_color`
-   `#previous_condition_mode_text`
-   `#previous_redstone_mode_text`
-   `#minimize_button_visible_binding_name`

#### Comment (`ui/comment_screen.json`)

-   `#report_to_club_button_visible_feeditem`
-   `#report_to_enforcement_button_visible_feeditem`
-   `#delete_button_visible_feeditem`
-   `#report_to_club_button_visible_comment`
-   `#report_to_enforcement_button_visible_comment`
-   `#delete_button_visible_comment`
-   `#comment_buttons_visible`
-   `#feed_comment_page_collection_length`
-   `#comment_content`
-   `#is_author_linked_account`
-   `#content`
-   `#text_visible`
-   `#likes_and_comments`
-   `#screenshot_texture`
-   `#screenshot_texture_source`
-   `#textpost_content`
-   `#textpost_visible`
-   `#comment_text_box`
-   `#comment_platform_tag`
-   `#comment_gamertag`
-   `#likes_and_time_since_comment_post`
-   `#author_gamertag`
-   `#time_since_feed_post`
-   `#author_platform_tag`
-   `#author_gamertag`

#### Confirm MSA Unlink (`ui/confirm_msa_unlink_screen.json`)

-   `#unlink_warning_text`
-   `#unlink_consequences_acknowledged`
-   `#confirm_0`
-   `#confirm_0_enabled`
-   `#confirm_1`
-   `#confirm_1_enabled`
-   `#confirm_2`
-   `#confirm_2_enabled`
-   `#confirm_3`
-   `#confirm_3_enabled`

#### Content Log History (`ui/content_log_history_screen.json`)

-   `#content_log_text`
-   `#messages_size`

#### Create World Upsell (`ui/create_world_upsell.json`)

-   `#realm_button_text`
-   `#realm_trial_available`

#### Anvil (`ui/anvil_screen.json`)

-   `#cost_text`
-   `#cost_text_green`
-   `#cost_text_red`

#### Beacon (`ui/beacon_screen.json`)

-   `#supports_netherite`
-   `#extra_image_selection`

#### Brewing Stand (`ui/brewing_stand_screen.json`)

-   `#empty_bottle_image_visible`
-   `#empty_fuel_image_visible`
-   `#brewing_bubbles_ratio`
-   `#brewing_fuel_ratio`
-   `#brewing_arrow_ratio`

#### Cartography Table (`ui/cartography_screen.json`)

-   `#is_none_mode`
-   `#is_clone_mode`
-   `#is_rename_mode`
-   `#is_basic_map_mode`
-   `#is_locator_map_mode`
-   `#is_extend_mode`
-   `#is_locked_mode`
-   `#output_description`

#### Enchanting Table (`ui/enchanting_table_screen.json`)

-   `#selectable_dust_is_visible`
-   `#unselectable_dust_is_visible`
-   `#runes`
-   `#cost`
-   `#unselectable_button_visibility`
-   `#selectable_button_visibility`
-   `#show_selected_button_highlight`
-   `#active_enchant`
-   `#inactive_enchant`
-   `#input_item_id`
-   `#output_item_id`
-   `#enchant_hint`
-   `#player_level_color`
-   `#player_level_info`
-   `#enchant_error`

#### Furnace (`ui/furnace_screen.json`)

-   `#furnace_arrow_ratio`
-   `#furnace_flame_ratio`
-   `#output_name`

#### Horse (`ui/horse_screen.json`)

-   `#entity_id`
-   `#equip_grid_dimensions`
-   `#inv_grid_dimensions`
-   `#sadle_slot_centered`
-   `#has_saddle_slot`
-   `#has_armor_slot`
-   `#has_only_armor_slot`
-   `#has_only_carpet_slot`
-   `#has_armor_and_saddle_slot`
-   `#has_carpet_and_saddle_slot`
-   `#is_chested`
-   `#renderer_tab_toggle`
-   `#chest_tab_toggle`

#### Loom (`ui/loom_screen.json`)

-   `#pattern_cell_background_texture`
-   `#container_cell_background_texture`
-   `#empty_image_visible`
-   `#banner_patterns`
-   `#banner_colors`
-   `#pattern_selector_total_items`
-   `#result_patterns`
-   `#result_colors`
-   `#is_right_tab_loom`
-   `#is_left_tab_patterns`

#### Stonecutter (`ui/stonecutter_screen.json`)

-   `#stone_cell_background_texture`
-   `#container_cell_background_texture`
-   `#item_stack_count`
-   `#stone_selector_total_items`
-   `#has_input_item`
-   `#is_right_tab_stonecutter`
-   `#is_left_tab_stones`

#### Death (`ui/death_screen.json`)

- `#death_reason_text`
- `#respawn_visible`
- `#quit_enabled`
- `#quit_visible`
- `#buttons_and_deathmessage_visible`

#### Villager Trade2 (`ui/trade2_screen.json`)

-   `#name_label`
-   `#trade_cell_background_texture`
-   `#trade_item_count`
-   `#single_slash_visible`
-   `#double_slash_visible`
-   `#second_trade_item_count`
-   `#trade_price_different`
-   `#trade_cross_out_visible`
-   `#padding_around_sell_item`
-   `#trade_possible`
-   `#trade_toggle_state`
-   `#trade_toggle_enabled`
-   `#trade_tier_total`
-   `#tier_name`
-   `#is_tier_unlocked`
-   `#is_left_tab_trade`
-   `#show_level`
-   `#tier_visible`
-   `#trade_selector_total`
-   `#has_second_buy_item`
-   `#exp_bar_visible`
-   `#exp_progress`
-   `#exp_possible_progress`
-   `#trade_details_button_1_visible`
-   `#trade_details_button_2_visible`
-   `#enchantment_details_button_visible`
-   `#item_valid`

### Value depends on the screen it is in:

-   `#title_text`
-   `#body_text`
-   `#hover_text`
-   `#cross_out_icon`
-   `#is_left_tab_inventory`
-   `#selected_hover_text`

### Others:

-   `#tts_dialog_body`
-   `#button_enabled`
-   `#using_touch`
-   `#close_button_visible`

## Settings

### Sliders

|           Name            |           Slider Name           |        Value Binding Name        | TTS Value (`tts_value_changed`) |                  Slider Text                  |           Enabled Binding Name           |
| ------------------------- | ------------------------------- | -------------------------------- | ------------------------------- | --------------------------------------------- | ---------------------------------------- |
| Brightness                | `gamma`                         | `#gamma`                         | `#gamma_text_value`             | `#gamma_slider_label`                         | `#gamma_enabled`                         |
| Brightness (VR)           | `vr_gamma`                      | `#vr_gamma`                      | `#vr_gamma_text_value`          | `#vr_gamma_slider_label`                      | `#vr_gamma_enabled`                      |
| HUD Opacity               | `interface_opacity`             | `#interface_opacity`             | `#interface_opacity_text_value` | `#interface_opacity_slider_label`             | `#interface_opacity_enabled`             |
| HUD Opacity (Splitscreen) | `splitscreen_interface_opacity` | `#splitscreen_interface_opacity` | `#interface_opacity_text_value` | `#splitscreen_interface_opacity_slider_label` | `#splitscreen_interface_opacity_enabled` |
| Field Of View             | `field_of_view`                 | `#field_of_view`                 | `#field_of_view_text_value`     | `#field_of_view_slider_label`                 | `#field_of_view_enabled`                 |

### Toggles

|                  Name                   |              Toggle Name              |           State Binding Name           |              Enabled Binding Name              |
| --------------------------------------- | ------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| Invert Y Axis (Mouse)                   | `keyboard_mouse_invert_y_axis`        | `#keyboard_mouse_invert_y_axis`        | `#keyboard_mouse_invert_y_axis_enabled`        |
| Auto Jump (Mouse)                       | `keyboard_mouse_autojump`             | `#keyboard_mouse_autojump`             | `#keyboard_mouse_autojump_enabled`             |
| Show Full Keyboard Options              | `keyboard_show_full_keyboard_options` | `#keyboard_show_full_keyboard_options` | `#keyboard_show_full_keyboard_options_enabled` |
| Hide Keyboard Tooltips                  | `hide_keyboard_tooltips`              | `#hide_keyboard_tooltips`              | `#hide_keyboard_tooltips_enabled`              |
| Content File Log                        | `content_log_file`                    | `#content_log_file`                    | `#content_log_file_enabled`                    |
| Content Gui Log                         | `content_log_gui`                     | `#content_log_gui`                     | `#content_log_gui_enabled`                     |
| Use SSO                                 | `ad_use_single_sign_on`               | `#ad_use_single_sign_on`               |                                                |
| Auto Update OFF                         | `#auto_update_mode_off`               | `#auto_update_mode_off`                |                                                |
| Auto Update ON with Cellular            | `#auto_update_mode_on_with_cellular`  | `#auto_update_mode_on_with_cellular`   |                                                |
| Auto Update on WiFi Only                | `#auto_update_mode_on_wifi_only`      | `#auto_update_mode_on_wifi_only`       |                                                |
| Auto Update Enabled                     | `auto_update_enabled`                 | `#auto_update_enabled`                 |                                                |
| Cross Platform Enabled                  | `crossplatform_toggle`                | `#crossplatform_toggle`                | `#crossplatform_toggle_enabled`                |
| Allow Cellular Data                     | `allow_cellular_data`                 | `#allow_cellular_data`                 | `#allow_cellular_data_enabled`                 |
| Websocket Encryption                    | `websocket_encryption`                | `#websocket_encryption`                | `#websocket_encryption_enabled`                |
| Only Trusted Skins Allowed              | `only_trusted_skins_allowed`          | `#only_trusted_skins_allowed`          | `#only_trusted_skins_allowed_enabled`          |
| Storage Location External               | `#storage_location_radio_external`    | `#storage_location_radio_external`     | `#file_storage_location_enabled`               |
| Storage Location App                    | `#storage_location_radio_package`     | `#storage_location_radio_package`      | `#file_storage_location_enabled`               |
| First Person Perspective                | `#thirdperson_radio_first`            | `#thirdperson_radio_first`             | `#third_person_dropdown_enabled`               |
| Third Person Back Perspective           | `#thirdperson_radio_third_back`       | `#thirdperson_radio_third_back`        | `#third_person_dropdown_enabled`               |
| Third Person Front Perspective          | `#thirdperson_radio_third_front`      | `#thirdperson_radio_third_front`       | `#third_person_dropdown_enabled`               |
| Fullscreen                              | `full_screen`                         | `#full_screen`                         | `#full_screen_enabled`                         |
| Hide Hand                               | `hide_hand`                           | `#hide_hand`                           | `#hide_hand_enabled`                           |
| Hide Hand (VR)                          | `vr_hide_hand`                        | `#vr_hide_hand`                        | `#vr_hide_hand_enabled`                        |
| Hide Paperdoll                          | `hide_paperdoll`                      | `#hide_paperdoll`                      | `#hide_paperdoll_enabled`                      |
| Hide HUD                                | `hide_hud`                            | `#hide_hud`                            | `#hide_hud_enabled`                            |
| Hide HUD (VR)                           | `vr_hide_hud`                         | `#vr_hide_hud`                         | `#vr_hide_hud_enabled`                         |
| Screen Animations                       | `screen_animations`                   | `#screen_animations`                   | `#screen_animations_enabled`                   |
| Split Screen Horizontally               | `#split_screen_radio_horizontal`      | `#split_screen_radio_horizontal`       | `#split_screen_dropdown_enabled`               |
| Split Screen Vertically                 | `#split_screen_radio_vertical`        | `#split_screen_radio_vertical`         | `#split_screen_dropdown_enabled`               |
| Show Auto Save Icon                     | `show_auto_save_icon`                 | `#show_auto_save_icon`                 | `#show_auto_save_icon_enabled`                 |
| Outline Selection                       | `classic_box_selection`               | `#classic_box_selection`               | `#classic_box_selection_enabled`               |
| Outline Selection (VR)                  | `vr_classic_box_selection`            | `#vr_classic_box_selection`            | `#vr_classic_box_selection_enabled`            |
| Show Players Names Ingame               | `ingame_player_names`                 | `#ingame_player_names`                 | `#ingame_player_names_enabled`                 |
| Show Players Names Ingame (Splitscreen) | `splitscreen_ingame_player_names`     | `#splitscreen_ingame_player_names`     | `#splitscreen_ingame_player_names_enabled`     |
| View Bobbing                            | `view_bobbing`                        | `#view_bobbing`                        | `#view_bobbing_enabled`                        |
| Camera Shake                            | `camera_shake`                        | `#camera_shake`                        | `#camera_shake_enabled`                        |
| Fancy Leaves                            | `transparent_leaves`                  | `#transparent_leaves`                  | `#transparent_leaves_enabled`                  |
| Fancy Leaves (VR)                       | `vr_transparent_leaves`               | `#vr_transparent_leaves`               | `#vr_transparent_leaves_enabled`               |
| Fancy Bubbles                           | `bubble_particles`                    | `#bubble_particles`                    | `#bubble_particles_enabled`                    |
| Render Clouds                           | `render_clouds`                       | `#render_clouds`                       | `#render_clouds_enabled`                       |
| Fancy Clouds                            | `fancy_skies`                         | `#fancy_skies`                         | `#fancy_skies_enabled`                         |
| Smooth Lighting                         | `smooth_lighting`                     | `#smooth_lighting`                     | `#smooth_lighting_enabled`                     |
| Smooth Lighting (VR)                    | `graphics_toggle`                     | `#graphics_toggle`                     | `#graphics_toggle_enabled`                     |
| Graphics                                | `graphics_toggle`                     | `#graphics_toggle`                     | `#graphics_toggle_enabled`                     |
| Field of View                           | `field_of_view_toggle`                | `#field_of_view_toggle`                | `#field_of_view_toggle_enabled`                |
| Classic UI Profile                      | `#ui_profile_radio_classic`           | `#ui_profile_radio_classic`            | `#ui_profile_dropdown_enabled`                 |
| Pocket UI Profile                       | `#ui_profile_radio_pocket`            | `#ui_profile_radio_pocket`             | `#ui_profile_dropdown_enabled`                 |
| Texel Anti-Aliasing                     | `texel_aa`                            | `#texel_aa`                            | `#texel_aa_enabled`                            |
| 3D Rendering (VR)                       | `vr_3d_rendering`                     | `#vr_3d_rendering`                     | `#vr_3d_rendering_enabled`                     |
| Mirror Texture (VR)                     | `vr_mirror_texture`                   | `#vr_mirror_texture`                   | `#vr_mirror_texture_enabled`                   |
| Hand Pointer Visible (VR)               | `vr_hand_pointer`                     | `#vr_hand_pointer`                     | `#vr_hand_pointer_enabled`                     |
| Hands Visible (VR)                      | `vr_hands_visible`                    | `#vr_hands_visible`                    | `#vr_hands_visible_enabled`                    |
| Enable Auto TTS                         | `enable_auto_text_to_speech`          | `#enable_auto_text_to_speech`          | `#enable_auto_text_to_speech_enabled`          |
| Enable UI TTS                           | `enable_ui_text_to_speech`            | `#enable_ui_text_to_speech`            | `#enable_ui_text_to_speech_enabled`            |
| Enable Chat TTS                         | `enable_chat_text_to_speech`          | `#enable_chat_text_to_speech`          | `#enable_chat_text_to_speech_enabled`          |
| Enable Open Chat Message                | `enable_open_chat_message`            | `#enable_open_chat_message`            | `#enable_open_chat_message_enabled`            |
| Camera Shake                            | `camera_shake`                        | `#camera_shake`                        | `#camera_shake_enabled`                        |
| Languages (Collection)                  | `languages`                           | `#language_initial_selected`           |                                                |

## Item ID Aux (`#item_id_aux`)

| Name              |  ID  | Aux Values |
| ----------------- | :--: | :--------: |
| diamond           | 306  |  20054016  |
| emerald           | 519  |  34013184  |
| gold_ingot        | 308  |  20185088  |
| iron_ingot        | 307  |  20119552  |
| netherite_ingot   | 616  |  40370176  |
| banner            | 574  |  37617664  |
| saddle            | 373  |  24444928  |
| cartography_table | -200 | -13107200  |
| chest             |  54  |  3538944   |
| crafting_table    |  58  |  3801088   |
| loom              | -204 | -13369344  |
| stonecutter_block | -197 | -12910592  |

#### How to calculate block item aux value:

Aux = ID \* 65536

ID = Aux / 65536
65536 = Aux / ID

Get all Item IDs [here](https://docs.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonitems).
