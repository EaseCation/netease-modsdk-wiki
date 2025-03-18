---
sidebarDepth: 1
---

# <span id="7-公共API"></span>7-公共API

下面是异步任务池的接口

<span id="异步线程池"></span>
### 异步线程池

<span id="EmitOrder"></span>
#### EmitOrder

- 描述

    添加一个异步任务

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | string/int | 相同key的任务，线程池顺序执行；不同key的任务，线程池会并行执行。可以确认某些任务按照顺序执行。 |
    | func | function | 任务对应的函数，该函数会在线程池中运行。该任务和主线程会并行执行，需要确认任务是线程安全的。函数必须返回一个元组，若返回为空则要求返回空元组("()")。函数输入参数是*args |
    | callback | function | 回调函数，它在主线程执行。func的返回值会是callback的实参。若没有回调，则传入None。 |
    | *args | *args | func函数的非关键字参数 |
- 返回值

    无
- 示例

```python
import time
import apolloCommon.workerPool as workerPool
def Callbacks(idx, result):
        print "callbacks",idx, result
def Test(idx):
        print "test start %d" % idx
        time.sleep(1)
        print "test fin %d" % idx
        result = idx + 5
        return (idx, result)#任务必须有返回值。若没有返回值，请返回 "()"
ins = workerPool.ForkNewPool(4)
for i in xrange(4):
        #添加异步任务。i为奇数的任务顺序执行，i为偶数的任务顺序执行。这两批任务并行执行。
        ins.EmitOrder(i%2, Test, Callbacks, i)
ins.Finish(None) #等待线程池退出。
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待线程池退出，线程池会执行完所有异步任务后退出，会阻塞主线程。建议Mod退出时执行

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | timeout | int | 等待线程池退出时间，单位秒。若为None，则会一直等待。建议用None。 |
- 返回值

    无
- 示例

```python
import apolloCommon.workerPool as workerPool
ins = workerPool.ForkNewPool(4)
ins.Finish(None) #等待线程池退出。
 ```
<span id="ForkNewPool"></span>
#### ForkNewPool

- 描述

    创建线程池，设置线程池大小

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | orderSize | int | 线程池的大小 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | MainPool | 线程池实例 |
- 示例

```python
import apolloCommon.workerPool as workerPool
ins = workerPool.ForkNewPool(10)
 ```
下面是mysql线程池的接口

<span id="mysql连接池"></span>
### mysql连接池

<span id="AsyncExecuteFunctionWithOrderKey"></span>
#### AsyncExecuteFunctionWithOrderKey

- 描述

    添加一个异步mysql任务，func将在子线程中执行，注意func中不支持执行引擎提供的API

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | func | function | mysql异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个mysql长连接，可以通过conn.cursor()获取cursor |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的其它非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留用。 |
- 返回值

    无
- 示例

```python
def TestMysqlPoolCallback(records):
        if records is None:
                print "TestMysqlPoolCallback execute fail"
        else:
                print "TestMysqlPoolCallback execute success"
                for line in records:
                        print "single record=%s" % str(line)
def mysqlFunc(conn, num):
        cursor = conn.cursor()
        query = "SELECT * FROM neteaseUserMail LIMIT %s"
        params = (num, )
        try:
                cursor.execute(query, params)
                records = cursor.fetchall()
        except Exception as e:
                logout.error("mysqlFunc error=%s"%str(e))
                records = None
        finally:
                cursor.close()
        return records
#执行事务的一个示例
def mysqlTransactionTest(conn):
        conn.autocommit(False)
        cursor = conn.cursor()
        try:
                params = (2, 'test_items')
                query = "insert into neteaseCloudItems (uid, cloud_items) values (%s, %s)"
                cursor.execute(query, params)
                conn.commit()
        except:
                conn.rollback()
        finally:
                cursor.close()
                conn.autocommit(True)#请务必将连接还原
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.InitDB(5)
mysqlPool.AsyncExecuteFunctionWithOrderKey(mysqlFunc, "global", TestMysqlPoolCallback, 5)
mysqlPool.AsyncExecuteFunctionWithOrderKey(mysqlTransactionTest, "test_trans", None)
mysqlPool.Finish()
 ```
<span id="AsyncExecuteWithOrderKey"></span>
#### AsyncExecuteWithOrderKey

- 描述

    添加一个异步mysql任务，执行所有mysql操作

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | sql | str | mysql查询语句，格式化字符串 |
    | params | tuple | 填充sql |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.InitDB(30)
def Cb(t):
        #插入成功情况下，t的值：True
        #插入失败情况下，t的值：False
        print "cb", t
#添加异步任务。
mysqlPool.AsyncExecuteWithOrderKey('player', 'insert into player values (%s, %s)', (1, "test1"), Cb)
mysqlPool.Finish()
 ```
<span id="AsyncExecutemanyWithOrderKey"></span>
#### AsyncExecutemanyWithOrderKey

- 描述

    添加一个异步mysql任务，针对同一条sql语句，使用paramsList中的每个参数各执行一次，并且返回成功修改/新建的记录数，其中任何一条语句执行失败，最终所有语句都会被执行失败，返回None

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | orderKey | string/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | sql | string | mysql插入语句，格式化字符串 |
    | callback | function | 回调函数，在主线程执行，只有唯一一个参数，成功修改/新建的记录数，假如sql执行失败，返回参数将会是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import time
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.InitDB(30)
def Cb(t):
        #插入成功情况下，t的值：3
        #插入失败情况下，可能出现部分数据插入成功问题，此时t的值：None
        print "cb", t
#添加异步任务。
mysqlPool.AsyncExecutemanyWithOrderKey('pay', 'insert into pay values (%s, %s)', [(1,"648"),(2,"328"), (3,"345")], Cb)
for i in xrange(100):
        mysqlPool.Tick()
        time.sleep(0.2)
mysqlPool.Finish()
 ```
<span id="AsyncInsertOneWithOrderKey"></span>
#### AsyncInsertOneWithOrderKey

- 描述

    添加一个异步mysql任务，向主键为AUTO INCREASEl类型的表格中插入一条记录，并且返回新建记录的主键

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | orderKey | string/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | sql | string | mysql插入语句，格式化字符串 |
    | params | tuple | 填充sql |
    | callback | function | 回调函数，在主线程执行，只有唯一一个参数，是新建记录的主键，假如sql执行失败，返回参数将会是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
# 表testTable的创建语句如下
# CREATE TABLE IF NOT EXISTS `testTable` (
#       `id` bigint unsigned NOT NULL AUTO_INCREMENT,
#       `col_1` varchar(50) NOT NULL,
#       PRIMARY KEY (`uid`)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.InitDB(30)
def Cb(t):
        #插入成功情况下，t的一个示例值（也即表testTable中列id对应值）：1
        #插入失败情况下，t的值：None
        print "cb", t
#添加异步任务。
mysqlPool.AsyncInsertOneWithOrderKey('pay', 'insert into testTable (col_1) values (%s)', ("648"), Cb)
mysqlPool.Finish()
 ```
<span id="AsyncQueryWithOrderKey"></span>
#### AsyncQueryWithOrderKey

- 描述

    添加一个异步mysql任务，执行mysql查询

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | sql | str | mysql查询语句，格式化字符串 |
    | params | tuple | 填充sql |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.InitDB(30)
def Cb(t):
        #查询到一条记录情况下，t的一个示例值：((1L, u'test_name_1', 0L),)
        #查询为空情况下，t的值：()
        #查询报错情况，t的值：None
        print "cb", t
#添加异步任务。
mysqlPool.AsyncQueryWithOrderKey('player', 'select uid,name from player where uid = %s', (1,), Cb)
#等价于
#mysqlPool.AsyncQuery('player', 'select uid,name from player where uid = %s', (1,), Cb)
#orderKey都是'player'，两个任务顺序执行。
mysqlPool.AsyncQueryWithOrderKey('player', 'select uid,name from player where uid = %s', (1,), Cb)
mysqlPool.Finish()
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待mysql线程池退出，会等待线程池中所有异步任务执行完毕后退出

- 返回值

    无
- 示例

```python
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.Finish()
 ```
<span id="InitDB"></span>
#### InitDB

- 描述

    初始化myqsl连接池，要求在MCStudio的“服务器配置”中配置mysql

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | poolSize | int | 连接池大小 |
- 返回值

    无
- 示例

```python
import apolloCommon.mysqlPool as mysqlPool
mysqlPool.InitDB(30)
 ```
<span id="SyncFetchAll"></span>
#### SyncFetchAll

- 描述

    阻塞性执行sql语句，查询数据

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | sql | string | mysql查询语句，格式化字符串 |
    | params | tuple | 填充sql |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | None/list | 错误返回None，否则返回列表，列表中每个元素表示一条查询记录 |
- 备注

    建议只在初始化mod时执行这个api，不要在运行期间执行本api。它会阻塞主流程，可能导致服务器卡顿。


- 示例

```python
import apolloCommon.mysqlPool as mysqlPool
sql = 'select _id, name from test_user where _id > %s'
#查询成功情况下，allRecords的一个示例值：((1L, u'test_name_1', 0L), (2L, u'test22', 2222L), (3L, u'test33', 333L))
#查询失败情况下，allRecords的值：None
allRecords = mysqlPool.SyncFetchAll(sql, (0, ))
for record in allRecords:
        user['_id'] = record[0]#对应select后的第一个字段
        user['name'] = record[1]#对应select后的第二个字段
 ```
<span id="SyncInsert"></span>
#### SyncInsert

- 描述

    阻塞性执行sql语句，插入数据

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | sql | string | mysql查询语句，格式化字符串 |
    | params | tuple | 填充sql |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | None/id | 错误返回None，否则返回成功插入的id |
- 备注

    建议只在初始化mod时执行这个api，不要在运行期间执行本api。它会阻塞主流程，可能导致服务器卡顿。


- 示例

```python
import apolloCommon.mysqlPool as mysqlPool
sql = 'insert into test_user(name, age) values(%s, %s)'
#插入成功情况下，返回值是插入的主键id
#插入失败情况下，返回值是0
insertId = mysqlPool.SyncInsert(sql, ("steve", 20))
 ```
下面是redis线程池的接口

<span id="redis连接池"></span>
### redis连接池

<span id="AsyncDelete"></span>
#### AsyncDelete

- 描述

    执行redis操作，删除某个redis key,相当于redis中执行命令:del key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | string | redis中的key |
    | callback | function | 回调函数，输入参数是redis操作返回值,是个int，表示删除redis key的个数 ,它在主线程执行。可以不传入回调函数。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
def Cb1(t):
        #执行成功且redis key "player_121"存在情况下，t的值：1
        #执行成功且redis key "player_121"不存在情况下，t的值：0
        #执行失败时，t的值：None
        print "cb", t
redisPool.InitDB(30) #建立连接池
redisPool.AsyncDelete('player_121', cb1)
redisPool.Finish()
 ```
<span id="AsyncFuncWithKey"></span>
#### AsyncFuncWithKey

- 描述

    添加一个异步redis任务

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | func | function | redis异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个redis长连接，是一个redis.StrictRedis实例，其他参数是*args |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值是callback的输入参数。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的其它非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留用。 |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
redisPool.InitDB(30) #建立连接池
#回调，可以获取player的信息。这里只是打印结果。
def Cb1(t):
        #执行成功且存在redis key "player_123"情况下，t的一个示例值：'test_string_value'
        #执行成功且不存在redis key "player_123"情况下，t的值：""
        #执行失败时，key的值：None
        print "cb", t
#第一个参数是redis.StrictRedis实例。
def GetValueFromKey(conn, key):
        ret = conn.get(key)
        return ret if ret is not None else ""
#插入一个任务，从redis中获取uid为123玩家的信息。
redisPool.AsyncFuncWithKey(GetValueFromKey, "player_123", Cb1, 123)
#插入同样任务，orderKey都是“player_123”,因此两个任务会顺序执行。
redisPool.AsyncFuncWithKey(GetValueFromKey, "player_123", Cb1, 123)
redisPool.Finish()
 ```
<span id="AsyncGet"></span>
#### AsyncGet

- 描述

    执行redis操作，获取key的value,相当于redis中执行命令:get key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | str | redis中的key |
    | callback | function | 回调函数，默认为空。函数输入参数是redis key对应的value字符串，它在主线程执行。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
def Cb1(t):
        #执行成功且存在redis key "player_123"情况下，t的一个示例值：'test_string_value'
        #执行成功且不存在redis key "player_123"情况下，t的值：None
        #执行失败时，key的值：None
        print "cb", t
redisPool.InitDB(30) #建立连接池
redisPool.AsyncGet("player_123", Cb1)
redisPool.Finish()
 ```
<span id="AsyncHgetall"></span>
#### AsyncHgetall

- 描述

    执行redis操作，获取key的value,相当于redis中执行命令:hgetall key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | string | redis中的key |
    | callback | function | 回调函数，输入参数是redis key对应的值，是个dict，它在主线程执行。可以不传入回调函数。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
def Cb1(t):
        #执行成功且redis key "player_123"不为空情况下，t的一个示例值：{'name': 'name', 'lv': '2'}
        #执行成功且redis key "player_123"为空情况下，t的值：{}
        #执行失败时，t的值：None
        print "cb", t
redisPool.InitDB(30) #建立连接池
redisPool.AsyncHgetall("h_player_123", Cb1)
redisPool.Finish()
 ```
<span id="AsyncMget"></span>
#### AsyncMget

- 描述

    执行redis操作，获取多个key的值,相当于redis中执行命令:mget key1 key2 ...

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | list/tuple | 多个redis中的key |
    | callback | function | 回调函数，默认为空。函数输入参数redis操作返回值, 是个列表，每个元素对应单个redis key的值，它在主线程执行。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
def Cb1(t):
        #执行成功且redis key "test_value_None"不存在情况下，t的一个示例值：{'1': 'str', None}
        #执行失败时，t的值：None
        print "cb", t
redisPool.InitDB(30) #建立连接池
keys = ("test_value_1", "test_value_str", "test_value_None")
redisPool.AsyncMget(keys, Cb1)
redisPool.Finish()
 ```
<span id="AsyncSet"></span>
#### AsyncSet

- 描述

    执行redis操作，设置key的值为value,相当于redis中执行命令:set key value

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | key | string | redis中的key |
    | value | string | redis中key的值 |
    | callback | function | 回调函数，默认为空。函数输入参数是redis操作返回值，True表示设置成功，False失败。 若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
redisPool.InitDB(30) #建立连接池
def cb1(t):
        #执行成功时，t的值：True
        #执行失败时，t的值：False
        print "cb", t
redisPool.AsyncSet('player_123', "{'name':'nickname'}", cb1)
redisPool.Finish()
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待redis线程池退出，会等待线程池中所有异步任务执行完毕后退出

- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
redisPool.InitDB(30) #建立连接池
#添加异步任务。在redis中执行:set "key1", "value11"
redisPool.AsyncSet("key1", "value11")
redisPool.Finish()
 ```
<span id="InitDB"></span>
#### InitDB

- 描述

    初始化redis连接池，要求在MCStudio的“服务器配置”中配置redis

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | poolSize | int | 连接池大小 |
- 返回值

    无
- 示例

```python
import apolloCommon.redisPool as redisPool
redisPool.InitDB(30)
 ```
下面是mongo线程池的接口

<span id="mongo连接池"></span>
### mongo连接池

<span id="AsyncExecute"></span>
#### AsyncExecute

- 描述

    添加一个异步mongo任务

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | collection | str | mongo中的一个集合，相同集合的所有操作串行执行，不同集合操作并行执行 |
    | func | function | mongo异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个mongo长连接，是pymongo.MongoClient连接池实例中的一个连接 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的其它非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留用 |
- 返回值

    无
- 备注

    query mongo数据库返回的字典中，大于signed int的整数，返回的数据类型并不是int，而是bson.int64.Int64(虽然直接打印的结果类似【50000L】)，bson.int64.Int64类型的数据无法作为eventData发送给客户端或功能服，需要使用API:ConvertBsonToInt转换为Int类型


- 示例

```python
import apolloCommon.mongoPool as mongoPool
mongoPool.InitDB(32)
def Insert(col):
        postData = {
                'title': 'Python and MongoDB',
                'content': 'PyMongo is fun, you guys',
                'author': 'Scott'
        }
        col.insert_one(postData)
def Cb(t):
        print "cb", t
#添加异步任务。
mongoPool.AsyncExecute("test_col", Insert, Cb)
mongoPool.Finish()
 ```
<span id="AsyncExecuteWithOrderKey"></span>
#### AsyncExecuteWithOrderKey

- 描述

    添加一个异步mongo任务。同async_execute区别是，可以显示设置orderKey

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | collection | str | mongo中的一个集合 |
    | func | function | mongo异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个mongo长连接，是pymongo.MongoClient连接池实例中的一个连接 |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的其它非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留用。 |
- 返回值

    无
- 备注

    query mongo数据库返回的字典中，大于signed int的整数，返回的数据类型并不是int，而是bson.int64.Int64(虽然直接打印的结果类似【50000L】)，bson.int64.Int64类型的数据无法作为eventData发送给客户端或功能服，需要使用API:ConvertBsonToInt转换为Int类型


- 示例

```python
import apolloCommon.mongoPool as mongoPool
mongoPool.InitDB(32)
def Insert(col):
        postData = {
                'title': 'Python and MongoDB',
                'content': 'PyMongo is fun, you guys',
                'author': 'Scott'
        }
        col.insert_one(postData)
def Cb(t):
        print "cb", t
#添加异步任务。
#下面操作相当于:mongoPool.AsyncExecute("test_col", Insert, Cb)
mongoPool.AsyncExecuteWithOrderKey("test_col", Insert, "test_col", Cb)
#添加相同任务，两个任务顺序执行。
mongoPool.AsyncExecuteWithOrderKey("test_col", Insert, "test_col", Cb)
mongoPool.Finish()
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待mongo线程池退出，会等待线程池中所有异步任务执行完毕后退出

- 返回值

    无
- 示例

```python
import apolloCommon.mongoPool as mongoPool
mongoPool.InitDB(32)
mongoPool.Finish()
 ```
<span id="InitDB"></span>
#### InitDB

- 描述

    初始化mongo连接池，要求在MCStudio的“服务器配置”中配置mongo

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | poolSize | int | 连接池大小 |
- 返回值

    无
- 示例

```python
import apolloCommon.mongoPool as mongoPool
mongoPool.InitDB(32)
 ```
下面是mysql扩展线程池的一些接口

<span id="mysql连接池扩展"></span>
### mysql连接池扩展

<span id="AsyncExecuteWithOrderKey"></span>
#### AsyncExecuteWithOrderKey

- 描述

    添加一个异步mysql任务，执行所有mysql操作。同AsyncExecute的区别是可以显示指定orderKey

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | string | mysql db名字，名字在deploy.json中extra_mysql下配置，具体参见[InitDB](#InitDB)备注说明 |
    | orderKey | string/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | sql | string | mysql查询语句，格式化字符串 |
    | params | tuple | 填充sql |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraMysqlPool as extraMysqlPool
extraMysqlPool.InitDB('mysql_test1', 30)
def Cb(t):
        print "cb", t
#添加异步任务
extraMysqlPool.AsyncExecuteWithOrderKey('mysql_test1', 'player', 'insert into player values (%s, %s)', (1, "test1"), Cb)
extraMysqlPool.Finish()
 ```
<span id="AsyncQueryWithOrderKey"></span>
#### AsyncQueryWithOrderKey

- 描述

    添加一个异步mysql任务，执行mysql查询。同AsyncQuery区别是可以显示指定orderKey

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | string | mysql db名字，名字在deploy.json中extra_mysql下配置，具体参见[InitDB](#InitDB)备注说明 |
    | orderKey | string/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | sql | string | mysql查询语句，格式化字符串 |
    | params | tuple | 填充sql |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraMysqlPool as extraMysqlPool
extraMysqlPool.InitDB('mysql_test1', 30)
def Cb(t):
        print "cb", t
#添加异步任务
extraMysqlPool.AsyncQueryWithOrderKey('mysql_test1', 'player', 'select uid,name from player where uid = %s', (1,), Cb)
#orderKey都是'player'，两个任务顺序执行
extraMysqlPool.AsyncQueryWithOrderKey('mysql_test1','player', 'select uid,name from player where uid = %s', (1,), Cb)
extraMysqlPool.Finish()
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待mysql线程池退出，会等待线程池中所有异步任务执行完毕后退出

- 返回值

    无
- 示例

```python
import apolloCommon.extraMysqlPool as extraMysqlPool
extraMysqlPool.Finish()
 ```
<span id="InitDB"></span>
#### InitDB

- 描述

    初始化mysql连接池。可以支持多个mysql实例，它可以同“mysql连接池”一起使用。MCStudio打开配置文件目录，在deploy.json文件中配置extra_mysql，配置方法参见备注

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | string | mysql db名字，名字在deploy.json中extra_mysql下配置，比如示例配置中 “mysql_test1” |
    | poolSize | int | 连接池大小 |
- 返回值

    无
- 备注

    deploy.json中部分配置的示例如下：
    ```
    "mysql": {
    "database": "mod_test",
    "host": "127.0.0.1",
    "password": "test",
    "port": 3306,
    "user": "test"
    },
    "extra_mysql":{
    "test1":{
    "database": "mysql_test1",
    "host": "127.0.0.2",
    "password": "test",
    "port": 3306,
    "user": "test"
    },
    "test2":{
    "database": "mysql_test2",
    "host": "127.0.0.3",
    "password": "test",
    "port": 3306,
    "user": "test"
    }
    },
    ```


- 示例

```python
import apolloCommon.extraMysqlPool as extraMysqlPool
extraMysqlPool.InitDB('mysql_test1', 30)
 ```
下面是redis扩展线程池的一些接口

<span id="redis连接池扩展"></span>
### redis连接池扩展

<span id="AsyncDelete"></span>
#### AsyncDelete

- 描述

    执行redis操作，删除某个redis key,相当于redis中执行命令:del key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis db名字，名字对应MCStudio中新增redis实例的实例名称 |
    | key | str | redis中的key |
    | callback | function | 回调函数，默认为空。函数输入参数是redis操作返回值,是个int，表示删除redis key的个数 ,它在主线程执行。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
def Cb1(t):
        print "cb", t
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
extraRedisPool.AsyncDelete('extra_redis1', 'player_121', Cb1)
extraRedisPool.Finish()
 ```
<span id="AsyncFuncWithKey"></span>
#### AsyncFuncWithKey

- 描述

    添加一个异步redis任务

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis db名字，名字对应MCStudio中新增redis实例的实例名称 |
    | func | function | redis异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个redis长连接，是一个redis.StrictRedis实例，其他参数是*args |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值是callback的输入参数。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的其它非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留用 |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
#回调，可以获取player的信息。这里只是打印结果。
def Cb1(t):
        print "cb", t
#第一个参数是redis.StrictRedis实例。
def GetValueFromKey(conn, key):
        return conn.get(key)
#插入一个任务，从redis中获取uid为123玩家的信息。
extraRedisPool.AsyncFuncWithKey('extra_redis1', GetValueFromKey, 'player_123', Cb1, 123)
#插入同样任务，orderKey都是“player_123”,因此两个任务会顺序执行。
extraRedisPool.AsyncFuncWithKey('extra_redis1', GetValueFromKey, 'player_123', Cb1, 123)
extraRedisPool.Finish()
 ```
<span id="AsyncGet"></span>
#### AsyncGet

- 描述

    执行redis操作，获取key的value,相当于redis中执行命令:get key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis db名字，名字对应MCStudio中新增redis实例的实例名称 |
    | key | str | redis中的key |
    | callback | function | 回调函数，默认为空。函数输入参数是redis key对应的value字符串，它在主线程执行。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
def Cb1(t):
        print "cb", t
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
extraRedisPool.AsyncGet('extra_redis1','player_123', Cb1)
extraRedisPool.Finish()
 ```
<span id="AsyncHgetall"></span>
#### AsyncHgetall

- 描述

    执行redis操作，获取key的value,相当于redis中执行命令:hgetall key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis db名字，名字对应MCStudio中新增redis实例的实例名称 |
    | key | str | redis中的key |
    | callback | function | 回调函数，默认为空，函数输入参数是redis key对应的值，是个dict，它在主线程执行。若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
def Cb1(t):
        print "cb", t
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
extraRedisPool.AsyncHgetall('extra_redis1', 'player_123', Cb1)
extraRedisPool.Finish()
 ```
<span id="AsyncMget"></span>
#### AsyncMget

- 描述

    执行redis操作，获取多个key的值,相当于redis中执行命令:mget key1 key2 ...

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis db名字，名字对应MCStudio中新增redis实例的实例名称 |
    | keys | list/tuple | 多个redis key |
    | callback | function | 回调函数，默认为空，函数输入参数redis操作返回值, 是个列表，每个元素对应单个redis key的值，它在主线程执行。若redis操作抛出异常，则callback输入参数是None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
def Cb1(t):
        print "cb", t
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
keys = ('player_121', 'player_122')
extraRedisPool.AsyncMget('extra_redis1', keys, Cb1)
extraRedisPool.Finish()
 ```
<span id="AsyncSet"></span>
#### AsyncSet

- 描述

    执行redis操作，设置key的值为value,相当于redis中执行命令:set key value

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis db名字，名字对应MCStudio中新增redis实例的实例名称 |
    | key | str | redis中的key |
    | value | str | redis中key的值 |
    | callback | function | 回调函数，默认为空。函数输入参数是redis操作返回值，True表示设置成功，False失败。 若redis操作抛出异常，则callback输入参数是None。若没有回调，则传入None |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
extraRedisPool.AsyncSet('extra_redis1', 'player_123', "{'name':'nickname'}")
extraRedisPool.Finish()
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待redis db线程池退出，会等待线程池中所有异步任务执行完毕后退出

- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
extraRedisPool.InitDB('extra_redis1', 30) #建立连接池
#回调，可以获取player的信息。这里只是打印结果。
def Cb1(t):
        print "cb", t
#第一个参数是redis.StrictRedis实例。
def GetValueFromKey(conn, key):
        return conn.get(key)
#插入一个任务，从redis中获取uid为123玩家的信息。
extraRedisPool.AsyncFuncWithKey('extra_redis1', GetValueFromKey, 'player_123', Cb1, 123)
extraRedisPool.Finish()
 ```
<span id="InitDB"></span>
#### InitDB

- 描述

    初始化redis连接池，要求在MCStudio的“服务器配置”中“新增redis实例”

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | redis实例名字，对应MCStudio中redis“实例名称”配置 |
    | poolSize | int | 连接池大小 |
- 返回值

    无
- 示例

```python
import apolloCommon.extraRedisPool as extraRedisPool
extraRedisPool.InitDB('extra_redis1', 30)
 ```
下面是mongo扩展线程池的一些接口

<span id="mongo连接池扩展"></span>
### mongo连接池扩展

<span id="AsyncExecute"></span>
#### AsyncExecute

- 描述

    添加一个异步mongo任务

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | mongo db名字，名字在deploy.json中extra_mongo下配置，具体参见[InitDB](#InitDB)备注说明 |
    | collection | str | mongo中的一个集合，相同集合的所有操作串行执行，不同集合操作并行执行 |
    | func | function | mongo异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个mongo长连接，是pymongo.MongoClient连接池实例中的一个连接 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留用 |
- 返回值

    无
- 示例

```python
import apolloCommon.extraMongoPool as extraMongoPool
extraMongoPool.InitDB('mongo_test1', 32)
def Insert(col):
        postData = {
                'title': 'Python and MongoDB',
                'content': 'PyMongo is fun, you guys',
                'author': 'Scott'
        }
        col.insert_one(postData)
def Cb(t):
        print "cb", t
#添加异步任务。
extraMongoPool.AsyncExecute('mongo_test1', 'test_col', Insert, Cb)
extraMongoPool.Finish()
 ```
<span id="AsyncExecuteWithOrderKey"></span>
#### AsyncExecuteWithOrderKey

- 描述

    添加一个异步mongo任务。同async_execute区别是，可以显示设置orderKey

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | mongo db名字，名字在deploy.json中extra_mongo下配置，具体参见[InitDB](#InitDB)备注说明 |
    | collection | str | mongo中的一个集合 |
    | func | function | mongo异步任务，可以没有返回值。该任务和主线程会并行执行，要求任务是线程安全的。第一个参数是一个mongo长连接，是pymongo.MongoClient连接池实例中的一个连接，其他参数是*args |
    | orderKey | str/int | 相同的orderKey会顺序执行，不同的orderKey会并行执行 |
    | callback | function | 回调函数，只有一个输入参数，它在主线程执行。func的返回值会是callback的实参。若func抛出异常，则callback输入参数是None。若没有回调，则传入None |
    | *args | *args | func的非关键字参数 |
    | **kwargs | **kwargs | 暂无用，预留 |
- 返回值

    无
- 示例

```python
import apolloCommon.extraMongoPool as extraMongoPool
extraMongoPool.InitDB('mongo_test1', 32)
def Insert(col):
        postData = {
                'title': 'Python and MongoDB',
                'content': 'PyMongo is fun, you guys',
                'author': 'Scott'
        }
        col.insert_one(postData)
def Cb(t):
        print "cb", t
#添加异步任务
#下面操作相当于:apolloCommon.AsyncExecute('mongo_test1', 'test_col', Insert, Cb)
apolloCommon.AsyncExecuteWithOrderKey('mongo_test1', 'test_col', Insert, 'test_col', Cb)
#添加相同任务，两个任务顺序执行
apolloCommon.AsyncExecuteWithOrderKey('mongo_test1', 'test_col', Insert, 'test_col', Cb)
apolloCommon.Finish()
 ```
<span id="Finish"></span>
#### Finish

- 描述

    等待mongo线程池退出，会等待线程池中所有异步任务执行完毕后退出

- 返回值

    无
- 示例

```python
import apolloCommon.extraMongoPool as extraMongoPool
extraMongoPool.Finish()
 ```
<span id="InitDB"></span>
#### InitDB

- 描述

    初始化mongo连接池。可以支持多个mongo实例，它可以同“mongo连接池”一起使用。MCStudio打开配置文件目录，在deploy.json文件中配置extra_mongo，配置方法参见备注

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | dbName | str | mongo db名字，名字在deploy.json中extra_mongo下配置，比如示例配置中 “mongo_test1” |
    | poolSize | int | 连接池大小 |
- 返回值

    无
- 备注

    deploy.json部分配置的示例如下：
    ```
    "mongo": {
    "database": "test",
    "host": "127.0.0.1",
    "password": "test",
    "port": 27017,
    "user": "test"
    },
    "extra_mongo":{
    "testname1" : {
    "database": "mongo_test1",
    "host": "127.0.0.2",
    "password": "test",
    "port": 27017,
    "user": "test"
    },
    "testname2" : {
    "database": "mongo_test2",
    "host": "127.0.0.3",
    "password": "test",
    "port": 27017,
    "user": "test"
    }
    },
    ```


- 示例

```python
import apolloCommon.extraMongoPool as extraMongoPool
extraMongoPool.InitDB('mongo_test1', 30)
 ```
下面是公共的接口

<span id="通用"></span>
### 通用

<span id="ChangeDatabaseSlowLogLimit"></span>
#### ChangeDatabaseSlowLogLimit

- 描述

    修改数据库连接池慢请求报警日志限定时间

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | db | str | 数据库连接池类型，mysql/redis/mongo |
    | interval | float | 慢请求限制时间，单个请求返回时间超过这个值就会记录慢请求日志，单位秒，mysql和mongo默认配置值为1.0秒，redis默认配置为0.1秒 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
suc = commonNetgameApi.ChangeDatabaseSlowLogLimit("mysql", 0.1)
print "ChangeDatabaseSlowLogLimit for mysql suc=%s" % suc
 ```
<span id="CheckNameValid"></span>
#### CheckNameValid

- 描述

    判定一个输入的string是否通过了命名库敏感词检查，没有敏感词返回1，存在敏感词返回0

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | name | str | 需要做敏感词检查的string |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 1代表没有敏感词，0代表存在敏感词 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
isOk = commonNetgameApi.CheckNameValid("xxxxxx")
if not isOk:
        print "输入中存在敏感词"
        return
 ```
<span id="CheckWordsValid"></span>
#### CheckWordsValid

- 描述

    判定一个输入的string是否通过了通用库敏感词检查，没有敏感词返回1，存在敏感词返回0

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | words | str | 需要做敏感词检查的string |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 1代表没有敏感词，0代表存在敏感词 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
isOk = commonNetgameApi.CheckSensitiveByName("xxxxxx")
if not isOk:
        print "输入中存在敏感词"
        return
 ```
<span id="CloseAsyncTaskSlowCheck"></span>
#### CloseAsyncTaskSlowCheck

- 描述

    停止每帧检查异步线程池中的任务

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.CloseAsyncTaskSlowCheck()
 ```
<span id="ConvertBsonToInt"></span>
#### ConvertBsonToInt

- 描述

    递归转换输入数据中的所有bson.int64.Int64类型的对象为int类型

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | input | dict/list/tuple/str/unicode | 需要转换的输入数据 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict/list/tuple/str/unicode | 和输入数据格式相同，其中bson.int64.Int64类型的对象会被转换为int类型 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
import bson
bsonInt = bson.Int64(5000000000)
input = {
        "a1": bsonInt,
        "a2": [bsonInt, bsonInt],
        "a3": (bsonInt, bsonInt),
}
ret = commonNetgameApi.ConvertBsonToInt(input)
 ```
<span id="DumpAsyncTaskPool"></span>
#### DumpAsyncTaskPool

- 描述

    打印当前异步线程池中的正在排队和执行中的任务信息

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.DumpAsyncTaskPool()
 ```
<span id="GetApolloGameId"></span>
#### GetApolloGameId

- 描述

    获取游戏当前项目的gameId（商城查询订单时需要）

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 游戏当前项目的gameId |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
gameId = commonNetgameApi.GetApolloGameId()
 ```
<span id="GetApolloGameKey"></span>
#### GetApolloGameKey

- 描述

    获取游戏当前项目的gameKey（商城查询订单时需要）

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 游戏当前项目的gameKey |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
gameKey = commonNetgameApi.GetApolloGameKey()
 ```
<span id="GetApolloReviewStage"></span>
#### GetApolloReviewStage

- 描述

    获取游戏当前审核阶段

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 0 测试阶段，1 审核阶段 2 上线阶段 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
reviewStage = commonNetgameApi.GetApolloReviewStage()
 ```
<span id="GetApolloUniqueId"></span>
#### GetApolloUniqueId

- 描述

    获取游戏当前项目唯一ID

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int | 游戏当前项目唯一ID |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
apolloId = commonNetgameApi.GetApolloUniqueId()
 ```
<span id="GetModJsonConfig"></span>
#### GetModJsonConfig

- 描述

    根据脚本根目录读取mod.json配置文件。要求mod已经被加载

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | scriptRootName | str | python脚本的根目录名 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | mod.json里面的内容信息 |
- 示例

```python
#目录结构
# |-developer_mods
#       |- neteaseNpcLobbyDev
#               mod.json
#               |- neteaseNpcLobby
import apolloCommon.commonNetgameApi as commonNetgameApi
confDict = commonNetgameApi.GetModJsonConfig("neteaseNpcLobby")
print confDict["description"]#打印mod.json中description配置内容
#mod.json取出的字符串都是unicode编码。若是中文，需要手动转成UTF-8编码。转码方法如下：
npcName = confDict["name"].encode('utf-8')
 ```
<span id="GetModJsonConfigByName"></span>
#### GetModJsonConfigByName

- 描述

    读取基于脚本根目录的[pathFile]路径下的json格式配置文件

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | scriptRootName | str | python脚本的根目录名 |
    | pathFile | str | 相对于python脚本的根目录的文件名（包括相对路径） |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict | 对应目录下json文件里面的内容信息 |
- 示例

```python
#目录结构
# |-developer_mods
#       |- neteaseNpcLobbyDev
#               mod.json
#               |- neteaseNpcLobby
#               |- modData
#                       skill1.json
import apolloCommon.commonNetgameApi as commonNetgameApi
confDict = commonNetgameApi.GetModJsonConfig("neteaseNpcLobby", "modData/skill1.json")
print confDict # 打印skill1.json文件的内容
#json取出的字符串都是unicode编码。若是中文，需要手动转成UTF-8编码。转码方法如下：
npcName = confDict["name"].encode('utf-8')
 ```
<span id="GetModScriptRootDir"></span>
#### GetModScriptRootDir

- 描述

    获取脚本根目录的绝对路径。要求mod已经被加载

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | scriptRootName | str | python脚本的根目录名 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 脚本根目录的绝对路径 |
- 示例

```python
#目录结构
# |-developer_mods
#       |- neteaseNpcLobbyDev
#               mod.json
#               |- neteaseNpcLobby
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.GetModScriptRootDir("neteaseNpcLobby")
#结果:/home/fuzhu/netgame/app/template/lobby/lobby_lobby_2000000/developer_mods/neteaseNpcLobbyDev/
 ```
<span id="GetServerType"></span>
#### GetServerType

- 描述

    获取本服的服务器类型，对应MCStudio中配置：服务器配置->游戏配置->类型

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 服务器类型 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.GetServerType() #结果是:"gameBattleA"
 ```
<span id="OpenAsyncTaskSlowCheck"></span>
#### OpenAsyncTaskSlowCheck

- 描述

    启动每帧检查异步线程池中的任务，并且打印执行时间超过指定时间且尚未完成的任务，此功能消耗较大，仅建议在测试阶段和遇到线上紧急问题时启用

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | interval | float | 任务限制时间，单个任务进入异步线程池排队+执行时间超过此时间还没有完成的，会以warning日志的形式输出 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.OpenAsyncTaskSlowCheck(0.01)
 ```
<span id="StartDatabaseProfile"></span>
#### StartDatabaseProfile

- 描述

    开始记录数据库连接池请求信息统计，启动后调用[StopDatabaseMysqlProfile(db)](#StopDatabaseMysqlProfile)即可获取两个函数调用之间数据库连接池请求记录信息

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | db | str | 数据库连接池类型，mysql/redis/mongo |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.StartDatabaseProfile("mysql")
# 之后通过计时器或者其他触发方式调用StopDatabaseMysqlProfile
result = commonNetgameApi.StopDatabaseMysqlProfile("mysql")
for single in result:
        action = single["action"]
        if action == "executefunc":
                print "do {} func={} orderKey={} cost={}s ret={}".format(action, single["func"], single["orderKey"], single["costTp"], single["ret"])
        else:
                print "do {} orderKey={} cost={}s ret={}".format(action, single["orderKey"], single["costTp"], single["ret"])
 ```
<span id="StartYappiProfile"></span>
#### StartYappiProfile

- 描述

    开始启动服务端脚本性能分析，启动后调用[StopYappiProfile(path)](#StopYappiProfile)即可在路径path生成函数性能火焰图

- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.StartYappiProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopYappiProfile
commonNetgameApi.StopYappiProfile()
 ```
<span id="StopDatabaseMysqlProfile"></span>
#### StopDatabaseMysqlProfile

- 描述

    停止记录数据库连接池请求信息并输出统计结果，与[StartDatabaseProfile(db)](#StartDatabaseProfile)配合使用，输出结果为字典，具体见示例

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | db | str | 数据库连接池类型，mysql/redis/mongo |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | list | 数据库连接池请求统计信息，具体见示例，假如没有调用过StartDatabaseProfile，则返回为None |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.StartDatabaseProfile("mysql")
# 之后通过计时器或者其他触发方式调用StopDatabaseMysqlProfile
result = commonNetgameApi.StopDatabaseMysqlProfile("mysql")
for single in result:
        action = single["action"]
        if action == "executefunc":
                print "do {} func={} orderKey={} cost={}s".format(action, single["func"], single["orderKey"], single["costTp"])
        else:
                print "do {} orderKey={} cost={}s".format(action, single["orderKey"], single["costTp"])
 ```
<span id="StopYappiProfile"></span>
#### StopYappiProfile

- 描述

    停止服务端脚本性能分析并生成火焰图，与[StartYappiProfile()](#StartYappiProfile)配合使用

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | fileName | str | 具体路径，相对于Apollo服务端启动目录的路径，默认为"flamegraph.svg"，位于Apollo服务端启动目录下，自定义路径请确保文件后缀名为".svg" |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | bool | 执行结果 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.StartYappiProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopYappiProfile
commonNetgameApi.StopYappiProfile()
 ```
<span id="UnicodeConvert"></span>
#### UnicodeConvert

- 描述

    递归转换输入数据中的所有unicode格式的字符串为utf-8格式

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | input | dict/list/tuple/str/unicode | 需要转换的输入数据 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | dict/list/tuple/str/unicode | 和输入数据格式相同，其中的unicode格式的字符串会被转换为utf-8格式 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
unicodeStr = "我是unicode编码的".decode("utf-8")
input = {
        "a1": unicodeStr,
        "a2": [unicodeStr, unicodeStr],
        "a3": (unicodeStr, unicodeStr),
}
ret = commonNetgameApi.UnicodeConvert(input)
 ```
<span id="世界"></span>
### 世界

<span id="AddRepeatedTimer"></span>
#### AddRepeatedTimer

- 描述

    添加服务端触发的定时器，重复执行

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | delay | float | 延迟时间，单位秒 |
    | func | func | 定时器触发函数 |
    | *args | *args | 变长参数，可以不设置 |
    | **kwargs | **kwargs | 字典变长参数，可以不设置 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | timer | 返回单次触发的定时器 |
- 示例

```python
def doRepeatPrint(info):
        print "doRepeatPrint", info
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.AddRepeatedTimer(2.0, doRepeatPrint, "this is repeat timer")
 ```
<span id="AddTimer"></span>
#### AddTimer

- 描述

    添加服务端触发的定时器，非重复

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | delay | float | 延迟时间，单位秒 |
    | func | func | 定时器触发函数 |
    | *args | *args | 变长参数，可以不设置 |
    | **kwargs | **kwargs | 字典变长参数，可以不设置 |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | timer | 返回单次触发的定时器 |
- 示例

```python
def doOncePrint(info):
        print "doOncePrint", info
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.AddTimer(5.0, doOncePrint, "this is once timer")
 ```
<span id="CancelTimer"></span>
#### CancelTimer

- 描述

    取消定时器

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | timer | timer对象 | AddTimer和AddRepeatedTimer时返回的定时器对象 |
- 返回值

    无
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.CancelTimer(timer)
 ```
<span id="玩家"></span>
### 玩家

<span id="GetOnlineKey"></span>
#### GetOnlineKey

- 描述

    输入玩家uid，返回此玩家保存在redis中的在线标识的key

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | uid | int/long | 玩家的uid |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 此玩家保存在redis中的在线标识的key；它是个hash表，包含两个hash key:serverid,proxyid，假如无法获取到或者只获取到proxyid获取不到serverid，说明此玩家当前不在线 |
- 示例

```python
import apolloCommon.commonNetgameApi as commonNetgameApi
onlineKey = commonNetgameApi.GetOnlineKey(123)
 ```
<span id="GetOnlineServerInfoOfMultiPlayers"></span>
#### GetOnlineServerInfoOfMultiPlayers

- 描述

    获取多个玩家在线信息

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | uids | list(int/long) | 玩家的netease uid列表，列表不能超过100，若超过100，本api会抛出Exception |
    | callback | function | 回调函数，该函数会被异步执行。函数只需要一个参数，是list(dict)类型。每个dict包含的键以及含义说明："uid":玩家的netease uid；      "serverId"：玩家所在lobby或game的服务器id， 若玩家不在线则为None;"proxyId"：客户端连接的proxy服务器id， 若玩家不在线则为None;     "protocolVersion"：玩家客户端协议版本号， 若玩家不在线则为None |
- 返回值

    无
- 示例

```python
def GetPlayersOnlineCb(args):
        #若参数是：{["uid":123, "isPeUser":True, "serverId" :2000000, "proxyId" :1000000, "protocolVersion":422},{"uid":234, "isPeUser":False, "serverId" :None, "proxyId" :None, "protocolVersion":None}]
        #参数含义：第一个玩家uid是123，玩家最后一次登录游戏是从手机端登录的，玩家是在线的，所在lobby或game的服务器id是2000000，玩家连接的proxy服务器id是1000000，玩家客户端协议版本号是422；
        # 第二个玩家玩家uid是234，玩家最后一次登录游戏是从PC端登录的，玩家是离线的
        print 'GetOnlineServerCb', args
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.GetOnlineServerInfoOfMultiPlayers([123, 234], GetPlayersOnlineCb)
 ```
<span id="GetOnlineServerInfoOfPlayer"></span>
#### GetOnlineServerInfoOfPlayer

- 描述

    获取玩家在线信息

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | uid | int/long | 玩家的netease uid，玩家的唯一标识 |
    | callback | function | 回调函数，该函数会被异步执行。函数只需要一个参数，是dict类型。dict包含的键以及含义说明："uid":玩家的netease uid；  "serverId"：玩家所在lobby或game的服务器id， 若玩家不在线则为None;"proxyId"：客户端连接的proxy服务器id， 若玩家不在线则为None；   "protocolVersion"：玩家客户端协议版本号， 若玩家不在线则为None |
- 返回值

    无
- 示例

```python
def GetOnlineCb(args):
        #若参数是：{"uid":123, "isPeUser":True, "serverId" :2000000, "proxyId" :1000000, "protocolVersion":422}
        #参数含义：玩家uid是123，玩家最后一次登录游戏是从手机端登录的，玩家是在线的，所在lobby或game的服务器id是2000000，玩家连接的proxy服务器id是1000000，玩家客户端协议版本号是422
        #若参数是：{"uid":123, "isPeUser":False, "serverId" :None, "proxyId" :None, "protocolVersion":None}
        #参数含义：玩家uid是123，玩家最后一次登录游戏是从PC端登录的，玩家是离线的
        #参数含义：isPeUser的值是None的话，说明此玩家从来没有登录过本游戏
        print 'GetOnlineServerCb', args
import apolloCommon.commonNetgameApi as commonNetgameApi
commonNetgameApi.GetOnlineServerInfoOfPlayer(123, GetOnlineCb)
 ```
<span id="GetWeekOnlineKey"></span>
#### GetWeekOnlineKey

- 描述

    输入玩家uid，返回此玩家保存在redis中的本周的在线时间

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | uid | int/long | 玩家的uid |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | str | 此玩家保存在redis中的本周在线时间的key；它是个string，转化为int后就是此玩家本周在线时间的秒数 |
<span id="ToPcUid"></span>
#### ToPcUid

- 描述

    将玩家的uid转换为pc平台的uid

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | uid | int/long | 玩家的uid |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int/long | pc平台的玩家uid |
<span id="ToPeUid"></span>
#### ToPeUid

- 描述

    将玩家的uid转换为pe平台的uid

- 参数

    | 参数名 | 数据类型 | 说明 |
    | :--- | :--- | :--- |
    | uid | int/long | 玩家的uid |
- 返回值

    | 数据类型 | 说明 |
    | :--- | :--- |
    | int/long | pe平台的玩家uid |
