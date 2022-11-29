# react-google-drive-client

## Summary

This sample shows how to configure authentication against Google services. In particular I focused on authentication and consuming document search.
Important case here is authentication in Teams client, which requires a little more complex flow and some hacks to make it work correctly.


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.16-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Setup an app in Google Developer Console to be able to consume Google Drive API.

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-google-drive-client | [Marcin Wojciechowski](https://github.com/mgwojciech) [@mgwojciech](https://twitter.com/mgwojciech) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | November 29, 2022 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Register Your Google app in Google Developer Console
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**
- For Teams support You need to deploy this web part to any page and the set defaultCallbackPageUrl in src\webparts\googleDriveClient\GoogleDriveClientWebPart.ts
  
## Features

This extension illustrates the following concepts:

- Authentication to Google services from SharePoint
- Authentication to Google services from MS Teams
- Consuming Google Drive search service with obtained token.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
