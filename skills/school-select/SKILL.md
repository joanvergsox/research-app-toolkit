---
name: School Selection
description: This skill should be used when the user asks to "recommend schools", "select universities", "find PhD programs", "choose MRes programs", "compare universities", or runs /ra:school-select. It recommends schools based on user profile and preferences.
---

# School Selection

## 1. Prerequisite Check

Read `${CLAUDE_PLUGIN_ROOT}/.local.md`. Check if `cv_profile_analyzed` is `true` and the `## CV Profile` section is populated.

If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

## 2. Personalization Mode

Ask the user: "是否需要个性化定制？会问你 4-5 个问题来生成更贴合你需求的结果。"

### If the user declines personalization

Use the preferences already stored in `.local.md` (regions, degree type, budget, ranking preferences, target schools, timeline) as the search criteria. Skip to step 3.

### If the user accepts personalization

Ask the following 4-5 questions using AskUserQuestion. For the time-related question, run `date` first and include the current date in the question context.

1. **Target regions/countries**: "你希望申请哪些国家或地区的学校？" (e.g., UK, US, EU, Australia, Singapore)
2. **Degree type**: "你计划申请什么学位类型？" (PhD / MRes / MPhil / other)
3. **Budget range**: "你的预算范围是多少？" (e.g., fully funded, tuition+living, specific amount)
4. **Ranking preference**: "你对学校排名有什么偏好？" (QS World / THE / subject-specific ranking / no preference)
5. **Schools already interested in**: "你已经有感兴趣的学校或项目吗？"
6. **Application timeline** (TIME QUESTION): Run `date` first, then ask "你计划什么时候入学？距离今天 [current date] 你还有多少准备时间？" (e.g., Fall 2027, Spring 2027)

## 3. Search Process

### 3.1 Initial Search

Use WebSearch to find programs matching the criteria. Construct search queries that combine:
- Research field (from CV profile)
- Degree type
- Target region/country
- Ranking tier if specified

Run multiple searches to cover different angles:
- "[field] PhD programs [country] [year]"
- "best [field] graduate programs [region] ranking"
- "[field] research programs [country] funded"

### 3.2 Detailed Program Investigation

For each promising program found:

1. Use WebSearch to check admission requirements (GPA, language scores, prerequisites)
2. Search for funding availability (scholarships, assistantships, grants)
3. Search for faculty members working in the user's research area
4. Find application deadlines and required materials
5. Look up program reputation and student outcomes

### 3.3 Profile Comparison

Compare each program's requirements against the user's cv_profile:
- **Academic fit**: GPA/grades vs program minimums and averages
- **Research fit**: User's research experience and publications vs program focus areas
- **Skills fit**: User's technical skills vs program requirements
- **Experience fit**: User's background vs program expectations

## 4. School Categorization

Categorize each school into one of three tiers:

| Tier | Chinese | English | Criteria |
|------|---------|---------|----------|
| **冲刺** | Reach | Academic profile significantly below program averages, but strong in other areas |
| **匹配** | Match | Academic profile within program's typical range, good overall fit |
| **保底** | Safety | Academic profile above program averages, high likelihood of admission |

## 5. Output Format

For each school, provide the following information:

```
### [School Name] — [Program Name] ([Tier])

- **Location**: [City, Country]
- **Ranking**: [QS/THE rank, subject rank]
- **Requirements vs Your Profile**:
  - GPA: program requires [X], you have [Y] — [assessment]
  - Language: requires [score], you have [score] — [assessment]
  - Other: [additional requirements]
- **Funding**: [scholarship names, amounts, coverage]
- **Faculty**: [list relevant professors and their research areas]
- **Deadline**: [application deadline]
- **Fit Assessment**: [1-2 sentence assessment of how well the program fits]
```

Then present a **prioritized comparison table**:

```
| # | School | Program | Tier | Deadline | Funding | Fit Score |
|---|--------|---------|------|----------|---------|-----------|
| 1 | ... | ... | ... | ... | ... | .../10 |
```

### Prioritization Logic

1. Match-tier schools first (highest priority to apply)
2. Then Reach-tier schools (worth trying with strong application)
3. Then Safety-tier schools (backup options)
4. Within each tier, sort by fit score (combination of research fit, academic match, and funding availability)

## 6. Next Steps

After presenting the results, suggest:
- Which programs to prioritize for early applications
- Which professors to contact first
- What materials to prepare (SOP, writing sample, portfolio)
- Any gaps in the user's profile that should be addressed before applying
