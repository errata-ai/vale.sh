---
title: Joblint
lead: |
  Test tech job posts for issues with sexism, culture, expectations, and
  recruiter fails.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: npm
link: https://github.com/errata-ai/Joblint
menu:
  hub:
    parent: "browse"
weight: 90
toc: false
pinned: true
types: ["style"]
---

> [`Joblint`][1]: Naive linter for English prose for developers who can't
> write good and wanna learn to do other stuff good too.

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = Joblint

[*]
BasedOnStyles = Vale, Joblint
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://www.npmjs.com/package/joblint
