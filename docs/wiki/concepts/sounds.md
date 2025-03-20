---
title: 声音系统
tags:
    - 中级
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - aexer0e
    - MedicalJewel105
    - Justash01
    - DasEtwas
    - TheItsNameless
    - ThomasOrs
---

# 声音系统

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在基岩版中，我们可以通过资源包添加自定义声音而无需覆盖原版音效。以下是实现方法：

:::tip
学习声音系统的最佳方式是下载并研究默认资源包的结构。
:::

### 文件夹结构

添加声音时主要需要修改两个文件。注意`sound_definition`文件需要放置在`sounds`文件夹内。

声音文件本身存放在`sounds`文件夹中，支持以下格式：

<FolderView :paths="[
	'RP/sounds.json',
	'RP/sounds/sound_definitions.json',
	'RP/sounds/example.wav',
	'RP/sounds/example.ogg',
	'RP/sounds/example.fsb',
]"></FolderView>

## sound_definitions.json

此文件用于定义声音的短名称（short-name），相当于为物理声音文件创建ID标识。以下示例添加了名为`example.toot`的小号音效：

::: code-group
```json [RP/sounds/sound_definitions.json]
{
	"format_version": "1.14.0",
	"sound_definitions": {
		"example.toot": {
			"category": "neutral",
			"sounds": ["sounds/trumpet"]
		}
	}
}
```
:::

通过此方式添加的声音可通过`/playsound`命令触发。注意命令输入需严格匹配名称。

:::warning
新增声音文件需要完全重启客户端才能生效。若音效未正常加载，请重启整个游戏而非仅重载世界。
:::

### /playsound 音量说明

游戏会将音量参数限制在1.0以内，再与声音定义中的音量相乘。

声音的最大可听距离计算公式为：`min(max_distance, max(volume * 16, 16))`
若未在定义中设置`max_distance`，则等效于`playsound_volume * 16`

以下是声音随距离衰减的近似曲线（实际衰减可能非线性）：

![](/assets/images/concepts/sounds/sound_graph.png)

上图展示了**当playsound音量参数≥1时**的衰减曲线。注意`<volume>`参数会影响声音的可听范围。

公式表达为：`final_volume = min(playsound_volume, 1) * graph_volume * sound_definition_volume`

**注意：** 距离衰减曲线不受命令中音量参数影响。

例如：`mob.ghast.affectionate_scream`设置了`"min_distance": 100.0`，但使用`/playsound`音量1时最大可听距离仍为16格。若需增大范围，可通过设置更高的音量参数。

要实现远距离可听且线性衰减的效果，可在定义中设置`"volume": 0.01`，并在命令中使用大音量值（如4对应64格范围）。

### 顶级参数

#### 类别（Categories）

控制声音播放方式的核心参数：

| 类别     | 说明                     |
|----------|--------------------------|
| weather  | 天气音效                |
| block    | 方块交互音效            |
| bucket   | 桶类音效                |
| bottle   | 玻璃瓶音效              |
| ui       | 界面音效（无视距离限制）|
| player   | 玩家相关音效            |
| hostile  | 敌对生物音效            |
| music    | 背景音乐                |
| record   | 唱片机音效              |
| neutral  | 中立生物音效            |

#### min_distance

声音开始衰减的最小距离（浮点数），默认0.0

#### max_distance

声音衰减至最弱的最大距离（浮点数）

### 声音定义进阶

可通过数组定义多个随机音效：

::: code-group
```json [RP/sounds/sound_definitions.json]
{
	"format_version": "1.14.0",
	"sound_definitions": {
		"example.toot": {
			"category": "neutral",
			"sounds": [
				"sounds/trumpet",
				"sounds/trumpet2",
				"sounds/trumpet3"
			]
		}
	}
}
```
:::

#### 对象式定义参数

| 参数              | 说明                                                                 |
|-------------------|----------------------------------------------------------------------|
| name              | 文件路径（例："sounds/music/game/creative/creative1"）               |
| stream            | 启用流式加载（降低内存占用）                                        |
| volume            | 音量（0.0-1.0，可超过1.0）                                         |
| load_on_low_memory| 已弃用（1.16.0+）                                                  |
| pitch             | 音高倍数（例：2.3=2.3倍速播放）                                    |
| is3D              | 是否启用3D音效（音乐/UI类自动禁用）                                |
| interruptible     | 是否可被中断（默认true）                                           |
| weight            | 随机权重（例：权重10的选中概率是权重2的5倍）                       |

### 完整示例

::: code-group
```json [RP/sounds/sound_definitions.json#sound_definitions]
"block.beehive.drip": {
    "category": "block",
    "max_distance": 8,
    "sounds": [
        {
            "name": "sounds/block/beehive/drip1",
            "load_on_low_memory": true
        },
        "sounds/block/beehive/drip2",
        "sounds/block/beehive/drip3",
        "sounds/block/beehive/drip4"
    ]
}
```
:::

## sounds.json

此文件用于绑定自动播放的音效：

| 分类                   | 说明                 |
|------------------------|----------------------|
| individual_event_sounds| 独立事件音效（如信标激活）|
| block_sounds          | 方块交互音效         |
| entity_sounds         | 实体音效（含自定义实体）|
| interactive_sounds    | 交互音效（开发中）   |

### 实体音效事件

常见生命周期事件：

| 事件          | 触发时机               |
|---------------|------------------------|
| ambient       | 随机播放（如生物低鸣）|
| hurt          | 受伤时                |
| death         | 死亡时                |
| step          | 移动时                |
| fall.big      | 高空坠落              |
| fall.small    | 低处跌落              |
| splash        | 溅水                  |
| attack        | 近战攻击              |
| shoot         | 远程射击              |

### 实体音效示例

::: code-group
```json [RP/sounds.json]
{
	"entity_sounds": {
		"entities": {
			"wiki:elephant": {
				"volume": 1,
				"pitch": [0.9, 1.0],
				"events": {
					"step": {
						"sound": "elephant.step",
						"volume": 0.18,
						"pitch": 1.1
					},
					"ambient": {
						"sound": "elephant.trumpet",
						"volume": 0.11,
						"pitch": 0.9
					}
				}
			}
		}
	}
}
```
:::

## 动画音效绑定

通过RP实体文件中的`sound_effects`实现动画同步：

::: code-group
```json [RP/entities/dragon.json#minecraft:client_entity/description]
"sound_effects": {
    "wing_flap": "wiki.dragon.wing_flap" // wiki.dragon.wing_flap需在sound_definitions中定义
}
```
:::

::: code-group
```json [RP/animations/dragon.json#animations/animation.dragon.flying]
"sound_effects": {
    "3.16": {
        "effect": "wing_flap"
    }
}
```
:::

## 动画控制器音效

动画控制器中的音效触发方式类似：

::: code-group
```json [RP/entities/custom_tnt.json#minecraft:client_entity/description]
"sound_effects": {
    "explosion": "wiki.custom_tnt.explosion" // 需在sound_definitions中定义
}
```
:::

::: code-group
```json [RP/animation_controllers/custom_tnt.animation_controllers.json#controller.animation.custom_tnt]
"states":{
    "default":{
        "transitions":[
            {
                "explode_state":"q.mark_variant == 1"
            }
        ]
    },
    "explode_state":{
        "sound_effects":[
            {
                "effect":"explosion"
            }
        ],
        "transitions":[
            {
                "default":"q.mark_variant == 0"
            }
        ]
    }
}
```
:::