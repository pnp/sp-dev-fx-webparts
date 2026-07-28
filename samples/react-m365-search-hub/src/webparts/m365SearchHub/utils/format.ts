/**
 * Fills `{0}`, `{1}` … in a localised string.
 *
 * Kept here rather than pulled from a library so the sample has one fewer
 * dependency, and so the placeholder order stays the translator's to change.
 */
export function format(template: string, ...values: (string | number)[]): string {
  return template.replace(/\{(\d+)\}/g, (match, index) => {
    const value = values[Number(index)];
    return value === undefined ? match : String(value);
  });
}
