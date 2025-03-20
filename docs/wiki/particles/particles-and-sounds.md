---
title: '粒子与音效'
category: 基础
tags:
    - 已过时
mentions:
    - SirLich
    - Joelant05
    - destruc7ion
    - MedicalJewel105
    - aexer0e
    - solvedDev
---

# 粒子与音效

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::danger
本页部分信息已迁移至[动画效果文档](/wiki/visuals/animation-effects)
:::

## 动画中的粒子效果

Minecraft粒子效果可以应用于实体动画。例如，幻翼拥有持续释放minecraft:phantom_trail粒子的动画。让我们尝试在实体的攻击动画中添加粒子效果。

`资源包/entity/description/ 目录下`

::: code-group
```json [实体描述文件示例]
  "particle_effects": {
    "l_explosion": "minecraft:large_explosion"
  },
```
:::

这段代码位于资源包实体文件中。这里我们为将要使用的粒子"minecraft:large_explosion"定义了一个简称"l_explosion"。

可以通过指令`/particle <命名空间:粒子ID> ~ ~2 ~`在游戏中测试粒子效果。完整原版粒子列表可参考[Minecraft Wiki](https://minecraft.wiki/w/Particles)。

现在进行Blockbench操作：

1. 右键点击要发射粒子的骨骼，选择锚点图标添加定位器，命名如"l_expl_emitter"，并移动到目标位置

![](/assets/images/guide/custom_particles_1.png)

_注：命名为'lead'的定位器可定义栓绳连接点_

2. 在动画时间轴中选择"Animate Effects"，点击粒子对象旁的+号

![](/assets/images/guide/custom_particles_2.png)

3. 左侧面板中填写粒子简称和定位器名称

![](/assets/images/guide/custom_particles_3.png)

_注：音效添加方式类似_

![](/assets/images/guide/custom_particles_4.jpg)

完成保存后，实体攻击时将生成指定粒子效果。_同理可在行走动画中添加蹄印扬尘效果_

## 自定义粒子

自定义粒子定义于`RP/particles`目录。可通过指令或动画发射器调用。建议通过[原版示例资源包](https://www.minecraft.net/en-us/addons)和[bedrock.dev粒子文档](http://bedrock.dev/r/Particles)学习。

_提示：文末提供可视化粒子生成工具_

文件结构说明：
- "identifier"：粒子标识符（示例使用"wiki:curvy_particle"）
- "texture"：支持多粒子共用纹理图集
- "material"：通常设为"particles_alpha"

![](/assets/images/guide/custom_particles_5.png)

使用16x16纹理图集（路径：`RP/particles/wiki_particles.png`），包含4个8x8子纹理。上排（0,0起始）用于"wiki:curvy_particle"，下排（0,8起始）用于其他粒子。

::: code-group
```json [RP/particles/curvy_particle.json]
{
	"format_version": "1.10.0",
	"particle_effect": {
		"description": {
			"identifier": "wiki:curvy_particle",
			"basic_render_parameters": {
				"material": "particles_alpha",
				"texture": "textures/particle/wiki_particles"
			}
		},
		"components": {
			"minecraft:emitter_rate_instant": {
				"num_particles": 50
			},
			"minecraft:emitter_lifetime_once": {
				"active_time": 0
			},
			"minecraft:emitter_shape_sphere": {
				"radius": 0.3,
				"direction": "outwards"
			},
			"minecraft:particle_initial_speed": "Math.random(0.0, 15.0)",
			"minecraft:particle_initial_spin": {
				"rotation": "Math.random(0, 360)",
				"rotation_rate": "Math.random(-300, 300)"
			},
			"minecraft:particle_lifetime_expression": {
				"max_lifetime": "Math.random(1.0, 4.0)"
			},
			"minecraft:particle_motion_dynamic": {
				"linear_acceleration": [0, 2.0, 0],
				"linear_drag_coefficient": 5,
				"rotation_drag_coefficient": 0.3
			},
			"minecraft:particle_appearance_billboard": {
				"size": ["0.11", "0.11"],
				"facing_camera_mode": "lookat_xyz",
				"uv": {
					"texture_width": 16,
					"texture_height": 16,
					"flipbook": {
						"base_UV": [0, 0],
						"size_UV": [8, 8],
						"step_UV": [8, 0],
						"frames_per_second": 2,
						"max_frame": 2,
						"stretch_to_lifetime": true,
						"loop": false
					}
				}
			},
			"minecraft:particle_appearance_lighting": {}
		}
	}
}
```
:::

参数解析：
- "texture_width/height"：纹理图尺寸
- "base_UV"：粒子起始坐标（示例下个粒子为[0,8]）
- "size_UV"：粒子纹理尺寸
- "step_UV"：帧切换步长
- "frames_per_second"：帧速率

::: code-group
```json [RP/particles/pink_hit.json]
{
	"format_version": "1.10.0",
	"particle_effect": {
		"description": {
			"identifier": "wiki:pink_hit",
			"basic_render_parameters": {
				"material": "particles_alpha",
				"texture": "textures/particle/wiki_particles"
			}
		},
		"components": {
			"minecraft:emitter_rate_steady": {
				"spawn_rate": 520,
				"max_particles": 48
			},
			"minecraft:emitter_lifetime_once": {
				"active_time": 0.15
			},
			"minecraft:emitter_shape_point": {
				"offset": [0.0, "Math.random(-0.9, -0.5)", 0.0],
				"direction": [
					"Math.random(-0.75, 0.75)",
					"Math.random(-1.0, 1.0)",
					"Math.random(-0.75, 0.75)"
				]
			},
			"minecraft:particle_initial_speed": "Math.random(10.0, 20.0)",
			"minecraft:particle_lifetime_expression": {
				"max_lifetime": "6.0 / (Math.random(0.0, 16.0) + 12.0)"
			},
			"minecraft:particle_motion_dynamic": {
				"linear_acceleration": [0, -12.0, 0],
				"linear_drag_coefficient": 10
			},
			"minecraft:particle_appearance_billboard": {
				"size": [
					"0.10 + v.particle_random_1*0.05",
					"0.10 + v.particle_random_1*0.05"
				],
				"facing_camera_mode": "lookat_xyz",
				"uv": {
					"texture_width": 16,
					"texture_height": 16,
					"flipbook": {
						"base_UV": [0, 8],
						"size_UV": [8, 8],
						"step_UV": [8, 0],
						"frames_per_second": 8,
						"max_frame": 2,
						"stretch_to_lifetime": true,
						"loop": false
					}
				}
			},
			"minecraft:particle_appearance_tinting": {
				"color": {
					"gradient": [
						[
							"v.particle_random_1*0.3 + 0.6",
							"v.particle_random_2*0.3+ 0.6",
							"v.particle_random_2*0.3+ 0.6",
							1.0
						],
						["v.particle_random_1*0.3 + 0.6", 0.5, 0.3, 1.0]
					],
					"interpolant": "v.particle_age/v.particle_lifetime"
				}
			},
			"minecraft:particle_appearance_lighting": {}
		}
	}
}
```
:::

建议使用可视化工具[Snowstorm](https://jannisx11.github.io/snowstorm/)或[VSC扩展](https://marketplace.visualstudio.com/items?itemName=JannisX11.snowstorm)简化粒子创建。

![](/assets/images/guide/custom_particles_6.jpg)
`/particle wiki:pink_hit ~ ~2 ~`

![](/assets/images/guide/custom_particles_7.jpg)
`/particle wiki:curvy_particle ~ ~2 ~`

---

## 自定义音效

详细教程参见[Bedrock开发Wiki](/wiki/concepts/sounds)

### 文件规范
- 格式：推荐.ogg，支持.wav
- 路径：`RP/sounds/`子目录（示例使用`RP/sounds/mob/`）

### 音效定义
在`RP/sounds/sound_definitions.json`中注册：

::: code-group
```json [RP/sounds/sound_definitions.json]
{
	"format_version": "1.14.0",
	"sound_definitions": {
		"mob.yaklin.idle": {
			"category": "neutral",
			"max_distance": 12.0,
			"sounds": ["sounds/mob/yaklin_moo", "sounds/mob/yaklin_moo_2"]
		},
		"mob.yaklin.death": {
			"category": "neutral",
			"max_distance": 12.0,
			"sounds": ["sounds/mob/yaklin_moo"]
		},
		"mob.yaklin.hurt": {
			"category": "neutral",
			"max_distance": 12.0,
			"sounds": "sounds/mob/yaklin_moo"
		}
	}
}
```
:::

### 音效绑定
通过`RP/sounds.json`关联实体事件：

::: code-group
```json [实体音效配置示例]
  "wiki:skele_yaklin": {
    "volume": 1.0,
    "pitch": [1.0, 1.0],
    "events": {
      "ambient": "mob.yaklin.idle",
      "hurt": "mob.yaklin.hurt",
      "death": "mob.yaklin.death",
      "step": {
        "sound": "mob.cow.step",
        "volume": 0.15,
        "pitch": 1.0
      }
    }
  }
```
:::

事件类型说明：
- ambient：环境音（如生物呼吸声）
- hurt：受伤音效
- death：死亡音效
- step：移动音效

---

## 进度总结

**已完成：**
- 掌握动画粒子效果实现
- 创建两种自定义粒子
- 配置实体自定义音效

**后续方向：**
- 自定义生物群系
- 创建生成结构
- 脚本系统入门