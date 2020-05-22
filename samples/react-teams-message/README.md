# Webpart showing Current User's MS Teams and send message.

## Summary

This is sample webpart  that displays current logged in user's Microsoft Teams(user is member of), its channels and will allows to send message to any Team's channel. It will also allow user to open teams channel via link. This webpart can be useful on Intranet home page which can be added as My Teams webpart.

* Web Part in Action

![WebPart in Action](assets/myteamsmessage.gif?raw=true "Web Part in Action")

* Configurable Web Part Properties

![Web Part Properties](assets/webpartproperties.jpg?raw=true)

## Features

* Show Current logged in user's Teams in Tree View
* On Expanding any Team, it will show selected team's channels.
* Message can send to any Team's channel by either by selecting any channel(configurable as webpart properties)
* Context menu for every channel to 1) To open channel's link in Teams. 2) To send messsage to team.
* A dailog box to send message.

Configurable Webpart Properties
* Web Part Title to be displayed On top of tree view (like My Teams).
* Toggle to Show/hide Teams and channel's Description.
* Toggle On/Off whether to open send message popup should open soon as a channel is selected.

* Please refer this [link](https://www.c-sharpcorner.com/article/microsoft-teams-operations-in-spfx-webpart-using-graph-api/) if you are interested in learning step by step on how to call Team graph API from SPFx webpart.

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.10.1-green.svg)

## Applies to

* [SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)


## Prerequisites

* SharePoint Online tenant
* You have provided permission in SharePoint admin for accessing Graph API on behalf of your solution. We can do it before deployment as proactive steps, or after deployment. You can refer to steps [here](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#deploy-the-solution-and-grant-permissions) about how to do this post-deployment. Basically you have to use API Access Page of SharePoint admin and add below permission for our use case. 

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
