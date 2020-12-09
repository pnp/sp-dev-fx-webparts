# Send Notifications in Teams

## Summary

This web part allows you to send MS Teams feed notifications to a selected user. It is using the new beta endpoint documented here: [https://docs.microsoft.com/graph/teams-send-activityfeednotifications](https://docs.microsoft.com/graph/teams-send-activityfeednotifications)

![react-teams-send-notification](./assets/teams-notification-sender.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11-green.svg)

![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg)

![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-red.svg)

![Teams Compatible](https://img.shields.io/badge/Teams-Compatible-green.svg)

![Workbench Not supported](https://img.shields.io/badge/Workbench-Not%20supported-lightgrey.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- You need to get the Azure AD ClientID for the "SharePoint Online Client Extensibility Web Application Principal" Application. You can do this from the Azure AD portal.

## Solution

Solution|Author(s)
--------|---------
react-teams-send-notification | Luis Mañez (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 4, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - `npm install`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Deploy `.sppkg` to SharePoint
- Edit the file `/teams/manifest.json` and update the `webApplicationInfo` with your *SharePoint Online Client Extensibility Web Application Principal* App ID
- Zip the files in the `/teams` folder, and deploy it to Teams
- Add the new SPFx Tab to any Team

## Features

This web part illustrates the following concepts:

- Using the new Feed notifications API in MS Graph from an SPFx Teams Tab (SPFx web part running as Teams tab)
- Using the Graph Toolkit react components (PeoplePicker)
- Using FluentUI components

## References

About this sample:

- [https://docs.microsoft.com/graph/api/team-sendactivitynotification?view=graph-rest-beta&tabs=http](https://docs.microsoft.com/graph/api/team-sendactivitynotification?view=graph-rest-beta&tabs=http)
- [https://docs.microsoft.com/graph/api/resources/teamworkactivitytopic?view=graph-rest-beta](https://docs.microsoft.com/graph/api/resources/teamworkactivitytopic?view=graph-rest-beta)
- [https://docs.microsoft.com/graph/api/resources/itembody?view=graph-rest-beta](https://docs.microsoft.com/graph/api/resources/itembody?view=graph-rest-beta)
- [https://docs.microsoft.com/graph/api/resources/aadusernotificationrecipient?view=graph-rest-beta](https://docs.microsoft.com/graph/api/resources/aadusernotificationrecipient?view=graph-rest-beta)


About SPFx:

- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
