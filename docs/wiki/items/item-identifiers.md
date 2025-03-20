---
title: 原版物品标识符
category: 文档
tags:
    - 已弃用
mentions:
    - TheDoctor15
    - Medicaljewel105
    - Luthorius
    - epxzzy
    - SmokeyStack
---

# 原版物品标识符

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

:::danger
该方法在 1.18.30 版本后已失效。
:::

`identifier`（标识符）是物品行为文件中必须填写的参数。它接受原版 Minecraft 的名称，格式为 `<命名空间>:<原版物品>`，这将根据使用的标识符应用某些硬编码的物品行为。

::: code-group
```json [BP/items/custom_item.json#minecraft:item]
"description": {
    "identifier": "wiki:totem_of_undying",
    "category": "items"
}
```
:::

:::warning
并非所有原版标识符及其行为都有官方文档记录。以下列表可能遗漏了已知标识符的重要特性。

建议自行实验测试。
:::

## 已知标识符效果

允许修改命名空间，更多信息请参考[命名空间](/wiki/concepts/namespaces)。

### 命名空间:banner

-   物品图标和模型将变为原版旗帜的样式

---

### 命名空间:bow

-   使用时会显示小幅放大效果（需要物品具有可使用属性才能生效）

---

### 命名空间:crossbow

-   物品在手臂上会保持水平旋转状态

---

### 命名空间:diamond

-   可作为有效物品来更改信标发出的效果

---

### 命名空间:emerald

-   可作为有效物品来更改信标发出的效果

---

### 命名空间:filled_map

-   添加持地图动画
-   可放入制图台使用

---

### 命名空间:gold_ingot

-   可作为有效物品来更改信标发出的效果

---

### 命名空间:iron_ingot

-   可作为有效物品来更改信标发出的效果

---

### 命名空间:lapis_lazuli

-   可在附魔台中替代青金石用于物品附魔

---

### 命名空间:lead

-   具备拴绳的牵引功能

---

### 命名空间:map

-   使用持地图动画

---

### 命名空间:netherite_ingot

-   可作为锻造台配方中的次级材料
-   可作为有效物品来更改信标发出的效果

---

### 命名空间:shield

-   物品图标将永久变为原版盾牌样式
-   添加盾牌动画和格挡功能

---

### 命名空间:spyglass

-   具备望远镜缩放功能（需要物品具有可使用属性才能生效）

---

### 命名空间:skull

-   物品图标将变为原版头颅样式
-   可放置在盔甲架和玩家头部，此时会应用头颅的模型和材质

---

### 命名空间:totem_of_undying

-   具备不死图腾的复活功能

---