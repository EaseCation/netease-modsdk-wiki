---
sidebarDepth: 1
---
# UI界面

### ScreenNode

| 函数 | 描述 |
| --- | --- |
| [Update](UI界面.md#update) | 客户端每帧调用，1秒有30帧 |
| [Destroy](UI界面.md#destroy) | UI生命周期函数，当UI销毁时调用。 |
| [Create](UI界面.md#create) | UI生命周期函数，当UI创建成功时调用。 |
| [OnDeactive](UI界面.md#ondeactive) | UI生命周期函数，当栈顶UI有其他UI入栈时调用。 |
| [OnActive](UI界面.md#onactive) | UI生命周期函数，当UI重新回到栈顶时调用。 |
| [SetScreenVisible](UI界面.md#setscreenvisible) | 设置是否显示本界面 |
| [ChangeBindEntityId](UI界面.md#changebindentityid) | 修改绑定的实体id，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[CreateUI](通用.md#CreateUI)接口** |
| [BindVirtualWorldModel](UI界面.md#bindvirtualworldmodel) | 绑定虚拟世界中的模型 |
| [ChangeBindOffset](UI界面.md#changebindoffset) | 修改与绑定实体之间的偏移量，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[CreateUI](通用.md#CreateUI)接口** |
| [ChangeBindAutoScale](UI界面.md#changebindautoscale) | 设置已绑定实体的UI是否根据绑定实体与本地玩家间的距离动态缩放，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[CreateUI](通用.md#CreateUI)接口** |
| [GetBindEntityId](UI界面.md#getbindentityid) | 获取该UI绑定的实体id，未绑定的UI将传回默认值None |
| [GetBindOffset](UI界面.md#getbindoffset) | 获取该UI绑定实体的偏移量，未绑定的UI将传回默认值(0, 0, 0) |
| [GetBindAutoScale](UI界面.md#getbindautoscale) | 获取该绑定实体的UI是否动态缩放，未绑定的UI将传回默认值1 |
| [Clone](UI界面.md#clone) | 克隆一个已有的控件，修改它的名称，并将它挂接到指定的父节点上，目前文本、图片、按钮控件的克隆控件表现正常，其他复杂控件的克隆控件可能存在运行问题，建议在json编写的过程中，手动复制一份对应控件使用。 |
| [GetChildrenName](UI界面.md#getchildrenname) | 获取子节点的名称list |
| [GetAllChildrenPath](UI界面.md#getallchildrenpath) | 获取所有子节点的路径list |
| [RemoveComponent](UI界面.md#removecomponent) | 动态删除某一控件 |
| [SetRemove](UI界面.md#setremove) | 删除本界面节点 |
| [SetUiModel](UI界面.md#setuimodel) | 设置PaperDoll控件需要显示的模型,PaperDoll控件的配置方式详见<a href="../../../../mcguide/18-界面与交互/30-UI说明文档.html#paperdoll">控件介绍PaperDoll</a> |
| [SetUiEntity](UI界面.md#setuientity) | 设置PaperDoll控件需要显示的生物模型,PaperDoll控件的配置方式详见<a href="../../../../mcguide/18-界面与交互/30-UI说明文档.html#paperdoll">控件介绍PaperDoll</a> |
| [SetUiModelScale](UI界面.md#setuimodelscale) | 设置PaperDoll控件模型的缩放比例 |
| [UpdateScreen](UI界面.md#updatescreen) | 刷新界面，重新计算各个控件的相关数据 |
| [SetStackGridCount](UI界面.md#setstackgridcount) | 设置StackGrid控件的大小 |
| [SetSelectControl](UI界面.md#setselectcontrol) | 设置当前焦点所在的控件,当设置控件为文本输入框时会弹出系统小键盘 |
| [GetRichTextItem](UI界面.md#getrichtextitem) | 返回一个富文本控件实例 |
| [SetIsHud](UI界面.md#setishud) | 设置本界面的输入模式 |
| [GetIsHud](UI界面.md#getishud) | 获得本界面的输入模式 |
| [GetScreenName](UI界面.md#getscreenname) | 获得本界面的名称 |
| [GetSelf](UI界面.md#getself) | 获取零件界面自身 |
| [GetBaseUIControl](UI界面.md#getbaseuicontrol) | 根据路径获取BaseUIControl实例 |

### MiniMapBaseScreen

| 函数 | 描述 |
| --- | --- |
| [AddEntityMarker](UI界面.md#addentitymarker) | 增加实体位置标记 |
| [RemoveEntityMarker](UI界面.md#removeentitymarker) | 删除实体位置标记 |
| [AddStaticMarker](UI界面.md#addstaticmarker) | 增加地图上静态位置的标记 |
| [RemoveStaticMarker](UI界面.md#removestaticmarker) | 删除静态位置标记 |
| [ZoomIn](UI界面.md#zoomin) | 放大地图 |
| [ZoomOut](UI界面.md#zoomout) | 缩小地图 |
| [ZoomReset](UI界面.md#zoomreset) | 恢复地图放缩大小为默认值 |
| [SetHighestY](UI界面.md#sethighesty) | 设置绘制地图的最大高度 |

# ScreenNode

class in mod.client.ui.screenNode

ScreenNode的一些有用的函数，界面Node节点的获取方式在<a href="../../../../mcguide/18-界面与交互/30-UI说明文档.html">UI使用文档</a>中有详细说明。

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

<span id="Update"></span>
## Update

- 描述

    客户端每帧调用，1秒有30帧

- 参数

    无

- 返回值

    无



<span id="Destroy"></span>
## Destroy

- 描述

    UI生命周期函数，当UI销毁时调用。

- 参数

    无

- 返回值

    无



<span id="Create"></span>
## Create

- 描述

    UI生命周期函数，当UI创建成功时调用。

- 参数

    无

- 返回值

    无



<span id="OnDeactive"></span>
## OnDeactive

- 描述

    UI生命周期函数，当栈顶UI有其他UI入栈时调用。

- 参数

    无

- 返回值

    无

- 备注
    - 不建议使用在OnDeactive函数中调用SetScreenVisible(False)，在OnActive函数中调用SetScreenVisible(True)的方式实现打开新界面时隐藏原界面，新界面关闭时自动显示原界面的功能，由于隐藏接口不会改动UI栈，多Mod容易形成冲突。推荐使用PushScreen，PopScreen接口实现。



<span id="OnActive"></span>
## OnActive

- 描述

    UI生命周期函数，当UI重新回到栈顶时调用。

- 参数

    无

- 返回值

    无

- 备注
    - 不建议使用在OnDeactive函数中调用SetScreenVisible(False)，在OnActive函数中调用SetScreenVisible(True)的方式实现打开新界面时隐藏原界面，新界面关闭时自动显示原界面的功能，由于隐藏接口不会改动UI栈，多Mod容易形成冲突。推荐使用PushScreen，PopScreen接口实现。



<span id="SetScreenVisible"></span>
## SetScreenVisible

- 描述

    设置是否显示本界面

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | visible | bool | False为隐藏该界面，True为显示该界面 |

- 返回值

    无

- 示例

```python
# 我们隐藏当前UI的界面
uiNode.SetScreenVisible(False)
```



<span id="ChangeBindEntityId"></span>
## ChangeBindEntityId

- 描述

    修改绑定的实体id，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[CreateUI](通用.md#CreateUI)接口**

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | entityId | str | 绑定的实体id |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否修改成功 True:成功 False:失败 |

- 示例

```python
succ = uiNode.ChangeBindEntityId(entityId)
```



<span id="BindVirtualWorldModel"></span>
## BindVirtualWorldModel

- 描述

    绑定虚拟世界中的模型

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | bindToObjId | int | 绑定的模型对象的id |
    | offset | tuple(float,float,float) | UI与绑定实体的偏移量 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否修改成功 True:成功 False:失败 |

- 备注
    - 绑定的对象销毁时UI不会销毁，而是会隐藏起来，建议复用或者销毁

- 示例

```python
# 若是被绑定的UI需要创建多份，则需要使用此方式进行创建:
uiNode=clientApi.CreateUI("modNamespace","testUI", {
    "bindEntityId": clientApi.GetLocalPlayerId()
})
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldCreate()
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
succ = uiNode.BindVirtualWorldModel(objId, (0.0, 0.0, 0.0))
```



<span id="ChangeBindOffset"></span>
## ChangeBindOffset

- 描述

    修改与绑定实体之间的偏移量，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[CreateUI](通用.md#CreateUI)接口**

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | offset | tuple(float,float,float) | 偏移量 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否修改成功 True:成功 False:失败 |

- 备注
    - 不建议在第一人称视角下，将本地玩家绑定UI的偏移量设为(0, 0, 0)

- 示例

```python
succ = uiNode.ChangeBindOffset((0, 3, 0))
```



<span id="ChangeBindAutoScale"></span>
## ChangeBindAutoScale

- 描述

    设置已绑定实体的UI是否根据绑定实体与本地玩家间的距离动态缩放，**只对已绑定实体的UI界面生效，如何将UI与实体绑定详见[CreateUI](通用.md#CreateUI)接口**

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | autoScale | int | 1:动态缩放 0:不动态缩放 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否设置成功 True:成功 False:失败 |

- 备注
    - 注意：
        绑定实体的UI缩放仅作用于根节点（比如"main"节点）下的子节点。
        
        建议在根节点下挂载一个panel类型的节点，然后将所有需要缩放的UI节点设置为百分比属性并挂载在这个panel节点下。

- 示例

```python
succ = uiNode.ChangeBindAutoScale(1)
```



<span id="GetBindEntityId"></span>
## GetBindEntityId

- 描述

    获取该UI绑定的实体id，未绑定的UI将传回默认值None

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | str | 绑定的实体id |

- 示例

```python
entityId = uiNode.GetBindEntityId()
```



<span id="GetBindOffset"></span>
## GetBindOffset

- 描述

    获取该UI绑定实体的偏移量，未绑定的UI将传回默认值(0, 0, 0)

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | tuple(float,float,float) | 偏移量 |

- 示例

```python
offset = uiNode.GetBindOffset()
```



<span id="GetBindAutoScale"></span>
## GetBindAutoScale

- 描述

    获取该绑定实体的UI是否动态缩放，未绑定的UI将传回默认值1

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | int | 1:动态缩放 0:不动态缩放 |

- 示例

```python
autoScale = uiNode.GetBindAutoScale()
```



<span id="Clone"></span>
## Clone

- 描述

    克隆一个已有的控件，修改它的名称，并将它挂接到指定的父节点上，目前文本、图片、按钮控件的克隆控件表现正常，其他复杂控件的克隆控件可能存在运行问题，建议在json编写的过程中，手动复制一份对应控件使用。

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始的控件路径 |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |
    | newName | str | 为克隆成功后创建的新控件名称，新控件的路径为parentPath/newName |
    | syncRefresh | bool | 是否需要同步刷新，默认值为True。置True为游戏在同一帧计算该控件的Size等相关数据，置False则在下一帧进行计算。**如同一帧有大量clone操作建议置False，操作结束后调用一次UpdateScreen接口刷新界面及相关控件数据** |
    | forceUpdtae | bool | 是否需要强制刷新，默认值为True。置True则按照syncRefresh逻辑进行同一帧或者下一帧刷新，置False则当前帧和下一帧均不刷新，需要手动调用UpdateScreen进行刷新。如有大量Clone操作且非在同一帧执行，建议设置为False,需要更新时再调用UpdateScreen接口刷新界面及相关控件数据 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否克隆成功 |

- 示例

```python
# 克隆text2控件，重命名为text3并以panel为父控件
parentPath = "/panel"
text2Path = "/panel/text2"
text3Name = "text3"
uiNode.Clone(text2Path, parentPath, text3Name)
# 以panel为父控件，以text_prefab为模板克隆若干控件
parentPath = "/panel"
textPrefabPath = "/panel/text_prefab"
for i in range(0, 10):
    uiNode.Clone(textPrefabPath, parentPath, "text" + str(i), False)
uiNode.UpdateScreen(True)
# 在非同一帧，以panel为父控件，text_prefab为模板克隆若干控件
parentPath = "/panel"
textPrefabPath = "/panel/text_prefab"
def _tickClone(newName):
    uiNode.Clone(textPrefabPath, parentPath, newName , False, False)
def _tickUpdateScreen():
    uiNode.UpdateScreen(True)
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddTimer(100, _tickClone, "text1")
comp.AddTimer(200, _tickClone, "text2")
comp.AddTimer(300, _tickUpdateScreen)
```



<span id="GetChildrenName"></span>
## GetChildrenName

- 描述

    获取子节点的名称list

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | list(str) | 返回父节点下的子节点的名称，不会递归返回所有子节点，若节点无子节点，返回空list |

- 示例

```python
# get panel's children name
node.GetChildrenName("/panel")
```



<span id="GetAllChildrenPath"></span>
## GetAllChildrenPath

- 描述

    获取所有子节点的路径list

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | parentPath | str | 为从main节点开始，父节点的控件路径 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | list(str) | 返回父节点下的子节点的路径，会递归返回所有子节点，若节点无子节点，返回空list |

- 示例

```python
# get panel's all children path
node.GetAllChildrenPath("/panel")
```



<span id="RemoveComponent"></span>
## RemoveComponent

- 描述

    动态删除某一控件

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
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



<span id="SetRemove"></span>
## SetRemove

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



<span id="SetUiModel"></span>
## SetUiModel

- 描述

    设置PaperDoll控件需要显示的模型,PaperDoll控件的配置方式详见<a href="../../../../mcguide/18-界面与交互/30-UI说明文档.html#paperdoll">控件介绍PaperDoll</a>

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始的控件路径 |
    | modelName | str | 骨骼模型的名称 |
    | animateName | str | 动画名称，默认为'idle' |
    | looped | bool | 是否循环播放动画，默认为True |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否设置成功 |

- 示例

```python
# we want to change model
imagePath = "/paper_doll0"
uiNode.SetUiModel(imagePath, 'saber', 'idle', True)
```



<span id="SetUiEntity"></span>
## SetUiEntity

- 描述

    设置PaperDoll控件需要显示的生物模型,PaperDoll控件的配置方式详见<a href="../../../../mcguide/18-界面与交互/30-UI说明文档.html#paperdoll">控件介绍PaperDoll</a>

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始的控件路径 |
    | entityIdentifier | str | 生物定义中设定的identifier |

- 返回值

    无

- 备注
    - 暂不支持的微软原版模型：minecraft:horse（马）、minecraft:donkey（驴）、minecraft:mule（骡子）、minecraft:skeleton_horse（骷髅马）、minecraft:zombie_horse（僵尸马）、minecraft:llama（羊驼）、minecraft:tropicalfish（热带鱼）、minecraft:slime（史莱姆）、minecraft:magma_cube（岩浆怪）、minecraft:ghast（恶魂）、minecraft:shulker（潜影贝）、minecraft:ender_dragon（末影龙）、minecraft:thrown_trident（三叉戟）、minecraft:ender_crystal（末影水晶）、minecraft:boat（船）、minecraft:tnt（TNT）

- 示例

```python
# we want to show an entity model
imagePath = "/paper_doll0"
uiNode.SetUiEntity(imagePath, 'minecraft:cat')
```



<span id="SetUiModelScale"></span>
## SetUiModelScale

- 描述

    设置PaperDoll控件模型的缩放比例

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，PaperDoll控件路径 |
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



<span id="UpdateScreen"></span>
## UpdateScreen

- 描述

    刷新界面，重新计算各个控件的相关数据

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | syncRefresh | bool | 是否需要同步刷新，默认值为True。置True为游戏在同一帧计算各个控件的相关数据，置False则在下一帧进行计算。若置True不建议在同一帧调用多次 |

- 返回值

    无

- 示例

```python
# 当前帧刷新界面
uiNode.UpdateScreen(True)
# 下一帧刷新界面
uiNode.UpdateScreen(False)
```



<span id="SetStackGridCount"></span>
## SetStackGridCount

- 描述

    设置StackGrid控件的大小

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
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



<span id="SetSelectControl"></span>
## SetSelectControl

- 描述

    设置当前焦点所在的控件,当设置控件为文本输入框时会弹出系统小键盘

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，所要选中控件的路径 |
    | enable | bool | True为选中componentPath所代表的控件，False为取消选中 |

- 返回值

    无

- 示例

```python
path = "/text_edit_box0"
uiNode.SetSelectControl(path, True)
```



<span id="GetRichTextItem"></span>
## GetRichTextItem

- 描述

    返回一个富文本控件实例

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | componentPath | str | 为从main节点开始，继承自rich_text.RichTextPanel控件的路径 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | RichTextItem | 返回一个富文本控件实例 |

- 示例

```python
# we want get a rich-text-item
richTextPath = "/RichTextPanel"
richTextItem = uiNode.GetRichTextItem(richTextPath)
```



<span id="SetIsHud"></span>
## SetIsHud

- 描述

    设置本界面的输入模式

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHud | int | 设置1表示该界面不屏蔽游戏操作，设置0则屏蔽。 |

- 返回值

    无

- 示例

```python
# 我们需要设置本界面为HUD操作模式
uiNode.SetIsHud(1)
```



<span id="GetIsHud"></span>
## GetIsHud

- 描述

    获得本界面的输入模式

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | int | 返回1表示该界面不屏蔽游戏操作，返回0则屏蔽。 |

- 示例

```python
# 我们需要获得本界面的输入模式
isHud = uiNode.GetIsHud()
```



<span id="GetScreenName"></span>
## GetScreenName

- 描述

    获得本界面的名称

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | str | 返回本界面的名称。仅当该界面是调用PushScreen方法生成的时候才有返回值，返回值为注册UI时（调用RegisterUI）所使用的参数 uiScreenDef ，否则为 None |

- 示例

```python
# 我们需要获得本界面名称
screenName = uiNode.GetScreenName()
```



<span id="GetSelf"></span>
## GetSelf

- 描述

    获取零件界面自身

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | ScreenNode | 零件界面自身 |



<span id="GetBaseUIControl"></span>
## GetBaseUIControl

- 描述

    根据路径获取BaseUIControl实例

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | path | str | 当前控件的路径 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | BaseUIControl | 路径对应控件的BaseUIControl实例 |

- 示例

```python
# 根据路径获得BaseUIControl实例
text2Path = "/panel/text2"
text2UIControl = uiNode.GetBaseUIControl(text2Path)
```



# MiniMapBaseScreen

class in mod.client.ui.miniMapBaseScreen

MiniMapBaseScreen继承于ScreenNode，实现了小地图基本的功能，并且封装了一些操作小地图的接口。
备注：该功能属于<a href="../../../../mcguide/20-玩法开发/13-模组SDK编程/10-实验性功能.html">实验性功能</a>，目前在低端机可能会出现性能问题，建议开发者合理地使用该功能。
注意事项：
1）不建议在飞行模式或者跑图模式下开启小地图；
2）如果重写了Create接口，请先调用一下super(MiniMapBaseScreen, self).Create()；
3）如果重写了Destroy接口，请先调用一下super(MiniMapBaseScreen, self).Destroy()；

<span id="AddEntityMarker"></span>
## AddEntityMarker

- 描述

    增加实体位置标记

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | entityId | str | 实体Id |
    | texturePath | str | 头顶ICON贴图，如textures/blocks/border |
    | size | tuple(float,float) | 贴图大小，默认为(4,4) |
    | enableRotation | bool | 是否启用实体朝向，默认为False |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否增加成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.AddEntityMarker(entityId, "textures/ui/custom_head")
```



<span id="RemoveEntityMarker"></span>
## RemoveEntityMarker

- 描述

    删除实体位置标记

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | entityId | str | 实体Id |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否删除成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.RemoveEntityMarker(entityId)
```



<span id="AddStaticMarker"></span>
## AddStaticMarker

- 描述

    增加地图上静态位置的标记

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | key | str | 标记Id |
    | vec2 | tuple(float,float) | 地图位置二维坐标(x,z) |
    | texturePath | str | 贴图路径 |
    | size | tuple(float,float) | 贴图大小，默认为(4,4) |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否增加成功 |

- 备注
    - 如使用该接口请勿将地图缩小倍数设置过大（建议ZoomOut设置后的地图倍数不小于原地图大小的0.5倍），以免造成地图缩小后静态标记位置失效等问题。

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.AddStaticMarker("this_is_marker_key", (10,2), "textures/blocks/border", (3,3))
```



<span id="RemoveStaticMarker"></span>
## RemoveStaticMarker

- 描述

    删除静态位置标记

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | key | str | 标记的Id |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否删除成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.RemoveStaticMarker(entityId)
```



<span id="ZoomIn"></span>
## ZoomIn

- 描述

    放大地图

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | value | float | 在原有基础上的增量值，可以控制放大速度，默认为0.05 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.ZoomIn(0.2)
```



<span id="ZoomOut"></span>
## ZoomOut

- 描述

    缩小地图

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | value | float | 在原有基础上的减少值，可以控制缩小速度，默认为0.05 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否成功 |

- 备注
    - 客户端地图区块加载有限，如果地图UI界面太大或者缩小地图倍数太大，会导致小地图无法显示未加载的区块。

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.ZoomOut(0.2)
```



<span id="ZoomReset"></span>
## ZoomReset

- 描述

    恢复地图放缩大小为默认值

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.ZoomReset()
```



<span id="SetHighestY"></span>
## SetHighestY

- 描述

    设置绘制地图的最大高度

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | highestY | int | 绘制高度值 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 是否成功 |

- 备注
    - 动态调整高度值后，已经绘制过的区块不会刷新为新的高度值，只有没有绘制过的区块会以新的高度值来绘制。

- 示例

```python
import mod.client.extraClientApi as clientApi
node = clientApi.CreateUI(modConfig.ModName, modConfig.UIName, {"mini_map_root_path": "/mainPanel"})
node.SetHighestY(250)
```



