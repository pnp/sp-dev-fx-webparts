import type { IListViewColumn } from '../interfaces/IListView';
import { formatValueByType, toNumber } from './formatters';

/**
 * Generates an Excel `.xlsx` file from items + columns and triggers a browser
 * download. Uses the same display formatting as the rendered table cells
 * (currency, dates, booleans, …) so the exported sheet matches what the user
 * sees on screen, while preserving raw numeric values for currency / number
 * columns so totals work in Excel.
 *
 * `xlsx` is loaded dynamically so the dependency does not bloat the main
 * bundle for consumers that only need CSV export.
 */
export const downloadExcel = async <TItem,>(
  items: TItem[],
  columns: IListViewColumn<TItem>[],
  filename: string
): Promise<void> => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const xlsx = await import('xlsx');

  const aoa: unknown[][] = [columns.map((c) => c.header)];
  items.forEach((item) => {
    aoa.push(
      columns.map((column) => {
        const raw = column.getValue(item);
        // Preserve native types (number / Date / boolean) when possible so
        // Excel can sum / sort the column. Fall back to the formatted display
        // string otherwise.
        if (column.dataType === 'number' || column.dataType === 'currency') {
          const numeric = toNumber(raw);
          return typeof numeric === 'number' ? numeric : formatValueByType(raw, column);
        }
        if (column.dataType === 'date') {
          if (raw instanceof Date) return raw;
          if (typeof raw === 'string') {
            const parsed = new Date(raw);
            if (!Number.isNaN(parsed.getTime())) return parsed;
          }
          return formatValueByType(raw, column);
        }
        if (column.dataType === 'boolean' && typeof raw === 'boolean') {
          return raw;
        }
        return formatValueByType(raw, column);
      })
    );
  });

  const worksheet = xlsx.utils.aoa_to_sheet(aoa);
  // Auto-size columns: width = max content length per column, capped at 60.
  worksheet['!cols'] = columns.map((_column, columnIndex) => {
    let maxLength = 10;
    aoa.forEach((row) => {
      const cell = row[columnIndex];
      const text = cell instanceof Date ? cell.toLocaleDateString() : String(cell ?? '');
      if (text.length > maxLength) maxLength = text.length;
    });
    return { wch: Math.min(maxLength + 2, 60) };
  });

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const finalName = filename.toLowerCase().endsWith('.xlsx')
    ? filename
    : `${filename}.xlsx`;
  xlsx.writeFile(workbook, finalName, { bookType: 'xlsx', compression: true });
};
