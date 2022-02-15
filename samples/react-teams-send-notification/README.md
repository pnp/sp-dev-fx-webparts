# Send Notifications in Teams

## Summary

This web part allows you to send MS Teams feed notifications to a selected user. It is using the new beta endpoint documented here: [https://docs.microsoft.com/graph/teams-send-activityfeednotifications](https://docs.microsoft.com/graph/teams-send-activityfeednotifications)

![react-teams-send-notification](./assets/teams-notification-sender.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to Microsoft Graph")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- You need to get the Azure AD ClientID for the "SharePoint Online Client Extensibility Web Application Principal" Application. You can do this from the Azure AD portal.

## Solution

Solution|Author(s)
--------|---------
react-teams-send-notification | [Luis Mañez](https://github.com/luismanez) (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 4, 2020|Initial release

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

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

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


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-teams-send-notification&template=bug-report.yml&sample=react-teams-send-notification&authors=@luismanez&title=react-teams-send-notification%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-teams-send-notification&template=question.yml&sample=react-teams-send-notification&authors=@luismanez&title=react-teams-send-notification%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-teams-send-notification&template=question.yml&sample=react-teams-send-notification&authors=@luismanez&title=react-teams-send-notification%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-teams-send-notification" />
