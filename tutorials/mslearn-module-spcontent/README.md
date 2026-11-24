# Work with SharePoint Content using the SharePoint Framework

## Summary

SharePoint Framework (SPFx) client-side web parts that read and write SharePoint list items and upload files with the SharePoint REST API. This tutorial contains the completed code for the exercises in the Microsoft Learn module [Work with SharePoint Content using the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-spcontent/).

Each exercise in the module builds its own project. Each project folder contains the completed solution for its exercise. When an exercise builds on an earlier one, the `checkpoints` folder in the project contains the code as it was at the end of that earlier exercise.

| Folder | Microsoft Learn exercise | What it shows |
|---|---|---|
| [SPFxHttpClientDemo](SPFxHttpClientDemo/README.md) | Write operations using the SharePoint Framework APIs and SharePoint REST API | Reads, creates, updates, and deletes items in a SharePoint list. |
| [FileUpload](FileUpload/README.md) | Upload files to document libraries | Uploads a file from your computer to the site's **Documents** library. |

![SPFxHttpClientDemo web part with buttons to get, add, update, and delete list items](assets/preview-spfxhttpclientdemo.png)

![FileUpload web part with Choose File and Upload buttons](assets/preview-fileupload.png)

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
* [Microsoft Learn: Work with SharePoint Content using the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-spcontent/)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors

* [Andrew Connell](https://github.com/andrewconnell)
* [Andrew Connell](https://github.com/andrewconnell-msft3)

## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|November 24, 2026|Initial release|

## Prerequisites

* A modern SharePoint Online site with a page named **SharePoint Content Test**

For the **SPFxHttpClientDemo** project:

* A list named **Countries** in the site, with an item titled **United States**

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-spcontent) and unzip it.
* From your command line, change to the folder of the project you want to run, under `tutorials/mslearn-module-spcontent`.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* In `config/serve.json`, replace the page URL (`initialPage`, or `pageUrl` for extensions) with a page in a site you can test on. Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.

## Features

This tutorial illustrates the following concepts on top of the SharePoint Framework:

* Reading list items with `SPHttpClient` and the SharePoint REST API
* Creating, updating, and deleting list items
* Uploading a file to a document library

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this tutorial](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20mslearn-module-spcontent%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this tutorial](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=mslearn-module-spcontent) and see what the community is saying.

If you encounter any issues using this tutorial, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20mslearn-module-spcontent&template=bug-report.yml&sample=mslearn-module-spcontent&authors=@andrewconnell%20@andrewconnell-msft3&title=mslearn-module-spcontent%20-%20).

For questions regarding this tutorial, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20mslearn-module-spcontent&template=question.yml&sample=mslearn-module-spcontent&authors=@andrewconnell%20@andrewconnell-msft3&title=mslearn-module-spcontent%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20mslearn-module-spcontent&template=suggestion.yml&sample=mslearn-module-spcontent&authors=@andrewconnell%20@andrewconnell-msft3&title=mslearn-module-spcontent%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/tutorials/mslearn-module-spcontent" />
