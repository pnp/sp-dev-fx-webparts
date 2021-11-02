# World Clocks

## Summary

- This sample is extension of the single World time clock sample that was provided in SP Starter Kit.
- This web part use SharePoint List to Show multiple Clocks.
- Each clock item can have Name, Timezone and status (Active, Yes/No).
- The web part properties will allow you to enter Web Part Title and select a List.
- The web part properties will allow you to show or hide time.
- You can show or hide clocks by setting the status to active or inactive.
- The web part does not update automatically. [Someone need to make the React Tick :)]

![Web Part](./assets/WebPart.png)

### Web Part in Action

![Web Part in Action](./assets/ClocksInAction.gif)

### Usage

**1) Create or use a list for World Clocks. The List should have the following Columns:**

- Title, GMTValues, ListOrder, IsActive.

![Create list for use with the World Clocks](./assets/WorldClockList.png)

- [World Clocks list Template for use with the Web Part](./assets/WorldClock.stp)
- [World Clocks Site Script use with the Web Part](./assets/WorldClock.json)

**2) Add the World Clocks web part to your page & Enter Title, Select List. You can also enable the other required settings.**

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to a list")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

- A package is available for direct download.

Please create the list as described above

## Solution

| Solution              | Author(s)                                |
| --------------------- | ---------------------------------------- |
| World Clocks Web Part | [Jerry Yasir](https://github.com/jyasir) |

## Version history

| Version | Date               | Comments      |
| ------- | ------------------ | ------------- |
| 1.0     | September 26, 2020 | First Version |

## Minimal Path to Awesome

- Clone or download this repository
- Run in command line:
  - `npm install` to install the npm dependencies
  - `gulp serve` to display in Developer Workbench (recommend using your tenant workbench so you can test with real lists within your site)
- To package and deploy:
  - Use `gulp bundle --ship` & `gulp package-solution --ship`
  - Add the `.sppkg` to your SharePoint App Catalog


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-world-clocks&authors=@jyasir&title=react-world-clocks%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-world-clocks&authors=@jyasir&title=react-world-clocks%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-world-clocks&authors=@jyasir&title=react-world-clocks%20-%20).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-world-clocks" />
