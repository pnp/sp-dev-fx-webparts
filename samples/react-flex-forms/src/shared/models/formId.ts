export function parseFormId(value: unknown): number | undefined {
  if (typeof value !== 'number' && typeof value !== 'string') return undefined;

  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}
