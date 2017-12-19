# React Project Online

## Summary
This sample shows how to use SPFx to consume data from the Project Online REST API. The code uses Placeholder and ListView [reusable controls](https://github.com/SharePoint/sp-dev-fx-controls-react) to create a better experience to the end user.
The web part is intended to be used on a project site within PWA site collection, as the web url used for the rest calls is being taken from the web part context object. To use this web part outside of the PWA site collection, just add a new property to the web part to allow the PWA site collection url to be configured (or when provisioning through a provisioning mechanist).
The web part is currently returning project tasks as a simple proof of concept.

![Demo](./assets/Preview.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)
* [Project Online](https://dev.office.com/docs/add-ins/overview/office-add-ins?product=project)

## Prerequisites
 
- Office 365 subscription with SharePoint Online and Project Online licence
- SharePoint Framework [development environment](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment) already set up.
-Project site with some tasks available.

## Solution

Solution|Author(s)
--------|---------
react-project-online|Joel Rodrigues


## Version history

Version|Date|Comments
-------|----|--------
1.0|October 29, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

## Features
This Web Part illustrates the following concepts on top of the SharePoint Framework:

-Using the SharePoint rest API for querying web properties.
-Using the Project Online rest API for retrieving project tasks.
