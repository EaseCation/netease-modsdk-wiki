# 检索试点当前结果

固定文档检索比较，非游戏功能验收；改写样本仍与试点领域相关，不是独立盲测。

每例只查询一次，Top 8；命中按需求能力计算，等价 API 算一次。字符数比较采用同一 JSON 序列化方式，不等同 token。旧 MCP 不支持端侧/预设过滤，返回参数等完整字段。

| 策略 | 必需能力命中 | 边界违规条数 | 平均返回字符 |
| --- | --- | --- | --- |
| legacy | 17/44 | 82 | 5568 |
| raw | 21/44 | 0 | 1456 |
| annotated | 38/44 | 0 | 1490 |
| coverage | 44/44 | 0 | 1555 |

| 案例 | 策略 | 命中/要求 | 返回 API | 边界问题 |
| --- | --- | --- | --- | --- |
| healing-wand | legacy | 0/6 | SetShowArmModel, SetScreenVisible, PlayerJoinMessageEvent, PlayerLeftMessageServerEvent, HideHealthGui, HideHorseHealthGui, ShowHealth, ShowHealthBar | wrong_side:SetShowArmModel, wrong_side:SetScreenVisible, wrong_side:HideHealthGui, wrong_side:HideHorseHealthGui, wrong_side:ShowHealth, wrong_side:ShowHealthBar |
| healing-wand | raw | 0/6 | PlayerJoinMessageEvent, EntityEffectDamageServerEvent, PlayerLeftMessageServerEvent, AddServerPlayerEvent, SetItemLayer, LobbyGetStorageBySort, AddEffectToEntity, AddSphereGeometry |  |
| healing-wand | annotated | 4/6 | SetOnePopupNotice, ServerItemTryUseEvent, SetAttrMaxValue, GetAttrMaxValue, GetAttrValue, NotifyOneMessage, EntityEffectDamageServerEvent, PlayerJoinMessageEvent |  |
| healing-wand | coverage | 6/6 | ServerItemTryUseEvent, SetAttrValue, GetAttrValue, GetAttrMaxValue, AddTimer, SetOnePopupNotice, SetAttrMaxValue, NotifyOneMessage |  |
| use-item | legacy | 2/2 | GetDestroyTotalTime, OpenCityProtect, PlayerUseItemToPos, GetDestroyTotalTime, UseItemToEntity, ServerItemTryUseEvent, ServerItemUseOnEvent, ItemUseOnAfterServerEvent | wrong_side:GetDestroyTotalTime |
| use-item | raw | 2/2 | ItemUseAfterServerEvent, ServerItemTryUseEvent, PlayerUseItemToPos, UseItemToEntity, GetDestroyTotalTime, ItemUseOnAfterServerEvent, ActorUseItemServerEvent, ServerItemUseOnEvent |  |
| use-item | annotated | 2/2 | ServerItemTryUseEvent, ServerItemUseOnEvent, ItemUseAfterServerEvent, PlayerUseItemToPos, UseItemToEntity, GetDestroyTotalTime, ItemUseOnAfterServerEvent, ActorUseItemServerEvent |  |
| use-item | coverage | 2/2 | ServerItemTryUseEvent, ServerItemUseOnEvent, ItemUseAfterServerEvent, PlayerUseItemToPos, UseItemToEntity, GetDestroyTotalTime, ItemUseOnAfterServerEvent, ActorUseItemServerEvent |  |
| cancel-block-use | legacy | 0/1 | PlayerAddCustomContainerItemServerEvent, PlayerRemoveCustomContainerItemServerEvent, PlayerInteractServerEvent, BlockLiquidStateChangeServerEvent, BlockLiquidStateChangeAfterServerEvent, RemoveBlockProtectField, CleanBlockProtectField, CancelShearsDestroyBlockSpeed |  |
| cancel-block-use | raw | 0/1 | StartDestroyBlockServerEvent, BlockLiquidStateChangeServerEvent, BlockLiquidStateChangeAfterServerEvent, ItemReleaseUsingServerEvent, ExtinguishFireServerEvent, PlayerRemoveCustomContainerItemServerEvent, PlayerAddCustomContainerItemServerEvent, OnFireHurtEvent |  |
| cancel-block-use | annotated | 1/1 | ServerItemUseOnEvent, StartDestroyBlockServerEvent, BlockLiquidStateChangeServerEvent, BlockLiquidStateChangeAfterServerEvent, ItemReleaseUsingServerEvent, PlayerRemoveCustomContainerItemServerEvent, ExtinguishFireServerEvent, PlayerAddCustomContainerItemServerEvent |  |
| cancel-block-use | coverage | 1/1 | ServerItemUseOnEvent, StartDestroyBlockServerEvent, BlockLiquidStateChangeServerEvent, BlockLiquidStateChangeAfterServerEvent, ItemReleaseUsingServerEvent, PlayerRemoveCustomContainerItemServerEvent, ExtinguishFireServerEvent, PlayerAddCustomContainerItemServerEvent |  |
| reward-partial | legacy | 0/2 | GetVisible, SetVisible, IsInApollo, SetEntityItem, GetSliderValue, GetEditText, GetText, SetTouchEnable | wrong_side:GetVisible, wrong_side:SetVisible, wrong_side:GetSliderValue, wrong_side:GetEditText, wrong_side:GetText, wrong_side:SetTouchEnable |
| reward-partial | raw | 1/2 | SpawnItemToPlayerInv, SetMaxStackSize, SetEntityLookAtPos, SetPlayerJumpable, SetActorPushable, SetPlayerMovable, MayPlace, SetActorCollidable |  |
| reward-partial | annotated | 1/2 | SpawnItemToPlayerInv, SetMaxStackSize, SetEntityLookAtPos, SetPlayerJumpable, SetActorPushable, SetPlayerMovable, MayPlace, SetActorCollidable |  |
| reward-partial | coverage | 2/2 | SpawnItemToPlayerInv, GetPlayerItem, SetMaxStackSize, SetEntityLookAtPos, SetPlayerJumpable, SetActorPushable, SetPlayerMovable, MayPlace |  |
| drop-versus-inventory | legacy | 0/3 | OnContainerFillLoottableServerEvent, GetParticleEffectIdInBlockEntity, GetFrameEffectIdInBlockEntity, GetScrollViewContentPath, GetPlayerExp, GetLocalPosListOfBlocks, GetPlayerExp, GetFrameItemDropChange | wrong_side:GetParticleEffectIdInBlockEntity, wrong_side:GetFrameEffectIdInBlockEntity, wrong_side:GetScrollViewContentPath, wrong_side:GetPlayerExp |
| drop-versus-inventory | raw | 0/3 | OnContainerFillLoottableServerEvent, OpenNeteaseContainer, EntityDieLoottableServerEvent |  |
| drop-versus-inventory | annotated | 2/3 | SpawnItemToPlayerInv, CreateEngineItemEntity, OpenNeteaseContainer, OnContainerFillLoottableServerEvent, EntityDieLoottableServerEvent |  |
| drop-versus-inventory | coverage | 3/3 | SpawnItemToPlayerInv, CreateEngineItemEntity, GetPlayerItem, OpenNeteaseContainer, OnContainerFillLoottableServerEvent, EntityDieLoottableServerEvent |  |
| repeat-cleanup | legacy | 2/3 | CancelTimer, CancelTimer, AddRepeatedTimer, AddRepeatedTimer, RemovePlayerAOIClientEvent, PlayerLeftMessageServerEvent, RegisterEntityAOIEvent, CreateEntityAOI | wrong_side:CancelTimer, wrong_side:AddRepeatedTimer, wrong_side:RemovePlayerAOIClientEvent |
| repeat-cleanup | raw | 2/3 | CancelTimer, PlayerLeftMessageServerEvent, AddRepeatedTimer, AddTimer, CreateEntityAOI, ItemReleaseUsingServerEvent, CommandEvent, PlayerPickupArrowServerEvent |  |
| repeat-cleanup | annotated | 3/3 | AddRepeatedTimer, CancelTimer, DelServerPlayerEvent, PlayerLeftMessageServerEvent, AddTimer, CreateEntityAOI, SetPlayerGameType, ItemReleaseUsingServerEvent |  |
| repeat-cleanup | coverage | 3/3 | AddRepeatedTimer, CancelTimer, DelServerPlayerEvent, PlayerLeftMessageServerEvent, AddTimer, CreateEntityAOI, SetPlayerGameType, ItemReleaseUsingServerEvent |  |
| scroll-input-mode | legacy | 1/1 | GetScrollViewContentPath, PlayerInteractServerEvent, GetClipsChildren, GetModConfigJson, HideExpGui, AddCommonPhrases, StartDestroyBlockServerEvent, TapBeforeClientEvent | wrong_side:PlayerInteractServerEvent, wrong_side:AddCommonPhrases, wrong_side:StartDestroyBlockServerEvent |
| scroll-input-mode | raw | 1/1 | GetScrollViewContentPath, SetCanAttack, SetVisible, SetButtonTouchMoveInCallback, SetButtonTouchMoveOutCallback, SetButtonTouchMoveCallback, HideExpGui, StartDestroyBlockClientEvent |  |
| scroll-input-mode | annotated | 1/1 | GetScrollViewContentPath, SetCanAttack, SetButtonTouchMoveInCallback, SetButtonTouchMoveOutCallback, SetVisible, SetButtonTouchMoveCallback, HideExpGui, StartDestroyBlockClientEvent |  |
| scroll-input-mode | coverage | 1/1 | GetScrollViewContentPath, SetCanAttack, SetButtonTouchMoveInCallback, SetButtonTouchMoveOutCallback, SetVisible, SetButtonTouchMoveCallback, HideExpGui, StartDestroyBlockClientEvent |  |
| ui-buy | legacy | 0/2 | ServerBlockUseEvent, ServerItemTryUseEvent, LiquidClippedServerEvent, StoreBuySuccServerEvent, OnItemSlotButtonClickedEvent, HideHudGUI, HideWalkGui, HideJumpGui | wrong_side:ServerBlockUseEvent, wrong_side:ServerItemTryUseEvent, wrong_side:LiquidClippedServerEvent, wrong_side:StoreBuySuccServerEvent |
| ui-buy | raw | 0/2 | HideNeteaseStoreGui, ButtonEventType, BroadcastEvent, ItemAcquisitionMethod, ClientItemUseOnEvent, HideInteractGui, AniCheatMove, SerializeBlockPalette |  |
| ui-buy | annotated | 2/2 | SetButtonTouchUpCallback, NotifyToServer, AddTouchEventParams, HideNeteaseStoreGui, ButtonEventType, BroadcastEvent, ClientItemUseOnEvent, ItemAcquisitionMethod |  |
| ui-buy | coverage | 2/2 | SetButtonTouchUpCallback, NotifyToServer, AddTouchEventParams, HideNeteaseStoreGui, ButtonEventType, BroadcastEvent, ClientItemUseOnEvent, ItemAcquisitionMethod |  |
| container-state | legacy | 0/1 | SetBoardRot, SetBlockStates, ChangePlayerItemTipsAndExtraId, ChangeItemTexture, GetBlockStates, GetBlockAuxValueFromStates, ClientChestOpenEvent, ClientChestCloseEvent | wrong_side:SetBoardRot, wrong_side:ChangeItemTexture, wrong_side:ClientChestOpenEvent, wrong_side:ClientChestCloseEvent |
| container-state | raw | 0/1 | SetBlockStates, GetBlockAuxValueFromStates, GetBlockStates, GetBlockStatesFromAuxValue, GetBlockNew, CleanBlockTileEntityCustomData, SpawnItemToContainer, StartDestroyBlockServerEvent |  |
| container-state | annotated | 1/1 | SetBlockNew, SetBlockStates, GetContainerItem, GetBlockStates, GetBlockAuxValueFromStates, GetBlockStatesFromAuxValue, CleanBlockTileEntityCustomData, SpawnItemToContainer |  |
| container-state | coverage | 1/1 | SetBlockNew, SetBlockStates, GetContainerItem, GetBlockStates, GetBlockAuxValueFromStates, GetBlockStatesFromAuxValue, CleanBlockTileEntityCustomData, SpawnItemToContainer |  |
| heal-paraphrase | legacy | 1/3 | HealthChangeBeforeServerEvent, SetEntityLimit, SetFishingLineMax, GetAttrMaxValue, HideHealthGui, HideHorseHealthGui, GetPlayerHealthLevel, SetPlayerHealthLevel | wrong_side:GetAttrMaxValue, wrong_side:HideHealthGui, wrong_side:HideHorseHealthGui |
| heal-paraphrase | raw | 1/3 | PlayerHungerChangeServerEvent, SetFishingLineMax, GetMobStrengthMax, SetAttrMaxValue, SetEntityLimit, SetMaxStackSize, SetMobStrengthMax, SetAttrValue |  |
| heal-paraphrase | annotated | 2/3 | GetAttrMaxValue, SetAttrMaxValue, PlayerHungerChangeServerEvent, SetAttrValue, SetFishingLineMax, GetMobStrengthMax, CreateEngineEntityByTypeStr, SetEntityLimit |  |
| heal-paraphrase | coverage | 3/3 | SetAttrValue, GetAttrValue, GetAttrMaxValue, SetAttrMaxValue, PlayerHungerChangeServerEvent, SetFishingLineMax, GetMobStrengthMax, CreateEngineEntityByTypeStr |  |
| reward-paraphrase | legacy | 0/2 | SetAnimation, UIContainerItemChangedServerEvent, OnCarriedNewItemChangedClientEvent, RemovePlayerAnimationFromState, GetUserDataInEvent, GetUserDataInEvent, HideNameTag, EnableKeepInventory | wrong_side:SetAnimation, wrong_side:OnCarriedNewItemChangedClientEvent, wrong_side:RemovePlayerAnimationFromState, wrong_side:GetUserDataInEvent, wrong_side:HideNameTag |
| reward-paraphrase | raw | 1/2 | UIContainerItemChangedServerEvent, ContainerItemChangedServerEvent, ServerPlayerTryTouchEvent, PlayerPickupArrowServerEvent, SpawnItemToPlayerInv, ItemReleaseUsingServerEvent, PlayerUseItemToPos, OnNewArmorExchangeServerEvent |  |
| reward-paraphrase | annotated | 1/2 | SpawnItemToPlayerInv, UIContainerItemChangedServerEvent, PlayerRespawnFinishServerEvent, PlayerRespawnEvent, ContainerItemChangedServerEvent, ServerPlayerTryTouchEvent, PlayerPickupArrowServerEvent, ItemReleaseUsingServerEvent |  |
| reward-paraphrase | coverage | 2/2 | GetPlayerItem, SpawnItemToPlayerInv, UIContainerItemChangedServerEvent, PlayerRespawnFinishServerEvent, PlayerRespawnEvent, ContainerItemChangedServerEvent, ServerPlayerTryTouchEvent, PlayerPickupArrowServerEvent |  |
| scroll-paraphrase | legacy | 1/1 | GetScrollViewContentPath, SetScrollViewPos, GetScrollViewPos, SetScrollViewPercentValue, GetScrollViewPercentValue, GetScrollViewContentControl, asScrollView, OnLocalPlayerStopLoading |  |
| scroll-paraphrase | raw | 1/1 | GetOptionShowNameByIndex, GetOptionIndexByShowName, GetScrollViewContentPath, CreateChildControl, RemoveChildControl, GetChildByName, SetSize, SetSprite |  |
| scroll-paraphrase | annotated | 1/1 | GetScrollViewContentPath, GetOptionShowNameByIndex, GetOptionIndexByShowName, CreateChildControl, RemoveChildControl, GetChildByName, SetSize, SetSprite |  |
| scroll-paraphrase | coverage | 1/1 | GetScrollViewContentPath, GetOptionShowNameByIndex, GetOptionIndexByShowName, CreateChildControl, RemoveChildControl, GetChildByName, SetSize, SetSprite |  |
| exact-timer | legacy | 1/1 | AddTimer, AddTimer, AddRepeatedTimer, AddRepeatedTimer, AddEntityTickEventWhiteList, AddEntityTag, AddEntityMarker, AddEntityTextMarker | wrong_side:AddTimer, wrong_side:AddRepeatedTimer, wrong_side:AddEntityMarker, wrong_side:AddEntityTextMarker |
| exact-timer | raw | 1/1 | AddTimer |  |
| exact-timer | annotated | 1/1 | AddTimer |  |
| exact-timer | coverage | 1/1 | AddTimer |  |
| entity-position | legacy | 1/1 | GetPos, GetPos, GetFootPos, GetFootPos, GetLocalPosFromWorld, GetWorldPosFromLocal, GetEntityBoneWorldPos, GetLocalPosFromWorld | wrong_side:GetPos, wrong_side:GetFootPos, wrong_side:GetLocalPosFromWorld, wrong_side:GetWorldPosFromLocal, wrong_side:GetEntityBoneWorldPos |
| entity-position | raw | 1/1 | GetPos, GetFootPos, SetPos, GetEntityNBTTags, GetSize, GetEntityTags, GetAllProperties, IsEntityOnFire |  |
| entity-position | annotated | 1/1 | GetPos, GetFootPos, SetPos, GetEntityNBTTags, GetSize, GetAllProperties, GetEntityTags, IsEntityOnFire |  |
| entity-position | coverage | 1/1 | GetPos, GetFootPos, SetPos, GetEntityNBTTags, GetSize, GetAllProperties, GetEntityTags, IsEntityOnFire |  |
| wrong-side | legacy | 0/0 | CreateUI, Create, Create, CreateMicroBlockResStr, CreateEngineEntityByNBT, CreateEngineEntityByTypeStr, CreateEngineItemEntity, CreateProjectileEntity | CreateUI, wrong_side:CreateUI, wrong_side:Create, wrong_side:Create |
| wrong-side | raw | 0/0 |  |  |
| wrong-side | annotated | 0/0 |  |  |
| wrong-side | coverage | 0/0 |  |  |
| preset-off | legacy | 0/0 | asProgressBar, GetPropertyBag, SetPropertyBag, ProjectileDoHitEffectEvent, ProjectileCritHitEvent, PromoteToIllagerCaptain, PushBackPassToPostprocess, PopBackPassInPostprocess | expected_empty |
| preset-off | raw | 0/0 |  |  |
| preset-off | annotated | 0/0 |  |  |
| preset-off | coverage | 0/0 |  |  |
| preset-on | legacy | 0/0 | asProgressBar, GetPropertyBag, SetPropertyBag, ProjectileDoHitEffectEvent, ProjectileCritHitEvent, PromoteToIllagerCaptain, PushBackPassToPostprocess, PopBackPassInPostprocess |  |
| preset-on | raw | 0/0 | 预设基类PresetBase, 实体预设EntityPreset, 方块预设BlockPreset, 特效预设EffectPreset, 界面预设UIPreset, 文字面板预设TextboardPreset, 2.0.3, 零件PartBase |  |
| preset-on | annotated | 0/0 | 预设基类PresetBase, 实体预设EntityPreset, 方块预设BlockPreset, 特效预设EffectPreset, 界面预设UIPreset, 文字面板预设TextboardPreset, 2.0.3, 零件PartBase |  |
| preset-on | coverage | 0/0 | 预设基类PresetBase, 实体预设EntityPreset, 方块预设BlockPreset, 特效预设EffectPreset, 界面预设UIPreset, 文字面板预设TextboardPreset, 2.0.3, 零件PartBase |  |
| entity-lunge | legacy | 0/1 | SetAnimationBoneMask, ModelSetAnimBoneMask, SetAnimationAllBoneMask, ModelSetAnimAllBoneMask, ServerPreBlockPatternEvent, EntityStartRidingEvent, GetEntityByCoordEvent, GetEntityByCoordReleaseClientEvent | wrong_side:SetAnimationBoneMask, wrong_side:ModelSetAnimBoneMask, wrong_side:SetAnimationAllBoneMask, wrong_side:ModelSetAnimAllBoneMask, wrong_side:GetEntityByCoordEvent, wrong_side:GetEntityByCoordReleaseClientEvent |
| entity-lunge | raw | 0/1 |  |  |
| entity-lunge | annotated | 1/1 | SetMotion |  |
| entity-lunge | coverage | 1/1 | SetMotion |  |
| teleport-foot | legacy | 0/2 | GetLocalPosListOfBlocks, GetBlockTileEntityCustomData, GetBlockTileEntityWholeCustomData, SetFootPos, SetBiomeByPos, SetBiomeByPosList, GetIntPos, GetIntPos | wrong_side:GetIntPos |
| teleport-foot | raw | 1/2 | GetPos, GetLocalPosListOfBlocks, SetPos, GetSpawnPosition, SetFootPos, AddPlayerTrackMotion, AddEntityTrackMotion, SetBlockByBlockPalette |  |
| teleport-foot | annotated | 2/2 | SetPos, GetFootPos, GetPos, GetLocalPosListOfBlocks, GetBlockNew, GetSpawnPosition, SetFootPos, AddPlayerTrackMotion |  |
| teleport-foot | coverage | 2/2 | GetFootPos, SetPos, GetPos, GetLocalPosListOfBlocks, GetBlockNew, GetSpawnPosition, SetFootPos, AddPlayerTrackMotion |  |
| join-not-ready | legacy | 0/1 | LoadClientAddonScriptsAfter, ChunkLoadedClientEvent, GetEngineActor, CollectOnlineClientData, lobbyGoodBuySucServerEvent, GetBiomeName, ClientLoadAddonsFinishServerEvent, AddEntityClientEvent | wrong_side:LoadClientAddonScriptsAfter, wrong_side:ChunkLoadedClientEvent, wrong_side:GetEngineActor, wrong_side:GetBiomeName, wrong_side:AddEntityClientEvent |
| join-not-ready | raw | 1/1 | lobbyGoodBuySucServerEvent, AddServerPlayerEvent, ClientLoadAddonsFinishServerEvent, CollectOnlineClientData, EntityChangeDimensionServerEvent, GetChunkMobNum, GetBiomeName, OnNewArmorExchangeServerEvent |  |
| join-not-ready | annotated | 1/1 | AddServerPlayerEvent, lobbyGoodBuySucServerEvent, ClientLoadAddonsFinishServerEvent, CollectOnlineClientData, EntityChangeDimensionServerEvent, GetChunkMobNum, GetBiomeName, NotifyToClient |  |
| join-not-ready | coverage | 1/1 | AddServerPlayerEvent, lobbyGoodBuySucServerEvent, ClientLoadAddonsFinishServerEvent, CollectOnlineClientData, EntityChangeDimensionServerEvent, GetChunkMobNum, GetBiomeName, NotifyToClient |  |
| consume-inventory | legacy | 0/2 | OpenNeteaseStoreGui, GetMobStrength, SetMobStrength, GetMobStrengthMax, SetMobStrengthMax, GetBlockCountInBlockPalette, BlockAnimateRandomTickEvent, RemoveActorComponentGroup | wrong_side:OpenNeteaseStoreGui, wrong_side:BlockAnimateRandomTickEvent |
| consume-inventory | raw | 0/2 | GetBlockCountInBlockPalette, RemoveEffectFromEntity, RemoveActorComponent, RemoveActorComponentGroup, SpawnItemToPlayerInv, GetMobStrength, SetMobStrength, GetMobStrengthMax |  |
| consume-inventory | annotated | 2/2 | SetInvItemNum, GetPlayerItem, GetPlayerAllItems, SpawnItemToPlayerInv, GetBlockCountInBlockPalette, RemoveActorComponent, RemoveEffectFromEntity, RemoveActorComponentGroup |  |
| consume-inventory | coverage | 2/2 | GetPlayerAllItems, GetPlayerItem, SetInvItemNum, SpawnItemToPlayerInv, GetBlockCountInBlockPalette, RemoveActorComponent, RemoveEffectFromEntity, RemoveActorComponentGroup |  |
| cancel-mining | legacy | 0/1 | AddDropItemToWorld, SetDropItemTransform, DeleteClientDropItemEntity, SetEntityOwner, GetEntityOwner, ChangeItemTexture, SetDisableDropItem, OpenCityProtect | wrong_side:AddDropItemToWorld, wrong_side:SetDropItemTransform, wrong_side:DeleteClientDropItemEntity, wrong_side:ChangeItemTexture |
| cancel-mining | raw | 0/1 | OpenCityProtect, ShearsDestoryBlockBeforeServerEvent, StartDestroyBlockServerEvent, PlayerFishingServerEvent, EnableKeepInventory, SetLootDropped, PlayerFishingAfterServerEvent, GetDroppedItem |  |
| cancel-mining | annotated | 1/1 | ServerPlayerTryDestroyBlockEvent, OpenCityProtect, ServerEntityTryPlaceBlockEvent, ShearsDestoryBlockBeforeServerEvent, StartDestroyBlockServerEvent, PlayerFishingServerEvent, EnableKeepInventory, CreateEngineItemEntity |  |
| cancel-mining | coverage | 1/1 | CreateEngineItemEntity, ServerPlayerTryDestroyBlockEvent, OpenCityProtect, ServerEntityTryPlaceBlockEvent, ShearsDestoryBlockBeforeServerEvent, StartDestroyBlockServerEvent, PlayerFishingServerEvent, EnableKeepInventory |  |
| world-progress-save | legacy | 2/2 | SetExtraData, SaveExtraData, CleanExtraData, GetExtraData, GetWholeExtraData, GetBlockEntityData, SetBlockTileEntityCustomData, GetBlockTileEntityCustomData | wrong_side:GetBlockEntityData |
| world-progress-save | raw | 2/2 | SetExtraData, SetExtraData, SaveExtraData, SaveExtraData, PlayerTryAddCustomContainerItemServerEvent, CleanExtraData, CleanExtraData, GetExtraData |  |
| world-progress-save | annotated | 2/2 | SaveExtraData, GetExtraData, SetExtraData, SetExtraData, SaveExtraData, PlayerTryAddCustomContainerItemServerEvent, CleanExtraData, CleanExtraData |  |
| world-progress-save | coverage | 2/2 | SaveExtraData, GetExtraData, SetExtraData, SetExtraData, SaveExtraData, PlayerTryAddCustomContainerItemServerEvent, CleanExtraData, CleanExtraData |  |
| block-state-query | legacy | 1/1 | GetLoadEffects, GetLoadActors, GetBlockTileEntityWholeCustomData, GetLoadBlocks, GetBlockStates, SetBlockStates, GetBlockAuxValueFromStates, GetBlockCollision |  |
| block-state-query | raw | 1/1 | GetLoadActors, GetLoadEffects, GetBlockNew, GetEngineActor, GetBlockStates, GetLoadBlocks, StartDestroyBlockServerEvent, GetBlockPoweredState |  |
| block-state-query | annotated | 1/1 | GetBlockStates, SetBlockStates, GetBlockNew, GetLoadActors, GetLoadEffects, GetBlockAuxValueFromStates, GetEngineActor, StartDestroyBlockServerEvent |  |
| block-state-query | coverage | 1/1 | GetBlockStates, SetBlockStates, GetBlockNew, GetLoadActors, GetLoadEffects, GetBlockAuxValueFromStates, GetEngineActor, StartDestroyBlockServerEvent |  |
| broadcast-countdown | legacy | 1/1 | BroadcastToAllClient, BroadcastEvent, ClientLoadAddonsFinishServerEvent, NotifyToMultiClients, NotifyToClient, lobbyGoodBuySucServerEvent, NotifyToServer, GetMotion | wrong_side:NotifyToServer, wrong_side:GetMotion |
| broadcast-countdown | raw | 1/1 | BroadcastToAllClient, BroadcastEvent, SetFishingLineColor, SetFishingLineMax, NotifyToClient, ClientLoadAddonsFinishServerEvent, NotifyToMultiClients, TransferServerFailReason |  |
| broadcast-countdown | annotated | 1/1 | BroadcastToAllClient, BroadcastEvent, SetFishingLineColor, SetFishingLineMax, ClientLoadAddonsFinishServerEvent, NotifyToMultiClients, TransferServerFailReason, NotifyToClient |  |
| broadcast-countdown | coverage | 1/1 | BroadcastToAllClient, BroadcastEvent, SetFishingLineColor, SetFishingLineMax, ClientLoadAddonsFinishServerEvent, NotifyToMultiClients, TransferServerFailReason, NotifyToClient |  |
| menu-back | legacy | 1/1 | PopScreen, CloseMobHitBlockDetection, ClosePlayerHitBlockDetection, ClosePlayerHitMobDetection, ClosePlayerCritBox, ClosePlayerHitBlockDetection, ClosePlayerHitMobDetection, ClientChestCloseEvent | wrong_side:CloseMobHitBlockDetection, wrong_side:ClosePlayerCritBox, wrong_side:ClosePlayerHitBlockDetection, wrong_side:ClosePlayerHitMobDetection |
| menu-back | raw | 1/1 | PopScreen, PushScreen, PopBackPassInPostprocess, RemovePassInPostprocess, HighlightBoxSelection, SetAnimEndCallback, PushBackPassToPostprocess, InsertPassToPostprocess |  |
| menu-back | annotated | 1/1 | PopScreen, PushScreen, PopBackPassInPostprocess, RemovePassInPostprocess, HighlightBoxSelection, SetAnimEndCallback, PushBackPassToPostprocess, InsertPassToPostprocess |  |
| menu-back | coverage | 1/1 | PopScreen, PushScreen, PopBackPassInPostprocess, RemovePassInPostprocess, HighlightBoxSelection, SetAnimEndCallback, PushBackPassToPostprocess, InsertPassToPostprocess |  |
| effect-cleanse | legacy | 1/1 | RemoveEffectFromEntity, AddEffectToEntity, RemoveEffectServerEvent, Unbind, GetAllEffects, HasEffect, GetAllEffects, HasEffect | wrong_side:Unbind, wrong_side:GetAllEffects, wrong_side:HasEffect |
| effect-cleanse | raw | 1/1 | RemoveEffectFromEntity, AddEffectToEntity, RemoveEffectServerEvent, HasEffect, GetAllEffects, AddEffectServerEvent, GetLoadEffects, EffectType |  |
| effect-cleanse | annotated | 1/1 | RemoveEffectFromEntity, AddEffectToEntity, RemoveEffectServerEvent, GetEntityDamage, HasEffect, GetAllEffects, AddEffectServerEvent, GetLoadEffects |  |
| effect-cleanse | coverage | 1/1 | RemoveEffectFromEntity, AddEffectToEntity, RemoveEffectServerEvent, GetEntityDamage, HasEffect, GetAllEffects, AddEffectServerEvent, GetLoadEffects |  |
| spatial-audio | legacy | 1/1 | SetCustomMusicLoop, PlayCustomMusic, StopCustomMusicById, PlaySoundClientEvent, StopCustomMusic, PlayGlobalCustomMusic, PlayMusicClientEvent, SetCustomMusicLoopById |  |
| spatial-audio | raw | 1/1 | SetCustomMusicLoop, PlaySoundClientEvent, PlayCustomMusic, StopCustomMusicById, StopCustomMusic, PlayGlobalCustomMusic, PlayCustomUIMusic, PlayMusicClientEvent |  |
| spatial-audio | annotated | 1/1 | PlayCustomMusic, SetCustomMusicLoop, PlaySoundClientEvent, StopCustomMusicById, StopCustomMusic, PlayGlobalCustomMusic, PlayCustomUIMusic, PlayMusicClientEvent |  |
| spatial-audio | coverage | 1/1 | PlayCustomMusic, SetCustomMusicLoop, PlaySoundClientEvent, StopCustomMusicById, StopCustomMusic, PlayGlobalCustomMusic, PlayCustomUIMusic, PlayMusicClientEvent |  |
| actual-damage-control | legacy | 1/1 | ActuallyHurtServerEvent, ActorHurtServerEvent, Hurt, OnFireHurtEvent, PlayerHurtEvent, ActorAcquiredItemServerEvent, ActorAcquiredItemClientEvent, AchievementCompleteEvent | wrong_side:ActorAcquiredItemClientEvent |
| actual-damage-control | raw | 1/1 | ActuallyHurtServerEvent |  |
| actual-damage-control | annotated | 1/1 | ActuallyHurtServerEvent |  |
| actual-damage-control | coverage | 1/1 | ActuallyHurtServerEvent |  |

## 解释边界

- coverage 只给已标注能力提供组合推荐；未知需求仍依赖词法排序，不能保证零遗漏。
- 标注样本和改写样本公开固定；改变标注或排序后应同时重跑 control，避免只针对一句问法优化。
- 表中字符仅含查询输出；JSON 回执另记录所命中必需候选的 contract_chars 和 calls_with_contracts。遗漏能力不读取详情，所以不能把它的低成本当成任务已完成。
- 根据首轮遗漏补充了“发奖失败需核对背包”能力关联，因此当前样本是可复现回归集，不是独立盲测；此前 coverage 为 26/29，当前改进不代表未知领域召回率。
- 完整 JSON 回执在生成目录 `.api-index/evaluation.json`，本文件记录当前可复现结果。

## 新增模组案例验收

18 个新案例：16 个业务 API 组合、2 个边界。固定参考清单包含 48 项关键能力。本次为固定案例回归；标签可能已根据这些缺口补充，不能作为独立盲测或游戏实机验收。

完整需求先查 Top 8；缺项时执行预先写定的最多四个中文拆分查询，仍取 Top 8，不提供答案 API 名。命中按完整 ID、端侧及已核验等价接口计。详情只读实际召回的必要候选；此筛选用了参考清单，详情开销仅用于验收，不能视为真实 Agent 盲执行成本。

| 查询方式 | 必需能力命中 | 查齐核心参考集合 |
| --- | --- | --- |
| 原文检索 | 22/48 | 4/16 |
| 附加标注 | 48/48 | 16/16 |
| 能力组合 | 48/48 | 16/16 |
| 能力组合＋有限补查 | 48/48 | 16/16 |

| 模组需求 | 一次查询 | 补查后 | 查询次数 | 查询字符数 | 仍缺少 |
| --- | --- | --- | --- | --- | --- |
| 战斗属性面板 | 3/3 | 3/3 | 1 | 1811 | 无 |
| 救援绳回检查点 | 4/4 | 4/4 | 1 | 1609 | 无 |
| 舞台演员生成与清理 | 2/2 | 2/2 | 1 | 1734 | 无 |
| 世界解谜进度 | 3/3 | 3/3 | 1 | 2348 | 无 |
| 多人守点倒计时 | 5/5 | 5/5 | 1 | 2066 | 无 |
| 滚动任务列表领取 | 5/5 | 5/5 | 1 | 2134 | 无 |
| 吸血剑 | 4/4 | 4/4 | 1 | 1887 | 无 |
| 领地保护 | 4/4 | 4/4 | 1 | 1981 | 无 |
| 材料兑换商店 | 3/3 | 3/3 | 1 | 1988 | 无 |
| 复活恢复配装 | 2/2 | 2/2 | 1 | 1835 | 无 |
| 自定义火球 | 2/2 | 2/2 | 1 | 1821 | 无 |
| 额外耐久消耗 | 2/2 | 2/2 | 1 | 1850 | 无 |
| 剧情天气与昼夜 | 2/2 | 2/2 | 1 | 1736 | 无 |
| 毒雾光环 | 3/3 | 3/3 | 1 | 1927 | 无 |
| 跨维度出口定位 | 3/3 | 3/3 | 1 | 1758 | 无 |
| 跟随实体的环境声 | 1/1 | 1/1 | 1 | 1584 | 无 |

字符数为 CLI 实际输出 Unicode 字符，不是模型 token。补查不是免费召回：每次返回的候选都计入查询次数及字符数。

边界结果、错误完整性暗示及合同核对结论见下方人工复核；完整回执为 `.api-index/scenario-evaluation.json`。

## Bukkit／Nukkit 常见服务端需求验收

20个案例：18个有明确ModSDK对应的能力、2个能力边界。每个案例独立查询三种表达，均使用真实 skill CLI、server 范围、Top 5；当前为固定样本回归；结果已用于补充中文标注，不代表新的盲测。

方法名查询衡量术语是否直通；带方法名需求衡量迁移提问；纯中文需求衡量基础能力是否方便检索。参考接口按语义和端侧核对，近似或组合对应不表示逐参数兼容。详情只读取三种表达真正召回的参考候选，使用了参考清单辅助筛选，不作为自主 Agent 成本。

| 查询方式 | 关键能力命中 | 参考集合查齐 |
| --- | --- | --- |
| 仅社区方法名 | 6/23 | 4/18 |
| 社区方法名＋用途 | 23/23 | 18/18 |
| 中文能力描述 | 23/23 | 18/18 |

| 需求 | 仅方法名 | 方法名＋用途 | 纯中文 | 对应性质 |
| --- | --- | --- | --- | --- |
| 给玩家发聊天消息 | 0/1 | 1/1 | 1/1 | 直对应 |
| 快捷栏上方提示 | 1/1 | 1/1 | 1/1 | 用途近似 |
| 获取玩家名字 | 0/1 | 1/1 | 1/1 | 直对应 |
| 记录玩家位置 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 同维度传送 | 0/1 | 1/1 | 1/1 | 直对应 |
| 读取并设置血量 | 0/2 | 2/2 | 2/2 | 组合对应 |
| 发放物品 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 按种类扣材料 | 0/2 | 2/2 | 2/2 | 组合对应 |
| 延迟任务 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 周期任务与取消 | 2/2 | 2/2 | 2/2 | 组合对应 |
| 禁止挖方块 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 空中与对方块使用道具 | 0/2 | 2/2 | 2/2 | 组合对应 |
| 修改游戏模式 | 1/1 | 1/1 | 1/1 | 直对应 |
| 允许飞行但不起飞 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 给玩家设置运动向量 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 添加状态效果 | 1/1 | 1/1 | 1/1 | 语义注意 |
| 玩家加入欢迎消息 | 1/2 | 2/2 | 2/2 | 组合对应 |
| 设置世界夜晚 | 0/1 | 1/1 | 1/1 | 语义注意 |
| 权限节点检查 | 单独核对 | 单独核对 | 单独核对 | 边界 |
| 创建侧边栏计分板 | 单独核对 | 单独核对 | 单独核对 | 边界 |

完整查询、排名及详情回执：`.api-index/community-evaluation.json`。参考问法与映射在 `knowledge/retrieval-cases.json` 的 community_cases 字段；执行 `python3 scripts/evaluate-retrieval.py --community` 可复跑。

社区定义核对来源：
- [bukkit-player](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Player.html)
- [bukkit-entity](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Entity.html)
- [bukkit-inventory](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/inventory/Inventory.html)
- [bukkit-scheduler](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/scheduler/BukkitScheduler.html)
- [nukkit-player](https://raw.githubusercontent.com/CloudburstMC/Nukkit/master/src/main/java/cn/nukkit/Player.java)
- [nukkit-entity](https://raw.githubusercontent.com/CloudburstMC/Nukkit/master/src/main/java/cn/nukkit/entity/Entity.java)
- [nukkit-inventory](https://raw.githubusercontent.com/CloudburstMC/Nukkit/master/src/main/java/cn/nukkit/inventory/BaseInventory.java)
- [nukkit-scheduler](https://raw.githubusercontent.com/CloudburstMC/Nukkit/master/src/main/java/cn/nukkit/scheduler/ServerScheduler.java)


### 方便查询的常用功能

本轮根据 Bukkit/Nukkit 社区案例的缺口新增9条并完善8条已有标注，总数84条。新增条目为 GetName、GetPlayerAllItems、GetPlayerGameType、SetPlayerGameType、ChangePlayerFlyState、IsPlayerCanFly、IsPlayerFlying、SetPlayerMotion、GetMotion。标签继续只用中文基础能力词，应用用途与限制保留在折叠正文中。

| 固定社区案例 | 补充前 | 补充后 |
| --- | ---: | ---: |
| 社区方法名＋用途：关键能力 | 15/23 | 23/23 |
| 社区方法名＋用途：查齐参考集合 | 11/18例 | 18/18例 |
| 中文能力：关键能力 | 21/23 | 23/23 |
| 中文能力：查齐参考集合 | 16/18例 | 18/18例 |
| 仅社区方法名／术语：关键能力 | 7/23 | 6/23 |
| 仅社区方法名／术语：查齐参考集合 | 5/18例 | 4/18例 |

前五候选判定规则、查询文本与已核准参考映射保持不变。这是已知缺口回归，不是独立盲测。仅方法名的表现没有改善，不能据其拼写推断行为；skill 已补充先解释中文能力、对象和读写动作，再查合同的迁移指引。Skill 通过格式校验，但本轮没有将此指引作为独立 Agent 盲测。

### 本轮补强的内容

- **背包读取与材料扣除**：批量读取返回指定物品位置类型的槽位列表，空槽位为 None；按种类扣材料需先匹配、累计、计算再写回，数量写入不等于自动扣减。
- **玩家名字与坐标**：名字不等于账号唯一标识；记录位置用于脚底传送时优先读取脚底坐标，保留睡眠与玩家高度偏移的限制。
- **生命值**：补“血量、加血、扣血”等常用表达，同时区分只读当前值、修改属性、自然回血阈值和自然回血速度。
- **个人游戏模式**：分别标注查询和修改，不与世界默认模式混淆，保留极限模式限制。
- **飞行**：分别标注授权、查询是否能飞、查询是否正在飞，不把能力与状态当成同一个布尔量。
- **运动**：玩家瞬时运动使用 SetPlayerMotion；非玩家生物的服务端瞬时运动使用 SetMotion；GetMotion 只读，移动速度属性另属属性接口。

### 相反意图检查

增加8个首候选检查：只读个人模式、飞行能力查询、飞行状态查询、只读玩家运动、非玩家运动、移动速度属性修改、只读背包、不加血只显示生命。

第一轮发现三处过度关联：非玩家运动被推到玩家接口；移动速度属性被当作瞬时向量；不加血的查询被推到改血接口。收紧知识关联条件后，8/8个首候选均符合对象和读写意图。只读背包还排除了“消耗材料”能力组。规则是有限的词法条件，不能保证识别任意否定句或复杂多意图句。

之前的29个基础回归仍为44/44项，16个模组组合案例仍为48/48项；旧7个改写检查仍为10/10项。本轮没有修改词法评分引擎、原文或加入英文社区方法名标签。

### 保留的迁移边界

- tick 与秒、当前值与上限、脚底与头部、玩家与非玩家、背包部分成功等行为差异仍需读取合同。
- 字符串权限节点不能用玩家权限等级冒充；计分板读取不能代替创建目标和设置分数，命令方案仍需另外核验。
- 普通配方/JSON教程未纳入当前 API 索引；纯社区方法名也仍不是可靠入口。

本轮回执在 `.api-index/community-gap-verification.json`，完整社区查询和8个相反意图检查在 `.api-index/community-evaluation.json`。统一复跑入口仍为 `python3 scripts/evaluate-retrieval.py --community`。
