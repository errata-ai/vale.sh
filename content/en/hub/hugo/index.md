---
title: Hugo
lead: |
  Adds support for Hugo shortcodes and other non-standard markup.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: gohugoio
link: https://github.com/errata-ai/Hugo
menu:
  hub:
    parent: "browse"
weight: 30
toc: false
pinned: false
types: ["config"]
---

This package includes configuration that adds support for Hugo [shortcodes][1]
to Markdown files.

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = Hugo

[*]
BasedOnStyles = Vale
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://gohugo.io/content-management/shortcodes/
