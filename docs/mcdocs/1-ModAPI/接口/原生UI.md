---
sidebarDepth: 1
---
# 原生UI

# 索引

包括原版HUD界面的相关接口

---

| 接口 | <div style="width: 3em"></div> | 描述 |
| --- | --- | --- |
| [GetScreenSize](原生UI.md#getscreensize) | <span style="display:inline;color:#7575f9">客户端</span> | 获取游戏分辨率 |
| [GetScreenViewInfo](原生UI.md#getscreenviewinfo) | <span style="display:inline;color:#7575f9">客户端</span> | 获取游戏视角信息。首先获得当前分辨率下UI放大倍数，计算方式可参考<a href="../../../mcguide/18-界面与交互/1-界面编辑器使用说明.html#《我的世界》界面适配方法">《我的世界》界面适配方法</a>。则当前游戏视角的宽度的计算方式为：若当前分辨率的宽度能被该放大倍数整除，则等于当前分辨率，若不能，则等于当前分辨率加放大倍数再减去当前分辨率对放大倍数求余的结果，当前游戏视角的高度计算方法类似。例：以分辨率为1792，828的手机计算，画布是分辨率的3倍，所以x = 1792 + 3 - 1 = 1794；y = 828，该接口返回的结果为(1794.0, 828.0, 0.0, 0.0) |
| [HideAirSupplyGUI](原生UI.md#hideairsupplygui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏玩家氧气值界面 |
| [HideArmorGui](原生UI.md#hidearmorgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏hud界面的护甲值显示 |
| [HideChangePersonGui](原生UI.md#hidechangepersongui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏切换人称的按钮。隐藏后点击相应位置不会响应 |
| [HideChatGUI](原生UI.md#hidechatgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏聊天按钮原生UI。 |
| [HideEmoteGUI](原生UI.md#hideemotegui) | <span style="display:inline;color:#7575f9">客户端</span> | 设置是否开启表情功能，默认PC端关闭，手机端开启，且该接口只能在手机端使用 |
| [HideExpGui](原生UI.md#hideexpgui) | <span style="display:inline;color:#7575f9">客户端</span> | 非创造者模式下隐藏经验条显示 |
| [HideFoldGUI](原生UI.md#hidefoldgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏下拉按钮原生UI。 |
| [HideHealthGui](原生UI.md#hidehealthgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏hud界面的血量显示 |
| [HideHorseHealthGui](原生UI.md#hidehorsehealthgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏hud界面的坐骑的血量显示 |
| [HideHudGUI](原生UI.md#hidehudgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏HUD游戏界面的游戏原生UI。与原版F1按钮效果一致，只隐藏显示，但点击跳跃键等位置依然会响应 |
| [HideHungerGui](原生UI.md#hidehungergui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏hud界面的饥饿值显示 |
| [HideInteractGui](原生UI.md#hideinteractgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏交互按钮。隐藏后点击相应位置不会响应 |
| [HideJumpGui](原生UI.md#hidejumpgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中右下角的跳跃按钮。隐藏后点击相应位置不会响应 |
| [HideMoveGui](原生UI.md#hidemovegui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中左下角的移动按钮。隐藏后点击相应位置不会响应 |
| [HideNeteaseStoreGui](原生UI.md#hideneteasestoregui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中的网易商店按钮。隐藏后点击相应位置不会响应 |
| [HidePauseGUI](原生UI.md#hidepausegui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏暂停按钮原生UI。 |
| [HideReportGUI](原生UI.md#hidereportgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏举报按钮原生UI。 |
| [HideSlotBarGui](原生UI.md#hideslotbargui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中底部中间的物品栏界面 |
| [HideSneakGui](原生UI.md#hidesneakgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中左下角方向键的中心处潜行按钮。隐藏后点击相应位置不会响应 |
| [HideSwimGui](原生UI.md#hideswimgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中的浮潜按钮。隐藏后点击相应位置不会响应 |
| [HideVoiceGUI](原生UI.md#hidevoicegui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏语音按钮原生UI。 |
| [HideWalkGui](原生UI.md#hidewalkgui) | <span style="display:inline;color:#7575f9">客户端</span> | 隐藏游戏中右上角的移动类型按钮。隐藏后点击相应位置不会响应 |
| [OpenChatGui](原生UI.md#openchatgui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开原版聊天栏 |
| [OpenEmoteGui](原生UI.md#openemotegui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开表情界面 |
| [OpenFoldGui](原生UI.md#openfoldgui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开原版下拉界面 |
| [OpenInventoryGui](原生UI.md#openinventorygui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开原版背包界面，并支持选中某个分页(支持自定义分页名称) |
| [OpenNeteaseStoreGui](原生UI.md#openneteasestoregui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开游戏中的网易商店购买商品界面 |
| [OpenPauseGui](原生UI.md#openpausegui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开原版暂停界面 |
| [OpenReportGui](原生UI.md#openreportgui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开原版举报界面 |
| [OpenVoiceGui](原生UI.md#openvoicegui) | <span style="display:inline;color:#7575f9">客户端</span> | 打开原版语音界面 |
| [PlayHudHeartBlinkAnim](原生UI.md#playhudheartblinkanim) | <span style="display:inline;color:#7575f9">客户端</span> | 播放原版受伤时血量变化的动效 |
| [SetCrossHair](原生UI.md#setcrosshair) | <span style="display:inline;color:#7575f9">客户端</span> | 设置是否使用“准星瞄准”，即设置->触摸屏->准星瞄准 |
| [SetEmoteSwitch](原生UI.md#setemoteswitch) | <span style="display:inline;color:#7575f9">客户端</span> | 设置是否开启表情功能，默认PC端关闭，手机端开启，且该接口只能在手机端使用，在原生UI初始化前调用设置 |
| [SetHudChatStackPosition](原生UI.md#sethudchatstackposition) | <span style="display:inline;color:#7575f9">客户端</span> | 设置HUD界面左上小聊天窗口位置 |
| [SetHudChatStackVisible](原生UI.md#sethudchatstackvisible) | <span style="display:inline;color:#7575f9">客户端</span> | 设置HUD界面左上小聊天窗口可见性 |
| [SetResponse](原生UI.md#setresponse) | <span style="display:inline;color:#7575f9">客户端</span> | 设置原生UI是否响应 |

## GetScreenSize

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.gameCompClient.GameComponentClient

- 描述

    获取游戏分辨率

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | tuple(float,float) | 宽高（像素） |

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
width, height = comp.GetScreenSize()
```



## GetScreenViewInfo

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.gameCompClient.GameComponentClient

- 描述

    获取游戏视角信息。首先获得当前分辨率下UI放大倍数，计算方式可参考<a href="../../../mcguide/18-界面与交互/1-界面编辑器使用说明.html#《我的世界》界面适配方法">《我的世界》界面适配方法</a>。则当前游戏视角的宽度的计算方式为：若当前分辨率的宽度能被该放大倍数整除，则等于当前分辨率，若不能，则等于当前分辨率加放大倍数再减去当前分辨率对放大倍数求余的结果，当前游戏视角的高度计算方法类似。例：以分辨率为1792，828的手机计算，画布是分辨率的3倍，所以x = 1792 + 3 - 1 = 1794；y = 828，该接口返回的结果为(1794.0, 828.0, 0.0, 0.0)

- 参数

    无

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | tuple(float,float,float,float) | 依次为宽、高、x偏移、y偏移 |

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
width, height, offsetX, offsetY= comp.GetScreenViewInfo()
```



## HideAirSupplyGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏玩家氧气值界面

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideAirSupplyGUI(True)
```



## HideArmorGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏hud界面的护甲值显示

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideArmorGui(True)
```



## HideChangePersonGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏切换人称的按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideChangePersonGui(True)
```



## HideChatGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏聊天按钮原生UI。

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideChatGUI(True)
```



## HideEmoteGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    设置是否开启表情功能，默认PC端关闭，手机端开启，且该接口只能在手机端使用

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideEmoteGUI(True)
```



## HideExpGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    非创造者模式下隐藏经验条显示

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideExpGui(True)
```



## HideFoldGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏下拉按钮原生UI。

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideFoldGUI(True)
```



## HideHealthGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏hud界面的血量显示

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHealthGui(True)
```



## HideHorseHealthGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏hud界面的坐骑的血量显示

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHorseHealthGui(True)
```



## HideHudGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏HUD游戏界面的游戏原生UI。与原版F1按钮效果一致，只隐藏显示，但点击跳跃键等位置依然会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHudGUI(True)
```



## HideHungerGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏hud界面的饥饿值显示

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置是否成功 |

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHungerGui(True)
```



## HideInteractGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏交互按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideInteractGui(True)
```



## HideJumpGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中右下角的跳跃按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideJumpGui(True)
```



## HideMoveGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中左下角的移动按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideMoveGui(True)
```



## HideNeteaseStoreGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中的网易商店按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideNeteaseStoreGui(True)
```



## HidePauseGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏暂停按钮原生UI。

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HidePauseGUI(True)
```



## HideReportGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏举报按钮原生UI。

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideReportGUI(True)
```



## HideSlotBarGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中底部中间的物品栏界面

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 备注
    - 受限于MC主界面结构控制，不能实现在保留经验条的情况下隐藏slotbar

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideSlotBarGui(True)
```



## HideSneakGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中左下角方向键的中心处潜行按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideSneakGui(True)
```



## HideSwimGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中的浮潜按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideSwimGui(True)
```



## HideVoiceGUI

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏语音按钮原生UI。

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | True为隐藏原生HUD，False为恢复显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideVoiceGUI(True)
```



## HideWalkGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    隐藏游戏中右上角的移动类型按钮。隐藏后点击相应位置不会响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | isHide | bool | 是否隐藏，True为隐藏，False为显示 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.HideWalkGui(True)
```



## OpenChatGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开原版聊天栏

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
#请不要在监听PlayerChatButtonClickClientEvent事件的回调函数中执行此接口,会导致聊天界面无法关闭
clientApi.OpenChatGui()
```



## OpenEmoteGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开表情界面

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenEmoteGui()
```



## OpenFoldGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开原版下拉界面

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenFoldGui()
```



## OpenInventoryGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开原版背包界面，并支持选中某个分页(支持自定义分页名称)

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | categoryName | str | 分页名称([原版分页名称枚举](../枚举值/InventoryType.md)) |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenInventoryGui(clientApi.GetMinecraftEnum().InventoryType.NATURE)
```



## OpenNeteaseStoreGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开游戏中的网易商店购买商品界面

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | categoryName | str | 商品分类名称 |
    | itemName | str | 商品名称 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenNeteaseStoreGui("商品", "测试商品1")
```



## OpenPauseGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开原版暂停界面

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenPauseGui()
```



## OpenReportGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开原版举报界面

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenReportGui()
```



## OpenVoiceGui

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    打开原版语音界面

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenVoiceGui()
```



## PlayHudHeartBlinkAnim

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    播放原版受伤时血量变化的动效

- 参数

    无

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.PlayHudHeartBlinkAnim()
```



## SetCrossHair

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    设置是否使用“准星瞄准”，即设置->触摸屏->准星瞄准

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | visible | bool | True为开启“准星瞄准”，False为关闭 |

- 返回值

    无

- 示例

```python
# we want to hide cross hair
import mod.client.extraClientApi as clientApi
clientApi.SetCrossHair(False)
```



## SetEmoteSwitch

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.component.gameCompClient.GameComponentClient

- 描述

    设置是否开启表情功能，默认PC端关闭，手机端开启，且该接口只能在手机端使用，在原生UI初始化前调用设置

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | flag | bool | 是否开启表情 |

- 返回值

    | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- |
    | bool | 设置成功返回true，设置失败返回false |

- 示例

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
res = comp.SetEmoteSwitch(False)
```



## SetHudChatStackPosition

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    设置HUD界面左上小聊天窗口位置

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | pos | tuple(float,float) | 该界面的目标坐标，第一项为横轴，第二项为纵轴，(0,0)点在Hud界面左上角，玩家形象下方 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.SetHudChatStackPosition((100, 0))
```



## SetHudChatStackVisible

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    设置HUD界面左上小聊天窗口可见性

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | visible | bool | 是否可见 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.SetHudChatStackVisible(True)
```



## SetResponse

<span style="display:inline;color:#7575f9">客户端</span>

method in mod.client.extraClientApi

- 描述

    设置原生UI是否响应

- 参数

    | 参数名 | <div style="width: 4em">数据类型</div> | 说明 |
    | :--- | :--- | :--- |
    | response | bool | 点击UI时是否屏蔽下层敲击方块/攻击实体 |

- 返回值

    无

- 示例

```python
import mod.client.extraClientApi as clientApi
clientApi.SetResponse(False)
```



