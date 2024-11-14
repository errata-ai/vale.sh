---
title: LSP
description: Get started with Vale's Language Server.
---

The Vale Language Server (`vale-ls`) is distributed as a standalone binary that
acts as a wrapper around a local installation of Vale, providing autocomplete,
diagnostics, and hover popups, and more.

The server supports the following `initializationParams`:

| Parameter       | Default | Description                                                                                                                                                                    |
| --------------- | ------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `installVale`   |  `true` | Automatically install and update Vale to a `vale_bin` folder in the same location as `vale-ls`. If `false`, the `vale` executable needs to be available on the user's `$PATH`. |
| `filter`        |  `None` | An [output filter](https://vale.sh/manual/filter/) to apply when calling Vale.                                                                                                 |
| `configPath`    |  `None` | An absolute path to a `.vale.ini` file to be used as the default configuration.                                                                                                |
| `syncOnStartup` |  `true` | Runs `vale sync` upon starting the server.                                                                                                                                     |

To use the server, you'll need to download the latest release from [GitHub][2].
See the Sublime Text [package][3] for an example of how to use the server.

[1]: https://microsoft.github.io/language-server-protocol/
[2]: https://github.com/errata-ai/vale-ls/releases
[3]: https://packagecontrol.io/packages/LSP-vale-ls
