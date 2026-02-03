## 2024-05-22 - Legacy Div Button Refactoring
**Learning:** Legacy `div` elements acting as buttons in this codebase rely on specific positioning and dimensions that are disrupted by default `<button>` user agent styles.
**Action:** When converting `div` "buttons" to semantic `<button>` tags, always apply explicit CSS resets (`background: transparent`, `border: none`, `padding: 0`) and check for `display` property conflicts to preserve the original visual design.
