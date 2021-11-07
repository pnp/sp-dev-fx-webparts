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
  - react
  createdDate: 11/1/2017 12:00:00 AM
---
# Documents Web Part

## Summary
This sample shows how to build web parts that display documents in accordance with the SharePoint Online modern experience. The code uses Office UI Fabric components on the top of SharePoint framework. The web parts implement filtering and sorting. Two data source approaches are demonstrated: items retrieved from the search index and real-time query to a document library.

![Demo](./assets/Preview.gif)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
- Office 365 subscription with SharePoint Online.
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Solution

Solution|Author(s)
--------|---------
react-documents|Dimcho Tsanov
react-documents (v2.0)|Harsha Vardhini ([harshagracy](https://twitter.com/harshagracy?s=20))

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 13, 2017|Initial release
2.0|April 28, 2020|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

-Using React for building SharePoint Framework client-side web parts.
-Using Office UI Fabric React styles for building user experience consistent with SharePoint and Office.
-Using the SharePoint rest API for querying document library's files.
-Using the SharePoint rest API for retrieving documents from the search index.
-Passing web part properties to React components.
-Reusing single React component between two web parts.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-documents-detailslist" />
