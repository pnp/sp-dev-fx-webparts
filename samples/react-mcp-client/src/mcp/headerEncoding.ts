/**
 * Header value encoding for the 2026-07-28 Streamable HTTP transport.
 *
 * `Mcp-Name` and `Mcp-Param-{Name}` mirror body values into HTTP headers, and
 * the server rejects the request with a HeaderMismatch error if the two
 * disagree. HTTP header values are limited to visible ASCII, so anything that
 * cannot be represented safely is carried Base64 encoded inside a sentinel:
 *
 *   Mcp-Name: =?base64?SGVsbG8sIOS4lueVjA==?=
 *
 * The markers are lowercase and case sensitive. A plain ASCII value that
 * happens to look like the sentinel must also be encoded, otherwise a server
 * would decode something the client never encoded.
 */

const SENTINEL_PREFIX: string = '=?base64?';
const SENTINEL_SUFFIX: string = '?=';

/**
 * Visible ASCII (0x21 to 0x7E), space and horizontal tab, with no leading or
 * trailing whitespace. Values outside this set must be encoded.
 */
export const isHeaderSafe = (value: string): boolean => {
  if (value.length === 0) {
    return true;
  }
  if (value !== value.trim()) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const printable = code >= 0x21 && code <= 0x7e;
    const spaceOrTab = code === 0x20 || code === 0x09;
    if (!printable && !spaceOrTab) {
      return false;
    }
  }
  return true;
};

export const looksLikeSentinel = (value: string): boolean =>
  value.indexOf(SENTINEL_PREFIX) === 0 &&
  value.length >= SENTINEL_PREFIX.length + SENTINEL_SUFFIX.length &&
  value.lastIndexOf(SENTINEL_SUFFIX) === value.length - SENTINEL_SUFFIX.length;

/**
 * UTF-8 conversion without TextEncoder.
 *
 * `btoa` and `atob` are byte oriented, so a string has to be reduced to bytes
 * first or anything outside Latin-1 throws. TextEncoder would do it, but it is
 * absent from some test and older embedded environments, and percent encoding
 * is already UTF-8 by definition, so it needs no extra dependency.
 */
const toBase64 = (value: string): string => {
  const encoded = encodeURIComponent(value);
  let binary = '';
  for (let i = 0; i < encoded.length; i++) {
    if (encoded.charAt(i) === '%') {
      binary += String.fromCharCode(parseInt(encoded.substr(i + 1, 2), 16));
      i += 2;
    } else {
      binary += encoded.charAt(i);
    }
  }
  return btoa(binary);
};

const fromBase64 = (value: string): string => {
  const binary = atob(value);
  let percentEncoded = '';
  for (let i = 0; i < binary.length; i++) {
    const code = binary.charCodeAt(i);
    percentEncoded += `%${code < 16 ? '0' : ''}${code.toString(16)}`;
  }
  return decodeURIComponent(percentEncoded);
};

/** Encodes a value for use as an Mcp-Name or Mcp-Param-{Name} header value. */
export const encodeHeaderValue = (value: string): string => {
  if (isHeaderSafe(value) && !looksLikeSentinel(value)) {
    return value;
  }
  return `${SENTINEL_PREFIX}${toBase64(value)}${SENTINEL_SUFFIX}`;
};

/** Reverses encodeHeaderValue. A plain value is returned unchanged. */
export const decodeHeaderValue = (value: string): string => {
  if (!looksLikeSentinel(value)) {
    return value;
  }
  const inner = value.substring(SENTINEL_PREFIX.length, value.length - SENTINEL_SUFFIX.length);
  return fromBase64(inner);
};

/** Converts a primitive argument to the string form the spec requires. */
export const stringifyParamValue = (value: unknown): string | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'number') {
    // Only integers may be mirrored. A non integer is a server authoring error.
    return String(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  return undefined;
};
