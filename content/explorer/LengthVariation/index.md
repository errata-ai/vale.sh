---
title: LengthVariation
lead: |
  Measure sentence-length variation.
extends: script
tags:
  - stats
draft: false
toc: false
---

## Source

```yaml
extends: script
message: "This paragraph has a stdev less than 2"
link: https://tengolang.com/
scope: paragraph
script: |
  text := import("text")
  math := import("math")

  matches := []

  each := func(seq, fn) {
    for x in seq {
        fn(x)
    }
  }

  sum := func(seq) {
    s := 0
    each(seq, func(x) {
      s += x
    })
    return s
  }

  stdev := func(seq) {
    size := len(seq)
    mean := sum(seq) / size

    sd := 0.0
    each(seq, func(x) {
      sd += math.pow(x - mean, 2)
    })

    return math.sqrt(sd / size)
  }

  lengths := []
  for sent in text.re_split(`[.!?] `, scope, -1) {
    lengths = append(lengths, len(text.fields(sent)))
  }

  computed := stdev(lengths)
  if computed < 2 && len(lengths) >= 3 {
    matches = append(matches, {begin: 0, end: len(scope)})
  }
```

## Example

{{< output >}}
<mark title="This paragraph has a stdev less than 2">This</mark> obviously silly code just generates two random numbers and subtracts the
smaller from the bigger. But what's important here isn't what it does, but
rather how it's defined. Let's focus on the object literal and function
definition, as we see here:
{{< /output >}}
