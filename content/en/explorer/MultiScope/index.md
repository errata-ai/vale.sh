---
title: MultiScope
lead: |
  An example of targeting multiple scopes.
extends: existence
tags:
  - scoping
draft: false
toc: false
---

## Source

```yaml
message: "Don't say '%s'"
extends: existence
ignorecase: false
scope:
  - heading.h1
  - heading.h3
level: error
tokens:
  - Test
```

## Example

{{< output >}}
# <mark title="Don't say 'Test'">Test</mark> at level `h1`

## Test at level `h2`

### <mark title="Don't say 'Test'">Test</mark> at level `h3`
{{< /output >}}
