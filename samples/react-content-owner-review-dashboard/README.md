# Content Owner and Review Assignment Dashboard

SPFx 1.23.2 React 17 web part using Fluent UI v9. It reads configured SharePoint lists/libraries with SharePoint REST `GET` only. It never assigns owners, creates/updates/deletes review tasks, or changes items, pages, metadata, or permissions.

## Setup

Requires Node `>=22.14.0 <23.0.0`.

1. Run `npm ci`.
2. Add one to four site-relative list/library paths, one per line, in the web-part properties (for example `/sites/marketing/Shared Documents`).
3. Set an explicit reference date and due-within-days threshold.
4. Run `npm test`, `npm run verify`, `npm run build`, and `npm run package`.

## Scope and security

This is a read-only operational aid, not an authoritative compliance, ownership, or records-management determination. Owner, reviewer, status, and review-date signals are field heuristics: `ContentOwner`, `Owner`, then `Author` for ownership; `Editor` is shown as a reviewer signal. Missing fields and partial coverage are surfaced. Results are bounded to four sources, five pages, 50 rows per page, and 200 rows per source.

Paths reject traversal, control characters, backslashes, query/hash fragments, protocol-relative values, and protocols. Links and pagination remain HTTPS and same-tenant. The web URL must be a valid HTTPS SharePoint URL. Confirm the tenant, site paths, least-privilege read access, expected field internal names, and retention/security requirements before deployment.

## Commands

`npm test` runs deterministic production-linked classification, malformed-row, and URL tests. `npm run verify` scans `src` and `config` for write APIs, Graph/permission access, secrets, and unbounded `$top`; generated directories are skipped. `npm run build` bundles the web part. `npm run package` creates the production solution package.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-content-owner-review-dashboard" />
