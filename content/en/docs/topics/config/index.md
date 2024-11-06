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

{{< alert icon="👉" context="info" >}}
You can override the default `StylesPath` by manually defining a 
`VALE_STYLES_PATH` environment variable.
{{< /alert >}}

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

As of v3.0.0, Vale supports a default `StylesPath`. The location of this path
depends on your operating system:

| OS      | Search Locations                                     |
| :------ | :--------------------------------------------------- |
| Windows | `%LOCALAPPDATA%\vale\styles`                         |
| macOS   | `$HOME/Library/Application Support/vale/styles`      |
| Unix    | `$XDG_DATA_HOME/vale/styles`                         |

(Run the `vale ls-dirs` command to see the exact locations on your system.)

#### Packages

The list of packages to install to the `StylesPath`.

After running the [`sync`](/manual/sync) command, the styles will be added to
the active `StylesPath`, and any configuration files will be added to
`StylesPath/.config` according to the order in which they were loaded.

See [Packages](/docs/topics/packages) for more information and usage examples.

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
Note that this is merely an extension-level substitution and is not a means of
adding support for a new file type.

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

{{< alert icon="👉" context="info">}}
`BlockIgnores` are only supported in **Markdown**, **reStructuredText**, **AsciiDoc**, 
  and **Org Mode**.

See [Non-standard markup](/docs/topics/scoping/#non-standard-markup) for more 
information and usage examples.
{{< /alert >}}

`BlockIgnores` allow you to exclude certain block-level sections of text that
don't have an associated HTML tag that could be used with [`SkippedScopes`](#skippedscopes).

```ini
[*]
BlockIgnores = (?s) *({< file [^>]* >}.*?{</ ?file >})
```

The basic idea is to capture the entire block in the first grouping. See
[regex101](https://regex101.com/r/mFM0kZ/1/) for a more thorough explanation.

You can also define more than one block by using a list \(the `\` allows for line
breaks\):

```ini
BlockIgnores = (?s) *({< output >}.*?{< ?/ ?output >}), \
(?s) *({< highlight .* >}.*?{< ?/ ?highlight >})
```

#### CommentDelimiters

`CommentDelimiters` allow you to override standard, HTML comment delimiters (`<!-- -->`).

Custom comment delimiters are useful when using non-standard markup which do not allow HTML-style comments.

```ini
[formats]
mdx = md

[*.mdx]
BasedOnStyles = Vale

CommentDelimiters = {/*, */}
```

When `CommentDelimiters` are set, you can take full advantage of [markup-based configuration](#markup-based-configuration) to enable or disable specific rules within a section.

For instance, when using MDX:

```markup
{/* vale off */}

This is some text ACT test

This is some text ACT test

{/* vale on */}

{/* vale vale.Redundancy = NO */}

This is some text ACT test

{/* vale vale.Redundancy = YES */}
```

#### TokenIgnores

{{< alert icon="👉" context="info">}}
`TokenIgnores` are only supported in **Markdown**, **reStructuredText**, **AsciiDoc**, 
  and **Org Mode**.

See [Non-standard markup](/docs/topics/scoping/#non-standard-markup) for more 
information and usage examples.
{{< /alert >}}

`TokenIgnores` allow you to exclude certain inline-level sections of text that
don't have an associated HTML tag that could be used with [`IgnoredScopes`](#ignoredscopes).

```ini
[*]
TokenIgnores = (\$+[^\n$]+\$+)
```

The basic idea is to capture the entire inline-level section in the first grouping. See
[regex101](https://regex101.com/r/mFM0kZ/1/) for a more thorough explanation.

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

{{< alert icon="👉" context="info" >}}
Commenting out headers/headings isn't currently supported. See [issues/340](https://github.com/errata-ai/vale/issues/340) for more information.
{{< /alert >}}

reStructuredText uses its own comment style:

```text
.. vale off

This is some text

.. vale on
```

### Org Mode

Org Mode uses its own comment style:

```text
# vale off

This is some text

# vale on
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

{{< alert icon="👉" context="info" >}}
You can override the default search process by manually specifying a path using
the [--config](/manual/config/) option or by defining a `VALE_CONFIG_PATH` environment variable.
{{< /alert >}}

Vale expects its configuration to be in a file named `.vale.ini` or
`_vale.ini`. It'll start looking for this file in the same folder as the file
that's being linted. If it can't find one, it'll search up the file tree.

If no ancestor of the current directory has a configuration file, Vale will
use a global configuration file (see below).

## Global configuration

In addition to project-specific configurations, Vale also supports a global
configuration file and `StylesPath`. The expected location of the global
configuration depends on your operating system:

| OS      | Search Locations                                     |
| :------ | :--------------------------------------------------- |
| Windows | `%LOCALAPPDATA%\vale\.vale.ini`                      |
| macOS   | `$HOME/Library/Application Support/vale/.vale.ini`   |
| Unix    | `$XDG_CONFIG_HOME/vale/.vale.ini`                    |

(Run the `vale ls-dirs` command to see the exact locations on your system.)

This is different from the other config-defining options (`--config`,
`VALE_CONFIG_PATH`, etc.) in that it's loaded in addition to, rather than 
instead of, any other configuration sources.

In other words, this config file is *always* loaded and is read after
any other sources to allow for project-agnostic customization.
