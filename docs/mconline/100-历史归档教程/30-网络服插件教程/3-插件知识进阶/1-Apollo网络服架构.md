---
front: https://nie.res.netease.com/r/pic/20220408/a5a602e2-e859-4a41-bf9b-3ada874fc9b7.png
hard: 入门
time: 5分钟
selection: true
---

# Apollo网络服架构

## 比较

### Java服

传统的Java服一般指使用Spigot等类似服务端的服务器，玩家使用任意客户端都可以加入游戏。这种服务器纯靠服务器进行驱动，如果不通过一些特殊手段，无法强制客户端安装一些mod来增强游戏体验。

### Apollo

Apollo服务器不仅可以类似Java服那样使用服务器进行驱动，还会同步发送相关与服务器匹配的Mod到客户端，并且使用这些Mod和服务器进行双向通信，来实现在触发某个事件后，打开界面，播放动画等效果。

需要注意的是，在Java服中经常使用ProtocolLib或者net.minecraft.server(简称NMS)来绕过Spigot API来实现各种功能，例如计分板，title等等。而在Apollo的开发中，并没有这些类似的协议API可供使用，但是可以使用ModSDK来实现更强大的客户端表现功能。例如计分板功能可以使用ModSDK制作一个Hud来实现。这里需要Java服插件开发者们提前了解并转变思想。

## 架构

![](./images/structure-1.png)

如上图所示，Apollo网络服，拥有5种不同类型的服务器，客户端(Client)和数据库(DB)

### 服务器

#### Proxy

Proxy即代理服务器，所有玩家的连接都会通过代理服务器，然后再分发到各个游戏服或大厅服中。功能和Java服的BungeeCord较为相似。只不过Proxy服务器无法像BungeeCord一样安装插件。

#### Game

Game即游戏服，为玩家提供某个特定的玩法，是玩家的主要载体。一个在线玩家只能存在于一个Game或Lobby中。

#### Lobby

Lobby即大厅服，主要作为各个玩法间的中转站。玩家可以在大厅服中选择自己想要玩的玩法，并提供跨服跳转的功能。其中Lobby服的接口和Game服基本一致。

#### Service

Service即功能服，主要用作各个Game/Lobby服的后端服务器。可以使用Service服来集中处理一些其他服务器的数据。Service服可以主动/被动向各个服务器发送数据，其他服务器也可以监听Service服的消息，并调用回调完成一系列应答。

Service和Game的配合相对来说比较重要，下面将举一个例子来介绍。

- gameA服务器制作了起床战争玩法。gameA服务器启动完成后，就会通知Service服务器可以让玩家进入本服务器。

- 在gameA服务器上凑够了足够开局的玩家后，gameA就会开始游戏逻辑，并通知Service，不要再匹配新的玩家进入该服务器。

- 在游戏结束后，gameA将玩家重新送回大厅，然后重置地图。

- 待重置地图完成后，gameA再次通知Service，本服务器已经可以让玩家加入了。

更多通信相关的内容将会在下一节进行说明。

#### Master

Master即控制服，可以使用Master服来调用管理员指令，完成一系列的运维操作。

### 客户端

客户端是玩家的终端，每个玩家都可以看作一个Client。

### 数据库

数据库即之前所提到的数据的载体，具体详见[数据库的概念](../1-准备知识/3-数据库的概念.html)。

