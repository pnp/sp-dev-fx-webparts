import { RESTRICTED_PROPERTY_TYPES } from "../constants";

interface IUseUtils {
  getAvailablePropertyTypes: (
    selectedTargetTypes: string[],
    allPropertyTypes: readonly { key: string; text: string }[]
  ) => Array<{ key: string; text: string }>;
  hasPropertyRestrictions: (targetTypes: string[]) => boolean;
  retryWithExponentialBackoff: <T>(
    operation: () => Promise<T>,
    maxRetries?: number,
    initialDelay?: number,
    operationName?: string
  ) => Promise<T>;
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

  /**
   * Retry an async operation with exponential backoff strategy
   * @param operation - The async operation to retry
   * @param maxRetries - Maximum number of retry attempts (default: 3)
   * @param initialDelay - Initial delay in milliseconds (default: 1000)
   * @param operationName - Name of the operation for logging purposes
   * @returns The result of the successful operation
   * @throws The last error if all retries fail
   */
  const retryWithExponentialBackoff = async <T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000,
    operationName: string = "operation"
  ): Promise<T> => {
    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, attempt);
          console.warn(
            `[retryWithExponentialBackoff] ${operationName} failed (attempt ${attempt + 1}/${maxRetries}). Retrying in ${delay}ms...`,
            error
          );
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    console.error(
      `[retryWithExponentialBackoff] ${operationName} failed after ${maxRetries} attempts`,
      lastError
    );
    throw lastError || new Error(`${operationName} failed after ${maxRetries} attempts`);
  };

  return { 
    getAvailablePropertyTypes, 
    hasPropertyRestrictions,
    retryWithExponentialBackoff 
  };
};