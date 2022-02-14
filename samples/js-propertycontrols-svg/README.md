# Dynamic Scalable Vector Graphics (SVG) image using propertie

## Summary

An SPFx web part that displays a Scalable Vector Graphics (SVG) image using properties to customize how it is rendered. The web part utilizes the PnP SPFx Property Controls package (specifially the SpinButton and ColorPicker) to set these properties.

![picture of the web part in action](./assets/js-propertycontrols-svg.gif)


## Compatibility

![SPFx 1.13.0](https://img.shields.io/badge/SPFx-1.13.0-green.svg) 
![Node.js v6](https://img.shields.io/badge/Node.js-v14-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Which PnP SPFx controls are being used in this sample?

* [PropertyFieldSpinButton](https://github.com/pnp/sp-dev-fx-property-controls/wiki/PropertyFieldSpinButton)
* [PropertyFieldColorPicker](https://github.com/pnp/sp-dev-fx-property-controls/wiki/PropertyFieldColorPicker)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [sp-dev-fx-property-controls](https://github.com/pnp/sp-dev-fx-property-controls)
* [PnP Man](https://github.com/thechriskent/PnPMan)

## Solution

Solution|Author(s)
--------|---------
js-propertycontrols-svg | Chris Kent ([thechriskent.com](https://thechriskent.com), [@thechriskent](https://twitter.com/thechriskent))

## Version history

Version|Date|Comments
-------|----|--------
1.1|December 30, 2021|Update to SPFx 1.13.0
1.0|November 12, 2017|Initial release



## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`
- Customize your PnP Hero!

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features
Displays a Scalable Vector Graphics (SVG) image of the SharePoint Patterns and Practices Super Hero and allows users to customize the colors used and the size of the image through the use of PnP SPFx Property Controls (SpinButton & ColorPicker).

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Rendering an SVG image
- Using a PropertyFieldSpinButton control
- Using a PropertyFieldColorPicker control

![Screenshot](./assets/js-propertycontrols-svg.png)


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**



<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-propertycontrols-svg" />
