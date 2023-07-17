export function isNullOrEmpty(value: string): boolean {
  return value === undefined || value === null || typeof value.trim !== "function" || value.trim() === "";
}
export function endsWith(str:string, suffix:string) {
  return str.substring(-suffix.length) === suffix;
}