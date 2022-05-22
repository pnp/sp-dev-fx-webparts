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
  platforms:
  - react
  createdDate: 3/1/2017 12:00:00 AM
---
# Deployment of SharePoint assets as part of SPFx package

## Summary
Simplistic solution demonstrating how to provision SharePoint assets using Feature Framework elements when SharePoint Framework solution is being deployed to a SharePoint site. 

![screenshot](assets/screenshot.png)

Demonstrated assets getting deployed to SharePoint site are following

- Fields
- Content Type
- List with custom schema

When you install SPFx so site, web scoped feature is activated and associated element.xml files are being processed. Technically you could also provision SharePoint assets using JavaScript, but it is limited to context of the current user using that component. If the user doesn't have sufficient permissions to create or modify SharePoint items, the JavaScript code will not provision those items. 

More details on the capability is available from the following article

* [Provision SharePoint assets with your solution package](https://docs.microsoft.com/sharepoint/dev/spfx/toolchain/provision-sharepoint-assets)

## Compatibility

![SPFx 1.0.0](https://img.shields.io/badge/SPFx-1.0.0-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://blogs.office.com/2017/02/23/sharepoint-framework-reaches-general-availability-build-and-deploy-engaging-web-parts-today/)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
None.

## Solution

Solution|Author(s)
--------|---------
react-feature-framework | [Vesa Juvonen](https://github.com/VesaJuvonen)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 27, 2017|Initial sample


## Minimal Path to Awesome

- Clone this repository
- Move to /samples/react-feature-framework folder
- in the command line run:
  - `npm install`
  - `gulp bundle`
  - `gulp package-solution`
- Install `react-feature-framework.sppkg` from `/sharepoint/solution` to app catalog in your tenant
- Install solution to SharePoint site

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

Following items are being provisioned

- SPFxAmount and SPFxCostCenter fields under 'SPFx Columns' group - visible in the Site Column Gallery
- Cost Center content type using 'SPFx Content Types' group using custom fields - visible in Site Content Types Gallery
- List called 'SPFx List' using custom schema.xml file using custom content type - visible in site contents page

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-feature-framework%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-feature-framework) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-feature-framework&template=bug-report.yml&sample=react-feature-framework&authors=@VesaJuvonen&title=react-feature-framework%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-feature-framework&template=question.yml&sample=react-feature-framework&authors=@VesaJuvonen&title=react-feature-framework%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-feature-framework&template=suggestion.yml&sample=react-feature-framework&authors=@VesaJuvonen&title=react-feature-framework%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-feature-framework" />
