---
page_type: sample
products:
- office-sp
- power-bi
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - JQuery
  createdDate: 1/1/2016 12:00:00 AM
---
# Embed a PowerBI Report

## Summary

This sample SharePoint Framework client-side web part embedding a PowerBI report using PowerBI Embedded without any server-side code.

![PowerBI Embedded Client-SideWeb Part in the SharePoint Workbench](./assets/screenshot_powerbi_embedded_spfx.png)


## Compatibility

![SPFx 0.2.0](https://img.shields.io/badge/SPFx-0.2.0-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Solution

Solution|Author(s)
--------|---------
powerbi-embedded|[Roland Oldengarm](https://github.com/rolandoldengarm) (Provoke Solutions, @rolandoldengarm)

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 13, 2016|Initial release

## Prerequisites

- Created a Workspace and a  Workspace collection in Azure
- PowerBI report saved as PBIX
- PBIX uploaded to the Workspace
- Report Access Token generated

Please refer to [this blog post](http://rolandoldengarm.com/index.php/2016/09/13/part-3-how-to-embed-a-power-bi-report-in-sharepoint-with-the-sharepoint-framework/) for detailed instructions how to do this.

## Minimal Path to Awesome

- clone this repo
- `$ npm i`
- `$ gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

The _PowerBI Embedded_ Client-Side Web Part is built on the SharePoint Framework using React and uses [PowerBI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) to securely display a report.
All authentication and rendering happens client-side, there is no server-side component required.

It uses the [PowerBI Client](https://www.npmjs.com/package/powerbi-client) for rendering the PowerBI report.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-powerbi-embedded%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-powerbi-embedded) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-powerbi-embedded&template=bug-report.yml&sample=js-powerbi-embedded&authors=@rolandoldengarm&title=js-powerbi-embedded%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-powerbi-embedded&template=question.yml&sample=js-powerbi-embedded&authors=@rolandoldengarm&title=js-powerbi-embedded%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-powerbi-embedded&template=suggestion.yml&sample=js-powerbi-embedded&authors=@rolandoldengarm&title=js-powerbi-embedded%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-powerbi-embedded" />
