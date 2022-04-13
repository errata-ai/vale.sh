---
title: --glob
lead: A glob pattern.
label: flag
toc: false
---

The `--glob` option specifies the type of files Vale will search. It accepts
the standard [GNU/Linux syntax][1]. Additionally, any pattern prefixed with an
`!` will be negated. For example,

```bash
# Exclude `.txt` files
$ vale --glob='!*.txt' directory
...
# Only search `.md` and `.rst` files
$ vale --glob='*.{md,rst}' directory
...
```

[1]: https://github.com/gobwas/glob
