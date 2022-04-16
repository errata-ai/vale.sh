---
title: --no-exit
lead: Don't return a nonzero exit code on errors.
label: flag
toc: false
css:
  - vendor/asciinema-player.css
js:
  - vendor/asciinema-player.js
---

{{< asciinema key="exit" rows="20" preload="1" >}}

The `--no-exit` option instructs Vale to always return an exit code of 0, even
if errors were found. This is useful if you don't want CI builds to fail on
Vale-related errors.
