---
title: StylesPath
description: Learn about Vale's resource directory.
---

<script lang="ts">
    import Alert from '$lib/components/Alert.svelte';
</script>

<Alert>
You can override the default <code>StylesPath</code> by manually defining a
<code>VALE_STYLES_PATH</code> environment variable.
</Alert>

The `StylesPath` specifies where Vale should look for its external resources
(e.g., styles and ignore files). The path value may be absolute or relative to
the location of the parent `.vale.ini` file.

```ini
# Here's an example of a relative path:
#
# .vale.ini
# ci/
# ├── vale/
# │   ├── styles/
StylesPath = ci/vale/styles

[*.md]
# `MyStyle` is a directory within
# `ci/vale/styles`.
BasedOnStyles = MyStyle
```

If you don't specify a `StylesPath` in your `.vale.ini` file, Vale will use its
default location:

| OS      | Search Locations                                |
| :------ | :---------------------------------------------- |
| Windows | `%LOCALAPPDATA%\vale\styles`                    |
| macOS   | `$HOME/Library/Application Support/vale/styles` |
| Unix    | `$XDG_DATA_HOME/vale/styles`                    |

(Run the `vale ls-dirs` command to see the exact locations on your system.)

## Structure

A `StylesPath` contains two types of entries: _styles_ and the
special `config` directory.

```console
$ tree styles
├───config     <-- Special directory
└───write-good <-- A style
```

The `config` directory is used internally by Vale and contains the following:

| Directory           | Description                                |
| :------------------ | :----------------------------------------- |
| [`vocabularies`][1] | Project-specific terminology lists.        |
| [`dictionaries`][2] | Hunspell-compatible spelling dictionaries. |
| [`templates`][3]    | Output format templates.                   |
| [`actions`][4]      | Solutions to your custom rules.            |
| [`filters`][5]      | Configuration filters.                     |
| [`scripts`][6]      | Tengo scripts.                             |

[1]: /docs/keys/vocab
[2]: /docs/ext/spelling
[3]: /docs/templates
[4]: /docs/actions
[5]: /docs/filters
[6]: /docs/ext/script
