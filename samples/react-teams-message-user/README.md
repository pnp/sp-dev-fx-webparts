# Message Teams User

## Summary

Sample that shows how to send a message to Microsoft Teams using a SharePoint framework solution using Microsoft Graph.

![Message Teams Web part preview](./assets/webPart-preview.png).


## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg)
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Prerequisites

* SharePoint Online tenant
* You have provided permission in SharePoint admin for accessing Graph API on behalf of your solution. We can do it before deployment as proactive steps, or after deployment. You can refer to [steps about how to do this post-deployment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#deploy-the-solution-and-grant-permissions). Basically you have to use API Access Page of SharePoint admin and add below permission for our use case.

```json
 "webApiPermissionRequests": [
  {
    "resource": "Microsoft Graph",
    "scope": "ChatMessage.Send"
  },
  {
    "resource": "Microsoft Graph",
    "scope": "Chat.Create"
  },
  {
    "resource": "Microsoft Graph",
    "scope": "Chat.ReadWrite" 
  },
  {
    "resource": "Microsoft Graph",
    "scope": "User.Read"
  },
  {
    "resource": "Microsoft Graph",
    "scope": "User.ReadWrite.All"
  },
  {
    "resource": "Microsoft Graph",
    "scope": "Directory.Read.All"
  },
  {
    "resource": "Microsoft Graph",
    "scope": "Directory.ReadWrite.All"
  }
]

```

## Concepts

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using react framework in SPFx web part
* Calling Microsoft Graph API in SPFx web part

## Solution

Solution|Author(s)
--------|---------
teams-messages| David Ramalho([@davRamalho](https://twitter.com/davRamalho))


## Version history

Version|Date|Comments
-------|----|--------
1.0|February 28, 2021|Initial release



## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-teams-message-user" />
