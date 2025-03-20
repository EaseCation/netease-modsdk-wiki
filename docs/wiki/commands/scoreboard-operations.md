---
title: 记分板操作
category: 基础
mentions:
    - Sprunkles137
    - Luthorius
    - MedicalJewel105
    - Hatchibombotar
---

# 记分板操作

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

记分板可用于执行复杂运算，其功能类似于[Molang](/wiki/concepts/molang)。运算分为两类：数学运算和逻辑运算。

## 概述
使用`/scoreboard players operation`命令执行运算。完整语法如下：
```
/scoreboard players operation <目标分数> <记分项> <运算符> <源分数> <记分项>
```
该命令包含两个分数持有者：目标分数和源分数。目标分数是被操作的值，源分数是参与运算的值。运算结果将写入目标分数，源分数的值不会被修改（除[交换运算符](/wiki/commands/scoreboard-operations#swap-operator)外）。

## 数学运算符
数学运算符通过算术运算影响目标分数。共有五种数学运算：加法、减法、乘法、向下取整除法和向下取整模除。

以下示例均假设分数持有者`A var`的值为25，`B var`的值为10。

### 加法
运算符：**+=**

将目标分数与源分数相加，结果存入目标分数。
```
/scoreboard players operation A var += B var
```
即`A = A + B`，运算结果为`25 + 10 = 35`。

### 减法
运算符：**-=**

从目标分数中减去源分数，结果存入目标分数。
```
/scoreboard players operation A var -= B var
```
即`A = A - B`，运算结果为`25 - 10 = 15`。

### 乘法
运算符：***=**

将目标分数乘以源分数，结果存入目标分数。
```
/scoreboard players operation A var *= B var
```
即`A = A * B`，运算结果为`25 * 10 = 250`。

### 向下取整除法
运算符：**/=**

将目标分数除以源分数，结果向下取整后存入目标分数（由于分数值只能是整数）。
```
/scoreboard players operation A var /= B var
```
即`A = floor(A / B)`，运算结果为`floor(25 / 10) = 2`。

### 向下取整模除
运算符：**%=**

将目标分数除以源分数后取余数，结果向下取整后存入目标分数。
```
/scoreboard players operation A var %= B var
```
即`A = floor(mod(A, B))`，运算结果为`floor(mod(25, 10)) = 5`。

## 逻辑运算符
逻辑运算符使用逻辑门和赋值操作来影响目标分数。共有四种逻辑运算：赋值、最小值、最大值和交换。

同样假设分数持有者`A var`的值为25，`B var`的值为10。

### 赋值运算符
运算符：**=**

将目标分数设置为源分数的值。
```
/scoreboard players operation A var = B var
```
即`A = B`，运算结果为`10`。

### 最小值运算符
运算符：**<**

比较两个分数后，将较小值存入目标分数。
```
/scoreboard players operation A var < B var
```
即`A = min(A, B)`，运算结果为`min(25, 10) = 10`。

### 最大值运算符
运算符：**>**

比较两个分数后，将较大值存入目标分数。
```
/scoreboard players operation A var > B var
```
即`A = max(A, B)`，运算结果为`max(25, 10) = 25`。

### 交换运算符
运算符：**><**

交换目标分数和源分数的值。这是唯一会影响源分数的运算符。
```
/scoreboard players operation A var >< B var
```
执行上述命令后，A和B的值将互换：

执行前：A = 10；B = 25；

执行后：A = 25；B = 10；

该操作等效于三步操作：`temp = A; A = B; B = temp;`，最终`A var = 10`且`B var = 25`。

## 实用案例

#### 检查数值是否相等

若要通过记分板检查两个值是否相等，可将第一个值复制到临时变量，再减去第二个值后比较临时变量是否为0。假设有值A和B：

::: code-group
```json [实体标签]
scoreboard objectives add temp dummy
scoreboard players operation @e temp = @s A
scoreboard players operation @e temp -= @s B
execute @e[scores={temp=0}] ~~~ say A等于B
scoreboard objectives remove temp
```

#### 记分板初始化

若要将记分板值初始化为0（仅当该值不存在时），可使用`scoreboard players add <选择器> <名称> 0`。此命令会在实体不存在该分数时设为0，若已存在则不做任何操作。