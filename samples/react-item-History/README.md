# Item History

## Summary
This listview command is used to show the past versions of the selected list item in a grid.

![Item History](./Capture.PNG)

## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v6 | v8](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20v8-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
> No pre-requisites

## Solution

Solution|Author(s)
--------|---------
react-item-History|Russell Gove


## Version history

Version|Date|Comments
-------|----|--------
1.0|June 15, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

## Features
This listview command is used to show the past versions of the selected list item in a grid.
```bash
Add-PnPCustomAction
    -Name 'Item History(GRID)' 
    -Title 'Item History(GRID)' 
    -Location 'ClientSideExtension.ListViewCommandSet.CommandBar' 
    -ClientSideComponentId "f6b9bab2-00a1-4ff1-8bc2-04fea3d64fed"  
    -RegistrationType List 
    -RegistrationId "101" 
    -ClientSideComponentProperties "{}"
```
<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-item-history" />
