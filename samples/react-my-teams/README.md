# React My Teams

## Summary

This sample uses Microsoft Graph to list the Teams the current user is a member of. When the user clicks on one of the teams, the web part retrieves information about the default channel (General) and opens it.
The web part can be configured to open the team on the web browser or client app.

![Demo](./assets/Preview.png)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/drop-1.7.1-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Prerequisites

- Office 365 subscription with SharePoint Online licence
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Solution

| Solution       | Author(s)      |
| -------------- | -------------- |
| react-my-teams | Joel Rodrigues |

## Version history

| Version | Date              | Comments        |
| ------- | ----------------- | --------------- |
| 1.0     | February 26, 2019 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Clone this repository.

In the command line run:

```bash
npm install
gulp serve --nobrowser
```

Navigate to the hosted version of SharePoint workbench, eg. https://contoso.sharepoint.com/_layouts/15/workbench.aspx

### Grant the service principal permission to the Microsoft Graph API

Once installed, the solution will request the required permissions via the Office 365 admin portal.
If you prefer to approve the permissions in advance, for example when testing the solution in the Workbench page without installing it, you can do so using Office 365 CLI:

```bash
o365 spo login https://contoso-admin.sharepoint.com
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'User.Read.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'User.ReadWrite.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Group.Read.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Group.ReadWrite.All'
```

## Features

This Web Part lists all the teams the current user is a member of.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-my-teams" />
