import { FieldType, IFieldDefinition } from '../../shared/models/IFieldDefinition';

const columnTypes: Record<FieldType, string> = {
  text: 'Text',
  multiline: 'Note',
  number: 'Number',
  choice: 'Choice',
  date: 'DateTime',
  yesno: 'Boolean'
};

export function getSharePointFieldType(type: FieldType): string {
  return columnTypes[type];
}

export function buildFieldSchemaXml(field: IFieldDefinition): string {
  const attributes = [
    `Type="${getSharePointFieldType(field.type)}"`,
    `Name="${escapeXml(field.internalName)}"`,
    `StaticName="${escapeXml(field.internalName)}"`,
    `DisplayName="${escapeXml(field.label)}"`,
    `Required="${field.required ? 'TRUE' : 'FALSE'}"`
  ];

  if (field.type === 'multiline') attributes.push('RichText="FALSE"', 'NumLines="6"');
  if (field.type === 'date') attributes.push('Format="DateOnly"');

  const choices = field.type === 'choice'
    ? `<CHOICES>${field.options?.map(option => `<CHOICE>${escapeXml(option)}</CHOICE>`).join('')}</CHOICES>`
    : '';

  return `<Field ${attributes.join(' ')}>${choices}</Field>`;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, character => {
    switch (character) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&apos;';
    }
  });
}
