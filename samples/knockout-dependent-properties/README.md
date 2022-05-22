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
  - Knockout
  createdDate: 1/1/2016 12:00:00 AM
---
# Dependent Property Pane Properties

## Summary
Sample Web Part illustrating
* requesting Lists and Views data from SharePoint REST API
* creating Knockout dropdown custom component with Fabric UI styling
* creating dependent properties (dropdowns) in Client-Side Web Part Property Pane

![Sample Web Part implementing dependent properties in Property Pane](./assets/dep-props.png)


## Compatibility

![SPFx 1.0.1](https://img.shields.io/badge/SPFx-1.0.1-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)



## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

Solution|Author(s)
--------|---------
ko-dependent-properties | [Alex Terentiev](https://github.com/AJIXuMuK) (Sharepointalist Inc., @alexaterentiev)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 12, 2016|Initial release
1.1|May 20, 2017| Update to GA

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm i`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features
This project contains Client-Side Web Part built on the SharePoint Framework illustrating how to create dependent properties in Web Part Property Pane.
This Web Part illustrates the following concepts on top of the SharePoint Framework:

- loading Lists and Views data from SharePoint REST API
- creating custom Knockout data bindings
- creating custom Knockout components
- styling components to match Fabric UI experience
- creating custom Property Pane fields (custom markup, logic) based on Knockout.js framework

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20knockout-dependent-properties%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=knockout-dependent-properties) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20knockout-dependent-properties&template=bug-report.yml&sample=knockout-dependent-properties&authors=@AJIXuMuK&title=knockout-dependent-properties%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20knockout-dependent-properties&template=question.yml&sample=knockout-dependent-properties&authors=@AJIXuMuK&title=knockout-dependent-properties%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20knockout-dependent-properties&template=suggestion.yml&sample=knockout-dependent-properties&authors=@AJIXuMuK&title=knockout-dependent-properties%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/knockout-dependent-properties" />
