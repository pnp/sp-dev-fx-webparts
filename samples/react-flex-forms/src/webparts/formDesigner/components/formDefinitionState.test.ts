import { addField, createEmptyDefinition, moveField, removeField, updateField } from './formDefinitionState';

describe('V4 designer state transitions', () => {
  it('adds, edits, reorders, and removes supported fields without mutating prior state', () => {
    const empty = createEmptyDefinition();
    const withText = addField(empty, 'text');
    const withChoice = addField(withText, 'choice');
    const edited = updateField(withChoice, 'field-2', { label: 'Priority', options: ['High', 'Low'] });
    const moved = moveField(edited, 'field-2', -1);
    const removed = removeField(moved, 'field-1');

    expect(empty.fields).toEqual([]);
    expect(edited.fields[1]).toMatchObject({ label: 'Priority', type: 'choice', options: ['High', 'Low'] });
    expect(moved.fields.map(field => field.id)).toEqual(['field-2', 'field-1']);
    expect(removed.fields.map(field => field.id)).toEqual(['field-2']);
  });

  it('keeps boundary reorders unchanged', () => {
    const definition = addField(createEmptyDefinition(), 'date');
    expect(moveField(definition, 'field-1', -1)).toBe(definition);
    expect(moveField(definition, 'missing', 1)).toBe(definition);
  });
});
