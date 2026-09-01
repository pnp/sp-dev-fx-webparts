# Flex Forms

## Summary

Flex Forms is a focused SharePoint Framework sample with two web parts: a designer for one-page form definitions and a renderer that submits published forms to a SharePoint list.

Screenshots are intentionally omitted until the sample has been run in a SharePoint Online tenant and scrubbed real images are available.

## Used SharePoint Framework version

![SPFx 1.23.2](https://img.shields.io/badge/SPFx-1.23.2-green.svg)

## Compatibility

The sample targets the stable SPFx 1.23.2 toolchain: Node.js 22, TypeScript 5.8.3, React 17.0.1, and Heft. It targets SharePoint Online and the SharePoint-hosted workbench; tenant validation is still pending. The local workbench is not supported by SPFx 1.23.2.

## Applies to

- SharePoint Online
- SharePoint-hosted workbench

## Prerequisites

- Node.js `22.22.2` (see `.nvmrc`)
- A SharePoint Online tenant with an app catalog
- Permission to install the solution on a site and create lists and columns there

The solution provisions a `Flex Forms` configuration list when its site feature is installed. Publishing a form creates its target list when missing and adds only missing supported columns. It does not delete lists, columns, or items; an incompatible existing column blocks publishing.

## Solution

| Solution | Author |
| --- | --- |
| `react-flex-forms` | [Vilius Vystartas](https://github.com/vystartasv) |

## Contributors

- [Vilius Vystartas](https://github.com/vystartasv)

## Version history

| Version | Date | Comments |
| --- | --- | --- |
| 0.0.1 | August 28, 2026 | Initial sample implementation |

## Minimal path to awesome

1. Clone the repository and change to this solution folder.
2. Select the committed Node version and install the exact lock:

   ```shell
   nvm use
   npm ci
   ```

3. Start the development server:

   ```shell
   npm start
   ```

4. Open the SharePoint-hosted workbench shown by Heft, add the **Form Designer** web part, and create a form.
5. Add the **Form Renderer** web part and set its published form ID in the property pane.

Local verification commands:

```shell
npm run lint
npm test
npm run build
npm run package
```

`npm run package` creates an ignored local `.sppkg` under `sharepoint/solution/`; generated packages are not source artifacts.

## Implemented scope (tenant validation pending)

- SPFx `1.23.2`, React `17.0.1`, Fluent UI v9, and PnPjs v4
- One-page form definitions stored in SharePoint
- Text, multiline text, number, choice, date, and yes/no fields
- Add, edit, move up/down, remove, save-draft, and publish state transitions
- Published-form loading, required/type validation, first-invalid-field focus, and duplicate-submit protection
- Idempotent missing-column creation with incompatible-column blocking and no delete path
- Safe visible messages for SharePoint 400, 403, 404, and 429 responses, with technical details sent to PnP logging
- Fluent `Field` label, required, help, and announced validation associations for the six supported controls

## Limitations and validation status

- SharePoint Online and `SharePointWebPart` are the only target and host.
- The renderer selects one published definition by configuration-list item ID.
- Multi-page forms, attachments, people, taxonomy, lookup, rich text, currency, conditional logic, drafts, workflows, approvals, telemetry, and cross-site targets are not included.
- A real tenant run is still required before claiming designer persistence, provisioning, submission, permission-error, keyboard, responsive, dark-theme, or high-contrast validation.
- Tenant and screenshot evidence are unverified in this source tree; no real-tenant or screenshot claim is made.
- Source-rights confirmation, upstream acceptance, and CLA status are also unverified; no approval is implied.

## Help

This community sample is not formally supported. For build or compatibility issues, run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from the sample directory. For sample-specific questions or bugs, use the [upstream issue tracker](https://github.com/pnp/sp-dev-fx-webparts/issues) after checking existing issues.

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## References

- [SharePoint Framework documentation](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [SharePoint Framework compatibility](https://learn.microsoft.com/sharepoint/dev/spfx/compatibility)
- [PnPjs SPFx project setup](https://pnp.github.io/pnpjs/concepts/project-preset/)
- [PnPjs selective imports](https://pnp.github.io/pnpjs/concepts/selective-imports/)
- [PnPjs error handling](https://pnp.github.io/pnpjs/concepts/error-handling/)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-flex-forms" />
