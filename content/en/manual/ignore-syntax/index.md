---
title: --ignore-syntax
lead: Lint all files line-by-line.
label: flag
toc: false
css:
  - vendor/asciinema-player.css
js:
  - vendor/asciinema-player.js
---

{{< asciinema key="ignore" rows="20" preload="1" >}}

The `--ignore-syntax` option instructs Vale to parse all files as plain text.
Note, though, that this doesn't change what files Vale will *search*.

This will often boost performance significantly, but only text-scoped rules
will work.
