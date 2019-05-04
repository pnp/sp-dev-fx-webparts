# Spfx Webpart / Teams tab Group members suggestion

## Summary
This webpart uses Graph API to suggest you members to add to a group (based on People endpoint), so you can easily add those members to the Group / Teams. It can be used as a SharePoint webpart or Teams tab

![Suggested Group Members Teams Tab](./assets/SuggestedMembersTeamsTab.jpg)

## Used SharePoint Framework Version

![SPFx v1.7.0](https://img.shields.io/badge/SPFx-1.7.0-green.svg)

## Solution

Solution|Author(s)
--------|---------
react-teams-tab-suggested-members|Luis Mañez (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Nov 18, 2018|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* clone repo
* gulp bundle --ship
* gulp package-solution --ship
* deploy package to SharePoint App Catalog (check tenant deploy)
* gulp package-teams (custom gulp task to zip the Teams folder)
* follow Teams deployment instructions from here: [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab#packaging-and-deploying-your-web-part-as-a-microsoft-teams-tab](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab#packaging-and-deploying-your-web-part-as-a-microsoft-teams-tab)

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* __Teams__ tab webpart using ReactJS
* Using __GraphClient__ to call _/me/people_
* Graph API __Batch request__ to add members to a Group
* Gulp custom task to zip Teams folder
* Using _async / await_ for the async calls
* Office UI fabric PeoplePicker

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-teams-tab-suggested-members" />
