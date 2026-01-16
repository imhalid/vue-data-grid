# Palette's Journal

## 2023-10-26 - Invisible Navigation
**Learning:** The navigation bar relies entirely on visual icons (Gear, Power, GitHub) without text labels or ARIA attributes. This makes the primary navigation completely inaccessible to screen reader users, effectively hiding core functionality like "Settings" and "Log Out".
**Action:** Always verify that icon-only interactive elements include `aria-label` and `title` attributes. Visual clarity does not equal accessible clarity.
