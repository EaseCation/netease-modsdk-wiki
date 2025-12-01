---
front:
hard: 入门
time: 15分钟
---


# KetherScript
## 介绍
`Kether` 是`TabooLib`框架中内置的脚本语言，由 `海螺先生` 创造。  
可以轻松实现诸多功能（如：发送动作栏或标题信息、改变玩家游戏模式、获取变量等等），它还拥有良好的拓展 API，能让其他开发者更加轻松地开发出自己的动作语句。


## 文档资源 （社区 · 新）
- 文档首页  [https://taboo.8aka.org](https://taboo.8aka.org)
- 动作语句大全 [https://taboo.8aka.org/kether-list](https://taboo.8aka.org/kether-list)

## 如何调用

```kotlin
fun runKether(script: List<String>, player: Player) {
    KetherShell.eval(
        script, options = ScriptOptions(
            sender = adaptCommandSender(player)
        )
    )
}
```
## 获取返回值
```kotlin
fun runKether(script: List<String>, player: Player): CompletableFuture<Any> {
    return KetherShell.eval(
        script, options = ScriptOptions(
            sender = adaptCommandSender(player)
        )
    ).thenApply { it }
}
```
## 注册组件
提供了 AbolethPlus 的 Get组件作为参考  
作者：鹰
```kotlin
class AboPlusGetActions {

    class GetKeyValue(val key: ParsedAction<*>, val default: ParsedAction<*>? = null, val target: ParsedAction<*>? = null) : ScriptAction<Any?>() {

        override fun run(frame: ScriptFrame): CompletableFuture<Any?> {
            val future = CompletableFuture<Any?>()
            val keyString = frame.newFrame(key).run<String>().get()
            val defString = default?.let { frame.newFrame(it).run<String>().get() } ?: ""
            val targetOrNull = target?.let { frame.newFrame(it).run<String>().get() }
            val targetString = if (targetOrNull.isNullOrEmpty()) {
                frame.player().uniqueId
            } else {
                AbolethPlusAPI.getUserUUID(targetOrNull)
            }
            val result = AbolethPlusAPI.getValue(targetString, keyString, defString).getValueData(defString)
            future.complete(result)
            return future
        }
    }
    class GetKeyDefault(private val key: ParsedAction<*>) : ScriptAction<Any?>() {
        override fun run(frame: ScriptFrame): CompletableFuture<Any?> {
            val future = CompletableFuture<Any?>()
            val keyString = frame.newFrame(key).run<String>().get()
            val result = AbolethPlusAPI.getDefault(keyString)
            future.complete(result)
            return future
        }
    }



    /**
     * shared = true 公有语句
     * abpg {action} [def [{action}]] [@ (server|ID)]   -> 获取语句
     *
     * abpg key                 -> 获取 key 值, 默认值 ""
     * abpg key def             -> 获取 key 的默认值
     * abpg key def "default"   -> 获取 key 的值, 默认值 "default"
     *
     * @author 鹰
     * @since 2023/9/6
     *
     */
    companion object {
        @KetherParser(["abpg", "abolethplusget"], shared = true)
        fun parser() = scriptParser {
            val keyAction = it.nextParsedAction()
            it.mark()
            try {
                it.expect("def")
                it.mark()
                val defaultAction = it.nextParsedAction()
                if (it.hasNext()) {
                    val target = matchTarget(it)
                    GetKeyValue(keyAction, defaultAction, target)
                } else {
                    it.reset()
                    GetKeyDefault(keyAction)
                }
            } catch (ex: Exception) {
                it.reset()
                val target = matchTarget(it)
                GetKeyValue(keyAction, target = target)
            }
        }
        private fun matchTarget(it: QuestReader) =  try {
            it.mark()
            it.expect("@")
            it.nextParsedAction()
        } catch (ex: Throwable) {
            it.reset()
            literalAction("")
        }
    }
}
```