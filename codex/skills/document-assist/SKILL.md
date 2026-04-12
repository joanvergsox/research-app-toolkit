---
name: document-assist
description: Use when the user asks to draft or revise an SOP, personal statement, motivation letter, research proposal, recommendation-letter draft, or similar application document. Based on the shared application profile and user materials, generate research application documents.
---

# 申请文书辅助

## 前置检查

- 先读取 `../../memory.md`。
- 若申请画像缺失，先提示用户运行 `cv-analyze`，或在本轮直接补齐必要背景后继续。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定文书语言，优先遵循当前请求。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则优先使用目标项目官方常用语言。
- 若用户要求 bilingual，默认给出一个主稿语言版本，并附一份缩略对照版或提纲，不要把整篇文书逐段重复。

## 识别文书类型

若用户未说明，默认按 `sop` 处理。支持：
- `sop`
- `motivation`
- `research-proposal`
- `recommendation-draft`

## 材料收集

文书类任务不要直接开写，先补足最少材料：
- 目标项目与学校
- 目标导师 / 课题组（若有）
- 必须写入的经历
- 申请动机
- 毕业后的短期 / 长期目标
- 字数或格式要求

## 执行流程

1. 从 `memory.md` 提取可复用背景。
2. 先给一个简短提纲。
3. 再输出完整初稿。
4. 如果用户有硬性限制，例如字数、题目、段落数，就严格按限制收敛。

## 文书规则

- 不编造经历、论文、奖项或动机。
- 语言风格以真实、具体、可验证为先。
- `research-proposal` 要明确研究问题、方法、预期贡献和风险。
- `recommendation-draft` 必须用推荐人视角写。

## 输出要求

- 默认包含：
  - 提纲
  - 完整草稿
  - 2 到 4 个可继续强化的点
