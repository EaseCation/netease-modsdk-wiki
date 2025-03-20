---
title: 理解JSON
category: 指南
description: 初探JSON世界
nav_order: 1
prefix: 'a. '
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - Dreamedc2015
    - sermah
    - cda94581
---

# 理解JSON

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

::: tip
这是一个附录页面。您可以从[这里](/wiki/guide/index)开始完整阅读教程。
:::

JSON是一种简单的文本文件格式，既方便人类阅读又便于计算机解析。基岩版使用.json文件作为附加包的"编程语言"，因此您需要扎实掌握JSON的读写能力！如果您从未接触过JSON，强烈建议先阅读[这篇教程](https://www.digitalocean.com/community/tutorials/an-introduction-to-json)，它将教会您编写有效JSON文件所需的所有知识。

## 有效JSON

编写JSON时最关键的是必须确保文件_完全无错误_，否则整个文件将无法正常工作。即使一个错误的字符或多余逗号都会导致解析失败。因此，编写有效JSON至关重要。

我们可以使用在线工具[json lint](https://jsonlint.com/)来验证JSON格式。只需将代码粘贴到网站中，点击`Validate JSON`即可获得验证结果，包括错误位置和类型。

## 数据结构

JSON中使用多种格式表示数据，每种格式对应特定数据类型：

| 名称    | 示例      | 说明                           |
| ------- | -------- | ----------------------------- |
| 字符串  | "Hello!" | 文本字符。必须用引号包裹       |
| 整型    | 15       | 整数。无需引号                 |
| 浮点型  | 1.2      | 小数。无需引号                 |
| 布尔值  | true     | 只能是true或false。无需引号    |

JSON格式示例：
```json
{
  "my_string": "你好！",
  "my_int": 15,
  "my_float": 1.2,
  "my_bool": true
}
```

除了基础类型，还有两种特殊数据结构用于_嵌套_数据：

### 数组

数组使用方括号`[]`表示，本质是_有序列表_。列表元素可以是任意数据类型，元素间用逗号分隔。

示例：
| 结构          | 说明                     |
| ------------- | ----------------------- |
| [1, 2, 3]     | 整型数组                |
| ["红", "蓝"]  | 字符串数组（注意引号！）|

JSON格式：
```json
{
   "my_ints": [1, 2, 3],
   "my_strings": ["红", "蓝"]
}
```

### 对象

对象使用花括号`{}`表示，包含_键值对_集合。键名称为`key`，对应数据称为`value`。键值对的格式为`"<key>": <value>`，注意键名必须用引号包裹且后接冒号。

对象示例：
::: code-group
```json [示例对象]
{
	"a_list_of_integers": [1, 2, 3],
	"is_json_cool": true
}
```
:::

键值对之间需要用逗号分隔。我们称对象内的键值对为它的_子元素_或_内部元素_。

## JSON结构规范

在Minecraft中，JSON文件总是以_对象_（即`{}`）开头，称为_顶层对象_。所有代码都以键值对形式编写在这个对象内部。

以下是一个典型的Minecraft附加包JSON文件示例：
::: code-group
```json [动画文件示例]
{
	"format_version": "1.12.0",
	"animations": {
		"animation.car.wheel_spin": {
			"loop": true,
			"animation_length": 1.0,
			"bones": {
				"front_wheels": {
					"rotation": ["q.modified_distance_moved * -30", 0, 0]
				},
				"back_wheels": {
					"rotation": ["q.modified_distance_moved * -30", 0, 0]
				}
			}
		}
	}
}
```
:::

仔细观察这个结构，可以发现它完全由我们已学过的数据类型构成。试着回答以下问题来检验理解：

- 顶层对象中有多少个键？分别是什么？
- `format_version`的值是什么类型？
- `"loop"`键存储的是哪种数据类型？（字符串、布尔值等）

## 常见问题排查

以下是几个典型错误案例，帮助您理解社区讨论中常用的技术术语：

---

**错误写法**：`"format_version": 1.12`

**反馈**："_format_version的值类型错误，应为字符串_"

**解析**：此处将`format_version`设为浮点型而非字符串型。应添加引号改为`"1.12"`

---

**错误写法**：`[1 2 5 6]`

**反馈**："_数组缺少逗号分隔_"

**解析**：数组元素必须用逗号分隔，正确写法应为`[1, 2, 5, 6]`

---

**反馈**："_format_version被错误地放在description内部，应置于顶层_"

**解析**：说明`"format_version"`键值对被错误嵌套在description对象内。需要将其移至顶层对象中。