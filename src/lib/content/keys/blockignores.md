---
title: BlockIgnores
description: Learn define custom block-level ignores in your Vale configuration.
---

<script lang="ts">
    import Alert from '$lib/components/Alert.svelte';
</script>

<Alert>
<code>BlockIgnores</code> are only supported in Markdown, reStructuredText,
AsciiDoc, and Org Mode.
</Alert>

```ini
StylesPath = styles

[*.md]
BasedOnStyles = Vale

BlockIgnores = (?s) *({< file [^>]* >}.*?{</ ?file >})
```

`BlockIgnores` allow you to exclude certain block-level sections of text that
don't have an associated HTML tag that could be used with [`SkippedScopes`][1].

The idea is to write a regular expression that captures the entire block in the
first grouping. See this [regex101 session][2] for a more thorough explanation.

[1]: /docs/keys/skippedscopes
[2]: https://regex101.com/r/mFM0kZ/1/
