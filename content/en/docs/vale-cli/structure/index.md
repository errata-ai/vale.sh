---
title: Folder Structure
lead: |
  Set up the necessary config files and folder structure to start enforcing
  a style guide.
draft: false
menu:
  docs:
    parent: "vale-cli"
weight: 20
toc: true
---

## Sample Respository

In order to familiarize ourselves with the typical Vale workflow, we'll be
referencing a [sample repository][1] that contains the required components of a
Vale configuration.

If you'd like to follow along locally, download or clone the sample repository
and copy the terminal session below:

```
$ cd vale-boilerplate
# Check your version of Vale:
$ vale -h
# Run Vale on the sample content:
$ vale README.md

 README.md
 13:20   warning  'extremely' is a weasel word!  write-good.Weasel
 15:120  warning  'However' is too wordy.        write-good.TooWordy
 27:6    error    'is' is repeated!              Vale.Repetition
 27:6    warning  'is' is repeated!              write-good.Illusions

✖ 1 errors, 3 warnings and 0 suggestions in 1 file.
```

## StylesPath

The first component we're going to discuss is our `StylesPath` (the
`/styles` directory):

```shell
$ tree styles
├───Microsoft
├───Vocab
│   ├───Blog
│   └───Marketing
└───write-good
```

This is where you'll store all of your Vale-related files (with the exception
of the `.vale.ini` file, discussed below).

### Styles

In the example above, the `Microsoft` and `write-good` top-level directories
are both styles. These are collections of individual writing rules packaged
together to enforce guidelines from a third-party organization or tool.

In practice, you'll typically come across two types of styles:

1. `prose -> YAML`: These styles take written guidelines (such as those from
   the [Microsoft Writing Style Guide][2]) and convert them into a collection
   of Vale-compatible YAML files. The benefits of this process are that the
   style becomes both machine-readable and machine-enforceable.

2. `code -> YAML`: These styles take guidelines enforced by a
   language-dependent tool (such as JavaScript's [`write-good`][3]) and convert
   them into a collection of Vale-compatible YAML files. The benefits of this
   process include improved support for markup and easier installation and
   usage (Vale is a standalone, cross-platform binary—meaning you don't have to
   worry about configuring a programming language and its dependencies).

The dedicated [styles section](/docs/topics/styles/) explains how you can
create your own custom style.

### Vocab

[Vocab](/docs/topics/vocab/) is a special folder designed to supplement your
styles. Each of its sub-folders&mdash;in this case, `Blog` and
`Marketing`&mdash;contain two files: `accept.txt` and `reject.txt`.

These files allow you to control rule "exceptions" (such as what is considered
a spelling error) without having to modify the style's source itself.

## .vale.ini

The `.vale.ini` file is where you'll control the majority of Vale's behavior,
including what files to lint and how to lint them:

```ini
StylesPath = styles

Vocab = Blog

[*.md]
BasedOnStyles = Vale, write-good
```

See the [configuration section](/docs/topics/config) for more information.

## `README.md`

In the sample repository, `README.md` represents the content we want to lint.
And while you probably have a lot more content than a single Markdown file,
this example demonstrates one of Vale's most useful features: its support for
different [markup languages](/docs/topics/scoping).

In practice, this means that you can use Vale on "real-world" markup (that
contains front matter, source code, tables, lists, etc.) and Vale will be able
to both intelligently apply rules to and completely ignore certain sections of
text.

[1]: https://github.com/errata-ai/vale-boilerplate
[2]: https://github.com/errata-ai/Microsoft
[3]: https://github.com/errata-ai/write-good
