# Filterable Image Gallery

## Summary
This sample describes an SPFx application which implements an image gallery with taxonomy base filtering and typed search. This application also implements pagination.


![Filterable Image Gallery web part built on the SharePoint Framework using React](./assets/image-gallery.gif)


# Compatibility

![SPFx 1.6](https://img.shields.io/badge/SPFx-1.6.0-green.svg) 
![Node.js v8 | v6](https://img.shields.io/badge/Node.js-v8%20%7C%20v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-image-gallery | Ejaz Hussain

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 01, 2019|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`


- Create a Department Term set with associated child terms, for example, HR, Information Services, Sales, Marketing
- Create an Image Library and add some sample images
- Tag each image with Department Metadata Column
- Also fill in Title field for each image, this is require for typed search functionality

## Features
Here are the main features for this application

- Taxonomy-based filtering
- Typed Search
- Right-side popup panel
- Server-side pagination using REST API

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-image-gallery" />
