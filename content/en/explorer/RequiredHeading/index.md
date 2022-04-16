---
title: RequiredHeading
lead: |
  A min-based occurrence rule.
extends: occurrence
tags:
  - structure
draft: false
toc: false
---

## Source

```yaml
message: "Missing an 'Introduction' heading."
extends: occurrence
scope: heading
level: error
min: 1
token: Introduction
```

## Example

{{< output >}}
# <mark title="Missing an 'Introduction' heading.">First</mark>

## Second

### Third
{{< /output >}}
