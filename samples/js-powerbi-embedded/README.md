---
page_type: sample
products:
- office-sp
- power-bi
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - JQuery
  createdDate: 1/1/2016 12:00:00 AM
---
# Embed a PowerBI Report

## Summary

This sample SharePoint Framework client-side web part embedding a PowerBI report using PowerBI Embedded without any server-side code.

![PowerBI Embedded Client-SideWeb Part in the SharePoint Workbench](./assets/screenshot_powerbi_embedded_spfx.png)


## Compatibility

![SPFx 0.2.0](https://img.shields.io/badge/SPFx-0.2.0-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Solution

Solution|Author(s)
--------|---------
powerbi-embedded|Roland Oldengarm (Provoke Solutions, @rolandoldengarm)

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 13, 2016|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Prerequisites

- Created a Workspace and a  Workspace collection in Azure
- PowerBI report saved as PBIX
- PBIX uploaded to the Workspace
- Report Access Token generated

Please refer to [this blog post](http://rolandoldengarm.com/index.php/2016/09/13/part-3-how-to-embed-a-power-bi-report-in-sharepoint-with-the-sharepoint-framework/) for detailed instructions how to do this.

## Minimal Path to Awesome

- clone this repo
- `$ npm i`
- `$ gulp serve`

## Features

The _PowerBI Embedded_ Client-Side Web Part is built on the SharePoint Framework using React and uses [PowerBI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) to securely display a report.
All authentication and rendering happens client-side, there is no server-side component required.

It uses the [PowerBI Client](https://www.npmjs.com/package/powerbi-client) for rendering the PowerBI report.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-powerbi-embedded" />
