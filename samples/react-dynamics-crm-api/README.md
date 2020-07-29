# React Dynamics CRM API

## Summary
This sample shows how to consume Dynamics CRM API using AadTokenProvider class.

![react-dynamics365-api](./assets/screenshot.gif)

## Used SharePoint Framework Version

![SPFx v1.10.0](https://img.shields.io/badge/SPFx-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Developer](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-dynamics365-api|Ramin Ahmadi

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Jul 12, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---


## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-dynamics-crm-api" />
