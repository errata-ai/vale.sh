---
title: AP
lead: |
  Enforces the AP heading capitalization style.
extends: capitalization
tags:
  - titlecase
draft: false
toc: false
---

## Source

```yaml
extends: capitalization
message: "'%s' should be in title case"
level: warning
scope: heading
match: $title
style: AP
```

## Example

{{< output >}}
# <mark title="'follow step-by-step instructions' should be in title case">follow step-by-step instructions</mark>

Here is a paragraph.

# Follow Step-by-Step Instructions

Another paragraph.
{{< /output >}}

