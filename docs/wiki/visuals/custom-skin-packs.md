---
title: 皮肤包
mentions:
    - MedicalJewel105
    - SirLich
    - Joelant05
    - TheItsNameless
category: 基础
---

# 皮肤包

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

许多人错误地认为只有市场合作伙伴才能创建皮肤包。其实不然！这是一个非常简单的流程，甚至可以用Python轻松实现全自动化。不过这不是重点，让我们来学习如何制作皮肤包吧！

:::warning
`development_skin_packs` 似乎无法正常工作。你需要使用 `skin_packs` 文件夹，且每次修改后都要重启 Minecraft。
:::

## 所需文件

以下是制作皮肤包需要的文件结构：

<FolderView
	:paths="[
    'com.mojang/skin_packs/my_skin_pack/texts/en_US.lang',
	'com.mojang/skin_packs/my_skin_pack/my_skin.png',
	'com.mojang/skin_packs/my_skin_pack/manifest.json',
	'com.mojang/skin_packs/my_skin_pack/skins.json'
]"
></FolderView>

## manifest.json

::: code-group
```json [skin_packs/tutorial_skin_pack/manifest.json]
{
    "format_version": 2,
    "header": {
        "name": "教程皮肤包",
        "uuid": "bb9616eb-327c-4a81-9f00-064cae820cd5",
        "version": [
            1,
            0,
            0
        ]
    },
    "modules": [
        {
            "type": "skin_pack",
            "uuid": "e4bc71b6-8f9b-4094-9d47-dc3824f8a3dc",
            "version": [
                1,
                0,
                0
            ]
        }
    ]
}
```
:::

- `format_version` 也可以设为 1，因为对于皮肤包来说版本 2 没有太大变化
- `name` 字段不言自明，但实际影响不大
- `uuid` 和 `version` 是我们熟悉的配置。清单中的两个 UUID 必须不同，可通过[实用链接](/wiki/meta/useful-links)中的生成器获取。**重要提示**：绝对不要重复使用相同 UUID
- `modules` 中的 `type` 必须设为 `skin_pack`

## skins.json

这个文件用于定义皮肤纹理和简称。不过大部分配置都是硬编码或不可修改的。

::: code-group
```json [skin_packs/tutorial_skin_pack/skins.json]
{
    "geometry": "geometry.json",
    "serialize_name": "Tutorial Skin Pack",
    "localization_name": "tutorial",
    "skins": [
        {
            "localization_name": "tutorial_skin_1",
            "geometry": "geometry.humanoid.custom",
            "texture": "goggled_gecko_no_goggles.png",
            "type": "free"
        },
        {
            "localization_name": "tutorial_skin_2",
            "geometry": "geometry.humanoid.customSlim",
            "texture": "goggled_gecko.png",
            "type": "free"
        }
    ]
}
```
:::

- `geometry` 字段必须与示例代码保持一致。由于该功能曾被滥用，Mojang移除了通过皮肤包添加自定义模型的功能
- `serialize_name` 用于市场平台
- `localization_name` 是包的标识符，**不要在其他皮肤包中使用相同名称**，会影响多语言系统
- `skins` 数组定义每个皮肤，游戏内显示顺序与此处的定义顺序一致
    > - `localization_name` 将用于.lang文件，相当于皮肤标识符
    > - `geometry` 可选 `geometry.humanoid.custom` 或 `geometry.humanoid.customSlim`
    > - `texture` 是皮肤包主目录中的图片文件名
    > - `type` 仅市场合作伙伴可用，保持设为 `free`

## texts/en_US.lang

最后在 `.lang` 文件中定义皮肤包和每个皮肤的显示名称。"en_US" 可替换为其他语言代码。

::: code-group
``` [skin_packs/tutorial_skin_pack/texts/en_US.lang]
skinpack.tutorial=教程皮肤包

skin.tutorial.tutorial_skin_1=皮肤1号
skin.tutorial.tutorial_skin_2=皮肤2号
```
:::

第一行定义整个皮肤包的名称，格式为：
`skinpack.[包localization_name]=实际显示名称`

其他行定义单个皮肤名称：
`skin.[包localization_name].[皮肤localization_name]=实际显示名称`

大功告成！现在进入角色创建界面就能看到你的自定义皮肤啦！

## 故障排查

在低于1.18.30的MC版本中，可能会出现"装备"按钮不显示的问题，需要下载特殊材质包修复。

![](/assets/images/visuals/skin-packs/troubleshooting-1.png)

<BButton
    link="/assets/packs/visuals/skin-packs/equip_button_fix.mcpack" download
    color=default
>下载装备按钮修复补丁</BButton>

![](/assets/images/visuals/skin-packs/troubleshooting-2.png)