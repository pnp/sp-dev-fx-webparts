# Tree Organization

## Summary
The Tree Organization WebPart shows the Organization Chart of the  or the team, the web part reads infomation from current user to build the Organization Chart.  

You can configure in the web part properties:
* show all Organization Chart 
* the only user team, (same manager and peers). 
* show Organization Chart by picking up user
 

![Organization Chart Web Part](./assets/react-tree-orgchart.gif)

![Organization Chart Web Part](./assets/Screenshot1.png)
![Organization Chart Web Part](./assets/Screenshot2.png)
![Organization Chart Web Part](./assets/Screenshot3.png)



## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## WebPart Properties
 

Property |Type|Required| comments
--------------------|----|--------|----------
title | Text| no| WebPart Title
teamLeader |Text|no|UPN of manager if viewType is 4 
viewType|viewType(number)|yes|if currentUserTeam is set it's not required 
maxLevels | Number| yes | Maximum number of levels to show
detailBehavoir |boolean|no|Delve or Live Persona Card
excludefilter|boolean|no|Filter contains/not contains
filter|string|no|Filter Value
currentUserTeam|boolean|no|only in Interface to handle previouse installations

### viewType Enum:
 ``` 
 MyTeam = 1,
 CompanyHierarchy = 2,
 ShowOtherTeam = 4
 ```

## Solution

Solution|Author(s)
--------|---------
Tree Organization WebPart|João Mendes
Tree Organization WebPart|Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))

## Version history

Version|Date|Comments
-------|----|--------
1.1.0|Feb 28, 2021|Added <ul><li>Show Other Team</li><li>Live Contact Card</li><li>Filter user by userPrincipalName</li><li>Graph API</li><li>PNPJS updates</li></ul> 
1.0.2|June 12, 2020|Added exception handler for profiles missing display name 
1.0.1|Jan 28, 2020|Update to SPFx 1.10, minor fixes and refactoring.
1.0.0|Feb 25, 2019|Initial release  

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-tree-orgchart" />
