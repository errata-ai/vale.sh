---
title: Spelling
lead: |
  Enforces consistent spellings.
extends: consistency
tags:
  - word usage
draft: false
toc: false
---

## Source

```yaml
extends: consistency
message: "Inconsistent spelling of '%s'"
level: error
ignorecase: true
# We only want one of these to appear.
either:
  advisor: adviser
  centre: center
```

## Example

{{< output >}}
There is no difference in meaning between center and <mark title="Inconsistent spelling of 'center'">centre</mark>. Center is the
preferred spelling in American English, and <mark title="Inconsistent spelling of 'center'">centre</mark> is preferred in varieties
of English from outside the U.S.
{{< /output >}}
