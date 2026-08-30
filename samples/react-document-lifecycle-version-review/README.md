# Document Lifecycle and Version Review

An SPFx 1.23.2 React 17 web part using Fluent UI v9 to provide a bounded, read-only review aid for document-library/list rows. It shows file links, source, content type, owner, dates, version details, size, checkout and approval/publish values when SharePoint supplies them, plus stale, major-version and review-state signals.

## Setup and configuration

Run `npm ci`, then `npm test`, `npm run verify`, `npx gulp bundle --ship`, and `npx gulp package-solution --ship`. Configure `sourcesJson` as a JSON array of at most four objects: `[{"siteUrl":"/_sites/records","listTitle":"Documents"}]`. `siteUrl` may be omitted for the current web, or be a same-tenant HTTPS URL/root-relative URL. Set `referenceDate` to an ISO date for deterministic stale classification; blank uses the current date. Each source reads at most 50 rows per page, five pages, and 200 rows.

## Security and limitations

All network access is SharePoint REST GET-only through the SPFx HTTP client. URL shape, origin, OData next links, source count, page size, page count, item count, and stale horizon are bounded. No Graph access, credentials, secrets, external hosts, or administration operations are used. Malformed rows are skipped; permission, throttling, retry, generic, partial, empty, and loading states are surfaced. SharePoint field availability and tenant policies vary, so version counts, checkout, and approval values can be unavailable. This is not an authoritative compliance or records-management report.

Official references: [SPFx web parts](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/overview), [SharePoint REST](https://learn.microsoft.com/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service), [SPFx HTTP client](https://learn.microsoft.com/javascript/api/sp-http/sphttpclient), and [Fluent UI React](https://react.fluentui.dev/).
