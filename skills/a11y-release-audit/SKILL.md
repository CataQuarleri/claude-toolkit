---
name: a11y-release-audit
description: Guide a pre-release accessibility (and optional performance) assessment of a web app. Use when the user wants to audit, assess, or test a project for accessibility or WCAG conformance before a release, or asks to triage accessibility findings or write an accessibility report.
---

# Accessibility release audit

You are the user's guide and note-taker for an accessibility assessment. The user runs the tools and assistive technology (Accessibility Insights, Lighthouse, keyboard, JAWS, JAWS Inspect). You keep the process on track, record findings, map them to WCAG, propose fixes, and draft the report.

You cannot hear a screen reader or tab through the app yourself. Never mark a manual check as passed unless the user has confirmed it.

## Ground rules

- Target: WCAG 2.2 Level AA unless the user says otherwise.
- Go one step at a time. Give the user one step, wait for their results, record them, then move on.
- Keep a running findings file at `a11y-audit/findings.md` in the current project (create the folder if needed). Add each finding as it comes in, so nothing is lost if the session ends.
- Rate every finding with `severity-rubric.md`.
- Do not fix code during the assessment unless the user asks. Assessment first, fixes after.
- Never record secrets, tokens, internal URLs, or personal data in findings or the report. Describe screens by name ("Application form, step 2"), not by URL.
- If the user drifts into a tangent, note it under "Parking lot" in the findings file and steer back.

## Providing results

The user exports results from each tool into `a11y-audit/raw/` in the current project, one subfolder per tool. `exporting-results.md` explains how to export from each tool, where to save, and how to name files. Share the relevant section with the user the first time each tool comes up.

When reading exports:
- Start by checking for URLs containing tokens or other sensitive values. Never copy them into findings or the report. If a file contains what looks like a live token, tell the user so they can remove it.
- Check that `a11y-audit/raw/` is in the project's `.gitignore`. If it isn't, offer to add it.
- Lighthouse JSON files are large. Read only what's needed: category scores and audits with a score below 1. Skip passed audits and raw trace data.
- JAWS Inspect exports: compare announcements step by step against what the user should hear on each screen.
- If a file is missing, unreadable, or doesn't match a flow name, ask the user rather than guessing.
- The user can also paste results into chat instead. Accept either.

## Workflow

### Step 1: Scope
Ask the user for:
- The project name and release date.
- 3–5 critical user flows (things users must be able to do, e.g. sign in, complete the main form, see confirmation).
- Any known issues or areas they're worried about.

Write the scope at the top of `a11y-audit/findings.md`. Confirm it before continuing.

### Step 2: Automated scan
For each screen in the critical flows, have the user run:
- Accessibility Insights for Web **FastPass**.
- Lighthouse in **Snapshot** mode (Chrome DevTools → Lighthouse → Mode: Snapshot). Snapshot does not reload the page, so the hash-param login token is kept. Do not suggest Navigation mode.

Ask the user to export the results into `a11y-audit/raw/accessibility-insights/` and `a11y-audit/raw/lighthouse/` (see `exporting-results.md`), or paste them. Deduplicate issues that appear on several screens (often one component causes them all), rate them, and record them.

Remind the user: automated tools catch only a portion of issues. This step is the cleanup, not the finish line.

### Step 3: Guided manual checks
Walk through `manual-checklist.md` section by section for each critical flow. Suggest Accessibility Insights **Assessment** mode for the structured WCAG checks. Ask about each item; record anything that fails.

### Step 4: Screen reader
Have the user complete each critical flow with JAWS, capturing a transcript with JAWS Inspect. Ask them to export one file per flow (JSON or CSV) into `a11y-audit/raw/jaws-inspect/`, or paste the relevant parts. Compare what was announced with what a user would need to hear: names, roles, states, errors, and status messages. Record mismatches.

### Step 5: Performance (optional)
Ask whether to include performance. If yes:
- Lighthouse **Timespan** mode for the heaviest interactions (opening modals, filtering, submitting forms). Record Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS).
- Chrome DevTools **Performance** panel live metrics while using the app normally.
- Network tab: largest JavaScript bundles and images; confirm static assets come from CloudFront with caching headers.
Load metrics such as LCP need a fresh page load, which drops the token. Note them as "not measured" rather than guessing.

Ask the user to save Lighthouse Timespan reports as JSON into `a11y-audit/raw/lighthouse/`. Record performance findings in a separate section of the findings file.

### Step 6: Triage
Summarize all findings grouped by severity. Highlight:
- Release blockers.
- Issues likely caused by a shared component (fixing the component fixes many screens; note if it belongs to the component library).
- Quick wins.

Ask the user to confirm or adjust severities. Their call is final.

### Step 7: Report
Fill in `report-template.md` and save it as `a11y-audit/report-YYYY-MM-DD.md`. Keep it plain and readable for non-technical stakeholders. Then suggest the user run `/log` for the session and `/decision` for any issue knowingly deferred past release.

## Fixing issues (after the assessment)
When the user asks to fix findings:
- Work on blockers first, one at a time.
- Prefer native HTML over ARIA. Keep fixes small and avoid new dependencies.
- After each fix, tell the user exactly how to re-test it (which keys, which JAWS behavior to listen for), and update the finding's status only after they confirm.
