# Flow Button

## Summary

This web part demonstrates displaying the list of flow button of Power Automate.

![](./assets/react-flow-button.gif)

## Compatibility

![SPFx 1.13.1](https://img.shields.io/badge/SPFx-1.13.1-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible (with permissions)](https://img.shields.io/badge/Hosted%20Workbench-Compatible-yellow.svg "Requires API permissions")

## Prerequisites

This web part uses *Microsoft Graph* API and *Microsoft Flow Service* API. You need to approve the API request after deploying the package.

- Microsoft Graph
  - `User.ReadBasic.All`
- Microsoft Flow Service
  - `Flows.Read.All`

## Minimal Path to Awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-my-approvals) then unzip it)
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Solution

Solution|Author(s)
--------|---------
react-my-approvals|[Takashi Shinohara](https://github.com/karamem0) ([@karamem0](https://twitter.com/karamem0))

## Version history

Version|Date|Comments
-------|----|--------
1.1|January 22, 2022|Updated to allow multiple environments to be selected
1.0|January 11, 2022|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
