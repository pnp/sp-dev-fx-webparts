import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';
import type { ListChildComponentProps } from 'react-window';
import { useListViewFilterPanelStyles } from './ListViewFilterPanel.styles';

export interface IFilterValueRowData {
  values: string[];
  selectedValues: Set<string>;
  onToggleValue: (value: string) => void;
}

/** Single row inside the virtualized filter values list. */
export const FilterValueRow: React.FC<ListChildComponentProps<IFilterValueRowData>> = ({ index, style, data }) => {
  const styles = useListViewFilterPanelStyles();
  const value = data.values[index];
  return (
    <div style={style} className={styles.valueRow}>
      <Checkbox
        className={styles.valueCheckbox}
        label={<span className={styles.valueLabel}>{value}</span>}
        checked={data.selectedValues.has(value)}
        onChange={() => data.onToggleValue(value)}
      />
    </div>
  );
};
