## 2024-05-23 - Custom Checkbox Focus Styles
**Learning:** Visually hidden inputs (`clip: rect(0,0,0,0)`) maintain keyboard focusability but lose visual focus indication.
**Action:** Always add `input:focus + .visible-element` styles to restore the focus ring on the custom replacement element. Used `$primary-color` and `box-shadow` to create a clear ring without shifting layout.

## 2024-05-23 - Icon-Only Links
**Learning:** `<a>` tags containing only an icon (with `aria-hidden="true"`) are invisible to screen readers.
**Action:** Mandatory `aria-label` on the anchor tag to describe the destination (e.g., `aria-label="Settings"`).
