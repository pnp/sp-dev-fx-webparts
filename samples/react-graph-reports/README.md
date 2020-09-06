## react-graph-reports

## Summary
This sample describe a SPFx application which retrieve an office 365 usage reports using Microsoft Graph API. This application also use chartjs library to generate graph.


![Office 365 Usage Reports using Microsoft Graph API](./assets/react-graph-reports.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.8.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
> You need following set of permissions in order to retrieve office 365 usage reports. Find out more about consuming the [Microsoft Graph API in the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial)<br><br>![Microsoft Graph API Permissions](./assets/graph-api-permissions-usage-reports.png) 


## Solution

Solution|Author(s)
--------|---------
react-graph-reports | Ejaz Hussain

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 09, 2019|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

If you have not previously granted the required Microsoft Graph permissions, you need to:

- Run `gulp bundle --ship`
- Run `gulp package-solution --ship`
- Install the `.sppkg` file (under `.\sharepoint\solution`) to the SP app catalog
- Approve the API permissions in the new SP admin center

## Features
Here are main features for this application

- Material UI Components (Tab)
- Microsoft Graph API to retrieve Office 365 Usage reports
- ChartJS integrations
- Dependency Injection in SPFx using Service Scope

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-graph-reports" />
