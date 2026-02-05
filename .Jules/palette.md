# Palette's Journal

## 2024-05-22 - Accessibility of Custom Triggers
**Learning:** Custom interactive elements (like filter buttons implemented as divs) block keyboard users entirely if they lack semantic roles and tabindex.
**Action:** Always prefer native `<button>` elements for click actions. If styling requires a div, ensure `role="button"`, `tabindex="0"`, and keydown handlers are present.
