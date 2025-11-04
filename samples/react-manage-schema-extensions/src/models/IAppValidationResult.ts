
export interface IAppValidationResult {
  /**
   * Whether the app ID exists in Entra ID
   */
  exists: boolean;

  /**
   * The application display name if found
   */
  displayName?: string;
  /**
   * Any error message if validation failed
   */
  error?: string;
}
