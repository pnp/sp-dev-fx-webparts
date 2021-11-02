# Dynamic data

Sample web parts illustrating using the SharePoint Framework Dynamic data capability.

![Web parts placed on a modern SharePoint page showing information about events](./assets/dynamic-data-webparts.png)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) ![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to Dynamics 365")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-events-dynamicdata|[Waldek Mastykarz](https://github.com/waldekmastykarz) (MVP, Rencore, @waldekm)
react-events-dynamicdata|[Hugo Bernier](https://github.com/hugoabernier) (MVP, [@bernierh](https://twitter.com/bernierh))

## Version history

Version|Date|Comments
-------|----|--------
1.2|July 8, 2020|Updated sample to SPFx v1.10.0 (Hugo Bernier)
1.1|November 9, 2018|Updated sample to SPFx v1.7.0
1.0|June 5, 2018|Initial release

## Minimal Path to Awesome

* clone this repo
* move to right folder
* in the command line run:
  * `npm install`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* from the `sharepoint/solution` folder, deploy the `.sppkg` file to the App catalog in your tenant
* in the site where you want to test this solution
  * add the app named _react-events-dynamicdata-client-side-solution_
  * edit a page
  * add the three web parts named: _Events_, _Event details_ and _Map_
  * configure the _Event details_ web part:
    * as _Connect to source_, choose the _Events_ option
    * as _Event's properties_, choose the _Event_ option
  * configure the _Map_ web part:
    * get a Bing maps API key (follow the link in the web part)
    * as _Connect to source_, choose the _Events_ option
    * as _Event's properties_, choose the _Location_ option
    * as _Address_, choose the _address_ option
    * as _City_, choose the _city_ option

## Features

This sample contains a set of SharePoint Framework client-side web parts that illustrate the Dynamic data capability.

Web parts in this solution illustrate the following concepts on top of the SharePoint Framework:

* making web part a dynamic data source
* exposing multiple data properties from a single data source
* subscribing to dynamic data source notifications from a web part
* deploying list instances from a SharePoint Framework solution package
* using [PnPjs](https://github.com/pnp/pnpjs) to retrieve data from a SharePoint list
* using [SharePoint Framework React Controls](https://github.com/pnp/sp-dev-fx-controls-react) in web parts

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-events-dynamicdata" />
