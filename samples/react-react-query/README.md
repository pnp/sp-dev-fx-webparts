# react-react-query

## Summary

This sample shows how to use react query library and react hooks with SPFx. Main focus is on contextually centralized MS Graph Client to avoid calls duplication.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.15-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/m365devprogram)

## Prerequisites

> MS SPO Extensibility Principal should be provisioned and access to MS Graph API with User.Read should be granted before running this sample.

## Contributors

*  Marcin Wojciechowski [@mgwojciech](https://twitter.com/mgwojciech)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | October, 19 | Initial release |

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

The idea of this sample is simple. Quite often in our solutions we need to use data from one endpoint in multiple places. I think the most common scenario might be displaying current user info.

One of the most popular libraries to handle http requests in React is [react-query](https://react-query-v3.tanstack.com/). This library simplifies http calls by providing easy to use react hook.

You can see, that although we are rendering user four times, there is only one batched request to MS Graph API. Note, I implemented three different user components to test nesting case as well as using the same hook in different component.

Additional benefit of such approach is better isolation from SPFx itself. Not only it would be easier to move this solution from SPFx to simple React project (should You need to expose similar functionality outside of SharePoint context), but it improved testability of the solution. I added two tests to the solution: User.test.tsx - which mocks whole context and UserMockHook which benefits from the fact, that we can mock only useUserQuery hook.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
