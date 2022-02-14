# Graph auto batching

## Summary

This same shows how to abstract batching graph requests. The idea behind this sample is quite simple. To render simple user card we need three calls to MS GraphAPI.
First one to get user information, second to get the image and third to get the presence. As with rendering multiple user card we may hit graph throttling, 
it is a good idea to batch those requests. This might create quite a repetition across our solution.
To avoid such situation, we can implement composition pattern to abstract that batch generation. This design pattern will also help us with unit testing.

This is the second idea behind this sample. It provides few unit tests of quite a complex implementation detail, which auto batching is.
You can also find how one can test react component in SPFx stack in isolation, by providing mock to all data access layer implementation.

Finally, let me know if You would like to see this auto batcher in some library You can import to Your solution.

You may ask why I used AadHttpClient instead of MSGraphClient. AadHttpClient shares more similarity with a http client based on fetch api, this means it will be easier to adopt this solution to an implementation outside of SPFx. 


## Compatibility

![SPFx 1.13.0](https://img.shields.io/badge/SPFx-1.13.0-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

None

## Solution

Solution|Author(s)
--------|---------
react-graph-auto-batching | [Marcin Wojciechowski](https://github.com/mgwojciech) [@mgwojciech](https://twitter.com/mgwojciech)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 3, 2022|Initial release

## Minimal Path to Awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-graph-auto-batching) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-graph-auto-batching`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

- Add Graph Auto Batching

To run tests
* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-graph-auto-batching) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-graph-auto-batching`, located under `samples`)
* in the command line run:
  * `npm install`
  * `npx jest`

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- User Card using auto batching requests to MS Graph Client
- Unit testing batching client using mocked http client 
- Unit testing React component in SPFx 
  - In total isolation
  - Awaiting the **useEffect(()=>{},[])** operation

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- You can find more on unit testing on my [Blog](https://mgwdevcom.wordpress.com)


## Help


We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-graph-auto-batching%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-graph-auto-batching) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-graph-auto-batching&template=bug-report.yml&sample=react-graph-auto-batching&authors=@mgwojciech&title=react-graph-auto-batching%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-graph-auto-batching&template=question.yml&sample=react-graph-auto-batching&authors=@mgwojciech&title=react-graph-auto-batching%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-graph-auto-batching&template=suggestion.yml&sample=react-graph-auto-batching&authors=@mgwojciech&title=react-graph-auto-batching%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-graph-auto-batching" />
