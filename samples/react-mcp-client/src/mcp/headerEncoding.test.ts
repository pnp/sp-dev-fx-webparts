import {
  isHeaderSafe,
  looksLikeSentinel,
  encodeHeaderValue,
  decodeHeaderValue,
  stringifyParamValue
} from './headerEncoding';

/**
 * These cases come straight from the encoding table in the 2026-07-28
 * Streamable HTTP specification.
 */
describe('isHeaderSafe', () => {
  it('accepts plain ASCII', () => {
    expect(isHeaderSafe('us-west1')).toBe(true);
    expect(isHeaderSafe('tools/call')).toBe(true);
  });

  it('rejects non ASCII', () => {
    expect(isHeaderSafe('Hello, 世界')).toBe(false);
  });

  it('rejects leading or trailing whitespace', () => {
    expect(isHeaderSafe(' padded ')).toBe(false);
  });

  it('rejects control characters', () => {
    expect(isHeaderSafe('line1\nline2')).toBe(false);
  });
});

describe('encodeHeaderValue', () => {
  it('leaves plain ASCII untouched', () => {
    expect(encodeHeaderValue('us-west1')).toBe('us-west1');
  });

  it('encodes non ASCII using the sentinel format from the spec', () => {
    expect(encodeHeaderValue('Hello, 世界')).toBe('=?base64?SGVsbG8sIOS4lueVjA==?=');
  });

  it('encodes a padded value', () => {
    expect(encodeHeaderValue(' padded ')).toBe('=?base64?IHBhZGRlZCA=?=');
  });

  it('encodes a newline', () => {
    expect(encodeHeaderValue('line1\nline2')).toBe('=?base64?bGluZTEKbGluZTI=?=');
  });

  it('encodes a plain value that already looks like the sentinel, to avoid ambiguity', () => {
    expect(encodeHeaderValue('=?base64?literal?=')).toBe('=?base64?PT9iYXNlNjQ/bGl0ZXJhbD89?=');
  });
});

describe('decodeHeaderValue', () => {
  it('round trips every encoded case', () => {
    const values = ['us-west1', 'Hello, 世界', ' padded ', 'line1\nline2', '=?base64?literal?='];
    for (const value of values) {
      expect(decodeHeaderValue(encodeHeaderValue(value))).toBe(value);
    }
  });

  it('returns a plain value unchanged', () => {
    expect(decodeHeaderValue('get_weather')).toBe('get_weather');
  });
});

describe('looksLikeSentinel', () => {
  it('recognises the markers', () => {
    expect(looksLikeSentinel('=?base64?abc?=')).toBe(true);
  });

  it('is case sensitive, as the spec requires', () => {
    expect(looksLikeSentinel('=?BASE64?abc?=')).toBe(false);
  });
});

describe('stringifyParamValue', () => {
  it('lowercases booleans', () => {
    expect(stringifyParamValue(true)).toBe('true');
    expect(stringifyParamValue(false)).toBe('false');
  });

  it('renders integers in decimal', () => {
    expect(stringifyParamValue(42)).toBe('42');
    expect(stringifyParamValue(-7)).toBe('-7');
  });

  it('omits null and undefined so the header is not sent', () => {
    expect(stringifyParamValue(null)).toBeUndefined();
    expect(stringifyParamValue(undefined)).toBeUndefined();
  });
});
