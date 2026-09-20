/**
 * Parses a SharePoint **Date only** field value to a local-midnight Date.
 *
 * Date-only fields come back as `YYYY-MM-DDT00:00:00Z`, so the leading date part is
 * the day the author picked no matter the site's time zone. Building the Date from
 * those three numbers keeps it on that day; `new Date(raw)` would shift it for any
 * viewer west of UTC. Start/End must therefore be Date-only columns, not Date+Time.
 *
 * Returns undefined for an empty or unparseable value.
 */
export function parseSpDateOnly(raw: string | undefined): Date | undefined {
  if (!raw) {
    return undefined;
  }
  const match: RegExpExecArray | null = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  const fallback: Date = new Date(raw);
  return isNaN(fallback.getTime())
    ? undefined
    : new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
}
