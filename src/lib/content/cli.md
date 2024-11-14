---
title: CLI
description: Learn about the Vale command-line interface.
---

<script lang="ts">
  import CLIOptions from "$lib/components/docs/CLIOptions.svelte";
  import Env from "$lib/components/docs/Env.svelte";
  import Errors from "$lib/components/docs/Errors.svelte";
</script>

The Vale CLI is a powerful tool for linting your content in a variety of
formats. To get started, try running with no arguments:

![Vale's help text](/media/help2.png)

## Environment variables

The following list of environment variables are supported by the `vale`
command-line interface:

<Env />

You can inspect the current environment variables by running:

```bash
$ vale ls-vars
```

The exact steps for setting environment variables depend on your operating
system, but here are some useful links for [Windows][1] and [macOS][2].

## CLI options

<CLIOptions />

## Return codes

The `vale` CLI returns the following exit codes:

<Errors />

It will try to respect the value of `--output` when printing to `stderr`. For
example:

![Vale's exit codes](/media/error.png)

[1]: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/setx
[2]: https://support.apple.com/guide/terminal/use-environment-variables-apd382cc5fa-4f58-4449-b20a-41c53c006f8f/mac
