---
name: Cold Email
description: This skill should be used when the user asks to "write a cold email", "draft a 套磁信", "compose outreach email", "follow up professor", "write thank you email", "negotiate offer", or runs /ra:cold-email. It generates and optimizes various types of emails for research application communication.
---

# Cold Email Skill

## Prerequisite Check

Read `${CLAUDE_PLUGIN_ROOT}/.local.md`. If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

## Email Types

Parse `$ARGUMENTS` to determine type. Default to `first-contact` if not specified.

| Type | Purpose | Key Elements |
|------|---------|-------------|
| `first-contact` | Initial outreach / 套磁 | Professor research connection, user's relevant experience, clear ask |
| `follow-up` | No response follow-up | Reference previous email, add new value (new paper read, project update) |
| `interview-thanks` | Post-interview thank you | Reference interview discussion points, reiterate interest |
| `offer-negotiation` | Admission communication | Express gratitude, ask about funding/timeline/start date |
| `reference-remind` | Reminder to referees | Polite reminder with deadline, offer to provide updated materials |
| `rejection-follow` | Post-rejection inquiry | Express continued interest, ask about future opportunities |

## Personalization Mode

Ask the user: "是否需要个性化定制？会问你 4-5 个问题来生成更贴合你需求的结果。"

- If **no** -> proceed with standard flow (use cv_profile data only).
- If **yes** -> collect answers via AskUserQuestion using the questions below.

### Personalization Questions (first-contact example)

For time-related questions, run `date` first and include the current date in the question.

- Target professor name and university?
- How did you discover this professor? (Xiaohongshu, Google Scholar, referral, etc.)
- Which experience/project do you want to highlight most?
- Preferred email tone? (formal / professional / friendly)
- Email language? (Chinese / English)

## Email Generation Process

1. Read cv_profile from `.local.md`
2. If personalization opted in, collect answers via AskUserQuestion
3. Search target professor info (WebSearch + webReader for homepage, Google Scholar)
4. Identify 1-2 specific connections between professor's work and user's experience
5. Draft email with:
   - Appropriate greeting (formal for Chinese professors, standard academic for Western)
   - Brief self-introduction (1 sentence)
   - Research connection paragraph (the core -- must reference specific papers/projects)
   - Relevant experience from cv_profile (1-2 most matching items)
   - Clear call-to-action
   - Professional sign-off
6. Present draft, ask for feedback, iterate if needed

## Email Quality Rules

- Never expose weaknesses (grades, lack of publications) in the email
- Always include a specific connection to the professor's work (paper name, project, research direction)
- Keep first-contact emails concise (under 300 words for English, under 400 characters for Chinese)
- Match the language of the professor's institution (Chinese for mainland, English for HK/overseas)
- For follow-up: wait at least 1-2 weeks before suggesting follow-up (check dates with `date`)
