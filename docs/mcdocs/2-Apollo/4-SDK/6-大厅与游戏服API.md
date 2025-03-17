---
sidebarDepth: 1
---

# <span id="6-大厅与游戏服API"></span>6-大厅与游戏服API

这里是lobbygame的一些通用的接口

<span id="存档"></span>
### 存档

<span id="QueryPlayerDataResult"></span>
#### QueryPlayerDataResult

- 描述

    不建议开发者使用，把mc地图中玩家存档字符串告知引擎。需要在queryPlayerDataEvent事件的监听函数中调用本api
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbCallIndex | int | 对应【queryPlayerDataEvent】事件的传入唯一ID |
    | success | bool | 是否成功 |
    | dataStr | str | mc地图中玩家存档字符串。 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.QueryPlayerDataResult(dbCallIndex, success, dataStr)
 ```
<span id="SavePlayerDataResult"></span>
#### SavePlayerDataResult

- 描述

    不建议开发者使用，把玩家数据存档状态告知引擎。mod中需要把玩家数据保存到mysql/mongo中。在savePlayerDataOnShutDownEvent/savePlayerDataEvent事件的监听函数中调用本api
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbCallIndex | int | 【savePlayerDataEvent/savePlayerDataOnShutDownEvent】事件中传入唯一ID |
    | success | bool | 存档是否成功 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SavePlayerDataResult(dbCallIndex, success)
 ```
<span id="SetUseDatabaseSave"></span>
#### SetUseDatabaseSave

- 描述

    设置是否使用数据库定时存档。定时存档会定时触发savePlayerDataEvent事件
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | bUseDatabase | bool | 是否使用数据库 |
    | dbName | str | 30个字符内的英文字符串，建议使用项目英文名 |
    | internalSaveSecond | int | 触发定时存档的时间间隔，单位秒 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetUseDatabaseSave(True, 'test', 30)
 ```
<span id="配置"></span>
### 配置

<span id="GetCommonConfig"></span>
#### GetCommonConfig

- 描述

    获取服务器公共配置，包括本服、所有db和所有功能服的配置，具体参见备注，注意可能不包含其他大厅服和游戏服配置，不能获取所有服的配置
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | 配置内容 |
- 备注

    服务器公共配置的示例如下，只展示了核心配置信息，注意可能不包含其他游戏服和大厅服配置
    ```
    {
    "apolloid":111,
    "extra_redis":{
    },
    "game_id":0,
    "game_key":"game_key",
    "gas_server_url":"http://127.0.0.1:111",
    "log_debug_level":true,
    "master":{
    "app_type":"master",
    "app_version":"1.21.0.release20210401",
    "gb":8,
    "ip":"127.0.0.1",
    "keep_alive_period":30,
    "master_port":0,
    "mods":"",
    "port":8000,
    "serverid":0,
    "type":"master"
    },
    "mongo":null,
    "mysql":{
    "database":"test_db",
    "host":"127.0.0.1",
    "password":"test_password",
    "port":3306,
    "user":"test_user"
    },
    "redis":{
    "host":"127.0.0.1",
    "password":"",
    "port":6379
    },
    "review_stage":0,
    "serverlist":[
    {
    "app_type":"lobby",
    "app_version":"1.21.0.release20210401",
    "gb":8,
    "ip":"127.0.0.1",
    "log_debug_level":false,
    "master_port":13003,
    "max_players":200,
    "mods":"neteaseRound",
    "optimum_players":0,
    "port":13002,
    "save":false,
    "serverid":4000,
    "type":"lobby"
    }
    ],
    "servicelist":[
    ],
    }
    ```
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
conf = lobbyGameApi.GetCommonConfig()
bDebugLevel = conf['log_debug_level'] #获取日志等级配置
 ```
<span id="GetMongoConfig"></span>
#### GetMongoConfig

- 描述

    获取mongo数据库的连接参数，对应公共配置中mongo配置，公共配置参见[GetCommonConfig](#GetCommonConfig)备注
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | tuple | (exist, host, user, password, database, port).exist：bool,是否存在mongo数据库配置; host：str, mongo数据库的地址;user：str,mongo数据库的访问用户; port：int, mongo数据库的端口; password：str,mongo数据库的访问密码;database：str,mongo数据库的数据库名 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
exist, host, user, password, database, port = lobbyGameApi.GetMongoConfig()
 ```
<span id="GetMysqlConfig"></span>
#### GetMysqlConfig

- 描述

    获取mysql数据库的连接参数，对应公共配置中mysql配置，公共配置参见[GetCommonConfig](#GetCommonConfig)备注
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | tuple | (exist, host, user, password, database, port).exist：bool,是否存在mysql数据库配置; host：string, mysql数据库的地址;user：string,mysql数据库的访问用户; port：int, mysql数据库的端口; password：string,mysql数据库的访问密码;database：string,mysql数据库的数据库名 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
exist, host, user, password, database, port = lobbyGameApi.GetMysqlConfig()
 ```
<span id="GetRedisConfig"></span>
#### GetRedisConfig

- 描述

    获取redis数据库的连接参数，对应公共配置中redis配置，公共配置参见[GetCommonConfig](#GetCommonConfig)备注
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | tuple | (exist, host, port, password).exist：bool,是否存在redis配置; host：str, redis数据库的地址;port：int, redis数据库的端口; password：str,redis数据库的访问密码 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
exist, host, port, password = lobbyGameApi.GetRedisConfig()
 ```
<span id="GetServerId"></span>
#### GetServerId

- 描述

    获取本服的服务器id，服务器id对应公共配置中serverid，公共配置参见[GetCommonConfig](#GetCommonConfig)备注
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 服务器id |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
serverId = lobbyGameApi.GetServerId()
 ```
<span id="地图"></span>
### 地图

<span id="DelForbidDragonEggTeleportField"></span>
#### DelForbidDragonEggTeleportField

- 描述

    删除禁止龙蛋传送的地图区域
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | fid | int | 区域的唯一ID，必须大于等于0 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否成功删除（对应fid无法找到返回删除失败） |
- 备注

    具体使用方式可以参考领地插件
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.DelForbidDragonEggTeleportField(1)
 ```
<span id="DelForbidFlowField"></span>
#### DelForbidFlowField

- 描述

    删除地图区域，不同的ID的区域边界会阻挡流体的流动
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | fid | int | 区域的唯一ID，必须大于等于0 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否成功删除（对应fid无法找到返回删除失败） |
- 备注

    具体使用方式可以参考领地插件
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.DelForbidFlowField(1)
 ```
<span id="SetEnableLimitArea"></span>
#### SetEnableLimitArea

- 描述

    设置地图最大区域，超过区域的地形不再生成
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | limit | bool | 是否启用地区区域限制 |
    | x | int | 地图区域的中心点 |
    | y | int | 地图区域的中心点 |
    | z | int | 地图区域的中心点 |
    | offsetX | int | 地图区域在x方向和z方向的最大偏移 |
    | offsetZ | int | 地图区域在x方向和z方向的最大偏移 |
- 返回值

    无
- 备注

    真实应用中，请用墙壁把区域围起来。
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetEnableLimitArea(limit, x, y, z, offsetX, offsetZ)
 ```
<span id="SetForbidDragonEggTeleportField"></span>
#### SetForbidDragonEggTeleportField

- 描述

    设置禁止龙蛋传送的地图区域
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | fid | int | 区域的唯一ID，必须大于等于0 |
    | dimensionId | int | 区域所在的维度 |
    | minPos | tuple(int) | 长方体区域的x，y，z值最小的点，x，y，z为方块的坐标，而不是像素坐标 |
    | maxPos | tuple(int) | 长方体区域的x，y，z值最大的点，x，y，z为方块的坐标，而不是像素坐标 |
    | priority | int | 区域的优先级，缺损时默认值为0，当一个点位于多个区域包围时，最终会以优先级最高的区域为准 |
    | isForbid | bool | 是否禁止龙蛋传送，为了处理嵌套区域之间的权限冲突，只要是独立的区域都需要设置是否禁止龙蛋传送 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否成功设置 |
- 备注

    具体使用方式可以参考领地插件
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.SetForbidDragonEggTeleportField(1, 0, (-5, -5, -5), (5, 5, 5), 0, True)
 ```
<span id="SetForbidFlowField"></span>
#### SetForbidFlowField

- 描述

    设置地图区域，不同的ID的区域边界会阻挡流体的流动
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | fid | int | 区域的唯一ID，必须大于等于0 |
    | dimensionId | int | 区域所在的维度 |
    | minPos | tuple(int) | 长方体区域的x，y，z值最小的点，x，y，z为方块的坐标，而不是像素坐标 |
    | maxPos | tuple(int) | 长方体区域的x，y，z值最大的点，x，y，z为方块的坐标，而不是像素坐标 |
    | priority | int | 区域的优先级，缺损时默认值为0，当一个点位于多个区域包围时，最终会以优先级最高的区域为准 |
    | isForbid | bool | 是否禁止流体流动，为了处理嵌套区域之间的权限冲突，只要是独立的区域都需要设置是否禁止流体流动 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否设置成功 |
- 备注

    具体使用方式可以参考领地插件
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.SetForbidFlowField(1, 0, (-5, -5, -5), (5, 5, 5), 0, True)
 ```
<span id="SetLevelGameType"></span>
#### SetLevelGameType

- 描述

    强制设置游戏的玩法模式
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | mode | int | 0生存模式，1创造模式，2冒险模式 |
- 返回值

    无
- 备注

    真实应用中，请在服务器Mod初始化时调用此函数
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetLevelGameType(2)
 ```
<span id="SetShowFakeSeed"></span>
#### SetShowFakeSeed

- 描述

    在客户端【设置】中，显示虚假的游戏地图种子
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | fakeSeed | int | 想要在客户端显示的虚假的地图种子，必须为正整数，可缺损，缺损时会自动随机一个数字 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 备注

    此API只影响调用之后才登录的玩家，所以强烈建议在Mod初始化时就调用此API
    
    此API调用效果会持久化保存到地图文件中
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.SetShowFakeSeed(123456789)
print "SetShowFakeSeed suc={}".format(suc)
 ```
<span id="StopShowFakeSeed"></span>
#### StopShowFakeSeed

- 描述

    在客户端【设置】中，显示真实的游戏地图种子
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 备注

    此API只影响调用之后才登录的玩家，所以强烈建议在Mod初始化时就调用此API
    
    此API调用效果会持久化保存到地图文件中
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.StopShowFakeSeed()
print "StopShowFakeSeed suc={}".format(suc)
 ```
<span id="玩家"></span>
### 玩家

<span id="GetConnectingProxyIdOfPlayer"></span>
#### GetConnectingProxyIdOfPlayer

- 描述

    获取玩家客户端连接的proxy服务器id
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | proxy服务器id |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
nickname = lobbyGameApi.GetConnectingProxyIdOfPlayer(playerId)
 ```
<span id="GetPlatformUid"></span>
#### GetPlatformUid

- 描述

    获取玩家登录端的uid，假如玩家从手机端登录，返回手机端的uid，否则返回PC端的uid
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int/long/None | 玩家不在线时返回None，在线时假如玩家从手机端登录，返回手机端的uid，否则返回PC端的uid |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
platformUid = lobbyGameApi.GetPlatformUid(playerId)
 ```
<span id="GetPlayerIdByUid"></span>
#### GetPlayerIdByUid

- 描述

    根据玩家uid获取玩家ID（也即playerId）。若玩家不在这个lobby/game，则返回为空字符
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 玩家id，也即玩家的playerId |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
playerId = lobbyGameApi.GetPlayerIdByUid(123)
 ```
<span id="GetPlayerLockResult"></span>
#### GetPlayerLockResult

- 描述

    不建议开发者使用，把获取玩家在线锁结果告知给引擎层
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | id | int | 对应【ServerGetPlayerLockEvent】事件的传入唯一ID |
    | success | bool | 是否成功 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.GetPlayerLockResult(id, suc)
 ```
<span id="GetPlayerNickname"></span>
#### GetPlayerNickname

- 描述

    获取玩家的昵称。
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 昵称 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
nickname = lobbyGameApi.GetPlayerNickname(playerId)
 ```
<span id="GetPlayerUid"></span>
#### GetPlayerUid

- 描述

    获取玩家的uid
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int/long | 玩家的uid；玩家的唯一标识 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
uid = lobbyGameApi.GetPlayerUid(playerId)
 ```
<span id="GetUidIsSilent"></span>
#### GetUidIsSilent

- 描述

    根据玩家uid获取是否被禁言
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 0:全局禁言，1:普通禁言，2:没有被禁言 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
isSilent = lobbyGameApi.GetUidIsSilent(123)
 ```
<span id="HidePlayerFootprint"></span>
#### HidePlayerFootprint

- 描述

    隐藏某个玩家的会员脚印外观
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | str | playerId | 玩家id |
    | hide | bool | 是否隐藏，True为隐藏脚印，False为恢复脚印显示 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | True:设置成功<br>False:设置失败 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
# 隐藏玩家的会员脚印外观
result = lobbyGameApi.HidePlayerFootprint(playerId, True)
 ```
<span id="HidePlayerMagicCircle"></span>
#### HidePlayerMagicCircle

- 描述

    隐藏某个玩家的会员法阵外观
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | str | playerId | 玩家id |
    | hide | bool | 是否隐藏，True为隐藏法阵，False为恢复法阵显示 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | True:设置成功<br>False:设置失败 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
# 隐藏玩家的会员法阵外观
result = lobbyGameApi.HidePlayerMagicCircle(playerId, True)
 ```
<span id="IsPlayerPeUser"></span>
#### IsPlayerPeUser

- 描述

    获取玩家是否从手机端登录
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool/None | 玩家不在线时返回None，在线时返回True代表此玩家本次从手机端登录，返回False代表此玩家从PC端登录 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
isPeUser = lobbyGameApi.IsPlayerPeUser(playerId)
 ```
<span id="ReleasePlayerLockResult"></span>
#### ReleasePlayerLockResult

- 描述

    不建议开发者使用，把释放玩家在线锁结果告知给引擎层
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | id | int | 对应【ServerReleasePlayerLockEvent/ServerReleasePlayerLockOnShutDownEvent】事件传入的唯一ID |
    | success | bool | 是否成功 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.ReleasePlayerLockResult(id, suc)
 ```
<span id="SetAutoRespawn"></span>
#### SetAutoRespawn

- 描述

    设置是否启用自动重生逻辑
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | autoRespawn | bool | 是否启用自动重生逻辑 |
    | internalSeconds | int | 每隔多少秒，检查是否满足自动重生条件 |
    | minY | int | 高度低于多少，就会触发自动重生逻辑 |
    | x | int | 自动重生逻辑触发后，重生点的坐标 |
    | y | int | 自动重生逻辑触发后，重生点的坐标 |
    | z | int | 自动重生逻辑触发后，重生点的坐标 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetAutoRespawn(autoRespawn, internalSeconds, minY, x, y, z)
 ```
<span id="ShieldPlayerJoinText"></span>
#### ShieldPlayerJoinText

- 描述

    是否屏蔽客户端左上角 “xxx 加入了游戏”的提示
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | bShield | bool | True，不显示提示；False，显示提示 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.ShieldPlayerJoinText(True)
 ```
<span id="TryToKickoutPlayer"></span>
#### TryToKickoutPlayer

- 描述

    把玩家踢下线，message中的文字会显示在客户端的断线提示中
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家对象的entityId |
    | message | str | 踢掉玩家的理由，默认为空 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.TryToKickoutPlayer(playerId, "GM把你踢下线")
 ```
<span id="调试"></span>
### 调试

<span id="StartChunkProfile"></span>
#### StartChunkProfile

- 描述

    开始启动服务端区块读写性能统计，启动后调用[StopChunkProfile](#StopChunkProfile)即可获得近期的服务端区块读写信息
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 备注

    启动区块读写信息记录有比较大的消耗，不建议长期启用
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.StartChunkProfile()
print "StartChunkProfile suc={}".format(suc)
# 之后通过计时器或者其他触发方式调用StopChunkProfile
data = lobbyGameApi.StopChunkProfile()
for singleData in data:
        print "time is {}".format(time.strftime("%H:%M:%S", time.localtime(singleData["timestamp"])))
        print "saveChunks is {}".format(singleData["saveChunks"])
        print "loadChunks is {}".format(singleData["loadChunks"])
 ```
<span id="StopChunkProfile"></span>
#### StopChunkProfile

- 描述

    结束服务端区块读写性能统计，并返回近期区块读写信息，与[StartChunkProfile](#StartChunkProfile)配合使用
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list(dict) | 每个字典都是1秒内的区块读写信息，按照时间线排序，timestamp：类型为int，统计的具体时间（秒）；saveChunks：类型为list(dict)，1秒内写chunk的坐标和维度；loadChunks：类型为list(dict)，1秒内读chunk的坐标和维度 |
- 备注

    启动区块读写信息记录有比较大的消耗，不建议长期启用
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
suc = lobbyGameApi.StartChunkProfile()
print "StartChunkProfile suc={}".format(suc)
# 之后通过计时器或者其他触发方式调用StopChunkProfile
data = lobbyGameApi.StopChunkProfile()
for singleData in data:
        print "time is {}".format(time.strftime("%H:%M:%S", time.localtime(singleData["timestamp"])))
        print "saveChunks is {}".format(singleData["saveChunks"])
        print "loadChunks is {}".format(singleData["loadChunks"])
 ```
<span id="关服"></span>
### 关服

<span id="SetGracefulShutdownOk"></span>
#### SetGracefulShutdownOk

- 描述

    不建议开发者使用，设置脚本层的优雅关机逻辑已经执行完毕，引擎可以开始优雅关机了
    
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetGracefulShutdownOk()
 ```
<span id="SetShutdownOk"></span>
#### SetShutdownOk

- 描述

    不建议开发者使用，设置脚本层的强制关机逻辑已经执行完毕，引擎可以开始强制关机了
    
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetShutdownOk()
 ```
<span id="ShutdownServer"></span>
#### ShutdownServer

- 描述

    强制关机
    
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.ShutdownServer()
 ```
<span id="服务器"></span>
### 服务器

<span id="CheckMasterExist"></span>
#### CheckMasterExist

- 描述

    检查服务器是否与master建立连接
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否与master建立连接 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
exist = lobbyGameApi.CheckMasterExist()
 ```
<span id="GetLastFrameTime"></span>
#### GetLastFrameTime

- 描述

    获取服务端脚本上一帧运行时间
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 服务端脚本上一帧运行时间,单位纳秒 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lastFrameTime = lobbyGameApi.GetLastFrameTime()
 ```
<span id="GetOnlinePlayerNum"></span>
#### GetOnlinePlayerNum

- 描述

    获取当前服务器的在线人数
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 当前服务器在线人数 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
num = lobbyGameApi.GetOnlinePlayerNum()
 ```
<span id="GetServerProtocolVersion"></span>
#### GetServerProtocolVersion

- 描述

    获取服务器的协议版本号
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 服务器的协议版本号 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
protocolVersion = lobbyGameApi.GetServerProtocolVersion()
 ```
<span id="IsServiceConnected"></span>
#### IsServiceConnected

- 描述

    检查服务器是否与某个service建立连接
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 是否与service建立连接 |
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
bConnected = lobbyGameApi.IsServiceConnected(8000)
 ```
<span id="IsShowDebugLog"></span>
#### IsShowDebugLog

- 描述

    当前服务器是否打印debug等级的日志
    
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | True，打印debug log，否则不打印debug log |
- 备注

    基本无需关注
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
bDebug = lobbyGameApi.IsShowDebugLog()
 ```
<span id="ResetServer"></span>
#### ResetServer

- 描述

    重置服务器
    
- 返回值

    无
- 备注

    
    注意，对于生存服，若使用了存档A，则重置后仍使用存档A，且重置过程中不会保存地图。
    
    
    重置本服的方法：重置前确保玩家退出本服，重置过程不允许玩家进入本服，本服启动后可以发消息给master或service，告知本服就绪，然后玩家可以进入本服了
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.ResetServer()
 ```
<span id="切服"></span>
### 切服

<span id="TransferToOtherServer"></span>
#### TransferToOtherServer

- 描述

    玩家转移到指定类型的服务器，假如同类服务器有多个，就根据负载均衡选择一个
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
    | typeName | str | 目标服务器的类型，对应MCStudio中配置：服务器配置->游戏配置->类型 |
    | transferParam | str | 切服传入参数，默认空字符串。当玩家跳转到目标服务器触发AddServerPlayerEvent事件时，AddServerPlayerEvent事件会携带这个参数 |
    | callback | function | 回调函数，返回转服API经过master的逻辑判定之后的结果，参数有三个，isSuc(bool), reasonCode(int), message(str)，isSuc返回是否成功；reasonCode代表失败的错误码，message为失败的理由的中文描述 |
- 返回值

    无
- 备注

    玩家只会切到一个可用的服务，也即要求目标服务器是正常工作状态，不能是断开连接、滚动关服、已关服等异常状态，若转移的目标服务器不可用，则切服失败
    
    
- 示例

```python
import json
import lobbyGame.netgameApi as lobbyGameApi
transData = {'position' : [1,2,3]}
def cbFunc(isSuc, reasonCode, message):
        print "TransferToOtherServer callback, isSuc={} reason={}".format(isSuc, message)
lobbyGameApi.TransferToOtherServer('123', 'game', json.dumps(transData), cbFunc)
 ```
<span id="TransferToOtherServerById"></span>
#### TransferToOtherServerById

- 描述

    玩家迁移到指定服务器id的服务器
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
    | serverId | str | 目标服务器id，服务器id对应公共配置中serverid，公共配置参见[GetCommonConfig](#GetCommonConfig)备注 |
    | transferParam | str | 切服传入参数，默认空字符串。当玩家跳转到目标服务器触发AddServerPlayerEvent事件时，AddServerPlayerEvent事件会携带这个参数 |
    | callback | function | 回调函数，返回转服API经过master的逻辑判定之后的结果，参数有三个，isSuc(bool), reasonCode(int), message(str)，isSuc返回是否成功；reasonCode代表失败的错误码，message为失败的理由的中文描述 |
- 返回值

    无
- 备注

    用法详情见示例Mod sample
    
    要求目标服务器是正常工作状态，不能是断开连接、滚动关服、已关服等异常状态，若转移的目标服务器不可用，则切服失败
    
    
- 示例

```python
import json
import lobbyGame.netgameApi as lobbyGameApi
transData = {'position' : [1,2,3]}
def cbFunc(isSuc, reasonCode, message):
        print "TransferToOtherServerById callback, isSuc={} reason={}".format(isSuc, message)
lobbyGameApi.TransferToOtherServerById('123', 2000000, json.dumps(transData), cbFunc)
 ```
<span id="主城模式"></span>
### 主城模式

<span id="SetCityMode"></span>
#### SetCityMode

- 描述

    设置游戏为主城模式：包括有无法改变地形，不切换日夜，不改变天气，不刷新生物等限制
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | isCityMode | bool | 是否为主城模式 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.SetCityMode(isCityMode)
 ```
<span id="HTTP服务器"></span>
### HTTP服务器

<span id="RegisterOpCommand"></span>
#### RegisterOpCommand

- 描述

    注册一个新的HTTP接口
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | url | str | 接口url |
    | callback | function | 响应HTTP请求的实例函数，参数有两个，第一个参数clientId，类型为int，是请求方的唯一标识，用于返回请求处理结果；第二个参数requestData，类型为dict，包含HTTP请求的参数（requestBody） |
- 返回值

    无
- 备注

    当多个游戏服/功能服都注册了同一个url的时候，请求会默认被广播到所有注册了这个url的服务器，返回结果中也会综合所有服务器的返回结果
    
    通过在请求中增加opUid【类型为int】参数，可以指定此请求仅转发给对应uid当前在线的服务器
    
    通过在请求中增加opServerIds【类型为list(int)】参数，可以指定此请求仅转发给服务器ID在opServerIds列表中的服务器
    
    通过在请求中增加opServerType【类型为str】参数，可以指定此请求仅转发给服务器类型为opServerType的服务器
    
    当此API注册的url和【masterHttp.RegisterMasterHttp】注册的url相同时，两者只能保留一个，晚执行的语句会顶替掉先执行语句的回调
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
class GameExtraApiSystem(ServerSystem):
        def __init__(self, namespace, systemName):
                ServerSystem.__init__(self, namespace, systemName)
                lobbyGameApi.RegisterOpCommand("/api/game-url-test1", self.OnGameUrlTest1)
        def OnGameUrlTest1(self, clientId, requestData):
                print "OnGameUrlTest1", clientId, requestData
                # 返回处理结果
                lobbyGameApi.ResponseOpCommandSuccess(clientId, {"result":"exec success"})
 ```
<span id="ResponseOpCommandFail"></span>
#### ResponseOpCommandFail

- 描述

    发送HTTP的失败Response，支持异步返回，返回时候指定请求传入的clientId
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | clientId | int | 请求唯一id，识别HTTP请求。 |
    | code | int | 请求的失败原因code |
    | message | str | 请求的失败原因的文本 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
class GameExtraApiSystem(ServerSystem):
        def __init__(self, namespace, systemName):
                ServerSystem.__init__(self, namespace, systemName)
                lobbyGameApi.RegisterOpCommand("/api/game-url-test2", self.OnServiceUrlTest2)
        
        def OnServiceUrlTest2(self, clientId, requestData):
                print "OnServiceUrlTest2", clientId, requestData
                # 返回处理结果
                lobbyGameApi.ResponseOpCommandFail(clientId, 1, "exec failed")
 ```
<span id="ResponseOpCommandSuccess"></span>
#### ResponseOpCommandSuccess

- 描述

    发送HTTP的成功Response，支持异步返回，返回时候指定请求传入的clientId
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | clientId | int | 请求唯一id，识别HTTP请求。 |
    | entity | dict | 请求中需要返回的内容，可自定义key/value的含义 |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
class GameExtraApiSystem(ServerSystem):
        def __init__(self, namespace, systemName):
                ServerSystem.__init__(self, namespace, systemName)
                lobbyGameApi.RegisterOpCommand("/api/game-url-test1", self.OnGameUrlTest1)
        def OnGameUrlTest1(self, clientId, requestData):
                print "OnGameUrlTest1", clientId, requestData
                # 返回处理结果
                lobbyGameApi.ResponseOpCommandSuccess(clientId, {"result":"exec success"})
 ```
<span id="UnRegisterOpCommand"></span>
#### UnRegisterOpCommand

- 描述

    注销一个已注册的HTTP接口
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | url | str | 接口url |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
class GameExtraApiSystem(ServerSystem):
        def __init__(self, namespace, systemName):
                ServerSystem.__init__(self, namespace, systemName)
                lobbyGameApi.RegisterOpCommand("/api/game-url-test1", self.OnGameUrlTest1)
        
        def Destroy(self):
                lobbyGameApi.UnRegisterOpCommand("/api/game-url-test1")
        
        def OnGameUrlTest1(self, clientId, requestData):
                print "OnGameUrlTest1", clientId, requestData
                # 返回处理结果
                lobbyGameApi.ResponseOpCommandSuccess(clientId, {"result":"exec success"})
 ```
<span id="商城"></span>
### 商城

<span id="NotifyClientToOpenShopUi"></span>
#### NotifyClientToOpenShopUi

- 描述

    通知客户端打开商城界面
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | playerId | str | 玩家id |
- 返回值

    无
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.NotifyClientToOpenShopUi('123456')
 ```
<span id="性能开关"></span>
### 性能开关

<span id="ChangeAllPerformanceSwitch"></span>
#### ChangeAllPerformanceSwitch

- 描述

    整体关闭/打开预定义的游戏原生逻辑，所有的逻辑默认状态均为【开】（也就是is_disable=False），
    只有当调用此接口关闭之后，才会进入到【关】的状态，关闭这类原生逻辑能够提
    高服务器的性能，承载更高的同时在线人数，同时也会使一些生存服的玩法失效。另外，强烈建议在服务
    器初始化时调用此接口，同时不要在服务器运行中途修改
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | is_disable | bool | True代表【关】，False代表【开】 |
    | extra | list | 剔除掉不需要改变开关状态的具体功能的枚举值列表。默认为空 |
- 返回值

    无
- 备注

    当extra的值为None的时候，默认影响到的开关不包括【LoadSavedEntityFromChunk】。
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.ChangeAllPerformanceSwitch(True)
 ```
<span id="ChangePerformanceSwitch"></span>
#### ChangePerformanceSwitch

- 描述

    关闭/打开某个游戏原生逻辑，所有的逻辑默认状态均为【开】（也就是is_disable=False），
    只有当调用此接口关闭之后，才会进入到【关】的状态，关闭这类原生逻辑能够提高服务器的性能，
    承载更高的同时在线人数，同时也会使一些生存服的玩法失效。另外，强烈建议在服务器初始化时调用此接口，同时不要在服务器运行中途修改
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | int | 具体功能的枚举值，详情见备注 |
    | isDisable | bool | True代表【关】，False代表【开】 |
- 返回值

    无
- 备注

    所有开关的枚举值以及涵义
    ```python
    class DisableSwitch(object):
    '''
    -------------------ChunkLoadUsePriority-------------------
    开关介绍：加载chunk时，是否根据chunk的坐标与当前在线玩家的坐标计算加权优先级（性能较低），disable后所有chunk的加载优先级相同
    适用情况：提供了特定地图，不需要服务器生成地图
    影响mod sdk的范围：不影响mod sdk
    '''
    ChunkLoadUsePriority = 1
    '''
    -------------------RedstoneOnTick-------------------
    开关介绍：屏蔽红石电路逻辑，disable后红石相关逻辑不生效
    适用情况：未使用红石以及电路相关功能
    影响mod sdk的范围：
    1、能自定义红石
    2、服务端事件：不触发BlockStrengthChangedServerEvent
    3、服务端组件：redStone不生效
    '''
    RedstoneOnTick = 2
    '''
    -------------------ChunkSaveOnTick-------------------
    开关介绍：否存档chunk，disable后对地图chunk的修改不会再存档到地图文件
    适用情况：地图不会改变
    影响mod sdk的范围：
    1、服务端事件都不受影响
    2、受影响API：
    （1）SetBlockTileEntityCustomData 设置的内容不会保存到地图
    （2）SetBlockStates 方块状态不会保存到地图
    （3）SetBlockNew 可以设置方块，但是设置内容不保存到地图
    '''
    ChunkSaveOnTick = 3
    '''
    -------------------WalkAnimPostEvent-------------------
    开关介绍：是否关闭服务器的移动开始/移动结束事件（性能较低），disable后服务器引擎层不再dispatch上述两个事件
    适用情况：没有监听WalkAnimBeginServerEvent事件和WalkAnimEndServerEvent事件（一般可以用客户端的WalkAnimBeginClientEvent与WalkAnimEndClientEvent代替）
    影响mod sdk的范围：不触发WalkAnimBeginServerEvent事件和WalkAnimEndServerEvent事件
    '''
    WalkAnimPostEvent = 4
    '''
    -------------------RecipesSyncOnLogin-------------------
    开关介绍：是否在登录完成后发送服务器配方表，disable后客户端无法收到登录后的配方表，客户端无法进行合成，烧炼以及炼药
    适用情况：玩家不进行合成，烧炼以及炼药
    影响mod sdk的范围：不影响sdk
    '''
    RecipesSyncOnLogin = 5
    '''
    -------------------UpdateGlidingOnTick-------------------
    开关介绍：是否屏蔽玩家的滑翔功能，disable后一旦进入滑翔状态，将会出现状态更新异常
    适用情况：玩家不进行滑翔操作
    影响mod sdk的范围：不影响sdk
    '''
    UpdateGlidingOnTick = 6
    '''
    -------------------UpdateContainerOnTick-------------------
    开关介绍：是否执行容器的每帧刷新逻辑，disable后熔炉、炼药锅、高炉、烟熏炉、酿造台无法使用
    适用情况：没有使用熔炉、炼药锅、高炉、烟熏炉、酿造台
    影响mod sdk的范围：不影响sdk
    '''
    UpdateContainerOnTick = 7
    '''
    -------------------PushEntitiesOnTick-------------------
    开关介绍：是否执行玩家推挤物品/entity的逻辑，disable后玩家无法推动地图上的物品/entity
    适用情况：不考虑玩家推挤功能
    影响mod sdk的范围：
    服务端事件：不触发OnPlayerHitMobServerEvent
    服务端组件：组件actorPushable不生效
    '''
    PushEntitiesOnTick = 8
    '''
    -------------------UpdateInsideBlockOnTick-------------------
    开关介绍：是否执行entity在block中的每帧特殊判定逻辑，disable后传送门无法启动传送，另外在仙人掌侧面、在甜浆果丛上都不会掉血
    适用情况：不用考虑上面特殊逻辑
    影响mod sdk的范围：
    服务端事件：不触发 WillTeleportToServerEvent、DimensionChangeFinishServerEvent、DimensionChangeServerEvent
    服务端组件：没有受到影响
    '''
    UpdateInsideBlockOnTick = 9
    '''
    -------------------BlockDamageOnTick-------------------
    开关介绍：是否执行entity在特殊地形上的每帧特殊判定逻辑，disable后站在岩浆块、点燃的营火上面不会受伤
    适用情况：不用考虑上面特殊逻辑
    影响mod sdk的范围：不影响sdk
    '''
    BlockDamageOnTick = 10
    '''
    -------------------SendDirtyActorPerTick-------------------
    开关介绍：是否每帧检查entity属性变化并同步，disable之后从每帧检测降频到每秒检测。会导致玩家掉血后延迟一秒才会同步到本地
    适用情况：允许延迟同步生物属性
    影响mod sdk的范围：SyncModDataServerEvent事件会延迟触发
    '''
    SendDirtyActorPerTick = 13
    '''
    -------------------ApplyExhaustionOnTick-------------------
    开关介绍：是否执行玩家移动时的饥饿逻辑，disable后玩家走路，跑步，游泳不会消耗饥饿度，跳跃，饥饿效果等也不会减饥饿值
    适用情况：饥饿值不变，或使用了SetDisableHunger接口屏蔽了玩家饥饿度
    影响mod sdk的范围：不影响sdk
    '''
    ApplyExhaustionOnTick = 14
    '''
    -------------------UpdateInteractionOnTick-------------------
    开关介绍：是否每帧检查人物交互，disable之后，准心指向可交互实体时不会显示交互按钮，但是长按依然可以触发交互
    适用情况：不考虑交互的文字提示
    影响mod sdk的范围：不触发OnCarriedNewItemChangedServerEvent事件
    '''
    UpdateInteractionOnTick = 15
    '''
    -------------------UpdateOffhandItemOnTick-------------------
    开关介绍：是否每帧检查人物副手装备属性变化并同步，disable之后副手持有地图位置不会更新
    适用情况：副手没有使用地图
    影响mod sdk的范围：不影响sdk
    '''
    UpdateOffhandItemOnTick = 16
    '''
    -------------------PickEntityOnTick-------------------
    开关介绍：是否每帧检查附近可捡取的物品道具，disable之后会捡不到物品
    适用情况：玩家不捡取附近道具
    影响mod sdk的范围：
    1、服务端事件：不触发ServerPlayerTryTouchEvent
    2、服务端组件：player组件中SetPickUpArea 无用
    '''
    PickEntityOnTick = 17
    '''
    -------------------SyncComplexItemOnTick-------------------
    开关介绍：是否每帧同步玩家地图（ Map）或空地图（ Empty Map）内容，disable之后不同步地图或空白地图
    适用情况：不使用地图（ Map）或空地图（ Empty Map）
    影响mod sdk的范围：不影响sdk
    '''
    SyncComplexItemOnTick = 18
    '''
    -------------------UpdateChunkPerTick-------------------
    开关介绍：是否每帧执行chunk的tick逻辑，disable之后从每帧执行降频到4帧一次
    适用情况：地图上的实体逻辑、方块实体逻辑、方块的随机刻的更新存在延迟
    影响mod sdk的范围：不影响sdk
    '''
    UpdateChunkPerTick = 19
    '''
    -------------------SpawnMobsOnTick-------------------
    开关介绍：是否自动生成怪物，disable之后游戏中不会自动生成怪物
    适用情况：游戏中不自动生成怪物，并且生物不会伴随结构生成（例如村庄不会生成村民）
    影响mod sdk的范围：不触发ServerSpawnMobEvent服务端事件
    '''
    SpawnMobsOnTick = 20
    '''
    -------------------UpdateBlocksOnTick-------------------
    开关介绍：是否每帧刷新block逻辑，disable之后闪电、骷髅陷阱不再刷新，block不受天气影响，不执行随机刻 (Random tick)
    适用情况：适用于地图不变、天气不变场景
    影响mod sdk的范围：不触发BlockRandomTickServerEvent服务端事件
    '''
    UpdateBlocksOnTick = 22
    '''
    -------------------UpdateWeatherOnTick-------------------
    开关介绍：是否每帧执行天气刷新逻辑，disable之后，天气不再刷新（打雷下雨）,季节也不变
    适用情况：天气和季节不变
    影响mod sdk的范围：不影响sdk
    '''
    UpdateWeatherOnTick = 23
    '''
    -------------------LoadSavedEntityFromChunk-------------------
    开关介绍：是否不加载chunk存档中的entity，disable之后，entity的存档将失效
    适用情况：不从地图中加载entity，不存档entity
    影响mod sdk的范围：不影响sdk
    '''
    LoadSavedEntityFromChunk = 27
    ```
    
    
- 示例

```python
import lobbyGame.netgameApi as lobbyGameApi
import lobbyGame.netgameConsts as netgameConsts
lobbyGameApi.ChangePerformanceSwitch(netgameConsts.DisableSwitch.ChunkLoadUsePriority, True)
 ```
这里是lobby的一些接口

<span id="主城模式"></span>
### 主城模式

<span id="SetCityMode"></span>
#### SetCityMode

- 描述

    【废弃】设置游戏为主城模式：包括有无法改变地形，不切换日夜，不改变天气，不刷新生物等限制
    
- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | isCityMode | bool | 是否为主城模式 |
- 返回值

    无
- 示例

```python
import lobby.netgameApi as lobbyApi
lobbyApi.SetCityMode(isCityMode)
 ```
