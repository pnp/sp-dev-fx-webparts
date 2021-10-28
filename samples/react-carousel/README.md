---
page_type: sample
products:
- office-sp
- sharepoint
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - React
  createdDate: 06/17/2016 12:00:00 AM
---

# Images and Videos in a Carousel

## Summary

This web part show images and videos in carousel

It uses Microsoft Graph API to get image/video url and use PnPjs to load files from Picture library the images/videos are loading in lazy mode, progressively.

![carousel](./assets/carousel.gif)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js LTS v14 | LTS v12 | LTS v10](https://img.shields.io/badge/Node.js-LTS%20v14%20%7C%20LTS%20v12%20%7C%20LTS%20v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Local | Hosted](https://img.shields.io/badge/Workbench-Local%20%7C%20Hosted-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Web Part Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Site Url of library | Text| yes|
Picture Library| Choice/Dropdown | yes|  this is filled with all Picture Libraries (BaseTemplate : 109)
number images to load | number| yes | number between 1 and 200

### react-slick Props

For all available props, go [here](https://react-slick.neostack.com/docs/api/).

### react-slick Methods

For all available methods, go [here](https://react-slick.neostack.com/docs/api#methods)

## Solution

The web part Use PnPjs library, Microsoft Graph API, Office-ui-fabric-react components, react-slick Component

Solution|Author(s)
--------|---------
Carousel Image/Video  Web Part|[João Mendes](https://github.com/joaojmendes)
Carousel Image/Video  Web Part|[Rahul Suryawanshi](https://github.com/rahulsuryawanshi) ([@rahulsuryawansh](https://twitter.com/rahulsuryawansh))
Carousel Image/Video  Web Part|[Don Kirkham](https://github.com/DonKirkham) ([@DonKirkham](https://twitter.com/DonKirkham))
Carousel Image/Video  Web Part|[Harsha Vardhini](https://github.com/Harshagracy) ([@harshagracy](https://twitter.com/harshagracy))
Carousel Image/Video  Web Part|[Giuliano De Luca](https://github.com/giuleon) ([@delucagiulian](https://twitter.com/delucagiulian))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 11, 2019|Initial release
2.0.0|June 17, 2020|Upgraded to SPFx v1.10.0 (Rahul Suryawanshi)
3.0.0|October 31, 2020|Upgraded to SPFx v1.11.0 (Don Kirkham)
4.0.0|June 10, 2021|Upgraded to SPFx v1.12.1 (Giuliano De Luca)


## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add to AppCatalog and deploy`
- Make sure you have at least one **Picture Library** on one of your site collections
- Add the web part to a page
- In the web part's property pane, enter the **Site Url** (if library is on a different site collect) and select a **Picture Library** from the **Library** drop-down.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-carousel&authors=@joaojmendes%20@rahulsuryawanshi%20@DonKirkham%20@Harshagracy%20@giuleon&title=react-carousel%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-carousel&authors=@joaojmendes%20@rahulsuryawanshi%20@DonKirkham%20@Harshagracy%20@giuleon&title=react-carousel%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-carousel&authors=@joaojmendes%20@rahulsuryawanshi%20@DonKirkham%20@Harshagracy%20@giuleon&title=react-carousel%20-%20).



<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-carousel" />
