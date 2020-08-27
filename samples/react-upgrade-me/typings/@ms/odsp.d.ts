/**
 * @file index.ts
 * Type definitions for Microsoft SPFx projects
 */

/**
 * Global definition for UNIT_TEST builds.
 * Code that is wrapped inside an if (UNIT_TEST) {...}
 * block will not be included in the final bundle when the
 * --ship flag is specified.
 */
declare const UNIT_TEST: boolean;

/**
 * @internal
 * Global definition for NPM package builds
 */
declare const NPM_BUILD: boolean;

/**
 * @internal
 * Global defintion for SharePoint Online builds
 */
declare const DATACENTER: boolean;

/**
 * @internal
 * Global definition for BUILD_NUMBER
 */
declare const BUILD_NUMBER: string;
