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
  - Msgraph
  - Fluent UI React Controls
  platforms:
  - React
  createdDate: 4/9/2020 12:00:00 AM
---

# Staff Directory (Search Directory)

## Summary

This web part shows the current user's colleagues, and allows the user to search AD directory, The user can configure the properties to show when expand the user card.

![staff](./assets/staffdirectory.gif)
![staff](./assets/staffTeams01.png)
![staff](./assets/staffTeams02.png)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-staffdirectory|Ari Gunawan ([@arigunawan3023](https://twitter.com/arigunawan3023))
react-staffdirectory|João Mendes ([joaojmendes](https://github.com/joaojmendes))
react-staffdirectory|[Tristian O'brien](https://github.com/tristian2)



## Version history

Version|Date|Comments
-------|----|--------
1.0.0|February 16, 2021|Initial release
1.0.1|March 28, 2021|Added missing Graph API Permission (User.Read.All) for getting users information
1.0.2|April 14, 2021|Added About Me and Skills 

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Please follow all the steps:

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add and deploy package to your tenant's App Catalog
- Go to **API Access** - from **SharePoint Admin Center** new experience, and **Approve** the permission to use Microsoft Graph scopes **Presence.Read.All** and **User.Read.All**


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-staffdirectory" />
