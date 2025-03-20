---
title: 文本与本地化
mentions:
    - ThijsHankelMC
    - SirLich
    - aexer0e
    - MedicalJewel105
    - Luthorius
    - Fabrimat
    - TheDoctor15
    - Hatchibombotar
    - ChibiMango
    - SmokeyStack
    - Sprunkles
---

# 文本与本地化

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

Minecraft 是一款支持全球多语言本地化的游戏。为实现这一特性，游戏采用了基于语言代码的**翻译键值系统**。对于自定义实体（Entity）、物品（Item）和方块（Block），Minecraft 会自动生成翻译键值，而我们需要通过资源包为其提供本地化文本。

## 语言文件

### 文件位置

语言文件通常位于资源包的 `texts` 文件夹中，使用 `.lang` 扩展名。虽然也可以放置在行为包中，但行为包仅能修改资源包清单（manifest）的名称和描述。

<FolderView :paths="[
  'RP/texts/en_US.lang',
  'RP/texts/languages.json',
  'RP/manifest.json'
]"
></FolderView>

Minecraft 目前支持 29 种语言，详见 [§ 原版支持语言](/wiki/concepts/text-and-translations#vanilla-languages)。

### 格式规范

语言文件采用键值对格式，使用等号（`=`）分隔。键为翻译键值，值为字符串（不支持换行符）。

```toml
wiki.example_translation.line_1=第一行内容！
wiki.example_translation.line_2=这里是第一行之后的其他信息。
```

可通过双井号（`##`）添加注释，支持行尾注释和整行注释（注释内容持续到行尾）。

:::warning
行尾注释前的空格不会被自动删除。如需缩进注释，请使用制表符（Tab）。
:::

```toml
## 译者注：这个翻译可能有点幽默成分
item.flint_and_steel.name=燧石与史蒂夫	##[原文如此]
```

翻译文本支持占位符替换，可使用有序占位符（`%1`、`%2`）或无序占位符（`%s`）。原版占位符由游戏自动填充，而通过原始JSON文本命令（如 [`/tellraw`](/wiki/commands/tellraw)）可手动指定替换值。

```toml
commands.op.success=已授予管理员权限：%s
immersive_reader.book_page_header=第 %1 页 / 共 %2 页
```

### 应用场景

本地化文本可用于以下场景（包括但不限于）：

-   资源包/行为包名称与描述
-   实体、物品或方块的名称
-   书页内容
-   告示牌文字
-   `/tellraw` 和 `/titleraw` 命令
-   对话系统中的文本

但某些文本（如铁砧重命名的物品）不支持本地化。

## 本地化实践

:::tip
最佳实践是为每个主要支持语言创建独立语言文件。例如要完整支持英语，应同时创建 `en_US.lang`（美式英语）和 `en_GB.lang`（英式英语）文件。
:::

编辑语言文件时，需在 `texts` 文件夹中添加 `languages.json` 文件，声明需要修改的语言列表。这会告知 Minecraft 应用对应的本地化配置。

::: code-group
```json [原始CodeHeader的值]
[
  "en_US",
  "en_GB",
  "fr_FR"
]
```
:::

### 自定义语言

通过全局资源包，可使用 `languages.json` 和 `language_names.json` 添加自定义语言。应用全局资源包后，即可在游戏设置的"语言"选项中选择新语言。

假设我们有两个功能完善的语言文件：`xx_XX.lang` 和 `yy_YY.lang`。

::: code-group
```json [原始CodeHeader的值]
[
  "xx_XX",
  "yy_YY"
]
```
:::

`language_names.json` 用于定义语言在选项菜单中的显示名称：

::: code-group
```json [原始CodeHeader的值]
[
  [ "xx_XX", "新语言（自定义语言 #1）" ],
  [ "yy_YY", "维基语（自定义语言 #2）" ]
]
```
:::

:::warning
使用自定义语言时，在禁用其所属资源包前请先切换回其他语言，否则可能导致游戏崩溃。
:::

### 原版支持语言

下表列出了 Minecraft 默认支持的 29 种语言：

| 文件ID     | 语言                | 国家/地区       |
| ---------- | ------------------- | --------------- |
| id_ID      | 印度尼西亚语        | 印度尼西亚      |
| da_DK      | 丹麦语              | 丹麦            |
| de_DE      | 德语                | 德国            |
| en_GB      | 英语                | 英国            |
| en_US      | 英语                | 北美            |
| es_ES      | 西班牙语            | 西班牙          |
| es_MX      | 墨西哥西班牙语      | 墨西哥          |
| fr_CA      | 加拿大法语          | 加拿大          |
| fr_FR      | 法语                | 法国            |
| it_IT      | 意大利语            | 意大利          |
| hu_HU      | 匈牙利语            | 匈牙利          |
| nl_NL      | 荷兰语              | 荷兰            |
| nb_NO      | 书面挪威语          | 挪威            |
| pl_PL      | 波兰语              | 波兰            |
| pt_BR      | 巴西葡萄牙语        | 巴西            |
| pt_PT      | 葡萄牙语            | 葡萄牙          |
| sk_SK      | 斯洛伐克语          | 斯洛伐克        |
| fi_FI      | 芬兰语              | 芬兰            |
| sv_SE      | 瑞典语              | 瑞典            |
| tr_TR      | 土耳其语            | 土耳其          |
| cs_CZ      | 捷克语              | 捷克共和国      |
| el_GR      | 希腊语              | 希腊            |
| bg_BG      | 保加利亚语          | 保加利亚        |
| ru_RU      | 俄语                | 俄罗斯          |
| uk_UA      | 乌克兰语            | 乌克兰          |
| ja_JP      | 日语                | 日本            |
| zh_CN      | 简体中文            | 中国            |
| zh_TW      | 繁体中文            | 台湾地区        |
| ko_KR      | 韩语                | 韩国            |