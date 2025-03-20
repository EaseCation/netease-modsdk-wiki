---
title: 🚀 快速入门 Mod 开发
category: 基础
---

# 🚀 快速入门我的世界 Mod 开发

::: warning :warning: 接下来需要 Python2 基础知识
如果你不熟悉 Python 的这些概念（变量、函数、类等），或是还没有安装 Python2 环境，可以先学习 [Python 官方教程](https://docs.python.org/zh-cn/2/tutorial/index.html)
:::

## 1. 创建你的 Addons

::: details 什么是 Addons？
Addons 是基岩版的玩法与内容扩展的载体，分为行为包（Behavior Pack）和资源包（Resource Pack）两部分。

在中国版的行为包中，我们可以使用 Python2 编写 Mod 脚本，实现自定义的复杂游戏逻辑。
:::

我们一般推荐使用 MCStudio 来创建你的 Addons（Mod）

- 左侧切换到 `作品库` > `基岩版组件` 标签页
- 顶部切换到 `附加包` 标签页
- 点击右上角 `新建` 按钮，选择 `空白附加包` 或 `入门预设脚本模板`
- 输入 作品名称、命名空间 等信息，点击 `启动编辑` 启动 MCStudio 编辑器（但是暂时没什么用），也可以点击 `仅新建` 来创建。

## 2. 创建基础 Mod 框架

Addons（Mod）创建完毕后，你可以在 MC Studio 中，找到你刚刚创建的 Addons，点击 `更多` > `打开目录`，即可在资源管理器中找到和打开 Addons 文件夹。

接着，你可以使用任何代码编辑器打开这个 Addons 文件夹。

> 可以使用 VS Code，也可以使用 PyCharm 等用于 Python 的 IDE（集成开发环境 的缩写）。

::: code-group
``` [Addons目录结构]
Addons                     # Addons 根目录
├── resource_pack/         # 基岩版材质包（MCStudio创建时，会自动生成后缀，这是没问题的）
│   ├── manifest.json      # 材质包描述文件
│   └── textures/          # 材质文件目录（目前用不到）
│       ├── blocks/
│       └── items/
├── behavior_pack/         # 基岩版行为包（MCStudio创建时，会自动生成后缀，这是没问题的）
│   ├── manifest.json      # 行为包描述文件
│   ├── myScript/          # Mod脚本目录（这个目录名字随便起！）
│   │   ├── modMain.py
│   │   ├── MyServerSystem.py  # ServerSystem，你也可以随意放在任何子目录，但是需要在modMain.py中正确注册
│   │   └── MyClientSystem.py  # ClientSystem，你也可以随意放在任何子目录，但是需要在modMain.py中正确注册
```
:::

Mod（Python）逻辑位于 `行为包 (Behavior Pack，简称BP)` 中的 **脚本目录**，这里我们取名为 `myScript`，当然你想你可以随便取名。

::: code-group
```python [BP/myScript/modMain.py]
from mod.common.mod import Mod
import mod.server.extraServerApi as serverApi
import mod.client.extraClientApi as clientApi

# 通过Mod.Binding注明这个class是Mod的主入口。
@Mod.Binding(name="MyFirstMod", version="1.0")  # Mod名称(name)可以随便取，但是需要唯一且用于下方注册系统和后续注册事件监听。
class MyFirstMod:  # 这个类名可以随便取
    @Mod.InitServer()
    def serverInit(self):  # 这个方法名可以随便取，因为已经通过@Mod.InitServer()注明是服务端的初始化方法
        serverApi.RegisterSystem("MyFirstMod", "MyServerSystem", "myScript.MyServerSystem.MyServerSystem")
        print("MyFirstMod 服务端已加载！")  # print打印的内容将输出在MCStudio的 日志与调试工具 中

    @Mod.InitClient()
    def clientInit(self):  # 这个方法名可以随便取，因为已经通过@Mod.InitClient()注明是客户端的初始化方法
        clientApi.RegisterSystem("MyFirstMod", "MyClientSystem", "myScript.MyClientSystem.MyClientSystem")
        print("MyFirstMod 客户端已加载！")  # print打印的内容将输出在MCStudio的 日志与调试工具 中
```
:::

::: code-group
```python [BP/myScript/MyServerSystem.py]
from server.extraServerApi import serverApi

ServerSystem = serverApi.GetServerSystemCls()

# 继承 ServerSystem 类，表示这是一个 服务端System
class MyServerSystem(ServerSystem):

    def __init__(self):
        super(MyServerSystem, self).__init__()
        print("MyServerSystem Hello World!")  # print打印的内容将输出在MCStudio的 日志与调试工具 中
```
:::

::: code-group
```python [BP/myScript/MyClientSystem.py]
# 本教程中，我们还暂时用不到 ClientSystem，但是我们可以先创建好
from client.extraClientApi import clientApi

ClientSystem = clientApi.GetClientSystemCls()

# 继承 ClientSystem 类，表示这是一个 客户端System
class MyClientSystem(ClientSystem):

    def __init__(self):
        super(MyClientSystem, self).__init__()
        print("MyClientSystem Hello World!")
```
:::

BOOM！就这么简单！

:::details :bulb: 为什么需要这些System？
<!--@include: @/wiki/1-Mod脚本开发/为什么是System.md-->
:::

## 3. 运行你的Mod

- 保存你的代码
- 在 MCStudio 中找到此 Addons，鼠标划上去后点击 `开发测试` 按钮
- 选择一个合适的游戏版本（一般为最新）
- 填写相关测试名称和测试地图的配置，点击 `开始` 按钮
- 等待游戏启动，你会在 **脚本与测试工具** 看到 `MyFirstMod 服务端已加载！` 和 `MyFirstMod 客户端已加载！` 的输出

::: details :thinking: 常见问题
- 如果你没有看到期望的输出，可以在 **脚本与测试工具** 中查看日志，看看有没有报错
- 如果没有任何报错，你需要检查你的 **脚本目录** 及以下的各级目录中，是否有`__init__.py`文件，如果没有，可以手动创建一个空文件
- 再次检查后，可以尝试重启游戏（右侧 `测试存档记录`）
:::

## 4. 实现简单功能

### 🧪 小功能：右键方块，获得钻石

::: code-group
```python [BP/myScript/MyServerSystem.py]
from server.extraServerApi import serverApi

ServerSystem = serverApi.GetServerSystemCls()

# 继承 ServerSystem 类，表示这是一个 服务端System
class MyServerSystem(ServerSystem):
    def __init__(self):
        super(MyServerSystem, self).__init__()
        # 监听玩家使用方块事件 
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), "ServerBlockUseEvent", self, self.onBlockUse)

    def onBlockUse(self, args):
        # 从事件的参数中，获得玩家ID
        playerId = args["playerId"]
        # 生成（获取）一个引擎的ItemComponent
        itemComp = serverApi.GetEngineCompFactory().CreateItem(playerId)
        # 向玩家背包中放入一个钻石
        itemComp.SpawnItemToPlayerInv({
            "itemName": "minecraft:diamond",
            "count": 1
        })
```
:::

::: tip 🔌 使用到的相关API
- 接口：[ListenForEvent](/mcdocs/1-ModAPI/接口/通用/事件.html#listenforevent)
- 事件：[ServerBlockUseEvent](/mcdocs/1-ModAPI/事件/方块.html#serverblockuseevent)
- 接口：[SpawnItemToPlayerInv](/mcdocs/1-ModAPI/接口/玩家/背包.html#spawnitemtoplayerinv)
:::

太棒了！赶快进入游戏，右键点击任意方块，你将获得一个钻石！