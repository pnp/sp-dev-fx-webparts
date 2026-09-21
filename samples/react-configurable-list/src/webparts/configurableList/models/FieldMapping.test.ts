import { getVisibleFields, mapField, mapFields } from './FieldMapping';
import { ISharePointField } from './ListModels';

const field = (type: string, internalName = type): ISharePointField => ({
  Id: internalName,
  Title: internalName,
  InternalName: internalName,
  TypeAsString: type
});

describe('FieldMapping', () => {
  it('maps supported SharePoint field kinds', () => {
    expect(mapFields(['Text', 'Note', 'Number', 'Currency', 'DateTime', 'Boolean', 'Choice', 'URL', 'User'].map((type) => field(type))).map((item) => item.kind)).toEqual([
      'text', 'text', 'number', 'currency', 'date', 'boolean', 'choice', 'hyperlink', 'person'
    ]);
  });

  it('ignores unsupported, hidden, and read-only fields', () => {
    expect(mapField(field('Lookup'))).toBeUndefined();
    expect(mapField({ ...field('Text'), Hidden: true })).toBeUndefined();
    expect(mapField({ ...field('Text'), ReadOnlyField: true })).toBeUndefined();
  });

  it('uses configured fields case-insensitively and falls back to five fields', () => {
    const fields = mapFields(['Text', 'Number', 'DateTime', 'Choice', 'Boolean', 'URL'].map((type) => field(type)));

    expect(getVisibleFields(fields, ' choice, text ').map((item) => item.internalName)).toEqual(['Choice', 'Text']);
    expect(getVisibleFields(fields, 'missing')).toHaveLength(5);
  });
});
