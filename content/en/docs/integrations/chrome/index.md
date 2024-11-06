---
title: Google Chrome
lead: |
  Use Vale with Google Chrome.
draft: false
images: []
menu:
  docs:
    parent: "integrations"
weight: 120
toc: true
---

There are two options for using Vale with the Sublime Text: [LSP][1]
(Language Server Protocol) and [SublimeLinter][2]. The LSP option is
recommended since it provides a more advanced integration.

## LSP

### Install the LSP package

1. Open the Command Palette (<kbd>Ctrl+Shift+P</kbd> on Windows/Linux,
      ⇧⌘P on macOS) and select `Package Control: Install Package`.
2. Select `LSP` from the list.

### Install the Vale Language Server

1. Open the Command Palette and select `Package Control: Install Package`.
2. Select [`LSP-vale-ls`][3] from the list.

## SublimeLinter

Follow the instructions at [SublimeLinter-vale][2].

[1]: https://lsp.sublimetext.io/
[2]: https://packagecontrol.io/packages/SublimeLinter-vale
[3]: https://github.com/errata-ai/LSP-vale-ls
