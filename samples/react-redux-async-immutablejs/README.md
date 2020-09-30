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
# SharePoint Framework webpart sample using React, Redux and ImmutableJS

## Summary
SharePoint Framework webpart which uses [Redux](http://redux.js.org/) to maintain a single state for the entire application and [ImmutableJS](https://facebook.github.io/immutable-js/) to create performant state trees.

Redux AJAX actions are used together with the SharePoint REST API to display lists in your site. You can also add a new list to the site from this webpart.

More details in my post here: [Using Redux Async Actions and ImmutableJS in SharePoint Framework](http://www.vrdmn.com/2017/07/using-redux-async-actions-and.html)

![](https://raw.githubusercontent.com/vman/sp-dev-fx-webparts/master/samples/react-redux-async-immutablejs/assets/react-redux-immutable.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

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

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`
  - Open the SharePoint Online version of the workbench: /_layouts/15/workbench.aspx

## Why Redux and ImmutableJS
Every [Redux](http://redux.js.org/) action creates a copy of the state, changes the required properties in the copy and then returns the copy as a new state. This prevents bugs where the state is changed unknowingly. 

On the other hand, this can also be performance intensive as for changing only a single element, we have to copy the entire state tree in memory. Fortunately, [ImmutableJS](https://facebook.github.io/immutable-js/) comes to the rescue here.

Using ImmutableJS, we can create new state trees in memory without duplicating the elements which are unchanged. When you create a new state object using ImmutableJS, the new object still points to the previous memory locations of unchanged elements. Only the properties which are changed are allocated new memory locations.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-redux-async-immutablejs" />
