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

Each `Vocab` is a single folder (stored at `<StylesPath>/Vocab/<name>/`) consisting of
two plain-text files&mdash;`accept.txt` and `reject.txt`&mdash;that contain one word,
phrase, or regular expression per line. Vocabularies cannot be defined in
format-specific settings.  Use multiple config files to use different vocabularies for
different formats.

The effects of using a custom `Vocab` are as follows:

* Entries in `accept.txt` are added to every exception list in all styles
  listed in `BasedOnStyles`&mdash;meaning that you now only need to update your
  project's *vocabulary* to customize third-party styles (rather than the
  styles themselves).

* Entries in `accept.txt` are automatically added to a substitution rule
  (`Vale.Terms`), ensuring that any occurrences of these words or phrases
  exactly match their corresponding entry in `accept.txt`.

* Entries in `reject.txt` are automatically added to an existence rule
  (`Vale.Avoid`) that will flag all occurrences as errors.

This means that your exceptions can be developed independent of a style,
allowing you to use the same exceptions with multiple styles or switch styles
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

While most spell-checking tools ignore case altogether, Vale's `Vocab` files
are case-aware by default. This means that, for example, a vocabulary
consisting of

```text
MongoDB
```

will enforce the *exact* use of "MongoDB": "mongoDB," "MongoDb," etc., will all
result in errors. There are two ways around this.

First, you can indicate that a given entry should be case-insensitive by
providing an appropriate regular expression:

```text
(?i)MongoDB
[Oo]bservability
```

The entry, `(?i)MongoDB`, marks the entire pattern as case-insensitive while
the second, `[Oo]bservability`, provides two acceptable options.

Second, you can disable `Vale.Terms` and just use `Vale.Spelling`:

```ini
BasedOnStyles = Vale

Vale.Terms = NO
```

This will provide a more traditional spell-checking experience.

## Relation to ignore files

The functionality of vocabularies is similar to the existing concept of
[*ignore* files](/docs/topics/styles/#ignoring-non-dictionary-words).

The major differences are that vocabularies apply to multiple extension points
(rather than just `spelling`), support regular expressions, and have built-in
rules associated with them (`Vale.Terms` and `Vale.Avoid`).

In general, this means that ignore files are for style *creators* while
vocabularies are for style *users*:

* If you're developing or maintaining a style, you may still want to include a
  custom `spelling` rule&mdash;`MyStyle.Spelling`&mdash;that packages its own
  ignore files.

* As a user of styles, vocabularies should be able to replace the use of ignore
  files completely.

For example, if you were using `Vale.Spelling` with a `<StylesPath>/vocab.txt`
file prior to `v2.3`, you can simply copy the contents of `vocab.txt` into
`<StylesPath>/Vocab/<MyVocab>/accept.txt` and it'll work the same (you may
also want to disable `Vale.Terms` and `Vale.Avoid` to replicate the exact
experience).
