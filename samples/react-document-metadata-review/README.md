# Document Metadata Review

`react-document-metadata-review` is a SharePoint Framework 1.23.2 React 17 web part for reviewing document metadata in a configured SharePoint document library. It uses PnPjs SharePoint REST calls and Fluent UI v9 controls.

## What it does

- Reads up to 500 document items from a server-relative library path and optional folder path.
- Displays document links, modified information, and a configured set of at most eight metadata fields.
- Classifies each field as valid, missing, empty, or invalid and filters documents by `All documents`, `Needs review`, or `Complete`.
- Handles invalid configuration, loading, empty results, access denied, not found, throttling, network errors, and retryable failures.
- Provides keyboard-accessible controls, live status updates, visible focus, and a compact mobile card layout.

The web part has no create, update, delete, upload, check-in, or bulk mutation code. The only SharePoint operation is a bounded `GET` of list items.

## Permissions and deployment

The hosting user needs read permission on the configured document library and the documents returned by the query. No application permission or write permission is requested by this solution. Deploy the `.sppkg` to the tenant app catalog, trust it, and add the web part to a page with access to the library.

## Configuration

Open the web part property pane and configure:

- **Library path**: a server-relative library path such as `/sites/legal/Shared Documents`.
- **Folder path**: optional server-relative folder path such as `/sites/legal/Shared Documents/Contracts`.
- **Metadata fields**: a JSON array with no more than eight fields. Internal names are validated before they are used in the REST `$select` query.
- **Maximum rows**: an integer from 1 to 500.

Example metadata configuration:

```json
[
  { "internalName": "Title", "displayName": "Title", "required": true, "type": "text" },
  { "internalName": "DocumentOwner", "displayName": "Document owner", "required": true, "type": "text" },
  { "internalName": "ReviewDueDate", "displayName": "Review due", "required": false, "type": "date" },
  { "internalName": "DocumentType", "displayName": "Document type", "required": true, "type": "choice", "choices": ["Contract", "Policy", "Procedure"] }
]
```

Supported types are `text`, `url`, `date`, `number`, `choice`, and `boolean`. A missing value, an invalid value, or an empty required value places a document in `Needs review`; an empty optional value is shown but does not flag the document.

## Local development

Use Node.js 22.14.0 (`.nvmrc`), then run:

```bash
npm ci
npm test
npm run serve
```

The SharePoint hosted workbench is required for live REST access. The tests cover path and field validation, row and field bounds, metadata classification, formatting, review filtering, and service error classification without network access.

## Gallery assets

`assets/sample.json` contains the PnP sample gallery metadata. No screenshots are included: this sample does not claim screenshots that do not exist.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-document-metadata-review" />
