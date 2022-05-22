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
  - React
  createdDate: 11/28/2018 12:00:00 AM
---
# Image Gallery Built with Adaptive Cards

## Summary 

This sample demonstrates the capability of using [Adaptive Cards](https://adaptivecards.io/) with SharePoint Framework. Adaptive cards are great fit for Bot, however they can be effectively used with SPFx to render the content. This web part helps to display the image gallery from SharePoint list.

![Web part preview][figure1]

When added to SharePoint site, the source list containing images information, number of images to display can be configured from web part properties.
The sample also provisions the list called "Adaptive Card Images" which can be used as an example to start using the web part.
![SharePoint Run][figure2]

### SharePoint Asset

A SharePoint list (named "Adaptive Card Images") is provisioned to store the image information. The schema of the list is as below.
![List Schema][figure3]

- The "Image Link" column stores the url of image to be displayed in adaptive card.
- The "Navigation URL" column represents the url to navigate by clicking on image in adaptive card.
- The "Sort Order" column represents the order in which images to be displayed in adaptive card.

The solution also provisions sample data to the "Adaptive Card Images" list.
![List Sample Data][figure4]

### NPM Packages Used

Below NPM packages are used to develop this sample.
1.	sp-pnp-js (https://www.npmjs.com/package/sp-pnp-js) 
2.	adaptivecards (https://www.npmjs.com/package/adaptivecards)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-adaptive-cards-image-gallery|[Nanddeep Nachan](https://www.linkedin.com/in/nanddeepnachan/) (SharePoint Consultant, [@NanddeepNachan](https://http://twitter.com/NanddeepNachan) )
&nbsp;|[Ravi Kulkarni](https://www.linkedin.com/in/ravi-kulkarni-a5381723/) (SharePoint Consultant)

## Version history

Version|Date|Comments
-------|----|--------
1.1.0|June 15, 2020|Upgrade to SPFx 1.10.0
1.0.0|November 28, 2018|Initial release

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repository.
- On the command prompt, navigate to the web part folder and execute:
- `npm i`
- `gulp bundle --ship`
- `gulp package-solution --ship`
- The package can be found at `\react-adaptive-cards-image-gallery\sharepoint\solution\react-adaptive-cards-image-gallery.sppkg`
- [Deploy the package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#deploy-the-helloworld-package-to-app-catalog) to the app catalog.
- [Install the client-side solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#install-the-client-side-solution-on-your-site) to your SharePoint site.
- [Add web part to your SharePoint page](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#add-the-helloworld-web-part-to-modern-page) named "Adaptive Cards Image Gallery".

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample web part shows how adaptive cards can be used effectively with SharePoint Framework to render an image gallery with data stored in a SharePoint list.
- Integrating adaptive cards
- Rendering image gallery
- SharePoint assets provisioning
- Creating extensible services
- Using @sp-pnp-js
- Using @adaptivecards


[figure1]: ./assets/webpart-preview.png
[figure2]: ./assets/sharepoint-run.gif
[figure3]: ./assets/list-schema.png
[figure4]: ./assets/list-sample-data.png


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-adaptive-cards-image-gallery") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-adaptive-cards-image-gallery) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-adaptive-cards-image-gallery&template=bug-report.yml&sample=react-adaptive-cards-image-gallery&authors=@nanddeepn%20@ravi16a87&title=react-adaptive-cards-image-gallery%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-adaptive-cards-image-gallery&template=question.yml&sample=react-adaptive-cards-image-gallery&authors=@nanddeepn%20@ravi16a87&title=react-adaptive-cards-image-gallery%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-adaptive-cards-image-gallery&template=question.yml&sample=react-adaptive-cards-image-gallery&authors=@nanddeepn%20@ravi16a87&title=react-adaptive-cards-image-gallery%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**



<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-adaptive-cards-image-gallery" />
