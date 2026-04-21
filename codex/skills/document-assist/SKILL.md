---
name: document-assist
description: Use when the user asks to draft or revise an SOP, personal statement, motivation letter, research proposal, recommendation-letter draft, or similar application document. Based on the shared application profile and user materials, generate research application documents.
---

# Application Document Assistance

## Preconditions

- Read `../../memory.md` first.
- If the application profile is missing, first suggest that the user run `cv-analyze`, or fill in the necessary background directly in this round before continuing.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies the document language, prioritize the current request.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, prioritize the official commonly used language of the target program.
- If the user requests bilingual output, default to one main draft language version plus one shortened counterpart version or outline, rather than repeating the entire document paragraph by paragraph.

## Optional Linkage: Life Science Research

- If the user's application direction clearly falls under life sciences / biomedical research, and the document needs real research background support, `life-science-research` can be linked first before drafting.
- This is especially suitable for the following document tasks:
  - `research-proposal`
  - cases where `research fit` needs to be written clearly
  - cases that require future directions, problem significance, or dataset / pathway / target context
- The linkage result can be used to:
  - supplement research background
  - refine a more specific research question
  - organize literature / dataset / target / disease context
  - avoid documents that stay at the level of vague interest statements
- If the current task is only language polishing, word-count reduction, tone adjustment, or structure adjustment, and the user has already provided complete content, do not trigger that linkage.

## Identify the Document Type

If the user does not specify it, default to `sop`. Supported types:
- `sop`
- `motivation`
- `research-proposal`
- `recommendation-draft`

## Material Collection

For document tasks, do not start writing immediately; first fill in the minimum required materials:
- target program and school
- target professor / lab group, if any
- experiences that must be included
- application motivation
- short-term / long-term goals after graduation
- word-count or formatting requirements

## Workflow

1. Extract reusable background from `memory.md`.
2. Provide a short outline first.
3. Then output the full first draft.
4. If the user has hard constraints, such as word count, prompt title, or paragraph count, strictly narrow the output to those limits.

## Document Rules

- Do not fabricate experiences, papers, awards, or motivations.
- Prioritize a style that is real, specific, and verifiable.
- A `research-proposal` must clearly define the research question, method, expected contribution, and risks.
- A `recommendation-draft` must be written from the recommender's perspective.

## Output Requirements

- By default include:
  - an outline
  - a full draft
  - 2 to 4 points that can be further strengthened
