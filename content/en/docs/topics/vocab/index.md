---
title: Vocabularies
lead: |
  Define term lists to further customize styles.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 60
toc: true
---

## Overview

Vocabularies allow you to maintain custom lists of terminology independent of
your styles.

```ini
StylesPath = "..."

# Here's were we define the exceptions to use in *all*
# `BasedOnStyles`.
Vocab = Some-Name

[*]
# 'Vale' and 'MyStyle' automatically respects all
# custom exceptions.
#
# The built-in 'Vale' style is required for using
# `Vale.Terms`, `Vale.Avoid`, or `Vale.Spelling`.
BasedOnStyles = Vale, MyStyle
```

Each `Vocab` is a single folder (stored at `<StylesPath>/Vocab/<name>/`)
consisting of two plain-text files&mdash;`accept.txt` and
`reject.txt`&mdash;that contain one word, phrase, or regular expression per
line.

Entries in `accept.txt` will be added to every exception list in all styles
  listed in `BasedOnStyles`. To customize third-party styles, you now only 
  need to update your project's *vocabulary* (rather than the
  styles themselves).
  
A custom `Vocab` automatically affects your rules as follows:

* `accept.txt` entries are added to a substitution rule
  (`Vale.Terms`), ensuring that any occurrences of these words or phrases
  exactly match their corresponding entry in `accept.txt`.

* `reject.txt` entries are added to an existence rule
  (`Vale.Avoid`) that will flag all occurrences as errors.

This allows you to develop exceptions independent of a style. 
You can use the same exceptions with multiple styles or switch styles
without having to re-implement them.

## Folder structure

`Vocab` entries are stored in `<StylesPath>/Vocab/<name>/` and are then
referenced by `<name>` in `.vale.ini`. For example, consider the following
folder structure:

```bash
$ tree styles
├───MyStyle
├───Vocab
│   ├───Blog
│   └───Marketing
└───MyOtherStyle
```

Here, our `StylesPath` (`/styles`) contains two styles (`MyStyle` and
`MyOtherStyle`) and two vocabularies (`Blog` and `Marketing`). You can then
simply reference these entries by their folder name:

```ini title=".vale.ini"
StylesPath = styles

Vocab = Blog

[*]
BasedOnStyles = Vale, MyStyle
```

## File format

Both `accept.txt` and `reject.txt` are plain-text files that take one
entry per line:

```text
first
[pP]y.*\b
third
```

The entries are case-sensitive (except for rules extending `spelling`, as
mentioned above) and may also be regular expressions.

## Case sensitivity

An important factor in successfully implementing a custom `Vocab` is
understanding how Vale handles case sensitivity.

Vale's `Vocab` files are case-aware by default while most spell-checking tools ignore case.

For example, the following vocabulary file will enforce the *exact* use of "MongoDB". Other notations will result in errors.

```text
MongoDB
```

To provide case-insensitive checks, you have two options:

- You can provide a regular expression:

    ```text
    (?i)MongoDB
    [Oo]bservability
    ```

    `(?i)MongoDB` marks the entire pattern as case-insensitive.  
    `[Oo]bservability` provides two acceptable options.

- You can disable `Vale.Terms` and just use `Vale.Spelling`:

    ```ini
    BasedOnStyles = Vale

    Vale.Terms = NO
    ```

## Difference between vocabularies and ignore files

In comparison to [*ignore* files](/docs/topics/styles/#ignoring-non-dictionary-words), 
vocabularies apply to multiple extension points (rather than just `spelling`), 
support regular expressions, and have built-in rules (`Vale.Terms` and `Vale.Avoid`).

Ignore files are for style *creators* while vocabularies are for style *users*:

* If you're developing or maintaining a style, you may still want to include a
  custom `spelling` rule&mdash;`MyStyle.Spelling`&mdash;that packages its own
  ignore files.

* As a user of styles, vocabularies should be able to replace the use of ignore
  files completely.

For example, if you were using `Vale.Spelling` with a `<StylesPath>/vocab.txt`
file prior to `v2.3`, you can copy the contents of `vocab.txt` into
`<StylesPath>/Vocab/<MyVocab>/accept.txt` and it'll work the same (you may
also want to disable `Vale.Terms` and `Vale.Avoid` to replicate the exact
experience).
