---
front: https://nie.res.netease.com/r/pic/20211104/69055361-2e7a-452f-8b1a-f23e1262a03a.jpg
hard: 高级
time: 10分钟
---

# Molang在自定义实体中的常用场景

Molang在附加包各处都有应用，但是如果要说应用次数最多的场景，那当自定义实体莫属。本节中我们一起来了解Molang在自定义实体中的应用。

## 控制实体渲染

在第八章中，我们便了解了实体的渲染控制器。在实体的渲染控制器中，我们可以通过Molang来控制实体的几何、材质和纹理的选用。一般来说，我们存在两种比较常见的控制方法。第一种是使用数组，第二种是使用三元条件运算符`?:`。

```json
"geometry": "array.crossbow_geo_frames[query.get_animation_frame]",
"materials": [
  { "*": "variable.is_enchanted ? material.enchanted : material.default" }
],
"textures": [
  "array.crossbow_texture_frames[query.get_animation_frame]",
  "texture.enchanted"
]
```

在上面的例子中，我们可以看到几何和纹理都是使用了数组，通过`query.get_animation_frame`查询的值作为数组下标索来得到对应的几何和纹理。而材质则是使用了三元条件运算符，通过对变量`variable.is_enchanted`的值进行布尔校验来决定是使用附魔的材质和默认的材质。

## 参与动画表现力

我们之前便了解到，动画中也可以使用Molang表达式来控制一个骨骼的某个通道的值。比如我们之前水鸭的移动动画。

```json
"animation.teal.move": {
  "loop": true,
  "anim_time_update": "query.modified_distance_moved",
  "bones": {
    "leg0": {
      "rotation": ["math.cos(query.anim_time*38.17)*80.0", 0, 0]
    },
    "leg1": {
      "rotation": ["math.cos(query.anim_time*38.17)*-80.0", 0, 0]
    }
  }
}
```

我们可以看到动画中使用了$\mathrm{cos}(query.anim\_time \times38.17)\times80.0$和$\mathrm{cos}(query.anim\_time\times38.17)\times-80.0$分别控制了`leg0`和`leg1`在$yOz$平面的旋转角度。`query.anim_time`是当前动画的播放时间，默认单位为秒（s），不过我们这里使用了`anim_time_update`字段更改了动画时间流逝速度，因此变为了使用移动速度来控制动画流速。且需要注意的是，`math.cos`等三角数学函数只接受角度制的值作为输入，并输出对应的三角函数值。

## 行为与动画结合

我们可以通过在动画中调用一些Molang变量使得动画和行为相结合。当一个实体的行为包组件中定义了攻击的AI意向时，我们便可以在其动画中访问到一个正确的`variable.attack_time`变量，这个变量对于非玩家实体代表着其攻击时间。当该实体不攻击时，则返回`0.0`。对于玩家来说则会返回一个攻击动画完成的百分比，取值为`0.0`至`1.0`。

我们以僵尸的徒手攻击动画为例：

```json
"animation.zombie.attack_bare_hand" : {
  "loop" : true,
  "bones" : {
    "leftarm" : {
      "rotation" : [ "-90.0 - ((math.sin(variable.attack_time * 180.0) * 57.3) * 1.2 - (math.sin((1.0 - (1.0 - variable.attack_time) * (1.0 - variable.attack_time)) * 180.0) * 57.3) * 0.4) - (math.sin(query.life_time * 76.776372) * 2.865) - this", "5.73 - ((math.sin(variable.attack_time * 180.0) * 57.3) * 0.6) - this", "math.cos(query.life_time * 103.13244) * -2.865 - 2.865 - this" ]
    },
    "rightarm" : {
      "rotation" : [ "90.0 * (variable.is_brandishing_spear - 1.0) - ((math.sin(variable.attack_time * 180.0) * 57.3) * 1.2 - (math.sin((1.0 - (1.0 - variable.attack_time) * (1.0 - variable.attack_time)) * 180.0) * 57.3) * 0.4) + (math.sin(query.life_time * 76.776372) * 2.865) - this", "(math.sin(variable.attack_time * 180.0) * 57.3) * 0.6 - 5.73 - this", "math.cos(query.life_time * 103.13244) * 2.865 + 2.865 - this" ]
    }
  }
},
```

可以看到`variable.attack_time`作为一个类似于查询函数作用的变量传入了旋转通道的各个分量中。

## 行为包实体组件和事件

实体的行为包定义文件中常常会定义一些组件和事件。Molang可以用来控制组件中相关变量的计算和事件的触发。比如，几乎所有的实体都会定义一个经验奖励组件，用于计算掉落的经验值。

```json
"minecraft:experience_reward": {
  "on_bred": "Math.Random(1,7)",
  "on_death": "query.last_hit_by_player?Math.Random(1,3):0"
}
```

## 联动模组SDK

在模组SDK中可以使用`queryVariable`引擎组件来注册一个自定义查询函数。比如，以下代码便可以在客户端中注册一个`query.mod.is_custom_material`查询。

```python
import mod.client.extraClientApi as clientApi
compFactory = clientApi.GetEngineCompFactory()
# 注册一个自定义材质切换的查询函数
comp = compFactory.CreateQueryVariable(clientApi.GetLevelId())
result = comp.Register('query.mod.is_custom_material', 0.0)
# 更改该查询函数的值
comp.Set('query.mod.is_custom_material', 1.0)
```

之后我们便可以在动画控制器中用`query.mod.is_custom_material`来控制实体的材质，而`query.mod.is_custom_material`的值则可以由Python脚本来控制，从而做到脚本使能资源控制。