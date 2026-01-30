## 2024-05-22 - Accessibility on Dark/Colored Backgrounds
**Learning:** Default browser focus rings (often blue) are invisible on the application's primary blue background (`$primary-color`), making keyboard navigation impossible for these elements.
**Action:** Always verify focus visibility on colored backgrounds and explicitly set `outline: 2px solid #fff` (or contrasting color) for these elements.
