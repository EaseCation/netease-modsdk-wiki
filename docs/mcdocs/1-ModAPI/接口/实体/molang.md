---
sidebarDepth: 1
---
# molang

## Get

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.queryVariableCompClient.QueryVariableComponentClient

- 描述

    获取某一个实体计算节点的值，如果不存在返回注册时的默认值

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | variableName | str | 节点名称，必须以"query.mod."开头 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | float | 节点的值 |

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.Get('query.mod.state')
```



## GetMolangValue

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.queryVariableCompClient.QueryVariableComponentClient

- 描述

    获取实体molang变量的值

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | molangName | str | molang变量名称，如query.can_fly |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | float或long | 节点的值，不存在返回None |

- 备注
    - 因为没有渲染上下文，某些molang无法通过该种方式获取到正确的值，如query.is_first_person、variable.is_first_person等。
    - 当molangName传入query.get_name或者query.owner_identifier等需要返回字符串的变量值时，返回其hash64，类型是个int，可以用于比较。query.get_name：返回生物的名字；query.owner_identifier：返回其owner的identifier

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.GetMolangValue('query.can_fly')
```



## GetStringHash64

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.queryVariableCompClient.QueryVariableComponentClient

- 描述

    返回字符串变量的hash64

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | key | str | 需要计算的字符串变量,如“steve" |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | long | 结果值，如果传入不是字符串则返回None |

- 备注
    - 可以配合GetMolangValue使用，可以获取query.get_name或者query.owner_identifier等返回hash64的是不是等于某个值

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)
result = comp.GetStringHash64('steve')
```



## Register

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.queryVariableCompClient.QueryVariableComponentClient

- 描述

    注册实体计算节点

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | variableName | str | 节点名称，必须以"query.mod."开头 |
    | defalutValue | float | 默认值 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 注册是否成功 |

- 备注
    - 注意节点的值使用单精度浮点数存储，如果用来设置整数，那么值大于16777216（或小于-16777216）时就会有误差

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)
result = comp.Register('query.mod.state', 0.0)
```



## Set

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.queryVariableCompClient.QueryVariableComponentClient

- 描述

    设置某一个实体计算节点的值

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | variableName | str | 节点名称，必须以"query.mod."开头 |
    | value | float | 计算节点的值 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置是否成功 |

- 备注
    - 注意节点的值使用单精度浮点数存储，如果用来设置整数，那么值大于16777216（或小于-16777216）时就会有误差

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.Set('query.mod.state', 1.0)
```



## UnRegister

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.queryVariableCompClient.QueryVariableComponentClient

- 描述

    注销实体计算节点

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | variableName | str | 节点名称，必须以"query.mod."开头 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 注销是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)
result = comp.UnRegister('query.mod.state')
```



