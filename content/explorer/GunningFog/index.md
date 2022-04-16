---
title: GunningFog
lead: |
  An implementation of the Gunning-Fog index.
extends: metric
tags:
  - readability
draft: false
toc: false
---

## Source

```yaml
extends: metric
message: "Try to keep the Gunning-Fog index (%s) below 10."
link: https://en.wikipedia.org/wiki/Gunning_fog_index
formula: |
  0.4 * ((words / sentences) + 100 * (complex_words / words))
condition: "> 10"
```

## Example

{{< output >}}
The Gunning-Fog index is "is a weighted average of the number of words per
sentence, and the number of long words per word. An interpretation is that
the text can be understood by someone who left full-time education at a later
age than the index."
{{< /output >}}
