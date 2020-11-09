# Graph Calendar

## Summary
This is a sample web part developed using React Framework to gather events from the underlying group calendar of a Team site. This sample also demonstrates the utilization of web parts as Teams tabs and Personal tab and offering a visualization context to change behaviors based on the platform used (Getting the proper information from the team vs. SharePoint site, understanding the context of the theme on Teams, etc.).

### Web Part in SharePoint Online
![The web part in action](./assets/react-graph-calendar-spo.gif)

### Web Part in Microsoft Teams
![The web part in action](./assets/react-graph-calendar-teams.gif)

Web part is developed using below technologies 
* React Framework
* Full Calendar (fullcalendar.io)
* Microsoft Teams API
* Office UI Fabric

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.10-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
It is required that the users have view access on the underlying calendar.

## Solution

Solution|Author(s)
--------|---------
react-graph-calendar | [Sébastien Levert](https://www.linkedin.com/in/sebastienlevert) ([@sebastienlevert](https://twitter.com/sebastienlevert))
react-graph-calendar | Abderahman Moujahid (added support for recurring events and languages)

## Version history

Version|Date|Comments
-------|----|--------
1.0 |December 29, 2019 | Initial Release
1.1 |January 08, 2020 | Bumped to SPFx 1.10 and added the Personal Tab support
1.2 |October 27, 2020 | Recurring events support
1.2.1|November 1, 2020 | Changed return behavior for single items vs recurring items
1.2.2|November 3, 2020 | Show calendar in other languages
1.2.3|November 6, 2020 | Added property panel translations (English, French, Dutch)

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - Add to AppCatalog and deploy
  - Sync to Teams

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-graph-calendar" />
