export function escapeODataLiteral(value: string): string {
  return value.replace(/'/g, "''");
}