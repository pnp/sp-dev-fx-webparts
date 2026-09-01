# Intranet Announcements and Targeted Notification Center

An SPFx 1.23.2 React 17 / Fluent UI v9 presentation and review sample. It reads announcement list items with SharePoint REST `GET` only. It never sends, creates, updates, dismisses, or deletes notifications.

## Setup

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

Deploy the generated package from `sharepoint/solution` to the tenant App Catalog, then add the web part to a page. Use Node `>=22.14.0 <23.0.0`.

## Configuration

In the property pane, provide up to four server-relative list paths, one per line (for example `/sites/intranet/Lists/Announcements`). The web part requests a fixed allow-list of fields, at most 50 rows per page, 5 pages, and 200 rows per source. It ignores unsafe paths, unsafe URLs, malformed rows, untrusted next links, and unsafe external images/links.

The optional reference date makes review and tests repeatable. If it is empty, the current date at load time is used. An item is shown when `IsPublished` is not false, `PublishDate` is not in the future, and `ExpiryDate` is not in the past. Missing publish/expiry fields mean that boundary is not applied; this is only a fallback, not proof that an item is published.

The optional current audience label is compared with labels present in the item’s `Audience` or `TargetAudience` field. A blank item audience is treated as a match. This is a configured audience-label match only: the sample does not resolve Microsoft 365 group membership, authorize access, or make authorization decisions.

## Read-only and security/privacy scope

This sample is a bounded read-only presentation. SharePoint permissions still control whether the signed-in user can read each list. Do not put secrets, credentials, personal data, or sensitive audience information into web part properties. Validate list paths, tenant URLs, list permissions, retention requirements, and privacy impact with your tenant administrators before use.

This sample does not replace Viva Engage, Teams notifications, SharePoint news distribution, or Microsoft 365 audience authorization.

## Tenant validation checklist

- Confirm each configured path is server-relative, points to the intended tenant, and contains only approved announcement data.
- Confirm the signed-in test accounts have the expected read permissions and verify 401/403 behavior.
- Test future publish dates, expired items, missing dates, malformed rows, empty lists, partial pages, throttling, and service unavailable responses.
- Confirm the audience label is maintained by the content owner and is not treated as group-membership or authorization evidence.
- Confirm external images and links are intentionally rejected; review accessibility, privacy, retention, and page performance.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-intranet-announcements-notification-center" />
