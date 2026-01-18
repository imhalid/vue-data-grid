## 2024-05-22 - Custom Form Controls Focus
**Learning:** Custom form controls (like `RoundCheckBox`) that hide the native input must explicitly implement focus styles.
**Action:** When creating custom checkboxes/radios, always ensure the visual proxy element receives distinct styles when the hidden input is focused (using `:focus-visible` + sibling combinator).
