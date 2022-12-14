---
title: Configuration
lead: |
  Control what Vale lints, how it lints, and where it lints.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 80
toc: true
---

## Config file

Vale's configuration is read from a `.vale.ini` file. This file is
[INI-formatted](https://ini.unknwon.io/docs/intro) and consists of three
sections: core settings, format associations, and format-specific settings:

```ini title=".vale.ini"
# Core settings appear at the top
# (the "global" section).

[formats]
# Format associations appear under
# the optional "formats" section.

[*]
# Format-specific settings appear
# under a user-provided "glob"
# pattern.
```

### Core settings

Core settings appear at the top of the file and apply to the application itself
rather than a specific file format.

#### StylesPath

```ini
# Here's an example of a relative path:
#
# .vale.ini
# ci/
# ├── vale/
# │   ├── styles/
StylesPath = "ci/vale/styles"
```

`StylesPath` specifies where Vale should look for its external resources
(e.g., styles and ignore files\). The path value may be absolute or relative to
the location of the parent `.vale.ini` file.

#### MinAlertLevel

```ini
MinAlertLevel = suggestion
```

`MinAlertLevel` specifies the minimum alert severity that Vale will report. The
options are "suggestion", "warning", or "error" (defaults to "warning").

#### IgnoredScopes

```ini
# By default, `code` and `tt` are ignored.
IgnoredScopes = code, tt
```

`IgnoredScopes` specifies inline-level HTML tags to ignore. In other words,
these tags may occur in an active scope \(unlike `SkippedScopes`, which are
_skipped_ entirely\) but their content still won't raise any alerts.

#### IgnoredClasses

`IgnoredClasses` specifies classes to ignore. These classes may appear on both
inline- and block-level HTML elements.

```ini
IgnoredClasses = my-class, another-class
```

#### SkippedScopes

```ini
# By default, `script`, `style`, `pre`, and `figure` are ignored.
SkippedScopes = script, style, pre, figure
```

`SkippedScopes` specifies block-level HTML tags to ignore. Any content in these
scopes will be ignored.

#### WordTemplate

```ini
WordTemplate = \b(?:%s)\b
```

`WordTemplate` specifies what Vale will consider to be an individual word.

### Format associations

Format associations allow you to associate an "unknown" file extension with
a supported [file format]({{< ref "scoping" >}}):

```ini
[formats]
mdx = md
```

In the example above, we're telling Vale to treat MDX files as Markdown files.

### Format-specific settings

Format-specific sections apply their settings only to files that match their
associated glob pattern.

For example, `[*]` matches all files while `[*.{md,txt}]` only matches files
that end with either `.md` or `.txt`.

You can have as many format-specific sections as you'd like and settings
defined under a more specific section will override those in `[*]`.

#### BasedOnStyles

```ini
[*]
BasedOnStyles = Style1, Style2
```

`BasedOnStyles` specifies styles that should have all of their rules enabled.

If you only want to enable certain rules within a style, you can do so on an
individual basis:

```ini
[*]
# Enables only this rule:
Style1.Rule = YES
```

You can also disable individual rules or change their severity level:

```ini
[*]
BasedOnStyles = Style1

Style1.Rule1 = NO
Style1.Rule2 = error
```

#### BlockIgnores

```ini
[*]
BlockIgnores = (?s) *({< file [^>]* >}.*?{</ ?file >})
```

`BlockIgnores` allow you to exclude certain block-level sections of text that
don't have an associated HTML tag that could be used with `SkippedScopes`.

#### TokenIgnores

```ini
[*]
TokenIgnores = (\$+[^\n$]+\$+)
```

`TokenIgnores` allow you to exclude certain inline-level sections of text that
don't have an associated HTML tag that could be used with `IgnoredScopes`.

#### Transform

```ini
[*]
Transform = docbook-xsl-snapshot/html/docbook.xsl
```

`Transform` specifies a version 1.0 XSL Transformation \(XSLT\) for converting
to HTML.

## Markup-based configuration

You can use selective, in-text configuration through markup comments in certain
formats. The follow sections describe the comment style required for each
supported format.

### Markdown &amp; HTML

Markdown and HTML use HTML-style comments:

```markup
<!-- vale off -->

This is some text

more text here...

<!-- vale on -->

<!-- vale Style.Rule = NO -->

This is some text

<!-- vale Style.Rule = YES -->
```

### reStructuredText

reStructuredText uses its own comment style:

```text
.. vale off

This is some text

.. vale on
```

### AsciiDoc

AsciiDoc uses HTML-style comments with its pass-through functionality:

```text
pass:[<!-- vale Microsoft.GenderBias = NO -->]

This steward is ignored.

pass:[<!-- vale Microsoft.GenderBias = YES -->]

This is a steward that raises an alert.
```

## Search process

{{< alert icon="👉" >}}
You can override the default search process by manually specifying a path using
the [--config](/manual/config/) option.
{{< /alert >}}

Vale expects its configuration to be in a file named `.vale.ini` or
`_vale.ini`. It'll start looking for this file in the same folder as the file
that's being linted. If it can't find one, it'll search up to 6 levels up the
file tree. After 6 levels, it'll look for a global configuration file in the OS
equivalent of `$HOME` \(see below\).

| OS      | Search Locations                                     |
| :------ | :--------------------------------------------------- |
| Windows | `$HOME`, `%UserProfile%`, or `%HomeDrive%%HomePath%` |
| macOS   | `$HOME`                                              |
| Linux   | `$HOME`                                              |

If more than one configuration file is present, the closest one takes
precedence.
