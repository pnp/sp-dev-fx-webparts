# Power Automate Approvals

## Summary

The Power Automate Approvals web part is a SharePoint Framework (SPFx) solution that demonstrates how to consume the Microsoft Graph Approvals API (beta) using the native MSGraphClientV3 HTTP client. It renders a full approvals dashboard - approvals waiting on you, requests you've raised, and their history - with a per-item detail panel showing an activity timeline built from approver responses and reassignment history.

### Key Features

- **Approvals Dashboard**: Four stat tiles (Requests Awaiting My Action, Approved / Rejected by Me, My Requests - Pending, My Requests - Past) plus a merged, newest-first Recent Activity feed
- **Role-Aware Bucketing**: Splits every approval item into the four buckets using `viewPoint.roles` (approver vs. owner) combined with `state`, done client-side after fetching every page since the API rejects a server-side `$filter` on the nested `viewPoint/roles` collection
- **Full Pagination**: Follows `@odata.nextLink` automatically until the complete result set is retrieved, so lists and counts are always accurate
- **Approve / Reject**: Submit a decision with an optional comment directly from the detail panel
- **Activity Timeline**: Merges request creation, reassignment events, and per-approver responses (with comments) into a single newest-first timeline
- **Reassignment Tracking**: Reads the `/requests` sub-resource to show "Reassigned from X to Y" entries and to keep the displayed approver accurate even after a reassignment
- **Display Name Resolution**: Backfills missing `displayName` values (owner, approver, response author) via Microsoft Graph `$batch` lookups, cached for the life of the session
- **Search & Sort**: Each list view supports searching by title/requester/approver and sorting newest/oldest first

### Technologies Used

- **MSGraphClientV3**: Native Microsoft Graph client for SPFx (no external dependencies like PnPjs)
- **Microsoft Graph Beta API**: Approvals endpoints (`/solutions/approval/approvalItems`)
- **React**: Component-based UI with hooks for state, effects, and memoization
- **Fluent UI React (v8)**: Panel, Pivot-free dashboard layout, SearchBox, Dropdown
- **TypeScript**: Type-safe development

## Screen Demo

![Power Automate Approvals Dashboard](<./assets/PA%20Approvals%201.png>)

![Power Automate Approvals Dashboard](<./assets/PA%20Approvals%202.png>)

![Power Automate Approvals Dashboard](<./assets/PA%20Approvals%203.png>)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to Toolchain this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.22.1](https://img.shields.io/badge/SPFx-1.22.1-green.svg)
![Node.js v22](https://img.shields.io/badge/Node.js-v22-green.svg)
![Toolchain: Heft](https://img.shields.io/badge/Toolchain-Heft-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- SharePoint Online tenant with the Power Automate Approvals app in use (so there's approval data to display)
- Admin approval for the required Microsoft Graph API permissions (`ApprovalSolution.ReadWrite`, `ApprovalSolutionResponse.ReadWrite`, `User.ReadBasic.All`)
- Node.js and npm installed locally

## Contributors

- [Siddharth Vaghasia](https://github.com/siddharth-vaghasia)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | July 7, 2026     | Initial commit  |

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `heft start`

> Include any additional steps as needed.

Other build commands can be listed using `heft --help`.

## Features

This web part demonstrates the following concepts and best practices:

- **MSGraphClientV3 Integration**: Shows how to properly use the native Microsoft Graph client in SPFx without external HTTP libraries
- **Client-Side Bucketing with Full Pagination**: Fetches every page of `/approvalItems` via `@odata.nextLink`, then splits results into four buckets using `viewPoint.roles` and `state` - documented as a workaround since the underlying beta endpoint doesn't yet support filtering on the nested `viewPoint/roles` collection
- **Lazy Sub-Resource Loading**: Only fetches `/responses` and `/requests` for an item when its detail panel is opened, instead of pulling them for every item on every list load
- **$batch for Display Name Resolution**: Resolves user ids with a missing `displayName` (owner, approver, response author) via a single Microsoft Graph `$batch` call per chunk of 20, cached on the service instance
- **State Management**: React hooks (`useState`, `useEffect`, `useMemo`) manage dashboard/list/panel navigation, in-flight requests, and derived activity timelines
- **Error Handling**: Comprehensive error catching and non-blocking, per-section user feedback (e.g. activity comments failing to load doesn't block the rest of the panel)
- **API Permission Configuration**: Demonstrates how to declare required Graph API scopes in `package-solution.json`
- **Beta API Usage**: Shows how to version API calls to beta endpoints

### Approvals API Workflow

1. **List approval items**: `GET /beta/solutions/approval/approvalItems` - paginated via `@odata.nextLink`, ordered by `createdDateTime desc`
2. **List responses**: `GET /beta/solutions/approval/approvalItems/{id}/responses` - each approver's decision and comment, fetched lazily when a detail panel opens
3. **List requests**: `GET /beta/solutions/approval/approvalItems/{id}/requests` - per-approver assignment and reassignment history, fetched lazily alongside responses
4. **Submit a response**: `POST /beta/solutions/approval/approvalItems/{id}/responses` - Approve or Reject with an optional comment

### Required Permissions

The web part requires the following Microsoft Graph scopes:

- `ApprovalSolution.ReadWrite`
- `ApprovalSolutionResponse.ReadWrite`
- `User.ReadBasic.All`

## Help

Search for:
react-powerautomate-approvals

Search for:
@siddharth-vaghasia

- [Use MSGraphClientV3 to connect to Microsoft Graph](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph)
- [Consume Microsoft Graph in SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#consume-microsoft-graph)
- [List approvalItem objects - Microsoft Graph beta](https://learn.microsoft.com/en-us/graph/api/approvalsolution-list-approvalitems?view=graph-rest-beta)
- [approvalItem resource type - Microsoft Graph beta](https://learn.microsoft.com/en-us/graph/api/resources/approvalitem?view=graph-rest-beta)
- [approvalItemViewPoint resource type - Microsoft Graph beta](https://learn.microsoft.com/en-us/graph/api/resources/approvalitemviewpoint?view=graph-rest-beta)
- [Approvals app APIs - Microsoft Graph](https://learn.microsoft.com/en-us/graph/approvals-app-api)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-powerautomate-approvals%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-powerautomate-approvals) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-powerautomate-approvals&template=bug-report.yml&sample=react-powerautomate-approvals&authors=@siddharth-vaghasia&title=react-powerautomate-approvals%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-powerautomate-approvals&template=question.yml&sample=react-powerautomate-approvals&authors=@siddharth-vaghasia&title=react-powerautomate-approvals%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-powerautomate-approvals&template=suggestion.yml&sample=react-powerautomate-approvals&authors=@siddharth-vaghasia&title=react-powerautomate-approvals%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-powerautomate-approvals" />
