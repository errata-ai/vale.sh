---
title: Sublime Text
lead: |
  Use Vale with the Sublime Text 4.
draft: true
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

1. Install the `LSP` package from Package Control:

   1. Open the Command Palette (<kbd>Ctrl+Shift+P</kbd> on Windows/Linux,
      ⇧⌘P on macOS) and select `Package Control: Install Package`.
   2. Select `LSP` from the list.

2. Install the `LSP-vale-ls` package from Package Control:

    1. Open the Command Palette (<kbd>Ctrl+Shift+P</kbd> on Windows/Linux,
        ⇧⌘P on macOS) and select `Package Control: Install Package`.
    2. Select `LSP-vale-ls` from the list.


## SublimeLinter

Follow the instructions at [SublimeLinter-vale][2].

[1]: https://lsp.sublimetext.io/
[2]: https://packagecontrol.io/packages/SublimeLinter-vale
