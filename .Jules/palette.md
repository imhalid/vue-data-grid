## 2024-01-26 - [Interactive Divs to Buttons]
**Learning:** Refactoring clickable `div`s to semantic `<button>`s often requires explicit CSS resets (background, border, padding) because the original `div` relied on inheritance or lack of default button styles.
**Action:** When converting `div` to `button`, always include a CSS reset block for the button selector to preserve visual fidelity while gaining accessibility.
