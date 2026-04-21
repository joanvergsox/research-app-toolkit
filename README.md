# Research Application Toolkit

[![Stars](https://img.shields.io/github/stars/xujingchen1996/research-app-toolkit?style=social)](https://github.com/xujingchen1996/research-app-toolkit/stargazers)
[![Version](https://img.shields.io/badge/version-0.2.3--3-blue)](https://github.com/xujingchen1996/research-app-toolkit/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-purple)](https://claude.ai/code)
[![Codex](https://img.shields.io/badge/Codex-Plugin-teal)](https://openai.com)

Research Application Toolkit is a single repository that ships host-specific integrations for both Claude Code and Codex.

It covers:

- CV analysis and profile extraction
- CV refinement for target programs
- Supervisor matching
- Outreach and follow-up emails
- SOP, personal statement, motivation letter, and proposal drafting
- School selection
- Interview preparation
- Interview PPT / professor meeting deck preparation
- Research gap analysis

## Install

### Recommended: npm CLI

```bash
npm install -g @xujingchen1996/research-app-toolkit
ratk install
```

Optional host selection:

```bash
ratk install --claude
ratk install --codex
ratk install --all
```

Default behavior:

- `ratk install` installs to the hosts detected on the current machine
- `ratk install --claude` installs only the Claude Code plugin
- `ratk install --codex` installs only the Codex plugin
- `ratk install --all` installs to every detected host and skips hosts that are not installed

You can also run the installer without a global install:

```bash
npx @xujingchen1996/research-app-toolkit install
```

## Usage

### Claude Code

After installation into Claude Code, use the slash commands:

```bash
/ra:cv-analyze
/ra:cv-polish
/ra:professor-match
/ra:cold-email
/ra:doc-assist
/ra:school-select
/ra:interview-prep
/ra:interview-ppt
/ra:gap-analysis
```

### Codex

After installation into Codex, use the plugin in chat with prompts such as:

```text
Analyze my CV and extract a research application profile
Match supervisors and schools for my target research area
Draft a bilingual outreach email to a potential supervisor
Help me prepare a professor meeting or PhD interview PPT
```

The Codex host keeps its own `codex/memory.md` state and supports `zh`, `en`, and `bilingual` output modes.

## Repository Layout

```text
research-app-toolkit/
├── .claude-plugin/                  # Claude Code manifest
├── .codex-plugin/                   # Codex manifest
├── .local.md                        # Claude Code shared state template
├── assets/                          # Shared assets such as the Codex icon
├── commands/                        # Claude Code slash commands
├── hooks/                           # Claude Code hooks
├── agents/                          # Claude Code helper agents
├── skills/                          # Claude Code skills
├── codex/
│   ├── memory.md                    # Codex shared state
│   └── skills/                      # Codex skills and bundle manifest
├── bin/                             # npm CLI entrypoint
├── lib/                             # Installer helpers
├── test/                            # Installer tests
├── package.json
└── README.md
```

## Development Notes

- Claude Code and Codex skills are intentionally maintained separately to avoid host-specific prompt interference.
- Shared installation is handled by the `ratk` CLI rather than host auto-discovery from a cloned repository.
- Local host state such as `~/.claude`, `~/.codex`, `~/.agents`, and Codex caches should not be committed to this repository.

## Test

```bash
npm test
```

## License

MIT
