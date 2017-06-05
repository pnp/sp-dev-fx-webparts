# SharePoint CRUD operations

## Summary

Inspired from Waldek's SPFx-CRUD sample, created this samplw whic illustrates a use case of batching.

Sample Web Parts illustrating performing SharePoint CRUD Batch operations in JSOM and using the [SP PnP JS library](https://github.com/OfficeDev/PnP-JS-Core).

![Sample To do SharePoint Framework Client-Side Web Part built using PnP JS Core and JSOM](./assets/preview.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
spfx-crud-batch|Gautam (SharePoint Consultant, Rapid Circle, @gautamdsheth)

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 05, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- clone this repo
- in the command line run:
  - `npm i`
  - `gulp serve --nobrowser`
- in your SharePoint Site create a list/associate with existing list

> Note: this Site should be located in a Site Collection under the **/sites/** managed path, eg. **https://contoso.sharepoint.com/sites/my-team-site**

- navigate to the hosted version of SharePoint workbench, eg. **https://contoso.sharepoint.com/sites/my-team-site/_layouts/15/workbench.aspx**
- add the Web Part to canvas and in its configuration specify:
  - name of the lists where items should be stored, eg. **Items**

## Features

This project contains sample client-side web parts built on the SharePoint Framework illustrating how to perform SharePoint CRUD operations on different JavaScript frameworks.

This sample illustrates the following concepts on top of the SharePoint Framework:

- general
  - performing SharePoint CRUD operations    
    - using the [SP PnP JS library](https://github.com/OfficeDev/PnP-JS-Core)
    - using JSOM in SPFx  

- SP PnP JS library
  - using the SP PnP JS library with SharePoint Framework Client-Side Web Parts
  - configuring global request headers and overriding them for specific requests
  - sorting and selecting top n items from a list using the fluent API
- JSOM library
  - using the JSOM with SharePoint Framework Client-Side Web Parts
  
