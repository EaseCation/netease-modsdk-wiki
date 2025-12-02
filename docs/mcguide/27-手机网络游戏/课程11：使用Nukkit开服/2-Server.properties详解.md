---
front:
hard: 入门
time: 60分钟
---

# server.properties参数解释

## 前言

作者：LT_Name  
原文： [server.properties](https://www.nukkit-mot.com/zh/docs/server-config/server-properties)

修改服务器的运行配置，以此来定制一些基本功能。

## `server-ip`
| 数据类型   | 默认值     |
|--------|---------|
| String | 0.0.0.0 |

服务器的IP

## `server-port`
| 数据类型    | 默认值   |
|---------|-------|
| Integer | 19132 |

服务器的端口

> 同一端口不能运行多个服务器  
如果不能访问请检查防火墙  
基岩版使用 UDP  

## `enable-query`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用 Query 查询  
详见：https://wiki.vg/Query

## `motd`
| 数据类型   | 默认值              |
|--------|------------------|
| String | Minecraft Server |

服务器名称/显示在服务器列表上的文本

## `sub-motd`
| 数据类型   | 默认值                   |
|--------|-----------------------|
| String | Powered by Nukkit-MOT |

motd 的第二行

> 只有当在游戏中的好友列表中查看服务器时，才会显示给本地网络中的玩家  
自 1.16.210 以来不能为空

## `view-distance`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 8   |

最大视距（以区块为单位）  
更大的值 = 加载更多区块 = 更多的内存和 CPU 使用

## `achievements`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用玩家成就

## `announce-player-achievements`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

向所有玩家广播获得成就的消息

## `spawn-protection`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 10  |

非管理员(OP)玩家无法在区块内建造或破坏方块的生成保护区域大小（以方块为单位）

## `max-players`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 50  |

服务器允许的最大玩家人数

## `drop-spawners`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

刷怪笼被挖掘后掉落

## `spawn-animals`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用动物生成

## `spawn-mobs`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用怪物生成

## `gamemode`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 2   |

服务器的默认游戏模式  
0 = 生存, 1 = 创造, 2 = 冒险, 3 = 旁观

## `force-gamemode`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

每次加入时将玩家游戏模式设置为默认游戏模式

## `difficulty`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 2   |

服务器的默认难度（0-3）

## `hardcore`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

玩家死亡后将其封禁

## `pvp`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

是否启用玩家对战

## `white-list`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

仅允许白名单中的玩家加入服务器  
使用`/whitelist`命令或修改 `white-list.txt` 来添加玩家到白名单

## `whitelist-reason`
| 数据类型   | 默认值                    |
|--------|------------------------|
| String | Server is white-listed |

启用白名单的原因，显示给被阻挡在外的玩家

## `generator-settings`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

默认级别的特殊世界生成器设置

## `level-name`
| 数据类型   | 默认值   |
|--------|-------|
| String | world |

默认世界的名称

## `level-seed`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

默认世界的种子

## `level-type`
| 数据类型   | 默认值  |
|--------|------|
| String | void |

如果默认世界不存在，则使用的生成器  
默认支持：default, normal, flat, nether, the_end或void

## `enable-rcon`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用远程控制台访问

> RCON 不是一个非常安全的远程控制服务器的方式  
RCON 可以使用与服务器相同的端口（TCP 协议）  
详见：https://developer.valvesoftware.com/wiki/Source_RCON_Protocol

## `rcon.password`
| 数据类型   | 默认值     |
|--------|---------|
| String | 随机10位字符 |

RCON 连接的密码

## `rcon.port`
| 数据类型    | 默认值   |
|---------|-------|
| Integer | 25575 |

RCON 连接的端口

## `auto-save`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

自动保存世界、玩家数据

> 如果禁用，则对世界的更改不会自动保存，即使在卸载时也是如此，如果需要可以使用插件手动保存

您可以使用 `worlds-level-auto-save-disabled` 仅禁用自动保存世界

## `force-resources`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

强制玩家下载服务器的资源包后才能加入  
还请参阅 `force-resources-allow-client-packs`

## `force-resources-allow-client-packs`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

在启用 `force-resources` 时不要禁用客户端自己的资源包

## `xbox-auth`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

需要经过 Xbox 帐户验证后才能加入

> 不会绕过客户端的限制条件。  
如果您选择禁用此功能（不推荐这样做），请在玩家名称和 UUIDs 传递给权限管理器或管理员之后，以确保它们已经得到了验证。

## `encryption`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用网络加密  
如果不使用代理软件，则建议启用此功能

## `bed-spawnpoints`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许玩家使用床和重生锚设置重生点

## `explosion-break-blocks`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用爆炸对方块造成的破坏  
影响所有爆炸，如 TNT、苦力怕和末影水晶

## `stop-in-game`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许 OP 在游戏中使用 `/stop` 命令

## `op-in-game`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许 OP 在游戏中使用 `/op` 命令对其他玩家进行操作

## `space-name-mode`
| 数据类型   | 默认值    |
|--------|--------|
| String | ignore |

玩家名称中带有空格的处理方式  
"disabled" - 禁止带有空格名称的玩家进入服务器  
"ignore" - 忽略空格名称 （默认）  
"replacing" - 用"_"替换玩家名称中的空格

## `xp-bottles-on-creative`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许创造模式下玩家扔经验瓶

## `spawn-eggs`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用刷怪蛋，允许通过刷怪蛋生成实体

## `mob-ai`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用 MobPlugin 的生物 AI

## `entity-auto-spawn-task`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用自动生成怪物和动物的任务  
生成功能依据服务器的游戏难度来工作  
注意：如果您希望生成任何生物，必须启用`spawn-animals`、`spawn-mobs`其一，或者两者都启用。

## `entity-despawn-task`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

若启用，则没有使用命名牌命名的生物的会自动消失

> 末影龙、凋灵和村民不会消失

## `language`
| 数据类型   | 默认值 |
|--------|-----|
| String | eng |

Nukkit 使用的默认语言

## `force-language`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

强制使用服务器端翻译  
只有在你有插件来实现这些翻译时才启用

## `shutdown-message`
| 数据类型   | 默认值           |
|--------|---------------|
| String | Server closed |

当您停止服务器时向玩家显示的消息  
可以使用颜色符号`§`，换行请使用 `§n`。

## `save-player-data`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

如果启用，则以其UUID保存玩家数据的格式，并自动将旧格式的玩家数据转换为新格式  
如果使用旧版Waterdog代理，请禁用此功能  
如果存在新的玩家数据，请勿禁用

## `query-plugins`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

若启用则 Query 查询可以获取插件列表（enable-query=on）

## `debug-level`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 1   |

如果您想要更多的调试日志记录，请设置较高的值（1-3）

## `async-workers`
| 数据类型   | 默认值  |
|--------|------|
| String | auto |

异步工作线程数  
如果设置为 auto，则会尝试自动检测核心数进行调整

## `zlib-provider`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 2   |

选择 zlib 提供程序  
0 = ZlibOriginal，1 = ZlibSingleThreadLowMem，2 = ZlibThreadLocal  
默认：2  
其他提供程序可能会对服务器的性能产生负面影响

## `compression-level`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 4   |

发送数据包的 Zlib 压缩级别（0-9）  
更高的值 = 更多的 CPU 占用 + 更少的网络占用

## `compression-threshold`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 256 |

不要压缩小于此值的批处理数据包（仅限Zlib）

## `use-snappy-compression`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

使用 Snappy 压缩数据包

## ~~min-mtu~~
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 576 |

~~设置最小 MTU 大小~~  
~~默认值：576~~

## ~~max-mtu~~
| 数据类型    | 默认值  |
|---------|------|
| Integer | 1492 |

~~设置最大 MTU 大小（576 - 1492）~~  
~~值越大网络发包越高效，但较小的值或许可以解决某些连接上的问题。~~

## `rak-packet-limit`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 120 |

每个ip可以在一个 RakNet 周期（10ms）内发送的数据包数量  
超过此限制的ip将被暂时封禁

## `enable-rak-send-cookie`
| Data Type | Default Value |
|-----------|---------------|
| Boolean   | on            |

启用此选项后，服务器会在客户端连接时发送一个 Cookie，用于验证客户端的合法性。  
这将增强连接的安全性，防止潜在的恶意连接或攻击。

## `timeout-milliseconds`
| 数据类型    | 默认值   |
|---------|-------|
| Integer | 25000 |

如果客户端没有响应，服务器应该等待多长时间后踢出玩家  
单位为毫秒，1000 毫秒 = 1 秒

## `auto-tick-rate`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许服务器自动调整世界游戏刻以维持每秒 20 个游戏刻

## `auto-tick-rate-limit`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 20  |

服务器可以临时降低游戏刻速率到多少

## `base-tick-rate`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 1   |

基础游戏刻速率  
1 = 每秒 20 个刻度，2 = 每秒 10 个刻度，以此类推。  
建议保持默认值（1）。

## `always-tick-players`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

始终对玩家进行游戏刻更新

## `light-updates`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

光照更新

## `clear-chunk-tick-list`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许服务器在完成每个游戏刻的逻辑更新后，清空用于追踪哪些区块需要进行逻辑更新的列表 `chunkTickList`。  
这可以帮助优化服务器性能，防止不必要的计算，特别是在大型服务器或有大量区块需要管理的情况下。

## `spawn-threshold`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 56  |

在生成玩家之前需要加载多少个区块

## `chunk-sending-per-tick`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 4   |

每游戏刻发送的区块数

## `chunk-ticking-per-tick`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 40  |

每游戏刻 `chunkTickList` 存储的区块数

## `chunk-ticking-radius`
| Data Type | Default Value |
|-----------|---------------|
| Integer   | 3             |

玩家周围需要进行刻算的区块半径

## `chunk-generation-queue-size`
| Data Type | Default Value |
|-----------|---------------|
| Integer   | 8             |

等待生成的区块数量

## `chunk-generation-population-queue-size`
| Data Type | Default Value |
|-----------|---------------|
| Integer   | 8             |

等待填充的区块数量

## `ticks-per-autosave`
| Data Type | Default Value |
|-----------|---------------|
| Integer   | 6000          |

世界自动保存任务运行的频率  
以刻为单位，20刻 = 1秒

## `ticks-per-entity-spawns`
| Data Type | Default Value |
|-----------|---------------|
| Integer   | 200           |

实体自动生成任务运行的频率  
以刻为单位，20刻 = 1秒

## `ticks-per-entity-despawns`
| Data Type | Default Value |
|-----------|---------------|
| Integer   | 12000         |

实体存活的时间  
以刻为单位，20刻 = 1秒

## `thread-watchdog`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用线程看门狗

## `thread-watchdog-tick`
| 数据类型    | 默认值   |
|---------|-------|
| Integer | 60000 |

如果 Nukkit-MOT 主线程暂停超过 60000 毫秒，会抛出致命错误并终止执行的毫秒数

## `nether`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

生成地狱世界

## `end`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

生成末地世界

## `vanilla-portals`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

原版传送门

## `portal-ticks`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 80  |

玩家触发传送门所需Tick

## `multi-nether-worlds`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

如果你需要多个地狱世界，在这里列出应该有自己地狱的世界，否则使用默认的地狱世界

## `anti-xray-worlds`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

启用内置反矿透的世界列表

示例：`world, survival, factions`

## `do-not-tick-worlds`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

禁用随机方块刻度的世界列表  
这将禁用植物生长、树叶腐烂、草方块蔓延、方块掉落等。  
你可能想在这里添加你的大堂和迷你游戏世界

## `worlds-entity-spawning-disabled`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

不允许实体自动生成的世界列表

示例：`lobby, pvp, creative`

## `load-all-worlds`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

加载所有世界

## `ansi-title`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用在 Windows CMD 标题中显示服务器占用信息

## `block-listener`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用用于雪块、铁傀儡、怪物蛋石等的检查

## `allow-flight`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用/禁用飞行反作弊

## `multiversion-min-protocol`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 0   |

多版本的最低协议

## `multiversion-max-protocol`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | -1  |

多版本的最高协议

## `vanilla-bossbars`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

显示凋零和末影龙的Boss血条（实验性）

## `strong-ip-bans`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

强制 IP 封禁

## `worlds-level-auto-save-disabled`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

禁用自动保存  
等级的世界

## `temp-ip-ban-failed-xbox-auth`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

临时封禁 Xbox 身份验证失败的玩家

## `call-data-pk-send-event`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

如果没有插件使用它，可以禁用 `DataPacketSendEvent` 以获得更好的性能

## `call-batch-pk-send-event`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

如果没有插件使用它，可以禁用 `BatchPacketsEvent` 以获得更好的性能

## `do-level-gc`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

在游戏刻之间进行世界垃圾收集

## `skin-change-cooldown`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 15  |

玩家皮肤更换冷却时间（秒）

## ~~check-op-movement~~
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

~~为管理员(OP)启用移动检查~~

## `do-not-limit-interactions`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

禁用用于限制客户端右键交互垃圾数据包的黑客技术

## `do-not-limit-skin-geometry`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

禁用最大皮肤几何大小检查  
可能对某些玩家，皮肤的可用性是必需的

## `automatic-bug-report`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用自动报告错误

## ~~anvils-enabled~~
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

~~启用铁砧~~  
~~在 Nukkit 上，铁砧属于实验性功能方块，普遍存在物品重命名、物品数据丢失等问题~~

## `save-player-data-by-uuid`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

如果启用，则以 NukkitX 使用的格式保存玩家数据，并自动将旧格式的玩家数据转换为新格式  
如果使用旧版 WaterdogPE 代理，请禁用此功能

> 如果存在新的玩家数据，请勿禁用

## `persona-skins`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

允许玩家自己的皮肤

> 如果禁用，将显示默认的史蒂夫皮肤  
某些玩家的皮肤可能需要启用 `do-not-limit-skin-geometry` 才能使用

## ~~call-entity-motion-event~~
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

~~您可以禁用 EntityMotionEvent 以获得更好的性能，如果您的插件没有使用它~~

## `update-notifications`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

有新的 Nukkit-MOT 版本发布时通知刚加入游戏的管理员(OP)

## `bstats-metrics`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用 bStats 统计  
https://bstats.org/plugin/server-implementation/Nukkit/  
匿名收集数据：Nukkit 版本（Nukkit-MOT）、玩家数量、玩家游戏版本、是否开启 Xbox 身份验证、Java 版本、操作系统、CPU 架构及数量、服务器地理位置（粗略）

## `cache-chunks`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

将区块保存到内存中以加快发送速度

> 多版本支持的效果不佳

## `async-chunks`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用异步区块发送  
当向不同版本的玩家发送大量区块时，这可以极大地提高性能  
建议保持此选项开启

## `deprecated-verbose`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

当插件使用不推荐 API 时在控制台显示警告。

## `server-authoritative-movement`
| 数据类型   | 默认值         |
|--------|-------------|
| String | server-auth |

服务器移动验证方式
可选：`client-auth / server-auth-with-rewind / server-auth`

## `server-authoritative-block-breaking`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

服务器权威方块破坏

## `use-client-spectator`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

使用客户端侧的旁观者模式

## `enable-experiment-mode`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用实验模式

## `use-waterdog`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

尝试获取 WaterdogPE 提供的客户端真实 IP  
详见：https://waterdog.dev/

## `enable-spark`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

启用 Spark 用于性能分析  
详见：https://spark.lucko.me/docs

## `hastebin-token`
| 数据类型   | 默认值 |
|--------|-----|
| String |     |

Hastebin 令牌，方便生成 debug 链接  
详见：https://www.toptal.com/developers/hastebin/documentation

## `use-native-leveldb`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | off |

使用原生的 LevelDB 实现

## `enable-raw-ores`
| 数据类型    | 默认值 |
|---------|-----|
| Boolean | on  |

启用粗矿石；若启用则对高版本玩家掉落粗铜、粗铁、粗金  
版本自 [BE 1.17.0](https://minecraft.wiki/w/Bedrock_Edition_1.17.0) 起

## `enable-new-paintings`
| Data Type | Default Value |
|-----------|---------------|
| Boolean   | on            |

启用在1.21版本新加入的画

## `enable-new-chicken-eggs-laying`
| Data Type | Default Value |
|-----------|---------------|
| Boolean   | on            |

启用鸡产出新类型鸡蛋
（蓝色鸡蛋&棕色鸡蛋）

## `leveldb-cache-mb`
| 数据类型    | 默认值 |
|---------|-----|
| Integer | 80  |

与 `use-native-leveldb` 一同使用  
用于减少每个世界硬盘读写操作的区块数据最大缓存大小  
如果你拥有大量内存并且仅有几个大型世界，可以调高此缓存大小

## `forced-safety-enchant`
| Data Type | Default Value |
|-----------|---------------|
| Boolean   | on            |

启用强制安全附魔（限制附魔最大等级）

## `netease-client-support`
| Data Type | Default Value |
|-----------|---------------|
| Boolean   | off           |

启用网易客户端支持，启用后将允许网易玩家进入服务器

## `only-allow-netease-client`
| Data Type | Default Value |
|-----------|---------------|
| Boolean   | off           |

仅允许网易玩家进入服务器，开启后将禁止微软版玩家进入服务器，仅允许网易玩家加入服务器


