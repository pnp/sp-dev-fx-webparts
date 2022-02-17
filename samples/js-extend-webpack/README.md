---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: tools
  technologies:
  - SharePoint Framework
  createdDate: 1/1/2016 12:00:00 AM
---
# Extending webpack in the SharePoint Framework toolchain

## Summary
[Webpack](https://webpack.github.io/) is a JavaScript module bundler that takes your JavaScript files and its dependencies and generates one or more JavaScript bundles so you can load different bundles for different scenarios.

One common task you would want to add to the SharePoint Framework toolchain is to extend the webpack configuration with custom loaders and plugins.

This sample shows how to use the webpack [markdown-loader](https://www.npmjs.com/package/markdown-loader) to preprocess markdown files to HTML string.

Read the following documentation for detailed information on working with webpack loaders in SharePoint Framework:

- [Extending webpack in the SharePoint Framework toolchain](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/extending-webpack-in-build-pipeline)

## Compatibility

![SPFx 1.3.0](https://img.shields.io/badge/SPFx-1.3.0-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
js-extend-webpack | [Chakkaradeep Chandran](https://github.com/chakkaradeep) (@chakkaradeep)
Updated to GA Version| [Velin Georgiev](https://github.com/VelinGeorgiev) ([@VelinGeorgiev](https://twitter.com/velingeorgiev))

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 25th, 2017|Initial release
1.1|July 9th, 2017|Updated to GA Version


## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

  ## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-extend-webpack%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-extend-webpack) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-extend-webpack&template=bug-report.yml&sample=js-extend-webpack&authors=@VelinGeorgiev%20@chakkaradeep&title=js-extend-webpack%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-extend-webpack&template=question.yml&sample=js-extend-webpack&authors=@VelinGeorgiev%20@chakkaradeep&title=js-extend-webpack%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-extend-webpack&template=suggestion.yml&sample=js-extend-webpack&authors=@VelinGeorgiev%20@chakkaradeep&title=js-extend-webpack%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-extend-webpack" />
