# Microsoft Graph People Search Web Part

## Summary

Show and search users from your organization, through Microsoft Graph. Search results show as a nice People Card, and display the Live Persona Card on hover.  
The web part accepts a search query through a Dynamic Data connection, to further filter the displayed results. A source for this search query is not provided, but by default this can come from the Microsoft Search search box or the Page Environment. You could also use the Search Box Web Part provided by the [PnP Modern Search Web Parts](https://microsoft-search.github.io/pnp-modern-search/).

![directory](./assets/MicrosoftGraphPeopleSearch.gif) 
![directory](./assets/MicrosoftGraphPeopleSearch-LPC.gif) 

## Future improvements
- Support loading Profile Pictures
- Support for multiple pages
- Improve $select field with predefined properties of the User object
- Improve field mapping with the selected properties defined in $select
- Toggle Live Person Card

## Accompanying blog post
I wrote a blog post covering more if the inner workings, you can find it at [SPFx People Search web part based on Microsoft Graph](https://blog.yannickreekmans.be/spfx-people-search-web-part-based-on-microsoft-graph/)

## Used SharePoint Framework Version 
![1.11.0](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software) - Untested!!
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-msgraph-peoplesearch | Yannick Reekmans ([YannickReekmans](https://twitter.com/YannickReekmans))

## Version history

Version|Date|Comments
-------|----|--------
2.0.0|July 30, 2020|Initial release

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
- Add to AppCatalog and deploy
- Assign `User.Read.All` delegated permissions to the **SharePoint Online Client Extensibility Web Application Principal**, easiest way is with [Office 365 CLI](https://pnp.github.io/office365-cli/):
```
o365 login
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'User.Read.All'
```

---

## Acknowledgements / Inspiration

There are many web parts that aim to do the same thing, but they either use SharePoint Search as data store or they render their results in a completely different way. It's impossible to acknowledge all sources of inspiration to this solution, but I do want to give a shout out to two projects (and their contributors) that were foundational to deliver this solution as quickly as I did:

### React Directory Web Part
The foundation on which I started building my own solution. This web part can be downloaded from the [SharePoint Framework Client-Side Web Part Samples & Tutorial Materials](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-directory)

#### Thanks to
- João Mendes ([@joaojmendes](https://twitter.com/joaojmendes))
- Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))

### PnP Modern Search Web Parts
These web parts were an enormous inspiration on code structure and implementation approach. Their codebase is very impressive, and a lot of the code in this web part is a literal copy paste from them. You can find more on the  [PnP Modern Search Web Parts](https://microsoft-search.github.io/pnp-modern-search/) page.

#### Thanks to
- Franck Cornu (aequos) - [@FranckCornu](http://www.twitter.com/FranckCornu) - [GitHub Sponsor Page](https://github.com/sponsors/FranckyC)  
- Mikael Svenson (Microsoft) - [@mikaelsvenson](http://www.twitter.com/mikaelsvenson)  
- Yannick Reekmans - [@yannickreekmans](https://twitter.com/yannickreekmans)  
- Albert-Jan Schot - [@appieschot](https://twitter.com/appieschot)  
- Tarald Gåsbakk (PuzzlePart) - [@taraldgasbakk](https://twitter.com/Taraldgasbakk)  
- Brad Schlintz (Microsoft) - [@bschlintz](https://twitter.com/bschlintz)  
- Richard Gigan - [@PooLP](https://twitter.com/PooLP)  

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-msgraph-peoplesearch" />
