import { TARGET_TYPES } from "../constants";

/**
 * Type definition for target types
 */
export type TargetType = typeof TARGET_TYPES[number];

/**
 * Target type keys as an array
 */
export const TARGET_TYPE_KEYS = TARGET_TYPES.map(type => type.key);