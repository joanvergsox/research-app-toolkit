---
name: interview-ppt
description: Use when the user asks to prepare a PhD interview deck, professor meeting slides, research presentation PPT, slide-by-slide speaking notes, or interview visuals. Structure CV, project files, and supervisor fit into an interview-ready academic deck, and generate visuals when explicitly requested.
---

# Interview PPT Organization

## Preconditions

- Read `../../memory.md` first.
- If `cv_profile_analyzed` is not complete, but the user has already provided enough materials in the current conversation, continue directly and do not block forcibly.
- If project documents, the target professor, or the target scenario are missing, prioritize filling in the minimum necessary information.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly requests English slide content or English speaking notes, prioritize the current request.
- If not explicitly stated, read `preferred_language` from `memory.md`.
- If the output is bilingual, default to keeping slide content in the main presentation language and do not repeat the entire deck bilingually.

## Optional Linkage: Life Science Research

- If the user is preparing an interview or professor-meeting PPT in a life sciences / biomedical direction and needs stronger scientific grounding, `life-science-research` can be linked first.
- This is especially suitable for pages such as:
  - Research Fit
  - Why This Lab / Why This Professor
  - Future Directions
  - Problem Significance
- The linkage result can help strengthen:
  - target / gene / disease / pathway background
  - current public evidence and research gaps
  - dataset / omics / clinical evidence context
  - the transition from existing projects to future research directions
- If the user only wants general expression optimization, layout simplification, or slide-by-slide speaking notes and already has complete slide text, do not trigger that linkage.

## Determine the Deck Mode First

Determine and narrow the deck type according to the scenario:

- `meeting`: outreach, first meeting, professor communication
- `formal-interview`: PhD interview, scholarship interview, panel interview
- `project-presentation`: focused explanation of 1 to 2 projects

If the user does not specify it, default to `formal-interview`.

## Visual Generation Mode

Before organizing the deck, first determine visual mode. The priority order is:

1. explicit switches in the current request
2. explicit natural-language requests in the current request
3. the default fallback

Supported explicit switches:

- `visuals:on`
- `visuals:off`
- `with-visuals`
- `no-visuals`

Rules:

- If the user explicitly says things like "also generate the visuals", "make the figures too", or "create images for every slide", set it to `on`.
- If the user explicitly disables image generation, treat it as `off` even if visuals are mentioned elsewhere in the context.
- If there is no explicit switch and no clear request, default to `off`.
- When visual mode is `on`, if the current host provides image generation / image-gen capability, generate visuals directly; if the current host does not have that capability, fall back to image prompts and layout suggestions.
- Prioritize reusing the user's existing images, screenshots, charts, or project materials, rather than regenerating unconditionally.
- Unless the user explicitly asks for visuals on every slide, by default generate visuals only for the 1 to 3 highest-value slides.

## Workflow

### 1. Build the Overall Deck Strategy First

Prioritize confirming:

- target professor / program
- interview language
- the strongest 2 to 4 project or experience blocks
- whether the user only wants slide content, or also wants speaking notes / visuals
- whether the current visual mode is `on` or `off`

When outputting, prioritize a high-information-density, low-redundancy academic meeting structure rather than CV-style slide flipping.

Common page order:

- Who I Am
- Awards / Skills
- Research & Project Experience
- Teaching / Industry Experience
- Research Fit
- Potential PhD Directions
- Closing / Q&A

### 2. Rebuild Project Material Into Meeting Logic

Do not mechanically reuse the original project-document structure of background / aim / data / summary.

Prioritize restructuring into forms that fit a meeting better, for example:

- Objective / Process / Outcome
- Problem / Method / Result
- Goal / Key Design / What I Learned

If the user wants it to be easier to present orally, prioritize:

- 2 objectives per project
- 1 slide per objective
- each slide should clearly explain what was done, how it was done, and what results were achieved

### 3. Generate Slide Content

For each page, output by default:

- slide title
- English bullets that can be directly pasted into the PPT
- add one layout suggestion when necessary

Style requirements:

- academic
- concise
- easy to deliver orally

### 4. Generate Speaking Notes

If the user wants a spoken script, default to short English speaking notes:

- about 20 to 40 seconds per slide
- simple sentences
- suitable for professor meetings
- avoid over-decoration

### 5. Generate Visual Suggestions

When a page needs visuals and visual mode is `off`, prioritize providing:

- a suitable figure type
- an image generation prompt
- a simple flowchart / structure diagram suggestion

When visual mode is `on`:

- if the host supports image generation, generate images directly
- if the host does not support it, output reusable image prompts and page placement suggestions
- by default, prioritize project explanation pages, system structure pages, process pages, and research-fit transition pages

For project pages, prioritize:

- flowcharts
- module relationship diagrams
- technical highlight diagrams
- scenario concept diagrams

## Research Fit Page

If the user requests a page matching the professor's research direction:

1. first extract the professor's research themes
2. then extract the natural connection points in the user's background
3. avoid vague praise
4. make the transition from "past experience -> future research direction" feel natural

## Future Directions Page

If the user requests future research interests:

- do not provide only a keyword list
- prioritize outputting 2 to 3 mini-proposals

Each direction should include as much as possible:

- direction title
- short problem definition
- possible methods

If the user wants it shorter, compress it into:

- one line for the direction
- one line for methods

## Output Priority

Output high-value content in the following order:

1. overall deck outline
2. final slide text
3. speaking notes
4. generated images when visual mode is `on`, otherwise visual suggestions

If the user already has an existing PPT, prioritize revising only the specified pages rather than rebuilding the whole deck.

## Constraints

- Do not turn the PPT into long document paragraphs.
- Do not directly flatten the CV into bullets.
- Do not fabricate papers, methods, results, datasets, or professor interests.
- When the professor's current research direction is involved, prioritize verifying the latest public information.
- The whole deck should lean toward meeting presentation rather than thesis-defense style.
- Do not generate decorative images unrelated to the explanatory logic just for appearance.
