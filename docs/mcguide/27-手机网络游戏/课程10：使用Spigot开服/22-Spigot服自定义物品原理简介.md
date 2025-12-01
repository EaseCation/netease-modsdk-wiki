---
front:
hard: 入门
time: 60分钟
---

# Spigot自定义物品

## 简要原理

- 基于目前Spigot服相关接口、自定义物品流程，Spigot服的自定义物品实际上是原生Java物品的换皮物品，客户端Mod利用字段**java_identifier**来标识

- Geyser服加载客户端Mod后，根据**java_identifier**字段记录自定义物品与原生Java物品的映射，并在使用物品时，调用原生物品相关的逻辑

- 对于Spigot服来说，自定义物品实际上还是原生Java物品，不过相比于Java原生物品，由自定义物品转换而来的物品会拥有额外数据用以标识

## 简要开发流程

- 对于客户端Mod来说，参照文档[自定义物品](../../20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.md)，自定义客户端物品，与基岩版区别在于，额外加上**java_identifier**字段，用于表示何种Java物品换皮
- 对于Spigot插件来说，根据Spigot相关接口，构造ItemStack物品，并实现相关逻辑
- 详细步骤可参考Demo

## Demo详解

详见文档[自定义物品Demo详解](./30-Spigot服Demo详解/1-自定义物品Demo详解.md)

## Q&A

- 目前Mod由Geyser进行分发、预加载，因此通过相同Geyser连接的玩家加载的Mod都相同，加载到的自定义物品也相同

- 目前自定义物品实际为Java原生物品换皮，因此，当**java_identifier**字段与Spigot服实际创建的物品不一致时，物品表现会存在问题

- "java_identifier"字段取值为Java版物品的命名空间ID, 如自定义物品为木剑换皮，则填 "java_identifier" : "wooden_sword"

    更多物品命名空间ID详见[官方WiKi](https://zh.minecraft.wiki/w/%E7%89%A9%E5%93%81)


- 由于配置中的**Components**有一部分为双端逻辑，因此此类**Components**的逻辑需要由Spigot插件实现，直接在Json中配置无法生效或效果异常。目前已知不可用**Component**如下：

      - 基岩版自定义物品中用于物品防火的组件
      ```
      设置物品是否防火
      "netease:fire_resistant"{ "value" : true}
      ```

      - 基岩版自定义物品中用于物品是否可做燃料的组件
      ```
      设置物品是否可作为燃料
      "netease:fuel" { "value" : true}
      ```

      - 基岩版自定义物品中用于物品的使用间隔
      ```
      设置物品使用间隔
      "netease:cooldown" : { "duration" : 5}
      ```