# Research Application Toolkit

A Claude Code plugin for research degree applications (PhD, MRes, MPhil). Provides an integrated workflow for CV analysis, professor matching, cold email optimization, document assistance, school selection, interview preparation, and research gap analysis.

## Features

- **CV Analysis** — Extract structured capability profile from your CV for downstream use
- **CV Polish** — Tailor and improve your CV for specific applications
- **Professor Match** — Search professors, evaluate research fit, and get match scores
- **Cold Email** — Generate personalized outreach emails (6 types: first-contact, follow-up, interview-thanks, offer-negotiation, reference-remind, rejection-follow)
- **Document Assist** — Draft SOPs, motivation letters, research proposals, and recommendation letters
- **School Selection** — Get tiered school recommendations (reach/match/safety) based on your profile
- **Interview Prep** — Practice with mock questions based on your target professor's research
- **Gap Analysis** — Discover research gaps and generate novel ideas from paper collections (supports local folders and Zotero)

## Installation

### Local Installation

1. Clone or copy this plugin to your local plugins directory:

```bash
# From GitHub
git clone https://github.com/your-username/research-app-toolkit.git ~/.claude/plugins/local/research-app-toolkit
```

2. Register in your local marketplace (`~/.claude/plugins/local/.claude-plugin/marketplace.json`):

```json
{
  "plugins": [
    {
      "name": "research-app-toolkit",
      "description": "Research application toolkit for PhD, MRes, MPhil applications",
      "version": "0.1.0",
      "author": { "name": "Your Name" },
      "source": "./research-app-toolkit"
    }
  ]
}
```

3. Restart Claude Code to load the plugin.

### From Claude Code Marketplace

```
/install research-app-toolkit
```

## Quick Start

```bash
# Step 1: Analyze your CV (required first step)
/ra:cv-analyze
/ra:cv-analyze /path/to/your/CV.pdf

# Step 2: Use other features
/ra:cold-email first-contact          # Generate a cold email to a professor
/ra:professor-match HKBU HCI         # Search professors at HKBU in HCI
/ra:doc-assist sop                   # Draft a Statement of Purpose
/ra:school-select Australia AI        # Get school recommendations
/ra:interview-prep "Hui Ye" HKBU     # Prepare for an interview
/ra:gap-analysis ./papers/            # Analyze papers for research gaps
/ra:cv-polish                         # Polish your CV
```

## Commands

| Command | Description | Arguments |
|---------|-------------|-----------|
| `/ra:cv-analyze` | Analyze CV and generate structured profile | `[cv-file-path]` |
| `/ra:cv-polish` | Polish and improve CV | `[target-school-or-position]` |
| `/ra:professor-match` | Search and match professors | `[school] [field]` |
| `/ra:cold-email` | Generate outreach emails | `[type] [professor-info]` |
| `/ra:doc-assist` | Assist with application documents | `[sop\|motivation\|rp\|referee]` |
| `/ra:school-select` | Recommend and compare schools | `[region] [field]` |
| `/ra:interview-prep` | Prepare for interviews with mock Q&A | `[professor-name] [university]` |
| `/ra:gap-analysis` | Analyze papers for research gaps | `[folder-path]` |

### Email Types (cold-email)

| Type | Purpose |
|------|---------|
| `first-contact` | Initial outreach to a professor |
| `follow-up` | Follow up after no response |
| `interview-thanks` | Thank you after interview |
| `offer-negotiation` | Admission communication |
| `reference-remind` | Reminder to referees |
| `rejection-follow` | Inquiry after rejection |

## Configuration

The plugin uses a `.local.md` file for persistent user preferences. On first use, configuration is guided interactively.

### Configuration Fields

| Field | Description | Default |
|-------|-------------|---------|
| `research_interests` | Target research areas | `[]` |
| `target_regions` | Preferred countries/regions | `[]` |
| `target_schools` | Schools of interest | `[]` |
| `target_degree` | Degree type | `PhD` |
| `language_scores` | IELTS/TOEFL scores | `null` |
| `email_tone` | Email style preference | `professional` |
| `preferred_language` | Output language | `zh` |

## Personalization

Skills that support personalization (`cv-polish`, `professor-match`, `cold-email`, `school-select`, `gap-analysis`) will ask whether you want personalized customization before proceeding:

- **Yes** — Answer 4-5 targeted questions for tailored results
- **No** — Use existing configuration for standard results

## Directory Structure

```
research-app-toolkit/
├── .claude-plugin/
│   └── plugin.json
├── .local.md                          # User configuration template
├── commands/                          # Slash commands
│   ├── cv-analyze.md
│   ├── cv-polish.md
│   ├── professor-match.md
│   ├── cold-email.md
│   ├── doc-assist.md
│   ├── school-select.md
│   ├── interview-prep.md
│   └── gap-analysis.md
├── skills/                            # Auto-activating skills
│   ├── cv-analyze/SKILL.md
│   ├── cv-polish/SKILL.md
│   ├── professor-match/SKILL.md
│   ├── cold-email/SKILL.md
│   ├── document-assist/SKILL.md
│   ├── school-select/SKILL.md
│   ├── interview-prep/SKILL.md
│   └── gap-analysis/SKILL.md
├── agents/                            # Subagents
│   └── paper-reader.md
├── hooks/
│   └── hooks.json
└── README.md
```

## Requirements

- Claude Code CLI
- (Optional) Zotero with MCP integration for paper management in gap-analysis

## License

MIT
