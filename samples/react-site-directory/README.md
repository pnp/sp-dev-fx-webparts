# React Site Directory

## Summary

This SharePoint Framework sample displays sites from a configured SharePoint list as responsive, searchable cards. It is read-only and uses Fluent UI v9, React 17, PnPjs v4, and the SPFx 1.23.2 Heft toolchain.

Screenshots are pending a run in a SharePoint Online tenant; no tenant or screenshot claim is made.

## Compatibility

![SPFx 1.23.2](https://img.shields.io/badge/SPFx-1.23.2-green.svg)
<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-site-directory" />

- SharePoint Online
- SharePoint-hosted workbench
- Node.js 22
- Local workbench is not supported by SPFx 1.23.2

## Prerequisites

- Node.js `22.14.0` or later in the 22.x line
- A SharePoint Online tenant and permission to add a solution
- A list containing one row per directory site

The default field mapping expects these internal names: `Title`, `Category`, `URL`, `Description`, `Owner`, and `LogoUrl`. Configure different internal names in the web part property pane as needed. `Title` and `URL` are required; the other fields are optional.

## Minimal path to awesome

1. Change to this sample directory.
2. Install dependencies with `npm install`.
3. Run `npm start` and open the SharePoint-hosted workbench.
4. Add **Site Directory** and configure the list title and field internal names.
5. Add directory items to the list and use the search, category, sort, and paging controls.

To validate the sample locally, run:

```shell
npm test
npm run lint
npm run build
npm run package
```

`npm run package` creates the deployable `.sppkg` package under the ignored `sharepoint/solution/` output path.

## Implemented scope

- Read-only SharePoint list access through PnPjs v4
- Search over title and description, category filtering, alphabetical sorting, and next/previous paging
- Responsive Fluent UI v9 cards with optional description, category, owner, and logo
- Setup guidance, loading, empty, error, and retry states
- Keyboard-accessible controls, live status text, safe HTTPS/same-origin links, and theme-compatible design tokens
- No HTML injection, writes, tenant validation, or fabricated image assets

## Help

This is a community sample and is not formally supported. For build or compatibility issues, run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from this directory. For sample-specific questions or bugs, use the [upstream issue tracker](https://github.com/pnp/sp-dev-fx-webparts/issues).

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## References

- [SharePoint Framework documentation](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [SharePoint Framework compatibility](https://learn.microsoft.com/sharepoint/dev/spfx/compatibility)
- [PnPjs SPFx project setup](https://pnp.github.io/pnpjs/concepts/project-preset/)
- [PnPjs selective imports](https://pnp.github.io/pnpjs/concepts/selective-imports/)
