---
title: NPC 对话框
category: 通用
tags:
    - 中级
参与贡献:
    - kyleplo
    - StuartDA
    - MedicalJewel105
    - SirLich
    - solvedDev
    - omuhu
    - Sprunkles137
    - ThomasOrs
---

# NPC 对话框

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

非玩家角色（NPC）是类似村民的实体，可通过对话框显示消息并提供多个交互按钮。最初设计用于冒险地图，随着 `/dialogue` 命令的引入，现在也能在常规附加包中使用。

## 对话框文件

NPC 对话数据存储于行为包根目录下 `dialogue` 文件夹内的 `.diag.json` 文件中。基础模板示例如下：

::: code-group
```json [dialogue/example.diag.json]
{
	"format_version": "1.17",
	"minecraft:npc_dialogue": {
		"scenes": [
			{
				"scene_tag": "example",
				"npc_name": "Steve",
				"text": "你好"
			}
		]
	}
}
```
:::

每个场景包含以下可配置参数：

#### scene_tag

场景唯一标识符，用于指定具体场景。

#### npc_name

NPC 显示名称。若省略，则使用 NPC 实体名称（默认为`§eNPC`）。

#### text

显示在对话框中的文本（可选）。

#### on_open_commands

打开对话框时执行的命令列表（可选）。

::: code-group
```json
"on_open_commands": [
  "/say 你好"
]
```
:::

#### on_close_commands

关闭对话框时执行的命令列表（可选）。

::: code-group
```json
"on_close_commands": [
  "/say 再见"
]
```
:::

#### buttons

对话框中显示的按钮配置（可选）。

::: code-group
```json
"buttons": [
  {
    "name": "按钮一",
    "commands": [
      "/say 按钮一被点击了！"
    ]
  },
  {
    "name": "按钮二",
    "commands": [
      "/say 按钮二被点击了！",
      "/say 第二段命令示例"
    ]
  }
]
```
:::

## 玩家选择器

在 `on_open_commands`、`on_close_commands` 和各按钮的 `commands` 中可使用本地选择器 `@p`，但会以 NPC 实体为中心选择。特殊选择器 `@initiator` 可始终指向触发对话框的玩家。

::: code-group
```json
"buttons": [
  {
    "name": "获得漂浮效果",
    "commands": [
      "/effect @initiator levitation"
    ]
  }
]
```
:::

注意：`@initiator` 专用于 NPC 对话框，不可在其他场景使用。

## 文本本地化

可通过翻译键实现多语言支持：

::: code-group
```json
"npc_name": {
  "rawtext": [
    {
      "translate": "entity.endermite.name"
    }
  ]
}
```
:::
需在资源包语言文件中定义对应翻译键，例如 `entity.endermite.name` 对应中文为"末影螨"。

## 打开对话框

使用 `/dialogue` 命令开启对话框：
```
/dialogue open <npc: 目标> <player: 目标> [场景名称:string]
```
- `<npc: 目标>`：需携带 `minecraft:npc` 组件的实体（如原版 NPC）
- `<player: 目标>`：目标玩家
- `[场景名称:string]`：指定 `scene_tag`（若省略则显示上一个场景）

示例命令：
```
/dialogue open @e[type=npc,c=1] @p example
```

## 切换对话框

使用以下语法变更 NPC 默认对话框：
```
/dialogue change <npc: 目标> <场景名称:string> [player: 目标]
```
- `<场景名称:string>`：指定新场景的 `scene_tag`
- `[player: 目标]`：指定生效玩家（若省略则影响所有人）

示例命令：
```
/dialogue change @e[type=npc,c=1] example @r
```

## 完整范例

本节演示创建具有传送功能的道具和对话系统（完整源码可参见[GitHub](https://github.com/Llama-Studios/dialog-demo)）。

### 创建 NPC 实体

即使隐藏 NPC，也需要通过常加载区域保持存在：

::: code-group
```mcfunction [functions/setup.mcfunction]
tickingarea add 0 1 0 0 2 0
summon npc "§r" 0 1 0
```
:::

:::tip
可通过玩家实体触发对话框：
1. 为玩家添加 `minecraft:npc` 组件
2. 映射行为包对话框场景
3. 执行以下命令：
```
/dialogue open @s @s <scene_tag>
```
#### 优劣分析
`+` 无需维护隐藏 NPC<br/>
`+` 无需管理常加载区域<br/>
`-` 非正常使用可能导致稳定性问题<br/>
`-` 其他玩家点击该玩家时会显示对话框<br/>

可通过添加交互组件避免问题：
::: code-group
```json
"minecraft:interact": {
  "interactions": [
    {
      "on_interact": {
        "filters": {
          "all_of": [
            {
              "test": "is_family",
              "subject": "other",
              "value": "player"
            }
          ]
        }
      }
    }
  ]
}
```
:::
:::

### 对话文件配置

::: code-group
```json [dialogue/example.diag.json]
{
    "format_version":"1.17",
    "minecraft:npc_dialogue":{
        "scenes":[
            {
                "scene_tag":"main_teleport_menu",
                "npc_name":"传送菜单",
                "text":"选择传送目的地",
                "buttons":[
                    {
                        "name":"区域传送",
                        "commands":[
                            "/dialogue open @e[type=npc,c=1] @initiator districts_teleport_menu"
                        ]
                    },
                    {
                        "name":"个人基地",
                        "commands":[
                            "/tp @initiator -20 4 -20"
                        ]
                    },
                    {
                        "name":"世界出生点",
                        "commands":[
                            "/tp @initiator 0 4 0"
                        ]
                    }
                ]
            },
            {
                "scene_tag":"districts_teleport_menu",
                "npc_name":"区域传送",
                "text":"请选择目标区域",
                "buttons":[
                    {
                        "name":"< 返回",
                        "commands":[
                            "/dialogue open @e[type=npc,c=1] @initiator main_teleport_menu"
                        ]
                    },
                    {
                        "name":"商业区",
                        "commands":[
                            "/tp @initiator 20 4 20"
                        ]
                    },
                    {
                        "name":"娱乐区",
                        "commands":[
                            "/tp @initiator 20 4 -20"
                        ]
                    }
                ]
            }
        ]
    }
}
```
:::

### 创建传送物品

::: code-group
```json [items/teleport_menu.json]
{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "dialog:teleport_menu",
			"category": "物品"
		},
		"components": {
			"minecraft:on_use": {
				"on_use": {
					"event": "open_menu",
					"target": "self"
				}
			},
			"minecraft:foil": true,
			"minecraft:icon": {
				"texture": "ender_pearl"
			},
			"minecraft:display_name": {
				"value": "传送菜单"
			}
		},
		"events": {
			"open_menu": {
				"run_command": {
					"command": [
						"dialogue open @e[type=npc,c=1] @s main_teleport_menu"
					],
					"target": "player"
				}
			}
		}
	}
}
```
:::

### 测试步骤
1. 在超平坦世界启用实验性玩法
2. 执行 `/function setup` 创建 NPC
3. 获取道具：`/give @s dialog:teleport_menu`
4. 切换生存模式使用道具

## 版权声明

本教程改编自 [Minecraft 创作者文档](https://docs.microsoft.com/en-us/minecraft/creator/documents/npcdialogue)。