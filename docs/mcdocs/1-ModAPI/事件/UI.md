---
sidebarDepth: 1
---
# UI

# 索引

| 事件 | <div style="width: 3em"></div> | 描述 |
| --- | --- | --- |
| [ClientChestCloseEvent](UI.md#clientchestcloseevent) | <span style="display:inline;color:#7575f9">客户端</span> | 关闭箱子界面时触发，包括小箱子，合并后大箱子和末影龙箱子 |
| [ClientChestOpenEvent](UI.md#clientchestopenevent) | <span style="display:inline;color:#7575f9">客户端</span> | 打开箱子界面时触发，包括小箱子，合并后大箱子和末影龙箱子 |
| [ClientPlayerInventoryCloseEvent](UI.md#clientplayerinventorycloseevent) | <span style="display:inline;color:#7575f9">客户端</span> | 关闭物品背包界面时触发 |
| [ClientPlayerInventoryOpenEvent](UI.md#clientplayerinventoryopenevent) | <span style="display:inline;color:#7575f9">客户端</span> | 打开物品背包界面时触发 |
| [GridComponentSizeChangedClientEvent](UI.md#gridcomponentsizechangedclientevent) | <span style="display:inline;color:#7575f9">客户端</span> | 触发时机：UI grid组件里格子数目发生变化时触发 |
| [OnItemSlotButtonClickedEvent](UI.md#onitemslotbuttonclickedevent) | <span style="display:inline;color:#7575f9">客户端</span> | 点击快捷栏和背包栏的物品槽时触发 |
| [PlayerChatButtonClickClientEvent](UI.md#playerchatbuttonclickclientevent) | <span style="display:inline;color:#7575f9">客户端</span> | 玩家点击聊天按钮或回车键触发呼出聊天窗口时客户端抛出的事件 |
| [PlayerInventoryOpenScriptServerEvent](UI.md#playerinventoryopenscriptserverevent) | <span style="display:inline;color:#ff5555">服务端</span> | 某个客户端打开物品背包界面时触发 |
| [PopScreenEvent](UI.md#popscreenevent) | <span style="display:inline;color:#7575f9">客户端</span> | screen移除触发 |
| [PushScreenEvent](UI.md#pushscreenevent) | <span style="display:inline;color:#7575f9">客户端</span> | screen创建触发 |
| [UiInitFinished](UI.md#uiinitfinished) | <span style="display:inline;color:#7575f9">客户端</span> | UI初始化框架完成,此时可以创建UI |
| [UrgeShipEvent](UI.md#urgeshipevent) | <span style="display:inline;color:#ff5555">服务端</span> | 玩家点击商城催促发货按钮时触发该事件 |
# UI

## ClientChestCloseEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    关闭箱子界面时触发，包括小箱子，合并后大箱子和末影龙箱子

- 参数

    无

- 返回值

    无



## ClientChestOpenEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    打开箱子界面时触发，包括小箱子，合并后大箱子和末影龙箱子

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家实体id |
    | x | int | 箱子位置x值 |
    | y | int | 箱子位置y值 |
    | z | int | 箱子位置z值 |

- 返回值

    无

在零件中直接声明一个同名函数，即可完成监听，详情参考<a href="../../../mcguide/20-玩法开发/14-预设玩法编程/2-深入理解零件/0-零件开发.html#零件事件">零件事件</a>


## ClientPlayerInventoryCloseEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    关闭物品背包界面时触发

- 参数

    无

- 返回值

    无



## ClientPlayerInventoryOpenEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    打开物品背包界面时触发

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isCreative | bool | 是否是创造模式背包界面 |
    | cancel | bool | 取消打开物品背包界面 |

- 返回值

    无



## GridComponentSizeChangedClientEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    触发时机：UI grid组件里格子数目发生变化时触发

- 参数

    无

- 返回值

    无



## OnItemSlotButtonClickedEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    点击快捷栏和背包栏的物品槽时触发

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | slotIndex | int | 点击的物品槽的编号 |

- 返回值

    无



## PlayerChatButtonClickClientEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    玩家点击聊天按钮或回车键触发呼出聊天窗口时客户端抛出的事件

- 参数

    无

- 返回值

    无



## PlayerInventoryOpenScriptServerEvent

<span style="display:inline;color:#ff5555">服务端</span>

- 描述

    某个客户端打开物品背包界面时触发

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 客户端对应的玩家entity的唯一ID |
    | isCreative | bool | 是否是创造模式背包界面 |

- 返回值

    无

- 备注
    - 可以监听此事件判定客户端是否打开了创造背包

在零件中直接声明一个同名函数，即可完成监听，详情参考<a href="../../../mcguide/20-玩法开发/14-预设玩法编程/2-深入理解零件/0-零件开发.html#零件事件">零件事件</a>


## PopScreenEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    screen移除触发

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | screenName | str | UI名字 |

- 返回值

    无



## PushScreenEvent

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    screen创建触发

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | screenName | str | UI名字 |

- 返回值

    无



## UiInitFinished

<span style="display:inline;color:#7575f9">客户端</span>

- 描述

    UI初始化框架完成,此时可以创建UI

- 参数

    无

- 返回值

    无

- 备注
    - 切换维度后会重新初始化UI并触发该事件



## UrgeShipEvent

<span style="display:inline;color:#ff5555">服务端</span>

- 描述

    玩家点击商城催促发货按钮时触发该事件

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |

- 返回值

    无

在零件中直接声明一个同名函数，即可完成监听，详情参考<a href="../../../mcguide/20-玩法开发/14-预设玩法编程/2-深入理解零件/0-零件开发.html#零件事件">零件事件</a>


