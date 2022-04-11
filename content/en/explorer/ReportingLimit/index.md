---
title: ReportingLimit
lead: |
  An example of limiting the number of alerts shown.
extends: existence
tags:
  - configuration
draft: false
toc: false
---

## Source

```yaml
extends: existence
message: "Don't use '%s'."
level: error
ignorecase: true
limit: 1
tokens:
  - a
```

## Example

{{< output >}}
This is <mark title="Don't use 'a'">a</mark> rule that could trigger a lot of alerts at once, so we limit the
number reported to only the value of `limit`.

This is another sentence that contains 'a' and would trigger an alert if not
for the `limit`.
{{< /output >}}
