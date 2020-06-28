# React Kanban Board Webpart

## Summary


This solution contains an SPFx webpart which shows a Kanban board using Office UI Fabric components ([Office UI Fabric](https://developer.microsoft.com/fluentui/)).
The webpart uses the default columns of the SharePoint Tasks list for showing the board's columns and the tasks.

![picture of the web part in action](assets/kanban-board.gif)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.8.2-green.svg)

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
react-kanban-board | Peter Paul Kirschner ([@petkir_at](https://twitter.com/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|July 17, 2019|Initial release
1.0.1.0|April 21, 2020|Added support for Teams hosts
2.0.0.0|July 10, 2020| jqwidgets replaced with a custom FluentUI Component and IE11 Support
[Read More about the implementation of this Board](./src/kanban/Readme.md)

## Usage
* PNP Placeholder Control if not Configured
* PNP WebpartTitle Control  (Toggle Show/Hide in PropertyPane)
* PNP Order PropertyPane Control  (Change Position of Buckets)
* PNP List Selection PropertyPane Control  (including Filter on BaseTemplateId)
* Usage of BucketEdit in Pane (Use an Component in PropertyPane (Custom Field))
* Fluent UI 
* PNP JS DataConnection to SharePoint


Thanks form @petkir to:
(Daniel Westerdale)[https://github.com/westerdaled] for Testing and inspiration (everytime again)
(Hugo Bernier)[https://github.com/hugoabernier] for Inspiration to use Office UI Fabric 
(Jean-Philippe CIVADE)[https://github.com/ewidance] for Bug Report IE11 (initiator of rewrite of this Sample)
(RamPrasadMeenavalli)[https://github.com/RamPrasadMeenavalli] for the initial Idea



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
* Binding SharePoint list data to an custom Kanban-Control
* Updating SharePoint List Items based on events from the custom Kanban-Control

When a task is moved to different columns in the Kanban Board, the status of the respective SharePoint list item is updated using PnP JS


