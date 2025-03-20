---
title: 原版材质
show_toc: false
tags:
    - 专家
mentions:
    - SirLich
    - Luthorius
    - MedicalJewel105
    - SmokeyStack
    - ThomasOrs
---

# 原版材质

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
材质系统不适合心理承受能力较弱者。请做好应对潜在崩溃、内容日志错误和漫长加载时间的准备。
:::

材质在使实体更具独特性方面极为有用。您既可以为附加包创建新材质，也可以使用现有的原版材质。

您可以通过[此链接](/wiki/visuals/materials)了解更多关于材质创建的内容。

## 原版材质列表

| Vanilla_Material                                                                        |
| --------------------------------------------------------------------------------------- |
| [alpha_block](#alpha-block)                                                             |
| [alpha_block_color](#alpha-block-color)                                                 |
| [banner](#banner)                                                                       |
| [banner_pole](#banner-pole)                                                             |
| [beacon_beam](#beacon-beam)                                                             |
| [beacon_beam_transparent](#beacon-beam-transparent)                                     |
| [charged_creeper](#charged-creeper)                                                     |
| [conduit_wind](#conduit-wind)                                                           |
| [entity](#entity)                                                                       |
| [entity_alphablend](#entity-alphablend)                                                 |
| [entity_alphablend_nocolorentity_static](#entity-alphablend-nocolorentity-static)       |
| [entity_alphatest](#entity-alphatest)                                                   |
| [entity_alphatest_change_color](#entity-alphatest-change-color)                         |
| [entity_alphatest_change_color_glint](#entity-alphatest-change-color-glint)             |
| [entity_alphatest_glint](#entity-alphatest-glint)                                       |
| [entity_alphatest_glint_item](#entity-alphatest-glint-item)                             |
| [entity_alphatest_multicolor_tint](#entity-alphatest-multicolor-tint)                   |
| [entity_beam](#entity-beam)                                                             |
| [entity_beam_additive](#entity-beam-additive)                                           |
| [entity_change_color](#entity-change-color)                                             |
| [entity_change_color_glint](#entity-change-color-glint)                                 |
| [entity_custom](#entity-custom)                                                         |
| [entity_dissolve_layer0](#entity-dissolve-layer0)                                       |
| [entity_dissolve_layer1](#entity-dissolve-layer1)                                       |
| [entity_emissive](#entity-emissive)                                                     |
| [entity_emissive_alpha](#entity-emissive-alpha)                                         |
| [entity_emissive_alpha_one_sided](#entity-emissive-alpha-one-sided)                     |
| [entity_flat_color_line](#entity-flat-color-line)                                       |
| [entity_glint](#entity-glint)                                                           |
| [entity_lead_base](#entity-lead-base)                                                   |
| [entity_loyalty_rope](#entity-loyalty-rope)                                             |
| [entity_multitexture](#entity-multitexture)                                             |
| [entity_multitexture_alpha_test](#entity-multitexture-alpha-test)                       |
| [entity_multitexture_alpha_test_color_mask](#entity-multitexture-alpha-test-color-mask) |
| [entity_multitexture_color_mask](#entity-multitexture-color-mask)                       |
| [entity_multitexture_masked](#entity-multitexture-masked)                               |
| [entity_multitexture_multiplicative_blend](#entity-multitexture-multiplicative-blend)   |
| [entity_nocull](#entity-nocull)                                                         |
| [guardian_ghost](#guardian-ghost)                                                       |
| [item_in_hand](#item-in-hand)                                                           |
| [item_in_hand_entity_alphatest](#item-in-hand-entity-alphatest)                         |
| [item_in_hand_entity_alphatest_color](#item-in-hand-entity-alphatest-color)             |
| [item_in_hand_glint](#item-in-hand-glint)                                               |
| [item_in_hand_multicolor_tint](#item-in-hand-multicolor-tint)                           |
| [map](#map)                                                                             |
| [map_decoration](#map-decoration)                                                       |
| [map_marker](#map-marker)                                                               |
| [moving_block](#moving-block)                                                           |
| [moving_block_alpha](#moving-block-alpha)                                               |
| [moving_block_alpha_seasons](#moving-block-alpha-seasons)                               |
| [moving_block_alpha_single_side](#moving-block-alpha-single-side)                       |
| [moving_block_blend](#moving-block-blend)                                               |
| [moving_block_double_side](#moving-block-double-side)                                   |
| [moving_block_seasons](#moving-block-seasons)                                           |
| [opaque_block](#opaque-block)                                                           |
| [opaque_block_color](#opaque-block-color)                                               |
| [opaque_block_color_uv2](#opaque-block-color-uv2)                                       |

## 材质属性

材质可具备多种影响外观的属性，包括：

### 背面剔除（Backface-Culling）
使模型的内表面不被渲染。

### Alpha通道
启用半透明效果，使用纹理的Alpha通道。

### 自发光（Emissive）
使纹理不受暗光影响，呈现发光效果。若使用Alpha通道，每个像素的发光强度与其透明度成正比。

### 固定透明度（Set Translucency）
无论其他属性如何，始终以预设透明度完全渲染。

### 纹理混合（Texture Blending）
当存在多个纹理时，可根据纹理通过某种滤镜改变实体外观。

## 材质细节说明

以下是各材质的具体说明及已知属性。材质名称仅作功能提示，部分材质可能表现不稳定或存在未记录的用法，以下信息仅包含已验证内容：

:::warning
以下内容目前**仅针对单纹理**进行过测试，请谨慎参考。强烈建议自行实验材质效果。
:::

### alpha_block
- 背面剔除
- 完全不透明

### alpha_block_color
- 背面剔除
- 透明度处理为半透明

### banner
在透明物体后方渲染时表现不稳定
- 无特殊属性

### banner_pole
在透明物体后方渲染时表现不稳定
- 背面剔除
- 透明效果

### beacon_beam
- 完全不透明

### beacon_beam_transparent
特性特殊：后方粒子会渲染在前方，呈现"正面剔除"效果
- Alpha通道

### charged_creeper
在透明物体后方渲染时表现不稳定
- 自发光
- 固定透明度

### conduit_wind
- 透明效果
- 透明度处理为半透明

### entity
- 完全不透明
- 背面剔除

### entity_alphablend
在透明物体后方渲染时表现不稳定
- 背面剔除
- Alpha通道

### entity_alphablend_nocolorentity_static
- 未知属性
- 可能导致崩溃

### entity_alphatest
- 透明效果
- 透明度处理为半透明

### entity_alphatest_change_color
- 透明效果
- 透明度处理为不透明

### entity_alphatest_change_color_glint
- 未知属性

### entity_alphatest_glint
- 未知属性

### entity_alphatest_glint_item
- 未知属性

### entity_alphatest_multicolor_tint
- 灰度处理
- 背面剔除
- 透明效果
- 透明度处理为不透明

### entity_beam
- 透明效果
- 透明度处理为半透明

### entity_beam_additive
粒子始终渲染在最上层
- 透明效果
- 自发光
- 背面剔除
- 固定透明度

### entity_change_color
- 完全不透明

### entity_change_color_glint
- 未知属性

### entity_custom
在透明物体后方渲染时表现不稳定
- 背面剔除
- Alpha通道

### entity_dissolve_layer0
在透明物体后方渲染时表现不稳定
- 未知属性

### entity_dissolve_layer1
- 未知属性

### entity_emissive
- 自发光
- 完全不透明
- 背面剔除

### entity_emissive_alpha
- 自发光
- Alpha通道
- 透明效果

### entity_emissive_alpha_one_sided
- 自发光
- Alpha通道
- 透明效果
- 背面剔除

### entity_flat_color_line
- 背面剔除
- 完全不透明

### entity_glint
- 未知属性

### entity_lead_base
在透明物体后方渲染时表现不稳定
- Alpha通道

### entity_loyalty_rope
- 未知属性

### entity_multitexture
- 未知属性

### entity_multitexture_alpha_test
- 未知属性

### entity_multitexture_alpha_test_color_mask
- 未知属性

### entity_multitexture_color_mask
- 未知属性

### entity_multitexture_masked
- 未知属性

### entity_multitexture_multiplicative_blend
- 未知属性

### entity_nocull
- 完全不透明

### guardian_ghost
在透明物体后方渲染时表现不稳定
- 背面剔除
- Alpha通道

### item_in_hand
- 完全不透明
- 背面剔除

### item_in_hand_entity_alphatest
- 透明效果
- 根据透明度等级决定是否透明

### item_in_hand_entity_alphatest_color
- 透明效果
- 根据透明度等级决定是否透明

### item_in_hand_glint
- 未知属性

### item_in_hand_multicolor_tint
- 灰度处理
- 完全不透明
- 背面剔除

### map
- 透明效果
- 根据透明度等级决定是否透明

### map_decoration
- 背面剔除
- 透明效果
- 根据透明度等级决定是否透明

### map_marker
- 背面剔除
- 透明效果
- 根据透明度等级决定是否透明
- 可能导致崩溃

### moving_block
- 完全不透明
- 背面剔除

### moving_block_alpha
- 背面剔除
- 透明效果
- 根据透明度等级决定是否透明

### moving_block_alpha_seasons
- 根据透明度等级决定是否透明
- 透明效果

### moving_block_alpha_single_side
- 背面剔除
- 透明效果
- 根据透明度等级决定是否透明

### moving_block_blend
在透明物体后方渲染时表现不稳定
- 背面剔除
- Alpha通道

### moving_block_double_side
- 完全不透明

### moving_block_seasons
- 完全不透明
- 背面剔除

### opaque_block
- 完全不透明
- 背面剔除

### opaque_block_color
- 完全不透明
- 背面剔除

### opaque_block_color_uv2
- 完全不透明
- 背面剔除

:::warning
请注意，以上测试结果均基于RenderDragon渲染平台。非RenderDragon的视觉效果可能存在差异。
:::