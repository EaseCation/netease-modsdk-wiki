---
title: 使用JQ创建附加组件
hidden: true
mentions:
    - SirLich
    - Joelant05
    - MedicalJewel105
---

# 使用JQ创建附加组件

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

## 引言

> "jq就像处理JSON数据的sed工具 - 你可以用它来切片、过滤、映射和转换结构化数据，其便捷程度如同用sed、awk、grep等工具处理文本一般。"

_— https://stedolan.github.io/jq/_

jq是一款用C语言编写的JSON处理工具，其理念类似于Perl。由于它是专门为解析JSON设计的，因此具备许多其他文本处理器所没有的实用特性。jq将其程序定义为过滤器，这些过滤器接收JSON数据输入并输出修改后的JSON数据。虽然看似简单，但jq包含了许多高级功能，在程序化生成附加组件文件时极其有用。

本文将从命令行界面角度解释jq的使用。不过jq基本上已为所有主流编程语言提供了封装器，您可以轻松将jq过滤器集成到Go、JavaScript、Java、Ruby、Python、R等语言中。本文将重点讲解针对Minecraft附加组件开发的过滤器设计，具体实现方式可根据实际需求选择。

## 获取jq

官方下载地址：https://stedolan.github.io/jq/download/，下载的可执行文件即开即用。

也可以通过系统包管理器安装（需确保版本≥jq-1.6）。

各语言封装器列表详见：[awesome-jq](https://github.com/fiatjaf/awesome-jq)

## 基础语法

### 点操作符

最简单的jq过滤器是点号（`.`），它原样返回输入JSON。以下面这个资源包清单为例：

::: code-group
```json [资源包清单]
{
  "format_version": 2,
  "header": {
    "name": "Example Pack",
    "uuid": "c35537fa-c79d-fd77-cd89-551b7487abed",
    "min_engine_version": [1, 16, 0]
  },
  "modules": [
    {
      "type": "resources",
      "uuid": "199ed596-c0f7-158c-db7d-2da8510690c5",
      "version": [1, 0, 0]
    }
  ]
}
```
:::

### 路径访问

要获取header的UUID，使用路径表达式`.header.uuid`：

::: code-group
```json [输出结果]
"c35537fa-c79d-fd77-cd89-551b7487abed"
```
:::

### 数组操作

访问数组元素示例（获取最低引擎版本的最后一位）：
`.header.min_engine_version[-1]`

::: code-group
```json [输出结果]
0
```
:::

### 值修改

使用赋值运算符修改格式版本：
`.format_version = 3`

::: code-group
```json [修改结果]
{
  "format_version": 3, // 此处被修改
  "header": {
    ...
  }
}
```
:::

### 管道操作

结合map函数对数组元素进行运算：
`.header.min_engine_version | map(. + 1)`

::: code-group
```json [运算结果]
[2, 17, 1]
```
:::

### 逻辑运算

#### 条件判断

根据format_version修改描述文本：
```jq
if .format_version > 1 then 
  .header.description = "大版本" 
else 
  . 
end
```

#### 逻辑组合

复合条件判断示例：
```jq
if (.header.version[0] > 1 and (.modules[0].version[0] > 1 | not)) 
then 
  .header.description = "小版本" 
end
```

### 变量定义

变量作用域贯穿后续管道：
```jq
{hello: "world"} as $var | $var | .hello
```

## 内置函数

### 数学运算

使用幂函数和平方根函数：
```jq
{
  "三次幂": pow(.format_version; 3),
  "平方根": .format_version | sqrt
}
```

### 映射处理

使用map_values进行全局字符串替换：
```jq
.header as $header |
.header = ($header | map_values(
  (select(type == "string") | gsub("示例"; "生产版")
)) + ($header | map_values(select(type != "string")))
```

### 键值转换

使用to_entries重构键值对：
```jq
.header | to_entries | map({(value|tostring): key}) | add
```

### 递归处理

使用walk清理空值：
```jq
walk(if type == "object" then 
  with_entries(select(.value != null)) 
else . end
```

## 自定义函数

函数定义语法示例：
```jq
def 加法函数($a; $b):
  $a + $b;

def 无参函数:
  1 + 1;

{ 
  "组合字符串": 加法函数("合并"; "字符串"),
  "简单计算": 无参函数 
}
```

## 命令行应用

基础使用格式：
```bash
jq '[过滤器]' 输入文件.json > 输出文件.json
```

带参数调用：
```bash
jq -n --arg 变量1 $值1 --arg 变量2 $值2 '
{
  "参数1": $变量1,
  "参数2": $变量2
}'
```

## 实战案例

将Java版模型转换为基岩版可附着物模型的完整jq脚本（含UV重映射）：

[完整转换脚本示例](https://jqterm.com/85a349e33fd8709ceb0c64be6b63c497?query=%22test%22%20as%20%24model_name%20%7C%0A%0Adef%20element_array%3A%0A%20%20%20%20%28.textures%20%7C%20to_entries%20%7C%20sort_by%28.key%29%20%7C%20map%28%7B%28.key%29%3A%20.value%7D%29%20%7C%20add%20%7C%20keys_unsorted%29%20as%20%24texture_array%0A%20%20%20%20%7C%20%28%24texture_array%20%7C%20length%29%20as%20%24frames%0A%20%20%20%20%7C%20%28%28%24frames%20%7C%20sqrt%29%20%7C%20ceil%29%20as%20%24sides%0A%20%20%20%20%7C%20%28.texture_size%5B1%5D%20%2F%2F%2016%29%20as%20%24t1%0A%20%20%20%20%7C%20.elements%20%7C%20map%28%7B%0A%20%20%20%20%20%20%22origin%22%3A%20%5B%28-.to%5B0%5D%20%2B%208%29%2C%20%28.from%5B1%5D%29%2C%20%28.from%5B2%5D%20-%208%29%5D%2C%0A%20%20%20%20%20%20%22size%22%3A%20%5B.to%5B0%5D%20-%20.from%5B0%5D%2C%20.to%5B1%5D%20-%20.from%5B1%5D%2C%20.to%5B2%5D%20-%20.from%5B2%5D%5D%2C%0A%20%20%20%20%20%20%22rotation%22%3A%20%0A%20%20%20%20%20%20%28if%20%28.rotation.axis%29%20%3D%3D%20%22x%22%20then%20%5B%28.rotation.angle%20%7C%20tonumber%20*%20-1%29%2C%200%2C%200%5D%20%0A%20%20%20%20%20%20%20%20elif%20%28.rotation.axis%29%20%3D%3D%20%22y%22%20then%20%5B0%2C%20%28.rotation.angle%20%7C%20tonumber%20*%20-1%29%2C%200%5D%20%0A%20%20%20%20%20%20%20%20elif%20%28.rotation.axis%29%20%3D%3D%20%22z%22%20then%20%5B0%2C%200%2C%20%28.rotation.angle%20%7C%20tonumber%29%5D%20%0A%20%20%20%20%20%20%20%20else%20null%20end%29%2C%0A%20%20%20%20%20%20%22pivot%22%3A%20%28if%20.rotation.origin%20then%20%5B%28-%20.rotation.origin%5B0%5D%20%2B%208%29%2C%20.rotation.origin%5B1%5D%2C%20%28.rotation.origin%5B2%5D%20-%208%29%5D%20else%20null%20end%29%2C%0A%20%20%20%20%20%20%22uv%22%3A%20%28%0A%20%20%20%20%20%20%20%20def%20uv_calc%28%24input%29%3A%0A%20%20%20%20%20%20%20%20%20%20%28if%20%28.faces%20%7C%20.%5B%24input%5D%29%20then%0A%20%20%20%20%20%20%20%20%20%20%28.faces%20%7C%20.%5B%24input%5D.texture%5B1%3A%5D%20as%20%24input_n%20%7C%20%24texture_array%20%7C%20%28index%28%24input_n%29%20%2F%2F%20index%28%22particle%22%29%29%29%20as%20%24pos_n%0A%20%20%20%20%20%20%20%20%20%20%7C%20%28%28.faces%20%7C%20.%5B%24input%5D.uv%5B0%5D%20%2F%20%24sides%29%20%2B%20%28%28fmod%28%24pos_n%3B%20%24sides%29%29%20*%20%2816%20%2F%20%24sides%29%29%29%20as%20%24fn0%0A%20%20%20%20%20%20%20%20%20%20%7C%20%28%28.faces%20%7C%20.%5B%24input%5D.uv%5B1%5D%20%2F%20%24sides%29%20%2B%20%28%28%28%24pos_n%20%2F%20%24sides%29%20%7C%20floor%29%20*%20%2816%20%2F%20%24sides%29%29%29%20as%20%24fn1%0A%20%20%20%20%20%20%20%20%20%20%7C%20%28%28.faces%20%7C%20.%5B%24input%5D.uv%5B2%5D%20%2F%20%24sides%29%20%2B%20%28%28fmod%28%24pos_n%3B%20%24sides%29%29%20*%20%2816%20%2F%20%24sides%29%29%29%20as%20%24fn2%0A%20%20%20%20%20%20%20%20%20%20%7C%20%28%28.faces%20%7C%20.%5B%24input%5D.uv%5B3%5D%20%2F%20%24sides%29%20%2B%20%28%28%28%24pos_n%20%2F%20%24sides%29%20%7C%20floor%29%20*%20%2816%20%2F%20%24sides%29%29%29%20as%20%24fn3%20%7C%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22uv%22%3A%20%5B%28%24fn0%29%2C%20%28%24fn1%29%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22uv_size%22%3A%20%5B%28%24fn2%20-%20%24fn0%29%2C%20%28%24fn3%20-%20%24fn1%29%5D%0A%20%20%20%20%20%20%20%20%20%20%7D%20else%20null%20end%29%3B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22north%22%3A%20uv_calc%28%22north%22%29%2C%0A%20%20%20%20%20%20%20%20%22south%22%3A%20uv_calc%28%22south%22%29%2C%0A%20%20%20%20%20%20%20%20%22east%22%3A%20uv_calc%28%22east%22%29%2C%0A%20%20%20%20%20%20%20%20%22west%22%3A%20uv_calc%28%22west%22%29%2C%0A%20%20%20%20%20%20%20%20%22up%22%3A%20uv_calc%28%22up%22%29%2C%0A%20%20%20%20%20%20%20%20%22down%22%3A%20uv_calc%28%22down%22%29%0A%20%20%20%20%20%20%20%20%7D%29%0A%20%20%20%20%7D%29%20%7C%20walk%28%20if%20type%20%3D%3D%20%22object%22%20then%20with_entries%28select%28.value%20!%3D%20null%29%29%20else%20.%20end%29%3B%0A%0Adef%20pivot_groups%3A%0A%20%20%20%20%28element_array%29%20as%20%24element_array%20%7C%0A%20%20%20%20%5B%5B.elements%5B%5D.rotation%5D%20%7C%20unique%20%7C%20.%5B%5D%20%7C%20select%20%28.!%3Dnull%29%5D%0A%20%20%20%20%7C%20map%28%28%0A%20%20%20%20%5B%28-%20.origin%5B0%5D%20%2B%208%29%2C%20.origin%5B1%5D%2C%20%28.origin%5B2%5D%20-%208%29%5D%20as%20%24i_piv%20%7C%0A%20%20%20%20%28if%20%28.axis%29%20%3D%3D%20%22x%22%20then%20%5B%28.angle%20%7C%20tonumber%20*%20-1%29%2C%200%2C%200%5D%20%0A%20%20%20%20%20%20elif%20%28.axis%29%20%3D%3D%20%22y%22%20then%20%5B0%2C%20%28.angle%20%7C%20tonumber%20*%20-1%29%2C%200%5D%20%0A%20%20%20%20%20%20else%20%5B0%2C%200%2C%20%28.angle%20%7C%20tonumber%29%5D%20end%29%20as%20%24i_rot%20%7C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parent%22%3A%20%22geysercmd_z%22%2C%0A%20%20%20%20%20%20%22pivot%22%3A%20%28%24i_piv%29%2C%0A%20%20%20%20%20%20%22rotation%22%3A%20%28%24i_rot%29%2C%0A%20%20%20%20%20%20%22mirror%22%3A%20true%2C%0A%20%20%20%20%20%20%22cubes%22%3A%20%5B%28%24element_array%20%7C%20.%5B%5D%20%7C%20select%28.rotation%20%3D%3D%20%24i_rot%20and%20.pivot%20%3D%3D%20%24i_piv%29%29%5D%0A%20%20%20%20%7D%29%29%3B%0A%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22format_version%22%3A%20%221.16.0%22%2C%0A%20%20%20%20%20%20%22minecraft%3Ageometry%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22description%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22identifier%22%3A%20%28%22geometry.geysercmd.%22%20%2B%20%28%24model_name%29%29%2C%0A%20%20%20%20%20%20%20%20%20%20%22texture_width%22%3A%2016%2C%0A%20%20%20%20%20%20%20%20%20%20%22texture_height%22%3A%2016%2C%0A%20%20%20%20%20%20%20%20%20%20%22visible_bounds_width%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%20%20%22visible_bounds_height%22%3A%204.5%2C%0A%20%20%20%20%20%20%20%20%20%20%22visible_bounds_offset%22%3A%20%5B0%2C%200.75%2C%200%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22bones%22%3A%20%28%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22geysercmd%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22binding%22%3A%20%22c.item_slot%20%3D%3D%20%27head%27%20%3F%20%27head%27%20%3A%20q.item_slot_to_bone_name%28c.item_slot%29%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pivot%22%3A%20%5B0%2C%208%2C%200%5D%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22geysercmd_x%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22parent%22%3A%20%22geysercmd%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pivot%22%3A%20%5B0%2C%208%2C%200%5D%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22geysercmd_y%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22parent%22%3A%20%22geysercmd_x%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pivot%22%3A%20%5B0%2C%208%2C%200%5D%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22geysercmd_z%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22parent%22%3A%20%22geysercmd_y%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pivot%22%3A%20%5B0%2C%208%2C%200%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22cubes%22%3A%20%5B%28element_array%20%7C%20.%5B%5D%20%7C%20select%28.rotation%20%3D%3D%20null%29%29%5D%0A%20%20%20%20%20%20%20%20%7D%5D%20%2B%20%28pivot_groups%20%7C%20map%28del%28.cubes%5B%5D.rotation%29%29%20%7C%20to_entries%20%7C%20map%28%20%28.value.name%20%3D%20%22rot_%5C%281%2B.key%29%22%20%29%20%7C%20.value%29%29%29%0A%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D)