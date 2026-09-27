# Knowledge Base Freshness and Taxonomy Hub

An SPFx 1.23.2 React 17 / Fluent UI v9 web part that gives content owners a bounded, read-only review aid for configured SharePoint lists and libraries.

## Setup

Run on Node `>=22.14.0 <23.0.0`:

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

Configure up to four server-relative list or library paths, one per line (for example `/sites/Knowledge Base/Pages`). An optional ISO reference date makes the review reproducible; when blank, the browser date is used.

## Scope and security

The web part uses SharePoint REST `GET` only. It reads a fixed, allow-listed field selection and never creates, updates, deletes, or changes terms, items, pages, metadata, or permissions. It does not use Microsoft Graph or secrets. Paths, item links, and pagination links are validated as same-tenant HTTPS/root-relative values. Results are bounded to 4 sources, 50 rows per page, 5 pages, and 200 rows per source. Empty or partial results can reflect missing fields or permissions.

This is not a claim of complete taxonomy coverage or authoritative compliance. Taxonomy and category labels are signals from the configured rows, not a taxonomy audit.

## Freshness heuristic

Using the injected reference date: a past review date is **stale**, a date within 30 days is **due soon**, a later date is **fresh**, and an absent or invalid date is **missing review date**. Missing taxonomy and owner are shown explicitly.

## Tenant validation checklist

- Confirm every configured path is server-relative and belongs to the intended site.
- Confirm the web part is running on the intended HTTPS tenant.
- Confirm readers have access to each source.
- Confirm field internal names match the expected optional fields.
- Treat the display as a review aid and validate findings in SharePoint.

## References

[Microsoft: Build your first SharePoint client-side web part](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-knowledge-base-freshness-taxonomy" />
