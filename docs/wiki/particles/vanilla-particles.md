---
title: 原版粒子效果
category: 文档
---

# 原版粒子效果

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

以下是基岩版原版资源中所有粒子效果的完整列表。请注意并非所有粒子都能正常运作，许多粒子需要宿主实体提供的Molang上下文才能正确运行。

:::tip 通过/particle命令使用：
由于某些原因，基岩版需要在`/particle`命令中使用带有`minecraft:`命名空间的完整粒子名称，并且需要指定坐标参数。

该命令不支持粒子的自动补全功能。
:::

### 正常工作的粒子效果

这些粒子可以直接在游戏中生成，不会出现异常问题。

| 正常工作的粒子效果                          |
| ------------------------------------------- |
| minecraft:basic_flame_particle              |
| minecraft:basic_portal_particle             |
| minecraft:basic_smoke_particle              |
| minecraft:bleach                            |
| minecraft:blue_flame_particle               |
| minecraft:camera_shoot_explosion            |
| minecraft:campfire_smoke_particle           |
| minecraft:campfire_tall_smoke_particle      |
| minecraft:candle_flame_particle             |
| minecraft:critical_hit_emitter              |
| minecraft:crop_growth_emitter               |
| minecraft:dragon_breath_trail               |
| minecraft:dragon_death_explosion_emitter    |
| minecraft:dragon_destroy_block              |
| minecraft:dragon_dying_explosion            |
| minecraft:endrod                            |
| minecraft:end_chest                         |
| minecraft:evocation_fang_particle           |
| minecraft:evoker_spell                      |
| minecraft:cauldron_explosion_emitter        |
| minecraft:egg_destroy_emitter               |
| minecraft:falling_border_dust_particle      |
| minecraft:falling_dust_dragon_egg_particle  |
| minecraft:falling_dust_gravel_particle      |
| minecraft:falling_dust_red_sand_particle    |
| minecraft:falling_dust_sand_particle        |
| minecraft:falling_dust_scaffolding_particle |
| minecraft:falling_dust_top_snow_particle    |
| minecraft:heart_particle                    |
| minecraft:honey_drip_particle               |
| minecraft:huge_explosion_lab_misc_emitter   |
| minecraft:huge_explosion_emitter            |
| minecraft:ice_evaporation_emitter           |
| minecraft:knockback_roar_particle           |
| minecraft:lab_table_misc_mystical_particle  |
| minecraft:large_explosion                   |
| minecraft:lava_drip_particle                |
| minecraft:lava_particle                     |
| minecraft:llama_spit_smoke                  |
| minecraft:magnesium_salts_emitter           |
| minecraft:mob_portal                        |
| minecraft:mycelium_dust_particle            |
| minecraft:obsidian_glow_dust_particle       |
| minecraft:obsidian_tear_particle            |
| minecraft:redstone_ore_dust_particle        |
| minecraft:redstone_repeater_dust_particle   |
| minecraft:redstone_torch_dust_particle      |
| minecraft:redstone_wire_dust_particle       |
| minecraft:rising_border_dust_particle       |
| minecraft:sculk_sensor_redstone_particle    |
| minecraft:snowflake_particle                |
| minecraft:spore_blossom_ambient_particle    |
| minecraft:spore_blossom_shower_particle     |
| minecraft:stalactite_lava_drip_particle     |
| minecraft:stalactite_water_drip_particle    |
| minecraft:totem_particle                    |
| minecraft:villager_angry                    |
| minecraft:villager_happy                    |
| minecraft:water_drip_particle               |
| minecraft:water_evaporation_bucket_emitter  |
| minecraft:water_splash_particle_manual      |

### 存在问题的粒子效果

以下粒子可以生成，但可能因依赖`/particle`命令无法设置的变量而导致内容日志报错：

| 存在问题的粒子效果                          |
| ------------------------------------------- |
| minecraft:arrow_spell_emitter                   |
| minecraft:balloon_gas_particle                  |
| minecraft:basic_crit_particle                   |
| minecraft:conduit_absorb_particle               |
| minecraft:conduit_attack_emitter                |
| minecraft:dragon_breath_fire                    |
| minecraft:dragon_breath_lingering               |
| minecraft:electric_spark_particle               |
| minecraft:enchanting_table_particle             |
| minecraft:elephant_tooth_paste_vapor_particle   |
| minecraft:death_explosion_emitter               |
| minecraft:eyeofender_death_explode_particle     |
| minecraft:explosion_particle                    |
| minecraft:falling_dust_concrete_powder_particle |
| minecraft:lab_table_heatblock_dust_particle     |
| minecraft:misc_fire_vapor_particle              |
| minecraft:mobspell_emitter                      |
| minecraft:mob_block_spawn_emitter               |
| minecraft:note_particle                         |
| minecraft:portal_directional                    |
| minecraft:portal_reverse_particle               |
| minecraft:rain_splash_particle                  |
| minecraft:shulker_bullet                        |
| minecraft:silverfish_grief_emitter              |
| minecraft:soul_particle                         |
| minecraft:sparkler_emitter                      |
| minecraft:splash_spell_emitter                  |
| minecraft:water_evaporation_actor_emitter       |
| minecraft:water_splash_particle                 |
| minecraft:water_wake_particle                   |
| minecraft:wax_particle                          |
| minecraft:wither_boss_invulnerable              |

### 气泡类粒子效果

以下气泡类粒子仅在水下可见，部分会导致内容日志报错：

| 气泡类粒子效果                        |
| ------------------------------------- |
| minecraft:basic_bubble_particle        |
| minecraft:basic_bubble_particle_manual |
| minecraft:bubble_column_bubble         |
| minecraft:bubble_column_down_particle  |
| minecraft:bubble_column_up_particle    |
| minecraft:cauldron_bubble_particle     |
| minecraft:cauldron_splash_particle     |
| minecraft:dolphin_move_particle        |
| minecraft:eye_of_ender_bubble_particle |
| minecraft:fish_hook_particle           |
| minecraft:fish_pos_particle            |
| minecraft:glow_particle                |
| minecraft:guardian_attack_particle     |
| minecraft:guardian_water_move_particle |
| minecraft:sponge_absorb_water_particle |
| minecraft:squid_flee_particle          |
| minecraft:squid_ink_bubble             |
| minecraft:squid_move_particle          |
| minecraft:underwater_torch_particle    |

### 永久性粒子效果

以下粒子效果一旦生成将永久存在，除非退出游戏：

| 永久性粒子效果                |
| ----------------------------- |
| minecraft:mobflame_emitter       |
| minecraft:nectar_drip_particle   |
| minecraft:phantom_trail_particle |
| minecraft:stunned_emitter        |

## 无法正常使用的粒子效果

以下粒子虽然存在于游戏中，但由于需要无法通过`/particle`提供的上下文或存在程序错误而无法生成：

| 无法正常使用的粒子效果          |
| ----------------------------- |
| minecraft:block_destruct         |
| minecraft:block_slide            |
| minecraft:breaking_item_icon     |
| minecraft:breaking_item_terrain  |
| minecraft:cauldron_spell_emitter |
| minecraft:ink_emitter            |
| minecraft:portal_east_west       |
| minecraft:portal_north_south     |
| minecraft:vibration_signal       |
| minecraft:colored_flame_particle |

---

[原始作者致谢](https://www.reddit.com/r/MinecraftCommands/comments/cbd56p/i_need_a_list_of_bedrock_particles/etg8rt7/)

## 组件专用粒子效果

以下是可在某些组件中使用的原版粒子效果预设简称列表。
**已确认这些简称通常有效，可能未包含全部可用选项**

| 简称                   | 备注                                 |
| ---------------------- | ------------------------------------ |
| mobspellambient       | 颜色由组件中存在的药水ID决定         |
| villagerangry         |                                      |
| bubble                | 仅在水下显示                         |
| evaporation           |                                      |
| crit                  |                                      |
| dragonbreath          | 仅对投射物的AoE组件有效              |
| driplava              |                                      |
| dripwater             |                                      |
| reddust               |                                      |
| enchantingtable       |                                      |
| endrod                |                                      |
| mobspell              | 颜色由组件中存在的药水ID决定         |
| largeexplode          |                                      |
| hugeexplosion         |                                      |
| fallingdust           | 颜色由组件中存在的药水ID决定         |
| waterwake             |                                      |
| flame                 |                                      |
| villagerhappy         |                                      |
| heart                 |                                      |
| mobspellinstantaneous | 颜色由组件中存在的药水ID决定         |
| iconcrack             |                                      |
| slime                 |                                      |
| snowballpoof          |                                      |
| largesmoke            |                                      |
| lava                  |                                      |
| mobflame              |                                      |
| townaura              |                                      |
| note                  |                                      |
| explode               |                                      |
| portal                |                                      |
| rainsplash            |                                      |
| smoke                 |                                      |
| watersplash           |                                      |
| ink                   |                                      |
| terrain               | 从atlas.terrain提取纹理              |
| totem                 |                                      |
| witchspell            |                                      |
| soul                  |                                      |
| spit                  |                                      |
| sneeze                |                                      |