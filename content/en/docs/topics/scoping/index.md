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

[GitHub-Flavored Markdown](https://github.github.com/gfm/) support is built in.
By default, indented blocks, fenced blocks, and code spans are ignored.

If you're using another flavor of Markdown, see
[non-standard markup](#non-standard-markup) for information on how to
make your flavor compatible.

### HTML

HTML5 support is built in. By default, `script`, `style`, `pre`, `code`,
and `tt` tags are ignored.

### reStructuredText

reStructuredText is supported through the external program
[`rst2html`](http://docutils.sourceforge.net/docs/user/tools.html#rst2html-py). You can get
`rst2html` by installing either [Sphinx](http://www.sphinx-doc.org/en/stable/) or
[docutils](http://docutils.sourceforge.net/).

By default, literal blocks, inline literals, and `code-block`s are ignored.

### AsciiDoc

AsciiDoc is supported through the external program [Asciidoctor](https://rubygems.org/gems/asciidoctor). By default, listing blocks and inline literals are ignored.

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

By default, `<codeblock>`, `<tt>`, and `<codeph>` elements are ignored.

### XML

XML is supported through the external program [`xsltproc`](http://xmlsoft.org/XSLT/xsltproc.html).

You also need to provide a version 1.0 XSL Transformation \(XSLT\) for converting to HTML:

```ini
[*.xml]
Transform = docbook-xsl-snapshot/html/docbook.xsl
```

### Code

{{< table code.yml >}}

## Non-standard markup

When working with non-HTML markup, you'll probably find that there are certain
non-standard sections of text you'd like to ignore.

To ignore entire blocks of text—for example,
[Hugo's shortcodes](https://gohugo.io/content-management/shortcodes/)—you'll
want to define `BlockIgnores`. For example, consider the following
shortcode-like `file` snippet:

```text
{< file "hello.go" go >}
package main

func main() {
    fmt.Printf("hello, world\n")
}
{</ file >}
```

To ignore all instances of `file`, we'd use a pattern along the lines of the
following:

```ini
BlockIgnores = (?s) *({< file [^>]* >}.*?{</ ?file >})
```

The basic idea is to capture the entire snippet in the first grouping. See
[regex101](https://regex101.com/r/mFM0kZ/1/) for a more thorough explanation.

You can also define more than one by using a list \(the `\` allows for line
breaks\):

```ini
BlockIgnores = (?s) *({< output >}.*?{< ?/ ?output >}), \
(?s) *({< highlight .* >}.*?{< ?/ ?highlight >})
```

To ignore an inline section of text, you'll want to define `TokenIgnores`. For
example, let's say we want to ignore math equations of the form `$...$`:

```latex
$\begin{bmatrix} k & k & k \end{bmatrix}^T$
```

Similar to `BlockIgnores`, we just need to define a pattern:

```ini
TokenIgnores = (\$+[^\n$]+\$+)
```

