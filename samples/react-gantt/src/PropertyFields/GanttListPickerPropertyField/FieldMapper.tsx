import * as React from "react";
import { Dropdown, Option, Text } from "@fluentui/react-components";
import { useGanttListPickerStyles } from "./useGanttListPickerStyles";
import { GANTT_TASK_FIELD_DEFINITIONS } from "./IGanttFieldDefinitions";
import type { ISPField, IGanttFieldMappings } from "./IGanttFieldDefinitions";
import * as strings from 'GanttWebPartStrings';

const FIELD_LABEL_MAP: Record<string, string> = {
  text: strings.FieldTaskName,
  start: strings.FieldStartDate,
  duration: strings.FieldDuration,
  progress: strings.FieldProgress,
  type: strings.FieldTaskType,
  parent: strings.FieldParentTask,
  end: strings.FieldEndDate,
};

export interface IFieldMapperProps {
  listFields: ISPField[];
  fieldMappings: IGanttFieldMappings;
  onFieldMappingsChange: (mappings: IGanttFieldMappings) => void;
}

export const FieldMapper: React.FC<IFieldMapperProps> = React.memo((props) => {
  const { listFields, fieldMappings, onFieldMappingsChange } = props;
  const { styles } = useGanttListPickerStyles();

  const handleChange = React.useCallback(
    (key: keyof IGanttFieldMappings, internalName: string): void => {
      onFieldMappingsChange({ ...fieldMappings, [key]: internalName || undefined });
    },
    [fieldMappings, onFieldMappingsChange]
  );

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>{strings.MapFieldsTitle}</Text>

      {GANTT_TASK_FIELD_DEFINITIONS.map((def) => {
        const compatible = listFields.filter(
          (f) => def.compatibleTypes.indexOf(f.TypeAsString) !== -1
        );
        const currentValue = fieldMappings[def.key] ?? "";
        const localizedLabel = FIELD_LABEL_MAP[def.key] || def.label;

        return (
          <div key={def.key} className={styles.fieldRow}>
            <span className={styles.fieldLabel}>
              {localizedLabel}
              {def.required ? " *" : ""}
            </span>
            <Dropdown
              style={{ flex: 1, minWidth: 0 }}
              aria-label={strings.MapFieldAriaLabel.replace('{0}', localizedLabel)}
              placeholder={
                compatible.length === 0
                  ? strings.NoCompatibleFields
                  : strings.SelectFieldPlaceholder
              }
              disabled={compatible.length === 0}
              value={
                compatible.find((f) => f.InternalName === currentValue)?.Title ?? ""
              }
              selectedOptions={currentValue ? [currentValue] : []}
              onOptionSelect={(_e, data) => {
                handleChange(def.key, (data.optionValue as string) ?? "");
              }}
            >
              {!def.required && (
                <Option key="__none__" text={strings.NoneOption} value="">
                  {strings.NoneOption}
                </Option>
              )}
              {compatible.map((field) => (
                <Option
                  key={field.InternalName}
                  text={field.Title}
                  value={field.InternalName}
                >
                  {field.Title} ({field.TypeAsString})
                </Option>
              ))}
            </Dropdown>
          </div>
        );
      })}
    </div>
  );
});

FieldMapper.displayName = 'FieldMapper';
