---
name: gap-analysis
description: Use when the user asks to analyze research gaps, find research gaps, generate research ideas, or analyze papers for gaps. Read a set of papers, summarize methods and limitations, identify open questions, and propose executable research ideas aligned with the user's profile.
---

# Research Gap Analysis

## Preconditions

- Read `../../memory.md` first.
- If there is no CV profile yet, first suggest that the user run `cv-analyze`, because feasibility judgment depends on the user's ability background.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies the output language, prioritize the current request.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, follow the user's current conversation language.
- Academic proper nouns such as paper titles, method names, and conference names may remain in the original language, while the analysis and conclusions should follow the selected language.

## Optional Linkage: Life Science Research

- If the user's question clearly belongs to life sciences / biomedical research, prioritize treating `life-science-research` as the research evidence layer, while the current skill serves as the application-oriented synthesis layer.
- This is especially suitable for linkage in scenarios such as:
  - needing to first sort out gene / protein / disease / pathway / expression / clinical evidence
  - needing to first find public datasets, preprints, or omics resources before discussing research gaps
  - needing to turn public evidence in biomedical directions into research ideas that are usable for applications, interviews, or proposals
- After linkage, this skill is responsible for:
  - summarizing cross-evidence signals
  - evaluating feasibility together with `memory.md`
  - narrowing research gaps into 3 to 5 application-oriented ideas
- If the user has already provided a clear paper set and only wants local gap comparison without additional background expansion, do not trigger that linkage.

## Clarify the Input Source First

First confirm the paper source with the user:
- local folder
- single / multiple PDFs
- Zotero collection or item

If the user wants to use Zotero and the current environment has usable Zotero tools, use them; otherwise fall back to local files.

## Processing Workflow

1. List the papers to be analyzed and confirm the scope with the user.
2. Extract the following from each paper:
   - core question
   - method
   - experiments / results
   - limitations
3. Perform cross-paper comparison, cutting in from at least four types of gaps:
  - method gaps
  - application gaps
  - theoretical gaps
  - engineering / efficiency gaps
4. Combine the skill profile in `memory.md` to propose 3 to 5 research ideas and judge feasibility.

## Parallel Strategy

- By default, sequential or batched local processing is sufficient.
- Only when the user explicitly asks for "parallel", "sub-agents", or "delegation" may `spawn_agent` be used for per-paper parallel work.
- Even when parallelized, the final comparison, conflict judgment, and synthesized conclusion must still be completed by the main agent.

## Output Requirements

- First provide a gap summary.
- Then provide 3 to 5 ideas, each of which includes:
  - research question
  - method idea
  - basis for novelty
  - required skills / resources
  - feasibility：High / Medium / Low
  - potential submission direction

## Constraints

- Do not directly package future work explicitly discussed by the paper authors themselves as a "novel idea".
- Feasibility evaluation must explicitly reference the user's existing skills, rather than giving a vague score.
