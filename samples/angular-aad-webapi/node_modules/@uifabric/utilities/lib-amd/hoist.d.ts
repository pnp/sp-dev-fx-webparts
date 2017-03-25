/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 * @param destination The instance of the object to hoist the methods onto.
 * @param source The instance of the object where the methods are hoisted from.
 * @param exclusions (Optional) What methods to exclude from being hoisted.
 * @returns {string[]} An array of names of methods that were hoisted.
 */
export declare function hoistMethods(destination: any, source: any, exclusions?: string[]): string[];
/**
 * Provides a method for convenience to unhoist hoisted methods.
 * @param {any} source The source object upon which methods were hoisted.
 * @param {string[]} methodNames An array of method names to unhoist.
 */
export declare function unhoistMethods(source: any, methodNames: string[]): void;
