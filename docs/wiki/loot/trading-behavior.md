---
title: 交易行为
category: 基础
nav_order: 2
mentions:
    - Ciosciaa
    - MedicalJewel105
---

# 交易行为

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

通过 `minecraft:trade_table` 或 `minecraft:economy_trade_table` 组件可以将实体设置为交易者。这两个组件都会根据指定路径打开交易界面，但经济交易组件包含更多与村庄与掠夺版本交易机制相关的配置选项。其他需要添加的AI目标包括 `minecraft:behavior.trade_with_player`，可选添加 `minecraft.behavior:trade_interest`（允许生物手持/展示交易物品），以及可能需要添加 `"minecraft:trade_resupply": {}`。

对于基础交易界面，使用 `trade_table` + `trade_with_player` 组件即可实现。

1. 在实体组件中添加 `"minecraft:behavior.trade_with_player": {}`
2. 将以下代码复制到实体的组件组中（示例组件组命名为 `"wiki:trader"`）:

::: code-group
```json [BP/entities/trader.json]
"minecraft:trade_table": {
	"display_name": "交易实体", // 显示的名称文本
	"table": "trading/trading_entity_trades.json", // 交易表文件路径
	"new_screen": true //设置为 false 时，界面会显示为村庄与掠夺版本之前的样式
}
```
:::

3. 确保通过事件添加该组件组。建议在 `minecraft:entity_spawned` 生成事件中添加，该事件会在实体生成时触发。
若对事件和组件组的运作机制不够熟悉，建议先学习[实体入门指南](/wiki/entities/entity-intro-bp)中的相关概念。

:::warning
若直接在主组件中（components）添加该组件，将会导致各种问题（包括所有实体交易界面显示空白）。由于交易类AI目标的机制问题，必须通过组件组形式添加。
:::