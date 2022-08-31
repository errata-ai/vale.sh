---
title: Trademarks
lead: Enforce the use of '®'.
tags:
  - terminology & branding
extends: conditional
draft: false
toc: false
---

## Source

```yaml
extends: conditional
message: "'%s' should be marked as a trademark."
level: error
ignorecase: false
first: myterm
second: '(myterm) (?:®|\(R\))'
```

## Example

{{< output >}}
<mark title="'myterm' should be marked as a trademark">myterm</mark> used with no prior trademarking.

myterm (R) is okay here.
{{< /output >}}
