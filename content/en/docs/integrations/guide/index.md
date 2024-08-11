---
title: Creating a plugin
lead: |
  Learn how to integrate Vale with other tools and services.
draft: false
images: []
menu:
  docs:
    parent: "integrations"
weight: 115
toc: true
---

There are two ways to integrate Vale with other tools and services: using the
Vale CLI directly or using the Vale Language Server (`vale-ls`).

For any application that supports the [Language Server Protocol][1], we
recommend using the Vale Language Server.

## `vale-ls`

The Vale Language Server (`vale-ls`) is distributed as a standalone binary that
acts as a wrapper around a local installation of Vale, providing autocomplete,
diagnostics, and hover popups, and more. The server supports the following `initializationParams`:

| Parameter         | Default | Description                                                                                                           |
|---------------|--------:|-----------------------------------------------------------------------------------------------------------------------|
| `installVale` | `true`  | Automatically install and update Vale to a `vale_bin` folder in the same location as `vale-ls`. If `false`, the `vale` executable needs to be available on the user's `$PATH`. |
| `filter`      | `None`  | An [output filter](https://vale.sh/manual/filter/) to apply when calling Vale.                                        |
| `configPath`      | `None`  | An absolute path to a `.vale.ini` file to be used as the default configuration.                                       |
| `syncOnStartup`      | `true`  | Runs `vale sync` upon starting the server.                                       |


To use the server, you'll need to download the latest release from [GitHub][2].

## `--output=JSON`

Vale can provide JSON output that extensions can use.

Your extension should call the Vale CLI, which the user of your plugin
needs to have installed, setting the output to `JSON` mode, along with any
other arguments.

```shell
vale --output JSON file_path
```

The result is a JSON object that contains the path to the file and an array of
objects that contain the line number, the error message, and the matched text.

```json
{
  "index.md": [
    {
      "Action": {
        "Name": "",
        "Params": null
      },
      "Check": "write-good.Passive",
      "Description": "",
      "Line": 6,
      "Link": "",
      "Message": "'was created' may be passive voice. Use active voice if you can.",
      "Severity": "warning",
      "Span": [
        59,
        69
      ],
      "Match": "was created"
    },
  ]
}
```

Each object contains the following information:

-   `Action`: An action or change to the text that Vale server can take with a rule, containing a `Name` for the action and `Params` passed to the action.
-   `Check`: The rule set and rule triggered.
-   `Description`: A more detailed explanation for a rule. You can use it with [custom output format](/manual/output) or an editor integration's UI.
-   `Line`: The line that contains the error.
-   `Link`: Link to explanation of style guide rule
-   `Message`: Help text output by the rule
-   `Severity`: The error level.
-   `Span`: The start and finish characters on the line.
-   `Match`: The text matched.

A plugin should loop through these checks, and parse the values, to output them to an appropriate part of the IDE or editor interface.

[1]: https://microsoft.github.io/language-server-protocol/
[2]: https://github.com/errata-ai/vale-ls/releases
