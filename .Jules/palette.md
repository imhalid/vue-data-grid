## 2024-05-22 - Semantic HTML for Interactive Elements
**Learning:** Interactive elements wrapped in `div`s with `onClick` handlers are invisible to screen readers and keyboard users, creating a significant accessibility barrier.
**Action:** Replace `div` wrappers with semantic `<button>` elements, reset default browser styles in CSS, and ensure proper ARIA attributes (`aria-label`, `aria-expanded`) and `:focus-visible` styles are applied.
