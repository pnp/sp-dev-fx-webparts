# React Directory Web Part

## Summary

 Search People from Organization Directory and show live persona card on hover.


##  
![directory](/samples/react-directory/assets/react-directory7.png) 

![directory](/samples/react-directory/assets/react-directory8.png) 

![directory](/samples/react-directory/assets/react-directory9.png) 

![directory](/samples/react-directory/assets/react-directory.jpg) 

![directory](/samples/react-directory/assets/react-directory-teams1.jpg) 

![directory](/samples/react-directory/assets/react-directory2.jpg) 

![directory](/samples/react-directory/assets/react-directory-teams2.png) 

![directory](/samples/react-directory/assets/react-directory21.png) 

![directory](/samples/react-directory/assets/react-directory3.jpg) 

![directory](/samples/react-directory/assets/react-directory6.png) 

![directory](/samples/react-directory/assets/react-directory5.jpg) 



## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Title | Text| no|WebPart Title
searchFirstName | boolean|no| Lastname or Firstname search query


 

## Solution
The web part use PnPjs library, Office-ui-fabric-react components

Solution|Author(s)
--------|---------
Directory Web Part|João Mendes
Directory Web Part| Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 29, 2019|Initial release
1.0.1|July 19, 2020|Bugfix and mock-service for workbench (```LivePersonaCard``` not supported in workbench)


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




<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-directory" />

