---
title: Introduction
lead: |
  Get started with Vale Server, a desktop app for Vale.
draft: false
images: []
menu:
  docs:
    parent: "vale-server"
weight: 90
toc: true
---

## Overview

**Vale Server** is a cross-platform (Windows, macOS, and Linux) desktop
application that helps enforce writing style guides. It's built on top of, and
offers a high degree of compatibility with, the Vale command-line tool.

The application consists of two parts: a *server* (which manages Vale-related
configuration details) and a *client* (which displays Vale's results).

The server is embedded in the application itself and runs
locally&mdash;meaning that your content is never transmitted, stored, or
otherwise inspected.

Clients are third-party applications that communicate with Vale Server through
[its API](https://docs.errata.ai/api/index.html), allowing you to use your
favorite tools with your server-managed configurations.

Client implementations are currently available for
[Visual Studio Code](/vale-server/clients/vscode),
[Atom](/vale-server/clients/atom),
[Sublime Text](/vale-server/clients/sublime-text),
[Google Docs](/vale-server/clients/google-docs), and
[Chrome](/vale-server/clients/chrome).

## Windows

Download `Vale-Server-2.x.x-windows.exe` (where `2.x.x<` will be the latest
version) and follow the on-screen instructions:

{{< caption src="img/win/installer-light.png" width="500px" >}}

After installation, Vale Server will automatically launch in the background
(`http://localhost:7777` by default) and you will see its icon in your taskbar:

{{< caption src="img/win/menu-light.png" width="300px" >}}

Right-clicking this icon will open a menu that allows you to configure the server.

## macOS

{{< alert context="warning">}}
**Heads up**!

On macOS, you need to start Vale Server from the **command line** rather than
clicking its icon in the Applications folder or the taskbar:

```shell
open -a "Vale Server"
```

See [issues/80](https://github.com/errata-ai/vale-server/issues/80).
{{< /alert >}}

Double-click `Vale-Server-2.x.x-macos.dmg` (where `2.x.x` will be the
latest version) to open the installer and then drag the application into your
`/Applications` folder:

{{< caption src="img/mac/installer-light.png" width="500px" >}}

After starting the application, Vale Server will automatically launch in the
background (`http://localhost:7777` by default) and you will see its icon in
your menu bar:

{{< caption src="img/mac/menu-light.png" width="300px" >}}

Clicking this icon will open a menu that allows you to configure the server.

## Linux

{{< alert context="warning">}}
**Heads up**!

On Linux, you need to start Vale Server from the **command line** rather than
clicking its icon:

```shell
./Vale-Server-linux.AppImage
```

See [issues/80](https://github.com/errata-ai/vale-server/issues/80).
{{< /alert >}}

Double-click `Vale-Server-2.x.x-linux.AppImage` (where `2.x.x` will be the
latest version). After starting the application, Vale Server will automatically
launch in the background (`http://localhost:7777` by default) and you will see
its icon in your menu bar:

{{< caption src="img/linux/menu.png" width="300px" >}}

Clicking this icon will open a menu that allows you to configure the server.
