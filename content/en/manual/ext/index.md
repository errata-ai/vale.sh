---
title: --ext
lead: An extension to associate with stdin.
label: flag
toc: false
---

The `--ext` option allows you to assign a format (e.g., `.md`) to text passed
through `stdin` (which will default to `.txt`).

```shell
vale --ext='.md' '# this is a heading'
```
