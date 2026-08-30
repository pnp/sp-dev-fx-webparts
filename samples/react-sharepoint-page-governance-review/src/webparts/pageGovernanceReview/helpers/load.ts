export function invokeLoad(load: () => Promise<void>): void { void load(); }
