# react-personal-greeting

## Summary

The web part pulls in the current user's name and displays it on the page. The greeting text before the name is customizable through the property pane. Additionally the position of the greeting and color of the text can be adjusted through the property pane as well.

![picture of the web part in action](assets/react-personal-greeting.gif)

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
* [PnP SPFx Controls](https://sharepoint.github.io/sp-dev-fx-controls-react)
* [PnP SPFx Property Controls](https://sharepoint.github.io/sp-dev-fx-property-controls)

## Prerequisites


## Solution

Solution|Author(s)
--------|---------
react-personal-greeting|Zach Roberts - [SPODev](https://spodev.com)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 14, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp build`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* add the webpart to your tenant app store
* add the app to a SharePoint site and then add the webpart to the page


## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using the SPFx context to gather the current user's display name.
* Adjusting the styles of the component in the webpart using the props adjusted through the property pane.
* PnP SPFx Placeholder - This component allows you to have a placeholder visble under certain conditions if your web parts requires some setup.
* PnP SPFx Color Picker - This component adds an awesome color picker to the property pane, great for adjusting colors in your webpart.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-personal-greeting" />
