/**
 * Property types not supported for certain target types
 * Based on Microsoft Graph API limitations
 */
export const RESTRICTED_PROPERTY_TYPES = {
  Contact: ["Boolean", "Integer"], // Boolean and Integer not supported for contacts
  Event: ["Boolean", "Integer"], // Boolean and Integer not supported for events
  Message: ["Boolean", "Integer"], // Boolean and Integer not supported for messages
  Post: ["Boolean", "Integer"], // Boolean and Integer not supported for posts
} as const;

