---
title: WOULD_BE_JJ_VB
lead: |
  Find instances of missing 'to'.
extends: sequence
tags:
  - grammar
draft: false
toc: false
---

## Source

```yaml
extends: sequence
message: "Did you mean '%[2]s %[3]s *to* %[4]s'?"
tokens:
  - tag: MD
  - pattern: be
  - tag: JJ
  - tag: VB|VBN
```

## Example

{{< output >}}
It would <mark title="Did you mean 'be great *to* write'?">be great write</mark> a story.
{{< /output >}}
