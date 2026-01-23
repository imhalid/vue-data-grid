## 2024-05-24 - Icon-only Buttons and Accessibility
**Learning:** Icon-only buttons (or links) are invisible to screen readers without a text alternative. `aria-hidden="true"` on the icon itself is correct, but the container *must* have an `aria-label` or visually hidden text.
**Action:** Always check icon-only interactive elements for `aria-label` or `title` attributes.
