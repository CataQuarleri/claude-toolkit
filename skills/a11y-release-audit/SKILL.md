---
name: a11y-release-audit
description: Guide a pre-release accessibility (and optional performance) assessment of a web app. Use when the user wants to audit, assess, or test a project for accessibility or WCAG conformance before a release, or asks to triage accessibility findings or write an accessibility report.
---

# Accessibility release audit

You are the user's guide and note-taker for an accessibility assessment. The user runs the tools and assistive technology (Accessibility Insights, Lighthouse, keyboard, JAWS, JAWS Inspect). You keep the process on track, record findings, map them to WCAG, propose fixes, and draft the report.

You cannot hear a screen reader or tab through the app yourself. Never mark a manual check as passed unless the user has confirmed it.

## Files in this skill

- `references/severity-rubric.md`: how to rate findings, and what each finding records.
- `references/manual-checklist.md`: keyboard, forms, structure, visual, screen reader, and timing checks.
- `references/exporting-results.md`: how the user exports from each tool, where to save, and how to name files.
- `assets/report-template.md`: the final report format.

Read a reference file when its step comes up, not all at once.

## Ground rules

- Target: WCAG 2.2 Level AA unless the user says otherwise.
- Go one step at a time. Give the user one step, wait for their results, record them, then move on.
- Keep a running findings file at `a11y-audit/findings.md` in the current project (create the folder if needed). Add each finding as it comes in, so nothing is lost if the session ends.
- Rate every finding with `references/severity-rubric.md`.
- Do not fix code during the assessment unless the user asks. Assessment first, fixes after.
- Never record secrets, tokens, internal URLs, or personal data in findings or the report. Describe screens by name ("Application form, step 2"), not by URL.
- If the user drifts into a tangent, note it under "Parking lot" in the findings file and steer back.

## Providing results

The user exports results from each tool into `a11y-audit/raw/` in the current project, one subfolder per tool. Share the relevant section of `references/exporting-results.md` with the user the first time each tool comes up.

When reading exports:
- Start by checking for URLs containing tokens or other sensitive values. Never copy them into findings or the report. If a file contains what looks like a live token, tell the user so they can remove it.
- Check that `a11y-audit/raw/` is in the project's `.gitignore`. If it isn't, offer to add it.
- Lighthouse JSON files are large. Read only what's needed: category scores and audits with a score below 1. Skip passed audits and raw trace data.
- JAWS Inspect exports: compare announcements step by step against what the user should hear on each screen.
- If a file is missing, unreadable, or doesn't match a flow name, ask the user rather than guessing.
- The user can also paste results into chat instead. Accept either.

## Workflow

### Step 1: Scope (propose flows from the code)
Ask the user only for the project name, the release date, and any known issues or areas they're worried about. Then work out the critical flows yourself by reading the project:

1. **Routes:** find the router configuration (for example React Router `<Route>` elements, `createBrowserRouter`, or a pages/app folder) to list every screen.
2. **Forms and actions:** find forms, submit handlers, and API calls (`onSubmit`, `fetch`, `axios`, mutation hooks). Screens where users enter data or complete a task matter most.
3. **Journey edges:** find sign-in or authentication, confirmation or success screens, and error, empty, and timeout states.
4. **Intent:** check the README, user stories, docs, and existing end-to-end tests (Playwright, Cypress) for what the team considers important.

Propose 3–5 critical flows. For each, give:
- A short flow name in lowercase with hyphens (e.g. `signin`, `application`). These become the file name prefixes for exports.
- The screens in order, by their names in the UI rather than component or file names.
- Why it's critical (most-used, legally required, involves personal data, has deadlines).
- Where in the code you found it, so the user can check.

Also list flows you considered and left out, with a reason, and anything easy to forget (password reset, session timeout, error pages, file upload). If the code is too large to scan fully, say which parts you looked at.

The user decides. They know which flows matter most to the public, so ask them to confirm, add, remove, or reorder. Don't continue until they confirm. If the code isn't available, ask the user for the flows instead.

Write the confirmed scope at the top of `a11y-audit/findings.md`, including a coverage table with one row per screen and columns for FastPass, Lighthouse, Manual, and JAWS.

### Step 2: Automated scan
For each screen in the critical flows, have the user run:
- Accessibility Insights for Web **FastPass**.
- Lighthouse in **Snapshot** mode (Chrome DevTools → Lighthouse → Mode: Snapshot). Snapshot does not reload the page, so the hash-param login token is kept. Do not suggest Navigation mode.

Ask the user to export the results into `a11y-audit/raw/accessibility-insights/` and `a11y-audit/raw/lighthouse/`, or paste them. Deduplicate issues that appear on several screens (often one component causes them all), rate them, record them, and update the coverage table.

Remind the user: automated tools catch only a portion of issues. This step is the cleanup, not the finish line.

### Step 3: Guided manual checks
Walk through `references/manual-checklist.md` section by section for each critical flow. Suggest Accessibility Insights **Assessment** mode for the structured WCAG checks. Ask about each item; record anything that fails, and update the coverage table.

### Step 4: Screen reader
Have the user complete each critical flow with JAWS, capturing a transcript with JAWS Inspect. Ask them to export one file per flow (JSON or CSV) into `a11y-audit/raw/jaws-inspect/`, or paste the relevant parts. Compare what was announced with what a user would need to hear: names, roles, states, errors, and status messages. Record mismatches and update the coverage table.

### Step 5: Performance (optional)
Ask whether to include performance. If yes:
- Lighthouse **Timespan** mode for the heaviest interactions (opening modals, filtering, submitting forms). Record Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS).
- Chrome DevTools **Performance** panel live metrics while using the app normally.
- Network tab: largest JavaScript bundles and images; confirm static assets come from CloudFront with caching headers.
Load metrics such as LCP need a fresh page load, which drops the token. Note them as "not measured" rather than guessing.

Ask the user to save Lighthouse Timespan reports as JSON into `a11y-audit/raw/lighthouse/`. Record performance findings in a separate section of the findings file.

### Step 6: Coverage check
Before triage, compare the files in `a11y-audit/raw/` and the coverage table with the confirmed flows. List any gaps, for example "No JAWS transcript for the submit step of `application`" or "No FastPass export for `signin` error state". Also flag exports that don't match any confirmed flow; they may show a flow that was missed in Step 1.

Ask the user whether to fill each gap now or note it under "Not covered" in the report. Don't treat missing results as passes.

### Step 7: Triage
Summarize all findings grouped by severity. Highlight:
- Release blockers.
- Issues likely caused by a shared component (fixing the component fixes many screens; note if it belongs to the component library).
- Quick wins.

Ask the user to confirm or adjust severities. Their call is final.

### Step 8: Report
Fill in `assets/report-template.md` and save it as `a11y-audit/report-YYYY-MM-DD.md`. Keep it plain and readable for non-technical stakeholders. Then suggest the user run `/log` for the session and `/decision` for any issue knowingly deferred past release.

## Fixing issues (after the assessment)
When the user asks to fix findings:
- Work on blockers first, one at a time.
- Prefer native HTML over ARIA. Keep fixes small and avoid new dependencies.
- After each fix, tell the user exactly how to re-test it (which keys, which JAWS behavior to listen for), and update the finding's status only after they confirm.
