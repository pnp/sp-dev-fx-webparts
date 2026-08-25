# react-delivery-plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new SPFx 1.20 web part that displays a project delivery dashboard (Gantt timeline, weekly workload heatmap, task list, phase summary) backed by a SharePoint list.

**Architecture:** Class-based React components following the react-whos-in pattern. Data fetched once in `onInit()` via PnPjs v4 singleton, passed as props to the root component. Four tab components render from a shared `IDeliveryPlanTask[]` array.

**Tech Stack:** SPFx 1.20, React 17, PnPjs v4, CSS Modules (SCSS), TypeScript 4.7

**Spec:** `C:\Users\sudeep.ghatak\Downloads\2026-08-25-react-delivery-plan-design.md`

## Global Constraints

- SPFx version: 1.20.0 — do not upgrade any `@microsoft/sp-*` packages
- React: 17.0.1 (not 18) — use `ReactDom.render`, not `createRoot`
- PnPjs: `^4.0.0` — use `spfi().using(SPFx(context))` pattern
- CSS: CSS Modules only — no inline style objects except for dynamic values (colours, percentages)
- TypeScript: strict null checks on — all fields must be typed; no `any` except for raw SP REST responses
- Class components throughout — no hooks, no functional components
- No external chart/calendar libraries — all rendering is pure React + CSS
- All user-visible strings in `loc/en-us.js` — not hardcoded in TSX
- Root folder: `c:\SPFx\sp-dev-fx-webparts\samples\react-delivery-plan\`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `samples/react-delivery-plan/package.json`
- Create: `samples/react-delivery-plan/tsconfig.json`
- Create: `samples/react-delivery-plan/gulpfile.js`
- Create: `samples/react-delivery-plan/.yo-rc.json`
- Create: `samples/react-delivery-plan/config/config.json`
- Create: `samples/react-delivery-plan/config/package-solution.json`
- Create: `samples/react-delivery-plan/config/serve.json`

**Interfaces:**
- Produces: runnable `npm install` + `gulp build` environment

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "react-delivery-plan",
  "version": "0.0.1",
  "private": true,
  "engines": { "node": ">=18.17.1 <19.0.0" },
  "main": "lib/index.js",
  "scripts": {
    "build": "gulp bundle",
    "clean": "gulp clean",
    "test": "gulp test"
  },
  "dependencies": {
    "@microsoft/sp-core-library": "1.20.0",
    "@microsoft/sp-property-pane": "1.20.0",
    "@microsoft/sp-webpart-base": "1.20.0",
    "@microsoft/sp-lodash-subset": "1.20.0",
    "@microsoft/sp-component-base": "1.20.0",
    "@pnp/logging": "^4.0.0",
    "@pnp/core": "^4.0.0",
    "@pnp/queryable": "^4.0.0",
    "@pnp/sp": "^4.0.0",
    "react": "17.0.1",
    "react-dom": "17.0.1"
  },
  "devDependencies": {
    "@microsoft/eslint-config-spfx": "1.20.0",
    "@microsoft/eslint-plugin-spfx": "1.20.0",
    "@microsoft/sp-build-web": "1.20.0",
    "@microsoft/sp-module-interfaces": "1.20.0",
    "@rushstack/eslint-config": "2.5.1",
    "@types/react": "17.0.45",
    "@types/react-dom": "17.0.17",
    "@microsoft/rush-stack-compiler-4.7": "0.1.0",
    "eslint": "~8.7.0",
    "gulp": "4.0.2",
    "typescript": "~4.7.4"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-4.7/includes/tsconfig-web.json",
  "compilerOptions": {
    "target": "es5",
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "outDir": "lib",
    "inSourceMap": true,
    "strictNullChecks": true,
    "noUnusedLocals": false,
    "typeRoots": ["./node_modules/@types", "./node_modules/@microsoft"],
    "types": ["webpack-env"],
    "lib": ["es5", "dom", "es2015.collection", "es2015.promise"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

- [ ] **Step 3: Create `gulpfile.js`**

```js
'use strict';
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
const getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  const result = getTasks.call(build.rig);
  result.set('sass', result.get('node-sass'));
  return result;
};
build.initialize(require('gulp'));
```

- [ ] **Step 4: Create `.yo-rc.json`**

```json
{
  "@microsoft/generator-sharepoint": {
    "isCreatingSolution": true,
    "environment": "spo",
    "version": "1.20.0",
    "libraryName": "react-delivery-plan",
    "libraryId": "a1b2c3d4-e5f6-4890-abcd-ef1234567890",
    "packageManager": "npm",
    "isDomainIsolated": false,
    "componentType": "webpart"
  }
}
```

- [ ] **Step 5: Create `config/config.json`**

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/config.2.0.0.schema.json",
  "version": "2.0",
  "bundles": [
    {
      "name": "delivery-plan-web-part",
      "components": [
        {
          "entrypoint": "./lib/webparts/deliveryPlan/DeliveryPlanWebPart.js",
          "manifest": "./src/webparts/deliveryPlan/DeliveryPlanWebPart.manifest.json"
        }
      ]
    }
  ],
  "externals": {},
  "localizedResources": {
    "DeliveryPlanWebPartStrings": "lib/webparts/deliveryPlan/loc/{locale}.js"
  }
}
```

- [ ] **Step 6: Create `config/package-solution.json`**

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "name": "react-delivery-plan-client-side-solution",
    "id": "a1b2c3d4-e5f6-4890-abcd-ef1234567890",
    "version": "1.0.0.0",
    "includeClientSideAssets": true,
    "skipFeatureDeployment": true,
    "isDomainIsolated": false,
    "developer": {
      "name": "",
      "websiteUrl": "",
      "privacyUrl": "",
      "termsOfUseUrl": "",
      "mpnId": "Undefined-1.20.0"
    },
    "metadata": {
      "shortDescription": { "default": "Gantt-style project delivery plan dashboard" },
      "longDescription": { "default": "Displays tasks from a SharePoint list as a Gantt timeline, workload heatmap, task list, and phase summary." },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    },
    "features": [
      {
        "title": "react-delivery-plan Feature",
        "description": "The feature that activates assets associated with the solution.",
        "id": "c1d2e3f4-a5b6-4890-cdef-123456789012",
        "version": "1.0.0.0"
      }
    ]
  },
  "paths": {
    "zippedPackage": "solution/react-delivery-plan.sppkg"
  }
}
```

- [ ] **Step 7: Create `config/serve.json`**

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/spfx-serve.schema.json",
  "port": 4321,
  "https": true,
  "serveConfigurations": {
    "default": {
      "pageUrl": "https://contoso.sharepoint.com/sites/mySite/SitePages/myPage.aspx",
      "webPart": {
        "title": "DeliveryPlan",
        "properties": {
          "listName": "DeliveryPlan",
          "title": "Delivery Plan",
          "subtitle": ""
        }
      }
    }
  }
}
```

- [ ] **Step 8: Install dependencies**

```bash
cd samples/react-delivery-plan
npm install
```

Expected: `node_modules/` created, no peer dependency errors.

- [ ] **Step 9: Commit**

```bash
git add samples/react-delivery-plan/
git commit -m "feat: scaffold react-delivery-plan project structure"
```

---

### Task 2: Types & Interfaces

**Files:**
- Create: `src/webparts/deliveryPlan/components/IDeliveryPlanProps.ts`

**Interfaces:**
- Produces: `IDeliveryPlanTask`, `IDeliveryPlanProps`, `ITabProps`, `TabId` — used by all subsequent tasks

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p src/webparts/deliveryPlan/components/tabs
```

- [ ] **Step 2: Write `IDeliveryPlanProps.ts`**

```ts
export interface IDeliveryPlanTask {
  id: number;
  title: string;
  resource: string;
  resourceEmail: string;
  phase: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
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

export interface ITabProps {
  tasks: IDeliveryPlanTask[];
  phaseColours: Map<string, string>;
  planStart: Date;
  planEnd: Date;
}

export type TabId = 'timeline' | 'workload' | 'tasklist' | 'phasesummary';
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/webparts/deliveryPlan/components/IDeliveryPlanProps.ts
git commit -m "feat: add TypeScript interfaces for react-delivery-plan"
```

---

### Task 3: PnPjs Config & Loc Files

**Files:**
- Create: `src/webparts/deliveryPlan/pnpjsConfig.ts`
- Create: `src/webparts/deliveryPlan/loc/en-us.js`
- Create: `src/webparts/deliveryPlan/loc/mystrings.d.ts`

**Interfaces:**
- Produces: `getSP(context?)` — consumed by `DeliveryPlanWebPart.ts` (Task 4)

- [ ] **Step 1: Write `pnpjsConfig.ts`**

```ts
import { spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

let _sp: SPFI;

export const getSP = (context?: WebPartContext): SPFI => {
  if (context) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  if (!_sp) {
    throw new Error('PnP JS not initialized');
  }
  return _sp;
};
```

- [ ] **Step 2: Write `loc/en-us.js`**

```js
define([], function() {
  return {
    PropertyPaneDescription: 'Configure the Delivery Plan web part',
    BasicGroupName: 'Settings',
    ListNameFieldLabel: 'List name',
    TitleFieldLabel: 'Title',
    SubtitleFieldLabel: 'Subtitle'
  };
});
```

- [ ] **Step 3: Write `loc/mystrings.d.ts`**

```ts
declare interface IDeliveryPlanWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameFieldLabel: string;
  TitleFieldLabel: string;
  SubtitleFieldLabel: string;
}

declare module 'DeliveryPlanWebPartStrings' {
  const strings: IDeliveryPlanWebPartStrings;
  export = strings;
}
```

- [ ] **Step 4: Verify compilation**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/webparts/deliveryPlan/pnpjsConfig.ts src/webparts/deliveryPlan/loc/
git commit -m "feat: add PnPjs config and loc strings for react-delivery-plan"
```

---

### Task 4: Web Part Class & Manifest

**Files:**
- Create: `src/webparts/deliveryPlan/DeliveryPlanWebPart.ts`
- Create: `src/webparts/deliveryPlan/DeliveryPlanWebPart.manifest.json`

**Interfaces:**
- Consumes: `getSP` from `pnpjsConfig.ts`; `IDeliveryPlanTask`, `IDeliveryPlanProps` from `IDeliveryPlanProps.ts`
- Produces: renders `<DeliveryPlan>` with fetched tasks; exposes property pane with `listName`, `title`, `subtitle`

- [ ] **Step 1: Write `DeliveryPlanWebPart.manifest.json`**

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json",
  "id": "b1c2d3e4-f5a6-4890-bcde-f12345678901",
  "alias": "DeliveryPlanWebPart",
  "componentType": "WebPart",
  "version": "*",
  "manifestVersion": 2,
  "requiresCustomScript": false,
  "supportedHosts": ["SharePointWebPart", "TeamsPersonalApp", "TeamsTab"],
  "supportsThemeVariants": true,
  "preconfiguredEntries": [
    {
      "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
      "group": { "default": "Advanced" },
      "title": { "default": "Delivery Plan" },
      "description": { "default": "Gantt-style project delivery dashboard from a SharePoint list." },
      "officeFabricIconFontName": "TimelineProgress",
      "properties": {
        "listName": "DeliveryPlan",
        "title": "Delivery Plan",
        "subtitle": ""
      }
    }
  ]
}
```

- [ ] **Step 2: Write `DeliveryPlanWebPart.ts`**

```ts
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'DeliveryPlanWebPartStrings';
import { DeliveryPlan } from './components/DeliveryPlan';
import { IDeliveryPlanProps, IDeliveryPlanTask } from './components/IDeliveryPlanProps';
import { getSP } from './pnpjsConfig';

export interface IDeliveryPlanWebPartProps {
  listName: string;
  title: string;
  subtitle: string;
}

export default class DeliveryPlanWebPart extends BaseClientSideWebPart<IDeliveryPlanWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _tasks: IDeliveryPlanTask[] = [];
  private _errorMessage: string = '';

  public async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
    await this._loadTasks();
  }

  private async _loadTasks(): Promise<void> {
    const listName = this.properties.listName || 'DeliveryPlan';
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await getSP()
        .web.lists.getByTitle(listName)
        .items
        .select('ID', 'Title', 'Phase', 'StartDate', 'EndDate', 'Resource/Title', 'Resource/EMail')
        .expand('Resource')
        .orderBy('StartDate')();

      this._tasks = raw.map(item => {
        const res = item.Resource;
        const startDate = new Date(item.StartDate);
        const endDate = new Date(item.EndDate);
        return {
          id: item.ID as number,
          title: (item.Title as string) || '',
          resource: res?.Title || 'Unknown',
          resourceEmail: res?.EMail || '',
          phase: (item.Phase as string) || '',
          startDate,
          endDate,
          durationDays: Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1
        } as IDeliveryPlanTask;
      });
      this._errorMessage = '';
    } catch (err) {
      this._tasks = [];
      this._errorMessage = `Unable to load list "${listName}". Check the list name and your permissions.`;
    }
  }

  public render(): void {
    const element: React.ReactElement<IDeliveryPlanProps> = React.createElement(DeliveryPlan, {
      tasks: this._tasks,
      title: this.properties.title || 'Delivery Plan',
      subtitle: this.properties.subtitle || '',
      listName: this.properties.listName || 'DeliveryPlan',
      errorMessage: this._errorMessage || undefined,
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      userDisplayName: this.context.pageContext.user.displayName
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', { label: strings.ListNameFieldLabel }),
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                PropertyPaneTextField('subtitle', { label: strings.SubtitleFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
```

- [ ] **Step 3: Verify compilation (expect errors about missing DeliveryPlan component — that is normal at this stage)**

```bash
npx tsc --noEmit 2>&1 | grep -v "DeliveryPlan"
```

Expected: only errors referencing `DeliveryPlan` (not yet created). All other errors must be zero.

- [ ] **Step 4: Commit**

```bash
git add src/webparts/deliveryPlan/DeliveryPlanWebPart.ts src/webparts/deliveryPlan/DeliveryPlanWebPart.manifest.json
git commit -m "feat: add web part class and manifest for react-delivery-plan"
```

---

### Task 5: Tab Stubs + Root Component

Create minimal stub implementations of all four tab components so the root component compiles, then implement the root component.

**Files:**
- Create: `src/webparts/deliveryPlan/components/tabs/TimelineTab.tsx` (stub)
- Create: `src/webparts/deliveryPlan/components/tabs/WorkloadTab.tsx` (stub)
- Create: `src/webparts/deliveryPlan/components/tabs/TaskListTab.tsx` (stub)
- Create: `src/webparts/deliveryPlan/components/tabs/PhaseSummaryTab.tsx` (stub)
- Create: `src/webparts/deliveryPlan/components/DeliveryPlan.tsx`
- Create: `src/webparts/deliveryPlan/components/DeliveryPlan.module.scss`

**Interfaces:**
- Consumes: `IDeliveryPlanProps`, `ITabProps`, `TabId` from `IDeliveryPlanProps.ts`
- Produces: exported `DeliveryPlan` class consumed by `DeliveryPlanWebPart.ts`

- [ ] **Step 1: Write stub `TimelineTab.tsx`**

```tsx
import * as React from 'react';
import { ITabProps } from '../IDeliveryPlanProps';

export class TimelineTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    return <div>Timeline — coming soon</div>;
  }
}
```

- [ ] **Step 2: Write stub `WorkloadTab.tsx`**

```tsx
import * as React from 'react';
import { ITabProps } from '../IDeliveryPlanProps';

export class WorkloadTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    return <div>Weekly workload — coming soon</div>;
  }
}
```

- [ ] **Step 3: Write stub `TaskListTab.tsx`**

```tsx
import * as React from 'react';
import { ITabProps } from '../IDeliveryPlanProps';

export class TaskListTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    return <div>Task list — coming soon</div>;
  }
}
```

- [ ] **Step 4: Write stub `PhaseSummaryTab.tsx`**

```tsx
import * as React from 'react';
import { ITabProps } from '../IDeliveryPlanProps';

export class PhaseSummaryTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    return <div>Phase summary — coming soon</div>;
  }
}
```

- [ ] **Step 5: Write `DeliveryPlan.module.scss`**

```scss
.deliveryPlan {
  font-family: inherit;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .headerText { flex: 1; }

  .title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 4px;
    color: var(--bodyText, #323130);
  }

  .subtitle {
    font-size: 14px;
    color: #605e5c;
    margin: 0;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 500;
    color: #323130;
    white-space: nowrap;
    margin-left: 16px;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #0078d4;
    }
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    margin-bottom: 16px;
  }

  .legendChip {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #323130;
  }

  .legendDot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .tabBar {
    display: flex;
    gap: 4px;
    background: #ebebeb;
    border-radius: 8px;
    padding: 4px;
    width: fit-content;
    margin-bottom: 16px;
  }

  .tabBtn {
    background: transparent;
    border: 2px solid transparent;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    color: #323130;
    font-family: inherit;

    &:hover { background: rgba(255,255,255,0.6); }
  }

  .tabBtnActive {
    background: #fff;
    border-color: #323130;
    font-weight: 600;
  }

  .tabContent {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 20px;
  }

  .errorBanner {
    background: #fed9cc;
    border: 1px solid #d83b01;
    border-radius: 4px;
    padding: 12px 16px;
    color: #d83b01;
    font-size: 14px;
  }
}
```

- [ ] **Step 6: Write `DeliveryPlan.tsx`**

```tsx
import * as React from 'react';
import styles from './DeliveryPlan.module.scss';
import { IDeliveryPlanProps, IDeliveryPlanTask, TabId } from './IDeliveryPlanProps';
import { TimelineTab } from './tabs/TimelineTab';
import { WorkloadTab } from './tabs/WorkloadTab';
import { TaskListTab } from './tabs/TaskListTab';
import { PhaseSummaryTab } from './tabs/PhaseSummaryTab';

const PHASE_PALETTE: string[] = [
  '#0078d4', '#e67e22', '#27ae60', '#8e6f1e',
  '#e91e8c', '#6b2fa0', '#00b4d8', '#e74c3c',
  '#2ecc71', '#f39c12'
];

interface IDeliveryPlanState {
  activeTab: TabId;
}

export class DeliveryPlan extends React.Component<IDeliveryPlanProps, IDeliveryPlanState> {
  constructor(props: IDeliveryPlanProps) {
    super(props);
    this.state = { activeTab: 'timeline' };
  }

  private _buildPhaseColours(tasks: IDeliveryPlanTask[]): Map<string, string> {
    const map = new Map<string, string>();
    let idx = 0;
    tasks.forEach(t => {
      if (t.phase && !map.has(t.phase)) {
        map.set(t.phase, PHASE_PALETTE[idx % PHASE_PALETTE.length]);
        idx++;
      }
    });
    return map;
  }

  private _formatBadge(tasks: IDeliveryPlanTask[]): string {
    const starts = tasks.map(t => t.startDate.getTime());
    const ends = tasks.map(t => t.endDate.getTime());
    const planStart = new Date(Math.min(...starts));
    const planEnd = new Date(Math.max(...ends));
    const totalWeeks = Math.ceil((planEnd.getTime() - planStart.getTime()) / (7 * 86400000));
    const fmt = (d: Date): string =>
      d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${fmt(planStart)} – ${fmt(planEnd)} · ${totalWeeks} weeks`;
  }

  public render(): React.ReactElement {
    const { tasks, title, subtitle, errorMessage } = this.props;
    const { activeTab } = this.state;
    const phaseColours = this._buildPhaseColours(tasks);
    const planStart = tasks.length
      ? new Date(Math.min(...tasks.map(t => t.startDate.getTime())))
      : new Date();
    const planEnd = tasks.length
      ? new Date(Math.max(...tasks.map(t => t.endDate.getTime())))
      : new Date();

    const tabs: { id: TabId; label: string }[] = [
      { id: 'timeline', label: 'Timeline' },
      { id: 'workload', label: 'Weekly workload' },
      { id: 'tasklist', label: 'Task list' },
      { id: 'phasesummary', label: 'Phase summary' }
    ];

    return (
      <div className={styles.deliveryPlan}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {tasks.length > 0 && (
            <div className={styles.badge}>{this._formatBadge(tasks)}</div>
          )}
        </div>

        {phaseColours.size > 0 && (
          <div className={styles.legend}>
            {Array.from(phaseColours.entries()).map(([phase, colour]) => (
              <span key={phase} className={styles.legendChip}>
                <span className={styles.legendDot} style={{ backgroundColor: colour }} />
                {phase}
              </span>
            ))}
          </div>
        )}

        {errorMessage ? (
          <div className={styles.errorBanner}>{errorMessage}</div>
        ) : (
          <React.Fragment>
            <div className={styles.tabBar}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.tabBtn}${activeTab === tab.id ? ` ${styles.tabBtnActive}` : ''}`}
                  onClick={() => this.setState({ activeTab: tab.id })}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {activeTab === 'timeline' && (
                <TimelineTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
              {activeTab === 'workload' && (
                <WorkloadTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
              {activeTab === 'tasklist' && (
                <TaskListTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
              {activeTab === 'phasesummary' && (
                <PhaseSummaryTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
```

- [ ] **Step 7: Verify full compilation**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 8: Commit**

```bash
git add src/webparts/deliveryPlan/components/
git commit -m "feat: add root component and tab stubs for react-delivery-plan"
```

---

### Task 6: TimelineTab Implementation

**Files:**
- Modify: `src/webparts/deliveryPlan/components/tabs/TimelineTab.tsx` (replace stub)
- Create: `src/webparts/deliveryPlan/components/tabs/TimelineTab.module.scss`

**Interfaces:**
- Consumes: `ITabProps` from `IDeliveryPlanProps.ts`
- Produces: Gantt chart with resource lanes, coloured bars, today line, week grid

- [ ] **Step 1: Write `TimelineTab.module.scss`**

```scss
.container { overflow-x: auto; }

.heading {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #323130;
}

.desc {
  font-size: 13px;
  color: #605e5c;
  margin: 0 0 20px;
}

.empty {
  padding: 40px;
  text-align: center;
  color: #605e5c;
  font-size: 14px;
}

$infoWidth: 220px;

.headerRow {
  display: grid;
  grid-template-columns: $infoWidth 1fr;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 4px;
}

.taskInfoHeader {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #605e5c;
  padding: 4px 8px;
}

.weekHeaders {
  display: grid;
  border-left: 1px solid #e0e0e0;
}

.weekLabel {
  font-size: 11px;
  font-weight: 600;
  color: #605e5c;
  padding: 4px 6px;
  border-right: 1px solid #f0f0f0;
}

.lane {
  margin-bottom: 4px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 4px;
}

.laneHeader {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f8f8f8;
  border-radius: 4px;
  margin-bottom: 2px;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.resourceName {
  font-size: 14px;
  font-weight: 600;
  color: #323130;
  flex: 1;
}

.laneMeta {
  font-size: 12px;
  color: #605e5c;
}

.taskRow {
  display: grid;
  grid-template-columns: $infoWidth 1fr;
  min-height: 44px;
  border-bottom: 1px solid #fafafa;
  align-items: stretch;
}

.taskInfo {
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.taskTitle {
  font-size: 13px;
  font-weight: 500;
  color: #323130;
  line-height: 1.3;
}

.taskMeta {
  font-size: 11px;
  color: #605e5c;
  margin-top: 2px;
}

.barArea {
  position: relative;
  border-left: 1px solid #e0e0e0;
  min-height: 44px;
}

.todayLine {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #d13438;
  z-index: 2;
  pointer-events: none;
}

.bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  min-width: 4px;
  z-index: 1;
}

.barLabel {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

- [ ] **Step 2: Replace `TimelineTab.tsx` with full implementation**

```tsx
import * as React from 'react';
import styles from './TimelineTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function fmt(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
}

function hashColour(name: string): string {
  const palette = ['#0078d4', '#107c10', '#e67e22', '#8e6f1e', '#e91e8c', '#6b2fa0'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function snapToMonday(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  const day = c.getDay();
  c.setDate(c.getDate() + (day === 0 ? -6 : 1 - day));
  return c;
}

function snapToSunday(d: Date): Date {
  const c = new Date(d);
  c.setHours(23, 59, 59, 999);
  const day = c.getDay();
  c.setDate(c.getDate() + (day === 0 ? 0 : 7 - day));
  return c;
}

export class TimelineTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    const { tasks, phaseColours, planStart, planEnd } = this.props;

    if (!tasks.length) {
      return <div className={styles.empty}>No tasks found.</div>;
    }

    const gridStart = snapToMonday(planStart);
    const gridEnd = snapToSunday(planEnd);
    const totalMs = gridEnd.getTime() - gridStart.getTime();

    const weeks: Date[] = [];
    const cur = new Date(gridStart);
    while (cur <= gridEnd) { weeks.push(new Date(cur)); cur.setDate(cur.getDate() + 7); }

    const resourceOrder: string[] = [];
    const byResource = new Map<string, IDeliveryPlanTask[]>();
    tasks.forEach(t => {
      if (!byResource.has(t.resource)) { byResource.set(t.resource, []); resourceOrder.push(t.resource); }
      byResource.get(t.resource)!.push(t);
    });

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const showToday = today >= gridStart && today <= gridEnd;
    const todayPct = showToday ? ((today.getTime() - gridStart.getTime()) / totalMs) * 100 : -1;

    const barLeft = (d: Date): number =>
      Math.max(0, ((d.getTime() - gridStart.getTime()) / totalMs) * 100);
    const barWidth = (task: IDeliveryPlanTask): number => {
      const left = barLeft(task.startDate);
      const raw = (task.durationDays / (totalMs / 86400000)) * 100;
      return Math.min(100 - left, raw);
    };

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Timeline by resource</h3>
        <p className={styles.desc}>
          Every task, positioned by its start date and duration. Grouped into lanes — one per resource — with week gridlines.
        </p>

        <div className={styles.headerRow}>
          <div className={styles.taskInfoHeader}>TASK</div>
          <div className={styles.weekHeaders} style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
            {weeks.map((w, i) => <div key={i} className={styles.weekLabel}>{fmt(w)}</div>)}
          </div>
        </div>

        {resourceOrder.map(resource => {
          const laneTasks = byResource.get(resource)!;
          const personDays = laneTasks.reduce((s, t) => s + t.durationDays, 0);
          return (
            <div key={resource} className={styles.lane}>
              <div className={styles.laneHeader}>
                <span className={styles.avatar} style={{ backgroundColor: hashColour(resource) }}>
                  {getInitials(resource)}
                </span>
                <span className={styles.resourceName}>{resource}</span>
                <span className={styles.laneMeta}>{laneTasks.length} tasks &middot; {personDays} person-days</span>
              </div>
              {laneTasks.map(task => (
                <div key={task.id} className={styles.taskRow}>
                  <div className={styles.taskInfo}>
                    <div className={styles.taskTitle}>{task.title}</div>
                    <div className={styles.taskMeta}>{fmt(task.startDate)} &rarr; {fmt(task.endDate)} &middot; {task.durationDays}d</div>
                  </div>
                  <div className={styles.barArea}>
                    {showToday && <div className={styles.todayLine} style={{ left: `${todayPct}%` }} />}
                    <div
                      className={styles.bar}
                      style={{
                        left: `${barLeft(task.startDate)}%`,
                        width: `${barWidth(task)}%`,
                        backgroundColor: phaseColours.get(task.phase) || '#0078d4'
                      }}
                      title={`${task.title} (${task.phase})`}
                    >
                      <span className={styles.barLabel}>{task.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/webparts/deliveryPlan/components/tabs/TimelineTab.tsx src/webparts/deliveryPlan/components/tabs/TimelineTab.module.scss
git commit -m "feat: implement TimelineTab Gantt chart for react-delivery-plan"
```

---

### Task 7: WorkloadTab Implementation

**Files:**
- Modify: `src/webparts/deliveryPlan/components/tabs/WorkloadTab.tsx` (replace stub)
- Create: `src/webparts/deliveryPlan/components/tabs/WorkloadTab.module.scss`

**Interfaces:**
- Consumes: `ITabProps`
- Produces: weekly heatmap grid with per-resource rows, combined row, legend

- [ ] **Step 1: Write `WorkloadTab.module.scss`**

```scss
.container { overflow-x: auto; }

.heading { font-size: 16px; font-weight: 600; margin: 0 0 4px; color: #323130; }
.desc { font-size: 13px; color: #605e5c; margin: 0 0 20px; }
.empty { padding: 40px; text-align: center; color: #605e5c; font-size: 14px; }

.table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.rowHeader {
  display: flex;
  background: #f8f8f8;
  border-bottom: 2px solid #e0e0e0;
}

.row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  &:last-child { border-bottom: none; }
}

.combinedRow { border-top: 2px solid #e0e0e0; }

.resourceCell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 160px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: #605e5c;
  border-right: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.headerCell {
  flex: 1;
  min-width: 64px;
  padding: 8px 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #605e5c;
  text-align: center;
  border-right: 1px solid #f0f0f0;
}

.cell {
  flex: 1;
  min-width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  border-right: 1px solid #f0f0f0;
  transition: background-color 0.1s;
}

.cellCount { font-size: 16px; font-weight: 700; color: #323130; }

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}

.resourceName { font-size: 13px; font-weight: 600; color: #323130; }

.legend { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
.legendLabel { font-size: 12px; color: #605e5c; }

.legendGradient {
  width: 120px;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(to right, rgba(0, 120, 212, 0.1), rgba(0, 120, 212, 0.85));
}
```

- [ ] **Step 2: Replace `WorkloadTab.tsx` with full implementation**

```tsx
import * as React from 'react';
import styles from './WorkloadTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
}

function hashColour(name: string): string {
  const palette = ['#0078d4', '#107c10', '#e67e22', '#8e6f1e', '#e91e8c', '#6b2fa0'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function fmtWeek(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' }).toUpperCase();
}

function getMondays(start: Date, end: Date): Date[] {
  const result: Date[] = [];
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const day = cur.getDay();
  cur.setDate(cur.getDate() + (day === 0 ? -6 : 1 - day));
  while (cur <= end) { result.push(new Date(cur)); cur.setDate(cur.getDate() + 7); }
  return result;
}

function countInWeek(tasks: IDeliveryPlanTask[], monday: Date): number {
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return tasks.filter(t => t.startDate <= sunday && t.endDate >= monday).length;
}

export class WorkloadTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    const { tasks, planStart, planEnd } = this.props;
    if (!tasks.length) return <div className={styles.empty}>No tasks found.</div>;

    const mondays = getMondays(planStart, planEnd);

    const resourceOrder: string[] = [];
    const byResource = new Map<string, IDeliveryPlanTask[]>();
    tasks.forEach(t => {
      if (!byResource.has(t.resource)) { byResource.set(t.resource, []); resourceOrder.push(t.resource); }
      byResource.get(t.resource)!.push(t);
    });

    const grid: number[][] = resourceOrder.map(r => mondays.map(m => countInWeek(byResource.get(r)!, m)));
    const combined: number[] = mondays.map((m, wi) => grid.reduce((s, row) => s + row[wi], 0));
    const maxCount = Math.max(...grid.flat(), ...combined, 1);

    const cellStyle = (count: number): React.CSSProperties =>
      count === 0 ? {} : { backgroundColor: `rgba(0, 120, 212, ${0.1 + (count / maxCount) * 0.75})` };

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Weekly workload</h3>
        <p className={styles.desc}>
          Number of tasks each resource has running concurrently in a given week — darker means more stacked up.
        </p>
        <div className={styles.table}>
          <div className={styles.rowHeader}>
            <div className={styles.resourceCell}>WEEK OF</div>
            {mondays.map((m, i) => <div key={i} className={styles.headerCell}>{fmtWeek(m)}</div>)}
          </div>
          {resourceOrder.map((resource, ri) => (
            <div key={resource} className={styles.row}>
              <div className={styles.resourceCell}>
                <span className={styles.avatar} style={{ backgroundColor: hashColour(resource) }}>
                  {getInitials(resource)}
                </span>
                <span className={styles.resourceName}>{resource}</span>
              </div>
              {grid[ri].map((count, wi) => (
                <div key={wi} className={styles.cell} style={cellStyle(count)}>
                  {count > 0 && <span className={styles.cellCount}>{count}</span>}
                </div>
              ))}
            </div>
          ))}
          <div className={`${styles.row} ${styles.combinedRow}`}>
            <div className={styles.resourceCell}>
              <span className={styles.resourceName}>Combined</span>
            </div>
            {combined.map((count, wi) => (
              <div key={wi} className={styles.cell} style={cellStyle(count)}>
                {count > 0 && <span className={styles.cellCount}>{count}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Fewer tasks</span>
          <div className={styles.legendGradient} />
          <span className={styles.legendLabel}>More tasks</span>
        </div>
      </div>
    );
  }
}
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/webparts/deliveryPlan/components/tabs/WorkloadTab.tsx src/webparts/deliveryPlan/components/tabs/WorkloadTab.module.scss
git commit -m "feat: implement WorkloadTab heatmap for react-delivery-plan"
```

---

### Task 8: TaskListTab Implementation

**Files:**
- Modify: `src/webparts/deliveryPlan/components/tabs/TaskListTab.tsx` (replace stub)
- Create: `src/webparts/deliveryPlan/components/tabs/TaskListTab.module.scss`

**Interfaces:**
- Consumes: `ITabProps`, `IDeliveryPlanTask`
- Produces: sortable table with columns RESOURCE, TASK, PHASE, START, END, DAYS

- [ ] **Step 1: Write `TaskListTab.module.scss`**

```scss
.container { overflow-x: auto; }

.heading { font-size: 16px; font-weight: 600; margin: 0 0 4px; color: #323130; }
.desc { font-size: 13px; color: #605e5c; margin: 0 0 16px; }
.empty { padding: 40px; text-align: center; color: #605e5c; font-size: 14px; }

.table { border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; }

.thead {
  display: flex;
  background: #f8f8f8;
  border-bottom: 2px solid #e0e0e0;

  > div {
    padding: 10px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #605e5c;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    &:hover { background: #f0f0f0; }
  }
}

.tr {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  &:last-child { border-bottom: none; }
  &:hover { background: #faf9f8; }
}

.colResource { width: 160px; flex-shrink: 0; }
.colTask { flex: 1; min-width: 0; }
.colPhase { width: 220px; flex-shrink: 0; }
.colDate { width: 90px; flex-shrink: 0; }
.colDays { width: 60px; flex-shrink: 0; text-align: right; }

.tdResource { display: flex; align-items: center; gap: 8px; padding: 10px 12px; }

.tdTask {
  padding: 10px 12px;
  font-size: 13px;
  color: #323130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tdPhase { display: flex; align-items: center; gap: 6px; padding: 10px 12px; font-size: 13px; color: #323130; }
.tdDate { padding: 10px 12px; font-size: 13px; color: #323130; }
.tdDays { padding: 10px 12px; font-size: 13px; font-weight: 600; color: #323130; text-align: right; }

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}

.resourceName { font-size: 13px; font-weight: 500; color: #323130; white-space: nowrap; }

.phaseDot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Replace `TaskListTab.tsx` with full implementation**

```tsx
import * as React from 'react';
import styles from './TaskListTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function fmt(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
}

function hashColour(name: string): string {
  const palette = ['#0078d4', '#107c10', '#e67e22', '#8e6f1e', '#e91e8c', '#6b2fa0'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

type SortField = keyof IDeliveryPlanTask;
type SortDir = 'asc' | 'desc';

interface ITaskListTabState {
  sortField: SortField;
  sortDir: SortDir;
}

export class TaskListTab extends React.Component<ITabProps, ITaskListTabState> {
  constructor(props: ITabProps) {
    super(props);
    this.state = { sortField: 'startDate', sortDir: 'asc' };
  }

  private _onSort(field: SortField): void {
    this.setState(prev => ({
      sortField: field,
      sortDir: prev.sortField === field && prev.sortDir === 'asc' ? 'desc' : 'asc'
    }));
  }

  private _sorted(): IDeliveryPlanTask[] {
    const { tasks } = this.props;
    const { sortField, sortDir } = this.state;
    return [...tasks].sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      let cmp = 0;
      if (av instanceof Date && bv instanceof Date) cmp = av.getTime() - bv.getTime();
      else if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  private _arrow(field: SortField): string {
    const { sortField, sortDir } = this.state;
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  }

  public render(): React.ReactElement {
    const { tasks, phaseColours } = this.props;
    if (!tasks.length) return <div className={styles.empty}>No tasks found.</div>;
    const sorted = this._sorted();

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Task list</h3>
        <p className={styles.desc}>All {tasks.length} tasks. Click a column header to sort.</p>
        <div className={styles.table}>
          <div className={styles.thead}>
            <div className={styles.colResource} onClick={() => this._onSort('resource')}>RESOURCE{this._arrow('resource')}</div>
            <div className={styles.colTask} onClick={() => this._onSort('title')}>TASK{this._arrow('title')}</div>
            <div className={styles.colPhase} onClick={() => this._onSort('phase')}>PHASE{this._arrow('phase')}</div>
            <div className={styles.colDate} onClick={() => this._onSort('startDate')}>START{this._arrow('startDate')}</div>
            <div className={styles.colDate} onClick={() => this._onSort('endDate')}>END{this._arrow('endDate')}</div>
            <div className={styles.colDays} onClick={() => this._onSort('durationDays')}>DAYS{this._arrow('durationDays')}</div>
          </div>
          {sorted.map(task => (
            <div key={task.id} className={styles.tr}>
              <div className={`${styles.colResource} ${styles.tdResource}`}>
                <span className={styles.avatar} style={{ backgroundColor: hashColour(task.resource) }}>
                  {getInitials(task.resource)}
                </span>
                <span className={styles.resourceName}>{task.resource}</span>
              </div>
              <div className={`${styles.colTask} ${styles.tdTask}`}>{task.title}</div>
              <div className={`${styles.colPhase} ${styles.tdPhase}`}>
                <span className={styles.phaseDot} style={{ backgroundColor: phaseColours.get(task.phase) || '#ccc' }} />
                {task.phase}
              </div>
              <div className={`${styles.colDate} ${styles.tdDate}`}>{fmt(task.startDate)}</div>
              <div className={`${styles.colDate} ${styles.tdDate}`}>{fmt(task.endDate)}</div>
              <div className={`${styles.colDays} ${styles.tdDays}`}>{task.durationDays}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/webparts/deliveryPlan/components/tabs/TaskListTab.tsx src/webparts/deliveryPlan/components/tabs/TaskListTab.module.scss
git commit -m "feat: implement TaskListTab sortable table for react-delivery-plan"
```

---

### Task 9: PhaseSummaryTab Implementation

**Files:**
- Modify: `src/webparts/deliveryPlan/components/tabs/PhaseSummaryTab.tsx` (replace stub)
- Create: `src/webparts/deliveryPlan/components/tabs/PhaseSummaryTab.module.scss`

**Interfaces:**
- Consumes: `ITabProps`
- Produces: per-phase horizontal bar rows spanning earliest start to latest end

- [ ] **Step 1: Write `PhaseSummaryTab.module.scss`**

```scss
.container {}

.heading { font-size: 16px; font-weight: 600; margin: 0 0 4px; color: #323130; }
.desc { font-size: 13px; color: #605e5c; margin: 0 0 20px; }
.empty { padding: 40px; text-align: center; color: #605e5c; font-size: 14px; }

.phaseList { display: flex; flex-direction: column; }

.phaseRow {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child { border-bottom: none; }
}

.phaseInfo { width: 280px; flex-shrink: 0; }

.phaseNameRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.phaseDot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.phaseName { font-size: 14px; font-weight: 600; color: #323130; }

.phaseMeta { font-size: 12px; color: #605e5c; padding-left: 18px; }

.barArea {
  flex: 1;
  height: 24px;
  position: relative;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 4px;
}

.taskCount { width: 70px; flex-shrink: 0; text-align: right; }
.taskCountNum { font-size: 14px; font-weight: 700; color: #323130; }
.taskCountLabel { font-size: 13px; color: #605e5c; }
```

- [ ] **Step 2: Replace `PhaseSummaryTab.tsx` with full implementation**

```tsx
import * as React from 'react';
import styles from './PhaseSummaryTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function fmt(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

function snapToMonday(d: Date): Date {
  const c = new Date(d); c.setHours(0, 0, 0, 0);
  const day = c.getDay(); c.setDate(c.getDate() + (day === 0 ? -6 : 1 - day)); return c;
}

function snapToSunday(d: Date): Date {
  const c = new Date(d); c.setHours(23, 59, 59, 999);
  const day = c.getDay(); c.setDate(c.getDate() + (day === 0 ? 0 : 7 - day)); return c;
}

interface IPhaseRow {
  phase: string;
  colour: string;
  phaseStart: Date;
  phaseEnd: Date;
  resources: string;
  taskCount: number;
}

export class PhaseSummaryTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    const { tasks, phaseColours, planStart, planEnd } = this.props;
    if (!tasks.length) return <div className={styles.empty}>No tasks found.</div>;

    const gridStart = snapToMonday(planStart);
    const gridEnd = snapToSunday(planEnd);
    const totalMs = gridEnd.getTime() - gridStart.getTime();

    const phaseOrder: string[] = [];
    const phaseMap = new Map<string, IDeliveryPlanTask[]>();
    tasks.forEach(t => {
      if (!phaseMap.has(t.phase)) { phaseMap.set(t.phase, []); phaseOrder.push(t.phase); }
      phaseMap.get(t.phase)!.push(t);
    });

    const rows: IPhaseRow[] = phaseOrder.map(phase => {
      const pt = phaseMap.get(phase)!;
      const phaseStart = new Date(Math.min(...pt.map(t => t.startDate.getTime())));
      const phaseEnd = new Date(Math.max(...pt.map(t => t.endDate.getTime())));
      const resources = Array.from(new Set(pt.map(t => t.resource))).join(' + ');
      return { phase, colour: phaseColours.get(phase) || '#0078d4', phaseStart, phaseEnd, resources, taskCount: pt.length };
    });

    const barLeft = (d: Date): number =>
      Math.max(0, ((d.getTime() - gridStart.getTime()) / totalMs) * 100);
    const barWidth = (start: Date, end: Date): number => {
      const left = barLeft(start);
      return Math.min(100 - left, ((end.getTime() - start.getTime() + 86400000) / totalMs) * 100);
    };

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Phase summary</h3>
        <p className={styles.desc}>
          {tasks.length} tasks grouped into {rows.length} delivery phases. Bars span each phase&apos;s earliest start to its latest finish.
        </p>
        <div className={styles.phaseList}>
          {rows.map(row => (
            <div key={row.phase} className={styles.phaseRow}>
              <div className={styles.phaseInfo}>
                <div className={styles.phaseNameRow}>
                  <span className={styles.phaseDot} style={{ backgroundColor: row.colour }} />
                  <span className={styles.phaseName}>{row.phase}</span>
                </div>
                <div className={styles.phaseMeta}>
                  {fmt(row.phaseStart)} &rarr; {fmt(row.phaseEnd)} &middot; {row.resources}
                </div>
              </div>
              <div className={styles.barArea}>
                <div
                  className={styles.bar}
                  style={{
                    left: `${barLeft(row.phaseStart)}%`,
                    width: `${barWidth(row.phaseStart, row.phaseEnd)}%`,
                    backgroundColor: row.colour
                  }}
                />
              </div>
              <div className={styles.taskCount}>
                <span className={styles.taskCountNum}>{row.taskCount}</span>
                <span className={styles.taskCountLabel}> tasks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/webparts/deliveryPlan/components/tabs/PhaseSummaryTab.tsx src/webparts/deliveryPlan/components/tabs/PhaseSummaryTab.module.scss
git commit -m "feat: implement PhaseSummaryTab for react-delivery-plan"
```

---

### Task 10: Final Bundle & SharePoint List Setup

**Files:** No new source files — verification only.

- [ ] **Step 1: Full build and bundle**

```bash
cd samples/react-delivery-plan
gulp bundle --ship
```

Expected: `dist/` folder populated, no TypeScript or SASS errors.

- [ ] **Step 2: Create the SharePoint list**

In the target SharePoint site, create a list named `DeliveryPlan` with these columns:

| Column internal name | Type | Required |
|---|---|---|
| `Title` | Single line of text | Yes |
| `Resource` | Person or Group | Yes |
| `Phase` | Choice (or Single line of text) | Yes |
| `StartDate` | Date and Time (Date only) | Yes |
| `EndDate` | Date and Time (Date only) | Yes |

Add at least 3 test items covering at least 2 resources and 2 phases spanning different weeks.

- [ ] **Step 3: Deploy to workbench**

```bash
gulp serve --nobrowser
```

Open `https://<your-tenant>.sharepoint.com/sites/<your-site>/_layouts/15/workbench.aspx`, add the **Delivery Plan** web part, open the property pane, set `listName` to `DeliveryPlan` and confirm data loads.

- [ ] **Step 4: Verify all four tabs**

- [ ] Timeline tab: bars appear in correct week columns, coloured by phase, grouped by resource
- [ ] Weekly workload tab: correct task counts per resource per week, darker = higher count
- [ ] Task list tab: all tasks listed, each sortable column works, clicking twice reverses order
- [ ] Phase summary tab: bars span correct date range, resources listed correctly

- [ ] **Step 5: Final commit**

```bash
git add samples/react-delivery-plan/
git commit -m "feat: complete react-delivery-plan web part"
```
