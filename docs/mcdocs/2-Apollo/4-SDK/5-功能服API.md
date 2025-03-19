---
sidebarDepth: 1
---

# <span id="5-功能服API"></span>5-功能服API

这里是Service的一些接口

<span id="配置"></span>
### 配置

<span id="GetCommonConfig"></span>
#### GetCommonConfig

- 描述

    获取服务器公共配置，包括所有服务器和db的配置，具体参见备注

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | 配置内容 |
- 备注

    服务器公共配置的示例如下，只展示了核心配置信息：
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
    "app_type":"proxy",
    "app_version":"1.21.0.release20210401",
    "gb":8,
    "ip":"127.0.0.1",
    "log_debug_level":false,
    "master_port":11003,
    "max_players":0,
    "mods":"",
    "optimum_players":0,
    "port":11002,
    "save":false,
    "serverid":2000,
    "type":"proxy"
    },
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
import service.netgameApi as netServiceApi
conf = netServiceApi.GetCommonConfig()
serverlist = conf['serverlist'] #获取serverlist配置
serverlist = conf['log_debug_level'] #获取日志等级配置
 ```
<span id="GetServerId"></span>
#### GetServerId

- 描述

    获取服务器id，服务器id对应公共配置中serverid，公共配置参见[GetCommonConfig](#GetCommonConfig)备注

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 服务器id |
- 示例

```python
import service.netgameApi as netServiceApi
serverId = netServiceApi.GetServerId()
 ```
<span id="GetServerLoadedModsById"></span>
#### GetServerLoadedModsById

- 描述

    根据服务器id获取服务器加载mod列表

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverId | int | 服务器id，id为0表示master |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list(str) | 服务器mod列表 |
- 示例

```python
import service.netgameApi as netServiceApi
#返回的一个示例：["neteaseAnnounce", "neteaseAuth", "neteaseShop"]
mods = netServiceApi.GetServerLoadedModsById(4000)
 ```
<span id="GetServerLoadedModsByType"></span>
#### GetServerLoadedModsByType

- 描述

    根据服务器类型获取服务器加载mod列表。若同种类型服务器配置了不同的mod，则返回其中一个对应mod列表。

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverType | str | 服务器类型 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list(str) | 服务器mod列表 |
- 示例

```python
import service.netgameApi as netServiceApi
#返回的一个示例：["neteaseAnnounce", "neteaseAuth", "neteaseShop"]
mods = netServiceApi.GetServerLoadedModsByType("survivalGame")
 ```
<span id="GetServiceConfig"></span>
#### GetServiceConfig

- 描述

    获取service配置，该配置对应公共配置中servicelist下对应service的配置，公共配置参见[GetCommonConfig](#GetCommonConfig)备注

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | 配置内容 |
- 示例

```python
import service.netgameApi as netServiceApi
serviceConf = netServiceApi.GetServiceConfig()
print serviceConf
# 结果实例如下：
# {
#        "app_type": "service",
#        "app_version": "1.15.0.release20191128",
#        "http_port": 8520,
#        "ip": "127.0.0.1",
#        "mods": "service",
#        "module_names": [
#                "netease_salog_0",
#                "netease_salog_1",
#               "netease_uniqueid",
#               "netease_stats_log_0",
#               "netease_stats_log_1",
#               "netease_stats_monitor"
#        ],
#        "serverid": 11,
#        "type": "service"
# }
 ```
<span id="通用"></span>
### 通用

<span id="StartRecordEvent"></span>
#### StartRecordEvent

- 描述

    开始启动大厅服/游戏服与功能服之间的脚本事件收发包统计，启动后调用[StopRecordEvent()](#StopRecordEvent)即可获取两个函数调用之间引擎收发包的统计信息

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import service.netgameApi as netServiceApi
suc = netServiceApi.StartRecordEvent()
# 之后通过计时器或者其他触发方式调用StopRecordEvent
result = netServiceApi.StopRecordEvent()
# sendEvent对应的value保存了功能服主动发送给大厅服/游戏服、甚至客户端的事件统计
for eventName, data in result["sendEvent"].iteritems():
        print "sendEvent event[{}] send={} sendSize={}".format(eventName, data["send_num"], data["send_size"])
# sendRequest对应的value保存了功能服发送给其他的功能服事件，以及对应的功能服返回结果的事件
for eventName, data in result["sendRequest"].iteritems():
        print "sendRequest event[{}] request={} requestSize={} response={} responseSize={}".format(eventName, data["request_num"], data["request_size"], data["response_num"], data["response_size"])
# recvRequest对应的value保存了功能服接收到的来自其他服务端的请求，以及对应的返回结果的事件
for eventName, data in result["recvRequest"].iteritems():
        print "recvRequest event[{}] request={} requestSize={} response={} responseSize={}".format(eventName, data["request_num"], data["request_size"], data["response_num"], data["response_size"])
 ```
<span id="StopRecordEvent"></span>
#### StopRecordEvent

- 描述

    停止大厅服/游戏服与功能服之间的脚本事件收发包统计并输出结果，与[StartRecordEvent()](#StartRecordEvent)配合使用，输出结果为字典，具体见示例

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | 收发包信息，具体见示例，假如没有调用过StartRecordEvent，则返回为None |
- 示例

```python
import service.netgameApi as netServiceApi
suc = netServiceApi.StartRecordEvent()
# 之后通过计时器或者其他触发方式调用StopRecordEvent
result = netServiceApi.StopRecordEvent()
# sendEvent对应的value保存了功能服主动发送给大厅服/游戏服、甚至客户端的事件统计
for eventName, data in result["sendEvent"].iteritems():
        print "sendEvent event[{}] send={} sendSize={}".format(eventName, data["send_num"], data["send_size"])
# sendRequest对应的value保存了功能服发送给其他的功能服事件，以及对应的功能服返回结果的事件
for eventName, data in result["sendRequest"].iteritems():
        print "sendRequest event[{}] request={} requestSize={} response={} responseSize={}".format(eventName, data["request_num"], data["request_size"], data["response_num"], data["response_size"])
# recvRequest对应的value保存了功能服接收到的来自其他服务端的请求，以及对应的返回结果的事件
for eventName, data in result["recvRequest"].iteritems():
        print "recvRequest event[{}] request={} requestSize={} response={} responseSize={}".format(eventName, data["request_num"], data["request_size"], data["response_num"], data["response_size"])
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
import service.netgameApi as serviceNetgameApi
class ServiceApiSys(ServiceSystem):
        def __init__(self,namespace,systemName):
                ServiceSystem.__init__(self, namespace, systemName)
                serviceNetgameApi.RegisterOpCommand("/api/game-url-test1", self.OnServiceUrlTest1)

        def OnServiceUrlTest1(self, clientId, requestData):
                print "OnServiceUrlTest1", clientId, requestData
                # 返回处理结果
                serviceNetgameApi.ResponseOpCommandSuccess(clientId, {"result":"exec success"})
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
import service.netgameApi as serviceNetgameApi
class ServiceApiSys(ServiceSystem):
        def __init__(self,namespace,systemName):
                ServiceSystem.__init__(self, namespace, systemName)
                serviceNetgameApi.RegisterOpCommand("/api/game-url-test3", self.OnServiceUrlTest3)

        def OnServiceUrlTest3(self, clientId, requestData):
                print "OnServiceUrlTest3", clientId, requestData
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
import service.netgameApi as serviceNetgameApi
class ServiceApiSys(ServiceSystem):
        def __init__(self,namespace,systemName):
                ServiceSystem.__init__(self, namespace, systemName)
                serviceNetgameApi.RegisterOpCommand("/api/game-url-test1", self.OnServiceUrlTest1)

        def OnServiceUrlTest1(self, clientId, requestData):
                print "OnServiceUrlTest1", clientId, requestData
                # 返回处理结果
                serviceNetgameApi.ResponseOpCommandSuccess(clientId, {"result":"exec success"})
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
import service.netgameApi as serviceNetgameApi
class ServiceApiSys(ServiceSystem):
        def __init__(self,namespace,systemName):
                ServiceSystem.__init__(self, namespace, systemName)
                serviceNetgameApi.RegisterOpCommand("/api/game-url-test1", self.OnServiceUrlTest1)

        def Destroy(self):
                serviceNetgameApi.UnRegisterOpCommand("/api/game-url-test1")

        def OnServiceUrlTest1(self, clientId, requestData):
                print "OnServiceUrlTest1", clientId, requestData
                # 返回处理结果
                serviceNetgameApi.ResponseOpCommandSuccess(clientId, {"result":"exec success"})
 ```
这里是service的一些HTTP接口

<span id="HTTP服务器"></span>
### HTTP服务器

<span id="RegisterServiceHttp"></span>
#### RegisterServiceHttp

- 描述

    注册一个新的HTTP接口

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | url | string | 接口url |
    | binder | instance | 响应HTTP请求的实例 |
    | func | function | 响应HTTP请求的实例函数 |
- 返回值

    无
- 备注

    若您在机器上架设了自建服务来访问service的http服务（插件通过api调用不需要），那么需要遵循以下规范：
    1. 登录机器，到master目录下打开netgame_common.json，复制apollo_secret的值（该secret不同网络服不一样，不同阶段也不一样，生成之后不会改变）
    2. 在http请求头中添加Request-Timestamp字段，值为当前的秒时间戳
    3. 在http请求头中添加Request-Sign字段，值为md5(请求方法+url+请求参数+上述时间戳+apollo_secret的值)
    例如md5(POST/netease/hunter-debug{}1665561365bJetTlJRa60H2Pt3qL6duTIGu0MypJuh) = 84b9ffadbf797cc9d2772fdbc86f411b


- 示例

```python
import service.serviceHttp as serviceHttp
class HttpHandler(object):
        def __init__(self):
                # 设置接口URI及回调
                url = '/kick-user'
                func = self.HttpTest
                # 注册
                serviceHttp.RegisterServiceHttp(url, self, func)
        def HttpTest(self, clientId, requestBody):
                # clientId识别请求唯一id，send_http_response中要携带该参数
                # requestBody为post body内容。如果是json格式，则可以通过下面方式加载内容。
                # import ujson as json
                # request = json.loads(requestBody)
                # 返回处理结果。code必须为1表示处理成功，否则master请求时会认为请求失败。
                response = '{"code":1,"message":"ok"}'
                serviceHttp.SendHttpResponse(clientId, response)
 ```
<span id="SendHttpRequestToMaster"></span>
#### SendHttpRequestToMaster

- 描述

    给master发送http请求

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | requestUrl | string | 请求url，例如“/test-reqeust” |
    | message | string | HTTP post body，是个json字符串 |
- 返回值

    无
- 示例

```python
import service.serviceHttp as serviceHttp
params = {
        "message":"content",
        "code":1
}
url = "/test-reqeust"
serviceHttp.SendHttpRequestToMaster(url, json.dumps(params))
 ```
<span id="SendHttpResponse"></span>
#### SendHttpResponse

- 描述

    发送HTTP的Response。支持异步返回，返回时指定输入clientId

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | clientId | int | 请求唯一id，识别HTTP请求 |
    | message | string | HTTP Response的内容 |
- 返回值

    无
- 示例

```python
import service.serviceHttp as serviceHttp
class HttpHandler(object):
        def __init__(self):
                # 设置接口URI及回调
                url = '/kick-user'
                func = self.HttpTest
                # 注册
                serviceHttp.RegisterServiceHttp(url, self, func)
        def HttpTest(self, clientId, requestBody):
                # clientId识别请求唯一id，send_http_response中要携带该参数
                # requestBody为post body内容。如果是json格式，则可以通过下面方式加载内容。
                # import ujson as json
                # request = json.loads(requestBody)
                # 返回处理结果
                response = '{"code":0,"message":"ok"}'
                serviceHttp.SendHttpResponse(clientId, response)
 ```
这里是service的一些服务的管理接口

<span id="服务器"></span>
### 服务器

<span id="ResetServer"></span>
#### ResetServer

- 描述

    重置服务器

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverId | int | lobby/game的服务器id |
- 返回值

    无
- 备注


    注意，对于生存服，若使用了存档A，则重置后仍使用存档A，且重置过程中不会保存地图。


    若需要重置游戏服GameA，使用方法：重置前确保玩家退出对应GameA，重置过程不允许玩家进入GameA，GameA重置完毕后GameA可以发消息告知master或service，告知GameA就绪，然后玩家可以进入GameA了


- 示例

```python
import service.serverManager as serverManager
serverManager.ResetServer(4000)
 ```
<span id="服务器管理"></span>
### 服务器管理

<span id="GetServerIdsByServerType"></span>
#### GetServerIdsByServerType

- 描述

    根据类型获取服务器id列表

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverType | str | 服务器类型 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list(int) | 服务器id列表，若服务器类型不存在，则返回空列表 |
- 示例

```python
import service.serverManager as serverManager
#返回的一个示例：[4000, 4001]
serverIds = serverManager.GetServerIdsByServerType("lobby")
 ```
<span id="GetServerProtocolVersion"></span>
#### GetServerProtocolVersion

- 描述

    获取服务器的协议版本号。多协议版本引擎中（比如同时支持1.14客户端和1.15客户端），需要把客户端分配到相同协议版本的lobby/game中

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverId | int | lobby/game服务器id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 协议版本 |
- 示例

```python
import service.serverManager as serverManager
version = serverManager.GetServerProtocolVersion(6000)
 ```
<span id="GetServerType"></span>
#### GetServerType

- 描述

    获取服务器类型

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverId | int | master/service/lobby/game服务器id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 服务器类型字符串。若服务器不存在，则返回空字符串 |
- 示例

```python
import service.serverManager as serverManager
serverType = serverManager.GetServerType(6000)
 ```
<span id="GetServersStatus"></span>
#### GetServersStatus

- 描述

    获取所有lobby/game服务器的状态。只有状态1表示服务器正常服务，其他状态表示服务器不能对外服务

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | key:int, 服务器id，value:int 服务器状态。服务器状态如下：<br/>1:正常状态<br/>2:正在滚动更新关闭状态，服务器马上会下架 <br/>3:滚动更新新增服务器状态，服务器就绪后会转化为状态1 <br/>4:服务器已上架，但是未同service建立连接状态（可能是服务器崩溃或被重置或关服等原因导致），建立连接后会转换为状态1 |
- 示例

```python
import service.serverManager as serverManager
statusDict = serverManager.GetServersStatus()
 ```
<span id="IsConnectedServer"></span>
#### IsConnectedServer

- 描述

    service是否与lobby/game/proxy建立连接

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | serverId | int | 服务器id |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | True，已经建立连接;False未建立连接 |
- 示例

```python
import service.serverManager as serverManager
bConnect = serverManager.IsConnectedServer(4000)
 ```
