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
  createdDate: 6/1/2020 12:00:00 AM
---
# React My Groups

## Summary

Using Microsoft Graph, this webpart grabs the Office 365 groups the current user is a member of with links to the groups SharePoint site.

The webpart has been updated to include a grid like in addition to the compact layout as seen below:
![Grid Demo](./assets/React-MyGroups_Grid.png)

Compact Layout:
![Compact Demo](./assets/React-MyGroups_Compact.png)

You can change between the grid and compact layout through the settings in the property pane:
![Property Pane Demo](./assets/React-MyGroups_Property.png)

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/drop-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)


## Solution

Solution|Author(s)
--------|---------
react-my-groups | Zach Roberts

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 13, 2019|Initial release
1.1|June 1, 2020| Updated to SPFX 1.10.0
1.2|July 8, 2020| Added Grid Layout

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* Add the package to your app catalog
* Approve the Graph API permissions in the SharePoint admin center
* Add the webpart to your page


## Features

This web part lists the current user's Office 365 groups with links to the groups SharePoint site.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-my-groups" />
