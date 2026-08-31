# SharePoint Page Governance Review

An SPFx 1.23.2 React 17 / Fluent UI v9 web part for a bounded, read-only review of configured SharePoint Site Pages libraries or lists.

## Scope and security

The web part uses SharePoint REST through `SPHttpClient` GET requests only. It never changes pages, metadata, permissions, taxonomy, or workflow state. It does not publish, create, update, delete, check in/out, or approve content. Sources are limited to 4; each source is limited to 5 pages of 50 rows and 200 rows total. Paths and pagination links are validated, and only an explicit field allow-list is selected.

Signals are heuristics, not authoritative compliance findings: missing/old modified date, missing owner/editor, not promoted, checked out, missing description, empty canvas, and an optional stale-review threshold. The optional stale-review signal uses modified date as a documented proxy because this sample does not request custom fields. Results cover configured sources only, not necessarily the whole site.

## Setup

Use Node `>=22.14.0 <23.0.0`, then run:

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

Configure `sourcesJson` as an array such as `[ { "label": "Site Pages", "path": "/sites/demo/Site Pages" } ]`. Paths must be server-relative and reject traversal, control characters, backslashes, queries, fragments, and protocol-relative forms. Keep paths within the current tenant and validate the configured web URL in the tenant.

## Tenant validation checklist

- Confirm the page library/list path and managed path for each source.
- Confirm the signed-in user can read the list and requested fields.
- Confirm the tenant uses HTTPS and the web URL is the intended tenant.
- Confirm thresholds and injected reference date are appropriate for the review.
- Treat partial, empty, permission-denied, and throttled results as incomplete evidence.

Official reference: [Build your first SharePoint client-side web part](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part).

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-sharepoint-page-governance-review" />
