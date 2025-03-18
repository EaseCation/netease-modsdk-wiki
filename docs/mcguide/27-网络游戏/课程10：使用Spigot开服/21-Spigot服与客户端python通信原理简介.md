# Spigot服与客户端python通信

## 使用方法

1. spigot服需要安装SpigotMaster插件，插件api文档见[SpigotMasterAPI文档](./81-SpigotMasterAPI文档.html)

2. 客户端到spigot

   - 在spigot使用spigotMaster.listenForEvent监听事件。

   - 在客户端使用<a href="../../../mcdocs/1-ModAPI/接口/通用/事件.html#notifytoserver" rel="noopenner">NotifyToServer</a>发送事件

3. spigot到客户端

   - 在客户端使用<a href="../../../mcdocs/1-ModAPI/接口/通用/事件.html#listenforevent" rel="noopenner">ListenForEvent</a>监听事件

   - 在spigot使用spigotMaster.notifyToClient或其他多播接口发送事件

示例：

- spigot侧

  ```java
  public void onEnable() {
  	SpigotMaster spigotMaster = (SpigotMaster) Bukkit.getPluginManager().getPlugin("SpigotMaster");
      if (spigotMaster != null){
          // 监听事件，然后原封不动发回去
          spigotMaster.listenForEvent("MyMod", "MySystemClient", "clientEvent", new PyRpcHandler() {
              @Override
              public void onEvent(Player player, Map<String, Object> map) {
                  spigotMaster.notifyToClient(player, "MyMod", "MySystemServer", "serverEvent", map);
              }
          });
      }
  }
  ```

- python侧

  ```python
  # modMain.py
  @Mod.InitClient()
  def InitClient(self):
      clientApi.RegisterSystem("MyMod", "MySystemClient", client_system_class_path)

  # clientSystem
  class MySystemClient(ClientSystem):
      def __init__(self, namespace, systemName):
          ClientSystem.__init__(self, namespace, systemName)
          # 注册事件，在回调函数中打印参数
          self.ListenForEvent("MyMod", "MySystemServer", "serverEvent", self, self.onEvent)
          # 给spigot发一个事件
          self.NotifyToServer("clientEvent", {'a': 1})

      def onEvent(self, data):
          # 可以在客户端日志中看到onEvent {"a": 1}
          print 'onEvent', data
  ```



## 事件支持的参数类型及映射关系

| Java类型                 | Python类型 |
| ------------------------ | ---------- |
| null                     | None       |
| boolean                  | bool       |
| int                      | int        |
| long                     | long       |
| BigInteger(2^63到2^64-1) | long       |
| float                    | float      |
| double                   | float      |
| String                   | str        |
| List\<Object\>           | list       |
| Map<String, Object>      | dict       |

### Python发送给Java

| Python类型                               | Java类型   |
| ---------------------------------------- | ---------- |
| None                                     | null       |
| bool                                     | Boolean    |
| int/long（-2^31到2^31-1）                | Integer    |
| int/long（-2^63到-2^31-1，2^31到2^63-1） | Long       |
| int/long（2^63到2^64-1）                 | BigInteger |
| float                 | Double |
| str                   | String  |
| list                  | List\<Object\> |
| dict（key必须为str）       | Map<String, Object> |



## 关于entityId的注意事项

- 客户端侧的**非玩家实体**的entityId与spigot侧org.bukkit.entity.Entity.getEntityId()获取的实体id相同

- 请注意spigot获取的实体id类型为**int**，而客户端modsdk接口需要的实体id类型为**str**

- 但客户端侧会存在一些负数的实体id，会geyser做协议转换时生成的虚拟实体，在spigot侧没有对应的实体

- 在**每个客户端**视角来看，**本地玩家的entityId永远为-2**，其他玩家的entityId与spigot侧getEntityId相同，也就是说：

  - 客户端使用GetLocalPlayerId永远返回-2。如果将他发给spigot，那spigot是不能直接根据这个id获取到玩家的，需要做一些特殊处理

    ```java
    spigotMaster.listenForEvent("MyMod", "MySystemClient", "clientEvent", new PyRpcHandler() {
        @Override
        public void onEvent(Player player, Map<String, Object> map) {
            Player eventPlayer;
            String entityId = (String) map.get("entityId");
            if (entityId.equals("-2")) {
                eventPlayer = player;
            }
            else {
                // 将entityId转成int然后去获取对应player
            }
            // 处理eventPlayer的逻辑
        }
    });
    ```

  - 如果在spigot侧使用getEntityId的返回值发给该玩家，那玩家客户端无法根据这个id获取到本地玩家，需要做一些特殊处理

    ```java
    int entityId;
    if (sendPlayer == player) {
    	entityId = -2;
    }
    else {
    	entityId = player.getEntityId()
    }
    map.put("entityId", entityId)
    spigotMaster.notifyToClient(sendPlayer, "MyMod", "MySystemServer", "serverEvent", map);
    ```

## Demo详解

详见文档[Python通信Demo详解](./30-Spigot服Demo详解/2-Python通信Demo详解.md)