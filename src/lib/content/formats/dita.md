---
title: DITA
description: Learn how Vale handles DITA content.
---

<script>
    import Alert from '$lib/components/Alert.svelte';
</script>

<Alert level="warning">
Due to the dependency on the third-party <code>dita</code> command, you'll
likely experience worse performance with DITA files compared to other formats.
</Alert>

DITA is supported through the [DITA Open Toolkit][1]. You'll need to follow the [installation instructions][2], including the optional step of adding the
absolute path for the `bin` directory to the `PATH` system variable.

The supported extension is `.dita`.

Vale ignores `<codeblock>`, `<tt>`, and `<codeph>` elements by default.

[1]: https://www.dita-ot.org
[2]: https://www.dita-ot.org/dev/topics/installing-client.html
