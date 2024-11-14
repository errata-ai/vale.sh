---
title: XML
description: Learn how Vale handles XML content.
---

XML is supported through the external program [`xsltproc`][1]. To install,
see:

- [Chocolatey][2] (Windows): `choco install xsltproc`.
- [Homebrew][3] (macOS): `brew install libxslt`.
- Debian/Ubuntu/apt-based systems: `apt-get install xsltproc`.

You'll need to ensure that the `xsltproc` executable is available in your
`$PATH`.

The supported extension is `.xml`.

You also need to provide a version 1.0 XSL Transformation \(XSLT\) for
converting to HTML:

```ini
[*.xml]
Transform = docbook-xsl-snapshot/html/docbook.xsl
```

Once converted, Vale will follow the same rules as it does for [HTML][4].

[1]: http://xmlsoft.org/XSLT/xsltproc.html
[2]: https://community.chocolatey.org/packages/xsltproc
[3]: https://formulae.brew.sh/formula/libxslt
[4]: /docs/formats/html
