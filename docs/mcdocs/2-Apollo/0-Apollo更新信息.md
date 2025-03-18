# Apollo更新信息

## 2025.03.13 更新内容
1. 发布Apollo 3.3beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 3.3.0.beta20250313 |
   | proxy   | 3.3.0.beta20250313 |
   | master  | 3.3.0.beta20250313 |
   | service | 3.3.0.beta20250313 |

2. 发布Apollo2.0 3.3beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 3.3.0.java.beta20250313 |
   | master           | 3.3.0.java.beta20250313 |
   | geyser           | 3.3.0.java.beta20250313 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT         |

	其他插件版本要求：

    |            | verion             |
    | ---------- | ------------------ |
    | BungeeCord | 1.20-R0.3-SNAPSHOT |
    | ViaVersion | 4.10.2             |

## 2025.01.07 更新内容
1. 发布Apollo 3.2正式版

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 3.2.0.stable20250107 |
   | proxy   | 3.2.0.stable20250107 |
   | master  | 3.2.0.stable20250107 |
   | service | 3.2.0.stable20250107 |

2. 发布Apollo2.0 3.2正式包

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 3.2.0.java.stable20250107 |
   | master           | 3.2.0.java.stable20250107 |
   | geyser           | 3.2.0.java.stable20250107 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT            |

   其他插件版本要求：

   |            | verion             |
   | ---------- | ------------------ |
   | BungeeCord | 1.20-R0.3-SNAPSHOT |
   | ViaVersion | 4.10.2             |
   注：由于Viaversion转换1.20.5版本头颅（模型）会过滤掉非法昵称的信息，导致自定义方块和中文昵称的头颅（模型）出错，因此无法直接使用官网版本。可选择MCS内容库中的“ViaVersion-4.10.2”资源或自行修改。

3. 额外注意

   由于微软代码改动，新增的网络包需要依赖在登录完成时服务器发送的配方表。如配方表为空，可能会导致客户端闪退。

   该问题将于Apollo 3.3版本修复，在当前版本中，请不要使用<a href="./4-SDK/6-大厅与游戏服API.html?key=RecipesSyncOnLogin&docindex=1&type=0" rel="noopenner">RecipesSyncOnLogin</a>接口关闭服务器配方表的同步功能。

## 2024.12.10 更新内容
1. 发布Apollo 3.2beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 3.2.0.beta20241211 |
   | proxy   | 3.2.0.beta20241211 |
   | master  | 3.2.0.beta20241211 |
   | service | 3.2.0.beta20241211 |

2. 发布Apollo2.0 3.2beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 3.2.0.java.beta20241211 |
   | master           | 3.2.0.java.beta20241211 |
   | geyser           | 3.2.0.java.beta20241211 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT         |

	其他插件版本要求：

    |            | verion             |
    | ---------- | ------------------ |
    | BungeeCord | 1.20-R0.3-SNAPSHOT |
    | ViaVersion | 4.10.2             |
    注：由于Viaversion转换1.20.5版本头颅（模型）会过滤掉非法昵称的信息，导致自定义方块和中文昵称的头颅（模型）出错，因此无法直接使用官网版本。可选择MCS内容库中的“ViaVersion-4.10.2”资源或自行修改。


## 2024.11.20 更新内容
1. 发布Apollo 3.1正式版

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 3.1.0.release20241119 |
   | proxy   | 3.1.0.release20241119 |
   | master  | 3.1.0.release20241119 |
   | service | 3.1.0.release20241119 |

2. 发布Apollo2.0 3.1正式包

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 3.1.0.java.release20241119 |
   | master           | 3.1.0.java.release20241119 |
   | geyser           | 3.1.0.java.release20241119 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT            |

   其他插件版本要求：

   |            | verion             |
   | ---------- | ------------------ |
   | BungeeCord | 1.20-R0.3-SNAPSHOT |
   | ViaVersion | 4.10.2             |

## 2024.10.17 更新内容
1. 发布Apollo 3.1beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 3.1.0.beta20241017 |
   | proxy   | 3.1.0.beta20241017 |
   | master  | 3.1.0.beta20241017 |
   | service | 3.1.0.beta20241017 |

2. 发布Apollo2.0  3.1beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 3.1.0.java.beta20241017 |
   | master           | 3.1.0.java.beta20241017 |
   | geyser           | 3.1.0.java.beta20241017 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT         |

	其他插件版本要求：

    |            | verion             |
    | ---------- | ------------------ |
    | BungeeCord | 1.20-R0.3-SNAPSHOT |
    | ViaVersion | 4.10.2             |


## 2024.09.12 更新内容
1. 发布Apollo 3.0正式版

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 3.0.0.release20240912 |
   | proxy   | 3.0.0.release20240912 |
   | master  | 3.0.0.release20240912 |
   | service | 3.0.0.release20240912 |

2. 发布Apollo2.0 3.0正式包

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 3.0.0.java.release20240912 |
   | master           | 3.0.0.java.release20240912 |
   | geyser           | 3.0.0.java.release20240912 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT            |

   其他插件版本要求：

   |            | verion             |
   | ---------- | ------------------ |
   | BungeeCord | 1.20-R0.3-SNAPSHOT |
   | ViaVersion | 4.10.2             |

## 2024.08.27 更新内容

1. Apollo 更新内容

   - 修复了伪造SimpleEventPacket的外挂崩服
   - deploy.json添加了packet_threshold字段可限制客户端发包频率阈值，详见<a href="../../mcguide/27-网络游戏/课程3：简易网络服模板部署与常见操作/第4节：网络服进阶配置.html#deploy-json" rel="noopenner">deploy.json</a>

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion             |
   | ------- | ---------------------- |
   | game    | 2.12.0.release20240808 |
   | proxy   | 2.12.0.release20240808 |
   | master  | 2.12.0.release20240808 |
   | service | 2.12.0.release20240808 |

## 2024.08.15 更新内容

1. 发布Apollo 3.0beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 3.0.0.beta20240815 |
   | proxy   | 3.0.0.beta20240815 |
   | master  | 3.0.0.beta20240815 |
   | service | 3.0.0.beta20240815 |

2. 发布Apollo2.0  3.0beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 3.0.0.java.beta20240815 |
   | master           | 3.0.0.java.beta20240815 |
   | geyser           | 3.0.0.java.beta20240815 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT         |

	其他插件版本要求：

    |            | verion             |
    | ---------- | ------------------ |
    | BungeeCord | 1.20-R0.3-SNAPSHOT |
    | ViaVersion | 4.10.2             |

## 2024.08.08 更新内容

1. Apollo 更新内容

   - 修复了proxy的崩溃
   - 增加nbt校验

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion             |
   | ------- | ---------------------- |
   | game    | 2.12.0.release20240808 |
   | proxy   | 2.12.0.release20240808 |
   | master  | 2.12.0.release20240808 |
   | service | 2.12.0.release20240808 |

2. Apollo2.0 更新内容

   - 修复了proxy的崩溃
   - 修复自定义方块、自定义物品的显示问题
   - 修复了头颅导致客户端崩溃的问题
   - 修复玩家uuid异常的问题
   - 修复内存泄露
   - **本次更新需要同时升级SpigotMaster插件**

   引擎及插件版本分别是：

   |                  | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.12.0.java.release20240808 |
   | master           | 2.12.0.java.release20240808 |
   | geyser           | 2.12.0.java.release20240808 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.13-SNAPSHOT             |

   其他插件版本要求：

   |            | verion             |
   | ---------- | ------------------ |
   | BungeeCord | 1.20-R0.3-SNAPSHOT |
   | ViaVersion | 4.10.2             |

## 2024.06.20 更新内容

1. 发布Apollo 2.12正式版

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion             |
   | ------- | ---------------------- |
   | game    | 2.12.0.release20240620 |
   | proxy   | 2.12.0.release20240620 |
   | master  | 2.12.0.release20240620 |
   | service | 2.12.0.release20240620 |

2. 发布Apollo2.0 2.12正式包

   引擎及插件版本分别是：

   |                  | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.12.0.java.release20240620 |
   | master           | 2.12.0.java.release20240620 |
   | geyser           | 2.12.0.java.release20240620 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.12-SNAPSHOT             |

   其他插件版本要求：

   |            | verion             |
   | ---------- | ------------------ |
   | BungeeCord | 1.20-R0.3-SNAPSHOT |
   | ViaVersion | 4.10.2             |

## 2024.06.14 更新内容

1. 发布Apollo2.0 2.12beta包

   引擎及插件版本分别是：

   |                  | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.12.0.java.beta20240614    |
   | master           | 2.12.0.java.beta20240614    |
   | geyser           | 2.12.0.java.beta20240614    |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.12-SNAPSHOT             |


   其他插件版本要求：
   |                  | verion                      |
   | ---------------- | --------------------------- |
   | BungeeCord       | 1.20-R0.3-SNAPSHOT          |
   | ViaVersion       | 4.10.2                      |

## 2024.05.23 更新内容

1. 发布Apollo 2.12beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 2.12.0.beta20240523 |
   | proxy   | 2.12.0.beta20240523 |
   | master  | 2.12.0.beta20240523 |
   | service | 2.12.0.beta20240523 |
2. Apollo2.0 将在后续beta包更新。

## 2024.04.23 更新内容

1. Apollo 更新内容

   修复1.18新版本物品的某些问题

## 2024.04.11 更新内容

1. 发布Apollo 2.11正式版

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion             |
   | ------- | ---------------------- |
   | game    | 2.11.0.release20240411 |
   | proxy   | 2.11.0.release20240411 |
   | master  | 2.11.0.release20240411 |
   | service | 2.11.0.release20240411 |

2. 发布Apollo2.0 2.11正式包

   引擎及插件版本分别是：

   |                  | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.11.0.java.release20240411 |
   | master           | 2.11.0.java.release20240411 |
   | geyser           | 2.11.0.java.release20240411 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.11-SNAPSHOT             |

## 2024.03.19 更新内容

1. 发布Apollo 2.11beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 2.11.0.beta20240319 |
   | proxy   | 2.11.0.beta20240319 |
   | master  | 2.11.0.beta20240319 |
   | service | 2.11.0.beta20240319 |

2. 发布Apollo2.0 2.11beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 2.11.0.java.beta20240319 |
   | master           | 2.11.0.java.beta20240319 |
   | geyser           | 2.11.0.java.beta20240319 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.11-SNAPSHOT         |

## 2024.01.18 更新内容

- 发布2.10正式版

  Apollo 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

  |         | app_verion             |
  | ------- | ---------------------- |
  | game    | 2.10.0.release20240118 |
  | proxy   | 2.10.0.release20240118 |
  | master  | 2.10.0.release20240118 |
  | service | 2.10.0.release20240118 |

  Apollo2.0 引擎及插件版本分别是：

  |                  | app_verion                  |
  | ---------------- | --------------------------- |
  | proxy            | 2.10.0.java.release20240118 |
  | master           | 2.10.0.java.release20240118 |
  | geyser           | 2.10.0.java.release20240118 |
  | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
  | SpigotMaster插件 | 1.3.10-SNAPSHOT             |

## 2023.12.20 更新内容

1. Apollo 更新内容

   修复部分情况下部署可能出现的异常

   Apollo 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 2.9.0.release20231116 |
   | proxy   | 2.9.0.release20231116 |
   | master  | 2.9.0.release20231116 |
   | service | 2.9.0.release20231116 |

2. 发布Apollo 2.10beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 2.10.0.beta20231220 |
   | proxy   | 2.10.0.beta20231220 |
   | master  | 2.10.0.beta20231220 |
   | service | 2.10.0.beta20231220 |

3. 发布Apollo2.0 2.10beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 2.10.0.java.beta20231220 |
   | master           | 2.10.0.java.beta20231220 |
   | geyser           | 2.10.0.java.beta20231220 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.11-SNAPSHOT         |

## 2023.11.21 更新内容

1. Apollo 更新内容

   新增开启玩家发包数据统计接口 [GetPlayerIpHash](./4-SDK/6-大厅与游戏服API.html#getplayeriphash)

   Apollo 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 2.9.0.release20231116 |
   | proxy   | 2.9.0.release20231116 |
   | master  | 2.9.0.release20231116 |
   | service | 2.9.0.release20231116 |

2. Apollo2.0 更新内容

   更新SpigotMaster插件，添加玩家共同在线上报

   Apollo2.0 引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.9.0.java.release20231116 |
   | master           | 2.9.0.java.release20231116 |
   | geyser           | 2.9.0.java.release20231116 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.11-SNAPSHOT            |

## 2023.11.16 更新内容

- 发布2.9正式版

  Apollo 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

  |         | app_verion            |
  | ------- | --------------------- |
  | game    | 2.9.0.release20231116 |
  | proxy   | 2.9.0.release20231116 |
  | master  | 2.9.0.release20231116 |
  | service | 2.9.0.release20231116 |

  Apollo2.0 引擎及插件版本分别是：

  |                  | app_verion                 |
  | ---------------- | -------------------------- |
  | proxy            | 2.9.0.java.release20231116 |
  | master           | 2.9.0.java.release20231116 |
  | geyser           | 2.9.0.java.release20231116 |
  | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
  | SpigotMaster插件 | 1.3.10-SNAPSHOT            |

## 2023.10.24 更新内容

### 2.9beta更新内容

1. 发布Apollo 2.9beta包

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion         |
   | ------- | ------------------ |
   | game    | 2.9.0.beta20231024 |
   | proxy   | 2.9.0.beta20231024 |
   | master  | 2.9.0.beta20231024 |
   | service | 2.9.0.beta20231024 |

2. 发布Apollo2.0 2.9beta包

   引擎及插件版本分别是：

   |                  | app_verion              |
   | ---------------- | ----------------------- |
   | proxy            | 2.9.0.java.beta20231024 |
   | master           | 2.9.0.java.beta20231024 |
   | geyser           | 2.9.0.java.beta20231024 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT          |
   | SpigotMaster插件 | 1.3.10-SNAPSHOT         |

### 2.8更新内容

1. Apollo 更新内容

   - 修复打开状态的木桶摧毁后的auxvalue问题和在itemRenderer中显示异常问题

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 2.8.0.release20230907 |
   | proxy   | 2.8.0.release20230907 |
   | master  | 2.8.0.release20230907 |
   | service | 2.8.0.release20230907 |

2. Apollo2.0 更新内容

    - 修复apollo2.0中烟花表现不正常的问题
    - formUi文档添加对不同按钮的返回进行处理的示例和详解内容<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/30-Spigot服Demo详解/6-ServerFormDemo详解.html" rel="noopenner">ServerFormDemo详解</a>

    引擎及插件版本分别是：

    |                  | app_verion                 |
    | ---------------- | -------------------------- |
    | proxy            | 2.8.0.java.release20230907 |
    | master           | 2.8.0.java.release20230907 |
    | geyser           | 2.8.0.java.release20230907 |
    | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
    | SpigotMaster插件 | 1.3.10-SNAPSHOT            |



## 2023.09.19 2.8更新内容

1.Apollo2.0 更新内容

1. 更新后，spigot网络服的玩家将使用网易uuid，已上线网络服不受影响，详见<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/13-1-【必读】玩家uuid数据存储说明.html" rel="noopenner">玩家uuid数据存储说明</a>

2. 增加根据标题显示不同风格的表单界面示例，详见<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/30-Spigot服Demo详解/6-ServerFormDemo详解.html" rel="noopenner">ServerFormDemo详解</a>

3. 增加原生箱子UI转FormUI示例，详见InventoryToFormUIDemo

4. 引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.8.0.java.release20230907 |
   | master           | 2.8.0.java.release20230907 |
   | geyser           | 2.8.0.java.release20230907 |
   | BungeeMaster插件 | 1.0.3-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.10-SNAPSHOT             |

## 2023.09.07 2.8更新内容

1. Apollo 更新内容
   - 修复末影箱可能导致服务器崩溃问题
2. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.8.0.release20230907 |
| proxy   | 2.8.0.release20230907 |
| master  | 2.8.0.release20230907 |
| service | 2.8.0.release20230907 |

2. Apollo2.0 更新内容

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.8.0.java.release20230907 |
   | master           | 2.8.0.java.release20230907 |
   | geyser           | 2.8.0.java.release20230907 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.9-SNAPSHOT             |



## 2023.08.15 2.8beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.8.0.beta20230815 |
| proxy   | 2.8.0.beta20230815 |
| master  | 2.8.0.beta20230815 |
| service | 2.8.0.beta20230815 |

2. Apollo2.0 更新内容

   - 新增修改实体重力接口 **setEntityGravity**

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.8.0.java.beta20230815    |
   | master           | 2.8.0.java.beta20230815    |
   | geyser           | 2.8.0.java.beta20230815    |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.9-SNAPSHOT             |

## 2023.08.10 2.7更新内容

1. Apollo 更新内容
   - 新增开启玩家发包数据统计接口 [EnableNetgamePacketIdStatistics](./4-SDK/6-大厅与游戏服API.html#EnableNetgamePacketIdStatistics)
   - 新增获取玩家发包数量接口 [GetAndClearNetgamePacketIdStatistics](./4-SDK/6-大厅与游戏服API.html#GetAndClearNetgamePacketIdStatistics)

2. Apollo2.0 更新内容

   - 修复部分情况下玩家位置异常问题

## 2023.06.27 2.7更新内容

1. Apollo2.0 更新内容

   - 新增world参数的生成生物接口
   - 修复paper1.12下spigotmaster报错问题

   插件版本是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | SpigotMaster插件 | 1.3.8-SNAPSHOT             |

## 2023.06.21 2.7更新内容

1. 修复开启区块不存档性能开关后、设置实体不存档后，实体泄露的问题

2. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.7.0.release20230621 |
| proxy   | 2.7.0.release20230621 |
| master  | 2.7.0.release20230621 |
| service | 2.7.0.release20230621 |


3. Apollo2.0 更新内容

   - 新增发送玩家广播基岩版原生数据包功能

   - 优化spigotmaster插件大小

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.7.0.java.release20230621 |
   | master           | 2.7.0.java.release20230621 |
   | geyser           | 2.7.0.java.release20230621 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.7-SNAPSHOT             |

## 2023.05.30 2.6更新内容

1. 修复ServerPlayerBornPosEvent重生时，位置修正导致的事件设置位置偏移问题

2. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.6.0.release20230530 |
| proxy   | 2.6.0.release20230530 |
| master  | 2.6.0.release20230530 |
| service | 2.6.0.release20230530 |


3. Apollo2.0 更新内容

   - 新增动态设置实体AABB接口：** setEntityScale **
   - 新增骑乘组件(minecraft:rideable)支持
   - 新增蓄力跳组件(minecraft:can_power_jump)支持
   - 新增自定义方块支持

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.6.10.java.release20230530    |
   | master           | 2.6.10.java.release20230530    |
   | geyser           | 2.6.10.java.release20230530    |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.5-SNAPSHOT             |


## 2023.05.26 2.7beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.7.0.beta20230526 |
| proxy   | 2.7.0.beta20230526 |
| master  | 2.7.0.beta20230526 |
| service | 2.7.0.beta20230526 |

2. Apollo2.0 更新内容

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.7.0.java.beta20230526    |
   | master           | 2.7.0.java.beta20230526    |
   | geyser           | 2.7.0.java.beta20230526    |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.4-SNAPSHOT             |

## 2023.05.04 2.6更新内容

1. 新增[AddGetPlayerLockTask](./4-SDK/6-大厅与游戏服API.html#AddGetPlayerLockTask)，添加获取玩家在线锁时的处理任务，在所有任务都完成后，才会继续玩家的登录流程<!--by czh-->

2. 修复了停服时崩溃的问题

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.6.0.release20230504 |
| proxy   | 2.6.0.release20230504 |
| master  | 2.6.0.release20230504 |
| service | 2.6.0.release20230504 |

## 2023.04.18 2.6、2.5更新内容

1. 外放2.6正式版。

   引擎app_verion（studio中需要选择的引擎版本）分别是：

   | 2.6     | app_verion            |
   | ------- | --------------------- |
   | game    | 2.6.0.release20230418 |
   | proxy   | 2.6.0.release20230418 |
   | master  | 2.6.0.release20230418 |
   | service | 2.6.0.release20230418 |

   | 2.5     | app_verion            |
   | ------- | --------------------- |
   | game    | 2.5.0.release20230418 |
   | proxy   | 2.5.0.release20230418 |
   | master  | 2.5.0.release20230418 |
   | service | 2.5.0.release20230418 |

2. Apollo2.0 更新内容

   - 修复自定义实体相关问题
   - 优化自定义实体写法
   - 优化SpigotMasterAPI文档格式
   - 新增动态设置实体AABB接口：** setEntitySize **

   引擎及插件版本分别是：

   | 2.6              | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.6.10.java.release20230418 |
   | master           | 2.6.10.java.release20230418 |
   | geyser           | 2.6.10.java.release20230418 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.3-SNAPSHOT              |

   | 2.5              | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.5.10.java.release20230418 |
   | master           | 2.5.10.java.release20230418 |
   | geyser           | 2.5.10.java.release20230418 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.3-SNAPSHOT              |

## 2023.04.06 2.6、2.5更新内容

1. 外放2.6正式版。

   引擎app_verion（studio中需要选择的引擎版本）分别是：

   | 2.6     | app_verion            |
   | ------- | --------------------- |
   | game    | 2.6.0.release20230406 |
   | proxy   | 2.6.0.release20230406 |
   | master  | 2.6.0.release20230406 |
   | service | 2.6.0.release20230406 |

   | 2.5     | app_verion            |
   | ------- | --------------------- |
   | game    | 2.5.0.release20230406 |
   | proxy   | 2.5.0.release20230406 |
   | master  | 2.5.0.release20230406 |
   | service | 2.5.0.release20230406 |

2. Apollo2.0 更新内容

   - 支持服务端UI，详见<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/30-Spigot服Demo详解/6-ServerFormDemo详解.html" rel="noopenner">ServerFormDemo详解</a>

   引擎及插件版本分别是：

   | 2.6              | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.6.10.java.release20230406 |
   | master           | 2.6.10.java.release20230406 |
   | geyser           | 2.6.10.java.release20230406 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.2-SNAPSHOT              |

   | 2.5              | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.5.10.java.release20230406 |
   | master           | 2.5.10.java.release20230406 |
   | geyser           | 2.5.10.java.release20230406 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.2-SNAPSHOT              |

## 2023.03.23 2.5更新内容

1. 修复了一个刷物品的bug

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.5.0.release20230323 |
| proxy   | 2.5.0.release20230323 |
| master  | 2.5.0.release20230323 |
| service | 2.5.0.release20230323 |

2. Apollo2.0 更新内容

   - 支持了自定义实体，详见<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/23-Spigot服自定义实体原理简介.html" rel="noopenner">Spigot自定义实体</a>
   - proxy与geyser现在合并为一个进程，但部署的配置不变。在部署服务器文档中的<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/11-部署服务器.html#负载-协议转换部分部署流程" rel="noopenner">负载-协议转换部分部署流程</a>调整了相关描述，并且增加了<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/11-部署服务器.html#proxy与geyser服的性能参数" rel="noopenner">Proxy与Geyser服的性能参数</a>的描述
   - 新增<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/13-其他部署时可配置字段.html" rel="noopenner">其他部署时可配置字段</a>文档，讲解命令补全及放置破坏距离的配置
   - SpigotMaster插件、BungeeMaster插件以及示例Demo更改为在McStudio的内容库中下载，详见<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/99-下载内容.html" rel="noopenner">下载内容</a>

   引擎及插件版本分别是：

   |                  | app_verion                  |
   | ---------------- | --------------------------- |
   | proxy            | 2.5.10.java.release20230323 |
   | master           | 2.5.10.java.release20230323 |
   | geyser           | 2.5.10.java.release20230323 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT              |
   | SpigotMaster插件 | 1.3.1-SNAPSHOT              |

## 2023.03.14 2.6beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.6.0.beta20230314 |
| proxy   | 2.6.0.beta20230314 |
| master  | 2.6.0.beta20230314 |
| service | 2.6.0.beta20230314 |

2. Apollo2.0 更新内容

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.6.0.java.beta20230314    |
   | master           | 2.6.0.java.beta20230314    |
   | geyser           | 2.6.0.java.beta20230314    |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.0-SNAPSHOT             |

## 2023.03.09 2.5更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

   |         | app_verion            |
   | ------- | --------------------- |
   | game    | 2.5.0.release20230309 |
   | proxy   | 2.5.0.release20230309 |
   | master  | 2.5.0.release20230309 |
   | service | 2.5.0.release20230309 |

2. Apollo2.0 更新内容

   - 支持`master`运营指令
   - `SpigotMaster`支持 `Paper 1.18.2`

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.5.0.java.release20230309 |
   | master           | 2.5.0.java.release20230309 |
   | geyser           | 2.5.0.java.release20230309 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.0-SNAPSHOT             |

## 2023.02.21 2.5更新内容

1. 修复了红石刷冰机的内存泄露问题

   引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.5.0.release20230221 |
| proxy   | 2.5.0.release20230221 |
| master  | 2.5.0.release20230221 |
| service | 2.5.0.release20230221 |

2. Apollo2.0 更新内容

   - 支持设置是否开启客户端的命令补全功能，可在配置文件`deploy.json`的common中添加了`command_suggestions`字段控制。

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.5.0.java.release20230221 |
   | master           | 2.5.0.java.release20230221 |
   | geyser           | 2.5.0.java.release20230221 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.0-SNAPSHOT             |

## 2023.02.07 2.5更新内容

1. 权限管理插件迭代，修复无法识别mod类型的问题。

2. 官网插件规范新增`server.properties`文件编写规范

2. Apollo2.0 更新内容

   - SpigotMaster修复商城签名问题

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.5.0.java.release20230207 |
   | master           | 2.5.0.java.release20230207 |
   | geyser           | 2.5.0.java.release20230207 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.3.0-SNAPSHOT             |

## 2023.01.12 2.5更新内容

1. 战斗系统插件修复了2.5版本 ui界面不显示属性数值的问题

2. Apollo2.0 更新内容

   - SpigotMaster插件文档新增聊天扩展相关，包括disableClientChatExtension、enableClientChatExtension接口，以及CLIENT_LOAD_ADDON_FINISH事件
   - 优化卡顿问题
   - 添加客户端区块缓存支持

   引擎及插件版本分别是：

   |                  | app_verion                 |
   | ---------------- | -------------------------- |
   | proxy            | 2.5.0.java.release20230111 |
   | master           | 2.5.0.java.release20230111 |
   | geyser           | 2.5.0.java.release20230111 |
   | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
   | SpigotMaster插件 | 1.2.4-SNAPSHOT             |

## 2022.12.29 2.5更新内容

1. 外放2.5正式版。引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

    |         | app_verion            |
    | ------- | --------------------- |
    | game    | 2.5.0.release20221229 |
    | proxy   | 2.5.0.release20221229 |
    | master  | 2.5.0.release20221229 |
    | service | 2.5.0.release20221229 |

2. Apollo2.0 更新内容

    - 新增CustomHumanModelDemo示例，展示如何更改玩家模型

    - 外放2.5正式版。引擎及插件版本分别是：

    |                  | app_verion                 |
    | ---------------- | -------------------------- |
    | proxy            | 2.5.0.java.release20221229 |
    | master           | 2.5.0.java.release20221229 |
    | geyser           | 2.5.0.java.release20221229 |
    | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
    | SpigotMaster插件 | 1.2.4-SNAPSHOT             |


## 2022.12.15 2.4更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.4.0.release20221215 |
| proxy   | 2.4.0.release20221215 |
| master  | 2.4.0.release20221215 |
| service | 2.4.0.release20221215 |

2. Apollo2.0 更新内容

|                  | app_verion                 |
| ---------------- | -------------------------- |
| proxy            | 2.4.0.java.release20221215 |
| master           | 2.4.0.java.release20221215 |
| geyser           | 2.4.0.java.release20221215 |
| BungeeMaster插件 | 1.0.2-SNAPSHOT             |
| SpigotMaster插件 | 1.2.3-SNAPSHOT             |

## 2022.12.06 2.5beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.5.0.beta20221206 |
| proxy   | 2.5.0.beta20221206 |
| master  | 2.5.0.beta20221206 |
| service | 2.5.0.beta20221206 |

## 2022.12.01 2.4更新内容
1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.4.0.release20221201 |
| proxy   | 2.4.0.release20221201 |
| master  | 2.4.0.release20221201 |
| service | 2.4.0.release20221201 |

2. Apollo2.0 更新内容

   - 新增客户端版本限制逻辑，目前低于2.4的客户端不允许登录Apollo2.0的服

   - 新增监听SpigotMaster事件接口

   - 新增商城相关接口、事件及Demo

   - 移除了攻击cd显示

   - 修复了马的跳跃动作及交互文字

   - 修复了部分系统信息为非中文的问题

   - Spigot开服工具 app_version 分别是

      |                  | app_verion                 |
      | ---------------- | -------------------------- |
      | proxy            | 1.0.8.java.release20221201 |
      | master           | 1.0.8.java.release20221201 |
      | geyser           | 1.0.8.java.release20221201 |
      | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
      | SpigotMaster插件 | 1.2.3-SNAPSHOT             |

## 2022.11.15 2.4更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.4.0.release20221115 |
| proxy   | 2.4.0.release20221115 |
| master  | 2.4.0.release20221115 |
| service | 2.4.0.release20221115 |

2. 新增<a href="../../mcguide/27-网络游戏/课程8：性能优化/第7节：服务器部署优化.html" rel="noopenner"> 服务器部署优化 </a>文档

4. Apollo2.0 更新内容
   - spigot开服工具的geyser服不再需要配置数量，并且新增了单服最大人数及单服最大内存的配置
   - 更新SpigotMaster，新增setItemLayer，getItemLayer，removeItemLayer接口；废弃getCustomItemMaterial接口
   - 自定义物品支持全物品换皮
   - 自定义物品Demo，新增工具、武器、盔甲、弓样例
   - 新增客户端生物模型Demo
   - Spigot开服工具 app_version 分别是

      |                  | app_verion                 |
      | ---------------- | -------------------------- |
      | proxy            | 1.0.8.java.release20221115 |
      | master           | 1.0.8.java.release20221115 |
      | geyser           | 1.0.8.java.release20221115 |
      | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
      | SpigotMaster插件 | 1.2.2-SNAPSHOT             |

## 2022.11.08 2.4更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.4.0.release20221108 |
| proxy   | 2.4.0.release20221108 |
| master  | 2.4.0.release20221108 |
| service | 2.4.0.release20221108 |

## 2022.10.27 2.4beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.4.0.beta20221027 |
| proxy   | 2.4.0.beta20221027 |
| master  | 2.4.0.beta20221027 |
| service | 2.4.0.beta20221027 |

## 2022.10.18 2.3更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.3.0.release20221018 |
| proxy   | 2.3.0.release20221018 |
| master  | 2.3.0.release20221018 |
| service | 2.3.0.release20221018 |

2. 开服工具2.0正式外放，详情参考<a href="../../mcguide/27-网络游戏/课程10：使用Spigot开服/10-支持基岩版客户端的Java版网络游戏概述.html" rel="noopenner"> 支持基岩版客户端的Java版网络游戏概述 </a>

- 支持同时使用Spigot，Apollo，模组SDK进行开服

- 对现有的spigot插件提供良好的支持

- 使用模组SDK撰写客户端玩法和精细的表现逻辑

- 使用插件快速制作新物品

  引擎及插件版本分别是：

  |                  | app_verion                 |
  | ---------------- | -------------------------- |
  | proxy            | 1.0.7.java.release20221018 |
  | master           | 1.0.7.java.release20221018 |
  | geyser           | 1.0.7.java.release20221018 |
  | BungeeMaster插件 | 1.0.2-SNAPSHOT             |
  | SpigotMaster插件 | 1.2-SNAPSHOT               |

3. 修复了[GetPcGameUserLike](./4-SDK/10-启动器信息API.html#GetPcGameUserLike)接口及文档

## 2022.09.28 2.3更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.3.0.release20220928 |
| proxy   | 2.3.0.release20220928 |
| master  | 2.3.0.release20220928 |
| service | 2.3.0.release20220928 |

2. 新增插件：属性插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2022.09.15 2.3更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.3.0.release20220915 |
| proxy   | 2.3.0.release20220915 |
| master  | 2.3.0.release20220915 |
| service | 2.3.0.release20220915 |

## 2022.08.31 2.2更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.2.0.release20220831 |
| proxy   | 2.2.0.release20220831 |
| master  | 2.2.0.release20220831 |
| service | 2.2.0.release20220831 |

2. 新增插件：战令插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)
3. 新增插件：生物血条插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)
4. 新增插件：空岛插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)


## 2022.08.23 2.3beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.3.0.beta20220823 |
| proxy   | 2.3.0.beta20220823 |
| master  | 2.3.0.beta20220823 |
| service | 2.3.0.beta20220823 |

## 2022.08.02 2.2更新内容

1. 新增插件：定时清理插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2022.07.19 2.2更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.2.0.release20220719 |
| proxy   | 2.2.0.release20220719 |
| master  | 2.2.0.release20220719 |
| service | 2.2.0.release20220719 |


2. launcherApi.GetUIDByNickname接口支持PC端
3. 新增<a href="../../mcguide/27-网络游戏/课程8：性能优化/第5节：Redis缓存的使用.html" rel="noopenner"> Apollo上使用redis来为mysql进行mem cache的案例 </a>文档
4. 修复在传送纬度时突然请求切服会导致服务器崩溃

## 2022.07.05 2.2更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.2.0.release20220705 |
| proxy   | 2.2.0.release20220705 |
| master  | 2.2.0.release20220705 |
| service | 2.2.0.release20220705 |

## 2022.06.30 2.2更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.2.0.release20220630 |
| proxy   | 2.2.0.release20220630 |
| master  | 2.2.0.release20220630 |
| service | 2.2.0.release20220630 |

## 2022.06.21 2.1更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.1.0.release20220621 |
| proxy   | 2.1.0.release20220621 |
| master  | 2.1.0.release20220621 |
| service | 2.1.0.release20220621 |

2. 新增[GetPcGameUserLike](./4-SDK/10-启动器信息API.html#GetPcGameUserLike)，获取玩家是否点赞了当前网络服（仅支持PC玩家）<!--by czh-->
3. 在服务端使用ListenForEvent监听客户端系统事件时，返回的事件参数现在会自带一个\_\_id\_\_的key表示对应客户端的playerId
4. 新增插件：成就插件、全息插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2022.06.07 2.2更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

| beta    | app_verion            |
| ------- | --------------------- |
| game    | 2.2.0.beta20220607    |
| proxy   | 2.2.0.beta20220607    |
| master  | 2.2.0.beta20220607    |
| service | 2.2.0.beta20220607    |

| release | app_verion            |
| ------- | --------------------- |
| game    | 2.1.0.release20220607 |
| proxy   | 2.1.0.release20220607 |
| master  | 2.1.0.release20220607 |
| service | 2.1.0.release20220607 |

## 2022.04.26 2.1更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.1.0.release20220426 |
| proxy   | 2.1.0.release20220426 |
| master  | 2.1.0.release20220426 |
| service | 2.1.0.release20220426 |

## 2022.04.12 2.1更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 2.1.0.release20220412 |
| proxy   | 2.1.0.release20220412 |
| master  | 2.1.0.release20220412 |
| service | 2.1.0.release20220412 |

2. 新增<a href="../../mcguide/27-网络游戏/课程9：服务器上线/第5节：Grafana监控进阶功能.html" rel="noopenner"> Grafana监控进阶功能 </a>介绍文档

## 2022.03.29 2.0更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 2.0.0.release20220329 |
| proxy   | 2.0.0.release20220329 |
| master  | 2.0.0.release20220329 |
| service | 2.0.0.release20220329 |
2. 枚举值新增ContainerType,详见[ContainerType](../1-ModAPI/枚举值/ContainerType.md)
3. 新增获取附近玩家列表id接口[GetRelevantPlayer](../1-ModAPI/接口/玩家/行为.md#getrelevantplayer仅apollo可用)
4. 新增插件：7stars坐骑、自定义分解、自定义合成、排队、第五季节核心, 介绍详见：[第三方插件简介](./6-第三方插件简介.html)
1. 新增[GetPlatformUid](./4-SDK/6-大厅与游戏服API.md#GetPlatformUid)，获取玩家登录端的uid，假如玩家从手机端登录，返回手机端的uid，否则返回PC端的uid<!--by xltang-->
2. 新增[IsPlayerPeUser](./4-SDK/6-大厅与游戏服API.md#IsPlayerPeUser)，获取玩家是否从手机端登录<!--by xltang-->
3. 新增[GetApolloGameId](./4-SDK/7-公共API.md#GetApolloGameId)，获取游戏当前项目的gameId（商城查询订单时需要）<!--by xltang-->
4. 新增[GetApolloGameKey](./4-SDK/7-公共API.md#GetApolloGameKey)，获取游戏当前项目的gameKey（商城查询订单时需要）<!--by xltang-->
1. 调整[PlayerLoginServerEvent](./4-SDK/2-控制服事件.md#PlayerLoginServerEvent)，增加isPeUser字段，区分玩家是从手机端登录还是从PC端登录<!--by xltang-->
2. 调整[GetPeGameUserStars](./4-SDK/10-启动器信息API.md#GetPeGameUserStars)，调整实现，仅支持从手机端登录的玩家<!--by xltang-->
3. 调整[GetUserAuthInfo](./4-SDK/10-启动器信息API.md#GetUserAuthInfo)，调整实现，区分手机端登录玩家和PC端登录玩家<!--by xltang-->
4. 调整[GetUserGuest](./4-SDK/10-启动器信息API.md#GetUserGuest)，此接口已废弃<!--by xltang-->
5. 调整[ShareApolloGame](./4-SDK/10-启动器信息API.md#ShareApolloGame)，调整逻辑，仅支持大厅服、游戏服调用，仅支持手机端登录玩家<!--by xltang-->

## 2022.03.15 2.0更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion            |
| ------- | --------------------- |
| game    | 2.0.0.release20220315 |
| proxy   | 2.0.0.release20220315 |
| master  | 2.0.0.release20220315 |
| service | 2.0.0.release20220315 |

2. 事件`MasterResponseTransferFailServerEvent` 添加参数`reason`,详见[MasterResponseTransferFailServerEvent](./4-SDK/1-大厅与游戏服事件.html#MasterResponseTransferFailServerEvent) <!--by xltang-->
3. 新增事件`MasterResponseTransferSucServerEvent`,详见详见[MasterResponseTransferSucServerEvent](./4-SDK/1-大厅与游戏服事件.html#MasterResponseTransferSucServerEvent) <!--by xltang-->
4. 运营指令新增[/netease/update-player-online-limit](./4-SDK/9-运营指令.html)，修改全局最高同时在线人数限制。 <!--by xltang-->
5. 滚动更新文档增加`滚动更新注意事项`,详见<a href="../../mcguide/27-网络游戏/课程2：Apollo基础知识/第4节：部署.html" rel="noopenner"> 部署 </a><!--by xltang-->
6. 反作弊插件迭代，具体参见反作弊插件readme中“1.0.4版本”更新说明 <!--by jishaobin-->
7. 新增插件：投票插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2022.03.01 2.0更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 2.0.0.release20220301 |
| proxy   | 2.0.0.release20220301 |
| master  | 2.0.0.release20220301 |
| service | 2.0.0.release20220301 |

2. 商城插件迭代，具体参见商城插件readme中“1.0.6版本”更新说明
3. 新增插件：聊天记录插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
4. 聊天插件迭代，具体参见聊天插件readme中“1.0.7版本”更新说明
5. 反作弊插件迭代，具体参见反作弊插件readme中“1.0.3版本”更新说明
6. 新增插件：占位符插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2022.02.16 2.0更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 2.0.0.release20220216 |
| proxy   | 2.0.0.release20220216 |
| master  | 2.0.0.release20220216 |
| service | 2.0.0.release20220216 |

2. 新增滚动更新服务器和滚动关服相关api支持，详见[RollingCloseServersEndEvent](4-SDK/2-控制服事件.html#RollingCloseServersEndEvent)，[RollingUpdateServersEndEvent](4-SDK/2-控制服事件.html#RollingUpdateServersEndEvent)，[RollingCloseServers](4-SDK/4-控制服API.html#RollingCloseServers)，[RollingUpdateServers](4-SDK/4-控制服API.html#RollingUpdateServers)，滚动更新服务器<!--by czh-->
3. 反作弊插件：修正砂轮使用附魔书祛魔可以刷经验的问题
4. 新增<a href="../../mcguide/27-网络游戏/课程9：服务器上线/第10节：使用ELK查询服务器日志.html" rel="noopenner"> 使用ELK查询服务器日志 </a>介绍文档
5. 修复了蜂箱刷生物的问题

## 2022.01.20 2.0更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 2.0.0.release20220120 |
| proxy   | 2.0.0.release20220120 |
| master  | 2.0.0.release20220120 |
| service | 2.0.0.release20220120 |

2. 接口[GetUserGuest](./4-SDK/10-启动器信息API.html#GetUserGuest)已废弃，获取启动器中玩家是否游客的信息。<!--by xltang-->
3. 新增事件[NotifyToMultiClients](../1-ModAPI/接口/通用/事件.md#NotifyToMultiClients)，服务器发送事件到指定一批客户端。<!--by xltang-->
4. 新增[AniCheatBlockBreak](../1-ModAPI/枚举值/AniCheatBlockBreak.html)，新增反作弊配置枚举值，破坏方块相关。<!--by xltang-->
5. 新增[AniCheatConsts](../1-ModAPI/枚举值/AniCheatConsts.html)，新增反作弊配置开关宏定义。<!--by xltang-->
6. 新增[AniCheatMove](../1-ModAPI/枚举值/AniCheatMove.html)，新增反作弊配置枚举值，移动检查开关。<!--by xltang-->
7. 新增[AniCheatMoveRewind](../1-ModAPI/枚举值/AniCheatMoveRewind.html)，新增反作弊配置枚举值，位移倒带模拟相关参数。<!--by xltang-->
8. 新增[AniCheatMoveUnSupportRewind](../1-ModAPI/枚举值/AniCheatMoveUnSupportRewind.html)，新增反作弊配置枚举值，不支持倒带模拟的特殊场景相关参数。<!--by xltang-->
9. 运营数据统计插件迭代，具体参见运营数据统计插件readme中“1.0.2版本”更新说明<!--by xltang-->
10. 面对面交易插件迭代，具体参见面对面交易插件readme中“1.0.6版本”更新说明
11. 领地插件迭代，具体参见领地插件readme中“1.0.18版本”更新说明
12. 优化喇叭公告、公告、飞行、公会等插件UI的问题
13. 反作弊插件修正砂轮中，使用带诅咒附魔的护甲转换误报的问题
14. 新增插件：定时刷新生物方块，介绍详见：[第三方插件简介](./6-第三方插件简介.html)
13. 新增插件：任务插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2022.01.06 1.25更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.25.0.release20220106 |
| proxy   | 1.25.0.release20220106 |
| master  | 1.25.0.release20220106 |
| service | 1.25.0.release20220106 |

2. 修复某些插件切维度后scrollView异常的问题
3. 新增插件：区块版领地插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
4. 新增插件：地图转存数据库插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
5. 新增插件：小地图插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2021.12.23 1.25更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.25.0.release20211223 |
| proxy   | 1.25.0.release20211223 |
| master  | 1.25.0.release20211223 |
| service | 1.25.0.release20211223 |

2. 新增插件：反作弊插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
3. 新增插件：操作记录插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
4. 新增插件：摇号插件、权限插件、禁用物品插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2021.12.21 2.0 beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion          |
| ------- | ------------------- |
| game    | 2.0.0.beta20211221 |
| proxy   | 2.0.0.beta20211221 |
| master  | 2.0.0.beta20211221 |
| service | 2.0.0.beta20211221 |

- 温馨提示

预计在1月5日更新2.0的第2个beta包。

在1月13日更新2.0的稳定版。

在1月21日，全渠道将更新2.0版本玩家包体，玩家将陆续更新到2.0版本，请开发者合理安排更新节奏。

## 2021.12.09 1.25更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.25.0.release20211209 |
| proxy   | 1.25.0.release20211209 |
| master  | 1.25.0.release20211209 |
| service | 1.25.0.release20211209 |

2. 新增[SetShowFakeSeed](./4-SDK/6-大厅与游戏服API.html#SetShowFakeSeed)，在客户端【设置】中，显示虚假的游戏地图种子<!--by xltang-->
3. 新增[StopShowFakeSeed](./4-SDK/6-大厅与游戏服API.html#StopShowFakeSeed)，在客户端【设置】中，显示真实的游戏地图种子<!--by xltang-->
4. 修正[ProjectileDoHitEffectEvent](../1-ModAPI/事件/实体.html#ProjectileDoHitEffectEvent)，碰撞到方块时没有触发的问题<!--by xltang-->
5. 修正[GetModJsonConfigByName](./4-SDK/7-公共API.html#GetModJsonConfigByName)函数，在控制服中无法正常运行的问题<!--by xltang-->
6. 新增插件：定期执行运营指令插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
7. 新增插件：货币插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)
8. 新增插件：经验等级插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)
9. 商城插件迭代，新增自定义的商城界面，具体参见商城插件readme中“1.0.5版本”更新说明<!--by xltang-->
10. 领地插件迭代，具体参见领地插件readme中“1.0.17版本”更新说明<!--by xltang-->
11. 飞行插件迭代，具体参见飞行插件readme中“1.0.6版本”更新说明<!--by xltang-->
12. 提示插件迭代，具体参见提示插件readme中“1.0.3版本”更新说明<!--by xltang-->
13. 运营数据统计插件迭代，具体参见运营数据统计插件readme中“1.0.1版本”更新说明<!--by xltang-->



## 2021.11.25 1.25更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.25.0.release20211125 |
| proxy   | 1.25.0.release20211125 |
| master  | 1.25.0.release20211125 |
| service | 1.25.0.release20211125 |

2. 新增[GetResourceFastload](../1-ModAPI/接口/通用/调试.md#GetResourceFastload)，获取资源快速加载设置<!--by jishaobin-->
3. 新增[SetResourceFastload](../1-ModAPI/接口/通用/调试.md#SetResourceFastload)，设置资源快速加载<!--by jishaobin-->
4. 队伍插件迭代，具体参见队伍插件readme中“1.0.11版本”更新说明<!--by xltang-->
5. 飞行插件迭代，具体参见飞行插件readme中“1.0.5版本”更新说明<!--by xltang-->
6. 反馈插件迭代，具体参见反馈插件readme中“1.0.4版本”更新说明<!--by xltang-->

## 2021.11.11 1.24更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.24.0.release20211111 |
| proxy   | 1.24.0.release20211111 |
| master  | 1.24.0.release20211111 |
| service | 1.24.0.release20211111 |

2. NPC插件迭代，具体参见NPC插件readme中“1.0.7版本”更新说明<!--by xltang-->
3. 新增插件：数据转存插件，介绍详见：[官方插件简介](./5-官方插件简介.html)
4. 新增插件：宝箱礼包插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)
5. 新增离线工具：生成插件模板，下载地址: [生成插件模板工具](https://g79.gdl.netease.com/template.zip)

## 2021.11.04 1.25 beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion          |
| ------- | ------------------- |
| game    | 1.25.0.beta20211104 |
| proxy   | 1.25.0.beta20211104 |
| master  | 1.25.0.beta20211104 |
| service | 1.25.0.beta20211104 |

温馨提示，下列说明包含beta版本、稳定版本、开发包体、玩家包体等概念，请注意区分。另外时间节点仅供参考，后续若有调整，将另行通知。
1.25版本开发包外放节点说明：

- 11月4日，外放beta版本，modpc包增加1.25beta版本，手机测试版启动器增加1.25beta版本，服务器引擎版本也增加1.25beta。
- 11月18日，外放稳定版本，modpc包与手机测试版启动器增加1.25稳定版本。服务器引擎版本增加1.25stable。

预计在稳定版本之后的1周左右，将发放1.25版本玩家包体，玩家将陆续更新到1.25版本。


## 2021.10.28 1.24更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.24.0.release20211028 |
| proxy   | 1.24.0.release20211028 |
| master  | 1.24.0.release20211028 |
| service | 1.24.0.release20211028 |

2. 新增<a href="../../mcguide/27-网络游戏/课程9：服务器上线/第7节：多版本客户端引擎支持.html" rel="noopenner"> 多版本客户端引擎支持 </a>介绍文档
3. 新增[GetProtocolVersionByUID](./4-SDK/4-控制服API.html#GetProtocolVersionByUID)，获取在线玩家客户端协议版本号<!--by yfg-->
4. 新增[GetServerProtocolVersion](./4-SDK/6-大厅与游戏服API.html#GetServerProtocolVersion)，获取服务器的协议版本号<!--by yfg-->
5. 升级接口[GetOnlineServerInfoOfMultiPlayers](./4-SDK/7-公共API.html#GetOnlineServerInfoOfMultiPlayers)，支持获协议版本号<!--by yfg-->
6. 升级接口[GetOnlineServerInfoOfPlayer](./4-SDK/7-公共API.html#GetOnlineServerInfoOfPlayer)，支持获协议版本号<!--by yfg-->
7. 地图属性插件迭代，具体参见地图属性插件readme中“1.0.4版本”更新说明<!--by xltang-->

## 2021.10.14 1.24更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.24.0.release20211014 |
| proxy   | 1.24.0.release20211014 |
| master  | 1.24.0.release20211014 |
| service | 1.24.0.release20211014 |

2. 新增[GetApolloUniqueId](./4-SDK/7-公共API.html#GetApolloUniqueId)，获取游戏当前项目唯一ID<!--by xltang-->
3. MySql数据库连接池支持数据库中断重启后自动重试（最高支持数据库服务中断2分钟）

## 2021.09.29 1.24更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.24.0.release20210929 |
| proxy   | 1.24.0.release20210929 |
| master  | 1.24.0.release20210929 |
| service | 1.24.0.release20210929 |

2. 公会插件迭代，具体参见公会插件readme中“1.0.7版本”更新说明<!--by xltang-->

## 2021.09.16 1.24更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.24.0.release20210916 |
| proxy   | 1.24.0.release20210916 |
| master  | 1.24.0.release20210916 |
| service | 1.24.0.release20210916 |

2. 公告插件迭代，具体参见公告插件readme中“1.0.6版本”更新说明<!--by yfg-->
3. 飞行插件迭代，具体参见飞行插件readme中“1.0.4版本”更新说明<!--by xltang-->
4. 反馈插件迭代，具体参见反馈插件readme中“1.0.3版本”更新说明<!--by xltang-->
5. 好友插件迭代，具体参见好友插件readme中“1.0.13版本”更新说明<!--by xltang-->
6. 随机传送插件迭代，具体参见随机传送插件readme中“1.0.2版本”更新说明<!--by xltang-->
7. 领地插件迭代，具体参见领地插件readme中“1.0.16版本”更新说明<!--by xltang-->
8. 箱子插件迭代，具体参见箱子插件readme中“1.0.7版本”更新说明<!--by xltang-->
9. 弹幕插件迭代，具体参见弹幕插件readme中“1.0.6版本”更新说明<!--by xltang-->
10. 通用输入插件迭代，具体参见通用输入插件readme中“1.0.1版本”更新说明<!--by xltang-->
11. 外观插件迭代，具体参见外观插件readme中“1.0.5版本”更新说明<!--by xltang-->
12. 队伍插件迭代，具体参见队伍插件readme中“1.0.10版本”更新说明<!--by xltang-->
13. 新增插件：图鉴插件，介绍详见：[第三方插件简介](./6-第三方插件简介.html)

## 2021.09.02 1.23更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.23.0.release20210902 |
| proxy   | 1.23.0.release20210902 |
| master  | 1.23.0.release20210902 |
| service | 1.23.0.release20210902 |

- 公会插件迭代，具体参见公会插件readme中“1.0.6版本”更新说明
- 商场插件迭代，具体参见公会插件readme中“1.0.5版本”更新说明
- 报名匹配插件迭代，具体参见报名匹配插件readme中“1.0.2版本”更新说明
- 功能NPC插件迭代，具体参见功能NPC插件readme中“1.0.6版本”更新说明
- PVP插件迭代，具体参见PVP插件readme中“1.0.6版本”更新说明
- 随机传送插件迭代，具体参见随机传送插件readme中“1.0.1版本”更新说明
- 回合战斗插件迭代，具体参见回合战斗插件readme中“1.0.1版本”更新说明
- 队伍插件迭代，具体参见队伍插件readme中“1.0.9版本”更新说明
- 面对面交易插件迭代，具体参见面对面交易插件readme中“1.0.5版本”更新说明
- 箱子插件迭代，具体参见箱子插件readme中“1.0.6版本”更新说明
- 弹幕插件迭代，具体参见弹幕插件readme中“1.0.5版本”更新说明
- 称号插件迭代，具体参见称号插件readme中“1.0.7版本”更新说明
- 经济插件迭代，具体参见经济插件readme中“2.0.13版本”更新说明
- 新增<a href="../../mcguide/27-网络游戏/课程7：开发技巧/第3节：控制台调试.html" rel="noopenner"> 控制台调试 </a>介绍文档。
- 补充<a href="../../mcguide/27-网络游戏/课程1：成为Apollo服主及相关准备/第4节：申请开发阶段服务器.html" rel="noopenner"> 私钥生成 </a>说明文档。
- 新增<a href="../../mcguide/27-网络游戏/课程8：性能优化/第3节：快速切服.html" rel="noopenner"> 快速切服 </a>指引文档。

## 2021.08.23 1.24 beta更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.24.0.beta20210823 |
| proxy   | 1.24.0.beta20210823 |
| master  | 1.24.0.beta20210823 |
| service | 1.24.0.beta20210823 |

温馨提示，下列说明包含beta版本、稳定版本、开发包体、玩家包体等概念，请注意区分。另外时间节点仅供参考，后续若有调整，将另行通知。
1.24版本开发包外放节点说明：

- 8月23日，外放第一次beta版本，modpc包增加1.24beta版本，手机测试版启动器增加1.24beta版本，服务器引擎版本也增加1.24beta。
- 9月8日，外放第二次beta版本，按实际情况修复modpc包、手机测试版启动器以及服务器引擎相关的bug。
- 9月16日，外放稳定版本，modpc包与手机测试版启动器增加1.24稳定版本。服务器引擎版本增加1.24stable。

预计在稳定版本之后的1周左右，将发放1.24版本玩家包体，玩家将陆续更新到1.24版本。
## 2021.08.19 1.23更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.23.0.release20210819 |
| proxy   | 1.23.0.release20210819 |
| master  | 1.23.0.release20210819 |
| service | 1.23.0.release20210819 |

2. 控制服新增[GetServerLoadedModsById](./4-SDK/4-控制服API.html#GetServerLoadedModsById)，获取服务器加载mods列表<!--by yfg-->
3. 控制服新增[GetServerLoadedModsByType](./4-SDK/4-控制服API.html#GetServerLoadedModsByType)，获取服务器加载mods列表<!--by yfg-->
4. 功能服新增[GetServerLoadedModsById](./4-SDK/5-功能服API.html#GetServerLoadedModsById)，获取服务器加载mods列表<!--by yfg-->
5. 功能服新增[GetServerLoadedModsByType](./4-SDK/5-功能服API.html#GetServerLoadedModsByType)，获取服务器加载mods列表<!--by yfg-->
6. 经济插件迭代，具体参见经济插件readme中“2.0.12版本”更新说明
7. 面对面交易插件迭代，具体参见面对面交易插件readme中“1.0.4版本”更新说明
8. 云端玩家信息插件迭代，具体参见云端玩家信息插件readme中“1.0.7版本”与“1.0.8版本”更新说明
9. 官方插件补充运营指令描述文件，方便在Studio控制台调试中选择使用

## 2021.08.05 1.23更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.23.0.release20210805 |
| proxy   | 1.23.0.release20210805 |
| master  | 1.23.0.release20210805 |
| service | 1.23.0.release20210805 |

2. 新增4个插件：抽奖，物品栏菜单，背包、箱子整理，随身仓库。介绍详见：[下载地址](./6-第三方插件简介.html)

3. 服务器通信文档中增加[通信接口图示](./4-SDK/8-服务器通信.html#通信接口图示)，提供通信接口总览

4. 新增[PlayerCheatSpinAttackServerEvent](../1-ModAPI/事件/玩家.html#PlayerCheatSpinAttackServerEvent)，触发时机：玩家开始/结束快速旋转攻击并且不符合发送快速旋转攻击条件时触发（装备激流附魔的三叉戟、在水中或雨中，且未骑乘）<!--by xltang-->

5. 新增[PlayerSpinAttackServerEvent](../1-ModAPI/事件/玩家.html#PlayerSpinAttackServerEvent)，触发时机：玩家开始/结束快速旋转攻击时触发。<!--by xltang-->

6. 新增[AddBlockProtectField](../1-ModAPI/接口/世界/游戏规则.html#AddBlockProtectField)，设置一个方块无法被玩家/实体破坏的区域。<!--by xltang-->

7. 新增[CleanBlockProtectField](../1-ModAPI/接口/世界/游戏规则.html#CleanBlockProtectField)，取消全部已设置的方块无法被玩家/实体破坏的区域。<!--by xltang-->

8. 新增[RemoveBlockProtectField](../1-ModAPI/接口/世界/游戏规则.html#RemoveBlockProtectField)，取消一个方块无法被玩家/实体破坏的区域。<!--by xltang-->

9. 新增文档<a href="../../mcguide/27-网络游戏/课程1：成为Apollo服主及相关准备/第5节（拓展）：使用数据库前端连接数据库.html" rel="noopenner"> 使用数据库前端连接数据库 </a>

10. 新增文档<a href="../../mcguide/27-网络游戏/课程8：性能优化/第2节：性能开关.html" rel="noopenner"> 性能开关 </a>

11. 领地插件迭代，新增事件，具体参见领地插件readme中“1.0.14版本”更新说明

12. NPC插件迭代，新增事件，具体参加NPC插件readme中“1.0.5版本”更新说明



## 2021.07.22 1.23更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.23.0.release20210722 |
| proxy   | 1.23.0.release20210722 |
| master  | 1.23.0.release20210722 |
| service | 1.23.0.release20210722 |

2. 新增游戏房间管理插件
3. 经济插件迭代，提供UI工程，替换UI界面中的废弃接口，新增物品信息悬浮框，具体参见经济插件readme中“2.0.11版本”更新说明<!--by jishaobin-->
4. 新增[ResetServer](./4-SDK/5-功能服API.html#ResetServer), 功能服重置服务器接口<!--by yfg-->

## 2021.07.08 1.23更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.23.0.release20210708 |
| proxy   | 1.23.0.release20210708 |
| master  | 1.23.0.release20210708 |
| service | 1.23.0.release20210708 |

2、[SetPlayerAllItems](../1-ModAPI/接口/玩家/背包.html#SetPlayerAllItems)不可以将盔甲、裤子、鞋子设置为空问题修复<!--by xltang-->

3、面对面交易插件迭代，具体参见面对面交易插件readme中“1.0.3版本”更新说明<!--by yfg-->

4、新增[ResetGamesBeginEvent](./4-SDK/2-控制服事件.html#ResetGamesBeginEvent)，开始重置lobby/game事件<!--by yfg-->

5、新增[ResetGamesEndEvent](./4-SDK/2-控制服事件.html#ResetGamesEndEvent)，重置lobby/game结束事件<!--by yfg-->

6、新增控制服接口[ResetServer](./4-SDK/4-控制服API.html#ResetServer)，重置某个lobby/game<!--by yfg-->

7、新增[GetAllResetingServers](./4-SDK/4-控制服API.html#GetAllResetingServers)，获取所有重置中服务器的id列表<!--by yfg-->

8、新增大厅与游戏服接口[ResetServer](./4-SDK/6-大厅与游戏服API.html#ResetServer)，重置本服务器<!--by yfg-->

9、新增[MasterResponseTransferFailServerEvent](./4-SDK/2-控制服事件.html#MasterResponseTransferFailServerEvent)，转服失败事件，当玩家试图转服时，没有符合条件的目标服务器时抛出此事件<!--by xltang-->

10、新增[StartChunkProfile](./4-SDK/6-大厅与游戏服API.html#StartChunkProfile)，开始启动服务端区块读写性能分析<!--by xltang-->

11、新增[StopChunkProfile](./4-SDK/6-大厅与游戏服API.html#StopChunkProfile)，结束服务端区块读写性能统计，并返回近期区块读写信息<!--by xltang-->

12、商业化文档补充指令相关说明

13、master重启后，lobby/game通过[RegisterOpCommand](./4-SDK/6-大厅与游戏服API.html#RegisterOpCommand)注册的指令仍生效

14、[SetGameRulesInfoServer](../1-ModAPI/接口/世界/游戏规则.html#SetGameRulesInfoServer)设置command_blocks_enabled对命令矿车生效

15、支持配置game的最大人数，方法：MCStudio打开网络服配置文件目录，在deploy.json文件中game服配置里面添加max_players配置。切服到game时，若超出最大人数限制，则触发[MasterResponseTransferFailServerEvent](./4-SDK/2-控制服事件.html#MasterResponseTransferFailServerEvent)事件

## 2021.06.24 1.23更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.23.0.release20210624 |
| proxy   | 1.23.0.release20210624 |
| master  | 1.23.0.release20210624 |
| service | 1.23.0.release20210624 |

2. 新增[SetKeepResourceWhenTransfer](../1-ModAPI/接口/通用/调试.md#setkeepresourcewhentransfer)，设置快速切服<!--by jishaobin-->
3. 新增[GetKeepResourceWhenTransfer](../1-ModAPI/接口/通用/调试.md#getkeepresourcewhentransfer)，获取快速切服设置<!--by jishaobin-->
4. 新增[/netease/release-online-lock](./4-SDK/9-运营指令.html)，强制解除玩家在线标识。<!--by xltang-->
5. 新增[/netease/release-online-lock-by-server](./4-SDK/9-运营指令.html)，强制解除指定ID服务器当前在线玩家的在线标识。<!--by xltang-->
6. 新增[GetBanUserInfo](./4-SDK/4-控制服API.html#GetBanUserInfo)，获取玩家的封禁信息<!--by yfg-->
7. 新增[GetUserSilentInfo](./4-SDK/4-控制服API.html#GetUserSilentInfo)，获取玩家的禁言信息<!--by yfg-->
8.  新增[CraftItemOutputChangeServerEvent](../1-ModAPI/事件/物品.md#craftitemoutputchangeserverevent)，拿出生成物品时抛出的事件。<!--by jishaobin-->
9.  好友插件迭代，使用官方接口GetUserFriend获取好友列表，去除isTestServer配置，具体参见好友插件readme中“1.0.11版本”更新说明<!--by yfg-->
10. 通用提示插件迭代，新增API，修改表现，提供UI工程，具体参见通用提示插件readme中“1.0.1版本”更新说明<!--by jishaobin-->
11. 主菜单插件迭代，优化插件readme文档描述，具体参见主菜单插件readme中“1.0.5版本”更新说明<!--by jishaobin-->
12. 聊天插件迭代，优化插件readme文档描述，具体参见聊天插件readme中“1.0.4版本”更新说明<!--by jishaobin-->
13. 排行榜插件迭代，优化插件readme文档描述，具体参见排行榜插件readme中“1.0.3版本”更新说明<!--by jishaobin-->


## 2021.06.10 1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210610 |
| proxy   | 1.22.0.release20210610 |
| master  | 1.22.0.release20210610 |
| service | 1.22.0.release20210610 |

2. 新增[/netease/get-online-uids](./4-SDK/9-运营指令.html)，查询当前在线玩家的uid。<!--by xltang-->
3. 新增[/netease/get-lazy-uids](./4-SDK/9-运营指令.html)，查询最近请求登录玩家的uid以及请求登录时间。<!--by xltang-->
4. 新增[OpenContainerId](../1-ModAPI/枚举值/OpenContainerId.html)，新增开放容器Id的枚举值。<!--by jishaobin-->
5. 新增[GetOpenContainerItem](../1-ModAPI/接口/方块/容器.html#GetOpenContainerItem)，获取开放容器的物品。<!--by jishaobin-->
6. 新增[CraftItemOutputChangeServerEvent](../1-ModAPI/事件/物品.html#craftitemoutputchangeserverevent)，拿出生成物品时抛出的事件。<!--by jishaobin-->
7. 新增[IsDisableCommandMinecart](../1-ModAPI/接口/世界/游戏规则.html#IsDisableCommandMinecart)，获取当前是否允许运行命令方块矿车内置逻辑指令。<!--by xltang-->
8. 新增[SetDisableCommandMinecart](../1-ModAPI/接口/世界/游戏规则.html#SetDisableCommandMinecart)，设置停止/开启运行命令方块矿车内置逻辑指令。<!--by xltang-->
9. 新增[GetUserAuthInfo](./4-SDK/10-启动器信息API.html#GetUserAuthInfo)，获取在线玩家实名制、是否绑定信息。<!--by yfg-->
10. 新增[CommandBlockContainerOpenEvent](../1-ModAPI/事件/方块.html#CommandBlockContainerOpenEvent)，触发时机：玩家点击命令方块，尝试打开命令方块的设置界面。引擎增加日志【player {} try open commandblock container】<!--by xltang-->
11. 新增[CommandBlockUpdateEvent](../1-ModAPI/事件/方块.html#CommandBlockUpdateEvent)，触发时机：玩家尝试修改命令方块的内置命令时。引擎增加日志【player {} try to update commandblock content command={}】<!--by xltang-->
12. 领地插件迭代，提供UI工程，支持基于服务器类型分别配置，具体参见领地插件readme中“1.0.13版本”更新说明<!--by xltang-->
13. 经济插件迭代，支持基于服务器类型分别配置摆摊区域的限制，具体参见经济插件readme中“2.0.10版本”更新说明<!--by xltang-->


## 2021.05.27 1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210527 |
| proxy   | 1.22.0.release20210527 |
| master  | 1.22.0.release20210527 |
| service | 1.22.0.release20210527 |

2. 使用apollo公共配置中配置,替换插件配置中的gameid和gamekey。<!--by yfg-->
3. 新增文档<a href="../../mcguide/27-网络游戏/课程2：Apollo基础知识/第7节：Mod和网络游戏Mod相互转换.html" rel="noopenner"> Mod和网络游戏Mod相互转换文档 </a>。<!--by yfg-->
4. 新增文档<a href="../../mcguide/27-网络游戏/课程7：开发技巧/第2节：多账号协同部署.html" rel="noopenner"> 多账号协同部署 </a>
5. 新增[GetServerIdByUid](./4-SDK/4-控制服API.html#GetServerIdByUid)，获取在线玩家所在的服务器的ID。<!--by xltang-->
6. 新增[NotifyToMaster](./4-SDK/8-服务器通信.html#NotifyToMaster)，用于service给master发消息。<!--by xltang-->
7. 新增[RegisterOpCommand(功能服)](./4-SDK/5-功能服API.html#RegisterOpCommand)，用于注册一个新的HTTP接口。<!--by xltang-->
8. 新增[UnRegisterOpCommand(功能服)](./4-SDK/5-功能服API.html#UnRegisterOpCommand)，用于注销一个已注册的HTTP接口。<!--by xltang-->
9. 新增[ResponseOpCommandSuccess(功能服)](./4-SDK/5-功能服API.html#ResponseOpCommandSuccess)，用于发送HTTP的成功Response。<!--by xltang-->
10. 新增[ResponseOpCommandFail(功能服)](./4-SDK/5-功能服API.html#ResponseOpCommandFail)，用于发送HTTP的失败Response。<!--by xltang-->
11. 新增[RegisterOpCommand(游戏服)](./4-SDK/6-大厅与游戏服API.html#RegisterOpCommand)，用于注册一个新的HTTP接口。<!--by xltang-->
12. 新增[UnRegisterOpCommand(游戏服)](./4-SDK/6-大厅与游戏服API.html#UnRegisterOpCommand)，用于注销一个已注册的HTTP接口。<!--by xltang-->
13. 新增[ResponseOpCommandSuccess(游戏服)](./4-SDK/6-大厅与游戏服API.html#ResponseOpCommandSuccess)，用于发送HTTP的成功Response。<!--by xltang-->
14. 新增[ResponseOpCommandFail(游戏服)](./4-SDK/6-大厅与游戏服API.html#ResponseOpCommandFail)，用于发送HTTP的失败Response。<!--by xltang-->
15. 新增[IsGameUnderMaintenance](./4-SDK/10-启动器信息API.html#IsGameUnderMaintenance)，获取游戏是否在维护中。<!--by yfg-->
16. 新增[GetServerIdsByGameType(控制服)](./4-SDK/4-控制服API.html#GetServerIdsByGameType)，获取指定类型的服务器id列表。<!--by xltang-->
17. 新增[GetGameTypeByServerId(控制服)](./4-SDK/4-控制服API.html#GetGameTypeByServerId)，获取指定ID服务器的类型。<!--by xltang-->
18. 新增[GetOnlineUidList](./4-SDK/4-控制服API.html#GetOnlineUidList)，获取所有在线玩家的uid列表。<!--by xltang-->
19. 新增[NotifyToServiceNode(控制服)](./4-SDK/8-服务器通信.html#NotifyToServiceNode)，master给某个service发消息。<!--by xltang-->
20. 新增[NotifyToServiceNode(功能服和游戏服)](./4-SDK/8-服务器通信.html#notifytoservicenode-2)，service/lobby/game给某个service发消息。<!--by xltang-->
21. 新增[BroadcastToService(控制服)](./4-SDK/8-服务器通信.html#BroadcastToService)，master给所有service广播消息。<!--by xltang-->
22. 新增[BroadcastToService(功能服和游戏服)](./4-SDK/8-服务器通信.html#broadcasttoservice-2)，service/lobby/game给所有service广播消息。<!--by xltang-->
23. 新增[UnicodeConvert](./4-SDK/7-公共API.html#UnicodeConvert)，递归转换输入数据中的所有unicode格式的字符串为utf-8格式。<!--by xltang-->
24. 新增[ConvertBsonToInt](./4-SDK/7-公共API.html#ConvertBsonToInt)，递归转换输入数据中的所有bson.int64.Int64类型的对象为int类型。<!--by xltang-->
25. 修改mongoPool的API说明：[AsyncExecute](./4-SDK/7-公共API.html#AsyncExecute)和[AsyncExecuteWithOrderKey](./4-SDK/7-公共API.html#AsyncExecuteWithOrderKey)。<!--by xltang-->
26. 公告插件消息支持下拉。<!--by xltang-->
27. master和service中ListenForEvent支持优先级。<!--by yfg-->



## 2021.05.13  1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210513 |
| proxy   | 1.22.0.release20210513 |
| master  | 1.22.0.release20210513 |
| service | 1.22.0.release20210513 |

2. 新增通用显示界面插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseTextBoard目录。<!--by jishaobin-->
3. 新增通用输入界面插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseInputBoard目录。<!--by jishaobin-->
4. 新增通用综合界面插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseMixedBoard目录。<!--by jishaobin-->
5. 队伍插件迭代，具体参见队伍插件readme中“1.0.8版本”更新说明
6. 商城插件迭代，修正一个会导致插件无法正常卸载的Traceback，具体参见商城插件readme中“1.0.3版本”更新说明
7. 官方mod插件文档完善执行mod.sql的说明
8. 新增[GetLoadedChunks](../1-ModAPI/接口/世界/地图.html#getloadedchunks)，获取指定维度当前已经加载完毕的全部区块的坐标列表<!--by xltang-->
9. 新增[GetChunkEntites](../1-ModAPI/接口/世界/地图.html#getloadedchunks)，获取指定位置的区块中，全部的实体和玩家的ID列表<!--by xltang-->
10. 新增[GetCommandPermissionLevel](../1-ModAPI/接口/世界/指令.html#getcommandpermissionlevel)，返回设定使用/op命令时OP的权限等级<!--by xltang-->
11. 新增[SetCommandPermissionLevel](../1-ModAPI/接口/世界/指令.html#setcommandpermissionlevel)，设置当玩家使用/op命令时OP的权限等级<!--by xltang-->
12. 新增[GetDefaultPlayerPermissionLevel](../1-ModAPI/接口/世界/指令.html#getdefaultplayerpermissionlevel)，返回新玩家加入时的权限身份<!--by xltang-->
13. 新增[SetDefaultPlayerPermissionLevel](../1-ModAPI/接口/世界/指令.html#setdefaultplayerpermissionlevel)，设置新玩家加入时的权限身份<!--by xltang-->
14. 修复内存泄露bug：创建组件时，若对应的entityId绑定的实体不存在，则可能内存泄露
15. “课程5：实用知识”中，新增“第6节：插件调试小技巧”和“第7节：UI界面表现提升小技巧”文档

## 2021.04.29  1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210429 |
| proxy   | 1.22.0.release20210429 |
| master  | 1.22.0.release20210429 |
| service | 1.22.0.release20210429 |

2. 新增[GetLastFrameTime](./4-SDK/6-大厅与游戏服API.html#GetLastFrameTime)，获取服务端脚本上一帧运行时间<!--by jishaobin-->
3. 调整[GetEngineActor](../1-ModAPI/接口/世界/实体管理.html#getengineactor)，返回结果中去掉当前已经确定要移除的实体<!--by xltang-->
4. 调整[SetCommand](../1-ModAPI/接口/世界/指令.html#setcommand)，当命令执行成功时返回True，否则返回False<!--by xltang-->
5. 调整[SetPlayerAllItems](../1-ModAPI/接口/玩家/背包.html#setplayerallitems)，修正itemDict传入空字典时无法清空盔甲、裤子、鞋子部位装备的问题<!--by xltang-->
6. 调整[ServerChatEvent](../1-ModAPI/事件/世界.html#serverchatevent)，新增字段，表示被禁言。另外，禁言后，玩家聊天后告知玩家被禁言了<!--by yfg -->
7. 调整[NotifyToServiceNode](./4-SDK/8-服务器通信.html#NotifyToServiceNode)，发送的事件信息中自动包含玩家uid<!--by yfg -->
8. 新增可import的第三方库：[numpy]<!--by jishaobin -->
9. 新增回合战斗插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseRound目录。<!--by xltang-->
10. 领地插件迭代，新增获取与指定区域有重叠的顶级领地的ID列表的API，具体参见领地插件readme中“1.0.12版本”更新说明<!--by xltang-->
11. 地图属性插件迭代，新增判断指定区域是否在地图边界之内的API，具体参见地图属性插件readme中“1.0.2版本”更新说明<!--by xltang-->
12. 主菜单插件迭代，UI重新整合，提供UI工程，具体参见主菜单插件readme中“1.0.4版本”更新说明。
13. 商城插件迭代，不再需要填写环境、gameId等配置，具体参见商城插件readme中“1.0.2版本”更新说明。<!--by xltang-->
14. Apollo开启基于位移检测的反作弊检查<!--by jishaobin -->

## 2021.04.20  1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210420 |
| proxy   | 1.22.0.release20210420 |
| master  | 1.22.0.release20210420 |
| service | 1.22.0.release20210420 |

2、apollo引擎适配debian10 系统

## 2021.04.15  1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210415 |
| proxy   | 1.22.0.release20210415 |
| master  | 1.22.0.release20210415 |
| service | 1.22.0.release20210415 |

2. 新增[HidePlayerFootprint](./4-SDK/6-大厅与游戏服API.html#HidePlayerFootprint)，隐藏某个玩家的会员脚印外观。<!--by yfg -->
3. 新增[HidePlayerMagicCircle](./4-SDK/6-大厅与游戏服API.html#HidePlayerMagicCircle)，隐藏某个玩家的会员法阵外观。<!--by yfg -->
4. 新增[GetUIDByNickname](./4-SDK/10-启动器信息API.html#GetUIDByNickname)，根据玩家昵称获取玩家uid。<!--by yfg -->
5. 新增[BanUser](./4-SDK/4-控制服API.html#BanUser)，封禁某个玩家。<!--by yfg -->
6. 新增[UnBanUser](./4-SDK/4-控制服API.html#UnBanUser)，解除某个玩家的封禁。<!--by yfg -->
7. 新增[SilentByUID](./4-SDK/4-控制服API.html#SilentByUID)，禁言某个玩家。<!--by yfg -->
8. 新增[UnSilentByUID](./4-SDK/4-控制服API.html#UnSilentByUID)，解除某个玩家的禁言。<!--by yfg -->
9. 权限插件迭代，支持游戏内通过聊天框输入部分运营指令，具体参见权限插件readme中“1.0.2版本”更新说明<!--by yfg -->
10. 部分插件迭代，使用稳定的API：SetLayer和SetVisible替换set_visible和set_layer，避免有时候出现UI错乱问题。本次批量修改涉及到的插件有：外观管理插件，累积消费活动插件，公告插件，战斗系统插件，宝石插件，称号插件，聊天插件，副本管理插件，飞行插件，反馈插件，好友插件，排行榜插件，领地插件，队伍插件，经济插件，面对面交易插件。<!--by xltang -->
11. 商城插件迭代，提高了订单发货速度，具体参见商城插件readme中“1.0.1版本”更新说明。<!--by xltang -->
12. PVP插件UI重新整合，具体参见PVP插件readme中“1.0.3版本”更新说明。<!--by jishaobin -->

## 2021.04.07  1.22更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.22.0.release20210408 |
| proxy   | 1.22.0.release20210408 |
| master  | 1.22.0.release20210408 |
| service | 1.22.0.release20210408 |

## 2021.04.01  1.21更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.21.0.release20210401 |
| proxy   | 1.21.0.release20210401 |
| master  | 1.21.0.release20210401 |
| service | 1.21.0.release20210401 |

2. 新增[GetApolloReviewStage](./4-SDK/7-公共API.html#GetApolloReviewStage)，获取游戏当前审核阶段。<!--by yfg -->
3. 新增[GetServerType](./4-SDK/5-功能服API.html#GetServerType)，获取服务器类型。<!--by yfg -->
4. 新增[GetServerIdsByServerType](./4-SDK/5-功能服API.html#GetServerIdsByServerType)，根据类型获取服务器id列表。<!--by yfg -->
5. 新增[GetOnlineNumByServerType](./4-SDK/4-控制服API.html#GetOnlineNumByServerType)，获取某类型服务器的在线人数。<!--by yfg -->
6. 新增[ApplyUserFriend](./4-SDK/10-启动器信息API.html#ApplyUserFriend)，申请添加为启动器中的好友。<!--by yfg -->
7. 新增[ShareApolloGame](./4-SDK/10-启动器信息API.html#ShareApolloGame)，在RN上拉起“网络游戏分享”的界面，界面包含游戏ICON以及描述。<!--by yfg -->
8. 新增[GetUserGuest](./4-SDK/10-启动器信息API.html#GetUserGuest)，获取启动器中玩家是否游客的信息。<!--by jishaobin -->
9. 新增[GetPeGameUserStars](./4-SDK/10-启动器信息API.html#GetPeGameUserStars)，获取玩家对本游戏的评分。<!--by jishaobin -->
10. 新增redis集群接口。
11. 新增随机传送插件。

## 2021.03.18  1.21更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.21.0.release20210318 |
| proxy   | 1.21.0.release20210318 |
| master  | 1.21.0.release20210318 |
| service | 1.21.0.release20210318 |

2. 新增[GetUserFriend](./4-SDK/10-启动器信息API.html#GetUserFriend)，获取启动器中玩家好友信息。<!--by yfg-->
3. 新增[GetUsersVIP](./4-SDK/10-启动器信息API.html#GetUsersVIP)，获取启动器中玩家会员信息。<!--by yfg-->
4. 升级公告插件，具体参见公告插件readme中“1.0.11版本”更新说明。
5. “Grafana服务器检测参数”文档中增加付费情况接入说明
6. 称号插件UI重新整合，具体参见称号插件readme中“1.0.3版本”更新说明
7. 外观管理插件UI重新整合，具体参见外观管理插件readme中“1.0.1版本”更新说明
8. 面对面交易插件UI重新整合，具体参见面对面交易插件readme中“1.0.1版本”更新说明

## 2021.03.04  1.21更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.21.0.release20210304 |
| proxy   | 1.21.0.release20210304 |
| master  | 1.21.0.release20210304 |
| service | 1.21.0.release20210304 |

2. 战斗插件UI重新整合，具体参见战斗插件readme中“1.0.11版本”更新说明
3. 经济插件UI重新整合，具体参见经济插件readme中“1.0.8版本”更新说明
4. 队伍插件UI重新整合，添加与聊天插件的互动功能，具体参见队伍插件readme中“1.0.6版本”更新说明
5. 公告插件UI重新整合，具体参见公告插件readme中“1.0.10版本”更新说明

## 2021.01.28  1.21更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.21.0.release20210128 |
| proxy   | 1.21.0.release20210128 |
| master  | 1.21.0.release20210128 |
| service | 1.21.0.release20210128 |

2. 新增[GetModJsonConfigByName](./4-SDK/7-公共API.html#GetModJsonConfigByName)，根据脚本根目录读取mod.json配置文件。<!--by xltang-->
3. 新增[NotifyToServiceNode](./4-SDK/8-服务器通信.html#NotifyToServiceNode)，客户端给service服务器发送事件。<!--by yfg-->
4. deploy.json中common层级下新增配置项`global_player_online_limit`，设置游戏的最大人数。该配置用于控制整个网络游戏的最大人数，避免在线人数过多超出承载能力，导致服务器响应变慢
5. 修复生存服地图膨胀问题
6. 领地插件Trace问题修复，具体参见领地插件readme中“1.0.10版本”更新说明
7. 好友插件补充代码注释并修复多个资源问题，具体参见好友插件readme中“1.0.7版本”更新说明
8. 宝石插件补充代码注释并修复多个资源问题，具体参见宝石插件readme中“1.0.5版本”更新说明

## 2021.01.21  1.21更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.21.0.release20210121 |
| proxy   | 1.21.0.release20210121 |
| master  | 1.21.0.release20210121 |
| service | 1.21.0.release20210121 |

## 2021.01.14  1.20更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.20.0.release20210114 |
| proxy   | 1.20.0.release20210114 |
| master  | 1.20.0.release20210114 |
| service | 1.20.0.release20210114 |

2. 公告插件新增收邮件回调，具体参见公告插件readme中“1.0.9版本”更新说明。
3. 好友插件新增同意、拒绝好友的回调，具体参见好友插件readme中“1.0.4版本”更新说明。
4. 新增反馈插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseFeedback目录。
5. 优化了任务、队伍、称号、排行榜、活动奖励、喇叭等插件的美术资源和注释

## 2020.12.31  1.20更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.20.0.release20201231 |
| proxy   | 1.20.0.release20201231 |
| master  | 1.20.0.release20201231 |
| service | 1.20.0.release20201231 |

2. 领地插件修复领地ID冲突问题，修复跨服传送问题，具体参见领地插件readme中“1.0.9版本”更新说明。
3. 新增累计消费活动插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseAddup、neteaseAddupMaster目录。
4. [AddServerPlayerEvent](../1-ModAPI/事件/世界.html#AddServerPlayerEvent)新增proxyId参数
5. 新增[RemoteNotifyToClient](./4-SDK/8-服务器通信.html#RemoteNotifyToClient)，service发送事件到指定客户端。<!--by yfg-->
6. 新增[SyncInsert](./4-SDK/7-公共API.html#SyncInsert)，阻塞性执行sql语句，插入数据<!--by gmy-->

## 2020.12.17  1.20更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.20.0.release20201217 |
| proxy   | 1.20.0.release20201217 |
| master  | 1.20.0.release20201217 |
| service | 1.20.0.release20201217 |
2. 新增API注册玩家收到邮件的回调函数（客户端）、某UID玩家是否有未读邮件（服务端），具体参见公告插件readme中“1.0.8版本”更新说明。
3. 新增报名匹配插件, 从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseMatch、neteaseMatchMaster、neteaseMatchService目录。
4. 新增[IsServiceConnected](./4-SDK/6-大厅与游戏服API.html#IsServiceConnected)，检查服务器是否与某个service建立连接。<!--by yfg-->
5. 新增[BroadcastToServerByType](./4-SDK/8-服务器通信.html#BroadcastToServerByType)，service给某种类型服务器广播消息<!--by yfg-->
6. 调整[ServiceConnectEvent](./4-SDK/1-大厅与游戏服事件.html#ServiceConnectEvent)，与service建立连接事件，带一个功能服类型参数<!--by yfg-->
7. 领地插件新增关闭领地特效光圈的接口，新增修改创建领地与添加新玩家为指定领地所有者的接口，支持玩家不在线时也可以创建领地，具体参见领地插件readme中“1.0.8版本”更新说明。
8. 调整了宝石插件的界面命名，具体参见宝石插件readme中“1.0.4版本”更新说明。
9. 新增外观管理插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseAppear目录。
## 2020.12.03  1.20更新内容
1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.20.0.release20201203 |
| proxy   | 1.20.0.release20201203 |
| master  | 1.20.0.release20201203 |
| service | 1.20.0.release20201203 |
2. 去除了lobby引擎，以后大厅服、游戏服统一使用game的引擎。
3. 经济插件新增查询摊位API，具体参见经济插件readme中“2.0.6版本”更新说明。
4. 聊天插件新增关闭聊天大窗口是响应事件，具体参见聊天插件readme中“1.0.1版本”更新说明。
5. 新增面对面交易插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseTransaction目录。
6. 新增[IsInApollo](../1-ModAPI/接口/通用/本地存储.md#IsInApollo)，返回当前游戏Mod是否运行在Apollo网络服，当前版本仅Apollo网络服可用。<!--by xltang-->
## 2020.11.23  1.20更新内容
1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.20.0.release20201123 |
| lobby   | 1.20.0.release20201123 |
| proxy   | 1.20.0.release20201123 |
| master  | 1.20.0.release20201123 |
| service | 1.20.0.release20201123 |
## 2020.11.19  1.19更新内容
1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.19.0.release20201119 |
| lobby   | 1.19.0.release20201119 |
| proxy   | 1.19.0.release20201119 |
| master  | 1.19.0.release20201119 |
| service | 1.19.0.release20201119 |
2. 升级了战斗插件，具体参见战斗信息插件readme中“1.0.10版本”更新说明。
3. 对公会、弹幕、领地、pvp插件美术资源进行了优化和代码进行了注释。

## 2020.11.05  1.19更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.19.0.release20201105 |
| lobby   | 1.19.0.release20201105 |
| proxy   | 1.19.0.release20201105 |
| master  | 1.19.0.release20201105 |
| service | 1.19.0.release20201105 |
2. 新增[SetPlayerRespawnPos](../1-ModAPI/接口/玩家/行为.md#SetPlayerRespawnPos)，设置玩家复活的位置，当前玩家的复活点仅支持主世界，当前版本仅Apollo网络服可用<!--by xltang-->
3. 新增云端信息插件在多个服务器中的使用功能，具体参见云端信息插件readme中“1.0.5版本”更新说明。
4. 升级了npc插件，具体参见npc信息插件readme中“1.0.4版本”更新说明。
5. 升级了副本插件，具体参见副本信息插件readme中“1.0.1版本”更新说明。
6. 升级了经济插件，具体参见经济插件readme中“2.0.5版本”更新说明。


## 2020.10.22  1.19更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.19.0.release20201022 |
| lobby   | 1.19.0.release20201022 |
| proxy   | 1.19.0.release20201022 |
| master  | 1.19.0.release20201022 |
| service | 1.19.0.release20201022

2. 新增[GetBedColor](../1-ModAPI/接口/方块/床.md#GetBedColor)，获取床（方块）的颜色，仅Apollo网络服可用<!--by xltang-->
3. 新增[GetSignBlockText](../1-ModAPI/接口/方块/告示牌.md#GetSignBlockText)，获取告示牌（方块）的文本内容，仅Apollo网络服可用<!--by xltang-->
4. 新增[SetBedColor](../1-ModAPI/接口/方块/床.md#SetBedColor)，设置床（方块）的颜色，仅Apollo网络服可用<!--by xltang-->
5. 新增[SetSignBlockText](../1-ModAPI/接口/方块/告示牌.md#SetSignBlockText)，设置告示牌（方块）的文本内容，仅Apollo网络服可用<!--by xltang-->
6. 新增[ChangeEntityDimension](../1-ModAPI/接口/实体/属性.md#ChangeEntityDimension)，传送实体，仅Apollo网络服可用<!--by xltang-->
7. 新增[ShutdownServer](./4-SDK/6-大厅与游戏服API.html#ShutdownServer)，强制关机<!--by yfg-->
8. 新增聊天插件, 从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseChat、neteaseChatService目录。
9. 好友插件升级，具体参见好友插件readme中“1.0.3版本”更新说明。
10. 领地插件升级，具体参见领地插件readme中“1.0.5版本”更新说明。
11. 公告插件、战斗系统插件、每日登录奖励插件、主菜单插件进行了界面优化，公告插件、战斗系统插件、每日登录奖励插件、主菜单插件、好友插件增加了注释。

## 2020.9.29  1.19更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.19.0.release20200929 |
| lobby   | 1.19.0.release20200929 |
| proxy   | 1.19.0.release20200929 |
| master  | 1.19.0.release20200929 |
| service | 1.19.0.release20200929 |

2. 战斗插件升级，具体参见战斗插件readme中“1.0.7版本”更新说明
3. 宝石插件升级，具体参见宝石插件readme中“1.0.1版本”更新说明
4. 新增物品面板插件, 从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载。
5. 优化[ChangePerformanceSwitch](./4-SDK/6-大厅与游戏服API.html#ChangePerformanceSwitch)，用于提升服务器性能<!--by yfg-->
6. 新增[EntityChangeDimensionServerEvent](../1-ModAPI/事件/实体.md#EntityChangeDimensionServerEvent)，实体维度改变时服务端触发<!--by txl-->

## 2020.9.17  1.19更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.19.0.release20200917 |
| lobby   | 1.19.0.release20200917 |
| proxy   | 1.19.0.release20200917 |
| master  | 1.19.0.release20200917 |
| service | 1.19.0.release20200917 |

2. 弹幕插件升级，新增少量UI交互，具体参见弹幕插件readme中“1.0.1版本”更新说明
3. 好友插件升级，具体参见好友插件readme中“1.0.3版本”更新说明
4. 经济插件升级，具体参见经济插件readme中“2.0.4版本”更新说明
5. 领地插件升级，新增领地转让接口，具体参见领地插件readme中“1.0.4版本”更新说明
6. 云端玩家信息插件升级，具体参见云端玩家信息插件readme中“1.0.4版本”更新说明
7. 新增飞行插件, 从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载。
8. 新增[PlayerLeftMessageServerEvent](../1-ModAPI/事件/世界.md#PlayerLeftMessageServerEvent)，玩家即将离开时准备显示“xxx离开游戏”时触发事件<!--by gmy-->
9. 新增[ChangePlayerFlyState](../1-ModAPI/接口/玩家/行为.md#ChangePlayerFlyState)，改变玩家的飞行状态<!--by ld-->
10. 新增[IsPlayerFlying](../1-ModAPI/接口/玩家/行为.md#IsPlayerFlying)，获取玩家是否在飞行<!--by ld-->
11. 新增[SetLoginStratege](./4-SDK/4-控制服API.html#SetLoginStratege)，支持设置玩家选服策略<!--by yfg-->

## 2020.9.3  1.18更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.18.0.release20200903|
| lobby   | 1.18.0.release20200903|
| proxy   | 1.18.0.release20200903 |
| master  | 1.18.0.release20200903 |
| service | 1.18.0.release20200903 |
2. [AsyncExecuteFunctionWithOrderKey](./4-SDK/7-公共API.html#AsyncExecuteFunctionWithOrderKey)支持mysql事务<!--by yfg-->
3. 领地插件升级，新建、修改领地时可以移动，旋转视角，具体参见领地插件readme中“1.0.3版本”更新说明
4. 权限插件升级，新增改变玩家op权限接口，具体参见权限插件readme中“1.0.1版本”更新说明

## 2020.8.20  1.18更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.18.0.release20200820|
| lobby   | 1.18.0.release20200820|
| proxy   | 1.18.0.release20200820 |
| master  | 1.18.0.release20200820 |
| service | 1.18.0.release20200820 |

2. 新增[ChangeDatabaseSlowLogLimit](./4-SDK/7-公共API.html#ChangeDatabaseSlowLogLimit)，修改数据库连接池慢请求报警日志限定时间<!--by xltang-->
3. 新增[CloseAsyncTaskSlowCheck](./4-SDK/7-公共API.html#CloseAsyncTaskSlowCheck)，停止每帧检查异步线程池中的任务<!--by xltang-->
4. 新增[DumpAsyncTaskPool](./4-SDK/7-公共API.html#DumpAsyncTaskPool)，打印当前异步线程池中的正在排队和执行中的任务信息<!--by xltang-->
5. 新增[OpenAsyncTaskSlowCheck](./4-SDK/7-公共API.html#OpenAsyncTaskSlowCheck)，启动每帧检查异步线程池中的任务，并且打印执行时间超过指定时间且尚未完成的任务<!--by xltang-->
6. 新增[StartDatabaseProfile](./4-SDK/7-公共API.html#StartDatabaseProfile)，开始记录数据库连接池请求信息统计<!--by xltang-->
7. 新增[StopDatabaseMysqlProfile](./4-SDK/7-公共API.html#StopDatabaseMysqlProfile)，停止记录数据库连接池请求信息并输出统计结果<!--by xltang-->
8. 新增弹幕插件, 从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseDanmu目录。
9. 调整了客户端无法登陆时的提示。
10. 修复了一些的bug。

## 2020.8.13  1.18更新内容

1. 领地插件升级，新增可视化操作UI，具体参见领地插件readme中“1.0.2版本”更新说明。

## 2020.8.6  1.18更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.18.0.release20200806|
| lobby   | 1.18.0.release20200806|
| proxy   | 1.18.0.release20200806 |
| master  | 1.18.0.release20200806 |
| service | 1.18.0.release20200806 |

2. 新增[StartRecordEvent](./4-SDK/5-功能服API.html#StartRecordEvent)，开始启动大厅服/游戏服与功能服之间的脚本事件收发包统计<!--by xltang-->
3. 新增[StopRecordEvent](./4-SDK/5-功能服API.html#StopRecordEvent)，停止大厅服/游戏服与功能服之间的脚本事件收发包统计并输出结果<!--by xltang-->
4. 新增[StartYappiProfile](./4-SDK/7-公共API.html#StartYappiProfile)，开始启动服务端脚本性能分析<!--by xltang-->
5. 新增[StopYappiProfile](./4-SDK/7-公共API.html#StopYappiProfile)，停止服务端脚本性能分析并生成火焰图<!--by xltang-->
6. 新增[StartRecordEvent](../1-ModAPI/接口/通用/调试.md#StartRecordEvent)，开始启动服务端与客户端之间的脚本事件收发包统计，当前仅Apollo网络服可用<!--by xltang-->
7. 新增[StopRecordEvent](../1-ModAPI/接口/通用/调试.md#StopRecordEvent)
，停止服务端与客户端之间的脚本事件收发包统计并输出结果，当前仅Apollo网络服可用<!--by xltang-->
8. 新增[StartRecordPacket](../1-ModAPI/接口/通用/调试.md#StartRecordPacket)，开始启动服务端与客户端之间的引擎收发包统计，当前仅Apollo网络服可用<!--by xltang-->
9. 新增[StopRecordPacket](../1-ModAPI/接口/通用/调试.md#StopRecordPacket)，停止服务端与客户端之间的引擎收发包统计并输出结果，当前仅Apollo网络服可用<!--by xltang-->
10. 新增[WillAddEffectServerEvent](../1-ModAPI/事件/实体.md#WillAddEffectServerEvent)，实体即将获得状态效果<!--by xltang-->
11. 新增[SetEntityItem](../1-ModAPI/接口/实体/背包.md#SetEntityItem)，支持设置生物身上的物品，当前仅Apollo网络服可用<!--by lidi-->
12. 新增[GetEntityItem](../1-ModAPI/接口/实体/背包.md#GetEntityItem)，支持获取生物身上的物品，当前仅Apollo网络服可用<!--by lidi-->
13. 调整[GetEquItemDurability](../1-ModAPI/接口/实体/背包.md#GetEquItemDurability)，新增支持获取生物装备槽位中盔甲的耐久值，当前仅Apollo网络服可用<!--by lidi-->
14. 任务插件优化升级，支持关卡编辑器中任务组件的更多物品。
15. 新增PVP插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteasePeace目录。

## 2020.7.23  1.18更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.18.0.release20200723|
| lobby   | 1.18.0.release20200723|
| proxy   | 1.18.0.release20200723 |
| master  | 1.18.0.release20200723 |
| service | 1.18.0.release20200723 |

2. 新增[ChangeLevelUpCostServerEvent](../1-ModAPI/事件/玩家.md#ChangeLevelUpCostServerEvent)，获取玩家下一个等级升级经验事件，用于重载玩家的升级经验，每个等级在重置之前都只会触发一次，当前版本仅Apollo网络服可用<!--by xltang-->
3. 新增[HopperTryPullInServerEvent](../1-ModAPI/事件/方块.md#HopperTryPullInServerEvent)，漏斗放在容器下方，尝试和容器交互物品时触发<!--by guanmingyu-->
4. 新增[HopperTryPullOutServerEvent](../1-ModAPI/事件/方块.md#HopperTryPullOutServerEvent)，漏斗放在容器旁边，尝试往容器加物品时触发<!--by guanmingyu-->
5. 新增[CreateExperienceOrb](../1-ModAPI/接口/世界/实体管理.md#CreateExperienceOrb)，创建专属经验球<!--by guanmingyu-->
6. 新增[SetOrbExperience](../1-ModAPI/接口/实体/经验球.md#SetOrbExperience)，修改经验球经验<!--by guanmingyu-->
7. 新增[UpgradeMapDimensionVersion](../1-ModAPI/接口/世界/地图.md#UpgradeMapDimensionVersion)，提升指定地图维度的版本号，版本号不符的维度，地图存档信息将被废弃，当前版本仅Apollo网络服可用<!--by xltang-->
8. 新增[GetDroppedItem](../1-ModAPI/接口/世界/实体管理.md#GetDroppedItem)，新增获取掉落在世界的指定entityid的物品信息<!--by why117-->
9. 新增[GetPlayerAllItems](../1-ModAPI/接口/玩家/背包.md#GetPlayerAllItems)，获取制定槽位的批量物品信息，当前版本仅Apollo网络服可用<!--by why117-->
10. 新增[SetPlayerAllItems](../1-ModAPI/接口/玩家/背包.md#SetPlayerAllItems)，设置玩家制定槽位物品信息，当前版本仅Apollo网络服可用<!--by xltang-->
11. 新增[ClearDefinedLevelUpCost](../1-ModAPI/事件/玩家.md#ClearDefinedLevelUpCost)，清理自定义的升级经验，清理后才有会再次回调ChangeLevelUpCostServerEvent事件并再次设置新的升级经验值。当前版本仅Apollo网络服可用<!--by xltang-->
12. 调整[OnCarriedNewItemChangedServerEvent](../1-ModAPI/事件/物品.md#OnCarriedNewItemChangedServerEvent)，新增关键字oldItemDict、newItemDict，当前版本仅Apollo网络服可用<!--by xltang-->
13. 调整[OnNewArmorExchangeServerEvent](../1-ModAPI/事件/物品.md#OnNewArmorExchangeServerEvent)，新增关键字oldArmorDict、newArmorDict，当前版本仅Apollo网络服可用<!--by xltang-->
14. 调整[OnOffhandItemChangedServerEvent](../1-ModAPI/事件/物品.md#OnOffhandItemChangedServerEvent)，新增关键字oldItemDict、newItemDict，当前版本仅Apollo网络服可用<!--by xltang-->
15. 调整SetHurtByEntity(接口已废弃)，新增参数knocked，可设置是否产生击退<!--by xltang-->
16. 新增称号插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseLabel、neteaseLabelMaster目录。
17. 新增排行榜插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseRank、neteaseRankMaster、neteaseRankService目录。
18. 箱子插件优化升级，具体参见箱子插件readme中“1.05版本”更新说明。
19. 战斗系统插件优化升级，具体参见战斗系统插件readme中“1.0.5版本”更新说明。

## 2020.7.17  1.18更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.18.0.release20200717|
| lobby   | 1.18.0.release20200717|
| proxy   | 1.18.0.release20200717 |
| master  | 1.18.0.release20200717 |
| service | 1.18.0.release20200717 |

2. 修正引擎自定义模块【http】与python常用库模块【http】重名导致的import错误问题

## 2020.7.9  1.18更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.18.0.release20200709|
| lobby   | 1.18.0.release20200709|
| proxy   | 1.18.0.release20200709 |
| master  | 1.18.0.release20200709 |
| service | 1.18.0.release20200709 |

2. 1.18引擎的首个release版本

## 2020.7.9  1.17更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200709|
| lobby   | 1.17.0.release20200709|
| proxy   | 1.17.0.release20200709 |
| master  | 1.17.0.release20200709 |
| service | 1.17.0.release20200709 |

2. 控制服，功能服新增接口【commonNetgameApi.AddTimer】、【commonNetgameApi.AddRepeatedTimer】、【commonNetgameApi.CancelTimer】，支持触发定时器
3. 新增喇叭插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseShout、neteaseShoutMaster、neteaseShoutService目录。
4. 公会插件新增接口，具体参见公会插件readme中“1.0.2版本”更新说明。
5. 好友插件新增接口，具体参见好友插件readme中“1.0.1版本”更新说明。
6. 战斗系统插件新增接口，具体参见战斗系统插件readme中“1.0.4版本”更新说明。
7. 经济插件优化升级，具体参见经济插件readme中“2.0.2版本”更新说明。
8. 新增宝石插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseJewel目录。
9. 已发布插件界面适配优化，包括：活动奖励插件、每日登录奖励插件、经济插件界面优化、 队伍插件
10. 大厅服、游戏服新增接口【lobbyGame.netgameApi.GetUidIsSilent】，根据玩家uid获取该玩家是否被禁言
11. 新增弹窗提示插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseAlert目录。

## 2020.6.24  1.17更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200624 |
| lobby   | 1.17.0.release20200624 |
| proxy   | 1.17.0.release20200624 |
| master  | 1.17.0.release20200624 |
| service | 1.17.0.release20200624 |

2. 已发布插件界面适配优化，包括：公告插件、战斗系统插件、任务插件、公会插件、私有箱子插件、NPC插件
3. 新增服务端事件【ChangeSwimStateServerEvent】，实体开始或者结束游泳时触发
4. 新增服务端接口【IsSwiming】，获取玩家是否处于游泳状态。
5. 新增服务端接口【SetCanBlockSetOnFireByLightning】，禁止/允许闪电点燃方块
6. 新增服务端接口【SetCanActorSetOnFireByLightning】，禁止/允许闪电点燃实体
7. 公告插件支持登录弹窗一次登录只显示1次
8. 新增维度地图修改插件，可以根据针对地图编辑器导出的地图文件替换游戏地图
9. 领地插件大规模升级，具体参见领地插件readme中“1.0.1版本”更新说明。

## 2020.6.11  1.17更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200611 |
| lobby   | 1.17.0.release20200611 |
| proxy   | 1.17.0.release20200611 |
| master  | 1.17.0.release20200611 |
| service | 1.17.0.release20200611 |

2. 数据统计相关功能和文档完善。运营数据统计插件的readme.txt中，仔细说明支持的所有运营数据类型；介绍插件和grafana influxDB的关系
3. 新增服务端接口【CleanBlockTileEntityCustomData】，清空指定位置的特殊方块（箱子、头颅、熔炉、花盆等）绑定的TileEntity内存储的自定义数据。
4. 新增服务端接口【GetBlockTileEntityCustomData】，读取指定位置的特殊方块（箱子、头颅、熔炉、花盆等）绑定的TileEntity内存储的自定义数据。
5. 新增服务端接口【GetBlockTileEntityWholeCustomData】，读取指定位置的特殊方块（箱子、头颅、熔炉、花盆等）绑定的TileEntity内存储的自定义数据字典。
6. 新增服务端接口【SetBlockTileEntityCustomData】，设置指定位置的特殊方块（箱子、头颅、熔炉、花盆等）绑定的TileEntity内存储的自定义数据。
7. 私有箱子插件优化，增加持久存储箱子数据功能，修复上个版本遍历获取箱子数据的弊端
8. 好友插件优化，优化平台好友同步机制
9. 修正AsyncQueryWithOrderKey导致mysql死锁的问题
10. 新增服务端接口【GetChestPairedPosition】，获取与箱子A合并成一个大箱子的箱子B的坐标

## 2020.6.04  1.17更新内容
1. 新增好友插件，支持好友信息管理。
2. 修复了服务端事件【StoreBuySuccServerEvent】不能正常触发的问题。

## 2020.5.28  1.17更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200528 |
| lobby   | 1.17.0.release20200528 |
| proxy   | 1.17.0.release20200528 |
| master  | 1.17.0.release20200528 |
| service | 1.17.0.release20200528 |

2. 新增服务端事件【StoreBuySuccServerEvent】, 当玩家在游戏内购买成功时触发。
3. 服务端新增接口【GetWholeExtraData】, 获取完整的实体数据/全局数据字典，数据存放到leveldb。
4. 服务端新增接口【CleanExtraData】，清理指定key的实体数据/全局数据，数据存放到leveldb。
5. 服务端mysql连接池新增【AsyncExecuteFunctionWithOrderKey】接口
6. 升级了云端信息插件，支持同步玩家的额外数据。
7. 升级了经济插件，支持摆摊功能

## 2020.5.14  1.17更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200514 |
| lobby   | 1.17.0.release20200514 |
| proxy   | 1.17.0.release20200514 |
| master  | 1.17.0.release20200514 |
| service | 1.17.0.release20200514 |

2. 服务端接口【GetPlayerItem】，支持融合获取和设置装备耐久度，支持获取装备位附魔信息
3. 服务端新增接口【SpawnItemToArmor】，支持设置玩家装备
4. 服务端新增接口【ClearPlayerOffHand】，支持清除玩家左手物品
5. 升级了云端玩家信息插件，支持记录和设置装备附魔，可从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseCloud目录。
6. 升级了战斗系统插件，战斗系统插件新增获取物品属性接口，可从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseBattle目录。

## 2020.4.30  1.17更新内容


1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200430 |
| lobby   | 1.17.0.release20200430 |
| proxy   | 1.17.0.release20200430 |
| master  | 1.17.0.release20200430 |
| service | 1.17.0.release20200430 |

2. 服务端新增【ChestBlockTryPairWithServerEvent】事件，当两个小箱子准备合成一个大箱子时触发
3. 服务端新增【OpenCityProtect】接口，用于开启城市保护
4. 服务端新增【ForbidLiquidFlow】接口，用于禁止/允许地图中的流体流动
5. 服务端新增【LookupItemByName】接口，用于判定指定identifier的物品是否存在
6. 服务端新增【IsSneaking】接口，用于判定当前玩家是否处于潜行状态
7. 服务端新增【ChangeSelectSlot】接口，用于设置玩家当前选中快捷栏物品的index
8. 队伍插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseSquad目录。
9. 任务插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseQuest目录。
10. 地图属性插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseMapAttrs目录。
11. 私有箱子插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseChest目录。
12. 云端玩家信息插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseCloud目录。

## 2020.4.24  1.17更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.17.0.release20200424 |
| lobby   | 1.17.0.release20200424 |
| proxy   | 1.17.0.release20200424 |
| master  | 1.17.0.release20200424 |
| service | 1.17.0.release20200424 |

2. 1.17引擎的首个release版本

## 2020.4.16  1.16更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.16.0.release20200416 |
| lobby   | 1.16.0.release20200416 |
| proxy   | 1.16.0.release20200416 |
| master  | 1.16.0.release20200416 |
| service | 1.16.0.release20200416 |

2. 运营数据统计插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseStatistics和neteaseStatisticsService目录。

3. 去除Apollo中提供的默认运营统计功能，提供功能更完整的运营数据统计插件。网络服中需添加【运营数据统计插件】才能查看运营统计数据。

## 2020.4.2  1.16更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.16.0.release20200402 |
| lobby   | 1.16.0.release20200402 |
| proxy   | 1.16.0.release20200402 |
| master  | 1.16.0.release20200402 |
| service | 1.16.0.release20200402 |

2. 主菜单插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseMenus目录。
3. 【PistonActionServerEvent】事件新增entityList参数，该参数表示活塞运动影响到产生被移动或被破坏效果的实体的ID列表。当前仅支持网络服使用。
4. 商城插件提供查询是否购买过某个商品的接口。商城插件从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseShop、neteaseShopMaster目录。
5. 修复 SetCommand 接口没有返回值的bug。
6. 修复经济插件商店按钮响应错误。经济插件从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseTrade、neteaseTradeMaster、neteaseTradeService目录。
## 2020.3.19  1.16更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.16.0.release20200319 |
| lobby   | 1.16.0.release20200319 |
| proxy   | 1.16.0.release20200319 |
| master  | 1.16.0.release20200319 |
| service | 1.16.0.release20200319 |

2. 新增领地插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseResidence、neteaseResidenceMaster目录。

3. 新增每日登录奖励插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseDaily、neteaseDailyMaster、neteaseDailyService目录。

4. 新增活动奖励插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseChill、neteaseChillMaster、neteaseChillService目录。

5. 新增经济插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseTrade、neteaseTradeMaster、neteaseTradeService目录。

6. 新增【StepOnBlockServerEvent】事件，生物脚踩压力板、踩红石矿、踩拌线钩事件。当前仅支持网络服使用。

7. 新增【MobGriefingBlockServerEvent】事件，生物与方块交互事件。当前仅支持网络服使用。

8. 新增【PlayerInteractServerEvent】事件，玩家和实体交互事件。当前仅支持网络服使用。

9. 新增【StartRidingServerEvent】事件，骑乘事件。当前仅支持网络服使用。

10. 新增【WillTeleportToServerEvent】事件，实体即将传送事件。当前仅支持网络服使用。

11. 新增【PistonActionServerEvent】事件，活塞影响方块的事件。当前仅支持网络服使用。

12. 【ride】组件新增函数IsEntityRiding、GetEntityRider、StopEntityRiding，可以修改实体的骑乘状态。当前仅支持网络服使用。

13. 【lobbyGame.netgameApi】新增SetForbidFlowField、DelForbidFlowField，可以限制流体流动。

14. 【lobbyGame.netgameApi】新增SetForbidDragonEggTeleportField、DelForbidDragonEggTeleportField，可以限制龙蛋传送。



## 2020.2.20  1.16更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.16.0.release20200220 |
| lobby   | 1.16.0.release20200220 |
| proxy   | 1.16.0.release20200220 |
| master  | 1.16.0.release20200220 |
| service | 1.16.0.release20200220 |

2. 新增组件【bulletAttributes】，可以通过函数GetSourceEntityId获取飞射物的发射者。

3. 【item】组件新增函数ChangePlayerItemTipsAndExtraId，可以修改物品的tips。

4. mysqlPool新增SyncFetchAll函数，阻塞性执行sql语句 查询全部数据 。

5. 新增公会插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载的neteaseGuildMaster. neteaseGuildService. neteaseGuildLobby. neteaseGuildGame目录。

6. 新增战斗系统插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载neteaseBattle目录。

7. 事件【ServerChatEvent】优化，可以指定给某些玩家发聊天消息。

8. CommonNetgameApi新增GetOnlineKey函数，返回redis中存储指定玩家在线状态信息的key。

9. CommonNetgameApi新增GetWeekOnlineKey函数，返回redis中存储指定玩家每周在线时间的key。



## 2020.1.15  1.16更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.16.0.release20200116 |
| lobby   | 1.16.0.release20200116 |
| proxy   | 1.16.0.release20200116 |
| master  | 1.16.0.release20200116 |
| service | 1.16.0.release20200116 |

2. 新增CheckChunkState接口：检查chunk是否已经加载

3. 新增CreateDimension接口：创建dimension

4. 外放GetSystem接口：获取已注册的system

5. DelServerPlayerEvent和AddServerPlayerEvent事件新增uid参数

6. Apollo event和api中uid参数统一使用int类型

7. event和gm指令传入参数统一使用驼峰格式，且兼容以前event和gm指令

8. 新增GetPlayerIdByUid接口：根据玩家uid获取玩家ID（也即playerId）

9. 新增SendMsgToPlayer接口：给某个玩家发送聊天消息

10. 新增OnCarriedNewItemChangedServerEvent事件：右手物品切换的服务端事件

11. 新增OnOffhandItemChangedServerEvent事件：左手物品切换服务端事件

12. 新增npc插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载的neteaseNpc目录。



## 2019.12.26  1.15更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.15.0.release20191226 |
| lobby   | 1.15.0.release20191226 |
| proxy   | 1.15.0.release20191226 |
| master  | 1.15.0.release20191226 |
| service | 1.15.0.release20191226 |

2. 新增CheckNameValid. CheckWordsValid接口：实现服务端敏感词检查功能

3. 运营数据支持用mysql存储

4. 添加PlayerJoinMessageEvent事件：准备显示“xxx加入游戏”的玩家登录提示文字时服务端抛出的事件。

5. 新增CheckChunkState接口：判断指定位置的chunk是否加载完成

6. mysqlpool连接池新增AsyncInsertOneWithOrderKey接口：向主键为AUTO INCREASEl类型的表格中插入一条记录，并且返回新建记录的主键。

7. 丰富DelServerPlayerEvent事件：可以判断玩家登出还是切服。

8. 丰富AddServerPlayerEvent事件：可以判断玩家登录还是切服。

9. Apollo接口规范化，兼容以前的api。

10. 新增GetModScriptRootDir接口：获取mod的当前目录

11. 连接池和线程池优化：

12. 连接池和线程池优化：屏蔽对外的Tick()接口，由引擎负责Tick；InitDB()接口取代Init()接口。优化后还兼容以前的接口。

13. 新增RegisterRpcMethodForMod接口：用于监听lobby/game发过来请求

14. 丰富TransferToOtherServer和TransferToOtherServerById接口：支持转服时带参数。

15. 新增运营指令 /profile：实现初级性能分析功能

16. 新增GetOnlineServerInfoOfPlayer和GetOnlineServerInfoOfMultiPlayers接口：获取玩家在线状态及所在服务器serverid

17. 新增ToPcUid和ToPeUid接口：提供PC uid与PE uid互相转换功能

18. 新增GetServerType接口：获取当前服务器的type

19. 新增GetServerId接口：获取service的服务器id

20. 新增公告插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载的neteaseAnnounce.

neteaseAnnounceMaster. neteaseAnnounceService目录。

21. 新增权限插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载的neteaseAuth.

neteaseAuthMaster目录。

22. 新增商场插件，从MC Studio的C++网络服的“网络服Mod”分页中的“公共Mod”处下载的neteaseShop.

neteaseShopMaster目录。





## 2019.11.28  1.15更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.15.0.release20191128 |
| lobby   | 1.15.0.release20191128 |
| proxy   | 1.15.0.release20191128 |
| master  | 1.15.0.release20191128 |
| service | 1.15.0.release20191128 |

2. 多版本引擎支持。

3. 在线人数为负bug修复。

4. 皮肤验证功能。

5. 登录事件可以区分登录还是切服；登出事件可以区分登出还是切服。



## 2019.10.31  1.15更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.15.0.release20191031 |
| lobby   | 1.15.0.release20191031 |
| proxy   | 1.15.0.release20191031 |
| master  | 1.15.0.release20191031 |
| service | 1.15.0.release20191031 |

2. master和service间实现rpc通信。

3. 后台数据统计使用新数据库池。

4. 邮件Mod service端功能

5. 公共配置压缩优化

6. game/lobby 打印错误时出现trace问题修复



## 2019.9.27  1.15更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.15.0.release20190927 |
| lobby   | 1.15.0.release20190927 |
| proxy   | 1.15.0.release20190927 |
| master  | 1.14.release20190926   |
| service | 1.14.release20190926   |



## 2019.9.26  1.14更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion             |
| ------- | ---------------------- |
| game    | 1.14.release20190926   |
| lobby   | 1.14.release20190926   |
| proxy   | 1.14.0.release20190829 |
| master  | 1.14.release20190926   |
| service | 1.14.release20190926   |

2. 扩展mysql. redis. mongo连接池

3. lobby/game 脚本加载server.properties trace问题修复。



## 2019.9.12  1.14更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion           |
| ------- | -------------------- |
| game    | 1.14.release20190912 |
| lobby   | 1.14.release20190912 |
| proxy   | 1.14.release20190829 |
| master  | 1.14.release20190912 |
| service | 1.14.release20190829 |

2. 部分错误日志降级为INFO日志。

3. lobby新增功能开关，可以屏蔽红石相关逻辑。

4. lobby新增功能开关，可以屏蔽chunk存档相关逻辑。

5. 支持基础产品运营数据的记录和显示

6. lobby新增功能开关，可以屏蔽“xxx加入游戏”文字提示。

7. 登录切服核心步骤的关键日志完善

8. 玩家当前位置异常导致lobby dump问题修复。





## 2019.8.2  1.14更新内容

1. 引擎app_verion（deploy.json中需要配置引擎app_verion）分别是：

|         | app_verion           |
| ------- | -------------------- |
| game    | 1.14.release20190802 |
| lobby   | 1.14.release20190802 |
| proxy   | 1.14.release20190718 |
| master  | 1.14.release20190802 |
| service | 1.14.release20190718 |

2. 修复NPC消失问题

3. lobby性能优化

4. 线程池优化

5. 修复master心跳频率bug

6. mod patch优化，且默认关闭mod patch下载功能

7. 开服工具支持ipv6

8. 允许设置developer mods加载顺序。

