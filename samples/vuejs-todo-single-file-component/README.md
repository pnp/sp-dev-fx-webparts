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
# Todo Client Web Part built with Vue.js and Vue's single-file components

## Summary

Sample Todo web part demonstrating how you can utilize [Vue](https://vuejs.org/v2) (a progressive framework for building user interfaces) with SharePoint Framework using handy [single-file components](https://vuejs.org/v2/guide/single-file-components.html) approach. 

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/drop-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
vuejs-todo-single-file-component|Sergei Sergeev ([@sergeev_srg](https://twitter.com/sergeev_srg)), Dimcho Tsanov ([Singens](http://singens.com))

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

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repo
- In the command line run:
  - `npm i`
  - `gulp serve`

## Features

Demonstrates\uses below features:

 - integration between third party frontend framework Vue.js and SharePoint Framework
 - build pipeline customization
 - custom build pipeline tasks
 - modern component-based architecture
 - separation of concerns between markup, styling and code
 - single-file components architecture for Vue.js
 - custom webpack loaders

 <img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/vuejs-todo-single-file-component" />
