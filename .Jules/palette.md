## 2024-05-23 - Accessible Filter Toggle
**Learning:** `DgFilter` used a `div` for interaction, blocking keyboard users.
**Action:** Replaced with `<button>`, added `aria-expanded` and `aria-controls` linked to panel via `useId`. Reset CSS styles to maintain design.
