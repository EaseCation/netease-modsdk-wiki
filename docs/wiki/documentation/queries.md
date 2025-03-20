---
title: Molang 查询
toc_max_level: 2
mentions:
    - SirLich
    - solvedDev
    - stirante
    - SmokeyStack
    - Dreamedc2015
    - Ultr4Anubis
    - MedicalJewel105
    - TreaBeane
    - r4isen1920
    - ChillRx
    - Luthorius
    - TheItsNameless
    - ThomasOrs
---

# Molang 查询

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

基岩版官方Molang文档存在诸多不足。本页面旨在通过为各个查询提供额外详细信息（在可能的情况下）改善这一现状。建议通过侧边栏导航或使用`Ctrl+F`进行搜索查阅，无需全文通读。

:::tip
本页面并非完整列表！仅包含我们补充了额外信息的查询。完整查询列表可访问[此处](https://bedrock.dev/docs/stable/Molang#List%20of%20Entity%20Queries)查看！
:::

## query.armor_texture_slot

语法格式：`query.armor_texture_slot(x) = y`

其中`x`和`y`均为整型参数，对应以下表格：

### X 参数

| 参数值 | 装备槽位   |
| ------ | ---------- |
| 0      | 头盔       |
| 1      | 胸甲       |
| 2      | 护腿       |
| 3      | 靴子       |

### Y 参数（常规）

| 参数值 | 材质类型           |
| ------ | ------------------ |
| -1     | 无装备             |
| 0      | 皮革护甲           |
| 1      | 锁链护甲           |
| 2      | 铁护甲             |
| 3      | 钻石护甲           |
| 4      | 金护甲             |
| 5      | 鞘翅               |
| 6      | 海龟壳头盔         |
| 7      | 下界合金护甲       |

### Y 参数（马匹）

| 参数值 | 材质类型           |
| ------ | ------------------ |
| 1      | 皮革马铠           |
| 2      | 铁马铠             |
| 3      | 金马铠             |
| 4      | 钻石马铠           |

### 示例

`query.armor_texture_slot(3) == 1`：检测是否穿着铁靴子

## query.armor_material_slot

语法格式：`query.armor_material_slot(x) = y`

其中`x`和`y`均为整型参数，对应以下表格：

### X 参数

| 参数值 | 装备槽位   |
| ------ | ---------- |
| 0      | 头盔       |
| 1      | 胸甲       |
| 2      | 护腿       |
| 3      | 靴子       |

### Y 参数（推测值）

| 参数值 | 材质类型               |
| ------ | ---------------------- |
| 0      | 默认护甲材质           |
| 1      | 附魔护甲材质           |
| 2      | 皮革护甲材质           |
| 3      | 附魔皮革护甲材质       |

## query.armor_color_slot

*注意：截至版本`1.16.100.51`，此查询会导致游戏崩溃，可能在后续版本修复*

语法格式：`color = query.armor_color_slot(slot, channel)`

其中`slot`和`channel`均为整型参数，对应以下表格：

### Slot 参数

| 参数值 | 装备槽位   |
| ------ | ---------- |
| 0      | 头盔       |
| 1      | 胸甲       |
| 2      | 护腿       |
| 3      | 靴子       |

### Channel 参数

| 参数值 | 颜色通道       |
| ------ | -------------- |
| 0      | 红色通道       |
| 1      | 绿色通道       |
| 2      | 蓝色通道       |
| 3      | 透明度通道     |

### 返回值

返回指定通道的颜色值（0-1范围）

## query.get_equipped_item_name

:::warning
**已弃用查询**：建议优先使用新查询`query.is_item_name_any`，此查询未来仍会保留以兼容旧版本
:::

语法格式：`query.get_equipped_item_name('main_hand') = 'item_name'`

接受一个可选的手部槽位参数（0或'main_hand'表示主手，1或'off_hand'表示副手），第二个参数（0=默认）用于选择装备物品或当前渲染物品，返回对应槽位的物品名称（无参数时默认主手），无物品时返回空字符串。

`item_name`需使用不带命名空间的物品ID，注意保留引号

示例：`"query.get_equipped_item_name == 'diamond'"`

**如何检测背包物品？可以使用新查询`query.is_item_name_any`！**

## query.get_name

:::warning
**已弃用查询**：建议优先使用新查询`query.is_name_any`，此查询未来仍会保留以兼容旧版本
:::

语法格式：`query.get_name == '名称'`

当实体显示名称匹配时返回true（需使用OnixClient等工具查看第三方视角名称），需在特定条件下使用

<Spoiler title="展开示例">

::: code-group
```json [animation_controllers/ac.json]
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.ac": {
            "initial_state": "default",
            "states": {
                "default": {
                    "transitions": [
                        {
                            "active": "query.is_alive"
                        }
                    ]
                },
                "active": {
                    "transitions": [
                        {
                            "default": "(1.0)"
                        }
                    ],
                    "animations": [
                        {
                            "anim": "query.get_name == '...'" // 只能在此处使用！
                        }
                    ]
                }
            }
        }
    }
}
```
:::

</Spoiler>

## query.is_name_any

语法格式：`query.is_name_any('名称1', '名称2')`

接受一个或多个参数，当实体显示名称匹配任一参数时返回true，需在特定条件下使用

<Spoiler title="展开示例">

::: code-group
```json [animation_controllers/ac.json]
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.ac": {
            "initial_state": "default",
            "states": {
                "default": {
                    "transitions": [
                        {
                            "active": "query.is_alive"
                        }
                    ]
                },
                "active": {
                    "transitions": [
                        {
                            "default": "(1.0)"
                        }
                    ],
                    "animations": [
                        {
                            "anim": "query.is_name_any(...)" // 只能在此处使用！
                        }
                    ]
                }
            }
        }
    }
}
```
:::

</Spoiler>

## query.is_item_name_any

语法格式：`query.is_item_name_any('slot.weapon.mainhand', 0, '命名空间:物品名称')`

参数顺序：装备槽名称 → 槽位索引 → 带命名空间的物品名称列表

可用槽位列表：
| 槽位名称              | 槽位数 | 说明                          |
| -------------------- | ------ | ----------------------------- |
| `slot.weapon.mainhand` | 0      | 主手持握物品                  |
| `slot.weapon.offhand`  | 0      | 副手（盾牌、地图等）          |
| `slot.armor.head`      | 0      | 头部护甲                      |
| `slot.armor.chest`     | 0      | 胸甲                          |
| `slot.armor.legs`      | 0      | 护腿                          |
| `slot.armor.feet`      | 0      | 靴子                          |
| `slot.armor`           | 0      | 马铠                          |
| `slot.saddle`          | 0      | 鞍具                          |
| `slot.hotbar`          | 0-8    | 玩家快捷栏                    |
| `slot.inventory`       | 可变   | 实体库存（箱子矿车、驴等）    |
| `slot.enderchest`      | 0-26   | 末影箱（仅玩家）              |

### 检测玩家背包物品

示例代码：
```molang
t.val = 0; 
t.i = 0; 
loop(27, {
    t.val = q.is_item_name_any('slot.inventory', t.i, '命名空间:物品名称');
    t.val ? {return t.val;}; 
    t.i = t.i+1;
});
```
替换`命名空间:物品名称`为目标物品，此代码会遍历27个背包槽位，检测到目标物品时返回1.0。注意快捷栏与主背包槽位独立，需分开检测。

## query.is_enchanted

语法格式：`is_enchanted = query.is_enchanted`

返回1.0（已附魔）或0.0（未附魔）

*目前仅能在材质中使用*

## query.is_eating

检测实体是否处于"进食"状态（不适用于玩家）。需配合以下组件使用：
- `minecraft:behavior.eat_carried_item`
- `minecraft:behavior.snacking`

## query.is_ghost

语法格式：`is_ghost = query.is_ghost`

返回1.0（幽灵实体）或0.0

*当前仅对守护者幽灵有效，用于渲染控制*

## query.is_grazing

语法格式：`is_grazing = query.is_grazing`

检测实体是否在啃食方块（如绵羊吃草）

*目前仅对绵羊及使用绵羊运行ID的实体有效*

## query.is_jumping

语法格式：`is_jumping = query.is_jumping`

返回1.0（跳跃中）或0.0

玩家触发条件：
- 按下跳跃键（包含水中跳跃、攀爬脚手架）
- 自动跳跃触发
- 游泳时自动跳跃
- 骑乘实体蓄力跳跃

## query.modified_move_speed

语法格式：`modified_move_speed = query.modified_move_speed`

返回实体当前移动速度（受幼体、着火等状态影响）

参考值：
- 行走：约0.86
- 疾跑：1.0
- 疾跑跳跃：0.35
- 着火行走：1.0
- 着火疾跑：1.0
- 着火疾跑跳跃：0.525

## query.log

将日志输出到调试日志（注意：content log与debug log不同）

## query.on_fire_time

语法格式：`on_fire_time = query.on_fire_time`

返回实体着火/灭火后的持续时间（刻），未着火时返回0.0

计时规则：
- 实体生成：0
- 点燃：开始递增（1刻/次）
- 灭火：重置0并继续递增
- 重复点燃/灭火：每次状态变化重置计时

## query.scoreboard

语法格式：`query.scoreboard('计分项名称') > 数值`

根据计分板值返回1.0或0.0

注意：
- 无法检测含大写字母的计分项（如`testFoo`无效，需使用`testfoo`）
- 部分情况可能异常

## query.structural_integrity

语法格式：`structural_integrity = query.structural_integrity`

用于船和矿车的耐久系统（受攻击减少，随时间恢复）

*可能无法用于其他实体*

## variable.attack_time

### 说明

该变量作为查询使用，可在任意实体（客户端/服务端）生效，无需预先定义

### 实体行为

追踪实体攻击动作进度：
- 未攻击：0.0
- 攻击中：0.0~总攻击时间（约0.3）
- 玩家：0.0~1.0（线性增长）

### 玩家行为

追踪手臂摆动动作（包含以下情况）：
- 放置方块
- 放置实体
- 交互动作（当启用摆动时）
- 近战攻击

## query.is_roaring

当实体执行`knockback_roar`攻击时返回true

## query.head_x_rotation

语法格式：`query.head_x_rotation(x)`

`x`参数指定头部编号（主要用于凋灵）

返回值：
- 仰角（向上-89.9，向下89.9）

## query.head_y_rotation

语法格式：`query.head_y_rotation(x)`

`x`参数指定头部编号（主要用于凋灵）

返回值：
- 偏航角（-179.9~179.9，循环变化）

## query.target_x_rotation 与 query.target_y_rotation

功能同`query.head_*_rotation`，但无需指定头部参数

## query.time_of_day

返回维度时间（午夜=0.0，日出=0.25，正午=0.5，日落=0.75）

计算公式：`(当前刻数*0.25/2400) mod 1`

时间对应表：

<Spoiler title="展开时间表">

| query.time_of_day | 游戏刻数 |
| ----------------- | -------- |
| 0.00              | 18000    |
| 0.25              | 0        |
| 0.50              | 6000     |
| 0.75              | 12000    |
| ...               | ...      |

*完整表格详见原文档*

</Spoiler>

## query.eye_target_x_rotation 与 query.eye_target_y_rotation

不适用于玩家，具体用途待验证

## variable.short_arm_offset_right

返回玩家右臂骨骼偏移因子：
- 细臂皮肤（3像素宽）：0.5
- 常规皮肤（4像素宽）：0.0

*注意：需进入第一人称视角初始化变量*

## variable.short_arm_offset_left

功能同`variable.short_arm_offset_right`，对应左臂骨骼

## query.movement_direction

返回实体移动方向向量的归一化分量（模长0~1）

注意：实际值受移动速度影响（地面移动值小于空中相同方向）

归一化处理示例：
```molang
variable.mag = math.sqrt(math.pow(query.movement_direction(0),2) + ...);
variable.xNorm = query.movement_direction(0)/variable.mag;
// y/z同理
```

| 参数 | 轴向 |
| ---- | ---- |
| 0    | X轴  |
| 1    | Y轴  |
| 2    | Z轴  |

## query.block_neighbor_has_any_tag 与 query.relative_block_has_any_tag

*需启用`Experimental Molang Features`*

语法：
- `q.block_neighbor_has_any_tag(x,y,z,'标签')`
- `q.relative_block_has_any_tag(x,y,z,'标签')`

示例：
- `q.relative_block_has_any_tag(0,-1,0,'grass')`：检测实体下方草方块
- 支持多标签检测：`q.query(0,-1,0,'grass','plant')`

可检测原版与[自定义方块标签](/wiki/blocks/block-tags)