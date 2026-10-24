# DeepSeek 标注草稿试点

**当前状态：已停止使用。** 用户于 2026-10-24 明确要求不再使用 DeepSeek。当前正式标注由 Codex 直接编写，首批 60 条的复核依据见 `annotation-review.json`；下文仅保留历史试验记录，不代表当前默认流程。

2026-10-24，本机 DeepSeek Harness `0.2.1-rc.2`，请求模型 `deepseek-flash`。结论：**采用高思考作为草稿生成默认值；尚不足以无人复核后全量入库。** 所有模型输出与正式 `annotations.json` 分离。本轮没有发布、自动导入或更新桌面端设置。

## 本机调用方式

桌面应用自带 CLI，但当前 shell 的 PATH 中没有 `dsh`：

```sh
'/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh' --help
'/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh' headless --help
```

`headless` 从 stdin 接受完整任务，`--json` 输出 session、状态、工具调用、最终回复和用量事件，完成后退出。应用自带 README 明确：headless 默认禁用已保存认证；调用级 `--patch` 可恢复 credentials、authorization、deepseek-account，复用桌面已经保存的凭据。本试点显式选择 `deepseek-official / deepseek-flash`，未读取或输出密钥。

复用入口：

```sh
python3 scripts/draft-api-annotations.py \
  0476faee95c8 a6f292e199e1 32b5398e5057 \
  --output .api-index/annotation-drafts
```

默认 `--effort high`，可显式 `--effort off` 做对照；`--harness` 可覆盖安装位置。`scripts/deepseek-annotation.patch.yml` 只对本次子进程生效，禁用文件、shell、网页、子代理等工具提供者。调用实际仍使用远程 DeepSeek 模型，不是离线本地模型。请求内容仅为选中官方章节、引用枚举与标注指令，不加载现有人工标注。

每批最多 6 条，默认超时 300 秒，输出目录不覆盖已有草稿。脚本核对 ID、数量、字段长度、引用是否为连续原文，以及是否发生工具调用；输出永远是 pending_human_review。脚本不改正式标注、Wiki 页面或已安装 Skill。

## 范围与结果

12 个 API/事件：SetAttrValue、SpawnItemToPlayerInv、ServerItemTryUseEvent、ServerItemUseOnEvent、AddTimer、SetBlockNew、GetFootPos、GetEntityDamage、GetScrollViewContentPath、NotifyToServer、SetAttrMaxValue、DrawingShapeCompClient.GetPos。覆盖通用属性、复合业务、失败副作用、端侧、事件时机、输入模式与同名组件。

第一版提示词要求短标签、近义表达和原文证据；第二版强调“具体玩法目的＋API 所承担的步骤”，避免只复述参数或将限制当场景。第二版只重跑六个较有代表性的 API，两组的样本规模不同，不能直接用总量判断优劣。

| 提示词 / 思考 | 条目数 | 单批耗时 | Harness 输出 tokens | 连续引文检查 |
| --- | ---: | --- | ---: | --- |
| v1 / off | 12（两批） | 7.46 / 5.50 秒 | 2,223（合计） | 11/12 条通过 |
| v1 / high | 12（两批） | 54.26 / 24.33 秒 | 14,582（合计） | 12/12 条通过 |
| v2 / off | 6 | 10.71 秒 | 1,517 | 6/6 条通过 |
| v2 / high | 6 | 88.80 秒 | 17,115 | 6/6 条通过 |

这些是 Harness usage 事件中的 outputTokens，高思考包含推理开销，不等于最后显示的标签长度。未查询账户账单或价格，不能将 token 数直接换算为费用。每种设置每批只运行一次；不是稳定性或大规模准确率评估。全部调用正常完成、JSON 可解析、未出现工具调用；off 的首批由于引用检查失败，草稿入口返回非零退出码。

## 人工复核发现

**off / v1：速度快，但输出偏摘要。** SetAttrValue 的 evidence 将两段原文拼接为一段，连续引用校验拦截。SetBlockNew 把容器清空规则概括为“放置箱子等容器方块会清空其内物品”，省略同类方块实体条件；AddTimer 给出“重复触发需自行重新添加”，属于没有必要且依据不足的替代方案建议。

**high / v1：更克制，但不是有价值的应用联想。** 例如 SetAttrMaxValue 的“超过原版值范围时通过返回值判断失败”只是限制复述；“服务端接口”“设置结果”等标签价值低。多数输出即使正确，也没有提供足够多的陌生检索表达。

**off / v2：出现实质语义错误，结构检查无法识别。** GetEntityDamage 输出“读取基础攻击力……手持武器、增益带来的显示差异需另行计算”，与原文“基础攻击力、手持武器、buff 效果、附魔效果的总和”冲突；其附带 evidence 恰好正确引用了原文。这说明引用存在不代表结论受引用支持。SetAttrValue 的“击杀后扩充目标最大生命再回满”也需要明确对象与玩法目的。

**high / v2：有用草稿明显增多，但仍存在适用范围扩张。**

可以保留方向、再压缩措辞的例子：

- SpawnItemToPlayerInv：“商店交付：玩家购买后把商品写入背包，扣款、限购与背包容量校验需另行处理。”同条草稿另保留了失败也可能部分入包的限制。
- AddTimer：“波次玩法：开局后延迟数秒安排一次刷怪回调，波次计数与胜负判定需另行处理。”准确区分单次计时与完整波次系统。
- NotifyToServer：“技能按钮：点击后把技能编号通知服务端，释放校验与冷却需另行处理；发送事件不等于服务端已接受。”方向及边界正确，但正式展示仍应压缩。
- GetEntityDamage 的 v2/high 草稿已正确写出含武器、buff、附魔；部分 alias 仍写“查看生物基础攻击力”，容易误导，需删除或改为“综合攻击力”。

必须拒绝原样导入的例子：

- SetAttrValue：“跑酷增益：设置玩家移速、跳跃力或挖掘速度来改变行动手感……”原文 AttrType.JUMP_STRENGTH 限定“骑乘后跳跃可跳跃的高度”，不能据此推荐普通玩家跳跃增益。应把该场景限于已证实的移速等能力，骑乘跳跃另行准确表述。
- GetScrollViewContentPath 的“每次打开界面前取路径”不够完整；原文要求每次使用该路径及子控件路径时重新获取，不能让应用场景暗示只在打开时取一次。
- 对 SetAttrValue 的“护甲叠加”表述需保留对部分生物原有护甲覆盖等官方限制；场景正文只作导向，完整合同必须随详情保留。

## 后续采用方式

1. 用 high＋第二版提示词按 4–6 条生成草稿；tag 概括能力，aliases 承接用户表达，场景只留 1–3 个不同方向。
2. 先做自动结构与引用检查，再检查实体类型、端侧、时间点、只读/写入、默认值/当前值、返回失败副作用以及枚举适用范围。
3. 人工确认后才将少量有效标签、别名和简短用途合入独立 sidecar，复用原文章节哈希；证据与复核记录留在草稿回执，不作为 Wiki 默认展示正文。
4. 这一步不自动把场景转成 capabilities。跨 API 的必要组合关系需要单独确认，不能把“联想到某玩法”当作“完整实现所需 API 已齐全”。

当前完整草稿、请求指纹与用量合并保存在生成目录 `.api-index/annotation-pilot/results.json`，保留待复核输出，清除本轮逐事件推理日志和重复原文副本。长期可复用的入口是 `scripts/draft-api-annotations.py` 和调用 overlay。本试点只验证文档标注质量，没有游戏功能验收，也没有进行全量标注。
