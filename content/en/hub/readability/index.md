---
title: Readability
lead: |
  Vale-compatible implementations of many popular "readability" metrics.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: errata-ai
link: https://github.com/errata-ai/readability
menu:
  hub:
    parent: "browse"
weight: 80
toc: false
pinned: true
types: ["style"]
---

This package contains Vale-compatible implementations of many popular
"readability" metrics.

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = Readability

[*]
BasedOnStyles = Vale, Readability
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.
