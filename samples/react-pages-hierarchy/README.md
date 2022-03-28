---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  - React
  createdDate: 04/30/2020 12:00:00 AM
---

# Pages Hierarchy

## Summary

This web part allows users to create a faux page hierarchy in their pages library and use it for page-to-page navigation.  It will ask you to create a page parent property on first use which is then used by the web part to either show a breadcrumb of the current pages ancestors or buttons for the pages children.

![Page Navigator](./assets/PagesHierarchy.gif)


## Compatibility

![SPFx 1.14](https://img.shields.io/badge/SPFx-1.14.0-green.svg) 
![Node.js v14](https://img.shields.io/badge/Node.js-v14-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to the page structure")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 Developer Tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

* Office 365 subscription with SharePoint Online
* SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) set up

## Solution

Solution|Author(s)
--------|---------
react-pages-hierarchy|[Bo George](https://github.com/bogeorge) ([@bo_george](https://twitter.com/bo_george))

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 30, 2020|Initial release
1.2|March 24, 2022|Updated to SPFX v1.14 and PnP packages to v3


## Minimal path to awesome

* Clone this repository* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-pages-hierarchy) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-pages-hierarchy`, located under `samples`)* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This web part isn't anything fancy but it's useful for some scenarios.

* Parent Page Property Creation - if the web part is added to a page and the Parent Page property does not exist the user will be asked to enable (create) it.
* Security - if the user editing the page/web part doesn't have 'Manage' permissions on the Pages library they will not get the enable button, instead a message telling them to get a site owner to do the enabling.
* Two page relationship views depending on the direction you want to show
  * Ancestors shows a breadcrumb view (including the current page) up to parent pages until the parent page property is not set.
  * Children shows a button view for all pages that have selected the current page as their parent.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-pages-hierarchy") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-pages-hierarchy) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-pages-hierarchy&template=bug-report.yml&sample=react-pages-hierarchy&authors=@bogeorge&title=react-pages-hierarchy%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-pages-hierarchy&template=question.yml&sample=react-pages-hierarchy&authors=@bogeorge&title=react-pages-hierarchy%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-pages-hierarchy&template=question.yml&sample=react-pages-hierarchy&authors=@bogeorge&title=react-pages-hierarchy%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-pages-hierarchy" />
