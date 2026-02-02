## 2024-10-24 - Semantic Button Replacements
**Learning:** Found critical accessibility debt where `div` elements were used as buttons without roles or keyboard support. This renders core functionality (like filtering) inaccessible to screen reader and keyboard users.
**Action:** Systematically audit `onClick` handlers on non-interactive elements and replace with `<button type="button">`. Ensure visual regressions are prevented by stripping default button styles in Sass (`background: transparent; border: none; padding: 0`).
