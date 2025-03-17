# SpigotMasterAPI文档

com.neteasemc.spigotmaster

## 类 SpigotMaster

- java.lang.Object
  - org.bukkit.plugin.PluginBase
    - org.bukkit.plugin.java.JavaPlugin
      - com.neteasemc.spigotmaster.SpigotMaster

- 所有已实现的接口:

  org.bukkit.command.CommandExecutor, org.bukkit.command.TabCompleter, org.bukkit.command.TabExecutor, org.bukkit.plugin.Plugin

  ------

  ```
  public class SpigotMaster
  extends org.bukkit.plugin.java.JavaPlugin
  ```

- ### 构造器概要

  | 构造器和说明     |
  | :--------------- |
  | `SpigotMaster()` |

- ### 方法概要

  | 限定符和类型                     | 方法和说明                                                   |
  | :------------------------------- | :----------------------------------------------------------- |
  | `void`                           | `broadcastToAllClient(org.bukkit.entity.Player except, java.lang.String namespace, java.lang.String system, java.lang.String event, java.util.Map<java.lang.String,java.lang.Object> data)`<br>给服务器内的所有玩家发送服务端事件。 |
  | `void`                           | `broadcastToAllClient(org.bukkit.entity.Player except, org.bukkit.World world, java.lang.String namespace, java.lang.String system, java.lang.String event, java.util.Map<java.lang.String,java.lang.Object> data)`<br/>给某个world内的所有玩家发送服务端事件。 |
  | `java.lang.String`               | `getCustomItemIdentifier(org.bukkit.inventory.ItemStack spigotItemStack)`<br/>获取自定义物品名的identifier |
  | `org.bukkit.Material`            | `getCustomItemMaterial(java.lang.String customItemIdentifier)`<br/>获取自定义物品名的java材质 在目前的实现中，固定是Material.WOOD_SWORD,亦即木剑换皮 |
  | `void`                           | `listenForEvent(java.lang.String namespace, java.lang.String system, java.lang.String event, com.neteasemc.spigotmaster.PyRpcHandler handler)`<br/>注册客户端事件 |
  | `void`                           | `notifyToClient(org.bukkit.entity.Player player, java.lang.String namespace, java.lang.String system, java.lang.String event, java.util.Map<java.lang.String,java.lang.Object> data)`<br/>给指定玩家发送服务端事件 |
  | `void`                           | `notifyToClientsNearby(org.bukkit.entity.Player except, org.bukkit.Location loc, double dist, java.lang.String namespace, java.lang.String system, java.lang.String event, java.util.Map<java.lang.String,java.lang.Object> data)`<br/>给某个位置附近一定半径内的所有玩家发送服务端事件。 |
  | `void`                           | `notifyToMultiClients(java.util.List<org.bukkit.entity.Player> players, java.lang.String namespace, java.lang.String system, java.lang.String event, java.util.Map<java.lang.String,java.lang.Object> data)`<br/>给多个玩家发送服务端事件。 |
  | `void`                           | `onDisable()`                                                |
  | `void`                           | `onEnable()`                                                 |
  | `org.bukkit.inventory.ItemStack` | `setCustomItemIdentifier(org.bukkit.inventory.ItemStack spigotItemStack, java.lang.String customIdentifier)`<br/>设置自定义物品的identifier |

- ### 从类继承的方法 org.bukkit.plugin.java.JavaPlugin

  ```
  getCommand, getConfig, getDataFolder, getDefaultWorldGenerator, getDescription, getLogger, getPlugin, getPluginLoader, getProvidingPlugin, getResource, getServer, isEnabled, isNaggable, onCommand, onLoad, onTabComplete, reloadConfig, saveConfig, saveDefaultConfig, saveResource, setNaggable, toString
  ```

- ### 从类继承的方法 org.bukkit.plugin.PluginBase

  ```
  equals, getName, hashCode
  ```

- ### 从类继承的方法 java.lang.Object

  ```
  getClass, notify, notifyAll, wait, wait, wait
  ```

- ### 构造器详细资料

  

  - #### SpigotMaster

    ```
    public SpigotMaster()
    ```

- ### 方法详细资料

  

  - #### onEnable

    ```
    public void onEnable()
    ```

    - 指定者:

      `onEnable` 在接口中 `org.bukkit.plugin.Plugin`

    - 覆盖:

      `onEnable` 在类中 `org.bukkit.plugin.java.JavaPlugin`

  

  - #### onDisable

    ```
    public void onDisable()
    ```

    - 指定者:

      `onDisable` 在接口中 `org.bukkit.plugin.Plugin`

    - 覆盖:

      `onDisable` 在类中 `org.bukkit.plugin.java.JavaPlugin`

  

  - #### getCustomItemMaterial

    ```
    public org.bukkit.Material getCustomItemMaterial(java.lang.String customItemIdentifier)
    ```

    获取自定义物品名的java材质 在目前的实现中，固定是Material.WOOD_SWORD,亦即木剑换皮

    - 参数:

      `customItemIdentifier` - 自定义物品identifier

  

  - #### getCustomItemIdentifier

    ```
    public java.lang.String getCustomItemIdentifier(org.bukkit.inventory.ItemStack spigotItemStack)
    ```

    获取自定义物品名的identifier

    - 参数:

      `spigotItemStack` - itemStack

  

  - #### setCustomItemIdentifier

    ```
    public org.bukkit.inventory.ItemStack setCustomItemIdentifier(org.bukkit.inventory.ItemStack spigotItemStack,
                                                                  java.lang.String customIdentifier)
    ```

    设置自定义物品的identifier

    - 参数:

      `spigotItemStack` - itemStack

      `customIdentifier` - 自定义物品identifier

  

  - #### listenForEvent

    ```
    public void listenForEvent(java.lang.String namespace,
                               java.lang.String system,
                               java.lang.String event,
                               com.neteasemc.spigotmaster.PyRpcHandler handler)
    ```

    注册客户端事件

    - 参数:

      `namespace` - 来源客户端系统的namespace

      `system` - 来源客户端系统的systemName

      `event` - 事件名

      `handler` - 回调函数

  

  - #### notifyToClient

    ```
    public void notifyToClient(org.bukkit.entity.Player player,
                               java.lang.String namespace,
                               java.lang.String system,
                               java.lang.String event,
                               java.util.Map<java.lang.String,java.lang.Object> data)
    ```

    给指定玩家发送服务端事件

    - 参数:

      `player` - 接收事件的玩家

      `namespace` - 在客户端系统使用ListenForEvent监听的namespace

      `system` - 在客户端系统使用ListenForEvent监听的systemName

      `event` - 事件名

      `data` - 事件参数。注意，要使用-2指代本地玩家的entityId。

  

  - #### notifyToMultiClients

    ```
    public void notifyToMultiClients(java.util.List<org.bukkit.entity.Player> players,
                                     java.lang.String namespace,
                                     java.lang.String system,
                                     java.lang.String event,
                                     java.util.Map<java.lang.String,java.lang.Object> data)
    ```

    给多个玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

    - 参数:

      `players` - 接收事件的玩家列表

      `namespace` - 在客户端系统使用ListenForEvent监听的namespace

      `system` - 在客户端系统使用ListenForEvent监听的systemName

      `event` - 事件名

      `data` - 事件参数

  

  - #### notifyToClientsNearby

    ```
    public void notifyToClientsNearby(org.bukkit.entity.Player except,
                                      org.bukkit.Location loc,
                                      double dist,
                                      java.lang.String namespace,
                                      java.lang.String system,
                                      java.lang.String event,
                                      java.util.Map<java.lang.String,java.lang.Object> data)
    ```

    给某个位置附近一定半径内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

    - 参数:

      `except` - 发送事件时排除掉这个玩家，可以为null表示不排除

      `loc` - 圆心位置

      `dist` - 半径

      `namespace` - 在客户端系统使用ListenForEvent监听的namespace

      `system` - 在客户端系统使用ListenForEvent监听的systemName

      `event` - 事件名

      `data` - 事件参数

  

  - #### broadcastToAllClient

    ```
    public void broadcastToAllClient(org.bukkit.entity.Player except,
                                     org.bukkit.World world,
                                     java.lang.String namespace,
                                     java.lang.String system,
                                     java.lang.String event,
                                     java.util.Map<java.lang.String,java.lang.Object> data)
    ```

    给某个world内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

    - 参数:

      `except` - 发送事件时排除掉这个玩家，可以为null表示不排除

      `world` - 所在world

      `namespace` - 在客户端系统使用ListenForEvent监听的namespace

      `system` - 在客户端系统使用ListenForEvent监听的systemName

      `event` - 事件名

      `data` - 事件参数

  

  - #### broadcastToAllClient

    ```
    public void broadcastToAllClient(org.bukkit.entity.Player except,
                                     java.lang.String namespace,
                                     java.lang.String system,
                                     java.lang.String event,
                                     java.util.Map<java.lang.String,java.lang.Object> data)
    ```

    给服务器内的所有玩家发送服务端事件。 因为-2的entityId对于不同玩家来说都指代本机玩家，而非某个固定的实体，所以不要在多播中发送这种信息。

    - 参数:

      `except` - 发送事件时排除掉这个玩家，可以为null表示不排除

      `namespace` - 在客户端系统使用ListenForEvent监听的namespace

      `system` - 在客户端系统使用ListenForEvent监听的systemName

      `event` - 事件名

      `data` - 事件参数