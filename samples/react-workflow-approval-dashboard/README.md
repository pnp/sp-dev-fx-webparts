# Workflow & Approval Status Dashboard

This sample is an SPFx **1.23.2** React 17 web part using Fluent UI v9. It is intentionally read-only: it displays workflow and approval status from bounded SharePoint REST list sources and never controls a workflow.

## What it shows

The dashboard renders request title, source label, status and normalized state, created/modified dates, requester, approvers, stages, due date, and an overdue marker. Pending items are overdue after the local `reviewSettings.overdueAfterDays` threshold or after their due date. Missing fields are shown as unavailable because approval fields depend on tenant configuration, list shape, and API permissions.

The local bounded configuration is [`src/config/dashboard-config.json`](src/config/dashboard-config.json). It permits at most four sources, 50 items per page, five pages per source, and 200 items per source. Only enabled sources are loaded.

## Data and security boundary

The service abstraction in `src/services/IWorkflowSourceService.ts` has a SharePoint REST implementation in `src/services/SharePointWorkflowService.ts`. It uses the current SPFx SharePoint context and `SPHttpClient.get()` against the configured `_api` endpoint family. Relative URLs and absolute URLs are accepted only when they resolve to the current tenant origin; credentials, fragments, external hosts, and unsafe schemes are rejected. OData next links are subjected to the same validation and page bound.

The solution requests no additional API permissions, includes no `webApiPermissionRequests`, and has no write permissions. It does not call any approve, reject, cancel, create, update, or delete operation. `npm run verify:get-only` performs a static check of source calls and verbs. This is status visibility, not workflow control.

Permission availability is tenant-specific. The current user needs read access to the configured SharePoint list and fields. A 401/403 is presented as a permission error, 429 as throttling, and other failures remain visible per source so a good source can still render.

## Run

```bash
nvm use
npm install
npm test
npm run verify:get-only
npm run serve
```

Use the SharePoint workbench from `config/serve.json`, then package with `npm run build`.

## References

- [SPFx 1.23.2 release notes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.23.2)
- [SPFx platform and toolchain compatibility](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility)
- [Using SharePoint REST APIs in SPFx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/use-rest-with-spfx-web-parts)
- [Building SPFx solutions that use Microsoft Graph](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Microsoft Graph approval resource](https://learn.microsoft.com/en-us/graph/api/resources/approval?view=graph-rest-1.0)
- [Microsoft Graph Approvals app API overview](https://learn.microsoft.com/en-us/graph/approvals-app-api)

`assets/sample.json` is a valid one-element JSON sample asset credited to **vystartasv** on **2026-08-30**.
