/**
 * Minimal {0}-style placeholder substitution for localised strings.
 * Kept local so the sample does not pull in a formatting library for this.
 */
export function format(template: string, ...values: (string | number)[]): string {
  return template.replace(/\{(\d+)\}/g, (match, index) =>
    values[Number(index)] !== undefined ? String(values[Number(index)]) : match
  );
}
