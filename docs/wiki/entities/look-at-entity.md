---
title: 看向实体
category: 巧思案例
tags:
    - 中级
mentions:
    - shanewolf38
    - MedicalJewel105
    - TheItsNameless
    - SmokeyStack
---

# 看向实体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

以下教程提供了一种资源包方法，用于检测玩家何时看向实体。下方代码必须放置在会被玩家注视的实体文件中，并通过变量`v.look_at_entity`返回true值来指示实体当前是否被注视。

## 变量

::: code-group
```json [RP/entity/mob.entity.json]
"pre_animation": [
  "v.look_at_entity = Math.abs(Math.abs(q.rotation_to_camera(1) - q.camera_rotation(1)) - 180) < (20 / q.distance_from_camera) && Math.abs(q.rotation_to_camera(0) + q.camera_rotation(0)) < (10 / q.distance_from_camera);"
],
```

:::tip 补充说明
由于查询参数`q.rotation_to_camera`基于实体的原点（脚部位置），垂直检测范围将围绕实体底部进行计算。下方代码通过创建经过位置偏移修正的垂直角度变量，使垂直检测范围能够基于实体中心进行计算。
:::

::: code-group
```json [RP/entity/mob.entity.json]
"pre_animation": [
  "v.rotation_to_camera_0 = -Math.atan2(-q.distance_from_camera * Math.sin(q.rotation_to_camera(0)) - 1, q.distance_from_camera * Math.cos(q.rotation_to_camera(0)));",
  "v.look_at_entity = Math.abs(Math.abs(q.rotation_to_camera(1) - q.camera_rotation(1)) - 180) < (20 / q.distance_from_camera) && Math.abs(v.rotation_to_camera_0 + q.camera_rotation(0)) < (60 / q.distance_from_camera);"
],
```

## 参数调整
当前代码主要适配标准Minecraft生物规格（1×2方块）。如需适配不同尺寸的实体，需要调整以下参数：
- 数值 `-1` 控制生物中心位置偏移量（负值向上，正值向下）
- 数值 `20` 控制水平角度敏感度
- 数值 `60` 控制垂直角度敏感度

## 实现原理
该变量的工作原理是检测两种旋转角度是否相反：
1. 实体需要转向玩家的旋转角度
2. 玩家需要转向实体的旋转角度

通过对比水平和垂直方向的角度差值（数值大小通过相机与实体的距离进行动态缩放），即可精确判定注视状态。