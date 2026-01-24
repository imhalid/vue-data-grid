## 2024-05-22 - Semantic HTML for Interactive Elements
**Learning:** Critical interactive elements (like the filter toggle) were implemented as clickable `div`s, lacking semantic meaning and keyboard accessibility. This pattern likely exists elsewhere in the legacy codebase.
**Action:** Always verify "buttons" are actual `<button>` elements. Prioritize converting them to semantic HTML (which gives keyboard support for free) over just adding ARIA roles to non-semantic elements.
