---
title: MultiDic
lead: |
  Spell check with multiple dictionaries.
extends: spelling
tags:
  - spell check
draft: false
toc: false
---

## Source

```yaml
extends: spelling
message: "'%s' is a typo!"
dicpath: testdata/styles/dics
dictionaries:
  - en_US
  - en_medical
```

## Example

{{< output >}}
Abdominocentesis is a word in `en_medical`.
{{< /output >}}
