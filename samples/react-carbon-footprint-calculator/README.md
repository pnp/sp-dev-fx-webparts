# Carbon Footprint Calculator

## Summary

This SharePoint Framework (SPFx) web part provides users with an interactive calculator to estimate their monthly carbon footprint.

It helps users visualize their CO₂ emissions through intuitive inputs such as electricity usage, transportation habits, and more.

The solution uses **React**, **Fluent UI**, and **Chart.js** for dynamic charts, and supports exporting results to **PDF**.

![Solution in Action](./assets/sample.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.21.1](https://img.shields.io/badge/SPFx-1.21.1-green.svg)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://aka.ms/spfx)
* [Microsoft 365 tenant](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to the [Microsoft 365 developer program](https://aka.ms/o365devprogram)

## Prerequisites

* Node.js LTS (v18.x recommended)
* npm package manager
* SharePoint Online tenant for testing

## Contributors

* [João LIVIO](https://github.com/jtlivio)

## Version History

| Version | Date        | Comments                       |
| ------- | ----------- | ------------------------------ |
| 1.1     | May 8, 2025 | Added PDF export functionality |
| 1.0     | May 8, 2025 | Initial release                |



## Minimal Path to Awesome

To test this solution in your environment:

```bash
npm install
gulp serve
```

> Open SharePoint Online Workbench to load the web part.

## Features

This SPFx web part demonstrates the following features:

* Interactive sliders for real-time emissions calculation
* Dynamic chart visualization of carbon footprint
* Sustainable threshold indicators (green, yellow, red)
* PDF export capability for sharing results
* Tips for reducing carbon footprint

## References

* [Getting started with SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Building solutions for Microsoft Teams](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
* [Using Microsoft Graph in SPFx solutions](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
* [Publishing SPFx applications to Marketplace](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
* [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) – Community-driven guidance, samples, and open-source tools

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-carbon-footprint-calculator%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-carbon-footprint-calculator) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-carbon-footprint-calculator&template=bug-report.yml&sample=react-carbon-footprint-calculator&authors=@jtlivio&title=react-carbon-footprint-calculator%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-carbon-footprint-calculator&template=question.yml&sample=react-carbon-footprint-calculator&authors=@jtlivio&title=react-carbon-footprint-calculator%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-carbon-footprint-calculator&template=suggestion.yml&sample=react-carbon-footprint-calculator&authors=@jtlivio&title=react-carbon-footprint-calculator%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-carbon-footprint-calculator" />

