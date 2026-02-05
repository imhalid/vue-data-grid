## 2026-02-05 - [Hidden Input Focus Visibility]
**Learning:** Custom form controls (like `RoundCheckBox`) that rely on hiding the native input (via `clip` or `opacity`) often fail to provide visual feedback for keyboard focus, rendering them inaccessible.
**Action:** When auditing custom inputs, explicitly search for `:focus` styles targeting the visual replacement element (e.g., `:focus + .custom-box`) and verify visibility with keyboard navigation tests.
