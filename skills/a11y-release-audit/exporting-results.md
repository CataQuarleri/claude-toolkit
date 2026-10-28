# Exporting results for Claude

Save every export into the project's `a11y-audit/raw/` folder, in the subfolder for its tool. Claude reads from there.

```
a11y-audit/
  findings.md
  report-YYYY-MM-DD.md
  raw/
    accessibility-insights/
    lighthouse/
    jaws-inspect/
    notes/          ← screenshots or quick notes from manual checks
```

## File naming

Use: `flow-screen-tool-date`, all lowercase, with hyphens.

Examples:
- `signin-login-fastpass-2026-10-28.html`
- `application-step2-lighthouse-snapshot-2026-10-28.json`
- `application-submit-jaws-2026-10-28.json`

The flow and screen names should match the critical flows in `findings.md`, so Claude can link every result to the right flow.

## Before you export: protect the login token

Exports can contain the page URL, and your URL includes the hash-parameter token.

- Prefer exporting **after the token has expired**, or log out first if the tool lets you export afterward.
- If a token might still be valid, open the file and remove it, or ask Claude to redact URLs before reading anything else.
- Keep `a11y-audit/raw/` out of source control. Add this line to the project's `.gitignore`:
  ```
  a11y-audit/raw/
  ```

## Accessibility Insights for Web

**FastPass:**
1. Run FastPass on the screen.
2. Select **Export result** at the top of the results.
3. Choose **HTML** and save it to `a11y-audit/raw/accessibility-insights/`.

**Assessment (guided manual checks):**
1. When you've finished a flow (or are pausing), select **Export result** and save the **HTML** report to the same folder.
2. Optionally, also select **Save assessment** to keep a file you can reload later to continue where you left off. Claude doesn't need this one.

## Lighthouse (Chrome DevTools)

1. Run Lighthouse in **Snapshot** or **Timespan** mode (never Navigation; it reloads and drops the token).
2. In the report, open the **⋮** (three-dot) menu at the top.
3. Select **Save as JSON** and save it to `a11y-audit/raw/lighthouse/`.

JSON is better than HTML for Claude because the scores and failing audits are structured. Include `snapshot` or `timespan` in the file name.

## JAWS Inspect

1. Run the flow with JAWS while JAWS Inspect captures the speech output.
2. Export the session. **JSON** is best for Claude if your version offers it; **CSV** also works well. You can choose the default format in the **Save As** section of JAWS Inspect Settings.
3. Save it to `a11y-audit/raw/jaws-inspect/`.

Tips:
- Export **one file per flow** rather than one huge session. It's easier to match announcements to steps.
- Export only the part of the session for the flow being tested, if your version lets you select a range.
- Avoid PDF exports for Claude; they're harder to read accurately. Keep PDFs for sharing with people.

## Manual checks (keyboard, zoom, contrast)

These don't produce exports. Either tell Claude what you found in chat, or drop screenshots and short notes into `a11y-audit/raw/notes/`.

## Telling Claude it's ready

Once files are saved, say something like:
"FastPass and Lighthouse exports for the sign-in flow are in raw."
Claude will read them, deduplicate, rate, and record the findings.
