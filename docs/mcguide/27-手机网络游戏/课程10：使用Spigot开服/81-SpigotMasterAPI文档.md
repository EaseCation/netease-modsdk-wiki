# SpigotMaster文档

## `public class SpigotMaster extends JavaPlugin`

SpigotMaster

 * **Package:**
 com.neteasemc.spigotmaster;
 * **Example:**
      ```
     import com.neteasemc.spigotmaster.SpigotMaster;
     SpigotMaster spigotMaster = (SpigotMaster)Bukkit.getPluginManager().getPlugin("SpigotMaster");
     ```


## `public Material getCustomItemMaterial(String customItemIdentifier)`

该接口已废弃

 * **Deprecated**

## `public String getCustomItemIdentifier(ItemStack spigotItemStack)`

获取自定义物品名的identifier

 * **Parameters:**
 `spigotItemStack` — itemStack
 * **Returns:**
 String 自定义物品identifier

## `public ItemStack setCustomItemIdentifier(ItemStack spigotItemStack, String customIdentifier)`

设置自定义物品的identifier

 * **Parameters:**
   * `spigotItemStack` — itemStack
   * `customIdentifier` — 自定义物品identifier

 * **Returns:**
 设置后的itemStack

## `public ItemStack setItemLayer(ItemStack itemStack, int layer, String texture)`

设置物品的叠加贴图。与ModSDK的SetItemLayer用法一致

 * **Parameters:**
   * `itemStack` — itemStack
   * `layer` — 贴图的层级。可以为-2，-1，1，2，3。负数层级显示在物品下方，正数的层级显示在物品上方。层级大的显示在层级小的上方。
   * `texture` — 贴图的名字，对应资源包item_texture.json中的key。

 * **Returns:**
 设置后的itemStack（没设置成功会返回itemStack参数本身）

## `public String getItemLayer(ItemStack itemStack, int layer)`

获取物品的叠加贴图。与ModSDK的GetItemLayer用法一致

 * **Parameters:**
   * `itemStack` — itemStack
   * `layer` — 贴图的层级。可以为-2，-1，1，2，3。

 * **Returns:**
 贴图的名字，不存在返回null

## `public ItemStack removeItemLayer(ItemStack itemStack, int layer)`

移除物品的叠加贴图。与ModSDK的RemoveItemLayer用法一致

 * **Parameters:**
   * `itemStack` — itemStack
   * `layer` — 贴图的层级。可以为-2，-1，1，2，3。

 * **Returns:**
 移除后的itemStack（没移除会返回itemStack参数本身）

## `public void listenForSpigotMasterEvent(SpigotMasterEvent event, PyRpcHandler handler)`

监听spigot master的自定义事件

 * **Parameters:**
   * `event` — SpigotMasterEvent的枚举值
   * `handler` — 回调函数


## `public void listenForEvent(String namespace, String system, String event, PyRpcHandler handler)`

注册客户端事件

 * **Parameters:**
   * `namespace` — 来源客户端系统的namespace
   * `system` — 来源客户端系统的systemName
   * `event` — 事件名
   * `handler` — 回调函数


## `public void notifyToClient(Player player, String namespace, String system, String event, Map<String, Object> data)`

给指定玩家发送服务端事件

 * **Parameters:**
   * `player` — 接收事件的玩家
   * `namespace` — 在客户端系统使用ListenForEvent监听的namespace
   * `system` — 在客户端系统使用ListenForEvent监听的systemName
   * `event` — 事件名
   * `data` — 事件参数。注意，要使用-2指代本地玩家的entityId。


## `public void notifyToMultiClients(List<Player> players, String namespace, String system, String event, Map<String, Object> data)`

给多个玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

 * **Parameters:**
   * `players` — 接收事件的玩家列表
   * `namespace` — 在客户端系统使用ListenForEvent监听的namespace
   * `system` — 在客户端系统使用ListenForEvent监听的systemName
   * `event` — 事件名
   * `data` — 事件参数


## `public void notifyToClientsNearby(@Nullable Player except, Location loc, double dist, String namespace, String system, String event, Map<String, Object> data)`

给某个位置附近一定半径内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

 * **Parameters:**
   * `except` — 发送事件时排除掉这个玩家，可以为null表示不排除
   * `loc` — 圆心位置
   * `dist` — 半径
   * `namespace` — 在客户端系统使用ListenForEvent监听的namespace
   * `system` — 在客户端系统使用ListenForEvent监听的systemName
   * `event` — 事件名
   * `data` — 事件参数


## `public void broadcastToAllClient(@Nullable Player except, World world, String namespace, String system, String event, Map<String, Object> data)`

给某个world内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

 * **Parameters:**
   * `except` — 发送事件时排除掉这个玩家，可以为null表示不排除
   * `world` — 所在world
   * `namespace` — 在客户端系统使用ListenForEvent监听的namespace
   * `system` — 在客户端系统使用ListenForEvent监听的systemName
   * `event` — 事件名
   * `data` — 事件参数


## `public void broadcastToAllClient(@Nullable Player except, String namespace, String system, String event, Map<String, Object> data)`

给服务器内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

 * **Parameters:**
   * `except` — 发送事件时排除掉这个玩家，可以为null表示不排除
   * `namespace` — 在客户端系统使用ListenForEvent监听的namespace
   * `system` — 在客户端系统使用ListenForEvent监听的systemName
   * `event` — 事件名
   * `data` — 事件参数


## `public void enableCustomShopEntry(boolean useCustomShop)`

开启商城插件入口

 * **Parameters:**
 `useCustomShop` — 是否使用自定义商城入口，为false时，则使用官方商城入口
 * **Since:**
 1.2.3

## `public void openShop(Player player)`

打开指定玩家商城界面 注意：该接口需要使用商城插件，并调用接口开启商城插件

 * **Parameters:**
 `player` — 玩家
 * **Since:**
 1.2.3

## `public void closeShop(Player player)`

关闭指定玩家商城界面 注意：该接口需要使用商城插件，并调用接口开启商城插件

 * **Parameters:**
 `player` — 玩家
 * **Since:**
 1.2.3

## `public void showHintOne(Player player, @Nullable String text)`

推送冒泡提示给指定玩家 注意：该接口需要使用商城插件，并调用接口开启商城插件

 * **Parameters:**
   * `player` — 指定玩家
   * `text` — 提示字符串

 * **Since:**
 1.2.3

## `public void showHintTwo(Player player, String head, @Nullable String tail)`

推送 拼接后的头尾两串冒泡提示 给指定玩家 注意：该接口需要使用商城插件，并调用接口开启商城插件

 * **Parameters:**
   * `player` — 指定玩家
   * `head` — 提示字符串首
   * `tail` — 提示字符串尾

 * **Since:**
 1.2.3

## `public void getPlayerOrderList(Player player, FutureCallback<Map<String, Object>> callback)`

获取玩家未发货订单列表

 * **Parameters:**
   * `player` — 指定玩家
   * `callback` — FutureCallBack回调函数

 * **Since:**
 1.2.3
 * **Example:**
      回调参数为Map<String,Object>, 目前值为
     | Key              | Value          | 解释  |
     | -----------------| ---------------| ----  |
     | player           | Player         | 玩家  |
     | json_result      | 订单json数据    | 玩家  |


## `public void finPlayerOrder(Player player, List<String> orderList, FutureCallback<Map<String, Object>> callback)`

通知网易服务器完成指定玩家订单

 * **Parameters:**
   * `player` — 指定玩家
   * `orderList` — 订单id列表
   * `callback` — FutureCallBack回调函数

 * **Since:**
 1.2.3
 * **Example:**
      回调参数为Map<String,Object>, 目前值为
     | Key              | Value          | 解释  |
     | -----------------| ---------------| ----  |
     | player           | Player         | 玩家  |
     | json_result      | 订单json数据    | 玩家  |


## `public void enableClientChatExtension(Player player)`

开启官方聊天扩展功能,需要在CLIENT_LOAD_ADDON_FINISH事件中调用

 * **Parameters:**
 `player` — 指定玩家
 * **Since:**
 1.2.4
 * **Example:**
      ```
     SpigotMaster.listenForSpigotMasterEvent(CLIENT_LOAD_ADDON_FINISH, new PyRpcHandler() {

 			@Override
          public void onEvent(Player player, Map<String, Object> data) {
              SpigotMaster.enableClientChatExtension(player);
          }
      });
      ```


## `public void disableClientChatExtension(Player player)`

关闭官方聊天扩展功能,需要在CLIENT_LOAD_ADDON_FINISH事件中调用

 * **Parameters:**
 `player` — 指定玩家
 * **Since:**
 1.2.4
 * **Example:**
      ```
     SpigotMaster.listenForSpigotMasterEvent(CLIENT_LOAD_ADDON_FINISH, new PyRpcHandler() {

 			@Override
          public void onEvent(Player player, Map<String, Object> data) {
              SpigotMaster.disableClientChatExtension(player);
          }
      });
      ```


## `public String getCustomEntityIdentifier(Entity entity)`

获取自定义实体的identifier

 * **Parameters:**
 `entity` — 需要设置的entity实例
 * **Returns:**
 String 自定义物品identifier
 * **Since:**
 1.3.1

## `public Entity spawnEntity(Player player, Location loc, EntityType entityType, String neteaseClientIdentifier)`

生成自定义生物

 * **Parameters:**
   * `player` — 玩家
   * `loc` — 生成位置
   * `entityType` — 原版生物类型
   * `neteaseClientIdentifier` — 自定义生物identifier

 * **Returns:**
 Entity 自定义生物实例
 * **Since:**
 1.3.1

## `public void spawnEntity(Player player, Entity entity, String neteaseClientIdentifier)`

转换成自定义生物

 * **Parameters:**
   * `player` — 玩家
   * `entity` — 生物实例
   * `neteaseClientIdentifier` — 自定义生物identifier

 * **Returns:**
 Entity 自定义生物实例
 * **Since:**
 1.3.1

## `public Entity spawnEntity(World world, Location loc, EntityType entityType, String neteaseClientIdentifier)`

生成自定义生物

 * **Parameters:**
   * `world` — world实例
   * `loc` — 生成位置
   * `entityType` — 原版生物类型
   * `neteaseClientIdentifier` — 自定义生物identifier

 * **Returns:**
 Entity 自定义生物实例
 * **Since:**
 1.3.8

## `public void spawnEntity(World player, Entity entity, String neteaseClientIdentifier)`

转换成自定义生物

 * **Parameters:**
   * `world` — 玩家
   * `entity` — 生物实例
   * `neteaseClientIdentifier` — 自定义生物identifier

 * **Returns:**
 Entity 自定义生物实例
 * **Since:**
 1.3.8

## `public Entity setCustomEntityIdentifier(Entity entity, String customIdentifier)`

设置自定义实体的identifier

 * **Parameters:**
   * `entity` — 需要设置的entity实例
   * `customIdentifier` — 自定义实体identifier

 * **Returns:**
 设置后的entity
 * **Since:**
 1.3.1

## `public boolean sendForm(Player player, Form form)`

发送formui给指定玩家

 * **Parameters:**
   * `player` — 指定玩家
   * `form` — 表单类实例

 * **Since:**
 1.3.2

## `public boolean sendForm(Player player, FormBuilder<?, ?, ?> formBuilder)`

发送formui给指定玩家

 * **Parameters:**
   * `player` — 指定玩家
   * `formBuilder` — 表单builder类实例

 * **Since:**
 1.3.2

## `public void setEntitySize(Entity entity, float height, float width)`

设置自定义实体的碰撞盒大小

 * **Parameters:**
   * `entity` — 需要设置的entity实例
   * `height` — 实体高度
   * `width` — 实体宽度

 * **Since:**
 1.3.3

## `public void setMythicMobIdentifier(Entity entity, String mobType)`

设置mythicmob的identifier

如: SkeletonKing 会自动转为客户端的 mythicmob:skeletonKing

SkeletalMinion 会自动转为客户端的 mythicmob:skeletalMinion

即为：mythicmob:xxx xxx为首字母小写的mythicmob的identifier

 * **Parameters:**
   * `entity` — 需要设置的entity实例
   * `mobType` — mythicmob的identifier

 * **Since:**
 1.3.3

## `public void setEntityScale(Entity entity, float scale)`

设置自定义实体的scale

注意，由于Java并不提供修改Scale接口，因此该接口仅为客户端暂时生效接口

玩家重登；掉线重连；后续进入的玩家都只能看到默认的scale，不能看到通过接口修改后的scale！

请留意该接口的使用时机！

 * **Parameters:**
   * `entity` — 需要设置的entity实例
   * `scale` — scale

 * **Since:**
 1.3.5

## `public void sendBedrockPacket(int packetId, byte[] packetData)`

给所有玩家广播基岩版原生数据包,

注：网易基岩版客户端数据包协议库基于国际版MC进行修改，不符合当前BE客户端的协议版本(v503 MCBE版本1.18.30)的包体数据会导致客户端异常，包括但不限于断开连接，闪退以及游戏无响应

目前建议版本为v503

 * **Parameters:**
   * `packetId` — 数据包id
   * `packetData` — 数据包数据

 * **Since:**
 1.3.7
 * **Example:**
      ```
     //修改客户端时间
     org.cloudburstmc.protocol.bedrock.packet.TimePacket timePacket = new TimePacket();
     ByteBuf setTimeByteBuf = ByteBufAllocator.DEFAULT.heapBuffer(128);
     timePacket.setTime(20000);
     setTimeByteBuf = ByteBufAllocator.DEFAULT.heapBuffer(128);
     org.cloudburstmc.protocol.bedrock.codec.v503.Bedrock_v503.CODEC.tryEncode(Bedrock_v503.CODEC.createHelper(), setTimeByteBuf, timePacket);
     int setTimeDataLen = setTimeByteBuf.readableBytes();
     byte[] setTimeData = new byte[setTimeDataLen];
     setTimeByteBuf.readBytes(setTimeData, 0, setTimeDataLen);
     setTimeByteBuf.release();
     spigotMaster.sendBedrockPacket(setTimePacketId, setTimeData);
     ```


## `public void sendBedrockPacketToPlayer(int packetId, byte[] packetData, Player player)`

给指定玩家广播基岩版原生数据包

注：网易基岩版客户端数据包协议库基于国际版MC进行修改，不符合当前BE客户端的协议版本(v503 MCBE版本1.18.30)的包体数据会导致客户端异常，包括但不限于断开连接，闪退以及游戏无响应

目前建议版本为v503

 * **Parameters:**
   * `packetId` — 数据包id
   * `packetData` — 数据包数据数组
   * `player` — 发送的玩家

 * **Since:**
 1.3.7

## `public void setEntityGravity(int entityId, float gravity)`

设置实体重力系数

注：需要注意设置实体的时机，如果通过监听entityspawnevent修改则无法生效，因为此时客户端还未同步到相关实体！

 * **Parameters:**
   * `entityId` — 需要设置的entityId
   * `gravity` — 重力系数，如果为0则应用世界重力

 * **Since:**
 1.3.9

## `public String getItemIconPath(ItemStack item)`

获取物品贴图路径(只能获取到原生物品的贴图)

注: 由于大部分方块由四方向(side/front/back/top)共四张贴图组成，因此，该接口只会默认返回side方向贴图,而formui只能支持单独一张贴图，因此对于方块而言，单纯使用该接口获取贴图后显示，效果并不佳，建议自行绘制贴图

 * **Parameters:**
 `item` — 需要获取的ItemStack
 * **Since:**
 1.3.10
