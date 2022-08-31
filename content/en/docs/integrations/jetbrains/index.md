---
title: JetBrains
lead: |
  Use Vale with the suite of tools by JetBrains.
draft: false
images: []
menu:
  docs:
    parent: "integrations"
weight: 120
toc: true
---

There are two options for using Vale with the suite of tools by JetBrains: You
can either configure Vale as an [external tool][1] or use the [Grazie][2]
plugin.

If you configure the CLI, Vale will work exactly as it does on the command line.
The Grazie plugin, however, only supports a subset of Vale's functionality and
may not work exactly as the CLI does in all cases.

## External tool

To configure Vale as an external tool, go to
`Preferences > Tools > External Tools` and add Vale:

{{< caption src="img/args.png" width="500px" >}}

Then, to run Vale on the current file, click `Tools > External Tools > Vale`.
An output panel will appear with clickable navigation links:

{{< caption src="img/output.png" width="800px" >}}

### Add an icon (optional)

{{< alert context="info" icon="👉">}}
**Heads up**!

If you want to use the demo icon in your own toolbar, you can [find it here][1].

[1]: https://avatars.githubusercontent.com/u/32996943?s=200&v=4
{{< /alert >}}

Go to `Preferences > Appearance & Behavior > Menus and Toolbars > Main Toolbar > Toolbar Run Actions` and then add an action:

{{< caption src="img/action.png" width="500px" >}}

The new action will now appear in your toolbar:

{{< caption src="img/toolbar.png" width="500px" >}}

### Add a shortcut (optional)

Go to `Preferences > Keymap > External Tools > Vale`, click
"Add Keyboard Shortcut", and enter a shortcut of your choice:

<div class="row row-cols-2">
  <div class="col">
    <img src="img/menu.png" class="img-fluid h-100">
  </div>
  <div class="col">
    <img src="img/key.png" class="img-fluid h-100">
  </div>
</div>

## Grazie

[Grazie Professional][2] is plugin developed by the JetBrains' team that
"provides intelligent grammar checks, completion, and writing assistance for
natural language."

It includes a ["Project style guides"][3] feature that "lets you automate checks
against various styles guides." They use Vale's YAML-based syntax to power
this feature, but currently on support a subset of its overall functionality.

[1]: https://www.jetbrains.com/help/idea/configuring-third-party-tools.html
[2]: https://plugins.jetbrains.com/plugin/16136-grazie-
[3]: https://plugins.jetbrains.com/plugin/16136-grazie-professional/docs/project-style-guides.html
