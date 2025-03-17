# SpigotMaster简要API文档

- 注册与发送客户端事件

   spigot侧：

   - map中的值支持的数据类型：
   
     | Java类型                | Python类型        |
     | ----------------------- | ----------------- |
     | null                    | None              |
     | boolean                 | bool              |
     | int                     | int               |
     | long                    | long              |
     | BigInteger(2^63~2^64-1) | long(2^63~2^64-1) |
     | float                   | float             |
     | double                  | float             |
     | String                  | str               |
     | List\<Object\>          | list              |
     | Map<String, Object>     | dict              |
   
- 客户端侧的实体id与spigot侧org.bukkit.entity.Entity.getEntityId()获取的实体id相同
  
   - 请注意spigot获取的实体id类型为**int**，而客户端modsdk接口需要的实体id类型为**str**
   
   - 但客户端侧会存在一些负数的实体id，会geyser做协议转换时生成的虚拟实体，在spigot侧没有对应的实体
   
   示例：
   
   ```java
   public void onEnable() {
   	SpigotMaster spigotMaster = (SpigotMaster) Bukkit.getPluginManager().getPlugin("SpigotMaster");
       if (spigotMaster != null){
           spigotMaster.listenForEvent("MyMod", "MySystemClient", "clientEvent", new PyRpcHandler() {
               @Override
               public void onEvent(Player player, Map<String, Object> map) {
                   spigotMaster.notifyToClient(player, "MyMod", "MySystemServer", "serverEvent", map);
               }
           });
       }
   }
   ```
   
   客户端侧：
   
   ```python
   # modMain.py
   @Mod.InitClient()
   def InitClient(self):
       clientApi.RegisterSystem("MyMod", "MySystemClient", client_system_class_path)
       
   # clientSystem
   class MySystemClient(ClientSystem):
       def __init__(self, namespace, systemName):
           ClientSystem.__init__(self, namespace, systemName)
           self.ListenForEvent("MyMod", "MySystemServer", "serverEvent", self, self.onEvent)
           self.NotifyToServer("clientEvent", {'a': 1})
          
       def onEvent(self, data):
           print 'onEvent', data
   ```

## API

class SpigotMaster

- listenForEvent

  监听客户端事件

- notifyToClient

  发事件到指定player

- notifyToMultiClients

  发事件到多个player

- notifyToClientsNearby

  发事件到位置附近的player

- broadcastToAllClient

  广播事件到server中所有player

- getCustomItemIdentifier(itemStack)
  获取自定义物品identifier
  @Param ItemStack itemStack spigot生成的itemStack
  @Return String customItemIdentifier 当物品为自定义物品时，返回自定义物品的identifier，其他情况返回null

- setCustomItemIdentifier(itemStack, customItemIdentifier)
  设置自定义物品identifier
  @Param itemStack spigot生成的itemStack
  @Param String customItemIdentifier 自定义物品的identifier

- getCustomItemMaterial(customItemIdentifier)
  获取自定义物品identifier
  @Param String customItemIdentifier 自定义物品的identifier
  @Return Mateiral 目前版本V1.1.0版本中，固定返回Material.WOOD_SWORD(亦即木剑换皮)