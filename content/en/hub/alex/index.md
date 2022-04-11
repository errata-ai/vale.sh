---
title: alex
lead: |
  Catch insensitive, inconsiderate writing.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: get-alex
link: https://github.com/errata-ai/proselint
menu:
  hub:
    parent: "browse"
weight: 40
toc: false
pinned: true
types: ["style"]
---

> 📝 [alex][1] — Catch insensitive, inconsiderate writing.

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = alex

[*]
BasedOnStyles = Vale, alex
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://github.com/get-alex/alex
