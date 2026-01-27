# Palette's Journal

## 2024-05-22 - Semantic Button Refactor
**Learning:** Legacy components often use `div` for buttons, making them inaccessible. Replacing them with `<button>` requires explicit CSS resets (`background: transparent`, `border: none`, etc.) to match existing designs while gaining `tabIndex`, `role`, and keyboard support.
**Action:** When refactoring clickable `div`s, always check for and replicate the original design using CSS resets on the new `<button>` element.
