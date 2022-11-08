# Using Dynamics CRM API

## Summary
This sample shows how to consume Dynamics CRM API using AadTokenProvider class.

![react-dynamics365-api](./assets/screenshot.gif)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to Dynamics 365")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-dynamics365-api|[Ramin Ahmadi](https://github.com/AhmadiRamin)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Jul 12, 2020|Initial release

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

### Configuration

* Login to Azure Portal.
* Go to **Azure Active Directory**
* Go to the **App Registrations** page.
* Select **SharePoint Online Client Extensibility** from the list of applications.
* Select **API Permissions**.
* Add **Dynamics CRM** permission.
* Go to the **Manifest** page, and make sure the value for the `allowPublicClient` and the `oauth2AllowImplicitFlow` are both set to `true`.

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* Using AadTokenProvider to consume Dynamics CRM API.
* How to get Accounts/Contacts information from Dynamics 365.
* React Hooks
* Using async / await for the async calls
* Ant design for the UI.

> **NOTE:** This sample will not work in the local workbench.

## Video

[![Calling Dynamics 365 CRM APIs from SharePoint](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=VXzYc6cfjuI "Calling Dynamics 365 CRM APIs from SharePoint")
## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-dynamics-crm-api") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-dynamics-crm-api) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-dynamics-crm-api&template=bug-report.yml&sample=react-dynamics-crm-api&authors=@AhmadiRamin&title=react-dynamics-crm-api%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-dynamics-crm-api&template=question.yml&sample=react-dynamics-crm-api&authors=@AhmadiRamin&title=react-dynamics-crm-api%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-dynamics-crm-api&template=question.yml&sample=react-dynamics-crm-api&authors=@AhmadiRamin&title=react-dynamics-crm-api%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-dynamics-crm-api" />
