---
title: 禁用团队伤害
category: 巧思案例
tags:
    - 中级
mentions:
    - SirLich
    - solvedDev
    - Joelant05
    - MedicalJewel105
    - Luthorius
    - TCLynx
---

# 禁用团队伤害

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

若需禁用团队伤害（使玩家无法攻击队友），请为每位玩家分配带有队伍名称的标签（本教程将使用`team1`、`team2`、`team3`和`team4`作为示例）。
警告：该方法在领域服（Realms）中**不可用**，原因是领域服存在一个漏洞会导致行为包中修改后的player.json文件失效，游戏会直接忽略这些修改（该问题可能在后续版本中修复，但在1.20.15版本中尚未解决。此问题也影响更早的Minecraft版本）。

现在将以下伤害感应器组件添加至你的`player.json`文件的`"components": {}`部分。查看注释以获取详细说明。

::: code-group
```json [BP/entities/player.json#components]
"minecraft:damage_sensor":{
   "triggers":[
      { //若已有伤害感应器组件，只需将此对象复制到"triggers"数组中
         "on_damage":{
            "filters":{
               "any_of":[
                  {
                     "all_of":[
                        { "test":"has_tag", "value":"team1" }, //该玩家是否拥有此标签？
                        { "test":"has_tag", "subject":"other", "value":"team1" } //被攻击实体是否拥有此标签？
                     ]
                  },
                  {
                     "all_of":[ //以下为重复结构，为每个队伍添加相同配置
                        { "test":"has_tag", "value":"team2" },
                        { "test":"has_tag", "subject":"other", "value":"team2" }
                     ]
                  },
                  {
                     "all_of":[
                        { "test":"has_tag", "value":"team3" },
                        { "test":"has_tag", "subject":"other", "value":"team3" }
                     ]
                  },
                  {
                     "all_of":[
                        { "test":"has_tag", "value":"team4" },
                        { "test":"has_tag", "subject":"other", "value":"team4" }
                     ]
                  },
                  {
                     "all_of":[
                        { "test":"has_tag", "value":"team5" },
                        { "test":"has_tag", "subject":"other", "value":"team5" }
                     ]
                  }
               ]
            }
         },
         "deals_damage":false //若任意过滤器条件满足，本次攻击将不会造成伤害
      }
   ]
}
```
:::

### 抛射物处理

由于抛射物实体使用的原始滤镜系统，实现此功能需要完全不同的方法。该方案需要以下组件：
- 标签（Tags）
- 周期性检测（Ticking）
- 条件伤害（Hurt on Condition）
- 函数（Functions）

::: code-group
```json [BP/entities/player.json#components]
//"components"部分
"minecraft:timer": { //用于通过事件给附近未标记的抛射物添加队伍标签
   "time": [
      0.0,
      0.1
   ],
   "looping": true,
   "time_down_event": {
      "event": "wiki:projectile_team",
      "target": "self"
   }
},
"minecraft:hurt_on_condition": { //使抛射物无法直接造成伤害
   "damage_conditions": [        //改为通过标签系统触发伤害
      {
         "filters": {
            "test": "has_tag",
            "value": "damage"
         },
         "cause": "projectile",
         "damage_per_tick": 4
      }
   ]
},
"minecraft:damage_sensor": {     //触发事件来移除damage标签
   "triggers": {                 //确保伤害只生效一次
      "cause": "projectile",
      "deals_damage": true,
      "on_damage": {
         "filters": {
            "test": "has_tag",
            "value": "damage"
         },
         "event": "wiki:stop_damage"
      }
   }
}

//"events"部分
"wiki:projectile_team": {  //根据玩家队伍标签应用对应的抛射物标签
   "run_command": {
      "command": [
         "function wiki-apply_team"
      ]
   }
},
"wiki:stop_damage": {      //移除damage标签的事件
   "run_command": {
      "command": [
         "tag @s remove damage"
      ]
   }
}
```
:::

::: code-group

```json [BP/entities/arrow.json]
//"components"部分
"on_hit": {               //击中时触发事件...
   "definition_event": {
      "affect_projectile": true,
      "event_trigger": {
         "event": "wiki:hit",
         "target": "self"
      }
   },
   "remove_on_hit": {}
}

//"events"部分
"wiki:hit": {             //...执行函数，为不同队伍玩家添加damage标签
   "run_command": {
      "command": [
         "function wiki-apply_damage"
      ]
   }
}
```
:::

::: code-group

```mcfunction [BP/functions/wiki-apply_team.mcfunction]
execute @s[tag=team1] ~ ~ ~ tag @e[rm=0,r=1,c=1,type=arrow,tag=] add team1
execute @s[tag=team2] ~ ~ ~ tag @e[rm=0,r=1,c=1,type=arrow,tag=] add team2
execute @s[tag=team3] ~ ~ ~ tag @e[rm=0,r=1,c=1,type=arrow,tag=] add team3
execute @s[tag=team4] ~ ~ ~ tag @e[rm=0,r=1,c=1,type=arrow,tag=] add team4
```
:::

::: code-group

```mcfunction [BP/functions/wiki-apply_damage.mcfunction]
execute @s[tag=team1] ~ ~ ~ tag @p[rm=0,r=1,tag=!team1] add damage
execute @s[tag=team2] ~ ~ ~ tag @p[rm=0,r=1,tag=!team2] add damage
execute @s[tag=team3] ~ ~ ~ tag @p[rm=0,r=1,tag=!team3] add damage
execute @s[tag=team4] ~ ~ ~ tag @p[rm=0,r=1,tag=!team4] add damage
```
:::

> 注意：若修改`arrow.json`文件，请仔细考虑组件分组（component groups）的影响。