import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  type IPropertyPaneField,
  type IPropertyPaneCustomFieldProps,
  PropertyPaneFieldType,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'OrgChartWebPartStrings';
import OrgChart from './components/OrgChart';
import { IOrgChartProps } from './components/IOrgChartProps';
import StartFromPicker, { IStartFromPickerProps } from './components/StartFromPicker';
import { IOrgNode } from './models/IOrgNode';
import { OrgService } from './services/OrgService';
import { IStandardWebPartProps, computeFrameStyle, shouldShowTitle, standardPaneFields } from '../shared/standardProps';

export interface IOrgChartWebPartProps extends IStandardWebPartProps {
  title: string;
  view: string;            // teams (vertical list) | tree (horizontal)
  layout: string;
  showPhoto: boolean;
  useDemoData: boolean;
  rootPerson: string;      // login/email of the person to centre the chart on; blank = the viewer
  rootPersonLabel: string; // display name shown in the picker for the chosen person
  enableActions: boolean;  // email / Teams chat / Teams call / profile links on each card
  maxReports: number;      // reports shown before a "Show all" expander; 0 = always show all
  showExport: boolean;     // show the Print / Save-as-PDF button in the full-screen explorer
  useGraph: boolean;       // live Teams presence via Microsoft Graph (needs admin approval)
}

const DEMO_MANAGER: IOrgNode = { name: 'Dana Whitfield', title: 'Director of Engineering', email: 'dana.whitfield@contoso.com' };
const DEMO_ME: IOrgNode = { name: 'Priya Nair', title: 'Engineering Manager', email: 'priya.nair@contoso.com' };
const DEMO_REPORTS: IOrgNode[] = [
  { name: 'Sam Okoro', title: 'Senior Developer', email: 'sam.okoro@contoso.com' },
  { name: 'Liam Chen', title: 'Developer', email: 'liam.chen@contoso.com' },
  { name: 'Ahmed Ali', title: 'QA Engineer', email: 'ahmed.ali@contoso.com' },
  { name: 'Elena Petrova', title: 'Data Analyst', email: 'elena.petrova@contoso.com' }
];

export default class OrgChartWebPart extends BaseClientSideWebPart<IOrgChartWebPartProps> {

  private _accent: string = '#0f6cbd';
  private _bodyBg: string = '#faf9f8';
  private _bodyText: string = '#201f1e';
  private _barBg: string = '#ffffff';
  private _service: OrgService | undefined = undefined;

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      this._service = new OrgService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);
    });
  }

  /** Resolve Teams presence for a set of emails via Graph. Best-effort: errors => no dots. */
  private async _getPresences(emails: string[]): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    const USER_CHUNK = 15;   // keep the $filter (and URL) short per request
    const PRESENCE_CHUNK = 650; // getPresencesByUserId limit
    try {
      const uniq: string[] = [];
      emails.forEach((e) => { if (e && uniq.indexOf(e) < 0) { uniq.push(e); } });
      if (uniq.length === 0) { return result; }
      const client = await this.context.msGraphClientFactory.getClient('3');

      // Resolve emails -> object ids in small batches so the filter never gets too long.
      const idToEmail: Record<string, string> = {};
      const ids: string[] = [];
      for (let i = 0; i < uniq.length; i += USER_CHUNK) {
        const batch = uniq.slice(i, i + USER_CHUNK);
        const clauses = batch.map((e) => {
          const s = e.replace(/'/g, "''");
          return `mail eq '${s}' or userPrincipalName eq '${s}'`;
        }).join(' or ');
        try {
          const usersRes = await client.api('/users').version('v1.0').select('id,mail,userPrincipalName').filter(clauses).top(999).get();
          const users: Array<{ id: string; mail?: string; userPrincipalName?: string }> = (usersRes && usersRes.value) ? usersRes.value : [];
          users.forEach((u) => {
            const em = (u.mail || u.userPrincipalName || '').toLowerCase();
            if (u.id && em) { idToEmail[u.id] = em; ids.push(u.id); }
          });
        } catch {
          // skip this batch, keep going
        }
      }
      if (ids.length === 0) { return result; }

      // Fetch presence in batches of at most 650 ids.
      for (let i = 0; i < ids.length; i += PRESENCE_CHUNK) {
        const idBatch = ids.slice(i, i + PRESENCE_CHUNK);
        try {
          const presRes = await client.api('/communications/getPresencesByUserId').version('v1.0').post({ ids: idBatch });
          const presences: Array<{ id: string; availability?: string }> = (presRes && presRes.value) ? presRes.value : [];
          presences.forEach((pr) => {
            const em = idToEmail[pr.id];
            if (em && pr.availability) { result[em] = pr.availability; }
          });
        } catch {
          // skip this batch
        }
      }
    } catch {
      // best-effort: no consent / error => no presence dots
    }
    return result;
  }

  /** A bare email becomes a claims login name; an already-claims value passes through. */
  private _accountFromEmail(v: string | undefined): string {
    if (!v) { return ''; }
    const t = v.trim();
    if (!t) { return ''; }
    if (t.indexOf('|') >= 0) { return t; }
    return 'i:0#.f|membership|' + t;
  }

  public render(): void {
    const isDemo = this.properties.useDemoData;
    const maxReports = typeof this.properties.maxReports === 'number' ? this.properties.maxReports : 12;
    const element: React.ReactElement<IOrgChartProps> = React.createElement(
      OrgChart,
      {
        title: this.properties.title || 'Team',
        view: this.properties.view || 'teams',
        layout: this.properties.layout || 'card',
        showTitle: shouldShowTitle(this.properties),
        frameStyle: computeFrameStyle(this.properties, this._accent),
        showPhoto: this.properties.showPhoto !== false,
        webUrl: this.context.pageContext.web.absoluteUrl,
        accent: this._accent,
        overlayBg: this._bodyBg,
        overlayText: this._bodyText,
        overlayBar: this._barBg,
        isDemo: isDemo,
        demoManager: DEMO_MANAGER,
        demoMe: DEMO_ME,
        demoReports: DEMO_REPORTS,
        service: isDemo ? undefined : this._service,
        rootAccount: isDemo ? undefined : this._accountFromEmail(this.properties.rootPerson),
        maxReports: maxReports,
        enableActions: this.properties.enableActions !== false,
        showExport: this.properties.showExport === true,
        presenceProvider: (isDemo || this.properties.useGraph !== true) ? undefined : (emails: string[]) => this._getPresences(emails)
      }
    );
    ReactDom.render(element, this.domElement);
  }

  private _safeRender(): void {
    if (this.domElement && this.properties) { this.render(); }
  }

  protected onPropertyPaneFieldChanged(path: string): void {
    if (path === 'backgroundMode' || path === 'useDemoData') {
      this.context.propertyPane.refresh();
    }
    this._safeRender();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) { return; }
    if (currentTheme.palette && currentTheme.palette.themePrimary) {
      this._accent = currentTheme.palette.themePrimary;
    }
    const sc = currentTheme.semanticColors as (Partial<{ bodyBackground: string; bodyText: string; cardStandoutBackground: string; bodyStandoutBackground: string }> | undefined);
    if (sc) {
      if (sc.bodyBackground) { this._bodyBg = sc.bodyBackground; }
      if (sc.bodyText) { this._bodyText = sc.bodyText; }
      this._barBg = sc.cardStandoutBackground || sc.bodyStandoutBackground || this._bodyBg;
    }
    this._safeRender();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _resetToDefault(): void {
    this.properties.title = 'Team';
    this.properties.view = 'teams';
    this.properties.layout = 'card';
    this.properties.showPhoto = true;
    this.properties.useDemoData = true;
    this.properties.rootPerson = '';
    this.properties.rootPersonLabel = '';
    this.properties.enableActions = true;
    this.properties.maxReports = 12;
    this.properties.showExport = false;
    this.properties.useGraph = false;
    this.properties.showTitle = true;
    this.properties.showBorder = false;
    this.properties.backgroundMode = 'transparent';
    this.properties.backgroundColor = '#eef3f8';
    this.context.propertyPane.refresh();
    this._safeRender();
  }

  /** A dependency-free type-ahead people picker for the "Start from" property. */
  private _startFromField(): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    return {
      type: PropertyPaneFieldType.Custom,
      targetProperty: 'rootPersonPicker',
      properties: {
        key: 'rootPersonPicker',
        onRender: (el: HTMLElement): void => {
          if (!this._service) {
            this._service = new OrgService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);
          }
          const element: React.ReactElement<IStartFromPickerProps> = React.createElement(StartFromPicker, {
            service: this._service,
            valueKey: this.properties.rootPerson || '',
            valueLabel: this.properties.rootPersonLabel || '',
            onChange: (key: string, label: string): void => {
              this.properties.rootPerson = key;
              this.properties.rootPersonLabel = label;
              this._safeRender();
            }
          });
          ReactDom.render(element, el);
        },
        onDispose: (el: HTMLElement): void => { ReactDom.unmountComponentAtNode(el); }
      }
    };
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.AppearanceGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                PropertyPaneDropdown('view', {
                  label: 'View',
                  options: [
                    { key: 'teams', text: 'Teams list (vertical)' },
                    { key: 'tree', text: 'Tree (horizontal)' }
                  ]
                }),
                PropertyPaneDropdown('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    { key: 'card', text: 'Card' },
                    { key: 'minimal', text: 'Minimal' },
                    { key: 'bold', text: 'Bold' },
                    { key: 'compact', text: 'Compact' }
                  ]
                }),
                PropertyPaneToggle('showPhoto', { label: strings.ShowPhotoLabel, onText: 'Profile photo', offText: 'Initials' }),
                PropertyPaneToggle('enableActions', { label: 'Quick actions on cards', onText: 'On', offText: 'Off' }),
                PropertyPaneToggle('showExport', { label: 'Print / export in full screen', onText: 'Shown', offText: 'Hidden' })
              ]
            },
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneToggle('useDemoData', { label: strings.UseDemoLabel, onText: 'On', offText: 'Off' }),
                PropertyPaneLabel('startFromLabel', { text: 'Start from (blank = you)' }),
                this._startFromField(),
                PropertyPaneSlider('maxReports', { label: 'Reports before "Show all" (0 = all)', min: 0, max: 30, step: 1 }),
                PropertyPaneToggle('useGraph', { label: 'Live Teams presence', onText: 'On', offText: 'Off' }),
                PropertyPaneLabel('graphHint', { text: 'Presence needs a one-time admin approval of the Graph permissions in SharePoint admin center, Advanced, API access.' }),
                PropertyPaneLabel('fieldHint', { text: strings.FieldHint })
              ]
            },
            {
              groupName: 'Container',
              groupFields: standardPaneFields(this.properties.backgroundMode || 'transparent', () => this._resetToDefault())
            }
          ]
        }
      ]
    };
  }
}
