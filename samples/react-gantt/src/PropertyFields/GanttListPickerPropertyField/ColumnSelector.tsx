import * as React from "react";
import { Checkbox, Text } from "@fluentui/react-components";
import { useGanttListPickerStyles } from "./useGanttListPickerStyles";
import * as strings from 'GanttWebPartStrings';

const GANTT_COLUMN_OPTIONS = [
  { id: "text", label: strings.ColumnTaskName },
  { id: "start", label: strings.ColumnStartDate },
  { id: "duration", label: strings.ColumnDuration },
  { id: "end", label: strings.ColumnEndDate },
  { id: "progress", label: strings.ColumnProgress },
] as const;

export interface IColumnSelectorStepProps {
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
}

export const ColumnSelector: React.FC<IColumnSelectorStepProps> = React.memo((props) => {
  const { visibleColumns, onVisibleColumnsChange } = props;
  const { styles } = useGanttListPickerStyles();

  const handleToggle = React.useCallback(
    (colId: string, checked: boolean): void => {
      const updated = checked
        ? [...visibleColumns, colId]
        : visibleColumns.filter((c) => c !== colId);
      onVisibleColumnsChange(updated);
    },
    [visibleColumns, onVisibleColumnsChange]
  );

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>{strings.VisibleColumnsTitle}</Text>
      <div className={styles.columnsGrid}>
        {GANTT_COLUMN_OPTIONS.map((col) => (
          <Checkbox
            key={col.id}
            label={col.label}
            checked={visibleColumns.indexOf(col.id) !== -1}
            onChange={(_e, data) => handleToggle(col.id, !!data.checked)}
          />
        ))}
      </div>
    </div>
  );
});

ColumnSelector.displayName = 'ColumnSelector';
