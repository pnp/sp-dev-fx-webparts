/**
 * Property Decorators implementation
 *
 * Read more about
 *  Experimental Property decorators: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#property-decorators
 *  Decorator factories: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#decorator-factories
 *
 */

import { Logger, LogLevel } from "sp-pnp-js";

// symbol emulation
import { getSymbol } from "./symbol";


/**
 * Decorator factory for select returning Property Decorator
 * @param queryName internal name of the SP field or path if means expand. Example: Title, File/Length
 */
export function select(queryName?: string): PropertyDecorator {   // this is the decorator factory
  return (target: any, propertyKey: string): void => {      // this is the decorator
    setMetadata(target, "select", propertyKey, queryName);
  };
}

/**
 * Decorator factory for expand returning Property Decorator
 * @param expandName expand path. Example: File/Length
 */
export function expand(expandName: string): PropertyDecorator {   // this is the decorator factory
  return (target: any, propertyKey: string): void => {      // this is the decorator
    setMetadata(target, "expand", propertyKey, expandName);
  };
}

/**
 * Sets metadata on target object using key as an accessor
 * Note: I considered to use reflect-metadata API to set metadata, but isn't needed on this scenario
 *        as we are storing the metadata in the actual object (target).
 * @param target object / class from where the decorator is called. It will be used to store metadata on its prototype.
 * @param key key or symbol used as accessor for the metadata
 * @param propName property name in the class
 * @param queryName property name in the query
 */
function setMetadata(target: any, key: string, propName: string, queryName: string): void {
  // string.isNullOrUndefinedOrEmpty
  if (!(typeof queryName === "string" && queryName.length > 0)) {
    queryName = propName;
  }

  const sym: string = getSymbol(key);

  // instead of using Map object, we use an array of objects, as Map is not well supported
  // still by all the browsers, consider using Map compiling TypeScript to ES6 and using Babel to transpile to ES5
  let currentValues: { propName: string, queryName: string }[] = target[sym];
  if (currentValues !== undefined) {
    currentValues = [...currentValues, { propName, queryName }];
  } else {
    currentValues = [].concat({ propName, queryName });
  }
  // property Decorators will store the metadata in its instance ( as a class property)
  // ideally having a symbol as a key, but symbol are not still supported on all the browsers
  // and they will require polyfill, as a sample, I will not use symbols, but please, consider it
  target[sym] = currentValues;
  Logger.log({
    data: {
      propertyKey: propName,
      queryName,
      key,
      target,
    },
    level: LogLevel.Verbose,
    message: "set metadata for property decorator"
  });
}
