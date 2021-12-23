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
  platforms:
  - react
  createdDate: 3/1/2018 12:00:00 AM
---
# Slide Swiper

## Summary

This SPFx React web part sample demonstrates mobile touch slide swiper. By default the swiper web part is responsive, has cross device and browser touch support and uses paging, but additional features like navigation, autoplay, loop of the slides and more can be enabled from the web part properties panel. The swiper web part can be used as carousel as well. The slides or cards template can easily be customized. The SPFx React swiper client side solution can easly be extended with more swiper, carousel like features because it is based on a popular feature rich JavaScript library called [Swiper](https://github.com/nolimits4web/swiper).

![SPFx React Slide Swiper, can also be used as carousel](./assets/SPFx-React-Slider-Swiper.gif)

## Solution packaging and bundle optimization considerations

This sample uses the Swiper JavaScript library thought the npm packages, but just for the purpose of the sample so it can quicky be run without addional setup. It is highly recomended to add the Swiper library as SPFx solution [external reference](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/add-an-external-library) to resize the solution bundle size and improve Site Page load times. 


## Compatibility

![SPFx 1.7.0](https://img.shields.io/badge/SPFx-1.7.0-green.svg) 
![Node.js v8](https://img.shields.io/badge/Node.js-v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

- Office 365 subscription with SharePoint Online.
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Solution

Solution|Author(s)
--------|---------
react-slide-swiper | [Velin Georgiev](https://github.com/VelinGeorgiev) ([@VelinGeorgiev](https://twitter.com/velingeorgiev))

## Version history

Version|Date|Comments
-------|----|--------
0.0.1|February 08, 2018 | Initial commit
0.0.2|September 07, 2018 | Upgrade to 1.6.0
0.0.3|December 10, 2018 | Upgrade to 1.7.0

## Minimal Path to Awesome

- Clone this repository.
- Open the command line, navigate to the web part folder and execute:
    - `npm i`
    - `gulp serve`

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side web parts.
- How external css can be included in module.css.
- How JavaScript library can be loaded by the help of requirejs in web part.
- Mobile Touch capabilities

## SharePoint info

When using the web part in SharePoint, either in the SharePoint Workbench or deployed, the web part reads by default from a List called "Swiper Content" with fields Title, ImageUrl, Description of type Single line of text. The list has to be created manually.


## Help


We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-slide-swiper") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-slide-swiper) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-slide-swiper&template=bug-report.yml&sample=react-slide-swiper&authors=@VelinGeorgiev&title=react-slide-swiper%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-slide-swiper&template=question.yml&sample=react-slide-swiper&authors=@VelinGeorgiev&title=react-slide-swiper%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-slide-swiper&template=question.yml&sample=react-slide-swiper&authors=@VelinGeorgiev&title=react-slide-swiper%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-slide-swiper" />


