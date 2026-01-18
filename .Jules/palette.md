## 2024-05-24 - Hidden Inputs Need Focus Friends
**Learning:** Custom checkbox components (RoundCheckBox) that use clip rect to hide the native input must provide explicit focus styles on the visible replacement element. Without this, keyboard users are flying blind.
**Action:** Always pair opacity 0 or clip hidden inputs with a sibling selector like input:focus + .custom-box to show a focus ring.
