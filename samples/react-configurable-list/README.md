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
  - react
---
# Configurable List and Records

## Summary

This SPFx 1.23.2 React web part is a read-only browser for a SharePoint list. Configure the list title, visible field internal names, page size, default sort field and direction, and whether search is enabled. The desktop view is a table and the narrow-screen view is a keyboard-accessible card list.

There is no real tenant screenshot yet; the gallery metadata intentionally has an empty `thumbnails` array. A tenant screenshot is pending.

## List setup

1. Create a SharePoint list named `Records` (or use another list title in the web part properties).
2. Add representative columns such as `Status` (Choice), `Amount` (Number or Currency), `DueDate` (Date and time), `Complete` (Yes/No), `Reference` (Hyperlink), and `Owner` (Person or Group). Keep the built-in `Title` column or add another supported text column.
3. In the web part property pane, set **List title** to the list title and **Visible fields** to a comma-separated list of internal names, for example `Title,Status,Amount,DueDate,Owner`.
4. Set **Default sort field** to one of the visible fields. The default page size is 20 and the allowed range is 1–100.

The signed-in user needs SharePoint read access to the site and list, including permission to view list items and fields. This sample uses the current SharePoint user context; it does not elevate permissions or require an app-only permission. If access is denied, the web part reports the read failure and offers retry.

## Supported fields

These SharePoint field kinds are mapped and formatted:

| SharePoint kind | Display kind |
| --- | --- |
| Text, Note | Text |
| Number | Number |
| Currency | Currency |
| DateTime | Date |
| Boolean | Yes/No |
| Choice | Choice |
| URL | Hyperlink |
| User | Person |

Hidden, read-only, unsupported, or unknown fields are ignored. Multiple text, choice, or person values are displayed as a comma-separated value when SharePoint returns an array. Rich text is rendered as plain text after HTML markup is removed.

## Paging, search, and performance

Each page makes one item request for at most 100 records and uses SharePoint REST `$select`, `$expand`, `$top`, `$skip`, `$orderby`, and (for searchable fields) `$filter` parameters. Only configured fields plus the stable SharePoint `Id` are selected. Person fields explicitly select their `Title` and are expanded. The sample does not load the entire list, cache all records, or perform server-side aggregation.

Search is submitted with **Search** or the Enter key. Server filtering is limited to text, choice, and hyperlink fields, and the search string is trimmed, escaped for OData, and capped at 80 characters. If the list has no searchable field, the current bounded page is filtered in the browser; search is not a full-list or full-text search and does not search number, date, Boolean, or person fields. Sorting applies to the selected page query and the Next button is available when SharePoint returns a full page.

## Keyboard and accessibility

Search fields and buttons are native controls; Enter submits search. Column headings expose native sort buttons and `aria-sort`. Table rows can receive focus and Enter or Space selects a row. On narrow screens, cards expose button semantics: Enter or Space selects a card. Open links use safe `http`/`https` URLs in a new tab. Loading, errors, and the current page are announced with accessible labels/live regions.

## Non-goals

This sample does not create, edit, delete, or bulk-update list items. It does not implement lookup, managed metadata, attachments, file previews, full-text search, cross-list joins, offline caching, or tenant-wide administration.

## Validation

Use Node.js `22.14.x` and run these commands from this directory after dependencies are available:

```bash
npm run lint
npm test
npm run build
npm run package
```

To run the hosted workbench during development:

```bash
npm start
```

The package metadata is in [`assets/sample.json`](assets/sample.json). The gallery thumbnail will be added after a real tenant screenshot is available.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-configurable-list" />
