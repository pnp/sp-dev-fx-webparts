---
page_type: sample
products:
- office-sp
- office-365
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
  scenarios:
  - Embed
---
# DEPRECATED: React & Office Graph Web Part samples

> ## DEPRECATED
> This sample makes use of deprecated or otherwise outdated packages and will no longer work. See issue [#358](https://github.com/pnp/sp-dev-fx-webparts/issues/358) for more information.

## Summary

Sample SharePoint Framework Client-Side Web Parts built using React showing interacting with the Office Graph.

### Trending in this site

Sample SharePoint Framework Client-Side Web Part built using React showing documents trending in the current site.

![Trending in this site Web Part in the SharePoint Workbench](./assets/trendinginthissite-preview.png)

### Working with

Sample SharePoint Framework Client-Side Web Part built using React showing people with whom the current user has recently been working with.

![Working with Web Part in the SharePoint Workbench](./assets/working-with-preview.png)

### My recent documents

Sample SharePoint Framework Client-Side Web Part built using React showing documents recently viewed or modified by the current user.

![Working with Web Part in the SharePoint Workbench](./assets/my-recent-documents-preview.png)

### Trending in the sites I follow

Sample SharePoint Framework Client-Side Web Part built using React showing documents trending in the sites followed by the current user.

![Working with Web Part in the SharePoint Workbench](./assets/trending-in-sites-i-follow-preview.png)


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
react-officegraph| [Waldek Mastykarz](https://github.com/waldekmastykarz) (MVP, Rencore, @waldekm), Gautam Sheth(SharePoint Consultant,Rapid Circle,@gautamdsheth)

## Version history

Version|Date|Comments
-------|----|--------
2.0  |May 31, 2017| GA release
1.3.0|September 20, 2016|Added the Trending in the sites I follow sample
1.2.0|September 20, 2016|Added the My recent documents sample
1.1.0|September 19, 2016|Added the Working with sample
1.0.0|September 9, 2016|Initial release

## Prerequisites

- SharePoint Online tenant with Office Graph content
- Site Collection created under the **/sites/** Managed Path

## Minimal Path to Awesome

- clone this repo
- `$ npm i`
- `$ gulp serve --nobrowser`
- create a copy of the **./temp/workbench.html** file and change its extension to **.aspx**
- in the contents of the **workbench.aspx** file change the URL of the **webAbsoluteUrl** property to the URL of your site, eg. `https://contoso.sharepoint.com/sites/my-team`
- upload the **workbench.aspx** file to the Document Library in your site
- navigate to the workbench page uploaded to your SharePoint site, i.e. _https://contoso.sharepoint.com/sites/my-team/documents/workbench.aspx_

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

Sample Web Parts in this solution illustrate the following concepts on top of the SharePoint Framework:

- using React for building SharePoint Framework Client-Side Web Parts
- using Office UI Fabric React components for building user experience consistent with SharePoint and Office
- communicating with SharePoint using its REST API
- communicating with the Office Graph via the SharePoint Search REST API
- passing Web Part properties to React components
- using ES6 Promises with vanilla-JavaScript web requests

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-officegraph%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-officegraph) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-officegraph&template=bug-report.yml&sample=react-officegraph&authors=@waldekmastykarz&title=react-officegraph%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-officegraph&template=question.yml&sample=react-officegraph&authors=@waldekmastykarz&title=react-officegraph%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-officegraph&template=suggestion.yml&sample=react-officegraph&authors=@waldekmastykarz&title=react-officegraph%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-officegraph)
