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
  - Microsoft Graph
  platforms:
  - React
  createdDate: 4/9/2020 12:00:00 AM
---

# React Global News

## Summary

This Web Part use an  API available in https://newsapi.org , Search worldwide news, it search and index more t6han 50.000 news sites and blogs.
There are a free plan and payed plans.

The Information is displayed in a grid of tiles or list of cards.

  

![GlobalNews](./assets/globalNews.gif)

![GlobalNews](./assets/GlobalNews.png)

! 
## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Web Part Title | Text| no|
Search Keyword or Phrase | Text | no | Keywords or Phrase to Search
Sources | Text |no | List of Sources Available
Show Articles from | Text | no | Select Articles from Headlines or All News
Search on Article Title Only | Boolean | no | Search on Title Only
Selected Domains | Text | no | list of domains separated by comma to include in search
Exclude Domains | Text | no | List os domains separated by comm a to exclude on search
Show Articles in this language | Text | no | Select Articles in Language selected
View Option | Text | no | Select View option, List or Grid
Number Articles per page | Number | no | number os articles per page 


## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react  Global News|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 14, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Please follow all the steps:

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add and deploy package to your tenant's App Catalog
- Go to **API Access** - from **SharePoint Admin Center** new experience, and **Approve** the permission to use Microsoft Graph scope **User.ReadWrite.All**
