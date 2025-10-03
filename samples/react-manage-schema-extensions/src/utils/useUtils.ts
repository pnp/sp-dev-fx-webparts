import { RESTRICTED_PROPERTY_TYPES } from "../constants";

interface IUseUtils {
  getAvailablePropertyTypes: (
    selectedTargetTypes: string[],
    allPropertyTypes: readonly { key: string; text: string }[]
  ) => Array<{ key: string; text: string }>;
  hasPropertyRestrictions: (targetTypes: string[]) => boolean;
}

export const useUtils = (): IUseUtils => {
/**
 * Function to get available property types based on selected target types
 */
  const getAvailablePropertyTypes = (
  selectedTargetTypes: string[],
  allPropertyTypes: readonly { key: string; text: string }[]
): Array<{ key: string; text: string }> => {
  // Get all restricted property types for the selected target types
  const restrictedTypes = selectedTargetTypes.reduce((restricted: string[], targetType) => {
    const restrictions = RESTRICTED_PROPERTY_TYPES[targetType as keyof typeof RESTRICTED_PROPERTY_TYPES];
    if (restrictions) {
      restricted.push(...restrictions);
    }
    return restricted;
  }, []);

  // Remove duplicates from restricted types
  const uniqueRestrictedTypes = [...new Set(restrictedTypes)];

  // Filter out restricted property types
  return allPropertyTypes.filter(propertyType => 
    !uniqueRestrictedTypes.includes(propertyType.key)
  );
};

/**
 * Check if any target types have property restrictions
 */
 const hasPropertyRestrictions = (targetTypes: string[]): boolean => {
  return targetTypes.some(targetType => 
    RESTRICTED_PROPERTY_TYPES[targetType as keyof typeof RESTRICTED_PROPERTY_TYPES]
  );
};

return { getAvailablePropertyTypes, hasPropertyRestrictions };
}