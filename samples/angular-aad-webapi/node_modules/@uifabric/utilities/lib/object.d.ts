export declare function shallowCompare(a: any, b: any): boolean;
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export declare function assign(target: any, ...args: any[]): any;
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @params filteredAssign {Function} A callback function that tests if the property should be assigned.
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export declare function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args: any[]): any;
/** Generates a unique id in the global scope (this spans across duplicate copies of the same library.) */
export declare function getId(prefix?: string): string;
