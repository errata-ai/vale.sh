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

The Vale CLI tool doesn't directly do anything with the value of this field and 
it's up to the external tool to support any actions.

While styles can use whatever value they want for actions and tools can 
implement the actions how they want, there are a series of standard actions that existing rules and tools use.

| Name | Parameters | Suggested implementation |
| :--- | :--- | :--- |
| `replace` | Values from the `swap` key | Swap matched value for suggestion in `swap` |
| `remove` | None | Remove the instance of the matched token. |
| `suggest` | `spellings` | Suggest alternatives from the active dictionaries.  |
| `edit` | `string` | Perform an in-place edit on the match string according to the provided parameters. |

For example, a `spelling` rule that uses the `suggest` action:

```yaml
extends: spelling
message: "Did you really mean '%s'?"
level: error
action:
  name: suggest
  params:
    - spellings
ignore:
  - vocab.txt
```

## suggest

`suggest` takes a single parameter and returns an array of possible replacements.

```yaml
action:
  name: suggest
  params:
    - spellings
```
## replace

`replace` returns an array of user-provided replacements.

{{< alert icon="👉" context="info">}}
Rules that extend `substitution` will automatically populate the `params` array, so you can simply provide the `name`, as
`replace` returns an array of user-provided replacements:

```yaml
action:
  name: replace
```
{{< /alert >}}

```yaml
action:
  name: replace
  params:
    - option1
    - option2
    ...
```

## remove

`remove` will remove the matched text of any rule.

```yaml
action:
  name: remove
```

## edit

`edit` will perform an in-place edit on the match string according to the 
provided parameters.

| Name | Type | Description |
| :--- | :--- | :--- |
| `regex` | `pattern`, `string` | Replace the provied regex pattern with the given string. |
| `trim_right` | `string` | Trim the first parameter from the end of the matched text. |
| `trim_left` | `string` | Trim the first parameter from the start of the matched text. |
| `trim` | `string` | Trim the first parameter from the both start and end of the matched text. |
| `split` | `string`, `int` | Split the matched text on the first parameter at the index of the second parameter. |

```yaml
action:
  name: edit
  params:
    - trim_right
    - '.?!'
```
