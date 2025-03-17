# EffectType

class in mod.common.minecraftEnum

- 描述

    描述特效类型的枚举值



```python
class EffectType(object):
	EMPTY_EFFECT = "empty"                   # 无状态效果
	MOVEMENT_SPEED = "speed"                 # 速度，提升行走速度
	MOVEMENT_SLOWDOWN = "slowness"           # 缓慢，降低行走速度
	DIG_SPEED = "haste"                      # 急迫，加快挖掘速度及攻击速度
	DIG_SLOWDOWN = "mining_fatigue"          # 疲劳，减缓挖掘速度及攻击速度
	DAMAGE_BOOST = "strength"                # 力量，提升近战攻击伤害
	HEAL = "instant_health"                  # 瞬间治疗，瞬间回复实体生命值，伤害亡灵生物
	HARM = "instant_damage"                  # 瞬间伤害，瞬间伤害实体，治疗亡灵生物
	JUMP = "jump_boost"                      # 跳跃提升，提升跳跃高度，降低坠落伤害
	CONFUSION = "nausea"                     # 反胃，造成视野扭曲
	REGENERATION = "regeneration"            # 恢复，随时间持续恢复生命
	DAMAGE_RESISTANCE = "resistance"         # 伤害抗性提升，减少大部分的伤害
	FIRE_RESISTANCE = "fire_resistance"      # 防火，免疫火伤害
	WATER_BREATHING = "water_breathing"      # 水下呼吸，在水下时不消耗氧气
	INVISIBILITY = "invisibility"            # 隐身，获得隐形效果
	BLINDNESS = "blindness"                  # 失明，削弱视野，无法疾跑和产生暴击
	NIGHT_VISION = "night_vision"            # 夜视，增加视野亮度
	HUNGER = "hunger"                        # 饥饿，增加饥饿等级，加快饥饿值降低
	WEAKNESS = "weakness"                    # 虚弱，降低近战攻击伤害
	POISON = "poison"                        # 中毒，随时间给予伤害，不会致死
	WITHER = "wither"                        # 凋零，随时间给予伤害，会致死
	HEALTH_BOOST = "health_boost"            # 生命提升，提升生命值上限
	ABSORPTION = "absorption"                # 伤害吸收，增加用于吸收伤害的生命值
	SATURATION = "saturation"                # 饱食，恢复饥饿值和饱和度
	LEVITATION = "levitation"                # 漂浮，使实体不断提升高度
	FATAL_POISON = "fatal_poison"            # 致命中毒，随时间给予伤害，会致死
	CONDUIT_POWER = "conduit_power"          # 潮涌能量，在水下时拥有视野亮度增加、挖掘和攻击速度增加、可水下呼吸三种效果
	SLOW_FALLING = "slow_falling"            # 缓慢降落，降低掉落速度，减少掉落伤害
	BAD_OMEN = "bad_omen"                    # 不祥之兆， 进入村庄时触发袭击
	HERO_OF_THE_VILLAGE = "village_hero"     # 村庄英雄，与村民交易价格降低

``` 

