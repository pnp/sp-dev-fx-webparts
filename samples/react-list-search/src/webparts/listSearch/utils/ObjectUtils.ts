export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setKeyValue = <T, K extends keyof T>(obj: T, key: K, value: any): T[K] => obj[key] = value;