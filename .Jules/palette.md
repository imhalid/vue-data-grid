## 2026-01-28 - Icon-Only Link Accessibility
**Learning:** The `Icon` component uses `aria-hidden="true"`, which renders any wrapping link or button completely invisible to screen readers if no label is provided.
**Action:** Always verify icon-only interactive elements have an explicit `aria-label` on the container, not the icon itself.
