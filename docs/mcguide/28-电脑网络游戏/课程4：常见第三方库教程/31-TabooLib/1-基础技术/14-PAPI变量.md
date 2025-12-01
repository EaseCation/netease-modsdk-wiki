---
front:
hard: 入门
time: 5分钟
---


# PAPI变量
## 介绍
是的 TabooLib 提供了一个非常快捷的Papi变量注册方法 你只需要简单的继承 实现方法  
剩下的TabooLib都帮你完成！

## 注册
```kotlin
object PapiHook : PlaceholderExpansion {

    // 变量前缀
    override val identifier: String = "index"

    // 变量操作
    override fun onPlaceholderRequest(player: Player?, args: String): String {
        return "变量返回的文字"
    }
}
```

## 调用
非常简单！
```kotlin
"字符串%player_name%".replacePlaceholder(player)
listOf("字符串%player_name%").replacePlaceholder(player)
```