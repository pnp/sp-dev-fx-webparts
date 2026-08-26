/**
 * Available target types for Schema Extensions UI display
 */
export const TARGET_TYPES = [
  { key: "User", text: "User" },
  { key: "Group", text: "Group" },
  { key: "AdministrativeUnit", text: "Administrative Unit" },
  { key: "Contact", text: "Contact" },
  { key: "Device", text: "Device" },
  { key: "Event", text: "Event" },
  { key: "Message", text: "Message" },
  { key: "Organization", text: "Organization" },
  { key: "Post", text: "Post" },
] as const;

/**
 * Type definition for target types
 */
export type TargetType = typeof TARGET_TYPES[number];

/**
 * Target type keys as an array
 */
export const TARGET_TYPE_KEYS = TARGET_TYPES.map(type => type.key);