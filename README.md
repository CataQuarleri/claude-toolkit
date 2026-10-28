# Claude Toolkit

My personal Claude Code skills and commands for frontend development,
accessibility, and learning in public.

## What's here

| Folder | What it is |
|--------|------------|
| `skills/a11y-release-audit/` | Guided pre-release accessibility (and optional performance) assessment: workflow, severity rubric, manual checklist, export guide, and report template. |
| `commands/` | Slash commands for my learning log: `/log`, `/decision`, `/share`, `/parking`, `/til`. |

## Install

Copy the folders into your personal Claude Code folder:

- **Skills:** `skills/<name>/` → `~/.claude/skills/<name>/`
- **Commands:** `commands/*.md` → `~/.claude/commands/`

On Windows, `~` is your user folder (`C:\Users\<you>`).

To share a skill with a team, copy it into a project's `.claude/skills/` folder instead.

## Learning log commands

The commands save to `~/learning-log/`. Create it first:

```
mkdir -p ~/learning-log/{sessions,decisions,til,talks}
```

## Notes

- Nothing here contains secrets, internal URLs, or work data. Keep it that way.
- Each skill should be tested on a real task before it's added here.
