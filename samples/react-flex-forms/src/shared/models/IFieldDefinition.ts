export const fieldTypes = ['text', 'multiline', 'number', 'choice', 'date', 'yesno'] as const;

export type FieldType = typeof fieldTypes[number];

export interface IFieldDefinition {
  id: string;
  internalName: string;
  label: string;
  type: FieldType;
  required: boolean;
  helpText?: string;
  options?: string[];
}
