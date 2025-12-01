# NukkitMaster文档

## 准备阶段

在部署Nukkit服务器之前，您需要阅读一下NukkitMaster的API来进行基本的ModSDK通信与商业化内容接入。  
NukkitMaster需要安装在Nukkit-MOT服务端中。  

> 需要注意: NukkitMaster是基于Nukkit-MOT分支进行开发的。Nukkit官方服务端版本无法兼容。

> 如果您需要使用其他分支的Nukkit，您可以自行反编译NukkitMaster

> NukkitMOT分支开源地址： https://github.com/MemoriesOfTime/Nukkit-MOT

## 插件配置

```yaml
# 服务器id（开发者平台中的资源数字id）
game_id: ""
# 正式服务器key（开发者平台中的签名信息）
game_key: ""
# 测试服务器key（开发者平台中的签名信息）
test_game_key: ""

# 是否是测试服
test_server: false

# 是否使用自定义商城（false表示使用官方提供的商城功能）
custom_shop: false


# 订单服务器地址（一般不用填，保持""即可）
shop_server_url: ""
# web服务器地址（一般不用填，保持""即可）
web_server_url: ""
```

NukkitMaster插件会在 `plugins/NukkitMaster` 下生成 `config.yml` ，需要将服务器的相关数据进行配置，订单API才能生效。  
其中`gameid`、`rawkey`、`test rawkey`是必须要填写的。  
`test_server`需要根据服务器部署情况进行修改，这个值会影响NukkitMaster插件使用的是正式服url还是测试服url  
`custom_shop` 和 [商业化流程](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/27-%E6%89%8B%E6%9C%BA%E7%BD%91%E7%BB%9C%E6%B8%B8%E6%88%8F/%E8%AF%BE%E7%A8%8B9%EF%BC%9A%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%BA%BF/%E7%AC%AC3%E8%8A%82%EF%BC%9A%E5%95%86%E4%B8%9A%E5%8C%96%E6%93%8D%E4%BD%9C.html?key=use_custom_shop&docindex=1&type=0) 中 use custom shop 功能同理  
`shop_server_url`、`web_server_url`为预留配置，目前不需要修改，默认即可

## API

### `public void enableCustomShopEntry(boolean useCustomShop)`
开启商城插件的入口，该功能已经在NukkitMaster中集成，可修改NukkitMaster的`config.yml`文件。   
参数： `useCustomShop` —— 是否使用自定义商城入口，为false时，则使用官方商城入口

### `public void openShop(Player player)`
打开指定玩家商城界面 注意：该接口需要使用商城插件，并修改config.yml的`custom_shop`为true。  
参数： `player` —— 玩家

### `public void closeShop(Player player)`
关闭指定玩家商城界面 注意：该接口需要使用商城插件，并修改config.yml的`custom_shop`为true。  
参数： `player` —— 玩家

### `public void getPlayerOrderList(Player player, FutureCallback<Map<String, Object>> callback)`
获取玩家未发货订单列表
参数：   
`player` —— 玩家  
`callback` —— FutureCallBack 回调函数

例子：   
回调参数为Map<String,Object>, 目前值为  

| Key         | Value      |
|-------------|------------|
| json_result | 订单json数据对象 |
| player      | Player玩家对象 |

### `public void finPlayerOrder(Player player, List<String> orderList, FutureCallback<Map<String, Object>> callback)`
获取玩家未发货订单列表
参数：   
`player` —— 玩家  
`orderList` —— 订单id列表  
`callback` —— FutureCallBack 回调函数

### `public void listenForNukkitMasterEvent(SpigotMasterEvent event, PyRpcHandler handler)`

监听spigot master的自定义事件
参数：   
`event` — SpigotMasterEvent的枚举值
`handler` — 回调函数


### `public void listenForEvent(String namespace, String system, String event, PyRpcHandler handler)`

注册客户端事件
参数：   
`namespace` — 来源客户端系统的namespace
`system` — 来源客户端系统的systemName
`event` — 事件名
`handler` — 回调函数


### `public void notifyToClient(Player player, String namespace, String system, String event, Map<String, Object> data)`

给指定玩家发送服务端事件
参数：   
`player` — 接收事件的玩家
`namespace` — 在客户端系统使用ListenForEvent监听的namespace
`system` — 在客户端系统使用ListenForEvent监听的systemName
`event` — 事件名
`data` — 事件参数。注意，要使用-2指代本地玩家的entityId。


### `public void notifyToMultiClients(List<Player> players, String namespace, String system, String event, Map<String, Object> data)`

给多个玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。
参数：   
`players` — 接收事件的玩家列表
`namespace` — 在客户端系统使用ListenForEvent监听的namespace
`system` — 在客户端系统使用ListenForEvent监听的systemName
`event` — 事件名
`data` — 事件参数


### `public void notifyToClientsNearby(@Nullable Player except, Location loc, double dist, String namespace, String system, String event, Map<String, Object> data)`

给某个位置附近一定半径内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。
参数：   
`except` — 发送事件时排除掉这个玩家，可以为null表示不排除
`loc` — 圆心位置
`dist` — 半径
`namespace` — 在客户端系统使用ListenForEvent监听的namespace
`system` — 在客户端系统使用ListenForEvent监听的systemName
`event` — 事件名
`data` — 事件参数


### `public void broadcastToAllClient(@Nullable Player except, World world, String namespace, String system, String event, Map<String, Object> data)`

给某个world内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。
参数：   
`except` — 发送事件时排除掉这个玩家，可以为null表示不排除
`world` — 所在world
`namespace` — 在客户端系统使用ListenForEvent监听的namespace
`system` — 在客户端系统使用ListenForEvent监听的systemName
`event` — 事件名
`data` — 事件参数


### `public void broadcastToAllClient(@Nullable Player except, String namespace, String system, String event, Map<String, Object> data)`

给服务器内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。
参数：  
`except` — 发送事件时排除掉这个玩家，可以为null表示不排除
`namespace` — 在客户端系统使用ListenForEvent监听的namespace
`system` — 在客户端系统使用ListenForEvent监听的systemName
`event` — 事件名
`data` — 事件参数


## API的使用例子

可以参考Spigot开服的商店DEMO： [商城Demo详解](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/27-%E6%89%8B%E6%9C%BA%E7%BD%91%E7%BB%9C%E6%B8%B8%E6%88%8F/%E8%AF%BE%E7%A8%8B10%EF%BC%9A%E4%BD%BF%E7%94%A8Spigot%E5%BC%80%E6%9C%8D/30-Spigot%E6%9C%8DDemo%E8%AF%A6%E8%A7%A3/3-%E5%95%86%E5%9F%8EDemo%E8%AF%A6%E8%A7%A3.html)  
仅仅只是将其中spigotMaster更换为nukkitMaster，其他逻辑基本相同

### 获取nukkitMaster对象
```java
import com.neteasemc.nukkitmaster.NukkitMaster;
public final class App extends PluginBase {
    NukkitMaster nukkitMaster;

    @Override
    public void onEnable() {
		// 可以直接获取instance
        nukkitMaster = NukkitMaster.getInstance();
		// 或者通过插件名字获取
		nukkitMaster = (NukkitMaster)getServer().getPluginManager().getPlugin("NukkitMaster");
    }
}
```

### 监听玩家购买商品事件、玩家催发货事件和发货逻辑
```java
    public void ListenShop() {
        PyRpcHandler shipItemHandler = new PyRpcHandler() {
            @Override
            public void onEvent(Player player, Map<String, Object> data) {
                tryShipItem(player);
            }
        };
        // 玩家催发货或者玩家购买物品成功事件进行发货检查
        nukkitMaster.listenForNukkitMasterEvent(NukkitMasterEvent.PLAYER_BUY_ITEM_SUCCESS, shipItemHandler);
        nukkitMaster.listenForNukkitMasterEvent(NukkitMasterEvent.PLAYER_URGE_SHIP, shipItemHandler);
    }

    // 获取玩家订单，并且尝试发货
    public void tryShipItem(Player player){
        FutureCallback<Map<String, Object>> cbHandler = new FutureCallback<Map<String, Object>>() {
            @Override
            public void completed(Map<String, Object> result) {
                JSONObject jsonRes = (JSONObject)result.get("json_result");
                Player requestPlayer = (Player)result.get("player");

                JSONArray entities = (JSONArray)jsonRes.get("entities");
                // 这里进行entites的订单内容发放
                List<String> finOrderIds = new ArrayList<>();
                for(int i = 0; i < entities.size(); ++i){
                    JSONObject order = (JSONObject)entities.get(i);
                    // 取出订单id，判断是否已经发放过，比如说通过本地的数据库等 
                    String orderId = order.getAsString("orderid");

                    // 对于还未发放的订单, 根据order的cmd字段进行对应的奖励逻辑发放
                    // 如：shipItemToPlayer(requestPlayer);
                    // 发放完之后记录数据库
                    // 如：saveOrder(requestPlayer, orderId);

                    // 最后通知网易服务器订单已完成
                    finOrderIds.add(orderId);
                }
                finPlayerOrder(requestPlayer, finOrderIds);
            }

            @Override
            public void failed(Exception ex) {
                // 失败原因
                getLogger().info(ex.toString());
            }

            @Override
            public void cancelled() {
                getLogger().info("取消请求玩家订单");
            }
        };
        nukkitMaster.getPlayerOrderList(player, cbHandler);
    }

    // 通知网易服务器订单完成 
    public void finPlayerOrder(Player player, List<String> finOrderList){
        FutureCallback<Map<String, Object>> cbHandler = new FutureCallback<Map<String, Object>>() {

            @Override
            public void completed(Map<String, Object> result) {
                JSONObject jsonRes = (JSONObject)result.get("json_result");
                Player requestPlayer = (Player)result.get("player");
                getLogger().info("玩家:" + requestPlayer.getDisplayName() + " 订单已完成:" + jsonRes);
            }

            @Override
            public void failed(Exception ex) {
                getLogger().info(ex.toString());
            }

            @Override
            public void cancelled() {
                getLogger().info("取消通知玩家订单完成");
            }
            
        };
        nukkitMaster.finPlayerOrder(player, finOrderList, cbHandler);
    }


```


## NukkitMaster Event事件

### `PLAYER_URGE_SHIP("player_urge_ship")`

玩家催发货事件

### `PLAYER_BUY_ITEM_SUCCESS("player_buy_item_success")`

玩家购买成功事件

### `CLIENT_LOAD_ADDON_FINISH("client_load_addon_finish")`

玩家客户端加载Mod完成事件
