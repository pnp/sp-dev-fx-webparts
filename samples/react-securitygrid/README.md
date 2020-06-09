---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - react
  createdDate: 12/1/2017 12:00:00 AM
---
# SPFX React Grid

## Summary

React-securitygrid is an SPFX webpart that uses React and Office-UI-Fabric to render a grid showing which users have access to which lists/libraries/folders/files on a Web as shown here:

![config panel](./src/images/MainDisplay.gif)

Empty libraries are displayed withh a black folder icon, those with items are displayed with a white folder. The user can expand a list or library by clicking on the desired row. (If the library or folder has more than 5000 items an error will be displayed ) For deeply nested folders the Title column can be resized by drag and drop. The display shows a the appropriate icpn circle if the user has the selected permission to the given list, library, file or folder. (NOTE:The grid does not currently take into account access give via membership in an active directory group-- coming soon!). IMPORTANT: The user must have permissions to access lists and enumerate permissions in order to view the grid.

The user can change the permission being tested by cliking the Permission in the command bar and selecting a new Permission:

![permission panel](./src/images/selectPermissionsPopout.PNG)

The user can change which users are being shown in the grid by selecting the users button in the command bar and selecting a desired users:

![Select users](./src/images/SelectUsersPopout.PNG)

The user can change which lists are being shown in the grid by selecting the lists button in the command bar and selecting a desired lists:

![Select Lists](./src/images/Selectlistspopout.PNG)

The user can change alternate between displaying user names and emails  selecting the Show Email/Show Name button in the command bar and selecting the desired option:

![Select Mode](./src/images/SelectDisplayModePopout.PNG)

The the first configuration panel of the webpart is shown below:

![config panel](./src/images/Configuration.PNG)

Permission Settings

The Permission Settings allow you to select which permissions to show in the grid and to select the Icon and color used to display the selected permission.

User Settings

The Show Email or Name Toggle determines whether the name or email is displayed by default.
The Show Security Groups checkbox determines whether SharePoint Security groups are included in the grid.
The Show Users checkbox determines whether Users are included in the grid.
The Only show users with permissions toggle determines whether the grid shold diplay all users with access to the web, or only users with the selected permission
![config panel](./src/images/Permissions.gif)
The Let Users Select users checkbox determines whether Users can filter the selected users in the grid.

Display Settings

The Initial Title column width determines the initial width of the Title column(it can be resized).

The second configuarion pannel allows the owner to configure the List Settings
![List Confoguration panel](./src/images/ListConfiguration.PNG)

List Settings

The Show Hidden Lists checkbox determines whether Hidden lists  are displayed.
The Show System Lists checkbox determines whether System Lists (Catalogs) are included in the grid.
The Show Users checkbox determines whether Users are included in the grid.
The Let Users Select lists checkbox determines whether Users can filter the selected lists in the grid.

Select Lists

The Include/Exclude Selected lists Toggle determines whether the lists selected are to be included or excluded.

The admin can select lists and libraries below to have them included/excluded from the grid

## Notes

This is a port of an Angular 1.3 SharePoint hosted App at https://github.com/russgove/SPSecurity.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.10-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

> React, Office-UI-Fabric, sp-pnp-js, lodash

## Solution

Solution|Author(s)
--------|---------
 react-securitygrid | Russell Gove

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.2|April 5, 2021| Updates to SPFx 1.10; Allow display of multiple permissions
1.0.0.1|April 25, 2018|Update to SPFx 1.4.1
1.0.0.0|December 31, 2016|Initial version

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-securitygrid" />
