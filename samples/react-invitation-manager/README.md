---
page_type: sample
products:
- office-sp
- ms-graph
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  - Microsoft Graph
  services:
  - SharePoint
  platforms:
  - react
  createdDate: 8/1/2017 12:00:00 AM
---
# Azure Active Directory invitation manager Graph API samples

## Summary

Sample SharePoint Framework web parts built using React illustrating the possibility to use Graph API to invite external users into the Azure Active Directory.

### Invitation manager

Sample SharePoint Framework client-side web part built using React showing how to invite the external user using the Microsoft Graph.

NB. I'm waiting the GA of HttpGraphClient(a bit limited in terms of permission) to use it in this scenario.
Look at this to go deep:
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part)

![The invitation manager web part displayed in SharePoint workbench](./assets/SPFx-Invitation-Manager.gif)


## Compatibility

![SPFx 1.3](https://img.shields.io/badge/SPFx-1.3.0-green.svg) 
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-invitation-manager|[Giuliano De Luca](https://github.com/giuleon) ([@giuleon](https://twitter.com/giuleon) , [www.delucagiuliano.com](http://www.delucagiuliano.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 14, 2017|Initial release
1.0.1|October 09, 2017|Updated to version 1.3.0

## Prerequisites

- Office 365 subscription with SharePoint Online and Exchange

## Minimal Path to Awesome

- clone this repo
- in the Azure Active Directory corresponding to your Office 365 tenant register a new Web Application:
  - as the **Sign-on URL** enter the URL of the hosted version of SharePoint workbench, eg. *https://contoso.sharepoint.com/_layouts/15/workbench.aspx*
  - enable OAuth implicit flow
  - grant the application the **Microsoft Graph/Read and write directory data** permission
  - copy the application's ID
- in the **src/webparts/invitationManager/AdalConfig.ts** file in the **clientId** property enter the application ID registered in Azure
- in the command line execute
  - `npm i`
  - `gulp serve --nobrowser`
- navigate to the hosted version of the SharePoint workbench
- add the **Invitation manager** web part

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

Sample web part in this solution illustrates the following concepts on top of the SharePoint Framework:

- using React for building SharePoint Framework client-side web parts
- using Office UI Fabric React styles for building user experience consistent with SharePoint and Office
- on-demand authentication with the Azure Active Directory using the ADAL JS library
- communicating with the Microsoft Graph using its REST API
- using the ADAL JS library with SharePoint Framework web parts built using React

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-invitation-manager%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-invitation-manager) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-invitation-manager&template=bug-report.yml&sample=react-invitation-manager&authors=@giuleon&title=react-invitation-manager%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-invitation-manager&template=question.yml&sample=react-invitation-manager&authors=@giuleon&title=react-invitation-manager%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-invitation-manager&template=suggestion.yml&sample=react-invitation-manager&authors=@giuleon&title=react-invitation-manager%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-invitation-manager)
