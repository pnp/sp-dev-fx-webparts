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
  - AngularJS
  createdDate: 6/1/2018 12:00:00 AM
---
# Angular Elements in SharePoint Framework

## Summary

Set of sample web parts illustrating how to use Angular Elements in the SharePoint Framework.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.4.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angularelements-helloworld|Waldek Mastykarz (MVP, Rencore, @waldekm), Sébastien Levert (MVP, Valo, @sebastienlevert)

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 1, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* clone this repo
* in the command line run:
  * `npm i`
  * `gulp serve`

## Features

This sample contains a set of web parts that illustrate using Angular Elements in the SharePoint Framework.

This web part illustrates the following concepts on top of the SharePoint Framework:

* adding Angular Elements to a no-framework SharePoint Framework project
* bootstrapping Angular Elements inside a SharePoint Framework web part
* extending the building configuration to build Angular Elements
* checking if the particular web component has already been registered to avoid conflicts
* passing web part configuration to Angular Elements and reacting to configuration changes
* calling the SharePoint REST API from an Angular Element using the native Angular HttpClient
* calling the Microsoft Graph from an Angular Element using the SharePoint Framework MSGraphClient
* calling the SharePoint REST API from an Angular Element using PnPjs
* calling the Microsoft Graph from an Angular Element using PnPjs

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angularelements-helloworld" />