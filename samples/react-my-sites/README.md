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
  - Microsoft Graph
  platforms:
  - React
  createdDate: 4/9/2020 12:00:00 AM
---

# React My Sites

## Summary

This web part shows sites that user has permissions to access. It includes Office 365 Groups, OneDrive Sites, SharePoint Sites and  App Sites created by SharePoint Add-ins.

Each Site has a symbol indicate if it is SharePoint Site, Group, Group and OnDrive.
If the Group has a microsoft team associated and user has permissions to access the symbol of teams will be displayed.
  

![MySites](./assets/MySites.gif)

![MySites](./assets/Screenshot%202020-08-06%20at%2013.50.51.png)

![Birthdays Web Part](./assets/Screenshot%202020-08-06%20at%2013.52.58.png)

![PersonalApps](./assets/Screenshot%202020-08-06%20at%2014.17.35.png)



## Used SharePoint Framework Version

![1.11.0](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-my-sites|João Mendes


## Version history

Version|Date|Comments
-------|----|--------
1.0.0|August 6, 2020|Initial release

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
- Go to **API Access** - from **SharePoint Admin Center** new experience, and **Approve** the permission to use Microsoft Graph scope **Group.Read.All** and **Directory.Read.All**


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-my-sites" />
