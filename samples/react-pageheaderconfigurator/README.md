# Modern page header configurator and custom property pane color picker control built in React

## Summary
A web part to be added to modern site pages to allow configuration of the page banner. The web part allows you to pick the banner size or hide it, override the default background graphics, and change the page headline color.

*Note: This web part injects CSS into the page to override the default CSS provided by a modern page. If the default CSS changes, this web part will no longer work. It is the wish of the author that Microsoft adds this capability as part of a modern page.*


![site page header configurator web part](./assets/site-page-header-configurator.gif)

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-v1-green.svg)

## Applies to

* [SharePoint Framework Release 1](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* Modern site pages in SharePoint Online

## Solution

Solution|Author(s)
--------|---------
page header configurator | Mikael Svenson ([@mikaelsvenson](http://www.twitter.com/mikaelsvenson), [techmikael.com](techmikael.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 7th, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- In the command line run:
  - `npm install`
  - `gulp clean`
  - `gulp`
  - `gulp package-solution`
  - [Deploy the package to the App catalog and install on a site](https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page)

## Features
This web part illustrates the following concepts on top of the SharePoint Framework:

- Creating a color picker as a custom property pane control
- Office UI Fabric
- React