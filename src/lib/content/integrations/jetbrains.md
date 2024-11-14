---
title: JetBrains
description: Use Vale with the suite of tools by JetBrains.
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

![External tool](/jetbrains/step1.png)

Then, to run Vale on the current file, click `Tools > External Tools > Vale`.
An output panel will appear with clickable navigation links:

![External tool](/jetbrains/step2.png)

### Add an icon (optional)

Go to `Preferences > Appearance & Behavior > Menus and Toolbars > Main Toolbar > Toolbar Run Actions` and then add an action:

(See the [Vale icon][4] for a suitable icon.)

![External tool](/jetbrains/step3.png)

The new action will now appear in your toolbar:

![External tool](/jetbrains/step4.png)

## Grazie

[Grazie Professional][2] is plugin developed by the JetBrains' team that
"provides intelligent grammar checks, completion, and writing assistance for
natural language."

It includes a ["Project style guides"][3] feature that "lets you automate checks
against various styles guides." They use Vale's YAML-based syntax to power
this feature, but currently only support a subset of its overall functionality.

[1]: https://www.jetbrains.com/help/idea/configuring-third-party-tools.html
[2]: https://plugins.jetbrains.com/plugin/16136-grazie-
[3]: https://plugins.jetbrains.com/plugin/16136-grazie-professional/docs/project-style-guides.html
[4]: https://avatars.githubusercontent.com/u/32996943?s=200&v=4
