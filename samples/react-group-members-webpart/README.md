# Group Members Web Part – Microsoft 365 Group User Management

## Summary

The **Group Members Web Part** provides a comprehensive solution for displaying and managing Microsoft 365 group memberships within SharePoint. This web part leverages Microsoft Graph to fetch user data and presents it in an intuitive, responsive interface that supports filtering, search, and quick actions.

![Group Members UI](./assets/GroupMembersUI.png)

- **Unified Site Member Discovery**: Works with both M365 Groups and Communication sites
- **Smart Access Level Detection**: Automatically identifies Owners, Administrators, Members, and Visitors
- **Microsoft Graph Integration**: Real-time data from Microsoft 365 and SharePoint APIs
- **Smart Profile Images**: Automated fallback with initials, intelligent caching
- **Advanced Search**: Debounced search across multiple user properties
- **Role-based Filtering**: Owners, Administrators, Members, and Visitors
- **Interactive Actions**: Direct Teams chat and email integration
- **Customizable Title**: SharePoint native title editing with inline editing support
- **Responsive Design**: Optimized for desktop and mobile experiences
- **Accessibility**: Full screen reader and keyboard navigation support

## Features

- **Unified member discovery**: Pulls from M365 group owners/members and SharePoint site permissions, deduplicating to the highest access level.
- **Role-aware display**: Owners/Admins/Members/Visitors with customizable labels and optional role chips under each persona.
- **Filtering controls**: Hide claims principals (“Everyone”, etc.) and exclude service accounts via configurable patterns.
- **Search & pagination**: Debounced search across name/title/department/location plus per-role paging.
- **Presence & photos**: Batched Teams presence and photo prefetch with caching for fast persona rendering.
- **Actions**: One-click Teams chat and email per person.
- **Layout & chrome toggles**: Command bar, header, summary cards, role pivot tabs, section borders—all per-instance toggles.
- **Header customization**: Localizable header title/subtitle or hide entirely.
- **Responsive UI**: Fluent/SharePoint styling with responsive grids, pivots, and pagination.
- **Accessibility**: Aria labels on commands, keyboard-friendly pagination, and error boundaries.

## Configuration overview

### 1. People & pagination

| Setting | Description | Default |
|---------|-------------|---------|
| Show Owners/Admins/Members/Visitors | Toggle each role on/off | Owners/Admins/Members on, Visitors off |
| Items per page | Page size for each role section | 10 |
| Sort field | `name` or `jobTitle` | `name` |

### 2. Layout & chrome

| Setting | Description | Default |
|---------|-------------|---------|
| Search box | Display the search input above the list | On |
| Presence indicator | Render Teams presence pills | Off |
| Command bar | Show the page-level action bar (Refresh, Presence toggle) | On |
| Page header | Show header title/subtitle | Off |
| Summary cards | Display role counts above the list | Off |
| Role navigation (pivot) | Tabs for switching roles | Off |
| Section borders | Bordered vs. borderless cards | On |
| Role label under persona | Show highest role below each name | Off |

### 3. Header configuration

- `pageHeaderTitle` – defaults to **People directory**
- `pageHeaderSubtitle` – defaults to **Your site directory**

### 4. Role labels

Use `ownerLabel`, `adminLabel`, `memberLabel`, and `visitorLabel` to localize the role names that appear in section headers and persona labels.

### 5. Filtering

- `hideClaimsPrincipals` – hides well-known claims providers (Everyone, Everyone except external users, SPO grid, etc.)
- `excludedPrincipals` – multi-line textbox; each line is a lower-case substring matched against login/UPN to suppress service accounts such as `sharepoint\system` or `nt service\`.


## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.21.1](https://img.shields.io/badge/SPFx-1.21.1-green.svg)  
![Node.js v18-22](https://img.shields.io/badge/Node.js-v18--22-green.svg)  
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview)

> Get your own free development tenant by subscribing to the [Microsoft 365 developer program](http://aka.ms/o365devprogram).

## Prerequisites

- SharePoint Online tenant
- Microsoft 365 account with access to Microsoft Graph
- Node.js v18
- SharePoint Framework 1.20.2

## Security and Permissions

### Required Microsoft Graph API Permissions

The following Microsoft Graph API permissions are required for full functionality:

| Permission Scope | Purpose | Type |
|-----------------|---------|------|
| `User.Read.All` | Read comprehensive user profiles | Application |
| `User.ReadBasic.All` | Read basic user profile information | Application |
| `Group.Read.All` | Read Microsoft 365 group details | Application |
| `GroupMember.Read.All` | Read group membership information | Application |
| `Presence.Read.All` | Read user presence status in Microsoft Teams | Application |
| `Sites.Read.All` | Read SharePoint site information and permissions | Application |
| `Sites.ReadWrite.All` | Read and write SharePoint site permissions | Application |

### Permission Request Process

1. Deploy the web part solution
2. Navigate to the SharePoint Admin Center
3. Go to "Advanced" > "API Access"
4. Approve the requested Microsoft Graph API permissions

### Security Considerations

- Users will only see group members they have permission to view
- Respects existing SharePoint and Microsoft 365 group access controls
- Permissions are scoped to read-only access

## Known Limitations

- Performance may vary with large group memberships
- Profile photo retrieval depends on user's Microsoft 365 profile

## Troubleshooting

- Ensure proper Microsoft Graph API permissions
- Verify network connectivity
- Check browser console for specific error messages

## Contributors

- [Nicolas Kheirallah](https://github.com/NicolasKheirallah)

## Version History

| Version | Date            | Comments                                        |
| ------- | --------------- | ----------------------------------------------- |
| 4.0.0 | 15 November 2025 | Added configurable filtering, batched presence/photo loading, layout toggles, and reorganized settings |
| 3.0.0 | 6 May 2025 | Major refactor with fixes to retreving the right information, deeper retrival from groups such as everyone except externals etc |
| 2.0.0 | 15 March 2025 | Major refactor with GraphService, improved caching, LivePersona integration |
| 1.0.0 | 28 February 2025   | Initial release                                 |

## Minimal Path to Awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-group-members-webpart) then unzip it)
- From your command line, change your current directory to the directory containing this sample (`react-group-members-webpart`, located under `samples`)
- in the command line run:
  - `npm install`
  - `gulp serve` (for local testing)
  - `gulp bundle --ship && gulp package-solution --ship` (for production deployment)
- Upload the generated .sppkg file to your App Catalog
- Approve required Graph API permissions in the SharePoint Admin Center

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.
> 

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft Graph JavaScript SDK](https://github.com/microsoftgraph/msgraph-sdk-javascript)
- [Microsoft Graph Documentation](https://docs.microsoft.com/en-us/graph/overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
- [FluentUI React Components](https://developer.microsoft.com/en-us/fluentui#/controls/web)

## Help


We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-group-members-webpart%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-group-members-webpart) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-group-members-webpart&template=bug-report.yml&sample=react-group-members-webpart&authors=@NicolasKheirallah&title=react-group-members-webpart%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-group-members-webpart&template=question.yml&sample=react-group-members-webpart&authors=@NicolasKheirallah&title=react-group-members-webpart%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-group-members-webpart&template=suggestion.yml&sample=react-group-members-webpart&authors=@NicolasKheirallah&title=react-group-members-webpart%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-group-members-webpart" />