# Resource Capacity Planner

SPFx 1.23.2 React 17 web part using Fluent UI v9 to present a read-only room and shared-resource capacity view. It loads only the current user and bounded list data through `SPHttpClient` GET requests. There are no booking create, update, or cancel operations and no `webApiPermissionRequests`.

## Configure and run

Edit [`src/config/capacity-planner.config.json`](src/config/capacity-planner.config.json) to match the two SharePoint lists. Keep endpoints HTTPS, same-tenant, and under `/_api/`. A blank `tenantHost` means the current SharePoint host; a value must exactly match it. Configure the REST field mappings, IANA display timezone, working hours, horizon, page size, and item limit there. The runtime validates every bound before making a request.

```bash
nvm use
npm install
npm test
npm run verify
npm run serve
```

The UI shows source labels, resource IDs and capacity, daily/weekly utilization, reservation intervals, half-open overlap edges, available working-hour slots, and responsive keyboard-accessible tables/cards. It explicitly reports no-data, partial/page-bound, permission, throttling, retryable, malformed-record, and generic error states. Refresh retries GET requests only.

## Data contract

Each configured source has a resource endpoint and reservation endpoint. Resource records need an ID, display name, integer capacity, and optional IANA timezone. Reservation records need an ID, resource ID, ISO start/end, and optional positive integer units. Invalid records are skipped and counted. Intervals are normalized to UTC ISO strings; `[start, end)` is used, so touching endpoints do not overlap. Utilization is measured against configured working-hour capacity.

## Microsoft Graph alternative and consent boundary

This sample intentionally uses SharePoint REST in the current user’s SharePoint context. Microsoft Graph has a separate booking/resource route and can be considered when a solution needs Exchange room mailboxes or Microsoft Bookings data across workloads. That alternative requires its own Graph API design, delegated/application consent, and permission review; it is not silently substituted here. This sample adds no Graph permissions or `webApiPermissionRequests`.

## Official references

- [SharePoint Framework overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Build a SharePoint Framework web part](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
- [SharePoint REST service](https://learn.microsoft.com/sharepoint/dev/sp-add-ins/complete-basic-operations-using-sharepoint-rest-endpoints)
- [SPHttpClient API](https://learn.microsoft.com/javascript/api/sp-http/sphttpclient)
- [Microsoft Graph Bookings API](https://learn.microsoft.com/graph/api/resources/booking-api-overview)

Author: vystartasv · date: 2026-08-30
