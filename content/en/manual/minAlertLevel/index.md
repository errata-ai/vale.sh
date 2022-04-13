---
title: --minAlertLevel
lead: The minimum level to display.
label: flag
toc: false
---

The `--minAlertLevel` option sets the minimum alert level to display. This
takes precedence over the value set in a configuration file.

```shell
vale --minAlertLevel=error
```

The supported levels are `suggestion`, `warning`, and `error`.
