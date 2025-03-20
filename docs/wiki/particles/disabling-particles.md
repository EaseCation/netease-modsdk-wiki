---
title: 禁用粒子效果
category: 巧思案例
tags:
    - 新手
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
---

# 禁用粒子效果

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

当你需要禁用某个粒子效果时，建议直接在粒子文件中进行禁用，而不是简单地在 `particles.png` 中将粒子纹理设为透明。此外，与透明化处理相比，完全禁用粒子可能会带来小幅性能提升，因为透明粒子仍会被发射（只是不可见）。

禁用粒子发射的基本原理如下：

::: code-group
```json [RP/particles/some_vanilla_particle.json]
{
	"format_version": "1.10.0",
	"particle_effect": {
		"description": {
			"identifier": "minecraft:some_vanilla_particle",
			"basic_render_parameters": {
				"material": "particles_alpha",
				"texture": "textures/particle/particles"
			}
		},
		"components": {
			"minecraft:emitter_lifetime_expression": {
				"activation_expression": 0,  // 立即激活
				"expiration_expression": 1    // 立即结束生命周期（单位：秒）
			},
			"minecraft:emitter_rate_manual": {
				"max_particles": 0  // 设置最大粒子生成数为0
			}
		}
	}
}
```
:::

**实现原理说明：**
1. 通过 `emitter_lifetime_expression` 组件将粒子发射器的生命周期设为瞬时（0秒激活，1秒后过期）
2. 使用 `emitter_rate_manual` 组件将最大粒子数设为0，彻底阻止粒子生成
3. 保留原始渲染参数确保兼容性，但实际不会产生任何可见粒子