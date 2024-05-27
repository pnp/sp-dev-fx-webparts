# app-insights-spfx-webparts

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Application Insight Service on Azure
Add the connection stirng of this Service to the the variable ```AIConnectionString``` at ```src/EnvProps.ts```

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | Mai 26, 2024 | Initial release |

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

- Sample Router WebPart 
      - Using Hash Router and use Page Tracking
- ABTest WebPart (check User activity)
    - Event Tracking
    - Logging
- PnP JS Logger
    - Logging with PnPJS
- Custom Logger
    - Logging with PnPJS

# Sample Router WebPart

How is your application used by Users
![Sample WebPart Screen](assets/SampleRouterUI.png.png)
Analyse in Application Insight
![UserFlow by Session](assets/SampleRouterUserFlow.png)

Query in Application Insights Count PageViews
```
pageViews 
| where name contains "Page"
| where cloud_RoleName contains "app-insights-spfx-webparts"
| where cloud_RoleInstance contains "SampleRouterWebPart"
| where timestamp >= ago(8h)
| summarize count()  by name
| render barchart 
```
![Page visit count evaluation](assets/SampleRouterEvaluation.png)

Query in Application Insights Avarage Page visit duration by PageName
```
customMetrics 
| where name contains "PageVisitTime"
| where customDimensions.PageName contains "Page"
| where cloud_RoleName contains "app-insights-spfx-webparts"
| where cloud_RoleInstance contains "SampleRouterWebPart"
| where timestamp >= ago(8h)
| summarize avg(value)  by tostring(customDimensions.PageName)
| render barchart 
```
![Page visit duration evaluation](assets/SampleRouterDurationEvaluation.png)

# AB-Test WebPart

How users add new items?
![AB UI Screen](assets/ABTextUI.png)

Query in Application Insights
```
customEvents 
| where name contains "AddItem"
| where cloud_RoleName contains "app-insights-spfx-webparts"
| where cloud_RoleInstance contains "ABTestWebPart"
| where timestamp >= ago(1h)
| summarize  count()  by name
| render barchart 
```
![AB Evaluation](assets/ABEvaluation.png)

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
