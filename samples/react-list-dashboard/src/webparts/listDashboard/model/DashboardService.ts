import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import {
  Aggregation, ColorMode, DatePeriod, DisplayType, IAggPoint, IDashboardData, IFieldOption, IListOption,
  IListRow, NumberFormatKind, PaletteName, StatusDirection
} from './dashboardTypes';
import { DEMO_ROWS, DEMO_CATEGORY_FIELD, DEMO_DATE_FIELD } from './demoData';

// Document-library base templates that should read as a "library" not a list.
const LIBRARY_TEMPLATES: number[] = [101, 700, 851];

// Field types that return a nested object and must be $expand-ed (selected as Field/Title),
// never $select-ed by their bare internal name - doing so returns a 400 from SharePoint.
const EXPAND_TYPES: { [t: string]: boolean } = {
  User: true, UserMulti: true, Lookup: true, LookupMulti: true
};

// Standard columns worth offering even though SharePoint marks them base-type. Everything
// else that is base-type is system plumbing (_ColorTag, ComplianceAssetId, Attachments, ...)
// and would only clutter the dropdowns or 400 the query, so it is filtered out.
const ALLOWED_BASE_FIELDS: { [n: string]: boolean } = {
  Title: true, Created: true, Modified: true, Author: true, Editor: true
};

export interface IDashboardConfig {
  listTitle: string;
  displayType: DisplayType;
  categoryField: string;
  valueField: string;
  aggregation: Aggregation;
  tableFields: string[];
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
  targetGood: number;
  targetWarn: number;
  datePeriod: DatePeriod;
}

/** Escape a list title for use inside getByTitle('...') and a URL. */
function escapeTitle(title: string): string {
  return encodeURIComponent(title.replace(/'/g, "''"));
}

/** Coerce any field value to a readable string (handles null and lookup/person objects). */
function toLabel(v: unknown): string {
  if (v === null || v === undefined || v === '') { return '(blank)'; }
  if (typeof v === 'object') {
    const o = v as { Title?: string; Label?: string };
    return o.Title || o.Label || JSON.stringify(v);
  }
  return String(v);
}

/** Coerce a field value to a number, or NaN when it is not numeric. */
function toNumber(v: unknown): number {
  if (typeof v === 'number') { return v; }
  if (typeof v === 'string' && v !== '') { return Number(v); }
  return NaN;
}

function reduceValues(values: number[], agg: Aggregation): number {
  const nums = values.filter(n => !isNaN(n));
  if (agg === 'count') { return values.length; }
  if (nums.length === 0) { return 0; }
  switch (agg) {
    case 'sum': return nums.reduce((a, b) => a + b, 0);
    case 'avg': return nums.reduce((a, b) => a + b, 0) / nums.length;
    case 'min': return Math.min.apply(null, nums);
    case 'max': return Math.max.apply(null, nums);
    default: return values.length;
  }
}

function measureLabel(agg: Aggregation, valueField: string): string {
  if (agg === 'count' || !valueField) { return 'Items'; }
  const word = agg === 'sum' ? 'Sum of' : agg === 'avg' ? 'Average' : agg === 'min' ? 'Min of' : 'Max of';
  return word + ' ' + valueField;
}

// Two-digit zero pad for date-bucket keys.
function pad2(n: number): string { return (n < 10 ? '0' : '') + n; }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Map a date to a sortable bucket id and a human label for the chosen period. */
function dateBucket(d: Date, period: DatePeriod): { id: string; label: string } {
  const y = d.getFullYear();
  if (period === 'month') {
    return { id: y + '-' + pad2(d.getMonth() + 1), label: MONTHS[d.getMonth()] + ' ' + y };
  }
  if (period === 'week') {
    // Week starting Monday.
    const day = (d.getDay() + 6) % 7;
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
    return {
      id: monday.getFullYear() + '-' + pad2(monday.getMonth() + 1) + '-' + pad2(monday.getDate()),
      label: monday.getDate() + ' ' + MONTHS[monday.getMonth()]
    };
  }
  return { id: y + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()), label: d.getDate() + ' ' + MONTHS[d.getMonth()] };
}

/** Bucket rows by a date field into a chronologically-ordered series (line / area). */
function shapeTimeSeries(rows: IListRow[], cfg: IDashboardConfig, agg: Aggregation): IAggPoint[] {
  const buckets: { [id: string]: { label: string; values: number[] } } = Object.create(null);
  for (let i = 0; i < rows.length; i++) {
    const raw = cfg.categoryField ? rows[i][cfg.categoryField] : undefined;
    if (!raw) { continue; }
    const d = new Date(raw as string);
    if (isNaN(d.getTime())) { continue; }
    const b = dateBucket(d, cfg.datePeriod || 'month');
    if (!buckets[b.id]) { buckets[b.id] = { label: b.label, values: [] }; }
    buckets[b.id].values.push(toNumber(cfg.valueField ? rows[i][cfg.valueField] : NaN));
  }
  return Object.keys(buckets).sort().map(id => ({
    key: buckets[id].label,
    value: reduceValues(buckets[id].values, agg),
    count: buckets[id].values.length
  }));
}

/** Shape raw rows into the structure the views render from. Pure and reusable. */
export function shapeData(rows: IListRow[], cfg: IDashboardConfig, isDemo: boolean): IDashboardData {
  const useCount = cfg.aggregation === 'count' || !cfg.valueField;
  const agg: Aggregation = useCount ? 'count' : cfg.aggregation;

  // Total (single aggregate over all rows) for the stat view.
  const allValues = rows.map(r => toNumber(cfg.valueField ? r[cfg.valueField] : NaN));
  const total = reduceValues(allValues, agg);

  const isTimeSeries = cfg.displayType === 'line' || cfg.displayType === 'area';
  let points: IAggPoint[];
  if (isTimeSeries) {
    // The category field is a date; bucket by period and keep chronological order.
    points = shapeTimeSeries(rows, cfg, agg);
  } else {
    // Group by category for tiles/bar/column/pie.
    const groups: { [key: string]: number[] } = Object.create(null);
    const order: string[] = [];
    if (cfg.categoryField) {
      for (let i = 0; i < rows.length; i++) {
        const key = toLabel(rows[i][cfg.categoryField]);
        if (!groups[key]) { groups[key] = []; order.push(key); }
        groups[key].push(toNumber(cfg.valueField ? rows[i][cfg.valueField] : NaN));
      }
    }
    points = order.map(key => ({ key, value: reduceValues(groups[key], agg), count: groups[key].length }));
    // Largest first, so charts and tiles read as a ranking.
    points.sort((a, b) => b.value - a.value);
  }

  return {
    rows,
    points,
    total,
    aggregation: agg,
    valueLabel: measureLabel(agg, cfg.valueField),
    isDemo
  };
}

export class DashboardService {
  constructor(private spHttpClient: SPHttpClient, private webUrl: string) {}

  private async getJson<T>(url: string): Promise<T> {
    const res: SPHttpClientResponse = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
    if (!res.ok) {
      const text = await res.text();
      throw new Error('Request failed (' + res.status + '): ' + text);
    }
    return res.json() as Promise<T>;
  }

  /** Lists and libraries the user can bind to (visible, non-catalog). */
  public async getLists(): Promise<IListOption[]> {
    const url = this.webUrl +
      "/_api/web/lists?$select=Title,BaseTemplate,Hidden,IsCatalog&$filter=Hidden eq false and IsCatalog eq false&$orderby=Title";
    const data = await this.getJson<{ value: { Title: string; BaseTemplate: number }[] }>(url);
    const values = (data && data.value) || [];
    return values.map(v => ({
      title: v.Title,
      baseTemplate: v.BaseTemplate,
      isLibrary: LIBRARY_TEMPLATES.indexOf(v.BaseTemplate) !== -1
    }));
  }

  /** The list's real columns (custom columns + a few standard ones) for the mapping dropdowns. */
  public async getFields(listTitle: string): Promise<IFieldOption[]> {
    if (!listTitle) { return []; }
    const url = this.webUrl + "/_api/web/lists/getByTitle('" + escapeTitle(listTitle) +
      "')/fields?$select=InternalName,Title,TypeAsString,Hidden,FromBaseType&$filter=Hidden eq false&$orderby=Title";
    const data = await this.getJson<{
      value: { InternalName: string; Title: string; TypeAsString: string; FromBaseType: boolean }[]
    }>(url);
    const values = (data && data.value) || [];
    return values
      // Custom columns (FromBaseType === false) plus a short allowlist of standard ones;
      // this drops the system fields that clutter the picker and cause bad-field 400s.
      .filter(f => f.FromBaseType === false || ALLOWED_BASE_FIELDS[f.InternalName])
      .filter(f => f.TypeAsString !== 'Computed' || f.InternalName === 'Title')
      .map(f => ({ internalName: f.InternalName, title: f.Title, typeAsString: f.TypeAsString }));
  }

  /** Map internal name -> TypeAsString for a list, so getData can expand User/Lookup fields. */
  private async getFieldTypeMap(listTitle: string): Promise<{ [name: string]: string }> {
    const map: { [name: string]: string } = Object.create(null);
    const url = this.webUrl + "/_api/web/lists/getByTitle('" + escapeTitle(listTitle) +
      "')/fields?$select=InternalName,TypeAsString&$filter=Hidden eq false";
    const data = await this.getJson<{ value: { InternalName: string; TypeAsString: string }[] }>(url);
    const values = (data && data.value) || [];
    for (let i = 0; i < values.length; i++) { map[values[i].InternalName] = values[i].TypeAsString; }
    return map;
  }

  /** Fetch and shape the data for the current configuration. */
  public async getData(cfg: IDashboardConfig): Promise<IDashboardData> {
    if (!cfg.listTitle) {
      // In demo mode, fall back to a sensible category (a date for the trend views,
      // otherwise Status) so every display type renders on drop.
      const isTimeSeries = cfg.displayType === 'line' || cfg.displayType === 'area';
      const demoCfg: IDashboardConfig = {
        ...cfg,
        categoryField: cfg.categoryField || (isTimeSeries ? DEMO_DATE_FIELD : DEMO_CATEGORY_FIELD)
      };
      return shapeData(DEMO_ROWS, demoCfg, true);
    }

    // Table view with no explicit columns should return every field.
    const allColumnsForTable = cfg.displayType === 'table' && cfg.tableFields.length === 0;

    // Field metadata lets us (a) expand User/Lookup fields and (b) resolve typed column names
    // case-insensitively - SharePoint internal names are case-sensitive in $select, so a
    // free-typed "status" must be mapped back to the real "Status" or the query 400s.
    const typeMap = await this.getFieldTypeMap(cfg.listTitle);
    const canonical: { [lower: string]: string } = Object.create(null);
    Object.keys(typeMap).forEach(n => { canonical[n.toLowerCase()] = n; });
    const resolve = (f: string): string => (f ? (canonical[f.toLowerCase()] || f) : f);

    // Resolve every field reference to its correct-case internal name before use.
    const rcfg: IDashboardConfig = {
      ...cfg,
      categoryField: resolve(cfg.categoryField),
      valueField: resolve(cfg.valueField),
      orderByField: resolve(cfg.orderByField),
      tableFields: cfg.tableFields.map(resolve)
    };

    // Only select fields we actually use, so we never $select a missing field.
    // Drop any field the current list does not have (canonical map) - so a stale
    // reference left over from another list or view can never 400 the whole query.
    const known = (f: string): boolean => !!f && !!canonical[f.toLowerCase()];
    const wanted: { [f: string]: boolean } = Object.create(null);
    const add = (f: string): void => { if (known(f)) { wanted[f] = true; } };
    add('Title');
    add(rcfg.categoryField);
    add(rcfg.valueField);
    add(rcfg.orderByField);
    // Table columns only matter for the table view; other views must ignore them so a
    // left-over "Columns" list (e.g. copied from a Table instance) doesn't break them.
    if (rcfg.displayType === 'table') {
      for (let i = 0; i < rcfg.tableFields.length; i++) { add(rcfg.tableFields[i]); }
    }
    const wantedNames = Object.keys(wanted);

    // Classify the chosen fields: User/Lookup fields must be $expand-ed (Field/Title), the
    // rest can be $select-ed by name. Selecting a User/Lookup field by bare name returns a 400.
    const isExpand = (f: string): boolean => !!EXPAND_TYPES[typeMap[f]];
    const orderExpr = (f: string): string => (isExpand(f) ? f + '/Title' : f);

    const selects: string[] = [];
    const expands: string[] = [];
    if (!allColumnsForTable) {
      for (let i = 0; i < wantedNames.length; i++) {
        const name = wantedNames[i];
        if (isExpand(name)) { selects.push(name + '/Title', name + '/ID'); expands.push(name); }
        else { selects.push(name); }
      }
    }

    const top = Math.max(1, Math.min(5000, cfg.itemLimit || 100));
    let url = this.webUrl + "/_api/web/lists/getByTitle('" + escapeTitle(cfg.listTitle) + "')/items?$top=" + top;
    if (selects.length > 0) { url += '&$select=' + selects.join(','); }
    if (expands.length > 0) { url += '&$expand=' + expands.join(','); }
    if (known(rcfg.orderByField)) { url += '&$orderby=' + orderExpr(rcfg.orderByField) + (rcfg.orderDesc ? ' desc' : ' asc'); }

    const data = await this.getJson<{ value: IListRow[] }>(url);
    const rows: IListRow[] = (data && data.value) || [];
    const shaped = shapeData(rows, rcfg, false);
    // Hand the table view the resolved (correct-case) columns so cells never render blank.
    shaped.tableColumns = allColumnsForTable ? undefined : rcfg.tableFields;
    return shaped;
  }
}
