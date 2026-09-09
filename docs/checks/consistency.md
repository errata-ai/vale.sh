# consistency

Learn about the consistency extension point.

| Name         | Type    | Description                                                       |
| ------------ | ------- | ----------------------------------------------------------------- |
| `nonword`    | `bool`  | Removes the default word boundaries (`\b`).                       |
| `ignorecase` | `bool`  | Makes all matches case-insensitive.                               |
| `either`     | `map`   | A map of `option 1: option 2` pairs of which only one may appear. |

`consistency` will ensure that a key and its value (e.g., “advisor” and “adviser”) don’t both occur in its scope.

```yaml
extends: consistency
message: "Inconsistent spelling of '%s'."
level: error
ignorecase: true

# We only want one of these to appear.
either:
  advisor: adviser
  centre: center
```

The first spelling to appear sets the expectation, and each later use of the other one is flagged:

> Ask your advisor. The centre has an adviser too.

```bash
test.md:1:37:style.Consistency:Inconsistent spelling of 'adviser'.
```
