# KPI Scorecard

## Summary

This React SharePoint Framework web part displays read-only operational KPIs from a SharePoint list. It shows the latest value and target for each KPI, derives threshold and trend status from the data, and provides accessible loading, empty, setup, and error states. It uses PnPjs and Fluent UI 9 without a chart library.

## Compatibility

![SPFx 1.23.2](https://img.shields.io/badge/SPFx-1.23.2-green.svg)
![Node.js v22.14.0](https://img.shields.io/badge/Node.js-v22.14.0-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

Use Node.js `>=22.14.0 <23.0.0`. See the [SPFx compatibility matrix](https://aka.ms/spfx-matrix) before using a different SPFx or Node.js version. The local workbench is not supported by current SPFx versions; use the hosted SharePoint workbench.

## SharePoint list setup

Create a list named `KPI Observations` with one row per KPI observation. Use these columns and internal names:

| Display name | Type | Required |
| --- | --- | --- |
| Title | Single line of text | Yes |
| Value | Number | No |
| Target | Number | No |
| Status | Single line of text | No |
| Date | Date and time | No |

Add multiple dated rows with the same `Title` to calculate a deterministic change from the latest to the previous observation. The web part only reads list items.

## Configuration

In the property pane, set the list title and the internal names for the title, value, target, and status fields. The date field is optional. `Root web path` can be blank for the current web or a site-relative path such as `/sites/Operations`; `Date filter` is optional and includes observations on or after a `YYYY-MM-DD` date.

## Local validation

```bash
npm install
npm test
npm run build
```

To run the hosted workbench development server, use `npm start` and open the URL shown by Heft.

## Limitations

- Each request is capped at 100 SharePoint list items and the UI displays at most six KPI cards.
- Results are grouped by exact KPI title; the latest date (then highest SharePoint ID) is current.
- Values and targets are numeric fields. Missing or invalid values are shown as unavailable.
- The web part requires permission to read the configured web and list and does not create or update data.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-kpi-scorecard" />
