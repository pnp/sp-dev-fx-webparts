# Retention and Records Review Dashboard

This SharePoint Framework 1.23.2 React 17 web part is a read-only inventory and review aid. It reads configured SharePoint library/folder items and surfaces item title, path, modified date, content type, available record/retention indicators, and missing review metadata.

It is not policy enforcement. It does not apply retention labels, declare records, change metadata, request permissions, or replace Microsoft Purview configuration or an organization’s review process.

## Run

```bash
nvm use
npm install
npm test
gulp serve
```

Use Node `22.14.0` from `.nvmrc`. The sample is intentionally standalone; install dependencies from this directory only.

## Local JSON configuration

Edit [`src/assets/configuration.json`](src/assets/configuration.json). The file is bundled locally and is not fetched from a remote configuration endpoint.

```json
{
  "tenantOrigin": "https://tenant.sharepoint.com",
  "pageSize": 25,
  "maxPages": 4,
  "reviewFields": [
    { "key": "ReviewStatus", "label": "Review status", "kind": "status" }
  ],
  "sources": [
    {
      "id": "records",
      "label": "Records",
      "siteUrl": "/sites/legal",
      "libraryServerRelativeUrl": "/sites/legal/Records",
      "folderServerRelativeUrl": "/sites/legal/Records/To review",
      "enabled": true
    }
  ]
}
```

`pageSize` is bounded to 1–100, `maxPages` to 1–10, sources to 8, and review fields to 12. SharePoint internal names are validated against a conservative identifier pattern. Library and folder URLs must be server-relative. An optional `siteUrl` may be relative or same-origin only; absolute URLs outside the current tenant are rejected. The web part also caps enabled sources at `maxSources`.

## REST and read-only behavior

PnPjs is the only SharePoint data access layer. It issues GET-only list-item requests equivalent to:

`GET {site}/_api/web/lists/getByTitle(...)/items?$select=...&$expand=ContentType&$filter=FileDirRef eq '...' and FSObjType eq 0&$top=25`

PnPjs follows SharePoint `@odata.nextLink` pagination through its async item iterator, with a maximum page count. No `POST`, `PATCH`, `PUT`, or `DELETE` is present or used. The app asks for no permissions and uses the signed-in SharePoint context; normal SharePoint permissions still apply.

Each source is read independently. Permission denied, throttling, network, and unknown failures are shown while successful sources remain visible. Loading, empty, configuration/error, retry, partial-failure, and bounded-result states are available. The table has a caption, scoped headers, keyboard-operable buttons, responsive horizontal scrolling, and status/alert announcements.

## Fields and classification

The fixed fields are `Id`, `Title`, `FileRef`, `Modified`, `FSObjType`, `ContentType/Name`, `ComplianceAssetId`, `IsRecord`, `RetentionLabel`, and `RetentionLabelAppliedDate`. Configured `reviewFields` are selected by internal name. Missing values are highlighted per item. Classification is deliberately descriptive: `Record` when `IsRecord` is true, `Retention label` when a label is available, `Needs review` when configured review values are missing, otherwise `No indicator`. “Available” means exposed by SharePoint to the current user; absence is not proof that policy is absent.

## Official references

- [Microsoft Purview records management](https://learn.microsoft.com/purview/records-management)
- [SharePoint records management](https://learn.microsoft.com/sharepoint/governance/records-management)
- [SharePoint Framework overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [SharePoint REST API overview](https://learn.microsoft.com/sharepoint/dev/sp-add-ins/working-with-folders-and-files-with-rest)

## PnP sample metadata

`assets/sample.json` contains one valid PnP sample entry, credited to `vystartasv`, dated `2026-08-30`, with the official references above.
