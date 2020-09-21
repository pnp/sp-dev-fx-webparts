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
  createdDate: 1/8/2018 12:00:00 AM
---

## Using React Accordion plugin with SPFx

## Summary

This is a sample web Part that illustrates the use of React Accessible Accordion plugin for building SharePoint Framework client-side web parts to show SharePoint list data in Accordion format.

![Sample Web Part built using SPFx with React Framework showing list data in accordion format](./assets/previewAccordion.PNG)

## Used SharePoint Framework Version 

![1.10.0](https://img.shields.io/badge/drop-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-accordion | Gautam Sheth (SharePoint Consultant, RapidCircle)
react-accordion | Abhishek Garg

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 17, 2018|Initial release
2.0|January 19, 2020|Upgrade to SPFx 1.10
2.1|June 22, 2020|Added pagination (Abhishek Garg)

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

### Build and Test

1. Clone this repo
2. In the command line run
    - `npm i`
    - `gulp build`
    - `gulp serve --nobrowser`
3. Create a custom list (e.g. FAQ) with Title and Description(internal name) of type Enhanced rich text on your SharePoint site. 
4. Populate the list with some items
5. Navigate to the hosted version of SharePoint workbench, eg. **https://\<tenant>.sharepoint.com/sites/\<your site>/_layouts/15/workbench.aspx**
6. Add the Web Part to the canvas and configure it.

### Package and deploy

1. In the command line run
    - `gulp bundle --ship`
    - `gulp package-solution --ship`
2. Install into your SharePoint app catalog and add it to a SharePoint site.
3. Navigate to your site, eg. **https://\<tenant>.sharepoint.com/sites/\<your site>**
4. Create a custom list with Title and Description(internal name) of type Enhanced rich text. 
5. Populate the list with some items
6. Navigate to a page on your site where the custom list is created
7. Add the Web Part to the page and configure it.

## Features

This project contains sample client-side web part built on the SharePoint Framework illustrating how to show list data in Accordion format using React framework.

This sample illustrates the following concepts on top of the SharePoint Framework:

### General

- performing SharePoint GET operation in React using inbuilt SP Http Client
- Using Fabric UI button component for pagination
- optimizing REST responses for performance using `nometadata` option of JSON light
- using PnP web part title control of @pnp/spfx-controls-react library
- showing SharePoint list data in Accordion format using React Accessible Accordion plugin
- searching in the fetched data by making use of Search Box from Office Fabric UI


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-accordion" />
