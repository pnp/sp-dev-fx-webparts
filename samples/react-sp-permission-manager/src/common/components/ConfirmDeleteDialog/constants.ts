// Constants for ConfirmDeleteDialog component
export const CONFIRM_DELETE_DIALOG_STRINGS = {
  ACCESS_DENIED_TITLE: 'Access Denied',
  DEFAULT_ACCESS_DENIED_MESSAGE: "You don't have the required permissions to delete {pluralName}. Contact your administrator to request access.",
  // single-delete message should not contain HTML – markup is handled in the component
  CONFIRM_SINGLE_DELETE: 'Are you sure you want to delete the {entityName} {itemTitle}? This action cannot be undone.',
  CONFIRM_MULTIPLE_DELETE: 'Are you sure you want to delete the following {count} {pluralName}? This action cannot be undone.',
  DELETING_SINGLE: 'Deleting "{itemTitle}"…',
  DELETING_MULTIPLE: 'Deleting "{itemTitle}" ({current} of {total})…',
  UNKNOWN_ERROR: 'Unknown error',
  DELETED: 'deleted',
  FAILED: 'failed',
  STATUS_DELETED: 'Deleted',
  STATUS_FAILED: 'Failed',
  SUCCESSFULLY_DELETED: 'Successfully deleted',
  CLOSE: 'Close',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETING_TITLE: 'Deleting…',
  RESULTS_TITLE: 'Delete Results'
} as const;