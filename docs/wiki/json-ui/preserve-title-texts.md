---
title: Title传递HUD元素更新
category: 巧思案例
tags:
    - 中级
mentions:
    - shanewolf38
    - SmokeyStack
---

# 通过 Title 传递 HUD 元素更新

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning ⚠️ 注意
本教程仅适用于国际版的受限制的 JSON UI 系统（客户端无法实现脚本控制）<br>
中国版无需使用此黑科技实现HUD元素的更新。
:::

在本教程中，您将学习如何保存绑定数据并根据含有特定字符串的 Title 更新界面元素。

## 概述

Title 是向UI系统传递数据的常用方法。当 Title 包含特定字符串时才更新相关数据元素，而忽略所有不含该字符串的 Title 数据非常有用。尽管本教程以 Title 为例，但该方法适用于所有通过绑定传递的数据（如副 Title 、玩家记分板名称等）。

要保存特定字符串，我们需要组合使用 `visibility_changed` 绑定更新条件和 `source_control_name`，从而仅在包含特定字符串时更新绑定，并将该绑定传递给另一个元素。

##  Title 指令

以下代码创建了一个标签元素，当将其添加到根面板时，可以在屏幕显示包含字符串"update"的 Title （显示文本中会移除"update"部分）。后续传入的 Title 信息只有包含"update"时才会更新显示文本。

::: code-group
```json [RP/ui/hud_screen.json]
"preserved_title_display": {
	"$update_string": "update",   //  Title 必须包含此字符串才触发元素更新
	"type": "label",
	"text": "#text",
	"controls": [
		{
			"data_control": {
				"type": "panel",
				"size": [ 0, 0 ],
				"bindings": [
					{
						"binding_name": "#hud_title_text_string"      // 读取当前 Title 字符串
					},
					{
						"binding_name": "#hud_title_text_string",
						"binding_name_override": "#preserved_text",   // 元素可见性变化时更新#preserved_text
						"binding_condition": "visibility_changed"
					},
					// 当包含更新字符的 Title 传入后，元素会短暂可见后立即隐藏
					{
						"binding_type": "view",
						"source_property_name": "(not (#hud_title_text_string = #preserved_text) and not ((#hud_title_text_string - $update_string) = #hud_title_text_string))",
						"target_property_name": "#visible"
					}
				]
			}
		}
	],
	"bindings": [
		{
			"binding_type": "view",
			"source_control_name": "data_control",   						// 从"data_control"子元素读取绑定
			//"resolve_sibling_scope": true,		 						// 当"data_control"与绑定调用元素为同级时需启用
			"source_property_name": "(#preserved_text - $update_string)",   // 从显示文本中移除更新字符串
			"target_property_name": "#text"
		}
	]
},
```

变量 `$update_string` 定义了触发元素更新的 Title 必须包含的特定字符串。子元素 `data_control` 用于在 Title 包含更新字符串时存储 Title 文本。`data_control` 必须是要传递保留文本元素的子级或同级元素，因为其可见性变化会触发文本保存。该元素的三个绑定分别实现：
1. 首绑定：持续追踪当前 Title 文本
2. 次绑定：在元素可见性变化时将当前 Title 保存至 `#preserved_text`
3. 末绑定：当传入含更新字符串的 Title 时短暂显示元素后立即隐藏

在 `data_control` 元素的第三个绑定中，需同时满足两个条件才可见：
1. `not (#hud_title_text_string = #preserved_text)` - 当前 Title 与保存 Title 不一致时成立
2. `not ((#hud_title_text_string - $update_string)` - 当前 Title 含有更新字符串时成立

当含有更新字符串且与已存文本不同的 Title 传入时，两条件同时触发，元素更新数据后立即重新隐藏自身。