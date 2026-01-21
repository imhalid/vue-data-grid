# Palette's Journal

## 2023-10-27 - Semantic Elements and Accessibility
**Learning:** Found critical interactive elements (filter toggle) implemented as `div`s, making them inaccessible to keyboard users and screen readers.
**Action:** Refactor these to semantic `<button>` elements, ensuring `aria-label` is present for icon-only controls and proper focus styles are applied.
