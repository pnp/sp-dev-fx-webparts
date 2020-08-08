---
page_type: sample
products:
- office-sp
- office-365
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  - Office UI Fabric
  platforms:
  - AngularJS
  createdDate: 8/29/2016 12:00:00 AM
  scenarios:
  - Embed
---
# Angular & ngOfficeUIFabric Client-Side Web Part

## Summary

this is a sample web part that illustrates the use of Angular and [ngOfficeUIFabric](https://github.com/ngOfficeUIFabric) with the SharePoint Framework.
You can find a video recording walk-through this sample from [SharePoint PnP YouTube channel](https://www.youtube.com/watch?v=FS-_0KENJkI).

![Sample To do SharePoint Framework Client-Side Web Part built using Angular and ngOfficeUIFabric](./assets/preview.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-drop2-red.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-ngofficeuifabric-todo|Waldek Mastykarz (MVP, Rencore, @waldekm)

## Version history

Version|Date|Comments
-------|----|--------
1.1|September 9, 2016|Updated sample to SPFx v0.2.0 and changed to loading Angular and ngOfficeUIFabric from CDN
1.0|August 29, 2016|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- clone this repo
- in the command line run:
  - `npm i`
  - `tsd install`
  - `gulp serve`

## Features

The To Do web part is a sample client-side web part built on the SharePoint Framework built using Angular and ngOfficeUIFabric.

This web part illustrates the following concepts on top of the SharePoint Framework:

- using Angular v1.x with TypeScript for building SharePoint Framework client-side web parts
- using ngOfficeUIFabric for styling Angular v1.x client-side web parts
- including Angular and ngOfficeUIFabric in the web part bundle
- using a newer version of Office UI Fabric for styling client-side web parts
- loading CSS stylesheets from a CDN
- using non-reactive web part property pane
- using conditional rendering for one-time web part setup
- passing web part configuration to Angular and reacting to configuration changes

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-ngofficeuifabric-todo" />