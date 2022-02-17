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
![Node.js v6](https://img.shields.io/badge/Node.js-LTS%206.x-green.svg) 
![SharePoint 2019 | Online](https://img.shields.io/badge/SharePoint-2019%20%7C%20Online-yellow.svg)
![Teams No: Not designed for Microsoft Teams](https://img.shields.io/badge/Teams-No-red.svg "Not designed for Microsoft Teams")
![Workbench Local | Hosted](https://img.shields.io/badge/Workbench-Local%20%7C%20Hosted-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

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
react-image-editor | [Peter Paul Kirschner](https://github.com/petkir) ([@petkir_at](https://twitter.com/petkir_at))

Thanks to [celum](https://www.celum.com/) and [cubido](https://www.cubido.at/) to allow to share this code.

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Mar 17, 2021|Initial release

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - edit `config\serve.json` set `"initialPage": "https://{tenant}.sharepoint.com/_layouts/15/workbench.aspx"`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Usage

* PNP Placeholder control if not Configured
* PNP WebPartTitle control  (toggle Show/Hide in property pane)
* PNP FilePicker control to pick Images (is mocked on local workbench)
* Office UI Fabric

## Video

[![Building an advanced SPFx Image Editor web part](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=aNvvFz8Ab5Y "Building an advanced SPFx Image Editor web part")

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-image-editor") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-image-editor) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-image-editor&template=bug-report.yml&sample=react-image-editor&authors=@petkir&title=react-image-editor%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-image-editor&template=question.yml&sample=react-image-editor&authors=@petkir&title=react-image-editor%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-image-editor&template=question.yml&sample=react-image-editor&authors=@petkir&title=react-image-editor%20-%20).



## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-image-editor" />
