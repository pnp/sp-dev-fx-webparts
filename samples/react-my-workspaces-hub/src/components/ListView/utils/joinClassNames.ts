/**
 * Joins truthy class-name fragments with a single space. Falsy entries are
 * dropped so callers can pass conditional / undefined values directly.
 */
export const joinClassNames = (...values: Array<string | false | null | undefined>): string =>
  values.filter((value): value is string => Boolean(value)).join(' ');
