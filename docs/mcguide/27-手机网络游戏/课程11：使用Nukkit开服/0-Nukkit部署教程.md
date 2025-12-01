---
front:
hard: 入门
time: 60分钟
---

# Nukkit部署教程

## 前言
本文默认认为你了解过Nukkit 或者 通过Waterdogpe + Nukkit搭建过第三方服务器。

如果你没有了解过，请移步到 [2-Nukkit开服教程](2-Server.properties详解.md)

特别鸣谢（排名不分先后）： LT_Name(NukkitMOT作者)、bbbroken(EaseCation服务器开发者)、亦染(社区支持者)

## 准备阶段
1. 准备Java版本，建议Java版本为Java17及以上版本
2. 准备NukkitMOT分支，NukkitMOT原作者已将中国版打包到github主分支内 https://github.com/MemoriesOfTime/Nukkit-MOT
> 目前仅支持接入Nukkit-MOT，其他分支可自行通过参考NukkitMOT源码进行对接
3. 准备 WaterDogPE 代理服务端而。WaterdogPE 已兼容中国版，开源仓库是： https://github.com/MCNeteaseDevs/WaterdogPE_Netease/tree/netease。


## WaterDogPE
### config.yml 的配置

需要修改以下参数，其他配置根据情况自行修改
```yaml

# ....

netease_client: true   # 启用 netease 客户端的支持
online_mode: true 
# 开发测试阶段，需要改为false，否则会提示需要 minecraft验证
# 发布阶段时，需要改为true，之后只能用网易手机客户端连接才能进入
listener:
  # .....

  host: 0.0.0.0:19132  # waterdogpe 代理端的IP和端口   。官方提供的机器19132端口可能会被占用，根据实际情况更改
  priorites:   # 按顺序配置，第一个是玩家进入时默认在的服务器。 一般为大厅服
    - lobby1   
    
  # .....
servers:   # 子服务器的连接ID配置，如大厅服、游戏服等等。如子服务器不在同一台机器，则需要写具体的ip。
  lobby1:
    address: 127.0.0.1:19133
    public_address: play.myserver.com:19133
    server_type: bedrock


permissions:  # 权限配置，一般用于配置管理员的权限，用于测试、调试。仅通过名字识别，建议发布阶段去掉，改为用插件实现相关调试功能
  玩家id:
    - waterdog.player.transfer
    - waterdog.player.list
    - waterdog.command.server

```

### 装载客户端模组

当通过waterdogpe代理后，需要将客户端模组存放在waterdogpe 根目录下的 packs 文件夹中，不要存放在NukkitMOT根目录
> 除非你仅通过NukkitMOT单端开服 否则waterdogpe 会自动将nukkit模组加载数据包拦截

> 但如果关闭waterdogpe的资源包功能，Nukkit数据包依然会被waterdogpe拦截而无法正常进入游戏

确保 config.yml 已启用资源包
```yaml
enable_packs: true   # 必须打开
overwrite_client_packs: true   # 按需
force_server_packs: true   # 按需
```

### 模组打包格式

waterdogpe 仅支持 zip和mcpack包，不支持文件夹。  
可以将行为包、资源包都存放在packs目录中。  
目前仅支持 manifest.json ，不支持 pack_manifest.json

zip打包格式为： 压缩包一级目录下就是 manifest.json，不要额外套一层文件夹
![图](./images/img.png)

## Nukkit-MOT

nukkit社区的插件  
https://cloudburstmc.org/resources/categories/nukkit-plugins.1/

### server.properties 配置

为了确保Nukkit-MOT正常接入中国版，您需要调整一些配置
```properties
xbox-auth=off
netease-client-support=on
only-allow-netease-client=on
```

### 模组装载

如果使用 waterdogpe 代理，则需要将模组放在 waterdogpe 目录，而非Nukkit目录  
如果仅适用Nukkit，则将行为包合资源包都放在Nukkit目录下有关 netease的文件里
 
### NukkitMaster插件

NukkitMaster相当于Spigot服的SpigotMaster，内置封装了PyRPC、订单接口、消息收发等功能，API和使用方法和SpigotMaster一样。


### 自定义物品、方块和实体

Nukkit-MOT本身已经支持自定义物品、方块、实体的功能，可以参考[官方文档](https://www.nukkit-mot.com/zh/docs/tutorial-extras/custom/custom_item)
