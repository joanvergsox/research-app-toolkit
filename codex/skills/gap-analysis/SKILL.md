---
name: gap-analysis
description: Use when the user asks to analyze research gaps, find research gaps, generate research ideas, or analyze papers for gaps. Read a set of papers, summarize methods and limitations, identify open questions, and propose executable research ideas aligned with the user's profile.
---

# Research Gap 分析

## 前置检查

- 先读取 `../../memory.md`。
- 若没有 CV 画像，先提示用户运行 `cv-analyze`，因为 feasibility 判断依赖用户能力背景。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定输出语言，优先遵循当前请求。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则跟随用户当前对话语言。
- 论文题名、方法名、会议名等学术专有名词可保留原文，分析与结论部分遵循选定语言。

## 先明确输入来源

优先向用户确认论文来源：
- 本地文件夹
- 单篇 / 多篇 PDF
- Zotero 集合或条目

如果用户要用 Zotero，且当前环境存在可用 Zotero 工具，就使用；否则回退到本地文件。

## 处理流程

1. 列出待分析论文并和用户确认范围。
2. 逐篇提取：
   - 核心问题
   - 方法
   - 实验 / 结果
   - 局限
3. 做跨论文比较，至少从四类缺口切入：
   - 方法缺口
   - 应用缺口
   - 理论缺口
   - 工程 / 效率缺口
4. 结合 `memory.md` 的技能画像，提出 3 到 5 个研究想法，并判断 feasibility。

## 并行策略

- 默认顺序或分批本地处理即可。
- 只有当用户明确要求“并行”“子代理”“delegation”时，才可以用 `spawn_agent` 做分论文并行。
- 即便并行，最终比较、冲突判断和综合结论仍由主代理完成。

## 输出要求

- 先给 gap summary。
- 再给 3 到 5 个 idea，每个都包含：
  - 研究问题
  - 方法思路
  - 新颖性依据
  - 所需技能 / 资源
  - feasibility：High / Medium / Low
  - 潜在投稿方向

## 约束

- 不要把论文作者自己已明确讨论过的 future work 直接包装成“新颖 idea”。
- feasibility 评估要显式参考用户现有技能，而不是空泛打分。
