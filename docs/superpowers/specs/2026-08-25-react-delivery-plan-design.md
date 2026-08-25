# react-delivery-plan — Design Spec

**Date:** 2026-08-25
**Author:** Sudeep Ghatak
**Status:** Approved

---

## Overview

A new SPFx web part (`react-delivery-plan`) that renders a project delivery dashboard backed by a SharePoint list. The dashboard has four tabs: a Gantt timeline grouped by resource, a weekly workload heatmap, a sortable task list, and a phase summary view.

Coding patterns follow `react-whos-in` exactly: SPFx 1.20, PnPjs v4, React 17 class components, CSS Modules, singleton `pnpjsConfig.ts`.

---

## SharePoint List

**Default list name:** `DeliveryPlan` (configurable via property pane)

| Internal name | SP column type | Notes |
|---|---|---|
| `Title` | Single line text | Task name |
| `Resource` | Person or Group | Expanded to `Resource/Title` and `Resource/EMail` |
| `Phase` | Choice (or Single line text) | Drives the phase legend and colour map |
| `StartDate` | Date and Time (Date only) | Task start |
| `EndDate` | Date and Time (Date only) | Task end (inclusive) |

Duration in days is computed client-side as `Math.round((endDate - startDate) / 86_400_000) + 1`.

---

## File Structure

```
samples/react-delivery-plan/
├── config/
│   ├── config.json
│   ├── package-solution.json
│   └── serve.json
├── src/
│   └── webparts/
│       └── deliveryPlan/
│           ├── DeliveryPlanWebPart.ts
│           ├── DeliveryPlanWebPart.manifest.json
│           ├── pnpjsConfig.ts
│           ├── components/
│           │   ├── IDeliveryPlanProps.ts
│           │   ├── DeliveryPlan.tsx
│           │   ├── DeliveryPlan.module.scss
│           │   └── tabs/
│           │       ├── TimelineTab.tsx
│           │       ├── TimelineTab.module.scss
│           │       ├── WorkloadTab.tsx
│           │       ├── WorkloadTab.module.scss
│           │       ├── TaskListTab.tsx
│           │       ├── TaskListTab.module.scss
│           │       ├── PhaseSummaryTab.tsx
│           │       └── PhaseSummaryTab.module.scss
│           └── loc/
│               ├── en-us.js
│               └── mystrings.d.ts
├── package.json
├── tsconfig.json
├── gulpfile.js
└── README.md
```

---

## TypeScript Interfaces

### `IDeliveryPlanProps.ts`

```ts
export interface IDeliveryPlanTask {
  id: number;
  title: string;
  resource: string;        // display name from expanded Person field
  resourceEmail: string;   // email for avatar initials
  phase: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;    // computed: Math.round((end - start) / 86_400_000) + 1
}

export interface IDeliveryPlanProps {
  tasks: IDeliveryPlanTask[];
  title: string;
  subtitle: string;
  listName: string;
  errorMessage?: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export type TabId = 'timeline' | 'workload' | 'tasklist' | 'phasesummary';
```

---

## `pnpjsConfig.ts`

Identical singleton pattern to `react-whos-in`:

```ts
import { spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

let _sp: SPFI;

export const getSP = (context?: WebPartContext): SPFI => {
  if (context) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  if (!_sp) throw new Error('PnP JS not initialized');
  return _sp;
};
```

---

## `DeliveryPlanWebPart.ts`

Extends `BaseClientSideWebPart<IDeliveryPlanWebPartProps>`.

**Web part properties:**
```ts
interface IDeliveryPlanWebPartProps {
  listName: string;   // default: 'DeliveryPlan'
  title: string;      // default: 'Delivery Plan'
  subtitle: string;   // default: ''
}
```

**`onInit()`** — async, calls `getSP(this.context)` then fetches items:
```ts
const raw = await getSP()
  .web.lists.getByTitle(listName)
  .items
  .select('ID', 'Title', 'Phase', 'StartDate', 'EndDate',
          'Resource/Title', 'Resource/EMail')
  .expand('Resource')
  .orderBy('StartDate')();
```
Maps raw items to `IDeliveryPlanTask[]`, storing result on `this._tasks`. Error caught and stored on `this._errorMessage`.

**`render()`** — calls `ReactDom.render(<DeliveryPlan ... />)` passing all props.

**`getPropertyPaneConfiguration()`** — one page, one group with three `PropertyPaneTextField` fields: `listName`, `title`, `subtitle`.

**`onDispose()`** — `ReactDom.unmountComponentAtNode(this.domElement)`.

**Theme** — `onThemeChanged` applies CSS variables to `this.domElement.style` (same pattern as react-whos-in).

---

## `DeliveryPlan.tsx` (Root Component)

**Type:** Class component extending `React.Component<IDeliveryPlanProps, IDeliveryPlanState>`

**State:**
```ts
interface IDeliveryPlanState {
  activeTab: TabId;
}
```

**Phase colour map** — derived once in the constructor (or `getDerivedStateFromProps`):
- Collect unique `phase` values from `tasks` in order of first appearance
- Assign colours from a fixed palette of 10 hex values:
  `['#0078d4', '#e67e22', '#27ae60', '#8e6f1e', '#e91e8c', '#6b2fa0', '#00b4d8', '#e74c3c', '#2ecc71', '#f39c12']`
- Result: `Map<string, string>` (phase name → hex colour)

**Computed plan range** — `planStart = min(task.startDate)`, `planEnd = max(task.endDate)`, `totalWeeks = Math.ceil(diff / 7)`. Displayed in the badge as `d MMM – d MMM YYYY · N weeks`.

**Render output:**
1. Header block: title (h2), subtitle (p), date-range badge (top-right pill)
2. Phase legend: one chip per phase (coloured dot + label)
3. Tab bar: four pill buttons; active tab has border
4. Active tab component (`<TimelineTab>`, `<WorkloadTab>`, `<TaskListTab>`, or `<PhaseSummaryTab>`)

All tab components receive: `tasks`, `phaseColours: Map<string, string>`, `planStart: Date`, `planEnd: Date`.

---

## `TimelineTab.tsx`

**Logic:**
- Derive sorted list of unique resource names in order of first task appearance
- `planStart` snapped to Monday of that week; `planEnd` snapped to Sunday
- `totalDays = (planEnd - planStart) / 86_400_000`
- Week headers: enumerate Mondays from `planStart` to `planEnd`, label as `d MMM`
- Bar position: `left = (taskStart - planStart) / totalDays * 100`%; `width = durationDays / totalDays * 100`%
- Today line: same offset formula, 1px vertical absolute div, only shown if today is within range

**Render structure (per resource lane):**
```
[Lane header row]  avatar-circle | "ResourceName" | "N tasks · M person-days"
  [Task row]       task-info-col (name, date-range, duration) | grid-area (coloured bar)
  [Task row]       ...
```

**Lane header:** Avatar is a circle `div` with the resource's initials (first letter of each word, max 2 chars) and a background colour derived from a hash of the resource name. Task count and total person-days shown on the right.

**Person-days** = sum of `durationDays` for all tasks in that lane.

**CSS:** Grid with two columns: fixed-width task-info column (220px) and a fluid grid area. Week gridlines are `1px solid #e0e0e0` vertical lines drawn using a repeating CSS background on the grid area.

---

## `WorkloadTab.tsx`

**Logic:**
- Enumerate all Mondays from `planStart` to `planEnd` as week buckets
- For each resource and each week: count tasks where `task.startDate <= weekSunday && task.endDate >= weekMonday`
- Compute `maxCount = max across all cells`
- "Combined" row = sum of all resource counts per week

**Render:**
- Header row: "WEEK OF" label + one cell per Monday (formatted `d MMM`)
- One resource row per resource: avatar circle + name on left; cells on right
- Combined row (separator line above)
- Colour: `rgba(0, 120, 212, opacity)` where `opacity = 0.1 + (count / maxCount) * 0.75` — empty cells get no background
- Cell shows the count as a bold number; empty cells show nothing

**Legend strip** at bottom: gradient from light → dark blue labelled "Fewer tasks" → "More tasks"

---

## `TaskListTab.tsx`

**State:**
```ts
interface ITaskListState {
  sortField: keyof IDeliveryPlanTask | 'none';
  sortDir: 'asc' | 'desc';
}
```

**Columns:**

| Column | Content | Sortable |
|---|---|---|
| RESOURCE | Avatar circle + display name | Yes |
| TASK | Task title | Yes |
| PHASE | Coloured dot + phase name | Yes |
| START | `d MMM` | Yes (default, asc) |
| END | `d MMM` | Yes |
| DAYS | `durationDays` | Yes |

Clicking a column header that is already the sort field reverses direction; clicking a new field sets it ascending.

Date format helper: `const fmt = (d: Date) => d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' })` — produces `7 Sept` style.

---

## `PhaseSummaryTab.tsx`

**Logic per phase:**
- `phaseStart = min(task.startDate)` for tasks in that phase
- `phaseEnd = max(task.endDate)` for tasks in that phase
- `resources = unique resource names` for that phase (joined with " + ")
- Bar position/width: same percentage formula as TimelineTab

**Render (one row per phase):**
```
[coloured dot] [Phase name]          [bar on grid]                    [N tasks]
[phaseStart → phaseEnd · resources]
```

Phases displayed in order of first appearance (same order as legend).

---

## Styling

- All styles via CSS Modules (`.module.scss` per component)
- Colour tokens: no Fluent UI dependency for layout — plain CSS with custom properties matching SharePoint theme vars (`--bodyBackground`, `--bodyText`, etc.)
- Dark theme: web part applies CSS variables to `domElement.style` in `onThemeChanged` (react-whos-in pattern); components reference those vars
- Responsive: min-width on the timeline grid area triggers horizontal scroll on small viewports (no layout breakage)
- Fonts: inherit SharePoint page font stack — no custom font imports

---

## Property Pane

| Field | Type | Default | Label |
|---|---|---|---|
| `listName` | TextField | `'DeliveryPlan'` | List name |
| `title` | TextField | `'Delivery Plan'` | Title |
| `subtitle` | TextField | `''` | Subtitle |

---

## Error Handling

- List not found / permission denied: `errorMessage` prop set; root component renders a visible error banner (styled callout) instead of tabs
- Empty list: tabs render with empty-state messages ("No tasks found")
- Person field not expanded (null Resource): gracefully fall back to `'Unknown'` for resource name and empty string for email

---

## Out of Scope

- Drag-and-drop rescheduling
- Dependency arrows between tasks
- Export to PDF/Excel
- Edit/create tasks from the web part
- Filtering within tabs (filter controls can be added in a later iteration)
