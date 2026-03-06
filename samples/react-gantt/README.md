# React Gantt Chart Web Part

A SharePoint Framework (SPFx) web part that displays project tasks from a SharePoint list as an interactive Gantt chart. Built with [**@svar-ui/react-gantt**](https://svar.dev/react/gantt/) and **Fluent UI v9**, it supports SharePoint pages, Microsoft Teams, and Microsoft 365 (Office) hosts.


![version](<./src/assets/sp-react-gant.png>)
![version](<./src/assets/sp-react-gant-prop-pane.png> )
![version](<./src/assets/teams-react-gantt.png>)

## Features

- **Interactive Gantt chart** with task bars, milestones, summary tasks, and dependency links
- **SharePoint list integration** — reads tasks from any SharePoint list (current or cross-site) via automatic field mapping with manual overrides
- **Multi-host support** — runs as a SharePoint web part, Teams personal app, Teams tab, or SharePoint full-page app
- **Theme-aware** — adapts to SharePoint themes, Teams light/dark/high-contrast themes automatically
- **Configurable time scales** — Hour, Day, Week, Month, Quarter, Year
- **Configurable columns** — choose which columns to display in the grid (Task Name, Start Date, Duration, End Date, Progress)
- **Configurable height** — slider control (300–1200px) for SharePoint pages; auto full-height in Teams/M365/full-page apps
- **Hierarchical tasks** — parent/child relationships with expandable tree structure
- **Zoom support** — mouse wheel zoom on the timeline
- **Localized UI** — English (en-US), Portuguese (pt-PT), Spanish (es-ES), French (fr-FR), German (de-DE)
- **Thin branded scrollbars** — scrollbar thumb uses the site's brand color
- **PnP PowerShell provisioning script** — quickly create a sample list with all required fields and demo data

## SharePoint Framework Version

![version](https://img.shields.io/badge/SPFx-1.22.2-green.svg)

## Supported Hosts

| Host | Supported |
| ---- | --------- |
| SharePoint Web Part | Yes |
| SharePoint Full-Page App | Yes |
| Microsoft Teams Tab | Yes |
| Microsoft Teams Personal App | Yes |

## Prerequisites

- Node.js **>=22.14.0 < 23.0.0**
- [Heft CLI](https://www.npmjs.com/package/@rushstack/heft) installed globally: `npm install -g @rushstack/heft`
- A SharePoint Online site with a list containing your project tasks (see [SharePoint List Setup](#sharepoint-list-setup) below)

## Getting Started

### 1. Install dependencies

```bash
git clone <repo-url>
cd spfx-gantt
npm install
```

### 2. Run locally

```bash
heft start --clean
```

Then open the SharePoint workbench:  
`https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/workbench.aspx`

### 3. Build for production

```bash
heft test --clean --production && heft package-solution --production
```

The `.sppkg` package will be output to the `release/` folder.

### 4. Deploy

1. Upload the `.sppkg` file to your SharePoint **App Catalog**
2. Trust the solution when prompted
3. Add the **Gantt** web part to any SharePoint page, Teams tab, or Teams personal app

## SharePoint List Setup

The web part reads task data from a SharePoint list. You need a list with the following columns:

### Required Fields

| Column | Type | Description |
| ------ | ---- | ----------- |
| **Title** | Single line of text | Task name (built-in column) |
| **StartDate** | Date and Time | When the task starts |
| **Duration** | Number | Duration in days |

### Optional Fields

| Column | Type | Description |
| ------ | ---- | ----------- |
| **DueDate** | Date and Time | Task end date |
| **PercentComplete** | Number | Progress percentage (0–100) |
| **TaskType** | Choice (`task`, `summary`, `milestone`) | Defines bar style |
| **ParentID** | Number | SharePoint Item ID of the parent task (for hierarchy) |

### Quick Provisioning with PnP PowerShell

A ready-to-use script is included that creates the list with all fields and 13 sample tasks:

```powershell
# Install PnP PowerShell if you haven't already
Install-Module PnP.PowerShell -Scope CurrentUser

# Connect to your site
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/yoursite" -Interactive -ClientId "your-client-id-app"

# Run the script (creates a "Project Tasks" list with sample data)
.\scripts\Create-GanttList.ps1
```

You can customize the list name:

```powershell
.\scripts\Create-GanttList.ps1 -ListName "My Project Tasks"
```

## Configuration

Open the web part property pane by clicking **Edit** on the web part. The property pane has three collapsible groups:

### App Title (expanded by default)

| Setting | Description |
| ------- | ----------- |
| **Title** | The heading displayed above the Gantt chart |
| **Web Part Height** | Slider (300–1200px) to set the chart height on SharePoint pages. In Teams, M365, and full-page apps the chart automatically fills the available viewport height. |

### Gantt Data Source (collapsed by default)

This group contains the **List Picker** — a custom property field with four sections:

1. **Site Picker** — typeahead search to select a SharePoint site (defaults to the current site; enables cross-site list browsing)
2. **Select List** — dropdown with infinite scrolling to pick a SharePoint list from the selected site
3. **Map Fields** — automatic field mapping attempts to match list columns by internal name, with manual overrides:
   - **Task Name** (required) — maps to the task bar label
   - **Start Date** (required) — maps to bar start position
   - **Duration** (required) — maps to bar length
   - **End Date** (optional) — shown in grid columns
   - **Progress** (optional) — percentage fill on the bar
   - **Task Type** (optional) — `task`, `summary`, or `milestone`
   - **Parent Task** (optional) — enables hierarchical tree structure
4. **Visible Columns** — checkboxes to show/hide grid columns: Task Name, Start Date, Duration, End Date, Progress
5. **Validation** — real-time validation with automatic field mapping notification, warnings for unmapped optional fields, and errors for missing required fields

### Gantt Display (collapsed by default)

| Setting | Description |
| ------- | ----------- |
| **Time Scale** | Choose the timeline granularity: Hour, Day (default), Week, Month, Quarter, Year |

## Height Behavior

The web part adapts its height based on the host environment:

| Environment | Height Behavior |
| ----------- | --------------- |
| SharePoint page (regular) | Fixed height from the slider (default: 800px) |
| SharePoint full-page app | Dynamic — fills available viewport |
| Microsoft Teams tab | Dynamic — fills available viewport |
| Microsoft Teams personal app | Dynamic — fills available viewport |

## Localization

The web part ships with full translations for all UI strings:

| Language | Locale File |
| -------- | ----------- |
| English (US) | `src/webparts/gantt/loc/en-us.js` |
| Portuguese (Portugal) | `src/webparts/gantt/loc/pt-pt.js` |
| Spanish (Spain) | `src/webparts/gantt/loc/es-es.js` |
| French (France) | `src/webparts/gantt/loc/fr-fr.js` |
| German (Germany) | `src/webparts/gantt/loc/de-de.js` |

To add a new language, create a new file (e.g., `it-it.js`) following the same AMD module pattern as the existing locale files.

## Project Structure

```
src/
  components/
    Gantt.tsx                          # Main Gantt chart component
    GanttPlaceholder.tsx               # Placeholder shown when not configured
    IGanttProps.ts                     # Component props interface
    useAvailableHeight.tsx             # Dynamic viewport height hook for Teams/full-page
    useGanttFluentThemeClass.ts        # Fluent UI token → SVAR CSS variable mapping
  constants/
    constants.ts                       # Scale presets, column definitions, defaults
    EAppHostName.ts                    # App host enum (SharePoint, Teams, Office, Outlook)
  GanttListPickerPropertyField/        # Custom property pane field
    GanttListPicker.tsx                # Orchestrates site picker, list picker, field mapper, columns
    SelectGanttList.tsx                # Coordinates list selection and validation flow
    SitePicker.tsx                     # Typeahead site search (cross-site support)
    ListPicker.tsx                     # Dropdown with infinite scroll for list selection
    FieldMapper.tsx                    # Maps SharePoint fields to Gantt fields
    ColumnSelector.tsx                 # Checkbox list for visible columns
    ValidationResult.tsx               # Field mapping validation display
    GanttListPickerPropertyField.tsx   # SPFx property pane field wrapper
    IGanttFieldDefinitions.ts          # Field definition interfaces
    IGanttListPickerProps.ts           # List picker props interface
    useGanttListPickerStyles.ts        # Styles for list picker components
  hooks/
    useSharePointGanttData.ts          # Fetches & transforms SharePoint list data
  services/
    SPListService.ts                   # SharePoint list/site REST API service
  webparts/
    gantt/
      GanttWebPart.ts                  # SPFx web part class
      GanttWebPart.manifest.json       # Manifest (hosts, icon, preconfigured entries)
      loc/                             # Localization files
scripts/
  Create-GanttList.ps1                 # PnP PowerShell provisioning script
```

## Technology Stack

| Technology | Purpose |
| ---------- | ------- |
| [SPFx 1.22.2](https://aka.ms/spfx) | SharePoint Framework |
| [@svar-ui/react-gantt 2.5.2](https://www.npmjs.com/package/@svar-ui/react-gantt) | Gantt chart rendering |
| [@fluentui/react-components 9.x](https://react.fluentui.dev/) | Fluent UI v9 (Card, Spinner, Dropdown, etc.) |
| [@fluentui/react-migration-v8-v9](https://www.npmjs.com/package/@fluentui/react-migration-v8-v9) | SPFx v8 theme → Fluent v9 theme conversion |
| [@emotion/css](https://emotion.sh/) | CSS-in-JS for theme variable mapping |
| [date-fns](https://date-fns.org/) | Date formatting for time scale labels |
| [PnP PowerShell](https://pnp.github.io/powershell/) | SharePoint list provisioning |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)
