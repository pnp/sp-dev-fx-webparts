import { FieldType, IFieldDefinition } from '../../../shared/models/IFieldDefinition';
import { IFormDefinition } from '../../../shared/models/IFormDefinition';

const labels: Record<FieldType, string> = {
  text: 'Text',
  multiline: 'Multiline text',
  number: 'Number',
  choice: 'Choice',
  date: 'Date',
  yesno: 'Yes or no'
};

export function createEmptyDefinition(): IFormDefinition {
  return { schemaVersion: 1, title: '', targetListTitle: '', published: false, fields: [] };
}

export function addField(definition: IFormDefinition, type: FieldType): IFormDefinition {
  let number = definition.fields.length + 1;
  while (definition.fields.some(field => field.id === `field-${number}` || field.internalName === `Field${number}`)) number++;

  const field: IFieldDefinition = {
    id: `field-${number}`,
    internalName: `Field${number}`,
    label: labels[type],
    type,
    required: false,
    options: type === 'choice' ? ['Option 1'] : undefined
  };
  return { ...definition, published: false, fields: [...definition.fields, field] };
}

export function updateField(
  definition: IFormDefinition,
  id: string,
  update: Partial<IFieldDefinition>
): IFormDefinition {
  return {
    ...definition,
    published: false,
    fields: definition.fields.map(field => field.id === id ? { ...field, ...update } : field)
  };
}

export function moveField(definition: IFormDefinition, id: string, offset: -1 | 1): IFormDefinition {
  const index = definition.fields.findIndex(field => field.id === id);
  const destination = index + offset;
  if (index < 0 || destination < 0 || destination >= definition.fields.length) return definition;

  const fields = [...definition.fields];
  [fields[index], fields[destination]] = [fields[destination], fields[index]];
  return { ...definition, published: false, fields };
}

export function removeField(definition: IFormDefinition, id: string): IFormDefinition {
  return { ...definition, published: false, fields: definition.fields.filter(field => field.id !== id) };
}
