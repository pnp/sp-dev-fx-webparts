/**
 * Substitutes {0}, {1}, … placeholders in a localized string.
 * Lives under services/ so both services and components can use it without
 * services having to reach up into the component tree.
 */
export function formatString(template: string, ...args: string[]): string {
  return template.replace(/\{(\d+)\}/g, (match, index) => args[Number(index)] ?? match);
}
