---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - React
  createdDate: 7/17/2019 12:00:00 AM
---

# React Kanban Board Webpart

## Summary


This solution contains an SPFx webpart that shows a kanban board using Office UI Fabric components ([Office UI Fabric](https://developer.microsoft.com/fluentui/)).
The webpart uses the default columns of the SharePoint Tasks list for showing the board's columns and the tasks.

![picture of the web part in action](assets/kanbanofficeUI.gif)

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

This webpart reads the information from a Tasks list and uses the following OOB columns
* Task Name
* Assigned To
* % Complete
* Description
* Priority
* Task Status

The Task list can be chosen using the webpart properties (BaseTemplate 171 or 107)

## Solution

Solution|Author(s)
--------|---------
react-kanban-board | [Ram](https://twitter.com/ram_meenavalli)
react-kanban-board | Daniel Westerdale ([Westerdale Solutions Ltd.](https://westerdale.blog), [@westerdaled](https://twitter.com/westerdaled?s=20))
react-kanban-board | Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|July 17, 2019|Initial release
1.0.1.0|April 21, 2020|Added support for Teams hosts
2.0.0.0|July 10, 2020| jqwidgets replaced with a custom Kanban Board based on Office UI Component and IE11 Support

[Read More about the implementation of this Board](./src/kanban/README.md)

## Usage
* PNP Placeholder control if not Configured
* PNP WebpartTitle control  (toggle Show/Hide in property pane)
* PNP OrderPropertyPane control  (change position of buckets)
* PNP ListSelectionPropertyPane control  (including filtering on BaseTemplateId)
* Usage of BucketEdit in Pane (Use a component in property pane (custom field))
* Office UI Fabric
* PNP JS DataConnection to SharePoint


<!---Thanks from @petkir to: -->
<!--- -->
<!---* [Daniel Westerdale](https://github.com/westerdaled) for Testing and inspiration (everytime again)-->
<!---* [Hugo Bernier](https://github.com/hugoabernier) for Inspiration to use Office UI Fabric -->
<!---* [Jean-Philippe CIVADE](https://github.com/ewidance) for Bug Report IE11 (initiator of rewrite of this sample)-->
<!---* [RamPrasadMeenavalli](https://github.com/RamPrasadMeenavalli) for the initial Idea-->

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

This sample highlights the following concepts
* Binding SharePoint list data to a custom Kanban-Control
* Updating SharePoint List Items based on events from the custom Kanban-Control

When a task is moved to different columns in the Kanban Board, the status of the respective SharePoint list item is updated using PnP JS

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-kanban-board" />
