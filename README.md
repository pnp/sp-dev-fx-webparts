# react-cherry-picked-content

## Summary

The Cherry=Picked Content Web Part is a modern replacement for the classic Content Editor Web Part, with a twist: code snippets can only be picked from approved document libraries.

![React Cherry=Picked Content Sample](./assets/React-Cherry-Picked-Content-Sample.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.14.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Start by editing the ApprovedLibraries.ts file to list your approved libraries. Then upload your code snippets to those locations. If you are looking for ideas, check out the samples folder.

The code can be rendered in two ways:
- isolated: the code is wrapped in an iframe to prevent conflicts with other Web Parts. Note: this is not a security feature.
- non isolated: the code is directly inserted in the page.

## Solution

Solution|Author(s)
--------|---------
React-Cherry-Picked-Content | [Christophe Humbert](https://github.com/PathToSharePoint)

## Version history

Version|Date|Comments
-------|----|--------
0.2.0|March 6, 2022|Refactoring
0.1.0|February 21, 2022|Initial draft

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Under components, edit ApprovedLibraries.ts to list your approved libraries that contain HTML snippets
- Upload the code snippets
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## Features

This Web Part illustrates the following concepts:

- Cascading dropdown and conditional display in the Property Pane
- Use of SPHttpClient and the SharePoint REST API to query SharePoint content
- React function component with useState and useEffect hooks
- React Portal in combination with iframe
- Various examples of client-side code in the samples: Microsoft Graph Toolkit (people, email, agenda), charts, widgets (map, stock, countdown, clock, video).

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-cherry-picked-content" />