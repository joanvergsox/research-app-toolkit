---
name: professor-match
description: Use when the user asks to find supervisors, match professors, search for supervisors, or identify professors for a PhD or other research degree. Based on the shared application profile and user preferences, identify potential supervisors, evaluate research fit, and recommend priorities.
---

# 导师匹配

## 前置检查

- 先读取 `../../memory.md`。
- 如果还没有 CV 画像，优先建议先运行 `cv-analyze`，因为匹配判断依赖用户背景。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定语言，优先遵循当前请求。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则跟随用户当前对话语言。
- 导师主页、学校项目等检索资料可以保留原始英文专有名词，但解释文本应遵循选定输出语言。

## 可选联动：Life Science Research

- 如果用户的申请方向明显属于 life sciences / biomedical research，例如 genetics、functional genomics、immunology、neuroscience、cancer biology、cell biology、translational medicine 等，并且当前任务需要研究方向 grounding，再联动 `life-science-research`。
- 适合联动的场景包括：
  - 需要先厘清 target / gene / disease / pathway 背景
  - 需要基于公开文献、数据集或近期研究脉络判断导师 fit
  - 需要从研究问题空间出发，而不是只按关键词搜导师
- 联动结果优先用于：
  - 收敛研究关键词
  - 判断导师近期工作与用户背景的自然桥接点
  - 识别更具体的 research-fit 叙事
- 如果用户只是想按学校 / 国家 /项目名做常规导师搜索，或只是更新排序，不要触发该联动。

## 先补足检索条件

若用户请求不够具体，补齐以下最少信息：
- 研究方向或关键词
- 目标国家 / 地区 / 学校范围
- 学位类型与入学时间
- 特殊约束，例如“需要近年在招学生”“偏产业合作”“希望全奖”

## 检索与判断

1. 用网页检索寻找潜在导师：
   - 优先 faculty page、lab page、department page
   - 再看近 2 到 3 年代表论文和公开项目
2. 对每位导师提取：
   - 学校、院系、职位
   - 研究方向
   - 近年重点工作
   - 是否有公开的招生信号
3. 结合 `memory.md` 中的画像评估匹配度：
   - 用户已有经历是否能自然对接导师研究
   - 技术栈是否相关
   - 需要补哪些能力或论证点

## 输出格式

- 先给一张简洁比较表：
  - 教授
  - 学校
  - 方向
  - 匹配度
  - 关键原因
- 再给详细条目，每位导师至少包括：
  - 研究摘要
  - 1 到 3 个近期代表工作
  - 匹配理由
  - 套磁建议

## 约束

- 涉及招生、研究方向、学校项目等信息时，优先以当前网页检索结果为准。
- 如果无法确认“是否招人”，必须明确写成“未见公开确认”，不要脑补。
