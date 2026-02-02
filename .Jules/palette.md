## 2024-05-22 - Custom Checkbox Focus Styles
**Learning:** Custom form controls (like `RoundCheckBox`) often hide the native input but neglect to add focus styles to the visual replacement, breaking keyboard accessibility.
**Action:** Always ensure `input:focus + .visual-element` has a distinct focus indicator (e.g., `outline` or `box-shadow`) matching the design system.
