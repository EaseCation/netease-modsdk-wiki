---
title: RakNet与MCPE协议解析
mentions:
    - ZestiiSpaghett
    - SmokeyStack
    - ThomasOrs
    - Adrian8115
    - MedicalJewel105
---

# RakNet与MCPE协议解析

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

Minecraft基岩版使用名为[RakNet](http://www.jenkinssoftware.com/)的通信协议。与Java版不同，基岩版通过UDP协议在19132端口进行通信。

您可以在此处查看[Minecraft基岩版服务器软件列表](/wiki/servers/server-software#active-software)。

## RakNet协议要点

- 所有字符串均以表示长度的无符号短整型（unsigned short）作为前缀
- 离线消息ID固定为：00ffff00fefefefefdfdfdfd12345678（十六进制） - 后续统称为*Magic*
- 离线消息ID随未连接消息（如未连接Ping/Pong）一起发送
- RakNet使用的GUID为8字节长度
- 首字节用于标识消息类型

## 数据类型对照表

| 类型            | 大小 | 数值范围         | 说明                                                         |
| --------------- | ---- | ---------------- | ------------------------------------------------------------ |
| Byte            | 1    | 0-255            | 无符号整型                                                   |
| Long            | 8    | -2^63 至 2^63-1  | 有符号64位整型                                               |
| Magic           | 16   |                  | 固定字节序列：00ffff00fefefefefdfdfdfd12345678               |
| Short           | 2    | -32768 至 32767  | 有符号短整型                                                 |
| Unsigned Short  | 2    | 0 至 65535       | 无符号短整型                                                 |
| String          | 不定 |                  | 以短整型长度前缀开头的字符串                                 |
| Boolean         | 1    | 0-1              | 0x00表示False，0x01表示True                                  |
| Address         | 7    |                  | 地址结构：1字节IP版本（4/6）+4字节IP+2字节端口               |
| uint24le        | 3    |                  | 小端序3字节无符号整型                                        |

## 协议流程目录

- [x] 未连接Ping请求
- [x] 未连接Pong响应
- [x] 开放连接请求1
- [x] 开放连接响应1
- [x] 开放连接请求2
- [x] 开放连接响应2
- **从以下开始，RakNet连接已建立，所有消息均通过[帧集合数据包](https://wiki.vg/Raknet_Protocol#Frame_Set_Packet)传输**
- [x] 连接请求
- [x] 连接请求已接受

### 未连接Ping请求

客户端会向所有服务器列表（包括局域网）发送广播消息以检测可用游戏并获取MOTD信息。该消息结构如下：

`0x01 | 客户端存活时间（毫秒，无符号长整型） | Magic | 客户端GUID`

### 未连接Pong响应

服务器收到Ping请求后会返回以下结构的响应数据包：

`0x1c | 客户端存活时间（取自Ping请求） | 服务器GUID | 字符串长度 | 格式字符串（包含版本信息）`

格式字符串示例：

`MCPE;Dedicated Server;527;1.19.1;0;10;13253860892328930865;Bedrock level;Survival;1;19132;19133;`

客户端实际不会使用游戏模式及其对应的数值字段。

### 开放连接请求1

客户端在尝试加入服务器时发送此数据包：

`0x05 | Magic | 协议版本（当前为10或0x0a） | RakNet空填充`

空填充用于探测网络最大可传输数据包大小。客户端会逐步减少填充量直至收到服务器响应。

## 开放连接响应1

服务器收到连接请求1后的响应结构：

`0x06 | Magic | 服务器GUID | 加密标识（通常为False） | 空填充大小（无符号短整型，建议1400）`

这是客户端与服务器握手过程的第一阶段。

### 开放连接请求2

客户端收到响应1后发送的确认数据包：

`0x07 | Magic | 服务器地址 | 空填充大小 | 客户端GUID`

### 开放连接响应2

握手过程的最终确认数据包：

`0x08 | Magic | 服务器GUID | 客户端地址 | 空填充大小 | 加密标识`

### 连接请求

客户端发送的正式连接请求：

`0x09 | 客户端GUID | 请求时间戳（长整型） | 安全标识（建议使用0x00）`

### 连接请求已接受

服务器对连接请求的最终确认响应：

`0x10 | 客户端地址 | 系统索引（短整型，0值可用） | 系统地址列表 | 请求时间戳 | 接受时间戳`

## 扩展阅读
::: tip
如需深入了解Bedrock协议和RakNet实现，推荐以下文档：

[RakNet协议文档](https://wiki.vg/Raknet_Protocol)

[基岩版1.20.50协议文档](https://prismarinejs.github.io/minecraft-data/?d=protocol&v=bedrock_1.20.50) [由PrismarineJS维护](https://prismarinejs.github.io) :::

::: warning
注意旧版协议文档可能已过时：
[基岩版协议历史文档](https://wiki.vg/Bedrock_Protocol) :::

本文档仍在持续完善中，欢迎贡献内容。