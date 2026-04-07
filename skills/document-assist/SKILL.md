---
name: Document Assist
description: This skill should be used when the user asks to "write SOP", "draft personal statement", "write motivation letter", "write research proposal", "draft recommendation letter", "help with application essay", or runs /ra:doc-assist. It assists with various application documents.
---

# Document Assist Skill

## Prerequisite Check

Read `${CLAUDE_PLUGIN_ROOT}/.local.md`. If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

## Document Types

Parse `$ARGUMENTS` to determine type. Default to `sop` if not specified.

| Type | Purpose | Typical Length |
|------|---------|---------------|
| `sop` | Statement of Purpose | 500-1000 words |
| `motivation` | Motivation Letter | 500-800 words |
| `rp` | Research Proposal | 1000-2000 words |
| `referee` | Recommendation Letter draft | 300-500 words |

## Material Collection (ALWAYS ask, no personalization toggle)

For all document types, always collect material through AskUserQuestion. Do not ask about personalization -- material collection is mandatory.

- Target program and university?
- Specific research group or professor?
- Key experiences to include (pre-fill suggestions from cv_profile)?
- Personal motivation/story for pursuing this degree?
- Career goals after graduation?
- Any specific requirements from the program?

## Writing Process

1. Read cv_profile from `.local.md`
2. Collect material via AskUserQuestion
3. Generate structured outline based on document type:
   - **SOP**: intro -> academic background -> research experience -> motivation -> fit with program -> career goals -> conclusion
   - **Motivation Letter**: intro -> why this field -> relevant experience -> why this program -> future plans
   - **RP**: research question -> literature review -> methodology -> expected contribution -> timeline
   - **Referee Letter**: relationship context -> candidate strengths -> specific examples -> summary endorsement
4. Write draft section by section, pausing for user input at key decision points
5. Review for consistency with cv_profile

## Writing Rules

- Write in the language specified by user or matching the target program
- Maintain authentic voice -- do not fabricate experiences
- Cross-reference with cv_profile to ensure consistency
- For RP: include proper citation format suggestions
- For referee letters: write from the referee's perspective, not the applicant's
