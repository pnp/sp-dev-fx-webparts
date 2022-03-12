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
  - AngularJS
  createdDate: 8/14/2017 12:00:00 AM
---
#  Angular2 Web Part Prototype

## Note to developers

> This web part sample is currently in prototype phase and subject to change.
This sample is not currently supported for use in production environments as unexpected behavior may occur.
It is provided as guidance for building Angular2 web parts in the SharePoint Framework environment.
This sample is a work in progress and it will be updated as advances in stability are made.

## Summary

Sample To Do Web Part built with Angular2. This sample illustrates how you can use Angular2 with the SharePoint Framework.

![Sample of the search web part](./assets/preview.png)


## Compatibility

![SPFx 0.9.0](https://img.shields.io/badge/SPFx-0.9.0-orange.svg)
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

## Prerequisites

> Some familiarity of Angular2 architecture.

## Solution

Solution|Author(s)
--------|---------
angular2-prototype | Manish Garg
angular2-prototype | [Daniel Gaeta](https://github.com/dgaeta)

## Version history

Version|Date|Comments
-------|----|--------
0.3|January 20, 2017| Updates to support RC0
0.2|October 7, 2016|Resolved workarounds to access NgModule and NgZone
0.1|August 14, 2016|Initial release

## Minimal Path to Awesome

- Clone this repository
- In the command line run:
  - `npm i`
  - `npm i -g gulp`
  - `gulp serve`
- Open the workbench
- Test out the web part

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This is a sample client-side web part built on the SharePoint Framework using Angular2 for building the UI component of the web part.
The SharePoint Framework is designed to allow developers to build web parts using the web framework of their choice.
In this prototype we make use of the Angular2 framework. The BaseAngular2WebPart class tries to abstract some of the Angular2 integration.
This way the developer can focus on their web part code and not worry about Angular2 integration.

### Protoype anomalies

Please note, this is an early prototype and we are still trying to learn the best practices of the Angular2 framework.
Angular2 uses TypeScript decorators to annotate classes as Components and Modules.
And also recommends that there be only one NgModule per application.
In this prototype we try to use the decorators dynamically in code.
And each web part instantiates a new NgModule at run time.
Though this is not a best practice, it helps build web parts successfully.
We are trying to find better solutions to this problem. Specially, how to avoid creating a separate NgModule for each web part.

### Adding functionality

To add functionality to this web part prototype the main file to edit is `TodoWebPart.ts`, here there are comments to help you alter the prototype.

### Web part concepts

The web part displays a title, button to add to dos and a button to print the to do items to the console.
This web part illustrates the following concepts on top of the SharePoint Framework:

- Changing a property (the title) of a web part using the PropertyPane
- Manipulating properties in the Angular2 component class and saving to web part’s property bag


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A"sample%3A%20angular2-prototype=@dgaeta" ) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=angular2-prototype=@dgaeta) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20angular2-prototype=@dgaeta&template=bug-report.yml&sample=angular2-prototype=@dgaeta&title=angular-todo%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20angular2-prototype=@dgaeta&template=question.yml&sample=angular2-prototype=@dgaeta&title=angular-todo%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20angular2-prototype=@dgaeta&template=question.yml&sample=angular2-prototype=@dgaeta&title=angular-todo%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular2-prototype" />
