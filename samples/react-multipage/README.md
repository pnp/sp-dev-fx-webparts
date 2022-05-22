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
  - React
  createdDate: 1/1/2016 12:00:00 AM
---
# Multi-page Web Parts

## Summary

Sample SharePoint Framework client-side web parts built using React illustrating building multi-page web parts.

### Poll

Sample poll web part allowing users to vote and view the results.

![Poll web part built on the SharePoint Framework using React](./assets/poll-preview.gif)

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

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-multipage|[Waldek Mastykarz](https://github.com/waldekmastykarz) (MVP, Rencore, @waldekm)

## Version history

Version|Date|Comments
-------|----|--------
1.0.1|May 1 2017|Updated to SPFx GA
1.0.0|November 15, 2016|Initial release


## Prerequisites

- Site Collection created under the **/sites/** Managed Path

## Minimal Path to Awesome

### Poll web part

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

- create list for the poll
  - in SharePoint create a new list
  - in the list add new column called `NumVotes` of type **Number** (you can change the name later if you want)
  - in the list add a few items - each representing one of the vote options in your poll (for example for a poll about favorite JavaScript frameworks you would add items like _Angular_, _React_, _jQuery_, etc.)
- deploy SharePoint workbench
  - clone this repo
  - in the command line run
    - `npm i`
    - `gulp serve --nobrowser`
  - from the **./temp** directory create a copy of the **workbench.html** file and rename it to **workbench.aspx**
  - in the **workbench.aspx** file change the value of the **webAbsoluteUrl** property to the absolute URL of your SharePoint site
  - upload the **workbench.aspx** file to a document library in your site
- use the web part
  - in your web browser navigate to the **workbench.aspx** page uploaded in your SharePoint site
  - add the Poll web part to the canvas
  - in the configuration specify the **Poll title** and optionally the **Poll description**. Also specify the title of your poll list
  - confirm the changes by clicking the **Apply** button
  - select one of the vote options and click the **Vote** button to submit your vote

![Poll web part built on the SharePoint Framework using React](./assets/poll-preview.gif)

## Features

This project contains sample client-side web parts built on the SharePoint Framework using React illustrating working with multi-page web parts.

This sample illustrates the following concepts on top of the SharePoint Framework:

- using React for building SharePoint Framework client-side web parts
- using React components for building multi-page web parts
- using React spread operator for passing multiple properties to React components
- conditionally rendering React components
- managing state in a parent component
- navigating between the different pages without changing the URL
- styling React applications using Office UI Fabric
- using non-reactive web part property pane
- chaining multiple ES6 promises
- reading and updating SharePoint list items using the SharePoint Framework HttpClient
- showing charts using [Chart.js](http://www.chartjs.org) and [React wrapper for Chart.js](https://github.com/gor181/react-chartjs-2)

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-multipage%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-multipage) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-multipage&template=bug-report.yml&sample=react-multipage&authors=@waldekmastykarz&title=react-multipage%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-multipage&template=question.yml&sample=react-multipage&authors=@waldekmastykarz&title=react-multipage%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-multipage&template=suggestion.yml&sample=react-multipage&authors=@waldekmastykarz&title=react-multipage%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-multipage" />
