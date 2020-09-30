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
  createdDate: 1/1/2016 12:00:00 AM
---
# Organisation Chart

## Summary
A simple Organisation Chart webpart using Office UI Fabric, React, REST API batching and ServiceScope plumbing. 

![Organisation Chart for the current user running in SharePoint](./assets/orgchart.png)

![Organisation Chart for the current user running in local Workbench](./assets/orgchart-mock.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)


## Solution

Solution|Author(s)
--------|---------
OrganisationChart | Vardhaman Deshpande ([@vrdmn](https://twitter.com/vrdmn) , [vrdmn.com](http://vrdmn.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 14, 2016|Initial release
2.0|March 12, 2017|Updated for SPFx 1.0
2.1|July 19, 2017|Use office-ui-fabric-react and uifabric/styling

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`


## Features

Please see this post for further details about the web part: [SharePoint Framework: Org Chart web part using Office UI Fabric, React and OData batching](http://www.vrdmn.com/2016/09/sharepoint-framework-org-chart-web-part.html)

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Office UI Fabric
- React
- REST API operations in SPFx
- REST API batching in SPFx
- ServiceScope and ServiceKeys
- Service Locator pattern to register and consume services

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-organisationchart" />
