---
title: 'Blockbench建模、纹理与动画'
category: 指南
description: 初探Blockbench建模工具
prefix: '7. '
nav_order: 7
mentions:
    - KaiFireborn
    - SirLich
    - Dreamedc2015
    - SmokeyStack
    - sermah
    - cda94581
    - TheItsNameless
    - ThijsHankelMC
    - MedicalJewel105
    - ChibiMango
    - smell-of-curry
---

# Blockbench建模、纹理与动画

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

Blockbench是一款专为Minecraft设计的免费建模、纹理绘制和动画制作软件，支持移动端浏览器、Windows 10和macOS。请访问[blockbench.net](https://blockbench.net/)下载安装。

## 快速入门

1.  打开Blockbench
2.  选择 _文件 > 新建 > 基岩版模型_（注意：基岩版无法读取Java版模型）
3.  将出现以下界面

    ![](/assets/images/guide/create_entity_project_menu.png)

    -   `"文件名："` 即保存名称（示例将生成"skele_yaklin.geo.json"）
    -   `"模型标识符："` 是模型的命名空间标识（可省略命名空间前缀）
    -   **必须勾选** `"方框UV映射"` 以实现自动UV编辑和纹理展开
    -   `"纹理高度"` 和 `"纹理宽度"` 决定贴图分辨率

4.  点击确认后进入工作区：

    ![](/assets/images/guide/create_entity_workspace.png)

    -   工具栏提供移动、缩放、旋转等基础操作
    -   右下角菜单可添加骨骼和立方体（立方体可独立旋转，骨骼将带动其下所有子元素）

5.  现在可以开始建模！如需深入学习，推荐观看下方Everbloom Studio的教学视频

<YouTubeEmbed id="XqzxL_-XjA0" />

<YouTubeEmbed id="j7ISUImhgpc" />

## 纹理绘制

完成模型后，开始制作纹理：

1. 在左下方面板点击"创建纹理"
2. 在"名称："处输入贴图文件名（示例将导出为`ghost.png`），勾选"模板："可生成带辅助线的纹理模板
   ![](/assets/images/guide/create_entity_texture_1.png)
3. 确认分辨率与初始设置一致
   ![](/assets/images/guide/create_entity_texture_2.png)
4. 切换右上角至"绘制"模式进行纹理创作

## 动画制作

完成模型与纹理后，切换至右上角"动画"模式开始制作动画。

建议通过工具栏设置添加"导出动画"和"导入动画"按钮：
![](/assets/images/guide/create_entity_animation_1.png)

1. 点击"添加动画"（右上角+号图标），命名为`animation.{实体名称}.move`
   在时间轴0帧处调整腿部位置创建第一关键帧
   ![](/assets/images/guide/create_entity_animation_2.png)
2. 在时间轴0.5帧处创建第二关键帧
   ![](/assets/images/guide/create_entity_animation_3.png)
3. 将时间轴移至1.0帧，复制第一帧完成循环（Ctrl+C → Ctrl+V）
4. 右键动画选择"循环"使动画持续播放
   ![](/assets/images/guide/create_entity_animation_4.png)

## 保存作品

完成模型、纹理和行走动画后：

- 通过 _文件 > 保存模型_ 或 _文件 > 导出基岩版模型_ 保存
- 模型保存至 `RP/models/entity`
- 纹理保存至 `RP/textures/entity/`
- 动画保存至 `RP/animations`

恭喜完成首个实体视觉创作！下方提供完整文件示例参考。

_不妨尝试为你的独特实体升级视觉效果，或创作全新角色？_

<Spoiler title="显示代码">

::: code-group
```json [RP/models/entity/ghost.geo.json]
{
	"format_version": "1.12.0",
	"minecraft:geometry": [
		{
			"description": {
				"identifier": "geometry.ghost",
				"texture_width": 64,
				"texture_height": 64,
				"visible_bounds_width": 3,
				"visible_bounds_height": 3.5,
				"visible_bounds_offset": [0, 1.25, 0]
			},
			"bones": [
				{ "name": "root", "pivot": [0, 3, 0] },
				{
					"name": "body",
					"parent": "root",
					"pivot": [0, 4.625, 0],
					"cubes": [
						{
							"origin": [-4, 3, -4],
							"size": [8, 13, 8],
							"uv": [0, 20]
						}
					]
				},
				{
					"name": "leftArm",
					"parent": "body",
					"pivot": [4.6, 15.5, 0.5],
					"cubes": [
						{
							"origin": [4.1, 7, -1],
							"size": [3, 9, 3],
							"uv": [32, 32]
						}
					]
				},
				{
					"name": "rightArm",
					"parent": "body",
					"pivot": [-4.5, 15.5, 0.5],
					"cubes": [
						{
							"origin": [-7.1, 7, -1],
							"size": [3, 9, 3],
							"uv": [32, 20]
						}
					]
				},
				{
					"name": "head",
					"parent": "body",
					"pivot": [0, 16, 0],
					"cubes": [
						{
							"origin": [-5, 16, -5],
							"size": [10, 10, 10],
							"uv": [0, 0]
						}
					]
				}
			]
		}
	]
}
```

```json [RP/animations/ghost.a.animations.json]
{
	"format_version": "1.8.0",
	"animations": {
		"animation.ghost.idle": {
			"loop": true,
			"animation_length": 3,
			"bones": {
				"body": {
					"rotation": { "0.0": [10, 0, 0], "3.0": [10, 0, 0] },
					"position": {
						"0.0": [0, 0, 0],
						"1.5": [0, 1, 0],
						"3.0": [0, 0, 0]
					}
				},
				"leftArm": {
					"rotation": {
						"0.0": [-10, 0, 0],
						"1.5": [-5, 0, 0],
						"3.0": [-10, 0, 0]
					}
				},
				"rightArm": {
					"rotation": {
						"0.0": [-10, 0, 0],
						"1.5": [-5, 0, 0],
						"3.0": [-10, 0, 0]
					}
				},
				"head": {
					"rotation": {
						"0.0": [-7.5, 0, 0],
						"1.5": [-2.5, 0, 0],
						"3.0": [-7.5, 0, 0]
					}
				}
			}
		},
		"animation.ghost.attack": {
			"animation_length": 0.75,
			"bones": {
				"body": {
					"rotation": {
						"0.0": [10, 0, 0],
						"0.2917": [10, 15, 0],
						"0.5": [22.5, -12.5, 0],
						"0.75": [10, 0, 0]
					},
					"position": {
						"0.0": [0, 0, 0],
						"0.2917": [0, 0, 3],
						"0.5": [0, 0, -3],
						"0.75": [0, 0, 0]
					}
				},
				"leftArm": {
					"rotation": { "0.0": [-10, 0, 0], "0.75": [-10, 0, 0] }
				},
				"rightArm": {
					"rotation": {
						"0.0": [-10, 0, 0],
						"0.2083": [-10, 0, 0],
						"0.2917": [-10, 62.5, 117.5],
						"0.5": [-80, -17.5, 22.5],
						"0.75": [-10, 0, 0]
					}
				},
				"head": {
					"rotation": { "0.0": [-7.5, 0, 0], "0.75": [-7.5, 0, 0] }
				}
			}
		},
		"animation.ghost.move": {
			"loop": true,
			"animation_length": 1,
			"bones": {
				"body": {
					"rotation": {
						"0.0": [15, 0, 0],
						"0.25": [15, -2.5, 0],
						"0.5": [15, 0, 0],
						"0.75": [15, 2.5, 0],
						"1.0": [15, 0, 0]
					},
					"position": [0, 0, 0]
				},
				"leftArm": {
					"rotation": {
						"0.0": [15, 0, 0],
						"0.5": [20, 0, 0],
						"1.0": [15, 0, 0]
					}
				},
				"rightArm": {
					"rotation": {
						"0.0": [15, 0, 0],
						"0.5": [20, 0, 0],
						"1.0": [15, 0, 0]
					}
				},
				"head": {
					"rotation": {
						"0.0": [-12.5, 0, 0],
						"0.5": [-15, 0, 0],
						"1.0": [-12.5, 0, 0]
					}
				}
			}
		}
	}
}
```
:::

</Spoiler>

## 学习总结

<Checklist>

-   [x] 掌握Blockbench实体创建流程
-   [x] 学会使用Blockbench进行建模、纹理绘制与动画制作

</Checklist>