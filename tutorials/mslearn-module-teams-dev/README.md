# Build Microsoft Teams customization using the SharePoint Framework

## Summary

A SharePoint Framework (SPFx) client-side web part that runs both on a SharePoint page and as a tab in Microsoft Teams. This tutorial contains the completed code for the exercises in the Microsoft Learn module [Build Microsoft Teams customization using the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-teams-dev/).

The root of this folder contains the completed solution at the end of the last exercise in the module, Update configuration settings.

The `checkpoints` folder contains the code as it was at the end of each earlier exercise:

* [Deploy SharePoint Framework solutions to Microsoft Teams](checkpoints/3-exercise-deploy/README.md)
* [Add conditional logic for SharePoint or Microsoft Teams](checkpoints/5-exercise-conditional-logic/README.md)

![SPFx Teams Together web part running as a tab in Microsoft Teams](assets/preview.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to Toolchain this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This tutorial is optimally compatible with the following environment configuration:

![SPFx 1.24.1](https://img.shields.io/badge/SPFx-1.24.1-green.svg)
![Node.js v22 | v24 | v26](https://img.shields.io/badge/Node.js-v22%20%7C%20v24%20%7C%20v26-green.svg)
![Toolchain: Heft](https://img.shields.io/badge/Toolchain-Heft-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
* [Microsoft Learn: Build Microsoft Teams customization using the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-teams-dev/)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors

* [Andrew Connell](https://github.com/andrewconnell)

## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|November 25, 2026|Initial release|

## Prerequisites

* A SharePoint Online tenant with Microsoft Teams, and permission to upload custom apps
* A team to add the tab to

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-teams-dev) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-teams-dev` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`. If `config/serve.json` contains `<site-name>` or a site path, change it to a site you can test on.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
* To run the web part in Microsoft Teams, upload the package from `sharepoint/solution` to the tenant app catalog, select **Make this solution available to all sites in the organization**, and select **Deploy**.
* In Microsoft Teams, upload the app package `teams/TeamsSPFxApp.zip` with **Apps** > **Manage your apps** > **Upload an app**, then add the app as a tab in a team channel.

## Features

This tutorial illustrates the following concepts on top of the SharePoint Framework:

* Creating a Microsoft Teams app manifest and package in the `teams` folder for an SPFx web part
* Adding the web part to a team as a tab
* Detecting whether the web part runs in SharePoint or Microsoft Teams with `this.context.sdks.microsoftTeams`
* Adding a web part property and controlling tab configuration with `canUpdateConfiguration`

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this tutorial](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20mslearn-module-teams-dev%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this tutorial](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=mslearn-module-teams-dev) and see what the community is saying.

If you encounter any issues using this tutorial, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20mslearn-module-teams-dev&template=bug-report.yml&sample=mslearn-module-teams-dev&authors=@andrewconnell&title=mslearn-module-teams-dev%20-%20).

For questions regarding this tutorial, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20mslearn-module-teams-dev&template=question.yml&sample=mslearn-module-teams-dev&authors=@andrewconnell&title=mslearn-module-teams-dev%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20mslearn-module-teams-dev&template=suggestion.yml&sample=mslearn-module-teams-dev&authors=@andrewconnell&title=mslearn-module-teams-dev%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/tutorials/mslearn-module-teams-dev" />
