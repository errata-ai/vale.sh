---
title: Overview
lead: |
  Learn about Vale and its use cases.
draft: false
images: []
menu:
  docs:
    parent: "vale-cli"
weight: 5
toc: true
---

## What is (and isn't) Vale?

When you think about software built for automated writing assistance, a lot
of assumptions probably come to mind. You've heard terms like "cloud-based,"
"artificial intelligence," and "machine learning." You've been promised
"sophisticated," human-like feedback to dramatically improve your writing.

Vale is none of that&mdash;it wasn't designed to be, and it doesn't try to
be. To put it succinctly, Vale doesn't teach you *how to* write; it’s a tool
*for* writers.

This distinction is particularly important to understand because Vale doesn't
offer any of its own advice. Instead, it offers a framework for creating and
enforcing [custom rules][1]. Its approach is much more similar to code linters
than it is to traditional grammar checkers.

See "[Introducing Vale, an NLP-powered linter for prose][2]" for a more
detailed explanation.

## Why should you use Vale?

- It will enforce your own style and can go well beyond traditional
  writing-related rules. See [GitLab's configuration][5] for an idea of what's
  possible.

- It understands [markup][4] well, allowing you to write your content in
  Markdown, AsciiDoc, reStructuredText, and more, without syntax-related false
  positives.

- It works 100% offline. Your content is never sent to a remote server for
  processing.

- [It's fast][6], and can be used pretty much anywhere: the terminal, your
  [favorite editor][7], [the web][8], or with a CI/CD service.

## Who is using Vale?

... [a lot of people][3].

[1]: /docs/topics/styles/
[2]: https://medium.com/valelint/introducing-vale-an-nlp-powered-linter-for-prose-63c4de31be00
[3]: https://vale.sh#users
[4]: /docs/topics/scoping/
[5]: https://docs.gitlab.com/ee/development/documentation/testing.html#vale
[6]: https://github.com/errata-ai/vale#benchmarks
[7]: /docs/integrations/guide/
[8]: /docs/integrations/chrome/
