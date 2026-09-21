import {
  formatFileSize,
  formatModifiedDate,
  getSafeSharePointDownloadUrl,
  getSafeSharePointFileUrl,
  isPathWithinRoot,
  joinServerRelativePath,
  normalizeServerRelativePath,
  PathValidationError,
  resolveFolderPath
} from './fileUrl';

describe('file URL and path safety', () => {
  test('normalizes safe paths and rejects traversal', () => {
    expect(normalizeServerRelativePath(' /sites/demo/Documents/ ')).toBe('/sites/demo/Documents');
    expect(normalizeServerRelativePath('/sites/demo/Documents/')).toBe('/sites/demo/Documents');
    expect(() => normalizeServerRelativePath('/sites/demo/Documents/../Secret')).toThrow(PathValidationError);
    expect(() => normalizeServerRelativePath('/sites/demo/Documents/%2e%2e/Secret')).toThrow(PathValidationError);
    expect(() => normalizeServerRelativePath('/sites/demo/Documents/%2FSecret')).toThrow(PathValidationError);
  });

  test('constrains child and folder paths to the configured root', () => {
    const root = '/sites/demo/Documents';
    expect(joinServerRelativePath(root, 'Quarter 1')).toBe('/sites/demo/Documents/Quarter 1');
    expect(resolveFolderPath(root, '/sites/demo/Documents/Quarter%201')).toBe('/sites/demo/Documents/Quarter 1');
    expect(isPathWithinRoot(root, '/sites/demo/Documents/Quarter 1')).toBe(true);
    expect(() => joinServerRelativePath(root, '../Secret')).toThrow(PathValidationError);
    expect(() => resolveFolderPath(root, '/sites/demo/Secret')).toThrow(PathValidationError);
  });

  test('creates same-origin open and download URLs', () => {
    const file = '/sites/demo/Documents/Quarter 1/report %231.pdf';
    expect(getSafeSharePointFileUrl(file, 'https://contoso.sharepoint.com/sites/demo', '/sites/demo/Documents'))
      .toBe('https://contoso.sharepoint.com/sites/demo/Documents/Quarter%201/report%20%231.pdf');
    expect(getSafeSharePointDownloadUrl(file, 'https://contoso.sharepoint.com/sites/demo', '/sites/demo/Documents'))
      .toContain('download=1');
    expect(() => getSafeSharePointFileUrl('/sites/other/file.pdf', 'https://contoso.sharepoint.com', '/sites/demo/Documents'))
      .toThrow(PathValidationError);
  });
});

describe('formatting', () => {
  test('formats file sizes and unknown values', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(undefined)).toBe('—');
  });

  test('formats valid dates and rejects invalid dates', () => {
    expect(formatModifiedDate('2024-01-02T00:00:00.000Z')).toBe('02 Jan 2024');
    expect(formatModifiedDate('not-a-date')).toBe('—');
  });
});
