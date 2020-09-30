# react-admin-sc-catalog-pnpjs - Site Collection App Catalogs Summary View.

## Summary

A SPFx WebPart using [@pnp/sp/appcatalog](https://pnp.github.io/pnpjs/sp/docs/alm/) and [@pnp/spfx-controls-react](https://sharepoint.github.io/sp-dev-fx-controls-react/). It allows to see in a single view all the SiteCollection catalogs and the Apps installed with some useful metadata.
It needs Globlal Administrator or SharePoint Online Administrator permissions in order to access Site collection App Catalogs hidden list (https://yourtenant.sharepoint.com/sites/appcatalog/Lists/SiteCollectionAppCatalogs) and each Site Collection App Catalog. This WebPart use [@pnp/spfx-controls-react WebPartTitle](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/WebPartTitle/) and [@pnp/spfx-controls-react ListView](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/ListView/) components.

## react-admin-sc-catalog-pnpjs in action
![WebPartInAction](./assets/react-admin-sc-catalog-pnpjs-webpart-animated.gif)


## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-admin-sc-catalog-pnpjs |  [Federico Porceddu](https://www.federicoporceddu.com)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 07, 2019|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * restore dependencies: `npm install`
  * build solution `gulp build --ship`
  * bundle solution: `gulp bundle --ship`
  * package solution: `gulp package-solution --ship`
  * locate solution at `.\sharepoint\solution\react-admin-sc-catalog-pnpjs.sppkg` 
  * upload it to your tenant app catalog
  * add `react-admin-sc-catalog-pnpjs` app to your site
  * add `react-admin-sc-catalog-pnpjs` webpart to your page to see it in action

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* How to use [@pnp/sp/appcatalog](https://pnp.github.io/pnpjs/sp/docs/alm/).
* How to use [@pnp/spfx-controls-react WebPartTitle](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/WebPartTitle/)
* How to use [@pnp/spfx-controls-react ListView](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/ListView/)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/react-admin-sc-catalog-pnpjs" />

