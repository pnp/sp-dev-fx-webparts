# Teams Membership Updater

## Summary

Used to update the membership of a team based on the contents of a CSV file, can be hosted in a SharePoint site where a list can be defined for logging purposes or run inside teams as a personal app.

## Screen

![react-teams-membership-updater](./assets/Screenshot-2020-05-01.png "Preview")

![react-teams-membership-updater](./assets/teamsmembership.gif "Teams Membership Via Teams")

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

This web part can be deployed to a site or as a teams personal app.  This does require graph permission granting in the SharePoint Admin Center

Uses:

- PnP React Controls
- PnP React Property Controls
- React Papaparse (CSV parsing)

Solution|Author(s)
--------|---------
Teams Membership Updater  Web Part|[Nick Brown](https://github.com/techienickb)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 27, 2020|Initial release
1.0.2|May 1, 2020|Ability to disable Orphaned Member removals
1.0.4|June 3, 2020|Switched to using Graph Batching
1.0.7|April 20, 2021|Switched to using PnP's file picker and option to log to a configuration list
1.0.8|April 22, 2021|Added support for paging on the team member list get

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add to AppCatalog and deploy`


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Support

We do not support samples, but we do use GitHub to track issues and constantly want to improve these samples.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=aadreact-teams-membership-updater&authors=@techienickb&title=aadreact-teams-membership-updater%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=aadreact-teams-membership-updater&authors=@techienickb&title=aadreact-teams-membership-updater%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=aadreact-teams-membership-updater&authors=@techienickb&title=aadreact-teams-membership-updater%20-%20).


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-teams-membership-updater />
