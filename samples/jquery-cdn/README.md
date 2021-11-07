---
page_type: sample
products:
- office-sp
- office-365
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - JQuery
  createdDate: 9/16/2016 12:00:00 AM
  scenarios:
  - Embed
---
# Using jQuery loaded from CDN

## Summary

This is a sample web Part that illustrates the use of jQuery and its plugins loaded from CDN for building SharePoint Framework client-side web parts.

![Sample Web Part built using jQuery showing current weather in the specified location](./assets/preview_weather.png)


## Compatibility

![SPFx 0.2.0](https://img.shields.io/badge/SPFx-0.2.0-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
jquery-cdn|Waldek Mastykarz (MVP, Rencore, @waldekm)

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 16, 2016|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- clone this repo
- in the command line run:
  - `npm i`
  - `gulp serve`

## Features

This project contains sample client-side web parts built on the SharePoint Framework illustrating how to use jQuery and its plugins loaded from CDN for building SharePoint Framework client-side web parts.

This web part illustrates the following concepts on top of the SharePoint Framework:
- loading jQuery from CDN
- loading non-AMD jQuery plugins with configured dependency on jQuery
- using non-reactive web part Property Pane
- using conditional rendering for one-time web part setup

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/jquery-cdn" />
