---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: tools
  technologies:
  - SharePoint Framework
  createdDate: 1/1/2016 12:00:00 AM
---
# Todo Client with Vue.js and Vue's single-file components

## Summary

Sample Todo web part demonstrating how you can utilize [Vue](https://vuejs.org/v2) (a progressive framework for building user interfaces) with SharePoint Framework using handy [single-file components](https://vuejs.org/v2/guide/single-file-components.html) approach. 


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js LTS 10 | LTS 8](https://img.shields.io/badge/Node.js-LTS%2010%20%7C%20LTS%208-green.svg) 
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
vuejs-todo-single-file-component|[Sergei Sergeev](https://github.com/s-KaiNet) ([@sergeev_srg](https://twitter.com/sergeev_srg)), [Dimcho Tsanov](https://github.com/DimchoTsanov) ([Singens](http://singens.com))

## Version history

Version|Date|Comments
-------|----|--------
0.0.1|January 27, 2017|Initial version.
0.0.2|March 30, 2017|Updated to GA
0.0.3|June 14, 2017|Fix webpack 2 issues
0.0.4|October 7, 2017|Updated packages to latest versions, misc fixing
0.0.5|November 15, 2017|Added data provider that demonstrates the CRUD operations
0.0.6|December 11, 2018|Updated sample to SPFx 1.4 and Vue 2.5.x
0.0.7|April 28, 2020|Updated sample to SPFx 1.10 and Vue 2.6.x, fixed issues with batch loader

## Minimal Path to Awesome

- Clone this repo
- In the command line run:
  - `npm i`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

Demonstrates\uses below features:

 - integration between third party frontend framework Vue.js and SharePoint Framework
 - build pipeline customization
 - custom build pipeline tasks
 - modern component-based architecture
 - separation of concerns between markup, styling and code
 - single-file components architecture for Vue.js
 - custom webpack loaders


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20vuejs-todo-single-file-component") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=vuejs-todo-single-file-component) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20vuejs-todo-single-file-component&template=bug-report.yml&sample=vuejs-todo-single-file-component&authors=@DimchoTsanov%20@s-KaiNet&title=vuejs-todo-single-file-component%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20vuejs-todo-single-file-component&template=question.yml&sample=vuejs-todo-single-file-component&authors=@DimchoTsanov%20@s-KaiNet&title=vuejs-todo-single-file-component%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20vuejs-todo-single-file-component&template=question.yml&sample=vuejs-todo-single-file-component&authors=@DimchoTsanov%20@s-KaiNet&title=vuejs-todo-single-file-component%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


 <img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/vuejs-todo-single-file-component" />
