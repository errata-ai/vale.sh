---
title: OF_ALL_TIMES
lead: |
  Find incorrect usage of 'of all times'.
extends: sequence
tags:
  - grammar
draft: false
toc: false
---

## Source

```yaml
extends: sequence
message: "In this context, the idiom needs to be spelled 'of all time'."
tokens:
  - tag: JJS
    skip: 3

  - pattern: of
  - pattern: all
  - pattern: times
```

## Example

{{< output >}}
He is still the greatest basketball player <mark title="In this context, the idiom needs to be spelled 'of all time'.">of all times</mark>.
{{< /output >}}
