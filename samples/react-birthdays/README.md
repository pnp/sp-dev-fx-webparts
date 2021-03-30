# Birthdays

## Summary
The Web Part Birthdays shows the upcoming birthdays in the company, the web part reads birthdays from a list located on the tenant's root site with title "Birthdays."

Now is possible to the user select an image for the background in the properties of the webpart.


There is an Azure function available that get AAD user birthdays, this function creates a list on the tenant root site, if it does not exist.
See the local.settings.json for details on the required application variable located in SyncUsersBirthdaysFunction folder.

But you can synchronize the Birthdays list with other applications HR Systems, or other sources

![Birthdays Web Part](./assets/birthdays.gif)

![Birthdays Web Part](./assets/birthdays.png)


## Used SharePoint Framework Version 
![1.8.2](https://img.shields.io/badge/version-1.8.2-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Prerequisites
 
Existing list in tenant root site, with the Title "Birthdays"  and columns:

Column Internal Name|Type|Required| comments
--------------------|----|--------|----------
JobTitle| Text| no|
Birthday| DateTime | true|
userAADGUID| Text| no | required if used Azure Function to get Birthdays from AAD
Title| Text| true
email| Text| true

## After create a column Index on column "Birthday" - Important!

## Solution

Solution|Author(s)
--------|---------
react Birthday Web Part|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 6, 2018|Initial release
1.1.0|July 23, 2019 | new version

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome - please follow all the steps.

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add and Deploy Package to AppCatalog `
  - `Go to API Management - from SharePoint Admin Center new experience,  and Approve the Permission Require to Use Graph API SCOPES`

 

## Features
This project contains sample Birthday web parts built on the SharePoint Framework using React
and an Azure Function to get user Birthdays from AAD.
This sample illustrates the following concepts on top of the SharePoint Framework:
- using React for building SharePoint Framework client-side web parts
- using React components for building Birthday web part
- using MSGraph API to get data from SharePoint Lists 
- using MSGraph API to read users from AAD
- using @PnP/PnPjs to create a List, add, update, delete Items.
 

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-birthdays" />

