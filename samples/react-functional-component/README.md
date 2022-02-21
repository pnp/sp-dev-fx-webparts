# React Functional Component web part

## Summary

This web part is intended to be easier to understand for new developers building their first SPFx web part. It is a refactoring of the HelloWorld web part that is created by the **@microsoft/generator-sharepoint** Yeoman generator, and introduces React Functional Components.

![Screenshot](Screenshot.png "Screenshot - nothing to see here, move along")


## Compatibility

![SPFx 1.8.2](https://img.shields.io/badge/SPFx-1.8.2-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

This sample was built with version 1.82 of the SharePoint Framework. It has been modified to use version 16.8 of the React framework (by default the version used is React 16.7). React 16.8 supports React Hooks although this is not needed in the sample code because HelloWorld.tsx is a pure (or stateless) functional component.

## Solution

Solution|Author(s)
--------|---------
react-functional-component | Bill Ayers

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 5, 2019|Initial release



## Minimal Path to Awesome

* Clone this repository
* Move to /samples/react-functional-component folder
* At the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

The purpose of this web part is to make it easier to understand for new developers building their first SPFx web part, when teaching the SharePoint Framework. The web part is a refactoring of the HelloWorld web part that is created by the **@microsoft/generator-sharepoint** Yeoman generator. The resulting rendered web part should look exactly the same, but the complexity of the code has been significantly reduced, and should be much easier to understand for a newcomer to the framework. 

It also introduces React Functional Components which offers a simpler way of building React Components using functions instead of classes.

* Simplification
* Functional Component
* Adding State

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-functional-component" />

## HelloWorldWebPart.ts Simplification

A number of simplifications have been made to the `HelloWorldWebPart.ts` file to make it easier to follow. 

The use of an external string collection has been removed. This is only needed in multilingual situations and can be added as and when needed. For a first web part there is really no need to have the student wondering where these strings are defined. For this sample they are simply hard coded into the file to make it clear how the property pane configuration works.

The external interface to define the properties is moved from a separate file and inline into `HelloWorldWebPart.ts`. This interface is used by the web part and the component on the assumption that all the properties will be passed to the component as props. Adding more properties is simply a matter of adding them to the IHelloWorldProps interface, adding a section to the getPropertyPaneConfiguration return value and adding a default to the manifest file if needed. The property will then be available to the component through its **props** collection.

## Functional Component

The `HelloWorld.tsx` React Component has been refactored as a pure functional component. This simplifies the code structure and will also gain you additional kudos when talking to computer scientists and functional code enthusiasts. The structure is a simple JavaScript function with the name of the component, a single argument containing the React props, and a simple return of the component rendering. Because it is just a function, there is no need to worry about **this** or **that**, constructors etc.

In addition the React elements returned have been simplified. In particular the "Learn more" button, which was constructed from HTML primitives in the Yeoman-generated sample, has been replaced by an Office-UI-Fabric PrimaryButton component. This also means that it has been possible to greatly simplify the SASS file `HelloWorld.module.scss`.

## Adding State

You may be wondering how maintaining state, side effects or other complexities can be accommodated with functional components like the one used. This can be achieved by using a fairly new feature called [React Hooks](https://reactjs.org/docs/hooks-intro.html) and will be demonstrated using [another sample](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-functional-stateful-component).

## Building and testing

In the react-functional-component directory run `npm install` to resolve all the dependencies. Once this has completed you can run `gulp serve` to test the web part in the local workbench.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-functional-component" />
