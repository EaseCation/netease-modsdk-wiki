---
front:
hard: 入门
time: 20分钟
---

# 接入PlaceholderAPI

本篇教程针对 `PlaceholderAPI 2.10.0` 为蓝本进行教学，版本不一致时可作为参考，然后查阅相关开发API进行调整

## 引入库到本地项目

在你可以实际使用 `PlaceholderAPI` ，你首先需要将第三方库通过 Gradle 或者 Maven 导入到你的本地项目
您可以使用下方仓库进行引入

### Maven

```xml
    <repositories>
        <repository>
            <id>placeholderapi</id>
            <url>https://repo.extendedclip.com/releases/</url>
        </repository>
    </repositories>
    <dependencies>
        <dependency>
         <groupId>me.clip</groupId>
          <artifactId>placeholderapi</artifactId>
          <version>{version}</version>
         <scope>provided</scope>
        </dependency>
    </dependencies>
```

### Gradle
```kotlin
repositories {
    maven {
        url = 'https://repo.extendedclip.com/releases/'
    }
}

dependencies {
    compileOnly 'me.clip:placeholderapi:{version}'
}
```

> 您可以通过查阅PlaceholderAPI发布页面，查阅需要引入的PlaceholderAPI版本
> [PlaceholderAPI发行页](https://github.com/PlaceholderAPI/PlaceholderAPI/releases)


## 在plugin.yml声明依赖

在编写插件前，你还需要在插件的`plugin.yml`中将`PlaceholderAPI` 设置为depend或者softdepend

具体填写格式可以查阅 Bukkit开发教程/深入plugin.yml


## 解析变量

`PlaceholderAPI` 提供了自动解析插件内其他插件变量的能力，从而改变了开发路径。

以往开发者如果想要获取其他插件的一些变量，通常需要用到反射等特性才能获取到，兼容性无法得到保证，还比较麻烦。

但是如果想要获取的插件对接了 PlaceholderAPI 并有占位符显示的话，开发者可快速解析占位符获得内容。

若要在你的插件内使用来自其他插件的变量，使用 setPlaceholders 方法即可。

需要注意的是，任何需要插件或依赖的变量拓展必须在服务器上启用，否则变量不会被解析（返回原字符串）。

假设我们需要对一个玩家拥有的初级权限组发送一条自定义加入消息。

若要这么做，我们可以按如下步骤实现：


```java
package at.helpch.placeholderapi;

import me.clip.placeholderapi.PlaceholderAPI;

import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.plugin.java.JavaPlugin;
import me.clip.placeholderapi.PlaceholderAPI;

public class JoinExample extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {

        if (Bukkit.getPluginManager().isPluginEnabled("PlaceholderAPI")) {
            Bukkit.getPluginManager().registerEvents(this, this);
        } else {
            getLogger().warn("Invaild PlaceholderAPI! 插件已被禁用."); 
            Bukkit.getPluginManager().disablePlugin(this);
        }
    }

    @EventHandler(priority = EventPriority.HIGHEST)
    public void onJoin(PlayerJoinEvent event) {
        String joinText = "%player_name% 加入了服务器! 他的级别是 %vault_rank%";

        joinText = PlaceholderAPI.setPlaceholders(event.getPlayer(), joinText);
        event.setJoinMessage(joinText);
    }
}
```

## 创建一个新的变量

除了解析变量以外，开发者还可以利用到`PlaceholderAPI`创建自己插件的变量

你所创建的变量都是 PlaceholderExpansion 的子类，都属于拓展变量

新建一个类取名叫 `SomeExpansion.class`

按照下方格式即可创建一个新变量

```java
package at.helpch.placeholderapi.example.expansion;

import me.clip.placeholderapi.expansion.PlaceholderExpansion;

public class SomeExpansion extends PlaceholderExpansion {

    @Override
    @NotNull
    public String getAuthor() {
        return "Author"; // 
    }

    @Override
    @NotNull
    public String getIdentifier() {
        return "example"; // 
    }

    @Override
    @NotNull
    public String getVersion() {
        return "1.0.0"; // 
    }

    // 这些方法默认不覆写.
    // 你需要覆写其中一个.
    // onRequest 是允许离线玩家的变量

    // onPlaceholderRequest 是允许在线玩家的变量

    @Override
    public String onRequest(OfflinePlayer player, @NotNull String params) {    
    	if (params.equalsIgnoreCase("placeholder1")) {
            return "test";
        }
    }

    @Override
    public String onPlaceholderRequest(Player player, @NotNull String params) {

    	// TODO
    }
}


```

### 注册变量拓展

创建好的变量还需要注册，否则插件无法识别你注册的变量

```java
package at.helpch.placeholderapi.example;

import at.helpch.placeholderapi.example.expansion.SomeExpansion;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public class SomePlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        if (Bukkit.getPluginManager().isPluginEnabled("PlaceholderAPI")) { // 检查 PlaceholderAPI 是否存在并启用，否则就会抛出报错。
            new SomeExpansion(this).register(); 注册变量。
        }
    }
}
```

现在你已经注册了一个变量了 

当你存在需要填写变量的地方 写入 `%example_placeholder1%` 就会自动解析成 test 并显示出来

更多内容可以查阅官方维基百科[**PlaceholderAPI WIKI**](https://wiki.placeholderapi.com/users/)