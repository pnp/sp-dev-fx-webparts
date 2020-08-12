# SPFx Avatar

## Summary

This is a sample web part that helps user create their avatar and save as profile picture. User can even download their avatar as PNG file. This webpart can be useful in Intranet to help user create their avatar and save it as profile picture.


##  
![directory](/samples/react-avatar/assets/reactAvatarOutcome.gif) 

## Features

* Avatar Generator from multiple options available
* Set Avatar as Profile Picture.
* Download Avatar as PNG file.


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

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

* Using react framework in SPFx webpart
* Calling Graph API my Photo to store the image in SPFx webpart
* Usage of Material UI Tab and Dialog
* Usage of [avataaars](https://getavataaars.com/)


## WebPart Properties
 
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


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add to AppCatalog and deploy`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-avatar" />



