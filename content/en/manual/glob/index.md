---
title: --glob
lead: A glob pattern.
label: flag
toc: false
css:
  - vendor/asciinema-player.css
js:
  - vendor/asciinema-player.js
---

{{< asciinema key="glob" rows="20" preload="1" >}}

The `--glob` option specifies the type of files Vale will search. It accepts
the standard [GNU/Linux syntax][1]. Additionally, any pattern prefixed with an
`!` will be negated.

[1]: https://github.com/gobwas/glob
