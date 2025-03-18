# Python模块白名单

由于平台升级了违规模块的检测力度，从2.9 版本开始，除**模块白名单**以外的模块将不允许使用。具体可供使用的模块白名单如下：

> 注意：该限制不包括开发者**自定义的模块和接口**



| 白名单                                                | 白名单                                                | 白名单                                            |
| ----------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------- |
| __future__                                            | mod.server.component.actorPushableCompServer          | client.component.particleSystemCompClient         |
| _md5                                                  | mod.server.component.aiCommandCompServer              | client.component.particleTransComp                |
| _random                                               | mod.server.component.attrCompServer                   | client.component.playerAnimCompClient             |
| logging                                               | mod.server.component.auxValueCompServer               | client.component.playerCompClient                 |
| mod_log                                               | mod.server.component.biomeCompServer                  | client.component.playerViewCompClient             |
| traceback                                             | mod.server.component.blockCompServer                  | client.component.posCompClient                    |
| random                                                | mod.server.component.blockEntityExDataCompServer      | client.component.postProcessControlComp           |
| json                                                  | mod.server.component.blockInfoCompServer              | client.component.queryVariableCompClient          |
| math                                                  | mod.server.component.blockStateCompServer             | client.component.recipeCompClient                 |
| time                                                  | mod.server.component.blockUseEventWhiteListCompServer | client.component.rideCompClient                   |
| copy                                                  | mod.server.component.breathCompServer                 | client.component.rotCompClient                    |
| base64                                                | mod.server.component.bulletAttributesCompServer       | client.component.skyRenderCompClient              |
| bisect                                                | mod.server.component.chatExtensionCompServer          | client.component.tameCompClient                   |
| calendar                                              | mod.server.component.chestContainerCompServer         | client.component.textBoardCompClient              |
| datetime                                              | mod.server.component.chunkSourceComp                  | client.component.textNotifyCompClient             |
| re                                                    | mod.server.component.collisionBoxCompServer           | client.component.timeCompClient                   |
| Queue                                                 | mod.server.component.commandCompServer                | client.component.virtualWorldCompClient           |
| string                                                | mod.server.component.controlAiCompServer              | server                                            |
| struct                                                | mod.server.component.dimensionCompServer              | server.extraServerApi                             |
| types                                                 | mod.server.component.effectCompServer                 | server.serverEvent                                |
| weakref                                               | mod.server.component.engineCompFactoryServer          | server.blockEntityData                            |
| itertools                                             | mod.server.component.engineTypeCompServer             | server.gamePlay                                   |
| fnmatch                                               | mod.server.component.entityComponentServer            | server.gamePlay.AI                                |
| posixpath                                             | mod.server.component.entityDefinitionsCompServer      | server.gamePlay.AI.customGoal                     |
| keyword                                               | mod.server.component.entityEventCompServer            | server.system                                     |
| hashlib                                               | mod.server.component.exDataCompServer                 | server.system.serverSystem                        |
| zlib                                                  | mod.server.component.expCompServer                    | server.component                                  |
| heapq                                                 | mod.server.component.explosionCompServer              | server.component.achievementCompServer            |
| abc                                                   | mod.server.component.featureCompServer                | server.component.actionCompServer                 |
| uuid                                                  | mod.server.component.flyCompServer                    | server.component.actorCollidableCompServer        |
| functools                                             | mod.server.component.gameCompServer                   | server.component.actorLootCompServer              |
| collections                                           | mod.server.component.gravityCompServer                | server.component.actorMotionCompServer            |
| warnings                                              | mod.server.component.httpToWebServerCompServer        | server.component.actorOwnerCompServer             |
| io                                                    | mod.server.component.hurtCompServer                   | server.component.actorPushableCompServer          |
| gzip                                                  | mod.server.component.interactCompServer               | server.component.aiCommandCompServer              |
| singleton                                             | mod.server.component.itemBannedCompServer             | server.component.attrCompServer                   |
| threading                                             | mod.server.component.itemCompServer                   | server.component.auxValueCompServer               |
| binascii                                              | mod.server.component.levelCompServer                  | server.component.biomeCompServer                  |
| cStringIO                                             | mod.server.component.lootCompServer                   | server.component.blockCompServer                  |
| contextlib                                            | mod.server.component.mobSpawnCompServer               | server.component.blockEntityExDataCompServer      |
| builtin_modules._inspect                              | mod.server.component.modAttrCompServer                | server.component.blockInfoCompServer              |
| builtin_modules._operator                             | mod.server.component.modelCompServer                  | server.component.blockStateCompServer             |
| mod.builtin_modules._inspect                          | mod.server.component.moveToCompServer                 | server.component.blockUseEventWhiteListCompServer |
| mod.builtin_modules._operator                         | mod.server.component.msgCompServer                    | server.component.breathCompServer                 |
| mod                                                   | mod.server.component.nameCompServer                   | server.component.bulletAttributesCompServer       |
| mod.client                                            | mod.server.component.persistenceCompServer            | server.component.chatExtensionCompServer          |
| mod.client.extraClientApi                             | mod.server.component.petCompServer                    | server.component.chestContainerCompServer         |
| mod.client.clientEvent                                | mod.server.component.playerCompServer                 | server.component.chunkSourceComp                  |
| mod.client.ui                                         | mod.server.component.portalCompServer                 | server.component.collisionBoxCompServer           |
| mod.client.ui.screenNode                              | mod.server.component.posCompServer                    | server.component.commandCompServer                |
| mod.client.ui.screenController                        | mod.server.component.projectileCompServer             | server.component.controlAiCompServer              |
| mod.client.ui.viewBinder                              | mod.server.component.recipeCompServer                 | server.component.dimensionCompServer              |
| mod.client.ui.viewRequest                             | mod.server.component.redStoneCompServer               | server.component.effectCompServer                 |
| mod.client.ui.NativeScreenManager                     | mod.server.component.rideCompServer                   | server.component.engineCompFactoryServer          |
| mod.client.ui.CustomUIControlProxy                    | mod.server.component.rotCompServer                    | server.component.engineTypeCompServer             |
| mod.client.ui.CustomUIScreenProxy                     | mod.server.component.scaleCompServer                  | server.component.entityComponentServer            |
| mod.client.ui.miniMapBaseScreen                       | mod.server.component.shareableCompServer              | server.component.entityDefinitionsCompServer      |
| mod.client.ui.controls                                | mod.server.component.tagCompServer                    | server.component.entityEventCompServer            |
| mod.client.ui.controls.baseUIControl                  | mod.server.component.tameCompServer                   | server.component.exDataCompServer                 |
| mod.client.ui.controls.buttonUIControl                | mod.server.component.timeCompServer                   | server.component.expCompServer                    |
| mod.client.ui.controls.gridUIControl                  | mod.server.component.weatherCompServer                | server.component.explosionCompServer              |
| mod.client.ui.controls.imageUIControl                 | mod.common                                            | server.component.featureCompServer                |
| mod.client.ui.controls.inputPanelUIControl            | mod.common.mod                                        | server.component.flyCompServer                    |
| mod.client.ui.controls.itemRendererUIControl          | mod.common.minecraftEnum                              | server.component.gameCompServer                   |
| mod.client.ui.controls.labelUIControl                 | mod.common.EntityType                                 | server.component.gravityCompServer                |
| mod.client.ui.controls.minimapUIControl               | mod.common.EnchantType                                | server.component.httpToWebServerCompServer        |
| mod.client.ui.controls.neteaseComboBoxUIControl       | mod.common.ItemType                                   | server.component.hurtCompServer                   |
| mod.client.ui.controls.neteasePaperDollUIControl      | mod.common.BiomeType                                  | server.component.interactCompServer               |
| mod.client.ui.controls.progressBarUIControl           | mod.common.SysSoundType                               | server.component.itemBannedCompServer             |
| mod.client.ui.controls.scrollViewUIControl            | mod.common.BlockType                                  | server.component.itemCompServer                   |
| mod.client.ui.controls.selectionWheelUIControl        | mod.common.EffectType                                 | server.component.levelCompServer                  |
| mod.client.ui.controls.sliderUIControl                | mod.common.KeyBoardType                               | server.component.lootCompServer                   |
| mod.client.ui.controls.stackPanelUIControl            | mod.common.utils                                      | server.component.mobSpawnCompServer               |
| mod.client.ui.controls.switchToggleUIControl          | mod.common.utils.mcmath                               | server.component.modAttrCompServer                |
| mod.client.ui.controls.textEditBoxUIControl           | mod.common.utils.colorUtil                            | server.component.modelCompServer                  |
| mod.client.system                                     | mod.common.utils.timer                                | server.component.moveToCompServer                 |
| mod.client.system.clientSystem                        | mod.common.entity                                     | server.component.msgCompServer                    |
| mod.client.component                                  | mod.common.entity.entityconst                         | server.component.nameCompServer                   |
| mod.client.component.achievementCompClient            | mod.common.component                                  | server.component.persistenceCompServer            |
| mod.client.component.actionCompClient                 | mod.common.component.baseComponent                    | server.component.petCompServer                    |
| mod.client.component.actorMotionCompClient            | mod.common.component.blockPaletteComp                 | server.component.playerCompServer                 |
| mod.client.component.actorRenderCompClient            | mod.common.system                                     | server.component.portalCompServer                 |
| mod.client.component.attrCompClient                   | mod.common.system.baseSystem                          | server.component.posCompServer                    |
| mod.client.component.audioCustomCompClient            | client                                                | server.component.projectileCompServer             |
| mod.client.component.auxValueCompClient               | client.extraClientApi                                 | server.component.recipeCompServer                 |
| mod.client.component.biomeCompClient                  | client.clientEvent                                    | server.component.redStoneCompServer               |
| mod.client.component.blockCompClient                  | client.ui                                             | server.component.rideCompServer                   |
| mod.client.component.blockGeometryCompClient          | client.ui.screenNode                                  | server.component.rotCompServer                    |
| mod.client.component.blockInfoCompClient              | client.ui.screenController                            | server.component.scaleCompServer                  |
| mod.client.component.blockUseEventWhiteListCompClient | client.ui.viewBinder                                  | server.component.shareableCompServer              |
| mod.client.component.brightnessCompClient             | client.ui.viewRequest                                 | server.component.tagCompServer                    |
| mod.client.component.cameraCompClient                 | client.ui.NativeScreenManager                         | server.component.tameCompServer                   |
| mod.client.component.chunkSourceCompClient            | client.ui.controls                                    | server.component.timeCompServer                   |
| mod.client.component.collisionBoxCompClient           | client.ui.controls.baseUIControl                      | server.component.weatherCompServer                |
| mod.client.component.configCompClient                 | client.ui.controls.buttonUIControl                    | common                                            |
| mod.client.component.deviceCompClient                 | client.ui.controls.gridUIControl                      | common.mod                                        |
| mod.client.component.effectCompClient                 | client.ui.controls.imageUIControl                     | common.minecraftEnum                              |
| mod.client.component.engineCompFactoryClient          | client.ui.controls.inputPanelUIControl                | common.EntityType                                 |
| mod.client.component.engineEffectBindControlComp      | client.ui.controls.itemRendererUIControl              | common.EnchantType                                |
| mod.client.component.engineTypeCompClient             | client.ui.controls.labelUIControl                     | common.ItemType                                   |
| mod.client.component.fogCompClient                    | client.ui.controls.minimapUIControl                   | common.BiomeType                                  |
| mod.client.component.frameAniControlComp              | client.ui.controls.neteaseComboBoxUIControl           | common.SysSoundType                               |
| mod.client.component.frameAniEntityBindComp           | client.ui.controls.neteasePaperDollUIControl          | common.BlockType                                  |
| mod.client.component.frameAniSkeletonBindComp         | client.ui.controls.progressBarUIControl               | common.EffectType                                 |
| mod.client.component.frameAniTransComp                | client.ui.controls.scrollViewUIControl                | common.KeyBoardType                               |
| mod.client.component.gameCompClient                   | client.ui.controls.selectionWheelUIControl            | common.utils                                      |
| mod.client.component.healthCompClient                 | client.ui.controls.sliderUIControl                    | common.utils.mcmath                               |
| mod.client.component.itemCompClient                   | client.ui.controls.stackPanelUIControl                | common.utils.colorUtil                            |
| mod.client.component.modAttrCompClient                | client.ui.controls.switchToggleUIControl              | common.utils.timer                                |
| mod.client.component.modelCompClient                  | client.ui.controls.textEditBoxUIControl               | common.entity                                     |
| mod.client.component.nameCompClient                   | client.system                                         | common.entity.entityconst                         |
| mod.client.component.neteaseShopCompClient            | client.system.clientSystem                            | common.component                                  |
| mod.client.component.operationCompClient              | client.component                                      | common.component.baseComponent                    |
| mod.client.component.particleControlComp              | client.component.achievementCompClient                | common.component.blockPaletteComp                 |
| mod.client.component.particleEntityBindComp           | client.component.actionCompClient                     | common.system                                     |
| mod.client.component.particleSkeletonBindComp         | client.component.actorMotionCompClient                | common.system.baseSystem                          |
| mod.client.component.particleSystemCompClient         | client.component.actorRenderCompClient                | Preset                                            |
| mod.client.component.particleTransComp                | client.component.attrCompClient                       | Preset.Parts                                      |
| mod.client.component.playerAnimCompClient             | client.component.audioCustomCompClient                | Preset.Parts.WorldPart                            |
| mod.client.component.playerCompClient                 | client.component.auxValueCompClient                   | Preset.Parts.TriggerPart                          |
| mod.client.component.playerViewCompClient             | client.component.biomeCompClient                      | Preset.Parts.PostprocessPart                      |
| mod.client.component.posCompClient                    | client.component.blockCompClient                      | Preset.Parts.PortalPart                           |
| mod.client.component.postProcessControlComp           | client.component.blockGeometryCompClient              | Preset.Parts.PlayerBasicPart                      |
| mod.client.component.queryVariableCompClient          | client.component.blockInfoCompClient                  | Preset.Parts.EntityBasePart                       |
| mod.client.component.recipeCompClient                 | client.component.blockUseEventWhiteListCompClient     | Preset.Parts.CameraTrackPart                      |
| mod.client.component.rideCompClient                   | client.component.brightnessCompClient                 | Preset.Parts.NavPointsPart                        |
| mod.client.component.rotCompClient                    | client.component.cameraCompClient                     | Preset.Model                                      |
| mod.client.component.skyRenderCompClient              | client.component.chunkSourceCompClient                | Preset.Model.BoxData                              |
| mod.client.component.tameCompClient                   | client.component.collisionBoxCompClient               | Preset.Model.PresetBase                           |
| mod.client.component.textBoardCompClient              | client.component.configCompClient                     | Preset.Model.TransformObject                      |
| mod.client.component.textNotifyCompClient             | client.component.deviceCompClient                     | Preset.Model.Transform                            |
| mod.client.component.timeCompClient                   | client.component.effectCompClient                     | Preset.Model.SdkInterface                         |
| mod.client.component.virtualWorldCompClient           | client.component.engineCompFactoryClient              | Preset.Model.PartBase                             |
| mod.server                                            | client.component.engineEffectBindControlComp          | Preset.Model.GameObject                           |
| mod.server.extraServerApi                             | client.component.engineTypeCompClient                 | Preset.Model.Entity                               |
| mod.server.serverEvent                                | client.component.fogCompClient                        | Preset.Model.Entity.EntityPreset                  |
| mod.server.blockEntityData                            | client.component.frameAniControlComp                  | Preset.Model.Entity.EntityObject                  |
| mod.server.gamePlay                                   | client.component.frameAniEntityBindComp               | Preset.Model.Player                               |
| mod.server.gamePlay.AI                                | client.component.frameAniSkeletonBindComp             | Preset.Model.Player.PlayerObject                  |
| mod.server.gamePlay.AI.customGoal                     | client.component.frameAniTransComp                    | Preset.Model.Player.PlayerPreset                  |
| mod.server.system                                     | client.component.gameCompClient                       | Preset.Model.Block                                |
| mod.server.system.serverSystem                        | client.component.healthCompClient                     | Preset.Model.Block.BlockPreset                    |
| mod.server.component                                  | client.component.itemCompClient                       | Preset.Model.Blueprint                            |
| mod.server.component.achievementCompServer            | client.component.modAttrCompClient                    | Preset.Model.Blueprint.BaseUIBlueprintScreen      |
| mod.server.component.actionCompServer                 | client.component.modelCompClient                      | Preset.Model.Blueprint.BaseUIBlueprintPart        |
| mod.server.component.actorCollidableCompServer        | client.component.nameCompClient                       | Preset.Model.Effect                               |
| mod.server.component.actorLootCompServer              | client.component.neteaseShopCompClient                | Preset.Model.Effect.EffectObject                  |
| mod.server.component.actorMotionCompServer            | client.component.operationCompClient                  | Preset.Model.Effect.EffectPreset                  |
| mod.server.component.actorOwnerCompServer             | client.component.particleControlComp                  | Preset.Model.Textboard                            |
| ast（3.3新增）                                        | client.component.particleEntityBindComp               | Preset.Model.Textboard.TextboardObject            |
|                                                       | client.component.particleSkeletonBindComp             | Preset.Model.Textboard.TextboardPreset            |
|                                                       |                                                       | Preset.Model.UI                                   |
|                                                       |                                                       | Preset.Model.UI.UIPreset                          |
|                                                       |                                                       | Preset.Controller                                 |
|                                                       |                                                       | Preset.Controller.PresetApi                       |

若开发者需要添加用于正常功能开发的模块白名单，请联系官方人员进行反馈，经技术评估后进行添加。

## 还有解决不了的问题？

你可以通过[开发者平台 ](https://mcdev.webapp.163.com/#/square)顶部的开发者常见问题答疑的反馈其他问题进行反馈，也可直接点击[这个链接](https://mcdev.webapp.163.com/#/feedbackModal)。官方将通过开发者平台站内信与您取得联系。

或者加入开发者QQ频道，私信频道管理员【我的世界中国版】进行反馈。
