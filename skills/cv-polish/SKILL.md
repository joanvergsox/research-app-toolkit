---
name: CV Polish
description: This skill should be used when the user asks to "polish my CV", "improve my CV", "tailor my CV", "optimize my resume", or runs /ra:cv-polish. It improves CV content, structure, and wording for specific applications.
---

# CV Polish Skill

## Prerequisite Check

Read the file `${CLAUDE_PLUGIN_ROOT}/.local.md` at the start of this skill. If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

## Personalization Mode

Before proceeding with analysis, ask the user:

> 是否需要个性化定制？会问你 4-5 个问题来生成更贴合你需求的结果。

If the user declines personalization, proceed with the standard flow using existing `.local.md` data.

If the user accepts personalization, ask the following 4-5 targeted questions (use AskUserQuestion for each):

1. Target degree type and school? (e.g., "PhD in Computer Science at MIT")
2. Which 1-2 experiences do you want to highlight most?
3. Is there a specific research direction you want to align with?
4. What is your preferred CV language? (e.g., English, Chinese, bilingual)

## Standard Flow

### Step 1: Locate and Read the CV File

1. Check `.local.md` for the user's CV file path (look in the CV Profile section).
2. If no path is specified, ask the user for the CV file path.
3. Read the CV file using the Read tool.

### Step 2: Analyze the CV

Analyze the CV across the following dimensions:

- **Structure**: Is the organization logical? Are sections in the right order for a research application? Standard order: Education, Research Experience, Publications, Skills, Awards, Teaching, Other.
- **Wording**: Are bullet points action-oriented and results-driven? Are there weak verbs, passive voice, or vague descriptions?
- **Emphasis**: Are the most relevant experiences and skills given the most prominent placement? Does the CV highlight research-relevant accomplishments?
- **Missing Elements**: Are there categories important for research applications that are absent or underdeveloped? (e.g., research statement keywords, technical skills, publications, presentations)
- **Formatting Consistency**: Are dates, locations, and formatting uniform throughout?
- **Length**: Is the CV appropriately concise? (Typically 1-2 pages for a master's application, 2-3 pages for a PhD application)

### Step 3: Determine Edit Mode

Ask the user how they would like to receive the improvements:

> I've identified several areas for improvement. Would you prefer:
> 1. Line-by-line suggestions that you apply yourself
> 2. Direct edits to the file with tracked changes explanation

Proceed according to the user's choice.

### Step 4: Apply Improvements

If tailoring for a specific position or school:

- Reframe bullet points to emphasize skills and experiences relevant to the target program
- Reorder sections to prioritize the most relevant information
- Add missing keywords that align with the target program's research focus
- Adjust the research interest statement to match the target department's strengths
- Highlight relevant coursework, tools, or methodologies

General improvements to apply:

- Replace weak verbs (e.g., "helped with", "worked on") with strong action verbs (e.g., "developed", "designed", "implemented", "analyzed")
- Quantify achievements where possible (e.g., "improved accuracy by 15%")
- Ensure each bullet point communicates a clear contribution or outcome
- Standardize date formats and section headings
- Remove irrelevant or redundant information

### Step 5: Output Results

Provide the user with:

1. A summary of all changes made, organized by category (structure, wording, emphasis, additions, removals)
2. The improved CV (either as inline suggestions or as a directly edited file)
3. A brief explanation of why each change improves the CV for research applications

If the user provided a specific target, also include a brief note on how the CV was tailored for that target and any remaining gaps the user should address in their research statement or other application materials.
