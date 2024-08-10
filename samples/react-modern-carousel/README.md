# Modern Carousel

## Summary

This SharePoint Framework (SPFx) web part introduces a contemporary carousel component leveraging Swiper, facilitating seamless traversal through content housed within a SharePoint site. This innovative feature enhances user experience by providing fluid navigation through various pieces of content, thereby adding a touch of elegance and sophistication to the SharePoint environment.

![Award Recognition](./assets/AwardRecognition.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

This sample is optimally compatible with the following environment configuration:

![SPFx 1.18.2](https://img.shields.io/badge/SPFx-1.18.2-green.svg)
![Node.js v18 | v16](https://img.shields.io/badge/Node.js-v18%20%7C%20v16-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-red.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-red.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Create a SharePoint custom list `Award Recognition` in the SPO site with below columns

| Column Name  | Type |
| ------- | --------------- |
| Title | OOTB |
| Designation | Text |
| UserImage | Image |

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-modern-carousel| Sandeep P S ( [LinkedIn](https://www.linkedin.com/in/sandeepps1299/) ) / Quadrasystems.net ( [Twitter](https://www.linkedin.com/company/quadrasystems.net-india-pvt-ltd) / [LinkedIn](https://www.linkedin.com/company/quadrasystems.net-india-pvt-ltd) ) |

## Contributors🧑‍💻

- [Sandeep P S](https://github.com/Sandeep-FED)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | March 16, 2024   | Initial release  |

## Minimal Path to Awesome⚡

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp serve`

## Deploy Package Solution 🚀

- Ensure that you are at the solution folder
- in the command-line run:
  - `gulp build --ship`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Upload package to AppCatalog & add it to the SharePoint site.

## Features💡

Key features demonstrated by this solution:

- Property pane controls usage
- PnP react hooks usage
- Type checking

## References

- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development.
- [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [PnP JS](https://pnp.github.io/pnpjs/)
- [PnP React Hooks](https://superioone.github.io/pnp-react-hooks/)
- [SwiperJS](https://swiperjs.com)
- [React Docs](https://react.dev/learn)

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-feedback-widget&template=bug-report.yml&sample=react-feedback-widget&authors=@Sandeep-FED&title=react-feedback-widget%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-feedback-widget&template=question.yml&sample=react-feedback-widget&authors=@Sandeep-FED&title=react-feedback-widget%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-feedback-widget&template=question.yml&sample=react-feedback-widget&authors=@Sandeep-FED&title=react-feedback-widget%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![react-modern-carousel](https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-modern-carousel)
