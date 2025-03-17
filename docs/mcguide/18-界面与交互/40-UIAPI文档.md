---
front: 
hard: 入门
time: 分钟
sidebarDepth: 1
---

# <span id="UI API"></span>UI API

下面是UI的一些API接口文档，关于UI的使用请参照[UI使用文档](30-UI说明文档.html)。

下面的文档分为两个部分，一部分是在extraClientApi中，另一部分是ScreenNode基类的成员函数。

<span id="extraClientApi"></span>
## extraClientApi

有一部分UI相关的接口分布在<a href="../../mcdocs/1-ModAPI/接口/自定义UI/通用.html" rel="noopenner"> extraClientApi的通用UI接口 </a>中。

<span id="ScreenNode"></span>

## ScreenNode

ScreenNode的一些有用的函数，界面Node节点的获取方式在[UI使用文档](30-UI说明文档.html)中有详细说明。

```python
	import mod.client.extraClientApi as clientApi
	uiNode = clientApi.GetUI("myModName", "myUIName")
```

假设下文中的函数，uiNode为获取到的ScreenNode继承类，调用的UI界面是按下面的节点树组织结构的

```
my_namespace
| main
	| image
	| image_button
	| text1
	| panel
		| text2
	| panel2
		| text_edit_box
```

<span id="ChangeBindAutoScale"></span>
### ChangeBindAutoScale

- 描述

    设置已绑定实体的UI是否根据绑定实体与本地玩家间的距离动态缩放，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[创建UI界面](30-UI说明文档.html#创建ui界面)**

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | autoScale | int | 1:动态缩放 0:不动态缩放 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否设置成功 True:成功 False:失败 |

- 示例

```python
succ = uiNode.ChangeBindAutoScale(1)
```

<span id="ChangeBindEntityId"></span>
### ChangeBindEntityId

- 描述

    修改绑定的实体id，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[创建UI界面](30-UI说明文档.html#创建ui界面)**

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | entityId | str | 绑定的实体id |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否修改成功 True:成功 False:失败 |

- 示例

```python
succ = uiNode.ChangeBindEntityId(entityId)
```

<span id="ChangeBindOffset"></span>
### ChangeBindOffset

- 描述

    修改与绑定实体之间的偏移量，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[创建UI界面](30-UI说明文档.html#创建ui界面)**

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | offset | tuple(float,float,float) | 偏移量 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否修改成功 True:成功 False:失败 |

- 备注
    - 不建议在第一人称视角下，将本地玩家绑定UI的偏移量设为(0, 0, 0)

- 示例

```python
succ = uiNode.ChangeBindOffset((0, 3, 0))
```

<span id="Clone"></span>
### Clone

- 描述

    克隆一个已有的控件，修改它的名称，并将它挂接到指定的父节点上，目前文本、图片、按钮控件的克隆控件表现正常，其他复杂控件的克隆控件可能存在运行问题，建议在json编写的过程中，手动复制一份对应控件使用。

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始的控件路径 |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |
    | newName | str | 为克隆成功后创建的新控件名称，新控件的路径为parentPath/newName |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否克隆成功 |

- 示例

```python
# we want to clone text2 named text3 on panel
parentPath = "/panel"
text2Path = "/panel/text2"
text3Name = "text3"
uiNode.Clone(text2Path, parentPath, text3Name)
```

<span id="GetAllChildrenPath"></span>
### GetAllChildrenPath

- 描述

    获取所有子节点的路径list

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list(str) | 返回父节点下的子节点的路径，会递归返回所有子节点，若节点无子节点，返回空list |

- 示例

```python
# get panel's all children path
node.GetAllChildrenPath("/panel")
```

<span id="GetBaseUIControl"></span>
### GetBaseUIControl

- 描述

    根据路径获取BaseUIControl实例

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | path | str | 当前控件的路径 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | BaseUIControl | 路径对应控件的BaseUIControl实例 |

- 示例

```python
# 根据路径获得BaseUIControl实例
text2Path = "/panel/text2"
text2UIControl = uiNode.GetBaseUIControl(text2Path)
```

<span id="GetBindAutoScale"></span>
### GetBindAutoScale

- 描述

    获取该绑定实体的UI是否动态缩放，未绑定的UI将传回默认值1

- 参数

    无

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 1:动态缩放 0:不动态缩放 |

- 示例

```python
autoScale = uiNode.GetBindAutoScale()
```

<span id="GetBindEntityId"></span>
### GetBindEntityId

- 描述

    获取该UI绑定的实体id，未绑定的UI将传回默认值None

- 参数

    无

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 绑定的实体id |

- 示例

```python
entityId = uiNode.GetBindEntityId()
```

<span id="GetBindOffset"></span>
### GetBindOffset

- 描述

    获取该UI绑定实体的偏移量，未绑定的UI将传回默认值(0, 0, 0)

- 参数

    无

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | tuple(float,float,float) | 偏移量 |

- 示例

```python
offset = uiNode.GetBindOffset()
```

<span id="GetChildrenName"></span>
### GetChildrenName

- 描述

    获取子节点的名称list

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list(str) | 返回父节点下的子节点的名称，不会递归返回所有子节点，若节点无子节点，返回空list |

- 示例

```python
# get panel's children name
node.GetChildrenName("/panel")
```

<span id="GetIsHud"></span>
### GetIsHud

- 描述

    获得本界面的输入模式

- 参数

    无

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 返回1表示该界面不屏蔽游戏操作，返回0则屏蔽。 |

- 示例

```python
# 我们需要获得本界面的输入模式
isHud = uiNode.GetIsHud()
```

<span id="GetRichTextItem"></span>
### GetRichTextItem

- 描述

    返回一个富文本控件实例

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，继承自rich_text.RichTextPanel控件的路径 |

- 返回值

    无

- 示例

```python
# we want get a rich-text-item
richTextPath = "/RichTextPanel"
richTextItem = uiNode.GetRichTextItem(richTextPath)
```

<span id="RemoveComponent"></span>
### RemoveComponent

- 描述

    动态删除某一控件

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，被删除控件路径 |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |

- 返回值

    无

- 示例

```python
# we want to remove text2
text2Path = "/panel/text2"
parentPath = "/panel"
uiNode.RemoveComponent(text2Path, parentPath)
```

<span id="SetIsHud"></span>
### SetIsHud

- 描述

    设置本界面的输入模式

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | isHud | int | 设置1表示该界面不屏蔽游戏操作，设置0则屏蔽。 |

- 返回值

    无

- 示例

```python
# 我们需要设置本界面为HUD操作模式
uiNode.SetIsHud(1)
```

<span id="SetRemove"></span>
### SetRemove

- 描述

    删除本界面节点

- 参数

    无

- 返回值

    无

- 示例

```python
# we want to remove this screen
uiNode.SetRemove()
```

<span id="SetScreenVisible"></span>
### SetScreenVisible

- 描述

    设置是否显示本界面

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | visible | bool | False为隐藏该界面，True为显示该界面 |

- 返回值

    无

- 示例

```python
# 我们隐藏当前UI的界面
uiNode.SetScreenVisible(False)
```

<span id="SetSelectControl"></span>
### SetSelectControl

- 描述

    设置当年焦点所在的控件

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，所要选中控件的路径 |
    | enable | bool | True为选中componentPath所代表的控件，false为取消选中 |

- 返回值

    无

- 示例

```python
path = "/text_edit_box0"
uiNode.SetSelectControl(path, True)
```

<span id="SetStackGridCount"></span>
### SetStackGridCount

- 描述

    设置StackGrid控件的大小

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，Grid控件的路径 |
    | count | int | 设置StackGrid的内容数量 |

- 返回值

    无

- 示例

```python
# we want change stackgrid count
stackgridPath = "/stack_grid1"
uiNode.SetStackGridCount(stackgridPath, 3)
```

<span id="SetUiEntity"></span>
### SetUiEntity

- 描述

    设置PaperDoll控件需要显示的生物模型,PaperDoll控件的配置方式详见[控件介绍PaperDoll](30-UI说明文档.html#paperdoll)

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始的控件路径 |
    | entityIdentifier | str | 生物定义中设定的identifier（暂不支持squid、horse、donkey、mule、zombie_horse、skeleton_horse、drowned、elder_guardian、ender_dragon，将在后续版本支持） |

- 返回值

    无

- 示例

```python
# we want to show an entity model
imagePath = "/paper_doll0"
uiNode.SetUiEntity(imagePath, 'minecraft:cat')  # 而根据参数说明，传入'minecraft:squid'则无模型显示
```

<span id="SetUiItem"></span>
### SetUiItem

- 描述

    设置ItemRenderer控件显示的物品，ItemRenderer控件的配置方式详见[控件介绍ItemRenderer](30-UI说明文档.html#itemrenderer)

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，需要被修改控件的路径 |
    | itemName | str | 物品identifier |
    | auxValue | int | 物品附加值 |
    | isEnchanted | bool | 可选参数，是否显示附魔效果，默认为False不显示 |
    | userData | dict | 可选参数，如果是灾厄旗帜或焰火之星等带有userData的需要传入该参数才能正确显示，目前已知仅有灾厄旗帜和焰火之星需要传 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否设置结果，True为成功 |

- 示例

```python
#设置显示为木板block
itemRenderPath = "/panel/item_renderer"
itemName = "minecraft:wool"
auxValue = 0
uiNode.SetUiItem(itemRenderPath, itemName, auxValue)
```

<span id="SetUiModel"></span>
### SetUiModel

- 描述

    设置PaperDoll控件需要显示的模型,PaperDoll控件的配置方式详见[控件介绍PaperDoll](30-UI说明文档.html#paperdoll)

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始的控件路径 |
    | modelName | str | 骨骼模型的名称 |
    | animateName | str | 动画名称，默认为'idle' |
    | looped | bool | 是否循环播放动画，默认为True |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否设置成功 |

- 示例

```python
# we want to change model
imagePath = "/paper_doll0"
uiNode.SetUiModel(imagePath, 'saber', 'idle', True)
```

<span id="SetUiModelScale"></span>
### SetUiModelScale

- 描述

    设置PaperDoll控件模型的缩放比例

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，被删除控件路径 |
    | scale | float | PaperDoll的缩放比例，默认为1.0 |

- 返回值

    无

- 备注
    - 当设置为原版生物模型时会导致偏移，建议开发者自行调整位置

- 示例

```python
imagePath = "/paper_doll0"
uiNode.SetUiModelScale(imagePath, 1.2)
```

<span id="MiniMapBaseScreen"></span>
## MiniMapBaseScreen

MiniMapBaseScreen继承于ScreenNode，实现了小地图基本的功能，并且封装了一些操作小地图的接口。
备注：该功能属于[实验性功能](../20-玩法开发/13-模组SDK编程/10-实验性功能.md)，目前在低端机可能会出现性能问题，建议开发者合理地使用该功能。
注意事项：
1）不建议在飞行模式或者跑图模式下开启小地图；
2）如果重写了Create接口，请先调用一下super(MiniMapBaseScreen, self).Create()；
3）如果重写了Destroy接口，请先调用一下super(MiniMapBaseScreen, self).Destroy()；

<span id="AddEntityMarker"></span>
### AddEntityMarker

- 描述

    增加实体位置标记

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | entityId | str | 实体Id |
    | texturePath | str | 头顶ICON贴图，如textures/blocks/border |
    | size | tuple(float,float) | 贴图大小，默认为(4,4) |
    | enableRotation | bool | 是否启用实体朝向，默认为False |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否增加成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.AddEntityMarker(entityId, "textures/ui/custom_head")
```

<span id="AddStaticMarker"></span>
### AddStaticMarker

- 描述

    增加地图上静态位置的标记

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | str | 标记Id |
    | vec2 | tuple(float,float) | 地图位置二维坐标(x,z) |
    | texturePath | str | 贴图路径 |
    | size | tuple(float,float) | 贴图大小，默认为(4,4) |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否增加成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.AddStaticMarker("this_is_marker_key", (10,2), "textures/blocks/border", (3,3))
```

<span id="RemoveEntityMarker"></span>
### RemoveEntityMarker

- 描述

    删除实体位置标记

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | entityId | str | 实体Id |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否删除成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.RemoveEntityMarker(entityId)
```

<span id="RemoveStaticMarker"></span>
### RemoveStaticMarker

- 描述

    删除静态位置标记

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | str | 标记的Id |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否删除成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.RemoveStaticMarker(entityId)
```

<span id="ZoomIn"></span>
### ZoomIn

- 描述

    放大地图（最多放大一倍）

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | value | float | 在原有基础上的增量值，可以控制放大速度，默认为0.1 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.ZoomIn(0.2)
```

<span id="ZoomOut"></span>
### ZoomOut

- 描述

    缩小地图（最多缩小一倍）

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | value | float | 在原有基础上的减少值，可以控制缩小速度，默认为0.1 |

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.ZoomOut(0.2)
```

