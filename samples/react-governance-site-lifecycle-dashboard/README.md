# Governance and Site Lifecycle Dashboard

This SPFx 1.23.2 React 17 web part is a read-only governance review aid. It displays site title and URL plus template, owners, hub association, sharing mode, storage or usage, last activity, review or expiration dates, inactive and needs-review signals, and source state.

## Setup

Use Node.js 18.17.1 or a supported Node.js 22 release, then run:

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

The packaged solution is written to `sharepoint/solution/governance-site-lifecycle-dashboard.sppkg` by the SPFx build. Install it in a SharePoint tenant that supports SPFx 1.23.2.

## Configuration

In the web part property pane, configure `sourcesJson` as a JSON array of at most four REST collection endpoints. Every endpoint must be a root-relative or same-tenant HTTPS URL containing `/_api/`. For example:

```json
[
  {
    "id": "governance-sites",
    "label": "Governance sites",
    "url": "/sites/governance/_api/web/webinfos?$select=Title,Url,WebTemplate,WebTemplateConfiguration,LastItemUserModifiedDate,Created&$orderby=Title",
    "pageSize": 25,
    "maxPages": 5,
    "maxItems": 200,
    "inactiveAfterDays": 180
  }
]
```

The dashboard adds or replaces `$top` with the bounded page size. It accepts common SharePoint REST and OData response shapes (`value`, legacy `d.results`, and next-page links). Rows are parsed defensively; fields unavailable from a selected endpoint display `Not supplied`.

`referenceDate` is an explicit `YYYY-MM-DD` value used for deterministic lifecycle classification. A site is inactive when its activity date is older than `inactiveAfterDays` (default 180). A site needs review when its review or expiration date is due within `reviewHorizonDays`. The review horizon is clamped to 7–365 days; source page size, pages and items are clamped to 50, 5 and 200 respectively.

## Read-only security boundary

The runtime uses `SPHttpClient.get` only. It has no POST, PUT, PATCH or DELETE calls; it does not request Graph permissions, `webApiPermissionRequests`, credentials or secrets; and it does not contact external hosts. URLs and OData next links are validated before use and must remain HTTPS on the current SharePoint tenant. Managed paths such as `/sites/...` are retained.

This is not an administration tool. It cannot create, update, delete, permission, hub, site or lifecycle data. SharePoint still enforces the signed-in viewer's access to each source.

## Limitations

- SharePoint REST fields vary by endpoint, site type and permissions. Missing or unsupported fields remain unknown rather than being inferred.
- The source list is deliberately bounded: four sources, 50 rows per page, five pages and 200 items per source.
- A partial state means malformed rows, an unavailable next page, or the configured page limit prevented a complete read. Throttled, permission, retry and generic error states are kept visible per source.
- Lifecycle classification is a review signal, not a compliance decision. Dates and usage values are displayed as supplied by SharePoint and are not refreshed outside the user-triggered read.
- No screenshots are included because this sample has no captured deployment output.

## Official Microsoft references

- [SharePoint Framework web parts](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/overview)
- [SPHttpClient](https://learn.microsoft.com/javascript/api/sp-http/sphttpclient)
- [SharePoint REST service](https://learn.microsoft.com/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service)
- [SharePoint Framework v1.23 release notes](https://learn.microsoft.com/sharepoint/dev/spfx/release-1.23)
