# react-myonedrive

## Summary

This is a sample web part that displays currently logged in user's one drive's file,
This web part can be useful on the Intranet home page which can be added as My One Drive files for quick reference of user's one drive files.

![WebPart in Action](./assets/MyOneDriveInAction.gif)


## Features

* Show Current logged in user's One Drive Files
* Browseable folder and files
* Support to display icons for most known file types.
* Breadcrum as in One Drive App to quickly navigate
* Sorting based on Name and Modified Date column
* Options to choose fields to be displayed from Name, Modified, Modified By, File Size,Sharing
* Option to make Webpart title link clickalbe to send to One Drive URL


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.12.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

* SharePoint Online tenant
* You have provided permission in SharePoint admin for accessing Graph API on behalf of your solution. We can do it before deployment as proactive steps, or after deployment. You can refer to [steps about how to do this post-deployment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#deploy-the-solution-and-grant-permissions). Basically you have to use API Access Page of SharePoint admin and add below permission for our use case. 

```
 "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "Files.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Files.Read.All"
      }
    ]

```

## Solution

Solution|Author(s)
--------|---------
react-myonedrive | Siddharth Vaghasia(@siddh_me)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Aug 12, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Drive Graph END Point](https://docs.microsoft.com/en-us/graph/api/resources/driveitem?view=graph-rest-1.0)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-myonedrive" />
