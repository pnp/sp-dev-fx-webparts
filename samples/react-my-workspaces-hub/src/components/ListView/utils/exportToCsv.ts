import type { IListViewColumn } from '../interfaces/IListView';
import { formatValueByType } from './formatters';

/** Quotes a single CSV field per RFC 4180. */
const csvField = (value: string): string => {
  const needsQuotes = /[",\r\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
};

/**
 * Builds CSV text from items + columns using the same display formatting as the table cells.
 */
export const buildCsv = <TItem,>(items: TItem[], columns: IListViewColumn<TItem>[]): string => {
  const header = columns.map((c) => csvField(c.header)).join(',');
  const lines = items.map((item) =>
    columns
      .map((column) => csvField(formatValueByType(column.getValue(item), column)))
      .join(',')
  );
  return [header, ...lines].join('\r\n');
};

/** Triggers a CSV download in the browser. Includes a UTF-8 BOM for Excel compatibility. */
export const downloadCsv = <TItem,>(
  items: TItem[],
  columns: IListViewColumn<TItem>[],
  filename: string
): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const csv = `\ufeff${buildCsv(items, columns)}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.toLowerCase().endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
