import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  type IPropertyPaneDropdownOption,
  type IPropertyPaneField,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ListDashboard from './components/ListDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { IListDashboardProps } from './components/IListDashboardProps';
import { DashboardService, IDashboardConfig } from './model/DashboardService';
import {
  Aggregation, ColorMode, DatePeriod, DisplayType, NumberFormatKind, PaletteName, StatusDirection
} from './model/dashboardTypes';
import {
  IStandardWebPartProps, computeFrameStyle, shouldShowTitle, standardPaneFields
} from './shared/standardProps';

export interface IListDashboardWebPartProps extends IStandardWebPartProps {
  title: string;
  listTitle: string;
  displayType: DisplayType;
  categoryField: string;
  valueField: string;
  aggregation: Aggregation;
  tableFieldsText: string;
  itemLimit: number;
  orderByField: string;
  orderDesc: boolean;
  colorMode: ColorMode;
  palette: PaletteName;
  showDataLabels: boolean;
  numberFormat: NumberFormatKind;
  decimals: number;
  currencySymbol: string;
  statusDirection: StatusDirection;
  statusGoodText: string;
  statusWarnText: string;
  datePeriod: DatePeriod;
}

const DISPLAY_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'stat', text: 'Stat (single number)' },
  { key: 'tiles', text: 'KPI tiles (by category)' },
  { key: 'bar', text: 'Bar chart (by category)' },
  { key: 'column', text: 'Column chart (by category)' },
  { key: 'pie', text: 'Pie chart (by category)' },
  { key: 'donut', text: 'Donut chart (by category)' },
  { key: 'line', text: 'Line chart (over time)' },
  { key: 'area', text: 'Area chart (over time)' },
  { key: 'table', text: 'Table' }
];

// Category views: need a Group-by field and support colour/label appearance.
const CATEGORY_VIEWS: DisplayType[] = ['tiles', 'bar', 'column', 'pie', 'donut', 'line', 'area'];
// Time-series views group by a date field and bucket it into periods.
const TIME_VIEWS: DisplayType[] = ['line', 'area'];

const PERIOD_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'day', text: 'By day' },
  { key: 'week', text: 'By week' },
  { key: 'month', text: 'By month' }
];

const AGG_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'count', text: 'Count of items' },
  { key: 'sum', text: 'Sum' },
  { key: 'avg', text: 'Average' },
  { key: 'min', text: 'Minimum' },
  { key: 'max', text: 'Maximum' }
];

const COLOR_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'categorical', text: 'Colourful (one hue per category)' },
  { key: 'accent', text: 'Single accent hue' },
  { key: 'gradient', text: 'Value gradient (darker = higher)' },
  { key: 'status', text: 'Status vs target (green / amber / red)' }
];

const DIRECTION_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'higher-good', text: 'Higher is better' },
  { key: 'lower-good', text: 'Lower is better' }
];

const PALETTE_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'vibrant', text: 'Vibrant' },
  { key: 'soft', text: 'Soft' },
  { key: 'mild', text: 'Mild' },
  { key: 'deep', text: 'Deep' }
];

const FORMAT_OPTIONS: IPropertyPaneDropdownOption[] = [
  { key: 'compact', text: 'Compact (1.2K)' },
  { key: 'number', text: 'Number (1,234)' },
  { key: 'currency', text: 'Currency' },
  { key: 'percent', text: 'Percent of total' }
];

export default class ListDashboardWebPart extends BaseClientSideWebPart<IListDashboardWebPartProps> {
  private _accent: string = '#0f6cbd';
  private _lists: IPropertyPaneDropdownOption[] = [{ key: '', text: '(demo data)' }];
  private _fields: IPropertyPaneDropdownOption[] = [{ key: '', text: '(none)' }];

  public render(): void {
    const p = this.properties;
    const config: IDashboardConfig = {
      listTitle: p.listTitle || '',
      displayType: p.displayType || 'stat',
      categoryField: p.categoryField || '',
      valueField: p.valueField || '',
      aggregation: p.aggregation || 'count',
      tableFields: (p.tableFieldsText || '').split(',').map(s => s.replace(/^\s+|\s+$/g, '')).filter(s => !!s),
      itemLimit: p.itemLimit || 100,
      orderByField: p.orderByField || '',
      orderDesc: !!p.orderDesc,
      colorMode: p.colorMode || 'categorical',
      palette: p.palette || 'vibrant',
      showDataLabels: p.showDataLabels !== false,
      numberFormat: p.numberFormat || 'compact',
      decimals: typeof p.decimals === 'number' ? p.decimals : 0,
      currencySymbol: p.currencySymbol || '$',
      statusDirection: p.statusDirection || 'higher-good',
      targetGood: Number(p.statusGoodText) || 0,
      targetWarn: Number(p.statusWarnText) || 0,
      datePeriod: p.datePeriod || 'month'
    };

    try {
      const inner: React.ReactElement<IListDashboardProps> = React.createElement(ListDashboard, {
        spHttpClient: this.context.spHttpClient,
        webUrl: this.context.pageContext.web.absoluteUrl,
        config,
        accent: this._accent,
        showTitle: shouldShowTitle(p),
        title: p.title || '',
        frameStyle: computeFrameStyle(p, this._accent)
      });
      const element = React.createElement(ErrorBoundary, {}, inner);
      ReactDom.render(element, this.domElement);
    } catch (e) {
      const err = e as { stack?: string; message?: string };
      this.domElement.innerHTML =
        '<pre style="white-space:pre-wrap;color:#a4262c;font-size:12px;padding:12px">List Dashboard render() error:\n' +
        ((err && (err.stack || err.message)) || String(e)) + '</pre>';
    }
  }

  private _safeRender(): void {
    if (this.domElement) { this.render(); }
  }

  private _svc(): DashboardService {
    return new DashboardService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);
  }

  private _setFieldOptions(fs: { internalName: string; title: string }[]): void {
    this._fields = [{ key: '', text: '(none)' } as IPropertyPaneDropdownOption]
      .concat(fs.map(f => ({ key: f.internalName, text: f.title + ' (' + f.internalName + ')' })));
  }

  protected onPropertyPaneConfigurationStart(): void {
    const svc = this._svc();
    svc.getLists()
      .then(ls => {
        this._lists = [{ key: '', text: '(demo data)' } as IPropertyPaneDropdownOption]
          .concat(ls.map(l => ({ key: l.title, text: l.isLibrary ? l.title + ' (library)' : l.title })));
        return this.properties.listTitle ? svc.getFields(this.properties.listTitle) : Promise.resolve([]);
      })
      .then(fs => { this._setFieldOptions(fs); this.context.propertyPane.refresh(); })
      .catch(() => { this.context.propertyPane.refresh(); });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    if (propertyPath === 'listTitle') {
      this.properties.categoryField = '';
      this.properties.valueField = '';
      this.properties.orderByField = '';
      this._fields = [{ key: '', text: '(none)' } as IPropertyPaneDropdownOption];
      if (newValue) {
        this._svc().getFields(newValue as string)
          .then(fs => { this._setFieldOptions(fs); this.context.propertyPane.refresh(); })
          .catch(() => { this.context.propertyPane.refresh(); });
      } else {
        this.context.propertyPane.refresh();
      }
    }
  }

  private _reset(): void {
    this.properties.showTitle = true;
    this.properties.showBorder = false;
    this.properties.backgroundMode = 'transparent';
    this.properties.backgroundColor = '#eef3f8';
    this.context.propertyPane.refresh();
    this._safeRender();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const dt: DisplayType = this.properties.displayType || 'stat';
    const fieldFields: IPropertyPaneField<unknown>[] = [];

    if (dt === 'table') {
      fieldFields.push(PropertyPaneTextField('tableFieldsText', {
        label: 'Columns (comma-separated internal names; blank = all)'
      }));
      fieldFields.push(PropertyPaneDropdown('orderByField', { label: 'Sort by', options: this._fields }));
      fieldFields.push(PropertyPaneToggle('orderDesc', {
        label: 'Sort direction', onText: 'Descending', offText: 'Ascending'
      }));
    } else {
      const isTime = TIME_VIEWS.indexOf(dt) !== -1;
      if (CATEGORY_VIEWS.indexOf(dt) !== -1) {
        fieldFields.push(PropertyPaneDropdown('categoryField', {
          label: isTime ? 'Date field' : 'Group by', options: this._fields
        }));
      }
      if (isTime) {
        fieldFields.push(PropertyPaneDropdown('datePeriod', { label: 'Bucket by', options: PERIOD_OPTIONS }));
      }
      fieldFields.push(PropertyPaneDropdown('valueField', {
        label: 'Value field (blank = count rows)', options: this._fields
      }));
      fieldFields.push(PropertyPaneDropdown('aggregation', { label: 'Aggregation', options: AGG_OPTIONS }));
    }

    const appearanceFields: IPropertyPaneField<unknown>[] = [];
    // Number formatting applies to every view that shows a measure (not the table).
    if (dt !== 'table') {
      appearanceFields.push(PropertyPaneDropdown('numberFormat', { label: 'Number format', options: FORMAT_OPTIONS }));
      appearanceFields.push(PropertyPaneSlider('decimals', {
        label: 'Decimal places', min: 0, max: 2, step: 1,
        value: typeof this.properties.decimals === 'number' ? this.properties.decimals : 0
      }));
      if (this.properties.numberFormat === 'currency') {
        appearanceFields.push(PropertyPaneTextField('currencySymbol', { label: 'Currency symbol' }));
      }
    }
    // Colouring and data labels only apply to the category views (tiles, bar, column).
    if (CATEGORY_VIEWS.indexOf(dt) !== -1) {
      appearanceFields.push(PropertyPaneDropdown('colorMode', { label: 'Colours', options: COLOR_OPTIONS }));
      if (this.properties.colorMode === 'categorical') {
        appearanceFields.push(PropertyPaneDropdown('palette', { label: 'Palette', options: PALETTE_OPTIONS }));
      }
      appearanceFields.push(PropertyPaneToggle('showDataLabels', {
        label: 'Data labels', onText: 'Shown', offText: 'Hidden'
      }));
    }
    // Status-vs-target thresholds. Stat can also be coloured by status even though it
    // has no category colours, so surface the colour mode there too when relevant.
    if (dt === 'stat') {
      appearanceFields.push(PropertyPaneDropdown('colorMode', {
        label: 'Colours', options: [
          { key: 'accent', text: 'Single accent hue' },
          { key: 'status', text: 'Status vs target (green / amber / red)' }
        ]
      }));
    }
    if ((CATEGORY_VIEWS.indexOf(dt) !== -1 || dt === 'stat') && this.properties.colorMode === 'status') {
      appearanceFields.push(PropertyPaneDropdown('statusDirection', { label: 'Target direction', options: DIRECTION_OPTIONS }));
      appearanceFields.push(PropertyPaneTextField('statusGoodText', { label: 'Good at or beyond' }));
      appearanceFields.push(PropertyPaneTextField('statusWarnText', { label: 'Warning at or beyond' }));
    }

    const containerFields: IPropertyPaneField<unknown>[] =
      ([PropertyPaneTextField('title', { label: 'Title' })] as IPropertyPaneField<unknown>[])
        .concat(standardPaneFields(this.properties.backgroundMode || 'transparent', () => this._reset()));

    const groups: { groupName: string; groupFields: IPropertyPaneField<unknown>[] }[] = [
      {
        groupName: 'Data source',
        groupFields: [
          PropertyPaneDropdown('listTitle', { label: 'List or library', options: this._lists }),
          PropertyPaneSlider('itemLimit', {
            label: 'Max items to read', min: 10, max: 1000, step: 10,
            value: this.properties.itemLimit || 100
          })
        ]
      },
      {
        groupName: 'Display',
        groupFields: [PropertyPaneDropdown('displayType', { label: 'Display type', options: DISPLAY_OPTIONS })]
      },
      { groupName: 'Fields', groupFields: fieldFields }
    ];
    if (appearanceFields.length > 0) { groups.push({ groupName: 'Appearance', groupFields: appearanceFields }); }
    groups.push({ groupName: 'Container', groupFields: containerFields });

    return {
      pages: [
        {
          header: { description: 'Bind a list or library and choose how to visualise it.' },
          groups
        }
      ]
    };
  }
}
