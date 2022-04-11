---
title: proselint
lead: |
  A collection of rules inspired by the open-source *proselint* CLI tool.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: amperser
link: https://github.com/errata-ai/proselint
menu:
  hub:
    parent: "browse"
weight: 70
toc: false
pinned: true
types: ["style"]
---

> [`proselint`][1] places the world’s greatest writers and editors by your
> side, where they whisper suggestions on how to improve your prose.

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = proselint

[*]
BasedOnStyles = Vale, proselint
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://github.com/amperser/proselint/
