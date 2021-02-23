# List Items Menu

## Summary

This web part allows user create a navigation menu , grouped by any column of document library.
When the user clicks on the header it dynamically load documents.

![ListItemsMenu](./assets/ListMenuDocs.gif)

## Screenshots

![ListItemsMenu](./assets/reactListItems1.JPG)

![ListItemsMenu](./assets/reactListItems2.JPG)  

![ListItemsMenu](./assets/reactListItems3.JPG)  

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
WebPart Title| Text| no|
Select Document Library| dropdown|yes
Select Field to Group By | dropdown|yes
 

## Solution

The Web Part Use PnPjs library, Fluent-Ui-react components

Solution|Author(s)
--------|---------
React List Items Menu |[João Mendes](https://github.com/joaojmendes) ([@joaojmendes](https://twitter.com/joaojmendes))
React List Items Menu |[Ravi Chandra](https://github.com/Ravikadri)


## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 20, 2020|Initial release
1.0.1|February 18, 2021|Added support for metadata columns
1.0.2|February 21, 2021|Fixed `gulp build` issues

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Move to sample folder
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add to AppCatalog and deploy
- go to SharePoint Admin Center and Approve required API Permissions


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-list-items-menu" />
