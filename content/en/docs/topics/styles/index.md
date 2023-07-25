---
title: Styles
lead: |
  Create your own rules to enforce custom style guides.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 50
toc: true
---

## Overview

Vale has a powerful extension system that doesn't require knowledge of
any programming language. Instead, it uses collections of individual
[YAML](http://yaml.org) files (or "rules") to enforce particular writing
constructs.

```yaml
# An example rule from the "Microsoft" style.
extends: existence
message: "Don't use end punctuation in headings."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/periods
nonword: true
level: warning
scope: heading
action:
  name: edit
  params:
    - remove
    - '.?!'
tokens:
  - '[a-z0-9][.?!](?:\s|$)'
```

These collections are referred to as *styles* and are organized in a
nested folder structure at a user-specified location
(see [Configuration](/docs/topics/config)). For example,

```text
styles/
├── base/
│   ├── ComplexWords.yml
│   ├── SentenceLength.yml
│   ...
├── blog/
│   ├── TechTerms.yml
│   ...
└── docs/
    ├── Branding.yml
    ...
```

where _base_, _blog_, and _docs_ are your styles that each contain certain
rules.

## Extension points

{{< alert context="info">}}
**Heads up**!

In addition to the standard Go [regex syntax][1], Vale also
supports positive lookahead (`(?=re)`), negative lookahead (`(?!re)`),
positive lookbehind (`(?<=re)`), and negative lookbehind (`(?<!re)`).

[1]: https://pkg.go.dev/regexp/syntax
{{< /alert >}}

The building blocks of styles are rules (YAML files ending in `.yml`), which utilize extension points to perform specific tasks.

The basic structure of a rule consists of a small header \(shown below\) followed by extension-specific arguments.

```yaml
# All rules should define the following header keys:
#
# `extends` indicates the extension point being used (see below for information
# on the possible values).
extends: existence
# `message` is shown to the user when the rule is broken.
#
# Many extension points accept format specifiers (%s), which are replaced by
# extracted values. See the extension-specific sections below for more details.
message: "Consider removing '%s'"
# `level` assigns the rule's severity.
#
# The accepted values are suggestion, warning, and error.
level: warning
# `scope` specifies where this rule should apply -- e.g., headings, sentences, etc.
#
# See the Markup section for more information on scoping.
scope: heading
# `link` gives the source for this rule.
link: 'https://errata.ai/'
# The number of times this rule should raise an alert.
#
# By default, there is no limit.
limit: 1
```

The available extension points are discussed below.

### existence

The most general extension point is `existence`. As its name implies, it looks for the "existence" of particular tokens.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `append` | `bool` | Adds `raw` to the end of `tokens`, assuming both are defined. |
| `ignorecase` | `bool` | Makes all matches case-insensitive. |
| `nonword` | `bool` | Removes the default word boundaries \(`\b`\). |
| `action` | `array` | Options for correcting matches, read the [actions](#actions) section. |
| `raw` | `array` | A list of tokens to be concatenated into a pattern. |
| `tokens` | `array` | A list of tokens to be transformed into a non-capturing group. |
| `exceptions` | `array` | An array of strings to be ignored. |
{{< /details >}}

```yaml
extends: existence
message: Consider removing '%s'
level: warning
ignorecase: true
tokens:
    - appears to be
    - arguably
```

These tokens can be anything from simple phrases \(as in the above example\) to complex regular expressions&mdash;e.g., [the number of spaces between sentences](https://github.com/errata-ai/vale/blob/master/testdata/styles/demo/Spacing.yml) or [the position of punctuation after quotes](https://github.com/errata-ai/Google/blob/master/Google/Quotes.yml).

You may define the tokens as elements of lists named either `tokens` \(shown above\) or `raw`. The former converts its elements into a word-bounded, non-capturing group. For instance,

```yaml
tokens:
  - appears to be
  - arguably
```

becomes `\b(?:appears to be|arguably)\b`.

`raw`, on the other hand, simply concatenates its elements—so, something like

```yaml
raw:
  - '(?:foo)\sbar'
  - '(baz)'
```

becomes `(?:foo)\sbar(baz)`.

### substitution

`substitution` associates a string with a preferred form.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `append` | `bool` | Adds `raw` to the end of `tokens`, assuming both are defined. |
| `ignorecase` | `bool` | Makes all matches case-insensitive. |
| `nonword` | `bool` | Removes the default word boundaries \(`\b`\). |
| `swap` | `map` | A sequence of `observed: expected` pairs. |
| `exceptions` | `array` | An array of strings to be ignored. |
{{< /details >}}

```yaml
extends: substitution
message: Consider using '%s' instead of '%s'
level: warning
ignorecase: false
# swap maps tokens in form of bad: good
swap:
  abundance: plenty
  accelerate: speed up
```

If we want to suggest the use of "plenty" instead of "abundance," for example,
we'd write:

```yaml
swap:
  abundance: plenty
```

The keys may be regular expressions, but they can't include nested capture groups:

```yaml
swap:
  '(?:give|gave) rise to': lead to # this is okay
  '(give|gave) rise to': lead to # this is bad!
```

`substitution` can have one or two `%s` format specifiers in its message. This
allows us to do either of the following:

```yaml
message: "Consider using '%s' instead of '%s'"
# or
message: "Consider using '%s'"
```

### occurrence

`occurrence` enforces the maximum or minimum number of times a particular token can appear in a given scope.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `max` | `int` | The maximum amount of times `token` may appear in a given scope. |
| `min` | `int` | The minimum amount of times `token` has to appear in a given scope. |
| `token` | `string` | The token of interest. |
{{< /details >}}

```yaml
extends: occurrence
message: "More than 3 commas!"
level: error
# Here, we're counting the number of times a comma appears
# in a sentence.
#
# If it occurs more than 3 times, we'll flag it.
scope: sentence
ignorecase: false
max: 3
token: ','
```

In the example above, we're limiting the number of commas per sentence. This is
the only extension point that doesn't accept a format specifier in its message.

### repetition

`repetition` looks for repeated occurrences of its tokens.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `ignorecase` | `bool` | Makes all matches case-insensitive. |
| `alpha` | `bool` | Limits all matches to alphanumeric tokens. |
| `tokens` | `array` | A list of tokens to be transformed into a non-capturing group. |
{{< /details >}}

```yaml
extends: repetition
message: "'%s' is repeated!"
level: error
alpha: true
tokens:
  - '[^\s]+'
```

### consistency

`consistency` will ensure that a key and its value \(e.g., "advisor" and "adviser"\) don't both occur in its scope.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `nonword` | `bool` | Removes the default word boundaries \(`\b`\). |
| `ignorecase` | `bool` | Makes all matches case-insensitive. |
| `either` | `array` | A map of `option 1: option 2` pairs of which only one may appear. |
{{< /details >}}

```yaml
extends: consistency
message: "Inconsistent spelling of '%s'"
level: error
scope: text
ignorecase: true
nonword: false
# We only want one of these to appear.
either:
  advisor: adviser
  centre: center
```

### conditional

`conditional` ensures that the existence of `first` implies the existence of `second`.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `ignorecase` | `bool` | Makes all matches case-insensitive. |
| `first` | `string` | The antecedent of the statement. |
| `second` | `string` | The consequent of the statement. |
| `exceptions` | `array` | An array of strings to be ignored. |
{{< /details >}}

```yaml
extends: conditional
message: "'%s' has no definition"
level: error
scope: text
ignorecase: false
# Ensures that the existence of 'first' implies the existence of 'second'.
first: '\b([A-Z]{3,5})\b'
second: '(?:\b[A-Z][a-z]+ )+\(([A-Z]{3,5})\)'
# ... with the exception of these:
exceptions:
  - ABC
  - ADD
```

For example, consider the following text:

> According to Wikipedia, the World Health Organization \(WHO\) is a
> specialized agency of the United Nations that is concerned with international
> public health. We can now use WHO because it has been defined, but we can't
> use DAFB because people may not know what it represents. We can use DAFB when
> it's presented as code, though.

Using the above text with our example rule yields the following:

```bash
test.md:1:224:style.UnexpandedAcronyms:'DAFB' has no definition
```

`conditional` also takes an optional `exceptions` list. Any token listed as an
exception won't be flagged.

### capitalization

`capitalization` checks that the text in the specified scope matches the case
of `match`.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `match` | `string` | `$title`, `$sentence`, `$lower`, `$upper`, or a pattern. |
| `style` | `string` | AP or Chicago; only applies when match is set to `$title`. |
| `exceptions` | `array` | An array of strings to be ignored. |
| `indicators` | `array` | An array of suffixes that indicate the next token should be ignored. |
| `threshold` | `float` | The minimum proportion of words that must be (un)capitalized for a sentence to be considered correct (default: 0.8). |
{{< /details >}}

```yaml
extends: capitalization
message: "'%s' should be in title case"
level: warning
scope: heading
# $title, $sentence, $lower, $upper, or a pattern.
match: $title
style: AP # AP or Chicago; only applies when match is set to $title.
exceptions:
  - ABC
  - add
```

There are a few pre-defined variables that can be passed as matches:

* `$title`: "The Quick Brown Fox Jumps Over the Lazy Dog."
* `$sentence`: "The quick brown fox jumps over the lazy dog."
* `$lower`: "the quick brown fox jumps over the lazy dog."
* `$upper`: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."

Additionally, when using `match: $title`, you can specify a style of either
"AP" or "Chicago".

### metric

`metric` enforces arbitrary formulas based on pre-defined, built-in variables.

{{< details "Key summary" >}}
| Name        | Type     | Description                                                     |
| :---------- | :------- | :-------------------------------------------------------------- |
| `formula`   | `string` | A formula of pre-defined variables to be evaluated.             |
| `condition` | `string` | A binary condition upon which `formula` will trigger an alert. |
{{< /details >}}

```yaml
extends: metric
message: "Try to keep the Flesch-Kincaid grade level (%s) below 8."
link: https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests

formula: |
  (0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59

condition: "> 8"
```

The table below summarizes all available variables:

|       Variable       |                                     Description                                    |
|:--------------------:|:----------------------------------------------------------------------------------:|
| `blockquote`         | The number of `blockquote` tags.                                                   |
| `characters`         | The number of characters.                                                          |
| `complex_words`      | The number of polysyllabic words without common suffixes (`es`, `ed`, `ing`, ...). |
| `heading.h{n}`       | The number of headings at the specified level (for example, `heading.h1`).         |
| `list`               | The number of `ol` and `ul` tags.                                                  |
| `long_words`         | The number of words with more than 6 characters.                                   |
| `paragraphs`         | The number of paragraphs.                                                          |
| `polysyllabic_words` | The number of words with more than 2 syllables.                                    |
| `pre`                | The number of `pre` tags.                                                          |
| `sentences`          | The number of sentences.                                                           |
| `syllables`          | The number of syllables.                                                           |
| `words`              | The number of words.                                                               |

Since the pre-defined variables are calculated using the entire document, all
`metric`-based rules are [`summary`-scoped](/docs/topic/scoping).

In addition to using the variables listed above, a `formula` may also use the
following operators:

|    Operator    |      Description      |
|:--------------:|:---------------------:|
| `+`            | Addition              |
| `-`            | Subtraction           |
| `*`            | Multiplication        |
| `/`            | Division              |
| `math.sqrt(x)` | Square root of `x`    |
| `math.abs(x)`  | Absolute value of `x` |

A `condition` may use one of `>`, `<`, `=`, `>=`, and `<=`.

The result of a `formula` will be compared to its `condition` and inserted
into its `message` format specifier (`%s`).

### spelling

`spelling` implements spell checking based on Hunspell-compatible dictionaries.

{{< details "Key summary" >}}
| Name           | Type     | Description                                                                                 |
| :------------- | :------- | :------------------------------------------------------------------------------------------ |
| `custom`       | `bool`   | Turn off the default filters for acronyms, abbreviations, and numbers.                      |
| `filters`      | `array`  | An array of patterns to ignore during spell checking.                                       |
| `ignore`       | `string` | A relative path \(from `StylesPath`\) to a file consisting of one word per line to ignore.  |
| `dicpath`      | `string` | The location to look for `.dic` and `.aff` files.                                           |
| `dictionaries` | `array`  | An array of dictionaries to load.                                                           |
| `append`       | `bool`   | Adds the array of dictionaries after the default Vale dictionary, instead of replacing it.  |
{{< /details >}}

```yaml
# Uses the built-in dictionary and filters.
extends: spelling
message: "Did you really mean '%s'?"
level: error
```

By default, `spelling` includes a custom, open-source
[dictionary for American English](https://github.com/errata-ai/en_US-web). You
may instead use the `dictionaries` key to list multiple custom dictionaries:

```yaml
extends: spelling
message: "'%s' is a typo!"
dicpath: ../../fixtures/spelling/dics
dictionaries:
  - en_US
  - en_medical
```

The `spelling` extension point will look for `en_US.{dic,aff}` and
`en_medical.{dic,aff}` files in `$DICPATH`, which you can set through an
environment variable or the `dicpath` key.

#### Ignoring non-dictionary words

`spelling` offers two different ways of ignoring non-dictionary words:

1. Using *ignore* files: Ignore files are plain-text files
   that list words to be ignored during spell check (one case-insensitive entry
   per line) . For example,

   ```text title="ignore.txt"
   destructuring
   transpiler
   ```

   Here, we're instructing `spelling` to ignore both
   `[Dd]estructuring` and `[Tt]ranspiler`.

   You can name these files anything you'd like and reference them relative to
   the active `StylesPath`:

   ```yaml
   extends: spelling
   message: "Did you really mean '%s'?"
   level: error
   ignore:
     # Located at StylesPath/ignore1.txt
     - ignore1.txt
     - ignore2.txt
   ```

2. Using *filters*: You can also customize the spell-checking experience by
   defining *filters*, which are Go-compatible
   regular expressions to applied to individual words:

   ```yaml
   extends: spelling
   message: "Did you really mean '%s'?"
   level: error
   # This disables the built-in filters. If you omit this
   # key or set it to false, custom filters (see below) are
   # added on top of the built-in ones.
   #
   # By default, filters for acronyms, abbreviations, and
   # numbers are included.
   custom: true
   # A "filter" is a regular expression specifying words
   # to ignore during spell checking.
   filters:
     # Ignore all words starting with 'py'.
     #
     # e.g., 'PyYAML'.
     - '[pP]y.*\b'
   ```

### sequence

While most extension points focus on writing *style*, `sequence` aims to
support grammar-focused rules.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `tokens` | `[]NLPToken` | A list of tokens with associated NLP metadata. |
| `ignorecase` | `bool` | Makes all matches case-insensitive. |
{{< /details >}}

```yaml
extends: sequence
# `%[4]s` is like `%s`, but specifically refers to the 4th token in our
# sequence.
message: "The infinitive '%[4]s' after 'be' requires 'to'. Did you mean '%[2]s %[3]s *to* %[4]s'?"
tokens:
  - tag: MD
  - pattern: be
  - tag: JJ
  # The `|` notation means that we'll accept `VB` or `VBN` in position 4.
  - tag: VB|VBN
```

Every `sequence`-based rule is required to have at least one `pattern` (such as
`pattern: be`, shown above). This becomes the "anchor" of the sequence: we find
all instances of the first pattern and then check that the left- and right-hand
sides of the sequence match.

Each entry in a sequence is known as an `NLPToken` and has the following
structure:

```yaml
# [optional]: A regular expression (required
# if `tag` isn't given).
pattern: '...'

# [optional]: If true, indicates that we
# *shouldn't* match this token.
negate: true   # or false

# [optional]: A part-of-speech tag (required
# if `pattern` isn't given).
tag: '...'

# [optional]: An integer meaning that there may
# be up to `n` (3, in this case) tokens between
# this token and the next one.
skip: 3
```

`sequence`-based are [sentence-scoped](/docs/topics/scoping/#markup).

### script

{{< alert context="info">}}
**Heads up**!

When using `script`-based rules, you're limited to the standard Go [regex syntax][1].

[1]: https://pkg.go.dev/regexp/syntax
{{< /alert >}}

`script` allows for the creation of arbitrary logic-based rules using
[Tengo](https://github.com/d5/tengo), a Go-like scripting language.

{{< details "Key summary" >}}
| Name | Type | Description |
| :--- | :--- | :--- |
| `script` | `string` | The [Tengo](https://tengolang.com/) script to execute. |
{{< /details >}}

```yaml
extends: script
message: "Consider inserting a new section heading at this point."
link: https://tengolang.com/
# The unprocessed file contents.
#
# We need this to access heading markup.
scope: raw
script: |
  text := import("text")
  matches := []
  p_limit := 3 // at most 3 paragraphs per section
  // Remove all instances of code blocks since we don't want to count
  // inter-block newlines as a new paragraph.
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
```

Scripts must define a `matches` variable with an array value.
To initialize an empty `matches` variable, use `matches := []`.

A match must be a map with the keys `begin` and `end` set to integer indexes.
For more information about map values, refer to [Tengo Language Syntax | Map values](https://github.com/d5/tengo/blob/master/docs/tutorial.md#map-values).

All scripts have access to Tengo's [`text`](https://github.com/d5/tengo/blob/master/docs/stdlib-text.md) module, which provides a number of
string- and regex-related utility functions.

Additionally, all scripts are passed a global variable, `scope`, that contains
the text of value of the rule's `scope:`. In our example
definition, for instance, `scope` will be the entire, unprocessed document
since the rule used `scope: raw`.

See [Scoping](/docs/topics/scoping) for more information.

## Actions

Actions in rules indicate a way for external tools with Vale integration to provide methods for correcting style issues.

The Vale CLI tool doesn't directly do anything with the value of this field and it's up to the external tool to support any actions.

While styles can use whatever value they want for actions and tools can implement the actions how they want, there are a series of standard actions that existing rules and tools use.

{{< details "Key summary" >}}
| Name | Parameters | Suggested implementation |
| :--- | :--- | :--- |
| `replace` | Values from the `swap` key | Swap matched value for suggestion in `swap` |
| `remove` | None | Remove the instance of the matched token. |
| `suggest` | `spellings` | Suggest alternatives from a non-hardcoded source. Currently only for spelling errors and `spelling` styles. |
{{< /details >}}

## Built-in style

Vale comes with a single built-in style named `Vale` that implements three rules,
as described in the table below.

{{< table rules.yml >}}
