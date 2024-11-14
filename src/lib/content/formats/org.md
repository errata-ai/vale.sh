---
title: Org
description: Learn how Vale handles Org content.
---

[Org][1] support is built in. The supported extension is `.org`.

By default, Vale ignores:

- [Code blocks][2].
- [Literal examples][3].
- [Code and verbatim strings][4].
- URLs: See [URL handling][2] for more information.

## Comments

Vale supports comment-based configuration in Org files:

- Turn Vale off entirely:

  ```properties
  # vale off

  This text will be ignored.

  # vale on
  ```

- Turn off a specific rule:

  ```properties
  # vale Style.Redundancy = NO

  This is some text ACT test

  # vale Style.Redundancy = YES
  ```

- Turn off specific match(es) within a rule:

  ```properties
  # vale Style.Redundancy["ACT test","OTHER"] = NO

  This is some text ACT test

  # vale Style.Redundancy["ACT test","OTHER"] = YES
  ```

- Turn on or off specific styles:

  ```properties
  # vale StyleName1 = YES
  # vale StyleName2 = NO
  ```

- Set styles (enabling them and switching off any other styles):

  ```properties
  # vale style = StyleName1
  # vale styles = StyleName1, StyleName2
  ```

[1]: https://orgmode.org
[2]: https://orgmode.org/org.html#Structure-of-Code-Blocks
[3]: https://orgmode.org/org.html#Literal-Examples
[4]: https://orgmode.org/org.html#Emphasis-and-Monospace-1
[5]: https://github.com/errata-ai/vale/issues/320
