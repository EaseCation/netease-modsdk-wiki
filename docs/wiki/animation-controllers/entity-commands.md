---
title: 实体命令
nav_order: 2
tags:
    - 中级
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - destruc7i0n
    - Dreamedc2015
    - MedicalJewel105
    - aexer0e
    - cda94581
    - ThijsHankelMC
---

# 实体命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
通过`run_command`事件响应来执行实体命令是更简单的方法，但目前该功能仍处于实验性阶段。
:::

## 动画控制器

要触发斜杠命令，我们将使用行为包动画控制器。动画控制器应放置在`animation_controllers/some_controller.json`路径下。你可以在[bedrock.dev的实体事件章节](https://bedrock.dev/docs/stable/Entity%20Events)了解更多关于动画控制器的知识。

简而言之，动画控制器允许我们从行为包中触发事件：

- 斜杠命令（如`/say`）
- Molang表达式（`v.foo += 1;`）
- 实体事件（如`@s wiki:my_event`）

以下是一个动画控制器示例：

::: code-group
```json [BP/animation_controllers/entity_commands.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.sirlich_entity_commands": {
			"states": {
				"default": {
					"transitions": [
						{
							"on_summon": "1" // 1表示真值
						}
					]
				},
				"on_summon": {
					"on_entry": ["/say I have been summoned"]
				}
			}
		}
	}
}
```
:::

当实体被召唤到世界时，这个动画控制器会立即执行`/say I have been summoned`命令。如果对工作原理有疑问，请复习Molang、动画和实体事件相关内容。

简单来说，`states`可以通过`on_entry`子句触发事件。我们使用查询条件在不同状态间切换。除非定义了`initial_state`值，否则实体默认处于`default`状态。

:::warning
当世界/区块重新加载时，查询会重新运行。这意味着`"/say I have been summoned"`命令实际上会在每次实体"加载"时执行——而不仅在被召唤时。
:::

如果需要避免这种情况，需要添加额外查询条件，例如使用`skin_id`查询。首次生成实体时检查`skin_id = 0`，然后将其设置为更高的值如`skin_id = 1`。这样当实体重新加载时就不会再次触发命令。下文将展示具体实现方法。

## 使用动画控制器

要将动画控制器添加到实体中，可以在实体定义描述中使用以下代码：

::: code-group
```json [BP/entities/entity_commands.se.json]
"description": {
    "identifier": "wiki:entity_commands",
    "scripts": {
        "animate": [
            "wiki:entity_commands"
        ]
    },
    "animations": {
        "wiki:entity_commands": "controller.animation.wiki_entity_commands"
    }
}
```
:::

如果对步骤有疑问，请再次查阅[实体事件文档](https://bedrock.dev/r/Entity%20Events)。

## 通过事件触发命令

动画状态过渡使用查询条件实现。可查阅[实体查询列表](https://bedrock.dev/docs/stable/MoLang#List%20of%20Entity%20Queries)。在第一个示例中，查询条件简化为`true`，因此命令会自动执行。我们可以使用更复杂的查询条件实现更精细的控制，其中通过组件作为Molang过滤器来触发命令是便捷的方法。

推荐使用[skin_id](https://docs.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entityproperties/minecraftproperty_skin_id)组件。

更新后的动画控制器基于`skin_id`触发：

::: code-group
```json [BP/animation_controllers/entity_commands.ac.json]
{
	"format_version": "1.10.0",
	"animation_controllers": {
		"controller.animation.sirlich_entity_commands": {
			"states": {
				"default": {
					"transitions": [
						{
							"command_example": "q.skin_id == 1"
						},
						{
							"zombies": "q.skin_id == 2"
						}
					]
				},
				"command_example": {
					"transitions": [
						{
							"default": "q.skin_id != 1"
						}
					],
					"on_entry": ["/say Command One!", "@s execute_no_commands"]
				},
				"zombies": {
					"transitions": [
						{
							"default": "q.skin_id != 2"
						}
					],
					"on_entry": [
						"/say AHH! Zombies everywhere!",
						"/summon minecraft:zombie",
						"/summon minecraft:zombie",
						"/summon minecraft:zombie",
						"/summon minecraft:zombie",
						"@s execute_no_commands"
					]
				}
			}
		}
	}
}
```
:::

现在这个动画控制器有两个命令状态：`skin_id = 1`触发第一个，`skin_id = 2`触发第二个。注意使用`==`和`!=`运算符（不要使用单个`=`）。`@s execute_no_commands`语法用于在命令列表末尾重置`skin_id`，下文将创建这个事件。

## 设置组件组

在实体文件中，可以通过`skin_id`组件设置值：

::: code-group
```json [BP/entities/entity_commands.se.json]
"component_groups": {
    "execute_no_commands": {
        "minecraft:skin_id": {
            "value": 0
        }
    },
    "command_example": {
        "minecraft:skin_id": {
            "value": 1
        }
    },
    "command_zombies": {
        "minecraft:skin_id": {
            "value": 2
        }
    }
}
```
:::

## 添加事件

创建事件以便管理组件组：

::: code-group
```json [BP/entities/entity_commands.se.json]
"events": {
    "minecraft:entity_spawned": {
        "add": {
            "component_groups": [
                "execute_no_commands"
            ]
        }
    },
    "execute_no_commands": {
        "add": {
            "component_groups": [
                "execute_no_commands"
            ]
        }
    },
    "command_example": {
        "add": {
            "component_groups": [
                "command_example"
            ]
        }
    },
    "command_zombies": {
        "add": {
            "component_groups": [
                "command_zombies"
            ]
        }
    }
}
```
:::

## 触发事件

Minecraft中有多种触发事件的方式，以下是两个典型示例：

### 交互组件

此组件会在点击实体时生成僵尸：

::: code-group
```json [BP/entities/entity_commands.se.json]
"minecraft:interact": {
    "interactions": [{
        "on_interact": {
            "filters": {
                "all_of": [{
                        "test": "is_family",
                        "subject": "other",
                        "value": "player"
                    }
                ]
            },
            "event": "command_zombies"
        }
    }]
}
```
:::

### 定时器

此组件每10秒触发示例命令：

::: code-group
```json [BP/entities/entity_commands.se.json]
"minecraft:timer": {
    "looping": true,
    "time": 10,
    "time_down_event": {
        "event": "example_command"
    }
}
```
:::

通过添加这些组件，我们可以控制`skin_id`的变化时机，从而决定哪些事件会被触发。

## 流程总结

完整工作流程如下：

1. 通过交互或定时器等组件触发`example_command`事件
2. 事件添加`example_command`组件组
3. 组件组设置实体的`skin_id`
4. 动画控制器检测到`skin_id`变化，切换到对应状态
5. 执行状态中的`/say`等命令
6. 执行`@s execute_no_command`事件重置`skin_id`
7. 动画控制器检测重置，返回默认状态
8. 等待新的`skin_id`触发新事件

通过这种机制，可以实现精准的实体行为控制。