# File Upload

## Summary
The file upload web part allowing users to upload multiple files to a document library or as item attachments.

![File upload web part built on the SharePoint Framework using React](./assets/SPFileUploadPreview.gif)


## Compatibility

![SPFx 1.4.0](https://img.shields.io/badge/SPFx-1.4.0-green.svg)
![Node.js v6 ](https://img.shields.io/badge/Node.js-LTS%206-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Prerequisites
 
> Site Collection created under the **/sites/** Managed Path
> Existing document library or a list

## Solution

Solution|Author(s)
--------|---------
react-file-upload|[Ramin Ahmadi](https://github.com/AhmadiRamin)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|February 14, 2018|Initial release

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features
This project contains sample client-side web parts built on the SharePoint Framework using React illustrating working with file upload web part.
This sample illustrates the following concepts on top of the SharePoint Framework:
- using React for building SharePoint Framework client-side web parts
- using React components for building file upload web part
- using [DropzoneJs](http://www.dropzonejs.com/) for uploading files
- uploading files to a document library
- uploading files as item attachments by getting the item ID from the query string parameter
- uploading files using RestAPI
- drag and drop feature for uploading files
- ability to remove uploaded files
- ability limit users to upload accepted file types
- using sp-pnp-js to delete uploaded files

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-file-upload%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-file-upload) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-file-upload&template=bug-report.yml&sample=react-file-upload&authors=@AhmadiRamin&title=react-file-upload%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-file-upload&template=question.yml&sample=react-file-upload&authors=@AhmadiRamin&title=react-file-upload%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-file-upload&template=suggestion.yml&sample=react-file-upload&authors=@AhmadiRamin&title=react-file-upload%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-file-upload" />

