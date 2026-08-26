export interface IPublicHolidaysGlobalProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  /** ISO 3166-1 alpha-2 code selected in the property pane as the starting country. */
  country: string;
  /** Year shown on first render. Falls back to the current year when unset. */
  defaultYear?: number;
  /** Holidays per page. Falls back to 10. */
  itemsPerPage?: number;
  /** Opens the property pane from the unconfigured placeholder. */
  onConfigure: () => void;
}
