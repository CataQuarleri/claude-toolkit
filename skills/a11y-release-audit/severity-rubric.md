# Severity rubric

Rate each finding by its impact on a real user completing a task, not by how many times the tool flagged it. When unsure between two levels, pick the higher one and note why. The user has the final say.

## Blocker — must fix before release
A user who relies on assistive technology or keyboard **cannot complete a critical flow**, or there's a legal/policy risk.
Examples:
- A button, link, or form control can't be reached or activated by keyboard.
- Keyboard focus gets trapped (can't tab out of a modal or widget).
- A form field has no accessible name, so the screen reader doesn't say what to enter.
- Errors are shown only visually; the screen reader never announces them.
- Content or controls are invisible to the screen reader (or announced as something they're not).
- Time limits with no way to extend them.
- Flashing content that could trigger seizures.

## High — fix before release if possible, otherwise first thing after
A user **can complete the task, but with serious difficulty or confusion**.
Examples:
- Focus is invisible or very hard to see.
- Focus order jumps around illogically.
- Text contrast fails WCAG AA (below 4.5:1 for normal text, 3:1 for large text).
- Modal doesn't return focus to the trigger when closed.
- Status messages (e.g. "Saved", "3 results") aren't announced.
- Content breaks or requires horizontal scrolling at 400% zoom / 320px width.
- Images that carry meaning have missing or wrong alt text.

## Medium — schedule for the next release
Causes friction or inconsistency but doesn't stop the task.
Examples:
- Heading levels skipped or used for styling.
- Missing landmarks (main, nav) or duplicate landmark names.
- Link text like "click here" or "read more" without context.
- Decorative images announced by the screen reader.
- Non-text contrast (icons, input borders) below 3:1.
- Redundant or verbose ARIA that clutters announcements.

## Low — backlog / best practice
Doesn't fail WCAG AA or has minimal user impact.
Examples:
- Best-practice suggestions from automated tools.
- Minor wording improvements to labels or alt text.
- AAA-level improvements.

## Performance severities
- **Blocker:** a critical flow is unusable (e.g. interactions take several seconds, page freezes).
- **High:** INP over 500 ms or CLS over 0.25 on a critical flow.
- **Medium:** INP 200–500 ms, CLS 0.1–0.25, or oversized bundles/images.
- **Low:** optimization opportunities with small user impact.

## Each finding records
- ID (A11Y-001, PERF-001…)
- Screen / flow
- What happens and who it affects
- WCAG success criterion (e.g. 2.1.1 Keyboard)
- Severity and short reason
- Likely source (page code or shared component)
- How it was found (FastPass, Lighthouse, manual, JAWS)
- Status (Open, Fixed – needs retest, Verified, Deferred)
