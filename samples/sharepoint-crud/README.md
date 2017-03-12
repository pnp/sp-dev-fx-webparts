# SharePoint CRUD operations

## Summary

Sample Web Parts illustrating performing SharePoint CRUD operations in React, Angular, JavaScript without any framework and using the [SP PnP JS library](https://github.com/OfficeDev/PnP-JS-Core).

![Sample To do SharePoint Framework Client-Side Web Part built using Angular and ngOfficeUIFabric](./assets/preview.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
sharepoint-crud|Waldek Mastykarz (MVP, Rencore, @waldekm)

## Version history

Version|Date|Comments
-------|----|--------
1.1|March 9, 2017|Updated to SPFx GA
1.0|September 16, 2016|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- clone this repo
- in the command line run:
  - `npm i`
  - `gulp serve --nobrowser`
- in your SharePoint Site create a list

> Note: this Site should be located in a Site Collection under the **/sites/** managed path, eg. **https://contoso.sharepoint.com/sites/my-team-site**

- navigate to the hosted version of SharePoint workbench, eg. **https://contoso.sharepoint.com/sites/my-team-site/_layouts/15/workbench.aspx**
- add the Web Part to canvas and in its configuration specify:
  - name of the lists where items should be stored, eg. **Items**

## Features

This project contains sample client-side web parts built on the SharePoint Framework illustrating how to perform SharePoint CRUD operations on different JavaScript frameworks.

This sample illustrates the following concepts on top of the SharePoint Framework:

- general
  - performing SharePoint CRUD operations
    - in React
    - in Angular v1.x
    - without a particular JavaScript framework
    - using the [SP PnP JS library](https://github.com/OfficeDev/PnP-JS-Core)
  - using ETag to ensure data integrity when updating and deleting items
  - chaining promises for performing multiple asynchronous operations as part of one use case
  - breaking a chain of promises in case of an error and handling it gracefully
  - retrieving List Item Entity Type for modelling items in REST requests
  - optimizing REST responses for performance
- React
  - using Office UI Fabric React components
  - using state to keep track of Web Part status and data
  - using Web Part's HttpClient in a React component
- Angular
  - loading Angular and [ngOfficeUIFabric](http://ngofficeuifabric.com) from CDN
  - using conditional rendering for one-time Web Part setup
  - passing Web Part configuration to Angular and reacting to configuration changes in the Angular application
- SP PnP JS library
  - using the SP PnP JS library with SharePoint Framework Client-Side Web Parts
  - configuring global request headers and overriding them for specific requests
  - sorting and selecting top n items from a list using the fluent API

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/sharepoint-crud" />
