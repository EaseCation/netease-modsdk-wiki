---
front:
hard: 入门
time: 60分钟
---

# Spigot自定义实体

## 简要原理

目前Spigot服自定义实体基于实体metadata实现，换皮/继承创建实体的同时写入自定义实体identifier
  - 客户端identifier和服务端identifier无须一一对应，只需要在创建生物时确定即可

## 简要开发流程

- 开发流程如下：
  1. 编写客户端Mod，制作生物的模型、贴图、动画、客户端逻辑等
  2. 编写Spigot插件，制作生物运行逻辑、属性、生成规则等

- 对于客户端Mod来说，请参照文档 [自定义生物](../../20-玩法开发/15-自定义游戏内容/3-自定义生物/01-自定义基础生物.md) 制作生物的模型、贴图、动画等
  - 与纯基岩版的自定义生物区别在于，绝大部分Components、ComponentGroups、events均需要通过Java插件实现，无法通过Json配置生效
  - 客户端Mod的主要作用为告知客户端当生成对应Identifier生物时，渲染的模型、贴图、动画、碰撞体等

- 对于Spigot插件来说，目前支持了三种自定义生物方式
  - 简单换皮指定生物，并通过Spigot接口，修改生物属性，如血量等
  - 兼容MythicMob插件，继承MythicMob生物类
    - (Demo展示了4.13.0版本MythicMob的兼容方式)
    - 其他版本的MythicMob请根据各个版本的接口进行兼容
  - 反射注册类生物，并创建新生物类实例，覆写继承类方法，如攻击等，最后加入到世界中
- 详细步骤可参考Demo

## Demo详解

详见文档[自定义实体Demo详解](./30-Spigot服Demo详解/5-自定义实体Demo详解.md)

## Q&A

- 由于配置中的**components**、**component_groups**、**events**均为服务端逻辑，因此均需Spigot插件实现，直接在Json中配置无法生效或效果异常。目前已知可用的**components**如下：

      - 自定义生物components
      ```
      // 设置生物碰撞盒大小
      "minecraft:collision_box": {
          "width": 3,
          "height": 3
      }

      // 设置生物可骑乘、骑乘位置，偏移、蹲伏可交互等
      "minecraft:rideable": {
        "priority": 0,
        "seat_count": 2,
        "crouching_skip_interact": true,
        "family_types": [
            "player"
        ],

        "seats": [
          {
            "position": [ 0.0, 1, 0.0 ]
          },
          {
            "position": [ 0.0, 1, -1.0 ]
          }
        ]
      },

      // 设置骑乘生物是否可以蓄力跳跃，有则可跳跃，没有则不可跳跃
      "minecraft:can_power_jump" : {}
      ```

- 1.12版本的Spigot由于需要使用Viaversion，因此在通过反射注册新生物时，需要注意生物的type必须复用已有的生物，或者同时为Viaversion注册，不然会出现生物无法生成的问题。

