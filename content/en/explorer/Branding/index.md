---
title: Branding
lead: |
  Enforce the correct use of "JavaScript" (and other terms).
extends: substitution
tags:
  - terminology & branding
draft: false
toc: false
---

## Source

```yaml
extends: substitution
message: Use '%s' instead of '%s'
level: warning
ignorecase: true
# swap maps tokens in form of bad: good
swap:
  # NOTE: The left-hand (bad) side can match the right-hand (good) side; Vale
  # will ignore any alerts that match the intended form.
  "java[ -]?scripts?": JavaScript
```

## Example

{{< output >}}
Do you know <mark title="Use 'JavaScript' instead of 'Javascript'">Javascript</mark>?

We used JavaScript for our app.
{{< /output >}}
