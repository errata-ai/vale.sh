---
title: FancyRegex
lead: |
  An example of backtracking regex usage.
extends: existence
tags:
  - regex
draft: false
toc: false
---

## Source

```yaml
extends: existence
message: "Avoid saying '%s' when not followed by 'box'."
level: error
tokens:
  - 'dialog (?!box)'
```

## Example

{{< output >}}
Click "OK" to close the dialog box.

Click "OK" to close the <mark title="Avoid saying 'dialog' when not followed by 'box'.">dialog</mark> window.
{{< /output >}}
