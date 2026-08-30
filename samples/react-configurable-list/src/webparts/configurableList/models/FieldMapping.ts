import { FieldKind, IListField, ISharePointField } from './ListModels';

const FIELD_KIND_BY_TYPE: Record<string, FieldKind> = {
  Text: 'text',
  Note: 'text',
  Number: 'number',
  Currency: 'currency',
  DateTime: 'date',
  Boolean: 'boolean',
  Choice: 'choice',
  URL: 'hyperlink',
  User: 'person'
};

export function mapField(field: ISharePointField): IListField | undefined {
  const kind = FIELD_KIND_BY_TYPE[field.TypeAsString];
  if (!kind || !field.InternalName || field.Hidden || field.ReadOnlyField) {
    return undefined;
  }

  return {
    id: field.Id,
    title: field.Title || field.InternalName,
    internalName: field.InternalName,
    kind,
    multiple: Boolean(field.AllowMultipleValues)
  };
}

export function mapFields(fields: ISharePointField[]): IListField[] {
  return fields.map(mapField).filter((field): field is IListField => Boolean(field));
}

export function getVisibleFields(fields: IListField[], configured: string): IListField[] {
  const requested = configured
    .split(',')
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);

  if (!requested.length) {
    return fields.slice(0, 5);
  }

  const visible = requested
    .map((name) => fields.find((field) => field.internalName.toLowerCase() === name))
    .filter((field): field is IListField => Boolean(field));

  return visible.length ? visible : fields.slice(0, 5);
}
