# List Items Menu (SP2019 Version)

## Summary

This web part allows user create a navigation menu , grouped by any column of document library.
When the user clicks on the header it dynamically load documents.

![ListItemsMenu](./assets/react-list-item-menu.gif)

## Screenshots

![ListItemsMenusp2019](./assets/react-list-item-menu.png)

![ListItemsMenusp2019](./assets/react-list-item-menu2.png)  



## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg) 
![Node.js LTS 6.x | LTS 8.x](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20LTS%208.x-green.svg)
![SharePoint 2019 | Online](https://img.shields.io/badge/SharePoint-2019%20%7C%20Online-yellow.svg)
![Teams No: Not designed for Microsoft Teams](https://img.shields.io/badge/Teams-No-red.svg "Not designed for Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")


## Applies to

[SharePoint Framework](https://aka.ms/spfx)
 

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
 


## Version history

Version|Date|Comments
-------|----|--------
1.0.0|May 7, 2021|Initial release

## Minimal Path to Awesome

- Clone this repository
- Move to sample folder
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add to AppCatalog and deploy

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


## Support

We do not support samples, but we do use GitHub to track issues and constantly want to improve these samples.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-list-items-menu-sp2019&authors=@joaojmendes&title=react-list-items-menu-sp2019%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-list-items-menu-sp2019&authors=@joaojmendes&title=react-list-items-menu-sp2019%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-list-items-menu-sp2019&authors=@joaojmendes&title=react-list-items-menu-sp2019%20-%20).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-list-items-menu-SP2019" />
