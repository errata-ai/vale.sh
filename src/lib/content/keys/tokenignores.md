---
title: TokenIgnores
description: Learn define custom inline-level ignores in your Vale configuration.
---

<script lang="ts">
    import Alert from '$lib/components/Alert.svelte';
</script>

<Alert>
<code>TokenIgnores</code> are only supported in Markdown, reStructuredText,
AsciiDoc, and Org Mode.
</Alert>

```ini
StylesPath = styles

[*.md]
BasedOnStyles = Vale

TokenIgnores = (\$+[^\n$]+\$+), (:math:`.*`)
```

`TokenIgnores` allow you to exclude certain inline-level sections of text that
don't have an associated HTML tag that could be used with [`IgnoredScopes`][1].

The idea is to write a regular expression that captures the entire token in the
first grouping. See this [regex101 session][2] for a more thorough explanation.

[1]: /docs/keys/ignoredscopes
[2]: https://regex101.com/r/3Raecd/1
