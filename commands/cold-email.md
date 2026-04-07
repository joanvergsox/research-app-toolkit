---
name: ra:cold-email
description: Generate or optimize cold emails for professor outreach
argument-hint: "[type] [professor-info]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - Bash
  - AskUserQuestion
  - mcp__web_reader__webReader
---

# Cold Email Command

Parse the email type from `$ARGUMENTS`. Supported types: `first-contact`, `follow-up`, `interview-thanks`, `offer-negotiation`, `reference-remind`, `rejection-follow`. Default to `first-contact` if not specified.

Follow the cold-email skill for full generation process.
