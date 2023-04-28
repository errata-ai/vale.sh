---
title: RedHat
lead: A Vale-compatible implementation of the *Red Hat Supplementary Style Guide*.
date: 2022-08-16T00:42:42+01:00
lastmod: 2022-08-16T00:42:42+01:00
draft: false
org: redhat-documentation
link: https://redhat-documentation.github.io/vale-at-red-hat/docs/main/user-guide/redhat-style-for-vale/
menu:
hub:
parent: "browse"
weight: 10
toc: false
pinned: true
types: ["style"]
---

This package contains the [*Red Hat Style for Vale*][1], a Vale-compatible implementation of the [*Red Hat supplementary
style guide for product documentation*][2] ([LICENSE][3]).

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = RedHat

[*]
BasedOnStyles = Vale, RedHat
```

To get started, add the package to your configuration file (as shown above)
and then run `vale sync`.

[1]: https://redhat-documentation.github.io/vale-at-red-hat/docs/main/user-guide/redhat-style-for-vale/
[2]: https://redhat-documentation.github.io/supplementary-style-guide/

[3]: https://github.com/redhat-documentation/vale-at-red-hat/blob/main/LICENSE
