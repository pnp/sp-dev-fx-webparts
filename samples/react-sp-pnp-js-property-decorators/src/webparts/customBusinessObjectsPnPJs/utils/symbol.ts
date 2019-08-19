export function getSymbol(key: string): string {
  // symbol not supported on IE, maybe try with polyfill
  // const sym: symbol = Symbol.for(key);
  return "__" + key + "__";
}
