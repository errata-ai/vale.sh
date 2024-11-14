---
title: Regular Expressions
description: Learn how to use regular expressions in Vale.
---

Vale uses the [`regexp2`][1] library to process regular expressions in its
rules. This library extends the capabilities of the standard Go
[regexp][2] package by supporting features like lookaheads, lookbehinds, and
lazy quantifiers, which are missing in Go's built-in regexp implementation.

This guide provides an overview of regex syntax supported by Vale, along with
tips for writing regular expressions in [YAML][3] files.

## Syntax

For basic information on the supported syntax, see the [Go docs][2]. For the
extended syntax provided by `regexp2`, see their [README][4].

The most commonly used assertion constructs are:

- Positive lookahead: `(?=re)`
- Negative lookahead: `(?!re)`
- Positive lookbehind: `(?<=re)`
- Negative lookbehind: `(?<!re)`

This extended syntax is supported everywhere in Vale, except for `script`-based
rules (which are limited to the standard Go regex syntax).

## YAML

Wrap all regex in single (`'`) or double (`"`) quotes to avoid YAML
interpreting special characters:

- Single quotes (`'`): Prevent YAML from interpreting any characters except
  single quotes themselves.
- Double quotes (`"`): Allow YAML to interpret escape sequences like `\n` and
  `\t`, so you'll need to escape backslashes.

In general, this means that you should **prefer single quotes** for most cases:

```yaml
extends: existence
message: Consider removing '%s'
level: warning
# A typical rule with single quotes:
tokens:
  - '([A-Z]\\w+)([A-Z]\\w+)'
```

If you need to _use_ a single quote in your regex, you can escape it with
another single quote:

```yaml
extends: existence
message: Consider removing '%s'
level: warning
# A rule with a single quote in the regex:
tokens:
  - '([A-Z]\\w+)([A-Z]\\w+)''s'
```

## Vale Studio

[Vale Studio][5] provides a rule editor that integrates with [regex101][6] to
allow you to inspect the compiled regex pattern and test it against sample
text. This can be a helpful way to debug your regex patterns.

![Vale Studio](/media/studio.png)

[1]: https://github.com/dlclark/regexp2
[2]: https://pkg.go.dev/regexp/syntax
[3]: https://yaml.org/
[4]: https://github.com/dlclark/regexp2?tab=readme-ov-file#compare-regexp-and-regexp2
[5]: https://studio.vale.sh/
[6]: https://regex101.com
