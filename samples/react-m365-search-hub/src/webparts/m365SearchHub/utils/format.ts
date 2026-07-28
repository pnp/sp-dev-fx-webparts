/**
 * Fills `{0}`, `{1}` … in a localised string.
 *
 * Kept here rather than pulled from a library so the sample has one fewer
 * dependency, and so the placeholder order stays the translator's to change.
 *
 * A missing template returns nothing rather than throwing. `strings.Whatever`
 * is `undefined` when a locale file does not carry that key, and a translation
 * that is one string short should cost a label, not the whole web part. This
 * is not a guess about the platform: it is what the platform does when a key
 * is absent.
 */
export function format(template: string | undefined, ...values: (string | number)[]): string {
  if (!template) {
    return '';
  }

  return template.replace(/\{(\d+)\}/g, (match, index) => {
    const value = values[Number(index)];
    return value === undefined ? match : String(value);
  });
}
