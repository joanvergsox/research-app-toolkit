---
name: professor-match
description: Use when the user asks to find supervisors, match professors, search for supervisors, or identify professors for a PhD or other research degree. Based on the shared application profile and user preferences, identify potential supervisors, evaluate research fit, and recommend priorities.
---

# Professor Matching

## Preconditions

- Read `../../memory.md` first.
- If there is not yet a CV profile, prioritize suggesting that the user run `cv-analyze` first, because matching judgments depend on the user's background.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies a language, prioritize the current request.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, follow the user's current conversation language.
- Original English proper nouns from professor homepages, school programs, and similar search materials may be retained, but explanatory text should follow the selected output language.

## Optional Linkage: Life Science Research

- If the user's application direction clearly falls under life sciences / biomedical research, such as genetics, functional genomics, immunology, neuroscience, cancer biology, cell biology, or translational medicine, and the current task needs research-direction grounding, then link `life-science-research`.
- This is suitable for linkage in scenarios such as:
  - needing to first clarify target / gene / disease / pathway background
  - needing to judge professor fit based on public literature, datasets, or recent research trajectories
  - needing to start from the research-problem space rather than only searching professors by keywords
- The linkage result should be used primarily to:
  - narrow research keywords
  - judge the natural bridge between the professor's recent work and the user's background
  - identify more specific research-fit narratives
- If the user only wants routine professor search by school / country / project name, or only wants ranking updates, do not trigger that linkage.

## Fill In the Search Conditions First

If the user's request is not specific enough, fill in at least the following information:
- research direction or keywords
- target country / region / school scope
- degree type and enrollment time
- special constraints, such as "must be recently recruiting students", "prefer industry collaboration", or "want full funding"

## Search and Judgment

1. Use web search to find potential professors:
   - prioritize faculty pages, lab pages, and department pages
   - then review representative papers and public projects from the last 2 to 3 years
2. Extract the following for each professor:
   - school, department, and position
   - research direction
   - recent focus work
   - whether there is a public recruitment signal
3. Evaluate fit together with the profile in `memory.md`:
   - whether the user's existing experience can naturally connect to the professor's research
   - whether the technical stack is relevant
   - what abilities or argument points still need to be supplemented

## Output Format

- First provide a concise comparison table:
  - professor
  - school
  - direction
  - fit level
  - key reason
- Then provide detailed entries, and each professor should include at least:
  - research summary
  - 1 to 3 recent representative works
  - reasons for the fit
  - outreach suggestions

## Constraints

- For information such as recruitment, research direction, and school programs, prioritize current web search results.
- If "whether they are recruiting" cannot be confirmed, it must be written clearly as "no public confirmation found"; do not guess.
