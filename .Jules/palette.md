## 2024-05-22 - Custom Form Controls Focus
**Learning:** Custom checkboxes that hide the native input must explicitly restore focus indicators on the visual replacement element, otherwise keyboard users lose context.
**Action:** Always target `input:focus + .visual-element` to apply `outline` or `box-shadow` matching the design system's focus style.
