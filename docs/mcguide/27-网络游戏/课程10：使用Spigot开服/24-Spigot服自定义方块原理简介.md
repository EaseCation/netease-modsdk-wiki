---
front:
hard: 入门
time: 60分钟
---

# Spigot自定义方块原理简介

## 简要原理

目前Spigot服自定义方块实际上为头颅换皮

当头颅的 **SkullOwner** 由形如 **geyser_custom_block_xxx(自定义方块identifier)** 组成时，Geyser会把对应头颅方块转换成客户端自定义方块

如：
- SkullOwner : "geyser_custom_block_custom:my_block1" 的头颅
    最终会转成客户端自定义方块 **custom:my_block1**
- SkullOwner : "geyser_custom_block_custom:my_block2" 的头颅
    最终会转成客户端自定义方块 **custom:my_block2**
- SkullOwner : "geyser_custom_block_custom:my_block3" 的头颅
    最终会转成客户端自定义方块 **custom:my_block3**
- SkullOwner : "geyser_custom_block_custom:custom_block_squirrel" 的头颅
    最终会转成客户端自定义方块 **custom:custom_block_squirrel**
## 简要开发流程

- 开发流程如下：
  1. 编写客户端Mod，配置方块Json、客户端逻辑等
  2. 编写Spigot插件，制作基于头颅实体的自定义逻辑等

- 对于客户端Mod来说，请参照文档 [自定义生物](../../20-玩法开发/15-自定义游戏内容/2-自定义方块/0-自定义方块概述.md) 制作自定义方块

- 对于Spigot插件来说，仅需给对应Skull方块设置上给定要求的SkullOwner即可，如：
  - 简单发放物品的情况：
      ```
        /give @s minecraft:skull 64 3 {SkullOwner: { "Name" : "geyser_custom_block_custom:my_block3"}}
      ```
  - 设置方块的情况：
      ```
        Location loc = new Location(world, x, y, z);
        Block block = loc.getBlock();
        block.setType(Material.SKULL);
        Skull skull = (Skull) block.getState();
        String owner = "geyser_custom_block_custom:my_block3";
        skull.setOwningPlayer(Bukkit.getOfflinePlayer(owner));
        skull.update();
      ```

## Demo详解

详见文档[自定义实体Demo详解](./30-Spigot服Demo详解/7-自定义方块Demo详解.md)

## 鸣谢

  感谢 **布吉岛（妖猫）** 团队对自定义方块功能的支持