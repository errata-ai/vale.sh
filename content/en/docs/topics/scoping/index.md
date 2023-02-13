---
title: Scoping
lead: |
  Learn about how Vale handles different file types, allowing it to selectively
  target or exclude certain sections of text.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 40
toc: true
---

## Types, formats, and scopes

Vale is "syntax aware," which means that it's capable of both applying rules to
and ignoring certain sections of text. This functionality is implemented
through a *scoping* system. A scope is specified through a selector such as
`paragraph.rst`, which indicates that the rule applies to all paragraphs in
reStructuredText files.

Here are a few examples:

* `comment` matches all source code comments;
* `comment.line` matches all source code line comments;
* `heading.md` matches all Markdown headings; and
* `text.html` matches all HTML scopes.

Vale classifies files into one of three types&mdash;`markup`, `code`, or
`text`&mdash;that determine what scopes are available.

Within each type, there can be multiple supported *formats*&mdash;such as
Markdown and AsciiDoc under `markup`. Since each format has access to the same
scopes, rules are compatible across all formats within a particular type.

### markup

| Scope            | Description                                                                                                                        |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| `heading`        | Matches all `<h{1,...}>` tags. You can specify an exact level by appending a tags—for example, `heading.h1` matches all `h1` tags. |
| `table.header`   | Matches all `<th>` tags.                                                                                                           |
| `table.cell`     | Matches all `<td>` tags.                                                                                                           |
| `table.caption`  | Matches all `<caption>` tags.                                                                                                      |
| `figure.caption` | Matches all `<figcaption>` tags.                                                                                                   |
| `list`           | Matches all `<li>` tags.                                                                                                           |
| `paragraph`      | Matches all paragraphs \(segments of text separated by two newlines\).                                                             |
| `sentence`       | Matches all sentences.                                                                                                             |
| `link`           | Matches all `<a>` tags.                                                                                                            |
| `alt`            | Matches all `alt` attributes.                                                                                                      |
| `blockquote`     | Matches all `<blockquote>` tags.                                                                                                   |
| `summary`        | Matches all body text \(excluding headings, code spans, code blocks, and table cells\).                                            |
| `code`           | Matches all `<code>` tags.                                                                                                         |
| `strong`         | Matches all `<strong>` and `<b>` tags.                                                                                             |
| `emphasis`       | Matches all `<em>` and `<i>` tags                                                                                                  |
| `raw`            | Uses the raw, unprocessed markup source instead of a specific scope.                                                               |

### code

There are two `code` scopes: `comment.line` and `comment.block`.

### text

Any format not listed below is considered to be `text` and has no special
scoping rules applied.

## Formats

### Markdown

{{< alert icon="👉" context="warning" >}}
Markdown autolinks are not currently supported. See [issues/288](https://github.com/errata-ai/vale/issues/288) for more information.
{{< /alert >}}

[GitHub-Flavored Markdown](https://github.github.com/gfm/) support is built in. Vale ignores indented blocks, fenced
blocks, and code spans by default.

The supported extensions are `.md`, `.mdown`, `.markdown`, and `.markdn`.

If you're using another flavor of Markdown, see
[non-standard markup](#non-standard-markup) for information on how to
make your flavor compatible.

### HTML

HTML5 support is built in. Vale ignores `script`, `style`, `pre`, `code`,
and `tt` tags by default.

The supported extensions are `.html`, `.htm`, `.shtml`, and `.xhtml`.

### reStructuredText

reStructuredText is supported through the external program
[`rst2html`](http://docutils.sourceforge.net/docs/user/tools.html#rst2html-py). You can get
`rst2html` by installing either [Sphinx](http://www.sphinx-doc.org/en/stable/) or
[docutils](http://docutils.sourceforge.net/).

Vale ignores literal blocks, inline literals, and `code-block`s by default. The supported extensions are `.rst` and `.rest`.

See [Non-standard markup](#non-standard-markup) for more information on ignoring other types of markup.

### AsciiDoc

AsciiDoc is supported through the external program [Asciidoctor](https://rubygems.org/gems/asciidoctor).

Vale ignores listing blocks and inline literals by default. The supported extensions are `.adoc`, `.asciidoc` and `.asc`.

You can customize how `asciidoctor` is called by passing [document attributes](https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes-ref/):

```ini
StylesPath = <...>

[asciidoctor]
# attribute = value
#
# where 'YES' enables and 'NO' disables.

# enable
experimental = YES

# assign a specific value
attribute-missing = drop

[*]
BasedOnStyles = Vale

# normal config ...
```

### DITA

{{< alert icon="👉" context="warning" >}}
Due to the dependency on the third-party `dita` command,
you'll likely experience worse performance with DITA files compared to other formats.
{{< /alert >}}

DITA is supported through the [DITA Open Toolkit](https://www.dita-ot.org/). You'll need to follow the [installation instructions](https://www.dita-ot.org/dev/topics/installing-client.html), including the optional step of adding the absolute path for the `bin` directory to the `PATH` system variable.

Vale ignores `<codeblock>`, `<tt>`, and `<codeph>` elements by default.

### XML

XML is supported through the external program [`xsltproc`](http://xmlsoft.org/XSLT/xsltproc.html).

You also need to provide a version 1.0 XSL Transformation \(XSLT\) for converting to HTML:

```ini
[*.xml]
Transform = docbook-xsl-snapshot/html/docbook.xsl
```

### Org

[Org](https://orgmode.org/) support is built in. Vale ignores code blocks, literal examples, code strings, and verbatim strings by default.

### Code

Vale supports linting source code comments in a number of languages (see the table below). You can assign a markup
format to the content of the comments using the [format association](/docs/topics/config/#format-associations) section:

```ini
StylesPath = styles
MinAlertLevel = suggestion

[formats]
# Rust + Markdown
rs = md

[*.md]
BasedOnStyles = Vale
```

{{< table code.yml >}}

## Non-standard markup

When working with non-HTML markup, you'll probably find that there are certain
non-standard sections of text you'd like to ignore. This is possible using [`BlockIgnores`](/docs/topics/config/#blockignores) and [`TokenIgnores`](/docs/topics/config/#tokenignores). Some examples:

{{< tabs formats >}}

