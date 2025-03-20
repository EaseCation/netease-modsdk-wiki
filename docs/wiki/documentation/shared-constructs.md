---
title: 共享结构体
nav_order: 1
tags:
    - Stable
    - Last updated for Version 1.18.10
mentions:
    - Ciosciaa
    - ThomasOrs
---

# 共享结构体

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在附加包系统中，部分JSON结构体可以在多个模块中通用。

## 范围对象
范围对象用于定义两个数值之间的区间。

::: code-group
```json [范围对象示例]
{
	"min": 2,
	"max": 4
}
```

当使用该对象时，系统会在最小值（含）和最大值（含）之间随机选取一个数值。每次调用范围对象都会重新进行随机取值。最大值不可小于最小值，但允许两者相等以实现固定取值。

## 分数对象
分数对象通过分子和分母定义分数关系。

::: code-group
```json [分数对象示例]
{
	"numerator": 3,
	"denominator": 5
}
```

该对象在计算时将使用分子除以分母的商值（即 `分子` ÷ `分母`）。分子和分母的数值必须大于等于 `1`，且分母不能等于分子（即不能形成值为1的分数）。