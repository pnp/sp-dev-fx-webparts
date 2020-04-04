## Image Gallery Web Part Built with Adaptive Cards

### Summary 
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

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.7-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-adaptive-cards-image-gallery|[Nanddeep Nachan](https://www.linkedin.com/in/nanddeepnachan/) (SharePoint Consultant, [@NanddeepNachan](https://http://twitter.com/NanddeepNachan) )
&nbsp;|[Ravi Kulkarni](https://www.linkedin.com/in/ravi-kulkarni-a5381723/) (SharePoint Consultant)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 28, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repo
- `npm i`
- `gulp serve --nobrowser`
- Open workbench on your tenant, i.e. https://contoso.sharepoint.com/sites/salesteam/_layouts/15/workbench.aspx
- Search and add web part "Adaptive Cards Image Gallery"

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


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-adaptive-cards-image-gallery" />
