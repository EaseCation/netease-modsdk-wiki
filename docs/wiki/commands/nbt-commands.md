---
title: NBT 命令
category: 基础
mentions:
    - MedicalJewel105
    - SirLich
    - Veka0
    - StuartDA
    - Sprunkles137
    - TheItsNameless
    - SmokeyStack
---

# NBT 命令

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

基岩版中可用的 NBT 数据较为有限，目前支持的四类 NBT 为:

1. `CanPlaceOn`（可放置于）
2. `CanDestroy`（可破坏）
3. `KeepOnDeath`（死亡保留）
4. `ItemLock`（物品锁定）

这些 NBT 需要通过 `/give` 或 `replaceitem` 命令应用，能够修改物品的特定属性。

## CanPlaceOn 与 CanDestroy

破坏权限示例:
```bash
/give @p diamond_pickaxe 1 0 {"minecraft:can_destroy":{"blocks":["planks", "skull"]}}
```

放置权限示例:
```bash
/give @p stone 1 0 {"minecraft:can_place_on":{"blocks":["stone"]}}
```

多方块添加格式:
```json
["stone", "dirt", "bedrock"]
```

> **注意**  
> - 游戏将生物头颅视为可破坏方块  
> - 这两个 NBT 仅在冒险模式生效

### 全方块放置权限

以下代码可使方块能够放置在游戏内所有方块表面：

**特别注意：若列表中存在至少一个无效方块，此功能将失效！**

::: code-group
```json [全方块列表]
give @p stone 1 0 {"minecraft:can_place_on": {"blocks": ["acacia_button", ...（完整列表见原文）..., "yellow_wool"]}}
```

*最后更新版本：1.20.10*
:::

## ItemLock 物品锁定

锁定在任意物品栏位:
```bash
/give @p iron_axe 1 100 {"minecraft:item_lock":{ "mode": "lock_in_inventory" }}
```

锁定在特定物品栏位:
```bash
/give @p apple 1 0 {"minecraft:item_lock":{ "mode": "lock_in_slot" }}
```

> **特性说明**  
> - 两种锁定模式互斥  
> - 在冒险/生存模式均可生效  
> - 可通过资源包修改锁定图标显示

### 自定义锁定显示

- **纹理替换**  
  替换尺寸为 `16x16` 的纹理文件：  
  `RP/textures/ui/item_lock_red.png`（红色锁定）  
  `RP/textures/ui/item_lock_yellow.png`（黄色锁定）

- **本地化文本**  
  可覆盖以下翻译键修改提示文本：
```ini
item.itemLock.cantDrop=:hollow_star: 无法丢弃 物品不可被：
item.itemLock.cantMove=:solid_star: 无法移动 物品不可被：
item.itemLock.hoverText.cantBe.moved=移动
item.itemLock.hoverText.cantBe.dropped=丢弃
item.itemLock.hoverText.cantBe.removed=移除
item.itemLock.hoverText.cantBe.craftedWith=用于合成
item.itemLock.keepOnDeath=死亡时保留此物品
item.itemLock.popupNotice.cantDrop=:hollow_star: 无法丢弃 物品不可被：丢弃、移除、用于合成
item.itemLock.popupNotice.cantMove=:solid_star: 无法移动 物品不可被：移动、丢弃、移除、用于合成
```

- **隐藏提示**  
  使用游戏规则关闭显示：  
  ```bash
  /gamerule showtags false
  ```

## KeepOnDeath 死亡保留

为实体添加死亡保留物品：
```bash
/replaceitem entity @e[type=zombie] slot.weapon.mainhand -1 cooked_beef 1 0 {"minecraft:keep_on_death":{}}
```

> **注意事项**  
> - 非玩家实体死亡后不会保留物品（因其无法重生）  
> - 仍可通过 `/clear` 或 `/replaceitem` 操作物品栏  
> - 与 `/gamerule keepinventory true` 全局保留的区别：该 NBT 支持物品级细粒度控制  
> - 冒险/生存模式均有效

## NBT 组合应用

组合锁定与保留示例：
```bash
# 给予所有玩家特定槽位锁定且死亡保留的弓
/give @a bow 1 0 {"minecraft:item_lock":{ "mode": "lock_in_slot" }, "minecraft:keep_on_death":{}}

# 给予自己可破坏泥土/沙子且全局锁定的石铲
/give @s stone_shovel 1 0 {"minecraft:can_destroy":{"blocks":["dirt", "sand"]},"minecraft:item_lock":{ "mode": "lock_in_inventory" }}
```

## 补充说明

- **数据值指定问题**  
  尝试通过 `stained_glass:2` 等形式指定方块数据值时，会触发 "could not be updated" 错误（当前版本存在此限制）

错误示例：
```bash
/give @s cobblestone 64 0 {"minecraft:can_place_on":{"blocks":["stained_glass:2"]}}
/give @a wooden_axe 16 0 {"minecraft:can_destroy":{"blocks":["wool:5"]}}
```

- **无效命令检测**  
  系统会自动拦截不符合逻辑的命令组合，例如尝试为不可放置物品添加放置权限：
```bash
/give @a diamond 10 0 {"minecraft:can_place_on":{"blocks":["dirt"]}}
```

- **战利品表/交易限制**  
  目前无法通过战利品表或交易表直接赋予 NBT 属性，需要通过克隆预置容器等间接方式实现。