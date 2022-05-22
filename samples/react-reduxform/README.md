# SPFx web part using Redux-Form library and React

## Summary
Sample web part to demonstrate the use of [Redux-Form](https://github.com/erikras/redux-form) library with SPFx, React and Typescript. Demonstrates how to easily build a dynamic grid using redux-form.



![SPFx redux-form webpart](./assets/ReduxFormWebpart.gif)



## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg) 
![Node.js v8 | v6](https://img.shields.io/badge/Node.js-v8%20%7C%20v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
- Basic knowledge of react-redux concepts - reducer,actions and dispatch.
- PnP PowerShell - to setup Fields and Lists to work with the web part.

## Solution

Solution|Author(s)
--------|---------
react-reduxform | Vipul Kelkar  @vipulkelkar

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 02, 2018|Initial release


## Minimal Path to Awesome

- The web part requires two custom lists in the SharePoint site. The folder "SetupScript" contains a PnP PowerShell script that will setup the custom fields, content type and the required lists.

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

- Change the site URL in the PowerShell script and execute with proper credentials to setup the lists.

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

- Navigate to - <Your SP site>/_layouts/workbench.aspx and add the "ReduxFormWebpart"


## Features

- This is a data entry web part to create a "Purchase Request". Each purchase request can have several items that can be ordered within it.

- The web part interacts with two SharePoint lists - "PurchaseRequest" and "PurchaseRequestItems".

- The purchase request is created in the "PurchaseRequest" list. The purchase items are stored in separate "PurchaseRequestItems" list along with the ListItem ID of the corrosponding PurchaseRequest item.


Redux-Form :

- Web part makes use of [Redux-Form](https://github.com/erikras/redux-form) library which makes it easy to maintain the state of form fields without explicitly requiring  to maintain the state everytime data in a form field is added/updated/deleted. 
Refer to the [Getting started](https://redux-form.com/6.4.3/docs/gettingstarted.md/) guide for the basics of redux-form

- The sample demonstrates how to integrate redux-form in SPFx web part and develop a dynamic grid component using [FieldArray](https://redux-form.com/6.4.3/docs/api/fieldarray.md/) component of redux-form.

- The sample also uses custom renderers for form fields along with required field and number validations.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-reduxform" />
