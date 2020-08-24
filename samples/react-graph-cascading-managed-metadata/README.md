# Cascading managed metadata using Graph API (beta)

This webpart shows how to use the Microsoft Graph APIs (beta) for Taxonomy to get the data.

### Functionality
![Cascading managed metadata](./assets/cmmd.gif)

### Termstore
![Term store](./assets/termstore.png)

## Used SharePoint Framework Version

![SPFx v1.11.0](https://img.shields.io/badge/SPFx-1.11.0-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-graph-cascading-managed-metadata| Anoop Tatti ([@anooptells](https://twitter.com/anooptells))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Aug 24, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* Get data terms using Microsoft Graph API (beta).
* React Hooks
* Using async / await for the async calls
* Caching the data in session storage
* Usage of PnP SPFx controls (Maps and Placeholder)
* Office UI fabric components

## Config

* Set up the termset structure as shown in the image above.
* For the cities, get the required latitude and longitude.
* Set the description of the city term as `latitude;longitude` (as highlighted for teh term `London` in the image above).

## Enhancements

* Currently, this webpart supports 2 level cascading. So there is scope to enhance this such that it supports more levels of cascading dynamically.
* Currently, this webpart reads latitude and longitude from description of the city terms. If there is a way of getting these from the custom properties of the city terms, then that needs to be implemented.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.
