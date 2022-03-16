# Company Stories Web part

## Summary

This web part allows you to add images to a SharePoint List, and renders them with a UX very similar to Instagram Stories (or Twitter Reels, or [Place your Social network here]). It is a way to engage employees, showing relevant content in a well-known visual appearance.

![react-company-stories](./assets/react-company-stories.gif)


## Compatibility

![SPFx 1.14](https://img.shields.io/badge/SPFx-1.14-green.svg) 
![Node.js v14](https://img.shields.io/badge/Node.js-v14-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Before deploying your SharePoint Framework package to your tenant, you will need to deploy the @microsoft/mgt-spfx SharePoint Framework package to your tenant. You can download the package corresponding to the version of @microsoft/mgt-spfx that you used in your project, from the [Releases](https://github.com/microsoftgraph/microsoft-graph-toolkit/releases) section on GitHub.
See here for more information about using Microsoft Graph Toolkit components in SPFx: https://docs.microsoft.com/en-gb/graph/toolkit/get-started/mgt-spfx
- A SharePoint list called "Stories" with the following fields:
  - Image: image field type
  - Content: multi-line field type
  - Author: Person field type
![stories-list](./assets/stories-list.png)
- Permission _User.ReadBasic.All_ to the Graph API

## Solution

Solution|Author(s)
--------|---------
react-company-stories | Luis Mañez (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 31, 2021|Initial release
2.0|March 16, 2022|Upgraded to SPFx v1.14. Issue 2442 fixed. Using latest MGT version



## Minimal Path to Awesome

- Before deploying your SharePoint Framework package to your tenant, you will need to deploy the @microsoft/mgt-spfx SharePoint Framework package to your tenant. You can download the package corresponding to the version of @microsoft/mgt-spfx that you used in your project, from the [Releases](https://github.com/microsoftgraph/microsoft-graph-toolkit/releases) section on GitHub.
See here for more information about using Microsoft Graph Toolkit components in SPFx: https://docs.microsoft.com/en-gb/graph/toolkit/get-started/mgt-spfx
- Configure SharePoint permissions to Graph API (see Prerequisites). Suggest you to use the [Microsoft 365 CLI](https://blog.mastykarz.nl/grant-api-permissions-office-365-cli/)
- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - `npm install`
  - `gulp serve --nobrowser`
- Add the web part to the SharePoint Workbench (same Site where the List was created)

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This web part illustrates the following concepts:

- Using the Microsoft Graph Toolkit react components: [Person component](https://docs.microsoft.com/en-us/graph/toolkit/components/person)
- Using FluentUI components
- Using [react-insta-stories](https://www.npmjs.com/package/react-insta-stories) package
- Using SP REST API

## References

About SPFx:

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-company-stories" />
