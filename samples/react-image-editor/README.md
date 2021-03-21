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
  createdDate: 3/17/2021 12:00:00 AM
---

# React Image Editor


## Summary

This solution contains an SPFx web part that shows an HTML Image Editor based on canvas and [Office UI Fabric](https://developer.microsoft.com/fluentui/). 

Key features of the Editor

* Resize
* Crop
* Flip
* Rotate
* Scale
* Filter (Grayscale / Sepia)
* Redo / Undo
* Histoy of Actions

The Placeholder and FilePicker are components from the [sp-dev-fx-controls-react ](https://pnp.github.io/sp-dev-fx-controls-react/)

![react-image-editor in action](assets/react-image-editor.gif)


## Compatibility

![SPFx 1.4.0](https://img.shields.io/badge/SPFx-1.4.0-green.svg)
![Node.js LTS 6.x](https://img.shields.io/badge/Node.js-LTS%206.x-green.svg) 
![SharePoint 2019 | Online](https://img.shields.io/badge/SharePoint-2019%20%7C%20Online-yellow.svg)
![Teams No: Not designed for Microsoft Teams](https://img.shields.io/badge/Teams-No-red.svg "Not designed for Microsoft Teams")
![Workbench Local | Hosted](https://img.shields.io/badge/Workbench-Local%20%7C%20Hosted-green.svg)

References to office-ui-fabric-react version 5.x because of SharePoint 2019 Support

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> SharePoint Online or SharePoint 2019

## Solution

Solution|Author(s)
--------|---------
react-image-editor | Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))

Thanks to [celum](https://www.celum.com/) and [cubido](https://www.cubido.at/) to allow to share this code.

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Mar 17, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - edit config\serve.json set "initialPage": "https://{tenant}.sharepoint.com/_layouts/15/workbench.aspx"
  - **gulp serve**

> Include any additional steps as needed.

## Usage

* PNP Placeholder control if not Configured
* PNP WebPartTitle control  (toggle Show/Hide in property pane)
* PNP FilePicker control to pick Images (is mocked on local workbench)
* Office UI Fabric


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-image-editor" />
