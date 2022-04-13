---
title: Packages
lead:
  Share, sync, extend, and update Vale-related assets.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 70
toc: true
---

## Overview

Packages provide a means of sharing complete Vale configurations. In practice,
there are few different situations in which they are useful:

1. Keeping up with upstream style updates;
2. using the same configuration across multiple projects;
3. extending a base configuration; or
4. some combination of the above.

A package is a `.zip` file that contains a `.vale.ini` file, a `StylesPath`
folder, or both. You include a package by using the top-level `Packages` key
in your local `.vale.ini` file:

```ini
StylesPath = .github/styles
MinAlertLevel = suggestion

Packages = Microsoft, \
https://github.com/errata-ai/errata.ai/releases/download/v1.0.0/Test.zip

[README.md]
BasedOnStyles = Vale
```

## Package hosting

The `Packages` key accepts two types of values: (1) a name of a package hosted
in the official [Package Hub](/hub/) or (2) a URL to an externally-hosted
package.

## Style-only packages

Style-only (such as [write-good][1]) packages are a  `.zip` archive of a single
style folder:

```console
$ unzip write-good.zip
Archive:  write-good.zip
   creating: write-good/
  inflating: write-good/README.md
  inflating: write-good/Cliches.yml
  inflating: write-good/ThereIs.yml
  inflating: write-good/Weasel.yml
  inflating: write-good/TooWordy.yml
  inflating: write-good/Passive.yml
  inflating: write-good/So.yml
  inflating: write-good/Illusions.yml
  inflating: write-good/E-Prime.yml
  inflating: write-good/meta.json
```

After running the [`sync`](/manual/sync) command, the style will be added to
the active `StylesPath`.

## Config-only packages

Config-only (such as [Hugo][2]) packages are a  `.zip` archive of a single
`.vale.ini` file:

```console
$ unzip Hugo.zip
Archive:  Hugo.zip
   creating: Hugo/
  inflating: Hugo/.vale.ini
```

After running the [`sync`](/manual/sync) command, the configuration file be
added to `StylesPath/.config` according to the order in which it was loaded.

## Complete packages

Complete packages contain both a `.vale.ini` file and an associated
`StylesPath` folder.

The `StylesPath` should be named "styles" and can contain any
typically-supported subfolder&mdash;such as [styles](/docs/topics/styles) and
[vocabs](/docs/topics/vocab). The `.vale.ini` file should reference the
included `StylesPath`:

```ini
# This is subfolder included in our .zip archive.
StylesPath = styles

# Complete packages can include other, externally-defined
# packages.
Packages = proselint

# Normal configuration ...
[*.{md,adoc}]
Test.Rule = YES
```

The packaged `StylesPath` will be merged with the active local `StylesPath`
and any included configuration files will be added to the local
`StylesPath/.config` folder.


[1]: /hub/write-good/
[2]: /hub/hugo/
