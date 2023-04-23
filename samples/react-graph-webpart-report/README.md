# Web Part Report

## Summary

This sample web part shows a report of the web parts used on the current site.

![Chart View](./assets/chartView.png)

![List View](./assets/listView.png)

![Animated](./assets/Animated.gif)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Microsoft Graph permission:

- Sites.Read.All

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-graph-webpart-report | [Aimery Thomas](https://github.com/a1mery) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | March 23, 2023 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp bundle`
  - `gulp package-solution`
- Deploy the package to your app catalog
- Approve the API permission request from the SharePoint admin
- Add the web part to a page
- In the command-line run:
  - `gulp serve --nobrowser`


## Features

This webpart illustrates the following concepts:

- Consume the Microsoft Graph API from SPFx web part
- Use of the SharePoint Pages Microsoft Graph API
- Use of [@pnp/spfx-property-controls](https://pnp.github.io/sp-dev-fx-property-controls/) (ListView and CharControl)
- Use of Top Actions


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Adding support for web part Top Actions](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/getting-started-with-top-actions)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [@pnp/spfx-controls-react](https://pnp.github.io/sp-dev-fx-controls-react/)
