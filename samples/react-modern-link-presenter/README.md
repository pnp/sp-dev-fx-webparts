# Modern Link Presenter

## Summary

A modern, customizable web part for managing and displaying links in various layouts in SharePoint and Teams. Modern Link Presenter is a flexible SharePoint Framework (SPFx) web part that allows users to manage and present collections of links in various modern layouts. Features include: configurable link properties (title, URL, icon, description, summary, color, target, display format), multiple output formats (simple links, links with icons, inline tiles, and rich tile layouts), individual color and display customization per link, search and filter functionality, and support for opening links in new tabs, within the same tab, or in a modal dialog. The tile layout offers additional customization such as tile size, mouseover effects, and button text. The web part is fully localizable, supports accessibility, and is ideal for creating modern dashboards, resource panels, or curated link collections in SharePoint Online and Microsoft Teams.

![UI of the links](assets/modernlink-01.png)

![Open detail page in dialog](assets/modernlink-02.png)

[![SharePoint: Verwalten und Anzeigen von Links](https://img.youtube.com/vi/nLRxo9XBwag/hqdefault.jpg)](https://youtu.be/nLRxo9XBwag)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.21.1](https://img.shields.io/badge/SPFx-1.21.1-green.svg)
![Node.js v22](https://img.shields.io/badge/Node.js-v22-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Partially](https://img.shields.io/badge/Local%20Workbench-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Install the App and just configure the links within the WebPart properties.

## Contributors

- [Marc André Schröder-Zhou](https://github.com/maschroeder-z)

## Solution

| Solution    | Author(s)                                                   |
| ----------- | ----------------------------------------------------------- |
| Repository  | Marc André Schröder-Zhou (<https://github.com/maschroeder-z>) |

## Version history

| Version | Date             | Comments              |
| ------- | ---------------- | --------------------- |
| 1.0     | 18.10.2025       | Initial Release       |


## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Check your current Node version and installed SPFx-Framework version.

## Features

- Automatic creation of a list of stored links.
- Linked content can be opened directly in a dialog, making it easy to integrate additional information.
- Built-in search function for quickly finding links.
- Various tile effects on mouseover.
- Background colors can be specified for each link.
- Automatically ensures readable text by automatically setting a contrasting color for the text color.

## Help

Please contact me for further help or information about the sample.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-modern-link-presenter" />
