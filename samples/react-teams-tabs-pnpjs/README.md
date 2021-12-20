# react-teams-tabs-pnpjs - MS Teams Channels and Tabs from Modern Team site.

## Summary

A SPFx web part using [@pnp/graph/teams](https://pnp.github.io/pnpjs/graph/docs/teams/). It shows Channels and Tabs (with link) from a Modern Team Site connected to Microsoft Teams.

## react-teams-tabs-pnpjs preview
![WebPartInAction](./assets/react-teams-tabs-pnpjs-webpart.png)

## react-teams-tabs-pnpjs in action
![WebPartInAction](./assets/react-teams-tabs-pnpjs-webpart-animated.gif)


## Compatibility

![SPFx 1.9.1](https://img.shields.io/badge/SPFx-1.9.1-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to Microsoft Graph")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-teams-tabs-pnpjs |  [Federico Porceddu](https://github.com/fredupstair) https://www.federicoporceddu.com

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 30, 2019|Initial release

## Minimal Path to Awesome

* Clone this repository
* From your command line, change your current directory to the directory containing this sample (`react-teams-tabs-pnpjs`, located under `samples`)
* in the command line run:
  * restore dependencies: `npm install`
  * build solution `gulp build --ship`
  * bundle solution: `gulp bundle --ship`
  * package solution: `gulp package-solution --ship`
  * locate solution at `.\sharepoint\solution\react-teams-tabs-pnpjs.sppkg` 
  * upload it to your tenant app catalog
  * [approve permission requests](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient#manage-permission-requests) into SharePoint Online Admin API Permission page
  * add `react-teams-tabs-pnpjs` app to your site
  * add `react-teams-tabs-pnpjs` web part to your page to see it in action

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* How to use Microsoft Graph with PnPJS
* How to use [@pnp/graph/teams](https://pnp.github.io/pnpjs/graph/docs/teams/)
* How to configure SharePoint Online Tenant and SPFx solution to allow Microsoft Graph calls.
* Microsoft Graph API for Microsoft Teams
* [Fabric UI Nav component](https://developer.microsoft.com/en-us/fabric#/controls/web/nav)


## Video

[![Microsoft Teams channel and tabs web part](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=jUesdAdHRng "Microsoft Teams channel and tabs web part")

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-teams-tabs-pnpjs") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-teams-tabs-pnpjs) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-teams-tabs-pnpjs&template=bug-report.yml&sample=react-teams-tabs-pnpjs&authors=@fredupstair&title=react-teams-tabs-pnpjs%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-teams-tabs-pnpjs&template=question.yml&sample=react-teams-tabs-pnpjs&authors=@fredupstair&title=react-teams-tabs-pnpjs%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-teams-tabs-pnpjs&template=question.yml&sample=react-teams-tabs-pnpjs&authors=@fredupstair&title=react-teams-tabs-pnpjs%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/react-teams-tabs-pnpjs" />
