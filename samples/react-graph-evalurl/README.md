# Url validation for SharePoint using Office Graph

### Summary 
This sample contains a class that evaluates the url input of a text field against the Microsoft Graph. It is possible to evalute the existance of the following three SharePoint Elements:

* Site Collection
* Web Site
* Lists and Document libraries

The web part shows all those three examples and the results returned by the Microsoft Graph.

![Evaluation Client searching for suitable site collection][figure1]

### Usage

To evaluate the web part the input for site collection, web site or list and document library simply place a URL from your tenant in one of the text fields shown above. After the text field loses `onblur` its focus the evaluation happens automatically in the background and showing the debug information in the debugging information.

![Evaluation of web site with current debug information][figure2]

### Project Setup and important files

```txt
src
└── webparts
    └── graphEvalUrl
        ├── GraphEvalUrlWebPart.manifest.json
        ├── GraphEvalUrlWebPart.ts
        ├── components
        │   ├── GraphEvalClient.ts    **<-- Evalution Class**
        │   ├── GraphEvalDebug.tsx    **<-- Debug Panel Component**
        │   ├── GraphEvalUrl.module.scss
        │   ├── GraphEvalUrl.module.scss.ts
        │   ├── GraphEvalUrl.tsx      **<-- Demo Control for web part**
        │   └── IGraphEvalUrlProps.ts
        └── loc
            ├── en-us.js
            └── mystrings.d.ts
```

## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v6 | v8](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20v8-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to Microsoft Graph")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Demo
![Evaluation of web site with current debug informations][figure3]

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Solution

Solution|Author(s)
--------|---------
react-graph-evalurl|[Stefan Bauer](https://github.com/n8design) (MVP, Stefan Bauer - N8D, [@stfbauer](https://twitter.com/stfbauer) )

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 15, 2018|Initial release

## Prerequisites

- SharePoint Online tenant with Office Graph content
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- clone this repo
- `$ npm i`
- `$ gulp serve --nobrowser`
- Open workbench on your tenant, ie. https://contoso.sharepoint.com/sites/salestesm/_layouts/15/workbench.aspx
- Search and add web part "Graph - Eval Url"

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample web part shows how URLs in SharePoint can be checked and evaluated against the Microsoft Graph. This scenario and the introduced class can be use to evluate not only user input but can also be used in the configuration panel of web parts. The benefit is that the URL of the target location remains visible and can be use for debugging reasons to.
The class returns all the Graph objects identified during the evaluation process. It can also be used in backend code.

- using React for building SharePoint Framework Client-side Web Parts
- using Office UI Fabric React components
- create additional custom react components
- access information from the Microsoft Graph using SharePoint Framework version 1.4.1 and above
- using ES6 Promises with vanilla-JavaScript web requests

## Limitations
To identify a list or document library the following two token will be use:

* 'Forms' - View or SharePoint List Form for document libraries
* 'Lists' - SharePoint stores all lists in the sub folder lists so this will be use to identify if a list is present in the URL


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-graph-evalurl") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-graph-evalurl) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-graph-evalurl&template=bug-report.yml&sample=react-graph-evalurl&authors=@n8design&title=react-graph-evalurl%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-graph-evalurl&template=question.yml&sample=react-graph-evalurl&authors=@n8design&title=react-graph-evalurl%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-graph-evalurl&template=question.yml&sample=react-graph-evalurl&authors=@n8design&title=react-graph-evalurl%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-graph-evalurl" />

[figure1]: ./assets/evaluation-client-searching-for-site-collection.png
[figure2]: ./assets/eval-web-after-site-collection.png
[figure3]: ./assets/url-graph-eval.gif
