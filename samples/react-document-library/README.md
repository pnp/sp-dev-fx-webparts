---
page_type: sample
products:
- office-sp
languages:
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - React
  createdDate: 8/30/2026
---
# Business Document Library

## Summary

This React and SharePoint Framework 1.23.2 web part browses the folders and files in one configured SharePoint document library or library folder. It reads metadata through PnPjs and delegates file actions to SharePoint.

## Setup

Use Node.js `22.22.2` (the version in `.nvmrc`), then run:

```bash
cd samples/react-document-library
nvm install 22.22.2
nvm use 22.22.2
npm install
npx heft trust-dev-cert
npm run start
```

Open the hosted workbench at `https://<tenant>.sharepoint.com/_layouts/15/workbench.aspx`, add **Business Document Library**, and configure the web part. For a production package, run `npm run package` and deploy the generated `.sppkg` from `sharepoint/solution/` to the tenant app catalog.

## Permissions and configuration

The signed-in visitor must have SharePoint **Read** (or a higher permission level) on the site and the configured library/folder. The web part does not elevate permissions; unique permissions and item-level security still apply. If the library cannot be listed, configure its root path directly and ensure the visitor can read that path.

Configure either a library title or a server-relative root path:

- **Library title**: the exact SharePoint library title, such as `Documents`. When the root path is blank, the web part resolves the library root with SharePoint’s list API.
- **Library/root path**: a server-relative path such as `/sites/Finance/Documents` or `/teams/Operations/Shared Documents/Policies`. It must start with `/` and contain no host name, query string, fragment, backslash, empty segment, or `.`/`..` traversal. When supplied, this path is used as the security boundary and library title is used only as the display label.
- **Items per request**: 1–100. The UI default is 25.

## Supported operations

- Open a folder from the contents list or a breadcrumb.
- Open a file in a new SharePoint tab.
- Download a file through SharePoint.
- Refresh the current folder.
- Show or hide folders, file type, and modified date.

Inline preview is not supported; use **Open** to view a file in SharePoint.

## API and file-size limitations

The sample uses SharePoint REST through PnPjs: list root resolution selects `Title` and `RootFolder/ServerRelativeUrl`; folder queries select `Name` and `ServerRelativeUrl`; file queries select `Name`, `ServerRelativeUrl`, `TimeLastModified`, and `Length`. Each request is bounded to at most 100 folders and 100 files. There is no continuation-token pagination, so a folder with more items requires a future pagination feature.

Only file metadata is read. The sample does not stream, proxy, cache, or impose an application file-size limit. Open and download are handled by SharePoint and the browser and remain subject to their service, permission, and browser limits. A missing or invalid metadata size is shown as `—`.

## Non-goals

This sample does not upload, create, edit, delete, rename, move, copy, share, or change permissions for files or folders. It does not search, filter, sort, bulk-select, edit metadata, preview file content inline, provide custom file viewers, synchronize or cache content, proxy downloads, enumerate beyond the bounded first page, or call Microsoft Graph or any external API.

## Validation

From this directory, after dependencies are available:

```bash
npm run lint
npm test
npm run build
npm run package
node -e "JSON.parse(require('fs').readFileSync('assets/sample.json', 'utf8')); console.log('assets/sample.json is valid JSON')"
```

`npm run lint` is intentionally mapped to `heft run --only build` for this sample. No tenant screenshot is included yet; the tenant screenshot is pending.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-document-library" />
