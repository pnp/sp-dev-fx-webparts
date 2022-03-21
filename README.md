# React-PPP-PnP-Controls

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Compatibility

![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Summary

The React-PPP-PnP-Controls sample showcases the use of the [Property Pane Portal](https://www.npmjs.com/package/property-pane-portal) to display the [PnP SPFx React controls](https://github.com/pnp/sp-dev-fx-controls-react) (version 3.7.0) in the SPFx Property Pane.
> We are NOT using the [SPFx Property Controls](https://github.com/pnp/sp-dev-fx-property-controls), that's the point of the sample.

![React-PPP-PnP-Controls-Sample](./assets/React-PPP-PnP-Controls-Sample.png)

## Used SharePoint Framework Version

![1.15.0.beta](https://img.shields.io/badge/version-1.15.0.beta-green.svg)

## Solution

Solution|Author(s)
--------|---------
React-PPP-PnP-Controls | [Christophe Humbert](https://github.com/PathToSharePoint)


## Version history

Version|Date|Comments
-------|----|--------
0.1.0|March 20, 2022|

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

This sample showcases the use of the **Property Pane Portal** NPM module. It allows us to use PnP SPFx React controls in the Property Pane, without the need to build custom property controls.

The Property Pane Portal module includes:
- The PropertyPaneHost function, which creates placeholders in the Property Pane
- The PropertyPanePortal component, which leverages React Portals to teleport React components to the Property Pane.

Implemented controls:
- Location Picker
- People Picker
- List Picker and List Item Picker (cascading selection)

> There's a minor issue with the [Location Picker](https://github.com/pnp/sp-dev-fx-controls-react/issues/1125) of the SPFx React Controls library in v3.7.0, it'll be addressed in the next release.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-ppp-pnp-controls" />