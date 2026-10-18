import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

import * as strings from 'ContentRollupWebPartStrings';
import ContentRollup from './components/ContentRollup';
import { IContentRollupProps } from './components/IContentRollupProps';
import { IRollupItem } from './models/IRollup';
import { IStandardWebPartProps, computeFrameStyle, shouldShowTitle, standardPaneFields } from '../shared/standardProps';

export interface IContentRollupWebPartProps extends IStandardWebPartProps {
  title: string;
  layout: string;
  maxItems: number;
  queryText: string;
  listTitle: string;
  useDemoData: boolean;
}

const DEMO_ITEMS: IRollupItem[] = [
  { id: 1, title: 'Contoso hits 99.98% platform uptime this quarter', site: 'Engineering', date: new Date().toISOString(), path: '#' },
  { id: 2, title: 'Meet the 2026 Innovation Award winners', site: 'People', date: new Date().toISOString(), path: '#' },
  { id: 3, title: 'New HQ collaboration floors open Monday', site: 'Workplace', date: new Date().toISOString(), path: '#' }
];

export default class ContentRollupWebPart extends BaseClientSideWebPart<IContentRollupWebPartProps> {

  private _accent: string = '#0f6cbd';
  private _items: IRollupItem[] = [];
  private _loading: boolean = true;
  private _error: string | undefined = undefined;

  public render(): void {
    const isDemo = this.properties.useDemoData;
    const element: React.ReactElement<IContentRollupProps> = React.createElement(
      ContentRollup,
      {
        title: this.properties.title || 'News from across the organisation',
        layout: this.properties.layout || 'card',
        showTitle: shouldShowTitle(this.properties),
        frameStyle: computeFrameStyle(this.properties, this._accent),
        isDemo: isDemo,
        accent: this._accent,
        items: this._items,
        loading: this._loading,
        error: this._error
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(async () => {
      await this._loadItems();
    });
  }

  private async _loadItems(): Promise<void> {
    this._loading = true;
    this._error = undefined;
    const top = this.properties.maxItems || 6;

    if (this.properties.useDemoData) {
      this._items = DEMO_ITEMS.slice(0, top);
      this._loading = false;
      return;
    }

    // A bound list is the most reliable, curated source. When listTitle is set we read
    // the list directly; otherwise we fall back to a tenant-wide search query.
    if (this.properties.listTitle) {
      await this._loadFromList(top);
      this._loading = false;
      return;
    }

    // Keep the query minimal (no selectproperties/sortlist): the default result set
    // already includes Title, Path and Write, which is all we display.
    const q = encodeURIComponent((this.properties.queryText || 'PromotedState:2').replace(/'/g, "''"));
    const url = `${this.context.pageContext.web.absoluteUrl}`
      + `/_api/search/query?querytext='${q}'&rowlimit=${top}`;

    // The Search REST API does not support OData v4. SPHttpClient.configurations.v1
    // sends "odata-version: 4.0" by default, which makes /_api/search/query return
    // HTTP 500. Clear that header (and ask for nometadata) so the call succeeds.
    const searchOpts: ISPHttpClientOptions = {
      headers: { 'odata-version': '', 'accept': 'application/json;odata=nometadata' }
    };

    try {
      const res: SPHttpClientResponse = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1, searchOpts);
      if (!res.ok) {
        this._error = `Could not load news (HTTP ${res.status}).`;
        this._items = [];
      } else {
        const json = await res.json();
        const rows = (json.PrimaryQueryResult
          && json.PrimaryQueryResult.RelevantResults
          && json.PrimaryQueryResult.RelevantResults.Table
          && json.PrimaryQueryResult.RelevantResults.Table.Rows) || [];
        this._items = rows.map((r: { Cells?: Array<{ Key: string; Value: string }> }, i: number): IRollupItem => {
          const d: Record<string, string> = {};
          (r.Cells || []).forEach((c) => { d[c.Key] = c.Value; });
          const path = d.Path || '';
          return {
            id: i,
            title: d.Title || '',
            path: /^(https?:|#|\/)/i.test(path) ? path : undefined, // safe schemes only
            site: d.SiteTitle || undefined,
            date: d.Write || undefined
          };
        }).filter((n: IRollupItem) => n.title.length > 0);
      }
    } catch {
      this._error = 'Could not load news.';
      this._items = [];
    }

    this._loading = false;
  }

  private async _loadFromList(top: number): Promise<void> {
    const listTitle = this.properties.listTitle.replace(/'/g, "''");
    // No $select: the bound list may not have Category/NewsLink columns, and $select on a
    // missing field is a hard 400. Ordering by Created is valid on every list.
    const url = `${this.context.pageContext.web.absoluteUrl}`
      + `/_api/web/lists/getByTitle('${listTitle}')/items`
      + `?$orderby=Created desc&$top=${top}`;
    try {
      const res: SPHttpClientResponse = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      if (!res.ok) {
        this._error = res.status === 404
          ? `List "${this.properties.listTitle}" was not found.`
          : `Could not load news (HTTP ${res.status}).`;
        this._items = [];
        return;
      }
      const json = await res.json();
      this._items = (json.value || []).map((row: Record<string, unknown>, i: number): IRollupItem => {
        const link = row.NewsLink as { Url?: string } | undefined;
        const rawPath = link && link.Url ? link.Url : '';
        return {
          id: Number(row.Id ?? i),
          title: (row.Title ?? '').toString(),
          site: this._catLabel(row.Category),
          date: row.Created ? row.Created.toString() : undefined,
          path: /^(https?:|#|\/)/i.test(rawPath) ? rawPath : undefined // safe schemes only
        };
      }).filter((n: IRollupItem) => n.title.length > 0);
    } catch {
      this._error = 'Could not load news.';
      this._items = [];
    }
  }

  // Category can be plain text, a managed-metadata term ({ Label }) or a lookup ({ Title }).
  // Coerce to a readable string; never emit "[object Object]".
  private _catLabel(raw: unknown): string | undefined {
    if (!raw) { return undefined; }
    if (typeof raw === 'string') { return raw || undefined; }
    if (typeof raw === 'object') {
      const o = raw as { Label?: string; Title?: string; Value?: string };
      return o.Label || o.Title || o.Value || undefined;
    }
    return raw.toString();
  }

  private _safeRender(): void {
    if (this.domElement && this.properties) { this.render(); }
  }

  protected onPropertyPaneFieldChanged(path: string): void {
    if (path === 'backgroundMode') {
      this.context.propertyPane.refresh();
    }
    const dataProps = ['queryText', 'listTitle', 'maxItems', 'useDemoData'];
    if (dataProps.indexOf(path) >= 0) {
      // both toggle the disabled state of the query box, so rebuild the pane
      if (path === 'useDemoData' || path === 'listTitle') {
        this.context.propertyPane.refresh();
      }
      this._loading = true;
      this._safeRender();
      this._loadItems().then(() => this._safeRender()).catch(() => this._safeRender());
    }
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) { return; }
    if (currentTheme.palette && currentTheme.palette.themePrimary) {
      this._accent = currentTheme.palette.themePrimary;
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
    this.properties.title = 'News from across the organisation';
    this.properties.layout = 'card';
    this.properties.maxItems = 6;
    this.properties.queryText = 'PromotedState:2';
    this.properties.listTitle = '';
    this.properties.showTitle = true;
    this.properties.showBorder = false;
    this.properties.backgroundMode = 'transparent';
    this.properties.backgroundColor = '#eef3f8';
    this.properties.useDemoData = true;
    this.context.propertyPane.refresh();
    this._loading = true;
    this._safeRender();
    this._loadItems().then(() => this._safeRender()).catch(() => this._safeRender());
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const demo = this.properties.useDemoData;
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.AppearanceGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                PropertyPaneDropdown('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    { key: 'card', text: 'Card' },
                    { key: 'minimal', text: 'Minimal' },
                    { key: 'bold', text: 'Bold' },
                    { key: 'compact', text: 'Compact' }
                  ]
                }),
                PropertyPaneSlider('maxItems', { label: strings.MaxItemsLabel, min: 1, max: 15, step: 1 })
              ]
            },
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneToggle('useDemoData', { label: strings.UseDemoLabel, onText: 'On', offText: 'Off' }),
                PropertyPaneTextField('listTitle', { label: strings.ListTitleLabel, disabled: demo }),
                PropertyPaneTextField('queryText', { label: strings.QueryFieldLabel, disabled: demo || !!this.properties.listTitle }),
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
