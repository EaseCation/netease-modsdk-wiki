---
front:
hard: 入门
time: 60分钟
---

# Spigot服务器开发规范

## Spigot服部署规范

- 支持spigot官方BuildTools编译出的1.12.2版本，其他版本不保证可以运行且官方不做技术支持。

  [官方BuildTools wiki](https://www.spigotmc.org/wiki/buildtools/)

- **<span style="font-size: 25px; color: red;">BungeeCord服需要部署在以下路径</span>**：`~/bc/*/BungeeCord.jar`

  例如：`~/bc/bc1/BungeeCord.jar`

- **<span style="font-size: 25px; color: red;">Spigot服需要部署在以下路径</span>**：`~/spigot/*/spigot-1.12.2.jar`

  例如：`~/spigot/lobby1/spigot-1.12.2.jar`

## Spigot服 spigot.yml参数规范

- bungeecord

  ```
  必须值：true
  ```

  为了接收从bc发过来的玩家uuid。注意2023.9.19前上线的网络服非必须。更多信息请参考[玩家uuid数据存储说明](./13-1-【必读】玩家uuid数据存储说明.md)

## Spigot服 server.properties参数规范

- view-distance

  ```
  建议值: 4-6
  ```
决定服务端发送的区块信息数据，对服务器性能与流量消耗影响巨大，建议调小。

- online-mode
  ```
  必须值: false
  ```

  决定Spigot服是否进行正版验证。在Apollo中登录认证由proxy处理，spigot不需要再次验证。

- allow-flight
  ```
  必须值: true
  ```
  决定Spigot是否进行飞行检测。由于目前基岩版登录Java服务器需要经过Geyser服翻译协议，在这过程中，玩家移动相关包体不能完美翻译，若这个字段设为false，存在玩家移动被服务器当作飞行封禁的可能性。

- network-compression-threshold

  ```
  必须值：-1
  ```

  决定spigot与bc通信协议的压缩等级。因为spigot与bc在同一个内网，流量不需要成本，因此不压缩网络协议节省性能


## BungeeCord服 config.yml参数规范
- connection_throttle_limit
  ```
  建议值: 100
  ```
  BC服允许来自同一个ip同时登录的玩家数。因为apollo中玩家登录都来自协议服，所以需要调大这个值。

- online-mode
  ```
  必须值: false
  ```

  决定BC服是否进行正版验证，在Apollo中登录认证由proxy处理，bc不需要再次验证。

- network_compression_threshold

  ```
  必须值：-1
  ```

  决定bc与协议服通信协议的压缩等级。因为bc与协议服在同一个内网，流量不需要成本，因此不压缩网络协议节省性能