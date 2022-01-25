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
  createdDate: 5/1/2017 12:00:00 AM
---
# SharePoint Framework sample using @pnp/js and ReactJS

## Summary

This solution builds off of the solution [react-async-await-sp-pnp-js](./react-async-await-sp-pnp-js) submitted by Jose Quinto ([@jquintozamora](https://twitter.com/jquintozamora) , [blog.josequinto.com](https://blog.josequinto.com))

This implementaiton refactors to take aspects out and utilize and showcase PnPjs Version 3.

![React-pnp-js-sample](./assets/react-pnp-js-sample.png)

## Compatibility

![SPFx 1.14.0](https://img.shields.io/badge/SPFx-1.14.0-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v12%20%7C%20v14-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Incompatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-spfx-pnp-js-sample | Julie Turner ([@jfj1997](https://twitter.com/jfj1997))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Jan 13, 2022|Initial release

## Minimal Path to Awesome

1. clone this repo
1. `$ npm i`
1. Update online workbench url in the `initialPage` property of the `config/serve.json` file.
1. `$ gulp serve`

## Features

* Establishing context for the SharePoint Factory Interface
* Creating a project config file to centralize defining the PnPjs imports and SharePoint Querable object for reuse.
* Demo extending the SharePoint Querables instance with the PnPLogging beavhior.
* Demo extending the SharePoing Queryable instance with the Caching behavior
* Demo loading list items from a SharePoint library
* Demo creating a batched instance of the SharePoint Querable object.
* Demo updating list items by modifying the Title property.
* Demo executing a batch and working with the results.

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-async-await-sp-pnp-js" />
