---
title: 最佳实践
category: 基础
nav_order: 2
tags:
    - 指南
mentions:
    - LukasPAH
    - SmokeyStack
    - TheItsNameless
    - ThomasOrs
---

# 最佳实践

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::tip 提示
本文内容假定您已对JSON-UI系统有一定了解。如果您是JSON-UI的新手，请务必先阅读[JSON-UI介绍](/wiki/json-ui/json-ui-intro)和[JSON-UI文档](/wiki/json-ui/json-ui-documentation)。
:::

## 最大化兼容性并减少UI崩溃的可能性

JSON-UI与其他附加包系统不同，因为**JSON-UI没有版本控制**。随着Mojang更新和修复JSON-UI系统，您对UI所做的任何修改都可能失效。幸运的是，您可以通过以下几种方法在Mojang更新原版UI时保持自定义UI的稳定性。

### 仅修改必要内容
最有效的防崩溃策略是只修改需要调整的部分。例如若只需要禁用经验条阴影，正确做法应是在资源包中向`hud_screen.json`文件添加：

```json
{
    "progress_text_label": {
        "shadow": false
    }
}
```

这种极简修改方式能显著降低未来更新导致UI崩溃的风险，同时保持文件整洁并大幅缩小体积。**若您将整个原版UI文件复制到资源包中进行修改，说明您错误理解了JSON-UI的工作机制**。

### 善用修改策略
使用[wiki文档中的修改策略](/wiki/json-ui/json-ui-intro#modifications)能有效降低更新风险。例如在HUD中添加自定义元素时，推荐使用修改数组操作而非直接插入控件：

::: code-group
```json [正确做法]
{
    "root_panel": {
        "modifications": [
            {
                "array_name": "controls",
                "operation": "insert_front",
                "value": [
                    {
                        "custom_ui@namespace.custom_ui": {}
                    }
                ]
            }
        ]
    }
}
```
:::

这种策略性合并方式能提升与其他资源包的兼容性，并减少因原版控件结构调整导致的崩溃风险。

### 避免修改深层嵌套控件
修改嵌套层级过深的控件容易引发问题。推荐优先修改基础元素定义，必要时使用斜杠语法定位子控件：

::: code-group
```json [推荐修改方式]
{
    "panel_with_label_and_bg/bg_image": {
        "size": ["100%c", "100%c"]
    },
    "panel_with_label_and_bg/bg_image/label": {
        "layer": -5
    }
}
```
:::

### 使用单一入口点
合并自定义UI时建议集中到单个入口点。例如将多个自定义控件统一插入`root_panel`：

::: code-group
```json [优化后]
{
    "root_panel": {
        "modifications": [
            {
                "array_name": "controls",
                "operation": "insert_front",
                "value": [
                    {"custom_ui_1@ns1.control1": {}},
                    {"custom_ui_2@ns1.control2": {}}
                ]
            }
        ]
    }
}
```
:::

### 避免使用原版命名空间
开发大规模UI修改时，建议创建自定义[命名空间](/wiki/json-ui/json-ui-intro#namespaces)并使用前缀（如`wiki:namespace`）来防止命名冲突。通过`element@namespace.element`语法引用其他命名空间的元素。

## 性能优化指南

JSON-UI是仅次于实体的性能消耗大户。以下策略可帮助提升UI性能表现：

### 减少操作符使用
[操作符](/wiki/json-ui/json-ui-intro#using-operators)会显著增加计算开销。优化示例：

```json
"$var": "(-2 * $number)"  // 优于 "(2 * (-1 * $number))"
```

### 精简绑定数量
每个[绑定](/wiki/json-ui/json-ui-intro#bindings)都会产生性能开销。建议：
- 移除无效绑定
- 合并相似功能绑定
- 避免重复绑定相同数据

### 优化控件结构
通过以下方式减少控件数量：
1. 删除无用控件或添加`"ignored": true`
2. 合并相似控件
3. 使用条件渲染替代多个独立控件

::: code-group
```json [优化前]
// 5个独立图像控件
"image_1@image_template": {
    "$texture": "textures/ui/example_1",
    "$binding_text": "1"
}
...
```
```json [优化后]
// 单个动态图像控件
"image": {
    "type": "image",
    "texture": "#texture",
    "bindings": [
        {
            "binding_type": "view",
            "source_property_name": "('textures/ui/example_' + #hud_title_text_string)",
            "target_property_name": "#texture"
        }
    ]
}
```
:::

**注意**：`"visible": false`不会阻止控件计算，应优先使用`"ignored": true`彻底禁用控件。

通过系统性优化，可显著提升UI响应速度并降低资源消耗，为玩家提供更流畅的游戏体验。