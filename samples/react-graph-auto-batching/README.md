# react-graph-auto-batching

## Summary

This same shows how to abstract batching graph requests. The idea behind this sample is quite simple. To render simple user card we need three calls to MS GraphAPI.
First one to get user information, second to get the image and third to get the presence. As with rendering multiple user card we may hit graph throttling, 
it is a good idea to batch those requests. This might create quite a repetition across our solution.
To avoid such situation, we can implement composition pattern to abstract that batch generation. This design pattern will also help us with unit testing.

This is the second idea behind this sample. It provides few unit tests of quite a complex implementation detail, which auto batching is.
You can also find how one can test react component in SPFx stack in isolation, by providing mock to all data access layer implementation.

Finally, let me know if You would like to see this auto batcher in some library You can import to Your solution.

You may ask why I used AadHttpClient instead of MSGraphClient. AadHttpClient shares more similarity with a http client based on fetch api, this means it will be easier to adopt this solution to an implementation outside of SPFx. 

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to 

## Prerequisites

None

## Solution

Solution|Author(s)
--------|---------
react-graph-auto-batching | Marcin Wojciechowski [@mgwojciech](https://twitter.com/mgwojciech)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 3, 2022|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**
- Add Graph Auto Batching

To run tests
 Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **npx jest**

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