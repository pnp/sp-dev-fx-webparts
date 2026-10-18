/** Default user-facing strings for the People Picker. */
export const PEOPLE_PICKER_STRINGS = {
  DEFAULT_LABEL: 'People',
  DEFAULT_PLACEHOLDER: 'Search people',
  DEFAULT_NO_RESULTS_TEXT: 'No matches found',
  SELECTED_ITEMS_ARIA_LABEL_SUFFIX: 'selected items',
  LOADING_ARIA_LABEL: 'Searching for people'
} as const;

/** Default behaviour values applied when callers don't specify a prop. */
export const PEOPLE_PICKER_DEFAULTS = {
  MAX_SUGGESTIONS: 20,
  SEARCH_DEBOUNCE_MS: 300,
  SEARCH_SCOPE: 'both',
  SOURCE_STRATEGY: 'sharepoint-first',
  INCLUDE_M365_GROUPS: true,
  INCLUDE_SECURITY_GROUPS: false
} as const;
