# Angular & ngOfficeUIFabric Client-Side Web Part

## Summary

Sample Web Part illustrating using Angular and [ngOfficeUIFabric](http://ngofficeuifabric.com/) with the SharePoint Framework.
You can find a video recording walk-through this sample from [SharePoint PnP YouTube channel](https://www.youtube.com/watch?v=FS-_0KENJkI).

![Sample To do SharePoint Framework Client-Side Web Part built using Angular and ngOfficeUIFabric](./assets/preview.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-drop2-red.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

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

The To do Web Part is a sample Client-Side Web Part built on the SharePoint Framework built using Angular and ngOfficeUIFabric.

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- using Angular v1.x with TypeScript for building SharePoint Framework Client-Side Web Parts
- using ngOfficeUIFabric for styling Angular v1.x Client-Side Web Parts
- including Angular and ngOfficeUIFabric in the Web Part bundle
- using a newer version of Office UI Fabric for styling Client-Side Web Parts
- loading CSS stylesheets from CDN
- using non-reactive Web Part Property Pane
- using conditional rendering for one-time Web Part setup
- passing Web Part configuration to Angular and reacting to configuration changes

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-ngofficeuifabric-todo" />