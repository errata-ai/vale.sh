# conditional

Learn about the conditional extension point.

| Name         | Type     | Description                                                               |
| ------------ | -------- | ------------------------------------------------------------------------- |
| `ignorecase` | `bool`   | Makes all matches case-insensitive.                                       |
| `first`      | `string` | The antecedent of the statement.                                          |
| `second`     | `string` | The consequent of the statement.                                          |
| `vocab`      | `bool`   | If false, disables all active vocabularies for this rule (default: true). |
| `exceptions` | `array`  | An array of strings to be ignored.                                        |
| `in`         | `string` | The [View](../topics/views.md) scope `second` is looked for in. Without it, `second` is looked for in the same scope as `first`. |

```yaml
extends: conditional
message: "'%s' has no definition"
level: error
scope: text
ignorecase: false
# Ensures that the existence of 'first'
# implies the existence of 'second'.
first: '\b([A-Z]{3,5})\b'
second: '(?:\b[A-Z][a-z]+ )+\(([A-Z]{3,5})\)'
# ... with the exception of these:
exceptions:
  - ABC
  - ADD
```

For example, consider the following text:

> According to Wikipedia, the World Health Organization (WHO) is a specialized agency of the United Nations that is concerned with international public health. We can now use WHO because it has been defined, but we can’t use DAFB because people may not know what it represents. We can use `DAFB` when it’s presented as code, though.

Using the above text with our example rule yields the following:

```bash
test.md:1:224:style.UnexpandedAcronyms:'DAFB' has no definition
```

`conditional` also takes an optional `exceptions` list. Any token listed as an exception won’t be flagged.

## [Presence checks](conditional.md#presence-checks)

When `second` has a capture group, a `first` match is allowed only if its captured value was also captured by a `second` match—the acronym-definition pattern above. When `second` has *no* capture group, the rule is a plain presence check: any `first` match requires `second` to appear somewhere in the same scope.

```yaml
extends: conditional
message: "A 'Section' requires a 'Summary:' line."
level: error
scope: raw
first: '\bSection\b'
second: 'Summary:'
```

## [Lookarounds](conditional.md#lookarounds)

Regular expression lookarounds can be used to restrict the capture of the rule, allowing for more complex conditional statements. For example, the following rule will flag any MDX-style import that is not used:

```yaml
extends: conditional
message: "'%s' has been imported but not used."
level: error
scope: raw
first: '(?<=import )(\w+)(?= from)'
second: '(?<=<)(\w+)'
```

See the [regex guide](../guides/regex.md) for more information.

## [Across a View's scopes](conditional.md#across-a-views-scopes)

When a [View](../topics/views.md) names the parts of a file, `in` looks for `second` in one part while `first` is matched in another. A commit whose subject is marked with `!` needs a `BREAKING CHANGE:` footer:

```yaml
extends: conditional
message: "A '!' in the subject needs a 'BREAKING CHANGE:' footer."
level: error
scope: subject
first: '^\w+(?:\([^)]*\))?!:'
second: '^BREAKING CHANGE: '
in: trailer
```

The alert lands on the subject's `!`. The reverse, a footer that needs the `!`, is the same rule with `scope` and `in` swapped. An `in` that no View defines is an error when the rule loads.
