---
title: --filter
lead: An expression to filter rules by.
label: flag
toc: false
css:
  - vendor/asciinema-player.css
js:
  - vendor/asciinema-player.js
---

{{< asciinema key="filter" rows="20" preload="1" >}}

The `--filter` option allows you to report an arbitrary subset of your `.vale.ini` configuration.

A *filter* is [an expression][1] targeting one of the following keys defined in the [rule definition][2]: `.Name`, `.Level`, `.Scope`, `.Message`, `.Description`, `.Extends`, or `.Link`.

You can pass filters through the CLI as a string:

```shell
vale --filter='"heading" in .Scope' test.md
```

Or a local file:

```shell
vale --filter='some/path/filter.expr' test.md
```

## Examples

```coffeescript
# Filter by `.Level` and `.Name`
.Level in ["error", "suggestion"] and .Name != "demo.Cap"
```

```coffeescript
# Filter by `.Extends`
.Extends=="existence"
```

```coffeescript
# Filter by `.Scope`
"heading" in .Scope
```

[1]: https://expr.medv.io/docs/Language-Definition
[2]: /docs/topics/styles/#extension-points
