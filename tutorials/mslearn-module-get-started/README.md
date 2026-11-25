# Configure a SharePoint Framework development environment

## Summary

A SharePoint Framework (SPFx) client-side web part created with the Yeoman generator for the SharePoint Framework, and tested on a modern SharePoint Online page from your local web server. This tutorial contains the completed code for the exercises in the Microsoft Learn module [Configure a SharePoint Framework development environment](https://learn.microsoft.com/training/modules/sharepoint-spfx-get-started/).

The root of this folder contains the completed solution at the end of the last exercise in the module, Interact with SPFx client-side web parts in modern sites.

![HelloWorld web part on a SharePoint page with its property pane open](assets/preview.png)

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

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
* [Microsoft Learn: Configure a SharePoint Framework development environment](https://learn.microsoft.com/training/modules/sharepoint-spfx-get-started/)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors

* [Andrew Connell](https://github.com/andrewconnell)

## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|November 25, 2026|Initial release|

## Prerequisites

* A SharePoint Online tenant with an app catalog site
* A modern SharePoint site, such as a team site created from the **Standard team** template, with a page to test the web part on

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-get-started) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-get-started` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`. If `config/serve.json` contains `<site-name>` or a site path, change it to a site you can test on.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.

## Features

This tutorial illustrates the following concepts on top of the SharePoint Framework:

* Creating an SPFx web part project with the Yeoman generator for the SharePoint Framework
* Testing a web part on a modern SharePoint page with `heft start`
* Changing web part properties in the property pane

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this tutorial](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20mslearn-module-get-started%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this tutorial](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=mslearn-module-get-started) and see what the community is saying.

If you encounter any issues using this tutorial, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20mslearn-module-get-started&template=bug-report.yml&sample=mslearn-module-get-started&authors=@andrewconnell&title=mslearn-module-get-started%20-%20).

For questions regarding this tutorial, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20mslearn-module-get-started&template=question.yml&sample=mslearn-module-get-started&authors=@andrewconnell&title=mslearn-module-get-started%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20mslearn-module-get-started&template=suggestion.yml&sample=mslearn-module-get-started&authors=@andrewconnell&title=mslearn-module-get-started%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/tutorials/mslearn-module-get-started" />
