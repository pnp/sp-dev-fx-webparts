# Consuming Dataverse API using SPFx

## Summary

This project entails the development of a SharePoint Framework (SPFx) solution, designed to bridge the gap between Microsoft SharePoint and Dataverse. The main goal of the project is to enhance the potential of SharePoint by integrating it with Dataverse, a low-code data platform from Microsoft.

The SPFx solution will allow users to interact with data in the Dataverse environment directly from their SharePoint user interface. This allows for a more seamless and intuitive experience for end-users, who can access, manipulate, and analyze data without needing to switch between different platforms or applications.

![](./dataverseclient.PNG)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> SharePoint Online Client Extensibility Web Application Principal needs to have access to Dynamics CRM

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-dataverse | [Marcin Wojciechowski](https://github.com/mgwojciech) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | August 12, 2024 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- Using AadClientFactory to get authenticated http client for dataverse
- Selecting any available table
- Get data from dataverse


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
