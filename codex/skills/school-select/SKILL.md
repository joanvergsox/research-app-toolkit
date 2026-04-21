---
name: school-select
description: Use when the user asks for school recommendations, program selection, PhD program discovery, MRes program comparison, or university comparison. Based on the application profile, budget, region, and timeline, identify and compare research programs and return reach, match, and safety recommendations.
---

# School Selection Advice

## Preconditions

- Read `../../memory.md` first.
- If there is no application profile yet, prioritize suggesting CV analysis first, then do more credible school selection.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies the output language, prioritize the current request.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, follow the user's current conversation language.
- Proper nouns such as program names, department names, and official requirements may remain in the original language, but explanations and comparison conclusions should follow the selected language.

## Fill In the Decision Variables First

If the user has not stated things clearly, fill in:
- target country / region
- degree type
- budget / funding requirements
- ranking preference
- enrollment time or application cycle
- research direction

## Search Strategy

1. Prioritize checking official program pages to confirm:
   - program name
   - admission requirements
   - funding / scholarship
   - deadline
2. If the user cares about rankings, then additionally check the corresponding ranking source.
3. Combine the user's background in `memory.md` to build three tiers:
   - `Reach`
   - `Match`
   - `Safety`

## Output Requirements

- First provide a comparison table:
  - school
  - program
  - tier
  - deadline
  - funding
  - fit score
- Then provide detailed notes for each program:
  - location
  - key requirements
  - fit judgment against the user's background
  - faculty directions worth contacting

## Constraints

- Application deadlines must be expressed as concrete dates; avoid vague expressions such as "this winter".
- If school requirements or funding information cannot be found, clearly write "to be verified".
- This is a high-cost decision category of advice, so prioritize current search results rather than memory.
