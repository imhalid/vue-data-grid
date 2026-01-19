## 2024-05-22 - Accessibility in Custom Form Controls
**Learning:** Custom form controls like `RoundCheckBox` often hide the native input, making default browser focus indicators invisible. This breaks keyboard navigation for users who rely on Tab to move through forms.
**Action:** Always add explicit `:focus-visible` styles to the visual replacement element (e.g., `.roundBox`) when the sibling input is focused. Use `input:focus + .custom-element` to ensure focus is communicated visually.
