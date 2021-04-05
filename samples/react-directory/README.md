# Organization Directory

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

![directory](./assets/react-directory-withPaging.png) 

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")


## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Title | Text| No|WebPart Title
searchFirstName | boolean|No| Lastname or Firstname search query
Properties to search | text | No | By default **FirstName,LastName,WorkEmail,Department** are used for search. You can add custom properties separated by comma.
Properties to sent as clear text | text | No | By default if the search key has empty spaces, its replaced with **+** before sending it to the search query. The search properties mentioned here will be sent without the empty space replacemnt.
Results per page | number | Yes | Number of people result to be displayed per page. Max of **20** is allowed, default of **10** is set. 

## Solution

The web part use PnPjs library, Office-ui-fabric-react components

Solution|Author(s)
--------|---------
Directory Web Part|João Mendes
Directory Web Part| Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))
Directory Web Part| Sudharsan K ([@sudharsank](https://twitter.com/sudharsank))
Directory Web Part| Abderahman Moujahid

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 29, 2019|Initial release
1.0.1|July 19, 2020|Bugfix and mock-service for workbench (```LivePersonaCard``` not supported in workbench)
2.0.0|Sep 18 2020|React hooks, paging, dynamic search props, result alignment using office ui fabric stack.
3.0.0|Oct 17 2020|Minor fixes and add the additional web part property.
3.0.1|March 4 2021|Bugfix 'Sort People by'


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
