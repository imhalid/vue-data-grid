## 2026-01-31 - Icon-Only Link Accessibility
**Learning:** Icon-only links (like settings/logout in NavBar) are invisible to screen readers without explicit labels, making navigation impossible for some users.
**Action:** Always enforce `aria-label` on any interactive element that relies solely on an icon for visual communication.
