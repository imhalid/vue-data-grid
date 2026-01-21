## 2024-05-22 - Semantic HTML and ARIA Labels for Icon-Only Controls
**Learning:** The application frequently uses `div` elements for interactive controls and `<a>` tags for actions without text alternatives, which completely excludes screen reader users.
**Action:** Default to using `<button>` for actions and ensure every icon-only interactive element has a descriptive `aria-label`.
