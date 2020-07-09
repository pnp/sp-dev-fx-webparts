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
  createdDate: 8/7/2020 12:00:00 AM
---
# Modern Organization Chart

## Summary

This webpart show organization chart for current user, shows, managers and direct reports and there available status.

On Click the profile page of will be open.




## Screenshots

![](../react-modern-organization-chart/assets/Screenshot1.png)

![](../react-modern-organization-chart/assets/Screenshot2.png)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Title | Text| no|
Refresh Status Interval in minutes | number| no | default value 5 min


### Working with

Built with SharePoint Framework GA, Microsoft Graph API and @pnp/PnPjs  

## Used SharePoint Framework Version

![SPFx 1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-modern-organization-chart|João Mendes)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|July 08, 2020| Initial Release


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Prerequisites

- SharePoint Online tenant , Microsoft Graph,

This web part use Microsoft Graph API to get presence of users, and need to have the Permission "presence.Read.All".

## Minimal Path to Awesome

- clone this repo
- `npm i`
- `gulp build`
- `gulp bundle --ship`
- `gulp package-solution --ship`
-  `Add Package to AppCatalog`
-  `On the API Management Approve Permission "presence.read.all"`
- 



![](https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-modern-organization-chart)
