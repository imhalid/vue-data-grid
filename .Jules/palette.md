## 2026-01-25 - [Accessibility] Icon-only interactive elements lack labels
**Learning:** Key navigation components (NavBar) and interactive filters rely solely on icons without text alternatives, making them inaccessible to screen readers.
**Action:** Ensure all icon-only buttons/links (Icon component wrappers) have explicit `aria-label` attributes.
