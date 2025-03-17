---
front: https://nie.res.netease.com/r/pic/20210728/2dc2a94f-71f6-4cc5-8700-3c3696f79a0c.jpg
hard: 进阶
time: 30分钟
---

# CPU优化

## 前言

CPU是设备计算力水平的代表，CPU性能越好代表相同时间内能支持的运算数量越多。无论是内存的分配与释放，渲染环境的准备与指令发送等等都需要CPU的参与，CPU的优化能对设备整体性能产生比较大的影响。

## 缓存的使用(内存换CPU)

对象的重复创建与销毁会有一定性能消耗，对于需要频繁使用的数据，建议保存起来，下次从内存取出来直接使用，是一种常用的空间换时间(内存换CPU)的优化手段，对于减少游戏卡顿有较好效果。

### 避免在tick函数内使用import

import模块的消耗并没有小到可以忽略的地步，建议挪到文件的顶部进行import。如果这样会导致循环引用，则可以将模块缓存为类的成员变量

- 错误写法:

```python
class DemoClientSystem(ClientSystem):
	def Update(self):
		# 在每帧执行的逻辑内import模块
		import mod.client.extraClientApi as clientApi
		clientApi.xxx
```

- 正确写法:

```python
# 在文件顶部import模块
import mod.client.extraClientApi as clientApi
class DemoClientSystem(ClientSystem):
	def Update(self):
		clientApi.xxx
```

如果两个模块需要相互引用，那么同时在文件顶部import对方，会导致循环引用报错，则可以用下面的方法处理：

```python
class DemoClientSystem(ClientSystem):
	def __init__(self, namespace, systemName):
		ClientSystem.__init__(self, namespace, systemName)
		# 假设当前模块与另一个otherModule模块需要相互引用
		import demoScripts.client.otherModule as otherModule
		self.otherModule = otherModule
	
	def Update(self):
		self.otherModule.xxx
```

### 避免多次初始化常量

- 错误写法:

在频繁调用的函数中进行声明，例如每次Update的时候

```python
class DemoClientSystem(ClientSystem):
	def Update(self):
		# 常量，每帧创建，实际中可能这里会是比较多的数据
		bigDict = {
			(-1, -1): 1,
			(-1, 0): 2,
			(-1, 1): 3,
			(0, -1): 4,
			(0, 0): 5,
			(0, 1): 6,
			(1, -1): 7,
			(1, 0): 8,
			(1 1): 9,
		}
		# 读取常量做一些逻辑
		do_something(bigDict)
```

- 正确写法:

包含数据比较多的一些常量，特别是List或者Dict类型的，可以放到类的__init__函数当中

```python
class DemoClientSystem(ClientSystem):
	# 构造函数
	def __init__(self, namespace, systemName):
		ClientSystem.__init__(self, namespace, systemName)
		# 在初始化时创建
		self.bigDict = {
			(-1, -1): 1,
			(-1, 0): 2,
			(-1, 1): 3,
			(0, -1): 4,
			(0, 0): 5,
			(0, 1): 6,
			(1, -1): 7,
			(1, 0): 8,
			(1 1): 9,
		}

	def Update(self):
		do_something(self.bigDict)
```

### 缓存多次用到的中间数据

一些方法多次调用的返回值是一样，可以使用临时变量缓存，不需要重复调用

- 错误写法:
```python
class DemoServerSystem(ServerSystem):
	# 监听的ServerItemUseOnEvent事件回调
	def ServerItemUseOnEvent(self, args):
		# 设置多个方块
		self.SetBlock(args['dimensionId'], (args['x']-1, args['y'], args['z']), 'minecraft:air')
		self.SetBlock(args['dimensionId'], (args['x']-1, args['y'], args['z']), 'minecraft:air')
		self.SetBlock(args['dimensionId'], (args['x'], args['y'], args['z']), 'minecraft:air')
		self.SetBlock(args['dimensionId'], (args['x'], args['y'], args['z']-1), 'minecraft:air')
		self.SetBlock(args['dimensionId'], (args['x'], args['y'], args['z']+1), 'minecraft:air')

	def SetBlock(self, dimensionId, pos, blockName):
		serverApi.GetEngineCompFactory().CreateBlockInfo(levelId).SetBlockNew(pos, {'name': blockName}, 0, dimensionId)
```

- 正确写法:

```python
# compFactory使用缓存
serverCompFactory = serverApi.GetEngineCompFactory()
class DemoServerSystem(ServerSystem):
	# 监听的ServerItemUseOnEvent事件回调
	def ServerItemUseOnEvent(self, args):
		# 对字典内的值做缓存
		dimensionId = args['dimensionId']
		x = args['x']
		y = args['y']
		z = args['z']
		self.SetBlock(dimensionId, (x-1, y, z), 'minecraft:air')
		self.SetBlock(dimensionId, (x-1, y, z), 'minecraft:air')
		self.SetBlock(dimensionId, (x, y, z), 'minecraft:air')
		self.SetBlock(dimensionId, (x, y, z-1), 'minecraft:air')
		self.SetBlock(dimensionId, (x, y, z+1), 'minecraft:air')

	def SetBlock(self, dimensionId, pos, blockName):
		serverCompFactory.CreateBlockInfo(levelId).SetBlockNew(pos, {'name': blockName}, 0, dimensionId)
```

### 使用dict代替多个else if

当条件判断的分支很多时，dict的性能会比一连串的else高很多

- 错误写法:

```python
serverCompFactory = serverApi.GetEngineCompFactory()
class DemoServerSystem(ServerSystem):
	def HandleBlocks(self, pos, dimensionId):
		# 获取方块信息
		blockIdentifier = serverCompFactory.CreateBlockInfo(levelId).GetBlockNew(pos, dimensionId)[0]
		# 根据方块类型做出不同的处理
		if blockIdentifier == "minecraft:iron_ore":
			self.handleIronBlock()
		elif blockIdentifier == "minecraft:gold_ore":
			self.handleGoldBlock()
		elif blockIdentifier == "minecraft:diamond_ore":
			self.handleDiamondBlock()
```

- 正确写法:

```python
serverCompFactory = serverApi.GetEngineCompFactory()
class DemoServerSystem(ServerSystem):
	def __init__(self):
		# 注册处理函数
		self.blockHandlers = {
			"minecraft:iron_ore": self.handleIronBlock,
			"minecraft:gold_ore": self.handleGoldBlock,
			"minecraft:diamond_ore": self.handleDiamondBlock,
		}

	def HandleBlocks(self, data):
		blockIdentifier = serverCompFactory.CreateBlockInfo(levelId).GetBlockNew(pos, dimensionId)[0]
		# 从dict中选取处理函数
		handler = self.blockHandlers.get(blockIdentifier)
		if handler:
			handler()
```

## 分帧（实时性换CPU）

同一时刻内处理大量的逻辑，容易造成卡顿。这时候需要把逻辑执行的时间错开到多帧去执行，让每一帧的任务量不要太重。

### 大批量修改数据分多帧处理

这里以方块为例：

- 错误写法:
(同一时刻全部处理，需要处理 100* 100 * 100 即一百万个方块，必然会卡)
```python
# 修改某个区域 100 * 100 * 100范围内的方块为空气
def SetBlocksToAir(self, fromPos):
	blockcomp = serverApi.CreateComponent(id, "Minecraft", "blockInfo")
	for x in range(1, 100):
		for y in range(1, 100):
			for z in range(1, 100):
				blockcomp.SetBlockNew((fromPos[0] + x, fromPos[1] + y, fromPos[2] + z), {'name':'minecraft:air'})
```

- 正确写法:
(分开每帧只处理5个)
```python
# 修改某个区域 100 * 100 * 100范围内的方块为空气
def SetBlocksToAir(self, fromPos):
	# 命令队列
	self.posList = []
	self.posIndex = 0        

	for x in range(1, 100):
		for y in range(1, 100):
			for z in range(1, 100):
				self.posList.append((fromPos[0] + x, fromPos[1] + y, fromPos[2] + z))

# 被引擎直接执行的父类的重写函数，引擎会执行该Update回调，1秒钟30帧
def Update(self):
	if self.posList:
		posListLen = len(self.posList)            
		blockcomp = serverApi.CreateComponent(id, "Minecraft", "blockInfo")
		#每帧处理5个
		handleNum = 5
		while(handleNum > 0 and self.posIndex < posListLen):                
			blockcomp.SetBlockNew(self.posList[self.posIndex], {'name':'minecraft:air'})
			self.posIndex = self.posIndex + 1
			handleNum = handleNum - 1

		# 全部处理完成
		if self.posIndex >= posListLen:
			self.posList = None
```

### 非重要逻辑降帧处理

不要每帧执行所有逻辑更新，不同的逻辑实际中根据实时性要求进行间隔更新

- 错误写法:
(每帧执行所有更新逻辑)
```python
def Update(self):
	self.do_something1()
	self.do_something2()
	self.do_something3()
```

- 正确写法:
(分开每帧只处理5个)
```python
class DemoClientSystem(ClientSystem):
	# 构造函数
	def __init__(self, namespace, systemName):
		ClientSystem.__init__(self, namespace, systemName)
		self.tick = 0

	def Update(self):
		self.tick = self.tick + 1
		# 重要逻辑每帧执行
		self.do_something1()

		if self.tick % 5 == 0:
			# 次要逻辑降帧执行
			self.do_something2()
		
		if self.tick % 10 == 0:
			# 更次要的逻辑，使用更低的帧率执行
			self.do_something3()
```

### 少用轮询逻辑

使用事件或一些适用的接口来代替每帧尝试的操作。

假想有一个需求：我想删除一个实体，但是当前这个实体没有被加载

- 错误写法：

  每帧尝试删除该实体，直到成功为止

- 推荐写法：

  1. 监听AddEntityServerEvent，在该实体的回调中删除。
  2. 如果该实体是手动创建的，可以使用SetPersistence接口将其设置为不存盘，那就不再需要处理该实体被卸载而无法删除的情况。