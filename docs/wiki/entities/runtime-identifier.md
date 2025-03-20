---
title: 运行时标识符
category: 文档
mentions:
    - MedicalJewel105
    - aexer0e
    - Luthorius
    - SirLich
    - TheDoctor15
    - ChibiMango
    - stirante
    - epxzzy
    - IlkinQafarov
    - TheItsNameless
    - SmokeyStack
    - ThomasOrs
    - Goatfu
---

# 运行时标识符

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

`runtime_identifier` 是位于实体行为文件描述部分的可选参数，用于模拟原版实体的硬编码特性。
它接受原版 Minecraft 标识符，例如 `minecraft:shulker`。

::: code-group
```json [行为实体描述]
"description": {
    "identifier": "wiki:my_box",
    "runtime_identifier": "minecraft:shulker", // 此运行时标识符会将潜影贝的硬编码行为附加到当前实体
    "is_spawnable": true,
    "is_summonable": true,
    "is_experimental": false
}
```

:::tip 注意
需要注意 `runtime_identifier` **仅解析实体的硬编码特性**。这意味着使用100%数据驱动的生物作为运行时标识符不会给实体添加新特性。此外，某些实体运行时可能会覆盖组件部分定义的属性，例如潜影贝实体的碰撞箱尺寸。
:::

:::warning 警告
此处未列出所有运行时标识符效果。建议通过实验自行探索新效果，也欢迎在此补充发现。
:::

## 已知的运行时标识符效果：

-   所有运行时ID都会将实体名称更改为对应原版实体的名称

### minecraft:area_effect_cloud

-   导致实体崩溃

---

### minecraft:armor_stand

-   禁用实体阴影
-   击打时立即消失
-   允许装备穿戴/卸除
-   死亡时掉落盔甲架物品

---

### minecraft:arrow

-   为抛射物添加朝向玩家的动画
-   禁用死亡动画/声音/粒子
-   缩小实体阴影（但不会消失）
-   不可交互
-   通过生成蛋或/summon生成时，玩家接触后获得箭矢同时实体消失
-   飞行物理特性和击退效果与箭矢一致

---

### minecraft:axolotl
-   不影响游泳/移动/重力行为
-   类似热带鱼，不同变种值影响水桶名称（如"亮蓝色美西螈桶"或"幼年黄色美西螈桶"）
年龄变种: 成年/幼年
颜色变种: 亮色/野生/黄色/青色/蓝色

---

### minecraft:bee

-   添加蜜蜂音效

---

### minecraft:blaze

-   添加烈焰人燃烧音效和粒子
-   实体将具有烈焰人飞行特性（即使未添加飞行行为）

---

### minecraft:boat

-   骑乘时显示船型UI界面
-   禁止实体旋转
-   具有船形固体碰撞箱

---

### minecraft:chest_minecart

-   导致实体崩溃
-   击打后立即消失
-   生成状态异常
-   掉落箱子和矿车

---

### minecraft:chicken

-   部分动画失效
-   更新移动速度
-   实体下落减缓但仍受掉落伤害
-   生成时不携带装备（若原有）

---

### minecraft:cod

-   脱离水体时扑腾
-   使用水桶交互获得鳕鱼桶（放置时生成当前实体而非鳕鱼）
-   赋予特殊游泳和重力特性

---

### minecraft:command_block_minecart

-   导致实体崩溃
-   击打后立即消失
-   生成状态异常
-   掉落矿车

---

### minecraft:cow

-   部分动画失效
-   更新移动速度
-   生成时不携带装备（若原有）

---

### minecraft:dolphin

-   添加 `minecraft:movement.dolphin` 组件

---

### minecraft:donkey

-   将纹理/模型/动画更换为驴子

---

### minecraft:dragon_fireball

-   完全破坏实体
-   生成龙息火球尾迹粒子

---

### minecraft:egg

-   为抛射物添加朝向玩家的动画
-   导致实体崩溃
-   使用生成蛋生成时会出现在玩家位置而非指定位置，且面朝天空

---

### minecraft:elder_guardian

-   将纹理/模型/动画更换为远古守卫者
-   改变部分行为特性

---

### minecraft:ender_crystal

-   实体将固定在生成方块的中央
-   除传送外始终保持位置不变
-   可放置于任何表面
-   其他实体可穿透
-   无法配置承受伤害
-   无法改变朝向
-   可复活末影龙
-   生成时带火焰效果

---

### minecraft:ender_dragon

-   添加末影龙死亡特效
-   继承末影龙碰撞箱
-   破坏碰撞箱内所有方块（包括底部方块），建议在下方放置不可破坏方块/移除重力/禁用`mobGriefing`规则
-   对碰撞箱2格范围内的玩家造成伤害
-   增加渲染距离
-   只能通过/kill指令消除

---

### minecraft:ender_pearl

-   破坏实体行为
-   受伤时生成粒子

---

### minecraft:endermite

-   受伤时生成粒子
-   导致旋转异常
-   部分动画失效

---

### minecraft:evocation_fang

-   对接触实体造成伤害
-   完全禁用碰撞

---

### minecraft:falling_block

-   导致实体崩溃并下落
-   接触地面后无动画消失，掉落金合欢按钮
-   移除效果附着能力

### minecraft:horse

-   将纹理/模型/动画更换为马匹

---

### minecraft:iron_golem

-   允许发动攻击（击退效果垂直增强）
-   加速四肢动画（可手动修复为约1/4速度）
-   可能与村庄/村民逻辑冲突

---

### minecraft:llama_spit

- 添加羊驼唾沫粒子

---

### minecraft:minecart

-   禁用实体阴影
-   死亡时掉落矿车
-   禁止实体旋转

---

### minecraft:panda

-   使`q.is_grazing`和`q.sit_mount`能与`minecraft:behavior.random_sitting`组件协同工作

---

### minecraft:parrot

-   启用翅膀扇动动画
-   缓慢降落
-   跟随音乐唱片跳舞

---

### minecraft:piglin

-   启用`minecraft:celebrate_hunt`功能（激活 q.is_celebrating）

---

### minecraft:player

-   激活`q.movement_direction`

---

### minecraft:pufferfish

-   脱离水体时扑腾
-   使用水桶交互获得河豚桶（放置时生成当前实体而非河豚）
-   赋予特殊游泳和重力特性

---

### minecraft:salmon

-   脱离水体时扑腾
-   使用水桶交互获得鲑鱼桶（放置时生成当前实体而非鲑鱼）
-   赋予特殊游泳和重力特性

---

### minecraft:sheep

-   使`q.is_grazing`能与`behavior.eat_block`组件协同工作

---

### minecraft:shulker

冒险模式玩家的方块拟态神器

-   1x1x1固体碰撞箱
-   固定于生成方块的中央
-   附着方块被破坏后传送至附近可用位置
-   在非完整方块（床/台阶等）上生成时自动传送
-   无法修改碰撞箱尺寸

---

### minecraft:shulker_bullet

-   生成潜影贝导弹尾迹粒子

---

### minecraft:slime

-   下落时生成黏液粒子
-   根据变体值分裂（1-5为史莱姆常规尺寸，5以上视为中型）
-   允许攻击同时保持史莱姆跳跃机制（无此标识符时攻击状态无法转向）

---

### minecraft:snowball

-   移除碰撞箱
-   不可交互
-   生成于玩家头部位置
-   无视重力
-   移除实体阴影
-   恒定面朝南方
-   无法发出踏步音效

---

### minecraft:spider

-   蛛网减速失效

---

### minecraft:skeleton

-   治疗效果造成伤害/瞬间伤害效果恢复生命
-   亡灵杀手附魔增伤
-   变体≥1时近战与远程攻击附加凋零效果

---

### minecraft:stray

-   治疗效果造成伤害/瞬间伤害效果恢复生命
-   亡灵杀手附魔增伤
-   免疫冰冻伤害

---

### minecraft:squid

-   支持特殊行为组件（参考squid.json）
-   受伤时生成墨汁粒子

---

### minecraft:thrown_trident

-   为抛射物添加朝向玩家的动画
-   禁用死亡动画/声音/粒子
-   缩小实体阴影（但不会消失）
-   不可交互
-   飞行物理特性和击退效果与三叉戟一致

---

### minecraft:tropicalfish

-   脱离水体时扑腾
-   赋予特殊游泳和重力特性
-   使用水桶获得热带鱼桶（若无variant/mark_variant/color定义则为白色考伯鱼规格，含相关组件时桶名与实体规格对应）

---

### minecraft:wither_skull_dangerous

-   死亡时掉落凋零玫瑰
-   被击杀实体会在原地生成凋零玫瑰（僵尸类异常掉落）
-   持续生成基础烟雾粒子
-   无视重力（使projectile组件实体直线运动）
-   免疫所有伤害
-   仅对无AI目标的实体生效（适用于假人实体和弹射物）

---

### minecraft:xp_orb

-   完全禁用碰撞
-   接触玩家增加经验值

### minecraft:zombie

-   治疗效果造成伤害/瞬间伤害效果恢复生命
-   亡灵杀手附魔增伤

---

### minecraft:wither

-   死亡时爆炸

---