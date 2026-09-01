import { IDocumentRecord, IMetadataFieldDefinition } from '../webparts/documentMetadataReview/models/DocumentMetadataModels';
import { classifyDocument, classifyMetadataValue, filterDocuments, formatMetadataValue } from '../webparts/documentMetadataReview/utils/metadata';

const requiredText: IMetadataFieldDefinition = { internalName: 'Title', displayName: 'Title', required: true, type: 'text' };
const optionalText: IMetadataFieldDefinition = { internalName: 'Summary', displayName: 'Summary', required: false, type: 'text' };

describe('metadata classification', () => {
  test.each([
    [undefined, requiredText, 'missing'],
    ['', requiredText, 'empty-required'],
    ['', optionalText, 'empty-optional'],
    [42, requiredText, 'valid'],
    [{}, requiredText, 'invalid']
  ])('classifies %p as %p', (value, field, expected) => {
    expect(classifyMetadataValue(value, field)).toBe(expected);
  });

  test('formats dates, numbers, booleans, and people predictably', () => {
    expect(formatMetadataValue('2024-01-15T00:00:00.000Z', { ...requiredText, type: 'date' })).toBe('15 Jan 2024');
    expect(formatMetadataValue(12345.6, { ...requiredText, type: 'number' })).toBe('12,345.6');
    expect(formatMetadataValue(true, { ...requiredText, type: 'boolean' })).toBe('Yes');
    expect(formatMetadataValue({ Title: 'Alex Smith' }, requiredText)).toBe('Alex Smith');
  });
});

describe('review filtering', () => {
  const records: IDocumentRecord[] = [
    { id: 1, name: 'Ready.docx', url: '/ready.docx', modified: '', modifiedBy: '', metadata: { Title: 'Ready' } },
    { id: 2, name: 'Needs-review.docx', url: '/needs-review.docx', modified: '', modifiedBy: '', metadata: {} }
  ];
  const reviews = records.map(record => classifyDocument(record, [requiredText]));

  test('separates complete and needs-review documents', () => {
    expect(filterDocuments(reviews, 'complete').map(item => item.document.id)).toEqual([1]);
    expect(filterDocuments(reviews, 'needs-review').map(item => item.document.id)).toEqual([2]);
    expect(filterDocuments(reviews, 'all')).toHaveLength(2);
  });
});
