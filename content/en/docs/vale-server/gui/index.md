---
title: User Interface
lead: |
  Vale Server's user interface (UI) consists of two parts: a native desktop
  application and a web-based dashboard.
draft: false
images: []
menu:
  docs:
    parent: "vale-server"
weight: 100
toc: true
---

## Preferences

To access the native application, click on its icon in the context menu and
then select <b>Preferences...</b>.

### Projects

Projects allow you to manage multiple Vale configuration files in one place.
Each project has a name (the left panel) and an associated configuration file
(the right panel):

{{< caption src="img/linux/projects.png" width="500px" >}}

To create a new project, click "Add" and then double-click the "Untitled n"
entry to give it a name. You can then edit the configuration file on the right
to customize the project. To remove a project, click its name and then click
the "Remove" button.

After you've created and configured your projects, you can switch between them
by choosing **Select Project** from the context menu.

### Advanced

The Advanced page allows you to configure the port that Vale Server
will listen on. You'll need to restart the server for the change to
take effect.

{{< caption src="img/linux/advanced.png" width="500px" >}}

## Dashboard

The dashboard provides a web-based interface for managing your Vale-related
assets.

### Status

The Status page allows you to quickly see what versions of related software
Vale Server is using.

{{< caption src="img/macos/status.png" width="500px" >}}

### Studio

The Studio page allows you to create and test rules.

{{< caption src="img/macos/studio.png" width="500px" >}}
