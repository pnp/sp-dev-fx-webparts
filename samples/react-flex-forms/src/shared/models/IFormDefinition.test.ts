import { parseFormDefinition } from './IFormDefinition';

const form = {
  schemaVersion: 1,
  title: 'Request',
  targetListTitle: 'Requests',
  published: false,
  fields: [{
    id: 'field-1',
    internalName: 'RequestTitle',
    label: 'Request title',
    type: 'text',
    required: true
  }]
};

describe('form definition validation', () => {
  it('B8 accepts the minimal version 1 model', () => {
    expect(parseFormDefinition(form)).toEqual(form);
  });

  it('B7/B8 rejects unsupported fields and unsafe internal names', () => {
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], type: 'people' }]
    })).toThrow('Invalid field definition.');
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], internalName: 'Bad Name' }]
    })).toThrow('Invalid field definition.');
  });

  it('B8 rejects duplicate columns and empty choice options', () => {
    expect(() => parseFormDefinition({
      ...form,
      fields: [form.fields[0], { ...form.fields[0], id: 'field-2' }]
    })).toThrow('Field IDs and internal names must be unique.');
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], type: 'choice', options: [] }]
    })).toThrow('Choice fields require non-empty options.');
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], type: 'choice', options: ['One', ' one '] }]
    })).toThrow('Choice fields require non-empty options.');
  });

  it('B8 rejects unsafe list titles and oversized field contracts', () => {
    expect(() => parseFormDefinition({ ...form, targetListTitle: 'Bad\u0000List' })).toThrow('Invalid form definition.');
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], label: 'Bad\u0000Label' }]
    })).toThrow('Invalid field definition.');
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], type: 'choice', options: ['Bad\u0000Choice'] }]
    })).toThrow('Choice fields require non-empty options.');
    expect(() => parseFormDefinition({
      ...form,
      fields: [{ ...form.fields[0], internalName: `F${'x'.repeat(32)}` }]
    })).toThrow('Invalid field definition.');
  });
});
