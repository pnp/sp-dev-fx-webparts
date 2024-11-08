# react-listformatter

## Summary

 SharePoint Framework (SPFx) web part designed to help users format SharePoint Lists using predefined samples. It leverages React for the UI, PnPjs for SharePoint data operations, and Octokit for GitHub API interactions.

```mermaid
graph TD
    A[ListformattingWebpart]
    A --> B[SiteSelector]
    A --> C[ListSelector]
    A --> D[ColumnSelector]
    A --> E[ColumnTypeDisplay]
    A --> F[SampleGallery]
    F --> G[SampleModal]
    G --> H[ApplyButton]
    G --> I[SamplePreview]

    B --> J[useFetchSites]
    C --> K[useFetchLists]
    D --> L[useFetchFields]
    E --> M[useFetchColumnTypes]
    F --> N[useFetchColumnFormattingSamples]
    H --> O[useApplyColumnFormatting]
```

## Features

- Select a SharePoint site, list, and column
- Display the type of the selected column
- Browse and search formatting samples
- Display a preview of the samples, including the author and their profile picture
- Apply the column format directly to the selected column or open the sample in GitHub

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-formatter | [Luise Freese](https://linkedin.com/in/luisefreese) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | November 8, 2024 | Initial release |

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

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
