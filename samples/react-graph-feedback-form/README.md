# Feedback Form

## Summary

Sample SPFx React web part which allows sending emails using Microsoft Graph.

![Sending emails with SPFx web part](./assets/preview.gif)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.8.2-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-graph-feedback-form|Sergei Zheleznov (CollabStack)

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 12, 2019|Initial release


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* clone this repo
* in the command line run:
  * `npm i`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* deploy the package to your app catalog
* approve the API permission request to access e-mails using Microsoft Graph
* add the web part to a page

## Features

This sample illustrates the following concepts:

* using MSGraphClient to communicate with the Microsoft Graph in a SharePoint Framework solution
* requesting API permissions in a SharePoint Framework package
* sending e-mails using Microsoft Graph
* using MSGraphClient in a SharePoint Framework web part
* using @microsoft/microsoft-graph-types

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-graph-feedback-form" />
