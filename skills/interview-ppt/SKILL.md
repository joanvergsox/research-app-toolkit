---
name: Interview PPT
description: This skill should be used when the user asks to prepare a PhD interview deck, professor meeting slides, research presentation PPT, slide-by-slide speaking notes, or to reorganize project materials into interview-friendly slides. It structures CV, project files, and supervisor fit into a concise academic presentation for professor meetings and formal interviews.
---

# Interview PPT

## 1. Goal

This skill organizes application materials into a professor-meeting or research-interview slide deck.

It focuses on:

- deck outline
- slide-by-slide English content
- short speaking notes
- restructuring projects into interview-friendly logic
- optional visual suggestions, image prompts, or direct image generation when explicitly requested

It does **not** need to generate a `.pptx` file unless the user explicitly asks for file creation.

## 2. Context Sources

Use the following sources in this order:

1. `${CLAUDE_PLUGIN_ROOT}/.local.md`
2. The user's CV, resume, project PDFs, screenshots, or notes
3. Current web search results if the user asks for supervisor-fit content or if recent professor information matters

If the user has not run `/ra:cv-analyze` but has already provided enough materials in the current conversation, continue directly instead of blocking.

## 3. First Decision: deck mode

Identify the intended deck mode. If the user does not specify, infer from context:

- `meeting`: first contact, supervisor meeting, informal academic discussion
- `formal-interview`: PhD interview, scholarship interview, panel interview
- `project-presentation`: focused explanation of selected projects

If uncertain, default to `formal-interview`.

## 3.1 Visual generation mode

Decide visual mode before writing the deck. Use this priority order:

1. explicit switch in the current request or `$ARGUMENTS`
2. explicit natural-language request to generate visuals
3. default fallback

Supported explicit switches:

- `visuals:on`
- `visuals:off`
- `with-visuals`
- `no-visuals`

Rules:

- If the user explicitly asks to "also generate the visuals", "make the figures too", "create images for the slides", or similar, set visual mode to `on`.
- If the user explicitly disables visuals, set visual mode to `off` even if visuals are mentioned elsewhere.
- If neither a switch nor a clear request is present, default to `off`.
- When visual mode is `on`, use any image-generation capability available in the current host. If image generation is unavailable, fall back to image prompts plus layout guidance.
- Reuse existing user-provided images, screenshots, charts, or diagrams before generating new ones.
- Unless the user explicitly asks for visuals on every slide, generate visuals only for the 1 to 3 slides where they materially improve the presentation.

## 4. Standard Workflow

### 4.1 Build the deck strategy

First determine:

- target professor or program
- interview language
- strongest 2 to 4 projects or experience blocks
- whether the user needs only content, or content plus speaking notes
- whether visual mode is `on` or `off`

Then propose a compact deck structure. Prefer concise academic decks rather than CV-like slides.

Typical sections:

- Who I Am
- Awards / Skills
- Research & Project Experience
- Teaching / Industry Experience
- Research Fit
- Potential PhD Directions
- Closing / Q&A

### 4.2 Restructure project material

For project slides, do not simply repeat documentation sections such as background / aim / summary.

Prefer interview-friendly structures such as:

- Objective / Process / Outcome
- Problem / Method / Result
- Goal / Key Design / What I Learned

If the user wants clearer presentation logic, prioritize:

- 2 objectives per project
- 1 slide per objective
- each slide contains what was done, how it was done, and what was achieved

### 4.3 Write slide content

For each slide, provide:

- slide title
- concise English bullets that can be pasted into PPT
- optional layout suggestion when useful

The wording should be academic, direct, and easy to speak aloud.

### 4.4 Write speaking notes

If the user asks for speaking notes, write short, natural English scripts.

Default speaking-note style:

- 20 to 40 seconds per slide
- simple sentence structure
- suitable for professor meetings
- not overly polished or theatrical

### 4.5 Visual support

If visuals are helpful and visual mode is `off`, suggest one of:

- what type of figure should appear on the slide
- an image-generation prompt
- a simple diagram structure

If visual mode is `on`:

- generate the image directly when the host provides image-generation capability
- otherwise provide a clean image-generation prompt plus slide placement guidance
- by default, prioritize high-value slides such as project explanation, system architecture, process flow, or research-fit transition

For project visuals, prefer:

- process flow
- data / component relationship
- technical highlights
- scene / application concept

## 5. Research-fit slides

When the deck includes a supervisor-fit section:

1. identify the professor's research themes
2. match them to the user's background
3. avoid generic praise
4. make the transition from past projects to future PhD direction feel natural

Good fit slides usually answer:

- why this professor
- why this user
- what research bridge already exists

## 6. Future-direction slides

If the user asks for future research interests, avoid generic keyword-only lists.

Prefer 2 to 3 mini-proposals with:

- direction title
- short problem statement
- possible methods

If the user wants the slide shorter, compress each item into:

- one-line direction
- one-line methods

## 7. Output rules

Prioritize high-value output in this order:

1. deck outline
2. final slide text
3. speaking notes
4. generated visuals when visual mode is `on`, otherwise visual suggestions

When the user is already editing a deck, do not regenerate the whole presentation unless asked. Focus on the specific slide or section being revised.

## 8. Constraints

- Do not turn slides into long paragraphs.
- Do not copy the CV directly into PPT bullets.
- Do not fabricate publications, methods, datasets, results, or professor interests.
- For current professor information, prefer live verification over memory.
- Keep the deck interview-oriented rather than thesis-defense-oriented.
- Do not generate decorative visuals that add style but no explanatory value.
