---
title: --ignore-syntax
lead: Lint all files line-by-line.
label: flag
toc: false
---

The --ignore-syntax option instructs Vale to parse all files as plain text.
Note, though, that this doesn't change what files Vale will *search*.

This will often boost performance significantly, but only text-scoped rules
will work.

```shell
vale --ignore-syntax directory
```
