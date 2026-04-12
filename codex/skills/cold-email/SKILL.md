---
name: cold-email
description: Use when the user asks to write a cold email, draft an outreach email, follow up with a professor, or prepare other supervisor-facing application emails. Based on the shared application profile and target supervisor information, generate first-contact emails, follow-ups, interview thank-you notes, and offer-related communication.
---

# 套磁邮件

## 前置检查

- 先读取 `../../memory.md`。
- 若 `cv_profile_analyzed` 未完成，先提示用户运行 `cv-analyze`，除非用户已经直接提供了足够完整的背景材料。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定邮件语言，优先遵循当前请求。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则优先使用目标导师或目标项目常用语言。
- 若用户要求 bilingual，默认输出一版主邮件正文，并附一版简洁对照稿，而不是把中英混在同一封邮件里。

## 识别邮件类型

若用户未说明，默认按 `first-contact` 处理。支持：
- `first-contact`
- `follow-up`
- `interview-thanks`
- `offer-negotiation`
- `reference-remind`
- `rejection-follow`

## 先补足关键上下文

如缺失，则直接询问：
- 教授姓名与学校
- 希望用中文还是英文
- 最想强调的 1 到 2 段经历
- 是否已有前序沟通

## 写作流程

1. 从 `memory.md` 抽取最相关背景。
2. 用网页检索核对目标导师：
   - 主页
   - 研究方向
   - 近期论文或项目
3. 找出用户经历与导师研究之间最自然的 1 到 2 个连接点。
4. 输出邮件草稿，并在必要时给出主题行备选。

## 写作规则

- 首封套磁要短，不绕。
- 必须包含具体研究连接，不能只是泛泛夸赞。
- 不暴露无必要的弱点，如成绩焦虑或申请失败经历。
- 英文邮件优先控制在约 250 到 300 词内。
- 中文邮件优先控制在一屏可读范围内。

## 输出要求

- 默认给出：
  - 邮件主题 2 到 3 个候选
  - 正文草稿
  - 可替换的个性化句子位

## 约束

- 涉及导师最新研究方向时，以当前检索结果为准。
- 不要虚构“读过对方某篇论文”这类事实，除非本轮确实已核对。
