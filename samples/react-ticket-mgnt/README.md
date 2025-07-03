# Ticket Management App

## Summary

This SharePoint web part is a ticket management system with a modern, responsive design. It includes a dashboard, personal view, new ticket form, and a detailed ticket view. Tickets can be configured with metadata like priority and status. The system integrates with SharePoint for assignments and permissions, stores data in a SharePoint list, and provides real-time updates. Built with React, TypeScript, and Fluent UI, it maintains SharePoint's look and feel while offering advanced functionality for managing issues or requests.

![Ticket dashboard](./assets/ticket%20dashboard.png)  ![New ticket](./assets/new%20ticket.png)
![Ticket details](./assets/ticket%20details.png)

## Prerequisites

A SharePoint list to store the information should have the following columns:

- Subject (Single line of text)
- Description (Multiple lines of text)
- Priority (Choice)
- Status (Choice)
- Assigned To (Person or Group)
- Due Date (Date and Time)
- Category (Choice)
- Environment (Choice)
- Steps to Reproduce (Multiple lines of text)
- Expected Result (Multiple lines of text)
- Actual Result (Multiple lines of text)
- Affected Version (Single line of text)
- Resolution (Multiple lines of text)
- Resolution Date (Date and Time)
- Severity (Choice)
- Root Cause (Choice)
- Time Spent (Hours) (Number)
- Regression Test Status (Choice)
- Release (Single line of text)

 Use can use the [Powershell script](./script/ProvisionTicketList.ps1) to provision the list.

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
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework Developer Preview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Office 365 developer tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Contributors

- [Sudeep Ghatak](https://github.com/sudeepghatak)

## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|June 13, 2025|Initial release|

## Minimal Path to Awesome

### Build and Test

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

1. Clone this repo
1. In the command line run
    - `npm i`
    - `gulp build`
    - `gulp serve --nobrowser`
1. Create a custom list (e.g. Bookmarks)
1. Navigate to the hosted version of SharePoint workbench, e.g. **https://\<tenant>.sharepoint.com/sites/\<your site>/_layouts/15/workbench.aspx**
1. Add the Web Part to the canvas and configure it.

### Package and deploy

1. In the command line run
    - `gulp bundle --ship`
    - `gulp package-solution --ship`
2. Install into your SharePoint app catalog and add it to a SharePoint site.
3. Navigate to your site, e.g. **https://\<tenant>.sharepoint.com/sites/\<your site>**
4. Create a custom list with Title and Description(internal name) of type Enhanced rich text.
5. Populate the list with some items
6. Navigate to a page on your site where the custom list is created
7. Add the Web Part to the page and configure it.

## Features

### Ticket Management

#### Core Features

- Create, view, edit, and delete tickets  
- Track ticket status and progress  
- Assign tickets to team members  

#### Dashboard Views

- All tickets overview  
- Personal tickets view  
- Detailed ticket view  
- New ticket creation form  

#### Rich Ticket Metadata

- Priority levels  
- Status tracking  
- Categories  
- Due dates  
- Assignments  

#### User Interface

- Modern, responsive design  
- Intuitive navigation  
- Visual status indicators  
- Mobile-friendly layout  

#### SharePoint Integration

- Configurable list storage  
- User permission management  
- People picker integration  
- Real-time updates  

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-sp-ticket-mgmt=bug-report.yml&sample=react-sp-ticket-mgmt&authors=@SudeepGhatakh&title=react-sp-ticket-mgmt).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-sp-ticket-mgmt&template=bug-report.yml&sample=react-sp-ticket-mgmt&authors=@SudeepGhatakh&title=react-sp-ticket-mgmt).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-sp-ticket-mgmt&template=bug-report.yml&sample=react-sp-ticket-mgmt&authors=@SudeepGhatakh&title=react-sp-bookmarks).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-sp-bookmarks" />
