# React requests and approvals

This SPFx 1.23.2 React 17 web part uses Fluent UI v9 and PnPjs v4 to show the current user's pending approval requests from a SharePoint list. Approvers can approve a request or reject it with a required comment.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-requests-approvals" />

## Prerequisites

- Node.js 22.22.2 (`.nvmrc`)
- SharePoint Online and an SPFx 1.23.2-compatible tenant
- Heft, installed through the sample's dependencies

## List schema

Create a list named `Approval Requests`. The web part defaults to these exact internal field names:

| Display name | Internal name | Type | Required values/notes |
| --- | --- | --- | --- |
| Title | `Title` | Single line of text | Required request title |
| Approval status | `ApprovalStatus` | Choice | Required; exactly `Pending`, `Approved`, `Rejected` |
| Assigned approver | `AssignedApprover` | Person or Group | Required single person; the pending item is matched to the signed-in user |
| Submitted by | `SubmittedBy` | Person or Group | Required single person |
| Submitted on | `SubmittedOn` | Date and Time | Required request submission time |
| Decision on | `DecisionOn` | Date and Time | Optional until a decision is saved; set by this web part |
| Decision notes | `DecisionNotes` | Multiple lines of text | Optional for pending/approved items; required for rejection comments |
| Request type | `RequestType` | Single line of text | Optional display field |
| Amount | `Amount` | Number or Currency | Optional display field |
| Description | `Description` | Multiple lines of text | Optional display field |

The internal names are configurable in the property pane. Clear an optional field's property-pane value to omit it from the query. The default sample expects all fields above to exist.

`assets/sample.json` contains the same field mapping and representative values.

## Permissions and setup

1. Give each approver at least `Edit` permission on the `Approval Requests` list (the built-in `Contribute` level is sufficient). They also need `Read` access to the list and its items.
2. Populate `AssignedApprover` with the person who should decide each item and set `ApprovalStatus` to `Pending`.
3. Add the web part to a page and configure the list title, web-part title, page size, and internal field names if they differ from the schema above.

The web part uses the SPFx page context with the signed-in user's delegated SharePoint permissions. It does not require Graph permissions, an app-only permission, or an additional API registration.

## Behaviour and limitations

- Only items with `ApprovalStatus eq 'Pending'` and `AssignedApprover` equal to the current user are loaded.
- Approval changes the status to `Approved` and writes `DecisionOn`.
- Rejection changes the status to `Rejected`, writes `DecisionOn`, and requires a comment whose trimmed value is not empty. Approval does not require a comment.
- Page size is a client-side display cap from 1 to 50 applied to the returned pending items; this sample does not implement server-side pagination.
- Decisions use a read-then-update flow without ETag or optimistic-concurrency checks. If two browser sessions decide the same item at the same time, the last successful SharePoint update wins.

## Non-goals

This sample does not provision the list or fields, send notifications, start an approval workflow, provide an audit/history view, support multi-level or delegated approval, or enforce server-side business rules beyond the SharePoint permissions and field configuration.

## Run

```bash
npm install
npm run start
```

For a production build and package:

```bash
npm run build
npm run package
```

Tenant validation and a representative screenshot are pending; no screenshot is included or claimed here.
