---
title: JSON UI 完整文档
category: 文档
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

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## UI元素

### 元素类型

|        名称        |                                           描述                                           |                                                                                                                                                                                                               允许的属性                                                                                                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| panel              | 容器元素，类似HTML中的`<div>`                                                            | [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                                                                          |
| stack_panel        | 类似`panel`，但会根据`orientation`属性值自动堆叠子元素                                    | [堆叠面板](/wiki/json-ui/json-ui-documentation#stack-panel) <br> [集合](/wiki/json-ui/json-ui-documentation#collection) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                    |
| collection_panel   | 类似`stack_panel`，但没有`orientation`属性                                               | [集合](/wiki/json-ui/json-ui-documentation#collection) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                 |
| grid               | 网格布局元素                                                                             | [网格](/wiki/json-ui/json-ui-documentation#grid) <br> [集合](/wiki/json-ui/json-ui-documentation#collection) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                |
| label              | 文本元素                                                                                 | [文本](/wiki/json-ui/json-ui-documentation#text) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                     |
| image              | 图像元素，用于绘制纹理                                                                   | [精灵](/wiki/json-ui/json-ui-documentation#sprite) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                   |
| input_panel        | 可接收输入的面板                                                                         | [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                 |
| button             | 按钮元素，支持四种状态（默认、悬停、按下、锁定）                                         | [按钮](/wiki/json-ui/json-ui-documentation#button) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                              |
| toggle             | 开关元素，包含两种状态（选中/未选中），每种状态有悬停和锁定变体                         | [开关](/wiki/json-ui/json-ui-documentation#toggle) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                              |
| dropdown           | 下拉菜单开关                                                                             | [下拉菜单](/wiki/json-ui/json-ui-documentation#dropdown) <br> [开关](/wiki/json-ui/json-ui-documentation#toggle) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)     |
| slider             | 范围输入元素                                                                             | [滑块](/wiki/json-ui/json-ui-documentation#slider) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                              |
| slider_box         | 用于调整滑块值的拖动按钮                                                                 | [滑块按钮](/wiki/json-ui/json-ui-documentation#slider-box) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                          |
| edit_box           | 文本输入框（默认单行）                                                                   | [文本编辑](/wiki/json-ui/json-ui-documentation#text-edit) <br> [按钮](/wiki/json-ui/json-ui-documentation#button) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                       |
| scroll_view        | 创建可滚动面板                                                                           | [滚动视图](/wiki/json-ui/json-ui-documentation#scroll-view) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                          |
| scrollbar_track    | 滚动条轨道                                                                               | [输入](/wiki/json-ui/json-ui-documentation#input) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout)                                                                                                                                                                                                                                                                                  |
| scrollbar_box      | 滚动条"滑块"（可拖动的滚动手柄，默认垂直方向）                                           | [输入](/wiki/json-ui/json-ui-documentation#input) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout)                                                                                                                                                                                                                                                                                  |
| factory            | 元素生成器                                                                               | [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout)                                                                                                                                                                                                                                                                                                                                     |
| screen             | 屏幕元素                                                                                 | [屏幕](/wiki/json-ui/json-ui-documentation#screen) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                   |
| custom             | 需通过代码创建的复杂渲染元素                                                             | [自定义渲染](/wiki/json-ui/json-ui-documentation#custom-render) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                       |
| selection_wheel    | 选择轮盘                                                                                 | [选择轮盘](/wiki/json-ui/json-ui-documentation#selection-wheel) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                   |

#### 遗留元素类型（已失效）

|       名称       |                         描述                         |                                                                                                                                                                                                                                  允许的属性                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tab              | 在引入toggle之前创建标签页的方式                     | [标签页（旧版）](/wiki/json-ui/json-ui-documentation#tab-legacy) <br> [按钮](/wiki/json-ui/json-ui-documentation#button) <br> [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [音效](/wiki/json-ui/json-ui-documentation#sound) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                               |
| carousel_label   | 轮播文本元素                                         | [轮播文本（旧版）](/wiki/json-ui/json-ui-documentation#carousel-text-legacy) <br> [文本](/wiki/json-ui/json-ui-documentation#text) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                             |
| grid_item        | 专门作为网格子元素的容器                             | [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                                                                                                                           |
| scrollbar        | 旧版滚动条                                           | [输入](/wiki/json-ui/json-ui-documentation#input) <br> [焦点](/wiki/json-ui/json-ui-documentation#focus) <br> [控件](/wiki/json-ui/json-ui-documentation#control) <br> [布局](/wiki/json-ui/json-ui-documentation#layout) <br> [数据绑定](/wiki/json-ui/json-ui-documentation#data-binding)                                                                                                                                                                                                       |

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
| property_bag              |       对象         |          | [属性包](/wiki/json-ui/json-ui-documentation#property-bag)，存放与UI元素数据结构相关的属性                                                                                                    |
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
| bindings | [绑定对象数组](/wiki/json-ui/json-ui-documentation#data-binding-array-object) |        | 将硬编码值绑定到元素属性 |

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
| button_mappings               | [映射对象数组](/wiki/json-ui/json-ui-documentation#button-mapping-array-object) |        |      |
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
| focus_container_custom_left | [焦点容器对象数组](/wiki/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |
| focus_container_custom_right | [焦点容器对象数组](/wiki/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |
| focus_container_custom_down | [焦点容器对象数组](/wiki/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |
| focus_container_custom_up | [焦点容器对象数组](/wiki/json-ui/json-ui-documentation#focus-container-custom-array-object) |        |                                                                                                                                                             |

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
| sounds       | [音效对象数组](/wiki/json-ui/json-ui-documentation#sound-array-object) | 触发时播放的音效列表                          |

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

更多关于 `aseprite_flip_book` 动画类型的属性说明, 请前往 [Aseprite Animations](/wiki/json-ui/aseprite-animations) 查阅详细文档。

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

## 硬编码超链接

`#hyperlink` 不允许自定义URL。以下是可用的预设链接：

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

## 硬编码按钮ID

部分按钮仅在特定界面生效。

### 通用按钮ID：

-   `button.menu_exit` - 退出菜单
-   `button.menu_cancel` - 取消（对应键盘`ESC`或手柄`B`键）
-   `button.menu_inventory_cancel` - 关闭背包（对应背包快捷键）
-   `button.menu_ok` - 确认（对应键盘`Enter`键）
-   `button.menu_select` - 选择（对应鼠标点击）
-   `button.controller_select` - 手柄选择键（对应手柄`X`键）
-   `button.menu_secondary_select` - 二级选择
-   `button.controller_secondary_select` - 手柄二级选择
-   `button.controller_secondary_select_left` - 手柄左二级选择
-   `button.controller_secondary_select_right` - 手柄右二级选择（对应手柄`R3`键）
-   `button.controller_start` - 手柄开始键
-   `button.menu_up` - 上移（对应键盘`↑`键）
-   `button.menu_down` - 下移（对应键盘`↓`键）
-   `button.menu_left` - 左移（对应键盘`←`键）
-   `button.menu_right` - 右移（对应键盘`→`键）
-   `button.menu_tab_left` - 左标签页（对应标签页左键或手柄`左肩键`）
-   `button.menu_tab_right` - 右标签页（对应标签页右键或手柄`右肩键`）
-   `button.menu_alternate_tab_left` - 备用左标签页
-   `button.menu_alternate_tab_right` - 备用右标签页
-   `button.menu_autocomplete` - 自动补全（对应`Tab`键）
-   `button.menu_autocomplete_back` - 返回自动补全
-   `button.controller_autocomplete` - 手柄自动补全
-   `button.controller_autocomplete_back` - 手柄返回自动补全
-   `button.menu_textedit_up` - 文本编辑上移（对应键盘`↑`键）
-   `button.menu_textedit_down` - 文本编辑下移（对应键盘`↓`键）
-   `button.controller_textedit_up` - 手柄文本编辑上移
-   `button.controller_textedit_down` - 手柄文本编辑下移
-   `button.menu_auto_place` - 自动放置
-   `button.menu_inventory_drop` - 丢弃物品（对应丢弃物品快捷键）
-   `button.menu_inventory_drop_all` - 丢弃全部物品（对应丢弃物品+`Ctrl`键）
-   `button.menu_clear` - 清除
-   `button.chat` - 打开聊天（对应聊天快捷键）
-   `button.mobeffects` - 生物效果（对应生物效果快捷键）
-   `key.emote` - 表情（对应表情快捷键）
-   `button.slot1` - 表情轮盘槽位1（对应`1`键）
-   `button.slot2` - 表情轮盘槽位2（对应`2`键）
-   `button.slot3` - 表情轮盘槽位3（对应`3`键）
-   `button.slot4` - 表情轮盘槽位4（对应`4`键）
-   `button.slot5` - 表情轮盘槽位5（对应`5`键）
-   `button.slot6` - 表情轮盘槽位6（对应`6`键）
-   `button.inventory_right` - 背包右移（对应鼠标滚轮上滑）
-   `button.inventory_left` - 背包左移（对应鼠标滚轮下滑）
-   `button.scoreboard` - 记分板
-   `button.hide_gui` - 隐藏界面（对应`F1`键）
-   `button.hide_tooltips` - 隐藏提示
-   `button.hide_paperdoll` - 隐藏纸娃娃
-   `button.slot0` - 槽位0
-   `button.slot1` - 槽位1（对应`1`键）
-   `button.slot2` - 槽位2（对应`2`键）
-   `button.slot3` - 槽位3（对应`3`键）
-   `button.slot4` - 槽位4（对应`4`键）
-   `button.slot5` - 槽位5（对应`5`键）
-   `button.slot6` - 槽位6（对应`6`键）
-   `button.slot7` - 槽位7（对应`7`键）
-   `button.slot8` - 槽位8（对应`8`键）
-   `button.slot9` - 槽位9（对应`9`键）
-   `button.menu_vr_realign` - VR重定位
-   `any` - 字面意思，表示任意按钮

### 特定界面按钮ID：

#### 设置界面 (`ui/settings_screen.json`)

-   `button.open_content_log_history` - 打开内容日志历史
-   `button.clear_content_log_files` - 清除内容日志文件
-   `button.clear_msa_token_button` - 清除MSA令牌
-   `button.terms_and_conditions_popup` - 条款与条件弹窗
-   `button.credits` - 制作人员
-   `button.unlink_msa` - 取消MSA关联
-   `button.attribute_popup` - 属性弹窗
-   `button.licensed_content` - 授权内容
-   `button.font_license` - 字体授权
-   `button.tos_hyperlink` - 服务条款超链接
-   `button.privpol_hyperlink` - 隐私政策超链接
-   `button.tos_popup` - 服务条款弹窗
-   `button.privpol_popup` - 隐私政策弹窗
-   `button.binding_button` - 绑定按钮
-   `button.reset_binding` - 重置绑定
-   `button.reset_keyboard_bindings` - 重置键盘绑定
-   `button.view_account_errors` - 查看账户错误

#### 书本界面 (`ui/book_screen.json`)

-   `button.prev_page` - 上一页
-   `button.next_page` - 下一页
-   `button.book_exit` - 退出书本

#### 聊天界面 (`ui/chat_screen.json`)

-   `button.send` - 发送
-   `button.chat_autocomplete` - 聊天自动补全
-   `button.chat_autocomplete_back` - 返回聊天自动补全
-   `button.chat_previous_message` - 上一条消息
-   `button.chat_next_message` - 下一条消息
-   `button.chat_menu_cancel` - 取消聊天菜单

#### 命令方块界面 (`ui/command_block_screen.json`)

-   `command_block.input_minimize` - 最小化输入框
-   `button.chat_autocomplete` - 聊天自动补全
-   `button.chat_autocomplete_back` - 返回聊天自动补全

#### 评论界面 (`ui/comment_screen.json`)

-   `button.comment_options_close` - 关闭评论选项
-   `button.comment_feed_options_close` - 关闭评论反馈选项
-   `button.close_comments` - 关闭评论
-   `button.comment_next_button` - 下一条评论
-   `button.comment_prev_button` - 上一条评论

#### 制作人员界面 (`ui/credits_screen.json`)

-   `button.show_skip` - 显示跳过按钮

#### 死亡界面 (`ui/death_screen.json`)

-   `button.respawn_button` - 重生按钮
-   `button.main_menu_button` - 主菜单按钮

#### 表情轮盘界面 (`ui/emote_screen_wheel.json`)

-   `button.rebind_mode` - 重绑定模式
-   `button.dressing_room` - 更衣室
-   `button.emote_selected` - 已选表情
-   `button.select_emote_slot_0` - 选择表情槽位0
-   `button.select_emote_slot_1` - 选择表情槽位1
-   `button.select_emote_slot_2` - 选择表情槽位2
-   `button.select_emote_slot_3` - 选择表情槽位3
-   `button.select_emote_slot_4` - 选择表情槽位4
-   `button.select_emote_slot_5` - 选择表情槽位5
-   `button.iterate_selection_left` - 向左循环选择
-   `button.iterate_selection_right` - 向右循环选择

#### 反馈界面 (`ui/feed_screen.json`)

-   `button.feed_image` - 反馈图片
-   `button.newpost` - 新帖子
-   `button.add_screenshot` - 添加截图
-   `button.feed_comment` - 反馈评论
-   `button.feed_prev_button` - 上一条反馈
-   `button.feed_next_button` - 下一条反馈
-   `button.feed_new_post_close` - 关闭新帖子
-   `button.feed_options_close` - 关闭反馈选项
-   `button.close_feed` - 关闭反馈

#### 游戏菜单界面 (`ui/pause_screen.json`)

-   `button.to_profile_or_skins_screen` - 前往个人资料/皮肤界面
-   `button.player_profile_card` - 玩家资料卡片
-   `button.menu_continue` - 继续游戏
-   `button.menu_server_store` - 服务器商店
-   `button.screenshot` - 截图
-   `button.menu_how_to_play` - 玩法指南
-   `button.menu_feedback` - 反馈
-   `button.menu_permission` - 权限设置
-   `button.menu_invite_players` - 邀请玩家
-   `button.menu_quit` - 退出游戏
-   `button.menu_feed` - 反馈菜单
-   `button.pause_focus_filler` - 暂停焦点填充

#### 床上界面 (`ui/in_bed_screen.json`)

-   `button.wake_up_button` - 起床按钮

#### 邀请界面 (`ui/invite_screen.json`)

-   `button.add_friend` - 添加好友
-   `button.add_member` - 添加成员
-   `button.send_invites` - 发送邀请

#### 管理反馈界面 (`ui/manage_feed_screen.json`)

-   `button.manage_feed_prev_button` - 上一条管理反馈
-   `button.manage_feed_next_button` - 下一条管理反馈
-   `button.manage_feed_ignore` - 忽略反馈
-   `button.manage_feed_delete` - 删除反馈
-   `button.close_manage_feed` - 关闭管理反馈

#### 铁砧界面 (`ui/anvil_screen.json`)

-   `button.anvil_take_all_place_all` - 全部取出/放入
-   `button.anvil_coalesce_stack` - 合并堆叠

#### 制图台界面 (`ui/cartography_screen.json`)

-   `button.cartography_result_take_all_place_all` - 制图结果全部取出/放入

#### 附魔台界面 (`ui/enchanting_table_screen.json`)

-   `button.enchant` - 附魔

#### 砂轮界面 (`ui/grindstone_screen.json`)

-   `button.grindstone_take_all_place_all` - 全部取出/放入
-   `button.grindstone_coalesce_stack` - 合并堆叠

#### 织布机界面 (`ui/loom_screen.json`)

-   `button.loom_result_take_all_place_all` - 织布结果全部取出/放入
-   `button.pattern_select` - 图案选择

#### 村民交易界面 (`ui/trade_screen.json`)

- `button.cycle_recipe_left` - 向左循环配方
- `button.cycle_recipe_right` - 向右循环配方
- `button.trade_take_all_place_all` - 全部取出/放入
- `button.trade_take_half_place_one` - 取半/放入单个
- `button.trade_coalesce_stack` - 合并堆叠

#### 游戏主界面 (`ui/play_screen.json`)

- `button.menu_sign_in_to_view_realms` - 登录查看Realms
- `button.menu_realms_world_item_edit` - 编辑Realms世界
- `button.menu_realms_feed` - Realms反馈
- `button.menu_realms_world_item_remove` - 移除Realms世界
- `button.menu_network_world_item` - 网络世界项目
- `button.menu_network_server_world_edit` - 编辑网络服务器世界
- `button.connect_to_third_party_server` - 连接第三方服务器
- `button.view_third_party_server_offers` - 查看第三方服务器优惠
- `button.description_read_toggle` - 描述阅读切换
- `button.news_read_toggle` - 新闻阅读切换
- `button.local_world_upload` - 上传本地世界
- `button.menu_start_local_world` - 开始本地世界
- `button.convert_legacy_world` - 转换旧版世界
- `button.menu_local_world_item_edit` - 编辑本地世界
- `button.menu_legacy_world_item_delete` - 删除旧版世界
- `button.import_beta_retail_local_world` - 导入Beta零售版本地世界
- `button.import_beta_retail_legacy_world` - 导入Beta零售版旧版世界
- `button.menu_network_add_friend` - 添加网络好友
- `button.menu_network_join_by_code` - 通过代码加入网络
- `button.menu_quick_play` - 快速游戏
- `button.new_world_upload` - 上传新世界
- `button.menu_local_world_create` - 创建本地世界
- `button.create_on_realms_button` - 在Realms创建
- `button.archived_world_upload` - 上传存档世界
- `button.menu_import_level` - 导入关卡
- `button.menu_sync_legacy_worlds` - 同步旧版世界
- `button.realms_warning_more_info` - Realms警告更多信息
- `button.menu_realm_world_trial` - Realms世界试用
- `button.menu_realm_nintendo_first_realm_purchase_button` - Nintendo首次购买Realms按钮
- `button.no_local_worlds_launch_help` - 无本地世界启动帮助
- `button.menu_network_join_by_code_popup_join` - 通过代码加入网络弹窗
- `button.join_server_anyway` - 仍然加入服务器
- `button.cancel_join_server` - 取消加入服务器

### 其他按钮

-   `button.try_menu_exit` - 尝试退出菜单
-   `button.close_dialog` - 关闭对话框
-   `button.menu_play` - 游戏菜单
-   `$play_button_target` (**硬编码**)
-   `button.menu_store` - 商店菜单
-   `button.menu_achievements` - 成就菜单
-   `button.menu_settings` - 设置菜单
-   `button.signin` - 登录
-   `button.menu_skins` - 皮肤菜单
-   `button.to_profile_screen` - 前往个人资料界面
-   `button.menu_courses` - 课程菜单
-   `button.menu_tutorial` - 教程菜单
-   `button.featured_world` - 精选世界
-   `button.switch_accounts` - 切换账户
-   `button.launch_editions` - 启动旧版
-   `button.edu_feedback` - 教育版反馈
-   `button.edu_resources` - 教育资源
-   `button.menu_buy_game` - 购买游戏菜单
-   `button.menu_invite_notification` - 邀请通知菜单
-   `button.search` - 搜索
-   `button.hotbar_inventory_button` - 快捷栏背包按钮
-   `button.select_offer` - 选择优惠
-   `button.action_button` - 操作按钮
-   `button.create_realm` - 创建Realm
-   `button.switch_accounts` - 切换账户
-   `button.hotbar_select` - 快捷栏选择
-   `button.hotbar_ok` - 快捷栏确认
-   `button.slot_pressed` - 槽位按下
-   `button.hotbar_inventory_left` - 快捷栏背包左移
-   `button.hotbar_inventory_right` - 快捷栏背包右移
-   `button.hide_gui_all` - 隐藏所有界面
-   `button.hide_tooltips_hud` - 隐藏HUD提示
-   `button.hide_paperdoll_hud` - 隐藏HUD纸娃娃
-   `button.slot_1` - 槽位1
-   `button.slot_2` - 槽位2
-   `button.slot_3` - 槽位3
-   `button.slot_4` - 槽位4
-   `button.slot_5` - 槽位5
-   `button.slot_6` - 槽位6
-   `button.slot_7` - 槽位7
-   `button.slot_8` - 槽位8
-   `button.slot_9` - 槽位9
-   `button.slot_0` - 槽位0
-   `button.chat` - 聊天
-   `button.menu_continue` - 继续菜单
-   `user_confirm_dialog.escape` - 用户确认对话框退出
-   `user_confirm_dialog.left_button` - 用户确认对话框左按钮
-   `user_confirm_dialog.middle_button` - 用户确认对话框中按钮
-   `user_confirm_dialog.rightcancel_button` - 用户确认对话框右取消按钮
-   `button.view_skin` - 查看皮肤
-   `button.delete_action` - 删除操作
-   `button.exit_student` - 退出学生模式
-   `button.play_video` - 播放视频
-   `button.menu_store_error` - 商店菜单错误
-   `button.left_panel_tab_increment` - 左面板标签页增加
-   `button.left_panel_tab_decrement` - 左面板标签页减少
-   `button.right_panel_tab_increment` - 右面板标签页增加
-   `button.right_panel_tab_decrement` - 右面板标签页减少
-   `button.layout_increment` - 布局增加
-   `button.layout_decrement` - 布局减少
-   `button.is_hovered` - 悬停状态
-   `button.container_take_all_place_all` - 容器全部取出/放入
-   `button.container_take_half_place_one` - 容器取半/放入单个
-   `button.container_auto_place` - 容器自动放置
-   `button.coalesce_stack` - 合并堆叠
-   `button.shape_drawing` - 形状绘制
-   `button.destroy_selection` - 销毁选择
-   `button.clear_selected_recipe` - 清除选定配方
-   `button.clear_hotbar_or_remove_one` - 清除快捷栏或移除单个
-   `button.clear_hotbar_or_drop` - 清除快捷栏或丢弃
-   `button.container_reset_held` - 容器重置持有
-   `button.container_auto_place` - 容器自动放置
-   `button.container_slot_hovered` - 容器槽位悬停
-   `button.button_hovered` - 按钮悬停
-   `button.shift_pane_focus` - 切换面板焦点
-   `button.focus_left` - 焦点左移
-   `button.focus_right` - 焦点右移
-   `button.filter_toggle_hovered` - 筛选切换悬停
-   `button.drop_one` - 丢弃单个
-   `button.cursor_drop_one` - 光标丢弃单个
-   `button.drop_all` - 丢弃全部
-   `button.cursor_drop_all` - 光标丢弃全部
-   `button.search_bar_clear` - 搜索栏清除
-   `button.search_bar_selected` - 搜索栏选中
-   `button.search_bar_deselected` - 搜索栏取消选中
-   `button.menu_leave_screen` - 离开菜单界面
-   `button.turn_doll` - 旋转纸娃娃
-   `button.select_skin` - 选择皮肤
-   `button.skin_hovered` - 皮肤悬停
-   `button.skin_unhovered` - 皮肤取消悬停
-   `button.leave` - 离开
-   `button.leave_on_device` - 在设备上离开
-   `button.text_edit_box_selected` - 文本编辑框选中
-   `button.text_edit_box_deselected` - 文本编辑框取消选中
-   `button.text_edit_box_hovered` - 文本编辑框悬停
-   `button.text_edit_box_clear` - 文本编辑框清除
-   `button.help` - 帮助
-   `button.menu_open_uri` - 打开URI菜单
-   `button.no_interaction` - 无交互
-   `button.copy_to_clipboard` - 复制到剪贴板
-   ...

## 硬编码集合名称

以下集合仅在特定界面中生效。

### 界面专属集合：

#### 书本界面 (`ui/book_screen.json`)

-   `book_pages` - 书页集合
-   `pick_collection` - 选取集合

#### 捆绑包购买警告界面 (`ui/bundle_purchase_warning_screen.json`)

-   `owned_list` - 已拥有列表
-   `unowned_list` - 未拥有列表

#### 聊天界面 (`ui/chat_screen.json`)

-   `auto_complete` - 自动补全集合
-   `font_colors` - 字体颜色集合
-   `host_main_collection` - 主机主集合
-   `players_collection` - 玩家集合
-   `host_teleport_collection` - 主机传送集合
-   `host_time_collection` - 主机时间集合
-   `host_weather_collection` - 主机天气集合

#### 选择 Realm 界面 (`ui/choose_realm_screen.json`)

-   `realms_collection` - Realms 集合

#### 代币购买界面 (`ui/coin_purchase_screen.json`)

-   `coin_purchase_grid` - 代币购买网格

#### 评论界面 (`ui/comment_screen.json`)

-   `comment_collection` - 评论集合

#### 内容日志历史界面 (`ui/content_log_history_screen.json`)

-   `content_log_message` - 内容日志消息

#### 创建世界促销界面 (`ui/create_world_upsell_screen.json`)

-   `world_list` - 世界列表
-   `realm_list` - Realm 列表

#### 自定义模板界面 (`ui/custom_templates_screen.json`)

-   `templates_collection` - 模板集合

#### 反馈界面 (`ui/feed_screen.json`)

-   `feed_collection` - 反馈集合

#### HUD 界面 (`ui/hud_screen.json`)

-   `boss_bars` - Boss 血条
-   `chat_text_grid` - 聊天文本网格
-   `hotbar_items` - 快捷栏物品
-   `scoreboard_players` - 记分板玩家
-   `scoreboard_scores` - 记分板分数
-   `left_helper_collection` - 左侧帮助集合
-   `right_helper_collection` - 右侧帮助集合

#### 邀请界面 (`ui/invite_screen.json`)

-   `online_platform_friends` - 在线平台好友
-   `online_linked_account_friends` - 在线关联账户好友
-   `online_xbox_live_friends` - 在线 Xbox Live 好友
-   `offline_platform_friends` - 离线平台好友
-   `offline_linked_account_friends` - 离线关联账户好友
-   `offline_xbox_live_friends` - 离线 Xbox Live 好友

#### 管理反馈界面 (`ui/manage_feed_screen.json`)

-   `manage_feed_collection` - 管理反馈集合

#### 清单验证界面 (`manifest_validation_screen.json`)

-   `pack_errors` - 包错误集合

#### 生物效果界面 (`ui/mob_effects_screen.json`)

-   `mob_effects_collection` - 生物效果集合

#### 游戏菜单界面 (`ui/pause_screen.json`)

-   `players_collection` - 玩家集合（也在 `pause_screen.json` 中使用）

#### 产品详情界面 (`ui/pdp_screen.json`)

-   `factory_collection` - 厂商集合
-   `ratings_star_collection` - 评分星级集合

#### 权限界面 (`ui/permissions_screen.json`)

-   `players_collection` - 玩家集合
-   `permissions_collection` - 权限集合

#### 角色装扮界面 (`ui/persona_screen.json`)

-   `color_collection` - 颜色集合
-   `skin_pack_in_grid_item` - 皮肤包网格项
-   `persona_featured_skin_pack_collection` - 精选皮肤包集合
-   `body_size_collection` - 体型集合
-   `arm_size_collection` - 手臂尺寸集合
-   `category_featured_collection` - 分类精选集合
-   `main_featured_collection` - 主精选集合
-   `profile_featured_collection` - 个人资料精选集合
-   `custom_section_collection` - 自定义部分集合
-   `featured_collection` - 精选集合
-   `foobar_collection` - 占位集合
-   `emote_collection` - 表情集合

#### 游戏主界面 (`ui/play_screen.json`)

-   `friends_network_worlds` - 好友网络世界
-   `cross_platform_friends_network_worlds` - 跨平台好友网络世界
-   `lan_network_worlds` - 局域网网络世界
-   `personal_realms` - 个人 Realms
-   `friends_realms` - 好友 Realms
-   `servers_network_worlds` - 服务器网络世界
-   `third_party_server_network_worlds` - 第三方服务器网络世界
-   `server_screenshot_collection` - 服务器截图集合
-   `server_games_collection` - 服务器游戏集合
-   `local_worlds` - 本地世界
-   `legacy_worlds` - 旧版世界
-   `beta_retail_local_worlds` - Beta 零售版本地世界
-   `personal_realms` - 个人 Realms
-   `loading_personal_realms` - 加载中的个人 Realms
-   `friends_realms` - 好友 Realms
-   `loading_friends_realms` - 加载中的好友 Realms

#### 作品集界面 (`ui/portfolio_screen.json`)

-   `photos` - 照片集合

#### 进度界面 (`ui/progress_screen.json`)

-   `required_resourcepacks` - 必需资源包
-   `optional_resourcepacks` - 可选资源包

#### Realms 待处理邀请界面 (`ui/realms_pending_invitations_screen.json`)

-   `pending_invites_collection` - 待处理邀请集合

#### Realms 设置界面 (`ui/realms_settings_screen.json`)

-   `additional_realms_subscriptions_collection` - 额外 Realms 订阅集合
-   `realms_branch_collection` - Realms 分支集合
-   `realms_backup_collection` - Realms 备份集合
-   `members_collection` - 成员集合
-   `invited_friends_collection` - 已邀请好友集合
-   `uninvited_friends_collection` - 未邀请好友集合
-   `blocked_players_collection` - 已屏蔽玩家集合

#### 截图选择器界面 (`ui/screenshot_picker_screen.json`)

-   `screenshotpicker_collection` - 截图选择器集合

#### 服务器表单界面 (`ui/server_form.json`)

-   `custom_form` - 自定义表单
-   `form_buttons` - 表单按钮
-   `custom_dropdown` - 自定义下拉菜单

#### 设置界面 (`ui/settings_screen.json`)

-   `keyboard_standard_collection` - 标准键盘集合
-   `keyboard_full_collection` - 完整键盘集合
-   `gamepad_collection` - 游戏手柄集合
-   `languages` - 语言集合
-   `realms_plus_subscriptions_collection` - Realms Plus 订阅集合
-   `additional_realms_subscriptions_collection` - 额外 Realms 订阅集合
-   `#selected_pack_items_global` - 全局已选包项
-   `#available_pack_items_global` - 全局可用包项
-   `#realms_pack_items_global` - 全局 Realms 包项
-   `#unowned_pack_items_global` - 全局未拥有包项
-   `#invalid_pack_items_global` - 全局无效包项
-   `#selected_pack_items_level` - 关卡已选包项
-   `#available_pack_items_level` - 关卡可用包项
-   `#realms_pack_items_level` - 关卡 Realms 包项
-   `#unowned_pack_items_level` - 关卡未拥有包项
-   `#invalid_pack_items_level` - 关卡无效包项
-   `#selected_pack_items_addon` - 附加组件已选包项
-   `#available_pack_items_addon` - 附加组件可用包项
-   `#realms_pack_items_addon` - 附加组件 Realms 包项
-   `#unowned_pack_items_addon` - 附加组件未拥有包项
-   `#invalid_pack_items_addon` - 附加组件无效包项
-   `experimental_toggles` - 实验性开关
-   `world_panel` - 世界面板
-   `world_template_panel` - 世界模板面板
-   `resource_panel` - 资源面板
-   `behavior_panel` - 行为面板
-   `skin_panel` - 皮肤面板
-   `cache_panel` - 缓存面板
-   `dependent_packs_panel` - 依赖包面板
-   `dependency_panel` - 依赖关系面板

#### 结构方块界面 (`ui/structure_editor_screen.json`)

-   `save_size_grid` - 保存尺寸网格
-   `save_offset_grid` - 保存偏移网格
-   `load_offset_grid` - 加载偏移网格
-   `export_size_grid` - 导出尺寸网格
-   `export_offset_grid` - 导出偏移网格

#### 种子选择器界面 (`ui/ugc_viewer_screen.json`)

-   `ugc_items` - UGC 项目集合

#### 世界模板界面 (`ui/world_templates_screen.json`)

-   `world_templates` - 世界模板
-   `realms_plus_templates` - Realms Plus 模板
-   `custom_world_templates` - 自定义世界模板
-   `#suggested_offers_collection` - 推荐优惠集合

#### 铁砧界面 (`ui/anvil_screen.json`)

-   `anvil_input_items` - 铁砧输入物品
-   `anvil_material_items` - 铁砧材料物品
-   `anvil_result_items` - 铁砧结果物品

#### 信标界面 (`ui/beacon_screen.json`)

-   `beacon_payment_items` - 信标支付物品
-   `speed` - 速度效果
-   `haste` - 急迫效果
-   `resist` - 抗性效果
-   `jump` - 跳跃提升效果
-   `strength` - 力量效果
-   `regen` - 生命恢复效果
-   `extra` - 额外效果
-   `confirm` - 确认按钮
-   `cancel` - 取消按钮

#### 酿造台界面 (`ui/brewing_stand_screen.json`)

-   `brewing_fuel_item` - 酿造燃料物品
-   `brewing_input_item` - 酿造输入物品
-   `brewing_result_items` - 酿造结果物品

#### 制图台界面 (`ui/cartography_screen.json`)

-   `cartography_input_items` - 制图输入物品
-   `cartography_additional_items` - 制图附加物品
-   `cartography_result_items` - 制图结果物品

#### 附魔台界面 (`ui/enchanting_table_screen.json`)

-   `enchanting_input_items` - 附魔输入物品
-   `enchanting_lapis_items` - 附魔青金石物品
-   `#enchant_buttons` - 附魔按钮集合

#### 熔炉界面 (`ui/furnace_screen.json`)

-   `furnace_ingredient_items` - 熔炉原料物品
-   `furnace_fuel_items` - 熔炉燃料物品
-   `furnace_output_items` - 熔炉输出物品

#### 砂轮界面 (`ui/grindstone_screen.json`)

-   `grindstone_input_items` - 砂轮输入物品
-   `grindstone_additional_items` - 砂轮附加物品
-   `grindstone_result_items` - 砂轮结果物品

#### 马匹界面 (`ui/horse_screen.json`)

-   `horse_equip_items` - 马匹装备物品

#### 背包界面 (`ui/inventory_screen.json` 和 `ui/inventory_screen_pocket.json`)

-   `armor_items` - 盔甲物品
-   `offhand_items` - 副手物品
-   `crafting_input_items` - 合成输入物品
-   `crafting_output_items` - 合成输出物品
-   `recipe_book` - 配方书

#### 织布机界面 (`ui/loom_screen.json`)

-   `loom_input_items` - 织布机输入物品
-   `loom_dye_items` - 织布机染料物品
-   `loom_material_items` - 织布机材料物品
-   `loom_result_items` - 织布机结果物品
-   `patterns` - 图案集合

#### 锻造台界面 (`ui/smithing_table_screen.json`)

-   `smithing_table_input_items` - 锻造台输入物品
-   `smithing_table_material_items` - 锻造台材料物品
-   `smithing_table_result_items` - 锻造台结果物品

#### 切石机界面 (`ui/stonecutter_screen.json`)

-   `stonecutter_input_items` - 切石机输入物品
-   `stonecutter_result_items` - 切石机结果物品
-   `stones` - 石头集合

#### 村民交易界面2 (`ui/trade_2_screen.json`)

-   `trade2_ingredient1_item` - 交易原料1物品
-   `trade2_ingredient2_item` - 交易原料2物品
-   `trade2_result_item` - 交易结果物品
-   `trade_item_1` - 交易物品1
-   `trade_item_2` - 交易物品2
-   `sell_item` - 出售物品
-   `trades` - 交易集合
-   `trade_tiers` - 交易等级

## 硬编码绑定名称

部分绑定仅在特定界面中生效。

### 界面专属绑定：

#### 账户转移错误界面 (`ui/account_transfer_error_screen.json`)

-   `#error_title_text` - 错误标题文本
-   `#error_number_label` - 错误编号标签
-   `#error_number` - 错误编号
-   `#correlation_id_label` - 关联ID标签
-   `#correlation_id` - 关联ID

#### 添加外部服务器界面 (`ui/add_external_server_screen.json`)

-   `#play_button_enabled` - 启用播放按钮
-   `#play_button_disabled` - 禁用播放按钮
-   `#save_button_enabled` - 启用保存按钮
-   `#save_button_disabled` - 禁用保存按钮

#### 临时处理中界面 (`ui/adhoc_in_progress_screen.json`)

-   `#adhoc_title` - 临时处理标题

#### 认证界面 (`ui/authentication_screen.json`)

-   `#sign_in_visible` - 登录可见
-   `#sign_in_ios_visible` - iOS登录可见
-   `#sign_in_button_visible` - 登录按钮可见
-   `#sign_in_ios_buttons_visible` - iOS登录按钮可见
-   `#authentication_message` - 认证消息
-   `#confirm_button_enabled` - 确认按钮启用
-   `#edu_store_visible` - 教育版商店可见
-   `#edu_store_purchase_info` - 教育版商店购买信息
-   `#asking_to_buy_visible` - 购买询问可见
-   `#confirming_purchase_visible` - 确认购买可见
-   `#demo_choice_visible` - 演示选择可见
-   `#eula_visible` - 用户协议可见
-   `#popup_text` - 弹窗文本
-   `#popup_message_student_text` - 学生弹窗消息文本
-   `#popup_message_student_visible` - 学生弹窗消息可见
-   `#generic_popup_link_visible` - 通用弹窗链接可见
-   `#trial_purchase_link_visible` - 试用购买链接可见
-   `#show_popup_dismiss_button` - 显示弹窗关闭按钮

#### 书本界面 (`ui/book_screen.json`)

-   `#screenshot_path` - 截图路径
-   `#is_photo_page` - 是否为照片页
-   `#is_text_page` - 是否为文本页
-   `#pick_grid_dimensions` - 选择网格尺寸
-   `#page_number` - 页码
-   `#title_text_box_item_name` - 标题文本框项目名称
-   `#author_editable` - 作者可编辑
-   `#author_text_box_item_name` - 作者文本框项目名称
-   `#editable` - 可编辑状态
-   `#viewing` - 查看状态
-   `#signing` - 签名状态
-   `#picking` - 选择状态
-   `#exporting` - 导出状态
-   `#page_visible` - 页面可见
-   `#pick_item_visible` - 选择项目可见
-   `#close_button_visible` - 关闭按钮可见
-   `#edit_controls_active` - 编辑控件激活
-   `#finalize_button_enabled` - 完成按钮启用

#### Braze界面 (`ui/braze_screen.json`)

-   `#image_texture` - 图像纹理

#### 捆绑包购买警告界面 (`ui/bundle_purchase_warning_screen.json`)

-   `#banner_visible` - 横幅可见
-   `#offer_title` - 优惠标题
-   `#keyart_path` - 主视觉图路径
-   `#keyart_texture_file_system` - 主视觉图文件系统纹理

#### 聊天界面 (`ui/chat_screen.json`)

-   `#keyboard_being_use` - 正在使用键盘
-   `#keyboard_button_focus_override_up` - 键盘按钮焦点覆盖上
-   `#keyboard_button_focus_override_down` - 键盘按钮焦点覆盖下
-   `#keyboard_button_visible` - 键盘按钮可见
-   `#send_button_visible` - 发送按钮可见
-   `#send_button_accessibility_text` - 发送按钮无障碍文本
-   `#chat_visible` - 聊天可见
-   `#message_text_box_content` - 消息文本框内容
-   `#text_edit_box_focus_override_up` - 文本编辑框焦点覆盖上
-   `#text_edit_box_focus_override_down` - 文本编辑框焦点覆盖下
-   `#auto_complete_item` - 自动补全项目
-   `#auto_complete_text` - 自动补全文本
-   `#get_grid_size` - 获取网格尺寸
-   `#chat_title_text` - 聊天标题文本
-   `#chat_typeface_visible` - 聊天字体可见

#### 选择Realm界面 (`ui/choose_realm_screen.json`)

-   `#realms_grid_dimension` - Realms网格尺寸
-   `#world_button_focus_identifier` - 世界按钮焦点标识
-   `#ten_player_button_visible` - 十人游戏按钮可见
-   `#two_player_button_visible` - 双人游戏按钮可见
-   `#realms_world_player_count` - Realms世界玩家数量
-   `#realms_game_online` - Realms游戏在线状态
-   `#realms_game_unavailable` - Realms游戏不可用状态
-   `#realms_game_offline` - Realms游戏离线状态

#### 代币购买界面 (`ui/coin_purchase_screen.json`)

-   `#bonus_coins` - 奖励代币
-   `#coins_without_bonus` - 无奖励代币
-   `#coin_offer_texture_name` - 代币优惠纹理名称
-   `#coin_offer_texture_file_system` - 代币优惠文件系统纹理
-   `#bonus_coins_visible` - 奖励代币可见
-   `#price_text` - 价格文本
-   `#coins_required_for_purchase` - 购买所需代币
-   `#show_missing_coins` - 显示缺少的代币
-   `#coin_offer_size` - 代币优惠尺寸
-   `#has_coin_offers` - 是否有代币优惠
-   `#coin_loading_visible` - 代币加载可见

#### 命令方块界面 (`ui/command_block_screen.json`)

-   `#maximized_input_visible` - 最大化输入可见
-   `#block_type_icon_texture` - 方块类型图标纹理
-   `#close_button_visible_binding_name` - 关闭按钮可见绑定名称
-   `#command_impulse_mode` - 命令脉冲模式
-   `#command_chain_mode` - 命令连锁模式
-   `#command_repeat_mode` - 命令循环模式
-   `#block_type_dropdown_toggle_label` - 方块类型下拉菜单切换标签
-   `#block_type_dropdown_label_color_binding` - 方块类型下拉菜单标签颜色绑定
-   `#block_type_dropdown_enabled` - 方块类型下拉菜单启用
-   `#command_conditional_mode` - 命令条件模式
-   `#command_unconditional_mode` - 命令无条件模式
-   `#condition_dropdown_toggle_label` - 条件下拉菜单切换标签
-   `#condition_dropdown_enabled` - 条件下拉菜单启用
-   `#command_always_on_mode` - 命令常开模式
-   `#command_needs_redstone_mode` - 命令需要红石模式
-   `#redstone_dropdown_enabled` - 红石下拉菜单启用
-   `#command_hover_note` - 命令悬停说明
-   `#execute_on_first_tick_enabled` - 首次执行启用
-   `#command_tick_delay` - 命令延迟刻数
-   `#command_text_edit` - 命令文本编辑
-   `#command_output_text` - 命令输出文本
-   `#previous_block_type_text` - 先前方块类型文本
-   `#previous_block_type_text_color` - 先前方块类型文本颜色
-   `#previous_condition_mode_text` - 先前条件模式文本
-   `#previous_redstone_mode_text` - 先前红石模式文本
-   `#minimize_button_visible_binding_name` - 最小化按钮可见绑定名称

#### 评论界面 (`ui/comment_screen.json`)

-   `#report_to_club_button_visible_feeditem` - 反馈给俱乐部按钮可见(动态项)
-   `#report_to_enforcement_button_visible_feeditem` - 反馈给执行按钮可见(动态项)
-   `#delete_button_visible_feeditem` - 删除按钮可见(动态项)
-   `#report_to_club_button_visible_comment` - 反馈给俱乐部按钮可见(评论)
-   `#report_to_enforcement_button_visible_comment` - 反馈给执行按钮可见(评论)
-   `#delete_button_visible_comment` - 删除按钮可见(评论)
-   `#comment_buttons_visible` - 评论按钮可见
-   `#feed_comment_page_collection_length` - 动态评论页集合长度
-   `#comment_content` - 评论内容
-   `#is_author_linked_account` - 是否为作者关联账户
-   `#content` - 内容
-   `#text_visible` - 文本可见
-   `#likes_and_comments` - 点赞和评论
-   `#screenshot_texture` - 截图纹理
-   `#screenshot_texture_source` - 截图纹理来源
-   `#textpost_content` - 文本发布内容
-   `#textpost_visible` - 文本发布可见
-   `#comment_text_box` - 评论文本框
-   `#comment_platform_tag` - 评论平台标签
-   `#comment_gamertag` - 评论玩家标签
-   `#likes_and_time_since_comment_post` - 点赞和评论发布时间
-   `#author_gamertag` - 作者玩家标签
-   `#time_since_feed_post` - 动态发布时间
-   `#author_platform_tag` - 作者平台标签

#### 确认MSA解绑界面 (`ui/confirm_msa_unlink_screen.json`)

-   `#unlink_warning_text` - 解绑警告文本
-   `#unlink_consequences_acknowledged` - 已确认解绑后果
-   `#confirm_0` - 确认0
-   `#confirm_0_enabled` - 确认0启用
-   `#confirm_1` - 确认1
-   `#confirm_1_enabled` - 确认1启用
-   `#confirm_2` - 确认2
-   `#confirm_2_enabled` - 确认2启用
-   `#confirm_3` - 确认3
-   `#confirm_3_enabled` - 确认3启用

#### 内容日志历史界面 (`ui/content_log_history_screen.json`)

-   `#content_log_text` - 内容日志文本
-   `#messages_size` - 消息大小

#### 创建世界促销界面 (`ui/create_world_upsell.json`)

-   `#realm_button_text` - Realm按钮文本
-   `#realm_trial_available` - Realm试用可用

#### 铁砧界面 (`ui/anvil_screen.json`)

-   `#cost_text` - 花费文本
-   `#cost_text_green` - 绿色花费文本
-   `#cost_text_red` - 红色花费文本

#### 信标界面 (`ui/beacon_screen.json`)

-   `#supports_netherite` - 支持下界合金
-   `#extra_image_selection` - 额外图像选择

#### 酿造台界面 (`ui/brewing_stand_screen.json`)

-   `#empty_bottle_image_visible` - 空瓶图像可见
-   `#empty_fuel_image_visible` - 空燃料图像可见
-   `#brewing_bubbles_ratio` - 酿造气泡比例
-   `#brewing_fuel_ratio` - 酿造燃料比例
-   `#brewing_arrow_ratio` - 酿造箭头比例

#### 制图台界面 (`ui/cartography_screen.json`)

-   `#is_none_mode` - 是否为无模式
-   `#is_clone_mode` - 是否为克隆模式
-   `#is_rename_mode` - 是否为重命名模式
-   `#is_basic_map_mode` - 是否为基本地图模式
-   `#is_locator_map_mode` - 是否为定位器地图模式
-   `#is_extend_mode` - 是否为扩展模式
-   `#is_locked_mode` - 是否为锁定模式
-   `#output_description` - 输出描述

#### 附魔台界面 (`ui/enchanting_table_screen.json`)

-   `#selectable_dust_is_visible` - 可选粉尘可见
-   `#unselectable_dust_is_visible` - 不可选粉尘可见
-   `#runes` - 符文
-   `#cost` - 花费
-   `#unselectable_button_visibility` - 不可选按钮可见性
-   `#selectable_button_visibility` - 可选按钮可见性
-   `#show_selected_button_highlight` - 显示选中按钮高亮
-   `#active_enchant` - 激活附魔
-   `#inactive_enchant` - 未激活附魔
-   `#input_item_id` - 输入物品ID
-   `#output_item_id` - 输出物品ID
-   `#enchant_hint` - 附魔提示
-   `#player_level_color` - 玩家等级颜色
-   `#player_level_info` - 玩家等级信息
-   `#enchant_error` - 附魔错误

#### 熔炉界面 (`ui/furnace_screen.json`)

-   `#furnace_arrow_ratio` - 熔炉箭头比例
-   `#furnace_flame_ratio` - 熔炉火焰比例
-   `#output_name` - 输出名称

#### 马匹界面 (`ui/horse_screen.json`)

-   `#entity_id` - 实体ID
-   `#equip_grid_dimensions` - 装备网格尺寸
-   `#inv_grid_dimensions` - 物品栏网格尺寸
-   `#sadle_slot_centered` - 鞍槽居中
-   `#has_saddle_slot` - 有鞍槽
-   `#has_armor_slot` - 有护甲槽
-   `#has_only_armor_slot` - 仅有护甲槽
-   `#has_only_carpet_slot` - 仅有地毯槽
-   `#has_armor_and_saddle_slot` - 有护甲和鞍槽
-   `#has_carpet_and_saddle_slot` - 有地毯和鞍槽
-   `#is_chested` - 是否有箱子
-   `#renderer_tab_toggle` - 渲染器标签切换
-   `#chest_tab_toggle` - 箱子标签切换

#### 织布机界面 (`ui/loom_screen.json`)

-   `#pattern_cell_background_texture` - 图案单元格背景纹理
-   `#container_cell_background_texture` - 容器单元格背景纹理
-   `#empty_image_visible` - 空图像可见
-   `#banner_patterns` - 旗帜图案
-   `#banner_colors` - 旗帜颜色
-   `#pattern_selector_total_items` - 图案选择器总项目数
-   `#result_patterns` - 结果图案
-   `#result_colors` - 结果颜色
-   `#is_right_tab_loom` - 是否为右侧织布机标签
-   `#is_left_tab_patterns` - 是否为左侧图案标签

#### 切石机界面 (`ui/stonecutter_screen.json`)

-   `#stone_cell_background_texture` - 石头单元格背景纹理
-   `#container_cell_background_texture` - 容器单元格背景纹理
-   `#item_stack_count` - 物品堆叠数量
-   `#stone_selector_total_items` - 石头选择器总项目数
-   `#has_input_item` - 是否有输入物品
-   `#is_right_tab_stonecutter` - 是否为右侧切石机标签
-   `#is_left_tab_stones` - 是否为左侧石头标签

#### 死亡界面 (`ui/death_screen.json`)

- `#death_reason_text` - 死亡原因文本
- `#respawn_visible` - 重生可见
- `#quit_enabled` - 退出启用
- `#quit_visible` - 退出可见
- `#buttons_and_deathmessage_visible` - 按钮和死亡消息可见

#### 村民交易2界面 (`ui/trade2_screen.json`)

-   `#name_label` - 名称标签
-   `#trade_cell_background_texture` - 交易单元格背景纹理
-   `#trade_item_count` - 交易物品数量
-   `#single_slash_visible` - 单斜杠可见
-   `#double_slash_visible` - 双斜杠可见
-   `#second_trade_item_count` - 第二交易物品数量
-   `#trade_price_different` - 交易价格不同
-   `#trade_cross_out_visible` - 交易划掉可见
-   `#padding_around_sell_item` - 出售物品周围填充
-   `#trade_possible` - 交易可能
-   `#trade_toggle_state` - 交易切换状态
-   `#trade_toggle_enabled` - 交易切换启用
-   `#trade_tier_total` - 交易等级总数
-   `#tier_name` - 等级名称
-   `#is_tier_unlocked` - 等级是否解锁
-   `#is_left_tab_trade` - 是否为左侧交易标签
-   `#show_level` - 显示等级
-   `#tier_visible` - 等级可见
-   `#trade_selector_total` - 交易选择器总数
-   `#has_second_buy_item` - 是否有第二购买物品
-   `#exp_bar_visible` - 经验条可见
-   `#exp_progress` - 经验进度
-   `#exp_possible_progress` - 可能经验进度
-   `#trade_details_button_1_visible` - 交易详情按钮1可见
-   `#trade_details_button_2_visible` - 交易详情按钮2可见
-   `#enchantment_details_button_visible` - 附魔详情按钮可见
-   `#item_valid` - 物品有效

### 值取决于所在界面的绑定：

-   `#title_text` - 标题文本
-   `#body_text` - 正文文本
-   `#hover_text` - 悬停文本
-   `#cross_out_icon` - 划掉图标
-   `#is_left_tab_inventory` - 是否为左侧物品栏标签
-   `#selected_hover_text` - 选中悬停文本

### 其他绑定：

-   `#tts_dialog_body` - 文本转语音对话框正文
-   `#button_enabled` - 按钮启用
-   `#using_touch` - 使用触摸
-   `#close_button_visible` - 关闭按钮可见

## 设置选项

### 滑动条设置

| 设置名称               | 滑动条ID                 | 数值绑定名称               | 语音播报值               | 文本标签绑定名称               | 启用状态绑定名称               |
|------------------------|--------------------------|--------------------------|--------------------------|------------------------------|------------------------------|
| 亮度调节               | `gamma`                  | `#gamma`                | `#gamma_text_value`     | `#gamma_slider_label`        | `#gamma_enabled`            |
| VR亮度调节             | `vr_gamma`               | `#vr_gamma`             | `#vr_gamma_text_value`  | `#vr_gamma_slider_label`     | `#vr_gamma_enabled`         |
| HUD透明度              | `interface_opacity`      | `#interface_opacity`    | `#interface_opacity_text_value` | `#interface_opacity_slider_label` | `#interface_opacity_enabled` |
| 分屏HUD透明度          | `splitscreen_interface_opacity` | `#splitscreen_interface_opacity` | `#interface_opacity_text_value` | `#splitscreen_interface_opacity_slider_label` | `#splitscreen_interface_opacity_enabled` |
| 视野范围(FOV)          | `field_of_view`          | `#field_of_view`        | `#field_of_view_text_value` | `#field_of_view_slider_label` | `#field_of_view_enabled`     |

### 开关选项

| 设置名称                     | 开关ID                          | 状态绑定名称                   | 启用状态绑定名称                   |
|------------------------------|--------------------------------|--------------------------------|----------------------------------|
| 反转Y轴(鼠标)                | `keyboard_mouse_invert_y_axis` | `#keyboard_mouse_invert_y_axis` | `#keyboard_mouse_invert_y_axis_enabled` |
| 自动跳跃(鼠标)               | `keyboard_mouse_autojump`      | `#keyboard_mouse_autojump`     | `#keyboard_mouse_autojump_enabled` |
| 显示完整键盘选项             | `keyboard_show_full_keyboard_options` | `#keyboard_show_full_keyboard_options` | `#keyboard_show_full_keyboard_options_enabled` |
| 隐藏键盘提示                 | `hide_keyboard_tooltips`       | `#hide_keyboard_tooltips`      | `#hide_keyboard_tooltips_enabled` |
| 内容文件日志                 | `content_log_file`             | `#content_log_file`            | `#content_log_file_enabled`      |
| 内容GUI日志                  | `content_log_gui`              | `#content_log_gui`             | `#content_log_gui_enabled`       |
| 使用单点登录(SSO)            | `ad_use_single_sign_on`        | `#ad_use_single_sign_on`       |                                  |
| 关闭自动更新                 | `#auto_update_mode_off`        | `#auto_update_mode_off`        |                                  |
| 启用自动更新(包括移动数据)    | `#auto_update_mode_on_with_cellular` | `#auto_update_mode_on_with_cellular` |                                  |
| 仅WiFi自动更新               | `#auto_update_mode_on_wifi_only` | `#auto_update_mode_on_wifi_only` |                                  |
| 启用自动更新                 | `auto_update_enabled`          | `#auto_update_enabled`         |                                  |
| 跨平台游戏                   | `crossplatform_toggle`         | `#crossplatform_toggle`        | `#crossplatform_toggle_enabled`  |
| 允许使用移动数据              | `allow_cellular_data`          | `#allow_cellular_data`         | `#allow_cellular_data_enabled`   |
| WebSocket加密                | `websocket_encryption`         | `#websocket_encryption`        | `#websocket_encryption_enabled`  |
| 仅允许可信皮肤               | `only_trusted_skins_allowed`   | `#only_trusted_skins_allowed`  | `#only_trusted_skins_allowed_enabled` |
| 外部存储位置                 | `#storage_location_radio_external` | `#storage_location_radio_external` | `#file_storage_location_enabled` |
| 应用内存储位置               | `#storage_location_radio_package` | `#storage_location_radio_package` | `#file_storage_location_enabled` |
| 第一人称视角                 | `#thirdperson_radio_first`     | `#thirdperson_radio_first`     | `#third_person_dropdown_enabled` |
| 第三人称背后视角             | `#thirdperson_radio_third_back` | `#thirdperson_radio_third_back` | `#third_person_dropdown_enabled` |
| 第三人称正面视角             | `#thirdperson_radio_third_front` | `#thirdperson_radio_third_front` | `#third_person_dropdown_enabled` |
| 全屏模式                     | `full_screen`                  | `#full_screen`                 | `#full_screen_enabled`           |
| 隐藏手持物品                 | `hide_hand`                    | `#hide_hand`                   | `#hide_hand_enabled`             |
| VR模式隐藏手持物品           | `vr_hide_hand`                 | `#vr_hide_hand`                | `#vr_hide_hand_enabled`          |
| 隐藏纸娃娃                   | `hide_paperdoll`               | `#hide_paperdoll`              | `#hide_paperdoll_enabled`        |
| 隐藏HUD                     | `hide_hud`                     | `#hide_hud`                    | `#hide_hud_enabled`              |
| VR模式隐藏HUD               | `vr_hide_hud`                  | `#vr_hide_hud`                 | `#vr_hide_hud_enabled`           |
| 屏幕动画效果                 | `screen_animations`            | `#screen_animations`           | `#screen_animations_enabled`     |
| 水平分屏                     | `#split_screen_radio_horizontal` | `#split_screen_radio_horizontal` | `#split_screen_dropdown_enabled` |
| 垂直分屏                     | `#split_screen_radio_vertical` | `#split_screen_radio_vertical` | `#split_screen_dropdown_enabled` |
| 显示自动保存图标             | `show_auto_save_icon`          | `#show_auto_save_icon`         | `#show_auto_save_icon_enabled`   |
| 经典选择框                   | `classic_box_selection`        | `#classic_box_selection`       | `#classic_box_selection_enabled` |
| VR经典选择框                 | `vr_classic_box_selection`     | `#vr_classic_box_selection`    | `#vr_classic_box_selection_enabled` |
| 显示玩家名称                 | `ingame_player_names`          | `#ingame_player_names`         | `#ingame_player_names_enabled`   |
| 分屏显示玩家名称             | `splitscreen_ingame_player_names` | `#splitscreen_ingame_player_names` | `#splitscreen_ingame_player_names_enabled` |
| 视角晃动效果                 | `view_bobbing`                 | `#view_bobbing`                | `#view_bobbing_enabled`          |
| 相机抖动效果                 | `camera_shake`                 | `#camera_shake`                | `#camera_shake_enabled`          |
| 透明树叶                     | `transparent_leaves`           | `#transparent_leaves`          | `#transparent_leaves_enabled`    |
| VR透明树叶                   | `vr_transparent_leaves`        | `#vr_transparent_leaves`       | `#vr_transparent_leaves_enabled` |
| 气泡粒子效果                 | `bubble_particles`             | `#bubble_particles`            | `#bubble_particles_enabled`      |
| 渲染云朵                     | `render_clouds`                | `#render_clouds`               | `#render_clouds_enabled`         |
| 精美天空                     | `fancy_skies`                  | `#fancy_skies`                 | `#fancy_skies_enabled`           |
| 平滑光照                     | `smooth_lighting`              | `#smooth_lighting`             | `#smooth_lighting_enabled`       |
| VR平滑光照                   | `graphics_toggle`              | `#graphics_toggle`             | `#graphics_toggle_enabled`       |
| 图形质量                     | `graphics_toggle`              | `#graphics_toggle`             | `#graphics_toggle_enabled`       |
| 视野范围切换                 | `field_of_view_toggle`         | `#field_of_view_toggle`        | `#field_of_view_toggle_enabled`  |
| 经典UI风格                   | `#ui_profile_radio_classic`    | `#ui_profile_radio_classic`    | `#ui_profile_dropdown_enabled`   |
| 便携版UI风格                 | `#ui_profile_radio_pocket`     | `#ui_profile_radio_pocket`     | `#ui_profile_dropdown_enabled`   |
| 像素抗锯齿                   | `texel_aa`                     | `#texel_aa`                    | `#texel_aa_enabled`              |
| VR 3D渲染                   | `vr_3d_rendering`              | `#vr_3d_rendering`             | `#vr_3d_rendering_enabled`       |
| VR镜像纹理                   | `vr_mirror_texture`            | `#vr_mirror_texture`           | `#vr_mirror_texture_enabled`     |
| VR手部指针可见               | `vr_hand_pointer`              | `#vr_hand_pointer`             | `#vr_hand_pointer_enabled`       |
| VR手部可见                   | `vr_hands_visible`             | `#vr_hands_visible`            | `#vr_hands_visible_enabled`      |
| 启用自动文本转语音           | `enable_auto_text_to_speech`   | `#enable_auto_text_to_speech`  | `#enable_auto_text_to_speech_enabled` |
| 启用UI文本转语音             | `enable_ui_text_to_speech`     | `#enable_ui_text_to_speech`    | `#enable_ui_text_to_speech_enabled` |
| 启用聊天文本转语音           | `enable_chat_text_to_speech`   | `#enable_chat_text_to_speech`  | `#enable_chat_text_to_speech_enabled` |
| 启用打开聊天消息             | `enable_open_chat_message`     | `#enable_open_chat_message`    | `#enable_open_chat_message_enabled` |
| 相机抖动                     | `camera_shake`                 | `#camera_shake`                | `#camera_shake_enabled`          |
| 语言选择(集合)               | `languages`                    | `#language_initial_selected`   |                                  |

## 物品ID与附加值(`#item_id_aux`)

| 物品名称         | ID    | 附加值      |
|------------------|-------|------------|
| 钻石             | 306   | 20054016   |
| 绿宝石           | 519   | 34013184   |
| 金锭             | 308   | 20185088   |
| 铁锭             | 307   | 20119552   |
| 下界合金锭       | 616   | 40370176   |
| 旗帜             | 574   | 37617664   |
| 鞍               | 373   | 24444928   |
| 制图台           | -200  | -13107200  |
| 箱子             | 54    | 3538944    |
| 工作台           | 58    | 3801088    |
| 织布机           | -204  | -13369344  |
| 切石机           | -197  | -12910592  |

#### 如何计算方块物品的附加值：

附加值 = ID × 65536

ID = 附加值 ÷ 65536  
65536 = 附加值 ÷ ID

获取所有物品ID请参考[官方文档](https://docs.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonitems)。
