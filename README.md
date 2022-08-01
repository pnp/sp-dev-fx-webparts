# palette-picker

## Summary

Custom Property Pane pain resolved (whew), color palette generator inspired by [Jhey](https://codepen.io/jh3y/pen/rNjbmBQ?editors=0011).
Built it to get an understanding of [Property Pane Portal](https://www.npmjs.com/package/property-pane-portal) and cuz I want to eventually build in a dynamic palette generator/css reader for my web parts.

![property pane view](images/palettePickerWebPart.gif)
![after save and refresh](images/palettePickerWebPartAfterSaveAndRefresh.gif)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

The standard stoic perserverance required for spFx development.

## Solution

Solution|Author(s)
--------|---------
react Palette Picker Web Part | [Linda K](https://github.com/flowerbot)

## Version history

Version|Date|Comments
-------|----|--------
1.0|August, 2022|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**


## Features

Multi-parameter sliders* in property pane from [react-range](https://www.npmjs.com/package/react-range), dynamic colour updating, css snippet generation, apply colours to MS dropdown component options.  

 * PnP - please consider :)

This web part illustrates the following concepts:

- custom property pane
- dynamic css in spFx property pane 
- custom css colour on dropdown options


> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Property Pane Portal](https://blog.pathtosharepoint.com/2021/07/29/introducing-the-property-pane-portal/) (thank you Christophe!)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development