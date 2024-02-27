---
title: Actions
lead: |
    Create dynamic fixes for your custom rules.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 60
toc: true
---

## Overview

{{< alert icon="👉" context="info">}}
See [`vale-ls`][1] for an easy way to integrate Actions into your favorite text 
editor.

[1]: https://github.com/errata-ai/vale-ls
{{< /alert >}}

Actions provide a way for external tools to provide methods for correcting 
style issues.

While styles can use whatever value they want for actions and tools can 
implement the actions how they want, there are a series of standard actions 
that existing rules and tools use.

## suggest

```go
func suggest(match string) []string
```

`suggest` returns an array of suggested replacements for the matched text.

### `script`

```yaml
action:
  name: suggest
  params:
    - scriptName.tengo
```

The `script` action allows you to define a custom suggestion script that will 
be executed for each match. The script should return an array of strings.

Scripts are written in [Tengo][3] and are stored in the
`<StylesPath>/config/actions` directory. Here's an example script:

```go
text := import("text")

// `match` is provided by Vale and represents the rule's matched text.
made := text.re_replace(`([A-Z]\w+)([A-Z]\w+)`, match, `$1-$2`)

made = text.replace(made, "-", "_", 1)
made = text.to_lower(made)

suggestions := [made]
```

We would save this script as `CamelToSnake.tengo` and then reference it in
our rule:

```yaml
extends: existence
message: "'%s' should be in snake_case."
nonword: true
level: error
action:
  name: suggest
  params:
    - CamelToSnake.tengo
tokens:
  - '[A-Z]\w+[A-Z]\w+'
```

### `spellings`

```yaml
action:
  name: suggest
  params:
    - spellings
```

`spellings` returns the top 5 spelling suggestions for the matched text from
all active dictionaries. Suggestions are ordered by calculating the 
[Levenshtein distance][1] between the matched text and the dictionary words.

## replace

```go
func replace(match string) []string
```

`replace` returns an array of user-provided replacements.

```yaml
action:
  name: replace
  params:
    - option1
    - option2
    ...
```

Rules that extend `substitution` will automatically populate the `params` array, so you can simply provide the `name`:

```yaml
action:
  name: replace
```

## remove

```go
func remove(match string)
```

`remove` will remove the matched text of any rule.

```yaml
action:
  name: remove
```

## edit

```go
func edit(match string) string
```

`edit` will perform an in-place edit on the match string according to the 
provided parameters.

### `regex`

Replace the provided regex pattern with the given string.

```yaml
action:
  name: edit
  params:
    - regex
    - '([A-Z]\w+)([A-Z]\w+)' # pattern
    - "$1-$2" # repl
```

This is equivalent to the following Go code:

```go
match = pattern.ReplaceAllString(match, repl)
```

See [Regexp.ReplaceAllString][2] for more information.

### `trim_right`

Trim the first parameter from the end of the matched text.

```yaml
action:
  name: edit
  params:
    - trim_right
    - '.?!'
```

### `trim_left`

Trim the first parameter from the start of the matched text.

```yaml
action:
  name: edit
  params:
    - trim_left
    - ' '
```

### `trim`

Trim the first parameter from the both start and end of the matched text.

```yaml
action:
  name: edit
  params:
    - trim
    - ' '
```

### `split`

Split the matched text on the first parameter at the index of the second 
parameter.

```yaml
action:
  name: edit
  params:
    - split
    - ' ' # sub
    - 1   # index
```

This is equivalent to the following Go code:

```go
match = strings.Split(match, sub)[index]
```

[1]: https://pkg.go.dev/github.com/adrg/strutil@v0.3.0/metrics#Levenshtein
[2]: https://pkg.go.dev/regexp#Regexp.ReplaceAllString
[3]: https://github.com/d5/tengo
