# React Events Feed Web Part

## Summary

A SharePoint Framework (SPFx) web part that aggregates and displays calendar events from multiple sources — Microsoft 365 Group calendars and SharePoint list calendars — in a single, unified feed. It supports **9 layout styles**, live date-range filtering with timezone-aware boundaries, drag-and-drop reordering, and full SharePoint theme integration via Fluent UI v9. Built with [**@spteck/react-controls-v2**](https://www.npmjs.com/package/@spteck/react-controls-v2) and runs on SharePoint Online, Microsoft Teams, and Microsoft 365 (Office) hosts.

![Agenda layout](./src/assets/feed01.png)
![Grid layout](./src/assets/feed02.png)
![List layout](./src/assets/feed03.png)
![Feature layout](./src/assets/feed04.png)

## Features

- **Multiple calendar sources** — mix M365 Group calendars and SharePoint list-based calendars side by side
- **9 layout modes** — Agenda, Grid, List, Filmstrip, Marquee (auto-scroll), Carousel, Feature, Masonry, and CompactList
- **Live date-range filters** — All Upcoming, This Week, Next Two Weeks, This Month, This Quarter, or a custom date range via a date picker
- **Timezone-aware filtering** — all date boundaries are computed in the user's local timezone and converted to UTC before querying the Graph/SharePoint APIs
- **Auto-refresh** — configurable polling interval (default 5 min)
- **Drag & drop** — reorder event cards in Grid, List, Masonry, and Feature layouts
- **Customisable card content** — toggle description, meta, location, and organiser per instance
- **Configurable card text lines** — control headline and description line clamping
- **SharePoint theme support** — `supportsThemeVariants: true`, dark mode aware
- **Multi-host support** — SharePoint Web Part, SharePoint Full-Page App, Teams Personal App, Teams Tab

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix\> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.23.0](https://img.shields.io/badge/SPFx-1.23.0-green.svg)
![Node.js v22](https://img.shields.io/badge/Node.js-v22-green.svg)
![Toolchain: Heft](https://img.shields.io/badge/Toolchain-Heft-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Version history

| Version | Date | Comments |
| ------- | ---- | -------- |
| 1.0.0 | May 24, 2026 | Initial release |

## Contributors

- [João Mendes](https://github.com/joaojmendes)

## Supported Hosts

| Host | Supported |
| ---- | --------- |
| SharePoint Web Part | Yes |
| SharePoint Full-Page App | Yes |
| Microsoft Teams Tab | Yes |
| Microsoft Teams Personal App | Yes |

## Prerequisites

- Node.js **>=22.14.0 <23.0.0**
- [Heft CLI](https://www.npmjs.com/package/@rushstack/heft) (installed locally by `npm install`)
- Access to a Microsoft 365 tenant with permission to deploy SPFx solutions to the App Catalog
- A SharePoint Global or App Catalog Admin to approve the Graph API permissions listed below

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/pnp/sp-dev-fx-webparts.git
cd sp-dev-fx-webparts/samples/react-events
npm install
```

### 2. Run locally

```bash
npm run start
```

Then open the SharePoint-hosted workbench:
`https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/workbench.aspx`

### 3. Build for production

```bash
npm run build
```

The `.sppkg` package is output to the `sharepoint/solution/` folder.

### 4. Deploy

1. Upload the `.sppkg` file to your SharePoint **App Catalog**
2. Choose **Make this solution available to all sites** for tenant-wide deployment
3. Trust the solution when prompted
4. Go to **SharePoint Admin Center → Advanced → API access** and approve the required permissions (see [Required API Permissions](#required-api-permissions) below)
5. Add the **Events Feed** web part to any SharePoint page, Teams tab, or Teams personal app

## Configuration

Open the web part property pane by clicking **Edit**. The property pane is organized into two tabs:

### Layout tab

| Setting | Description |
| ------- | ----------- |
| **Title** | Web part heading displayed above the feed (default: `Events`) |
| **Layout** | Choose from 9 visual layouts (visual thumbnails shown in the picker) |
| **Height** | Container height — accepts `px`, `%`, `vh`, or `auto` (default: `100%`) |
| **Marquee Direction** | *(Marquee layout only)* Sets scroll direction: **Vertical** or **Horizontal** |
| **Allow Drag** | *(Grid, List, Masonry, Feature layouts)* Enables drag-and-drop card reordering |

### Content tab

| Setting | Description |
| ------- | ----------- |
| **Selected Calendars** | M365 Group calendars and/or SharePoint list calendars to aggregate |
| **Max Events** | Maximum number of events to display (default: `10`) |
| **Refresh Interval** | Auto-refresh interval in minutes (default: `5`) |
| **Headline Lines** | Number of lines before the event title is clamped (default: `2`) |
| **Description Lines** | Number of lines before the event body is clamped (default: `2`) |
| **Show Description** | Show/hide the event body text on cards |
| **Show Meta** | Show/hide the date/time badge on cards |
| **Show Location** | Show/hide the location field on cards |
| **Show Organiser** | Show/hide the organiser name on cards |
| **Show Filters** | Show/hide the date-range filter dropdown in the header |

## Layout Reference

| Layout | Description |
| ------ | ----------- |
| **Agenda** | Date column on the left with event rows — ideal for a traditional calendar view |
| **Grid** | Responsive 3-column card grid with banner images |
| **List** | Vertical stack of compact horizontal cards |
| **Filmstrip** | Horizontally scrollable strip of tall cards |
| **Marquee** | Auto-scrolling vertical or horizontal ticker |
| **Carousel** | Single full-width card with previous/next navigation and dot indicators |
| **Feature** | Alternating large + side card layout — editorial style |
| **Masonry** | Pinterest-style columns with variable card heights |
| **CompactList** | Minimal single-line rows — maximum information density |

## Calendar Sources

### M365 Group calendars

Events are fetched from the Microsoft Graph `calendarView` endpoint:

```
GET /groups/{groupId}/calendarView?startDateTime={utcISO}&endDateTime={utcISO}
```

Returned events include `start.dateTime` (in the event's configured timezone) and `start.timeZone` (Outlook timezone name, e.g. `"Eastern Standard Time"`).

### SharePoint List calendars

Events are fetched via the SharePoint REST API:

```
GET /sites/{siteId}/lists/{listId}/items?expand=fields
    &$filter=fields/EventDate ge '{utcISO}' and fields/EndDate lt '{utcISO}'
```

SharePoint stores `EventDate` and `EndDate` in UTC. The filter uses UTC ISO strings so cross-timezone comparisons are correct.

## Date Filtering & Timezone Handling

The **Filter Events** component computes all date boundaries in the **user's local (browser) timezone** and converts them to UTC before passing them to the API:

| Preset | Start | End |
| ------ | ----- | --- |
| All Upcoming | now (UTC) | now + 180 days |
| This Week | Monday 00:00 local → UTC | Sunday 23:59:59 local → UTC |
| Next Two Weeks | now (UTC) | now + 14 days |
| This Month | 1st of month 00:00 local → UTC | Last day 23:59:59 local → UTC |
| This Quarter | 1st of quarter 00:00 local → UTC | Last day of quarter 23:59:59 local → UTC |
| Custom Range | Picked date 00:00 local → UTC | Picked date 23:59:59 local → UTC |

> **Note**: The custom date picker (`SelectDay`) applies `date-fns-tz.toZonedTime` internally. The web part normalises the returned `Date` back to local midnight/end-of-day using `new Date(y, m, d, ...)` before calling `.toISOString()`, ensuring the UTC filter boundaries correctly reflect the user's local timezone.

## Required API Permissions

The following Microsoft Graph delegated permissions must be approved by a **SharePoint/Global Admin** after deploying the `.sppkg` to the App Catalog:

| Permission | Reason |
| ---------- | ------ |
| `Calendars.Read` | Read events from M365 Group calendars via `calendarView` |
| `GroupMember.Read.All` | List the user's M365 Groups for the calendar picker (`/me/transitiveMemberOf`) |
| `Sites.Read.All` | Read SharePoint list events and resolve Group SharePoint sites |
| `MailboxSettings.Read` | Read the user's mailbox timezone setting |

These are declared in [config/package-solution.json](config/package-solution.json) under `webApiPermissionRequests`.


## Technology Stack

| Technology | Purpose |
| ---------- | ------- |
| [SPFx 1.23.0](https://aka.ms/spfx) | SharePoint Framework runtime & build toolchain |
| [@spteck/react-controls-v2](https://www.npmjs.com/package/@spteck/react-controls-v2) | Event feed layouts and shared UI controls |
| [@spteck/m365-hooks](https://www.npmjs.com/package/@spteck/m365-hooks) | Graph & SharePoint data hooks (`useEventManagement`, `useTimeZoneHelper`) |
| [@spteck/react-controls-v2-spfx-adapter](https://www.npmjs.com/package/@spteck/react-controls-v2-spfx-adapter) | SPFx context adapter for react-controls-v2 |
| [@fluentui/react-components 9.x](https://react.fluentui.dev/) | Fluent UI v9 components and design tokens |
| [@fluentui/react-migration-v8-v9](https://www.npmjs.com/package/@fluentui/react-migration-v8-v9) | SPFx v8 theme to Fluent v9 theme conversion |
| [@emotion/css](https://emotion.sh/) | CSS-in-JS for dynamic theming |
| [jotai](https://jotai.org/) | Lightweight atom-based state management |
| [Heft](https://heft.rushstack.io/) | Build toolchain (replaces Gulp in SPFx 1.22+) |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft Teams](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-events" />
