# React Birthdays Web Part

## Summary
The Birthdays web part show upcoming birthdays in company, the web part read the birthdays from a list that is locate on tenant root site, called "Birthdays".


There are available a Azure Function that get user Birthdays from AAD, this function create a list in Tenant Root Site if not exists.
See the local.settings.json for detail of application variavel required.

But ypu can sync the Birthday list from LOBS system for example company ERP, HR or other sources.


![Brithdays Web Part](./assets/birthdays.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

> Update accordingly as needed.

## Prerequisites
 
> Existing list in tenant root site, with the name "Birthdays"  and columns:

Column Internal Name|Type|Required| comments
--------------------|----|--------|----------
jobTitle| Text| no|
Birthday| DateTime | true|
userAADGUID| Text| no | required if used Azure Function to get Birthdays from AAD
Title| Text| true

## Solution

Solution|Author(s)
--------|---------
react Birthday Web Part|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 6, 2018|Initial release

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

## Features
This project contains sample Birthday web parts built on the SharePoint Framework using React.
This sample illustrates the following concepts on top of the SharePoint Framework:
- using React for building SharePoint Framework client-side web parts
- using React components for building Birthday web part
- using MSGraph API to get data from SharePoint Lists 
- using MSGraph API to read users from AAD
- using @PnP/PnPjs to create a List, add, update, delete Items.
 

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/readme-template" />
