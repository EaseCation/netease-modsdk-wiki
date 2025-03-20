---
title: 使用Schema
mentions:
    - SirLich
    - MedicalJewel105
    - 7dev7urandom
    - KalmeMarq
---

# 使用Schema

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

JSON Schema能为您提供两大核心功能：**验证**确保JSON结构正确性，以及**智能感知**辅助编写（具体取决于编辑器支持）。Schema的优势在于能即时反馈错误，但需注意它无法捕捉所有潜在问题。

Schema本身也是JSON文件，需借助验证工具发挥作用。您可以使用现有Schema或自行编写。目前已有多个适用于Minecraft基岩版的Schema，但请注意这些Schema并非官方认证（据我所知），且基岩版持续更新迭代，因此任何现有Schema都可能存在不准确之处。请保持理性认知：问题可能出在您的代码，也可能是Schema本身存在缺陷。若发现Schema错误，建议贡献改进并向作者提交Pull Request，共同完善生态。

## Schema列表

现有多种Schema各具特色，建议尝试不同方案选择最适合您的：

| 作者                                                                 | 支持范围                                                                                                      | 备注                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Assassin](https://github.com/aexer0e/bedrock-schema)                | 行为包实体文件                                                                                                | 本文最初基于此Schema编写                         |
| [Tschrock's](https://github.com/bedrock-studio/bedrock-json-schemas/) | 清单文件、实体动画控制器、实体动画、实体资源定义、渲染控制器、几何体                                          |                                                  |
| [stirante](https://github.com/stirante/bedrock-shader-schema/)       | 着色器                                                                                                        |                                                  |
| [KalmeMarq](https://github.com/KalmeMarq/Bugrock-JSON-UI-Schemas/)   | JSON UI文件（包含_ui_defs.json 和 _global_variables.json）                                                                                                        |                                                  |

## VSCode配置

### 单文件配置
在JSON文件根对象中添加以下字段即可启用Schema验证：

`"$schema": "https://aexer0e.github.io/bedrock-schema/"`

完整示例：

::: code-group
```json [示例]
{
    "format_version": "1.14.0",
    "$schema": "https://aexer0e.github.io/bedrock-schema/"
}
```
:::

### 工作区配置
若需为整个工作区启用Schema验证，请按以下步骤操作：

1. 在目标工作区中按下 `Ctrl+Shift+P`
2. 输入并选择 `>Preferences: Open Workspace Settings (JSON)`
3. 在根对象中添加以下配置：

::: code-group
```json [工作区设置]
{
    "settings": {
        "json.schemas": [
            {
                "fileMatch": ["*.json"],
                "url": "https://aexer0e.github.io/bedrock-schema/"
            }
        ]
    }
}
```
:::

验证配置是否生效：新建`.json`文件，在对象中输入内容时观察是否出现自动补全提示（也可手动按`Ctrl+Space`触发提示）。