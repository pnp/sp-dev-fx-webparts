import { Checkbox, Dropdown, Field, Input, Option, Textarea } from '@fluentui/react-components';
import * as React from 'react';
import { IFieldDefinition } from '../../../shared/models/IFieldDefinition';

export interface IFormFieldProps {
  field: IFieldDefinition;
  value: unknown;
  error?: string;
  idPrefix?: string;
  onChange: (value: unknown) => void;
}

export const FormField: React.FC<IFormFieldProps> = ({ field, value, error, idPrefix, onChange }) => {
  const id = formControlId(field, idPrefix);
  const fieldProps = {
    label: field.label,
    required: field.required,
    hint: field.helpText,
    validationMessage: error,
    validationState: error ? 'error' as const : 'none' as const
  };

  if (field.type === 'multiline') {
    return <Field {...fieldProps}><Textarea id={id} value={stringValue(value)} onChange={(_, data) => onChange(data.value)} /></Field>;
  }
  if (field.type === 'choice') {
    const selected = stringValue(value);
    return (
      <Field {...fieldProps}>
        <Dropdown
          id={id}
          placeholder="Select an option"
          value={selected}
          selectedOptions={selected ? [selected] : []}
          onOptionSelect={(_, data) => onChange(data.optionValue)}
        >
          {field.options?.map(option => <Option key={option} value={option}>{option}</Option>)}
        </Dropdown>
      </Field>
    );
  }
  if (field.type === 'yesno') {
    return (
      <Field {...fieldProps}>
        <Checkbox id={id} label="Yes" checked={value === true} onChange={(_, data) => onChange(!!data.checked)} />
      </Field>
    );
  }

  return (
    <Field {...fieldProps}>
      <Input
        id={id}
        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
        value={stringValue(value)}
        onChange={(_, data) => onChange(data.value)}
      />
    </Field>
  );
};

export function formControlId(field: IFieldDefinition, idPrefix = 'flex-forms'): string {
  return `${idPrefix}-${field.id}`;
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
