---
name: cv-analyze
description: Use when the user asks to analyze a CV or resume, extract an applicant profile, review a resume, or parse a CV. Read the user's CV or resume, produce a structured research application profile, and write it to the shared memory file for reuse by other application skills.
---

# CV Profile Analysis

## Shared State

- The shared memory file is located at `../../memory.md`.
- Read that file first at the beginning; if it does not exist, create a template with the same structure.
- After profile analysis is completed, rewrite the entire `memory.md` and set `cv_profile_analyzed` in the frontmatter to `true`.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user's current message explicitly specifies a language, prioritize the current message.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, follow the user's current conversation language.
- Section headings in `memory.md` should remain in a fixed English structure, while section content may be written in the selected language.

## Workflow

1. Confirm the CV file path:
   - First read `cv_file_path` from the `memory.md` frontmatter.
   - If it is empty, search the current working directory with `rg --files` for files related to `cv`, `CV`, `resume`, or `Resume`.
   - If it still cannot be found, directly ask the user for an explicit path in Chinese.
2. Read the CV content:
   - For PDFs, first try command-line extraction such as `pdftotext`.
   - On macOS, fall back to `textutil -convert txt -stdout`.
   - If that still fails, use a Python library as a fallback extractor.
   - For DOCX files, prefer `textutil`, and use Python only when necessary.
3. Extract and organize the following information:
   - Educational background
   - Technical skills
   - Research-related projects and experience
   - Work / internship experience
   - Awards and honors
   - Papers / outputs
4. Based on that, provide:
   - `Strengths for Applications`
   - `Areas for Improvement`
   - `Packaging Opportunities`
5. Write the result back to `../../memory.md`:
   - update `cv_file_path`
   - update `cv_profile_analyzed`
   - reorganize all sections cleanly, rather than only appending to the end

## Output Requirements

- When reporting back to the user, prioritize:
  - the 3 strongest application strengths
  - the experience that best connects to research direction
  - 2 to 3 points that can be packaged more strongly

## Constraints

- Record grades and weaknesses objectively only; do not make emotional judgments.
- Do not fabricate papers, awards, projects, or research experience.
- If the CV content is incomplete or extraction fails, first state the missing items clearly, then continue.
