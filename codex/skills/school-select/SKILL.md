---
name: school-select
description: Use when the user asks for school recommendations, program selection, PhD program discovery, MRes program comparison, or university comparison. Based on the application profile, budget, region, and timeline, identify and compare research programs and return reach, match, and safety recommendations.
---

# 选校建议

## 前置检查

- 先读取 `../../memory.md`。
- 如果没有申请画像，优先建议先分析 CV，再做更可信的选校。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定输出语言，优先遵循当前请求。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则跟随用户当前对话语言。
- 项目名称、院系名称、官方要求等专有名词可保留原文，但解释与比较结论应遵循选定语言。

## 先补足决策变量

若用户没说清楚，补齐：
- 目标国家 / 地区
- 学位类型
- 预算 / funding 要求
- 排名偏好
- 入学时间或申请周期
- 研究方向

## 检索策略

1. 优先查官方项目页面，确认：
   - 项目名称
   - admission requirements
   - funding / scholarship
   - deadline
2. 若用户在意排名，再额外查对应排名来源。
3. 结合 `memory.md` 的背景做三档分层：
   - `Reach`
   - `Match`
   - `Safety`

## 输出要求

- 先给比较表：
  - 学校
  - 项目
  - 档位
  - deadline
  - funding
  - fit score
- 再给每个项目的详细说明：
  - 地点
  - 关键要求
  - 与用户背景的匹配判断
  - 值得联系的 faculty 方向

## 约束

- 申请截止日期必须以具体日期表达，避免只说“今年冬季”这类模糊时间。
- 如果学校要求或 funding 信息查不到，要明确写成“待核实”。
- 这是高成本决策类建议，优先依赖当前检索结果，而不是记忆。
