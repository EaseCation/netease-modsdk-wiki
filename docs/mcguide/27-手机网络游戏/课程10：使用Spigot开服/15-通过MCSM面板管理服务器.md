---
front:
hard: 入门
time: 60分钟
---

# 通过MCSM面板管理服务器

![封面](./res/mcsmguide/10.png)

## 准备阶段

1. PE/PC网络服入驻通过，并且拿到网易开发机/正式机。
2. 自备服务器（非网易机器），最低要求1c1g，建议安装宝塔
3. 下载所需要的文件（相关文件已上传内容库）
4. 完成上一章节《部署服务器》
5. MCSM面板中文指南：<https://docs.mcsmanager.com/zh_cn/>

## 特别提示

本教程不会在网易机器部署web面板及自建服务。

本教程将默认开发者已经熟悉MCSM面板，基础内容不再介绍。

开始前请熟知并遵守《高危操作警告说明》：

* 网易机器禁止私自开放附录名单内端口对外

* 网易机器禁止私自把无任何认证校验服务直接对外

* 网易机器禁止私自把机器交付时开放的业务端口用于其他用途，如数据库或自建服务等

![《高危操作警告说明》文档](./res/mcsmguide/20.png)

## 原理说明

在网易机器部署mcsm daemon守护进程，通过自备机器协议转发SSH隧道与网易机器通信，从而达到使用mcsm面板管理网易机器。

![原理图](./res/mcsmguide/30.png)

## 操作步骤

### （一）在网易机器

#### 1. 无root安装node.js

**强制要求安装node16+的版本，不然守护进程跑不起来**

```bash
# 下载nodejs
cd ~/downloads
wget https://nodejs.org/dist/v16.20.2/node-v16.20.2-linux-x64.tar.xz

# 创建工作目录并解压
mkdir -p ~/apps/node-v16.20.2
tar -xJf node-v16.20.2-linux-x64.tar.xz --no-wildcards-match-slash --anchored --exclude */CHANGELOG.md --exclude */LICENSE --exclude */README.md  --strip 1 -C ~/apps/node-v16.20.2

# 添加path变量
export PATH=~/apps/node-v16.20.2/bin:$PATH
source ~/.bashrc

# 检查nodejs版本
node -v
npm -v

# 至此安装完成
```

#### 2. 守护进程mcsm  daemon上传部署

从github下载压缩包（内容库也已上传）

<https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_daemon_only_release.tar.gz>

```bash
# 创建mcsm daemon工作目录
cd ~
mkdir -p ~/mcsm

# 上传到这个目录（Xftp, FinalShell均可）

# 解压
cd ~/mcsm
tar -zxvf mcsmanager_linux_daemon_only_release.tar.gz
cd ~/mcsm/mcsmanager

# 设置 npm 镜像源为国内淘宝源
npm config set registry https://registry.npmmirror.com
npm config get registry

# 新增screen
screen -S mcsm

# 安装依赖后部署
sh start-daemon.sh
```

#### 3. 检查24444端口和秘钥

执行上一步骤后，服务将会启动成功，请使用**ctrl+a、d**来后台运行screen

启动成功后，你会看到类似 \[INFO] Key: xxxxxxx 和 Port: 24444 的信息。

（记录key秘钥，后续将用于自备机器节点配置。）

```bash
# 检查端口是否正常
netstat -tulnp | grep 24444
```

### （二）在自备机器

#### 1. 自动安装mcsm+开启守护进程

```bash
# 请确保root登录，有sudo权限
sudo su -c "wget -qO- https://script.mcsmanager.com/setup_cn.sh | bash"

# 先启动面板守护进程。
# 这是用于进程控制，终端管理的服务进程。
systemctl start mcsm-daemon.service
# 再启动面板 Web 服务。
# 这是用来实现支持网页访问和用户管理的服务。
systemctl start mcsm-web.service

# 以下命令已列出（如有需要请自取）
# 重启面板命令
systemctl restart mcsm-daemon.service
systemctl restart mcsm-web.service

# 停止面板命令
systemctl stop mcsm-web.service
systemctl stop mcsm-daemon.service
```

如果 systemctl 命令无法启动面板，可以参考手动安装（<https://docs.mcsmanager.com/zh_cn/>） 中的 启动方式 来启动 MCSManager。 但这需要你用其他后台运行程序来接管它，否则当你的 SSH 终端断开之时，手动启动的 MCSManager 面板也会随之被系统强制结束。

面板 Web 服务是提供用户管理与网页访问功能的服务，守护进程是提供进程管理和容器管理的服务，两者缺一不可。如果某个功能不正常，可以只重启这一部分的服务来热修复问题。

#### 2. 配置协议转发（autossh）

下面将以宝塔面板进行操作：

① 进入/root/.ssh/目录上传网易机器秘钥

② 配置秘钥密码和隧道转发

```bash
# 设置秘钥权限（请自行替换）
chmod 600 /root/.ssh/netease.key

# 启动 ssh-agent
eval `ssh-agent -s`

# 添加密钥并输入一次密码（请自行替换）
ssh-add /root/.ssh/netease.key

# 如无autossh，请自行安装
apt-get update
apt-get install autossh -y

# 执行隧道命令（请自行替换）
# 将ssh隧道连接的网易机器24444端口转发到自备机器的24445端口
# 注意 -L 后面的 0.0.0.0:24445
autossh -M 0 -o "ServerAliveInterval 30" -o "ServerAliveCountMax 3" -p 32200 -i /root/.ssh/netease.key -CNf -L 0.0.0.0:24445:127.0.0.1:24444 fuzhu@<网易机器IP>

# 验证是否成功
netstat -tunlp | grep 24445

# 如果你看到类似下面的输出：
# tcp 0 0 127.0.0.1:24445 0.0.0.0:* LISTEN 1234/ssh
# 那么就成功了

# 至此隧道转发结束
```

③ 防火墙和安全组开放端口（仅在自备机器，网易机器禁止开放端口）

| mcsm面板web端口（建议nginx转发改端口，安全一些） | 23333 |
| ------------------------------ | ----- |
| **ssh协议转发端口（设置端口白名单，否则有安全问题）** | 24445 |

#### 3. 配置mcsm节点

![节点位置](./res/mcsmguide/40.png)

![节点配置](./res/mcsmguide/50.png)

这里的“远程节点秘钥”请替换为网易机器守护进程输出的key秘钥。

添加后，显示节点状态为正常，网页直连为正常，可以读取内存和处理器使用率后节点配置成功。

#### 4. 检查实例创建和文件管理是否正常

如需迁移网易机器的screen至mcsm，请使用“直接创建”，配置服务端目录、实例类型和启动命令后，即可迁移成功。

![创建实例](./res/mcsmguide/60.png)
![文件管理](./res/mcsmguide/70.png)

#### 5. 常见的问题

① 无法连接到远程节点

检查自备机器端口/安全组是否开放，是否需要配置nginx反向代理。

最简单的方法就是直接复制地址，浏览器访问，看是否有显示daemon状态。

![无法连接到远程节点](./res/mcsmguide/80.png)
![守护进程状态](./res/mcsmguide/90.png)

② 多网易机器部署

按照此方法，在不同机器上配置mcsm daemon守护进程，配置多个SSH隧道协议转发，然后新增节点即可。

③ mcsm面板传输文件出现错误

显示network error

解决方法：升级daemon为最新版，不要使用3.x的版本

## 特别鸣谢


教程作者：初云

灵感和帮助：Soldier

全过程步骤指导：Gemini3 Pro

教程参考指南：MCSManager团队

MCSM常见问题解答：混合、封神、MuFeng、西瓜、星汉

调试与测试：千阙云庭服务器团队、初云杯服务器团队、风之谷服务器团队


如您在操作过程中有困难，欢迎您随时联系我们\~

感谢帮助过我们的人，期待网络服环境蒸蒸日上！
