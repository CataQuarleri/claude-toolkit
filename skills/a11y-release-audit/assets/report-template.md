# Accessibility and performance assessment

**Project:** [name]
**Release:** [version / date]
**Assessed by:** [name]
**Date:** [YYYY-MM-DD]
**Standard:** WCAG 2.2 Level AA

## Summary
[2–4 plain-language sentences: is this ready to release? How many blockers? What's the biggest risk?]

**Recommendation:** Ready to release / Ready with conditions / Not ready

| Severity | Open | Fixed and verified | Deferred |
|----------|------|--------------------|----------|
| Blocker  |      |                    |          |
| High     |      |                    |          |
| Medium   |      |                    |          |
| Low      |      |                    |          |

## Scope
**Critical flows tested:**
1. [flow]
2. [flow]
3. [flow]

**Browser and assistive technology:** [e.g. Chrome version, JAWS version]
**Methods:** Accessibility Insights FastPass and Assessment, Lighthouse (Snapshot and Timespan), keyboard-only testing, JAWS with JAWS Inspect, zoom and reflow.

**Not covered:** [e.g. page-load metrics (LCP), other browsers, mobile screen readers]

## Release blockers
For each blocker:

### A11Y-001: [short title]
- **Where:** [screen / flow]
- **Impact:** [who is affected and how]
- **WCAG:** [criterion]
- **Source:** [page code or shared component]
- **Status:** [Open / Fixed – needs retest / Verified]
- **Fix:** [summary]

## Other findings
| ID | Where | Issue | WCAG | Severity | Status |
|----|-------|-------|------|----------|--------|
|    |       |       |      |          |        |

## Shared component issues
[Issues that come from the component library, so the fix helps every app using it.]

## Performance
| Interaction | INP | CLS | Notes |
|-------------|-----|-----|-------|
|             |     |     |       |

[Bundle size, image, and caching observations.]

## Deferred items
[Each issue knowingly deferred past release: why, risk, and target date. Link to the decision record.]

## What went well
[Things that already worked well, e.g. accessible components, good form labels.]

## Recommendations for next time
[Process improvements, e.g. add automated axe tests to the PR pipeline, fix shared components in the library.]
