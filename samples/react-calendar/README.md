# Calendar

## Summary

This Web Part allows you to manage events in a calendar.
Uses a list of existing calendars on any website.
The location and name of the list and the dates of the events to be displayed are defined in the properties of the web part.

Each category has its own color that is generated in the load.

The Web Part checks the user's permissions for the View, Add, Edit, and Delete events.

![calendar](assets/react-calendar-categories.png)

![calendar](assets/animatevideo.gif)

![calendar](assets/weekly_moderncalendar.gif)

![calendar](assets/modercalendar_monthly.gif)

![calendar](assets/moderncalendar_yearly.gif)

![calendar](assets/calendar_teams.jpg)

![calendar](assets/calendar_teams2.jpg)

![calendar](assets/screen1.png)

![calendar](assets/screen1.0.png)

![calendar](assets/screen1.1.png)

![calendar](assets/screen1.2.png)

![calendar](assets/screen1.3.png)

![calendar](assets/screen1.4.png)

![calendar](assets/screen2.png)

![calendar](assets/screen3.png)

![calendar](assets/screen4.png)

![calendar](assets/screen5.png)

![calendar](assets/screen6.png)

![calendar](assets/screen7.png)

![calendar](assets/screen8.png)

![calendar](assets/screen9.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.20.0](https://img.shields.io/badge/SPFx-1.20.0-green.svg)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to SharePoint content")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Web Part Properties

Property |Type|Required| comments
--------------------|----|--------|----------
Site URL of Calendar List | Text| yes|
Calendar list| Choice/Dropdown | yes|  this is filled with all list of  type "event list" created
Start Date | Date | yes | Event Date
End Date| Date| yes | Event Date

## Contributors

The Web Part Use PnPjs library, Office-ui-fabric-react components. react Big-Calendar Component

* [Abderahman Moujahid](https://github.com/Abderahman88)
* [Eli H. Schei](https://github.com/Eli-Schei)
* [Hugo Bernier](https://github.com/hugoabernier)
* [João Mendes](https://github.com/joaojmendes)
* [Mohamed Derhalli](https://github.com/derhallim)
* [Mohammed Amer](https://github.com/mohammadamer)
* [Nanddeep Nachan](https://github.com/nanddeepn)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 25, 2019|Initial release
1.0.1|June 10, 2019|update add recurrence events
1.0.2|April 25, 2020|Update styles according to the applied theme
1.0.3|June 06, 2020|Upgrade to SPFx 1.10.0
1.0.4|October 18, 2020|Added support for all-day events
1.0.5|October 21, 2020|Added Year view
1.0.6|December 3, 2020|Fixed all-day events (#1623)
1.0.7|December 4, 2020|Fixed styling Year view + Dutch localization
1.0.8|December 24, 2020|Fixed time zone difference (#1646)
1.0.9|March 16, 2021|Fixed issue deleting events (#1773)
1.0.10|March 27, 2021|Updated prompt message when deleting single v/s multi-event.
1.0.11|May 10, 2021|Optimized page refresh using local storage
1.0.12|June 21, 2021|Fixes overlap with Year-view and the comment section by adding a vertical scrollbar.
1.0.13|October 2, 2021|Fix to make sure Today is always visible and highlighted.
1.0.14|October 16, 2021|Resolve unhandled exception that happens clicking on recurrent events
1.0.15|November 22, 2021|Fix All Day event issue that makes All Day events date expanded to another day instead of being full day event.
1.0.16|December 21, 2021|Upgraded to SPFx 1.12.1
1.0.17|October 25, 2022|Fixed issue deleting events (#2693)
1.0.18|December 29, 2022|Fixed stylelint issue (#4029)| Cleaned up old Type script versions and Upgraded Type script version
1.0.19|June 28, 2024| added filter by category | fixed the packages.json issues which prevent solution to build successfully.
1.0.20|October 1, 2024| upgraded to SPFx 1.16.1
1.0.21|November 03, 2024| upgraded to SPFx 1.20.0
1.0.22|January 15, 2025| Fixed categories filter issues

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp build`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
  * Add to **AppCatalog** and deploy

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-calendar") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-calendar) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-calendar&template=bug-report.yml&sample=react-calendar&authors=@Abderahman88,%20@Eli-Schei,%20@mohammadamer,%20@joaojmendes,%20@derhallim,%20@nanddeepn,%20@mohammadamer&title=react-calendar%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-calendar&template=question.yml&sample=react-calendar&authors=@Abderahman88,%20@Eli-Schei,%20@mohammadamer,%20@joaojmendes,%20@derhallim,%20@nanddeepn,%20@mohammadamer&title=react-calendar%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-calendar&template=question.yml&sample=react-calendar&authors=@Abderahman88,%20@Eli-Schei,%20@mohammadamer,%20@joaojmendes,%20@derhallim,%20@nanddeepn,%20@mohammadamer&title=react-calendar%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-calendar" />
