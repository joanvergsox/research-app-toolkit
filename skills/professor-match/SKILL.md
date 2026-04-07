---
name: Professor Match
description: This skill should be used when the user asks to "find professors", "search for supervisors", "match professors", "find research supervisors", or runs /ra:professor-match. It searches for professors matching the user's research interests and evaluates fit.
---

# Professor Match Skill

## Prerequisite Check

Read the file `${CLAUDE_PLUGIN_ROOT}/.local.md` at the start of this skill. If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

## Personalization Mode

Before proceeding with analysis, ask the user:

> 是否需要个性化定制？会问你 4-5 个问题来生成更贴合你需求的结果。

If the user declines personalization, proceed with the standard flow using existing `.local.md` data.

If the user accepts personalization, ask the following 4-5 targeted questions (use AskUserQuestion for each):

1. Target schools, regions, or countries? (e.g., "US top-50 CS PhD programs", "universities in Germany")
2. Preferred research fields? (Pre-fill from `.local.md` `research_interests` if available, and let the user confirm or adjust)
3. Any specific requirements for the professor? (e.g., "must be taking new PhD students in 2026", "prefers labs with strong industry collaboration")
4. Application timeline? **(TIME QUESTION -- run `date` first via Bash, then include current date in the question, e.g., "今天是 2026-04-06，你的申请截止日期是？")**
5. Any professors already on your shortlist? (Provide names and universities if yes)

## Standard Flow

### Step 1: Gather Context from .local.md

Read `.local.md` and extract:
- `research_interests` -- primary and secondary research areas
- `target_regions` or `target_schools` -- geographic or institutional preferences
- CV Profile data: key experiences, skills, publications, and background

If the user provided command-line arguments (e.g., `/ra:professor-match MIT NLP`), parse them for target school and field, and use these as the primary search criteria.

### Step 2: Search for Professors

Use WebSearch to find professors matching the user's criteria. Construct searches based on:

- Target school + department + research field
- Target region + research field + "faculty" or "professor"
- Specific research keywords from the user's interests

Run multiple searches to ensure broad coverage. For each promising result, note the professor's name, university, department, and homepage URL.

### Step 3: Analyze Each Professor

For each professor identified, gather detailed information:

1. **Read the professor's homepage** using the webReader tool on their faculty page. Extract:
   - Current position and title
   - Research group/lab name
   - Research direction summary
   - Whether they are actively recruiting students

2. **Check recent publications** using WebSearch for Google Scholar or DBLP profiles:
   - Identify 1-3 key recent publications (last 2-3 years)
   - Note publication venues and impact

3. **Cross-reference with user's CV profile**:
   - Which of the user's skills or experiences align with the professor's research?
   - Are there gaps that would need to be addressed?
   - Does the professor's recent work suggest new directions that complement the user's background?

### Step 4: Evaluate Fit and Produce Match Report

For each professor, produce a structured entry:

```
### [Professor Name]
- **University**: [University Name]
- **Department**: [Department]
- **Position**: [e.g., Associate Professor]
- **Homepage**: [URL]
- **Research Direction**: [1-2 sentence summary]
- **Key Recent Publications**:
  1. [Title] ([Venue], [Year])
  2. [Title] ([Venue], [Year])
  3. [Title] ([Venue], [Year])
- **Match Score**: High / Medium / Low
- **Match Reasoning**: [Which of the user's experiences, skills, or interests align with this professor's work]
- **Suggested Outreach Strategy**: [Specific advice on how to approach this professor, what to emphasize in initial contact]
```

### Step 5: Output Structured Comparison

After analyzing all identified professors, produce:

1. **Summary Table**: A comparison table with columns for Professor Name, University, Research Direction, Match Score, and a brief note on alignment.

2. **Detailed Analysis**: The full per-professor entries as described in Step 4.

3. **Recommendations**: A prioritized shortlist with reasoning, suggesting:
   - Top 3-5 professors with the highest match scores
   - Professors whose research directions align with emerging areas in the user's field
   - Any notable opportunities (e.g., professors who recently received grants, new faculty who may be actively recruiting)

4. **Next Steps**: Suggested actions for the user:
   - Which professors to contact first
   - How to prepare tailored emails for each
   - Any materials to prepare before outreach (e.g., research proposal, writing sample)
