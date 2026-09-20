/**
 * Formats a byte count into a human-readable size string (e.g. "1.5 GB").
 * @param bytes The size in bytes.
 * @param fallback Value returned when the size is undefined/null.
 */
export function formatBytes(bytes?: number, fallback = '—'): string {
  if (bytes === undefined || bytes === null) {
    return fallback;
  }
  if (bytes === 0) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

/**
 * Formats an ISO date string into a localized short date.
 * @param value The ISO date string.
 * @param fallback Value returned when the date is missing or invalid.
 */
export function formatDate(value?: string, fallback = ''): string {
  if (!value) {
    return fallback;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
}
