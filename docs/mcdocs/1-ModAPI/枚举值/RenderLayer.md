# RenderLayer

class in mod.common.minecraftEnum

- 描述

    方块渲染时的材质类型

- 备注
    - 目前自定义方块只支持使用部分材质，具体见[自定义方块json组件][/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/2-自定义方块/1-JSON组件.md]
        由于联机大厅和apollo存在部分材质缺少定义，所以枚举值在联机大厅和apollo环境下，整体-2
        如：Blend = 4 变成 Blend = 2 ; Opaque = 5 变成 Opaque = 3，依此类推



```python
class RenderLayer(object):
	Blend = 4		# 半透明
	Opaque = 5		# 不透明
	Alpha = 7		# 全透明
	SeasonOpaque = 9	# 原版用于渲染不透明树叶
	SeasonAlpha = 10	# 原版用于渲染局部全透明方块

``` 

