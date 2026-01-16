## 2024-05-23 - Interactive Elements using non-semantic tags
**Learning:** The application uses `div` tags with `onClick` handlers for interactive elements (like filters) instead of semantic `<button>` tags. This pattern lacks accessibility features like keyboard focus and screen reader announcements.
**Action:** When touching these components, refactor them to `<button>` tags with appropriate `aria` attributes and CSS resets to maintain the visual design while improving accessibility.
