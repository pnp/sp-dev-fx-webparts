---
page_type: sample
products:
- office-365
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - React
  createdDate: 1/1/2016 12:00:00 AM
---
# Web part showing Current User's MS Teams and send message.

## Summary

This is a sample web part that displays currently logged in user's Microsoft Teams(user is member of), its channels and will allow sending messages to any Team's channel. It will also allow the user to open the team's channel via the link. This web part can be useful on the Intranet home page which can be added as My Teams web part.


* Web Part in Action

![WebPart in Action](./assets/myteamsmessage.gif)

* Configurable Web Part Properties

![Web Part Properties](./assets/webpartproperties.jpg)

## Features

* Show Current logged in user's Teams in Tree View
* On Expanding any Team, it will show selected team's channels.
* Message can send to any Team's channel by either by selecting any channel(configurable as web part properties)
* Context menu for every channel to 1) To open channel's link in Teams. 2) To send message to team.
* A dialog box to send message.

Configurable Web part Properties
* Web Part Title to be displayed On top of tree view (like My Teams).
* Toggle to Show/hide Teams and channel's Description.
* Toggle On/Off whether to open send message popup should open soon as a channel is selected.

* Please refer this [link](https://www.c-sharpcorner.com/article/microsoft-teams-operations-in-spfx-webpart-using-graph-api/) if you are interested in learning step by step on how to call Team graph API from SPFx web part.

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Prerequisites

* SharePoint Online tenant
* You have provided permission in SharePoint admin for accessing Graph API on behalf of your solution. We can do it before deployment as proactive steps, or after deployment. You can refer to [steps about how to do this post-deployment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#deploy-the-solution-and-grant-permissions). Basically you have to use API Access Page of SharePoint admin and add below permission for our use case. 

```
 "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "User.ReadWrite.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Group.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Group.ReadWrite.All"
      }
    ]

```
## Concepts

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using react framework in SPFx webpart
* Calling Teams Graph API in SPFx webpart
* Usage of PnP Tree View  Control
* Usage of Fluent UI/Office UI Fabric Controls

## Solution

Solution|Author(s)
--------|---------
react-teams-message | Siddharth Vaghasia(@siddh_me)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|May 23, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-teams-message" />
