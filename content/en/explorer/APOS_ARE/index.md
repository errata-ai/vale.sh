---
title: APOS_ARE
lead: |
  Detect extraneous apostrophes before 'are'.
extends: sequence
tags:
  - punctuation
draft: false
toc: false
---

## Source

```yaml
extends: sequence
message: Did you mean "%[1]ss" instead of "%[1]s's"?
tokens:
  - tag: NN
  - pattern: "'s"
  - pattern: are
action:
  name: edit
  params:
    - replace
    - "'"
    - ""
```

## Example

{{< output >}}
The <mark title="Did you mean 'cars' instead of 'car's'">car's</mark> are cheap.
{{< /output >}}
