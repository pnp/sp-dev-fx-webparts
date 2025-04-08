# react-personal-dashboard

## Summary

The Personal Dashboard app, built using the SharePoint framework, offers a versatile solution for organizations across various platforms such as Teams, Outlook, and Office. This app enables seamless integration with both public and enterprise APIs, allowing users to effortlessly consume and leverage their desired APIs within their personalized workspace.

With the Personal Dashboard app, users have the flexibility to handpick and configure org-wide widgets that align with their specific needs and preferences. They can easily select and arrange these widgets in their personal dashboard, ensuring a customized and tailored experience.

In action this looks like:

Dashboard:

![Dashboard view](./assets/Dashboard.png)

Selection:

![Setting up user's personal dashboard](./assets/selection.gif)

Configuration:

![Configuring a widget with MS Graph API](./assets/Configuration.gif)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.20.0](https://img.shields.io/badge/version-1.20-green.svg)
![Node.js v18 | v16 ](https://img.shields.io/badge/Node.js-v18%20%7C%20v14-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-gre)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Contributors

* [Saurabh Tripathi](https://github.com/saurabh7019)

## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|April 8, 2025|Initial release|

## Prerequisites

Widgets list in tenant app catalog site, with the Title "Dashboard Widgets" and the below columns:

Column Internal Name|Type|Required| comments
--------------------|----|--------|----------
SC_WidgetTitle | Text| Yes
SC_IconName | Text | No
SC_DisplayTemplate | Note | No
SC_ErrorTemplate | Note | No
SC_ResourceEndpoint | Text | No
SC_AADClientId | Text | No
SC_HelpURL | Text | No
SC_ViewDetails | Text | No

> Deploy the list using script [create-dashboard-list.ps1](./scripts/create-dashboard-list.ps1)

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add and Deploy Package to AppCatalog
- Go to API Management - from SharePoint Admin Center new experience, and Approve the Permission Require to Use Graph API SCOPES
- Deploy Widget Dashboard list using script [create-dashboard-list.ps](./scripts/create-dashboard-list.ps1)

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This app illustrates the following concepts on top of the SharePoint Framework:

- Enables organizations to consume APIs (public and enterprise) easily
- Allows configuration of org-wide widgets
- Users can select and arrange apps in their personal dashboard
- Utilizes handlebars templates for visually appealing UI without complex deployment
- Easy customization of templates to adapt to different data formats

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-personal-dashboard%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-personal-dashboard) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-personal-dashboard&template=bug-report.yml&sample=react-personal-dashboard&authors=@saurabh7019&title=react-personal-dashboard%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-personal-dashboard&template=question.yml&sample=react-personal-dashboard&authors=@saurabh7019&title=react-personal-dashboard%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-personal-dashboard&template=suggestion.yml&sample=react-personal-dashboard&authors=@saurabh7019&title=react-personal-dashboard%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-personal-dashboard" />
