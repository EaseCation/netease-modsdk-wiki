---
title: 实体属性
category: 常规
tags:
    - 实验性
mentions:
    - SirLich
    - sermah
    - MedicalJewel105
    - Luthorius
    - stirante
    - TheItsNameless
---

# 实体属性

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::warning
本文档包含过时信息及实验性内容。如需最新稳定版信息，请查阅[微软官方文档](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties)。
:::

本文档介绍在Minecraft基岩版1.16.230.52测试版中加入的新实体属性系统（又称Actor Properties）。实体属性的实现目的是在实体服务端（行为包）高效保存数据或存储数值，无需使用组件或属性（例如"minecraft:variant"），其运作原理类似方块属性。

## 实体属性定义

### 定义实体属性

实体属性定义示例：

::: code-group
```json [实体定义]
{
    "minecraft:entity":{
        "description":{
            "identifier":"entity:properties_example",
            "properties":{
                "property:number_range_example":{
                    "values":{
                        "min":0,
                        "max":100
                    }
                },
                "property:number_enum_example":{
                    "values":[
                        1,
                        2
                    ]
                },
                "property:string_enum_example":{
                    "values":[
                        "first",
                        "second",
                        "third"
                    ]
                },
                "property:boolean_enum_example":{
                    "values":[
                        true,
                        false
                    ]
                }
            }
        }
    }
}
```
:::

### 实体属性字段说明

#### `values`

:::warning
`values`字段为必填项，缺失此字段可能导致属性注册失败。
:::

`values`字段可接受枚举值数组或数值区间（注意当前版本中整数、浮点和布尔枚举最多支持两个值）：

::: code-group
```json [数值范围模式]
"property:range_example": {
    "values": {
      "min": 0,
      "max": 5
    }
}
```

```json [枚举模式]
"property:enum_example":{
    "values":[
        1,
        2
    ]
}
```
:::

#### `default`

可通过属性对象内的`default`字段设置属性默认值（默认使用枚举数组的第一个元素）：

::: code-group
```json [默认值设置]
"property:default_value_example":{
    "values":[
        true,
        false
    ],
    "default":false
}
```
:::

如示例所示，当实体生成时该属性会默认为`false`而非`true`。

#### `client_sync`

通过设置`client_sync`字段为`true`，可将属性同步到客户端资源包（Resource Pack）使用。默认值为`false`。

::: code-group
```json [客户端同步示例]
"property:client_sync_example": {
    "values": {
      "min": 0,
      "max": 20
    },
    "client_sync": true
}
```
:::

### 操作与访问实体属性

可通过以下Molang查询访问实体属性：
    -   `q.actor_property`
    -   `q.has_actor_property`

:::warning
这些Molang查询属于实验性功能
:::

可通过`set_actor_property`事件响应设置实体属性值：

::: code-group
```json [事件响应示例]
"events":{
    "event:set_entity_property":{
        "set_actor_property":{
            "property:number_enum_example":2,
            "property:string_enum_example":"'second'",
            "property:boolean_enum_example":"!q.actor_property('property:boolean_enum_example')"
        }
    }
}
```
:::

## 实体别名系统

可通过定义实体别名（aliases），在`summon`指令中调用自定义标识符生成带预置属性的实体：

::: code-group
```json [别名定义]
{
	"format_version": "1.16.0",
	"minecraft:entity": {
		"description": {
			"identifier": "entity:properties_example",
			"is_spawnable": true,
			"is_summonable": true,
			"is_experimental": false,
			"properties": {
				"property:property_index": {
					"client_sync": true,
					"values": {
						"min": 0,
						"max": 2
					},
					"default": 0
				}
			},
			"aliases": {
				"entity:default_alias": {},
				"entity:first_alias": {
					"property:property_index": 1
				},
				"entity:second_alias": {
					"property:property_index": 2
				}
			}
		}
	}
}
```
:::

现在通过`/summon entity:first_alias`指令可生成带有`property:property_index=1`属性的实体。

## 实体动态组件

实体动态组件（Entity Permutations）可根据属性条件在每个Tick动态应用组件集合。需在`minecraft:entity`对象内与`components`同级添加`permutations`数组：

::: code-group
```json [动态组件示例]
"permutations":[
    {
        "condition":"q.actor_property('property:string_enum_example') == 'first'",
        "components":{
            "minecraft:scale":{
                "value":1.0
            }
        }
    },
    {
        "condition":"q.actor_property('property:string_enum_example') == 'second'",
        "components":{
            "minecraft:scale":{
                "value":2.0
            }
        }
    },
    {
        "condition":"q.actor_property('property:string_enum_example') == 'third'",
        "components":{
            "minecraft:scale":{
                "value":3.0
            }
        }
    }
]
```
:::

当`property:string_enum_example`属性为"first"时，实体会应用1倍缩放，为"second"时应用2倍缩放，为"third"时则应用3倍缩放。