/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 *
 * @example
 * import { autobind } from '../utilities/autobind';
 *
 * public class Foo {
 *   @autobind
 *   method() {
 *   }
 * }
 */
export declare function autobind<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
    configurable: boolean;
    get(): any;
    set(newValue: any): void;
};
