import { parseMetadataFields, validateFolderPath, validateMaxRows, validateServerRelativePath } from '../webparts/documentMetadataReview/utils/validation';

describe('configuration validation', () => {
  test('accepts a server-relative library path and normalizes its trailing slash', () => {
    expect(validateServerRelativePath(' /sites/legal/Shared Documents/ ', 'Library path')).toEqual({ valid: true, value: '/sites/legal/Shared Documents' });
  });

  test('rejects traversal, query strings, and empty folders', () => {
    expect(validateServerRelativePath('/sites/legal/../Shared Documents', 'Library path').valid).toBe(false);
    expect(validateServerRelativePath('/sites/legal/Shared Documents?x=1', 'Library path').valid).toBe(false);
    expect(validateFolderPath('   ')).toEqual({ valid: true, value: undefined });
  });

  test('caps row count and metadata field count', () => {
    expect(validateMaxRows(0).valid).toBe(false);
    expect(validateMaxRows(501).valid).toBe(false);
    const fields = Array.from({ length: 9 }, (_value, index) => ({ internalName: `Field${index}`, displayName: `Field ${index}`, required: false, type: 'text' }));
    expect(parseMetadataFields(JSON.stringify(fields)).valid).toBe(false);
  });
});
