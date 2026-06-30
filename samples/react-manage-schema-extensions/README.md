# Schema Extensions Manager

## Summary

Manage Schema Extensions is a SharePoint Framework (SPFx) solution (also Microsoft Teams / Microsoft 365 host ready) that provides a full UI to Create, Read, Update and Delete (CRUD) Microsoft Graph Schema Extensions and to track the extensions you have created in your tenant. It leverages Microsoft Graph (v1.0) `/schemaExtensions` endpoint together with SharePoint Tenant Properties (App Catalog site) to persist the list of schema extension IDs that were created through the tool so they can be rediscovered later.

Key goals:

- Provide administrators / solution builders with a safe UI to experiment with and manage schema extensions without using raw Graph calls.
- Persist the list of created schema extensions (IDs) in a tenant property so that even after a browser refresh the previously created extensions can be listed again.
- Offer multi-host support (SharePoint page, Microsoft Teams, Outlook, Office) with automatic theming (light / dark / high contrast).
- Demonstrate modern React + Fluent UI (v9) patterns inside SPFx 1.21.1 including hooks, error boundaries, state management with Jotai and custom reusable hooks package `@spteck/m365-hooks`.

![version](<./assets/Screenshot 2025-09-26 at 21.30.22.png>)
![version](<./assets/Screenshot 2025-09-27 at 14.48.16.png> )
![version](<./assets/Screenshot 2025-09-27 at 14.48.32.png>)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.21.1](https://img.shields.io/badge/SPFx-1.21.1-green.svg)
![Node.js v22](https://img.shields.io/badge/Node.js-v22-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- SharePoint Framework development environment (Node.js LTS supported by SPFx 1.21.1)
- A Microsoft 365 tenant with an App Catalog (Tenant App Catalog site is required because the solution stores tenant properties there)
- Appropriate admin consent for the Microsoft Graph delegated permissions listed below
- (Optional) Teams, Outlook, Office hosts if you want to test multi-host experiences

## Contributors

- [João Mendes](https://github.com/joaojmendes)

### High-level Architecture

1. SPFx web part `ManageSchemaExtensionsWebPart` renders React component tree.
2. `ManageSchemaExtensions` component determines host (SharePoint / Teams / etc.), sets theme, checks user permissions against the App Catalog site, and conditionally renders either an access info panel or the management UI.
3. `useSchemaExtension` custom hook encapsulates all Microsoft Graph calls (`/schemaExtensions` endpoint) and tenant property interactions (using `useAppCatalog`).
4. Created schema extension IDs are saved in a JSON array in a tenant property named `ManageSchemaExtensionsCreatedSchemaIds` for future retrieval.
5. Fluent UI (v9) theming + Jotai global state manage UI state, logging via `useLogging`.

### Data Flow

Create / Update / Delete actions -> Microsoft Graph -> On success update tenant property (add/remove schema ID) -> Refresh local list by fetching each stored ID from Graph.

### Error Handling & Logging

All Graph interactions are wrapped with a helper that maps common Graph errors (403, etc.) to user-friendly messages. Logging is centralized through `useLogging` allowing future plug-in to Application Insights or other telemetry.

## Version history

| Version | Date | Comments |
| ------- | ---- | -------- |
| 1.0.0 | 2025-09-27 | Initial documented release (updated README, clarified permissions) |


## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp serve`

## Features

| Area | Description |
| ---- | ----------- |
| CRUD Management | Create new schema extensions, list previously created ones (by ID), view details, update (description, properties, status) and delete extensions. |
| Tenant Property Tracking | Automatically stores extension IDs in a single tenant property (`ManageSchemaExtensionsCreatedSchemaIds`). |
| Permission Awareness | Detects if current user lacks sufficient App Catalog permissions and shows an informational panel instead of failing silently. |
| Multi-host & Theming | Supports SharePoint, Teams, Outlook, Office with dynamic theme adaptation (light, dark, high contrast). |
| Modern React Stack | Uses hooks, Jotai for global state, Error Boundary, Fluent UI v9 components, toast notifications, structured logging hooks. |
| Accessibility & UX | Keyboard-friendly Fluent components and theming tokens for contrast compliance. |

### UI Components (Selected)

- `ManageSchemaExtensions` — Root orchestrator, host/theming, permission check.
- `ManageSchemaExtensionsControl` — Core management UI (list, actions, drawers/panels).
- `SchemaExtensionsListView` — Data grid / list rendering of stored schema extensions.
- `SchemaExtensionDrawer` / `SchemaExtensionViewer` — Detail view & edit surfaces.
- `AccessInformation` — Shown when user lacks required permissions.

### Custom Hooks & Utilities

- `useSchemaExtension` — Encapsulates Graph client creation and CRUD logic.
- `useAppCatalog` — used for tenant property operations.
- `useSharePointPermission` — Determines if user can manage tenant properties.
- `useLogging`  — Diagnostics.

## Microsoft Graph Permissions

This solution calls the Microsoft Graph `/schemaExtensions` endpoint which requires delegated permissions. In `config/package-solution.json` the following scopes are currently requested:

| Scope | Why it is needed |
| ----- | ---------------- |
| User.Read.All | (Often required by sample scaffolding) Not directly used for schema extension CRUD; can potentially be removed if not needed elsewhere. |
| Application.ReadWrite.All | Required to create and manage schema extensions because ownership is tied to an application registration and managing extensions can involve reading/updating application metadata reference. |

Recommended minimal set for strictly managing schema extensions (delegated):

1. `Application.ReadWrite.All` (create/update/delete schema extensions)
2. `Directory.Read.All` (sometimes required to resolve app/owner; add if you encounter permission issues)

> If you intend to associate schema extensions with resources that require additional permissions (e.g., extending Groups, Users, Devices, Messages), ensure the user/application has the relevant delegated or application permissions to read/write those entities when you later leverage the extension data.

### Admin Consent

An administrator must grant consent to these permissions in the tenant. After packaging and deploying the SPFx solution to the App Catalog, approve the pending API permission requests from the SharePoint Admin Center (API access page).

### Reducing Permissions

If `User.Read.All` is not needed by any other part of your solution, you can remove it from `webApiPermissionRequests` to follow the principle of least privilege.

## Tenant Properties Usage

The solution writes a single tenant property named `ManageSchemaExtensionsCreatedSchemaIds` containing a JSON array of objects: `[{ "schemaId": "{id}" }, ...]`. This persists only the IDs; the actual schema is always retrieved live from Microsoft Graph ensuring you see the latest status/properties. Removing the property (manually or via the UI when the last ID is deleted) results in an empty list on next load.

## Installation & Run

1. Clone the repository
2. Install dependencies
3. Serve locally (workbench) or package for deployment

```bash
npm install
gulp serve
```

For production package:

```bash
gulp bundle --ship
gulp package-solution --ship
```

Deploy the generated `.sppkg` from `sharepoint/solution` to the App Catalog, approve API permissions, then add the web part to a page or a Teams app (sync in Teams admin center or using `Add to Teams` if configured).

## Permission & Access Checks

On initialization, the component:

1. Ensures App Catalog URL is retrievable (failing with a friendly message if not found)
2. Checks user permissions on the App Catalog site; if insufficient, shows `AccessInformation` instead of the management UI
3. Loads previously stored schema extension IDs and fetches each extension individually from Graph


## Security & Governance

- Principle of least privilege: keep only permissions required for schema extension operations
- Tenant property stores only IDs (no sensitive property values)
- All Graph errors are sanitized to avoid leaking internal exception details

## Troubleshooting

| Issue | Possible Cause | Resolution |
| ----- | -------------- | ---------- |
| Empty list after creating extension | Tenant property not updated or permission denied | Check App Catalog permissions; ensure admin consent granted. |
| 403 Forbidden on create/update | Missing `Application.ReadWrite.All` consent | Approve permission in Admin Center, re-run. |
| Cannot read App Catalog URL | App Catalog not provisioned | Provision a Tenant App Catalog site. |

## Contributing

1. Fork & create feature branch
2. Follow existing coding style (ESLint + Prettier if configured)
3. Add/update documentation where relevant
4. Open PR describing the change and any permission impacts

## License

See project root (add LICENSE file if not present).

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from <http://aka.ms/m365pnp>.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com//sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com//sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com//sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com//sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-manage-schema-extensions" />
