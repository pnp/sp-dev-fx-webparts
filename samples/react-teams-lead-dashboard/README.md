# Lead Assist Dashboard

## Summary

This sample shows how to integrate SharePoint Framework, PnP React Controls, and Microsoft Graph Toolkit in a solution available for SharePoint web parts or Microsoft Teams personal application.

![Lead Assist Dashboard](./assets/LeadAssistDashboard_overview.png)


## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.16.0](https://img.shields.io/badge/SPFx-1.16.0.0-green.svg)
![Node.js >=16.13.0 <17.0.0](https://img.shields.io/badge/Node.js-%3E=16.13.0%20%3C17.0.0-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft Teams](https://www.microsoft.com/microsoft-teams)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/m365devprogram)

## Contributors

* [PnP](https://pnp.github.io/)

## Version history

Version|Date|Comments
-------|----|--------
1.0.2|November 22, 2022|Upgraded to SPFx v1.16.0
1.0.1|November 15, 2022|Upgraded to SPFx v1.16.0-rc.0
1.0.0|October 5, 2021|Initial release

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - `npm install`
  - `npm run package`
- Upload the generated SPPKG file into the SharePoint App Catalog of your tenant
- Select the SPPKG in the App Catalog and click on "Sync to Teams" button
- Verify that you have the [latest version of the Microsoft Graph Toolkit SPFx package](https://github.com/microsoftgraph/microsoft-graph-toolkit/releases) installed in your app catalog. If you don't:
  - Download the [mgt-spfx-v2.sppkg file](https://github.com/microsoftgraph/microsoft-graph-toolkit/releases)
  - Upload it to the SharePoint App Catalog and deploy it to all sites
- Add the web part to a SharePoint page
- In the first run the web part will ask for the target SharePoint site URL

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

If needed:
- Using the control panel of the web part
  - Create the SharePoint demo lists
  - Populate the SharePoint demo lists
  - Generate the Microsoft Graph demo data

## Features

This solution provides an example of how to implement a SharePoint Framework web part, that is also usable as a Microsoft Teams personal app, using the [SharePoint Framework React Controls](https://github.com/pnp/sp-dev-fx-controls-react/) and the [Microsoft Graph Toolkit](https://github.com/microsoftgraph/microsoft-graph-toolkit).

This web part illustrates the following concepts:

- How to use the [PnP React Controls](https://github.com/pnp/sp-dev-fx-controls-react/) such as the chart control
![Activity chart detail](./assets/ActivityChart.png)

- How to integrate the [Microsoft Graph Toolkit](https://github.com/microsoftgraph/microsoft-graph-toolkit) in a SharePoint Framework web part such as the Agenda control

  ![MGT Agenda control in action](./assets/AgendaControl.png)

  and the Todo control

  ![MGT Todo control in action](./assets/TodoControl.png)

- How to execute operations on SharePoint using [PnP JS](https://github.com/pnp/pnpjs/)

## References

- [Getting started with SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft Teams](https://learn.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://learn.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [The easiest way to store user settings of your Microsoft 365 app](https://blog.mastykarz.nl/easiest-store-user-settings-microsoft-365-app/ )
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

> "Sharing is Caring"
