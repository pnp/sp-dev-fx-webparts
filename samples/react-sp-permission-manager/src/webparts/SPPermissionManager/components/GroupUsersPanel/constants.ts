export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

// UI strings for GroupUsersPanel
export const GROUP_USERS_PANEL_STRINGS = {
  FAILED_LOAD_GROUP_USERS: 'Failed to load group users.',
  FAILED_REMOVE_USERS_FROM_GROUP: 'Failed to remove users from group.',
  FAILED_REMOVE_SELECTED_USER: 'Failed to remove the selected user.',
  FAILED_REMOVE_SELECTED_USERS: 'Failed to remove selected users.',
  DISPLAY_NAME_HEADER: 'Display Name',
  EMAIL_HEADER: 'Email'
} as const;

// UI strings for AddUsersDialog
export const ADD_USERS_DIALOG_STRINGS = {
  FAILED_PARSE_FILE: 'Failed to parse the selected file.',
  FAILED_ADD_USERS_TO_GROUP: 'Failed to add users to the group.'
} as const;
