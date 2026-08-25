# react-delivery-plan

## Summary

Displays a project delivery dashboard from a SharePoint list. Shows tasks in four views:

- **Timeline** — Gantt chart grouped by resource with colour-coded phase bars and week gridlines
- **Weekly workload** — Heatmap showing concurrent task count per resource per week
- **Task list** — Sortable table of all tasks
- **Phase summary** — Horizontal bars spanning each phase's date range

![Timeline view](./assets/timeline.png)

## Compatibility

| SPFx version | Node.js | Compatible |
|---|---|---|
| 1.20.2 | 18.x | ✅ Yes |

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

Create a SharePoint list named `DeliveryPlan` (configurable) with these columns:

| Column | Type |
|---|---|
| Title | Single line of text |
| Resource | Person or Group |
| Phase | Choice or Single line of text |
| StartDate | Date and Time (Date only) |
| EndDate | Date and Time (Date only) |

## Solution

| Solution | Author(s) |
|---|---|
| react-delivery-plan | Sudeep Ghatak |

## Version history

| Version | Date | Comments |
|---|---|---|
| 1.0 | August 2026 | Initial release |

## Minimal path to awesome

```bash
cd samples/react-delivery-plan
npm install
gulp bundle --ship
gulp package-solution --ship
```

Deploy the `.sppkg` from `sharepoint/solution/` to your App Catalog, add the web part to a page, and configure the list name in the property pane.
