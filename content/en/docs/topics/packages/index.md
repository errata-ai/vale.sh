---
title: Packages
lead:
  Share, sync, extend, and update Vale-related assets.
draft: false
images: []
menu:
  docs:
    parent: topics
weight: 70
toc: true
---

## Overview

Packages provide a means of sharing complete Vale configurations. In practice,
there are few different situations in which they are useful:

1. Keeping up with upstream style updates;
2. using the same configuration across multiple projects;
3. extending a base configuration; or
4. some combination of the above.

A package is a `.zip` file that contains a `.vale.ini` file, a `StylesPath`
folder, or both. You include a package by using the top-level `Packages` key
in your local `.vale.ini` file:

```ini
StylesPath = .github/styles
MinAlertLevel = suggestion

Packages = Microsoft, \
https://github.com/errata-ai/errata.ai/releases/download/v1.0.0/Test.zip

[README.md]
BasedOnStyles = Vale
```

## Package hosting

The `Packages` key accepts two types of values: (1) a name of a package hosted
in the official [Package Hub]() or (2) a URL to an externally-hosted package.

## Style-only packages

## Config-only packages

## Complete packages
