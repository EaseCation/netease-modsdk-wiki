# AttrType

class in mod.common.minecraftEnum

- 描述

    描述属性枚举值，用于设置与获取实体的引擎属性的当前值与最大值

- 备注
    - ABSORPTION: 伤害吸收效果的量化值，详见wiki文档：[伤害吸收](https://minecraft-zh.gamepedia.com/index.php?title=%E4%BC%A4%E5%AE%B3%E5%90%B8%E6%94%B6&variant=zh)



```python
class AttrType(object):
	HEALTH = 0              # 生命值, 原版的值范围为[0,20]
	SPEED = 1               # 移速, 原版的值范围为[0,+∞]
	DAMAGE = 2              # 攻击力, 原版的值范围为[1,1]
	UNDERWATER_SPEED = 3    # 水里的移速, 原版的值范围为[0,+∞]
	HUNGER = 4              # 饥饿值, 原版的值范围为[0,20]
	SATURATION = 5          # 饱和值, 原版的值范围为[0,20]
	ABSORPTION = 6          # 伤害吸收生命值，详见备注, 原版的值范围为[0,16]
	LAVA_SPEED = 7          # 岩浆里的移速, 原版的值范围为[0,+∞]
	LUCK = 8                # 幸运值，原版的值范围为[-1024,1024]

``` 

