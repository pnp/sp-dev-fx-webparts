import * as React from 'react';
import { IListRow } from '../../model/dashboardTypes';
import { cellText, isNumericValue } from '../format';
import styles from '../ListDashboard.module.scss';

const SYSTEM: string[] = ['ID', 'Id', 'GUID'];

export const TableView: React.FunctionComponent<{ rows: IListRow[]; fields: string[] }> = (props) => {
  const [sortField, setSortField] = React.useState<string>('');
  const [desc, setDesc] = React.useState<boolean>(false);

  let cols = props.fields.filter((f) => !!f);
  if (cols.length === 0 && props.rows.length > 0) {
    cols = Object.keys(props.rows[0]).filter(
      (k) => SYSTEM.indexOf(k) === -1 && k.charAt(0) !== '@' && k.indexOf('odata') === -1
    );
  }

  const rows = props.rows.slice();
  if (sortField) {
    rows.sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const dir = desc ? -1 : 1;
      if (isNumericValue(av) && isNumericValue(bv)) { return (Number(av) - Number(bv)) * dir; }
      return cellText(av).localeCompare(cellText(bv)) * dir;
    });
  }

  const onSort = (f: string): void => {
    if (f === sortField) { setDesc(!desc); } else { setSortField(f); setDesc(false); }
  };

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c} onClick={() => onSort(c)} title="Sort">
                {c}{sortField === c ? (desc ? ' ▼' : ' ▲') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td key={c} className={isNumericValue(r[c]) ? styles.num : undefined}>{cellText(r[c])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
