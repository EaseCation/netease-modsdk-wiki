---
title: 基于数学的动画（Molang）
tags:
    - 中级
category: 基础
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - MedicalJewel105
    - yanasakana
    - Luthorius
    - TheItsNameless
    - SmokeyStack
    - ThomasOrs
---

# 基于数学的动画

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

数学动画是关键帧动画的强大替代方案。简而言之，"基于数学的动画"是指使用Molang表达式驱动实体几何变形的概念。所有原版动画都采用数学动画实现，这里有一个示例：

::: code-group
```json [原版动画示例]
"leftarm" : {
    "rotation" : [ "((-0.2 + 1.5 * (math.abs(math.mod(q.modified_distance_moved, 13) - 6.5) - 3.25) / 3.25) * q.modified_move_speed) * 57.3 - v.agent.armxrotationfactor", 0.0, "-v.agent.armzrotation" ]
},
```
:::

如你所见，数学动画的表达式可能非常复杂且难以理解。因此，它们应被视为关键帧动画的_专业替代方案_，而非*完全*取代。

这是为了实现动画流畅且理想循环所必须付出的代价。

![](/assets/images/visuals/math-based-animations/animation-1.gif)

## 编写数学动画

### 手动编写

要手动编写此类动画，只需创建一个动画文件，并将关键帧替换为包含数学表达式的值数组。字符串值可以直接包含数学表达式。原版动画文件是学习此类动画的宝贵参考，**强烈建议**下载并研究它们！

对于希望可视化表达式过程的开发者，推荐使用[Jannis](https://twitter.com/jannisx11)开发的[Molang图形化工具](https://jannisx11.github.io/molang-grapher/)，它可以将表达式转换为直观的数学图表！

### 在Blockbench中创建

Blockbench支持创建并实时预览大部分基于数学的动画。首先在时间轴的第0帧新建关键帧，然后在左侧边栏的关键帧面板中编辑Molang表达式。注意需要省略表达式两边的引号（引号仅在直接编辑JSON时需要）。

由于缺少游戏上下文，Blockbench可能无法支持所有Molang查询。如需预览使用特定上下文查询的动画，可以在"变量占位符"区域（位于关键帧面板下方）添加模拟值。例如，添加`q.modified_distance_moved = time*8`即可模拟以每秒8格速度移动时的`modified_distance_moved`查询。

## 使用查询语句

Molang的各类"查询(Queries)"是我们数学工具库中最强大的功能之一。查询可以将游戏中的实时数据注入数学表达式。

常用查询包括：

-   `q.modified_distance_moved`（修正移动距离）
-   `q.modified_move_speed`（修正移动速度）
-   `q.anim_time`（动画时间）
-   `q.life_time`（生命周期）

这些查询常用于动画中提取攻击时间、移动距离等游戏世界数据，以实现更动态且同步的动画效果。

### 避免使用动画控制器

通过合理运用查询语句，可以避免创建复杂的动画控制器。例如当行走动画速度直接关联实体移动速度时，静止的实体将自动停止动画播放。

## 应用实例

以下是一个基于数学动画的具体实现案例，使用了`q.modified_distance_moved`查询：

::: code-group
```json [车辆轮胎旋转动画]
{
	"format_version": "1.12.0",
	"animations": {
		"animation.car.wheel_spin": {
			"loop": true,
			"bones": {
			
				"front_wheels": {
					"rotation": [ "q.modified_distance_moved * -30", 0, 0 ]
				},
				
				"back_wheels": {
					"rotation": [ "q.modified_distance_moved * -30", 0, 0 ]
				}
				
			}
		}
	}
}
```
:::

在这个案例中，模型骨骼`front_wheels`和`back_wheels`的X轴旋转角度由`q.modified_distance_moved`查询结果乘以-30决定。

这意味着：处于*静止*状态的车辆**不会**转动轮胎，而*行驶中*的车辆会根据移动速度按比例旋转轮胎。