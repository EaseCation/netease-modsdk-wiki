---
title: 扩展结构限制
category: 巧思案例
mentions:
    - MedicalJewel105
tags:
    - 简单
---

# 扩展结构限制

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

[structure]: /assets/images/nbt/structure.png
[int]: /assets/images/nbt/int.png
[list]: /assets/images/nbt/list.png
[compound]: /assets/images/nbt/compound.png
[string]: /assets/images/nbt/string.png

:::warning 已弃用
该方法在1.20.50版本更新后已失效。
:::

默认情况下，Minecraft不允许保存超过64x255x64大小的结构。本教程将指导你如何扩展结构方块的可保存范围。

## 编辑NBT数据

1. 将结构方块放入结构中并导出
2. 使用NBT编辑器（本文使用NBT Studio）打开结构文件，定位到结构方块数据

如果你的结构中仅包含结构方块，可以在此处找到对应数据：

::: code-group
```json [extending_structure_block.mcstructure]
> [compound] structure
> > [compound] palette
> > > [compound] default
> > > > [compound] block_position_data
> > > > > [compound] 0
```

![](/assets/images/nbt/structure-limits/nbt-screenshot-1.png)
:::

3. 将`xStructureSize`、`yStructureSize`和`zStructureSize`的值修改为所需尺寸
4. 保存结构文件并在游戏中加载

![](/assets/images/nbt/structure-limits/result.png)

## 使用技巧

- **快速获取结构方块**：按住Ctrl键时点击鼠标滚轮可获取当前结构方块
- **优化加载性能**：加载大型结构时建议启用"按方块放置"加载动画，可有效减少卡顿

# 扩展结构限制 {#extending-structure-limits}

:::tip 版本提示
本文所述方法适用于基岩版1.20.50之前的版本
:::

通过修改NBT数据，你可以突破以下默认限制：
- X轴最大范围：64 → 384
- Y轴最大范围：256 → 256（不可修改）
- Z轴最大范围：64 → 384

实际测试表明，修改后的结构在加载时可能出现以下现象：
- 超出区块边界的部分会循环加载
- 过大的结构可能导致客户端性能下降

建议遵循以下最佳实践：
1. 使用`/testforblock`命令验证结构完整性
2. 分区块逐步加载大型建筑
3. 配合`/tickingarea`命令保持活动区块

```json
// 示例：修改后的NBT结构片段
"structure": {
    "palette": {
        "default": {
            "block_position_data": {
                "0": {
                    "xStructureSize": 128,
                    "yStructureSize": 256, 
                    "zStructureSize": 128
                }
            }
        }
    }
}
```

:::caution 注意事项
- 修改后的结构文件在不同版本间可能存在兼容性问题
- 使用第三方NBT编辑器时请做好文件备份
- 服务器环境需要同步所有客户端的结构文件
:::

通过合理运用这些技巧，你可以轻松实现以下建筑效果：
- 超大型红石计算机
- 全景式地形景观
- 多维度联动的复杂机关

最后更新：2023年11月（适用于基岩版1.19.80）