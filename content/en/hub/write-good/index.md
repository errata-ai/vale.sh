---
title: write-good
lead: |
  Naive linter for English prose.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: npm
link: https://github.com/errata-ai/write-good
menu:
  hub:
    parent: "browse"
weight: 100
toc: false
pinned: true
types: ["style"]
---

> [`write-good`][1]: Naive linter for English prose for developers who can't
> write good and wanna learn to do other stuff good too.

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = write-good

[*]
BasedOnStyles = Vale, write-good
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://www.npmjs.com/package/write-good
