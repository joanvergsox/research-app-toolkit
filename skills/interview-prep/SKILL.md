---
name: Interview Prep
description: This skill should be used when the user asks to "prepare for interview", "practice interview questions", "mock interview", "interview preparation", or runs /ra:interview-prep. It prepares the user for research program interviews.
---

# Interview Preparation

## 1. Prerequisite Check

Read `${CLAUDE_PLUGIN_ROOT}/.local.md`. Check if `cv_profile_analyzed` is `true` and the `## CV Profile` section is populated.

If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

**Note**: This skill does NOT support personalization mode. It proceeds directly with the standard flow.

## 2. Identify Interview Target

### If `$ARGUMENTS` is provided

Parse the professor name and university from the arguments. The expected format is:

```
[professor-name] [university]
```

Example: `/ra:interview-prep John Smith MIT`

### If `$ARGUMENTS` is empty

Ask the user using AskUserQuestion:

1. "你要准备哪个教授的面试？请提供教授姓名。"
2. "这位教授在哪个大学？"

## 3. Research Process

### 3.1 Research the Professor

1. Use WebSearch to find the professor's homepage and recent publications
2. Search for: "[professor name] [university] recent papers [year]"
3. Search for: "[professor name] [university] research group"
4. Identify 3-5 key recent papers from the professor's group

### 3.2 Read Key Papers

For each key paper identified:

1. Use `mcp__web_reader__webReader` to read the paper's abstract and key sections
2. Extract: research questions, methodology, key findings, and limitations
3. Note how this paper connects to the user's CV profile and research interests

### 3.3 Research the Program

1. Use WebSearch to find the program's interview format and process
2. Search for: "[university] [program] interview format"
3. Search for: "[university] [program] interview experience" (for student reports)
4. Determine: interview duration, format (technical/behavioral/both), panel composition

## 4. Generate Question Categories

Based on the research, generate mock interview questions organized into the following categories:

### 4.1 Research Background Questions

Questions testing knowledge of the professor's work:

- "Can you explain Professor [name]'s work on [topic]?"
- "What do you think about [method/approach] used in their recent paper?"
- "How does Professor [name]'s research connect to broader trends in [field]?"
- "What limitations do you see in [specific paper/approach]?"

### 4.2 Technical Skills Questions

Based on the user's cv_profile technical skills, generate questions that test depth of knowledge:

- For each major technical skill in the user's CV, prepare 1-2 probing questions
- Focus on skills most relevant to the professor's research area
- Include questions about methodology choices and trade-offs

### 4.3 Motivation & Goals Questions

- "Why did you choose this program?"
- "What specific research questions interest you?"
- "How does your background prepare you for research in [field]?"
- "Where do you see yourself in 5 years?"
- "Why do you want to work with Professor [name] specifically?"

### 4.4 Behavioral Questions

- "Tell me about a research challenge you overcame."
- "Describe a time you collaborated on a team project."
- "Tell me about a time your experiment failed. What did you learn?"
- "Describe a situation where you had to learn a new skill quickly."

### 4.5 Project Deep-dive Questions

Based on specific projects listed in the user's CV:

- "Can you walk me through your [project name] project?"
- "What was the most challenging aspect of [project]?"
- "If you could redo [project], what would you change?"
- "How did you validate your results in [project]?"

## 5. Conduct Mock Q&A

### Format

1. Present one question at a time
2. Wait for the user's response
3. Provide constructive feedback on the response, including:
   - What was strong about the answer
   - What could be improved
   - Suggested structure or content additions
   - Tips for delivering the answer in an actual interview
4. Then present the next question

### Progression

- Start with easier questions (motivation, background)
- Move to more challenging questions (technical, research depth)
- End with behavioral questions (typically shorter answers)

### Tracking

Keep track of:
- Questions answered and feedback given
- Patterns in the user's strengths and weaknesses
- Time spent per question category

## 6. Post-Practice Summary

After completing the mock Q&A, provide a structured summary:

```
## Interview Prep Summary — [Professor Name], [University]

### Strengths
- [strength 1]
- [strength 2]
- [strength 3]

### Areas to Improve
- [area 1]: [specific improvement suggestion]
- [area 2]: [specific improvement suggestion]

### Key Points to Remember
- [important point about professor's research]
- [important point about program expectations]

### Recommended Preparation
- [preparation task 1]
- [preparation task 2]
- [preparation task 3]

### Questions to Ask the Professor
- [suggested question 1]
- [suggested question 2]
- [suggested question 3]
```
