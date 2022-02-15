# Avatar Editor

## Summary

This is a sample web part that helps user create their avatar and save as profile picture. User can even download their avatar as PNG file. This web part can be useful in Intranet to help user create their avatar and save it as profile picture.

##  
![directory](/samples/react-avatar/assets/reactAvatarOutcome.gif) 

## Features

* Avatar Generator from multiple options available
* Set Avatar as Profile Picture.
* Download Avatar as PNG file.



## Compatibility

![SPFx 1.11.1](https://img.shields.io/badge/SPFx-1.11.1-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Prerequisites

* SharePoint Online tenant
* You have to provide permission in SharePoint admin for accessing Graph API on behalf of your solution. We can do it before deployment as proactive steps, or after deployment. You can refer to [steps about how to do this post-deployment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#deploy-the-solution-and-grant-permissions). You have to use API Access Page of SharePoint admin and add below permission for our use case. 

```
 "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "User.ReadWrite"
      }
    ]

```

## Concepts

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using react framework in SPFx web part
* Calling Graph API my Photo to store the image in SPFx web part
* Usage of Material UI Tab and Dialog
* Usage of [avataaars](https://getavataaars.com/)


## Web Part Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Web Part Title | Text| no|


## Solution

The web part Use avataaars library for creating avatars and MS Graph with User.ReadWrite and User.ReadWriteAll for saving avatar as current users Profile Picture.FileSaver for downloading avatar image as png file.

Solution|Author(s)
--------|---------
react Avatar|Kunj Sangani

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|August 1, 2020|Initial release
1.0.1|October 20, 2020|Update to SPFx 1.11.0

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - Add to AppCatalog and deploy

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-avatar" />
