---
name: cv-polish
description: Use when the user asks to polish a CV or resume, improve a CV, tailor a resume, or optimize a CV. Based on the shared application profile, suggest revisions or produce rewrites for structure, phrasing, and target-program fit.
---

# CV Refinement

## Preconditions

- Read `../../memory.md` first.
- If `cv_profile_analyzed` is not `true`, or `## CV Profile` is basically empty, first suggest that the user run `cv-analyze`, unless the user explicitly asks you to rebuild the profile directly from the current CV.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies the output language or target CV language, prioritize the user's specification.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, default to following the user's current conversation language.
- If the user requests bilingual output, prioritize one main version plus a short counterpart note, rather than mechanically repeating every line twice.

## Fill In the Key Information First

If any of the following is missing, ask concise questions in Chinese to fill it in:
- target program / school / degree
- which 1 to 2 experiences should be emphasized
- target research direction
- desired output language

## Working Method

1. Read the original CV:
   - Prefer the `cv_file_path` recorded in `memory.md`
   - If it is missing, then confirm the path with the user
2. Review it from the following dimensions:
   - whether the structural order fits research-oriented applications
   - whether the bullets use clear verbs and explicit outcomes
   - whether research-related experience is placed early enough
   - whether common research-application elements are missing, such as publications, research experience, methods, or technical stack
3. Make targeted refinements based on the target program:
   - strengthen the experiences most relevant to the target direction
   - adjust section order
   - add necessary keywords, but do not invent experiences
4. Decide the delivery mode based on the source file type:
   - if it is a text-based source file, it can be edited directly
   - if it is a format such as PDF / DOCX that is not suitable for stable direct rewriting, default to section-by-section rewriting suggestions and a copyable new version

## Output Requirements

- Include at least three parts:
  - the main issue list
  - the refined version or section-by-section rewriting suggestions
  - why these changes fit research applications better

## Constraints

- Do not force ordinary industry experience into fake research experience.
- Do not delete hard information that is valuable for application judgment just for appearance.
- If the user has given a clear target, prioritize that target instead of doing generic CV optimization.
