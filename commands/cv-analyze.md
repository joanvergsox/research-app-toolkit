---
name: ra:cv-analyze
description: Analyze CV and generate structured profile for research applications
argument-hint: "[cv-file-path]"
---

Follow the `cv-analyze` skill workflow to analyze the user's CV and produce a structured capability profile.

If `$ARGUMENTS` is provided, use it as the CV file path and skip the file discovery steps 1-2. Otherwise, follow the full file discovery process defined in the skill.

Write results to `${CLAUDE_PLUGIN_ROOT}/.local.md` and present the summary as described in the skill.
