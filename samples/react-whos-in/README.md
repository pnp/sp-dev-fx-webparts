# React Who's In

## Summary

A SharePoint Framework (SPFx) React web part that shows who is in the office and when:
- Filter by destination office, traveler name, and date range
- See “currently in” counts per office
- Display profile picture and job title (when available)
- Accessible, responsive UI built with Fluent UI

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

> Screenshot
>
![screenshot](./src/webparts/whoIsIn/assets/screenshot.png)

## Applies to

- SharePoint Framework 1.20.0
- Microsoft 365 tenant

## Prerequisites

- Microsoft 365 developer tenant with an App Catalog
- Node.js 18 LTS (recommended 18.x)
- Gulp CLI installed globally: npm install -g gulp-cli
- If using Microsoft Graph for photos/titles, approve the following permissions after deployment:
  - Microsoft Graph delegated permissions:
    - User.Read
    - User.ReadBasic.All

## Solution

| Solution       | Author(s)                         |
| -------------- | --------------------------------- |
| react-whos-in  | Add your name/company/@twitter    |

## Version history

| Version | Date           | Comments                            |
| ------- | -------------- | ----------------------------------- |
| 1.2     | Nov 8, 2025    | Documentation refresh and guidance  |
| 1.1     | March 10, 2021 | Update comment                      |
| 1.0     | Jan 29, 2021   | Initial release                     |

## Features

- Office presence overview with quick filters
- “Currently in” aggregate counts by office
- Profile photos with fallback to initials
- Job title shown beneath user’s name
- Resilient loading state, error handling, and empty results messaging

### Profile Pictures and Job Titles

- Uses Employee (Person) field to resolve name/email/ID when available
- Renders profile picture when available, falls back to initials
- Shows user job title (from list/person field or Graph when configured)

## Information Architecture (SharePoint List)

Create a SharePoint list to store trips (suggested name: “Travel Plans”) with the following columns:

- Title (Single line of text) – Trip title
- Employee (Person or Group) – ensures name/email/ID are available
- DestinationOffice (Choice) – e.g. Auckland, Wellington, Christchurch, Tauranga
- StartDate (Date and Time) – Date only
- EndDate (Date and Time) – Date only
- Purpose (Multiple lines of text) – optional
- Notes (Multiple lines of text) – optional

> You can adjust the available offices in code (see Configuration section below).

## Minimal Path to Awesome (Local Debug)

- Open a terminal in the sample folder:
  - cd samples/react-whos-in
- Install dependencies:
  - npm install
- Trust the dev certificate (Windows):
  - gulp trust-dev-cert
- Start local debugging:
  - gulp serve
- Open the hosted workbench:
  - https://yourtenant.sharepoint.com/_layouts/15/workbench.aspx
- Add the “React Who’s In” web part to the canvas.

## Build and Deploy (Production)

1) Build and package
- gulp clean
- gulp build
- gulp bundle --ship
- gulp package-solution --ship

2) Deploy
- Upload sharepoint/solution/*.sppkg to your tenant App Catalog
- In the App Catalog:
  - Approve API permission requests (if prompted) for Microsoft Graph:
    - User.Read
    - User.ReadBasic.All
- Add the app to your target site
- Add the web part to a page

## Microsoft Graph Permissions (optional but recommended)

To show photos/titles for users across the tenant, include these in config/package-solution.json and re-package:

```json
{
  "solution": {
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "User.ReadBasic.All"
      }
    ]
  }
}
```

After deployment, approve the permissions in the SharePoint Admin Center > Advanced > API access.

## Configuration

- Offices list:
  - Edit the office options in the component:
    - src/webparts/whosIn/components/WhosIn.tsx
  - Update the OFFICE_OPTIONS array to match your organization.

- List name/fields:
  - If your list/field internal names differ, update the data service and mapping accordingly in the services and component files.

## Troubleshooting

- Node/gulp issues:
  - Ensure Node 18.x (use nvm-windows if needed)
  - Delete node_modules and package-lock.json if install issues, then npm install

- HTTPS/Workbench errors:
  - Run gulp trust-dev-cert again
  - Use the hosted workbench URL (not the local workbench)

- Photos not showing:
  - The user may not have a photo set
  - Confirm API permissions (User.ReadBasic.All) are approved
  - Expect graceful fallback to initials

- Empty results:
  - Verify the SharePoint list exists and contains items
  - Check field internal names match those used in code

## Scripts (common)

- npm install
- gulp clean
- gulp build
- gulp serve
- gulp bundle --ship
- gulp package-solution --ship

## References

- Getting started with SharePoint Framework  
  https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant
- Building for Microsoft Teams  
  https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview
- Use Microsoft Graph in your solution  
  https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis
- Publish SPFx apps to the Marketplace  
  https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview
- Microsoft 365 Patterns and Practices (PnP)  
  https://aka.ms/m365pnp

## Disclaimer

THIS CODE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.
