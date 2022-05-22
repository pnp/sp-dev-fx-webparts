# All Microsoft 365 Groups and Teams with SPFx

## Summary
Web part pulls all Microsoft 365 Groups and Teams that the logged in user has access to view.
1. The Microsoft Groups view has filter option for private or public groups and can switch between viewing all groups or just my groups. 
 - Group Name (hover for group description)
 - Link to email
 - Link to SharePoint site
 - Link to calendar
 - Link to Planner plan (if available) 
 - Group privacy
2. The Microsoft Teams view has filter option for private or public Teams.
 - Team Name (hover for group description)
 - Link to email
 - Link to SharePoint site
 - Link to calendar
 - Link to Planner plan (if available)
 - Link to Team
 - Team privacy
   Each Team o Uses SharePoint theme. 

![picture of the web part in action](./assets/Groups-in-my-organization.png)
![picture of the web part in action](./assets/My-Teams-Teams-Side-By-Side-Theme.png)
![picture of the web part in action](./assets/My-Groups-Public-Filter.png)
![picture of the web part in action](./assets/My-Teams-Teams-With-Tooltip.png)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg) 
![Node.js v14 | v12 | v10](https://img.shields.io/badge/Node.js-v14%20%7C%20v12%20%7C%20v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%202019-Not%20compatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%202016%20(Feature%20Pack%202)-Not%20compatible-red.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires API permissions")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-yellow.svg "Only after API permissions granted")
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

Solution|Author(s)
--------|---------
React-Groups-Teams | [Alison Collins](https://github.com/ReactIntern) ([Blog](https://graphgod.dev), [LinkedIn](https://www.linkedin.com/in/alison-collins-53192b219/))  |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0.0   | April 16, 2021 | Initial release |
| 1.0.1   | August 1, 2021 | Fixed references to Office.com |
| 1.1.0   | October 8, 2021 | Upgraded to SPFx 1.12.1 for higher compatibility and added Teams Tab deployment support. |


## Prerequisites

- Administrative access to Azure AD of Microsoft 365 tenant
- SharePoint Online tenant
- You need following set of permissions in order to manage Microsoft 365 Groups and Teams

```
"webApiPermissionRequests": [{
      "resource": "Microsoft Graph",
      "scope": "Groups.Read.All"
    }, {
      "resource": "Team",
      "scope": "Teams.ReadBasic.All"
    }]
```

## Minimal Path to Awesome

- Clone this repo
- Navigate to the folder with current sample
- Restore dependencies: `$ npm i`
- Bundle the solution: `$ gulp bundle --ship`
- Package the solution: `$ gulp package-solution --ship`
- Upload to SharePoint tenant app catalog
- You will see a message saying that solution has pending permissions which need to be approved
- Approve the permission requests.
- Run `$ gulp serve --nobrowser`
- Open hosted workbench, i.e. `https://<tenant>.sharepoint.com/sites/<your site>/_layouts/15/workbench.aspx`
- Search and add `O365 Groups Manager` web part to see it in action

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This project contains sample client-side web part built on the SharePoint Framework illustrating possibilities to quickly gain access to features in Microsoft 365 Groups and Teams using React and MS Graph.

This sample illustrates the following concepts on top of the SharePoint Framework:

- Explore MS Graph APIs for Microsoft 365 Group
- Using the MSGraphClient in a SharePoint Framework web part
- Requesting API permissions in a SharePoint Framework package
- Communicating with the Microsoft Graph using its REST API
- Using Office UI Fabric controls for building SharePoint Framework client-side web parts
- Passing web part properties to React components 

## Video

[![Building a React groups and teams web part for aggregating detailed information for end users](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=MakgCyOq9tk "Building a React groups and teams web part for aggregating detailed information for end users")

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-groups-teams") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-groups-teams) and see what the community is saying.
If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-groups-teams&template=bug-report.yml&sample=react-groups-teams&authors=@ReactIntern&title=react-groups-teams%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-groups-teams&template=question.yml&sample=react-groups-teams&authors=@ReactIntern&title=react-groups-teams%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-groups-teams&template=question.yml&sample=react-groups-teams&authors=@ReactIntern&title=react-groups-teams%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-groups-teams" />
