# React Visio Embed

## Summary

This sample shows how the [Visio JavaScript APIs](https://docs.microsoft.com/office/dev/add-ins/reference/overview/visio-javascript-reference-overview) can be used within a web part. For sample purposes, this web part will display the name and the hyperlinks of a Visio shape when the user selects it.

![Demo](./assets/Preview.PNG)

## Used SharePoint Framework Version

![SPFx 1.11.0](https://img.shields.io/badge/drop-1.11.0-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Visio JavaScript APIs](https://docs.microsoft.com/office/dev/add-ins/reference/overview/visio-javascript-reference-overview)

## Prerequisites

- Office 365 subscription with SharePoint Online licence
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Solution

| Solution    | Author(s)      |
| ----------- | -------------- |
| react-visio | Joel Rodrigues |

## Version history

| Version | Date               | Comments             |
| ------- | ------------------ | -------------------- |
| 1.6     | August 25, 2020 | Update to SPFx 1.11.0 |
| 1.5     | February 20, 2019 | Update to SPFx 1.10.0 |
| 1.4     | September 20, 2019 | Update to SPFx 1.9.1 |
| 1.3     | April 4, 2019      | Update readme        |
| 1.2     | January 4, 2019    | Update to SPFx 1.7.1 |
| 1.1     | October 3, 2018    | Update to SPFx 1.6.0 |
| 1.0     | August 23, 2018    | Initial release      |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve --nobrowser`
- upload a sample Visio file to a SharePoint document library
- open the file on the Visio web client and copy the Url from the browser
- navigate to the hosted version of SharePoint workbench, eg. https://contoso.sharepoint.com/sites/test/_layouts/15/workbench.aspx
- add the url on the web part properties field and the EmbeddedSession will start and display the diagram

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Using the Visio JavaScript APIs to embed a diagram on a page
- Using the Visio JavaScript APIs to interact with the Visio diagram and data available

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-visio" />
