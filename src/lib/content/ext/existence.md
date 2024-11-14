---
title: existence
description: Learn about the existence extension point.
---

<script>
    import Alert from '$lib/components/Alert.svelte';
</script>

| Name         | Type    | Description                                                                    |
| :----------- | :------ | :----------------------------------------------------------------------------- |
| `append`     | `bool`  | Adds `raw` to the end of `tokens`, assuming both are defined.                  |
| `ignorecase` | `bool`  | Makes all matches case-insensitive.                                            |
| `nonword`    | `bool`  | Removes the default word boundaries \(`\b`\).                                  |
| `action`     | `array` | Options for correcting matches, see the [actions][1] section.                  |
| `raw`        | `array` | A list of tokens to be concatenated into a pattern.                            |
| `tokens`     | `array` | A list of tokens to be transformed into a non-capturing group.                 |
| `exceptions` | `array` | An array of strings to be ignored.                                             |
| `vocab`      | `bool`  | If false, disables all active [vocabularies][4] for this rule (default: true). |

The most general extension point is existence. As its name implies, it looks
for the "existence" of particular tokens.

```yaml
extends: existence
message: Consider removing '%s'
level: warning
ignorecase: true
tokens:
  - appears to be
  - arguably
```

These tokens can be anything from simple phrases \(as in the above example\) to
regular expressions&mdash;e.g., [the number of spaces between sentences][2] or
[the position of punctuation after quotes][3].

## tokens

<Alert>
See <a href="https://studio.vale.sh/">Vale Studio</a> for a live editor
that can help you write and test your rules, including generating the compiled
regular expression.
</Alert>

The most common entry point for this extension point is the `tokens` key, which
is a list of strings or regular expressions to be transformed into a
word-bounded, non-capturing group:

```yaml
tokens:
  - appears to be
  - arguably
```

Which, after compilation, becomes:

```regex
(?i)(?m)\\b(?:appears to be|arguably)\\b
```

This is a convenience feature to avoid having to write the same boilerplate
for every token in a rule.

## raw

When you want more control over the regular expression, you can use the `raw`
key instead:

```yaml
extends: existence
message: "Incorrect use of symbols in '%s'."
ignorecase: true
raw:
  - \$[\d]* ?(?:dollars|usd|us dollars)
```

This allows you to write more complex patterns without having to worry about
any post-processing. Each entry in `raw` is concatenated with the previous
entry, allowing for improve commenting and readability of complex patterns.

## message

The `message` key is a string that will be used to generate the final message
when a match is found. The (optional) `%s` placeholder will be replaced with
the matched text.

[1]: /docs/actions
[2]: https://github.com/errata-ai/vale/blob/master/testdata/styles/demo/Spacing.yml
[3]: https://github.com/errata-ai/Google/blob/master/Google/Quotes.yml
[4]: /docs/keys/vocab
[5]: https://studio.vale.sh/
