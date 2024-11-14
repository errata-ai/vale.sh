---
title: script
description: Learn about the script extension point.
---

<script>
    import Alert from '$lib/components/Alert.svelte';
</script>

<Alert>
When using <code>script</code>-based rules, you're limited to the standard
Go <a href="https://pkg.go.dev/regexp/syntax">regex syntax</a>.
</Alert>

| Name     | Type     | Description                       |
| :------- | :------- | :-------------------------------- |
| `script` | `string` | The [Tengo][1] script to execute. |

`script` allows for the creation of arbitrary logic-based rules using
[Tengo][1], a Go-like scripting language.

```yaml
extends: script
message: 'Consider inserting a new section heading at this point.'
link: https://tengolang.com
scope: raw
script: MyScript.tengo
```

Where `MyScript.tengo` is a file containing the Tengo script to execute stored
at `$StypesPath/config/scripts`.

````go
text := import("text")

matches := []
// at most 3 paragraphs per section
p_limit := 3

// Remove all instances of code blocks
// since we don't want to count inter-block
// newlines as a new paragraph.
document := text.re_replace("(?s) *(\n```.*?```\n)", scope, "")

count := 0
for line in text.split(document, "\n") {
    if text.has_prefix(line, "#") {
        count = 0 // New section; reset count
    } else if count > p_limit {
        start := text.index(scope, line)
        matches = append(matches, {begin: start, end: start + len(line)})
        count = 0
    } else if text.trim_space(line) == "" {
        count += 1
    }
}
````

In each script:

1. Use Tengo's [`text`][2] module, which provides a number of string- and
   regex-related utility functions.
2. Process the content in the `scope` variable. `scope` contains text based on
   the `scope: <scope>` setting for the rule. For more information, see
   [Scoping][3].
3. Populate the `matches` array with rule matches. Each match must be a map
   with the keys:
   - `begin`: where the match begins in the content provided by the `scope` variable.
   - `end`: where the match ends in the content provided by the `scope` variable.

[1]: https://tengolang.com
[2]: https://github.com/d5/tengo/blob/master/docs/stdlib-text.md
[3]: /docs/scopes
