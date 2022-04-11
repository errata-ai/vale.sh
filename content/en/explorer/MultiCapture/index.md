---
title: MultiCapture
lead: |
  A conditional with multiple capture groups.
extends: conditional
tags:
  - acronyms & abbreviations
draft: false
toc: false
---

## Source

```yaml
extends: conditional
message: "'%s' has no definition"
level: error
scope: text
ignorecase: false
# Ensures that the existence of 'first' implies the existence of 'second'.
first: '\b([A-Z]{3,5})\b'
second: '([A-Z]{3,5}): (?:\b[A-Z][a-z]+ )+|(?:\b[A-Z][a-z]+ )+\(([A-Z]{3,5})\)'
# ... with the exception of these:
exceptions:
  - ABC
  - ADD
```

## Example

{{< output >}}
According to Wikipedia, the WHO: World Health Organization is a specialized
agency of the United Nations that is concerned with international public
health. We can now use WHO because it has been defined.

The National Basketball Association (NBA) is a professional sports league.

The <mark title="'NFL' has no definition">NFL</mark> is also a sports league.
{{< /output >}}
