---
title: RepeatedWords
lead: |
  Catch instances of repeated words.
extends: repetition
tags:
  - typos
draft: false
toc: false
---

## Source

```yaml
extends: repetition
message: "'%s' is repeated!"
level: error
alpha: true
tokens:
  - '[^\s]+'
```

## Example

{{< output >}}
This <mark title="'is' is repeated!">is is</mark> a sentence with a repeated word.
{{< /output >}}
