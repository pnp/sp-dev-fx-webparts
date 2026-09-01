import { formatFieldValue, getHyperlinkUrl, stripHtml } from './ValueFormatting';

describe('ValueFormatting', () => {
  const javascriptUrl = ['java', 'script:alert(1)'].join('');
  const dataUrl = ['data', 'text/html,unsafe'].join(':');

  it('strips markup, comments, and script content', () => {
    expect(stripHtml('<p>Hello <strong>world</strong></p><!-- hidden --><script>alert(1)</script>')).toBe('Hello world');
  });

  it('formats null and unsupported values safely', () => {
    expect(formatFieldValue(null, 'text')).toBe('—');
    expect(formatFieldValue(undefined, 'number')).toBe('—');
    expect(formatFieldValue({ value: 1 }, 'text')).toBe('—');
    expect(formatFieldValue('value', 'unsupported' as never)).toBe('—');
  });

  it('accepts only http and https hyperlinks', () => {
    expect(getHyperlinkUrl('https://example.com/a')).toBe('https://example.com/a');
    expect(getHyperlinkUrl('/records/1', 'https://contoso.sharepoint.com/sites/demo')).toBe('https://contoso.sharepoint.com/records/1');
    expect(getHyperlinkUrl(javascriptUrl, 'https://contoso.sharepoint.com')).toBeUndefined();
    expect(getHyperlinkUrl(dataUrl, 'https://contoso.sharepoint.com')).toBeUndefined();
    expect(getHyperlinkUrl('not a url')).toBeUndefined();
  });
});
