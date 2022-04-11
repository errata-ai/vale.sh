---
title: Microsoft
lead: |
  A Vale-compatible implementation of the *Microsoft Writing Style Guide*.
date: 2021-03-04T08:02:23+01:00
lastmod: 2021-03-04T08:02:23+01:00
draft: false
org: microsoft
link: https://github.com/errata-ai/Microsoft
menu:
  hub:
    parent: "browse"
weight: 10
toc: false
pinned: true
types: ["style"]
---

This package contains a Vale-compatible implementation of the [*Microsoft Writing Style Guide*][1] ([LICENSE][2]).

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = Microsoft

[*]
BasedOnStyles = Vale, Microsoft
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: (https://docs.microsoft.com/en-us/style-guide/welcome/
[2]: https://github.com/MicrosoftDocs/microsoft-style-guide/blob/master/LICENSE
