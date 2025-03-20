---
title: 动画中的效果
mentions:
    - MedicalJewel105
category: 基础
---

# 动画（Animation）中的效果

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 动画中的效果

在动画中使用 `粒子` 或 `音效` 有时比在动画控制器中更方便。动画可以包含以下效果：

- 粒子效果
- 音效效果

### 粒子效果

Minecraft粒子效果可用于实体动画。例如，幻影（phantom）拥有持续释放minecraft:phantom_trail粒子的动画。让我们尝试在实体的攻击动画中添加粒子效果。

::: code-group
```json [RP/entity/my_entity.json]
"particle_effects": {
	"flames": "minecraft:mobflame_emitter"
}
```
:::

这里我们为将要使用的粒子定义了简称。

你可以在[官方Wiki](https://minecraft.wiki/w/Particles)或[此处](/wiki/particles/vanilla-particles)找到完整的粒子列表。

:::warning 注意！
并非所有粒子都能正常使用。如果遇到问题，请尝试更换其他粒子。例如使用这个参考粒子。
同时注意部分粒子会持续发射。
:::

### 音效效果

若需使用音效，也需要提前定义：

::: code-group
```json [RP/entity/my_entity.json]
"sound_effects": {
	"meow": "mob.cat.meow"
}
```
:::

:::warning 注意！
并非所有音效都能正常使用。如果遇到问题，请尝试更换其他音效。例如使用这个参考音效。
:::

## 为动画添加效果

你可以通过代码或Blockbench为动画添加效果。

### 代码方式

在动画文件中添加以下内容：

::: code-group
```json [RP/animations/my_animation.json#my.animation]
"particle_effects": {
    "0.0": {
        "effect": "flames",
        "locator": "" //你需要在模型中添加定位器
    }
}
```
:::

::: code-group
```json [RP/animations/my_animation.json#my.animation]
"sound_effects": {
    "0.0": {
        "effect": "meow"
	}
}
```
:::

支持同时调用多个粒子效果：

```json
"particle_effects": {
    "0.0": [
        {
            "effect": "particle_1",
            "locator": "locator_1"
    	},
	{
            "effect": "particle_2",
            "locator": "locator_2"
    	}
    ]
}
```

<Spoiler title="完整示例">

::: code-group
```json [RP/animations/my_animation.json]
{
	"format_version" : "1.8.0",
	"animations" : {
		"animation.sheep.grazing" : {
			"animation_length" : 2.0,
			"loop" : true,
			"particle_effects": {
                "0.0": {
                    "effect": "flames",
                    "locator": "body"
                }
            },
			"sound_effects": {
    			"0.0": {
    			    "effect": "meow"
				}
			},
			"bones" : {
				"head" : {
					"position" : {
						"0" : [ 0.0, 0.0, 0.0 ],
						"0.2" : [ 0.0, -9.0, 0.0 ],
						"1.8" : [ 0.0, -9.0, 0.0 ],
						"2" : [ 0.0, 0.0, 0.0 ]
					},
					"rotation" : {
						"0.2" : {
							"post" : [ "180.0 * (0.2 + 0.07 * math.sin(q.key_frame_lerp_time * 1644.39))", 0.0, 0.0 ],
							"pre" : [ 36.0, 0.0, 0.0 ]
						},
						"1.8" : {
							"post" : [ 36.0, 0.0, 0.0 ],
							"pre" : [ "180.0 * (0.2 + 0.07 * math.sin(q.key_frame_lerp_time * 1644.39))", 0.0, 0.0 ]
						}
					}
				}
			}
		}
	}
}
```
:::

</Spoiler>

### Blockbench方式

首先为粒子添加定位器。进入"Edit"模式，选择骨骼组，右键选择"Add Locator"：

![](/assets/images/visuals/animation-effects/add-locator.png)

重命名并移动到目标位置。

然后进入"Animate"模式，选择动画并点击魔杖图标：

![](/assets/images/visuals/animation-effects/add-effect.png)

点击"+"号打开菜单并配置参数：

![](/assets/images/visuals/animation-effects/specify-data.png)

音效也可以用相同方式添加。

保存动画后即可在游戏中查看效果：

![](/assets/images/visuals/animation-effects/showcase.png)

## 屏幕外更新

在实体资源包脚本中设置`"should_update_bones_and_effects_offscreen": true`可使粒子和音效在实体离开屏幕时继续更新，默认情况下两者在实体不可见时会停止播放。

::: code-group
```json [RP/entity/my_entity.json#description]
"scripts": {
	"should_update_bones_and_effects_offscreen": true
}
```
:::