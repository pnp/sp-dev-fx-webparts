import { FieldType } from '../../shared/models/IFieldDefinition';
import { buildFieldSchemaXml } from './ListSchemaService';

describe('V5 SharePoint field schemas', () => {
  it.each<[FieldType, string]>([
    ['text', 'Text'],
    ['multiline', 'Note'],
    ['number', 'Number'],
    ['choice', 'Choice'],
    ['date', 'DateTime'],
    ['yesno', 'Boolean']
  ])('maps %s to %s', (type, sharePointType) => {
    const xml = buildFieldSchemaXml({
      id: type,
      internalName: 'FieldName',
      label: 'A & B',
      type,
      required: true,
      options: type === 'choice' ? ['One', 'Two'] : undefined
    });

    expect(xml).toContain(`Type="${sharePointType}"`);
    expect(xml).toContain('DisplayName="A &amp; B"');
    expect(xml).toContain('Required="TRUE"');
  });

  it('escapes every XML-sensitive character in labels and choices', () => {
    const xml = buildFieldSchemaXml({
      id: 'choice',
      internalName: 'Choice',
      label: 'A & <B> "C" \'D\'',
      type: 'choice',
      required: false,
      options: ['A & B', '<Other>']
    });

    expect(xml).toContain('DisplayName="A &amp; &lt;B&gt; &quot;C&quot; &apos;D&apos;"');
    expect(xml).toContain('<CHOICE>A &amp; B</CHOICE><CHOICE>&lt;Other&gt;</CHOICE>');
  });
});
