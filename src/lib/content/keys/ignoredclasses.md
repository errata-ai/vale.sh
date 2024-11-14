---
title: IgnoredClasses
description: Learn about how to ignore HTML classes.
---

```ini
StylesPath = styles

IgnoredClasses = my-class, another-class

[*.md]
BasedOnStyles = Vale
```

`IgnoredClasses` specifies classes to ignore. These classes may appear on
both inline- and block-level HTML elements.
