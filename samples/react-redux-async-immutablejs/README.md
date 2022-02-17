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
  createdDate: 8/1/2017 12:00:00 AM
---
# SharePoint Framework web part sample using React, Redux and ImmutableJS

## Summary
SharePoint Framework web part which uses [Redux](http://redux.js.org/) to maintain a single state for the entire application and [ImmutableJS](https://facebook.github.io/immutable-js/) to create performant state trees.

Redux AJAX actions are used together with the SharePoint REST API to display lists in your site. You can also add a new list to the site from this web part.

More details in my post here: [Using Redux Async Actions and ImmutableJS in SharePoint Framework](http://www.vrdmn.com/2017/07/using-redux-async-actions-and.html)

![](https://raw.githubusercontent.com/vman/sp-dev-fx-webparts/master/samples/react-redux-async-immutablejs/assets/react-redux-immutable.gif)


## Compatibility

![SPFx 1.1.0](https://img.shields.io/badge/SPFx-1.1.0-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
React-Redux-RESTAPI | Vardhaman Deshpande [@vrdmn](https://twitter.com/vrdmn)

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 11, 2017|Initial release


## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`
  - Open the SharePoint Online version of the workbench: /_layouts/15/workbench.aspx

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Why Redux and ImmutableJS
Every [Redux](http://redux.js.org/) action creates a copy of the state, changes the required properties in the copy and then returns the copy as a new state. This prevents bugs where the state is changed unknowingly. 

On the other hand, this can also be performance intensive as for changing only a single element, we have to copy the entire state tree in memory. Fortunately, [ImmutableJS](https://facebook.github.io/immutable-js/) comes to the rescue here.

Using ImmutableJS, we can create new state trees in memory without duplicating the elements which are unchanged. When you create a new state object using ImmutableJS, the new object still points to the previous memory locations of unchanged elements. Only the properties which are changed are allocated new memory locations.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-redux-async-immutablejs" />
