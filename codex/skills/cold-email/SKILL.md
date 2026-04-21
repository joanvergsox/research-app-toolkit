---
name: cold-email
description: Use when the user asks to write a cold email, draft an outreach email, follow up with a professor, or prepare other supervisor-facing application emails. Based on the shared application profile and target supervisor information, generate first-contact emails, follow-ups, interview thank-you notes, and offer-related communication.
---

# Outreach Email

## Preconditions

- Read `../../memory.md` first.
- If `cv_profile_analyzed` is not complete, first suggest that the user run `cv-analyze`, unless the user has already directly provided sufficiently complete background materials.

## Language Rules

- Support three output modes: `zh`, `en`, and `bilingual`.
- If the user explicitly specifies the email language, prioritize the current request.
- Otherwise read `preferred_language` from `memory.md`.
- If it is still unclear, prioritize the language commonly used by the target professor or target program.
- If the user requests bilingual output, default to one main email body plus one concise counterpart version, rather than mixing Chinese and English in the same email.

## Identify the Email Type

If the user does not specify it, default to `first-contact`. Supported types:
- `first-contact`
- `follow-up`
- `interview-thanks`
- `offer-negotiation`
- `reference-remind`
- `rejection-follow`

## Fill In the Key Context First

If any of the following is missing, ask directly:
- professor name and school
- whether the user wants Chinese or English
- the 1 to 2 experiences they most want to emphasize
- whether there has already been prior communication

## Writing Workflow

1. Extract the most relevant background from `memory.md`.
2. Verify the target professor through web search:
   - homepage
   - research direction
   - recent papers or projects
3. Identify the 1 to 2 most natural connection points between the user's experience and the professor's research.
4. Output the email draft, and provide subject-line alternatives when necessary.

## Writing Rules

- The first outreach email should be short and direct.
- It must include specific research connections, not just generic praise.
- Do not expose unnecessary weaknesses, such as grade anxiety or previous application failures.
- For English emails, aim to keep them within about 250 to 300 words.
- For Chinese emails, aim to keep them within one screen of readable length.

## Output Requirements

- By default provide:
  - 2 to 3 candidate subject lines
  - the draft email body
  - replaceable personalization sentence slots

## Constraints

- When discussing the professor's latest research direction, rely on current search results.
- Do not fabricate facts such as "having read one of their papers" unless that has actually been verified in this round.
