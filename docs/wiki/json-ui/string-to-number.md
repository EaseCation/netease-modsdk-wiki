---
title: 字符串转数值
category: 巧思案例
tags:
    - 中级
mentions:
    - shanewolf38
    - SmokeyStack
    - ThomasOrs
---

# 字符串转数值

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在本教程中，您将学习如何将数字字符串转换为数值，以及如何将数值转换为文本字符串。

## 概述

在许多情况下会有文本字符串通过标题、操作栏、记分板或其他来源传递到用户界面中。当我们希望根据输入的字符串动态调整UI元素时，能够进行数字比较就显得非常重要。但类似于"34"或"89"这样的数值型字符串通常会被视为普通文本，既无法与数值进行比较，也难以直接作为运算数据使用。此时我们需要将这类字符串转换为数值。

要实现字符串到数值的转换，我们可以利用乘法运算特性。任何包含数字的字符串与数值相乘，或者通过去除字符串中的非数字部分，都能使游戏引擎将该值作为数值而非字符串处理。

## 字符串转数值

以下代码创建了一个标签元素，当添加到主面板时，可在记分板侧栏的最高分值处于100-999范围内时显示该数值。

::: code-group
```json [RP/ui/hud_screen.json]
"string_to_number": {
    "type": "label",
    "text": "#player_score_sidebar",
    "bindings": [
        {
            "binding_name": "#player_score_sidebar",
            "binding_type": "collection",
            "binding_collection_name": "scoreboard_scores"
        },
        {
            "binding_type": "view",
            "source_property_name": "(#player_score_sidebar * 1)",   // 将分数从字符串转换为数值
            "target_property_name": "#score"
        },
        {
            "binding_type": "view",
            "source_property_name": "((#score > 99) and (#score < 1000))",   // 仅在100-999范围内可见
            "target_property_name": "#visible"
        }
    ]
}
```

第一个绑定从记分板侧栏读取最大数值（该绑定值以字符串形式固定传输），第二个绑定通过将分数乘以1将其转换为数值（也可以通过减法操作去除字符串中的文本），第三个绑定设置元素仅在分数大于99且小于1000时可见。

**注意：** 如果需要将数值识别为浮点类型而非整数，可在等式运算中引入浮点变量或绑定，例如除以1.0（必须通过变量或绑定实现——直接插入浮点数无法生效）。这在处理`#clip-ratio`绑定时尤为实用。

## 数值转字符串

以下代码创建了一个标签元素，当添加到主面板时，可将"Strength: #"格式标题中的数字部分单独显示。

::: code-group
```json [RP/ui/hud_screen.json]
"number_to_string": {
	"type": "label",
	"text": "#text",
	"bindings": [
		{
			"binding_type": "global",
			"binding_name": "#hud_title_text_string"
		},
		{
			"binding_type": "view",
			"source_property_name": "('§z' + (#hud_title_text_string - 'strength: '))",
			"target_property_name": "#text"
		}
	]
}
```

当使用标题、副标题等方式传递包含数字的文本时，此方法可单独显示数值。通过减法运算去除多余文本后，需在数值前添加文本使其转换为字符串类型（`text`参数无法直接读取纯数值型绑定）。此例中的括号并非必需，主要用于区分数值转换操作。添加的`§z`字符是无效的Minecraft格式代码，既不显示也不影响标签颜色参数。若需要去除显示中无法通过减法处理的文本，推荐将元素嵌套在设置`"clips_children": true`和适当尺寸的容器面板中实现遮挡效果。