# Manual checklist

Run through each critical flow. Record only failures (and anything you're unsure about) as findings.

## Keyboard (put the mouse away)
- [ ] Every interactive element can be reached with Tab / Shift+Tab. (2.1.1)
- [ ] Every control works with the expected keys: Enter for links and buttons, Space for buttons and checkboxes, arrows for radios, menus, and tabs. (2.1.1)
- [ ] Focus never gets trapped; you can always move on. (2.1.2)
- [ ] Focus order follows the visual and logical order. (2.4.3)
- [ ] Focus is always clearly visible, and not hidden behind sticky headers or footers. (2.4.7, 2.4.11)
- [ ] Opening a modal moves focus into it; Escape closes it; closing returns focus to the trigger.
- [ ] A "skip to main content" link (or equivalent) is available. (2.4.1)
- [ ] Nothing important happens only on hover.

## Forms and errors
- [ ] Every field has a visible label tied to it. (1.3.1, 3.3.2)
- [ ] Required fields are indicated in text, not color alone. (1.4.1)
- [ ] Error messages say what's wrong and how to fix it. (3.3.1, 3.3.3)
- [ ] Errors are announced or focus moves to them on submit.
- [ ] Inputs for personal info use the right autocomplete attributes. (1.3.5)
- [ ] Users don't have to re-enter info they already gave in the same flow. (3.3.7)

## Structure and content
- [ ] Page title is unique and describes the page. (2.4.2)
- [ ] One clear H1; headings follow a logical outline. (1.3.1)
- [ ] Landmarks exist: header, nav, main, footer. (1.3.1)
- [ ] Link text makes sense on its own or with its context. (2.4.4)
- [ ] Meaningful images have accurate alt text; decorative ones are hidden. (1.1.1)
- [ ] Page language is set. (3.1.1)

## Visual
- [ ] Text contrast is at least 4.5:1 (3:1 for large text). (1.4.3)
- [ ] Icons, input borders, and focus indicators are at least 3:1. (1.4.11)
- [ ] Color is never the only way information is shown. (1.4.1)
- [ ] At 200% zoom, everything still works. (1.4.4)
- [ ] At 400% zoom (320px wide), content reflows without horizontal scrolling. (1.4.10)
- [ ] Increased text spacing doesn't cut off content. (1.4.12)
- [ ] Click and touch targets are at least 24×24 px. (2.5.8)

## Screen reader (JAWS + JAWS Inspect)
- [ ] Every control announces a sensible name, role, and state (e.g. "Submit, button"; "Email, edit, required"; "expanded"). (4.1.2)
- [ ] Status messages are announced without moving focus ("Saved", "3 results found"). (4.1.3)
- [ ] Dynamic content (loading, updates, new sections) is announced or easy to find.
- [ ] Tables have headers that are read with each cell. (1.3.1)
- [ ] Reading order with the virtual cursor matches the visual order. (1.3.2)
- [ ] Nothing important is announced twice or skipped.

## Motion and timing
- [ ] Moving, auto-updating, or auto-playing content can be paused. (2.2.2)
- [ ] Time limits can be turned off or extended. (2.2.1)
- [ ] Nothing flashes more than three times per second. (2.3.1)
- [ ] Animations respect the reduced-motion setting.
