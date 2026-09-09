# Jupyter

Learn how Vale handles Jupyter notebooks.

{% hint style="info" %}
Requires Vale v3.21.0 or later. Earlier versions can read the Markdown cells with a [View](../topics/views.md#data) instead.
{% endhint %}

A [Jupyter](https://jupyter.org/) notebook is a JSON file of cells. Vale reads it cell by cell, in order:

* A Markdown cell is linted as [Markdown](markdown.md).
* A code cell is linted as [code](code.md) in the kernel's language, so its comments are the prose. A cell that opens with the `%%markdown` (or `%%md`) magic is prose instead.
* Raw cells and cell outputs are skipped.

The supported extension is `.ipynb`:

```ini
[*.ipynb]
BasedOnStyles = Vale
```

An alert's line and column are those of the `.ipynb` file itself: the position of the text inside the JSON string that holds it.

## [Code cells](jupyter.md#code-cells)

The kernel's language comes from the notebook's `kernelspec`, then from its `language_info`. A cell that names its own language, as VS Code does in the cell's metadata, is linted as that language instead.

| Kernel language                   | Linted as  |
| --------------------------------- | ---------- |
| `python`, `python3`, `ipython`    | Python     |
| `r`                               | R          |
| `julia`                           | Julia      |
| `javascript`                      | JavaScript |
| `typescript`                      | TypeScript |
| `rust`                            | Rust       |
| `go`                              | Go         |
| `c`, `c++`, `cpp`                 | C++        |
| `java`                            | Java       |
| `ruby`                            | Ruby       |
| `lua`                             | Lua        |
| `php`                             | PHP        |
| `haskell`                         | Haskell    |
| `elixir`                          | Elixir     |
| `clojure`                         | Clojure    |
| `perl`                            | Perl       |
| `csharp`, `c#`                    | C#         |
| `scala`                           | Scala      |
| `powershell`                      | PowerShell |

A comment carries the same scopes it would in a source file, `text.comment.line.py` for a one-line Python comment, so a rule can target notebook code by language. Code cells in a language that is not listed, a Bash kernel for one, are skipped.

## [Older notebooks](jupyter.md#older-notebooks)

Notebooks with `nbformat` 3 are read too: cells are found in each worksheet, a heading cell is read as a Markdown heading of its level, and a code cell's `language` field names its language.

## [Views](jupyter.md#views)

A [View](../topics/views.md) on the section takes precedence over the built-in reading, for anyone who wants a different one: only the Markdown cells, say, or the strings in a cell's outputs.
