# Accessibility Content Auditor

This SharePoint Framework 1.23.2 React 17 web part is a read-only heuristic auditor for content quality. It reads one configured modern page or up to 50 items from a configured list and inspects only the configured allow-listed fields:

- missing or empty image `alt` text;
- empty or generic link labels such as “Click here” and “Read more”;
- skipped heading levels;
- empty configured required fields.

Each finding includes severity, rule, evidence, item, and a same-origin SharePoint edit-form URL for safe human remediation. The URL opens an item; the web part never calls mutation APIs and does not edit, delete, publish, or write audit results. “Heuristic” is intentional: this is not WCAG certification, an accessibility conformance statement, or a replacement for manual testing.

## Configuration and bounds

Use the property pane to choose `page` or `list`. Page mode reads `Site Pages` and matches the file name from `pagePath` (for example `/SitePages/Home.aspx`); list mode reads `listTitle`. List reads are capped at 50 items, page reads at one item, and PnPjs `$select` includes only the fixed allow-list plus `Id`, `FileRef`, and `FileLeafRef`. Unknown field names are ignored. The UI reports empty sources and partial item failures.

## Permissions and validation

The solution requests no Microsoft Graph application permissions. It uses the current SharePoint user’s delegated access to the current site through SharePoint REST/PnPjs. The user needs read access to the selected list and items; opening remediation URLs may require edit access, which SharePoint enforces separately. Validate in a non-production tenant with a test page/list and least-privileged accounts. Hosted Workbench is required; the local Workbench is not supported by current SPFx.

## Run and test

```bash
nvm use
npm install
npm test
npm run start
```

Package the solution with `npm run package`. The sample uses Node 22.14.0, SPFx 1.23.2, React 17, Fluent UI v9, and PnPjs 4.20.x.

## Official references

- [SharePoint Framework overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Build a SharePoint client-side web part](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
- [SharePoint Framework compatibility matrix](https://aka.ms/spfx-matrix)
- [PnPjs SharePoint documentation](https://pnp.github.io/pnpjs/sp/)
- [Fluent UI React components](https://react.fluentui.dev/)

## Credits and dates

Created and updated 2026-08-30. Credited to [vystartasv](https://github.com/vystartasv).
