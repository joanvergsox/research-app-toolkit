---
name: ra:interview-ppt
description: Build or refine a professor-meeting or PhD interview slide deck
argument-hint: "[meeting|formal-interview] [professor-name] [university] [visuals:on|off]"
---

Use the `interview-ppt` skill to organize my application materials into a concise professor-meeting or PhD interview slide deck.

If `$ARGUMENTS` is provided, use it as the initial deck context and infer the mode, professor, university, and visual mode where possible.

By default, produce:

- a compact deck outline
- slide-ready English content
- short speaking notes when needed

If the arguments include `visuals:on`, `visuals:off`, `with-visuals`, or `no-visuals`, treat that as the explicit visual-generation switch.

If the user is revising an existing deck, focus on the specific slide or section they mention instead of regenerating the full deck.

$ARGUMENTS
