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
# Modern Charts

## Summary

This web part uses the Chart.js library to visualize SharePoint list data.

Built in Chart Types:
-Bar
-Horizontal Bar
-Doughnut
-Line
-Pie
-Polar
-Radar

Each chart is uniquely themed with the built-in color theme generator (color-scheme), continue generating a theme until you find one to your liking.

New charts are populated with Sample data, select a site (or define a custom path with the Other option), a list data source, label column, data column and which column indicates a unique value in your list.  See the demo below for an example.

Current Data Functions:
-Average
-Count
-Sum

## Media

![](https://raw.githubusercontent.com/jcoleman-pcprofessional/Modern-Charts/master/assets/modern-chart2.png)
![](https://raw.githubusercontent.com/jcoleman-pcprofessional/Modern-Charts/master/assets/modern-charts.png)
![](https://raw.githubusercontent.com/jcoleman-pcprofessional/Modern-Charts/master/assets/Modern-Charts.gif)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js LSTS 8 | LTS 10](https://img.shields.io/badge/Node.js-LTS%208%20%7C%20v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-modern-charts|[Jeremy Coleman](https://github.com/jcoleman-pcprofessional) (MCP, PC Professional, Inc.)
react-modern-charts|[Peter Paul Kirschner](https://github.com/petkir) ([@petkir_at](https://twitter.com/petkir_at))
react-modern-charts|[Abderahman Moujahid](https://github.com/Abderahman88)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.4|October 19, 2021| Fix values of managed metadata fields
1.0.0.3|July 30, 2020| Support for Managed Metadata Field(Single) as Label
1.0.0.2|February 09, 2020| Upgrade to SPFx 1.10.0
1.0.0.1|April 25, 2018|Update to SPFx 1.4.1
1.0.0.0|February 11, 2017|Initial release

## Prerequisites

- SharePoint Online tenant with Office Graph content-enabled

## Minimal Path to Awesome

- clone this repo
- `npm i`
- `gulp serve`
- if deploying to Office 365, update the CDN path in write-manifests.json

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

Sample Web Parts in this solution illustrate the following concepts on top of the SharePoint Framework:

- using React for building SharePoint Framework Client-Side Web Parts
- using Office UI Fabric React components for building user experience consistent with SharePoint and Office
- communicating with SharePoint using its REST API
- passing Web Part properties to React components
- building dynamic web part properties

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-modern-charts") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-modern-charts) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-modern-charts&template=bug-report.yml&sample=react-modern-charts&authors=@jcoleman-pcprofessional%20@petkir%20@Abderahman88&title=react-modern-charts%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-modern-charts&template=question.yml&sample=react-modern-charts&authors=@jcoleman-pcprofessional%20@petkir%20@Abderahman88&title=react-modern-charts%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-modern-charts&template=question.yml&sample=react-modern-charts&authors=@jcoleman-pcprofessional%20@petkir%20@Abderahman88&title=react-modern-charts%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-modern-charts)
