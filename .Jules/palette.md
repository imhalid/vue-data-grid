## 2024-05-24 - Icon-only Link Accessibility
**Learning:** The application uses `<a>` tags containing only `<Icon />` components for navigation and actions in the NavBar. These lacked accessible names, making them invisible to screen reader users and confusing for keyboard users due to missing focus styles.
**Action:** Always verify icon-only interactive elements have `aria-label` and `title` attributes. Ensure Sass files define explicit `:focus-visible` styles as default browser outlines may be insufficient or hidden by resets.
