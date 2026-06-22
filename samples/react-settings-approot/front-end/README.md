# Personal Settings Web Part

## Summary

This package contains a SharePoint Framework (SPFx) web part that allows users to manage their personal configuration settings securely using a backend Azure Function API and Microsoft Graph special folders (approot).

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?
See the root README.md for full solution setup and deployment instructions.

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| front-end | Paolo Pialorsi | Microsoft ([LinkedIn](https://www.linkedin.com/in/paolopialorsi/)) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | July 1st, 2025 | Initial release |

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

This sample shows how to handle personal user settings relying on a back-end REST API, which internally uses the Microsoft Graph special folder approot.

This extension illustrates how to:

- Store, read, remove, and list personal settings
- Secure authentication with Entra ID (Azure AD)
- React functional components and TypeScript

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [SPFx Web Parts](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts)
- [Microsoft Graph Special Folders](https://learn.microsoft.com/en-us/graph/api/drive-get-specialfolder?view=graph-rest-1.0&tabs=http)
- [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [On-Behalf-Of Flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow)