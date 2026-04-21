---
name: interview-prep
description: Use when the user asks to prepare for an interview, run a mock interview, practice interview questions, or get ready for a graduate application interview. Generate question sets, simulate Q&A, and provide feedback around the target supervisor, program, and the user's own experience.
---

# Interview Preparation

## Preconditions

- Read `../../memory.md` first.
- If the application profile is missing, first suggest that the user run `cv-analyze`, because question design depends on the user's experience.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies the interview language, prioritize the current request.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, prioritize preparing in the interview language most likely used by the target program or professor.
- If the user requests bilingual output, default to outputting questions in the target interview language and supplementing them with Chinese or English answering tips, rather than bilingually repeating the entire question set.

## Clarify the Interview Target First

If any of the following is missing, ask follow-up questions:
- professor name
- school / program
- interview language
- whether they would rather practice a full mock interview or only want a question bank and reference answers

## Preparation Workflow

1. Search the target professor and program:
   - professor homepage and recent work
   - interview format of the program or public experience reports
2. Generate a question set based on the user's background, covering at least:
   - research background
   - technical deep-dive
   - motivation and long-term goals
   - behavioral questions
   - project deep-dive
3. If the user wants a mock interview:
   - give only one question at a time
   - wait for the user's answer before commenting

## Output Requirements

- If the user only wants a question bank:
  - provide categorized questions
  - provide answering advice for each category
- If the user wants a simulation:
  - proceed one question at a time
  - each round of feedback should include strengths, problems, and optimization direction

## Constraints

- For professor research and program process, prioritize current public information.
- Do not treat uncertain student experiences found online as official rules.
