# Consuming SPFx Service Scopes using React Hooks

## Summary

This web part is designed to help developers understand how to use the Context API and useContext() React Hook to share global data between a hierarchy of nested React components. In this example, a Service Scope is shared globally that components can consume to call the Microsoft Graph, it also uses Functional Components replacing the more commonly seen Class Component approach.

![web part](webpart.png)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to the context API")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-functional-servicescope-hooks | [Garry Trinder](https://github.com/garrytrinder)

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 25, 2020|Initial release

## Minimal Path to Awesome

* Clone this repository
* Move to /samples/react-functional-servicescope-hooks folder
* At the command line run:
  * `npm install`
  * `gulp bundle --ship && gulp package-solution --ship`
* Upload `react-functional-servicescope-hooks.sppkg` to App Catalog site collection from `sharepoint/solution` folder
* Deploy package
* Go to SharePoint API Management screen in SharePoint Admin Center
* Approve `User.ReadBasic.All` permission for Microsoft Graph
* At the command line run:
  * `gulp serve`
* Navigate to remote workbench `https://tenant.sharepoint.com/_layouts/15/workbench.aspx`
* Add `HelloWorld` web part to the workbench

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample demonstrates how 
 
 * Functional Components can be used to replace Class Components, simplifying the codebase
 * `useEffect()` React Hooks can replace `componentDidMount()` lifecycle method 
 * `useState()` React Hook can replace the use of `this.setState()` to update local component state

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* React Hooks
* React Context API
* Functional Components


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-functional-servicescope") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-functional-servicescope) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-functional-servicescope&template=bug-report.yml&sample=react-functional-servicescope&authors=@garrytrinder&title=react-functional-servicescope%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-functional-servicescope&template=question.yml&sample=react-functional-servicescope&authors=@garrytrinder&title=react-functional-servicescope%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-functional-servicescope&template=question.yml&sample=react-functional-servicescope&authors=@garrytrinder&title=react-functional-servicescope%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-functional-servicescope-hooks" />
