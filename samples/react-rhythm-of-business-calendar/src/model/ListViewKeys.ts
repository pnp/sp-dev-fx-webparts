import { stringToEnum } from "../common";

export const ListViewKeys = stringToEnum([
  "selectAll",
  "displayName",
  "eventStartDate",
  "eventEndTime",
  "description",
  "isRecurring",
  "isAllDay",
  "refinerValues",
  "location",
  "tag",
  "isRejected",
  "contacts",
  "isConfidential",
  "isApproved",
  "title",
  "recurrence",
  "created", "createdBy", "modified", "modifiedBy"
]);
export type ListViewKeys = keyof (typeof ListViewKeys);

export const DefaultListViewKeys = ListViewKeys["displayName"];