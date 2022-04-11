---
title: Google
lead: |
  A Vale-compatible implementation of the *Google Developer Documentation Style Guide*.
date: 2021-11-16T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
images: ["google.png"]
link: https://github.com/errata-ai/Google
menu:
  hub:
    parent: "browse"
weight: 20
toc: false
pinned: true
types: ["style"]
org: google
---

This package contains a Vale-compatible implementation of the
[*Google Developer Documentation Style Guide*][2] ([CC BY 4.0][2]).

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = Google

[*]
BasedOnStyles = Vale, Google
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://github.com/errata-ai/vale
[2]: https://developers.google.com/style/
[3]: https://creativecommons.org/licenses/by/4.0/
