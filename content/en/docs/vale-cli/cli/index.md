---
title: CLI Reference
lead: |
  Learn how to control Vale's configuration, functionality, and output from the
  command line.
draft: false
images: []
menu:
  docs:
    parent: "vale-cli"
weight: 30
toc: true
---

## Command Line Interface

At its core, Vale is designed to be used as a command-line tool. The available
commands and options are discussed below.

### `sync`

Download and install all external [packages](/docs/topics/packages).

```shell
$ vale sync
```

### `ls-config`

Print the current configuration options \(as JSON\) to `stdout`.

```shell
$ vale ls-config
```

See [Configuration](/docs/topics/config) for more information about the
available options.

### `ls-metrics`

Print the given file's [metrics](/docs/topics/styles/#metric).

```shell
$ vale ls-metrics file.md
```

### `--help`

The `--help` option prints Vale's CLI usage information to `stdout`.

```shell
$ vale --help
```

### `--glob`

The `--glob` option specifies the type of files Vale will search. It accepts
the [standard GNU/Linux syntax](https://github.com/gobwas/glob). Additionally,
any pattern prefixed with an `!` will be negated. For example,

```bash
# Exclude `.txt` files
$ vale --glob='!*.txt' directory
...
# Only search `.md` and `.rst` files
$ vale --glob='*.{md,rst}' directory
...
```

This option takes precedence over any patterns defined in your
[configuration file](/docs/topics/config).

### `--config`

The `--config` option specifies the location of a configuration file. This
will take precedence over the [default search process](/docs/topics/config).

```shell
$ vale --config='some/file/path/.vale.ini'
```

### `--output`

The `--output` option specifies the format that Vale will use to report its
alerts. There are three built-in styles: "CLI" (the default), "line", and
"JSON".

```shell
$ vale --output=JSON somefile.md
```

In addition to the three provided output styles, Vale also supports custom
output styles powered by Go's [`text/template`](https://golang.org/pkg/text/template/) package.

To use a custom format, pass the path to a template file through the
`--output` option:

```shell
$ vale --output='path/to/my/template.tmpl' somefile.md
```

See the [custom output formats](TODO) guide for more information.

### `--ext`

The `--ext` option allows you to assign a format \(e.g., `.md`\) to text passed
via `stdin` \(which will default to `.txt`\).

```shell
$ vale --ext='.md' '# this is a heading'
```

### `--no-wrap`

The `--no-wrap` option disables word wrapping when using the `CLI` output
format. By default, `CLI` output will be wrapped to fit your console.

```shell
$ vale --no-wrap directory
```

### `--no-exit`

The `--no-exit` option instructs Vale to always return an exit code of `0`,
even if errors were found. This is useful if you don't want CI builds to fail
on Vale-related errors.

```shell
$ vale --no-exit directory
```

### `--sort`

The `--sort` option instructs Vale to sort its output by file path. For large
directories, this can have a noticeable impact on performance.

```shell
$ vale --sort directory
```

### `--ignore-syntax`

The `--ignore-syntax` option will cause Vale to _parse_ all files as plain
text. Note, though, that this doesn't change what files Vale will _search_.

This will often boost performance significantly, but only `text`-scoped rules
will work.

```shell
$ vale --ignore-syntax directory
```

### `--version`

The `--version` option prints Vale's version.

```shell
$ vale --version
```

### `--minAlertLevel`

The `--minAlertLevel` option sets the minimum alert level to display. This
takes precedence over the value set in a configuration file.

```shell
$ vale --minAlertLevel=error
```

The supported levels are `suggestion`, `warning`, or `error`.
