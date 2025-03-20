---
title: tellraw命令
category: 命令
mentions:
    - SirLich
    - Dreamedc2015
    - MedicalJewel105
    - Luthorius
    - Fabrimat
    - Sprunkles137
    - ThomasOrs
    - zheaEvyline
    - SmokeyStack
---

# tellraw命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

`tellraw` 用于向指定或所有玩家发送JSON格式消息，适用于在游戏中向玩家发送纯文本信息

**titleraw命令遵循相同的设计理念**

![](/assets/images/documentation/tellrawshow.png)

## 格式规范

`tellraw`命令的基础语法结构如下：

```
tellraw <目标: 目标> <原始JSON消息: json>
```

-   ` <目标: 目标>`: 目标可以表示为玩家名称或玩家组，例如`@a` `@r` `@s` `@p`
-   `<原始JSON消息: json>`: 用于定义消息结构的JSON格式，例如：
    `{"rawtext":[{"text":""}]}`

## 基础示例

发送引号内的文字内容

::: code-group
```json [命令]
/tellraw @a {"rawtext":[{"text":"Hello"}]}
```
:::

## 转义字符处理

在消息中使用引号时，需在引号左侧添加反斜杠进行转义

::: code-group
```json [命令]
/tellraw @a {"rawtext":[{"text":"Quote me: \"I am here\"."}]}
```
:::

## 换行处理

使用`\n`实现文本换行

::: code-group
```json [命令]
/tellraw @a { "rawtext": [ { "text":"I am line one\nI am line two" } ] }
```
:::

## 显示实体/玩家信息

通过选择器显示实体名称的用法示例

::: code-group
```json [命令]
/tellraw @a {"rawtext": [{"text": "§6The winner is: §a"}, {"selector": "@a[r=5,c=1]"}]}
```
:::

## 显示计分板数值

显示玩家计分板数值的复合用法

::: code-group
```json [命令]
/tellraw @a {"rawtext": [{"text": "§6The winner is: §a"}, {"selector": "@a[r=5,c=1]"}, {"text": "§6With a score of: "}, {"score":{"name": "@s","objective": "value"}}]}
```
:::

## 多语言文本翻译

使用translate组件配合[翻译键](/wiki/concepts/text-and-translations)实现多语言支持。注意需在对应语言的.lang文件中配置翻译内容

::: code-group
```json [RP/texts/en_US.lang]
example.langcode.1=I am line one
```

```json [RP/texts/de_DE.lang]
example.langcode.1=Ich bin Zeile eins
```
:::

对应命令：

::: code-group
```json [命令]
/tellraw @a { "rawtext": [ { "translate": "example.langcode.1" } ] }
```
:::

## 复合型翻译模板

多语言文件配置：

::: code-group
```json [示例]
example.langcode.2=The winner is: %s. With a score of %s
```

```json [命令]
/tellraw @a {"rawtext":[{"translate":"example.langcode.2","with":{"rawtext":[{"selector":"@a[r=5,c=1]"},{"text":"§6With a score of: "},{"score":{"name":"@s","objective":"value"}}]}}]}
```
:::