# React Carbon Footprint Calculator

## Summary

This SharePoint Framework (SPFx) web part provides users with an interactive calculator to estimate their monthly carbon footprint. It helps users visualize their CO₂ emissions through intuitive inputs such as electricity usage, transportation habits, and more. The solution uses React, Fluent UI, Chart.js for dynamic charts, and supports exporting results to PDF.

![Solution in Action](/assets/sample.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)

## Applies to

* [SharePoint Framework](https://aka.ms/spfx)
* [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to the [Microsoft 365 developer program](http://aka.ms/o365devprogram).

## Prerequisites

* Node.js LTS (recommended v14.x or newer)
* npm package manager
* SharePoint Online tenant for deployment and testing

## Solution

| Solution                          | Author(s)                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| react-carbon-footprint-calculator | João LIVIO, [pH7x Systems](https://www.ph7x.com), [LinkedIn](https://www.linkedin.com/in/jlivio/) |

## Version History

| Version | Date        | Comments                       |
| ------- | ----------- | ------------------------------ |
| 1.1     | May 8, 2025 | Added PDF export functionality |
| 1.0     | May 8, 2025 | Initial release                |

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* Navigate to the solution directory in your command line
* Run the following commands:

```bash
npm install
gulp serve
```

* Open your SharePoint Online workbench to test the web part.

## Features

This SPFx web part demonstrates the following features:

* Interactive sliders for real-time emissions calculation
* Dynamic chart visualization of carbon footprint
* Sustainable threshold indicators (green, yellow, red)
* PDF export capability for sharing results
* Tips for reducing carbon footprint

## References

* [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Building solutions for Microsoft Teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
* [Using Microsoft Graph in SPFx solutions](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
* [Publishing SPFx applications to Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
* [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Community-driven guidance, samples, and open-source tools.

![Visitor Stats](https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-carbon-footprint-calculator)
