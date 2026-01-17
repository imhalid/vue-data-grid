## 2024-05-23 - Semantic Buttons for Interactivity
**Learning:** The application used `div` elements with `onClick` handlers for filter buttons, making them inaccessible to keyboard and screen reader users.
**Action:** Refactor these to semantic `<button>` elements, ensuring they include `type="button"`, `aria-label`, and `aria-expanded` attributes, along with CSS resets to maintain the visual design while gaining native accessibility features.
