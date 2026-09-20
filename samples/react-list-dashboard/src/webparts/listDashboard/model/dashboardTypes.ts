// Core types for the List Dashboard web part.

export type DisplayType = 'stat' | 'tiles' | 'bar' | 'column' | 'pie' | 'donut' | 'line' | 'area' | 'table';

export type Aggregation = 'count' | 'sum' | 'avg' | 'min' | 'max';

// Time-series bucketing period for the line / area views.
export type DatePeriod = 'day' | 'week' | 'month';

// How tiles/bars are coloured: one theme hue, a distinct hue per category, a
// light-to-dark ramp of the accent by value, or green/amber/red vs a target.
export type ColorMode = 'accent' | 'categorical' | 'gradient' | 'status';

// For status colouring: which direction of the measure is the good one.
export type StatusDirection = 'higher-good' | 'lower-good';

// Named categorical palettes (tone variants); each validated colourblind-safe.
export type PaletteName = 'vibrant' | 'soft' | 'mild' | 'deep';

// How a measure is rendered: compact (1.2K), plain number (1,234), currency, or
// percent-of-total (each value as a share of the group's sum).
export type NumberFormatKind = 'compact' | 'number' | 'currency' | 'percent';

export interface INumberFormat {
  kind: NumberFormatKind;
  decimals: number;       // 0-2, ignored by compact
  currencySymbol: string; // used by currency, e.g. "$", "£", "EUR "
}

// One row from the source list/library, keyed by field internal name.
export interface IListRow {
  [internalName: string]: unknown;
}

// One aggregated data point (a category and its rolled-up value).
export interface IAggPoint {
  key: string;   // the category label
  value: number; // the aggregated value (per the chosen aggregation)
  count: number; // how many rows fell in this category
}

// The shaped result the views render from.
export interface IDashboardData {
  rows: IListRow[];        // capped raw rows (table view)
  points: IAggPoint[];     // aggregated by category (tiles, bar)
  total: number;           // single aggregate over all rows (stat view)
  aggregation: Aggregation;
  valueLabel: string;      // human label for the measure, e.g. "Sum of Budget" or "Items"
  isDemo: boolean;         // true when no list is bound (demo fallback)
  tableColumns?: string[]; // resolved (correct-case) table columns for the table view
}

// A field the user can map to, offered in the property pane dropdowns.
export interface IFieldOption {
  internalName: string;
  title: string;
  typeAsString: string;
}

// A list/library the user can bind to.
export interface IListOption {
  title: string;
  baseTemplate: number;
  isLibrary: boolean;
}
